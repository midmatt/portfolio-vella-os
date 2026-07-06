import type { Metadata } from "next";
import { AppRoute } from "@/components/desktop/AppRoute";
import { resume } from "@/content/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: `${resume.name} — ${resume.headline}. View on-screen or download as a generated PDF.`,
};

export default function ResumePage() {
  return (
    <>
      <AppRoute appId="resume" />
      <div className="sr-only">
        <h1>Resume — {resume.name}</h1>
        <p>{resume.headline}</p>
        <ul>
          {resume.education.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
