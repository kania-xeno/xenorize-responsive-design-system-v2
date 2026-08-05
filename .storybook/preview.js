import React from "react";
import "../src/design-tokens/tokens.css";

// Wraps every story in a themed surface and applies data-theme to the
// document root so [data-theme="dark"] token overrides in tokens.css
// take full effect.
//
// WHY document.documentElement is required (not just a wrapper div):
// L3 component tokens are declared only in :root, e.g.:
//   --checkbox-card-bg-default: var(--color-surface-white)
// CSS resolves var() references inside custom-property values at their
// *declaration element* (:root). A child [data-theme="dark"] div
// re-declares L2 tokens, but L3 tokens were already frozen to the :root
// light value during inheritance. Setting data-theme on <html> makes
// :root match [data-theme="dark"], so L2 overrides propagate through
// the entire L3 token chain.
const withTheme = (Story, context) => {
  const theme = context.globals.theme || "light";

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    return () => {
      document.documentElement.removeAttribute("data-theme");
      document.body.removeAttribute("data-theme");
    };
  }, [theme]);

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
    options: {
      storySort: {
        order: [
          'Components',
          [
            'Checkbox',
            [
              'Overview',
              'Checkbox',
              ['Playground', 'States'],
              'Checkbox Label',
              ['Playground', 'Variants'],
              'Checkbox Card',
              ['Playground', 'Types', 'States', 'All Types × States'],
              'Dark Mode',
            ],
          ],
        ],
      },
    },
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
