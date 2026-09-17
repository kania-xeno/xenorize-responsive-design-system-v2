import React from "react";
import CompactButton from "./CompactButton.jsx";
import CloseLine from "../../icons/CloseLine.jsx";
import CrossSmall from "../../icons/CrossSmall.jsx";
import CopyIcon from "../../icons/CopyIcon.jsx";
import SearchIcon from "../../icons/SearchIcon.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// Figma source: Design System Scalable — All Platform V.2.1.0
//   ↳button-compact — node 2285:642 · page ❖ Button
//   File key: 0aVnOgjVWH1YL8JCnjXTBi
// Preflight: DT-R0-F · DT-R1 · DT-R2-A · DT-R2-A.1 (2026-09-17)
//
// 64 Figma design combinations:
//   4 styles (Ghost · Stroke · Modifiable · White)
//   × 4 visual states (Default · Hover · Active · Disabled)
//   × 2 sizes (Large 24×24 · Medium 20×20)
//   × 2 radius modes (Off=6px · On=999px)
//
// Hover and Active are CSS pseudo-class states, NOT a public React prop.
// They are demonstrated through real interactive stories below.
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared story helpers ──────────────────────────────────────────────────────

const VARIANTS = ["ghost", "stroke", "modifiable", "white"];

const LABEL_STYLE = {
  fontFamily: "var(--font-family-body)",
  fontSize: 11,
  fontWeight: 600,
  color: "#888",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const SUB_STYLE = {
  fontFamily: "var(--font-family-body)",
  fontSize: 11,
  color: "#aaa",
};

function Label({ children }) {
  return <span style={LABEL_STYLE}>{children}</span>;
}

function Sub({ children }) {
  return <span style={SUB_STYLE}>{children}</span>;
}

function Row({ label, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 72, flexShrink: 0, ...SUB_STYLE }}>{label}</span>
      {children}
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 4 }}>
        <Label>{title}</Label>
        {subtitle && <Sub>{subtitle}</Sub>}
      </div>
      {children}
    </section>
  );
}

function Stack({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {children}
    </div>
  );
}

function Inline({ children }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 12 }}>{children}</div>;
}

