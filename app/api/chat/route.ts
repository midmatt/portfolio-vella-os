import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/chat-system-prompt";

/**
 * Recruiter-assistant chat endpoint.
 *
 * Calls the Anthropic API server-side only — the key comes from the
 * ANTHROPIC_API_KEY environment variable (set in Vercel project settings)
 * and is never exposed to the client. Streams plain-text deltas back to
 * the chat UI.
 */

// Abuse/cost guards for a public endpoint.
const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY_MESSAGES = 12;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

// Simple in-memory IP throttle. Per-instance on serverless, so it's a soft
// limit — fine at this scale; swap for KV/Upstash if abuse becomes real.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing unbounded.
  if (hits.size > 5000) hits.clear();
  return false;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: ChatMessage[] = [];
  for (const m of raw) {
    if (
      !m ||
      typeof m !== "object" ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      m.content.length === 0
    ) {
      return null;
    }
    if (m.content.length > MAX_MESSAGE_CHARS) return null;
    messages.push({ role: m.role, content: m.content });
  }

  // Keep only the recent tail of the conversation, and make sure the
  // history starts with a user turn (the API requires it).
  let trimmed = messages.slice(-MAX_HISTORY_MESSAGES);
  while (trimmed.length > 0 && trimmed[0].role !== "user") {
    trimmed = trimmed.slice(1);
  }
  if (trimmed.length === 0 || trimmed[trimmed.length - 1].role !== "user") {
    return null;
  }
  return trimmed;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "Chat is not configured yet (missing ANTHROPIC_API_KEY)." },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many messages — please wait a minute and try again." },
      { status: 429 }
    );
  }

  let messages: ChatMessage[] | null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    messages = null;
  }
  if (!messages) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const client = new Anthropic();

  try {
    const stream = client.messages.stream({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: buildSystemPrompt(),
      messages,
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          const final = await stream.finalMessage();
          if (final.stop_reason === "refusal") {
            controller.enqueue(
              encoder.encode(
                "I can't help with that one — happy to answer questions about Matthew's background, projects, or skills instead."
              )
            );
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json(
        { error: "The assistant is busy right now — try again shortly." },
        { status: 429 }
      );
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Anthropic API error:", error.status, error.message);
      return Response.json(
        { error: "The assistant hit a problem — please try again." },
        { status: 502 }
      );
    }
    throw error;
  }
}
