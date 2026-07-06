import type { AppId } from "@/lib/apps";

/**
 * Hand-drawn app icons in a flat Linux-icon-theme style: a tinted rounded
 * tile with a simple white glyph. `tint` comes from the app registry.
 */
export function AppIcon({
  id,
  tint,
  size = 44,
}: {
  id: AppId;
  tint: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden
      className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]"
    >
      <defs>
        <linearGradient id={`tile-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tint} />
          <stop offset="1" stopColor={tint} stopOpacity="0.72" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="42" height="42" rx="10" fill={`url(#tile-${id})`} />
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="10"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
      />
      {glyphs[id]}
    </svg>
  );
}

const glyphs: Record<AppId, JSX.Element> = {
  terminal: (
    <g stroke="#101216" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M13 17l8 7-8 7" />
      <path d="M25 31h11" />
    </g>
  ),
  projects: (
    <g fill="#101216">
      <path d="M11 15a3 3 0 0 1 3-3h7l3 4h10a3 3 0 0 1 3 3v2H11v-6z" opacity="0.85" />
      <path d="M11 20h26a2.5 2.5 0 0 1 2.5 3l-2 10a3 3 0 0 1-3 2.5H13.4a3 3 0 0 1-3-2.5l-1.9-10A2.5 2.5 0 0 1 11 20z" />
    </g>
  ),
  resume: (
    <g>
      <path
        d="M15 10h12l7 7v20a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2z"
        fill="#fdfcf9"
      />
      <path d="M27 10l7 7h-7v-7z" fill="#d8d4c8" />
      <g stroke="#a09a8a" strokeWidth="2.4" strokeLinecap="round">
        <path d="M18 22h13" />
        <path d="M18 27h13" />
        <path d="M18 32h9" />
      </g>
    </g>
  ),
  contact: (
    <g>
      <rect x="10" y="14" width="28" height="20" rx="3" fill="#fdfcf9" />
      <path
        d="M11 16l13 10 13-10"
        fill="none"
        stroke="#101216"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),
  links: (
    <g fill="none" stroke="#101216" strokeWidth="3">
      <circle cx="24" cy="24" r="12.5" />
      <ellipse cx="24" cy="24" rx="5.5" ry="12.5" />
      <path d="M12.5 20.5h23M12.5 27.5h23" strokeWidth="2.6" />
    </g>
  ),
  chat: (
    <g fill="#101216">
      <path d="M11 15a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4H21l-7 6v-6h0a4 4 0 0 1-3-3.9V15z" />
      <g fill={"#5fbfae"}>
        <circle cx="18" cy="20.5" r="2.1" />
        <circle cx="24" cy="20.5" r="2.1" />
        <circle cx="30" cy="20.5" r="2.1" />
      </g>
    </g>
  ),
};

/** Small monochrome glyph used in taskbar buttons and the start menu. */
export function AppGlyph({ id, className }: { id: AppId; className?: string }) {
  const paths: Record<AppId, JSX.Element> = {
    terminal: (
      <>
        <path d="M4 6l5 4-5 4" />
        <path d="M11 15h5" />
      </>
    ),
    projects: <path d="M3 6a1 1 0 0 1 1-1h4l2 2h6a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6z" />,
    resume: (
      <>
        <path d="M6 3h6l3 3v11H6V3z" />
        <path d="M8 9h5M8 12h5" />
      </>
    ),
    contact: (
      <>
        <rect x="3" y="5" width="14" height="10" rx="1.5" />
        <path d="M4 6.5l6 4.5 6-4.5" />
      </>
    ),
    links: (
      <>
        <circle cx="10" cy="10" r="7" />
        <ellipse cx="10" cy="10" rx="3" ry="7" />
        <path d="M3.5 8h13M3.5 12h13" />
      </>
    ),
    chat: <path d="M3 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V6z" />,
  };
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[id]}
    </svg>
  );
}