function Kbd({ children }) {
  return (
    <kbd style={{
      fontFamily: "monospace",
      fontSize: 11,
      background: "#f0f0f0",
      color: "#333",
      padding: "1px 5px",
      borderRadius: 3,
      border: "1px solid #ddd",
    }}>
      {children}
    </kbd>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: "Components/Button/Compact Button/General",
  component: CompactButton,
  parameters: {
    docs: {
      description: {
        component: `
**CompactButton — Icon-only compact action button**

A minimal icon button for compact UI contexts: toolbar actions, table row controls,
close targets, and inline contextual controls. It is the only button in the design
system that is permanently icon-only.

**Figma:** ↳button-compact · node 2285:642 · page ❖ Button
(Design System Scalable — All Platform V.2.1.0)

---

**Variants (🏵️ Style)**

| Variant | Rest appearance | When to use |
|---|---|---|
| \`ghost\` | Transparent | Low-emphasis actions on any surface |
| \`stroke\` | White bg + 1px border + drop shadow | Needs visual separation; matches card elevation |
| \`modifiable\` | Transparent (like ghost) | Actions that modify inline content |
| \`white\` | White bg + drop shadow | On coloured / image surfaces; matches Stroke elevation |

**Sizes (📏 Size)**

| Size | Container | Icon slot | Padding |
|---|---|---|---|
| \`large\` | 24×24 px | 20×20 px | 2px |
| \`medium\` | 20×20 px | 18×18 px | 1px |

**Geometry is locked.** Do not change width, height, padding, or icon slot in consumer code.

---

**Props**

| Prop | Type | Default | Notes |
|---|---|---|---|
| \`icon\` | ReactNode | — | Required. Must respect \`currentColor\`. |
| \`variant\` | ghost \| stroke \| modifiable \| white | \`"ghost"\` | — |
| \`size\` | large \| medium | \`"large"\` | — |
| \`fullRadius\` | boolean | \`false\` | \`true\` → pill shape (radius-full, 999px) |
| \`disabled\` | boolean | \`false\` | Native HTML disabled |
| \`type\` | button \| submit \| reset | \`"button"\` | — |
| \`aria-label\` | string | — | Required unless \`aria-labelledby\` is provided |
| \`aria-labelledby\` | string | — | Element ID whose text names the button |
| \`className\` | string | \`""\` | Appended to base class list |
| \`ref\` | Ref | — | Forwarded to \`<button>\` (React 19) |

All other props are forwarded to the native \`<button>\` element via \`...rest\`.

---

**Accessible name — blocking requirement**

CompactButton has no visible label text. Every instance **must** provide either
\`aria-label\` or \`aria-labelledby\`. A dev warning fires in non-production
environments when neither is present.

---

**Hover and Active states**

Hover and Active are CSS pseudo-class interaction states, not a public React prop.
The component has no \`state\` prop. Interact with the stories below using a pointer
or keyboard to observe all four states.

---

**Designer decisions (do not change)**

- **MOD-01** — Modifiable/Active border reuses \`--button-compact-bg-default\` (a fill token) as its inset border color. This is an accepted designer decision.
- **SEM-02** — \`--button-compact-icon-active\` fires on \`:hover\`; \`--button-compact-icon-inverse\` fires on \`:active\`. Token names are inverted relative to CSS state names. Implement exactly.
- **DD-VIS-01** — Modifiable/Active contrast ~1.03:1 (Light) / ~1.28:1 (Dark). Does **not** meet WCAG 1.4.11 Non-Text Contrast. This is a designer-accepted exception for a transient interaction state. Do not suppress it or relabel it as accessible.

---

**Do:**
- Provide \`aria-label\` or \`aria-labelledby\` on every instance
- Use \`CloseLine\` (or another icon that respects \`currentColor\`) from \`src/icons/\`
- Keep the visible focus ring — it is required for keyboard accessibility
- Use \`large\` (default) unless the layout genuinely requires \`medium\`

**Don't:**
- Add a \`state\` prop or simulate hover/active in React
- Use this component for navigation — use a Link component instead
- Pass hardcoded size/padding overrides that break the locked geometry
- Suppress the accessible-name dev warning without adding a real \`aria-label\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: VARIANTS,
      description: "Visual style. Maps to Figma '🏵️ Style'.",
    },
    size: {
      control: "inline-radio",
      options: ["large", "medium"],
      description: "Container size. `large` = 24×24 px (icon 20×20). `medium` = 20×20 px (icon 18×18).",
    },
    fullRadius: {
      control: "boolean",
      description: "When `true`, applies `border-radius: var(--radius-full)` (999 px — pill shape). Maps to Figma '⭕️ Full Radius = On'.",
    },
    disabled: {
      control: "boolean",
      description: "Native HTML `disabled`. Removes the button from the tab order. All variants render transparent with disabled icon color.",
    },
    "aria-label": {
      control: "text",
      description: "Accessible name for screen readers. Required unless `aria-labelledby` is provided — this is a blocking accessibility requirement.",
    },
    // icon is a React node — not configurable via standard controls; documented through stories
    icon: { table: { disable: true } },
    // Internal/advanced props hidden from the controls panel
    "aria-labelledby": { table: { disable: true } },
    type:             { table: { disable: true } },
    className:        { table: { disable: true } },
    ref:              { table: { disable: true } },
  },
  args: {
    variant: "ghost",
    size: "large",
    fullRadius: false,
    disabled: false,
    "aria-label": "Close",
  },
};


// ── Playground ────────────────────────────────────────────────────────────────

export const Playground = {
  args: {
    variant: "stroke"
  },
  parameters:{
    docs: {
      description: {
        story:
          "Interactive sandbox. Use the Controls panel to change variant, size, radius, and disabled state. " +
          "Hover and Active are live CSS states — interact with the button to observe them. " +
          "Tab to the button with a keyboard to see the focus ring.",
      },
    },
  },
  render:(args) => (
    <CompactButton {...args} icon={<CloseLine />} />
  )
};


// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants = {
  name: "Variants",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All four variants at Large/Off/Default. " +
          "Hover over each to see the hover state. Click to see the active state. " +
          "**Ghost** and **Modifiable** look identical at rest (transparent). " +
          "**Stroke** and **White** both show a white surface; Stroke adds a 1px border.",
      },
    },
  },
  render: () => (
    <Stack>
      <Section title="Ghost" subtitle="Transparent at rest. Surface/weak bg on hover. Surface/strong-950 bg on active.">
        <CompactButton variant="ghost" size="large" icon={<CloseLine />} aria-label="Close (ghost)" />
      </Section>
      <Section title="Stroke" subtitle="White bg + 1px inset border + drop shadow at rest. Border and shadow drop on hover/active.">
        <CompactButton variant="stroke" size="large" icon={<CloseLine />} aria-label="Close (stroke)" />
      </Section>
      <Section title="Modifiable" subtitle="Transparent at rest (like ghost). Surface/soft tint on hover. Surface/soft bg + white inset border on active (MOD-01).">
        <CompactButton variant="modifiable" size="large" icon={<CloseLine />} aria-label="Close (modifiable)" />
      </Section>
      <Section title="White" subtitle="White bg + drop shadow at rest (same elevation as Stroke). Shadow drops on hover/active.">
        <CompactButton variant="white" size="large" icon={<CloseLine />} aria-label="Close (white)" />
      </Section>
    </Stack>
  ),
};


// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes = {
  name: "Sizes",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "**Large** (default): 24×24 px container, 2 px padding, 20×20 px icon slot. " +
          "**Medium**: 20×20 px container, 1 px padding, 18×18 px icon slot. " +
          "Both sizes are shown with all four variants. Container and icon geometry are locked — do not override via className or inline styles.",
      },
    },
  },
  render: () => (
    <Stack>
      {VARIANTS.map((variant) => (
        <Row key={variant} label={variant}>
          <Inline>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <CompactButton variant={variant} size="large" icon={<CloseLine />} aria-label={`Close — ${variant} large`} />
              <Sub>large 24×24</Sub>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <CompactButton variant={variant} size="medium" icon={<CloseLine />} aria-label={`Close — ${variant} medium`} />
              <Sub>medium 20×20</Sub>
            </div>
          </Inline>
        </Row>
      ))}
    </Stack>
  ),
};


// ── Radius ────────────────────────────────────────────────────────────────────

export const Radius = {
  name: "Radius",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "**Off** (default): `border-radius: var(--radius-6)` = 6 px. Maps to Figma '⭕️ Full Radius = Off'. " +
          "**On**: `border-radius: var(--radius-full)` = 999 px (pill shape). Maps to Figma '⭕️ Full Radius = On'. " +
          "Both radii are shown for all four variants.",
      },
    },
  },
  render: () => (
    <Stack>
      {VARIANTS.map((variant) => (
        <Row key={variant} label={variant}>
          <Inline>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <CompactButton variant={variant} size="large" fullRadius={false} icon={<CloseLine />} aria-label={`Close — ${variant} radius off`} />
              <Sub>radius off (6px)</Sub>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <CompactButton variant={variant} size="large" fullRadius icon={<CloseLine />} aria-label={`Close — ${variant} radius on`} />
              <Sub>radius on (999px)</Sub>
            </div>
          </Inline>
        </Row>
      ))}
    </Stack>
  ),
};


// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled = {
  name: "Disabled",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All four variants in the disabled state. Native HTML `disabled` attribute is used — the button is removed from the tab order and cannot be activated by any input. " +
          "All variants render transparent with `--button-compact-icon-disabled` icon color. No border, no shadow. " +
          "**Do not use `aria-disabled` in place of native `disabled`** — this component does not support `aria-disabled` mode. " +
          "Where possible, provide a tooltip or helper text explaining why the action is unavailable.",
      },
    },
  },
  render: () => (
    <Stack>
      {VARIANTS.map((variant) => (
        <Row key={variant} label={variant}>
          <Inline>
            <CompactButton variant={variant} size="large" disabled icon={<CloseLine />} aria-label={`Close — ${variant} disabled large`} />
            <CompactButton variant={variant} size="medium" disabled icon={<CloseLine />} aria-label={`Close — ${variant} disabled medium`} />
          </Inline>
        </Row>
      ))}
    </Stack>
  ),
};


// ── Icon Compatibility ────────────────────────────────────────────────────────

export const IconCompatibility = {
  name: "Icon Compatibility",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "CompactButton sets `color` on the button element and expects child SVG icons to inherit it via `currentColor`. " +
          "Two rendering techniques are used in the icon library:\n\n" +
          "- **Fill-based** (`fill=\"currentColor\"`, no stroke): `CloseLine`. These fill the entire glyph from `color`. " +
          "Renders cleanly at any size when the icon's viewBox covers the full slot.\n\n" +
          "- **Stroke-based** (`stroke=\"currentColor\"`, no fill on paths): `CrossSmall`, `CopyIcon`, `SearchIcon`. These draw paths with a stroke width and `strokeLinecap`. " +
          "Both work correctly with CompactButton's `currentColor` mechanism.\n\n" +
          "**Always import icons from `src/icons/`.** Do not recreate SVG paths inline in consumer code.",
      },
    },
  },
  render: () => (
    <Stack>
      <Section title="Fill-based icon (fill=currentColor)" subtitle="Path fill inherits button color. CloseLine">
        <Inline>
          {VARIANTS.map((variant) => (
            <div key={variant} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <CompactButton variant={variant} size="large" icon={<CloseLine />} aria-label={`CloseLine ${variant}`} />
              <Sub>{variant}</Sub>
            </div>
          ))}
        </Inline>
      </Section>
      <Section title="Stroke-based icons (stroke=currentColor)" subtitle="Path stroke inherits button color. CrossSmall · CopyIcon · SearchIcon">
        <Inline>
          {[["CrossSmall", <CrossSmall />], ["CopyIcon", <CopyIcon />], ["SearchIcon", <SearchIcon />]].map(([name, icon]) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <Inline>
                <CompactButton variant="ghost" size="large" icon={icon} aria-label={`${name} ghost`} />
                <CompactButton variant="stroke" size="large" icon={icon} aria-label={`${name} stroke`} />
                <CompactButton variant="modifiable" size="large" icon={icon} aria-label={`${name} modifiable`} />
                <CompactButton variant="white" size="large" icon={icon} aria-label={`${name} white`} />
              </Inline>
              <Sub>{name}</Sub>
            </div>
          ))}
        </Inline>
      </Section>
      <Section title="Medium size" subtitle="Icon slot is 18×18 px. Both fill and stroke icons scale correctly.">
        <Inline>
          <CompactButton variant="ghost" size="medium" icon={<CloseLine />} aria-label="CloseLine ghost medium" />
          <CompactButton variant="ghost" size="medium" icon={<CrossSmall />} aria-label="CrossSmall ghost medium" />
          <CompactButton variant="stroke" size="medium" icon={<CloseLine />} aria-label="CloseLine stroke medium" />
          <CompactButton variant="stroke" size="medium" icon={<CrossSmall />} aria-label="CrossSmall stroke medium" />
        </Inline>
      </Section>
    </Stack>
  ),
};


