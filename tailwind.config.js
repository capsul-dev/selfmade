module.exports = {
  purge: ["./public/index.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        checkbox: "4em auto",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
