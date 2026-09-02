import React, { useState } from 'react';
import CardModal from './CardModal.jsx';
import Checkbox from '../checkbox/Checkbox.jsx';
import Switch from '../switch/Switch.jsx';
import ButtonLink from '../button-link/ButtonLink.jsx';
import SelectBasic from '../select/SelectBasic.jsx';
import DropdownOption from '../dropdown/DropdownOption.jsx';
import FormField from '../input-text/FormField.jsx';
import BasicInput from '../input-text/BasicInput.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// CardModal — Components/Modal/Card Modal
// Figma: ↳card-modal (ComponentSet) | ❖ Modal page
// File key: 0aVnOgjVWH1YL8JCnjXTBi
//
// Primary public API for general-purpose dialogs.
// Composes ModalHeader + scrollable body + ModalFooter inside a portal shell
// (ReactDOM.createPortal(…, document.body)).
//
// Stories: Overview · Sizes · Heights · Header Types · Footer Types ·
//          Custom Slots · Behaviour
//
// Story-only utilities (MockBackground, ReopenButton, body helpers) are NOT
// exported as production code.
// ─────────────────────────────────────────────────────────────────────────────

// ── Story-only: mock page background ─────────────────────────────────────────
// Shows a representative app behind the overlay to demonstrate positioning,
// dim, and backdrop-blur. Uses DS surface tokens so it adapts to dark mode.
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
      fontFamily: 'var(--font-family-body)',
    }}
  >
    {/* Nav bar */}
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
      <div style={{ width: 64, height: 10, borderRadius: 4, background: '#d0d0d8', flexShrink: 0 }} />
      <div style={{ flex: 1 }} />
      <div style={{ width: 48, height: 10, borderRadius: 4, background: '#e4e4ea' }} />
      <div style={{ width: 48, height: 10, borderRadius: 4, background: '#e4e4ea' }} />
      <div style={{ width: 32, height: 32, borderRadius: 16, background: '#d8d8e0', flexShrink: 0 }} />
    </div>
    {/* Page skeleton */}
    <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
      <div style={{ width: '40%', height: 16, borderRadius: 4, background: '#c8c8d4' }} />
      <div style={{ width: '60%', height: 11, borderRadius: 3, background: '#e0e0e8' }} />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            background: 'var(--color-surface-white, #ffffff)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '50%', height: 12, borderRadius: 3, background: '#d8d8e0' }} />
            <div style={{ width: 44, height: 20, borderRadius: 10, background: '#ece8fa' }} />
          </div>
          <div style={{ width: '80%', height: 10, borderRadius: 3, background: '#eaeaef' }} />
          <div style={{ width: '60%', height: 10, borderRadius: 3, background: '#eaeaef' }} />
        </div>
      ))}
    </div>
  </div>
);

// ── Story-only: reopen affordance ─────────────────────────────────────────────
// Shown after the developer closes the modal during story inspection.
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
      fontSize: 'var(--font-size-body-md)',
      fontFamily: 'var(--font-family-body)',
      fontWeight: 'var(--font-weight-semibold)',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(105,55,238,0.35)',
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </button>
);

// ── Story-only: body content helpers ──────────────────────────────────────────
const BasicBody = () => (
  <div
    style={{
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      fontFamily: 'var(--font-family-body)',
    }}
  >
    <p style={{ margin: 0, fontSize: 'var(--font-size-body-md)', lineHeight: 'var(--text-style-body-regular-md-line-height)', color: 'var(--modal-text-body, #555)' }}>
      This is the <strong>body content slot</strong> of the CardModal. Place forms,
      descriptions, details, or any structured content here. The header and footer
      remain fixed while this region scrolls when content overflows.
    </p>
    <p style={{ margin: 0, fontSize: 'var(--font-size-body-md)', lineHeight: 'var(--text-style-body-regular-md-line-height)', color: 'var(--modal-text-body, #555)' }}>
      CardModal supports four sizes (
      <code style={{ fontSize: 'var(--font-size-body-sm)', background: 'var(--color-surface-soft, #f4f4f6)', padding: '1px 5px', borderRadius: 4 }}>
        xsmall · small · medium · large
      </code>
      ) and four height presets (
      <code style={{ fontSize: 'var(--font-size-body-sm)', background: 'var(--color-surface-soft, #f4f4f6)', padding: '1px 5px', borderRadius: 4 }}>
        hug · short · tall · venti
      </code>
      ).
    </p>
  </div>
);

