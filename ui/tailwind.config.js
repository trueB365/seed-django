const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        main: {
          DEFAULT: '#121212',
        },
        'main-white': {
          DEFAULT: 'rgba(238, 238, 238, 0.4)',
          lighter: 'hsla(0,0%,100%,.1)',
        },
      },
      flex: {
        2: '0 0 auto',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(transparent|current|white|purple|midnight|metal|tahiti|silver|bermuda)/,
    },
  ],
};
