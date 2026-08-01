import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        obsidian: "var(--obsidian)",
        charcoal: "var(--charcoal)",
        charcoal2: "var(--charcoal-2)",
        flampiaRed: "#E50914",
        flampiaRuby: "#D92323",
        gold: "#c9a15d",
        goldBright: "#e8c687",
        beige: "var(--beige-text)",
        cream: "#faf7f1",
        ash: "var(--ash)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(.16,.84,.44,1)",
      },
    },
  },
  plugins: [],
};

export default config;
