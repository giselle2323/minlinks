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
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'ibm': ['IBM Plex Mono', 'monospace']
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
          '700': '#0e182a',
          '500': '#142035'
        },
        green: {
          'transparent': '#17CB49',
          'gradient': 'linear-gradient(#4DB68D, #8CC3AE)',
          'grad-one': '#4DB68D',
          'grad-two':' #8CC3AE'
        }
      }
    },
  },
  variants: {
    extend: {
      display: ['dark']
    },
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ]
}
