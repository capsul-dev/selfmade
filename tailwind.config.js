module.exports = {
  purge: ["./public/index.html", "./src/**/*.vue"],
  darkMode: "media", // or 'media' or 'class'
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
