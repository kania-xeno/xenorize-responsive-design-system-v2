import React, { useState } from 'react';
import Drawer from './Drawer.jsx';
import DrawerHeader from './DrawerHeader.jsx';
import DrawerFooter from './DrawerFooter.jsx';
import { HistoryLine } from '../../icons/index.js';

// ─────────────────────────────────────────────────────────────────────────────
// Drawer — Components/Drawer
// Figma: ↳overlay-drawer (ComponentSet 2605:3611) | ❖  Drawer page
// Standalone ref: ↳anchor-drawer (node 2499:13695)
//
// D3.1 — Static showcase. Drawer is pre-open on story load.
// Responsive system (designer-approved):
//   HD >1440px / Desktop 1280–1440px / Tablet 768–1279px → side Drawer
//   Mobile <768px → bottom sheet
//
// Stories: Desktop · Mobile · Long Content · Settings · Details · Filter ·
//          Responsive Guidance
//
// Story-only utilities (MockBackground, ReopenButton, content helpers)
// are NOT exported as production code.
// ─────────────────────────────────────────────────────────────────────────────

// ── Story-only: Mock application background ───────────────────────────────────
// Shown through the Drawer overlay to demonstrate placement, dim, and blur.
// Uses DS surface tokens where possible so it adapts to dark mode.
const MockBackground = ({ narrow = false }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: 'var(--color-surface-soft, #f4f4f6)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Open Sans", sans-serif',
      overflow: 'hidden',
    }}
  >
    {/* ── Nav bar ── */}
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
      <div style={{ width: 72, height: 10, borderRadius: 4, background: '#d0d0d8', flexShrink: 0 }} />
      <div style={{ flex: 1 }} />
      {!narrow && (
        <>
          <div style={{ width: 56, height: 10, borderRadius: 4, background: '#e4e4ea' }} />
          <div style={{ width: 56, height: 10, borderRadius: 4, background: '#e4e4ea' }} />
          <div style={{ width: 56, height: 10, borderRadius: 4, background: '#e4e4ea' }} />
        </>
      )}
      <div style={{ width: 32, height: 32, borderRadius: 16, background: '#d8d8e0', flexShrink: 0 }} />
    </div>

    {/* ── Page content ── */}
    <div
      style={{
        flex: 1,
        padding: narrow ? '16px' : '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflow: 'hidden',
      }}
    >
      <div style={{ width: '45%', height: 18, borderRadius: 4, background: '#c8c8d4' }} />
      <div style={{ width: '65%', height: 11, borderRadius: 3, background: '#e0e0e8' }} />
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            background: 'var(--color-surface-white, #ffffff)',
            borderRadius: 12,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            border: '1px solid rgba(0,0,0,0.06)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '52%', height: 12, borderRadius: 3, background: '#d8d8e0' }} />
            <div style={{ width: 44, height: 20, borderRadius: 10, background: '#ece8fa' }} />
          </div>
          <div style={{ width: '82%', height: 10, borderRadius: 3, background: '#eaeaef' }} />
          <div style={{ width: '60%', height: 10, borderRadius: 3, background: '#eaeaef' }} />
        </div>
      ))}
    </div>
  </div>
);

// ── Story-only: Reopen affordance ─────────────────────────────────────────────
// Shown after the developer closes the Drawer during story inspection.
const ReopenButton = ({ onClick }) => (
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
    Reopen Drawer
  </button>
);

// ─────────────────────────────────────────────────────────────────────────────
// Content helpers (story-only, not exported)
// ─────────────────────────────────────────────────────────────────────────────

