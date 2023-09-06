/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue}', './index.html', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins'],
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin.cjs')],
}
