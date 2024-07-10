import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black": "#111111",
        "semi-black": "#212121",
        "gray": "#B3B8B8",
        "accent": "#24A1DE",
        "white": "#F1F1F1"
      }
    },
  },
  plugins: [],
};
export default config;
