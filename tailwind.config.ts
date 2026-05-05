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
          // Orange
          orange: '#F97316',
          'orange-dark': '#EA580C',
          'orange-light': '#FDBA74',
          // Backgrounds
          dark: '#0F0F0F',
          darker: '#0F0F0F',
          surface: '#18181B',
          'surface-2': '#1f1f23',
          border: '#27272A',
          // Text
          white: '#FFFFFF',
          secondary: '#A1A1AA',
          muted: '#71717A',
          // Accent
          gold: '#D4AF37',
          'gold-light': '#e8c878',
          // Legacy aliases (keep so old references don't break)
          cream: '#18181B',
          'cream-dark': '#27272A',
          gray: '#71717A',
          'gray-light': '#A1A1AA',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern':
          'linear-gradient(135deg, rgba(15,15,15,0.92) 0%, rgba(15,15,15,0.65) 100%)',
        'card-gradient':
          'linear-gradient(180deg, transparent 30%, rgba(15,15,15,0.95) 100%)',
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
