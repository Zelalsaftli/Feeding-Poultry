/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",   // يبحث عن أي ملف في الجذر
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