// ── Accessible Names ──────────────────────────────────────────────────────────

export const AccessibleNames = {
  name: "Accessible Names",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "CompactButton is icon-only — it has no visible label text. Screen readers announce the button by its accessible name, which **must** be provided explicitly.\n\n" +
          "**Option 1 — `aria-label`:** A direct string attached to the button element. Use when there is no existing visible text nearby that names the action.\n\n" +
          "**Option 2 — `aria-labelledby`:** References the `id` of an existing element. Use when the button's purpose is already described by visible text in the UI (e.g. a section heading like 'Dismiss alert').\n\n" +
          "A dev warning fires in non-production environments when neither is provided. Do not suppress it without adding a real accessible name.",
      },
    },
  },
  render: () => {
    const labelId = "cb-aria-labelledby-example";
    return (
      <Stack>
        <Section title="aria-label (direct name)" subtitle='aria-label="Close" — string on the button element itself'>
          <Inline>
            <CompactButton variant="ghost" size="large" icon={<CloseLine />} aria-label="Close" />
            <CompactButton variant="stroke" size="large" icon={<CloseLine />} aria-label="Close" />
          </Inline>
        </Section>
        <Section title="aria-labelledby (referenced name)" subtitle={`aria-labelledby="${labelId}" — element ID references visible text`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              id={labelId}
              style={{ fontFamily: "var(--font-family-body)", fontSize: 13, color: "var(--color-text-sub, #5c5c5c)" }}
            >
              Dismiss alert
            </span>
            <Inline>
              <CompactButton variant="ghost" size="large" icon={<CloseLine />} aria-labelledby={labelId} />
              <CompactButton variant="stroke" size="large" icon={<CloseLine />} aria-labelledby={labelId} />
            </Inline>
          </div>
        </Section>
      </Stack>
    );
  },
};


