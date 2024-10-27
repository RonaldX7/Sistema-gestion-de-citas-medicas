/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        paleBlue: '#EDF9FC',
        aqua: '#80DDDB',
        skyBlue: '#53CDE2',
        deepBlue: '#005792',
      },
    },
  },
  plugins: [],
}

