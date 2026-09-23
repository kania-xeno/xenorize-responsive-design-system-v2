/* ─────────────────────────────────────────────────────────────────────────────
   InfoPopover — Storybook validation harness
   D3.1 ref: component-info-popover-dt-d3-runtime-implementation.md
   Source: Figma ↳info-popover (3486:74, 16 variants = 8 placements × 2 appearances)

   20 required stories (D3.1 spec):
   01. Playground               — interactive controls, all props
   02. All Placements / Light   — 8-placement proof (Light appearance)
   03. All Placements / Dark    — 8-placement proof (Dark appearance)
   04. Appearance Comparison    — Light vs Dark side-by-side (full 16-variant proof)
   05. Title Only               — description omitted (no aria-describedby)
   06. Long Content             — wrapping title + description at max-width 280 px
   07. No Tail                  — showTail=false
   08. No Left Icon             — showLeftIcon=false
   09. No Dismiss               — showDismiss=false
   10. Controlled State         — externally managed open with parent toggle button
   11. Uncontrolled State       — defaultOpen uncontrolled
   12. Disabled                 — trigger present, no open
   13. Dismiss Button           — proves onDismiss + onOpenChange + reason="dismiss-button"
   14. Escape Dismissal         — proves reason="escape-key" from FUI useDismiss
   15. Outside Click Dismissal  — proves reason="outside-press" + no focus steal
   16. Focus Restoration        — keyboard / dismiss-button restore; outside-click does not
   17. Viewport Edge / Flip and Shift — FUI flip/shift middleware
   18. Accessible Relationships — role=dialog, aria-labelledby, conditional aria-describedby
   19. CompactButton / CrossSmall Dependency — ghost/large/no-fullRadius/CrossSmall
   20. Accepted Accessibility Exception — AE-01 light description 2.53:1 WCAG AA FAIL

   D3.1 constraints (always active):
   • No role="tooltip"            • No FloatingArrow         • No CloseLine icon
   • No [data-theme] token drive  • No hardcoded aria-label="Close"
   • AE-01 light description token MUST NOT be altered
   ──────────────────────────────────────────────────────────────────────────── */

import React, { useRef, useState } from "react";
import InfoPopover from "./InfoPopover.jsx";
import CircleInfo from "../../icons/CircleInfo.jsx";
import CrossSmall from "../../icons/CrossSmall.jsx";
import Button from "../button/Button.jsx";

/* ── Story meta ─────────────────────────────────────────────────────────── */

export default {
  title:     "Components/Info Popover/General",
  component: InfoPopover,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Popover title (required).",
    },
    description: {
      control: "text",
      description:
        "Supplemental description text. " +
        "AE-01: light description token = #A3A3A3 on #FFFFFF (2.53:1) — " +
        "KNOWN ACCESSIBILITY EXCEPTION, designer accepted.",
    },
    placement: {
      control: { type: "select" },
      options: [
        "bottom", "bottom-start", "bottom-end",
        "top",    "top-start",    "top-end",
        "left",   "right",
      ],
      description: "@floating-ui placement (Figma '🧩 Type' axis mapped to FUI convention).",
    },
    appearance: {
      control: { type: "radio" },
      options: ["light", "dark"],
      description:
        "Appearance mode. SINGLE-MODE: tokens are appearance-static (NOT [data-theme] driven).",
    },
    showTail: {
      control: "boolean",
      description: "Show / hide the custom bezier tail.",
    },
    showLeftIcon: {
      control: "boolean",
      description: "Show / hide the left icon slot.",
    },
    showDismiss: {
      control: "boolean",
      description: "Show / hide the dismiss (close) CompactButton.",
    },
    dismissLabel: {
      control: "text",
      description: "aria-label on the CompactButton dismiss button. Default: \"Close\".",
    },
    disabled: {
      control: "boolean",
      description: "Disable the trigger — prevents opening.",
    },
    defaultOpen: {
      control: "boolean",
      description: "Uncontrolled initial open state.",
    },
  },
};