const LongBody = () => (
  <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-family-body)' }}>
    {Array.from({ length: 24 }, (_, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '13px 24px',
          borderBottom: '1px solid var(--modal-border, #eaeaea)',
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
          <div
            style={{
              width: `${50 + (i * 13) % 40}%`,
              height: 12,
              borderRadius: 3,
              background: 'var(--color-surface-soft-alt, #ebecef)',
            }}
          />
          <div
            style={{
              width: `${35 + (i * 11) % 40}%`,
              height: 10,
              borderRadius: 3,
              background: 'var(--color-surface-soft-alt, #ebecef)',
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

// Scrollable editorial content for fixed-height stories — long enough to confirm scroll
const CryptoHistoryContent = () => (
  <div
    style={{
      padding: 'var(--spacing-20) var(--spacing-24)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-16)',
    }}
  >
    <p
      style={{
        margin: 0,
        fontSize: 'var(--font-size-body-lg)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--text-style-body-regular-lg-line-height)',
        color: 'var(--modal-text-title)',
      }}
    >
      Origins: the Bitcoin whitepaper (2008)
    </p>
    <p
      style={{
        margin: 0,
        fontSize: 'var(--font-size-body-md)',
        lineHeight: 'var(--text-style-body-regular-md-line-height)',
        color: 'var(--modal-text-body)',
      }}
    >
      On October 31, 2008, Satoshi Nakamoto published a nine-page paper titled "Bitcoin: A Peer-to-Peer
      Electronic Cash System." It described a decentralised ledger — the blockchain — secured by
      proof-of-work consensus, eliminating the need for a trusted intermediary to verify transactions.
    </p>
    <p
      style={{
        margin: 0,
        fontSize: 'var(--font-size-body-md)',
        lineHeight: 'var(--text-style-body-regular-md-line-height)',
        color: 'var(--modal-text-body)',
      }}
    >
      The Bitcoin network launched on January 3, 2009. The genesis block embedded a Times headline —
      "Chancellor on brink of second bailout for banks" — anchoring the project's founding philosophy
      in a critique of centralised financial systems.
    </p>
    <p
      style={{
        margin: 0,
        fontSize: 'var(--font-size-body-lg)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--text-style-body-regular-lg-line-height)',
        color: 'var(--modal-text-title)',
      }}
    >
      Ethereum and programmable money (2015)
    </p>
    <p
      style={{
        margin: 0,
        fontSize: 'var(--font-size-body-md)',
        lineHeight: 'var(--text-style-body-regular-md-line-height)',
        color: 'var(--modal-text-body)',
      }}
    >
      Vitalik Buterin proposed Ethereum in 2013 as a general-purpose blockchain. Its mainnet launched
      in July 2015, introducing smart contracts — self-executing code stored on-chain. This unlocked
      decentralised applications (dApps), token standards like ERC-20, and eventually the DeFi and
      NFT ecosystems.
    </p>
    <p
      style={{
        margin: 0,
        fontSize: 'var(--font-size-body-md)',
        lineHeight: 'var(--text-style-body-regular-md-line-height)',
        color: 'var(--modal-text-body)',
      }}
    >
      The 2017 ICO boom brought thousands of new tokens and unprecedented retail participation.
      Regulatory scrutiny followed, shaping the compliance landscape that exchanges and projects
      navigate today.
    </p>
    <p
      style={{
        margin: 0,
        fontSize: 'var(--font-size-body-lg)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--text-style-body-regular-lg-line-height)',
        color: 'var(--modal-text-title)',
      }}
    >
      The broader blockchain ecosystem today
    </p>
    <p
      style={{
        margin: 0,
        fontSize: 'var(--font-size-body-md)',
        lineHeight: 'var(--text-style-body-regular-md-line-height)',
        color: 'var(--modal-text-body)',
      }}
    >
      Layer-2 networks, cross-chain bridges, and proof-of-stake consensus have dramatically improved
      throughput and energy efficiency. Institutional custody, spot ETFs, and regulated derivatives
      markets have broadened access, while zero-knowledge proofs are advancing privacy and
      scalability simultaneously.
    </p>
    <p
      style={{
        margin: 0,
        fontSize: 'var(--font-size-body-md)',
        lineHeight: 'var(--text-style-body-regular-md-line-height)',
        color: 'var(--modal-text-body)',
      }}
    >
      From a single whitepaper to a multi-trillion-dollar asset class, the evolution of cryptocurrency
      continues to redefine how value is stored, transferred, and programmed — across borders and
      without intermediaries.
    </p>
    <p
      style={{
        margin: 0,
        fontSize: 'var(--font-size-body-md)',
        lineHeight: 'var(--text-style-body-regular-md-line-height)',
        color: 'var(--modal-text-body)',
        fontStyle: 'italic',
      }}
    >
      This content is for educational purposes only and does not constitute financial or investment
      advice. Past performance is not indicative of future results.
    </p>
  </div>
);

// ── Story-only: crypto alert form ────────────────────────────────────────────
// Reusable story-only body helper. Uses real DS components only — no raw HTML
// inputs, no hardcoded typography, no recreation of production form styling.
const TRADING_PAIRS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];

const CryptoAlertForm = () => {
  const [pair, setPair] = useState('BTC/USDT');
  const [pairOpen, setPairOpen] = useState(false);
  const [price, setPrice] = useState('');
  return (
    <div
      style={{
        padding: 'var(--spacing-20) var(--spacing-24)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-16)',
      }}
    >
      <SelectBasic
        label="Trading pair"
        value={pair}
        isOpen={pairOpen}
        onClick={() => setPairOpen((o) => !o)}
      >
        {TRADING_PAIRS.map((p) => (
          <DropdownOption
            key={p}
            label={p}
            size="small"
            type="basic"
            selected={pair === p}
            showToggle={false}
            showRightIcon={false}
            onClick={(e) => { e.stopPropagation(); setPair(p); setPairOpen(false); }}
          />
        ))}
      </SelectBasic>
      <FormField
        label="Target price"
        hint="We'll notify you when the market price reaches this level."
      >
        <BasicInput
          size="md"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="85,000"
        />
      </FormField>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Default export
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Modal/Card Modal',
  component: CardModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**\`↳card-modal\`** — Primary public API for general-purpose dialogs.

Composes **ModalHeader** + scrollable content slot + **ModalFooter** inside a
portal-rendered fixed panel (\`ReactDOM.createPortal(…, document.body)\`).

---

### Anatomy

| Layer | Component | Notes |
|---|---|---|
| Overlay | \`.modal-overlay\` | Fixed full-viewport backdrop. 10% opacity + \`backdrop-filter: blur(5px)\`. |
| Panel | \`.modal-panel\` | Centered, flex-column. \`border-radius: 16px\`. |
| Header | ModalHeader | Title, optional description, optional icon, close button. Mandatory. |
| Body | \`.card-modal__body\` | \`flex: 0 1 auto\` (hug) · \`flex: 1 1 0; min-height: 0; overflow-y: auto\` (fixed-height). Scrolls in fixed-height variants. |
| Footer | ModalFooter | Action bar. 6 types. Mandatory. |
| Grabber | \`.card-modal__grabber\` | xsmall bottom sheet only. Visual affordance, mobile-scoped. |

---

### Size variants

| Size | Max-width | Notes |
|---|---|---|
| \`xsmall\` | 400px fallback (desktop) | Mobile-only bottom sheet (\`<768px\`). |
| \`small\` | 400px | |
| \`medium\` | 560px | Default |
| \`large\` | 720px | |

---

### Height presets (Figma-confirmed, 2026-09-01)

| Preset | Desktop | Tablet | Mobile | Semantics |
|---|---|---|---|---|
| \`hug\` | content-fitting | content-fitting | content-fitting | \`AUTO\` — no forced height |
| \`short\` | 480px | 440px | 440px | \`FIXED\` — \`height: min(target, 100dvh − gutter)\` |
| \`tall\` | 640px | 580px | 580px | \`FIXED\` |
| \`venti\` | 720px | 640px | 640px | \`FIXED\` |

Body (\`.card-modal__body\`) owns \`flex: 1 1 0\` and scrolls in fixed-height variants.
Header and footer are \`shrink-0\` — always visible.

---

### ARIA contract

**Default header** (header prop omitted):
- \`aria-labelledby\` → auto-generated title id (override via \`aria-labelledby\` prop).
- \`aria-describedby\` → auto-generated description id when \`description\` is set **and** \`headerSize="medium"\` (the description element only renders for medium size).

**Custom header** (\`header\` prop supplied):
- Auto-generated ids are NOT injected into the custom tree.
- Supply \`aria-labelledby\` (pointing to the title element inside your header) OR \`aria-label\`.
- Omitting both triggers a dev-only \`console.warn\` and leaves the dialog unlabelled.

---

### Token namespace — 9 L3 CSS variables

\`--modal-bg\` · \`--modal-border\` · \`--modal-overlay\` · \`--modal-text-title\` ·
\`--modal-text-body\` · \`--modal-footer-bg\` · \`--modal-footer-border\` ·
\`--modal-icon-bg-*\` · \`--modal-icon-*\`
        `.trim(),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// A. OVERVIEW / DEFAULT
// ─────────────────────────────────────────────────────────────────────────────

export const Overview = {
  name: 'Overview',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**Overview** — default CardModal at `size="medium"`, `height="hug"`, `headerType="basic"`, `headerSize="medium"`, `footerType="basic"`.',
          '',
          '- Title and description present: `aria-labelledby` → title id, `aria-describedby` → description id.',
          '- Primary + secondary action.',
          '- Panel centered. Overlay: 10% opacity + `backdrop-filter: blur(5px)`.',
          '- Close via ✕ button, Escape, or overlay click.',
          '- After closing, click **Open Modal** to reopen.',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// B. SIZE
// ─────────────────────────────────────────────────────────────────────────────

export const SizeSmall = {
  name: 'Size / Small',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          size="small"
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**size="small"** — `max-width: 400px`. Use for confirmations and compact dialogs.',
      },
    },
  },
};

export const SizeMedium = {
  name: 'Size / Medium',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          size="medium"
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**size="medium"** — `max-width: 560px`. Default. Appropriate for most dialog use cases.',
      },
    },
  },
};

export const SizeLarge = {
  name: 'Size / Large',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          size="large"
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**size="large"** — `max-width: 720px`. Use for complex forms or rich content dialogs.',
      },
    },
  },
};

