/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fbf3ee",
        creamDeep: "#f4e6de",
        ink: "#2c231f",
        inkSoft: "#5c4f49",
        rose: "#c17e8b",
        roseDark: "#a85e6d",
        rosePale: "#f3d9de",
        gold: "#c9a15a",
        white: "#ffffff",
        line: "rgba(44,35,31,0.1)",
      },
      boxShadow: {
        luxe: "0 20px 50px -25px rgba(44,35,31,0.35)",
        soft: "0 16px 40px -28px rgba(44,35,31,0.4)",
      },
      fontFamily: {
        sans: ["Jost", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        script: ["Alex Brush", "cursive"],
      },
      maxWidth: {
        luxe: "1240px",
      },
      animation: {
        "ping-soft": "ping 2.2s ease-out infinite",
      },
      keyframes: {
        ping: {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
