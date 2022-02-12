const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.fuchsia,
        secondary: colors.slate,
        cancel: colors.red,
        success: colors.green,
        "primary-background": "#38093b",
        "from-gradient": colors.blue,
        "to-gradient": colors.purple,
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    }
  },
  plugins: [
    require("tailwindcss-radix")(),
  ],
}