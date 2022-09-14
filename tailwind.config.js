/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "brick-to-r": "0.25rem 0.25rem black",
        "brick-to-l": "-0.25rem 0.25rem black"
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
