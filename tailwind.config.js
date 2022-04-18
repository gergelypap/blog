module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["SF Mono", "Consolas", "monospace"],
    },
    extend: {
      keyframes: {
        "fade-up": {
          from: {
            opacity: 0,
            transform: "translateY(1rem)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up .15s ease-in",
      },
    },
  },
};