// ── Keyboard Focus ────────────────────────────────────────────────────────────

export const KeyboardFocus = {
  name: "Keyboard Focus",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The focus ring uses `:focus-visible` — it appears on keyboard navigation but not on mouse click.\n\n" +
          "**Focus ring token:** `--shadow-focus-ring-neutral` — white 2px gap + neutral halo. " +
          "Adapts automatically for dark mode. In Windows contrast themes (forced-colors), a `2px solid ButtonText` outline is used instead.\n\n" +
          "**Focus ring is a blocking accessibility requirement.** Do not suppress it.\n\n" +
          "**Composition:** The focus ring is correctly composed with the variant's own box-shadows:\n" +
          "- Stroke/Default: inset border + drop shadow + ring\n" +
          "- White/Default: drop shadow + ring\n" +
          "- Modifiable/Active: MOD-01 inset border + ring\n" +
          "- All other hover/active states: ring only (visual shadows drop per Figma spec)\n\n" +
          "**Try it:** Use the buttons below with a keyboard.",
      },
    },
  },
  render: () => (
    <Stack>
      <div style={{ fontFamily: "var(--font-family-body)", fontSize: 13, color: "#888", lineHeight: 1.6 }}>
        <p style={{ margin: "0 0 8px" }}>
          <Kbd>Tab</Kbd> to move focus between buttons. <Kbd>Enter</Kbd> or <Kbd>Space</Kbd> to activate.
          Hover a focused button to confirm the ring remains visible during hover+focus intersection.
        </p>
      </div>
      <Section title="All variants — focus ring">
        <Inline>
          {VARIANTS.map((variant) => (
            <div key={variant} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <CompactButton variant={variant} size="large" icon={<CloseLine />} aria-label={`Close — ${variant}`} />
              <Sub>{variant}</Sub>
            </div>
          ))}
        </Inline>
      </Section>
      <Section title="Medium size focus ring">
        <Inline>
          {VARIANTS.map((variant) => (
            <CompactButton key={variant} variant={variant} size="medium" icon={<CloseLine />} aria-label={`Close — ${variant} medium`} />
          ))}
        </Inline>
      </Section>
      <Section title="Full-radius focus ring" subtitle="Focus ring follows the pill shape.">
        <Inline>
          {VARIANTS.map((variant) => (
            <CompactButton key={variant} variant={variant} size="large" fullRadius icon={<CloseLine />} aria-label={`Close — ${variant} full radius`} />
          ))}
        </Inline>
      </Section>
      <Section title="Disabled — no focus ring" subtitle="Disabled buttons are not keyboard-focusable per the HTML spec.">
        <Inline>
          {VARIANTS.map((variant) => (
            <CompactButton key={variant} variant={variant} size="large" disabled icon={<CloseLine />} aria-label={`Close — ${variant} disabled`} />
          ))}
        </Inline>
      </Section>
    </Stack>
  ),
};


