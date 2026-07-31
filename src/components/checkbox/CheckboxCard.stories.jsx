import React, { useState, useEffect } from 'react';
import CheckboxCard from './CheckboxCard.jsx';
import Badge from '../badge/Badge.jsx';
import Avatar from '../avatar/Avatar.jsx';
import CircleInfo from '../../icons/CircleInfo.jsx';
import MastercardLogo from '../../assets/logos/Mastercard.jsx';
import ShazamLogo from '../../assets/logos/Shazam.jsx';
import AuroraLogo from '../../assets/logos/Aurora.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// CheckboxCard — Types · States · All Types × States
// Navigation: Components/Checkbox/Checkbox Card
//
// Figma: ↳checkbox-card node 2166:660 — 24 variants (6 types × 4 states)
//   Design System Scalable V.2.1.0 → ❖ Checkbox
//
// Real assets (from Assets V.2.0.0, exported 2026-07-31):
//   Card Provider → Mastercard   (node 21:4722, 32×24px landscape)
//   Brand         → Shazam       (node 21:3715, 32×32px source / 40×40px in Figma instance)
//   Company       → Aurora       (node 19:3273, 40×40px, Placeholder Logo page)
//
// DS decisions (resolved 2026-07-31):
//   Shadow      — --shadow-regular-xsmall confirmed by DS owner.
//   Hover border — bg-only per Figma; --checkbox-card-border-hover not applied.
//   Provider bg  — #252525 asset-owned by DS decision; also baked into Mastercard SVG.
//   Focused     — no Figma wrapper variant; browser outline preserved.
// ─────────────────────────────────────────────────────────────────────────────

// ── Story-only CSS (pseudo-state simulation) ──────────────────────────────────
// In production, :hover in CheckboxCard.css handles hover automatically.
// .checkbox-card--story-hover simulates hover for the static States story.
const STORY_CSS = `
  .checkbox-card--story-hover {
    background-color: var(--checkbox-card-bg-hover) !important;
  }
`;

const LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 10,
  fontWeight: 700,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

function SLabel({ children, style }) {
  return <span style={{ ...LABEL_STYLE, ...style }}>{children}</span>;
}

