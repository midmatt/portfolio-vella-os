import type { Metadata } from "next";
import { AppRoute } from "@/components/desktop/AppRoute";
import { externalLinks, identity } from "@/content/profile";

export const metadata: Metadata = {
  title: "Links",
  description: `${identity.name} around the web — GitHub, LinkedIn, and live projects.`,
};

export default function LinksPage() {
  return (
    <>
      <AppRoute appId="links" />
      <div className="sr-only">
        <h1>Links — {identity.name}</h1>
        <ul>
          {externalLinks.map((l) => (
            <li key={l.id}>
              <a href={l.url}>{l.label}</a> — {l.note}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
