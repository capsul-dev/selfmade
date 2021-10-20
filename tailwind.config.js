module.exports = {
  purge: ["./public/index.html", "./src/**/*.vue"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        checkbox: "4em auto",
      },
      animation: {
        fade: "fade 1s forwards",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
