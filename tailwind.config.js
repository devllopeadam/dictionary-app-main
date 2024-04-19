/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "mono": ["Roboto Mono", 'monospace'],
        "serif": ["Inter", 'sans-serif'],
        "sans-serif": ["Lora", 'serif']
      },
      backgroundColor: {
        "toggler": "var(--toggler)",
      },
      colors: {
        "search": "var(--search)",
        "toggler": "var(--toggler)",
        "info": "var(--info)",
        "fonts": "var(--fonts)",
        "purple": "#A445ED",
        "red": "#FF5252",
        "gray": {
          100: "#F4F4F4",
          200: "#E9E9E9",
          300: "#757575",
          400: "#3A3A3A",
          500: "#2D2D2D",
          600: "#1F1F1F",
        },
        "black": "#050505",
        "white": "#FFFFFF",
      },
    },
  },
  plugins: [],
};