// ── Light and Dark ────────────────────────────────────────────────────────────

export const LightAndDark = {
  name: "Light and Dark",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All four variants in both light and dark themes. Token values switch automatically via `[data-theme=\"dark\"]` on the document root — no separate CSS block is needed. " +
          "Use the **Theme** toolbar toggle (☀ / ☾) at the top of Storybook to switch the global theme. " +
          "The inline dark wrapper below shows the dark rendering regardless of the global setting.",
      },
    },
  },
  render: () => (
    <Stack>
      <Section title="Light" subtitle='data-theme="light"'>
        <div data-theme="light" style={{ padding: 20, background: "#ffffff", borderRadius: 8, display: "flex", gap: 12 }}>
          {VARIANTS.map((v) => (
            <CompactButton key={v} variant={v} size="large" icon={<CloseLine />} aria-label={`Close — ${v} light`} />
          ))}
        </div>
      </Section>
      <Section title="Dark" subtitle='data-theme="dark"'>
        <div data-theme="dark" style={{ padding: 20, background: "#1b1c22", borderRadius: 8, display: "flex", gap: 12 }}>
          {VARIANTS.map((v) => (
            <CompactButton key={v} variant={v} size="large" icon={<CloseLine />} aria-label={`Close — ${v} dark`} />
          ))}
        </div>
      </Section>
      <Section title="Medium + dark" subtitle="Confirm icon slot scales correctly in dark mode.">
        <div data-theme="dark" style={{ padding: 20, background: "#1b1c22", borderRadius: 8, display: "flex", gap: 12 }}>
          {VARIANTS.map((v) => (
            <CompactButton key={v} variant={v} size="medium" icon={<CloseLine />} aria-label={`Close — ${v} dark medium`} />
          ))}
        </div>
      </Section>
    </Stack>
  ),
};


