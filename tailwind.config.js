/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue}', './index.html', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins'],
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateY(25%)' },
          '50%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        wiggle: 'wiggle .5s ease-in-out forwards',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin.cjs')],
}
