/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lf: {
          navy: "#0D1B2A",
          "navy-hover": "#1a2d40",
          red: "#E8392A",
          "red-hover": "#c8301f",
          gray: "#6B7280",
          "gray-light": "#F9FAFB",
          "gray-border": "#E5E7EB",
          "input-bg": "#F9FAFB",
          "success": "#10B981",
          "success-bg": "#D1FAE5",
          "pending": "#F59E0B",
          "pending-bg": "#FEF3C7",
          "failed": "#EF4444",
          "failed-bg": "#FEE2E2",
          "ongoing": "#3B82F6",
          "ongoing-bg": "#DBEAFE",
          "declined": "#EF4444",
          "declined-bg": "#FEE2E2",
          "link": "#4F7FAF",
          "sidebar": "#FAFAFA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        modal: "0 8px 32px rgba(0,0,0,0.12)",
        card: "0 1px 4px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
