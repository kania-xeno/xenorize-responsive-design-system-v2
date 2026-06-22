import Button from "./Button.jsx";
import CopyIcon from "../icons/CopyIcon.jsx";

export default {
  title: "Components/Button/General/Large",
  component: Button,
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "error", "neutral"],
      // "secondary" (teal) is built and tokenised but hidden until
      // a product use-case is confirmed — re-add to options to enable.
    },
    variant: {
      control: "select",
      options: ["filled", "stroke", "outline", "lighter", "tonal", "ghost"],
    },
    size: {
      control: "select",
      options: ["large"],
    },
    onlyIcon: { control: "boolean" },
    disabled: { control: "boolean" },
    // leftIcon/rightIcon/badge are React nodes / raw values — driven by the
    // boolean toggles below instead of editing them directly.
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    badge: { table: { disable: true } },
    showLeftIcon: {
      control: "boolean",
      description: "Show the copy icon in the left slot (or as the icon when onlyIcon is on). Hidden when the badge is on.",
      if: { arg: "showBadge", truthy: false },
    },
    showRightIcon: {
      control: "boolean",
      description: "Show the copy icon in the right slot (or as the icon when onlyIcon is on). Hidden when the badge is on.",
      if: { arg: "showBadge", truthy: false },
    },
    showBadge: {
      control: "boolean",
      description: "Show a badge alongside the label (hides left/right icons). Not available when onlyIcon is on.",
      if: { arg: "onlyIcon", truthy: false },
    },
    badgeValue: {
      control: "text",
      description: "Badge content, shown when 'showBadge' is on.",
      if: { arg: "showBadge", truthy: true },
    },
    children: { control: "text" },
  },
  args: {
    type: "primary",
    variant: "filled",
    size: "large",
    children: "Button",
    disabled: false,
    onlyIcon: false,
    showLeftIcon: true,
    showRightIcon: false,
    showBadge: false,
    badgeValue: "2",
  },
};

// Default playground — use the Controls panel to flip every prop:
// type, variant, size, disabled, onlyIcon, label text, and the
// showLeftIcon/showRightIcon/showBadge toggles to place (or remove)
// icons and the badge.
//
// Content slot precedence:
// - onlyIcon: renders a single icon only (badge + label hidden)
// - showBadge on: renders label + badge only (icons hidden)
// - otherwise: renders leftIcon? + label + rightIcon?
export const Playground = {
  args: {
    showBadge: true
  },
  render:({ showLeftIcon, showRightIcon, showBadge, badgeValue, ...args }) => (
    <Button
      {...args}
      leftIcon={showLeftIcon ? <CopyIcon /> : undefined}
      rightIcon={showRightIcon ? <CopyIcon /> : undefined}
      badge={showBadge ? badgeValue : undefined}
    />
  )
};

// Variant → which types it supports
// "secondary" is hidden until a product use-case is confirmed.
const VARIANT_TYPES = {
  filled:  ["primary", "error", "neutral"],
  stroke:  ["primary", "error", "neutral"],
  outline: ["primary"],
  lighter: ["primary", "error", "neutral"],
  tonal:   ["primary"],
  ghost:   ["primary", "error", "neutral"],
};

const ALL_VARIANTS = Object.keys(VARIANT_TYPES);

function SectionTitle({ children }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-family-body)",
        fontSize: 13,
        fontWeight: 600,
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        margin: "0 0 12px",
      }}
    >
      {children}
    </h3>
  );
}

// One row per variant — columns are the applicable types for that variant.
function VariantMatrix({ renderBtn }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {ALL_VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ width: 64, fontFamily: "var(--font-family-body)", fontSize: 12, color: "#888", flexShrink: 0 }}>
            {variant}
          </span>
          {VARIANT_TYPES[variant].map((type) => renderBtn(variant, type))}
        </div>
      ))}
    </div>
  );
}

// Comprehensive visual reference: every Variant × Type combination across
// all supported states. Variant-first layout makes it easy to see which
// types exist per variant (not all combos are valid in the design system).
export const AllVariants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

      <section>
        <SectionTitle>Default</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant}>Button</Button>
        )} />
      </section>

      <section>
        <SectionTitle>Disabled</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} disabled>Button</Button>
        )} />
      </section>

      <section>
        <SectionTitle>With left + right icons</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} leftIcon={<CopyIcon />} rightIcon={<CopyIcon />}>
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
          <Button key={type} type={type} variant={variant} onlyIcon leftIcon={<CopyIcon />} aria-label="Icon button" />
        )} />
      </section>

    </div>
  ),
};
