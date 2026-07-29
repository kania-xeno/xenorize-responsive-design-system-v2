import React, { useState } from 'react';
import BasicInput from './BasicInput.jsx';
import FormField  from './FormField.jsx';

export default {
  title: 'Components/Input Text/Basic/General',
  component: BasicInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳input-text/basic` — General-purpose text field. ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '6 states: Default · Hover · Focus · Filled · Disabled · Error. ' +
          'Accepts optional `leadingIcon` and `trailingIcon` slots. ' +
          'Default uses `--shadow-custom-input-default` with transparent border. ' +
          'Filled uses `--shadow-custom-input-default` + visible filled border-color. ' +
          'Hover uses visible border only (no ring). ' +
          'Focus uses border + `--shadow-focus-ring-neutral`. ' +
          'Error rings use `--shadow-hover-ring-error` / `--shadow-focus-ring-error`.',
      },
    },
  },
  argTypes: {
    // Composition toggles — affect Playground only
    showLabel:   { control: 'boolean', description: 'Show LabelKey above the field' },
    showHint:    { control: 'boolean', description: 'Show HintText below the field' },
    label:       { control: 'text',    description: 'LabelKey label text' },
    hint:        { control: 'text',    description: 'HintText message' },
    required:    { control: 'boolean', description: 'Show required asterisk on LabelKey' },
    optional:    { control: 'boolean', description: 'Show optional sublabel on LabelKey' },
    showHelp:    { control: 'boolean', description: 'Show help link on LabelKey' },
    helpText:    { control: 'text',    description: 'Help link text' },
    // Field controls
    size:        { control: 'radio',   options: ['md', 'sm', 'xs'] },
    disabled:    { control: 'boolean' },
    error:       { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  render: ({ showLabel, showHint, label, hint, required, optional, showHelp, helpText, size, disabled, error, placeholder }) => {
    const [val, setVal] = useState('');
    return (
      <div style={{ maxWidth: 320 }}>
        <FormField
          showLabel={showLabel}
          showHint={showHint}
          label={label}
          hint={hint}
          showRequired={required}
          showSublabel={optional}
          showHelp={showHelp}
          helpText={helpText}
          disabled={disabled}
          error={error}
        >
          <BasicInput
            size={size}
            disabled={disabled}
            error={error}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={placeholder}
          />
        </FormField>
      </div>
    );
  },
  args: {
    showLabel:   true,
    showHint:    true,
    label:       'Email address',
    hint:        "We'll never share your email with anyone.",
    required:    false,
    optional:    false,
    showHelp:    false,
    helpText:    'Help?',
    size:        'md',
    disabled:    false,
    error:       false,
    placeholder: 'name@example.com',
  },
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  name: 'Default',
  args: {
    size: 'md',
    placeholder: 'Placeholder',
  },
};

// ── Filled ────────────────────────────────────────────────────────────────────
export const Filled = {
  name: 'Filled',
  args: {
    size: 'md',
    value: 'User input text',
    placeholder: 'Placeholder',
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  args: {
    size: 'md',
    disabled: true,
    placeholder: 'Placeholder',
  },
};

// ── Disabled Filled ───────────────────────────────────────────────────────────
export const DisabledFilled = {
  name: 'Disabled — Filled',
  args: {
    size: 'md',
    disabled: true,
    value: 'User input text',
    placeholder: 'Placeholder',
  },
};

// ── Error ─────────────────────────────────────────────────────────────────────
export const ErrorState = {
  name: 'Error',
  args: {
    size: 'md',
    error: true,
    placeholder: 'Placeholder',
  },
};

// ── Error Filled ──────────────────────────────────────────────────────────────
export const ErrorFilled = {
  name: 'Error — Filled',
  args: {
    size: 'md',
    error: true,
    value: 'Invalid input',
    placeholder: 'Placeholder',
  },
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      {(['md', 'sm', 'xs']).map((size) => (
        <div key={size}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            size="{size}"
          </div>
          <BasicInput size={size} placeholder="Placeholder" />
        </div>
      ))}
    </div>
  ),
};

// ── All States — md ───────────────────────────────────────────────────────────
export const AllStates = {
  name: 'All States — md',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      {[
        { label: 'Default',        props: { placeholder: 'Placeholder' } },
        { label: 'Filled',         props: { value: 'User input text', placeholder: 'Placeholder' } },
        { label: 'Disabled',       props: { disabled: true, placeholder: 'Placeholder' } },
        { label: 'Disabled Filled',props: { disabled: true, value: 'User input text' } },
        { label: 'Error',          props: { error: true, placeholder: 'Placeholder' } },
        { label: 'Error Filled',   props: { error: true, value: 'Invalid input' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            {label}
          </div>
          <BasicInput size="md" {...props} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSED STORIES — LabelKey + Input + HintText
// ─────────────────────────────────────────────────────────────────────────────

// ── Composed — Default ────────────────────────────────────────────────────────
export const ComposedDefault = {
  name: 'Composed — Default',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ maxWidth: 320 }}>
        <FormField
          label="Email address"
          hint="We'll never share your email with anyone."
        >
          <BasicInput
            size="md"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="name@example.com"
            id="basic-composed-default"
            aria-describedby="basic-hint-default"
          />
        </FormField>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Full anatomy: LabelKey (normal) · BasicInput (default) · HintText (default). ' +
          'This is the standard composed form field pattern.',
      },
    },
  },
};

// ── Composed — Required ───────────────────────────────────────────────────────
export const ComposedRequired = {
  name: 'Composed — Required',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ maxWidth: 320 }}>
        <FormField
          label="Email address"
          showRequired
          hint="This field is required."
        >
          <BasicInput
            size="md"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="name@example.com"
          />
        </FormField>
      </div>
    );
  },
};

// ── Composed — Error ──────────────────────────────────────────────────────────
export const ComposedError = {
  name: 'Composed — Error',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <FormField
        label="Email address"
        showRequired
        error
        hint="Please enter a valid email address."
      >
        <BasicInput
          size="md"
          error
          value="not-an-email"
          placeholder="name@example.com"
        />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error state: LabelKey stays normal · input gets error border/ring · HintText switches to error (red).',
      },
    },
  },
};

// ── Composed — Disabled ───────────────────────────────────────────────────────
export const ComposedDisabled = {
  name: 'Composed — Disabled',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <FormField
        label="Email address"
        disabled
        hint="This field is currently disabled."
      >
        <BasicInput
          size="md"
          disabled
          value="locked@example.com"
          placeholder="name@example.com"
        />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state: LabelKey switches to disabled · input muted · HintText switches to disabled.',
      },
    },
  },
};

// ── Composed — Optional + Help ────────────────────────────────────────────────
export const ComposedOptionalHelp = {
  name: 'Composed — Optional + Help link',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ maxWidth: 320 }}>
        <FormField
          label="Company name"
          showSublabel
          sublabel="(Optional)"
          showHelp
          helpText="Why we ask?"
          hint="Enter your full legal company name."
        >
          <BasicInput
            size="md"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Acme Corp."
          />
        </FormField>
      </div>
    );
  },
};

// ── Composed — All States ─────────────────────────────────────────────────────
export const ComposedAllStates = {
  name: 'Composed — All States',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 320 }}>
        <FormField label="Default" hint="Helper text for this field.">
          <BasicInput size="md" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Placeholder" />
        </FormField>

        <FormField label="Filled" hint="Helper text for this field.">
          <BasicInput size="md" value="User input text" placeholder="Placeholder" />
        </FormField>

        <FormField label="Error" showRequired error hint="This field is required.">
          <BasicInput size="md" error value="bad input" placeholder="Placeholder" />
        </FormField>

        <FormField label="Disabled" disabled hint="This field is currently disabled.">
          <BasicInput size="md" disabled placeholder="Placeholder" />
        </FormField>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All four key composed states side-by-side. ' +
          'Note LabelKey and HintText coordinate state automatically via FormField.',
      },
    },
  },
};
