"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import { appById } from "@/lib/apps";
import { useWindowManager, type WindowState } from "@/lib/window-manager";
import { AppGlyph } from "@/components/icons/AppIcon";

const TASKBAR_H = 48;
const MIN_W = 380;
const MIN_H = 260;

export function WindowFrame({
  win,
  focused,
  children,
}: {
  win: WindowState;
  focused: boolean;
  children: ReactNode;
}) {
  const { focusApp, closeApp, minimizeApp, toggleMaximize, commitGeometry } =
    useWindowManager();
  const app = appById(win.id);
  const frameRef = useRef<HTMLDivElement>(null);

  // Drag and resize write styles directly during pointermove (no re-render
  // per frame), then commit the final geometry to the window manager.
  const startDrag = (e: ReactPointerEvent) => {
    if (win.maximized) return;
    if ((e.target as HTMLElement).closest("button")) return;
    const el = frameRef.current;
    if (!el) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const origin = { ...win.pos };
    let latest = origin;

    const onMove = (ev: globalThis.PointerEvent) => {
      const w = el.offsetWidth;
      const x = clamp(
        origin.x + ev.clientX - startX,
        -(w - 140),
        window.innerWidth - 100
      );
      const y = clamp(
        origin.y + ev.clientY - startY,
        0,
        window.innerHeight - TASKBAR_H - 36
      );
      latest = { x, y };
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      commitGeometry(win.id, { pos: latest });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const startResize = (e: ReactPointerEvent) => {
    if (win.maximized) return;
    const el = frameRef.current;
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const origin = { ...win.size };
    let latest = origin;

    const onMove = (ev: globalThis.PointerEvent) => {
      const w = clamp(
        origin.w + ev.clientX - startX,
        MIN_W,
        window.innerWidth - win.pos.x - 8
      );
      const h = clamp(
        origin.h + ev.clientY - startY,
        MIN_H,
        window.innerHeight - TASKBAR_H - win.pos.y - 8
      );
      latest = { w, h };
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      commitGeometry(win.id, { size: latest });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const animateMaximize = () => {
    const el = frameRef.current;
    if (el) {
      el.classList.add("win-animating");
      window.setTimeout(() => el.classList.remove("win-animating"), 260);
    }
    toggleMaximize(win.id);
  };

  const geometry = win.maximized
    ? { left: 0, top: 0, width: "100%", height: `calc(100% - ${TASKBAR_H}px)` }
    : {
        left: win.pos.x,
        top: win.pos.y,
        width: win.size.w,
        height: win.size.h,
      };

  return (
    <motion.div
      ref={frameRef}
      initial={{ opacity: 0, scale: 0.94, y: 14 }}
      animate={
        win.minimized
          ? {
              opacity: 0,
              scale: 0.92,
              y: 48,
              transitionEnd: { visibility: "hidden" as const },
            }
          : { opacity: 1, scale: 1, y: 0, visibility: "visible" as const }
      }
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={{ type: "spring", stiffness: 480, damping: 38, mass: 0.9 }}
      style={{ position: "absolute", zIndex: win.z, ...geometry }}
      className={`flex flex-col overflow-hidden rounded-lg border bg-surface ${
        win.minimized ? "pointer-events-none" : ""
      } ${
        focused
          ? "border-edge shadow-window-focus"
          : "border-edge-soft shadow-window opacity-[0.97]"
      }`}
      onPointerDownCapture={() => {
        if (!focused) focusApp(win.id);
      }}
    >
      {/* Titlebar */}
      <div
        onPointerDown={startDrag}
        onDoubleClick={animateMaximize}
        className={`flex h-9 shrink-0 select-none items-center gap-2 border-b border-edge-soft px-3 ${
          focused ? "bg-surface-2" : "bg-surface"
        } ${win.maximized ? "" : "cursor-grab active:cursor-grabbing"}`}
      >
        <span style={{ color: app.tint }}>
          <AppGlyph id={win.id} />
        </span>
        <span
          className={`truncate font-mono text-[12px] tracking-tight ${
            focused ? "text-ink" : "text-ink-faint"
          }`}
        >
          {app.windowTitle}
        </span>
        <div className="ml-auto flex items-center gap-1">
          <TitlebarButton label="Minimize" onClick={() => minimizeApp(win.id)}>
            <path d="M3 8.5h8" />
          </TitlebarButton>
          <TitlebarButton
            label={win.maximized ? "Restore" : "Maximize"}
            onClick={animateMaximize}
          >
            {win.maximized ? (
              <path d="M4.5 5.5h5v5h-5z M6 5.5V4h5v5H9.5" />
            ) : (
              <rect x="3.5" y="3.5" width="7" height="7" />
            )}
          </TitlebarButton>
          <TitlebarButton label="Close" close onClick={() => closeApp(win.id)}>
            <path d="M4 4l6 6M10 4l-6 6" />
          </TitlebarButton>
        </div>
      </div>

      {/* App content */}
      <div className="relative min-h-0 flex-1">{children}</div>

      {/* Resize handle */}
      {!win.maximized && (
        <div
          onPointerDown={startResize}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
          aria-hidden
        >
          <svg viewBox="0 0 16 16" className="h-full w-full text-ink-faint">
            <path
              d="M13 6v7H6M13 10v3h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
}

function TitlebarButton({
  children,
  label,
  close,
  onClick,
}: {
  children: ReactNode;
  label: string;
  close?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      className={`flex h-6 w-6 items-center justify-center rounded text-ink-dim transition-colors ${
        close
          ? "hover:bg-alert hover:text-white"
          : "hover:bg-surface-3 hover:text-ink"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        {children}
      </svg>
    </button>
  );
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), Math.max(min, max));
