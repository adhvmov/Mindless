/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        cartBounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.35)' }
        },
        shimmer: {
          '0%': { 
            'background-position': '-1000px 0'
          },
          '100%': { 
            'background-position': '1000px 0'
          }
        }
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'cartBounce': 'cartBounce 0.3s ease-in-out',
        'shimmer': 'shimmer 2s ease-in-out'
      }
    },
  },
  plugins: [],
};
