import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables manual toggling via the 'dark' class
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;