import React, { useState } from 'react';
import SearchInput from './SearchInput.jsx';
import FormField   from './FormField.jsx';

export default {
  title: 'Components/Input Text/Search/General',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳input-text/search` — Search field with leading SearchIcon. ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '6 states: Default · Hover · Focus · Filled · Disabled · Error. ' +
          '⚠️ Unique icon color behavior: soft (#A3A3A3) in default/empty state → ' +
          'brand purple (#403297) on hover/focus/filled. Handled via CSS `--_it-icon` override. ' +
          '⚠️ text-disabled = #D1D1D1 (unique to search; others use #7B7B7B). ' +
          '⚠️ `--input-text-search-placeholder-disabled` inferred as #A3A3A3 — verify visually in Storybook. ' +
          '⚠️ SearchIcon is a placeholder.',
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
          <SearchInput
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
    label:       'Search',
    hint:        'Enter a keyword to search components.',
    required:    false,
    optional:    false,
    showHelp:    false,
    helpText:    'Help?',
    size:        'md',
    disabled:    false,
    error:       false,
    placeholder: 'Search…',
  },
};

// ── Default (empty — icon soft) ───────────────────────────────────────────────
export const Default = {
  name: 'Default — Empty (icon soft)',
  args: {
    size: 'md',
    placeholder: 'Search…',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state: icon uses soft color (#A3A3A3) via `--input-text-search-icon-placeholder`.',
      },
    },
  },
};

// ── Filled (icon brand) ───────────────────────────────────────────────────────
export const Filled = {
  name: 'Filled (icon brand)',
  args: {
    size: 'md',
    value: 'design tokens',
    placeholder: 'Search…',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filled state: icon switches to brand color (#403297) via `.input-text--filled` class + CSS override.',
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
    placeholder: 'Search…',
  },
  parameters: {
    docs: {
      description: {
        story:
          '⚠️ QA flag: `--input-text-search-placeholder-disabled` is inferred as #A3A3A3. ' +
          'Verify placeholder text color in this state.',
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
    value: '!invalid query',
    placeholder: 'Search…',
  },
};

// ── Icon Color Progression ────────────────────────────────────────────────────
export const IconColorProgression = {
  name: 'Icon Color Progression',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      {[
        { label: 'Default (soft icon)',    props: { placeholder: 'Search…' } },
        { label: 'Filled (brand icon)',    props: { value: 'design tokens' } },
        { label: 'Disabled (soft icon)',   props: { disabled: true, placeholder: 'Search…' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            {label}
          </div>
          <SearchInput size="md" {...props} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The search icon color is unique: soft (#A3A3A3) when empty/disabled, ' +
          'brand (#403297) on hover/focus/filled. Implemented via CSS `--_it-icon` custom property overrides ' +
          'rather than JS-driven class changes.',
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
          <SearchInput size={size} placeholder="Search…" />
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
        { label: 'Default',  props: { placeholder: 'Search…' } },
        { label: 'Filled',   props: { value: 'design tokens' } },
        { label: 'Disabled', props: { disabled: true, placeholder: 'Search…' } },
        { label: 'Error',    props: { error: true, value: '!bad query' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            {label}
          </div>
          <SearchInput size="md" {...props} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSED STORIES — LabelKey + SearchInput + HintText
// ─────────────────────────────────────────────────────────────────────────────

export const ComposedDefault = {
  name: 'Composed — Default',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ maxWidth: 320 }}>
        <FormField label="Search components" hint="Search by component name or token.">
          <SearchInput size="md" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Search…" />
        </FormField>
      </div>
    );
  },
};

export const ComposedError = {
  name: 'Composed — Error',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <FormField label="Search components" error hint="No results found for this query.">
        <SearchInput size="md" error value="!invalid query" placeholder="Search…" />
      </FormField>
    </div>
  ),
};

export const ComposedDisabled = {
  name: 'Composed — Disabled',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <FormField label="Search components" disabled hint="Search is currently unavailable.">
        <SearchInput size="md" disabled placeholder="Search…" />
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
        <FormField label="Default" hint="Search by component name or token.">
          <SearchInput size="md" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Search…" />
        </FormField>
        <FormField label="Filled" hint="Search by component name or token.">
          <SearchInput size="md" value="design tokens" placeholder="Search…" />
        </FormField>
        <FormField label="Error" error hint="No results found for this query.">
          <SearchInput size="md" error value="!bad query" placeholder="Search…" />
        </FormField>
        <FormField label="Disabled" disabled hint="Search is currently unavailable.">
          <SearchInput size="md" disabled placeholder="Search…" />
        </FormField>
      </div>
    );
  },
};
