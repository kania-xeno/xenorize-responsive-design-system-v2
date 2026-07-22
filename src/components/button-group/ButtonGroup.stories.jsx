import React, { useState } from 'react';
import ButtonGroup from './ButtonGroup.jsx';
import ButtonGroupItem from './ButtonGroupItem.jsx';
import ChevronDownSmall from '../../icons/ChevronDownSmall.jsx';
import ChevronTopSmall from '../../icons/ChevronTopSmall.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Button Group — General stories
// Figma source: Design System Scalable V.2.1.0 → ↳button-group (2271:7422)
// Container: 2 axes (Quantity × Size) | Item: 5 axes (State, Size, OnlyIcon, LeftIcon, RightIcon)
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Button Group/General',
  parameters: {
    docs: {
      description: {
        component: `
**Button Group** — segmented control for mutually exclusive option selection.

Places 2–6 items flush side-by-side behind a shared outer border. Items are independently interactive with Default, Hover, Active, and Disabled states.

**Use for:** view toggles (Grid / List), filter presets (All / Active / Closed), sort direction.

**Do not use for:** actions, navigation, multi-select, or more than 6 options.

**Two-component system:**
- \`ButtonGroup\` — container (border, radius, overflow clip)
- \`ButtonGroupItem\` — individual slot (state, content, 1px all-sides border)

**Dividers** are not separate elements — they emerge from overlapping 1px CENTER borders at \`gap: 0\`.

**Token mapping (status → token namespace):**
- Default + Hover icon: \`icon/sub\` → \`--button-group-item-icon-default\`
- Active icon: \`icon/strong\` → \`--button-group-item-icon-active\`
- Disabled icon: \`icon/dissabled\` ⚠️ (typo is DS-intentional)

**DS Gaps:**
- No Focus state defined in Figma — a minimal \`:focus-visible\` outline is applied as fallback
- Container \`cornerRadius\` not token-bound in Figma (values correct: 8px Small/X-Small, 6px 2X-Small)

Figma: [Design System Scalable V.2.1.0 → ↳button-group](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi?node-id=2271-7422)
        `,
      },
    },
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const VIEW_ITEMS = [
  { label: 'List',  value: 'list' },
  { label: 'Grid',  value: 'grid' },
  { label: 'Table', value: 'table' },
];

const FILTER_ITEMS = [
  { label: 'All',      value: 'all' },
  { label: 'Active',   value: 'active' },
  { label: 'Closed',   value: 'closed' },
  { label: 'Archived', value: 'archived' },
];

const LABEL_STYLE = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 11,
  fontWeight: 600,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 8,
};

// Interactive wrapper for demos
function Demo({ items, size = 'small', defaultValue, label }) {
  const [value, setValue] = useState(defaultValue ?? items[0]?.value);
  return (
    <div>
      {label && <div style={LABEL_STYLE}>{label}</div>}
      <ButtonGroup items={items} size={size} value={value} onChange={setValue} aria-label={label || 'Options'} />
    </div>
  );
}

// ── 1. States ─────────────────────────────────────────────────────────────────

