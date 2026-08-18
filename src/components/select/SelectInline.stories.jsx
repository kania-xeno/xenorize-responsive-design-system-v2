import React, { useState } from 'react';
import SelectInline from './SelectInline.jsx';
import Globe from '../../icons/Globe.jsx';
import SingaporeFlag from '../../assets/flags/Singapore.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// SelectInline — ↳inline-select trigger component
// Figma source: Design System Scalable V.2.1.0 → ❖ Select Field → ↳inline-select
// ComponentSet node: 2174:4316
// 8 variants = 2 types × 4 states (no Size axis)
// Types:  💠 Icon (Globe default, outer gap=4px)
//         🌍 Country (Singapore default, outer gap=6px)
// States: Default · Hover · Open · Disabled
//         (No Filled, Error, Placeholder states — not in Figma ComponentSet)
//
// Standalone component — does NOT wrap SelectBasic.
// No border, no background, no padding, no size axis.
// Token namespace: inline-select/* (11 L3 vars).
// Separate --_is-chevron token: muted by default, prominent on hover/open.
// ─────────────────────────────────────────────────────────────────────────────

const LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: '#5c5c5c',
  marginBottom: 4,
};

const SUB_LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: '#8c8c8c',
  marginBottom: 8,
};

export default {
  title: 'Components/Select/Select Inline',
  component: SelectInline,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳inline-select` — Borderless, inline-width trigger for contextual selects embedded in text or toolbars. ' +
          '**Standalone component** — does NOT wrap SelectBasic. ' +
          'No border, no background, no padding, no size axis. ' +
          '2 types: **Icon** (Globe default, outer gap=4px) · **Country** (Singapore flag default, outer gap=6px). ' +
          '4 states: Default · Hover · Open · Disabled (no Filled/Error/Placeholder). ' +
          'Chevron has its own independent token (`--_is-chevron`): muted in Default, prominent in Hover/Open. ' +
          'Inner gap (text ↔ chevron): 2px for all variants (Figma-confirmed). ' +
          'Token namespace: `inline-select/*` (11 L3 vars). ' +
          'Dropdown panel is the parent/consumer\'s responsibility.',
      },
    },
  },
  argTypes: {
    type:        { control: 'radio',   options: ['icon', 'country'], description: 'Type axis: icon (Globe, gap=4px) · country (Singapore flag, gap=6px)' },
    value:       { control: 'text',    description: 'Selected value — displayed as text' },
    placeholder: { control: 'text',    description: 'Fallback text when no value is set' },
    disabled:    { control: 'boolean', description: 'Disabled state' },
  },
};

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <SelectInline
        {...args}
        isOpen={open}
        onClick={() => setOpen((o) => !o)}
      />
    );
  },
  args: {
    type:        'icon',
    value:       '',
    placeholder: 'Select',
    disabled:    false,
  },
};

// ── Icon Type — Default ───────────────────────────────────────────────────────
export const IconDefault = {
  name: 'Icon — Default',
  render: () => (
    <SelectInline
      type="icon"
      placeholder="Select"
      aria-label="Select an option"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Icon type, Default state: Globe icon, outer gap=4px. ' +
          'Chevron color: `color-icon-sub` (muted). ' +
          'Hover the button to see chevron switch to `color-icon-strong`.',
      },
    },
  },
};

// ── Icon Type — Open ──────────────────────────────────────────────────────────
export const IconOpen = {
  name: 'Icon — Open',
  render: () => (
    <SelectInline
      type="icon"
      placeholder="Select"
      isOpen={true}
      aria-label="Select an option"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Open state: ChevronTopSmall replaces ChevronDownSmall. Chevron color: `color-icon-strong`.',
      },
    },
  },
};

// ── Icon Type — With Value ────────────────────────────────────────────────────
export const IconWithValue = {
  name: 'Icon — With Value',
  render: () => (
    <SelectInline
      type="icon"
      value="Bitcoin"
      placeholder="Select"
      aria-label="Selected coin"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Value displayed. No separate "Filled" state in the Figma ComponentSet — text color is the same as Default (`color-text-strong`).',
      },
    },
  },
};

// ── Country Type — Default ────────────────────────────────────────────────────
export const CountryDefault = {
  name: 'Country — Default',
  render: () => (
    <SelectInline
      type="country"
      placeholder="Select"
      aria-label="Select a country"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Country type: Singapore flag default icon, outer gap=6px (Figma-confirmed, vs Icon type\'s 4px).',
      },
    },
  },
};

// ── Country Type — Open ───────────────────────────────────────────────────────
export const CountryOpen = {
  name: 'Country — Open',
  render: () => (
    <SelectInline
      type="country"
      placeholder="Select"
      isOpen={true}
      aria-label="Select a country"
    />
  ),
};

// ── Country Type — With Value ─────────────────────────────────────────────────
export const CountryWithValue = {
  name: 'Country — With Value',
  render: () => (
    <SelectInline
      type="country"
      value="Singapore"
      placeholder="Select"
      aria-label="Selected country"
    />
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div>
        <div style={LABEL_STYLE}>Icon</div>
        <SelectInline type="icon" placeholder="Select" disabled aria-label="Disabled icon" />
      </div>
      <div>
        <div style={LABEL_STYLE}>Country</div>
        <SelectInline type="country" placeholder="Select" disabled aria-label="Disabled country" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Disabled state: all three color tokens (text, icon, chevron) switch to their disabled values. ' +
          '`cursor: not-allowed` + `pointer-events: none` applied on the root button.',
      },
    },
  },
};

// ── All Types ─────────────────────────────────────────────────────────────────
export const AllTypes = {
  name: 'All Types',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <div>
        <div style={LABEL_STYLE}>💠 Icon — outer gap=4px, default icon: Globe</div>
        <SelectInline type="icon" placeholder="Select" aria-label="Icon type" />
      </div>
      <div>
        <div style={LABEL_STYLE}>💠 Icon — with custom leftIcon (Globe override)</div>
        <SelectInline type="icon" leftIcon={<Globe width={20} height={20} />} placeholder="Custom" aria-label="Icon custom" />
      </div>
      <div>
        <div style={LABEL_STYLE}>🌍 Country — outer gap=6px, default icon: Singapore</div>
        <SelectInline type="country" placeholder="Select" aria-label="Country type" />
      </div>
      <div>
        <div style={LABEL_STYLE}>🌍 Country — with custom leftIcon (SingaporeFlag override)</div>
        <SelectInline type="country" leftIcon={<SingaporeFlag width={20} height={20} />} value="Singapore" placeholder="Select" aria-label="Country custom" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Two type variants compared. Outer gap is type-specific: Icon=4px, Country=6px (both Figma-confirmed). ' +
          'Pass `leftIcon` to override the type-default icon with any 20×20 component.',
      },
    },
  },
};

// ── All States — both types ───────────────────────────────────────────────────
export const AllStates = {
  name: 'All States — both types',
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
      {(['icon', 'country']).map((type) => (
        <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...LABEL_STYLE, marginBottom: 8 }}>
            {type === 'icon' ? '💠 Icon' : '🌍 Country'}
          </div>
          {[
            { label: 'Default',  props: {} },
            { label: 'Open',     props: { isOpen: true } },
            { label: 'Disabled', props: { disabled: true } },
          ].map(({ label, props }) => (
            <div key={label}>
              <div style={SUB_LABEL_STYLE}>{label}</div>
              <SelectInline
                type={type}
                placeholder="Select"
                aria-label={`${type} ${label}`}
                {...props}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All 8 Figma variants: 2 types × 4 states (Hover is interactive-only — use Playground to see it). ' +
          'Default: chevron is muted (`color-icon-sub`). Open: chevron is prominent (`color-icon-strong`).',
      },
    },
  },
};

// ── Chevron Token Comparison ──────────────────────────────────────────────────
export const ChevronTokens = {
  name: 'Chevron Token — muted vs prominent',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <div>
        <div style={LABEL_STYLE}>Default — chevron: icon/sub (muted)</div>
        <SelectInline type="icon" placeholder="Select" aria-label="Chevron default" />
      </div>
      <div>
        <div style={LABEL_STYLE}>Open — chevron: icon/strong (prominent)</div>
        <SelectInline type="icon" placeholder="Select" isOpen={true} aria-label="Chevron open" />
      </div>
      <div>
        <div style={LABEL_STYLE}>Disabled — chevron: icon/disabled</div>
        <SelectInline type="icon" placeholder="Select" disabled aria-label="Chevron disabled" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The `--_is-chevron` custom property is independent of `--_is-icon` and `--_is-text`. ' +
          '`inline-select/chevron/default` = `color-icon-sub` (muted). ' +
          '`inline-select/chevron/hover` and `inline-select/chevron/open` = `color-icon-strong` (prominent). ' +
          'This is the most distinctive token pattern in the inline-select namespace.',
      },
    },
  },
};
