/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          darkest: '#051915',
          dark: '#092D27',
          DEFAULT: '#123F35',
          light: '#1B5448',
          accent: '#23695A',
        },
        champagne: {
          light: '#F3E5C8',
          DEFAULT: '#C6A15B',
          glow: '#DFBD75',
          dark: '#9A7B38',
        },
        ivory: {
          DEFAULT: '#F8F5ED',
          muted: '#EDE7D8',
        },
        charcoal: {
          DEFAULT: '#1A211F',
          dark: '#111614',
          light: '#28322F',
        },
        sage: {
          DEFAULT: '#DDE5DF',
          muted: '#B8C7BD',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
