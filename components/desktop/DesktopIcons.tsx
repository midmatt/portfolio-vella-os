"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { APPS, type AppId } from "@/lib/apps";
import { useIsMobile } from "@/lib/use-is-mobile";
import { AppIcon } from "@/components/icons/AppIcon";

export function DesktopIcons() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<AppId | null>(null);

  const open = (id: AppId, route: string) => {
    setSelected(id);
    router.push(route);
  };

  if (isMobile) {
    // Launcher grid — single tap opens the app full-screen.
    return (
      <div className="grid grid-cols-3 gap-x-2 gap-y-7 px-6 pt-14">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => open(app.id, app.route)}
            className="flex flex-col items-center gap-2"
          >
            <AppIcon id={app.id} tint={app.tint} size={56} />
            <span className="text-xs text-ink">{app.title}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="absolute left-4 top-4 grid select-none grid-flow-col grid-rows-6 gap-2"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelected(null);
      }}
    >
      {APPS.map((app) => (
        <button
          key={app.id}
          onClick={() => setSelected(app.id)}
          onDoubleClick={() => open(app.id, app.route)}
          onKeyDown={(e) => {
            if (e.key === "Enter") open(app.id, app.route);
          }}
          className={`flex w-[92px] flex-col items-center gap-1.5 rounded-md border px-2 py-3 outline-none transition-colors ${
            selected === app.id
              ? "border-ember-soft bg-[var(--icon-select)]"
              : "border-transparent hover:bg-white/[0.04]"
          }`}
        >
          <AppIcon id={app.id} tint={app.tint} />
          <span className="max-w-full truncate text-[12px] leading-tight text-ink drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            {app.title}
          </span>
        </button>
      ))}
    </div>
  );
}
