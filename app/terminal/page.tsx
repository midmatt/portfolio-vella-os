import type { Metadata } from "next";
import { AppRoute } from "@/components/desktop/AppRoute";
import { identity } from "@/content/profile";

export const metadata: Metadata = {
  title: "Terminal",
  description: `Interactive terminal — type help, whoami, skills, or education to learn about ${identity.name}.`,
};

export default function TerminalPage() {
  return (
    <>
      <AppRoute appId="terminal" />
      <div className="sr-only">
        <h1>Terminal — {identity.name}</h1>
        <p>{identity.shortBio}</p>
      </div>
    </>
  );
}
