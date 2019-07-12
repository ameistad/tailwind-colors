const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          1000: '#474747'
        }
      }
    },
    container: {
      center: true,
      padding: '2rem'
    }
  }
}
