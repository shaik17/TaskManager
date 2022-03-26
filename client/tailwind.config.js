module.exports = {
  content: ["./pages/**/*.js","./components/**/*.js"],
  theme: {
    extend: {},
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1200px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '992px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '768px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '576px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}