export const SizeXSmall = {
  name: 'Size / XSmall (Mobile Bottom Sheet)',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          size="xsmall"
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
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
          '**size="xsmall"** — Mobile-only bottom sheet at `<768px` viewport.',
          '',
          'Preview runs at **412×812px** which fires `@media (max-width: 767px)` and activates the bottom-sheet CSS path:',
          '- `position: fixed; bottom: 0; left: 0; right: 0; width: 100%`',
          '- `border-radius: 16px 16px 0 0` (top corners only)',
          '- Slide animation: `translateY(100%) → translateY(0)` · 300ms cubic-bezier',
          '- Grabber affordance: 32×4px pill, `aria-hidden="true"`',
          '',
          '⚠️ On desktop/tablet (≥768px) `size="xsmall"` falls back to a 400px centered panel — not a bottom sheet. A dev-only `console.warn` is emitted.',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// C. HEIGHT
// ─────────────────────────────────────────────────────────────────────────────

export const HeightHug = {
  name: 'Height / Hug Content',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          height="hug"
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**height="hug"** — Panel height is content-fitting (Figma `primaryAxisSizingMode: AUTO`). No `height` CSS property applied.',
          '',
          'Global `max-height: calc(100dvh - 48px)` still prevents overflow on short viewports.',
        ].join('\n'),
      },
    },
  },
};

