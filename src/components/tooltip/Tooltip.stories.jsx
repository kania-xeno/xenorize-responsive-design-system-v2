/**
 * Tooltip.stories.jsx — Production Storybook documentation
 *
 * Covers:
 *   - All 8 placements × 2 sizes × 2 appearances = 32 visual combinations
 *   - Short and long content
 *   - Controlled and uncontrolled
 *   - Disabled (uncontrolled + controlled)
 *   - Existing aria-describedby on trigger
 *   - Viewport-edge placement
 *   - Interaction playground (hover / focus / touch / keyboard / escape / scroll dismiss)
 *
 * Figma source: Design System Scalable — All Platform-V.2.1.0
 *   ↳tooltip — node 2267:38 (32 variants)
 */

import React, { useRef, useState } from "react";
import Tooltip from "./Tooltip.jsx";

// ── Meta ─────────────────────────────────────────────────────────────────────

export default {
  title: "Components/Tooltip/General",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**Tooltip**

Covers all 32 Figma variants (8 placements × 2 sizes × 2 appearances), interaction contracts, ARIA lifecycle, and viewport-edge behaviour.

**Final shadow contract (D2-A):** Light shadow token (8 layers) includes a 1-px ring: \`0 0 0 1px var(--prim-neutral-75)\` (#f5f5f5). Dark shadow token (7 layers) has **no ring** — designer correction 2026-09-22. Dark tail has no stroke; light tail has a 1-px stroke matching \`--tooltip-light-border\`.

**Per-corner radius:** All 4 individual corner bound variables confirmed: \`VariableID:2086:46\` (xs=4px), \`VariableID:2086:47\` (sm=6px).
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["xs", "sm"],
      description: "2X-Small (24px total h) or X-Small (34px total h)",
    },
    appearance: {
      control: { type: "radio" },
      options: ["light", "dark"],
    },
    placement: {
      control: { type: "select" },
      options: [
        "top", "top-start", "top-end",
        "bottom", "bottom-start", "bottom-end",
        "left", "right",
      ],
    },
    openDelay: { control: { type: "number", min: 0, max: 2000, step: 50 } },
    closeDelay: { control: { type: "number", min: 0, max: 2000, step: 50 } },
    showTail: { control: "boolean" },
    disabled: { control: "boolean" },
    content: { control: "text" },
  },
};

// ── Shared trigger helpers ────────────────────────────────────────────────────

const Btn = ({ children, ...props }) => (
  <button
    type="button"
    style={{
      padding: "6px 14px",
      borderRadius: "6px",
      border: "1px solid #ccced7",
      background: "#f4f4f6",
      cursor: "pointer",
      fontSize: "13px",
      fontFamily: "inherit",
    }}
    {...props}
  >
    {children}
  </button>
);

/** Wrapper that gives the tooltip room to render without viewport clip */
const Space = ({ children, style }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px",
      ...style,
    }}
  >
    {children}
  </div>
);

// ── 1. Playground ─────────────────────────────────────────────────────────────

export const Playground = {
  name: "Playground",
  args: {
    content: "Insert Tooltip",
    size: "xs",
    appearance: "light",
    placement: "top",
    openDelay: 300,
    closeDelay: 0,
    showTail: true,
    disabled: false,
  },
  render: (args) => (
    <Space>
      <Tooltip {...args}>
        <Btn>Hover / Focus / Tap me</Btn>
      </Tooltip>
    </Space>
  ),
};

// ── 2. All 8 Placements × xs × light (defaultOpen) ────────────────────────────

const PLACEMENTS = [
  { placement: "top",          label: "top" },
  { placement: "top-start",    label: "top-start" },
  { placement: "top-end",      label: "top-end" },
  { placement: "bottom",       label: "bottom" },
  { placement: "bottom-start", label: "bottom-start" },
  { placement: "bottom-end",   label: "bottom-end" },
  { placement: "left",         label: "left" },
  { placement: "right",        label: "right" },
];

export const AllPlacementsXsLight = {
  name: "All Placements / XS / Light",
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "80px 60px",
        padding: "80px 60px",
      }}
    >
      {PLACEMENTS.map(({ placement, label }) => (
        <div key={placement} style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip
            content="Tooltip label"
            size="xs"
            appearance="light"
            placement={placement}
            defaultOpen
            openDelay={0}
          >
            <Btn>{label}</Btn>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
};

export const AllPlacementsXsDark = {
  name: "All Placements / XS / Dark",
  parameters: { layout: "padded", backgrounds: { default: "neutral" } },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "80px 60px",
        padding: "80px 60px",
      }}
    >
      {PLACEMENTS.map(({ placement, label }) => (
        <div key={placement} style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip
            content="Tooltip label"
            size="xs"
            appearance="dark"
            placement={placement}
            defaultOpen
            openDelay={0}
          >
            <Btn>{label}</Btn>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
};

export const AllPlacementsSmLight = {
  name: "All Placements / SM / Light",
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "100px 60px",
        padding: "100px 60px",
      }}
    >
      {PLACEMENTS.map(({ placement, label }) => (
        <div key={placement} style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip
            content="Tooltip label"
            size="sm"
            appearance="light"
            placement={placement}
            defaultOpen
            openDelay={0}
          >
            <Btn>{label}</Btn>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
};

export const AllPlacementsSmDark = {
  name: "All Placements / SM / Dark",
  parameters: { layout: "padded", backgrounds: { default: "neutral" } },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "100px 60px",
        padding: "100px 60px",
      }}
    >
      {PLACEMENTS.map(({ placement, label }) => (
        <div key={placement} style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip
            content="Tooltip label"
            size="sm"
            appearance="dark"
            placement={placement}
            defaultOpen
            openDelay={0}
          >
            <Btn>{label}</Btn>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
};

// ── 3. Appearance comparison (both open, side by side) ───────────────────────

export const AppearanceComparison = {
  name: "Appearance / Light vs Dark",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: "160px", padding: "80px", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "48px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#999", fontFamily: "monospace" }}>light / xs</span>
        <Tooltip content="Light tooltip xs" size="xs" appearance="light" placement="top" defaultOpen openDelay={0}>
          <Btn>trigger</Btn>
        </Tooltip>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "48px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#999", fontFamily: "monospace" }}>dark / xs</span>
        <Tooltip content="Dark tooltip xs" size="xs" appearance="dark" placement="top" defaultOpen openDelay={0}>
          <Btn>trigger</Btn>
        </Tooltip>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "60px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#999", fontFamily: "monospace" }}>light / sm</span>
        <Tooltip content="Light tooltip sm" size="sm" appearance="light" placement="top" defaultOpen openDelay={0}>
          <Btn>trigger</Btn>
        </Tooltip>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "60px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#999", fontFamily: "monospace" }}>dark / sm</span>
        <Tooltip content="Dark tooltip sm" size="sm" appearance="dark" placement="top" defaultOpen openDelay={0}>
          <Btn>trigger</Btn>
        </Tooltip>
      </div>
    </div>
  ),
};

// ── 4. Content length ─────────────────────────────────────────────────────────

export const ContentLength = {
  name: "Content / Short and Long",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "120px", padding: "100px 60px", alignItems: "center" }}>
      <Tooltip content="Copy" size="xs" appearance="light" placement="top" defaultOpen openDelay={0}>
        <Btn>Short label</Btn>
      </Tooltip>
      <Tooltip
        content="This tooltip has a longer label to verify max-width and wrapping behaviour near the token limit"
        size="sm"
        appearance="light"
        placement="top"
        defaultOpen
        openDelay={0}
      >
        <Btn>Long label</Btn>
      </Tooltip>
      <Tooltip
        content="This tooltip has a longer label to verify max-width and wrapping behaviour near the token limit"
        size="sm"
        appearance="dark"
        placement="bottom"
        defaultOpen
        openDelay={0}
      >
        <Btn>Long / dark / bottom</Btn>
      </Tooltip>
    </div>
  ),
};

// ── 5. Tail on / off ──────────────────────────────────────────────────────────

export const TailVariants = {
  name: "Tail / On and Off",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: "120px", padding: "80px", alignItems: "center" }}>
      <div>
        <p style={{ margin: "0 0 60px", fontSize: "12px", color: "#999", textAlign: "center" }}>showTail=true</p>
        <Tooltip content="With tail" size="xs" appearance="light" placement="top" showTail defaultOpen openDelay={0}>
          <Btn>trigger</Btn>
        </Tooltip>
      </div>
      <div>
        <p style={{ margin: "0 0 60px", fontSize: "12px", color: "#999", textAlign: "center" }}>showTail=false</p>
        <Tooltip content="No tail" size="xs" appearance="light" placement="top" showTail={false} defaultOpen openDelay={0}>
          <Btn>trigger</Btn>
        </Tooltip>
      </div>
    </div>
  ),
};

// ── 6. Disabled ────────────────────────────────────────────────────────────────

export const Disabled = {
  name: "Disabled",
  render: () => (
    <Space>
      <div style={{ display: "flex", gap: "40px" }}>
        <div>
          <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#999" }}>enabled</p>
          <Tooltip content="I appear" size="xs" appearance="light" placement="top" openDelay={0}>
            <Btn>hover me</Btn>
          </Tooltip>
        </div>
        <div>
          <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#999" }}>disabled</p>
          <Tooltip content="I am suppressed" size="xs" appearance="light" placement="top" disabled openDelay={0}>
            <Btn>hover me</Btn>
          </Tooltip>
        </div>
        <div>
          <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#999" }}>defaultOpen + disabled</p>
          <Tooltip
            content="Should not show"
            size="xs"
            appearance="light"
            placement="top"
            defaultOpen
            disabled
            openDelay={0}
          >
            <Btn>hover me</Btn>
          </Tooltip>
        </div>
      </div>
    </Space>
  ),
};

// ── 7. Controlled open state ──────────────────────────────────────────────────

function ControlledExample() {
  const [open, setOpen] = useState(false);
  return (
    <Space>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
        <Tooltip
          content="Controlled tooltip"
          size="sm"
          appearance="light"
          placement="top"
          open={open}
          onOpenChange={setOpen}
          openDelay={0}
        >
          <Btn>hover / focus me</Btn>
        </Tooltip>
        <p style={{ margin: 0, fontSize: "12px", color: "#666", fontFamily: "monospace" }}>
          open = <strong>{String(open)}</strong>
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{ padding: "4px 10px", fontSize: "12px", cursor: "pointer" }}
          >
            Open
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{ padding: "4px 10px", fontSize: "12px", cursor: "pointer" }}
          >
            Close
          </button>
        </div>
      </div>
    </Space>
  );
}

export const ControlledState = {
  name: "Controlled / Open state",
  render: () => <ControlledExample />,
};

// ── 8. Controlled + disabled ─────────────────────────────────────────────────

function ControlledDisabledExample() {
  const [open, setOpen] = useState(true);
  const [disabled, setDisabled] = useState(false);
  return (
    <Space>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
        <Tooltip
          content="Controlled + disabled test"
          size="sm"
          appearance="light"
          placement="top"
          open={open}
          onOpenChange={setOpen}
          disabled={disabled}
          openDelay={0}
        >
          <Btn>trigger</Btn>
        </Tooltip>
        <p style={{ margin: 0, fontSize: "12px", color: "#666", fontFamily: "monospace" }}>
          open={String(open)} disabled={String(disabled)}
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
          <button type="button" onClick={() => setOpen(true)} style={{ fontSize: "12px", padding: "4px 8px" }}>open=true</button>
          <button type="button" onClick={() => setOpen(false)} style={{ fontSize: "12px", padding: "4px 8px" }}>open=false</button>
          <button type="button" onClick={() => setDisabled(d => !d)} style={{ fontSize: "12px", padding: "4px 8px" }}>
            toggle disabled
          </button>
        </div>
        <p style={{ margin: 0, fontSize: "11px", color: "#999", textAlign: "center", maxWidth: "320px" }}>
          While open=true and disabled=true: tooltip should hide (semanticOpen=false),
          onOpenChange(false) called once (ref-guarded), no loop.
        </p>
      </div>
    </Space>
  );
}

export const ControlledDisabled = {
  name: "Controlled / Disabled while open",
  render: () => <ControlledDisabledExample />,
};

// ── 9. Existing aria-describedby on trigger ───────────────────────────────────

export const AriaDescribedBy = {
  name: "ARIA / Existing aria-describedby",
  render: () => (
    <Space>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
        <p id="existing-desc" style={{ margin: 0, fontSize: "12px", color: "#666" }}>
          This paragraph has id="existing-desc"
        </p>
        <Tooltip
          content="Tooltip adds its ID alongside existing ID"
          size="xs"
          appearance="light"
          placement="top"
          openDelay={0}
        >
          <Btn aria-describedby="existing-desc">
            hover / focus (check aria-describedby in DevTools)
          </Btn>
        </Tooltip>
        <p style={{ margin: 0, fontSize: "11px", color: "#999" }}>
          Expected while open: <code>aria-describedby="existing-desc tooltip-[id]"</code><br />
          Expected while closed: <code>aria-describedby="existing-desc"</code>
        </p>
      </div>
    </Space>
  ),
};

// ── 10. Interaction playground (no defaultOpen, real interaction required) ────

export const InteractionPlayground = {
  name: "Interaction / Playground",
  render: () => (
    <Space style={{ padding: "120px 80px", flexWrap: "wrap", gap: "40px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "#999" }}>hover (300ms delay)</span>
        <Tooltip content="Default hover delay 300ms" size="xs" appearance="light" placement="top">
          <Btn>hover</Btn>
        </Tooltip>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "#999" }}>hover (instant)</span>
        <Tooltip content="Instant open" size="xs" appearance="light" placement="top" openDelay={0}>
          <Btn>hover</Btn>
        </Tooltip>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "#999" }}>focus (Tab)</span>
        <Tooltip content="Focus tooltip" size="xs" appearance="light" placement="top" openDelay={0}>
          <Btn>Tab to focus</Btn>
        </Tooltip>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "#999" }}>safePolygon (WCAG 1.4.13)</span>
        <Tooltip
          content="Move pointer here without closing"
          size="sm"
          appearance="light"
          placement="right"
          openDelay={0}
        >
          <Btn>hover then move to tooltip →</Btn>
        </Tooltip>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "#999" }}>Escape dismissal</span>
        <Tooltip content="Press Escape to close" size="xs" appearance="dark" placement="top" openDelay={0}>
          <Btn>hover then Escape</Btn>
        </Tooltip>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "#999" }}>dark / sm</span>
        <Tooltip content="Dark small tooltip" size="sm" appearance="dark" placement="bottom" openDelay={0}>
          <Btn>hover</Btn>
        </Tooltip>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "#999" }}>Enter/Space = click, not toggle</span>
        <Tooltip content="Enter/Space fires click, not tooltip" size="xs" appearance="light" placement="top" openDelay={0}>
          <Btn onClick={() => alert("Button clicked — tooltip should NOT have toggled")}>
            Tab here, press Enter
          </Btn>
        </Tooltip>
      </div>
    </Space>
  ),
};

// ── 11. Touch tap sequence ─────────────────────────────────────────────────────

export const TouchTap = {
  name: "Interaction / Touch tap sequence",
  render: () => (
    <Space>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
        <Tooltip content="Tap 1 = open, Tap 2 = close" size="xs" appearance="light" placement="top" openDelay={0}>
          <Btn>Touch / tap me</Btn>
        </Tooltip>
        <p style={{ margin: 0, fontSize: "11px", color: "#999", textAlign: "center", maxWidth: "260px" }}>
          On touch: first tap opens, second tap closes.
          Outside tap closes. Scroll closes.
          No synthetic mouse conflict (useHover mouseOnly=true + useClick ignoreMouse=true).
        </p>
      </div>
    </Space>
  ),
};

// ── 12. Scroll dismissal ──────────────────────────────────────────────────────

export const ScrollDismissal = {
  name: "Interaction / Scroll dismiss",
  render: () => (
    <div
      style={{
        height: "300px",
        overflow: "auto",
        border: "1px dashed #ccc",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <div style={{ height: "600px", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "80px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <Tooltip content="Scrolling this container should dismiss" size="xs" appearance="light" placement="top" openDelay={0}>
            <Btn>hover then scroll this box</Btn>
          </Tooltip>
          <p style={{ margin: 0, fontSize: "11px", color: "#999" }}>
            useDismiss(ancestorScroll:true) — tooltip closes on ancestor scroll.
          </p>
        </div>
      </div>
    </div>
  ),
};

// ── 13. Viewport-edge placement ───────────────────────────────────────────────

export const ViewportEdge = {
  name: "Viewport / Edge flip and shift",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Near each edge — Floating UI should flip/shift automatically */}
      <div style={{ position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)" }}>
        <Tooltip content="Near top — should flip to bottom" size="xs" appearance="light" placement="top" openDelay={0}>
          <Btn>top edge</Btn>
        </Tooltip>
      </div>
      <div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)" }}>
        <Tooltip content="Near bottom — should flip to top" size="xs" appearance="light" placement="bottom" openDelay={0}>
          <Btn>bottom edge</Btn>
        </Tooltip>
      </div>
      <div style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)" }}>
        <Tooltip content="Near left edge — shift or flip" size="xs" appearance="light" placement="left" openDelay={0}>
          <Btn>left</Btn>
        </Tooltip>
      </div>
      <div style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)" }}>
        <Tooltip content="Near right edge — shift or flip" size="xs" appearance="light" placement="right" openDelay={0}>
          <Btn>right</Btn>
        </Tooltip>
      </div>
      {/* Top-start near left edge — should shift */}
      <div style={{ position: "absolute", top: "40px", left: "8px" }}>
        <Tooltip content="top-start near left — should shift" size="xs" appearance="dark" placement="top-start" openDelay={0}>
          <Btn>top-start</Btn>
        </Tooltip>
      </div>
      {/* Top-end near right edge — should shift */}
      <div style={{ position: "absolute", top: "40px", right: "8px" }}>
        <Tooltip content="top-end near right — should shift" size="xs" appearance="dark" placement="top-end" openDelay={0}>
          <Btn>top-end</Btn>
        </Tooltip>
      </div>
    </div>
  ),
};

// ── 14. No tail (no showTail) ────────────────────────────────────────────────

export const NoTail = {
  name: "Tail / No tail",
  render: () => (
    <Space>
      <Tooltip content="No arrow tail" size="xs" appearance="light" placement="top" showTail={false} defaultOpen openDelay={0}>
        <Btn>trigger</Btn>
      </Tooltip>
    </Space>
  ),
};

// ── 15. All 32 matrix grid ────────────────────────────────────────────────────

export const Matrix32 = {
  name: "Matrix / All 32 combinations",
  parameters: { layout: "padded" },
  render: () => {
    const sizes = ["xs", "sm"];
    const appearances = ["light", "dark"];
    const placements = [
      "top", "top-start", "top-end",
      "bottom", "bottom-start", "bottom-end",
      "left", "right",
    ];

    return (
      <div style={{ padding: "16px" }}>
        {sizes.map((size) =>
          appearances.map((appearance) => (
            <div key={`${size}-${appearance}`} style={{ marginBottom: "48px" }}>
              <h3 style={{ fontFamily: "monospace", fontSize: "13px", margin: "0 0 16px", color: "#666" }}>
                size={size} / appearance={appearance}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "100px 60px",
                  padding: "80px 40px",
                  background: appearance === "dark" ? "#f4f4f6" : "#ffffff",
                  border: "1px solid #ebecef",
                  borderRadius: "8px",
                }}
              >
                {placements.map((placement) => (
                  <div key={placement} style={{ display: "flex", justifyContent: "center" }}>
                    <Tooltip
                      content="Label"
                      size={size}
                      appearance={appearance}
                      placement={placement}
                      defaultOpen
                      openDelay={0}
                    >
                      <Btn style={{ fontSize: "11px", padding: "4px 8px" }}>{placement}</Btn>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    );
  },
};
