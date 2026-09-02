import React, { useState } from 'react';
import StatusModal from './StatusModal.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// StatusModal — Components/Modal/Status Modal
// Figma: ↳status-modal (ComponentSet) | ❖ Modal page
// File key: 0aVnOgjVWH1YL8JCnjXTBi
//
// Primary public API for semantic status dialogs.
// Displays one of four status types (error · warning · success · information)
// with a 48×48 icon frame, title, optional body, and CTA buttons.
// No close button — dismissal via CTA or Escape only.
//
// Stories: Default variant · Overlay variant · Status types ·
//          Alignment · Content variations
//
// Story-only utilities (MockBackground, ReopenButton) are NOT exported.
// ─────────────────────────────────────────────────────────────────────────────

// ── Story-only: mock page background ─────────────────────────────────────────
const MockBackground = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: 'var(--color-surface-soft, #f4f4f6)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: '"Open Sans", sans-serif',
    }}
  >
    <div
      style={{
        height: 56,
        flexShrink: 0,
        background: 'var(--color-surface-white, #ffffff)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 16,
      }}
    >
      <div style={{ width: 28, height: 28, borderRadius: 6, background: '#6937ee', flexShrink: 0 }} />
      <div style={{ flex: 1 }} />
      <div style={{ width: 32, height: 32, borderRadius: 16, background: '#d8d8e0', flexShrink: 0 }} />
    </div>
    <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
      <div style={{ width: '40%', height: 16, borderRadius: 4, background: '#c8c8d4' }} />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            background: 'var(--color-surface-white, #ffffff)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid rgba(0,0,0,0.06)',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ width: '55%', height: 12, borderRadius: 3, background: '#d8d8e0' }} />
          <div style={{ width: '75%', height: 10, borderRadius: 3, background: '#eaeaef' }} />
        </div>
      ))}
    </div>
  </div>
);

// ── Story-only: reopen affordance ─────────────────────────────────────────────
const ReopenButton = ({ onClick, label = 'Open Modal' }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      padding: '10px 20px',
      background: 'var(--color-brand-primary-base, #6937ee)',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      fontSize: 14,
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(105,55,238,0.35)',
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </button>
);

// ─────────────────────────────────────────────────────────────────────────────
// Default export
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Modal/Status Modal',
  component: StatusModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**\`↳status-modal\`** — Semantic status dialog for error, warning, success, and information states.

Renders a 48×48 icon frame, a title (required), optional body copy, and CTA buttons.
Has **no close button** — dismissal is via CTA or Escape key only.

---

### Variant comparison

| Property | \`variant="overlay"\` | \`variant="default"\` |
|---|---|---|
| Max-width | 560px (medium) | 412px (panelProps override) |
| Border-radius | 16px | **20px** (.status-modal--default) |
| Shadow | ✅ present | ❌ removed (.status-modal--default) |
| Overlay backdrop | ✅ 10% opacity + blur | ❌ transparent (.modal-overlay--no-backdrop) |
| Use case | Requires user decision | Standalone visual variant |

---

### Status types

| Status | Icon | ARIA role |
|---|---|---|
| \`error\` | ErrorWarningFill | \`alertdialog\` (auto-announced) |
| \`warning\` | AlertFill | \`alertdialog\` (auto-announced) |
| \`success\` | SelectBoxCircleFill | \`dialog\` |
| \`information\` | InformationFill | \`dialog\` |

---

### Alignment

| \`alignment\` | Layout |
|---|---|
| \`horizontal\` (default) | Icon left, text right. \`flex-direction: row\`. |
| \`vertical\` | Icon top, text below. \`flex-direction: column\`. |

---

### ARIA

- \`title\` is **required** — auto-generates \`aria-labelledby\` on the title element.
- \`body\` is optional — auto-generates \`aria-describedby\` when provided.
- \`role\` is determined by status: \`alertdialog\` for error/warning, \`dialog\` for success/information.
- Omitting \`title\` triggers a dev-only \`console.warn\`.

---

### Token namespace — 8 L3 CSS variables

\`--modal-text-title\` · \`--modal-text-body\` ·
\`--modal-icon-bg-error\` · \`--modal-icon-bg-warning\` · \`--modal-icon-bg-success\` · \`--modal-icon-bg-info\` ·
\`--modal-icon-error\` · \`--modal-icon-warning\` · \`--modal-icon-success\` · \`--modal-icon-info\`
        `.trim(),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// A. VARIANT — DEFAULT
// ─────────────────────────────────────────────────────────────────────────────

export const VariantDefault = {
  name: 'Variant / Default',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <StatusModal
          open={open}
          onClose={() => setOpen(false)}
          variant="default"
          status="information"
          title="Account updated"
          body="Your account settings have been saved. Changes take effect immediately."
          primaryLabel="OK"
          onPrimary={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**variant="default"** — Standalone modal without an overlay backdrop.',
          '',
          '**Figma confirmed geometry:**',
          '- Max-width: **412px** (narrower than overlay)',
          '- Border-radius: **20px** (`.status-modal--default`)',
          '- Shadow: **removed** (`.status-modal--default { box-shadow: none }`)',
          '- Overlay: **transparent** (`.modal-overlay--no-backdrop { background-color: transparent; backdrop-filter: none }`)',
          '',
          'Runtime behavior (portal, focus trap, scroll lock, ARIA, Escape) is unchanged.',
          'The "default" variant renders as a standalone panel without a backdrop, suitable for use within a page layout rather than as a blocking overlay.',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// B. VARIANT — OVERLAY
// ─────────────────────────────────────────────────────────────────────────────

export const VariantOverlay = {
  name: 'Variant / Overlay',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <StatusModal
          open={open}
          onClose={() => setOpen(false)}
          variant="overlay"
          status="information"
          title="Account updated"
          body="Your account settings have been saved. Changes take effect immediately."
          primaryLabel="OK"
          onPrimary={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**variant="overlay"** — Standard modal with a dimmed overlay backdrop.',
          '',
          '**Geometry:**',
          '- Max-width: **560px** (size="medium" default)',
          '- Border-radius: **16px** (`.modal-panel` base)',
          '- Shadow: **present** (`0 16px 32px -12px rgba(23,23,23,0.10)`)',
          '- Overlay: **10% opacity** + `backdrop-filter: blur(5px)`',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// C. STATUS TYPES
// ─────────────────────────────────────────────────────────────────────────────

export const StatusError = {
  name: 'Status / Error',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <StatusModal
          open={open}
          onClose={() => setOpen(false)}
          status="error"
          title="Payment failed"
          body="We were unable to process your payment. Please check your card details and try again, or contact support if the issue persists."
          primaryLabel="Try again"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**status="error"** — `ErrorWarningFill` icon, red icon frame (`--modal-icon-bg-error`).',
          '',
          'ARIA: `role="alertdialog"` — immediately announced by screen readers when the modal opens.',
        ].join('\n'),
      },
    },
  },
};