export const HeightShort = {
  name: 'Height / Short (480px)',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          height="short"
          title="The history of cryptocurrency"
          description="From the Bitcoin whitepaper to today's broader blockchain ecosystem."
          primaryLabel="Got it"
          secondaryLabel="Close"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoHistoryContent />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**height="short"** — Fixed target heights (Figma confirmed `primaryAxisSizingMode: FIXED`, node `2477:26072`):',
          '- Desktop: `480px` (`--modal-max-height-sm`)',
          '- Tablet 768–1279px: `440px`',
          '- Mobile <768px: `440px`',
          '',
          'Implementation: `height: min(target, 100dvh - gutter)` — panel renders at target height; never overflows viewport.',
          'Body (`flex: 1 1 0; overflow-y: auto`) fills remaining space and scrolls.',
          'Header/footer are `shrink-0` — always visible.',
        ].join('\n'),
      },
    },
  },
};

export const HeightTall = {
  name: 'Height / Tall (640px)',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          height="tall"
          title="The history of cryptocurrency"
          description="From the Bitcoin whitepaper to today's broader blockchain ecosystem."
          primaryLabel="Got it"
          secondaryLabel="Close"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoHistoryContent />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**height="tall"** — Fixed target heights:',
          '- Desktop: `640px` (`--modal-max-height-md`)',
          '- Tablet 768–1279px: `580px`',
          '- Mobile <768px: `580px`',
        ].join('\n'),
      },
    },
  },
};

