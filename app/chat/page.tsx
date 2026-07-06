import type { Metadata } from "next";
import { AppRoute } from "@/components/desktop/AppRoute";
import { identity } from "@/content/profile";

export const metadata: Metadata = {
  title: "Chat",
  description: `Ask an assistant about ${identity.name}'s background, projects, and skills.`,
};

export default function ChatPage() {
  return (
    <>
      <AppRoute appId="chat" />
      <div className="sr-only">
        <h1>Chat — ask about {identity.name}</h1>
        <p>{identity.shortBio}</p>
      </div>
    </>
  );
}
