/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          500: '#4ade80',
          600: '#22c55e',
          700: '#16a34a',
        },
        dark: '#1f2937',
      }
    },
  },
  plugins: [],
}