// ── All Combinations ──────────────────────────────────────────────────────────

export const AllCombinations = {
  name: "All Combinations",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "**Complete prop matrix: 16 Default + 16 Disabled = 32 static renderings.**\n\n" +
          "Each cell shows an **enabled** button (left) and a **disabled** button (right) for the same prop combination.\n\n" +
          "**Coverage:**\n" +
          "- **Default:** 16/16 statically rendered — all 4 variants × 2 sizes × 2 radius modes\n" +
          "- **Disabled:** 16/16 statically rendered — same 4 variants × 2 sizes × 2 radius modes\n" +
          "- **Hover:** 16/16 interactively available — hover over any enabled button\n" +
          "- **Active:** 16/16 interactively available — click and hold any enabled button\n\n" +
          "**Total Figma contract accounted for: 64/64**\n\n" +
          "Hover and Active remain CSS pseudo-class states, not React props. No pseudo-state addon was added. " +
          "They cannot be rendered as separate static columns — interact with any enabled button to observe them.\n\n" +
          "Figma matrix: 4 styles × 4 states (Default · Hover · Active · Disabled) × 2 sizes × 2 radius modes = 64 total variants.\n\n" +
          "**Column notation:** lg = large 24×24 · md = medium 20×20 · off = radius 6 px · full = radius 999 px.\n" +
          "Each cell pair: **on** (enabled, Default / Hover · Active available interactively) · **dis** (disabled).",
      },
    },
  },
  render: () => {
    const COLS = [
      { size: "large",  fullRadius: false, label: "lg / off"  },
      { size: "large",  fullRadius: true,  label: "lg / full" },
      { size: "medium", fullRadius: false, label: "md / off"  },
      { size: "medium", fullRadius: true,  label: "md / full" },
    ];
    const COL_W = 76;
    return (
      <Stack>
        {/* Column header row */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 0 }}>
          {/* spacer for row label */}
          <div style={{ width: 80, flexShrink: 0 }} />
          {COLS.map((col) => (
            <div key={col.label} style={{ width: COL_W, flexShrink: 0 }}>
              <span style={{ ...LABEL_STYLE, fontSize: 10 }}>{col.label}</span>
              <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
                <Sub>on</Sub>
                <span style={{ ...SUB_STYLE, color: "#ddd" }}>·</span>
                <Sub>dis</Sub>
              </div>
            </div>
          ))}
        </div>

        {/* One row per variant — each cell: enabled + disabled for that prop combo */}
        {VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            {COLS.map((col) => (
              <div
                key={col.label}
                style={{ width: COL_W, flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}
              >
                {/* Enabled — Default at rest; Hover + Active available interactively */}
                <CompactButton
                  variant={variant}
                  size={col.size}
                  fullRadius={col.fullRadius}
                  icon={<CloseLine />}
                  aria-label={`Close — ${variant} ${col.label} default`}
                />
                {/* Disabled — native HTML disabled, all prop axes preserved */}
                <CompactButton
                  variant={variant}
                  size={col.size}
                  fullRadius={col.fullRadius}
                  disabled
                  icon={<CloseLine />}
                  aria-label={`Close — ${variant} ${col.label} disabled`}
                />
              </div>
            ))}
          </Row>
        ))}
      </Stack>
    );
  },
};


