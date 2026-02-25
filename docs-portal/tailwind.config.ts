import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#1a1a1a',
        primary: '#00d4ff',
        accent: '#ff00d4',
        text: '#e0e0e0',
        muted: '#a0a0a0'
      }
    }
  },
  plugins: []
} satisfies Config;
