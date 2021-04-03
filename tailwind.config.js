const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: process.argv.join(' ').includes('prod'),
    content: ['apps/**/*.{js,ts,jsx,tsx}', 'libs/**/*.{js,ts,jsx,tsx}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        gray: colors.trueGray,
        primary: '#4080E7',
        secondary: '#DF40E7',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
