/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    navMenu: {
      font: "bold",
      color: "white",
      padding: " 1rem 10px",
      backgroundColor: "green",
    },
  },
  plugins: [],
};
// font-bold text-white py-[10px] rounded-[5px] px-[1rem] hover:bg-[#EE8129] hover:active:bg-[#2DAA5B]
