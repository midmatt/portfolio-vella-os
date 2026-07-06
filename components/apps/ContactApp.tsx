"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/profile";

/** Mail-client compose window. UI only for now — see the TODO in onSubmit. */
export default function ContactApp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO: wire up the real submit handler here (e.g. a Next.js route
    // handler that sends via Resend). The form state (name, email, message)
    // is ready to post. Until then, surface a friendly notice instead.
    setNotice(
      `Sending isn't wired up yet — email me directly at ${contact.email}`
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col bg-surface text-sm">
      {/* Compose toolbar */}
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-edge-soft bg-surface-2 px-3">
        <button
          type="submit"
          className="flex items-center gap-2 rounded bg-ember px-3 py-1.5 text-[12px] font-medium text-[#14110c] transition-opacity hover:opacity-90"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2L7 9M14 2L9.5 14 7 9 2 6.5 14 2z" />
          </svg>
          Send
        </button>
        <span className="ml-auto font-mono text-[11px] text-ink-faint">
          compose — plaintext
        </span>
      </div>

      {/* Headers */}
      <div className="shrink-0 border-b border-edge-soft px-4">
        <HeaderRow label="To">
          <span className="rounded-full border border-edge-soft bg-surface-2 px-2.5 py-0.5 font-mono text-[12px] text-ink">
            {contact.email}
          </span>
        </HeaderRow>
        <HeaderRow label="From">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-2/5 min-w-[110px] bg-transparent text-ink outline-none placeholder:text-ink-faint"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 bg-transparent font-mono text-[12px] text-ink-dim outline-none placeholder:text-ink-faint"
          />
        </HeaderRow>
        <HeaderRow label="Subject">
          <span className="text-ink-dim">
            Hello from your portfolio site
          </span>
        </HeaderRow>
      </div>

      {/* Body */}
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={"Write your message…\n\nRecruiter? Ask me about VoiceLocal, AlarmQR, or security-aware development."}
        className="app-scroll min-h-0 flex-1 resize-none bg-surface p-4 leading-relaxed text-ink outline-none placeholder:text-ink-faint"
      />

      {notice && (
        <div className="shrink-0 border-t border-ember-soft bg-[var(--icon-select)] px-4 py-2.5 text-[12px] text-ember">
          {notice}{" "}
          <a href={`mailto:${contact.email}`} className="underline">
            open mail client ↗
          </a>
        </div>
      )}
    </form>
  );
}

function HeaderRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-edge-soft py-2 last:border-b-0">
      <span className="w-14 shrink-0 text-right font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        {label}
      </span>
      {children}
    </div>
  );
}
