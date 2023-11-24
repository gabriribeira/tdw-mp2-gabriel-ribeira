/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "320px",
      md: "640px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
    },
    display: ["group-hover"],
    animation: {
      wiggle: "wiggle 0.4s ease-in-out infinite",
      spinner: "spin 3s linear infinite",
    },
    keyframes: {
      wiggle: {
        "0%, 100%": { transform: "rotate(-0.3deg)" },
        "50%": { transform: "rotate(0.3deg)" },
      },
    },
  },
  plugins: [],
  variants: {
    scrollbar: ["rounded"],
  },
};
