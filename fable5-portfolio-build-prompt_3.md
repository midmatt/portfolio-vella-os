# Fable 5 One-Shot Build Prompts — Linux Desktop Portfolio

Two prompts: **Phase 1** builds the site. **Phase 2** (run after Phase 1 is working) wires up the recruiter AI. Paste each into Fable 5 as a single message, in a fresh context if possible — one-shot quality drops if you've been going back and forth on unrelated things first.

---

## Phase 1 — The Desktop Portfolio

**Before running this:** upload `about-me-context.md` alongside this prompt (or paste its contents in). It's referenced below as the source of truth for bio, education, skills, and project content — this stops Fable 5 from inventing placeholder bio text or guessing at project details.

```
I've attached a file called about-me-context.md — use it as the ground-truth source for all personal/bio/project content in this build (Terminal responses, Projects app entries, any about-me copy). Do not invent facts not present in that file. Where it explicitly marks something as a placeholder/TODO (contact links, resume PDF, etc.), leave a matching placeholder in the code rather than making one up.

Build a personal portfolio website styled as a Linux desktop environment (think XFCE/GNOME hybrid — not a literal OS clone, just the visual language: taskbar, desktop icons, draggable windows, a dock). Navigating between "apps" should navigate between real Next.js routes (each app = a page), not just open a modal, so each app is a real shareable URL a recruiter can link to directly.

TECH STACK
- Next.js 14+ App Router, TypeScript, Tailwind CSS
- Framer Motion for window drag/open/close/minimize animations
- Deploy target: Vercel
- No backend/database needed for this phase — all content is static/hardcoded in a /content directory (TS files or MDX), structured so it's easy to swap for a CMS later

DESKTOP SHELL (persists across all routes as a layout)
- Full-viewport desktop background (subtle gradient or a tiling pattern, dark theme by default with a light theme toggle)
- Taskbar (bottom or top, your call) showing: a "start menu" style logo button, currently open app icons, a live clock
- Desktop icons (double-click to open, single tap on mobile) for each app below
- Windows: draggable, resizable, minimize/maximize/close controls (top-right, styled like a WM titlebar), z-index stacking so clicking a window brings it to front
- On mobile: skip the windowing entirely — icons open full-screen "apps" with a back gesture/button, don't try to force draggable windows on a touchscreen

APPS (each is a route AND a desktop icon)
1. **Terminal** (`/terminal`) — boots into a fake shell prompt. Supports a small set of real commands the user can type: `whoami` (short bio), `about` (longer bio), `skills` (list: cybersecurity, Next.js, TypeScript, Tailwind, Stripe, Supabase, Vercel, Resend, Python), `education` (FIU Honors College, Cybersecurity, prior technical degree, Security+ in progress), `contact` (email/socials), `help` (lists commands), `clear`. Typing an unknown command shows a friendly "command not found" with a `help` hint. Command history via up/down arrows.
2. **File Manager** (`/projects`) — looks like a file browser (sidebar with folders like "Web Dev", "Security Projects", "Apps"; main pane shows files/folders as icons). Each "file" is a project (VoiceLocal, AlarmQR, CyberSimply, freelance client sites like JoVell Hospitality and a storefront build). Double-clicking a file opens a detail view (or a nested "window") with description, tech stack tags, and links (live site / GitHub / case study).
3. **Resume Viewer** (`/resume`) — looks like a PDF viewer app chrome (toolbar with zoom/download icons), but do NOT embed a static PDF file. Instead, render the resume as a clean, print-styled HTML/React layout built from the "Resume Generation" section of about-me-context.md, and generate a real downloadable PDF from that same content at request time (e.g. via `@react-pdf/renderer` or a Puppeteer/print-to-PDF API route — pick whichever is simpler to keep dependency-light on Vercel). The goal: when I edit about-me-context.md and rebuild, the resume PDF updates automatically with zero separate resume file to maintain. Toolbar's download button triggers the generated PDF.
4. **Mail** (`/contact`) — looks like an email client compose window. A real working contact form (fields: name, email, message) — style only for now, I'll wire the send logic separately, so just build the UI and leave a clearly marked TODO comment where the submit handler goes.
5. **Browser** (`/links`) — looks like a minimal browser chrome with a fake address bar and tab strip. Content area shows a clean list of external links (LinkedIn, GitHub, live client sites) as "bookmark" cards.
6. **Chat** (`/chat`) — looks like a messaging app. For this phase, just build the full UI (message bubbles, input box, typing indicator, scrollback) with 2-3 hardcoded sample Q&A pairs so it's visually complete. Leave a clearly marked TODO comment where the real API call will go — I'll wire this up in a separate pass.

DESIGN
- Dark theme by default, a genuinely distinct visual identity (not a generic dark-mode SaaS look) — pick a real accent color and a monospace font for the terminal/code-flavored bits, a clean sans-serif elsewhere
- Subtle boot/loading sequence on first visit (a few seconds, skippable) reinforcing the "desktop OS" feel
- Favicon and a custom cursor or window-focus glow are nice-to-haves if time allows, not required

CONSTRAINTS
- Don't add authentication, a database, or a CMS — that's out of scope for this pass
- Don't over-engineer the terminal into a full shell parser — a simple command-matching switch statement is enough
- Get it fully working and deployable to Vercel; I'll review and iterate from there
```

---

## Phase 2 — The Recruiter AI Chat (run after Phase 1 works)

```
This is a follow-up to the portfolio site we just built. The /chat route currently has a fully-built chat UI with hardcoded sample messages. Wire it up to a real AI backend that can answer recruiter questions about me, grounded only in the facts I provide below — it must not hallucinate experience, dates, or skills I didn't give it.

APPROACH
- Add a Next.js API route (`/api/chat`) that calls the Anthropic API (Claude) server-side — never expose the API key to the client
- System prompt should include my full background as structured context (I'll paste my resume/bio content into a `/content/about-me.ts` file as the single source of truth — reference that file, don't invent details)
- Keep it a single system-prompt-grounded chat, no vector DB needed at this scale — my background fits comfortably in a system prompt
- Stream the response back to the chat UI so it feels responsive (use the existing typing-indicator UI you already built)
- Rate-limit or cap message length server-side to avoid abuse/cost blowup since this will be public-facing
- The AI should speak in third person about me ("Matthew is a cybersecurity student at FIU...") not pretend to literally be me, and should redirect off-topic or inappropriate questions back to my professional background
- If asked something not covered in the provided background, it should say it doesn't have that info and suggest reaching out via the Mail app instead of guessing

Ask me for my resume content / key facts before finalizing the system prompt if I haven't provided them yet.
```

---

### Notes for you
- Fable 5 does best with a spec this explicit on a one-shot; it tends to *not* over-refactor if you constrain scope up front (the "CONSTRAINTS" section in Phase 1 matters more than it looks).
- Have your resume text and a couple lines about each project ready before Phase 2 — it'll ask for them if you don't provide them inline.
- If a message ever gets flagged and silently rerouted to Opus 4.8, Anthropic says it'll tell you when that happens — worth noting if the output quality suddenly feels different mid-build.
