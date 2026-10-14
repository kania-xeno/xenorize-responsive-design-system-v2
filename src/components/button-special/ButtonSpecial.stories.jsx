/**
 * ButtonSpecial — Production Story File
 * DT phase: D3 Storybook Documentation (2026-10-14)
 * Figma: node 2015:333, file 0aVnOgjVWH1YL8JCnjXTBi, page ❖ Button
 * 36 variants: 4 Types × 3 States × 3 Sizes
 *
 * Story hierarchy: Components → Button → Special → General
 * Theme: controlled via the global Theme toolbar (preview.js withTheme decorator).
 */
import React from "react";
import ButtonSpecial from "./ButtonSpecial.jsx";
import CircleCheck from "../../icons/CircleCheck.jsx";
import Globe from "../../icons/Globe.jsx";

// ── Layout primitives ──────────────────────────────────────────────────────

const Flex = ({ children, gap = 12, wrap = true, align = "center" }) => (
  <div
    style={{
      display: "flex",
      flexWrap: wrap ? "wrap" : "nowrap",
      alignItems: align,
      gap,
    }}
  >
    {children}
  </div>
);

const Stack = ({ children, gap = 20 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap }}>{children}</div>
);

const Label = ({ children }) => (
  <p
    style={{
      margin: 0,
      font: "11px/1.4 system-ui, sans-serif",
      color: "#888",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </p>
);

const MatrixCell = ({ children, header = false }) => (
  <td
    style={{
      padding: "8px 12px",
      verticalAlign: "middle",
      borderBottom: "1px solid #e5e7eb",
      ...(header && {
        font: "11px/1.4 system-ui, sans-serif",
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        background: "transparent",
        paddingTop: 12,
        paddingBottom: 8,
      }),
    }}
  >
    {children}
  </td>
);

const Table = ({ children }) => (
  <table
    style={{
      borderCollapse: "collapse",
      width: "100%",
      font: "inherit",
    }}
  >
    {children}
  </table>
);

// ── Constants ──────────────────────────────────────────────────────────────

const VARIANTS = ["neutral", "basic", "primary", "destructive"];
const SIZES = ["medium", "small", "x-small"];

// ── Default export ─────────────────────────────────────────────────────────

export default {
  title: "Components/Button/Special/General",
  component: ButtonSpecial,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["neutral", "basic", "primary", "destructive"],
      description:
        "Visual style. Maps to Figma **🧩 Type** variant axis. " +
        "Generates `button-special--{variant}` CSS modifier. " +
        "(Renamed from `type` in D2.1 to avoid collision with the native HTML button type attribute.)",
      table: {
        defaultValue: { summary: "neutral" },
        type: { summary: '"neutral" | "basic" | "primary" | "destructive"' },
      },
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description:
        "Native HTML `<button>` type attribute. Forwarded directly to the DOM element. " +
        "Use `submit` inside `<form>` elements to trigger form submission. " +
        "Default `button` prevents accidental form submission.",
      table: {
        defaultValue: { summary: "button" },
        type: { summary: '"button" | "submit" | "reset"' },
      },
    },
    size: {
      control: { type: "select" },
      options: ["medium", "small", "x-small"],
      description:
        "Size. Maps to Figma **📏 Size** variant axis. " +
        "Medium = 40px height, Small = 36px, X-Small = 32px. No Large (DD-12 — not in Figma component).",
      table: {
        defaultValue: { summary: "medium" },
        type: { summary: '"medium" | "small" | "x-small"' },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "Native HTML `disabled`. Maps to Figma **📌 State = Disabled**. " +
        "Uses native `disabled` attribute — NOT `aria-disabled` (DD-06).",
      table: { defaultValue: { summary: "false" } },
    },
    showLabel: {
      control: "boolean",
      description:
        "Whether the label text slot is rendered. Maps to Figma **✏️ Show Text**. " +
        "When false (or when children produce no visible text), provide `aria-label` or `aria-labelledby` (DD-07).",
      table: { defaultValue: { summary: "true" } },
    },
    showLeftIcon: {
      control: "boolean",
      description: "Whether the left icon slot is visible. Maps to Figma **⬅️ Left Icon**.",
      table: { defaultValue: { summary: "true" } },
    },
    showRightIcon: {
      control: "boolean",
      description: "Whether the right icon slot is visible. Maps to Figma **➡️ Right Icon**.",
      table: { defaultValue: { summary: "true" } },
    },
    children: {
      control: "text",
      description: "Label text. Maps to Figma **✏️ Edit Text**. Default Figma content: “Button”.",
    },
    "aria-label": {
      control: "text",
      description: "Accessible name for the button. Required when label is not rendered (DD-07).",
    },
    "aria-labelledby": {
      control: "text",
      description: "ID reference to an element providing the accessible name.",
    },
    leftIcon: {
      control: false,
      description:
        "Custom element for the left icon slot. Maps to Figma **⬅️ Pick Left**. " +
        "Defaults to `<ArrowLeftSLine />` (Figma default: arrow-left-s-line, node 1941:85).",
    },
    rightIcon: {
      control: false,
      description:
        "Custom element for the right icon slot. Maps to Figma **➡️ Pick Right**. " +
        "Defaults to `<ArrowRightSLine />` (Figma default: arrow-right-s-line, node 1941:83).",
    },
    ref: { control: false, table: { disable: true } },
  },
  args: {
    children: "Button",
    variant: "neutral",
    type: "button",
    size: "medium",
    disabled: false,
    showLabel: true,
    showLeftIcon: true,
    showRightIcon: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          "**Button Special** (`↳buttons-special`) is a premium action button with a distinctive gradient " +
          "border signature (HC-01 `::before` mask pattern) and gradient overlay (`::after`). " +
          "Use it for high-emphasis CTAs and special product moments that need visual weight beyond the standard button.\n\n" +
          "**Figma source:** node `2015:333`, file `0aVnOgjVWH1YL8JCnjXTBi`, page ❖ Button — " +
          "**36 variants**: 4 Types × 3 States × 3 Sizes.\n\n" +
          "### When to use\n\n" +
          "Reserve Button Special for primary page-level actions: a hero CTA, a sign-up button, or a " +
          "one-per-screen conversion point. Avoid stacking multiple Special buttons — the gradient " +
          "border is a visual anchor that loses impact when repeated.\n\n" +
          "### Types\n\n" +
          "- **Neutral** — near-black fill (`--prim-neutral-950`). Default and most prominent. " +
          "Use for universal CTAs not tied to brand or severity.\n" +
          "- **Basic** — transparent fill with gradient border prominence. Use as a secondary " +
          "high-emphasis action alongside Neutral.\n" +
          "- **Primary** — brand-color fill. Use for brand-aligned CTAs such as 'Start Trading' or 'Upgrade'.\n" +
          "- **Destructive** — danger-color fill. Use for irreversible high-stakes actions " +
          "such as 'Delete Account'.\n\n" +
          "### Sizes\n\n" +
          "- **Medium** — 40px height, 10px vertical padding. Default size.\n" +
          "- **Small** — 36px height, 8px vertical padding.\n" +
          "- **X-Small** — 32px height, 6px vertical padding.\n" +
          "- **No Large** — Large size is intentionally excluded (DD-12: not present in the Figma component).\n\n" +
          "### States\n\n" +
          "- **Default** — static render.\n" +
          "- **Hover** — CSS `:hover` via `::after` gradient overlay. Requires real pointer interaction; " +
          "no pseudo-state addon.\n" +
          "- **Disabled** — native HTML `disabled` attribute (not `aria-disabled`, per DD-06). " +
          "Gradient stroke (`::before`) is suppressed; text and icons switch to disabled tokens.\n\n" +
          "### Icon behavior\n\n" +
          "Left icon defaults to `ArrowLeftSLine`; right icon defaults to `ArrowRightSLine`. " +
          "Override with any React element via `leftIcon` / `rightIcon`. " +
          "Toggle visibility with `showLeftIcon` / `showRightIcon`. " +
          "All icon slots are wrapped in `aria-hidden` — they are purely decorative.\n\n" +
          "### Accessibility\n\n" +
          "When `showLabel={false}` or when children produce no visible text, **provide `aria-label` or " +
          "`aria-labelledby`** — ButtonSpecial emits a dev-mode `console.warn` if neither is present (DD-07). " +
          "Focus ring is applied on `:focus-visible` only; each type uses its own `--shadow-focus-ring-*` " +
          "token (DD-03).\n\n" +
          "### Dark theme\n\n" +
          "Theming is applied via `data-theme=\"dark\"` on `document.documentElement` (global Theme toolbar). " +
          "No local wrapper needed. All L2 and L3 tokens resolve correctly in dark mode.",
      },
    },
  },
};

