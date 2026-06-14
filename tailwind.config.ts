import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f4efe6",
        "cream-2": "#ece5d8",
        ink: "#1d2a23",
        "ink-soft": "#2c3a32",
        moss: "#5c6f5e",
        clay: "#c46a4a",
        "clay-dark": "#a8532f",
        gold: "#b99a5b",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-karla)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(29, 42, 35, 0.08)",
        soft: "0 24px 50px -12px rgba(29, 42, 35, 0.15)",
        float: "0 30px 60px -20px rgba(29, 42, 35, 0.25)",
        premium: "0 40px 80px -20px rgba(0, 0, 0, 0.3)",
      },
      transitionTimingFunction: {
        "spring-smooth": "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
