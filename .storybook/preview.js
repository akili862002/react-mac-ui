import "../styles/storybook.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  backgrounds: {
    default: "light",
    values: [
      {
        name: "dark",
        value: "rgb(23, 28, 36)",
      },
      {
        name: "light",
        value: "white",
      },
    ],
  },
};
