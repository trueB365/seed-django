const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
    colors: {
      main: '#121212',
      liwhite: 'rgba(238, 238, 238, 0.4)',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      stone: colors.warmGray,
      sky: colors.lightBlue,
      neutral: colors.trueGray,
      gray: colors.coolGray,
      slate: colors.blueGray,
    },
    flex: {
      2: '0 0 auto',
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(transparent|current|white|purple|midnight|metal|tahiti|silver|bermuda)/,
    },
  ],
};
