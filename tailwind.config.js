/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {  
    extend: {
      transitionProperty: {
        'bg': 'backgroundColor',
      },
      screens : {
        '3xl' : '1700px',
      },
    },
  },
  plugins: [],
}

