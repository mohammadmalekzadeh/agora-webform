/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1E332D", // Dark Forest Green - primary background
        surface: "#27423B", // Deep Sage - cards, chat boxes
        accent: "#F3C86A", // Warm Gold - CTAs, AI elements
        text: {
          primary: "#FAF6E6", // Soft Cream Glow
          secondary: "#6B8B8A", // Muted Sage
        },
        stone: "#C7B69D", // Warm Sand - borders, inactive icons
        highlight: "#D88D56", // Terracotta - status, tags, soft warnings
      },
      fontFamily: {
        fa: ["Vazirmatn", "Dana", "sans-serif"],
        en: ["Inter", "sans-serif"],
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.2", fontWeight: "800" }],
        h2: ["32px", { lineHeight: "1.3", fontWeight: "700" }],
        h3: ["20px", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["15px", { lineHeight: "1.7", fontWeight: "400" }],
        caption: ["13px", { lineHeight: "1.5", fontWeight: "300" }],
      },
      maxWidth: { grid: "1280px" },
      borderRadius: {
        card: "16px",
        pill: "24px",
        input: "12px",
        badge: "20px",
      },
      boxShadow: {
        subtle: "0px 4px 20px rgba(0, 0, 0, 0.25)",
        glow: "0px 0px 25px rgba(243, 200, 106, 0.2)",
      },
      transitionTimingFunction: {
        "eased-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
