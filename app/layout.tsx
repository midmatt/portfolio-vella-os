import type { Metadata } from "next";
import { JetBrains_Mono, Ubuntu } from "next/font/google";
import { DesktopShell } from "@/components/desktop/DesktopShell";
import { identity } from "@/content/profile";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: `${identity.name} — Portfolio`,
    template: `%s · ${identity.name}`,
  },
  description: identity.shortBio,
};

// Set the theme before first paint to avoid a flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem("vella-theme");if(t==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${ubuntu.variable} ${jetbrains.variable} font-sans`}>
        <DesktopShell>{children}</DesktopShell>
      </body>
    </html>
  );
}
