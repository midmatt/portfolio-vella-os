"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { APPS, appById } from "@/lib/apps";
import { useWindowManager } from "@/lib/window-manager";
import { useTheme } from "@/lib/theme";
import { useIsMobile } from "@/lib/use-is-mobile";
import { AppGlyph } from "@/components/icons/AppIcon";
import { contact, identity } from "@/content/profile";

export function Taskbar() {
  const { windows, focusedId, restoreApp, minimizeApp } = useWindowManager();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <AnimatePresence>
        {menuOpen && <StartMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>

      <div className="fixed inset-x-0 bottom-0 z-40 flex h-12 items-center gap-1 border-t border-edge-soft bg-surface/95 px-2 shadow-taskbar backdrop-blur">
        {/* Start button */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Open start menu"
          className={`flex h-9 items-center gap-2 rounded px-2.5 font-mono text-sm font-bold transition-colors ${
            menuOpen
              ? "bg-ember text-[#14110c]"
              : "text-ember hover:bg-surface-3"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6l4 4-4 4" />
            <path d="M10 15h6" />
          </svg>
          {!isMobile && <span>vella-os</span>}
        </button>

        <div className="mx-1 h-6 w-px bg-edge-soft" />

        {/* Open apps */}
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {mounted &&
            windows.map((w) => {
              const app = appById(w.id);
              const active = w.id === focusedId && !w.minimized;
              return (
                <button
                  key={w.id}
                  onClick={() =>
                    active ? minimizeApp(w.id) : restoreApp(w.id)
                  }
                  title={app.title}
                  className={`relative flex h-9 shrink-0 items-center gap-2 rounded px-2.5 text-[13px] transition-colors ${
                    active
                      ? "bg-surface-3 text-ink"
                      : "text-ink-dim hover:bg-surface-2 hover:text-ink"
                  }`}
                >
                  <span style={{ color: app.tint }}>
                    <AppGlyph id={w.id} />
                  </span>
                  {!isMobile && <span>{app.title}</span>}
                  <span
                    className={`absolute inset-x-2 bottom-0 h-[2px] rounded-full ${
                      active ? "bg-ember" : w.minimized ? "bg-edge" : "bg-ink-faint"
                    }`}
                  />
                </button>
              );
            })}
        </div>

        <ThemeToggle />
        <Clock />
      </div>
    </>
  );
}

function StartMenu({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 38 }}
      className="fixed bottom-14 left-2 z-50 w-72 overflow-hidden rounded-lg border border-edge bg-surface shadow-window"
    >
      <div className="border-b border-edge-soft bg-surface-2 px-4 py-3">
        <p className="font-mono text-sm font-bold text-ember">{identity.name}</p>
        <p className="mt-0.5 text-xs text-ink-dim">{identity.title}</p>
      </div>
      <div className="p-2">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              onClose();
              router.push(app.route);
            }}
            className="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-surface-3"
          >
            <span style={{ color: app.tint }}>
              <AppGlyph id={app.id} />
            </span>
            {app.title}
            <span className="ml-auto font-mono text-[10px] text-ink-faint">
              {app.route}
            </span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 border-t border-edge-soft px-4 py-2.5 font-mono text-[11px] text-ink-faint">
        <a href={`mailto:${contact.email}`} className="hover:text-ember">
          email
        </a>
        <a href={contact.github} target="_blank" rel="noreferrer" className="hover:text-ember">
          github
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-ember">
          linkedin
        </a>
      </div>
    </motion.div>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light/dark theme"
      title="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded text-ink-dim transition-colors hover:bg-surface-3 hover:text-ink"
    >
      {mounted && theme === "light" ? (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="10" cy="10" r="4" />
          <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M3.8 3.8l1.4 1.4M14.8 14.8l1.4 1.4M16.2 3.8l-1.4 1.4M5.2 14.8l-1.4 1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 12.5A7 7 0 0 1 7.5 3.5a7 7 0 1 0 9 9z" />
        </svg>
      )}
    </button>
  );
}

function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-w-[86px] px-2 text-right font-mono text-[12px] leading-tight text-ink-dim">
      {now ? (
        <>
          <div className="text-ink">
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="text-[10px]">
            {now.toLocaleDateString([], {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
        </>
      ) : (
        <div className="text-ink-faint">--:--</div>
      )}
    </div>
  );
}
