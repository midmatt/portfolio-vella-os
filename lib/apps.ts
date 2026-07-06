export type AppId =
  | "terminal"
  | "projects"
  | "resume"
  | "contact"
  | "links"
  | "chat";

export interface AppMeta {
  id: AppId;
  title: string;
  windowTitle: string;
  route: string;
  tint: string; // icon accent
  defaultSize: { w: number; h: number };
}

export const APPS: AppMeta[] = [
  {
    id: "terminal",
    title: "Terminal",
    windowTitle: "matthew@vella-os: ~",
    route: "/terminal",
    tint: "#8fc97b",
    defaultSize: { w: 740, h: 480 },
  },
  {
    id: "projects",
    title: "Projects",
    windowTitle: "projects — File Manager",
    route: "/projects",
    tint: "#e8a33d",
    defaultSize: { w: 880, h: 560 },
  },
  {
    id: "resume",
    title: "Resume",
    windowTitle: "matthew-vella-resume.pdf — Document Viewer",
    route: "/resume",
    tint: "#d96b6b",
    defaultSize: { w: 820, h: 620 },
  },
  {
    id: "contact",
    title: "Mail",
    windowTitle: "New Message — Mail",
    route: "/contact",
    tint: "#6ba7d9",
    defaultSize: { w: 640, h: 580 },
  },
  {
    id: "links",
    title: "Browser",
    windowTitle: "Bookmarks — Web Browser",
    route: "/links",
    tint: "#b58fd9",
    defaultSize: { w: 820, h: 560 },
  },
  {
    id: "chat",
    title: "Chat",
    windowTitle: "Ask about Matthew — Chat",
    route: "/chat",
    tint: "#5fbfae",
    defaultSize: { w: 680, h: 580 },
  },
];

export const appById = (id: AppId): AppMeta => {
  const app = APPS.find((a) => a.id === id);
  if (!app) throw new Error(`Unknown app: ${id}`);
  return app;
};