// ── 1. Playground ──────────────────────────────────────────────────────────

export const Playground = {
  name: "Playground",
  args: {
    children: "Button",
    variant: "neutral",
    type: "button",
    size: "medium",
    disabled: false,
    showLabel: true,
    showLeftIcon: true,
    showRightIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Full interactive controls. Use the Controls panel to adjust `variant`, `type`, `size`, " +
          "`disabled`, `showLabel`, `showLeftIcon`, `showRightIcon`, and label text. " +
          "This is the primary surface for exploring the component API.",
      },
    },
  },
};

// ── 2. All Types ───────────────────────────────────────────────────────────

export const AllTypes = {
  name: "All Types",
  render: () => (
    <Stack gap={24}>
      <Stack gap={8}>
        <Label>Medium (40px)</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={v} variant={v} size="medium">
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>Small (36px)</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={v} variant={v} size="small">
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>X-Small (32px)</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={v} variant={v} size="x-small">
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All 4 **🧩 Type** values (Neutral / Basic / Primary / Destructive) at each of the 3 sizes. " +
          "Default state. Verifies the HC-01 gradient stroke (`::before`) and overlay (`::after`) per type " +
          "across all size variants.",
      },
    },
  },
};

// ── 3. All Sizes ───────────────────────────────────────────────────────────

