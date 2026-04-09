/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef3fb',
          100: '#d6e2f5',
          500: '#1e5bb8',
          600: '#164a99',
          700: '#0f3a7a',
          900: '#0b3d91',
        },
        sun: {
          400: '#facc4d',
          500: '#f5a623',
          600: '#d98a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
