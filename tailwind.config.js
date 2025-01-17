/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#000000",
        "weather-secondary": "#2C2C2C",
      },
    },
    fontFamily:{
      Roboto:["Roboto, san-serif"],
    },
    container:{
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "760px",
    },
  },
  plugins: [],
}