export const AllSizes = {
  name: "All Sizes",
  render: () => (
    <Table>
      <thead>
        <tr>
          <MatrixCell header>Type ↓ / Size →</MatrixCell>
          {SIZES.map((s) => (
            <MatrixCell key={s} header>{s}</MatrixCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((v) => (
          <tr key={v}>
            <MatrixCell header>{v}</MatrixCell>
            {SIZES.map((s) => (
              <MatrixCell key={s}>
                <ButtonSpecial variant={v} size={s}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </ButtonSpecial>
              </MatrixCell>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "4 Types × 3 Sizes = 12 combinations, all in **Default** state. " +
          "Use for a quick visual scan across the full type/size axis. " +
          "Heights: Medium = 40px, Small = 36px, X-Small = 32px. " +
          "Radius: Medium uses `--radius-10`, Small and X-Small use `--radius-8`.",
      },
    },
  },
};

// ── 4. State Matrix ────────────────────────────────────────────────────────

export const StateMatrix = {
  name: "State Matrix",
  render: () => {
    const states = [
      { label: "Default", disabled: false },
      { label: "Hover →", disabled: false },
      { label: "Disabled", disabled: true },
    ];
    return (
      <Stack gap={32}>
        {SIZES.map((size) => (
          <Stack key={size} gap={8}>
            <Label>
              {size} ({size === "medium" ? "40px" : size === "small" ? "36px" : "32px"} height)
            </Label>
            <Table>
              <thead>
                <tr>
                  <MatrixCell header>Type</MatrixCell>
                  {states.map((st) => (
                    <MatrixCell key={st.label} header>
                      {st.label}
                    </MatrixCell>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VARIANTS.map((v) => (
                  <tr key={v}>
                    <MatrixCell header>{v}</MatrixCell>
                    {states.map((st) => (
                      <MatrixCell key={st.label}>
                        <ButtonSpecial variant={v} size={size} disabled={st.disabled}>
                          {v.charAt(0).toUpperCase() + v.slice(1)}
                        </ButtonSpecial>
                      </MatrixCell>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Stack>
        ))}
        <p style={{ margin: 0, font: "12px/1.5 system-ui, sans-serif", color: "#888" }}>
          ↑ "Hover →" column shows the <em>default</em> render — hover the buttons manually to
          validate the CSS <code>:hover</code> state. No pseudo-state addon is required.
        </p>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Full 36-variant matrix**: 3 Sizes × 4 Types × 3 States (Default / Hover / Disabled). " +
          "The 'Hover →' column renders in default state — hover those buttons manually to validate " +
          "the `::after` overlay gradient. Cross-reference against Figma node 2015:333 child variants.",
      },
    },
  },
};

// ── 5. Icon Configuration ─────────────────────────────────────────────────

export const IconConfiguration = {
  name: "Icon Configuration",
  render: () => (
    <Stack gap={24}>
      <Stack gap={8}>
        <Label>Both icons + label (Figma default — showLeftIcon=true, showRightIcon=true, showLabel=true)</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={v} variant={v} size="medium">
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>Left icon only (showRightIcon=false, showLabel=false)</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial
              key={v}
              variant={v}
              size="medium"
              showRightIcon={false}
              showLabel={false}
              aria-label={`${v} action`}
            />
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>Right icon only (showLeftIcon=false, showLabel=false)</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial
              key={v}
              variant={v}
              size="medium"
              showLeftIcon={false}
              showLabel={false}
              aria-label={`${v} action`}
            />
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>Text only (showLeftIcon=false, showRightIcon=false)</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial
              key={v}
              variant={v}
              size="medium"
              showLeftIcon={false}
              showRightIcon={false}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All four icon slot configurations from the Figma component: " +
          "**Both icons + label** (default), **Left icon only**, **Right icon only**, **Text only**. " +
          "Icon-only configurations supply `aria-label` to satisfy the accessible name requirement (DD-07). " +
          "Maps to Figma **⬅️ Left Icon**, **➡️ Right Icon**, and **✏️ Show Text** variant axes.",
      },
    },
  },
};

// ── 6. Icon Only / Accessible Name ────────────────────────────────────────

export const IconOnlyAccessibleName = {
  name: "Icon Only / Accessible Name",
  render: () => (
    <Stack gap={20}>
      <Stack gap={8}>
        <Label>Left icon only with aria-label — all types, medium size</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial
              key={v}
              variant={v}
              size="medium"
              showLabel={false}
              showRightIcon={false}
              aria-label={`Navigate ${v}`}
            />
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>Both icons, no label with aria-label — all types</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial
              key={`both-${v}`}
              variant={v}
              size="medium"
              showLabel={false}
              aria-label={`${v} icon button`}
            />
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>All sizes — icon only, accessible name via aria-label (neutral)</Label>
        <Flex gap={12} align="center">
          {SIZES.map((s) => (
            <ButtonSpecial
              key={s}
              variant="neutral"
              size={s}
              showLabel={false}
              showRightIcon={false}
              aria-label={`${s} navigate`}
            />
          ))}
        </Flex>
      </Stack>
      <p style={{ margin: 0, font: "12px/1.5 system-ui, sans-serif", color: "#888" }}>
        Inspect with DevTools Accessibility panel — each button's computed accessible name must be non-empty.
        Without <code>aria-label</code> or <code>aria-labelledby</code>, ButtonSpecial emits a dev-mode{" "}
        <code>console.warn</code> (DD-07).
      </p>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the accessible name requirement for icon-only buttons (DD-07 / A3-DEC-01). " +
          "When no visible label is rendered, `aria-label` or `aria-labelledby` must be provided. " +
          "ButtonSpecial enforces this with a dev-mode `console.warn` for buttons that have no rendered " +
          "label and no accessible name. Verify in DevTools: Accessibility → Computed Name must be non-empty.",
      },
    },
  },
};

// ── 7. Custom Icons ────────────────────────────────────────────────────────

export const CustomIcons = {
  name: "Custom Icons",
  render: () => (
    <Stack gap={20}>
      <Stack gap={8}>
        <Label>Both custom: leftIcon=CircleCheck, rightIcon=Globe</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial
              key={v}
              variant={v}
              size="medium"
              leftIcon={<CircleCheck />}
              rightIcon={<Globe />}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>Custom leftIcon only — rightIcon still defaults to ArrowRightSLine</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={v} variant={v} size="medium" leftIcon={<Globe />}>
              Custom left
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>Custom rightIcon only — leftIcon still defaults to ArrowLeftSLine</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={v} variant={v} size="medium" rightIcon={<CircleCheck />}>
              Custom right
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Overriding `leftIcon` and `rightIcon` with custom icon components. " +
          "Maps to Figma **⬅️ Pick Left** and **➡️ Pick Right** instance-swap properties. " +
          "Custom icons inherit the same `aria-hidden` wrapper and token-driven color CSS as the defaults. " +
          "`CircleCheck` and `Globe` are 20×20px SVG components from the design system icon library.",
      },
    },
  },
};

// ── 8. Disabled ────────────────────────────────────────────────────────────

export const Disabled = {
  name: "Disabled",
  render: () => (
    <Table>
      <thead>
        <tr>
          <MatrixCell header>Type ↓ / Size →</MatrixCell>
          {SIZES.map((s) => (
            <MatrixCell key={s} header>{s}</MatrixCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((v) => (
          <tr key={v}>
            <MatrixCell header>{v}</MatrixCell>
            {SIZES.map((s) => (
              <MatrixCell key={s}>
                <ButtonSpecial variant={v} size={s} disabled>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </ButtonSpecial>
              </MatrixCell>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All 4 types × 3 sizes with `disabled={true}`. " +
          "Verify: gradient stroke (`::before`) is suppressed for all types; " +
          "`--bs-overlay` switches to its disabled value; " +
          "text renders in `--color-text-disabled` and icons in `--color-icon-disabled` (DD-10). " +
          "Native `disabled` attribute is used — NOT `aria-disabled` (DD-06). " +
          "Disabled buttons are removed from the tab order.",
      },
    },
  },
};

// ── 9. Hover Validation ────────────────────────────────────────────────────

export const HoverValidation = {
  name: "Hover Validation",
  render: () => (
    <Stack gap={20}>
      <p style={{ margin: 0, font: "13px/1.5 system-ui, sans-serif", color: "#666" }}>
        Move your cursor over each button to validate the <code>:hover</code> CSS state. The{" "}
        <code>::after</code> gradient overlay (<code>--bs-overlay</code>) switches to its hover-state
        value, brightening or tinting the background. Text and icon colors shift to{" "}
        <code>--color-icon-inverse</code> (DD-09). No pseudo-state addon is required.
      </p>
      <Stack gap={8}>
        <Label>Medium — hover to validate --bs-overlay hover gradient</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={v} variant={v} size="medium">
              Hover me ({v})
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>Small — same hover tokens at smaller size</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={v} variant={v} size="small">
              Hover ({v})
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>X-Small — same hover tokens at smallest size</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={v} variant={v} size="x-small">
              {v}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "**Real pointer hover required.** Hover each button to verify the `::after` gradient overlay " +
          "changes via `--bs-overlay`. Each type must visibly brighten or tint its background on hover, " +
          "and text and icon colors must shift. All 3 sizes share the same hover token values — " +
          "verify consistency across Medium, Small, and X-Small.",
      },
    },
  },
};

// ── 10. Dark Theme ─────────────────────────────────────────────────────────

export const DarkTheme = {
  name: "Dark Theme",
  globals: {
    theme: "dark",
  },
  render: () => (
    <Stack gap={20}>
      <p style={{ margin: 0, font: "13px/1.5 system-ui, sans-serif", color: "#9ca3af" }}>
        Dark theme active via <code>data-theme="dark"</code> on <code>document.documentElement</code>{" "}
        (global Theme toolbar). All L2 and L3 tokens resolve from their dark-mode overrides in{" "}
        <code>tokens.css</code>.
      </p>
      <Stack gap={8}>
        <Label>Default state — all types</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={`${v}-default`} variant={v} size="medium">
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>Disabled — verify --color-text-disabled and --color-icon-disabled in dark mode</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={`${v}-disabled`} variant={v} size="medium" disabled>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
      <Stack gap={8}>
        <Label>Icon-only — verify icon color tokens in dark mode</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial
              key={`${v}-icon`}
              variant={v}
              size="medium"
              showLabel={false}
              showRightIcon={false}
              aria-label={`${v} dark mode icon`}
            />
          ))}
        </Flex>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dark theme validation. The **Theme toolbar** is pre-set to Dark for this story via `globals`. " +
          "Verify gradient strokes, text colors, icon colors, and overlay gradients all resolve correctly " +
          "from `[data-theme=\"dark\"]` token overrides. No local `data-theme` wrapper — " +
          "theming flows through `document.documentElement` as designed.",
      },
    },
  },
};

// ── 11. Native Submit and Reset ────────────────────────────────────────────

export const NativeSubmitAndReset = {
  name: "Native Submit and Reset",
  render: () => {
    const [submitted, setSubmitted] = React.useState(false);
    return (
      <Stack gap={32}>
        <Stack gap={12}>
          <Label>type="submit" — click to trigger form onSubmit</Label>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              setTimeout(() => setSubmitted(false), 2000);
            }}
            style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}
          >
            <label style={{ font: "13px/1.4 system-ui, sans-serif", color: "#666" }}>
              Name
              <input
                type="text"
                defaultValue="Test user"
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: 4,
                  padding: "8px",
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  font: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </label>
            <Flex gap={8}>
              <ButtonSpecial variant="primary" type="submit" size="medium">
                Submit
              </ButtonSpecial>
            </Flex>
          </form>
          {submitted && (
            <p style={{ margin: 0, font: "13px/1.5 system-ui, sans-serif", color: "#16a34a" }}>
              ✓ Form submitted (native submit event fired)
            </p>
          )}
        </Stack>
        <Stack gap={12}>
          <Label>type="reset" — edit the input, then click Reset to restore defaultValue</Label>
          <form style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
            <label style={{ font: "13px/1.4 system-ui, sans-serif", color: "#666" }}>
              Field (edit then reset)
              <input
                type="text"
                defaultValue="Original value"
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: 4,
                  padding: "8px",
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  font: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </label>
            <Flex gap={8}>
              <ButtonSpecial variant="neutral" type="reset" size="medium">
                Reset
              </ButtonSpecial>
            </Flex>
          </form>
        </Stack>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Validates the native `type` attribute forwarding via `safeType`. " +
          "**Submit**: `type=\"submit\"` triggers the form's `onSubmit` handler — click the button " +
          "and a confirmation appears. " +
          "**Reset**: `type=\"reset\"` restores all form fields to their `defaultValue` — " +
          "edit the input field, then click Reset to revert. " +
          "Both verify that the native `type` attribute passes through the component correctly.",
      },
    },
  },
};

// ── 12. Accessibility / Keyboard Focus ────────────────────────────────────

export const KeyboardFocus = {
  name: "Accessibility / Keyboard Focus",
  render: () => (
    <Stack gap={16}>
      <p style={{ margin: 0, font: "13px/1.5 system-ui, sans-serif", color: "#666" }}>
        Click into the canvas, then press <kbd>Tab</kbd> to move focus between buttons. Each type
        shows its corresponding <code>--shadow-focus-ring-*</code> token on{" "}
        <code>:focus-visible</code> (DD-03): Primary → <code>--shadow-focus-ring-primary</code>,
        Destructive → <code>--shadow-focus-ring-error</code>, Neutral/Basic →{" "}
        <code>--shadow-focus-ring-neutral</code>. Mouse-click focus must NOT show the ring.
      </p>
      <Flex gap={12}>
        {VARIANTS.map((v) => (
          <ButtonSpecial key={v} variant={v} size="medium">
            Tab to me ({v})
          </ButtonSpecial>
        ))}
      </Flex>
      <Label>Tab between buttons — verify focus ring color and 3-layer box-shadow per type</Label>
      <Flex gap={12} align="center">
        {SIZES.map((s) => (
          <ButtonSpecial key={s} variant="primary" size={s}>
            {s}
          </ButtonSpecial>
        ))}
      </Flex>
      <Label>All sizes — verify focus ring is not clipped at any size</Label>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "**Tab into the story canvas** and press Tab to move focus between buttons. " +
          "Verify the 3-layer `box-shadow` focus ring appears on `:focus-visible` — " +
          "inner white ring (`rgb(255,255,255) 0px 0px 0px 2px`), outer blur ring, and inset shadow. " +
          "Clicking with a mouse must NOT show the ring (`:focus:not(:focus-visible)` must be invisible). " +
          "Each type uses its own focus ring token (DD-03 — reuses `--shadow-focus-ring-*`). " +
          "The ring must not be clipped at any size.",
      },
    },
  },
};

