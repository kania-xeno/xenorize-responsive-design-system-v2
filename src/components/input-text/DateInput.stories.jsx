import React, { useState } from 'react';
import DateInput from './DateInput.jsx';
import FormField from './FormField.jsx';

export default {
  title: 'Components/Input Text/Date/General',
  component: DateInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳input-text/date` — Date text field with trailing CalendarIcon. ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '6 states: Default · Hover · Focus · Filled · Disabled · Error. ' +
          'Placeholder defaults to `DD/MM/YYYY`. ' +
          '⚠️ CalendarIcon is a placeholder — replace with final DS SVG path. ' +
          '⚠️ icon/disabled = #A3A3A3 (icon/soft) — differs from basic (#D1D1D1). ' +
          'Default uses `--shadow-custom-input-default` with transparent border. ' +
          'Filled uses `--shadow-custom-input-default` + visible filled border-color. ' +
          'Hover uses visible border only (no ring). ' +
          'Focus uses border + `--shadow-focus-ring-neutral`. ' +
          'Error hover/focus use error rings.',
      },
    },
  },
  argTypes: {
    showLabel:   { control: 'boolean', description: 'Show LabelKey above the field' },
    showHint:    { control: 'boolean', description: 'Show HintText below the field' },
    label:       { control: 'text',    description: 'LabelKey label text' },
    hint:        { control: 'text',    description: 'HintText message' },
    required:    { control: 'boolean', description: 'Show required asterisk on LabelKey' },
    optional:    { control: 'boolean', description: 'Show optional sublabel on LabelKey' },
    showHelp:    { control: 'boolean', description: 'Show help link on LabelKey' },
    helpText:    { control: 'text',    description: 'Help link text' },
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
          <DateInput
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
    label:       'Date of birth',
    hint:        'Enter your date of birth as DD/MM/YYYY.',
    required:    false,
    optional:    false,
    showHelp:    false,
    helpText:    'Help?',
    size:        'md',
    disabled:    false,
    error:       false,
    placeholder: 'DD/MM/YYYY',
  },
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  name: 'Default',
  args: {
    size: 'md',
    placeholder: 'DD/MM/YYYY',
  },
};

// ── Filled ────────────────────────────────────────────────────────────────────
export const Filled = {
  name: 'Filled',
  args: {
    size: 'md',
    value: '25/12/2025',
    placeholder: 'DD/MM/YYYY',
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  args: {
    size: 'md',
    disabled: true,
    placeholder: 'DD/MM/YYYY',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon color in disabled state = `#A3A3A3` (icon/soft). Differs from basic which uses `#D1D1D1`.',
      },
    },
  },
};

// ── Error ─────────────────────────────────────────────────────────────────────
export const ErrorState = {
  name: 'Error',
  args: {
    size: 'md',
    error: true,
    value: '99/99/9999',
    placeholder: 'DD/MM/YYYY',
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
          <DateInput size={size} placeholder="DD/MM/YYYY" />
        </div>
      ))}
    </div>
  ),
};

// ── All States ────────────────────────────────────────────────────────────────
export const AllStates = {
  name: 'All States — md',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      {[
        { label: 'Default',  props: { placeholder: 'DD/MM/YYYY' } },
        { label: 'Filled',   props: { value: '25/12/2025' } },
        { label: 'Disabled', props: { disabled: true, placeholder: 'DD/MM/YYYY' } },
        { label: 'Error',    props: { error: true, value: '99/99/9999' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            {label}
          </div>
          <DateInput size="md" {...props} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSED STORIES — LabelKey + DateInput + HintText
// ─────────────────────────────────────────────────────────────────────────────

export const ComposedDefault = {
  name: 'Composed — Default',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ maxWidth: 320 }}>
        <FormField label="Date of birth" hint="Enter your date of birth as DD/MM/YYYY.">
          <DateInput size="md" value={val} onChange={(e) => setVal(e.target.value)} placeholder="DD/MM/YYYY" />
        </FormField>
      </div>
    );
  },
};

export const ComposedError = {
  name: 'Composed — Error',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <FormField label="Date of birth" showRequired error hint="Please enter a valid date (DD/MM/YYYY).">
        <DateInput size="md" error value="99/99/9999" placeholder="DD/MM/YYYY" />
      </FormField>
    </div>
  ),
};

export const ComposedDisabled = {
  name: 'Composed — Disabled',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <FormField label="Date of birth" disabled hint="This field is currently disabled.">
        <DateInput size="md" disabled placeholder="DD/MM/YYYY" />
      </FormField>
    </div>
  ),
};

export const ComposedAllStates = {
  name: 'Composed — All States',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 320 }}>
        <FormField label="Default" hint="Enter your date of birth.">
          <DateInput size="md" value={val} onChange={(e) => setVal(e.target.value)} placeholder="DD/MM/YYYY" />
        </FormField>
        <FormField label="Filled" hint="Enter your date of birth.">
          <DateInput size="md" value="25/12/2025" placeholder="DD/MM/YYYY" />
        </FormField>
        <FormField label="Error" showRequired error hint="Please enter a valid date.">
          <DateInput size="md" error value="99/99/9999" placeholder="DD/MM/YYYY" />
        </FormField>
        <FormField label="Disabled" disabled hint="This field is currently disabled.">
          <DateInput size="md" disabled placeholder="DD/MM/YYYY" />
        </FormField>
      </div>
    );
  },
};
