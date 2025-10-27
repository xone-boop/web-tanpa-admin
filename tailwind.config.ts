import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CD3F39",
        dark: "#2F1C2E",
        surface: "#F7EAEA",
        accent: "#E9A6A6",
        textDark: "#2E2E2E",
        textLight: "#F9F9F9"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      borderRadius: {
        xl: "1.25rem"
      },
      boxShadow: {
        card: "0 12px 40px -20px rgba(47, 28, 46, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
