/** @type import("tailwindcss/tailwind-config").TailwindConfig */
module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./posts/**/*.{md,mdx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["SF Mono", "Consolas", "monospace"],
    },
    extend: {
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(1rem)",
          },
          "60%": {
            transform: "translateY(-0.25rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up .15s ease-in-out",
      },
    },
  },
};
