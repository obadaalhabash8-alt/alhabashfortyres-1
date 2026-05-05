import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ff8c00',
          'orange-dark': '#e07800',
          'orange-light': '#ffaa33',
          dark: '#1a1a1a',
          darker: '#0f0f0f',
          cream: '#faf8f4',
          'cream-dark': '#f0ece4',
          gold: '#d4a853',
          'gold-light': '#e8c070',
          gray: '#4a4a4a',
          'gray-light': '#8a8a8a',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern':
          "linear-gradient(135deg, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.75) 100%)",
        'card-gradient':
          'linear-gradient(180deg, transparent 40%, rgba(26,26,26,0.85) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
