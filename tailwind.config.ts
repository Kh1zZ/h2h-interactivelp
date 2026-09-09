import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        h2h: {
          blue: {
            primary: "#6FA8FF",
            sky: "#D6E9FF",
            deep: "#23448A",
            light: "#EFF6FF",
          },
          pink: {
            primary: "#FFA6D9",
            soft: "#FFE1F0",
            deep: "#E562A8",
            blush: "#FFF0F7",
          },
          cream: "#FFFCF8",
          ink: "#2563EB",
          muted: "#4B7BE5",
        },
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "cursive", "sans-serif"],
        sans: ["var(--font-nunito)", "sans-serif"],
      },
      boxShadow: {
        cute: "0 10px 25px -5px rgba(111, 168, 255, 0.15), 0 8px 10px -6px rgba(255, 166, 217, 0.15)",
        "cute-lg": "0 20px 35px -5px rgba(111, 168, 255, 0.2), 0 10px 15px -5px rgba(255, 166, 217, 0.2)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-gentle": "pulseGentle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGentle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(0.97)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
