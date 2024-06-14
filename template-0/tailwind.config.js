const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        ...colors,
        main: {
          DEFAULT: '#121212',
        },
        'main-white': {
          DEFAULT: 'rgba(238, 238, 238, 0.4)',
          lighter: 'hsla(0,0%,100%,.1)',
          light: 'hsla(0,0%,93%,.8)',
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
}
