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
        background: "var(--background)",
        backgroudSidebar: "var(--background-sidebar)",
        iconSidebar: "var(--icons-sidebar)",
        textSidebar: "var(--text-sidebar)",
        backgroundBox: "var(--background-box)",
        colorIcons: "var(--color-icons)",
        colorText: "var(--color-text)",
        colorBorder: "var(--color-border)",
        inputBackground: "var(--input-background)",
        hoverButtons: "var(--hover-buttons)",
      },
      animation: {
        "bounce-slow": "bounce 1s ease-in-out infinite",
        "bounce-delay-200": "bounce 1s ease-in-out 0.2s infinite",
        "bounce-delay-400": "bounce 1s ease-in-out 0.4s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
