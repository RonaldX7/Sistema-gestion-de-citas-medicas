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
<<<<<<< HEAD
        ivory: '#F9F5F1', // Color blanco hueso mensajes de confirmación
      },
      animation: {
        'scale-in': 'scaleIn 0.5s ease-out',
      },
    keyframes: {
      scaleIn: {
        '0%': { opacity: 0, transform: 'scale(0.9)' },
        '100%': { opacity: 1, transform: 'scale(1)' },
      },
  plugins: [],
   }
  }
 }
}
=======
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: { colors: {
        paleBlue: '#EDF9FC',
        aqua: '#80DDDB',
        skyBlue: '#53CDE2',
        deepBlue: '#005792',
      },},
  },
  plugins: [],
}

>>>>>>> origin/josue
