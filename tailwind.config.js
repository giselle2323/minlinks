const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: '',
  purge:{
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [
        /data-theme$/,
      ]
    },
  },
  darkMode: 'media', // or 'media' or 'class'
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
         
        },
        dark: {
          '700': '#0e182a'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'dark', // first one will be the default theme
      'light',
    ],
  }
}
