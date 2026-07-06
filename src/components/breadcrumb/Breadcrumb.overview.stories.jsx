import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import ChevronRightSmall from '../icons/ChevronRightSmall';

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumb — Overview stories
// Figma source: Design System Scalable V.2.1.0
//   ↳items-breadcrumb (2177:41698) + ↳breadcrumbs-group (2177:41749)
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Breadcrumb/Overview',
  parameters: {
    docs: {
      description: {
        component: `
**Breadcrumb Overview** — all Figma variants in a single reference view.

Axes covered:
- **Divider:** Arrow, Slash, Dot
- **Quantity:** 3, 4, 5 items
- **State:** Default (non-last items), Active (last item)
- **Icon:** Text only, Icon + Text, Icon only

See the \`General\` stories for isolated state, divider, and quantity demos.
        `,
      },
    },
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const iconEl = <ChevronRightSmall />;

const makeItems = (count, withIcon = false, iconOnly = false) =>
  Array.from({ length: count }, (_, i) => ({
    label: iconOnly ? '' : ['Home', 'Products', 'Category', 'Sub-category', 'Item'][i] || `Item ${i + 1}`,
    state: i === count - 1 ? 'active' : 'default',
    showText: !iconOnly,
    showIcon: withIcon || iconOnly,
    icon: withIcon || iconOnly ? iconEl : null,
    ariaLabel: iconOnly ? (['Home', 'Products', 'Category', 'Sub-category', 'Item'][i] || `Item ${i + 1}`) : '',
  }));

const LABEL_STYLE = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 11,
  fontWeight: 600,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 8,
};

const SECTION_STYLE = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 12,
  fontWeight: 700,
  color: '#555',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  borderBottom: '1px solid #e5e5e5',
  paddingBottom: 6,
  marginBottom: 16,
  marginTop: 32,
};

function Row({ label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 14 }}>
      <div style={{ ...LABEL_STYLE, marginBottom: 0, width: 120, textAlign: 'right', flexShrink: 0 }}>
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}

// ── All Combinations ──────────────────────────────────────────────────────────

export const AllCombinations = {
  name: 'All Combinations',
  parameters: {
    docs: { description: { story: 'All Figma variant axes: Divider × Quantity × Icon mode. Last item is always Active.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ padding: 8 }}>
      {/* Divider types — 3 items */}
      <div style={SECTION_STYLE}>Divider Types (Qty: 3)</div>
      <Row label="Arrow"><Breadcrumb items={makeItems(3)} divider="arrow" /></Row>
      <Row label="Slash"><Breadcrumb items={makeItems(3)} divider="slash" /></Row>
      <Row label="Dot">  <Breadcrumb items={makeItems(3)} divider="dot"   /></Row>

      {/* Quantity — arrow divider */}
      <div style={SECTION_STYLE}>Quantity (Divider: Arrow)</div>
      <Row label="3 items"><Breadcrumb items={makeItems(3)} divider="arrow" /></Row>
      <Row label="4 items"><Breadcrumb items={makeItems(4)} divider="arrow" /></Row>
      <Row label="5 items"><Breadcrumb items={makeItems(5)} divider="arrow" /></Row>

      {/* Icon modes — 3 items, arrow */}
      <div style={SECTION_STYLE}>Icon Mode (Qty: 3, Divider: Arrow)</div>
      <Row label="Text only">   <Breadcrumb items={makeItems(3, false, false)} divider="arrow" /></Row>
      <Row label="Icon + Text"> <Breadcrumb items={makeItems(3, true,  false)} divider="arrow" /></Row>
      <Row label="Icon only">   <Breadcrumb items={makeItems(3, false, true)}  divider="arrow" /></Row>

      {/* Dark mode reference */}
      <div style={SECTION_STYLE}>Dark Mode Reference</div>
      <div data-theme="dark" style={{ padding: 16, background: '#1b1c22', borderRadius: 8 }}>
        <Row label="Arrow">    <Breadcrumb items={makeItems(3)} divider="arrow" /></Row>
        <Row label="Slash">    <Breadcrumb items={makeItems(3)} divider="slash" /></Row>
        <Row label="Dot">      <Breadcrumb items={makeItems(3)} divider="dot"   /></Row>
        <Row label="Icon + T"> <Breadcrumb items={makeItems(3, true, false)} divider="arrow" /></Row>
      </div>
    </div>
  ),
};

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Interactive controls for all Figma variant axes.' } },
  },
  argTypes: {
    divider: {
      control: { type: 'select' },
      options: ['arrow', 'slash', 'dot'],
      description: 'Divider style between items.',
      defaultValue: 'arrow',
    },
    quantity: {
      control: { type: 'range', min: 3, max: 5, step: 1 },
      description: 'Number of breadcrumb items (V1: 3–5).',
      defaultValue: 3,
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Show icon on all items.',
      defaultValue: false,
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Icon only — hides text labels. Requires showIcon=true.',
      defaultValue: false,
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme mode.',
      defaultValue: 'light',
    },
  },
  args: {
    divider: 'arrow',
    quantity: 3,
    showIcon: false,
    iconOnly: false,
    theme: 'light',
  },
  render: ({ divider, quantity, showIcon, iconOnly, theme }) => {
    const effectiveIconOnly = iconOnly && showIcon;
    const items = makeItems(quantity, showIcon, effectiveIconOnly);

    const wrapper = (
      <Breadcrumb items={items} divider={divider} />
    );

    return theme === 'dark' ? (
      <div data-theme="dark" style={{ padding: 24, background: '#1b1c22', borderRadius: 8 }}>
        {wrapper}
      </div>
    ) : (
      <div style={{ padding: 24 }}>{wrapper}</div>
    );
  },
};
