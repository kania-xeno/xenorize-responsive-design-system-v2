import React, { useState } from 'react';
import ButtonGroup from './ButtonGroup.jsx';
import ButtonGroupItem from './ButtonGroupItem.jsx';
import ChevronDownSmall from '../../icons/ChevronDownSmall.jsx';
import ChevronTopSmall from '../../icons/ChevronTopSmall.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Button Group — Overview stories
// Cross-configuration reference + interactive Playground
// Figma source: Design System Scalable V.2.1.0 → ↳button-group (2271:7422)
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Button Group/Overview',
  parameters: {
    docs: {
      description: {
        component: `
**Button Group — Configuration & State Overview**

**AllCombinations** — 3 sizes × 4 states QA reference grid.

**Playground** — interactive sandbox with full prop controls.
        `,
      },
    },
  },
};

const LABEL_STYLE = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 11,
  fontWeight: 600,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 8,
};

const SIZES = ['small', 'x-small', '2x-small'];
const SIZE_LABELS = { 'small': 'Small (36)', 'x-small': 'X-Small (32)', '2x-small': '2X-Small (24)' };

// ── All Combinations ──────────────────────────────────────────────────────────

export const AllCombinations = {
  name: 'All Combinations',
  parameters: {
    docs: {
      description: {
        story: '3 sizes × 4 states. Each group shows Default · Hover (CSS) · Active · Disabled. Use as design QA reference.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {SIZES.map(size => (
        <div key={size}>
          <div style={LABEL_STYLE}>{SIZE_LABELS[size]}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>

            {/* Default row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ ...LABEL_STYLE, fontSize: 10, marginBottom: 4 }}>Default</div>
              <div style={{ display: 'inline-flex', border: '1px solid var(--button-group-border)', borderRadius: size === '2x-small' ? 6 : 8, overflow: 'hidden' }}>
                <ButtonGroupItem label="List"  size={size} state="default" />
                <ButtonGroupItem label="Grid"  size={size} state="default" />
                <ButtonGroupItem label="Table" size={size} state="default" />
              </div>
            </div>

            {/* Active row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ ...LABEL_STYLE, fontSize: 10, marginBottom: 4 }}>Active (Grid selected)</div>
              <div style={{ display: 'inline-flex', border: '1px solid var(--button-group-border)', borderRadius: size === '2x-small' ? 6 : 8, overflow: 'hidden' }}>
                <ButtonGroupItem label="List"  size={size} state="default" />
                <ButtonGroupItem label="Grid"  size={size} state="active"  />
                <ButtonGroupItem label="Table" size={size} state="default" />
              </div>
            </div>

            {/* Disabled row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ ...LABEL_STYLE, fontSize: 10, marginBottom: 4 }}>Disabled (Table disabled)</div>
              <div style={{ display: 'inline-flex', border: '1px solid var(--button-group-border)', borderRadius: size === '2x-small' ? 6 : 8, overflow: 'hidden' }}>
                <ButtonGroupItem label="List"  size={size} state="active"   />
                <ButtonGroupItem label="Grid"  size={size} state="default"  />
                <ButtonGroupItem label="Table" size={size} state="disabled" />
              </div>
            </div>

            {/* With icons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ ...LABEL_STYLE, fontSize: 10, marginBottom: 4 }}>Left icon + active</div>
              <div style={{ display: 'inline-flex', border: '1px solid var(--button-group-border)', borderRadius: size === '2x-small' ? 6 : 8, overflow: 'hidden' }}>
                <ButtonGroupItem label="Asc"  size={size} state="default" leftIcon={<ChevronTopSmall  width={16} height={16} />} />
                <ButtonGroupItem label="Desc" size={size} state="active"  leftIcon={<ChevronDownSmall width={16} height={16} />} />
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* Dark mode reference */}
      <div
        data-theme="dark"
        style={{ background: '#1b1c22', padding: 24, borderRadius: 8 }}
      >
        <div style={{ ...LABEL_STYLE, color: '#666', marginBottom: 16 }}>Dark mode — all sizes</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          {SIZES.map(size => {
            const [val, setVal] = useState('grid');
            return (
              <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ ...LABEL_STYLE, color: '#555', marginBottom: 0, width: 90 }}>{SIZE_LABELS[size]}</span>
                <ButtonGroup
                  items={[
                    { label: 'List',  value: 'list'  },
                    { label: 'Grid',  value: 'grid'  },
                    { label: 'Table', value: 'table' },
                  ]}
                  size={size}
                  value={val}
                  onChange={setVal}
                  aria-label="View mode"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),
};

// ── Playground ────────────────────────────────────────────────────────────────

const PLAYGROUND_ITEMS_BASE = [
  { label: 'List',  value: 'list',  leftIcon: null, rightIcon: null, onlyIcon: false, disabled: false },
  { label: 'Grid',  value: 'grid',  leftIcon: null, rightIcon: null, onlyIcon: false, disabled: false },
  { label: 'Table', value: 'table', leftIcon: null, rightIcon: null, onlyIcon: false, disabled: false },
];

export const Playground = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: `
Interactive sandbox. Controls adjust the full ButtonGroup.

**Controls:**
- **size** — Small · X-Small · 2X-Small
- **showLeftIcon** — adds ChevronDown to each item
- **showRightIcon** — adds ChevronDown to right slot
- **disableLastItem** — disables the last item for disabled-state testing
- **theme** — Light / Dark
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'x-small', '2x-small'],
      description: 'Uniform size applied to all items.',
      table: { defaultValue: { summary: 'small' } },
    },
    quantity: {
      control: { type: 'select' },
      options: [2, 3, 4, 5, 6],
      description: 'Number of items (2–6).',
      table: { defaultValue: { summary: 3 } },
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Add a left icon (ChevronDown) to each item.',
      table: { defaultValue: { summary: false } },
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Add a right icon to each item. Ignored when onlyIcon.',
      table: { defaultValue: { summary: false } },
    },
    onlyIcon: {
      control: 'boolean',
      description: 'Icon-only mode — hides label, requires aria-label per item.',
      table: { defaultValue: { summary: false } },
    },
    disableLastItem: {
      control: 'boolean',
      description: 'Disable the last item to preview disabled state.',
      table: { defaultValue: { summary: false } },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Color mode.',
      table: { defaultValue: { summary: 'light' } },
    },
  },
  args: {
    size: 'small',
    quantity: 3,
    showLeftIcon: false,
    showRightIcon: false,
    onlyIcon: false,
    disableLastItem: false,
    theme: 'light',
  },
  render: ({ size, quantity, showLeftIcon, showRightIcon, onlyIcon, disableLastItem, theme }) => {
    const ALL_ITEMS = [
      { label: 'List',  value: 'list',  ariaLabel: 'List view' },
      { label: 'Grid',  value: 'grid',  ariaLabel: 'Grid view' },
      { label: 'Table', value: 'table', ariaLabel: 'Table view' },
      { label: 'Map',   value: 'map',   ariaLabel: 'Map view' },
      { label: 'Board', value: 'board', ariaLabel: 'Board view' },
      { label: 'Cal',   value: 'cal',   ariaLabel: 'Calendar view' },
    ];

    const [value, setValue] = useState('grid');
    const isDark = theme === 'dark';

    const items = ALL_ITEMS.slice(0, quantity).map((item, i) => ({
      ...item,
      leftIcon:  showLeftIcon  ? <ChevronDownSmall width={16} height={16} /> : null,
      rightIcon: showRightIcon ? <ChevronDownSmall width={16} height={16} /> : null,
      onlyIcon,
      disabled: disableLastItem && i === quantity - 1,
    }));

    return (
      <div
        {...(isDark ? { 'data-theme': 'dark' } : {})}
        style={isDark ? { background: '#1b1c22', padding: 24, borderRadius: 8 } : {}}
      >
        <ButtonGroup
          key={`${size}-${quantity}-${showLeftIcon}-${showRightIcon}-${onlyIcon}-${theme}`}
          items={items}
          size={size}
          value={value}
          onChange={setValue}
          aria-label="View options"
        />
      </div>
    );
  },
};