export const HeightVenti = {
  name: 'Height / Venti (720px)',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          height="venti"
          title="The history of cryptocurrency"
          description="From the Bitcoin whitepaper to today's broader blockchain ecosystem."
          primaryLabel="Got it"
          secondaryLabel="Close"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoHistoryContent />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**height="venti"** — Fixed target heights:',
          '- Desktop: `720px` (`--modal-max-height-lg`)',
          '- Tablet 768–1279px: `640px`',
          '- Mobile <768px: `640px`',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// D. HEADER TYPES
// ─────────────────────────────────────────────────────────────────────────────

export const HeaderBasic = {
  name: 'Header / Basic',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          headerType="basic"
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**headerType="basic"** — Title and close button only. No icon frame. Medium-size header renders the description below the title.',
      },
    },
  },
};

export const HeaderLeftIcon = {
  name: 'Header / Left Icon',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          headerType="left-icon"
          headerSize="medium"
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**headerType="left-icon"** — 40×40px icon frame left of the title (medium size). Uses `SettingsGear2` icon from the DS icon system.',
      },
    },
  },
};

export const HeaderError = {
  name: 'Header / Error',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          headerType="error"
          title="Unable to create alert"
          description="An unexpected error has occurred. Please try again or contact support."
          primaryLabel="Try again"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**headerType="error"** — Red icon frame with `TriangleExclamation` icon. Use for destructive errors requiring user acknowledgement.',
      },
    },
  },
};

export const HeaderWarning = {
  name: 'Header / Warning',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          headerType="warning"
          title="Confirm price alert"
          description="This action may have unintended consequences. Please review carefully."
          primaryLabel="Continue"
          secondaryLabel="Go back"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**headerType="warning"** — Yellow/amber icon frame with `TriangleExclamation` icon.',
          '',
          'Warning token: `#fddc69` (locked from D0 live Figma confirmation — not `#fff4e5`).',
        ].join('\n'),
      },
    },
  },
};

export const HeaderSuccess = {
  name: 'Header / Success',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          headerType="success"
          title="Price alert created"
          description="Your alert is now active. You'll be notified when BTC/USDT reaches your target price."
          primaryLabel="Done"
          onPrimary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**headerType="success"** — Green icon frame with `CircleCheckFilled` icon.',
      },
    },
  },
};

export const HeaderInformation = {
  name: 'Header / Information',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          headerType="information"
          title="About price alerts"
          description="Read the guide below before proceeding to make sure you have all required information."
          primaryLabel="Got it"
          secondaryLabel="Remind me later"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**headerType="information"** — Blue icon frame with `CircleInfoFilled` icon.',
      },
    },
  },
};

export const HeaderSmall = {
  name: 'Header / Small Size',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          headerSize="small"
          headerType="basic"
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**headerSize="small"** — 56px compact header. No icon frame (bare icon shown inline for non-basic types).',
          '',
          '**ARIA guard:** `description` prop is ignored when `headerSize="small"` because `ModalHeader` does not render the description element for small size (line 87: `size === "medium" && description`). CardModal does NOT emit `aria-describedby` in this case — no dangling reference.',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// E. FOOTER TYPES
// ─────────────────────────────────────────────────────────────────────────────

export const FooterBasic = {
  name: 'Footer / Basic',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          footerType="basic"
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**footerType="basic"** — Buttons are HUG-width, right-aligned via `margin-left: auto`. Use when button widths should not stretch.',
      },
    },
  },
};

export const FooterStretch = {
  name: 'Footer / Stretch',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          footerType="stretch"
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**footerType="stretch"** — Both buttons fill the footer row equally (`flex: 1 1 0`). Standard two-action flows.',
      },
    },
  },
};

