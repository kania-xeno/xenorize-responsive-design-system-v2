import "../src/design-tokens/tokens.css";

/** @type {import('@storybook/react-vite').Preview} */
const preview = {
  parameters: {
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "neutral", value: "#f4f4f6" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
