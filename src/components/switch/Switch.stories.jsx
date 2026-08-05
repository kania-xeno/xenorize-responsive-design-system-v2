import React, { useState, useEffect } from 'react';
import Switch from './Switch.jsx';
import SwitchLabel from './SwitchLabel.jsx';
import SwitchCard from './SwitchCard.jsx';
import SwitchIntegration from './SwitchIntegration.jsx';
import Badge from '../badge/Badge.jsx';
import Avatar from '../avatar/Avatar.jsx';
import CircleInfo from '../../icons/CircleInfo.jsx';
import MastercardLogo from '../../assets/logos/Mastercard.jsx';
import TripAdvisorLogo from '../../assets/logos/TripAdvisor.jsx';
import CatalystLogo from '../../assets/logos/Catalyst.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Switch family — Switch.stories.jsx
// Navigation: Components/Switch
//
// Covers all four related components:
//   Switch           — atomic toggle ↳switch              (node 2113:25063)
//   SwitchLabel      — toggle + label row ↳switch-label   (node 2278:71)
//   SwitchCard       — selectable card ↳switch-card        (node 2278:136)
//   SwitchIntegration — app/service row ↳switch-integration (node 2278:30)
//
// Story order (required):
//   1. Playground                — interactive sandbox
//   2. Overview                  — full family at a glance
//   3. CoreSwitch                — Switch states
//   4. SwitchLabelVariants       — SwitchLabel variants (name: 'Switch Label')
//   5. SwitchCardTypes           — 6 SwitchCard left-slot types
//   6. SwitchCardStates          — 4 SwitchCard states
//   7. SwitchIntegrationVariants — 4 Figma-confirmed layout × style variants
//   8. DisabledExamples          — disabled state across the family
//   9. DarkMode                  — all 4 components under data-theme="dark"
//
// Token architecture: 3-layer L1 --prim-* → L2 --color-* → L3 --switch-* / --switch-card-*
// DS version: v2.1.0 · Figma file key: 0aVnOgjVWH1YL8JCnjXTBi · Page: ❖ Switch
// ─────────────────────────────────────────────────────────────────────────────

// ── Story-only CSS (pseudo-state simulation) ──────────────────────────────────
// Production :hover and :focus-visible pseudo-selectors in Switch.css and
// SwitchCard.css handle these automatically. These classes exist only to allow
// static visual QA in Storybook where pseudo-states cannot be forced.
const STORY_CSS = `
  /* Switch hover simulation — unchecked track fills with hover-gray */
  .switch-story-hover .switch__track {
    background-color: var(--switch-track-hover) !important;
  }
  .switch-story-hover .switch__dot {
    background-color: var(--switch-track-hover) !important;
  }

  /* Switch focus-visible simulation */
  .switch-story-focus .switch__track {
    box-shadow: var(--shadow-focus-ring-primary) !important;
    outline: none !important;
  }

  /* SwitchCard hover simulation — bg changes, nested track follows */
  .switch-card--story-hover {
    background-color: var(--switch-card-bg-hover) !important;
  }
  .switch-card--story-hover .switch__track {
    background-color: var(--switch-track-hover) !important;
  }
  .switch-card--story-hover .switch__dot {
    background-color: var(--switch-track-hover) !important;
  }
`;

// ── Shared story UI helpers ────────────────────────────────────────────────────
const LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 10,
  fontWeight: 700,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

// Dark mode variant — matches CheckboxDarkMode.stories.jsx convention
const DARK_LABEL_STYLE = {
  ...LABEL_STYLE,
  color: '#6b7189',
};

function SLabel({ children, dark, style }) {
  return <span style={{ ...(dark ? DARK_LABEL_STYLE : LABEL_STYLE), ...style }}>{children}</span>;
}

