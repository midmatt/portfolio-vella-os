import type { Metadata } from "next";
import { AppRoute } from "@/components/desktop/AppRoute";
import { contact, identity } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${identity.name} — cybersecurity student and full-stack developer.`,
};

export default function ContactPage() {
  return (
    <>
      <AppRoute appId="contact" />
      <div className="sr-only">
        <h1>Contact — {identity.name}</h1>
        <p>Email: {contact.email}</p>
      </div>
    </>
  );
}