export const FooterCheckbox = {
  name: 'Footer / Checkbox',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          footerType="checkbox"
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
          leftContent={
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-body-md)',
                color: 'var(--modal-text-body, #555)',
              }}
            >
              <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
              Don't show again
            </label>
          }
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**footerType="checkbox"** — Checkbox in the left slot. Right side has the standard action buttons. Typical for "Don\'t show again" patterns.',
      },
    },
  },
};

export const FooterToggle = {
  name: 'Footer / Toggle',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [enabled, setEnabled] = useState(false);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          footerType="toggle"
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
          leftContent={
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-body-md)',
                color: 'var(--modal-text-body, #555)',
              }}
            >
              <Switch
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                aria-label="Enable notifications"
              />
              Enable notifications
            </label>
          }
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**footerType="toggle"** — Switch in the left slot. Used for enable/disable opt-in flows.',
      },
    },
  },
};

export const FooterInformation = {
  name: 'Footer / Information',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          footerType="information"
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
          leftContent={
            <span
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: 'var(--modal-text-body, #888)',
                lineHeight: 'var(--text-style-caption-regular-line-height)',
              }}
            >
              Changes take effect immediately
            </span>
          }
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**footerType="information"** — Informational text or icon in the left slot. Right side has the action buttons.',
      },
    },
  },
};

export const FooterLinkButton = {
  name: 'Footer / Link Button',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          footerType="link-button"
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
          leftContent={
            <ButtonLink
              style="primary"
              size="medium"
              onClick={(e) => { e.preventDefault(); }}
            >
              Learn more
            </ButtonLink>
          }
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**footerType="link-button"** — `ButtonLink` in the left slot. "Learn more" patterns or secondary navigation links.',
      },
    },
  },
};

export const FooterPrimaryOnly = {
  name: 'Footer / Primary Only',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          onPrimary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Omitting `secondaryLabel` renders only the primary button. The secondary `Button` is not mounted — no empty DOM element.',
      },
    },
  },
};

export const FooterPrimaryDisabled = {
  name: 'Footer / Primary Disabled',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          primaryDisabled
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '`primaryDisabled={true}` — Primary button rendered as disabled. Use when a prerequisite (form validation, agreement) is incomplete.',
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// F. CUSTOM SLOT API
// ─────────────────────────────────────────────────────────────────────────────

export const CustomHeaderAriaLabelledBy = {
  name: 'Custom Slot / Header + aria-labelledby',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    // Stable ID for story — consumers should use useId() in production
    const titleId = 'custom-header-title-demo';
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby={titleId}
          header={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid var(--modal-border)',
                background: 'var(--modal-bg)',
                flexShrink: 0,
              }}
            >
              <span
                id={titleId}
                style={{
                  fontSize: 'var(--font-size-body-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--modal-text-title)',
                  fontFamily: 'var(--font-family-display)',
                }}
              >
                Custom header title
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--modal-text-title)',
                  fontSize: 'var(--font-size-body-xl)',
                }}
              >
                ✕
              </button>
            </div>
          }
          primaryLabel="OK"
          onPrimary={() => setOpen(false)}
        >
          <div style={{ padding: '20px 24px', fontFamily: 'var(--font-family-body)', fontSize: 'var(--font-size-body-md)', color: 'var(--modal-text-body, #555)', lineHeight: 'var(--text-style-body-regular-md-line-height)' }}>
            <p style={{ margin: 0 }}>
              Custom <code>header</code> node. The <code>aria-labelledby</code> prop points to the{' '}
              <code>id="{titleId}"</code> element inside the custom header tree.
            </p>
          </div>
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**Custom header with `aria-labelledby`.**',
          '',
          'When you supply a custom `header` node, CardModal does NOT inject its auto-generated id into your tree.',
          'You MUST pass `aria-labelledby` pointing to the title element inside your header.',
          '',
          '```jsx',
          'const titleId = useId(); // production — stable unique id',
          '<CardModal',
          '  header={<div><span id={titleId}>Custom title</span>...</div>}',
          '  aria-labelledby={titleId}',
          '>',
          '```',
        ].join('\n'),
      },
    },
  },
};

