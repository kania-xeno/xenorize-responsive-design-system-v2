import React, { useState } from 'react';
import CompactSelectForInput from './CompactSelectForInput.jsx';
import SingaporeFlag from '../../assets/flags/Singapore.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// CompactSelectForInput — ↳compact-select-for-input trigger component
// Figma source: Design System Scalable V.2.1.0 → ❖ Select Field → ↳compact-select-for-input
// ComponentSet node: 1971:7724
// 12 variants = 4 states × 3 sizes (no Type axis)
// States: Default · Hover · Open · Disabled  (no Placeholder / Filled / Error)
// Sizes:  Medium (40px) · Small (36px) · X-Small (32px)
//
// ⚠️ CRITICAL USAGE NOTE: This component MUST be embedded inside an InputText
// field. It has no border of its own — the parent InputText provides border,
// background, and state context. Stories show it in isolation for DS inspection
// only; the border/background visible here comes from the parent InputText in
// real usage.
// ─────────────────────────────────────────────────────────────────────────────

const LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: '#5c5c5c',
  marginBottom: 4,
};

// Wrapper that mimics the InputText left-slot visual context for the stories.
// Shows the trigger inside a simple bordered container so the story is meaningful.
function InputFieldWrapper({ children, size = 'medium', disabled = false }) {
  const height = { medium: 40, small: 36, 'x-small': 32 }[size] ?? 40;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'stretch',
        height,
        border: `1px solid ${disabled ? '#d0d0d0' : '#c4c4c4'}`,
        borderRadius: 8,
        overflow: 'hidden',
        background: disabled ? '#f5f5f5' : '#ffffff',
        maxWidth: 320,
      }}
    >
      {children}
      <input
        type="text"
        placeholder="Phone number"
        disabled={disabled}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          padding: '0 12px',
          fontSize: 14,
          background: 'transparent',
          color: disabled ? '#9e9e9e' : '#1a1a1a',
        }}
      />
    </div>
  );
}

export default {
  title: 'Components/Select/Compact Select For Input',
  component: CompactSelectForInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳compact-select-for-input` — Compact select trigger designed for the **left slot of an InputText field**. ' +
          '⚠️ This component has **no border of its own** — it relies on the parent InputText for border and background context. ' +
          'Never use standalone in production. ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '4 states: Default · Hover · Open · Disabled (no Placeholder/Filled/Error states). ' +
          'Anatomy: flag/icon slot + text+chevron sub-frame (inner gap=2px). ' +
          'Token namespace: `compact-select/*` (shared with CompactSelect). ' +
          'Stories show it wrapped in a mock input container for visual clarity.',
      },
    },
  },
  argTypes: {
    size:         { control: 'radio',   options: ['medium', 'small', 'x-small'], description: 'Matches parent InputText height' },
    value:        { control: 'text',    description: 'Currently displayed value or country code' },
    placeholder:  { control: 'text',    description: 'Fallback when no value is set' },
    disabled:     { control: 'boolean', description: 'Disabled state — should match parent InputText disabled' },
    showLeftIcon: { control: 'boolean', description: 'Show the left flag/icon slot' },
  },
};

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <InputFieldWrapper size={args.size} disabled={args.disabled}>
        <CompactSelectForInput
          {...args}
          leftIcon={<SingaporeFlag width={20} height={20} />}
          isOpen={open}
          onClick={() => setOpen((o) => !o)}
        />
      </InputFieldWrapper>
    );
  },
  args: {
    size:         'medium',
    value:        'SGP',
    placeholder:  'SGP',
    disabled:     false,
    showLeftIcon: true,
  },
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  name: 'Default',
  render: () => (
    <InputFieldWrapper size="medium">
      <CompactSelectForInput
        size="medium"
        value="SGP"
        leftIcon={<SingaporeFlag width={20} height={20} />}
        aria-label="Country code"
      />
    </InputFieldWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default state: shown inside a mock InputText container. The select has no border of its own.',
      },
    },
  },
};

// ── Open (controlled) ────────────────────────────────────────────────────────
export const Open = {
  name: 'Open',
  render: () => (
    <InputFieldWrapper size="medium">
      <CompactSelectForInput
        size="medium"
        value="SGP"
        leftIcon={<SingaporeFlag width={20} height={20} />}
        isOpen={true}
        aria-label="Country code"
      />
    </InputFieldWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Open state: background switches to `compact-select/bg/active`. ' +
          '`isOpen={true}` is a controlled prop — frozen open for inspection. ' +
          'The parent InputText manages dropdown panel rendering.',
      },
    },
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  render: () => (
    <InputFieldWrapper size="medium" disabled>
      <CompactSelectForInput
        size="medium"
        value="SGP"
        leftIcon={<SingaporeFlag width={20} height={20} />}
        disabled
        aria-label="Country code"
      />
    </InputFieldWrapper>
  ),
};

// ── Without Left Icon ─────────────────────────────────────────────────────────
export const WithoutLeftIcon = {
  name: 'Without Left Icon',
  render: () => (
    <InputFieldWrapper size="medium">
      <CompactSelectForInput
        size="medium"
        value="SGP"
        showLeftIcon={false}
        aria-label="Country code"
      />
    </InputFieldWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: '`showLeftIcon={false}` — hides the flag/icon slot, leaving only the text + chevron sub-frame.',
      },
    },
  },
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      {(['medium', 'small', 'x-small']).map((size) => (
        <div key={size}>
          <div style={LABEL_STYLE}>size="{size}"</div>
          <InputFieldWrapper size={size}>
            <CompactSelectForInput
              size={size}
              value="SGP"
              leftIcon={<SingaporeFlag width={20} height={20} />}
              aria-label="Country code"
            />
          </InputFieldWrapper>
        </div>
      ))}
    </div>
  ),
};

// ── All States — medium ───────────────────────────────────────────────────────
export const AllStates = {
  name: 'All States — medium',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      {[
        { label: 'Default',  props: {} },
        { label: 'Open',     props: { isOpen: true } },
        { label: 'Disabled', props: { disabled: true } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={LABEL_STYLE}>{label}</div>
          <InputFieldWrapper size="medium" disabled={props.disabled}>
            <CompactSelectForInput
              size="medium"
              value="SGP"
              leftIcon={<SingaporeFlag width={20} height={20} />}
              aria-label={`${label} example`}
              {...props}
            />
          </InputFieldWrapper>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Three states available for this component: Default · Open · Disabled. ' +
          'No Placeholder/Filled/Error states (not in Figma ComponentSet for this trigger type).',
      },
    },
  },
};
