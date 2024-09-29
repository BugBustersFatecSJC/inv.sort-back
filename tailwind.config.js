module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          700: '#8B4513',
        },
        brorange: {
          800: '#DDA059',
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}