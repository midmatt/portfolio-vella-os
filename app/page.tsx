import { identity } from "@/content/profile";

export default function HomePage() {
  return (
    <>
      {/* Desktop hint, bottom-right above the taskbar */}
      <div className="pointer-events-none absolute bottom-16 right-5 hidden select-none text-right font-mono text-[11px] leading-relaxed text-ink-faint md:block">
        <p className="text-ember">{identity.hostname} 1.0.0</p>
        <p>double-click an icon to launch an app</p>
        <p>every app is a shareable URL</p>
      </div>

      {/* Server-rendered summary for crawlers/screen readers */}
      <div className="sr-only">
        <h1>{identity.name}</h1>
        <p>{identity.title}</p>
        <p>{identity.shortBio}</p>
      </div>
    </>
  );
}
