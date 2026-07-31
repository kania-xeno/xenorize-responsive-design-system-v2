import React, { useState, useEffect } from 'react';
import CheckboxLabel from './CheckboxLabel.jsx';
import Badge from '../badge/Badge.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// CheckboxLabel — Variants
// Navigation: Components/Checkbox/Checkbox Label
//
// Figma: ↳checkbox-label node 2164:10056 — Design System Scalable V.2.1.0
//   Variant axes: Active × Description × Flip × showSublabel × linkButton
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

// Controlled wrapper — each variant manages its own checked state
function CheckboxLabelPlayground({
  checked: initialChecked = false,
  disabled = false,
  size = 'medium',
  label = 'Label',
  sublabel,
  badge,
  description,
  flip = false,
  linkLabel,
}) {
  const [checked, setChecked] = useState(initialChecked);
  return (
    <div style={{ maxWidth: 360 }}>
      <CheckboxLabel
        checked={checked}
        disabled={disabled}
        size={size}
        label={label}
        sublabel={sublabel}
        badge={badge}
        description={description}
        flip={flip}
        linkLabel={linkLabel}
        onLinkClick={() => alert('Link clicked')}
        onChange={(e) => setChecked(e.target.checked)}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Checkbox/Checkbox Label',
  component: CheckboxLabel,
  parameters: {
    docs: {
      description: {
        component: `
**CheckboxLabel** — checkbox + text row wrapper (\`↳checkbox-label\`).

Root is \`<label>\`, so clicking anywhere in the row toggles the checkbox.

**Token bindings:**
- Label → \`--checkbox-label-text-label\`
- Sublabel → \`--checkbox-label-text-sublabel\`
- Description → \`--checkbox-label-text-description\`
- Background: root stays transparent by DS decision (\`--checkbox-label-bg\` emitted but not applied)

**Nested instances:**
- \`↳checkbox\` — keeps its own \`--checkbox-*\` tokens (not re-tokenized from this wrapper)
- \`↳badge\` — consumer passes pre-configured \`<Badge>\` via \`badge\` prop; Badge owns its own tokens
- \`↳buttons-link\` — not yet implemented; \`<button>\` placeholder uses \`--link-button-primary-*\` L3 tokens

**Focused:** No Focused wrapper variant in Figma — the nested Checkbox shows its own focus ring independently.

Figma source: [Design System Scalable V.2.1.0 → ❖ Checkbox](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi?node-id=2164-10056)
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
Interactive sandbox for CheckboxLabel. Use the Controls panel to configure every anatomy slot.

**Conditional slots:** \`showSublabel\`, \`showDescription\`, \`showBadge\`, \`showLinkButton\` — toggle each slot on/off independently. Set the content with the adjacent text controls.

**Badge:** Uses the existing \`Badge\` component (light / blue / small by default). Badge owns its own tokens.

**Link button:** \`↳buttons-link\` is not yet implemented. The placeholder uses \`--link-button-primary-*\` L3 tokens.
        `,
      },
    },
  },
  args: {
    checked:         false,
    disabled:        false,
    label:           'Accept terms and conditions',
    showSublabel:    true,
    sublabel:        "(Sublabel)",
    showDescription: true,
    description:     'By checking this box you agree to our Terms of Service and Privacy Policy.',
    showBadge:       true,
    badgeLabel:      'NEW',
    showLinkButton:  true,
    linkLabel:       'Read terms',
    flip:            false,
  },
  argTypes: {
    checked: {
      control: { type: 'select' },
      options: [false, true, 'indeterminate'],
      description: '`false` = unchecked · `true` = checked · `"indeterminate"` = mixed (subtract icon, `aria-checked="mixed"`).',
    },
    disabled:        { control: 'boolean', description: 'Disabled state.' },
    label:           { control: 'text', description: 'Primary label text (required).' },
    showSublabel:    { control: 'boolean', description: 'Show sublabel in label row.' },
    sublabel:        { control: 'text', description: 'Sublabel text (active when showSublabel=true).' },
    showDescription: { control: 'boolean', description: 'Show description area.' },
    description:     { control: 'text', description: 'Description text (active when showDescription=true).' },
    showBadge:       { control: 'boolean', description: 'Show Badge in label row.' },
    badgeLabel:      { control: 'text', description: 'Badge label (active when showBadge=true).' },
    showLinkButton:  { control: 'boolean', description: 'Show link button in description area.' },
    linkLabel:       { control: 'text', description: 'Link button label (active when showLinkButton=true).' },
    flip:            { control: 'boolean', description: 'Move checkbox to right side (flex-direction: row-reverse).' },
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    // Sync when Controls panel changes the checked arg
    useEffect(() => { setChecked(args.checked); }, [args.checked]);

    return (
      <div style={{ maxWidth: 360 }}>
        <CheckboxLabel
          checked={checked}
          disabled={args.disabled}
          label={args.label}
          sublabel={args.showSublabel ? args.sublabel : undefined}
          description={args.showDescription ? args.description : undefined}
          badge={
            args.showBadge
              ? <Badge badgeStyle="light" color="blue" size="small" label={args.badgeLabel} />
              : undefined
          }
          linkLabel={args.showLinkButton ? args.linkLabel : undefined}
          onLinkClick={() => {}}
          flip={args.flip}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Variants — all CheckboxLabel anatomy combinations
// ─────────────────────────────────────────────────────────────────────────────

export const Variants = {
  name: 'Variants',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
All CheckboxLabel anatomy variants.

**Flip** moves the checkbox to the right side via \`flex-direction: row-reverse\`.

**Badge:** Pass a pre-configured \`<Badge>\` via the \`badge\` prop. Renders after sublabel in the label row.
Badge owns its own tokens — CheckboxLabel does not configure badge tokens.

**Link button:** \`↳buttons-link\` not yet implemented. Placeholder \`<button>\` uses link-button/primary L3 tokens.
\`e.stopPropagation()\` prevents the wrapping \`<label>\` from double-toggling the checkbox.

**Focused:** No Focused wrapper variant in Figma — the nested Checkbox shows its own focus ring.
        `,
      },
    },
  },
  render: () => {
    const variants = [
      {
        label: 'Label only',
        node: <CheckboxLabelPlayground label="Remember me" />,
      },
      {
        label: 'With sublabel',
        node: <CheckboxLabelPlayground label="Marketing emails" sublabel="Weekly digest" />,
      },
      {
        label: 'With description',
        node: (
          <CheckboxLabelPlayground
            label="Accept terms"
            description="By checking this box you agree to our Terms of Service and Privacy Policy."
          />
        ),
      },
      {
        label: 'With link button',
        node: (
          <CheckboxLabelPlayground
            label="Accept terms"
            description="Please review before accepting."
            linkLabel="Read terms"
          />
        ),
      },
      {
        label: 'With badge',
        node: (
          <CheckboxLabelPlayground
            label="New feature"
            sublabel="Beta"
            badge={<Badge badgeStyle="light" color="blue" size="small" label="NEW" />}
          />
        ),
      },
      {
        label: 'With badge (disabled)',
        node: (
          <CheckboxLabelPlayground
            label="New feature"
            sublabel="Beta"
            badge={<Badge disabled color="gray" size="small" label="NEW" />}
            disabled
          />
        ),
      },
      {
        label: 'Flipped',
        node: <CheckboxLabelPlayground label="Show notifications" flip />,
      },
      {
        label: 'Checked',
        node: <CheckboxLabelPlayground label="Enable two-factor auth" checked />,
      },
      {
        label: 'Indeterminate',
        node: <CheckboxLabelPlayground label="Select all items" checked="indeterminate" />,
      },
      {
        label: 'Disabled',
        node: (
          <CheckboxLabelPlayground
            label="Email updates"
            description="Managed by your organization."
            disabled
          />
        ),
      },
      {
        label: 'Disabled Checked',
        node: <CheckboxLabelPlayground label="System required" disabled checked />,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {variants.map(({ label, node }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SLabel>{label}</SLabel>
            <div style={{ maxWidth: 360 }}>{node}</div>
          </div>
        ))}
      </div>
    );
  },
};
