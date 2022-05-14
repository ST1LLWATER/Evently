module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    extend: {
      border: ["last"],
    },
  },
  theme: {
    // Some useful comment
    fontFamily: {
      Rubik: ["Rubik", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
      Franklin: ["Libre Franklin", "sans-serif"],
      "Noto-Serif-Display": ["Noto Serif Display", "serif"],
    },
  },
  plugins: [],
};
