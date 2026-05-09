import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Orange (Consistent in both themes)
          orange: '#F97316',
          'orange-dark': '#EA580C',
          'orange-light': '#FDBA74',
          
          // Theme-aware colors (mapped to CSS variables)
          dark: 'var(--brand-bg)',
          darker: 'var(--brand-bg-alt)',
          surface: 'var(--brand-surface)',
          'surface-2': 'var(--brand-surface-2)',
          border: 'var(--brand-border)',
          white: 'var(--brand-text-primary)',
          secondary: 'var(--brand-text-secondary)',
          muted: 'var(--brand-text-muted)',
          
          // Accents
          gold: '#D4AF37',
          nardo: '#9B9EA0',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      backgroundImage: {
        'card-gradient':
          'linear-gradient(180deg, transparent 30%, rgba(15,15,15,0.95) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
}


export default config