export const StatusWarning = {
  name: 'Status / Warning',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <StatusModal
          open={open}
          onClose={() => setOpen(false)}
          status="warning"
          title="Delete account?"
          body="This will permanently delete your account and all associated data. This action cannot be undone."
          primaryLabel="Delete account"
          secondaryLabel="Keep account"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**status="warning"** — `AlertFill` icon, amber/yellow icon frame (`--modal-icon-bg-warning`).',
          '',
          'Warning token: `#fddc69` (locked from D0 live Figma confirmation — NOT `#fff4e5`).',
          '',
          'ARIA: `role="alertdialog"` — immediately announced by screen readers.',
        ].join('\n'),
      },
    },
  },
};

export const StatusSuccess = {
  name: 'Status / Success',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <StatusModal
          open={open}
          onClose={() => setOpen(false)}
          status="success"
          title="Transfer complete"
          body="$2,500.00 has been sent successfully. The recipient will receive the funds within 1–2 business days."
          primaryLabel="Done"
          onPrimary={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**status="success"** — `SelectBoxCircleFill` icon, green icon frame (`--modal-icon-bg-success`).',
          '',
          'ARIA: `role="dialog"` — polite announcement (not alertdialog).',
        ].join('\n'),
      },
    },
  },
};

export const StatusInformation = {
  name: 'Status / Information',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <StatusModal
          open={open}
          onClose={() => setOpen(false)}
          status="information"
          title="Two-factor authentication"
          body="For your security, we've sent a 6-digit code to your phone. Enter it on the next screen to continue."
          primaryLabel="Continue"
          secondaryLabel="Resend code"
          onPrimary={() => setOpen(false)}
          onSecondary={() => {}}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**status="information"** — `InformationFill` icon, blue icon frame (`--modal-icon-bg-info`).',
          '',
          'ARIA: `role="dialog"` — polite announcement.',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// D. ALIGNMENT
// ─────────────────────────────────────────────────────────────────────────────

export const AlignmentHorizontal = {
  name: 'Alignment / Horizontal',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <StatusModal
          open={open}
          onClose={() => setOpen(false)}
          status="information"
          alignment="horizontal"
          title="Icon left of title"
          body="Horizontal layout: 48×48 icon frame on the left, text block on the right. Default alignment."
          primaryLabel="OK"
          onPrimary={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**alignment="horizontal"** (default) — Icon left (`flex-direction: row`), text block fills remaining space.',
      },
    },
  },
};

export const AlignmentVertical = {
  name: 'Alignment / Vertical',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <StatusModal
          open={open}
          onClose={() => setOpen(false)}
          status="success"
          alignment="vertical"
          title="Icon above title"
          body="Vertical layout: 48×48 icon frame on top, text block below. Use for emphasis or celebration moments."
          primaryLabel="Continue"
          onPrimary={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**alignment="vertical"** — Icon top (`flex-direction: column`). Use for emphasis states or celebration moments.',
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// E. CONTENT VARIATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const TitleOnly = {
  name: 'Content / Title only',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <StatusModal
          open={open}
          onClose={() => setOpen(false)}
          status="warning"
          title="Are you sure you want to delete this file?"
          primaryLabel="Delete"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**Title only — no `body`.** The `body` prop is optional.',
          '',
          'When `body` is absent, `aria-describedby` is NOT emitted — no dangling reference.',
        ].join('\n'),
      },
    },
  },
};

export const WithSecondaryAction = {
  name: 'Content / With secondary action',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <StatusModal
          open={open}
          onClose={() => setOpen(false)}
          status="error"
          title="Connection lost"
          body="Your session timed out due to inactivity. You can reconnect or contact support for assistance."
          primaryLabel="Reconnect"
          secondaryLabel="Contact support"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '`secondaryLabel` is optional. When provided, the secondary `Button` (neutral, outline, medium) renders to the left of the primary.',
      },
    },
  },
};

export const OverlayClickDisabled = {
  name: 'Behaviour / Overlay click disabled',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <StatusModal
          open={open}
          onClose={() => setOpen(false)}
          status="warning"
          closeOnOverlayClick={false}
          title="Confirm deletion"
          body="This is intentional. Clicking the overlay does not dismiss — the user must actively choose."
          primaryLabel="Delete"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**closeOnOverlayClick={false}** — Default for StatusModal (unlike CardModal which defaults to `true`).',
          '',
          'Status modals typically represent intentional decision points. Accidental overlay-click dismissal is suppressed by default.',
          'Close via CTA button or Escape key.',
        ].join('\n'),
      },
    },
  },
};
