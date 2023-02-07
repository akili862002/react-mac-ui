const withBaseFeatureConfig = require("./config");

module.exports = withBaseFeatureConfig({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
});
