/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: "#FB0E08",
        background: "#CF110C",
        secondary: "#E9E6EE",
      },
    },
  },
  plugins: [],
};