export const CustomHeaderAriaLabel = {
  name: 'Custom Slot / Header + aria-label',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          aria-label="Fully custom dialog"
          header={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid var(--modal-border)',
                background: 'var(--modal-bg)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: '#6937ee' }} />
                <span
                  style={{
                    fontSize: 'var(--font-size-body-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--modal-text-title)',
                    fontFamily: 'var(--font-family-display)',
                  }}
                >
                  Custom header without id
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--modal-text-title)',
                  fontSize: 'var(--font-size-body-xl)',
                }}
              >
                ✕
              </button>
            </div>
          }
          primaryLabel="OK"
          onPrimary={() => setOpen(false)}
        >
          <div style={{ padding: '20px 24px', fontFamily: 'var(--font-family-body)', fontSize: 'var(--font-size-body-md)', color: 'var(--modal-text-body, #555)', lineHeight: 'var(--text-style-body-regular-md-line-height)' }}>
            <p style={{ margin: 0 }}>
              Custom <code>header</code> node where the title is not id-linkable.
              The <code>aria-label</code> prop provides the accessible name instead of{' '}
              <code>aria-labelledby</code>.
            </p>
          </div>
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**Custom header with `aria-label` fallback.**',
          '',
          'When the title in your custom header cannot be given a linkable `id`, use `aria-label` to provide the accessible name directly.',
          '',
          '```jsx',
          '<CardModal',
          '  header={<CustomHeaderWithoutId />}',
          '  aria-label="Dialog accessible name"',
          '>',
          '```',
          '',
          'Omitting both `aria-label` and `aria-labelledby` when using a custom header triggers a dev-only `console.warn`.',
        ].join('\n'),
      },
    },
  },
};

export const CustomFooter = {
  name: 'Custom Slot / Footer',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          footer={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderTop: '1px solid var(--modal-footer-border)',
                background: 'var(--modal-footer-bg)',
                flexShrink: 0,
                gap: 12,
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-body-sm)',
                color: 'var(--modal-text-body, #888)',
              }}
            >
              <span>Step 1 of 3</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: '1px solid var(--modal-border)',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 'var(--font-size-body-md)',
                    fontFamily: 'var(--font-family-body)',
                    color: 'var(--modal-text-title)',
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#6937ee',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: 'var(--font-size-body-md)',
                    fontFamily: 'var(--font-family-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          }
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**Custom `footer` node.** Passing a truthy `footer` prop replaces the default `ModalFooter` entirely.',
          '',
          'The footer slot is mandatory — do not pass `null`, `undefined`, or `false` without a replacement. If you want no footer, reconsider the component choice.',
          '',
          '```jsx',
          '<CardModal',
          '  footer={<MyWizardFooter onBack={…} onNext={…} />}',
          '>',
          '```',
        ].join('\n'),
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// G. BEHAVIOUR
// ─────────────────────────────────────────────────────────────────────────────

export const BehaviourCloseOnEscapeFalse = {
  name: 'Behaviour / Escape disabled',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          closeOnEscape={false}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**closeOnEscape={false}** — Escape key does not call `onClose`. Use for intentional flows where accidental dismissal would cause data loss.',
      },
    },
  },
};

export const BehaviourCloseOnOverlayClickFalse = {
  name: 'Behaviour / Overlay click disabled',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          closeOnOverlayClick={false}
          title="Create price alert"
          description="Get notified when a trading pair reaches your target price."
          primaryLabel="Create alert"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <CryptoAlertForm />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**closeOnOverlayClick={false}** — Clicking the backdrop overlay does not call `onClose`. Useful when the modal represents a required interaction.',
      },
    },
  },
};

export const BehaviourLongContent = {
  name: 'Behaviour / Long scrollable content',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    return (
      <>
        <MockBackground />
        {!open && <ReopenButton onClick={() => setOpen(true)} />}
        <CardModal
          open={open}
          onClose={() => setOpen(false)}
          height="tall"
          title="Scrollable body"
          description="24-row list confirms body-only scroll. Header and footer stay pinned."
          primaryLabel="Done"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <LongBody />
        </CardModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          '**Long scrollable content** — 24-row list inside `height="tall"` (640px fixed).',
          '',
          'Verifies body-only scroll behavior:',
          '```css',
          '.card-modal__body {',
          '  flex: 1 1 0;',
          '  min-height: 0;',
          '  overflow-y: auto;',
          '}',
          '```',
          'Header (shrink-0) and footer (shrink-0) remain visible at all times.',
        ].join('\n'),
      },
    },
  },
};
