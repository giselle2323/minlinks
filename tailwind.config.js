const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: '',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: {
          'light_400': '#F4F7FE',
          'light_500': '#2563EB',
          'light_600': '#2B3674'
        },
        gray:{
          700: '#707EAE',
         
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
}