const BasicContent = () => (
  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <p style={{ margin: 0, fontFamily: '"Open Sans", sans-serif', fontSize: 14, lineHeight: 1.6, color: 'var(--drawer-text-description)' }}>
      This is the <strong>content slot</strong> of the Drawer. It scrolls independently from the header and footer. Use this area for contextual content — forms, details, filter controls, lists, or rich layouts.
    </p>
    <div style={{ height: 1, background: 'var(--drawer-border-divider)' }} />
    <p style={{ margin: 0, fontFamily: '"Open Sans", sans-serif', fontSize: 14, lineHeight: 1.6, color: 'var(--drawer-text-description)' }}>
      The header and footer remain fixed while this region scrolls. Content background inherits from{' '}
      <code style={{ fontSize: 12, background: 'var(--color-surface-soft, #f4f4f6)', padding: '2px 5px', borderRadius: 4 }}>
        --drawer-surface-bg
      </code>.
    </p>
    <p style={{ margin: 0, fontFamily: '"Open Sans", sans-serif', fontSize: 14, lineHeight: 1.6, color: 'var(--drawer-text-description)' }}>
      Insert any DS component or layout into this slot. The Drawer shell handles the fixed chrome; content decides its own internal structure.
    </p>
  </div>
);

const LongContentBody = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    {Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 24px',
          borderBottom: '1px solid var(--drawer-border-divider)',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: i % 3 === 0 ? '#ece8fa' : i % 3 === 1 ? '#e8f0fe' : '#e8f8ee',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ width: `${55 + (i * 17) % 35}%`, height: 13, borderRadius: 3, background: 'var(--color-surface-soft-alt, #ebecef)' }} />
          <div style={{ width: `${40 + (i * 11) % 40}%`, height: 10, borderRadius: 3, background: 'var(--color-surface-soft-alt, #ebecef)' }} />
        </div>
        <div style={{ width: 56, height: 22, borderRadius: 6, background: 'var(--color-surface-soft-alt, #ebecef)', flexShrink: 0 }} />
      </div>
    ))}
  </div>
);

const SettingsContent = () => (
  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20, fontFamily: '"Open Sans", sans-serif' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--drawer-text-title)' }}>Display Name</label>
      <div style={{ height: 40, borderRadius: 8, border: '1px solid var(--drawer-border-divider)', padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 14, color: 'var(--drawer-text-title)', background: 'var(--drawer-surface-bg)' }}>
        Alex Johnson
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--drawer-text-title)' }}>Email Address</label>
      <div style={{ height: 40, borderRadius: 8, border: '1px solid var(--drawer-border-divider)', padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 14, color: 'var(--drawer-text-description)', background: 'var(--drawer-surface-bg)' }}>
        alex@example.com
      </div>
      <span style={{ fontSize: 12, color: 'var(--drawer-text-description)' }}>Contact support to update your email address.</span>
    </div>
    <div style={{ height: 1, background: 'var(--drawer-border-divider)' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--drawer-text-title)' }}>Email Notifications</div>
        <div style={{ fontSize: 12, color: 'var(--drawer-text-description)', marginTop: 2 }}>Receive account activity summaries.</div>
      </div>
      <div style={{ width: 44, height: 24, borderRadius: 12, background: '#6937ee', position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', right: 2, top: 2, width: 20, height: 20, borderRadius: 10, background: '#fff' }} />
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--drawer-text-title)' }}>Two-Factor Authentication</div>
        <div style={{ fontSize: 12, color: 'var(--drawer-text-description)', marginTop: 2 }}>Add an extra layer of account security.</div>
      </div>
      <div style={{ width: 44, height: 24, borderRadius: 12, background: 'var(--color-surface-soft-alt, #ebecef)', position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', left: 2, top: 2, width: 20, height: 20, borderRadius: 10, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      </div>
    </div>
  </div>
);

const DetailsContent = () => {
  const rows = [
    ['Reference', 'TXN-847204'],
    ['Date', 'Aug 25, 2026 · 14:32 UTC'],
    ['Amount', '$2,500.00'],
    ['Status', 'Completed'],
    ['Network', 'Ethereum'],
    ['From', '0x3f4a…8c21'],
    ['To', '0x9b2d…4f08'],
    ['Gas Fee', '$3.20'],
    ['Confirmations', '47'],
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {rows.map(([label, value]) => (
        <div
          key={label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '13px 24px',
            borderBottom: '1px solid var(--drawer-border-divider)',
            fontFamily: '"Open Sans", sans-serif',
          }}
        >
          <span style={{ fontSize: 14, color: 'var(--drawer-text-description)' }}>{label}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--drawer-text-title)', textAlign: 'right', marginLeft: 16 }}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
};

const FilterContent = () => (
  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24, fontFamily: '"Open Sans", sans-serif' }}>
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--drawer-text-description)', marginBottom: 12 }}>
        Status
      </div>
      {['All', 'Completed', 'Pending', 'Failed'].map((opt) => (
        <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--drawer-border-divider)', cursor: 'pointer' }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, border: `1.5px solid ${opt === 'Completed' ? '#6937ee' : 'var(--drawer-border-divider)'}`, background: opt === 'Completed' ? '#6937ee' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {opt === 'Completed' && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span style={{ fontSize: 14, color: 'var(--drawer-text-title)' }}>{opt}</span>
        </div>
      ))}
    </div>
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--drawer-text-description)', marginBottom: 12 }}>
        Date Range
      </div>
      {['Today', 'Last 7 days', 'Last 30 days', 'Custom range'].map((opt) => (
        <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--drawer-border-divider)', cursor: 'pointer' }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, flexShrink: 0, border: `1.5px solid ${opt === 'Last 7 days' ? '#6937ee' : 'var(--drawer-border-divider)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {opt === 'Last 7 days' && <div style={{ width: 8, height: 8, borderRadius: 4, background: '#6937ee' }} />}
          </div>
          <span style={{ fontSize: 14, color: 'var(--drawer-text-title)' }}>{opt}</span>
        </div>
      ))}
    </div>
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--drawer-text-description)', marginBottom: 12 }}>
        Amount
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, height: 40, borderRadius: 8, border: '1px solid var(--drawer-border-divider)', padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 14, color: 'var(--drawer-text-description)', background: 'var(--drawer-surface-bg)' }}>Min</div>
        <div style={{ flex: 1, height: 40, borderRadius: 8, border: '1px solid var(--drawer-border-divider)', padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 14, color: 'var(--drawer-text-description)', background: 'var(--drawer-surface-bg)' }}>Max</div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Default export
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Drawer/General',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**\`↳overlay-drawer\`** — Full-viewport overlay Drawer shell.

