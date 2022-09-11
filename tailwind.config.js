/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      // text size
      fontSize: {
        '2xl': '1.2rem',

        '4xl': '1.5rem',

        '5xl': '2rem',
        '6xl': '6rem',
        '7xl': '7rem',
        '8xl': '8rem',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
