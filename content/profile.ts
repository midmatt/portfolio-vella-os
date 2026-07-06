/**
 * Single source of truth for all personal/bio content on the site.
 *
 * Mirrors about-me-context_2.md (kept at the repo root). Every app —
 * Terminal, Projects, Resume (including the generated PDF), Mail,
 * Browser, Chat — reads from this module, so editing this file and
 * rebuilding updates everything at once. Structured plainly so it can
 * be swapped for a CMS later without touching components.
 */

export const identity = {
  name: "Matthew Vella",
  handle: "matthew",
  hostname: "vella-os",
  title: "Cybersecurity Student | Full-Stack Developer",
  shortBio:
    "Cybersecurity sophomore at FIU's Honors College and freelance web developer — a security-aware developer building real, shipped products.",
  bio: [
    "Matthew Vella is a cybersecurity sophomore at Florida International University's Honors College. He already holds a prior technical degree in cybersecurity from before enrolling at FIU, and works as a freelance web developer alongside his studies. His long-term goal is to reach a CIO role, ideally through federal or government cybersecurity work.",
    'He chose cybersecurity out of a love for computers and a drive to work as a "hero in the shadows" — the person solving problems most people never see.',
  ],
  positioning:
    'Self-framed as a "security-aware developer" — the combination of cybersecurity knowledge and full-stack development is the core differentiator for freelance and career positioning.',
  careerFocus:
    "Targeting a long-term path toward a CIO role via federal or government cybersecurity work. Currently building both the technical foundation (Security+, hands-on development, security-aware engineering practice) and a portfolio of shipped, real-world products — an App Store app, a macOS utility, freelance client sites — to support that trajectory.",
};

export const education = [
  {
    title: "Florida International University, Honors College",
    detail: "B.S. Cybersecurity — in progress (sophomore)",
  },
  {
    title: "Prior technical degree in Cybersecurity",
    detail: "Completed before enrolling at FIU",
  },
  {
    title: "CompTIA Security+",
    // Per about-me-context: in progress, NOT yet earned — never state as held.
    detail: "In progress — target completion December",
  },
];

export const coursework =
  "Coursework has included discrete mathematics (combinatorics, mathematical induction, relations, functions, predicate logic, set theory) and business/professional writing.";

export const skills = [
  {
    group: "Security & Systems",
    items: [
      "Cybersecurity fundamentals",
      "Security-aware development practices",
      "Threat-informed engineering",
    ],
  },
  {
    group: "Development",
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Next.js (App Router)",
      "React",
      "React Native / Expo",
      "Tailwind CSS",
      "Swift (macOS Accessibility API)",
    ],
  },
  {
    group: "Infrastructure & Tools",
    items: ["Vercel", "Supabase", "Stripe", "Resend", "Git"],
  },
];

/**
 * Contact / links.
 * NOTE: about-me-context_2.md marks this section "PLACEHOLDER — TODO before
 * deploy: fill in real values". The values below are the ones currently
 * listed in that file — verify them before going live.
 */
export const contact = {
  email: "matthewvella.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/matthew-vella-234189326/",
  github: "https://github.com/midmatt",
};

export const externalLinks = [
  {
    id: "github",
    label: "GitHub",
    url: contact.github,
    note: "Code, experiments, and project repos",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: contact.linkedin,
    note: "Professional profile and background",
  },
  {
    id: "voicelocal",
    label: "VoiceLocal",
    url: "https://voicelocalapp.com",
    note: "Local-first macOS voice dictation app",
  },
  {
    id: "alarmqr",
    label: "AlarmQR — App Store",
    url: "https://apps.apple.com/us/app/alarm-qr/id6755059776",
    note: "QR-dismissal alarm app, live on the App Store",
  },
  {
    id: "cybersimply",
    label: "CyberSimply — App Store",
    url: "https://apps.apple.com/us/app/cyber-simply/id6752630267",
    note: "AI-summarized cybersecurity news app",
  },
  {
    id: "jovell",
    label: "JoVell Hospitality Group",
    url: "https://jovellhg.com",
    note: "Freelance client — full Next.js site rebuild",
  },
  {
    id: "cbnc",
    label: "Chased But Not Chosen",
    url: "https://chasedbutnotchosen.com",
    note: "Freelance client — Next.js/Stripe storefront",
  },
];
