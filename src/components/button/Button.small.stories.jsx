import Button from "./Button.jsx";
import CopyIcon from "../icons/CopyIcon.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// Figma source: Design System Scalable — All Platform V.2.1.0
//   ↳buttons-small — node 1921:4253
// DS Auditor handoff: design-system-handsoff/component-button-handoff-brief.md
// Token pattern: button / {style} / {type} / {role}
// Error type maps to the "destructive" token namespace in CSS variables.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: "Components/Button/General/Small",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
**Button — Small**

Small is for compact or dense UI elements where Medium would be too heavy — data table rows, filter bars, tag groups, compact panels, or inline actions.

**Sizing:** padding 6px · font 12px · radius 6px (unique) · icon 16×16px (unique) · icon-only 28×28px

**Note:** Badge is **not** supported on Small — this is a DS constraint, not a code limitation. Do not add Badge to Small without DS Auditor approval.

**Token pattern:** \`button / {style} / {type} / {role}\`

**Figma:** [↳buttons-small — Design System Scalable V.2.1.0](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi/)
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["primary", "neutral", "error"],
      description: "Color theme. Maps to Figma '🧩 Type'. `error` maps to the `destructive` token namespace.",
    },
    variant: {
      control: "inline-radio",
      options: ["filled", "outline", "lighter", "ghost"],
      description: "Visual style. Maps to Figma '🏵️ Style'. `outline` = Figma 'Stroke'.",
    },
    size: {
      control: "inline-radio",
      options: ["small"],
      description: "Button size. This story file is scoped to Small only.",
    },
    icon: { table: { disable: true } },
    iconPosition: {
      control: "inline-radio",
      options: ["none", "left", "right"],
      description: "Icon position. Ignored when `onlyIcon` is true.",
    },
    onlyIcon: {
      control: "boolean",
      description: "Renders a 28×28 icon-only button. Requires `icon` and `aria-label`.",
    },
    // Badge is NOT supported on Small — hide from controls
    badge:      { table: { disable: true } },
    showBadge:  { table: { disable: true } },
    badgeValue: { table: { disable: true } },
    children: { control: "text", description: "Label text." },
    disabled: { control: "boolean" },
    leftIcon:  { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    type: "primary",
    variant: "filled",
    size: "small",
    children: "Button",
    disabled: false,
    onlyIcon: false,
    iconPosition: "none",
  },
};

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground = {
  parameters: {
    docs: {
      description: {
        story: "Interactive sandbox — use the controls panel to try all approved type / style / icon combinations for the Small button. Badge is not available on Small.",
      },
    },
  },
  render: (args) => {
    const {
      type,
      variant,
      size,
      children,
      disabled,
      iconPosition,
      onlyIcon,
    } = args;

    const hasIcon = iconPosition !== "none" && !onlyIcon;

    return (
      <Button
        type={type}
        variant={variant}
        size={size}
        disabled={disabled}
        onlyIcon={onlyIcon}
        icon={hasIcon || onlyIcon ? <CopyIcon /> : undefined}
        iconPosition={iconPosition === "right" ? "right" : "left"}
      >
        {children}
      </Button>
    );
  },
};

// ── Shared helpers ────────────────────────────────────────────────────────────

const TYPES    = ["primary", "neutral", "error"];
const VARIANTS = ["filled", "outline", "lighter", "ghost"];

function Row({ label, children: content }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 68, flexShrink: 0, fontFamily: "var(--font-family-body)", fontSize: 12, color: "#888" }}>
        {label}
      </span>
      {content}
    </div>
  );
}

function Group({ children: content }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{content}</div>;
}

// ── Default ───────────────────────────────────────────────────────────────────

export const Default = {
  name: "Default",
  parameters: {
    docs: {
      description: {
        story: "Baseline reference — Primary · Filled · Small. Use for compact or dense UI elements where Medium would be too heavy.",
      },
    },
  },
  render: () => (
    <Button type="primary" variant="filled" size="small">Button</Button>
  ),
};

// ── All Types ─────────────────────────────────────────────────────────────────

export const AllTypes = {
  name: "All Types",
  parameters: {
    docs: {
      description: {
        story: "Primary · Neutral · Error with Filled style. Type meaning is the same across all sizes.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {TYPES.map((type) => (
        <Button key={type} type={type} variant="filled" size="small">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

// ── All Styles ────────────────────────────────────────────────────────────────

export const AllStyles = {
  name: "All Styles",
  parameters: {
    docs: {
      description: {
        story: "Filled · Outline · Lighter · Ghost with Primary type.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {VARIANTS.map((variant) => (
        <Button key={variant} type="primary" variant={variant} size="small">
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

// ── With Left Icon ────────────────────────────────────────────────────────────

export const WithLeftIcon = {
  name: "With Left Icon",
  parameters: {
    docs: {
      description: {
        story: "Icon on the left — 16×16px at Small size (unique to Small). Icon must semantically match the action.",
      },
    },
  },
  render: () => (
    <Group>
      {TYPES.map((type) => (
        <div key={type} style={{ display: "flex", gap: 12 }}>
          {VARIANTS.map((variant) => (
            <Button key={variant} type={type} variant={variant} size="small"
              icon={<CopyIcon />} iconPosition="left">
              Button
            </Button>
          ))}
        </div>
      ))}
    </Group>
  ),
};

// ── With Right Icon ───────────────────────────────────────────────────────────

export const WithRightIcon = {
  name: "With Right Icon",
  parameters: {
    docs: {
      description: {
        story: "Icon on the right indicates direction or continuation. Use sparingly.",
      },
    },
  },
  render: () => (
    <Group>
      {TYPES.map((type) => (
        <div key={type} style={{ display: "flex", gap: 12 }}>
          {VARIANTS.map((variant) => (
            <Button key={variant} type={type} variant={variant} size="small"
              icon={<CopyIcon />} iconPosition="right">
              Button
            </Button>
          ))}
        </div>
      ))}
    </Group>
  ),
};

// ── Icon Only ─────────────────────────────────────────────────────────────────

export const IconOnly = {
  name: "Icon Only",
  parameters: {
    docs: {
      description: {
        story: "Small icon-only = 28×28px. Exceeds WCAG 24×24px minimum touch target. Must include `aria-label`.",
      },
    },
  },
  render: () => (
    <Group>
      {TYPES.map((type) => (
        <div key={type} style={{ display: "flex", gap: 12 }}>
          {VARIANTS.map((variant) => (
            <Button key={variant} type={type} variant={variant} size="small"
              onlyIcon icon={<CopyIcon />} aria-label="Copy" />
          ))}
        </div>
      ))}
    </Group>
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled = {
  name: "Disabled",
  parameters: {
    docs: {
      description: {
        story: "Shared `button/disabled/*` tokens across all types and styles. Native `disabled` removes the button from tab order.",
      },
    },
  },
  render: () => (
    <Group>
      {VARIANTS.map((variant) => (
        <Row key={variant} label={variant}>
          <div style={{ display: "flex", gap: 12 }}>
            {TYPES.map((type) => (
              <Button key={type} type={type} variant={variant} size="small" disabled>
                Button
              </Button>
            ))}
          </div>
        </Row>
      ))}
    </Group>
  ),
};

// ── Focus ─────────────────────────────────────────────────────────────────────

export const Focus = {
  name: "Focus",
  parameters: {
    docs: {
      description: {
        story: "Keyboard focus ring — uses `:focus-visible`. Focus is a **blocking accessibility requirement**. Tab through the buttons below to verify the focus ring at Small size.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ margin: 0, fontFamily: "var(--font-family-body)", fontSize: 13, color: "#888" }}>
        Use <kbd style={{ fontFamily: "monospace", background: "#f0f0f0", padding: "1px 5px", borderRadius: 3, fontSize: 12 }}>Tab</kbd> to move focus and view the focus ring per type.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        {TYPES.map((type) => (
          <Button key={type} type={type} variant="filled" size="small">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {TYPES.map((type) => (
          <Button key={type} type={type} variant="outline" size="small">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  ),
};

// ── Light Mode ────────────────────────────────────────────────────────────────

export const LightMode = {
  name: "Light Mode",
  parameters: {
    docs: {
      description: {
        story: "All styles in explicit light mode context. Token values are theme-driven — no hardcoded overrides.",
      },
    },
  },
  render: () => (
    <div data-theme="light" style={{ padding: 24, background: "var(--color-bg-base, #ffffff)", borderRadius: 8 }}>
      <Group>
        {VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            <div style={{ display: "flex", gap: 12 }}>
              {TYPES.map((type) => (
                <Button key={type} type={type} variant={variant} size="small">Button</Button>
              ))}
            </div>
          </Row>
        ))}
      </Group>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode = {
  name: "Dark Mode",
  parameters: {
    docs: {
      description: {
        story: "All styles in dark mode via `data-theme=\"dark\"`. Verify Ghost and Lighter soft fills have sufficient contrast at Small size.",
      },
    },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: 24, background: "var(--color-bg-base, #1b1c22)", borderRadius: 8 }}>
      <Group>
        {VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            <div style={{ display: "flex", gap: 12 }}>
              {TYPES.map((type) => (
                <Button key={type} type={type} variant={variant} size="small">Button</Button>
              ))}
            </div>
          </Row>
        ))}
      </Group>
    </div>
  ),
};

// ── Type × Style Matrix ───────────────────────────────────────────────────────

export const TypeStyleMatrix = {
  name: "Type × Style Matrix",
  parameters: {
    docs: {
      description: {
        story: "All 12 approved type + style combinations at Small size. Primary visual QA reference.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 4, paddingLeft: 76 }}>
        {TYPES.map((type) => (
          <div key={type} style={{ width: 100, fontFamily: "var(--font-family-body)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {type}
          </div>
        ))}
      </div>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 68, flexShrink: 0, fontFamily: "var(--font-family-body)", fontSize: 12, color: "#888" }}>
            {variant}
          </span>
          {TYPES.map((type) => (
            <div key={type} style={{ width: 100 }}>
              <Button type={type} variant={variant} size="small">Button</Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ── AllVariants (legacy comprehensive view) ───────────────────────────────────
// Badge intentionally excluded — not supported on Small per DS handoff.

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

export const AllVariants = {
  name: "All Variants",
  parameters: {
    docs: {
      description: {
        story: "Comprehensive view of all approved style × type × state combinations for Small. Badge is excluded — not supported on Small.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

      <section>
        <SectionTitle>Default — text only</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} size="small">Button</Button>
        )} />
      </section>

      <section>
        <SectionTitle>Icon left</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} size="small" icon={<CopyIcon />} iconPosition="left">
            Button
          </Button>
        )} />
      </section>

      <section>
        <SectionTitle>Icon right</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} size="small" icon={<CopyIcon />} iconPosition="right">
            Button
          </Button>
        )} />
      </section>

      <section>
        <SectionTitle>Icon only</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} size="small" onlyIcon icon={<CopyIcon />} aria-label="Icon button" />
        )} />
      </section>

      <section>
        <SectionTitle>Disabled</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} size="small" disabled>Button</Button>
        )} />
      </section>

    </div>
  ),
};
