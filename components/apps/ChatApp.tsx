"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact } from "@/content/profile";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  /** Sample conversation shown on load — not sent to the API. */
  seed?: boolean;
  error?: boolean;
}

/**
 * Recruiter chat, wired to /api/chat (server-side Claude call, streamed).
 * Seed messages below are display-only examples; answers come from the
 * grounded system prompt in lib/chat-system-prompt.ts.
 */
const SEED_MESSAGES: Message[] = [
  { id: 1, role: "user", text: "What is Matthew studying?", seed: true },
  {
    id: 2,
    role: "assistant",
    seed: true,
    text: "Matthew is a cybersecurity sophomore at Florida International University's Honors College. He already holds a prior technical degree in cybersecurity, and he's working toward the CompTIA Security+ certification (in progress, targeting December).",
  },
  {
    id: 3,
    role: "user",
    text: "Has he actually shipped anything?",
    seed: true,
  },
  {
    id: 4,
    role: "assistant",
    seed: true,
    text: "Yes — AlarmQR is a published App Store alarm app that requires scanning a QR code to dismiss, VoiceLocal is a local-first macOS voice dictation app with Stripe licensing, and he's rebuilt freelance client sites like JoVell Hospitality Group in Next.js.",
  },
];

const MAX_INPUT_CHARS = 1000;

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const idRef = useRef(100);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy, streamingText]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim().slice(0, MAX_INPUT_CHARS);
    if (!text || busy) return;

    const userMsg: Message = { id: idRef.current++, role: "user", text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setBusy(true);
    setStreamingText(null);

    const pushAssistant = (t: string, error = false) => {
      setStreamingText(null);
      setMessages((ms) => [
        ...ms,
        { id: idRef.current++, role: "assistant", text: t, error },
      ]);
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Seed messages are display-only samples — send the real turns.
          messages: history
            .filter((m) => !m.seed)
            .map((m) => ({ role: m.role, content: m.text })),
        }),
      });

      if (!res.ok || !res.body) {
        let msg = `Something went wrong — try again, or email ${contact.email}.`;
        try {
          const data = await res.json();
          if (typeof data?.error === "string") msg = data.error;
        } catch {}
        pushAssistant(msg, true);
        return;
      }

      // Stream plain-text deltas into a live bubble.
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreamingText(full);
      }
      full += decoder.decode();
      pushAssistant(
        full.trim() ||
          `I didn't get a response — try again, or email ${contact.email}.`
      );
    } catch {
      pushAssistant(
        `I couldn't reach the assistant — check your connection and try again, or email ${contact.email}.`,
        true
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-surface text-sm">
      {/* Header */}
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-edge-soft bg-surface-2 px-3">
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#5fbfae] font-mono text-[12px] font-bold text-[#14110c]">
          AI
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface-2 bg-moss" />
        </span>
        <div className="leading-tight">
          <p className="text-[13px] font-medium text-ink">Ask about Matthew</p>
          <p className="font-mono text-[10px] text-ink-faint">
            recruiter assistant · answers only from Matthew&apos;s real background
          </p>
        </div>
      </div>

      {/* Scrollback */}
      <div ref={scrollRef} className="app-scroll flex-1 space-y-2.5 overflow-y-auto p-3">
        {messages.map((m) => (
          <Bubble key={m.id} role={m.role} error={m.error}>
            {m.text}
          </Bubble>
        ))}

        {streamingText !== null && (
          <Bubble role="assistant">{streamingText}</Bubble>
        )}

        {busy && streamingText === null && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-edge-soft bg-surface-2 px-4 py-3">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-dim" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-dim" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-dim" />
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={sendMessage}
        className="flex shrink-0 items-center gap-2 border-t border-edge-soft bg-surface-2 p-2.5"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={MAX_INPUT_CHARS}
          placeholder="Ask about skills, projects, education…"
          aria-label="Chat message"
          className="h-9 flex-1 rounded-full border border-edge-soft bg-surface px-4 text-[13px] text-ink outline-none placeholder:text-ink-faint focus:border-ember-soft"
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={!input.trim() || busy}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-ember text-[#14110c] transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2L7 9M14 2L9.5 14 7 9 2 6.5 14 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

function Bubble({
  role,
  error,
  children,
}: {
  role: "user" | "assistant";
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 leading-relaxed ${
          role === "user"
            ? "rounded-br-sm bg-ember text-[#14110c]"
            : error
              ? "rounded-bl-sm border border-alert/40 bg-surface-2 text-ink-dim"
              : "rounded-bl-sm border border-edge-soft bg-surface-2 text-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
