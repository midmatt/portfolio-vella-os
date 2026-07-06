import type { Metadata } from "next";
import { AppRoute } from "@/components/desktop/AppRoute";
import { identity } from "@/content/profile";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Shipped apps and freelance client work by ${identity.name}: ${projects
    .map((p) => p.name)
    .join(", ")}.`,
};

export default function ProjectsPage() {
  return (
    <>
      <AppRoute appId="projects" />
      <div className="sr-only">
        <h1>Projects — {identity.name}</h1>
        <ul>
          {projects.map((p) => (
            <li key={p.id}>
              {p.name}: {p.tagline}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