// ── Modifiable/Active Exception ───────────────────────────────────────────────

export const ModifiableActiveException = {
  name: "Modifiable / Active Exception",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "**DD-VIS-01 — Designer-accepted WCAG 1.4.11 exception**\n\n" +
          "The Modifiable/Active state renders `--button-compact-bg-hover-dark` (background) against `--button-compact-icon-inverse` (icon). " +
          "These token values produce the following approximate contrast ratios:\n\n" +
          "- **Light mode:** ~1.03:1\n" +
          "- **Dark mode:** ~1.28:1\n\n" +
          "Neither meets [WCAG 1.4.11 Non-Text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html) (3:1 minimum).\n\n" +
          "This is a **designer-accepted exception** documented during the DT-R1 reconciliation (2026-09-17). " +
          "The active state is transient — it is only visible for the duration of a press, and the component reverts to Default on release. " +
          "Implementation matches the Figma specification exactly.\n\n" +
          "**Do not:**\n" +
          "- Change the token values to 'fix' the contrast\n" +
          "- Add an axe suppression\n" +
          "- Relabel this state as WCAG-compliant\n\n" +
          "**Active state:** Click and hold any button below to observe the exception. The state resolves immediately on release.",
      },
    },
  },
  render: () => (
    <Stack>
      <Section title="Modifiable — click and hold to see active state" subtitle="DD-VIS-01: icon-inverse on bg-hover-dark — ~1.03:1 (L) / ~1.28:1 (D). Designer-accepted exception.">
        <Inline>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <CompactButton variant="modifiable" size="large" icon={<CloseLine />} aria-label="Close — modifiable large" />
            <Sub>large</Sub>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <CompactButton variant="modifiable" size="medium" icon={<CloseLine />} aria-label="Close — modifiable medium" />
            <Sub>medium</Sub>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <CompactButton variant="modifiable" size="large" fullRadius icon={<CloseLine />} aria-label="Close — modifiable full radius" />
            <Sub>full radius</Sub>
          </div>
        </Inline>
      </Section>
      <Section title="Dark mode" subtitle="Contrast improves slightly in dark mode (~1.28:1) but still does not meet 3:1.">
        <div data-theme="dark" style={{ padding: 16, background: "#1b1c22", borderRadius: 8 }}>
          <Inline>
            <CompactButton variant="modifiable" size="large" icon={<CloseLine />} aria-label="Close — modifiable dark" />
            <CompactButton variant="modifiable" size="medium" icon={<CloseLine />} aria-label="Close — modifiable dark medium" />
          </Inline>
        </div>
      </Section>
    </Stack>
  ),
};


// ── Usage Guidance ────────────────────────────────────────────────────────────

