module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}"],
  options: {
    safelist: [
      'dark'
    ]
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
          'light_600': '#2B3674',
          'light_700': '#18243b',
        },
        gray:{
          700: '#707EAE',
         
        },
        dark: {
          '700': '#131419',
          '500': '#142035'
        },
        green: {
          'transparent': '#17CB49',
          'gradient': 'linear-gradient(#E7755F, #E7755F)',
          'grad-one': '#f2c384',
          'grad-two':'#f2c384',
          "brand-04": "rgb(74 222 128)"
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
    require("@tailwindcss/forms")
  ]
}
