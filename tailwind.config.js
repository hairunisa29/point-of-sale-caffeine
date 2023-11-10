/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["'Roboto'"],
      },
      colors: {
        primary: "#2457ca",
      },
    },
  },
  plugins: [],
};