// ── 13. Content Edge Cases ─────────────────────────────────────────────────

export const ContentEdgeCases = {
  name: "Content Edge Cases",
  render: () => (
    <Stack gap={20}>
      <Stack gap={8}>
        <Label>Numeric 0 — valid content (renders "0")</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={v} variant={v} size="medium">
              {0}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>

      <Stack gap={8}>
        <Label>Mixed array [false, null, "Button"] — only "Button" renders</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial key={v} variant={v} size="medium">
              {[false, null, "Button"]}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>

      <Stack gap={8}>
        <Label>Boolean false children — no rendered label (dev warning fires; aria-label supplied)</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial
              key={v}
              variant={v}
              size="medium"
              aria-label={`${v} with false child`}
            >
              {false}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>

      <Stack gap={8}>
        <Label>Whitespace-only string — treated as empty (aria-label supplied)</Label>
        <Flex gap={12}>
          {VARIANTS.map((v) => (
            <ButtonSpecial
              key={v}
              variant={v}
              size="medium"
              aria-label={`${v} whitespace label`}
            >
              {"   "}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>

      <p style={{ margin: 0, font: "12px/1.5 system-ui, sans-serif", color: "#888" }}>
        Open the browser console (development mode) to verify warnings fire correctly.
        Cases with <code>aria-label</code> satisfy DD-07 but still trigger the no-visible-content
        warning when all visual slots appear empty. Numeric <code>0</code> must NOT trigger a warning
        — it is valid renderable content.
      </p>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Edge cases for the `hasRenderedLabel` children detection fix (D2-A.1.A). " +
          "Validates: numeric `0` is valid content; `false` / `null` / whitespace-only strings " +
          "are correctly identified as empty; mixed arrays like `[false, null, 'Button']` correctly " +
          "detect `'Button'` as the only renderable child. " +
          "Check the browser console in development mode — warnings must fire for empty slots " +
          "with no `aria-label`, and must NOT fire when a valid label or accessible name is present.",
      },
    },
  },
};

// ── 14. Long Label / HUG Width ────────────────────────────────────────────

export const LongLabel = {
  name: "Long Label / HUG Width",
  render: () => (
    <Stack gap={20}>
      <Stack gap={8}>
        <Label>HUG width — button grows with label (width: max-content)</Label>
        <Stack gap={8}>
          <ButtonSpecial variant="neutral" size="medium">
            Short
          </ButtonSpecial>
          <ButtonSpecial variant="primary" size="medium">
            Medium length label
          </ButtonSpecial>
          <ButtonSpecial variant="destructive" size="medium">
            This is a much longer label for edge case testing
          </ButtonSpecial>
        </Stack>
      </Stack>
      <Stack gap={8}>
        <Label>All sizes — long label (height stays fixed; width grows)</Label>
        <Flex gap={12} align="center">
          {SIZES.map((s) => (
            <ButtonSpecial key={s} variant="basic" size={s}>
              Long label text for {s}
            </ButtonSpecial>
          ))}
        </Flex>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Verifies the button's HUG-width behavior (`width: max-content`). " +
          "As label length increases, the button width grows. " +
          "Height must remain fixed per size token: Medium = 40px, Small = 36px, X-Small = 32px. " +
          "Long labels that overflow will wrap and push height — this is expected behavior " +
          "(`white-space: nowrap` is intentionally NOT applied to the label slot).",
      },
    },
  },
};

