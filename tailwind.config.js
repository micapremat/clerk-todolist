/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#1F9DBF',
        'high': '#BA1A39',
        'medium': '#CC921D',
        'low': '#D8C225'
      }
    },
    fontFamily: {
      'body': ['"Roboto", sans-serif']
    }
  },
  plugins: [],
}

