/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#09090b",
        cloud: "#f7f7f8",
        line: "rgb(var(--line) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        brand: {
          50: "#ecfeff",
          500: "#06b6d4",
          600: "#0891b2"
        },
        ember: "#f97316",
        mint: "#10b981"
      },
      boxShadow: {
        soft: "0 18px 70px rgba(15, 23, 42, 0.12)",
        glow: "0 0 0 1px rgba(255,255,255,.08), 0 24px 80px rgba(6,182,212,.16)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
