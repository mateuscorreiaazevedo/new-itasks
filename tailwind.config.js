/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Montserrat Alternates', 'sans-serif']
    },
    fontWeight: {
      normal: 400,
      semibold: 500,
      bold: 600
    },
    extend: {}
  },
  plugins: []
}
