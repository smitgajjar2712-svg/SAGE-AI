/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { custor: { orange: '#FF6A00', black: '#000000' } },
      borderRadius: { liquid: '999px' }
    }
  },
  plugins: []
};
