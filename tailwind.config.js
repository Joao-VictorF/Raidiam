/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        raidiamGray: '#666666',
        raidiamDarkBlue: '#003366',
        raidiamLightBlue: '#0099CC'
      }
    }
  },
  variants: {},
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}
