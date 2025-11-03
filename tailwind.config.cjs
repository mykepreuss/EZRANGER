/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#e6fffc',
          200: '#99f3eb',
          500: '#00c2b8',
          700: '#008985',
          900: '#004440',
        },
        mango: {
          100: '#ffe4bf',
          300: '#ffcc85',
          500: '#ffb74d',
          700: '#f28a00',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
