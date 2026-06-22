import Button from "./Button.jsx";
import CopyIcon from "../icons/CopyIcon.jsx";

export default {
  title: "Components/Button/General/Large",
  component: Button,
  argTypes: {
    // Figma: "🧩 Type"
    type: {
      control: "inline-radio",
      options: ["primary", "neutral", "error"],
      description: "Color theme. Maps to Figma '🧩 Type'.",
    },
    // Figma: "🏵️ Style"
    variant: {
      control: "inline-radio",
      options: ["filled", "outline", "lighter", "ghost"],
      description: "Visual style. Maps to Figma '🏵️ Style'. 'outline' = Figma 'Stroke'.",
    },
    size: {
      control: "inline-radio",
      options: ["large"],
    },
    // Icon — single slot (left OR right, not both)
    icon: { table: { disable: true } },
    iconPosition: {
      control: "inline-radio",
      options: ["none", "left", "right"],
      description: "Icon position. Ignored when onlyIcon is on.",
    },
    onlyIcon: {
      control: "boolean",
      description: "Standalone 40×40 icon button — no label, no badge.",
    },
    // Badge — only when no icon
    badge: { table: { disable: true } },
    showBadge: {
      control: "boolean",
      description: "Show a badge alongside the label. Ignored when onlyIcon is on.",
    },
    badgeValue: {
      control: "text",
      description: "Badge content.",
      if: { arg: "showBadge", truthy: true },
    },
    children: { control: "text", description: "Label text." },
    disabled: { control: "boolean" },
    // hide internal/legacy props
    leftIcon:   { table: { disable: true } },
    rightIcon:  { table: { disable: true } },
    className:  { table: { disable: true } },
    icon:       { table: { disable: true } },
  },
  args: {
    type: "primary",
    variant: "filled",
    size: "large",
    children: "Button",
    disabled: false,
    onlyIcon: false,
    iconPosition: "none",
    showBadge: false,
    badgeValue: "2",
  },
};

export const Playground = {
  render: ({ iconPosition, showBadge, badgeValue, onlyIcon, ...args }) => {
    const hasIcon = iconPosition !== "none" && !showBadge;
    return (
      <Button
        {...args}
        onlyIcon={onlyIcon}
        icon={hasIcon || onlyIcon ? <CopyIcon /> : undefined}
        iconPosition={iconPosition === "right" ? "right" : "left"}
        badge={showBadge && !onlyIcon ? badgeValue : undefined}
      />
    );
  },
};

// ── AllVariants ─────────────────────────────────────────────────────────────
// Variant → applicable types (matches Figma component set)
const VARIANT_TYPES = {
  filled:  ["primary", "neutral", "error"],
  outline: ["primary", "neutral", "error"],
  lighter: ["primary", "neutral", "error"],
  ghost:   ["primary", "neutral", "error"],
};

const ALL_VARIANTS = Object.keys(VARIANT_TYPES);

function SectionTitle({ children }) {
  return (
    <h3 style={{
      fontFamily: "var(--font-family-body)",
      fontSize: 13,
      fontWeight: 600,
      color: "#888",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      margin: "0 0 12px",
    }}>
      {children}
    </h3>
  );
}

// One row per variant — columns are the types for that variant.
function VariantMatrix({ renderBtn }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {ALL_VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{
            width: 64,
            fontFamily: "var(--font-family-body)",
            fontSize: 12,
            color: "#888",
            flexShrink: 0,
          }}>
            {variant}
          </span>
          {VARIANT_TYPES[variant].map((type) => renderBtn(variant, type))}
        </div>
      ))}
    </div>
  );
}

export const AllVariants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

      <section>
        <SectionTitle>Default — text only</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant}>Button</Button>
        )} />
      </section>

      <section>
        <SectionTitle>Icon left</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} icon={<CopyIcon />} iconPosition="left">
            Button
          </Button>
        )} />
      </section>

      <section>
        <SectionTitle>Icon right</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} icon={<CopyIcon />} iconPosition="right">
            Button
          </Button>
        )} />
      </section>

      <section>
        <SectionTitle>With badge</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} badge={2}>Button</Button>
        )} />
      </section>

      <section>
        <SectionTitle>Icon only</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} onlyIcon icon={<CopyIcon />} aria-label="Icon button" />
        )} />
      </section>

      <section>
        <SectionTitle>Disabled</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} disabled>Button</Button>
        )} />
      </section>

    </div>
  ),
};
