"use client";

import { useEffect } from "react";
import type { AppId } from "@/lib/apps";
import { useWindowManager } from "@/lib/window-manager";
import { useIsMobile } from "@/lib/use-is-mobile";

/**
 * Invisible controller rendered by each app's route page. Visiting the
 * route (directly, via a shared link, or through client navigation) opens
 * the corresponding window in the persistent desktop shell.
 */
export function AppRoute({ appId }: { appId: AppId }) {
  const { openApp } = useWindowManager();
  const isMobile = useIsMobile();

  useEffect(() => {
    openApp(appId, { mobile: isMobile });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId]);

  return null;
}
