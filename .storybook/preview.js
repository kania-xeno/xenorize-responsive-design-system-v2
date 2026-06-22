import React from "react";
import "../src/design-tokens/tokens.css";

// Wraps every story in a themed surface so [data-theme="dark"] token
// overrides (see src/design-tokens/tokens.css) apply, and gives the
// canvas a matching background color.
const withTheme = (Story, context) => {
  const theme = context.globals.theme || "light";
  return React.createElement(
    "div",
    {
      "data-theme": theme,
      style: {
        minHeight: "100vh",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme === "dark" ? "#1b1c22" : "#ffffff",
        transition: "background-color 0.15s ease",
      },
    },
    React.createElement(Story)
  );
};

/** @type {import('@storybook/react-vite').Preview} */
const preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Light / dark theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
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
