import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Raleway"', "sans-serif"]
      },
      colors: {
        purple: "#6B21A8",
        gray: {
          light: "#d1d5db",
          DEFAULT: "#6b7280",
          dark: "#374151"
        }
      }
    },
  },
  plugins: [],
};
export default config;
