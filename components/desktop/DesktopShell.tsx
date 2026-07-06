"use client";

import type { ReactNode } from "react";
import { WindowManagerProvider } from "@/lib/window-manager";
import { ThemeProvider } from "@/lib/theme";
import { DesktopIcons } from "./DesktopIcons";
import { Taskbar } from "./Taskbar";
import { BootScreen } from "./BootScreen";
import { WindowLayer } from "@/components/window/WindowLayer";

/**
 * The persistent desktop environment. Rendered from the root layout so it
 * survives route changes — windows keep their state while the URL moves
 * between apps. Route pages ({children}) are invisible controllers that
 * tell the window manager which app to open.
 */
export function DesktopShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <WindowManagerProvider>
        <div className="desktop-bg desktop-grid relative h-[100dvh] w-full overflow-hidden">
          <DesktopIcons />
          <WindowLayer />
          <Taskbar />
          {children}
        </div>
        <BootScreen />
        <div className="noise-overlay" />
      </WindowManagerProvider>
    </ThemeProvider>
  );
}
