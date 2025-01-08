/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Nuntio: ["Nunito", "serif"],
        Playfair: ["Playfair Display", "serif"],
        Roboto: ["Roboto Slab", "system-ui"],
        Lora: ["Lora", "system-ui"],
      }
    },
  },
  plugins: [],
}