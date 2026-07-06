"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  folders,
  projects,
  type Project,
  type ProjectFolder,
} from "@/content/projects";
import { useIsMobile } from "@/lib/use-is-mobile";

type FolderFilter = ProjectFolder | "all";

export default function ProjectsApp() {
  const [folder, setFolder] = useState<FolderFilter>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const isMobile = useIsMobile();

  const visible =
    folder === "all" ? projects : projects.filter((p) => p.folder === folder);

  const openFile = (p: Project) => {
    setSelected(p.id);
    setOpen(p);
  };

  if (open) {
    return <ProjectDetail project={open} onBack={() => setOpen(null)} />;
  }

  return (
    <div className="flex h-full flex-col bg-surface text-sm">
      {/* Path bar */}
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-edge-soft bg-surface-2 px-3 font-mono text-[12px] text-ink-dim">
        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="text-ember">
          <path d="M3 6a1 1 0 0 1 1-1h4l2 2h6a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6z" />
        </svg>
        /home/matthew/projects{folder === "all" ? "" : `/${folder}`}
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside className="hidden w-44 shrink-0 border-r border-edge-soft bg-surface-2/50 p-2 sm:block">
          <p className="px-2 pb-1 pt-1 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Places
          </p>
          <SidebarItem
            label="All Projects"
            active={folder === "all"}
            count={projects.length}
            onClick={() => setFolder("all")}
          />
          {folders.map((f) => (
            <SidebarItem
              key={f.id}
              label={f.label}
              active={folder === f.id}
              count={projects.filter((p) => p.folder === f.id).length}
              onClick={() => setFolder(f.id)}
            />
          ))}
        </aside>

        {/* Mobile folder tabs */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex gap-1 border-b border-edge-soft p-2 sm:hidden">
            {(["all", ...folders.map((f) => f.id)] as FolderFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFolder(f)}
                className={`rounded px-2.5 py-1 text-xs ${
                  folder === f
                    ? "bg-ember text-[#14110c]"
                    : "bg-surface-2 text-ink-dim"
                }`}
              >
                {f === "all" ? "All" : folders.find((x) => x.id === f)?.label}
              </button>
            ))}
          </div>

          {/* File grid */}
          <div
            className="app-scroll grid flex-1 auto-rows-min grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-1 overflow-y-auto p-3"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelected(null);
            }}
          >
            {visible.map((p) => (
              <button
                key={p.id}
                onClick={() =>
                  isMobile ? openFile(p) : setSelected(p.id)
                }
                onDoubleClick={() => openFile(p)}
                onKeyDown={(e) => e.key === "Enter" && openFile(p)}
                title={`${p.name} — ${p.tagline}`}
                className={`flex h-fit flex-col items-center gap-1.5 rounded-md border p-3 outline-none transition-colors ${
                  selected === p.id
                    ? "border-ember-soft bg-[var(--icon-select)]"
                    : "border-transparent hover:bg-surface-2"
                }`}
              >
                <FileIcon project={p} />
                <span className="max-w-full break-all text-center font-mono text-[11px] leading-tight text-ink">
                  {p.fileName}
                </span>
              </button>
            ))}
          </div>

          {/* Status bar */}
          <div className="flex h-7 shrink-0 items-center justify-between border-t border-edge-soft bg-surface-2 px-3 font-mono text-[11px] text-ink-faint">
            <span>{visible.length} items</span>
            <span className="hidden sm:inline">
              {selected
                ? projects.find((p) => p.id === selected)?.tagline
                : "double-click a file to open it"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[13px] transition-colors ${
        active ? "bg-[var(--icon-select)] text-ember" : "text-ink-dim hover:bg-surface-3"
      }`}
    >
      <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 6a1 1 0 0 1 1-1h4l2 2h6a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6z" />
      </svg>
      <span className="flex-1 truncate">{label}</span>
      <span className="font-mono text-[10px] text-ink-faint">{count}</span>
    </button>
  );
}

function FileIcon({ project }: { project: Project }) {
  const ext = project.fileName.split(".").pop() ?? "";
  const tint =
    project.folder === "apps" ? "#6ba7d9" : "#e8a33d";
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" aria-hidden>
      <path
        d="M12 8h16l8 8v22a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3z"
        fill="var(--surface-3)"
        stroke="var(--edge)"
      />
      <path d="M28 8l8 8h-8V8z" fill="var(--edge)" />
      <rect x="9" y="28" width="30" height="10" rx="2" fill={tint} />
      <text
        x="24"
        y="35.5"
        textAnchor="middle"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="bold"
        fill="#14110c"
      >
        .{ext}
      </text>
      {project.status && (
        <circle cx="38" cy="12" r="4" fill="#e8a33d" stroke="var(--surface)" strokeWidth="1.5" />
      )}
    </svg>
  );
}

function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 36 }}
      className="flex h-full flex-col bg-surface"
    >
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-edge-soft bg-surface-2 px-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-[12px] text-ink-dim hover:bg-surface-3 hover:text-ink"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3L5 8l5 5" />
          </svg>
          Back
        </button>
        <span className="font-mono text-[12px] text-ink-faint">
          /home/matthew/projects/{project.folder}/{project.fileName}
        </span>
      </div>

      <div className="app-scroll flex-1 overflow-y-auto p-5 sm:p-7">
        <div className="mx-auto max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ember">
            {project.kind}
            {project.status ? ` · ${project.status}` : ""}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-ink">{project.name}</h1>
          <p className="mt-1 text-sm text-ink-dim">{project.tagline}</p>

          <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink">
            {project.description.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Tech stack
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded border border-edge-soft bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-ink-dim"
              >
                {t}
              </span>
            ))}
          </div>

          {project.links.length > 0 && (
            <>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                Links
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded border border-ember-soft px-3 py-1.5 text-[13px] text-ember transition-colors hover:bg-ember hover:text-[#14110c]"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
