import React, { useState } from 'react';
import Checkbox from './Checkbox.jsx';
import CheckboxLabel from './CheckboxLabel.jsx';
import CheckboxCard from './CheckboxCard.jsx';
import Badge from '../badge/Badge.jsx';
import Avatar from '../avatar/Avatar.jsx';
import CircleInfo from '../../icons/CircleInfo.jsx';
import MastercardLogo from '../../assets/logos/Mastercard.jsx';
import ShazamLogo from '../../assets/logos/Shazam.jsx';
import AuroraLogo from '../../assets/logos/Aurora.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Checkbox family — Overview
// Navigation: Components/Checkbox/Overview
//
// Shows all three components at a glance:
//   Checkbox     — atomic checkbox at medium + small
//   CheckboxLabel — label row with all anatomy elements
//   CheckboxCard  — basic + provider + brand + company types
// ─────────────────────────────────────────────────────────────────────────────

const LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 10,
  fontWeight: 700,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

function SLabel({ children }) {
  return <span style={LABEL_STYLE}>{children}</span>;
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--border-neutral-default, #e5e5e5)', margin: '4px 0' }} />;
}

// Controlled wrappers
function ControlledLabel(props) {
  const [checked, setChecked] = useState(props.checked ?? false);
  return <CheckboxLabel {...props} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
}

function ControlledCard(props) {
  const [checked, setChecked] = useState(props.checked ?? false);
  return <CheckboxCard {...props} checked={checked} onChange={(val) => setChecked(val)} />;
}

export default {
  title: 'Components/Checkbox/Overview',
  parameters: {
    docs: {
      description: {
        component: `
**Checkbox family** — three related components for selection UI.

| Component | Figma node | Purpose |
|---|---|---|
| \`Checkbox\` | \`↳checkbox\` 2113:34056 | Atomic checkbox control. 2 sizes × 4 states × Active × Indeterminate. |
| \`CheckboxLabel\` | \`↳checkbox-label\` 2164:10056 | Checkbox + label row. Adds label, sublabel, description, link button, flip. |
| \`CheckboxCard\` | \`↳checkbox-card\` 2166:660 | Selectable card. 6 types × 4 states. Real Mastercard/Shazam/Aurora assets. |

**Token architecture:** 3-layer L1 → L2 → L3. Component CSS references L3 vars only. No \`:root\` blocks.

**DS decisions (resolved 2026-07-31):**
- Focused wrapper: no Figma variant — native Checkbox focus ring applies.
- Hover border: Hover card is background-only per Figma.
- Provider bg \`#252525\`: asset-owned by DS decision.
- Card shadow: \`--shadow-regular-xsmall\` confirmed by DS owner.
- CheckboxLabel bg: root stays transparent by DS decision.
- \`↳buttons-link\`: placeholder uses \`--link-button-primary-*\` L3 tokens.

Figma source: [Design System Scalable V.2.1.0 → ❖ Checkbox](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi?node-id=2113-34056)
        `,
      },
    },
    controls: { disable: true },
  },
};

export const Overview = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 520, padding: '8px 0' }}>

      {/* ── Checkbox ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SLabel>Checkbox</SLabel>
        <Divider />
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Checkbox checked={false} onChange={() => {}} />
            <span style={{ ...LABEL_STYLE, fontSize: 9, textTransform: 'none', color: '#aaa' }}>Off</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Checkbox checked={true} onChange={() => {}} />
            <span style={{ ...LABEL_STYLE, fontSize: 9, textTransform: 'none', color: '#aaa' }}>Checked</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Checkbox checked="indeterminate" onChange={() => {}} />
            <span style={{ ...LABEL_STYLE, fontSize: 9, textTransform: 'none', color: '#aaa' }}>Indet.</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Checkbox checked={false} disabled onChange={() => {}} />
            <span style={{ ...LABEL_STYLE, fontSize: 9, textTransform: 'none', color: '#aaa' }}>Disabled</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Checkbox checked={false} size="small" onChange={() => {}} />
            <span style={{ ...LABEL_STYLE, fontSize: 9, textTransform: 'none', color: '#aaa' }}>Small</span>
          </div>
        </div>
      </section>

      {/* ── CheckboxLabel ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SLabel>CheckboxLabel</SLabel>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ControlledLabel label="Remember me" />
          <ControlledLabel
            label="Accept terms"
            description="By checking this box you agree to our Terms of Service."
            linkLabel="Read terms"
            onLinkClick={() => {}}
          />
          <ControlledLabel
            label="New feature"
            sublabel="Beta"
            badge={<Badge badgeStyle="light" color="blue" size="small" label="NEW" />}
          />
          <ControlledLabel label="Flipped checkbox" flip />
          <ControlledLabel label="Organization-managed" description="Contact admin." disabled />
        </div>
      </section>

      {/* ── CheckboxCard ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SLabel>CheckboxCard</SLabel>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ControlledCard
            type="basic"
            label="Standard plan"
            sublabel="$9 / month"
            description="Access to all core features."
          />
          <ControlledCard
            type="left-icon"
            icon={<CircleInfo />}
            label="Analytics"
            sublabel="View usage data"
          />
          <ControlledCard
            type="avatar"
            avatar={<Avatar name="Jane Brown" size={40} />}
            label="Jane Brown"
            sublabel="jane@example.com"
          />
          <ControlledCard
            type="card-provider"
            providerAsset={<MastercardLogo />}
            label="Mastercard"
            sublabel="•••• 4242"
          />
          <ControlledCard
            type="brand"
            brandAsset={<ShazamLogo />}
            label="Shazam"
            sublabel="Music identification"
          />
          <ControlledCard
            type="company"
            companyAsset={<AuroraLogo />}
            label="Aurora"
            sublabel="aurora.io"
          />
        </div>
      </section>

    </div>
  ),
};
