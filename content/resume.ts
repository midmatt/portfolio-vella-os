/**
 * Resume data — follows the "Resume Generation" section of
 * about-me-context_2.md (phrasing/ordering per the resume-ready summary).
 *
 * Both the on-screen resume (/resume) and the downloadable PDF render from
 * this one module, so editing the source content and rebuilding is the only
 * maintenance step — there is no separate resume file.
 */
import { contact, identity } from "./profile";

export const resume = {
  name: identity.name,
  headline: "Cybersecurity Student | Full-Stack Developer",
  contactLine: [
    contact.email,
    "linkedin.com/in/matthew-vella-234189326",
    "github.com/midmatt",
  ],
  education: [
    "Florida International University, Honors College — B.S. Cybersecurity (in progress)",
    "Prior technical degree in Cybersecurity",
    "CompTIA Security+ — in progress, expected December",
  ],
  skills: [
    {
      label: "Security",
      value: "cybersecurity fundamentals, security-aware development practices",
    },
    {
      label: "Languages/Frameworks",
      value:
        "TypeScript, JavaScript, Python, Next.js, React, React Native/Expo, Tailwind CSS, Swift",
    },
    {
      label: "Platforms/Tools",
      value: "Vercel, Supabase, Stripe, Resend, Git",
    },
  ],
  projects: [
    {
      name: "VoiceLocal",
      detail:
        "local-first macOS voice dictation app (whisper.cpp, Swift Accessibility API sidecar, Stripe licensing)",
    },
    {
      name: "AlarmQR",
      detail:
        "published App Store app with QR-code alarm dismissal (React Native/Expo, VisionKit)",
    },
    {
      name: "CyberSimply",
      detail:
        "AI-summarized cybersecurity news app (Claude-based summarization pipeline)",
    },
    {
      name: "Studytaire",
      detail: "Solitaire-based spaced-repetition study app (in development)",
    },
  ],
  freelance: [
    {
      name: "JoVell Hospitality Group",
      detail: "full Next.js site rebuild, Vercel deployment, brand redesign",
    },
    {
      name: "Storefront client site",
      detail: "Next.js/Stripe e-commerce build with secure digital delivery",
    },
  ],
};
