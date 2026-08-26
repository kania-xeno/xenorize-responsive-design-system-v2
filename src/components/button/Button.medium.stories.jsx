import Button from "./Button.jsx";
import CopyIcon from "../../icons/CopyIcon.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// Figma source: Design System Scalable — All Platform V.2.1.0
//   ↳buttons-medium — node 1921:3648
// DS Auditor handoff: design-system-handsoff/component-button-handoff-brief.md
// Token pattern: button / {style} / {type} / {role}
// Error type maps to the "destructive" token namespace in CSS variables.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: "Components/Button/General/Medium",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
**Button — Medium**

Medium is the default size for most UI contexts — forms, cards, dialogs, side panels, and page-level action areas. When no special size is required, use Medium.

**Sizing:** padding 8px · font 14px · radius 8px · icon-only 36×36px · icon 20×20px

**Token pattern:** \`button / {style} / {type} / {role}\`

**Note:** Badge is supported on Medium. \`error\` type maps to the \`destructive\` token namespace.

**Figma:** [↳buttons-medium — Design System Scalable V.2.1.0](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi/)
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
      options: ["medium"],
      description: "Button size. This story file is scoped to Medium only.",
    },
    icon: { table: { disable: true } },
    iconPosition: {
      control: "inline-radio",
      options: ["none", "left", "right"],
      description: "Icon position. Ignored when `onlyIcon` is true or `badge` is set.",
    },
    onlyIcon: {
      control: "boolean",
      description: "Renders a 36×36 icon-only button. Requires `icon` and `aria-label`.",
    },
    badge: { table: { disable: true } },
    showBadge: {
      control: "boolean",
      description: "Show a badge pill alongside the label. Badge and icon cannot appear together.",
    },
    badgeValue: {
      control: "text",
      description: "Badge content — should reflect live data, not static decoration.",
      if: { arg: "showBadge", truthy: true },
    },
    children: { control: "text", description: "Label text." },
    disabled: { control: "boolean" },
    leftIcon:  { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    type: "primary",
    variant: "filled",
    size: "medium",
    children: "Button",
    disabled: false,
    onlyIcon: false,
    iconPosition: "none",
    showBadge: false,
    badgeValue: "2",
  },
};

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground = {
  args: {
    showBadge: false,
  },
  parameters:{
    docs: {
      description: {
        story: "Interactive sandbox — use the controls panel to try all approved type / style / icon combinations for the Medium button.",
      },
    },
  },
  render:(args) => {
    const {
      type,
      variant,
      size,
      children,
      disabled,
      iconPosition,
      showBadge,
      badgeValue,
      onlyIcon,
    } = args;

    const hasIcon = iconPosition !== "none" && !showBadge && !onlyIcon;

    return (
      <Button
        type={type}
        variant={variant}
        size={size}
        disabled={disabled}
        onlyIcon={onlyIcon}
        icon={hasIcon || onlyIcon ? <CopyIcon /> : undefined}
        iconPosition={iconPosition === "right" ? "right" : "left"}
        badge={showBadge && !onlyIcon ? badgeValue : undefined}
      >
        {children}
      </Button>
    );
  }
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
        story: "Baseline reference — Primary · Filled · Medium. Medium is the default size for most UI contexts. When no special size is required, use Medium.",
      },
    },
  },
  render: () => (
    <Button type="primary" variant="filled" size="medium">Button</Button>
  ),
};

// ── All Types ─────────────────────────────────────────────────────────────────

export const AllTypes = {
  name: "All Types",
  parameters: {
    docs: {
      description: {
        story: "Primary · Neutral · Error with Filled style. **Primary** = main CTA. **Neutral** = supporting action. **Error** = destructive / irreversible action only.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {TYPES.map((type) => (
        <Button key={type} type={type} variant="filled" size="medium">
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
        story: "Filled · Outline · Lighter · Ghost with Primary type. Visual weight descends left to right.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {VARIANTS.map((variant) => (
        <Button key={variant} type="primary" variant={variant} size="medium">
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
        story: "Icon on the left reinforces or clarifies the label. The icon must semantically match the action.",
      },
    },
  },
  render: () => (
    <Group>
      {TYPES.map((type) => (
        <div key={type} style={{ display: "flex", gap: 12 }}>
          {VARIANTS.map((variant) => (
            <Button key={variant} type={type} variant={variant} size="medium"
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
        story: "Icon on the right indicates direction, expansion, or continuation. Use sparingly.",
      },
    },
  },
  render: () => (
    <Group>
      {TYPES.map((type) => (
        <div key={type} style={{ display: "flex", gap: 12 }}>
          {VARIANTS.map((variant) => (
            <Button key={variant} type={type} variant={variant} size="medium"
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
        story: "Visible label is hidden but must be present in code via `aria-label`. Medium icon-only = 36×36px.",
      },
    },
  },
  render: () => (
    <Group>
      {TYPES.map((type) => (
        <div key={type} style={{ display: "flex", gap: 12 }}>
          {VARIANTS.map((variant) => (
            <Button key={variant} type={type} variant={variant} size="medium"
              onlyIcon icon={<CopyIcon />} aria-label="Copy" />
          ))}
        </div>
      ))}
    </Group>
  ),
};

// ── With Badge ────────────────────────────────────────────────────────────────

export const WithBadge = {
  name: "With Badge",
  parameters: {
    docs: {
      description: {
        story: "Badge supported on Large and Medium only — not Small. Badge and icon cannot appear together.",
      },
    },
  },
  render: () => (
    <Group>
      {TYPES.map((type) => (
        <div key={type} style={{ display: "flex", gap: 12 }}>
          {VARIANTS.map((variant) => (
            <Button key={variant} type={type} variant={variant} size="medium" badge={3}>
              Button
            </Button>
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
              <Button key={type} type={type} variant={variant} size="medium" disabled>
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
        story: "Keyboard focus ring — uses `:focus-visible`. Visible focus is a **blocking accessibility requirement**. Tab through the buttons below to verify.",
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
          <Button key={type} type={type} variant="filled" size="medium">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {TYPES.map((type) => (
          <Button key={type} type={type} variant="outline" size="medium">
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
                <Button key={type} type={type} variant={variant} size="medium">Button</Button>
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
        story: "All styles in dark mode via `data-theme=\"dark\"`. Token values switch automatically. Verify Ghost and Lighter soft fills have sufficient contrast against the dark surface.",
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
                <Button key={type} type={type} variant={variant} size="medium">Button</Button>
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
        story: "All 12 approved type + style combinations (3 types × 4 styles). Primary visual QA reference.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 4, paddingLeft: 76 }}>
        {TYPES.map((type) => (
          <div key={type} style={{ width: 112, fontFamily: "var(--font-family-body)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>
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
            <div key={type} style={{ width: 112 }}>
              <Button type={type} variant={variant} size="medium">Button</Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ── AllVariants (legacy comprehensive view) ───────────────────────────────────

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
        story: "Comprehensive view of all approved style × type × state combinations for Medium.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

      <section>
        <SectionTitle>Default — text only</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} size="medium">Button</Button>
        )} />
      </section>

      <section>
        <SectionTitle>Icon left</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} size="medium" icon={<CopyIcon />} iconPosition="left">
            Button
          </Button>
        )} />
      </section>

      <section>
        <SectionTitle>Icon right</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} size="medium" icon={<CopyIcon />} iconPosition="right">
            Button
          </Button>
        )} />
      </section>

      <section>
        <SectionTitle>With badge</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} size="medium" badge={2}>Button</Button>
        )} />
      </section>

      <section>
        <SectionTitle>Icon only</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} size="medium" onlyIcon icon={<CopyIcon />} aria-label="Icon button" />
        )} />
      </section>

      <section>
        <SectionTitle>Disabled</SectionTitle>
        <VariantMatrix renderBtn={(variant, type) => (
          <Button key={type} type={type} variant={variant} size="medium" disabled>Button</Button>
        )} />
      </section>

    </div>
  ),
};