Composes **DrawerHeader** + scrollable content slot + **DrawerFooter** inside a portal-rendered fixed panel (\`ReactDOM.createPortal(…, document.body)\`).

---

### Responsive System (designer-approved)

| Viewport | Range | Drawer behavior |
|---|---|---|
| HD | >1440px | Right-side Drawer |
| Desktop | 1280–1440px | Right-side Drawer |
| Tablet | 768–1279px | Right-side Drawer |
| Mobile | <768px | Bottom sheet |

CSS boundary: \`@media (max-width: 767px)\` → bottom sheet · \`@media (min-width: 768px)\` → side Drawer.

---

### Anatomy

| Layer | Component | Notes |
|---|---|---|
| Overlay | \`.drawer-overlay\` | Fixed full-viewport backdrop. \`--drawer-surface-overlay\` at 10% opacity. \`backdrop-filter: blur(5px)\` confirmed across all variants (Desktop + Mobile Half + Mobile Full) from Figma Desktop Bridge. |
| Panel | \`.drawer-panel\` | Fixed panel. Side: right-anchored, 570px max-width, 16px inset, radius 16px. Mobile: bottom sheet, radius 16px 16px 0 0. |
| Header | DrawerHeader | Title, optional icon, optional description, close button. |
| Content | \`drawer-panel__body\` | Scrollable slot. Insert any content. |
| Footer | DrawerFooter | Action bar. 5 types: Stretch · Basic · Checkbox · Toggle · Link Button. |

---

### DrawerHeader variants

| Type | Size | Height | Features |
|---|---|---|---|
| Basic | Small | 68px | Title + close button |
| Basic | Large | 92px | Title + description + close button |
| Left Icon | Small | 68px | Icon (24×24) + title + close button |
| Left Icon | Large | 92px | Icon container (48×48) + title + description + close button |

---

### DrawerFooter types

| Type | Layout | Use case |
|---|---|---|
| Stretch | Both buttons fill equally | Standard two-action flows |
| Basic | Both buttons HUG, right-aligned | When button widths should not stretch |
| Checkbox | Checkbox left + CTAs right | "Don't show again" patterns |
| Toggle | Toggle switch left + CTAs right | Enable/disable opt-in |
| Link Button | Link left + CTAs right | "Learn more" patterns |

---

### Token namespace — 7 L3 CSS variables

\`--drawer-surface-bg\` · \`--drawer-surface-overlay\` · \`--drawer-text-title\` · \`--drawer-text-description\` · \`--drawer-border-divider\` · \`--drawer-footer-border\` · \`--drawer-mobile-handle\`

---

### Known deferred dependencies

- **Content Divider** — \`➖ Divider\` prop deferred; Content Divider [1.1] not yet implemented.
- **↳button-compact** — Dismiss button uses raw \`<button>\` until ↳button-compact (24×24) ships as a coded component.
- **Mobile drag handle** — Half ↔ Full snap implemented (D3.2). Swipe-to-dismiss deferred. Keyboard drag deferred.
- **Mobile backdrop blur** — confirmed present (designer-updated). Both \`Mobile=on\` variants now have \`BACKGROUND_BLUR radius 5\`, matching Desktop. Blur applied to base \`.drawer-overlay\` rule (not breakpoint-scoped).
        `.trim(),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Desktop
// ─────────────────────────────────────────────────────────────────────────────

export const Desktop = {
  name: 'Desktop',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          header={
            <DrawerHeader
              title="Drawer Title"
              type="basic"
              size="small"
              showCloseButton
              onClose={() => setOpen(false)}
            />
          }
          footer={
            <DrawerFooter
              type="stretch"
              primaryLabel="Confirm"
              secondaryLabel="Cancel"
              onPrimary={() => setOpen(false)}
              onSecondary={() => setOpen(false)}
            />
          }
        >
          <BasicContent />
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**Desktop** — right-anchored side Drawer at ≥768px viewport.',
          '(Also applies at HD >1440px and Tablet 768–1279px — same CSS path.)',
          '',
          '**Placement geometry (Figma reference):**',
          '- Width: `min(570px, calc(100vw - 32px))`',
          '- Inset: 16px top · 16px right · 16px bottom',
          '- Border-radius: 16px',
          '',
          '**Backdrop:** `--drawer-surface-overlay` at 10% opacity + `backdrop-filter: blur(5px)` (confirmed from Figma Desktop variant, node 2499:13606, `BACKGROUND_BLUR radius: 5`).',
          '',
          '**Animation:** `translateX(calc(100% + 16px)) → translateX(0)` · 300ms cubic-bezier.',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Mobile
// ─────────────────────────────────────────────────────────────────────────────
// D3.2 — Drag handle functional. Opens at Half (406px); drag the handle upward
// to expand to Full (730px), downward to collapse back to Half.
//
// Figma references:
//   Mobile Half (node 2605:3610): Sheet 412×406px, y:406 on 812px canvas.
//   Mobile Full (node 2605:3609): Sheet 412×730px, y:82 on 812px canvas.
//   Snap midpoint: 568px at 412×812 Figma reference ((406+730)/2).
//     Actual midpoint is computed dynamically at drag-start from viewport:
//     (min(50vh,406) + min(90vh,730)) / 2. Scales down on shorter viewports.
//
// Pointer Events implementation: setPointerCapture on handle-area only;
// desktop (≥768px) is unaffected — breakpoint guard inside handlers.
// ─────────────────────────────────────────────────────────────────────────────

export const Mobile = {
  name: 'Mobile',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground narrow />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          mobileHeight="half"
          header={
            <DrawerHeader
              title="Sheet Title"
              type="basic"
              size="large"
              description="Supporting context or instruction text for this sheet."
              showCloseButton={false}
              onClose={() => setOpen(false)}
            />
          }
          footer={
            <DrawerFooter
              type="stretch"
              primaryLabel="Continue"
              secondaryLabel="Cancel"
              onPrimary={() => setOpen(false)}
              onSecondary={() => setOpen(false)}
            />
          }
        >
          <BasicContent />
        </Drawer>
      </>
    );
  },
  // ── Storybook 10 viewport API ─────────────────────────────────────────────
  // `globals.viewport.value` resizes the preview iframe to the named viewport.
  // `parameters.viewport.options` registers the custom 412×812 size in the toolbar.
  // This makes @media (max-width: 767px) actually fire — bottom sheet CSS activates.
  // Old API (parameters.viewport.viewports / defaultViewport) is ignored in SB 10.
  globals: {
    viewport: { value: 'figmaMobile412' },
  },
  parameters: {
    viewport: {
      options: {
        figmaMobile412: {
          name: 'Figma Mobile (412×812)',
          styles: { width: '412px', height: '812px' },
          type: 'mobile',
        },
      },
    },
    docs: {
      description: {
        story: [
          '**Mobile** — bottom sheet at `<768px` viewport. Confirmed from Figma: `Mobile=on, 📐 Height=Half` (node 2605:3610).',
          '',
          'Storybook preview runs at **412×812px** (`globals.viewport.value`), which fires `@media (max-width: 767px)` and activates the bottom-sheet CSS path.',
          '',
          '**Interaction — drag the handle to snap between Half and Full:**',
          '- Drag upward → expands to Full (730px). Drag downward → collapses to Half (406px).',
          '- Snap threshold: responsive midpoint = (halfH + fullH) / 2, computed at drag-start from viewport. At Figma reference 412×812: Half=406px / Full=730px / midpoint=568px. Scales down on shorter viewports.',
          '- Drag follows pointer directly (no transition). Snap is immediate.',
          '- Clamped: Half is the floor — no swipe-to-dismiss.',
          '- Implementation: Pointer Events API (`setPointerCapture` on handle-area only).',
          '- Desktop/Tablet (≥768px): drag is a no-op — breakpoint guard in handlers.',
          '',
          '**Figma anatomy:**',
          '- **Half (node 2605:3610):** Canvas 412×812px · Sheet 412×406px (y:406) · handle 26px · header 92px · content 204px · footer 84px.',
          '- **Full (node 2605:3609):** Canvas 412×812px · Sheet 412×730px (y:82) · handle 26px · header 92px · content 528px · footer 84px.',
          '- Handle: 36×4px · `--drawer-mobile-handle` · radius 2px.',
          '- Footer: `type="stretch"` · Cancel + Continue · 84px.',
          '- Overlay: `--drawer-surface-overlay` · 10% opacity · `backdrop-filter: blur(5px)` (confirmed: BACKGROUND_BLUR radius 5 on both Mobile variants — designer-updated).',
          '- Border-radius: `16px 16px 0 0` (top corners only).',
          '',
          '⚠️ Keyboard drag: deferred. ⚠️ Swipe-to-dismiss: deferred.',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Long Content
// ─────────────────────────────────────────────────────────────────────────────

export const LongContent = {
  name: 'Long Content',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          header={
            <DrawerHeader
              title="Long Content"
              type="basic"
              size="small"
              showCloseButton
              onClose={() => setOpen(false)}
            />
          }
          footer={
            <DrawerFooter
              type="stretch"
              primaryLabel="Confirm"
              secondaryLabel="Cancel"
              onPrimary={() => setOpen(false)}
              onSecondary={() => setOpen(false)}
            />
          }
        >
          <LongContentBody />
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**Long Content** — 20-row list confirms body-only scroll behavior.',
          '',
          'Header and footer remain fixed. Only `drawer-panel__body` scrolls:',
          '```css',
          '.drawer-panel__body {',
          '  flex: 1 1 0;',
          '  min-height: 0;',
          '  overflow-y: auto;',
          '}',
          '```',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Settings example
// ─────────────────────────────────────────────────────────────────────────────

export const Settings = {
  name: 'Settings',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          header={
            <DrawerHeader
              title="Account Settings"
              type="basic"
              size="small"
              showCloseButton
              onClose={() => setOpen(false)}
            />
          }
          footer={
            <DrawerFooter
              type="stretch"
              primaryLabel="Save Changes"
              secondaryLabel="Cancel"
              onPrimary={() => setOpen(false)}
              onSecondary={() => setOpen(false)}
            />
          }
        >
          <SettingsContent />
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**Settings / Edit pattern.** Form fields and toggles inside the content slot.',
          '',
          '- `type="basic"` header — no icon needed for settings context.',
          '- `type="stretch"` footer — Save Changes / Cancel.',
          '- Field backgrounds use `--drawer-surface-bg`. Dividers use `--drawer-border-divider`.',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Details example
// ─────────────────────────────────────────────────────────────────────────────

export const Details = {
  name: 'Details',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          header={
            <DrawerHeader
              title="Transaction Details"
              type="basic"
              size="small"
              showCloseButton
              onClose={() => setOpen(false)}
            />
          }
          footer={
            <DrawerFooter
              type="basic"
              primaryLabel="Done"
              secondaryLabel="Share"
              onPrimary={() => setOpen(false)}
              onSecondary={() => {}}
            />
          }
        >
          <DetailsContent />
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**Details pattern.** Read-only key-value information.',
          '',
          '- `type="basic"` header — title only, close button.',
          '- `type="basic"` footer — HUG-width buttons, right-aligned. Share + Done.',
          '- Row separators use `--drawer-border-divider`.',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Filter example
// ─────────────────────────────────────────────────────────────────────────────

export const Filter = {
  name: 'Filter',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          header={
            <DrawerHeader
              title="Filter Results"
              type="left-icon"
              icon={HistoryLine}
              size="small"
              showCloseButton
              onClose={() => setOpen(false)}
            />
          }
          footer={
            <DrawerFooter
              type="stretch"
              primaryLabel="Apply Filters"
              secondaryLabel="Reset"
              onPrimary={() => setOpen(false)}
              onSecondary={() => {}}
            />
          }
        >
          <FilterContent />
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**Filter pattern.** Grouped filter controls.',
          '',
          '- `type="left-icon"` header — HistoryLine (Figma INSTANCE_SWAP default, node 2097:202), `size="small"` (24×24 bare icon).',
          '- `type="stretch"` footer — Apply Filters / Reset.',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Responsive Guidance
// ─────────────────────────────────────────────────────────────────────────────

export const ResponsiveGuidance = {
  name: 'Responsive Guidance',
  render: () => (
    <div
      style={{
        maxWidth: 660,
        padding: 32,
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 14,
        lineHeight: 1.6,
        color: 'var(--drawer-text-title)',
      }}
    >
      <h2 style={{ fontFamily: '"Sofia Pro", sans-serif', fontSize: 20, fontWeight: 600, margin: '0 0 8px' }}>
        Responsive Behavior
      </h2>
      <p style={{ margin: '0 0 24px', color: 'var(--drawer-text-description)' }}>
        The Drawer switches between a right-side panel and a bottom sheet based on the designer-confirmed responsive system.
      </p>

      {/* ── Viewport matrix ── */}
      <h3 style={{ fontFamily: '"Sofia Pro", sans-serif', fontSize: 16, fontWeight: 600, margin: '0 0 12px' }}>
        Viewport System
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28, fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--color-surface-soft, #f4f4f6)' }}>
            {['Viewport', 'Range', 'Drawer behavior', 'CSS path'].map((h) => (
              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid var(--drawer-border-divider)', whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['HD',      '>1440px',      'Right-side Drawer', '≥768px'],
            ['Desktop', '1280–1440px',  'Right-side Drawer', '≥768px'],
            ['Tablet',  '768–1279px',   'Right-side Drawer', '≥768px'],
            ['Mobile',  '<768px',       'Bottom sheet',      '<768px'],
          ].map(([vp, range, behavior, css], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--drawer-border-divider)' }}>
              <td style={{ padding: '10px 14px', fontWeight: 600 }}>{vp}</td>
              <td style={{ padding: '10px 14px' }}><code style={{ fontSize: 12 }}>{range}</code></td>
              <td style={{ padding: '10px 14px', color: behavior === 'Bottom sheet' ? 'var(--drawer-text-title)' : 'var(--drawer-text-description)' }}>
                {behavior}
              </td>
              <td style={{ padding: '10px 14px', color: 'var(--drawer-text-description)' }}>
                <code style={{ fontSize: 12 }}>{css}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ margin: '-16px 0 28px', fontSize: 13, color: 'var(--drawer-text-description)' }}>
        Figma provides representative Drawer visuals for <strong>Desktop</strong> and <strong>Mobile</strong>.
        Tablet inherits the side-Drawer pattern. HD inherits the side-Drawer pattern.
        Neither Tablet nor HD requires a separate Storybook showcase.
      </p>

      {/* ── Side Drawer geometry ── */}
      <h3 style={{ fontFamily: '"Sofia Pro", sans-serif', fontSize: 16, fontWeight: 600, margin: '0 0 12px' }}>
        Side Drawer Geometry (HD · Desktop · Tablet)
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28, fontSize: 13 }}>
        <tbody>
          {[
            ['Panel width',           'min(570px, calc(100vw - 32px))'],
            ['Top inset',             '16px'],
            ['Right inset',           '16px'],
            ['Bottom inset',          '16px'],
            ['Border-radius',         '16px (all corners)'],
            ['Backdrop blur',         'blur(5px) — confirmed from Figma Desktop (node 2499:13606)'],
            ['Figma canvas reference','1440×1024px'],
            ['Animation',             'translateX(calc(100% + 16px)) → translateX(0) · 300ms'],
          ].map(([label, value], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--drawer-border-divider)' }}>
              <td style={{ padding: '9px 14px', color: 'var(--drawer-text-description)', width: '42%' }}>{label}</td>
              <td style={{ padding: '9px 14px' }}><code style={{ fontSize: 11 }}>{value}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Bottom sheet geometry ── */}
      <h3 style={{ fontFamily: '"Sofia Pro", sans-serif', fontSize: 16, fontWeight: 600, margin: '0 0 12px' }}>
        Bottom Sheet Geometry (Mobile)
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28, fontSize: 13 }}>
        <tbody>
          {[
            ['Width',                 '100% viewport width'],
            ['mobileHeight="half"',   '50vh · max 406px — Figma representative variant (node 2605:3610)'],
            ['mobileHeight="full"',   '90vh · max 730px — full-height variant (node 2605:3609)'],
            ['Border-radius',         '16px 16px 0 0 (top corners only)'],
            ['Drag handle',           '36×4px pill · --drawer-mobile-handle · drag Half↔Full · snap midpoint responsive (568px at 412×812 Figma ref) · swipe-to-dismiss deferred'],
            ['Close button',          'Hidden per Figma Mobile spec (showCloseButton={false})'],
            ['Backdrop blur',         'blur(5px) — confirmed from Figma Mobile variants (nodes 2605:3610, 2605:3609) via Desktop Bridge (designer-updated)'],
            ['Figma canvas reference','412×812px'],
            ['Animation',             'translateY(100%) → translateY(0) · 300ms'],
          ].map(([label, value], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--drawer-border-divider)' }}>
              <td style={{ padding: '9px 14px', color: 'var(--drawer-text-description)', width: '42%' }}>{label}</td>
              <td style={{ padding: '9px 14px' }}><code style={{ fontSize: 11 }}>{value}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Token reference ── */}
      <h3 style={{ fontFamily: '"Sofia Pro", sans-serif', fontSize: 16, fontWeight: 600, margin: '0 0 12px' }}>
        Token Reference — 7 L3 CSS Variables
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--color-surface-soft, #f4f4f6)' }}>
            <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid var(--drawer-border-divider)' }}>Token</th>
            <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid var(--drawer-border-divider)' }}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['--drawer-surface-bg',       'Panel bg · header bg · footer bg · content slot bg'],
            ['--drawer-surface-overlay',  'Overlay backdrop (10% opacity)'],
            ['--drawer-text-title',       'Header title · close button icon color'],
            ['--drawer-text-description', 'Header description · secondary text'],
            ['--drawer-border-divider',   'Optional divider (Content Divider deferred)'],
            ['--drawer-footer-border',    'Footer top border line'],
            ['--drawer-mobile-handle',    'Mobile drag handle pill (36×4px)'],
          ].map(([token, usage], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--drawer-border-divider)' }}>
              <td style={{ padding: '9px 14px' }}><code style={{ fontSize: 11 }}>{token}</code></td>
              <td style={{ padding: '9px 14px', color: 'var(--drawer-text-description)' }}>{usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Static reference: designer-confirmed responsive system, side-Drawer and bottom-sheet geometry, token reference.',
      },
    },
  },
};
