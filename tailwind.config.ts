const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "./src/components/**/*.{js,ts,jsx,tsx,mdx}"),
    join(__dirname, "./src/components/*.{js.ts.jsx.tsx.mdx}"),
    join(__dirname, "./src/*.{js,ts,jsx,tsx,mdx}"),
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {},
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}
