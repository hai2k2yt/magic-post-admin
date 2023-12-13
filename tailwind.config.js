/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}, ./src/**/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/aspect-ratio'), require("@tailwindcss/typography"), require("@tailwindcss/forms")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#343A5F",
          "secondary": "#5C5470",
          "secondary-focus": "#B6BBC4",
          "neutral": "#F0ECE5",
          "success": "#3EAB83",
          "warning": "#B90A5B",
          "error": "#B90A5B",
        },
      },
    ],
  },
}

