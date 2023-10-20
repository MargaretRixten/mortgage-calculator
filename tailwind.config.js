/** @type {import('tailwindcss').Config} */

const colors = {
  baseInput: "#2A2B31",
  baseSecondary: "#242529",
  baseStroke: "#333535",
  baseBg: "#161616",
  accentPrimary: "#FBE54D",
  textDisabled: "#848484",
  textSecondary: "#D0D0D0",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
    },
    // fontSize: {
    //   base: ["16px", "22px"],
    // },
  },
  plugins: [],
};
