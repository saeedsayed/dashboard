/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        hover: 'var(--hover-color)',
        'main-bg': 'var(--main-bg-color)',
        'section-bg': 'var(--section-bg-color)',
        'primary-text': 'var(--primary-text-color)',
        'sub-text': 'var(--sub-text-color)',
        border: 'var(--border-color)'
      }
    },
  },
  plugins: [],
}

