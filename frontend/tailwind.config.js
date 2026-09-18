/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist Sans", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#fbfaff",

        primary: "#6d3df5",
        secondary: "#a586ff",

        "accent-blue": "#4F8CFF",
        "accent-purple": "#6d3df5",
        "accent-cyan": "#00E5FF",

        "surface-container-lowest": "#fbfaff",
        "surface-container-low": "#ffffff",
        "surface-container": "#f4effc",
        "surface-container-high": "#f1edfa",
        "surface-container-highest": "#eeeaf7",
        "surface-variant": "#f1edfa",

        "on-surface": "#15131d",
        "on-surface-variant": "#69657a",
        "on-primary": "#ffffff",
        "on-secondary": "#ffffff",

        outline: "#ddd6ef",
        "outline-variant": "#eeeaf7",

        error: "#e11d48",
      },
    },
  },
  plugins: [],
};