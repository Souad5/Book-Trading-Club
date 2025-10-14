/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    base: false, // <— key line: don't touch html/body
    // themes: false, // (optional) if you don't want any theme at all
  },
  theme: {
    extend: {
      colors: {
        // Earthy palette
        leaf: {
          50: '#f3faf3',
          100: '#e5f5e6',
          200: '#c7e9c9',
          300: '#a3d9a7',
          400: '#6fc477',
          500: '#3aa34b',
          600: '#2f833d',
          700: '#276935',
          800: '#21542d',
          900: '#1b4527',
        },
        soil: {
          50: '#f7f3f0',
          100: '#efe7df',
          200: '#d9c8ba',
          300: '#c1a892',
          400: '#9f7e61',
          500: '#7e5a3b',
          600: '#67482f',
          700: '#523a27',
          800: '#443225',
          900: '#35281e',
        },
        sand: {
          50: '#faf8f4',
          100: '#f5f0e6',
          200: '#ebe0cd',
          300: '#dfc8a9',
          400: '#cfb07f',
          500: '#b28c4b',
          600: '#8f6e35',
          700: '#76592b',
          800: '#624a26',
          900: '#4f3b1f',
        },
        accent: '#2ec4b6', // modern vibrant accent for CTAs
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'Apple Color Emoji',
          'Segoe UI Emoji',
        ],
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};
