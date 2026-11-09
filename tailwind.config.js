/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ayur: {
          dark: '#0e2418',
          deep: '#153a27',
          primary: '#1c4d36',
          secondary: '#296b4c',
          accent: '#c49a45',
          gold: '#d4af37',
          goldLight: '#f6edda',
          ivory: '#fcfaf5',
          cream: '#f5efe4',
          sand: '#ece4d3',
          border: '#e4dcd0',
          card: '#ffffff',
          slate: '#2c3e35',
          muted: '#627a6f',
          vata: '#6366f1',
          vataLight: '#eef2ff',
          pitta: '#ea580c',
          pittaLight: '#fff7ed',
          kapha: '#059669',
          kaphaLight: '#ecfdf5',
        }
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'ayur': '0 4px 20px -2px rgba(28, 77, 54, 0.08), 0 2px 6px -1px rgba(28, 77, 54, 0.04)',
        'ayur-lg': '0 10px 30px -4px rgba(28, 77, 54, 0.12), 0 4px 12px -2px rgba(28, 77, 54, 0.06)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
