"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ComponentType } from "react";
import { appById, type AppId } from "@/lib/apps";
import { useWindowManager } from "@/lib/window-manager";
import { useIsMobile } from "@/lib/use-is-mobile";
import { WindowFrame } from "./WindowFrame";
import { AppGlyph } from "@/components/icons/AppIcon";

const loading = () => (
  <div className="flex h-full items-center justify-center font-mono text-xs text-ink-faint">
    loading…
  </div>
);

const APP_COMPONENTS: Record<AppId, ComponentType> = {
  terminal: dynamic(() => import("@/components/apps/TerminalApp"), { loading }),
  projects: dynamic(() => import("@/components/apps/ProjectsApp"), { loading }),
  resume: dynamic(() => import("@/components/apps/ResumeApp"), { loading }),
  contact: dynamic(() => import("@/components/apps/ContactApp"), { loading }),
  links: dynamic(() => import("@/components/apps/LinksApp"), { loading }),
  chat: dynamic(() => import("@/components/apps/ChatApp"), { loading }),
};

export function WindowLayer() {
  const { windows, focusedId, closeApp } = useWindowManager();
  const isMobile = useIsMobile();
  const router = useRouter();

  // Windows only exist client-side; skip SSR/hydration entirely.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (isMobile) {
    const win = windows.find((w) => w.id === focusedId && !w.minimized);
    return (
      <AnimatePresence>
        {win && (
          <motion.div
            key={win.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 400, damping: 36 }}
            className="fixed inset-x-0 top-0 z-30 flex flex-col bg-surface"
            style={{ bottom: 48 }}
          >
            <div className="flex h-11 shrink-0 items-center gap-2 border-b border-edge-soft bg-surface-2 px-2">
              <button
                aria-label="Back to desktop"
                onClick={() => {
                  closeApp(win.id);
                  router.push("/");
                }}
                className="flex h-8 w-8 items-center justify-center rounded text-ink-dim hover:bg-surface-3"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4L6 9l5 5" />
                </svg>
              </button>
              <span style={{ color: appById(win.id).tint }}>
                <AppGlyph id={win.id} />
              </span>
              <span className="truncate font-mono text-xs text-ink">
                {appById(win.id).windowTitle}
              </span>
            </div>
            <div className="relative min-h-0 flex-1">
              {renderApp(win.id)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {windows.map((win) => (
        <WindowFrame key={win.id} win={win} focused={win.id === focusedId}>
          {renderApp(win.id)}
        </WindowFrame>
      ))}
    </AnimatePresence>
  );
}

function renderApp(id: AppId) {
  const App = APP_COMPONENTS[id];
  return <App />;
}
