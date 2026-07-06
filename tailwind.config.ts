import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // All colors resolve through CSS variables so the light/dark
        // themes swap by flipping data-theme on <html>.
        desk: "var(--desk)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        edge: "var(--edge)",
        "edge-soft": "var(--edge-soft)",
        ink: "var(--ink)",
        "ink-dim": "var(--ink-dim)",
        "ink-faint": "var(--ink-faint)",
        ember: "var(--ember)",
        "ember-soft": "var(--ember-soft)",
        moss: "var(--moss)",
        alert: "var(--alert)",
        "term-bg": "var(--term-bg)",
      },
      fontFamily: {
        sans: ["var(--font-ubuntu)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        window: "0 24px 60px -12px rgba(0, 0, 0, 0.55), 0 4px 16px rgba(0, 0, 0, 0.35)",
        "window-focus":
          "0 0 0 1px var(--ember-soft), 0 28px 70px -10px rgba(0, 0, 0, 0.65), 0 4px 20px rgba(0, 0, 0, 0.4)",
        taskbar: "0 -8px 30px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
