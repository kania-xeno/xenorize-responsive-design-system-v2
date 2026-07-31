import React from 'react';
import Checkbox from './Checkbox.jsx';
import CheckboxLabel from './CheckboxLabel.jsx';
import CheckboxCard from './CheckboxCard.jsx';
import CircleInfo from '../../icons/CircleInfo.jsx';
import MastercardLogo from '../../assets/logos/Mastercard.jsx';
import ShazamLogo from '../../assets/logos/Shazam.jsx';
import AuroraLogo from '../../assets/logos/Aurora.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Checkbox family — Dark Mode
// Navigation: Components/Checkbox/Dark Mode
//
// Token chain resolves via data-theme="dark" on the root wrapper.
// All --checkbox-* L3 vars resolve through L2 → L1 under dark mode.
// ─────────────────────────────────────────────────────────────────────────────

const STORY_CSS = `
  .checkbox-story-hover-dk .checkbox__bg {
    background-color: var(--checkbox-bg-hover) !important;
  }
`;

const LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 10,
  fontWeight: 700,
  color: '#6b7189',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

function SLabel({ children }) {
  return <span style={LABEL_STYLE}>{children}</span>;
}

export default {
  title: 'Components/Checkbox/Dark Mode',
  // Force the withTheme decorator (preview.js) to apply data-theme="dark" for
  // every story in this file. Without this, context.globals.theme defaults to
  // "light" and the decorator wraps with data-theme="light", producing a white
  // outer canvas around the story's own dark inner wrapper.
  globals: { theme: 'dark' },
  parameters: {
    docs: {
      description: {
        component: `
**Dark Mode** — Checkbox family token resolution under \`data-theme="dark"\`.

All \`--checkbox-*\` L3 vars resolve through L2 → L1 primitives automatically when \`data-theme="dark"\` is set on a parent element. No component changes needed.

Asset colors (Mastercard, Shazam, Aurora) are asset-owned and do not change in dark mode.

Use the **Theme** toolbar toggle (☀ / ☾) to switch between light and dark globally across all stories. This story always defaults to dark mode via \`globals: { theme: "dark" }\`.
        `,
      },
    },
    controls: { disable: true },
  },
};

export const DarkMode = {
  name: 'Dark Mode',
  render: () => (
    <div
      data-theme="dark"
      style={{
        background: '#1b1c22',
        padding: 32,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <style>{STORY_CSS}</style>

      {/* ── Checkbox states ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel>Checkbox — states</SLabel>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {[
            { label: 'Off',       node: <Checkbox checked={false} onChange={() => {}} /> },
            { label: 'Hover',     node: <div className="checkbox-story-hover-dk"><Checkbox checked={false} onChange={() => {}} /></div> },
            { label: 'Checked',   node: <Checkbox checked={true} onChange={() => {}} /> },
            { label: 'Indet.',    node: <Checkbox checked="indeterminate" onChange={() => {}} /> },
            { label: 'Disabled',  node: <Checkbox checked={false} disabled onChange={() => {}} /> },
          ].map(({ label, node }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              {node}
              <span style={{ ...LABEL_STYLE, fontSize: 9, textTransform: 'none' }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CheckboxLabel ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel>CheckboxLabel</SLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
          <CheckboxLabel
            checked={false}
            label="Subscribe to newsletter"
            description="Receive weekly product updates."
            onChange={() => {}}
          />
          <CheckboxLabel
            checked={true}
            label="Enable notifications"
            sublabel="Recommended"
            onChange={() => {}}
          />
          <CheckboxLabel
            checked={false}
            disabled
            label="Organization-managed setting"
            description="Contact your admin to change this."
            onChange={() => {}}
          />
        </div>
      </section>

      {/* ── CheckboxCard — basic ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel>CheckboxCard — basic</SLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
          <CheckboxCard type="basic" label="Standard plan" sublabel="$9 / month" checked={false} onChange={() => {}} />
          <CheckboxCard type="basic" label="Pro plan" sublabel="$29 / month" checked={true} onChange={() => {}} />
          <CheckboxCard type="basic" label="Enterprise plan" sublabel="Contact sales" disabled onChange={() => {}} />
        </div>
      </section>

      {/* ── CheckboxCard — left-icon ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel>CheckboxCard — left-icon</SLabel>
        <div style={{ maxWidth: 400 }}>
          <CheckboxCard
            type="left-icon"
            icon={<CircleInfo />}
            label="Analytics"
            sublabel="View usage data"
            checked={false}
            onChange={() => {}}
          />
        </div>
      </section>

      {/* ── CheckboxCard — real assets ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel>CheckboxCard — brand assets</SLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
          <CheckboxCard
            type="card-provider"
            providerAsset={<MastercardLogo />}
            label="Mastercard"
            sublabel="•••• 4242"
            checked={false}
            onChange={() => {}}
          />
          <CheckboxCard
            type="brand"
            brandAsset={<ShazamLogo />}
            label="Shazam"
            sublabel="Music identification"
            checked={false}
            onChange={() => {}}
          />
          <CheckboxCard
            type="company"
            companyAsset={<AuroraLogo />}
            label="Aurora"
            sublabel="aurora.io"
            checked={true}
            onChange={() => {}}
          />
        </div>
      </section>
    </div>
  ),
};
