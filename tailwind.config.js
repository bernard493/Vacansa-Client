/** @type {import('tailwindcss').Config} */;
// @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@100&display=swap');



module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
      'workSans': ['Work Sans', 'sans-serif'],
    },
  },
  },
  plugins: [],
}

