/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        estate: {
          dark: '#080B11',
          card: '#0F141F',
          panel: '#161C2B',
          accent: '#10B981',
          gold: '#F59E0B',
          indigo: '#6366F1',
        }
      }
    },
  },
  plugins: [],
}
