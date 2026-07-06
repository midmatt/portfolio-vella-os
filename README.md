# vella-os — Linux Desktop Portfolio

Matthew Vella's portfolio, styled as a Linux desktop environment (XFCE/GNOME-flavored). Every "app" is a real Next.js route, so each one is a shareable URL:

| App | Route | What it is |
| --- | --- | --- |
| Terminal | `/terminal` | Fake shell — `help`, `whoami`, `about`, `skills`, `education`, `projects`, `contact`, `neofetch`, `open <app>`, `clear`, with up/down command history |
| Projects | `/projects` | File-manager UI over shipped apps and client work |
| Resume | `/resume` | Document-viewer chrome; PDF generated on demand from content (no static PDF) |
| Mail | `/contact` | Compose-window contact form (submit not wired yet) |
| Browser | `/links` | Bookmark cards for external links |
| Chat | `/chat` | Recruiter assistant — streams answers from Claude via `/api/chat`, grounded only in the `content/` files |

Desktop windows are draggable, resizable, minimizable, maximizable, and z-stacked; window state survives route changes. On mobile (<768px) apps open full-screen with a back button instead.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · @react-pdf/renderer

## Run

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

## Deploy (Vercel)

Push to a Git repo and import it at vercel.com, or run `npx vercel` from this directory.

**Required environment variable:** `ANTHROPIC_API_KEY` (for the `/chat` assistant) — set it in Vercel Project Settings → Environment Variables, or copy `.env.local.example` to `.env.local` for local dev. The key is only ever read server-side in `app/api/chat/route.ts`. Without it, chat returns a friendly "not configured" message; the rest of the site works normally.

## Recruiter chat (`/api/chat`)

- Server-side call to Claude (`claude-opus-4-8`), streamed back as plain text.
- System prompt is generated in `lib/chat-system-prompt.ts` from the `content/` files — the assistant only knows what's in them and is instructed to say so (and point to the Mail app) when asked anything else. It speaks about Matthew in third person.
- Abuse guards: 10 requests/min per IP (in-memory, per-instance), 1,000-char message cap, history trimmed to the last 12 turns.

## Content — single source of truth

All bio/project/resume copy lives in `content/` (`profile.ts`, `projects.ts`, `resume.ts`), mirroring `about-me-context_2.md`. Edit those files and rebuild — the Terminal, Projects, Resume (screen + downloaded PDF), Browser, and Chat apps all update from them. Structured to be swappable for a CMS later.

## Known TODOs (intentional, per spec)

- `components/apps/ContactApp.tsx` — real submit handler (e.g. Resend via a route handler)
- `content/profile.ts` — contact/link values came from the PLACEHOLDER section of about-me-context; verify before deploy
- `content/projects.ts` — per-project GitHub links not provided yet
