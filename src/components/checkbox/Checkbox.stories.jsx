import React, { useState, useEffect } from 'react';
import Checkbox from './Checkbox.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Checkbox — core stories
// Figma: ↳checkbox  node 2113:34056 — 24 variants (4 states × 2 sizes × Active × Indeterminate)
//
// Navigation: Components/Checkbox/Checkbox
//   Playground  — interactive sandbox with Controls
//   States      — all 8 states at medium + small
//
// Related story files:
//   CheckboxOverview.stories.jsx     → Components/Checkbox/Overview
//   CheckboxLabel.stories.jsx        → Components/Checkbox/Checkbox Label
//   CheckboxCard.stories.jsx         → Components/Checkbox/Checkbox Card
//   CheckboxDarkMode.stories.jsx     → Components/Checkbox/Dark Mode
// ─────────────────────────────────────────────────────────────────────────────

// ── Pseudo-state simulation CSS ────────────────────────────────────────────────
// :hover and :focus-visible cannot be forced via prop.
// Story-only wrapper classes + injected CSS simulate the visual state.
// In production, pseudo-selectors in Checkbox.css handle these automatically.
const STORY_CSS = `
  .checkbox-story-hover .checkbox__bg {
    background-color: var(--checkbox-bg-hover) !important;
  }
  .checkbox-story-focus .checkbox__bg {
    box-shadow: var(--shadow-focus-ring-primary) !important;
    outline: none !important;
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

// Controlled wrapper for Playground story
function CheckboxPlayground({ checked: initialChecked = false, disabled = false, size = 'medium' }) {
  const [checked, setChecked] = useState(initialChecked);
  // Sync when Controls panel changes checked (e.g. switching to "indeterminate")
  useEffect(() => { setChecked(initialChecked); }, [initialChecked]);
  return (
    <Checkbox
      checked={checked}
      disabled={disabled}
      size={size}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Checkbox/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: `
**Checkbox** — atomic checkbox control.

Figma: \`↳checkbox\` node 2113:34056 · Design System Scalable V.2.1.0 → ❖ Checkbox

**States:** Default · Hover · Focused · Checked · Indeterminate · Disabled Off · Disabled Checked · Disabled Indeterminate

**Sizes:** \`medium\` (20×20px outer / 16×16px bg) · \`small\` (16×16px outer / 14×14px bg)

**Token architecture:** 3-layer L1 → L2 → L3. Component CSS references L3 \`--checkbox-*\` vars only. No \`:root\` blocks in component CSS.

**Accessibility:**
- Native \`<input type="checkbox">\` — full keyboard + AT semantics
- Focus ring uses \`:focus-visible\` — keyboard only, not mouse
- Indeterminate set via DOM \`inputRef.current.indeterminate\`; \`aria-checked="mixed"\` on indeterminate

Figma source: [Design System Scalable V.2.1.0 → ❖ Checkbox](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi?node-id=2113-34056)
        `,
      },
    },
  },
  argTypes: {
    checked: {
      control: { type: 'select' },
      options: [false, true, 'indeterminate'],
      description: '`false` = unchecked · `true` = checked · `"indeterminate"` = mixed (`aria-checked="mixed"`, subtract icon).',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state. bg → `--checkbox-bg-disabled`. Removes box shadow.',
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['medium', 'small'],
      description: 'Medium = 20×20px outer / 16×16px bg. Small = 16×16px outer / 14×14px bg.',
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: 'medium',
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
        story: 'Interactive sandbox. Use the Controls panel to toggle checked, disabled, and size. For CheckboxLabel and CheckboxCard playgrounds see their respective stories.',
      },
    },
  },
  render: (args) => (
    <div style={{ padding: 24 }}>
      <style>{STORY_CSS}</style>
      <CheckboxPlayground
        checked={args.checked}
        disabled={args.disabled}
        size={args.size}
      />
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. States — all 8 states at medium + small
// ─────────────────────────────────────────────────────────────────────────────

export const States = {
  name: 'States',
  parameters: {
    docs: {
      description: {
        story: `
All 8 Checkbox states at Medium and Small size.

**Hover** and **Focused** are simulated via story-only wrapper classes and injected CSS.
In production, \`:hover\` and \`:focus-visible\` pseudo-selectors in \`Checkbox.css\` handle these automatically.
        `,
      },
    },
    controls: { disable: true },
  },
  render: () => {
    const states = [
      { label: 'Default Off',      node: <Checkbox checked={false} onChange={() => {}} /> },
      { label: 'Hover Off',        node: <div className="checkbox-story-hover"><Checkbox checked={false} onChange={() => {}} /></div> },
      { label: 'Focused Off',      node: <div className="checkbox-story-focus"><Checkbox checked={false} onChange={() => {}} /></div> },
      { label: 'Checked',          node: <Checkbox checked={true} onChange={() => {}} /> },
      { label: 'Indeterminate',    node: <Checkbox checked="indeterminate" onChange={() => {}} /> },
      { label: 'Disabled Off',     node: <Checkbox checked={false} disabled onChange={() => {}} /> },
      { label: 'Disabled Checked', node: <Checkbox checked={true} disabled onChange={() => {}} /> },
      { label: 'Disabled Indet.',  node: <Checkbox checked="indeterminate" disabled onChange={() => {}} /> },
    ];

    const StateRow = ({ size, label: sizeLabel }) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SLabel>{sizeLabel}</SLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
          {states.map(({ label }) => {
            const node = (() => {
              if (label === 'Hover Off')        return <div className="checkbox-story-hover"><Checkbox size={size} checked={false} onChange={() => {}} /></div>;
              if (label === 'Focused Off')      return <div className="checkbox-story-focus"><Checkbox size={size} checked={false} onChange={() => {}} /></div>;
              if (label === 'Default Off')      return <Checkbox size={size} checked={false} onChange={() => {}} />;
              if (label === 'Checked')          return <Checkbox size={size} checked={true} onChange={() => {}} />;
              if (label === 'Indeterminate')    return <Checkbox size={size} checked="indeterminate" onChange={() => {}} />;
              if (label === 'Disabled Off')     return <Checkbox size={size} checked={false} disabled onChange={() => {}} />;
              if (label === 'Disabled Checked') return <Checkbox size={size} checked={true} disabled onChange={() => {}} />;
              if (label === 'Disabled Indet.')  return <Checkbox size={size} checked="indeterminate" disabled onChange={() => {}} />;
              return null;
            })();
            return (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                {node}
                <span style={{ ...LABEL_STYLE, fontSize: 9, textTransform: 'none', color: '#aaa', textAlign: 'center', maxWidth: 72 }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <style>{STORY_CSS}</style>
        <StateRow size="medium" label="Medium (20 × 20)" />
        <StateRow size="small"  label="Small (16 × 16)" />
      </div>
    );
  },
};
