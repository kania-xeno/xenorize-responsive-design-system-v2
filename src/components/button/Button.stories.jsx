import Button from "./Button.jsx";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "error", "neutral"],
    },
    variant: {
      control: "select",
      options: ["filled", "stroke", "lighter", "ghost"],
    },
    size: {
      control: "select",
      options: ["large"],
    },
    onlyIcon: { control: "boolean" },
    disabled: { control: "boolean" },
    badge: { control: "text" },
    children: { control: "text" },
  },
  args: {
    type: "primary",
    variant: "filled",
    size: "large",
    children: "Button",
    disabled: false,
    onlyIcon: false,
  },
};

const SquareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// Default playground — use the Controls panel to flip type/variant/state.
export const Playground = {};

// Disabled
export const Disabled = {
  args: { disabled: true },
};

// Icon-only — requires aria-label
export const IconOnly = {
  args: {
    onlyIcon: true,
    leftIcon: <SquareIcon />,
    children: undefined,
    "aria-label": "Icon button",
  },
};

// With left + right icons
export const WithIcons = {
  args: {
    leftIcon: <SquareIcon />,
    rightIcon: <SquareIcon />,
  },
};

// With badge
export const WithBadge = {
  args: {
    rightIcon: <SquareIcon />,
    badge: 2,
  },
};

// Full matrix: every Type x Style combination
export const AllVariants = {
  render: () => {
    const types = ["primary", "neutral", "error"];
    const variants = ["filled", "stroke", "lighter", "ghost"];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {types.map((type) => (
          <div key={type} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ width: 70, fontFamily: "var(--font-family-body)", fontSize: 12, color: "#888" }}>
              {type}
            </span>
            {variants.map((variant) => (
              <Button key={variant} type={type} variant={variant}>
                Button
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