function Divider({ dark }) {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'var(--border-neutral-default, #e5e5e5)'}`,
        margin: '4px 0',
      }}
    />
  );
}

// ── Controlled wrappers ────────────────────────────────────────────────────────
// Each wrapper creates its own isolated checked state.
// Used in static visual stories so instances remain interactive without
// lifting state into the story render.

function ControlledSwitchLabel(props) {
  const [checked, setChecked] = useState(props.checked ?? false);
  return (
    <SwitchLabel
      {...props}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

function ControlledSwitchCard(props) {
  const [checked, setChecked] = useState(props.checked ?? false);
  return (
    <SwitchCard
      {...props}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

function ControlledSwitchIntegration(props) {
  const [checked, setChecked] = useState(props.checked ?? false);
  return (
    <SwitchIntegration
      {...props}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

// ── Playground controlled wrapper ──────────────────────────────────────────────
// Isolated component for the Playground story. Handles state + useEffect so
// the Controls panel can reset checked without a page reload.
function SwitchFamilyPlayground({
  activeComponent = 'SwitchCard',
  checked: initialChecked = false,
  disabled = false,
  label = 'Enable dark mode',
  description = '',
  flip = false,
  cardType = 'basic',
  layout = 'horizontal',
  integrationStyle = 'card',
}) {
  const [checked, setChecked] = useState(initialChecked);
  useEffect(() => { setChecked(initialChecked); }, [initialChecked]);
  const handleChange = (e) => setChecked(e.target.checked);

  switch (activeComponent) {
    case 'Switch':
      return (
        <div style={{ padding: 24 }}>
          <Switch checked={checked} disabled={disabled} onChange={handleChange} />
        </div>
      );

    case 'SwitchLabel':
      return (
        <div style={{ maxWidth: 360, padding: 24 }}>
          <SwitchLabel
            checked={checked}
            disabled={disabled}
            label={label}
            description={description || undefined}
            flip={flip}
            onChange={handleChange}
          />
        </div>
      );

    case 'SwitchCard':
      return (
        <div style={{ maxWidth: 440, padding: 24 }}>
          <SwitchCard
            type={cardType}
            checked={checked}
            disabled={disabled}
            label={label}
            description={description || undefined}
            leftIcon={cardType === 'left-icon' ? <CircleInfo /> : undefined}
            avatarProps={cardType === 'avatar' ? { name: 'James Brown' } : undefined}
            providerAsset={cardType === 'card-provider' ? <MastercardLogo /> : undefined}
            brandAsset={cardType === 'brand' ? <TripAdvisorLogo /> : undefined}
            companyAsset={cardType === 'company' ? <CatalystLogo /> : undefined}
            onChange={handleChange}
          />
        </div>
      );

    case 'SwitchIntegration':
    default:
      return (
        <div style={{ maxWidth: 440, padding: 24 }}>
          <SwitchIntegration
            type={layout}
            style={integrationStyle}
            title={label}
            description={description || undefined}
            checked={checked}
            disabled={disabled}
            brandAsset={<TripAdvisorLogo />}
            showBrand
            linkLabel="Manage"
            onChange={handleChange}
          />
        </div>
      );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: `
**Switch family** — four related components for boolean toggle UI.

| Component | Figma node | Variants | Purpose |
|---|---|---|---|
| \`Switch\` | ↳switch 2113:25063 | 4 states × Active | Atomic toggle control |
| \`SwitchLabel\` | ↳switch-label 2278:71 | Active × Description × Flip | Toggle + label row |
| \`SwitchCard\` | ↳switch-card 2278:136 | 6 types × 4 states | Selectable card |
| \`SwitchIntegration\` | ↳switch-integration 2278:30 | 2 types × 2 styles | App/service row |

**Token architecture:** 3-layer L1 → L2 → L3. All components reference \`--switch-*\` or \`--switch-card-*\` L3 vars only. No \`:root\` blocks.

**DS decisions (resolved 2026-08-03–04):**
- \`SwitchCard\` root is \`<label htmlFor>\` — full card click area toggles switch. No double-toggle guard needed (HTML spec §4.12.4.3 verified in browser).
- \`SwitchIntegration\` root is \`<div>\`, not \`<label>\` — link button must not trigger the Switch.
- Switch override strategy: \`--switch-track-off\` and \`--switch-knob-bg\` redefined at \`.switch-card\` and \`.switch-integration\` scope to supply card-context track/thumb colors without modifying the atomic Switch.
- No \`--switch-integration/*\` token namespace — SwitchIntegration reuses \`--switch-card-*\` per Figma DS.
- Default assets: Mastercard · TripAdvisor · Catalyst (asset-owned colors — do NOT recolor).

Figma source: [Design System Scalable V.2.1.0 → ❖ Switch](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi?node-id=2113-25063)
        `,
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. Playground
// ─────────────────────────────────────────────────────────────────────────────

