
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFF2CC",
        primaryDark: "#FDB815",
        font: "#344248",
        darkYellow: "#FDB815",
        dark: "#344248",
        fontLight: "#C2C2C2",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};

        // /** @type {import('tailwindcss').Config} */
        // module.exports = {
        //   content: ["./src/**/*.{html,js,jsx}"],
        //   theme: {
        //     extend: {
        //       colors: {
        //         primary: "#FFF2CC",
        //         primaryDark: "#FDB815",
        //         font: "#344248",
        //         darkYellow: "#FDB815",
        //         dark: "#344248",
        //         fontLight: "#C2C2C2",
        //       },
        //     },
        //   },
        //   plugins: [],
        // };