// ── 15. Ref Forwarding ─────────────────────────────────────────────────────

export const RefForwarding = {
  name: "Ref Forwarding",
  render: () => {
    const ref = React.useRef(null);
    const [result, setResult] = React.useState(null);
    React.useEffect(() => {
      if (ref.current) {
        setResult(ref.current instanceof HTMLButtonElement);
      }
    }, []);
    return (
      <Stack gap={16}>
        <Label>React 19 direct ref — forwarded to the native &lt;button&gt; element</Label>
        <ButtonSpecial ref={ref} variant="primary" size="medium">
          Ref Target
        </ButtonSpecial>
        <p style={{ margin: 0, font: "13px/1.5 system-ui, sans-serif", color: "#666" }}>
          After mount:{" "}
          <code>ref.current instanceof HTMLButtonElement</code> →{" "}
          <strong style={{ color: result === true ? "#16a34a" : result === false ? "#dc2626" : "#888" }}>
            {result === null ? "checking…" : String(result)}
          </strong>
        </p>
        <p style={{ margin: 0, font: "12px/1.5 system-ui, sans-serif", color: "#888" }}>
          ButtonSpecial uses the React 19 direct-ref pattern (no <code>React.forwardRef</code>
          wrapper). The <code>ref</code> prop is forwarded directly to the{" "}
          <code>&lt;button&gt;</code> element. Verify in DevTools console:{" "}
          <code>$0 instanceof HTMLButtonElement</code> → true after focusing the button.
        </p>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the React 19 direct ref forwarding pattern. " +
          "The story mounts with a `useRef`, and after mount the result of " +
          "`ref.current instanceof HTMLButtonElement` is displayed inline — it must be `true`. " +
          "ButtonSpecial uses the direct `ref` prop (no `React.forwardRef` wrapper), " +
          "matching the React 19 pattern used throughout this design system.",
      },
    },
  },
};
