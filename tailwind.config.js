module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    minWidth: {
      "1/3": "33.3%",
      full: "100%",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
