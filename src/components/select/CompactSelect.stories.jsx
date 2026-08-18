import React, { useState } from 'react';
import CompactSelect from './CompactSelect.jsx';
import Globe from '../../icons/Globe.jsx';
import SingaporeFlag from '../../assets/flags/Singapore.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// CompactSelect — ↳compact-select trigger component
// Figma source: Design System Scalable V.2.1.0 → ❖ Select Field → ↳compact-select
// ComponentSet node: 2174:4038
// 54 variants = 3 types × 6 states × 3 sizes
// Types:  💠 Icon · 🌍 Country · 📂 Basic
// States: Placeholder · Filled · Hover · Open · Error · Disabled
// Sizes:  Medium (40px) · Small (36px) · X-Small (32px)
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
  title: 'Components/Select/Compact Select',
  component: CompactSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳compact-select` — Compact trigger for inline or space-constrained contexts. ' +
          'Hug-content width — no full-field layout, no LabelKey, no HintText. ' +
          '3 types: **Icon** (swappable left icon) · **Country** (flag left icon) · **Basic** (no left icon). ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '6 states: Placeholder · Filled · Hover · Open · Error · Disabled. ' +
          'Token namespace: `compact-select/*` (shared with CompactSelectForInput). ' +
          'X-Small padding: Icon=6px L · Country=8px L · Basic=10px L (all Figma-confirmed). ' +
          'Dropdown rendering is the parent/consumer\'s responsibility.',
      },
    },
  },
  argTypes: {
    size:        { control: 'radio',   options: ['medium', 'small', 'x-small'], description: 'Trigger height: medium (40px) · small (36px) · x-small (32px)' },
    type:        { control: 'radio',   options: ['icon', 'country', 'basic'],   description: 'Type axis — affects X-Small left padding. Icon=6px · Country=8px · Basic=10px' },
    value:       { control: 'text',    description: 'Selected value — empty = placeholder state' },
    placeholder: { control: 'text',    description: 'Placeholder text when no value selected' },
    disabled:    { control: 'boolean', description: 'Disabled state' },
    error:       { control: 'boolean', description: 'Error state' },
  },
};

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  render: (args) => {
    const [val, setVal] = useState('');
    const leftIcon =
      args.type === 'country' ? <SingaporeFlag width={20} height={20} /> :
      args.type === 'icon'    ? <Globe width={20} height={20} />         :
      undefined;
    return (
      <CompactSelect
        {...args}
        value={val}
        leftIcon={leftIcon}
        onClick={() => setVal(val ? '' : args.placeholder || '48')}
      />
    );
  },
  args: {
    size:        'medium',
    type:        'icon',
    value:       '',
    placeholder: '48',
    disabled:    false,
    error:       false,
  },
};

// ── Icon Type — Default ───────────────────────────────────────────────────────
export const IconDefault = {
  name: 'Icon — Default',
  render: () => (
    <CompactSelect
      size="medium"
      type="icon"
      leftIcon={<Globe width={20} height={20} />}
      placeholder="48"
      aria-label="Select size"
    />
  ),
};

// ── Icon Type — Filled ────────────────────────────────────────────────────────
export const IconFilled = {
  name: 'Icon — Filled',
  render: () => (
    <CompactSelect
      size="medium"
      type="icon"
      leftIcon={<Globe width={20} height={20} />}
      value="48"
      placeholder="48"
      aria-label="Select size"
    />
  ),
};

// ── Country Type — Default ────────────────────────────────────────────────────
export const CountryDefault = {
  name: 'Country — Default',
  render: () => (
    <CompactSelect
      size="medium"
      type="country"
      leftIcon={<SingaporeFlag width={20} height={20} />}
      placeholder="+65"
      aria-label="Select country code"
    />
  ),
};

// ── Country Type — Filled ─────────────────────────────────────────────────────
export const CountryFilled = {
  name: 'Country — Filled',
  render: () => (
    <CompactSelect
      size="medium"
      type="country"
      leftIcon={<SingaporeFlag width={20} height={20} />}
      value="+65"
      placeholder="+65"
      aria-label="Select country code"
    />
  ),
};

// ── Basic Type — Default ──────────────────────────────────────────────────────
export const BasicDefault = {
  name: 'Basic — Default',
  render: () => (
    <CompactSelect
      size="medium"
      type="basic"
      placeholder="Select"
      aria-label="Select an option"
    />
  ),
};

// ── Error ─────────────────────────────────────────────────────────────────────
export const ErrorState = {
  name: 'Error',
  render: () => (
    <CompactSelect
      size="medium"
      type="icon"
      leftIcon={<Globe width={20} height={20} />}
      error
      placeholder="48"
      aria-label="Select size"
    />
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  render: () => (
    <CompactSelect
      size="medium"
      type="icon"
      leftIcon={<Globe width={20} height={20} />}
      disabled
      value="48"
      placeholder="48"
      aria-label="Select size"
    />
  ),
};

// ── All Sizes — Icon type ─────────────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes — Icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      {(['medium', 'small', 'x-small']).map((size) => (
        <div key={size}>
          <div style={LABEL_STYLE}>size="{size}"</div>
          <CompactSelect
            size={size}
            type="icon"
            leftIcon={<Globe width={20} height={20} />}
            value="48"
            aria-label="Select size"
          />
        </div>
      ))}
    </div>
  ),
};

// ── All Types — medium ────────────────────────────────────────────────────────
export const AllTypes = {
  name: 'All Types — medium',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <div>
        <div style={LABEL_STYLE}>💠 Icon (Globe)</div>
        <div style={SUB_LABEL_STYLE}>Medium/Small: L=10 · X-Small: L=6</div>
        <CompactSelect size="medium" type="icon" leftIcon={<Globe width={20} height={20} />} placeholder="48" aria-label="Icon type" />
      </div>
      <div>
        <div style={LABEL_STYLE}>🌍 Country (Singapore flag)</div>
        <div style={SUB_LABEL_STYLE}>Medium/Small: L=10 · X-Small: L=8</div>
        <CompactSelect size="medium" type="country" leftIcon={<SingaporeFlag width={20} height={20} />} placeholder="+65" aria-label="Country type" />
      </div>
      <div>
        <div style={LABEL_STYLE}>📂 Basic (no left icon)</div>
        <div style={SUB_LABEL_STYLE}>Medium/Small: L=12 · X-Small: L=10</div>
        <CompactSelect size="medium" type="basic" placeholder="Select" aria-label="Basic type" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Three type variants. Type only affects X-Small left padding; Medium and Small use type-invariant padding for Icon/Country. ' +
          'Pass `leftIcon` for Icon and Country types — omit for Basic.',
      },
    },
  },
};

// ── All States — Icon type, medium ───────────────────────────────────────────
export const AllStates = {
  name: 'All States — Icon, medium',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      {[
        { label: 'Placeholder',  props: { placeholder: '48' } },
        { label: 'Filled',       props: { value: '48', placeholder: '48' } },
        { label: 'Open',         props: { isOpen: true, placeholder: '48' } },
        { label: 'Error',        props: { error: true, placeholder: '48' } },
        { label: 'Disabled',     props: { disabled: true, value: '48' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={LABEL_STYLE}>{label}</div>
          <CompactSelect
            size="medium"
            type="icon"
            leftIcon={<Globe width={20} height={20} />}
            aria-label={`${label} example`}
            {...props}
          />
        </div>
      ))}
    </div>
  ),
};

// ── X-Small — All Types (padding comparison) ──────────────────────────────────
export const XSmallAllTypes = {
  name: 'X-Small — All Types (padding)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <div>
        <div style={LABEL_STYLE}>X-Small · Icon — L=6px</div>
        <CompactSelect size="x-small" type="icon" leftIcon={<Globe width={20} height={20} />} value="48" aria-label="XS icon" />
      </div>
      <div>
        <div style={LABEL_STYLE}>X-Small · Country — L=8px</div>
        <CompactSelect size="x-small" type="country" leftIcon={<SingaporeFlag width={20} height={20} />} value="+65" aria-label="XS country" />
      </div>
      <div>
        <div style={LABEL_STYLE}>X-Small · Basic — L=10px</div>
        <CompactSelect size="x-small" type="basic" value="USD" aria-label="XS basic" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'X-Small is the only size where Type affects left padding. ' +
          'Icon: 6px · Country: 8px · Basic: 10px (all Figma-confirmed).',
      },
    },
  },
};
