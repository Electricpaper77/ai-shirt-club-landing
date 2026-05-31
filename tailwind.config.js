/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: "#05070d",
        ink: "#090d18",
        steel: "#11192b",
        frost: "#eaf4ff",
        cyan: "#62e8ff",
        violet: "#8b6fff",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 60px rgba(98, 232, 255, 0.18)",
        violet: "0 0 80px rgba(139, 111, 255, 0.18)",
      },
    },
  },
  plugins: [],
};
