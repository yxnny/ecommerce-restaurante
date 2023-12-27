/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#4CB379",
        secundary:"#B1ED94"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}