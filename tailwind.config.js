module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#00e676',
        'primary-light': '#66ffa6',
        'primary-dark': '#00b248',
        secondary: '#b2ff59',
        'secondary-light': '#e7ff8c',
        'secondary-dark': '#7ecb20'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
