import React, { useState } from 'react';
import DigitInput from './DigitInput.jsx';
import FormField  from './FormField.jsx';

export default {
  title: 'Components/Input Text/Digit Input/General',
  component: DigitInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳input-text/digit-input` — OTP / digit code entry. ' +
          'No size axis — fixed cell: 80×64px (confirmed from Figma node 1986:195). ' +
          '5 Figma variants: Default · Hover · Focus · Filled · Disabled. ' +
          '⚠️ Error state is CSS-class based (`.digit-input__cell--error`) — ' +
          'Figma shows 5 variants (no Error variant) but error tokens exist. Verify visually. ' +
          '⚠️ Cell gap (8px) and font-size (24px) assumed — verify at QA. ' +
          'Paste from clipboard supported on first cell. Arrow key navigation between cells. ' +
          'Auto-advance on digit entry.',
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
    // DigitInput-specific (no size axis)
    length:      { control: 'number',  description: 'Number of digit cells', min: 1, max: 8 },
    disabled:    { control: 'boolean' },
    error:       { control: 'boolean' },
  },
};

// ── Playground (stateful) ─────────────────────────────────────────────────────
export const Playground = {
  render: ({ showLabel, showHint, label, hint, required, optional, showHelp, helpText, length, disabled, error }) => {
    const [val, setVal] = useState('');
    return (
      <div>
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
          <DigitInput
            length={length}
            disabled={disabled}
            error={error}
            value={val}
            onChange={setVal}
          />
        </FormField>
        <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginTop: 8 }}>
          value: "{val}"
        </div>
      </div>
    );
  },
  args: {
    showLabel:   true,
    showHint:    true,
    label:       'Verification code',
    hint:        'Enter the 6-digit code sent to your email.',
    required:    false,
    optional:    false,
    showHelp:    false,
    helpText:    'Help?',
    length:      6,
    disabled:    false,
    error:       false,
  },
};

// ── Default — Empty ───────────────────────────────────────────────────────────
export const Default = {
  name: 'Default — Empty',
  render: () => {
    const [val, setVal] = useState('');
    return <DigitInput length={6} value={val} onChange={setVal} />;
  },
};

// ── Partially Filled ──────────────────────────────────────────────────────────
export const PartiallyFilled = {
  name: 'Partially Filled',
  render: () => {
    const [val, setVal] = useState('123');
    return <DigitInput length={6} value={val} onChange={setVal} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'First 3 cells filled. Filled cells use `.digit-input__cell--filled` class.',
      },
    },
  },
};

// ── Fully Filled ──────────────────────────────────────────────────────────────
export const FullyFilled = {
  name: 'Fully Filled',
  render: () => {
    const [val, setVal] = useState('847291');
    return <DigitInput length={6} value={val} onChange={setVal} />;
  },
};

// ── Disabled — Empty ──────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled — Empty',
  render: () => <DigitInput length={6} value="" disabled />,
};

// ── Disabled — Filled ─────────────────────────────────────────────────────────
export const DisabledFilled = {
  name: 'Disabled — Filled',
  render: () => <DigitInput length={6} value="847291" disabled />,
};

// ── Error — Empty ─────────────────────────────────────────────────────────────
export const ErrorEmpty = {
  name: 'Error — Empty',
  render: () => {
    const [val, setVal] = useState('');
    return <DigitInput length={6} value={val} onChange={setVal} error />;
  },
  parameters: {
    docs: {
      description: {
        story:
          '⚠️ QA flag: Error state is CSS-class based (`.digit-input__cell--error`) because ' +
          'Figma has 5 variants (Default/Hover/Focus/Filled/Disabled) but no Error variant. ' +
          'Error tokens exist in the token collection — verify visually that border/shadow match DS intent.',
      },
    },
  },
};

// ── Error — Filled ────────────────────────────────────────────────────────────
export const ErrorFilled = {
  name: 'Error — Filled',
  render: () => {
    const [val, setVal] = useState('000000');
    return <DigitInput length={6} value={val} onChange={setVal} error />;
  },
};

// ── 4-Digit ───────────────────────────────────────────────────────────────────
export const FourDigit = {
  name: '4 Digits',
  render: () => {
    const [val, setVal] = useState('');
    return <DigitInput length={4} value={val} onChange={setVal} />;
  },
  parameters: {
    docs: {
      description: {
        story: '`length` prop controls cell count. Default is 6; shown here as 4.',
      },
    },
  },
};

// ── All States ────────────────────────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { label: 'Default (empty)', value: '',       disabled: false, error: false },
        { label: 'Filled',          value: '847291', disabled: false, error: false },
        { label: 'Disabled',        value: '',       disabled: true,  error: false },
        { label: 'Disabled Filled', value: '847291', disabled: true,  error: false },
        { label: 'Error (empty)',   value: '',       disabled: false, error: true  },
        { label: 'Error (filled)',  value: '000000', disabled: false, error: true  },
      ].map(({ label, value, disabled, error }) => (
        <div key={label}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 8 }}>
            {label}
          </div>
          <DigitInput length={6} value={value} disabled={disabled} error={error} onChange={() => {}} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSED STORIES — LabelKey + DigitInput + HintText
// ─────────────────────────────────────────────────────────────────────────────

export const ComposedDefault = {
  name: 'Composed — Default',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div>
        <FormField label="Verification code" hint="Enter the 6-digit code sent to your email.">
          <DigitInput length={6} value={val} onChange={setVal} />
        </FormField>
      </div>
    );
  },
};

export const ComposedError = {
  name: 'Composed — Error',
  render: () => {
    const [val, setVal] = useState('000000');
    return (
      <div>
        <FormField label="Verification code" error hint="Incorrect code. Please try again.">
          <DigitInput length={6} value={val} onChange={setVal} error />
        </FormField>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '⚠️ Error state is CSS-class based — Figma has no Error variant for Digit Input. ' +
          'HintText correctly switches to error (red). Verify cell error border looks intentional.',
      },
    },
  },
};

export const ComposedDisabled = {
  name: 'Composed — Disabled',
  render: () => (
    <div>
      <FormField label="Verification code" disabled hint="Verification is currently unavailable.">
        <DigitInput length={6} value="" disabled onChange={() => {}} />
      </FormField>
    </div>
  ),
};

export const ComposedAllStates = {
  name: 'Composed — All States',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <FormField label="Default (empty)" hint="Enter the 6-digit code sent to your email.">
          <DigitInput length={6} value={val} onChange={setVal} />
        </FormField>
        <FormField label="Filled" hint="Enter the 6-digit code sent to your email.">
          <DigitInput length={6} value="847291" onChange={() => {}} />
        </FormField>
        <FormField label="Error" error hint="Incorrect code. Please try again.">
          <DigitInput length={6} value="000000" error onChange={() => {}} />
        </FormField>
        <FormField label="Disabled" disabled hint="Verification is currently unavailable.">
          <DigitInput length={6} value="" disabled onChange={() => {}} />
        </FormField>
      </div>
    );
  },
};
