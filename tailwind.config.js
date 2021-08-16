const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const windmill = require('@windmill/react-ui/config');

module.exports = windmill({
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: {
          'light_500': '#0085FF',
        },
        gray:{
          700: '#707EAE'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
      // ...
    require('@tailwindcss/forms'),
  ],
})
