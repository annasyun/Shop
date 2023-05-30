/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#f96162",
      },
      backgroundImage: {
        banner: `url('../public/assets/img/bannerImg.jpg')`,
      },
    },
  },
  plugins: [],
};
