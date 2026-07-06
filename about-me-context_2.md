# About Me — Context Reference

This file is ground truth for the portfolio site build. Use it to populate the Terminal app, File Manager/Projects app, and Resume app — do not invent details not listed here. Where something is missing (e.g. exact resume PDF, social links, headshot), leave a clearly marked placeholder/TODO instead of fabricating it.

## Bio

Matthew Vella — Cybersecurity sophomore at Florida International University's Honors College. Already holds a prior technical degree in cybersecurity before enrolling at FIU, and works as a freelance web developer alongside his studies. Long-term goal: reach a CIO role, ideally through federal or government cybersecurity work.

Chose cybersecurity out of a love for computers and a drive to work as a "hero in the shadows" — the person solving problems most people never see.

## Education

- Florida International University, Honors College — Cybersecurity (current, sophomore)
- Prior technical degree in cybersecurity (completed before FIU)
- Working toward CompTIA Security+ certification — in progress, target completion December (not yet held — do not state this as already earned)
- Coursework has included discrete mathematics (combinatorics, mathematical induction, relations, functions, predicate logic, set theory) and business/professional writing

## Skills / Tech Stack

**Security & Systems:** Cybersecurity fundamentals, security-aware development practices, threat-informed engineering

**Development:** TypeScript, JavaScript, Python, Next.js (App Router), React, React Native / Expo, Tailwind CSS, Swift (macOS Accessibility API integration)

**Infrastructure & Tools:** Vercel, Supabase, Stripe, Resend, Git

**Positioning:** Self-framed as a "security-aware developer" — the combination of cybersecurity knowledge and full-stack development is the core differentiator for freelance and career positioning.

## Projects

### VoiceLocal
Local-first macOS voice dictation app. On-device transcription via whisper.cpp, a Swift sidecar using the macOS Accessibility API for system-wide text injection, a Python agent for Electron app injection, and a Chrome extension with WebSocket auth. Ships with a 7-day trial and Stripe-based one-time license activation ($25). Marketing site built in Next.js at voicelocalapp.com.

### AlarmQR
Published App Store alarm app that requires scanning a physical QR code to dismiss the alarm — forces users out of bed to actually turn it off. Built in React Native / Expo (TypeScript), using a single master QR token per install via a native VisionKit bridge, expo-notifications, expo-av, and AsyncStorage + iCloud sync. Includes a Premium tier. Currently focused on improving Day 14 retention and App Store optimization.

### CyberSimply
AI-summarized cybersecurity news app. Summarization pipeline runs on Claude models (migrated from OpenAI).

### Studytaire
Solitaire-based flashcard study app (in development) — combines a full Solitaire game engine with spaced-repetition flashcards, built in React Native / Expo with Zustand and Supabase.

### Freelance Client Work
- **JoVell Hospitality Group** (jovellhg.com) — full site rebuild in Next.js, migrated off a legacy website builder, deployed on Vercel, with a Resend-powered contact form and custom brand/logo design ("Harvest Crown" concept).
- **Storefront project** (chasedbutnotchosen.com) — Next.js App Router e-commerce site with Stripe checkout, secure digital delivery via Vercel Blob, and an interactive product/page viewer.
- Additional past client sites: a static site with custom email forwarding setup, and a faith-based apparel storefront built on Stripe-driven product architecture.

## Career Focus

Targeting a long-term path toward a CIO role via federal or government cybersecurity work. Currently building both the technical foundation (Security+, hands-on development, security-aware engineering practice) and a portfolio of shipped, real-world products (an App Store app, a macOS utility, freelance client sites) to support that trajectory.

## Resume Generation

The Resume app does NOT embed a static PDF file. It generates the resume on the fly from the content in this file (bio, education, skills, projects) so that editing this .md is the only thing needed to keep the resume current — no separate resume file to remember to update.

Resume-ready summary (use this phrasing/ordering as the resume layout, adjust formatting as needed for a clean one-page resume):

**Matthew Vella**
Cybersecurity Student | Full-Stack Developer

**Education**
- Florida International University, Honors College — B.S. Cybersecurity (in progress)
- Prior technical degree in Cybersecurity
- CompTIA Security+ — in progress, expected December

**Technical Skills**
- Security: cybersecurity fundamentals, security-aware development practices
- Languages/Frameworks: TypeScript, JavaScript, Python, Next.js, React, React Native/Expo, Tailwind CSS, Swift
- Platforms/Tools: Vercel, Supabase, Stripe, Resend, Git

**Projects**
- VoiceLocal — local-first macOS voice dictation app (whisper.cpp, Swift Accessibility API sidecar, Stripe licensing)
- AlarmQR — published App Store app with QR-code alarm dismissal (React Native/Expo, VisionKit)
- CyberSimply — AI-summarized cybersecurity news app (Claude-based summarization pipeline)
- Studytaire — Solitaire-based spaced-repetition study app (in development)

**Freelance Client Work**
- JoVell Hospitality Group — full Next.js site rebuild, Vercel deployment, brand redesign
- Storefront client site — Next.js/Stripe e-commerce build with secure digital delivery

## Contact / Links

Real values (used by the site, resume, and chat assistant — verify before deploy):
- Email: matthewvella.dev@gmail.com
- LinkedIn: https://www.linkedin.com/in/matthew-vella-234189326/
- GitHub: https://github.com/midmatt
- Live project links (VoiceLocal, AlarmQR App Store page, CyberSimply): 
    - Voicelocal: voicelocalapp.com
    - AlarmQR: https://apps.apple.com/us/app/alarm-qr/id6755059776
    - CyberSimply: https://apps.apple.com/us/app/cyber-simply/id6752630267
