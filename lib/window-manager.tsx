"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { appById, type AppId } from "./apps";

export interface WindowState {
  id: AppId;
  z: number;
  minimized: boolean;
  maximized: boolean;
  pos: { x: number; y: number };
  size: { w: number; h: number };
}

interface WindowManager {
  windows: WindowState[];
  focusedId: AppId | null;
  openApp: (id: AppId, opts?: { mobile?: boolean }) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  restoreApp: (id: AppId) => void;
  commitGeometry: (
    id: AppId,
    geo: { pos?: { x: number; y: number }; size?: { w: number; h: number } }
  ) => void;
}

const Ctx = createContext<WindowManager | null>(null);

const TASKBAR_H = 48;

function syncUrl(id: AppId | null) {
  if (typeof window === "undefined") return;
  const route = id ? appById(id).route : "/";
  if (window.location.pathname !== route) {
    window.history.replaceState(window.history.state, "", route);
  }
}

function spawnGeometry(id: AppId, index: number) {
  const { defaultSize } = appById(id);
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const w = Math.min(defaultSize.w, vw - 24);
  const h = Math.min(defaultSize.h, vh - TASKBAR_H - 24);
  const cascade = (index % 5) * 32;
  const x = Math.max(12, Math.round((vw - w) / 2) + cascade - 48);
  const y = Math.max(8, Math.round((vh - TASKBAR_H - h) / 2.4) + cascade);
  return { pos: { x, y }, size: { w, h } };
}

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<AppId | null>(null);
  const zCounter = useRef(10);
  const spawnCount = useRef(0);

  const focusApp = useCallback((id: AppId) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, z, minimized: false } : w))
    );
    setFocusedId(id);
    syncUrl(id);
  }, []);

  const openApp = useCallback(
    (id: AppId, opts?: { mobile?: boolean }) => {
      setWindows((ws) => {
        const existing = ws.find((w) => w.id === id);
        zCounter.current += 1;
        const z = zCounter.current;
        if (existing) {
          return ws.map((w) =>
            w.id === id ? { ...w, z, minimized: false } : w
          );
        }
        const geo = spawnGeometry(id, spawnCount.current++);
        const next: WindowState = {
          id,
          z,
          minimized: false,
          maximized: false,
          ...geo,
        };
        // On mobile only one app is open at a time — no window juggling.
        return opts?.mobile ? [next] : [...ws, next];
      });
      setFocusedId(id);
      syncUrl(id);
    },
    []
  );

  const nextFocus = (ws: WindowState[], excluding?: AppId): AppId | null => {
    const candidates = ws.filter((w) => w.id !== excluding && !w.minimized);
    if (candidates.length === 0) return null;
    return candidates.reduce((a, b) => (a.z > b.z ? a : b)).id;
  };

  const closeApp = useCallback((id: AppId) => {
    setWindows((ws) => {
      const rest = ws.filter((w) => w.id !== id);
      setFocusedId((cur) => {
        if (cur !== id) return cur;
        const next = nextFocus(rest);
        syncUrl(next);
        return next;
      });
      return rest;
    });
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((ws) => {
      const next = ws.map((w) => (w.id === id ? { ...w, minimized: true } : w));
      setFocusedId((cur) => {
        if (cur !== id) return cur;
        const nf = nextFocus(next, id);
        syncUrl(nf);
        return nf;
      });
      return next;
    });
  }, []);

  const restoreApp = useCallback(
    (id: AppId) => {
      focusApp(id);
    },
    [focusApp]
  );

  const toggleMaximize = useCallback((id: AppId) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((ws) =>
      ws.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized, minimized: false, z } : w
      )
    );
    setFocusedId(id);
    syncUrl(id);
  }, []);

  const commitGeometry = useCallback(
    (
      id: AppId,
      geo: { pos?: { x: number; y: number }; size?: { w: number; h: number } }
    ) => {
      setWindows((ws) =>
        ws.map((w) =>
          w.id === id
            ? { ...w, pos: geo.pos ?? w.pos, size: geo.size ?? w.size }
            : w
        )
      );
    },
    []
  );

  const value = useMemo(
    () => ({
      windows,
      focusedId,
      openApp,
      closeApp,
      minimizeApp,
      toggleMaximize,
      focusApp,
      restoreApp,
      commitGeometry,
    }),
    [
      windows,
      focusedId,
      openApp,
      closeApp,
      minimizeApp,
      toggleMaximize,
      focusApp,
      restoreApp,
      commitGeometry,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWindowManager() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}
