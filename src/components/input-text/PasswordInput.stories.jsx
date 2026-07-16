import React, { useState } from 'react';
import PasswordInput from './PasswordInput.jsx';
import FormField     from './FormField.jsx';

export default {
  title: 'Components/Input Text/Password/General',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳input-text/password` — Password field with LockIcon (leading) and EyeIcon toggle (trailing). ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '6 states: Default · Hover · Focus · Filled · Disabled · Error. ' +
          '⚠️ Stateless — `showPassword` is controlled externally via `onToggle`. ' +
          '⚠️ LockIcon and EyeIcon are stroke-based VECTORs (`stroke="currentColor"`, `fill="none"`). ' +
          '⚠️ icon/disabled = #D1D1D1 (icon/dissabled — intentional DS typo). ' +
          'Toggle button uses `onMouseDown` preventDefault to prevent input blur on click.',
      },
    },
  },
  argTypes: {
    showLabel:    { control: 'boolean', description: 'Show LabelKey above the field' },
    showHint:     { control: 'boolean', description: 'Show HintText below the field' },
    label:        { control: 'text',    description: 'LabelKey label text' },
    hint:         { control: 'text',    description: 'HintText message' },
    required:     { control: 'boolean', description: 'Show required asterisk on LabelKey' },
    optional:     { control: 'boolean', description: 'Show optional sublabel on LabelKey' },
    showHelp:     { control: 'boolean', description: 'Show help link on LabelKey' },
    helpText:     { control: 'text',    description: 'Help link text' },
    size:         { control: 'radio',   options: ['md', 'sm', 'xs'] },
    disabled:     { control: 'boolean' },
    error:        { control: 'boolean' },
    showPassword: { control: 'boolean', description: 'Reveal/hide password text (use EyeIcon toggle in Playground)' },
    placeholder:  { control: 'text' },
  },
};

// ── Playground (stateful — showPassword managed internally) ───────────────────
export const Playground = {
  render: ({ showLabel, showHint, label, hint, required, optional, showHelp, helpText, size, disabled, error, placeholder }) => {
    const [val,  setVal]  = useState('');
    const [show, setShow] = useState(false);
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
          <PasswordInput
            size={size}
            disabled={disabled}
            error={error}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            showPassword={show}
            onToggle={() => setShow((s) => !s)}
            placeholder={placeholder}
          />
        </FormField>
      </div>
    );
  },
  args: {
    showLabel:   true,
    showHint:    true,
    label:       'Password',
    hint:        'Must be at least 8 characters.',
    required:    false,
    optional:    false,
    showHelp:    false,
    helpText:    'Help?',
    size:        'md',
    disabled:    false,
    error:       false,
    placeholder: 'Enter password',
  },
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  name: 'Default',
  args: {
    size: 'md',
    placeholder: 'Enter password',
    showPassword: false,
  },
};

// ── Filled — Hidden ───────────────────────────────────────────────────────────
export const FilledHidden = {
  name: 'Filled — Password Hidden',
  args: {
    size: 'md',
    value: 'MyS3cretPass!',
    showPassword: false,
  },
};

// ── Filled — Revealed ─────────────────────────────────────────────────────────
export const FilledRevealed = {
  name: 'Filled — Password Revealed',
  args: {
    size: 'md',
    value: 'MyS3cretPass!',
    showPassword: true,
  },
  parameters: {
    docs: {
      description: {
        story: '`showPassword=true` switches `type` from `password` to `text`. EyeIcon label updates to "Hide password".',
      },
    },
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  args: {
    size: 'md',
    disabled: true,
    placeholder: 'Enter password',
    showPassword: false,
  },
};

// ── Error ─────────────────────────────────────────────────────────────────────
export const ErrorState = {
  name: 'Error',
  args: {
    size: 'md',
    error: true,
    value: 'weak',
    showPassword: false,
  },
};

// ── Toggle Interaction ────────────────────────────────────────────────────────
export const ToggleInteraction = {
  name: 'Toggle Interaction (stateful)',
  render: () => {
    const [val, setVal] = useState('MyS3cretPass!');
    const [show, setShow] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
        <PasswordInput
          size="md"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          showPassword={show}
          onToggle={() => setShow((s) => !s)}
        />
        <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c' }}>
          showPassword: {String(show)}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the stateful toggle pattern. The parent controls `showPassword`; ' +
          'PasswordInput is fully stateless. `onMouseDown` preventDefault on the toggle ' +
          'ensures the input does not lose focus on click.',
      },
    },
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
          <PasswordInput size={size} value="password" showPassword={false} />
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
        { label: 'Default',          props: { placeholder: 'Enter password', showPassword: false } },
        { label: 'Filled (hidden)',   props: { value: 'MyS3cretPass!', showPassword: false } },
        { label: 'Filled (revealed)', props: { value: 'MyS3cretPass!', showPassword: true } },
        { label: 'Disabled',         props: { disabled: true, placeholder: 'Enter password' } },
        { label: 'Error',            props: { error: true, value: 'weak' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            {label}
          </div>
          <PasswordInput size="md" {...props} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSED STORIES — LabelKey + PasswordInput + HintText
// ─────────────────────────────────────────────────────────────────────────────

export const ComposedDefault = {
  name: 'Composed — Default',
  render: () => {
    const [val, setVal] = useState('');
    const [show, setShow] = useState(false);
    return (
      <div style={{ maxWidth: 320 }}>
        <FormField label="Password" showRequired hint="Must be at least 8 characters.">
          <PasswordInput
            size="md"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            showPassword={show}
            onToggle={() => setShow((s) => !s)}
            placeholder="Enter password"
          />
        </FormField>
      </div>
    );
  },
};

export const ComposedError = {
  name: 'Composed — Error',
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div style={{ maxWidth: 320 }}>
        <FormField label="Password" showRequired error hint="Password must be at least 8 characters.">
          <PasswordInput
            size="md"
            error
            value="weak"
            showPassword={show}
            onToggle={() => setShow((s) => !s)}
            placeholder="Enter password"
          />
        </FormField>
      </div>
    );
  },
};

export const ComposedDisabled = {
  name: 'Composed — Disabled',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <FormField label="Password" disabled hint="Password cannot be changed at this time.">
        <PasswordInput size="md" disabled showPassword={false} placeholder="Enter password" onChange={() => {}} />
      </FormField>
    </div>
  ),
};

export const ComposedAllStates = {
  name: 'Composed — All States',
  render: () => {
    const [val, setVal] = useState('');
    const [show, setShow] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 320 }}>
        <FormField label="Default" hint="Must be at least 8 characters.">
          <PasswordInput size="md" value={val} onChange={(e) => setVal(e.target.value)} showPassword={show} onToggle={() => setShow((s) => !s)} placeholder="Enter password" />
        </FormField>
        <FormField label="Filled" hint="Must be at least 8 characters.">
          <PasswordInput size="md" value="MyS3cretPass!" showPassword={false} onChange={() => {}} placeholder="Enter password" />
        </FormField>
        <FormField label="Error" showRequired error hint="Password must be at least 8 characters.">
          <PasswordInput size="md" error value="weak" showPassword={false} onChange={() => {}} placeholder="Enter password" />
        </FormField>
        <FormField label="Disabled" disabled hint="Password cannot be changed at this time.">
          <PasswordInput size="md" disabled showPassword={false} onChange={() => {}} placeholder="Enter password" />
        </FormField>
      </div>
    );
  },
};
