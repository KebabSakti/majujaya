/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#364F6B",
        onPrimary: "#FFFFFF",
        secondary: "#3FC1C9",
        onSecondary: "#FFFFFF",
        variant: "#3C486B",
        onVariant: "#FFFFFF",
        surface: "#FFFFFF",
        onSurface: "#4C4C4C",
        background: "#F5F8FD",
        onBackground: "#4C4C4C",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
