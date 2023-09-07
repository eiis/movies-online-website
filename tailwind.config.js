/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue}', './index.html'],
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
    screens: {
      'sm': '375px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require('daisyui')],
}
