import React, { useState } from 'react';
import PhoneNumberInput from './PhoneNumberInput.jsx';
import FormField        from './FormField.jsx';

export default {
  title: 'Components/Input Text/Phone Number/General',
  component: PhoneNumberInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳input-text/phone-number` — Phone number field with leading PhoneIcon. ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '6 states: Default · Hover · Focus · Filled · Disabled · Error. ' +
          '⚠️ PhoneIcon is a placeholder — final implementation should use a country flag/dropdown component when DS specifies. ' +
          '⚠️ icon/disabled = #D1D1D1 (icon/dissabled — intentional DS typo). ' +
          'Field uses `type="tel"` for mobile keyboard hints.',
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
          <PhoneNumberInput
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
    label:       'Phone number',
    hint:        'Include your country code, e.g. +1.',
    required:    false,
    optional:    false,
    showHelp:    false,
    helpText:    'Help?',
    size:        'md',
    disabled:    false,
    error:       false,
    placeholder: '+1 (555) 000-0000',
  },
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  name: 'Default',
  args: {
    size: 'md',
    placeholder: '+1 (555) 000-0000',
  },
};

// ── Filled ────────────────────────────────────────────────────────────────────
export const Filled = {
  name: 'Filled',
  args: {
    size: 'md',
    value: '+1 (415) 555-0100',
    placeholder: '+1 (555) 000-0000',
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  args: {
    size: 'md',
    disabled: true,
    placeholder: '+1 (555) 000-0000',
  },
};

// ── Error ─────────────────────────────────────────────────────────────────────
export const ErrorState = {
  name: 'Error',
  args: {
    size: 'md',
    error: true,
    value: '123',
    placeholder: '+1 (555) 000-0000',
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
          <PhoneNumberInput size={size} placeholder="+1 (555) 000-0000" />
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
        { label: 'Default',  props: { placeholder: '+1 (555) 000-0000' } },
        { label: 'Filled',   props: { value: '+1 (415) 555-0100' } },
        { label: 'Disabled', props: { disabled: true, placeholder: '+1 (555) 000-0000' } },
        { label: 'Error',    props: { error: true, value: '123' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            {label}
          </div>
          <PhoneNumberInput size="md" {...props} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSED STORIES — LabelKey + PhoneNumberInput + HintText
// ─────────────────────────────────────────────────────────────────────────────

export const ComposedDefault = {
  name: 'Composed — Default',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ maxWidth: 320 }}>
        <FormField label="Phone number" hint="Include your country code, e.g. +1.">
          <PhoneNumberInput size="md" value={val} onChange={(e) => setVal(e.target.value)} placeholder="+1 (555) 000-0000" />
        </FormField>
      </div>
    );
  },
};

export const ComposedError = {
  name: 'Composed — Error',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <FormField label="Phone number" showRequired error hint="Please enter a valid phone number.">
        <PhoneNumberInput size="md" error value="123" placeholder="+1 (555) 000-0000" />
      </FormField>
    </div>
  ),
};

export const ComposedDisabled = {
  name: 'Composed — Disabled',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <FormField label="Phone number" disabled hint="This field is currently disabled.">
        <PhoneNumberInput size="md" disabled placeholder="+1 (555) 000-0000" />
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
        <FormField label="Default" hint="Include your country code.">
          <PhoneNumberInput size="md" value={val} onChange={(e) => setVal(e.target.value)} placeholder="+1 (555) 000-0000" />
        </FormField>
        <FormField label="Filled" hint="Include your country code.">
          <PhoneNumberInput size="md" value="+1 (415) 555-0100" />
        </FormField>
        <FormField label="Error" showRequired error hint="Please enter a valid phone number.">
          <PhoneNumberInput size="md" error value="123" placeholder="+1 (555) 000-0000" />
        </FormField>
        <FormField label="Disabled" disabled hint="This field is currently disabled.">
          <PhoneNumberInput size="md" disabled placeholder="+1 (555) 000-0000" />
        </FormField>
      </div>
    );
  },
};
