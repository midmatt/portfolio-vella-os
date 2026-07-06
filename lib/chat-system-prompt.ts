/**
 * System prompt for the recruiter assistant (/api/chat).
 *
 * Built from the content/ modules — the same single source of truth that
 * mirrors about-me-context_2.md — so editing the content files updates the
 * assistant's knowledge along with the rest of the site. Keep this prompt
 * free of facts that aren't in those files.
 */
import {
  contact,
  coursework,
  education,
  identity,
  skills,
} from "@/content/profile";
import { projects } from "@/content/projects";

function backgroundBlock(): string {
  const educationText = education
    .map((e) => `- ${e.title} — ${e.detail}`)
    .join("\n");

  const skillsText = skills
    .map((g) => `- ${g.group}: ${g.items.join(", ")}`)
    .join("\n");

  const projectsText = projects
    .map((p) => {
      const links = p.links.map((l) => `${l.label}: ${l.url}`).join("; ");
      return [
        `### ${p.name}${p.status ? ` (${p.status})` : ""}`,
        `${p.kind}. ${p.description.join(" ")}`,
        `Tech: ${p.tech.join(", ")}.`,
        links ? `Links: ${links}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  return `## Bio
${identity.bio.join("\n\n")}

${identity.positioning}

## Career focus
${identity.careerFocus}

## Education
${educationText}

${coursework}

Important: the CompTIA Security+ certification is IN PROGRESS (target completion December). Matthew does NOT hold it yet — never state it as earned.

## Skills
${skillsText}

## Projects
${projectsText}

## Contact
- Email: ${contact.email}
- LinkedIn: ${contact.linkedin}
- GitHub: ${contact.github}`;
}

export function buildSystemPrompt(): string {
  return `You are the recruiter assistant on ${identity.name}'s portfolio site (a Linux-desktop-themed personal site). Visitors — usually recruiters or hiring managers — ask you questions about Matthew's background.

Rules:
- Speak about Matthew in the third person ("Matthew is a cybersecurity student at FIU..."). You are an assistant that represents him; never pretend to literally be him.
- Ground every answer ONLY in the background section below. Never invent, embellish, or guess at experience, dates, employers, certifications, or skills that are not listed there.
- If asked something the background doesn't cover, say plainly that you don't have that information and suggest reaching out directly via the Mail app on this site (the /contact route) or at ${contact.email}. Do not guess.
- If a question is off-topic, inappropriate, or unrelated to Matthew's professional background, politely redirect the conversation back to his background, projects, or skills.
- Keep answers concise and conversational — a few sentences for simple questions, a short paragraph or two at most. This renders in a small chat window.
- Plain text only: no markdown headers, no bullet-point walls, no code blocks unless specifically asked about code.

# Matthew's background

${backgroundBlock()}`;
}
