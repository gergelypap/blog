/** @type import("tailwindcss/tailwind-config").TailwindConfig */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./posts/**/*.{md,mdx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["ui-monospace", "Consolas", "monospace"],
    },
    extend: {
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(1rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        "fade-up": "fade-up .25s ease-in-out",
        "fade-in": "fade-in .15s ease-in",
      },
    },
  },
};
