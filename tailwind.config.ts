import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1f7f6",
          100: "#dcece9",
          200: "#b9d9d3",
          300: "#90c1b8",
          400: "#5fa595",
          500: "#2e8a76",
          600: "#1f6f5e",
          700: "#165848",
          800: "#103f34",
          900: "#092a23",
        },
        accent: {
          50: "#fff7ec",
          100: "#fde8c7",
          200: "#f9cf91",
          300: "#f5b060",
          400: "#f19033",
          500: "#d7721e",
          600: "#b55814",
          700: "#8d4110",
          800: "#652e0f",
          900: "#421d0c",
        },
        secondary: {
          50: "#fdf3f6",
          100: "#fadbe6",
          200: "#f4b1cd",
          300: "#eb82b1",
          400: "#dc4f91",
          500: "#c23077",
          600: "#a02260",
          700: "#7e1a4b",
          800: "#591234",
          900: "#370a1f",
        },
        neutral: {
          50: "#faf7f3",
          100: "#ede3d6",
          200: "#dcc8ae",
          300: "#c4a578",
          400: "#a97f4b",
          500: "#8f6637",
          600: "#724e29",
          700: "#55381e",
          800: "#392414",
          900: "#201509",
        },
        night: {
          50: "#f6f6f8",
          100: "#e8e9ee",
          200: "#cdd0dd",
          300: "#a7acc5",
          400: "#8188ad",
          500: "#656d95",
          600: "#4d5577",
          700: "#39405a",
          800: "#252b3d",
          900: "#111521",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      spacing: {
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem",
        section: "clamp(3.5rem, 8vw, 6.5rem)",
        gutter: "clamp(1.25rem, 3vw, 2.5rem)",
        safe: "max(1rem, env(safe-area-inset-left))",
      },
      maxWidth: {
        prose: "65ch",
        "8xl": "90rem",
      },
      boxShadow: {
        elevation: "0 24px 40px -24px rgba(16, 63, 52, 0.28)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      backgroundImage: {
        "aztec-grid": "radial-gradient(circle at 1px 1px, rgba(46, 138, 118, 0.25) 1px, transparent 0)",
      },
      backgroundSize: {
        "grid-sm": "24px 24px",
      },
      transitionTimingFunction: {
        "soft-out": "cubic-bezier(0.21, 0.46, 0.24, 0.99)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#392414",
            maxWidth: "68ch",
            a: {
              color: "#2e8a76",
              fontWeight: "600",
              textDecoration: "none",
              borderBottom: "1px solid rgba(46, 138, 118, 0.4)",
              transition: "color 150ms ease, border-color 150ms ease",
              "&:hover": {
                color: "#1f6f5e",
                borderColor: "rgba(31, 111, 94, 0.6)",
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: "var(--font-display)",
              color: "#201509",
            },
            strong: {
              color: "#201509",
            },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