export const UsageGuidance = {
  name: "Usage Guidance",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "**When to use CompactButton**\n\n" +
          "Use CompactButton when you need an icon-only action in a space-constrained context:\n" +
          "- Dismiss / close targets on cards, chips, and alerts\n" +
          "- Toolbar actions in dense UI (table row controls, editor toolbars)\n" +
          "- Inline contextual controls that sit within a larger interactive surface\n\n" +
          "**Do not use CompactButton when:**\n" +
          "- The action has a visible text label — use Button instead\n" +
          "- The target is navigation — use a Link component\n" +
          "- The icon meaning is ambiguous without context\n\n" +
          "---\n\n" +
          "**Icon-only action requirements**\n\n" +
          "CompactButton is permanently icon-only. There is no label slot. Every instance requires:\n" +
          "1. An icon that communicates the action clearly in context\n" +
          "2. An `aria-label` or `aria-labelledby` providing the accessible name\n" +
          "3. A tooltip (via Tooltip component) if the action is not obvious from visual context alone\n\n" +
          "---\n\n" +
          "**Variant selection guide**\n\n" +
          "| Variant | Surface context | Notes |\n" +
          "|---|---|---|\n" +
          "| ghost | Any — lowest visual weight | Default choice |\n" +
          "| stroke | Elevated / card surfaces | When button needs visual separation |\n" +
          "| modifiable | Inline content editing | Signals 'this modifies the content next to it' |\n" +
          "| white | Coloured / image surfaces | Provides contrast against non-white backgrounds |\n\n" +
          "---\n\n" +
          "**Native disabled vs. visual interaction states**\n\n" +
          "- `disabled` is a native HTML attribute that removes the button from the tab order and prevents all interaction. " +
          "Use when the action is genuinely unavailable.\n" +
          "- Hover and Active are CSS pseudo-class states. They cannot be set via props. They reflect real pointer or keyboard interaction.\n" +
          "- Do not use `aria-disabled` in place of native `disabled` on this component.\n\n" +
          "---\n\n" +
          "**Medium size usage note**\n\n" +
          "`medium` (20×20 px) is a fully supported public size. Use it when the containing layout cannot accommodate 24×24 px — for example, inside compact data-table rows or inline with 16px body text. " +
          "Do not use Medium as a default; Large is preferred in most contexts.",
      },
    },
  },
  render: () => (
    <Stack>
      <Section title="Ghost — toolbar context" subtitle="Low visual weight, neutral surface.">
        <Inline>
          <CompactButton variant="ghost" size="large" icon={<CloseLine />} aria-label="Close" />
          <CompactButton variant="ghost" size="large" icon={<CopyIcon />} aria-label="Copy" />
          <CompactButton variant="ghost" size="large" icon={<SearchIcon />} aria-label="Search" />
        </Inline>
      </Section>
      <Section title="Stroke — card dismiss" subtitle="Elevated surface with border and shadow.">
        <div style={{ padding: 16, background: "#f6f7f8", borderRadius: 8, display: "inline-flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-family-body)", fontSize: 13, color: "#333" }}>
            Transaction confirmed
          </span>
          <CompactButton variant="stroke" size="large" icon={<CloseLine />} aria-label="Dismiss notification" />
        </div>
      </Section>
      <Section title="White — coloured surface" subtitle="Provides contrast against non-white backgrounds.">
        <div style={{ padding: 16, background: "#7263cc", borderRadius: 8, display: "flex", gap: 8 }}>
          <CompactButton variant="white" size="large" icon={<CloseLine />} aria-label="Close" />
          <CompactButton variant="white" size="large" icon={<CopyIcon />} aria-label="Copy" />
        </div>
      </Section>
      <Section title="Medium — compact row" subtitle="20×20 px for space-constrained contexts.">
        <div style={{ padding: "8px 12px", background: "#f6f7f8", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-family-body)", fontSize: 12, color: "#333" }}>
            0x1a2b…ef
          </span>
          <CompactButton variant="ghost" size="medium" icon={<CopyIcon />} aria-label="Copy address" />
        </div>
      </Section>
    </Stack>
  ),
};
