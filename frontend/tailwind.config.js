/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080f",

        primary: "#818cf8",
        secondary: "#a78bfa",

        "surface-container-lowest": "#020205",
        "surface-container-low": "#09090f",
        "surface-container": "#0d1324",
        "surface-container-high": "#121b33",
        "surface-container-highest": "#1c263d",
        "surface-variant": "#141b2d",

        "on-surface": "#dee5ff",
        "on-surface-variant": "#94a3b8",
        "on-primary": "#000000",
        "on-secondary": "#280067",

        outline: "#40485d",
        "outline-variant": "#252b3d",

        error: "#ff6e84",
      },
    },
  },
  plugins: [],
};