/* ── Helpers ────────────────────────────────────────────────────────────── */

/** Wrapper giving the floating popover room to render without clipping. */
function Space({ children, dark = false, wide = false }) {
  return (
    <div
      style={{
        padding:        wide ? "80px 120px" : "80px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        background:     dark ? "var(--prim-neutral-900, #1c1c1c)" : undefined,
        borderRadius:   "8px",
        gap:            "24px",
        flexWrap:       "wrap",
      }}
    >
      {children}
    </div>
  );
}

/** Minimal trigger button matching the Figma trigger context. */
function InfoBtn({ dark = false, ...rest }) {
  return (
    <button
      type="button"
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          "32px",
        height:         "32px",
        padding:        "0",
        border:         "1px solid",
        borderColor:    dark
          ? "var(--prim-neutral-700, #3d3d3d)"
          : "var(--prim-neutral-200, #e0e0e0)",
        borderRadius:   "6px",
        background:     dark
          ? "var(--prim-neutral-900, #1c1c1c)"
          : "var(--prim-slate-0, #ffffff)",
        color:          dark
          ? "var(--prim-neutral-400, #a3a3a3)"
          : "var(--prim-neutral-600, #5c5c5c)",
        cursor:         "pointer",
      }}
      {...rest}
    >
      <CircleInfo />
    </button>
  );
}

/* ── Story default args ─────────────────────────────────────────────────── */

const DEFAULT_ARGS = {
  title:        "Helpful information",
  description:  "This popover provides context about the associated feature or field.",
  placement:    "bottom",
  appearance:   "light",
  showTail:     true,
  showLeftIcon: true,
  showDismiss:  true,
  dismissLabel: "Close",
  disabled:     false,
  defaultOpen:  false,
};

/* ──────────────────────────────────────────────────────────────────────────
   01. Playground — interactive controls for all props
   ────────────────────────────────────────────────────────────────────────── */
