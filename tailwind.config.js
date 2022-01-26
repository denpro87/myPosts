module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#CC4646',
          100: '#FFB8B8'
        }
      },
      fontFamily: {
        'pacifico': "'Pacifico', cursive"
      }
    },
  },
  plugins: [],
}
