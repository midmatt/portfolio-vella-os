"use client";

import { externalLinks } from "@/content/profile";

/** Minimal browser chrome with a bookmarks page of external links. */
export default function LinksApp() {
  return (
    <div className="flex h-full flex-col bg-surface text-sm">
      {/* Tab strip */}
      <div className="flex h-9 shrink-0 items-end gap-1 border-b border-edge-soft bg-surface-2 px-2 pt-1.5">
        <div className="flex h-full items-center gap-2 rounded-t-md border border-b-0 border-edge-soft bg-surface px-3 font-mono text-[11px] text-ink">
          <span className="h-2 w-2 rounded-full bg-ember" />
          Bookmarks
          <span className="ml-1 text-ink-faint">×</span>
        </div>
        <div className="mb-1 flex h-6 w-6 items-center justify-center rounded text-ink-faint hover:bg-surface-3">
          +
        </div>
      </div>

      {/* Address bar */}
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-edge-soft bg-surface-2/60 px-3">
        <NavArrow d="M10 4L5 8l5 4" />
        <NavArrow d="M6 4l5 4-5 4" dim />
        <div className="flex h-7 flex-1 items-center gap-2 rounded-full border border-edge-soft bg-surface px-3 font-mono text-[12px] text-ink-dim">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="var(--moss)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3.5" y="7" width="9" height="6.5" rx="1" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
          </svg>
          vella://bookmarks
        </div>
      </div>

      {/* Bookmark cards */}
      <div className="app-scroll flex-1 overflow-y-auto p-4 sm:p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          {externalLinks.length} bookmarks — matthew&apos;s links
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {externalLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-edge-soft bg-surface-2 p-3 transition-colors hover:border-ember-soft hover:bg-surface-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-3 font-mono text-sm font-bold text-ember group-hover:bg-ember group-hover:text-[#14110c]">
                {link.label[0]}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium text-ink">
                  {link.label}
                </span>
                <span className="block truncate font-mono text-[11px] text-ink-faint">
                  {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-ink-dim">
                  {link.note}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavArrow({ d, dim }: { d: string; dim?: boolean }) {
  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full ${
        dim ? "text-ink-faint" : "text-ink-dim"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </span>
  );
}