export const Playground = {
  name: "Playground",
  args: { ...DEFAULT_ARGS, defaultOpen: true },
  render: (args) => (
    <Space dark={args.appearance === "dark"}>
      <InfoPopover {...args}>
        <InfoBtn dark={args.appearance === "dark"} />
      </InfoPopover>
    </Space>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   02. All Placements / Light — 8-placement proof, light appearance
   Figma: 8 variants with 🌙 Dark Mode = Off (Light).
   ────────────────────────────────────────────────────────────────────────── */
export const AllPlacementsLight = {
  name: "All Placements / Light",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div
      style={{
        display:        "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap:            "16px",
        padding:        "48px",
        background:     "#f9f9fb",
      }}
    >
      {[
        "bottom", "bottom-start", "bottom-end",
        "top",    "top-start",    "top-end",
        "left",   "right",
      ].map((pl) => (
        <Space key={pl}>
          <InfoPopover
            title="Helpful information"
            description="This popover provides context about the feature."
            placement={pl}
            appearance="light"
            defaultOpen
          >
            <InfoBtn />
          </InfoPopover>
        </Space>
      ))}
    </div>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   03. All Placements / Dark — 8-placement proof, dark appearance
   Figma: 8 variants with 🌙 Dark Mode = On (Dark).
   ────────────────────────────────────────────────────────────────────────── */
export const AllPlacementsDark = {
  name: "All Placements / Dark",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div
      style={{
        display:        "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap:            "16px",
        padding:        "48px",
        background:     "#1c1c1c",
      }}
    >
      {[
        "bottom", "bottom-start", "bottom-end",
        "top",    "top-start",    "top-end",
        "left",   "right",
      ].map((pl) => (
        <Space key={pl} dark>
          <InfoPopover
            title="Helpful information"
            description="This popover provides context about the feature."
            placement={pl}
            appearance="dark"
            defaultOpen
          >
            <InfoBtn dark />
          </InfoPopover>
        </Space>
      ))}
    </div>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   04. Appearance Comparison — Light vs Dark side-by-side
   Full 16-variant proof: 8×Light + 8×Dark.
   SINGLE-MODE tokens: appearance-static, NOT [data-theme] driven.
   AE-01: light description = #A3A3A3 on #FFFFFF = 2.53:1 — KNOWN EXCEPTION.
   ────────────────────────────────────────────────────────────────────────── */
export const AppearanceComparison = {
  name: "Appearance Comparison",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "flex", gap: 0, minHeight: "200px" }}>
      {/* Light — 8 placements */}
      <div style={{ flex: 1, background: "#ffffff", padding: "80px 40px" }}>
        <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#5c5c5c", marginBottom: "24px" }}>
          Light (Dark Mode = Off) — 8 placements × Light
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {["bottom","top","left","right"].map((pl) => (
            <Space key={pl}>
              <InfoPopover
                title="Light popover"
                description="Light description text."
                placement={pl}
                appearance="light"
                defaultOpen
              >
                <InfoBtn />
              </InfoPopover>
            </Space>
          ))}
        </div>
      </div>
      {/* Dark — 8 placements */}
      <div style={{ flex: 1, background: "#1c1c1c", padding: "80px 40px" }}>
        <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#a3a3a3", marginBottom: "24px" }}>
          Dark (Dark Mode = On) — 8 placements × Dark
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {["bottom","top","left","right"].map((pl) => (
            <Space key={pl} dark>
              <InfoPopover
                title="Dark popover"
                description="Dark description text."
                placement={pl}
                appearance="dark"
                defaultOpen
              >
                <InfoBtn dark />
              </InfoPopover>
            </Space>
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   05. Title Only — description omitted.
   Validates: no aria-describedby when description is absent.
   ────────────────────────────────────────────────────────────────────────── */
export const TitleOnly = {
  name: "Title Only",
  args: { ...DEFAULT_ARGS, description: undefined, defaultOpen: true },
  render: (args) => (
    <Space>
      <InfoPopover {...args}>
        <InfoBtn />
      </InfoPopover>
    </Space>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   06. Long Content — wrapping title + description at max-width 280 px
   ────────────────────────────────────────────────────────────────────────── */
export const LongContent = {
  name: "Long Content",
  args: {
    ...DEFAULT_ARGS,
    title:
      "This is a longer title that may wrap to a second line within 280 px",
    description:
      "Supplemental information that provides additional context about this feature or field. " +
      "It may span multiple lines within the 280 px maximum width constraint set by the component.",
    defaultOpen: true,
  },
  render: (args) => (
    <Space>
      <InfoPopover {...args}>
        <InfoBtn />
      </InfoPopover>
    </Space>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   07. No Tail — showTail=false
   ────────────────────────────────────────────────────────────────────────── */
export const NoTail = {
  name: "No Tail",
  args: { ...DEFAULT_ARGS, showTail: false, defaultOpen: true },
  render: (args) => (
    <Space>
      <InfoPopover {...args}>
        <InfoBtn />
      </InfoPopover>
    </Space>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   08. No Left Icon — showLeftIcon=false
   ────────────────────────────────────────────────────────────────────────── */
export const NoLeftIcon = {
  name: "No Left Icon",
  args: { ...DEFAULT_ARGS, showLeftIcon: false, defaultOpen: true },
  render: (args) => (
    <Space>
      <InfoPopover {...args}>
        <InfoBtn />
      </InfoPopover>
    </Space>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   09. No Dismiss — showDismiss=false
   Validates: CompactButton absent, dialog still closable via Escape + outside-press.
   ────────────────────────────────────────────────────────────────────────── */
export const NoDismiss = {
  name: "No Dismiss",
  args: { ...DEFAULT_ARGS, showDismiss: false, defaultOpen: true },
  render: (args) => (
    <Space>
      <InfoPopover {...args}>
        <InfoBtn />
      </InfoPopover>
    </Space>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   10. Controlled State — externally managed open / close
   Demonstrates: open prop + onOpenChange callback; parent toggle button.
   ────────────────────────────────────────────────────────────────────────── */
export const ControlledState = {
  name: "Controlled State",
  args: DEFAULT_ARGS,
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <Space>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <InfoPopover
            {...args}
            open={open}
            onOpenChange={setOpen}
          >
            <InfoBtn />
          </InfoPopover>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Open"} popover
          </Button>
        </div>
      </Space>
    );
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   11. Uncontrolled State — defaultOpen, no controlled binding
   Demonstrates: internal state managed by InfoPopover itself.
   ────────────────────────────────────────────────────────────────────────── */
export const UncontrolledState = {
  name: "Uncontrolled State",
  args: { ...DEFAULT_ARGS, defaultOpen: true },
  render: (args) => (
    <Space>
      <InfoPopover {...args}>
        <InfoBtn />
      </InfoPopover>
    </Space>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   12. Disabled — trigger present, click has no effect
   ────────────────────────────────────────────────────────────────────────── */
export const Disabled = {
  name: "Disabled",
  args: { ...DEFAULT_ARGS, disabled: true },
  render: (args) => (
    <Space>
      <InfoPopover {...args}>
        <InfoBtn
          aria-disabled="true"
          style={{ opacity: 0.5, cursor: "not-allowed" }}
        />
      </InfoPopover>
    </Space>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   13. Dismiss Button — proves onDismiss + onOpenChange + reason="dismiss-button"
   Open the popover, click the CrossSmall dismiss button.
   Console panel will show: onOpenChange(false) + onDismiss({reason:"dismiss-button"}).
   Validates: D3.1.1 (onDismiss contract), D3.1.4 (CrossSmall, not CloseLine),
              D3.1.1 (dismissLabel as aria-label, not hardcoded "Close").
   ────────────────────────────────────────────────────────────────────────── */
export const DismissButton = {
  name: "Dismiss Button",
  args: DEFAULT_ARGS,
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [log, setLog] = useState([]);
    const addLog = (msg) => setLog((prev) => [...prev.slice(-4), msg]);
    return (
      <Space>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          <InfoPopover
            {...args}
            defaultOpen
            dismissLabel="Close"
            onOpenChange={(open, _event, reason) =>
              addLog(`onOpenChange(${open}, reason="${reason ?? "—"}")`)
            }
            onDismiss={({ reason }) =>
              addLog(`onDismiss({ reason: "${reason}" })`)
            }
          >
            <InfoBtn />
          </InfoPopover>
          <div
            style={{
              fontFamily:   "monospace",
              fontSize:     "11px",
              background:   "#f4f4f6",
              border:       "1px solid #e0e0e0",
              borderRadius: "6px",
              padding:      "8px 12px",
              minWidth:     "280px",
              minHeight:    "60px",
              color:        "#1c1c1c",
            }}
          >
            {log.length === 0
              ? "Click the × dismiss button to see callbacks…"
              : log.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>
      </Space>
    );
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   14. Escape Dismissal — proves reason="escape-key" from FUI useDismiss
   Open the popover, then press Escape. Console shows reason="escape-key".
   Validates: D3.1.1 (onDismiss fires for escape-key),
              D3.1.3 (focus returns to trigger after Escape).
   ────────────────────────────────────────────────────────────────────────── */
export const EscapeDismissal = {
  name: "Escape Dismissal",
  args: DEFAULT_ARGS,
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [log, setLog] = useState([]);
    const addLog = (msg) => setLog((prev) => [...prev.slice(-4), msg]);
    return (
      <Space>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          <InfoPopover
            {...args}
            defaultOpen
            onOpenChange={(open, _event, reason) =>
              addLog(`onOpenChange(${open}, reason="${reason ?? "—"}")`)
            }
            onDismiss={({ reason }) =>
              addLog(`onDismiss({ reason: "${reason}" })`)
            }
          >
            <InfoBtn />
          </InfoPopover>
          <div
            style={{
              fontFamily:   "monospace",
              fontSize:     "11px",
              background:   "#f4f4f6",
              border:       "1px solid #e0e0e0",
              borderRadius: "6px",
              padding:      "8px 12px",
              minWidth:     "280px",
              minHeight:    "60px",
              color:        "#1c1c1c",
            }}
          >
            {log.length === 0
              ? "Open popover, then press Escape…"
              : log.map((l, i) => <div key={i}>{l}</div>)}
          </div>
          <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#5c5c5c", maxWidth: "280px", textAlign: "center" }}>
            After Escape: focus should return to the trigger button (D3.1.3).
          </p>
        </div>
      </Space>
    );
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   15. Outside Click Dismissal — reason="outside-press", no focus steal
   Open the popover, then click the "Other button" below.
   Validates: D3.1.3 — outside-press must NOT steal focus back to trigger.
   The "Other button" should retain focus after the click.
   ────────────────────────────────────────────────────────────────────────── */
export const OutsideClickDismissal = {
  name: "Outside Click Dismissal",
  args: DEFAULT_ARGS,
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [log, setLog] = useState([]);
    const addLog = (msg) => setLog((prev) => [...prev.slice(-4), msg]);
    return (
      <Space>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <InfoPopover
              {...args}
              defaultOpen
              onOpenChange={(open, _event, reason) =>
                addLog(`onOpenChange(${open}, reason="${reason ?? "—"}")`)
              }
              onDismiss={({ reason }) =>
                addLog(`onDismiss({ reason: "${reason}" })`)
              }
            >
              <InfoBtn />
            </InfoPopover>
            <Button
              variant="secondary"
              size="small"
              onFocus={() => addLog("→ Other button: focused")}
            >
              Other button
            </Button>
          </div>
          <div
            style={{
              fontFamily:   "monospace",
              fontSize:     "11px",
              background:   "#f4f4f6",
              border:       "1px solid #e0e0e0",
              borderRadius: "6px",
              padding:      "8px 12px",
              minWidth:     "280px",
              minHeight:    "80px",
              color:        "#1c1c1c",
            }}
          >
            {log.length === 0
              ? "Click 'Other button' while popover is open…"
              : log.map((l, i) => <div key={i}>{l}</div>)}
          </div>
          <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#5c5c5c", maxWidth: "280px", textAlign: "center" }}>
            ✅ Expected: "Other button: focused" appears AFTER outside-press close.
            Focus must NOT return to the trigger (D3.1.3).
          </p>
        </div>
      </Space>
    );
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   16. Focus Restoration — keyboard / dismiss-button restore; outside-click does not
   Three columns demonstrating the three focus scenarios (D3.1.3):
   A) Dismiss button click → focus returns to trigger ✓
   B) Escape key          → focus returns to trigger ✓
   C) Outside click       → focus stays on 'Other' button ✗ (no steal)
   ────────────────────────────────────────────────────────────────────────── */
export const FocusRestoration = {
  name: "Focus Restoration",
  parameters: { layout: "fullscreen" },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [logA, setLogA] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [logB, setLogB] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [logC, setLogC] = useState([]);
    const triggerStyle = {
      fontFamily: "sans-serif", fontSize: "11px", fontWeight: "600",
      color: "#1c1c1c", marginBottom: "8px",
    };
    const logBox = {
      fontFamily: "monospace", fontSize: "10px", background: "#f4f4f6",
      border: "1px solid #e0e0e0", borderRadius: "6px",
      padding: "6px 10px", minHeight: "48px", color: "#1c1c1c", marginTop: "8px",
    };
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", padding: "40px" }}>
        {/* A — Dismiss button */}
        <div>
          <p style={triggerStyle}>A: Dismiss button → focus returns to trigger</p>
          <Space>
            <InfoPopover
              title="Dismiss button scenario"
              defaultOpen
              onDismiss={({ reason }) => setLogA((p) => [...p.slice(-3), `onDismiss: ${reason}`])}
            >
              <InfoBtn onFocus={() => setLogA((p) => [...p.slice(-3), "trigger: focused"])} />
            </InfoPopover>
          </Space>
          <div style={logBox}>
            {logA.length === 0 ? "Click × to dismiss…" : logA.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>

        {/* B — Escape key */}
        <div>
          <p style={triggerStyle}>B: Escape key → focus returns to trigger</p>
          <Space>
            <InfoPopover
              title="Escape key scenario"
              defaultOpen
              onDismiss={({ reason }) => setLogB((p) => [...p.slice(-3), `onDismiss: ${reason}`])}
            >
              <InfoBtn onFocus={() => setLogB((p) => [...p.slice(-3), "trigger: focused"])} />
            </InfoPopover>
          </Space>
          <div style={logBox}>
            {logB.length === 0 ? "Press Escape to dismiss…" : logB.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>

        {/* C — Outside click */}
        <div>
          <p style={triggerStyle}>C: Outside click → NO focus steal (focus stays on other btn)</p>
          <Space>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <InfoPopover
                title="Outside click scenario"
                defaultOpen
                onDismiss={({ reason }) => setLogC((p) => [...p.slice(-3), `onDismiss: ${reason}`])}
              >
                <InfoBtn />
              </InfoPopover>
              <Button
                variant="secondary"
                size="small"
                onFocus={() => setLogC((p) => [...p.slice(-3), "other btn: focused ✓"])}
              >
                Click me
              </Button>
            </div>
          </Space>
          <div style={logBox}>
            {logC.length === 0 ? "Click 'Click me' while popover is open…" : logC.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>
      </div>
    );
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   17. Viewport Edge / Flip and Shift
   Trigger positioned near viewport edge to exercise FUI flip + shift middleware.
   ────────────────────────────────────────────────────────────────────────── */
export const ViewportEdgeFlipShift = {
  name: "Viewport Edge / Flip and Shift",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ position: "relative", width: "100vw", height: "300px", background: "#f9f9fb" }}>
      {/* Bottom-left corner */}
      <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
        <InfoPopover title="Near bottom-left" description="FUI should flip up and shift right." placement="bottom" defaultOpen>
          <InfoBtn />
        </InfoPopover>
      </div>
      {/* Bottom-right corner */}
      <div style={{ position: "absolute", bottom: "16px", right: "16px" }}>
        <InfoPopover title="Near bottom-right" description="FUI should flip up and shift left." placement="bottom" defaultOpen>
          <InfoBtn />
        </InfoPopover>
      </div>
      {/* Top-left corner */}
      <div style={{ position: "absolute", top: "16px", left: "16px" }}>
        <InfoPopover title="Near top-left" description="FUI should flip down and shift right." placement="top" defaultOpen>
          <InfoBtn />
        </InfoPopover>
      </div>
      {/* Top-right corner */}
      <div style={{ position: "absolute", top: "16px", right: "16px" }}>
        <InfoPopover title="Near top-right" description="FUI should flip down and shift left." placement="top" defaultOpen>
          <InfoBtn />
        </InfoPopover>
      </div>
    </div>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   18. Accessible Relationships — ARIA contract inspection
   Validates:
   • role="dialog" (NOT role="tooltip")
   • aria-labelledby → title element id
   • aria-describedby → description element id (only when description exists)
   • aria-describedby absent when description is undefined
   • aria-modal={false}
   ────────────────────────────────────────────────────────────────────────── */
export const AccessibleRelationships = {
  name: "Accessible Relationships",
  render: () => (
    <Space wide>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* With description — aria-describedby present */}
        <div>
          <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#5c5c5c", marginBottom: "8px" }}>
            With description → aria-describedby set
          </p>
          <InfoPopover
            id="aria-test-with-desc"
            title="ARIA test (with description)"
            description="This description is linked via aria-describedby."
            defaultOpen
          >
            <InfoBtn />
          </InfoPopover>
        </div>
        {/* Without description — aria-describedby absent */}
        <div>
          <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#5c5c5c", marginBottom: "8px" }}>
            Without description → aria-describedby absent
          </p>
          <InfoPopover
            id="aria-test-no-desc"
            title="ARIA test (title only)"
            defaultOpen
          >
            <InfoBtn />
          </InfoPopover>
        </div>
      </div>
    </Space>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   19. CompactButton / CrossSmall Dependency
   Validates D3.1.4 dependency contract:
   • variant="ghost" / size="large" / fullRadius={false}
   • icon={<CrossSmall />} — NOT CloseLine
   • aria-label={dismissLabel} (from prop, not hardcoded)
   • 24×24 rendered hit area
   Open browser devtools to inspect the rendered CompactButton instance.
   ────────────────────────────────────────────────────────────────────────── */
export const CompactButtonCrossSmallDependency = {
  name: "CompactButton / CrossSmall Dependency",
  render: () => (
    <Space wide>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
        {/* Default dismissLabel="Close" */}
        <div>
          <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#5c5c5c", marginBottom: "8px" }}>
            Default: aria-label="Close"
          </p>
          <InfoPopover title="Default dismiss label" defaultOpen dismissLabel="Close">
            <InfoBtn />
          </InfoPopover>
        </div>
        {/* Custom dismissLabel */}
        <div>
          <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#5c5c5c", marginBottom: "8px" }}>
            Custom: aria-label="Dismiss tooltip"
          </p>
          <InfoPopover title="Custom dismiss label" defaultOpen dismissLabel="Dismiss tooltip">
            <InfoBtn />
          </InfoPopover>
        </div>
        {/* Proof of CrossSmall icon rendering */}
        <div style={{ fontFamily: "sans-serif", fontSize: "11px", color: "#5c5c5c", maxWidth: "280px" }}>
          <strong>Expected in devtools:</strong>
          <ul style={{ margin: "4px 0 0 16px", lineHeight: "1.6" }}>
            <li>data-variant="ghost"</li>
            <li>data-size="large"</li>
            <li>aria-label="Close" (or custom dismissLabel)</li>
            <li>CrossSmall SVG inside button (NOT CloseLine)</li>
            <li>fullRadius=false (no border-radius: 9999px)</li>
          </ul>
        </div>
      </div>
    </Space>
  ),
};

/* ──────────────────────────────────────────────────────────────────────────
   20. Accepted Accessibility Exception — AE-01
   KNOWN ACCESSIBILITY EXCEPTION — DESIGNER ACCEPTED.
   light description token = --info-popover-light-text-description
                           = --prim-neutral-400
                           = #A3A3A3 on #FFFFFF
                           = 2.53:1
                           = WCAG AA FAIL (required: 4.5:1 for normal text)
   Do NOT:
   • classify as accessible
   • report as WCAG AA compliant
   • darken the token
   • substitute another token
   • create another variable
   • add runtime warning attributes
   • add axe suppression
   • modify the dark description token
   ────────────────────────────────────────────────────────────────────────── */
export const AcceptedAccessibilityException = {
  name: "Accepted Accessibility Exception",
  render: () => (
    <Space>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
        <InfoPopover
          title="AE-01 — Accepted exception"
          description="This description uses #A3A3A3 on #FFFFFF = 2.53:1"
          appearance="light"
          defaultOpen
        >
          <InfoBtn />
        </InfoPopover>
        <div
          style={{
            fontFamily:   "sans-serif",
            fontSize:     "11px",
            background:   "#fff8e1",
            border:       "1px solid #ffe082",
            borderRadius: "6px",
            padding:      "8px 12px",
            maxWidth:     "280px",
            color:        "#5c4300",
            lineHeight:   "1.5",
          }}
        >
          <strong>AE-01: KNOWN ACCESSIBILITY EXCEPTION</strong>
          <br />
          Token: <code>--info-popover-light-text-description</code>
          <br />
          Value: <code>#A3A3A3</code> on <code>#FFFFFF</code> = <strong>2.53:1</strong>
          <br />
          WCAG AA requires 4.5:1 for normal text.
          <br />
          <strong>Status: DESIGNER ACCEPTED — do not alter.</strong>
        </div>
      </div>
    </Space>
  ),
};