export const StateDefault = {
  name: 'State — Default',
  parameters: {
    docs: { description: { story: 'All items in Default state. No item is Active. For reference only — a real ButtonGroup should always have one Active item.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 0, border: '1px solid var(--button-group-border)', borderRadius: 8, overflow: 'hidden', display: 'inline-flex' }}>
        {VIEW_ITEMS.map(item => (
          <ButtonGroupItem key={item.value} label={item.label} size="small" state="default" />
        ))}
      </div>
    </div>
  ),
};

export const StateActive = {
  name: 'State — Active',
  parameters: {
    docs: { description: { story: 'Middle item in Active state. Active label and icon use strong tokens. Background uses surface/neutral/weak — same as Hover but distinguished by text/icon color.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'inline-flex', border: '1px solid var(--button-group-border)', borderRadius: 8, overflow: 'hidden' }}>
      <ButtonGroupItem label="List"  size="small" state="default" />
      <ButtonGroupItem label="Grid"  size="small" state="active"  />
      <ButtonGroupItem label="Table" size="small" state="default" />
    </div>
  ),
};

export const StateDisabled = {
  name: 'State — Disabled',
  parameters: {
    docs: { description: { story: 'One item disabled, others remain interactive. Disabled items use muted text/icon tokens and surface/neutral/weak bg. Use aria-disabled + tabIndex=-1 (built-in via disabled prop).' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'inline-flex', border: '1px solid var(--button-group-border)', borderRadius: 8, overflow: 'hidden' }}>
        <ButtonGroupItem label="All"      size="small" state="active"   />
        <ButtonGroupItem label="Active"   size="small" state="default"  />
        <ButtonGroupItem label="Archived" size="small" state="disabled" />
      </div>
      <div style={{ display: 'inline-flex', border: '1px solid var(--button-group-border)', borderRadius: 8, overflow: 'hidden' }}>
        <ButtonGroupItem label="Day"   size="small" state="disabled" />
        <ButtonGroupItem label="Week"  size="small" state="active"   />
        <ButtonGroupItem label="Month" size="small" state="disabled" />
      </div>
    </div>
  ),
};

export const StateInteractive = {
  name: 'State — Interactive',
  parameters: {
    docs: { description: { story: 'Live interactive group. Click items to toggle the active state. Uses controlled mode (value + onChange).' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Demo items={VIEW_ITEMS} size="small" label="View mode" />
      <Demo items={FILTER_ITEMS} size="small" defaultValue="all" label="Filter" />
    </div>
  ),
};

// ── 2. Sizes ──────────────────────────────────────────────────────────────────

export const SizeSmall = {
  name: 'Size — Small (36)',
  parameters: {
    docs: { description: { story: 'Height 36px. Padding 8/16px, gap 8px, font 14px. Primary placement — page-level controls, card headers, toolbar actions. Corner radius: 8px.' } },
    controls: { disable: true },
  },
  render: () => <Demo items={VIEW_ITEMS} size="small" label="Small (36)" />,
};

export const SizeXSmall = {
  name: 'Size — X-Small (32)',
  parameters: {
    docs: { description: { story: 'Height 32px. Padding 6/14px, gap 6px, font 14px. Secondary placement — sidebars, filter rows, compact UI areas. Corner radius: 8px.' } },
    controls: { disable: true },
  },
  render: () => <Demo items={VIEW_ITEMS} size="x-small" label="X-Small (32)" />,
};

export const Size2XSmall = {
  name: 'Size — 2X-Small (24)',
  parameters: {
    docs: { description: { story: 'Height 24px. Padding 4/12px, gap 4px, font 12px. Dense UI only — data table toolbars, compact panels. Corner radius: 6px.' } },
    controls: { disable: true },
  },
  render: () => <Demo items={VIEW_ITEMS} size="2x-small" label="2X-Small (24)" />,
};

export const AllSizes = {
  name: 'All Sizes',
  parameters: {
    docs: { description: { story: 'All three sizes at a glance. Use one size per group — do not mix sizes within the same group.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Demo items={VIEW_ITEMS} size="small"    label="Small (36)" defaultValue="list" />
      <Demo items={VIEW_ITEMS} size="x-small"  label="X-Small (32)" defaultValue="list" />
      <Demo items={VIEW_ITEMS} size="2x-small" label="2X-Small (24)" defaultValue="list" />
    </div>
  ),
};

// ── 3. Quantities ─────────────────────────────────────────────────────────────

export const QuantityTwo = {
  name: 'Quantity — 2 Items',
  parameters: {
    docs: { description: { story: 'Binary toggle. 2 items is the minimum. Use for On/Off, Grid/List, Asc/Desc.' } },
    controls: { disable: true },
  },
  render: () => (
    <Demo
      items={[{ label: 'Grid', value: 'grid' }, { label: 'List', value: 'list' }]}
      size="small" defaultValue="grid" label="Qty 02 — binary toggle"
    />
  ),
};

export const QuantityThree = {
  name: 'Quantity — 3 Items',
  parameters: {
    docs: { description: { story: 'Three balanced options. Most common use case.' } },
    controls: { disable: true },
  },
  render: () => (
    <Demo items={VIEW_ITEMS} size="small" label="Qty 03" />
  ),
};

export const QuantityFour = {
  name: 'Quantity — 4 Items',
  parameters: {
    docs: { description: { story: '4 items — use short labels. Test for label truncation at target viewport.' } },
    controls: { disable: true },
  },
  render: () => (
    <Demo items={FILTER_ITEMS.slice(0,4)} size="small" label="Qty 04" />
  ),
};

export const QuantityFive = {
  name: 'Quantity — 5 Items',
  parameters: {
    docs: { description: { story: '5 items — keep labels very short (1 word ideal). Verify no wrapping.' } },
    controls: { disable: true },
  },
  render: () => (
    <Demo
      items={[
        { label: 'Day',     value: 'day' },
        { label: 'Week',    value: 'week' },
        { label: 'Month',   value: 'month' },
        { label: 'Quarter', value: 'quarter' },
        { label: 'Year',    value: 'year' },
      ]}
      size="small" label="Qty 05"
    />
  ),
};

export const QuantitySix = {
  name: 'Quantity — 6 Items (max)',
  parameters: {
    docs: { description: { story: '6 items is the maximum. Beyond this, use a dropdown. Labels must be extremely short.' } },
    controls: { disable: true },
  },
  render: () => (
    <Demo
      items={[
        { label: '1D',  value: '1d' },
        { label: '7D',  value: '7d' },
        { label: '30D', value: '30d' },
        { label: '90D', value: '90d' },
        { label: '1Y',  value: '1y' },
        { label: 'All', value: 'all' },
      ]}
      size="small" label="Qty 06 (max)"
    />
  ),
};

// ── 4. Icon variants ──────────────────────────────────────────────────────────

export const LeftIcon = {
  name: 'Icon — Left Icon',
  parameters: {
    docs: { description: { story: 'Left Icon=On. Icon reinforces label meaning. Icon color uses icon/sub (default) → icon/strong (active). Applied at SVG level via CSS currentColor.' } },
    controls: { disable: true },
  },
  render: () => {
    const [value, setValue] = useState('desc');
    const items = [
      { label: 'Ascending',  value: 'asc',  leftIcon: <ChevronTopSmall  width={16} height={16} /> },
      { label: 'Descending', value: 'desc', leftIcon: <ChevronDownSmall width={16} height={16} /> },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <div style={LABEL_STYLE}>Left icon — Small</div>
        <ButtonGroup items={items} size="small" value={value} onChange={setValue} aria-label="Sort direction" />
        <div style={LABEL_STYLE}>Left icon — X-Small</div>
        <ButtonGroup items={items} size="x-small" value={value} onChange={setValue} aria-label="Sort direction" />
      </div>
    );
  },
};

export const RightIcon = {
  name: 'Icon — Right Icon',
  parameters: {
    docs: { description: { story: 'Right Icon=On. Rare use case — typically indicates direction or expansion. Ignored when onlyIcon=true.' } },
    controls: { disable: true },
  },
  render: () => {
    const [value, setValue] = useState('week');
    const items = [
      { label: 'Day',   value: 'day',   rightIcon: <ChevronDownSmall width={16} height={16} /> },
      { label: 'Week',  value: 'week',  rightIcon: <ChevronDownSmall width={16} height={16} /> },
      { label: 'Month', value: 'month', rightIcon: <ChevronDownSmall width={16} height={16} /> },
    ];
    return (
      <ButtonGroup items={items} size="small" value={value} onChange={setValue} aria-label="Time period" />
    );
  },
};

export const OnlyIcon = {
  name: 'Icon — Icon Only',
  parameters: {
    docs: { description: { story: 'Only Icon=On — no visible label. aria-label is required on each item. Use only in space-constrained contexts where icon meaning is unambiguous.' } },
    controls: { disable: true },
  },
  render: () => {
    const [value, setValue] = useState('asc');
    const iconItems = [
      { label: 'Ascending',  value: 'asc',  onlyIcon: true, leftIcon: <ChevronTopSmall  width={16} height={16} />, ariaLabel: 'Sort ascending' },
      { label: 'Descending', value: 'desc', onlyIcon: true, leftIcon: <ChevronDownSmall width={16} height={16} />, ariaLabel: 'Sort descending' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <div style={LABEL_STYLE}>Icon only — Small</div>
        <ButtonGroup items={iconItems} size="small"    value={value} onChange={setValue} aria-label="Sort direction" />
        <div style={LABEL_STYLE}>Icon only — X-Small</div>
        <ButtonGroup items={iconItems} size="x-small"  value={value} onChange={setValue} aria-label="Sort direction" />
        <div style={LABEL_STYLE}>Icon only — 2X-Small</div>
        <ButtonGroup items={iconItems} size="2x-small" value={value} onChange={setValue} aria-label="Sort direction" />
      </div>
    );
  },
};

// ── 5. Dark mode ──────────────────────────────────────────────────────────────

export const DarkMode = {
  name: 'Dark Mode',
  parameters: {
    docs: { description: { story: 'All three sizes in dark mode. Token chain resolves automatically via data-theme="dark".' } },
    controls: { disable: true },
    backgrounds: { default: 'dark' },
  },
  render: () => {
    const [value, setValue] = useState('grid');
    return (
      <div
        data-theme="dark"
        style={{ background: '#1b1c22', padding: 24, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}
      >
        <div style={{ ...LABEL_STYLE, color: '#666' }}>Small (36)</div>
        <ButtonGroup items={VIEW_ITEMS} size="small"    value={value} onChange={setValue} aria-label="View mode" />
        <div style={{ ...LABEL_STYLE, color: '#666' }}>X-Small (32)</div>
        <ButtonGroup items={VIEW_ITEMS} size="x-small"  value={value} onChange={setValue} aria-label="View mode" />
        <div style={{ ...LABEL_STYLE, color: '#666' }}>2X-Small (24)</div>
        <ButtonGroup items={VIEW_ITEMS} size="2x-small" value={value} onChange={setValue} aria-label="View mode" />
      </div>
    );
  },
};