export const Playground = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: `
Interactive sandbox for the Switch family. Use the **Component** control to switch between all four family members.

Controls are grouped by relevance:
- **Family** — select which component to preview
- **State** — \`checked\` and \`disabled\` apply to all components
- **Content** — \`label\` (title) and \`description\` apply to SwitchLabel · SwitchCard · SwitchIntegration
- **SwitchLabel** — \`flip\` places the switch to the RIGHT of the label (🔄 Switch=On)
- **SwitchCard** — \`cardType\` selects the left-slot asset
- **SwitchIntegration** — \`layout\` (horizontal/vertical) and \`style\` (card/list)
        `,
      },
    },
  },
  args: {
    activeComponent: 'SwitchCard',
    checked:         false,
    disabled:        false,
    label:           'Enable dark mode',
    description:     'Apply dark theme across the interface.',
    flip:            false,
    cardType:        'basic',
    layout:          'horizontal',
    integrationStyle: 'card',
  },
  argTypes: {
    activeComponent: {
      name: 'Component',
      control: { type: 'select' },
      options: ['Switch', 'SwitchLabel', 'SwitchCard', 'SwitchIntegration'],
      description: 'Which Switch family member to preview.',
      table: { category: 'Family' },
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state (all components).',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled — prevents interaction (all components).',
      table: { category: 'State' },
    },
    label: {
      control: 'text',
      description: 'Primary label / title text. Used by SwitchLabel, SwitchCard (label), and SwitchIntegration (title).',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Body text below the label row. Used by SwitchLabel · SwitchCard · SwitchIntegration.',
      table: { category: 'Content' },
    },
    flip: {
      control: 'boolean',
      description: 'SwitchLabel — place switch to the RIGHT of the label (🔄 Switch=On in Figma).',
      table: { category: 'SwitchLabel' },
    },
    cardType: {
      name: 'Card type',
      control: { type: 'select' },
      options: ['basic', 'left-icon', 'avatar', 'card-provider', 'brand', 'company'],
      description: 'SwitchCard left-slot type. Mastercard / TripAdvisor / Catalyst default when no custom asset is provided.',
      table: { category: 'SwitchCard' },
    },
    layout: {
      name: 'Integration layout',
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
      description: 'SwitchIntegration type axis — row (horizontal) vs column (vertical) layout.',
      table: { category: 'SwitchIntegration' },
    },
    integrationStyle: {
      name: 'Integration style',
      control: { type: 'inline-radio' },
      options: ['card', 'list'],
      description: 'SwitchIntegration style axis — card chrome (bg · border · shadow · radius) vs bare row.',
      table: { category: 'SwitchIntegration' },
    },
  },
  render: (args) => (
    <SwitchFamilyPlayground
      activeComponent={args.activeComponent}
      checked={args.checked}
      disabled={args.disabled}
      label={args.label}
      description={args.description}
      flip={args.flip}
      cardType={args.cardType}
      layout={args.layout}
      integrationStyle={args.integrationStyle}
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Overview
// ─────────────────────────────────────────────────────────────────────────────

export const Overview = {
  name: 'Overview',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
All four Switch family components at a glance. All instances are interactive — click any switch to toggle it.

| Component | Figma node | Variants |
|---|---|---|
| Switch | ↳switch 2113:25063 | 4 states × Active = 8 |
| SwitchLabel | ↳switch-label 2278:71 | Active × Description × Flip = 8 |
| SwitchCard | ↳switch-card 2278:136 | 6 types × 4 states = 24 |
| SwitchIntegration | ↳switch-integration 2278:30 | 2 types × 2 styles = 4 |
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 520, padding: '8px 0' }}>

      {/* ── Switch ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SLabel>Switch</SLabel>
        <Divider />
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Off',           node: <Switch checked={false} onChange={() => {}} /> },
            { label: 'On',            node: <Switch checked={true}  onChange={() => {}} /> },
            { label: 'Disabled Off',  node: <Switch checked={false} disabled onChange={() => {}} /> },
            { label: 'Disabled On',   node: <Switch checked={true}  disabled onChange={() => {}} /> },
          ].map(({ label, node }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {node}
              <span style={{ ...LABEL_STYLE, fontSize: 9, textTransform: 'none', color: '#aaa' }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SwitchLabel ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SLabel>SwitchLabel</SLabel>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ControlledSwitchLabel label="Push notifications" />
          <ControlledSwitchLabel
            label="Email digest"
            description="Receive a weekly summary of your activity."
          />
          <ControlledSwitchLabel label="Switch right (flip)" flip />
          <ControlledSwitchLabel
            label="Organization-managed"
            description="Contact your admin to change this."
            disabled
          />
        </div>
      </section>

      {/* ── SwitchCard ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SLabel>SwitchCard</SLabel>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ControlledSwitchCard
            type="basic"
            label="Dark mode"
            description="Apply dark theme across the interface."
            badge="NEW"
          />
          <ControlledSwitchCard
            type="left-icon"
            leftIcon={<CircleInfo />}
            label="Analytics"
            sublabel="View usage data"
          />
          <ControlledSwitchCard
            type="avatar"
            avatarProps={{ name: 'James Brown' }}
            label="James Brown"
            sublabel="james@example.com"
          />
          <ControlledSwitchCard
            type="card-provider"
            providerAsset={<MastercardLogo />}
            label="Mastercard"
            sublabel="•••• 4242"
          />
          <ControlledSwitchCard
            type="brand"
            brandAsset={<TripAdvisorLogo />}
            label="TripAdvisor"
            sublabel="Travel reviews"
          />
          <ControlledSwitchCard
            type="company"
            companyAsset={<CatalystLogo />}
            label="Catalyst"
            sublabel="catalyst.io"
          />
        </div>
      </section>

      {/* ── SwitchIntegration ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SLabel>SwitchIntegration</SLabel>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ControlledSwitchIntegration
            type="horizontal"
            style="card"
            title="TripAdvisor"
            description="Sync your travel reviews."
            brandAsset={<TripAdvisorLogo />}
            linkLabel="Manage"
          />
          <ControlledSwitchIntegration
            type="horizontal"
            style="list"
            title="TripAdvisor"
            description="Sync your travel reviews."
            brandAsset={<TripAdvisorLogo />}
            linkLabel="Manage"
          />
        </div>
      </section>

    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. CoreSwitch
// ─────────────────────────────────────────────────────────────────────────────

export const CoreSwitch = {
  name: 'Core Switch',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
Core Switch states. Instances render at the DS-spec 32×20px fixed size.

**Hover** and **Focus** are simulated via story-only wrapper classes and injected CSS.
In production, \`:hover\` and \`:focus-visible\` in \`Switch.css\` handle these automatically.

**State details (confirmed vs Figma DS v2.1.0):**
- **Default Off** — Track: off-gray (\`--switch-track-off\`); Thumb: white; shadow ✓; Dot ✓
- **Default On**  — Track: brand-purple (\`--switch-track-on\`); Thumb: white; shadow ✓; Dot ✓
- **Hover Off**   — Track: hover-gray (\`--switch-track-hover\`); Thumb: white; shadow ✓
- **Hover On**    — Track stays brand-purple (no change per Figma)
- **Focus Off**   — Track: focus ring via \`--shadow-focus-ring-primary\` (keyboard only)
- **Disabled Off** — Track: white (\`--switch-knob-bg\`); Thumb: off-gray (\`--switch-track-off\`); 1px stroke; no shadow; Dot absent
- **Disabled On**  — Same inversion; thumb translates to On position
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: '8px 0', alignItems: 'flex-end' }}>
      <style>{STORY_CSS}</style>

      {[
        {
          label: 'Default Off',
          node: <Switch checked={false} onChange={() => {}} />,
        },
        {
          label: 'Default On',
          node: <Switch checked={true} onChange={() => {}} />,
        },
        {
          label: 'Hover Off',
          node: (
            <div className="switch-story-hover">
              <Switch checked={false} onChange={() => {}} />
            </div>
          ),
        },
        {
          label: 'Hover On',
          node: <Switch checked={true} onChange={() => {}} />,
          note: '(track unchanged)',
        },
        {
          label: 'Focused Off',
          node: (
            <div className="switch-story-focus">
              <Switch checked={false} onChange={() => {}} />
            </div>
          ),
        },
        {
          label: 'Disabled Off',
          node: <Switch checked={false} disabled onChange={() => {}} />,
        },
        {
          label: 'Disabled On',
          node: <Switch checked={true} disabled onChange={() => {}} />,
        },
      ].map(({ label, node, note }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          {node}
          <span
            style={{
              ...LABEL_STYLE,
              fontSize: 9,
              textTransform: 'none',
              color: '#aaa',
              textAlign: 'center',
              maxWidth: 72,
            }}
          >
            {label}
            {note && <span style={{ display: 'block', color: '#ccc', fontStyle: 'italic' }}>{note}</span>}
          </span>
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. SwitchLabelVariants
// ─────────────────────────────────────────────────────────────────────────────

export const SwitchLabelVariants = {
  name: 'Switch Label',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
All \`SwitchLabel\` variants. Instances are interactive.

**Figma:** ↳switch-label node 2278:71 — 8 variants (🟢 Active × 📝 Description × 🔄 Switch)

- **Label only** — description=Off, flip=false (switch LEFT, default)
- **Label + description** — description=On axis
- **Switch left** — explicit flip=false for contrast
- **Switch right / flip** — flip=true (🔄 Switch=On in Figma)
- **Checked** — switch On (🟢 Active=On)
- **Disabled** — disabled forwarded to nested Switch; cursor: not-allowed on root label

⚠️ **DS token note:** SwitchLabel text layers reuse \`--switch-card-text-label\` and
\`--switch-card-text-description\` tokens per Figma binding. No dedicated
\`--switch-label/*\` namespace exists in the DS. This is a confirmed DS naming decision.
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 380, padding: '8px 0' }}>
      {[
        {
          label: 'Label only',
          node: <ControlledSwitchLabel label="Push notifications" />,
        },
        {
          label: 'Label + description',
          node: (
            <ControlledSwitchLabel
              label="Email digest"
              description="Receive a weekly summary of your activity."
            />
          ),
        },
        {
          label: 'Switch left (default)',
          node: <ControlledSwitchLabel label="Switch left" flip={false} />,
        },
        {
          label: 'Switch right (flip)',
          node: <ControlledSwitchLabel label="Switch right" flip={true} />,
        },
        {
          label: 'Checked',
          node: <ControlledSwitchLabel label="Notifications enabled" checked />,
        },
        {
          label: 'Disabled',
          node: (
            <ControlledSwitchLabel
              label="Organization-managed"
              description="Contact your admin to change this setting."
              disabled
            />
          ),
        },
      ].map(({ label, node }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SLabel>{label}</SLabel>
          {node}
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. SwitchCardTypes
// ─────────────────────────────────────────────────────────────────────────────

export const SwitchCardTypes = {
  name: 'SwitchCard Types',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
All 6 SwitchCard left-slot types. Instances are interactive.

**Figma:** ↳switch-card node 2278:136 — 24 variants (6 types × 4 states)

| Type | Left slot | Asset |
|---|---|---|
| \`basic\` | None — text only | — |
| \`left-icon\` | 40×40px KeyIcon (lighter/purple/size=m) | KeyIcon.jsx wrapping CircleInfo |
| \`avatar\` | 40×40px Avatar (avatarProps spread) | Avatar.jsx |
| \`card-provider\` | 32×24px dark bg container | Mastercard.jsx (Assets V.2.0.0) |
| \`brand\` | 40×40px no-bg pill | TripAdvisor.jsx (Assets V.2.0.0) |
| \`company\` | 40×40px circular container | Catalyst.jsx (Assets V.2.0.0) |

**Asset policy:** Mastercard, TripAdvisor, Catalyst colors are asset-owned by DS decision. Do NOT recolor or substitute.
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 440, padding: '8px 0' }}>
      {[
        {
          typeLabel: 'basic',
          props: {
            type: 'basic',
            label: 'Dark mode',
            description: 'Apply dark theme across the interface.',
            badge: 'NEW',
          },
        },
        {
          typeLabel: 'left-icon',
          props: {
            type: 'left-icon',
            leftIcon: <CircleInfo />,
            label: 'Analytics',
            sublabel: 'KeyIcon lighter/purple/m',
            description: 'View usage data and reports.',
          },
        },
        {
          typeLabel: 'avatar',
          props: {
            type: 'avatar',
            avatarProps: { name: 'James Brown' },
            label: 'James Brown',
            sublabel: 'james@example.com',
          },
        },
        {
          typeLabel: 'card-provider',
          props: {
            type: 'card-provider',
            providerAsset: <MastercardLogo />,
            label: 'Mastercard',
            sublabel: '•••• 4242',
            description: '32×24px asset · bg #252525 asset-owned.',
          },
        },
        {
          typeLabel: 'brand',
          props: {
            type: 'brand',
            brandAsset: <TripAdvisorLogo />,
            label: 'TripAdvisor',
            sublabel: 'Travel reviews',
          },
        },
        {
          typeLabel: 'company',
          props: {
            type: 'company',
            companyAsset: <CatalystLogo />,
            label: 'Catalyst',
            sublabel: 'catalyst.io',
          },
        },
      ].map(({ typeLabel, props }) => (
        <div key={typeLabel} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SLabel>{typeLabel}</SLabel>
          <ControlledSwitchCard {...props} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. SwitchCardStates
// ─────────────────────────────────────────────────────────────────────────────

export const SwitchCardStates = {
  name: 'SwitchCard States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
All 4 SwitchCard states using the \`basic\` type.

**Hover** is simulated via story-only CSS class (\`.switch-card--story-hover\`).
In production, \`:hover\` in \`SwitchCard.css\` handles this automatically.

**Token chain per state:**
| State | bg | border | switch track |
|---|---|---|---|
| Default | \`--switch-card-bg\` (surface/white) | \`--switch-card-border\` (stroke/soft) | \`--switch-card-toggle-bg\` |
| Hover | \`--switch-card-bg-hover\` (bg/weak-50) | default | \`--switch-track-hover\` |
| Checked | \`--switch-card-bg-active\` (brand/primary/lighter) | \`--switch-card-border-active\` (brand/primary/base) | \`--switch-track-on\` |
| Disabled | default bg/border | default | \`--switch-track-off\` (inverted) |
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 440, padding: '8px 0' }}>
      <style>{STORY_CSS}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <SLabel>Default</SLabel>
        <SwitchCard
          type="basic"
          label="Dark mode"
          description="Apply dark theme across the interface."
          badge="NEW"
          checked={false}
          onChange={() => {}}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <SLabel>Hover (simulated — verify in browser with real :hover)</SLabel>
        <SwitchCard
          type="basic"
          label="Dark mode"
          description="Apply dark theme across the interface."
          checked={false}
          className="switch-card--story-hover"
          onChange={() => {}}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <SLabel>Checked / Active</SLabel>
        <SwitchCard
          type="basic"
          label="Dark mode"
          description="Apply dark theme across the interface."
          checked={true}
          onChange={() => {}}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <SLabel>Disabled</SLabel>
        <SwitchCard
          type="basic"
          label="Dark mode"
          description="Apply dark theme across the interface."
          disabled
          onChange={() => {}}
        />
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. SwitchIntegrationVariants
// ─────────────────────────────────────────────────────────────────────────────

export const SwitchIntegrationVariants = {
  name: 'SwitchIntegration Variants',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
All 4 Figma-confirmed SwitchIntegration variants. Instances are interactive.

**Figma:** ↳switch-integration node 2278:30

| Figma node | Type | Style | Description |
|---|---|---|---|
| 2278:31 | horizontal | card | Row layout · card chrome · Switch in-flow at right |
| 2278:41 | horizontal | list | Row layout · no chrome · Switch in-flow at right |
| 2278:51 | vertical | card | Column layout · card chrome · Switch absolute top:19px right:19px |
| 2278:61 | vertical | list | Column layout · no chrome · Switch absolute top:12px right:12px |

**Root is \`<div>\`, not \`<label>\`** — link button must not trigger the Switch. Switch gets \`aria-labelledby\` pointing to the title span.

**Brand logo sizing (CSS-controlled per style):**
- Card: 24px logo content inside 40px pill (logo + 2×8px padding)
- List: 32px logo content inside 48px pill (logo + 2×8px padding)

**Absolute Switch position (Vertical only):**
- Card: top/right = 19px = border(1px) + padding(16px) + 2px visual inset (Figma node 2278:51)
- List: top/right = 12px = direct margin from container edge — no padding/border (Figma node 2278:61)
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '8px 0' }}>
      {[
        { type: 'horizontal', style: 'card', label: 'Horizontal + Card',  maxWidth: 440 },
        { type: 'horizontal', style: 'list', label: 'Horizontal + List',  maxWidth: 440 },
        { type: 'vertical',   style: 'card', label: 'Vertical + Card',    maxWidth: 280 },
        { type: 'vertical',   style: 'list', label: 'Vertical + List',    maxWidth: 280 },
      ].map(({ type, style, label, maxWidth }) => (
        <div key={`${type}-${style}`} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SLabel>{label}</SLabel>
          <div style={{ maxWidth }}>
            <ControlledSwitchIntegration
              type={type}
              style={style}
              title="TripAdvisor"
              description="Sync and manage your travel reviews."
              brandAsset={<TripAdvisorLogo />}
              badge="NEW"
              linkLabel="Manage"
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. DisabledExamples
// ─────────────────────────────────────────────────────────────────────────────

export const DisabledExamples = {
  name: 'Disabled Examples',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
Disabled state across all four Switch family components.

**Switch disabled:** Track fills white (\`--switch-knob-bg\`); thumb fills off-gray (\`--switch-track-off\`); 1px stroke; no drop shadow; Dot layer absent (omitted by JSX). Verified vs Figma DS v2.1.0.

**SwitchLabel disabled:** \`cursor: not-allowed\` on root label; Switch disabled internally.

**SwitchCard disabled:** \`cursor: not-allowed\`; bg/border stays default surface; label text muted to \`--switch-card-text-description\`; nested Switch disabled.

**SwitchIntegration disabled:** \`cursor: not-allowed\` on root div; link button HTML \`disabled\` attribute; nested Switch disabled.
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 440, padding: '8px 0' }}>

      {/* Switch */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel>Switch</SLabel>
        <Divider />
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Switch checked={false} disabled onChange={() => {}} />
            <span style={{ ...LABEL_STYLE, fontSize: 9, textTransform: 'none', color: '#aaa' }}>Disabled Off</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Switch checked={true} disabled onChange={() => {}} />
            <span style={{ ...LABEL_STYLE, fontSize: 9, textTransform: 'none', color: '#aaa' }}>Disabled On</span>
          </div>
        </div>
      </section>

      {/* SwitchLabel */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel>SwitchLabel</SLabel>
        <Divider />
        <SwitchLabel
          label="Organization-managed"
          description="Contact your admin to change this setting."
          checked={false}
          disabled
          onChange={() => {}}
        />
      </section>

      {/* SwitchCard — all 6 types */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel>SwitchCard — all 6 types</SLabel>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SwitchCard type="basic"         label="Dark mode"     sublabel="Disabled" disabled onChange={() => {}} />
          <SwitchCard type="left-icon"     label="Analytics"     sublabel="Disabled" disabled leftIcon={<CircleInfo />} onChange={() => {}} />
          <SwitchCard type="avatar"        label="James Brown"   sublabel="Disabled" disabled avatarProps={{ name: 'James Brown' }} onChange={() => {}} />
          <SwitchCard type="card-provider" label="Mastercard"    sublabel="Disabled" disabled providerAsset={<MastercardLogo />} onChange={() => {}} />
          <SwitchCard type="brand"         label="TripAdvisor"   sublabel="Disabled" disabled brandAsset={<TripAdvisorLogo />} onChange={() => {}} />
          <SwitchCard type="company"       label="Catalyst"      sublabel="Disabled" disabled companyAsset={<CatalystLogo />} onChange={() => {}} />
        </div>
      </section>

      {/* SwitchIntegration */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel>SwitchIntegration — horizontal + card</SLabel>
        <Divider />
        <SwitchIntegration
          type="horizontal"
          style="card"
          title="TripAdvisor"
          description="Sync your travel reviews."
          brandAsset={<TripAdvisorLogo />}
          linkLabel="Manage"
          checked={false}
          disabled
          onChange={() => {}}
        />
      </section>

    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. DarkMode
// ─────────────────────────────────────────────────────────────────────────────

export const DarkMode = {
  name: 'Dark Mode',
  // Force the withTheme decorator (preview.js) to apply data-theme="dark" for
  // this story. Without this, context.globals.theme defaults to "light" and
  // the decorator wraps with data-theme="light", producing a white outer canvas
  // around the story's own dark inner wrapper.
  globals: { theme: 'dark' },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
**Dark Mode QA** — Switch family token resolution under \`data-theme="dark"\`.

All \`--switch-*\` and \`--switch-card-*\` L3 vars resolve through L2 → L1 primitives automatically when \`data-theme="dark"\` is set on a parent element. No component CSS changes are needed.

Use the **Theme** toolbar toggle (☀ / ☾) to switch globally across all stories.

**DS QA notes — report any issues here; do not hardcode fixes in component CSS:**
- \`--switch-track-off\` → \`--color-border-neutral-subtle\` — verify dark value is visually distinct from the white knob.
- \`--switch-card-bg\` → \`--color-surface-white\` — verify dark surface token resolves to a dark surface, not literal white.
- \`--switch-card-bg-active\` → \`--color-brand-primary-lighter\` — verify brand-lighter is visible on dark bg.
- \`--switch-card-border\` → \`--color-border-stroke-soft\` — verify dark border contrast.
- Brand assets (Mastercard · TripAdvisor · Catalyst): colors are asset-owned; they remain unchanged in dark mode by DS decision.
- Disabled text: \`--switch-card-text-description\` → \`--color-text-subtle\` — verify subtle text is readable on dark surface.
        `,
      },
    },
  },
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

      {/* Switch — states */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel dark>Switch — states</SLabel>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {[
            { label: 'Off',          node: <Switch checked={false} onChange={() => {}} /> },
            { label: 'On',           node: <Switch checked={true}  onChange={() => {}} /> },
            { label: 'Hover',        node: <div className="switch-story-hover"><Switch checked={false} onChange={() => {}} /></div> },
            { label: 'Disabled Off', node: <Switch checked={false} disabled onChange={() => {}} /> },
            { label: 'Disabled On',  node: <Switch checked={true}  disabled onChange={() => {}} /> },
          ].map(({ label, node }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              {node}
              <span style={{ ...DARK_LABEL_STYLE, fontSize: 9, textTransform: 'none' }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SwitchLabel */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel dark>SwitchLabel</SLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
          <SwitchLabel
            label="Push notifications"
            description="Receive alerts for new messages."
            checked={false}
            onChange={() => {}}
          />
          <SwitchLabel
            label="Email digest"
            checked={true}
            onChange={() => {}}
          />
          <SwitchLabel
            label="Organization-managed"
            description="Contact your admin to change this."
            checked={false}
            disabled
            onChange={() => {}}
          />
        </div>
      </section>

      {/* SwitchCard — basic states */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel dark>SwitchCard — basic (Off · Checked · Disabled)</SLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 440 }}>
          <SwitchCard
            type="basic"
            label="Dark mode"
            description="Apply dark theme across the interface."
            badge="NEW"
            checked={false}
            onChange={() => {}}
          />
          <SwitchCard
            type="basic"
            label="Compact view"
            description="Reduce spacing in list views."
            checked={true}
            onChange={() => {}}
          />
          <SwitchCard
            type="basic"
            label="Auto-updates"
            description="Managed by your organization."
            disabled
            onChange={() => {}}
          />
        </div>
      </section>

      {/* SwitchCard — brand assets */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel dark>SwitchCard — brand assets</SLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 440 }}>
          <SwitchCard
            type="card-provider"
            providerAsset={<MastercardLogo />}
            label="Mastercard"
            sublabel="•••• 4242"
            checked={false}
            onChange={() => {}}
          />
          <SwitchCard
            type="brand"
            brandAsset={<TripAdvisorLogo />}
            label="TripAdvisor"
            sublabel="Travel reviews"
            checked={false}
            onChange={() => {}}
          />
          <SwitchCard
            type="company"
            companyAsset={<CatalystLogo />}
            label="Catalyst"
            sublabel="catalyst.io"
            checked={true}
            onChange={() => {}}
          />
        </div>
      </section>

      {/* SwitchIntegration */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel dark>SwitchIntegration</SLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 440 }}>
          <SwitchIntegration
            type="horizontal"
            style="card"
            title="TripAdvisor"
            description="Sync your travel reviews."
            brandAsset={<TripAdvisorLogo />}
            linkLabel="Manage"
            checked={false}
            onChange={() => {}}
          />
          <SwitchIntegration
            type="horizontal"
            style="list"
            title="TripAdvisor"
            description="Sync your travel reviews."
            brandAsset={<TripAdvisorLogo />}
            linkLabel="Manage"
            checked={true}
            onChange={() => {}}
          />
          <SwitchIntegration
            type="horizontal"
            style="card"
            title="TripAdvisor"
            description="Organization-managed integration."
            brandAsset={<TripAdvisorLogo />}
            linkLabel="Manage"
            checked={false}
            disabled
            onChange={() => {}}
          />
        </div>
      </section>

    </div>
  ),
};
