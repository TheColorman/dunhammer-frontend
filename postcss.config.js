module.exports = {
  plugins: {
    'postcss-preset-env': {
      features: {
        'nesting-rules': true,
      }
    },
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production"
      ? {
        "@fullhuman/postcss-purgecss": {
          content: [
            "./pages/**/*.{js,jsx,ts,tsx}",
            "./components/**/*.{js,jsx,ts,tsx}",
          ],
          defaultExtractor: (content) =>
            content.match(/[\w-/:]+(?<!:)/g) || [],
        },
      }
    : {})
  }
}