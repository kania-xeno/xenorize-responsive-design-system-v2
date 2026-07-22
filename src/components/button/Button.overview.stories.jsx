import Button from "./Button.jsx";
import CopyIcon from "../../icons/CopyIcon.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// Overview — cross-size stories for Button
// Figma source: Design System Scalable — All Platform V.2.1.0
//   ↳buttons-large (1897:1592) · ↳buttons-medium (1921:3648) · ↳buttons-small (1921:4253)
// DS Auditor handoff: design-system-handsoff/component-button-handoff-brief.md
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: "Components/Button/Overview",
  parameters: {
    docs: {
      description: {
        component: `
**Button — Size Overview**

Cross-size reference stories for Button Large, Medium, and Small.

**Size guidance:**
- **Large** — primary CTAs in full-screen sections, hero areas, onboarding steps, empty states, modal primary actions
- **Medium** — default for most UI contexts: forms, cards, dialogs, side panels, page headers
- **Small** — compact or dense UI: data table rows, filter bars, tag groups, compact panels, inline actions

**Rules:**
- Do not mix Large and Small in the same button group
- Stick to one size per context
- When in doubt, use Medium

**Badge:** supported on Large and Medium only. Do not add Badge to Small.
        `,
      },
    },
  },
};

// ── All Sizes ─────────────────────────────────────────────────────────────────

export const AllSizes = {
  name: "All Sizes",
  parameters: {
    docs: {
      description: {
        story: "Large · Medium · Small shown side by side with a consistent label, type (Primary), and style (Filled). Use this as the sizing reference — do not mix Large and Small in the same button group.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

      {/* Size comparison — text only */}
      <section>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontFamily: "var(--font-family-body)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Size comparison — Filled / Primary
          </span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <Button type="primary" variant="filled" size="large">Large</Button>
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: 11, color: "#aaa" }}>large</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <Button type="primary" variant="filled" size="medium">Medium</Button>
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: 11, color: "#aaa" }}>medium</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <Button type="primary" variant="filled" size="small">Small</Button>
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: 11, color: "#aaa" }}>small</span>
          </div>
        </div>
      </section>

      {/* All styles across sizes */}
      {["filled", "outline", "lighter", "ghost"].map((variant) => (
        <section key={variant}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {variant} — all sizes
            </span>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Button type="primary" variant={variant} size="large">Button</Button>
            <Button type="primary" variant={variant} size="medium">Button</Button>
            <Button type="primary" variant={variant} size="small">Button</Button>
          </div>
        </section>
      ))}

      {/* Icon-only across sizes */}
      <section>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontFamily: "var(--font-family-body)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Icon only — all sizes (40 · 36 · 28px)
          </span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Button type="primary" variant="filled" size="large" onlyIcon icon={<CopyIcon />} aria-label="Copy" />
          <Button type="primary" variant="filled" size="medium" onlyIcon icon={<CopyIcon />} aria-label="Copy" />
          <Button type="primary" variant="filled" size="small" onlyIcon icon={<CopyIcon />} aria-label="Copy" />
        </div>
      </section>

      {/* Badge — Large + Medium only */}
      <section>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontFamily: "var(--font-family-body)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            With badge — Large + Medium only (not Small)
          </span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Button type="primary" variant="filled" size="large" badge={5}>Button</Button>
          <Button type="primary" variant="filled" size="medium" badge={5}>Button</Button>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
            <Button type="primary" variant="filled" size="small" disabled>Button</Button>
            <span style={{ fontFamily: "var(--font-family-body)", fontSize: 11, color: "#aaa" }}>badge not supported on small</span>
          </div>
        </div>
      </section>

    </div>
  ),
};
