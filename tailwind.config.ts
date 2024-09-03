import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "var(--round)",
        sm: "calc(var(--round) * 0.75)",
        md: "calc(var(--round) * 1)",
        lg: "calc(var(--round) * 1.5)",
        xl: "calc(var(--round) * 2)",
        "2xl": "calc(var(--round) * 3)",
      },
      colors: {
        foreground: "rgba(var(--foreground))",
        text: "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        secondary: "hsl(var(--secondary))",
        "secondary+1": "hsl(var(--secondary-1))",
        "secondary+2": "hsl(var(--secondary-2))",
        "primary": "hsl(var(--primary))",
        "primary+1": "hsl(var(--primary-1))",
        "primary+2": "hsl(var(--primary-2))",
      }
    },
  },
  plugins: [],
};
export default config;
