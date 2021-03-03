module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#00e676',
        'primary-light': '#66ffa6',
        'primary-dark': '#00b248',
        secondary: '#76ff03',
        'secondary-light': '#b0ff57',
        'secondary-dark': '#32cb00'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
