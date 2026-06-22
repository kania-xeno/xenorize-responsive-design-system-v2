import Button from "./Button.jsx";
import CopyIcon from "../icons/CopyIcon.jsx";

export default {
  title: "Components/Button/General/Large",
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

const TYPES = ["primary", "neutral", "error"];
const VARIANTS = ["filled", "stroke", "lighter", "ghost"];

// One row per `type`, one button per `variant` — `render(type, variant)`
// returns the Button for that cell.
function MatrixRow({ render }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {TYPES.map((type) => (
        <div key={type} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ width: 70, fontFamily: "var(--font-family-body)", fontSize: 12, color: "#888" }}>
            {type}
          </span>
          {VARIANTS.map((variant) => render(type, variant))}
        </div>
      ))}
    </div>
  );
}

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

// Comprehensive visual reference: every Type x Style combination, across
// every supported state/configuration (default, disabled, icon-only,
// with icons, with badge). This is the canonical page for design QA —
// if a state isn't represented here, add a section rather than a new story.
export const AllVariants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <section>
        <SectionTitle>Default</SectionTitle>
        <MatrixRow render={(type, variant) => (
          <Button key={variant} type={type} variant={variant}>
            Button
          </Button>
        )} />
      </section>

      <section>
        <SectionTitle>Disabled</SectionTitle>
        <MatrixRow render={(type, variant) => (
          <Button key={variant} type={type} variant={variant} disabled>
            Button
          </Button>
        )} />
      </section>

      <section>
        <SectionTitle>With left + right icons</SectionTitle>
        <MatrixRow render={(type, variant) => (
          <Button key={variant} type={type} variant={variant} leftIcon={<CopyIcon />} rightIcon={<CopyIcon />}>
            Button
          </Button>
        )} />
      </section>

      <section>
        <SectionTitle>With badge</SectionTitle>
        <MatrixRow render={(type, variant) => (
          <Button key={variant} type={type} variant={variant} badge={2}>
            Button
          </Button>
        )} />
      </section>

      <section>
        <SectionTitle>Icon only — left slot</SectionTitle>
        <MatrixRow render={(type, variant) => (
          <Button
            key={variant}
            type={type}
            variant={variant}
            onlyIcon
            leftIcon={<CopyIcon />}
            aria-label="Icon button"
          />
        )} />
      </section>

      <section>
        <SectionTitle>Icon only — right slot</SectionTitle>
        <MatrixRow render={(type, variant) => (
          <Button
            key={variant}
            type={type}
            variant={variant}
            onlyIcon
            rightIcon={<CopyIcon />}
            aria-label="Icon button"
          />
        )} />
      </section>
    </div>
  ),
};
