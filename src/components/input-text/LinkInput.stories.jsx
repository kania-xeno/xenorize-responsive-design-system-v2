import React, { useState } from 'react';
import LinkInput from './LinkInput.jsx';
import FormField from './FormField.jsx';

export default {
  title: 'Components/Input Text/Link/General',
  component: LinkInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳input-text/link` — URL / link field with leading LinkIcon. ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '6 states: Default · Hover · Focus · Filled · Disabled · Error. ' +
          '⚠️ LinkIcon is a placeholder — replace with final DS SVG path. ' +
          '⚠️ icon/disabled = #A3A3A3 (icon/soft) — same as date, differs from basic (#D1D1D1). ' +
          'Field uses `type="url"`. Placeholder defaults to `https://`.',
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
      <div style={{ maxWidth: 360 }}>
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
          <LinkInput
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
    label:       'Portfolio URL',
    hint:        'Enter the full URL including https://.',
    required:    false,
    optional:    false,
    showHelp:    false,
    helpText:    'Help?',
    size:        'md',
    disabled:    false,
    error:       false,
    placeholder: 'https://',
  },
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  name: 'Default',
  args: {
    size: 'md',
    placeholder: 'https://',
  },
};

// ── Filled ────────────────────────────────────────────────────────────────────
export const Filled = {
  name: 'Filled',
  args: {
    size: 'md',
    value: 'https://example.com/design-tokens',
    placeholder: 'https://',
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  args: {
    size: 'md',
    disabled: true,
    placeholder: 'https://',
  },
  parameters: {
    docs: {
      description: {
        story: 'icon/disabled = #A3A3A3 (icon/soft). Same as Date, differs from Basic (#D1D1D1).',
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
    value: 'not-a-valid-url',
    placeholder: 'https://',
  },
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      {(['md', 'sm', 'xs']).map((size) => (
        <div key={size}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            size="{size}"
          </div>
          <LinkInput size={size} placeholder="https://" />
        </div>
      ))}
    </div>
  ),
};

// ── All States ────────────────────────────────────────────────────────────────
export const AllStates = {
  name: 'All States — md',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      {[
        { label: 'Default',  props: { placeholder: 'https://' } },
        { label: 'Filled',   props: { value: 'https://example.com/design-tokens' } },
        { label: 'Disabled', props: { disabled: true, placeholder: 'https://' } },
        { label: 'Error',    props: { error: true, value: 'not-a-valid-url' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            {label}
          </div>
          <LinkInput size="md" {...props} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSED STORIES — LabelKey + LinkInput + HintText
// ─────────────────────────────────────────────────────────────────────────────

export const ComposedDefault = {
  name: 'Composed — Default',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ maxWidth: 360 }}>
        <FormField label="Portfolio URL" hint="Enter the full URL including https://.">
          <LinkInput size="md" value={val} onChange={(e) => setVal(e.target.value)} placeholder="https://" />
        </FormField>
      </div>
    );
  },
};

export const ComposedError = {
  name: 'Composed — Error',
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <FormField label="Portfolio URL" error hint="Please enter a valid URL starting with https://.">
        <LinkInput size="md" error value="not-a-valid-url" placeholder="https://" />
      </FormField>
    </div>
  ),
};

export const ComposedDisabled = {
  name: 'Composed — Disabled',
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <FormField label="Portfolio URL" disabled hint="This field is currently disabled.">
        <LinkInput size="md" disabled placeholder="https://" />
      </FormField>
    </div>
  ),
};

export const ComposedAllStates = {
  name: 'Composed — All States',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
        <FormField label="Default" hint="Enter the full URL including https://.">
          <LinkInput size="md" value={val} onChange={(e) => setVal(e.target.value)} placeholder="https://" />
        </FormField>
        <FormField label="Filled" hint="Enter the full URL including https://.">
          <LinkInput size="md" value="https://example.com/design-tokens" placeholder="https://" />
        </FormField>
        <FormField label="Error" error hint="Please enter a valid URL.">
          <LinkInput size="md" error value="not-a-valid-url" placeholder="https://" />
        </FormField>
        <FormField label="Disabled" disabled hint="This field is currently disabled.">
          <LinkInput size="md" disabled placeholder="https://" />
        </FormField>
      </div>
    );
  },
};
