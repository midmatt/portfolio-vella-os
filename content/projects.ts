/**
 * Project entries for the File Manager app (/projects).
 * Content mirrors the "Projects" section of about-me-context_2.md.
 */

export type ProjectFolder = "apps" | "client-work";

export interface Project {
  id: string;
  name: string;
  fileName: string;
  folder: ProjectFolder;
  kind: string;
  status?: string;
  tagline: string;
  description: string[];
  tech: string[];
  links: { label: string; url: string }[];
}

export const folders: { id: ProjectFolder; label: string }[] = [
  { id: "apps", label: "Apps" },
  { id: "client-work", label: "Client Work" },
];

// TODO: per-project GitHub repo links weren't provided in
// about-me-context_2.md — add them here when available.
export const projects: Project[] = [
  {
    id: "voicelocal",
    name: "VoiceLocal",
    fileName: "voicelocal.app",
    folder: "apps",
    kind: "macOS application",
    tagline: "Local-first macOS voice dictation app",
    description: [
      "Local-first macOS voice dictation app. On-device transcription via whisper.cpp, a Swift sidecar using the macOS Accessibility API for system-wide text injection, a Python agent for Electron app injection, and a Chrome extension with WebSocket auth.",
      "Ships with a 7-day trial and Stripe-based one-time license activation ($25). Marketing site built in Next.js at voicelocalapp.com.",
    ],
    tech: [
      "whisper.cpp",
      "Swift",
      "macOS Accessibility API",
      "Python",
      "Chrome Extension",
      "WebSockets",
      "Stripe",
      "Next.js",
    ],
    links: [{ label: "voicelocalapp.com", url: "https://voicelocalapp.com" }],
  },
  {
    id: "alarmqr",
    name: "AlarmQR",
    fileName: "alarmqr.ipa",
    folder: "apps",
    kind: "iOS application — published on the App Store",
    tagline: "Alarm app that requires scanning a physical QR code to dismiss",
    description: [
      "Published App Store alarm app that requires scanning a physical QR code to dismiss the alarm — forces users out of bed to actually turn it off.",
      "Built in React Native / Expo (TypeScript), using a single master QR token per install via a native VisionKit bridge, expo-notifications, expo-av, and AsyncStorage + iCloud sync. Includes a Premium tier. Currently focused on improving Day 14 retention and App Store optimization.",
    ],
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "VisionKit",
      "expo-notifications",
      "expo-av",
      "AsyncStorage",
      "iCloud sync",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/alarm-qr/id6755059776",
      },
    ],
  },
  {
    id: "cybersimply",
    name: "CyberSimply",
    fileName: "cybersimply.ipa",
    folder: "apps",
    kind: "iOS application",
    tagline: "AI-summarized cybersecurity news app",
    description: [
      "AI-summarized cybersecurity news app. The summarization pipeline runs on Claude models (migrated from OpenAI).",
    ],
    tech: ["Claude API", "AI summarization pipeline"],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/cyber-simply/id6752630267",
      },
    ],
  },
  {
    id: "studytaire",
    name: "Studytaire",
    fileName: "studytaire.dev",
    folder: "apps",
    kind: "Mobile application",
    status: "In development",
    tagline: "Solitaire-based spaced-repetition flashcard study app",
    description: [
      "Solitaire-based flashcard study app (in development) — combines a full Solitaire game engine with spaced-repetition flashcards, built in React Native / Expo with Zustand and Supabase.",
    ],
    tech: ["React Native", "Expo", "Zustand", "Supabase"],
    links: [],
  },
  {
    id: "jovell",
    name: "JoVell Hospitality Group",
    fileName: "jovellhg.site",
    folder: "client-work",
    kind: "Freelance client project",
    tagline: "Full site rebuild in Next.js with custom brand design",
    description: [
      'Full site rebuild in Next.js, migrated off a legacy website builder and deployed on Vercel, with a Resend-powered contact form and custom brand/logo design ("Harvest Crown" concept).',
    ],
    tech: ["Next.js", "Vercel", "Resend", "Brand / logo design"],
    links: [{ label: "jovellhg.com", url: "https://jovellhg.com" }],
  },
  {
    id: "cbnc-storefront",
    name: "Storefront — Chased But Not Chosen",
    fileName: "storefront.site",
    folder: "client-work",
    kind: "Freelance client project",
    tagline: "Next.js e-commerce build with Stripe checkout",
    description: [
      "Next.js App Router e-commerce site with Stripe checkout, secure digital delivery via Vercel Blob, and an interactive product/page viewer.",
    ],
    tech: ["Next.js App Router", "Stripe", "Vercel Blob"],
    links: [
      { label: "chasedbutnotchosen.com", url: "https://chasedbutnotchosen.com" },
    ],
  },
  {
    id: "other-clients",
    name: "Additional Client Sites",
    fileName: "past-clients.txt",
    folder: "client-work",
    kind: "Freelance client projects",
    tagline: "Earlier freelance builds",
    description: [
      "A static site with custom email forwarding setup.",
      "A faith-based apparel storefront built on Stripe-driven product architecture.",
    ],
    tech: ["Static site", "Email forwarding", "Stripe"],
    links: [],
  },
];
