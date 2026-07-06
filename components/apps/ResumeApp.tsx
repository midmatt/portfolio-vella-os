"use client";

import { useState } from "react";
import { resume } from "@/content/resume";

/**
 * Document-viewer chrome around a print-styled resume rendered from
 * content/resume.ts. The Download button generates a real PDF from the
 * same data at request time (no static PDF file exists anywhere).
 */
export default function ResumeApp() {
  const [zoom, setZoom] = useState(1);
  const [generating, setGenerating] = useState(false);

  const download = async () => {
    setGenerating(true);
    try {
      // Heavy dependency — loaded only on demand.
      const [{ pdf }, { ResumeDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ResumePDF"),
      ]);
      const blob = await pdf(<ResumeDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "matthew-vella-resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Viewer toolbar */}
      <div className="flex h-10 shrink-0 items-center gap-1 border-b border-edge-soft bg-surface-2 px-2">
        <ToolButton
          label="Zoom out"
          onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(1)))}
        >
          <path d="M3 8h10" />
        </ToolButton>
        <span className="w-12 text-center font-mono text-[11px] text-ink-dim">
          {Math.round(zoom * 100)}%
        </span>
        <ToolButton
          label="Zoom in"
          onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.1).toFixed(1)))}
        >
          <path d="M8 3v10M3 8h10" />
        </ToolButton>
        <ToolButton label="Reset zoom" onClick={() => setZoom(1)}>
          <rect x="3" y="4" width="10" height="8" rx="1" />
        </ToolButton>

        <div className="mx-1 h-5 w-px bg-edge-soft" />
        <span className="hidden truncate font-mono text-[11px] text-ink-faint sm:inline">
          matthew-vella-resume.pdf — generated from content/resume.ts
        </span>

        <button
          onClick={download}
          disabled={generating}
          className="ml-auto flex items-center gap-2 rounded bg-ember px-3 py-1.5 text-[12px] font-medium text-[#14110c] transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2v8m0 0l3-3M8 10L5 7M3 13h10" />
          </svg>
          {generating ? "Generating…" : "Download PDF"}
        </button>
      </div>

      {/* Document */}
      <div className="app-scroll flex-1 overflow-auto bg-[color-mix(in_srgb,var(--desk)_80%,black_20%)] p-4 sm:p-8">
        <div
          className="resume-sheet mx-auto w-full max-w-[680px] origin-top rounded-sm px-8 py-10 shadow-window sm:px-12"
          style={{ transform: `scale(${zoom})` }}
        >
          <h1 className="text-3xl font-bold tracking-tight">{resume.name}</h1>
          <p className="mt-1 font-mono text-sm text-[#c05f16]">
            {resume.headline}
          </p>
          <p className="mt-2 text-[12px] text-[#5c5749]">
            {resume.contactLine.join("  ·  ")}
          </p>

          <Section title="Education">
            <ul className="space-y-1">
              {resume.education.map((e) => (
                <li key={e} className="text-[13px] leading-relaxed">
                  <span className="mr-2 text-[#c05f16]">•</span>
                  {e}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Technical Skills">
            <ul className="space-y-1">
              {resume.skills.map((s) => (
                <li key={s.label} className="text-[13px] leading-relaxed">
                  <span className="font-bold">{s.label}:</span> {s.value}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Projects">
            <ul className="space-y-1.5">
              {resume.projects.map((p) => (
                <li key={p.name} className="text-[13px] leading-relaxed">
                  <span className="font-bold">{p.name}</span> — {p.detail}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Freelance Client Work">
            <ul className="space-y-1.5">
              {resume.freelance.map((f) => (
                <li key={f.name} className="text-[13px] leading-relaxed">
                  <span className="font-bold">{f.name}</span> — {f.detail}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="border-b border-[#d8d4c8] pb-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#c05f16]">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function ToolButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded text-ink-dim transition-colors hover:bg-surface-3 hover:text-ink"
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        {children}
      </svg>
    </button>
  );
}