// Controlled wrapper — per-card state management
function CheckboxCardPlayground({
  checked: initialChecked = false,
  disabled = false,
  type = 'basic',
  label = 'Card label',
  sublabel,
  description,
  badge,
}) {
  const [checked, setChecked] = useState(initialChecked);
  return (
    <div style={{ maxWidth: 400 }}>
      <CheckboxCard
        checked={checked}
        disabled={disabled}
        type={type}
        label={label}
        sublabel={sublabel}
        description={description}
        badge={badge}
        icon={type === 'left-icon' ? <CircleInfo /> : undefined}
        avatar={type === 'avatar' ? <Avatar name="Jane Brown" size={40} /> : undefined}
        providerAsset={type === 'card-provider' ? <MastercardLogo /> : undefined}
        brandAsset={type === 'brand' ? <ShazamLogo /> : undefined}
        companyAsset={type === 'company' ? <AuroraLogo /> : undefined}
        onChange={(val) => setChecked(val)}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Checkbox/Checkbox Card',
  component: CheckboxCard,
  parameters: {
    docs: {
      description: {
        component: `
**CheckboxCard** — selectable card with trailing Checkbox (\`↳checkbox-card\`).

Figma: node 2166:660 · 6 types × 4 states = 24 variants

**Left-slot types:**

| Type | Left slot | Asset |
|---|---|---|
| \`basic\` | None — text only | — |
| \`left-icon\` | 40×40px KeyIcon container | KeyIcon.jsx |
| \`avatar\` | 40×40px Avatar (consumer provides) | Avatar.jsx |
| \`card-provider\` | 32×24px dark bg container | Mastercard.jsx (Assets V.2.0.0, node 21:4722) |
| \`brand\` | 40×40px, no container bg | Shazam.jsx (Assets V.2.0.0, node 21:3715) |
| \`company\` | 40×40px circular container | Aurora.jsx (Assets V.2.0.0, node 19:3273) |

**Token bindings (L3):**
- Card bg → \`--checkbox-card-bg-{default|hover|active|disabled}\`
- Card border → \`--checkbox-card-border-{default|hover|active|disabled}\`
- Label text → \`--checkbox-card-text-label\`
- Shadow → \`--shadow-regular-xsmall\` (DS owner confirmed 2026-07-31)

**Nested instance token rules:**
- \`↳checkbox\` trailing — keeps its own \`--checkbox-*\` tokens (not re-tokenized)
- \`↳badge\` — consumer passes pre-configured \`<Badge>\`; Badge owns its own tokens
- Provider/Brand/Company assets — asset-owned colors; do NOT re-tokenize

Figma source: [Design System Scalable V.2.1.0 → ❖ Checkbox](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi?node-id=2166-660)
        `,
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. Playground — full Controls coverage
// ─────────────────────────────────────────────────────────────────────────────

export const Playground = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: `
Interactive sandbox for CheckboxCard. Use the Controls panel to configure every aspect.

**Type:** Switch between all 6 types. Left-slot asset renders automatically for the selected type.

**Left slot visibility:** \`showLeftSlot=false\` hides the asset/icon/avatar for any type — useful for testing layout without the left slot.

**Badge:** Toggle \`showBadge\` on/off. Configure label, style, and color independently.

**Real assets:** Mastercard (32×24px), Shazam (40×40px), and Aurora (40×40px) — exported from Assets V.2.0.0 on 2026-07-31.
        `,
      },
    },
  },
  args: {
    type:            "card-provider",
    checked:         false,
    disabled:        false,
    label:           'Standard plan',
    showSublabel:    true,
    sublabel:        "($9 / month)",
    showDescription: true,
    description:     'Access to all core features.',
    showBadge:       true,
    badgeLabel:      'NEW',
    badgeStyle:      'light',
    badgeColor:      'blue',
    showLeftSlot:    true,
    avatarName:      'Jane Brown',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['basic', 'left-icon', 'avatar', 'card-provider', 'brand', 'company'],
      description: 'Card type — determines left slot content.',
    },
    checked:         { control: 'boolean', description: 'Checked / active state.' },
    disabled:        { control: 'boolean', description: 'Disabled state. Prevents interaction.' },
    label:           { control: 'text',    description: 'Primary label (required).' },
    showSublabel:    { control: 'boolean', description: 'Show sublabel in title row.' },
    sublabel:        { control: 'text',    description: 'Sublabel text (active when showSublabel=true).' },
    showDescription: { control: 'boolean', description: 'Show description below title row.' },
    description:     { control: 'text',    description: 'Description text (active when showDescription=true).' },
    showBadge:       { control: 'boolean', description: 'Show Badge in title row.' },
    badgeLabel:      { control: 'text',    description: 'Badge label (active when showBadge=true).' },
    badgeStyle: {
      control: { type: 'select' },
      options: ['light', 'filled', 'lighter', 'stroke'],
      description: 'Badge style (active when showBadge=true).',
    },
    badgeColor: {
      control: { type: 'select' },
      options: ['blue', 'gray', 'green', 'purple', 'red', 'orange', 'sky', 'pink', 'teal'],
      description: 'Badge color (active when showBadge=true).',
    },
    showLeftSlot: {
      control: 'boolean',
      description: 'Show left slot. Set false to test layout without an asset for any type.',
    },
    avatarName: {
      control: 'text',
      description: 'Avatar display name — initials derived from name (used when type=avatar).',
    },
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    // Sync when Controls panel changes the checked arg
    useEffect(() => { setChecked(args.checked); }, [args.checked]);

    // Left slot — only populated if showLeftSlot=true AND type has a slot
    const leftSlotProps = {};
    if (args.showLeftSlot && args.type !== 'basic') {
      if (args.type === 'left-icon')     leftSlotProps.icon          = <CircleInfo />;
      if (args.type === 'avatar')        leftSlotProps.avatar        = <Avatar name={args.avatarName} size={40} />;
      if (args.type === 'card-provider') leftSlotProps.providerAsset = <MastercardLogo />;
      if (args.type === 'brand')         leftSlotProps.brandAsset    = <ShazamLogo />;
      if (args.type === 'company')       leftSlotProps.companyAsset  = <AuroraLogo />;
    }

    return (
      <div style={{ maxWidth: 400 }}>
        <CheckboxCard
          type={args.type}
          checked={checked}
          disabled={args.disabled}
          label={args.label}
          sublabel={args.showSublabel    ? args.sublabel    : undefined}
          description={args.showDescription ? args.description : undefined}
          badge={
            args.showBadge
              ? <Badge badgeStyle={args.badgeStyle} color={args.badgeColor} size="small" label={args.badgeLabel} />
              : undefined
          }
          {...leftSlotProps}
          onChange={(val) => setChecked(val)}
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Types — all 6 CheckboxCard types
// ─────────────────────────────────────────────────────────────────────────────

export const Types = {
  name: 'Types',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
All 6 CheckboxCard types. Real brand assets from Assets V.2.0.0 (exported 2026-07-31).

**Card Provider:** Mastercard SVG (32×24px landscape). Dark bg (#252525) is baked into the SVG; container CSS bg is a safety layer.
**Brand:** Shazam SVG (40×40px — scaled from 32×32px source to match Figma instance size).
**Company:** Aurora SVG (40×40px circle with red #FB3748 bg).

**Avatar:** Real \`Avatar.jsx\` component. Pass \`name\` and \`size={40}\`.
        `,
      },
    },
  },
  render: () => {
    const types = [
      { type: 'basic',         label: 'Basic',         sublabel: '$9 / month',         description: 'Access to all core features.' },
      { type: 'left-icon',     label: 'Left Icon',     sublabel: 'KeyIcon size=m',      description: 'Icon via KeyIcon.jsx component.' },
      { type: 'avatar',        label: 'Avatar',        sublabel: 'Jane Brown',          description: 'Avatar.jsx — initials from name prop.' },
      { type: 'card-provider', label: 'Card Provider', sublabel: 'Mastercard · 32×24px', description: 'bg #252525 asset-owned (DS decision).' },
      { type: 'brand',         label: 'Brand',         sublabel: 'Shazam · 40×40px',   description: 'Brand SVG, colors asset-owned.' },
      { type: 'company',       label: 'Company',       sublabel: 'Aurora · 40×40px',   description: 'Company SVG, bg asset-owned.' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {types.map(({ type, label, sublabel, description }) => (
          <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SLabel>{label}</SLabel>
            <CheckboxCardPlayground type={type} label={label} sublabel={sublabel} description={description} />
          </div>
        ))}
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. States — 4 states using basic type
// ─────────────────────────────────────────────────────────────────────────────

export const States = {
  name: 'States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
All 4 CheckboxCard states using the \`basic\` type. Badge slot shown for Default and Disabled.

**Hover** is simulated via story-only CSS class. In production, \`:hover\` in \`CheckboxCard.css\` handles this.

**Shadow:** \`--shadow-regular-xsmall\` on Default/Hover/Checked. Disabled: \`box-shadow: none\` (Effect Style absent in Figma).
**Hover border:** bg-only per Figma. \`--checkbox-card-border-hover\` is emitted but intentionally not applied.
        `,
      },
    },
  },
  render: () => {
    const states = [
      {
        label: 'Default',
        node: (
          <CheckboxCard
            type="basic"
            label="Standard plan"
            sublabel="$9 / month"
            description="Access to all core features."
            badge={<Badge badgeStyle="light" color="blue" size="small" label="NEW" />}
            checked={false}
            onChange={() => {}}
          />
        ),
      },
      {
        label: 'Hover (simulated)',
        node: (
          <CheckboxCard
            type="basic"
            label="Standard plan"
            sublabel="$9 / month"
            description="Access to all core features."
            checked={false}
            className="checkbox-card--story-hover"
            onChange={() => {}}
          />
        ),
      },
      {
        label: 'Checked / Active',
        node: (
          <CheckboxCard
            type="basic"
            label="Standard plan"
            sublabel="$9 / month"
            description="Access to all core features."
            checked={true}
            onChange={() => {}}
          />
        ),
      },
      {
        label: 'Disabled',
        node: (
          <CheckboxCard
            type="basic"
            label="Standard plan"
            sublabel="$9 / month"
            description="Access to all core features."
            badge={<Badge disabled color="gray" size="small" label="NEW" />}
            disabled
            onChange={() => {}}
          />
        ),
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <style>{STORY_CSS}</style>
        {states.map(({ label, node }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SLabel>{label}</SLabel>
            <div style={{ maxWidth: 400 }}>{node}</div>
          </div>
        ))}
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. All Types × States — 6 × 4 grid
// ─────────────────────────────────────────────────────────────────────────────

export const AllTypesStates = {
  name: 'All Types × States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
6 types × 4 states = 24 combinations.

Columns = states (Default · Hover · Checked · Disabled).
Rows = types (basic · left-icon · avatar · card-provider · brand · company).

Real Mastercard, Shazam, and Aurora assets from Assets V.2.0.0 (exported 2026-07-31).
        `,
      },
    },
  },
  render: () => {
    const stateLabels = ['Default', 'Hover', 'Checked', 'Disabled'];
    const TYPES_CONFIG = [
      {
        type: 'basic',
        label: 'Basic',
        icon: undefined,
        avatar: undefined,
        providerAsset: undefined,
        brandAsset: undefined,
        companyAsset: undefined,
      },
      {
        type: 'left-icon',
        label: 'Left Icon',
        icon: <CircleInfo />,
        avatar: undefined,
        providerAsset: undefined,
        brandAsset: undefined,
        companyAsset: undefined,
      },
      {
        type: 'avatar',
        label: 'Avatar',
        icon: undefined,
        avatar: <Avatar name="Jane Brown" size={40} />,
        providerAsset: undefined,
        brandAsset: undefined,
        companyAsset: undefined,
      },
      {
        type: 'card-provider',
        label: 'Card Provider',
        icon: undefined,
        avatar: undefined,
        providerAsset: <MastercardLogo />,
        brandAsset: undefined,
        companyAsset: undefined,
      },
      {
        type: 'brand',
        label: 'Brand',
        icon: undefined,
        avatar: undefined,
        providerAsset: undefined,
        brandAsset: <ShazamLogo />,
        companyAsset: undefined,
      },
      {
        type: 'company',
        label: 'Company',
        icon: undefined,
        avatar: undefined,
        providerAsset: undefined,
        brandAsset: undefined,
        companyAsset: <AuroraLogo />,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <style>{STORY_CSS}</style>

        {/* State column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(4, 1fr)', gap: 8, alignItems: 'center' }}>
          <span />
          {stateLabels.map((s) => (
            <SLabel key={s}>{s}</SLabel>
          ))}
        </div>

        {TYPES_CONFIG.map(({ type, label, icon, avatar, providerAsset, brandAsset, companyAsset }) => (
          <div
            key={type}
            style={{ display: 'grid', gridTemplateColumns: '100px repeat(4, 1fr)', gap: 8, alignItems: 'center' }}
          >
            <SLabel>{label}</SLabel>

            {/* Default */}
            <CheckboxCard
              type={type}
              label={label}
              sublabel="Sublabel"
              checked={false}
              icon={icon}
              avatar={avatar}
              providerAsset={providerAsset}
              brandAsset={brandAsset}
              companyAsset={companyAsset}
              onChange={() => {}}
            />

            {/* Hover */}
            <CheckboxCard
              type={type}
              label={label}
              sublabel="Sublabel"
              checked={false}
              className="checkbox-card--story-hover"
              icon={icon}
              avatar={avatar}
              providerAsset={providerAsset}
              brandAsset={brandAsset}
              companyAsset={companyAsset}
              onChange={() => {}}
            />

            {/* Checked */}
            <CheckboxCard
              type={type}
              label={label}
              sublabel="Sublabel"
              checked={true}
              icon={icon}
              avatar={avatar}
              providerAsset={providerAsset}
              brandAsset={brandAsset}
              companyAsset={companyAsset}
              onChange={() => {}}
            />

            {/* Disabled */}
            <CheckboxCard
              type={type}
              label={label}
              sublabel="Sublabel"
              disabled
              icon={icon}
              avatar={avatar}
              providerAsset={providerAsset}
              brandAsset={brandAsset}
              companyAsset={companyAsset}
              onChange={() => {}}
            />
          </div>
        ))}
      </div>
    );
  },
};
