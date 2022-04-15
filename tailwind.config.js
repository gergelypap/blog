module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["SF Mono", "Consolas", "monospace"],
    },
  },
};
