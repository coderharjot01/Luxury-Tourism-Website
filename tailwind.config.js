/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sunrise: {
          light: '#FFB17A',
          DEFAULT: '#FF8C42',
          dark: '#E06B22',
        },
        saffron: {
          light: '#FFD39B',
          DEFAULT: '#FF9F1C',
          dark: '#D47E0B',
        },
        ganga: {
          light: '#98C1D9',
          DEFAULT: '#3D5A80',
          dark: '#1D2D44',
          teal: '#2A9D8F',
        },
        forest: {
          light: '#52B788',
          DEFAULT: '#2D6A4F',
          dark: '#1B4332',
        },
        cream: {
          light: '#FFFDF9',
          DEFAULT: '#FAF9F6',
          dark: '#F4F1EA',
        },
        gold: {
          light: '#E6D5B8',
          DEFAULT: '#C5A880',
          dark: '#9A7E56',
        },
        charcoal: {
          light: '#2B322F',
          DEFAULT: '#1E2522',
          dark: '#121614',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
