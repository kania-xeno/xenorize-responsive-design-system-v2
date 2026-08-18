import React, { useState } from 'react';
import SelectBasic from './SelectBasic.jsx';
import Globe from '../../icons/Globe.jsx';
import DropdownOption from '../dropdown/DropdownOption.jsx';
import SingaporeFlag from '../../assets/flags/Singapore.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// SelectBasic — ↳basic trigger component
// Figma source: Design System Scalable V.2.1.0 → ❖ Select Field → ↳basic
// ComponentSet node: 2174:17255
// 18 variants = 6 states × 3 sizes
// States: Default · Hover · Open · Filled · Disabled · Error
// Sizes:  Medium (40px) · Small (36px) · X-Small (32px)
// ─────────────────────────────────────────────────────────────────────────────

const LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: '#5c5c5c',
  marginBottom: 4,
};

// Generic text-only options (Figma Open state shows "Label" placeholder text for all items).
// Using 8 entries so the options area visibly scrolls in the fixed-height panel.
// SelectBasic is general-purpose — no coin/country/exchange assets.
const BASIC_OPTIONS = [
  'Option A', 'Option B', 'Option C',
  'Option D', 'Option E', 'Option F',
];

// Playground-specific option set — 8 entries for clear scroll demonstration.
// Figma ↳basic Open state: 6 × "Label" generic placeholder. Using "Label A–H" per DT spec.
const PLAYGROUND_BASIC_OPTIONS = [
  'Label A', 'Label B', 'Label C', 'Label D',
  'Label E', 'Label F', 'Label G', 'Label H',
];

export default {
  title: 'Components/Select/Select Basic',
  component: SelectBasic,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳basic` — General-purpose select field trigger. ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '6 states: Default · Hover · Open · Filled · Disabled · Error. ' +
          'Composes LabelKey (optional label row) + trigger button + HintText (optional hint row) + DropdownList (Open state only). ' +
          'Optional left icon slot (Icon System, 20×20). ' +
          'Token namespace: `select-basic/*` (15 L3 CSS vars). ' +
          'DS gap S-04: `icon/dissabled` typo in global theme token (non-blocking, carried forward).',
      },
    },
  },
  argTypes: {
    size:        { control: 'radio',   options: ['medium', 'small', 'x-small'], description: 'Trigger height: medium (40px) · small (36px) · x-small (32px)' },
    value:       { control: 'text',    description: 'Selected value — empty string = placeholder state' },
    placeholder: { control: 'text',    description: 'Text shown when no value is selected' },
    disabled:    { control: 'boolean', description: 'Disabled state' },
    error:       { control: 'boolean', description: 'Error state' },
    errorText:   { control: 'text',    description: 'Error message shown in HintText when error=true (overrides hintText)' },
    showLabel:   { control: 'boolean', description: 'Show LabelKey row above the trigger' },
    label:       { control: 'text',    description: 'LabelKey label text' },
    required:    { control: 'boolean', description: 'Show required asterisk on LabelKey' },
    optional:    { control: 'boolean', description: 'Show "(Optional)" sublabel on LabelKey' },
    showInfo:    { control: 'boolean', description: 'Show info icon on LabelKey' },
    showHelp:    { control: 'boolean', description: 'Show help link on LabelKey' },
    helpText:    { control: 'text',    description: 'Help link text' },
    hintText:    { control: 'text',    description: 'Hint message shown below the trigger' },
    showHint:    { control: 'boolean', description: 'Show HintText row when a message is present' },
  },
};

// ── Playground ────────────────────────────────────────────────────────────────
// Interactive: click trigger to open/close; click an option to select it.
// Uses DropdownList height="fixed" (via SelectBasic) — Search visible, options scroll.
// 8 options → options area overflows the fixed panel → scroll demonstrated.
export const Playground = {
  args: {
    size:        'medium',
    placeholder: 'Select an option',
    disabled:    false,
    error:       false,
    errorText:   'Please select a valid option.',
    showLabel:   true,
    label:       'Label',
    required:    false,
    optional:    false,
    showInfo:    false,
    showHelp:    false,
    helpText:    'Help?',
    hintText:    'Select an option from the list.',
    showHint:    true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue]   = useState('');

    const handleSelect = (label) => {
      setValue(label);
      setIsOpen(false);
    };

    return (
      <div style={{ width: 300 }}>
        <SelectBasic
          {...args}
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen((o) => !o)}
        >
          {PLAYGROUND_BASIC_OPTIONS.map((label) => (
            <DropdownOption
              key={label}
              label={label}
              size="small"
              type="basic"
              selected={value === label}
              showToggle={false}
              showRightIcon={false}
              onClick={(e) => { e.stopPropagation(); handleSelect(label); }}
            />
          ))}
        </SelectBasic>
      </div>
    );
  },
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  name: 'Default',
  args: {
    size:        'medium',
    placeholder: 'Select an option',
    label:       'Label',
  },
};

// ── Filled ────────────────────────────────────────────────────────────────────
export const Filled = {
  name: 'Filled',
  args: {
    size:        'medium',
    value:       'Bitcoin',
    placeholder: 'Select an option',
    label:       'Asset',
  },
};

// ── Open (controlled) ────────────────────────────────────────────────────────
export const Open = {
  name: 'Open',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectBasic
        size="medium"
        isOpen={true}
        placeholder="Select an option"
        label="Asset"
        hintText="Choose your preferred asset."
      >
        {BASIC_OPTIONS.map((label) => (
          <DropdownOption
            key={label}
            label={label}
            size="small"
            type="basic"
            showLeftIcon={false}
            showToggle={false}
            showRightIcon={false}
          />
        ))}
      </SelectBasic>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Open state: trigger shows focus ring + DropdownList rendered as a sibling below HintText. ' +
          '`isOpen={true}` is a controlled prop — the trigger is frozen open for inspection.',
      },
    },
  },
};

// ── Error ─────────────────────────────────────────────────────────────────────
export const ErrorState = {
  name: 'Error',
  args: {
    size:        'medium',
    error:       true,
    placeholder: 'Select an option',
    label:       'Asset',
    errorText:   'Please select a valid option.',
    hintText:    'Please select a valid option.',
  },
};

// ── Error — Filled ────────────────────────────────────────────────────────────
export const ErrorFilled = {
  name: 'Error — Filled',
  args: {
    size:        'medium',
    error:       true,
    value:       'Invalid selection',
    placeholder: 'Select an option',
    label:       'Asset',
    errorText:   'This selection is no longer available.',
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  args: {
    size:        'medium',
    disabled:    true,
    placeholder: 'Select an option',
    label:       'Asset',
    hintText:    'This field is currently unavailable.',
  },
};

// ── Disabled — Filled ─────────────────────────────────────────────────────────
export const DisabledFilled = {
  name: 'Disabled — Filled',
  args: {
    size:        'medium',
    disabled:    true,
    value:       'Bitcoin',
    placeholder: 'Select an option',
    label:       'Asset',
    hintText:    'This field is currently unavailable.',
  },
};

// ── With Left Icon ────────────────────────────────────────────────────────────
export const WithLeftIcon = {
  name: 'With Left Icon',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectBasic
        size="medium"
        leftIcon={<Globe width={20} height={20} />}
        placeholder="Select a country"
        label="Country"
        hintText="Pick your country of residence."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Left icon slot: pass any Icon System component at 20×20. ' +
          'Icon inherits color via `currentColor` through `--_sb-icon`. ' +
          'Shown here with the Globe icon.',
      },
    },
  },
};

// ── With Flag (asset left icon) ───────────────────────────────────────────────
export const WithFlagIcon = {
  name: 'With Flag (asset icon)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <div>
        <div style={LABEL_STYLE}>Left icon = Globe (placeholder)</div>
        <SelectBasic
          size="medium"
          leftIcon={<Globe width={20} height={20} />}
          placeholder="Select a country"
          label="Country"
          showHint={false}
        />
      </div>
      <div>
        <div style={LABEL_STYLE}>Left icon = SingaporeFlag (selected)</div>
        <SelectBasic
          size="medium"
          leftIcon={<SingaporeFlag width={20} height={20} />}
          value="Singapore"
          placeholder="Select a country"
          label="Country"
          showHint={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Flag assets have hardcoded fill colors — they do NOT respond to `currentColor`. ' +
          'Pass the flag component directly via `leftIcon`. ' +
          'SelectCountry wraps this pattern automatically.',
      },
    },
  },
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      {(['medium', 'small', 'x-small']).map((size) => (
        <div key={size}>
          <div style={LABEL_STYLE}>size="{size}"</div>
          <SelectBasic size={size} placeholder="Select an option" showLabel={false} showHint={false} />
        </div>
      ))}
    </div>
  ),
};

// ── All States — medium ───────────────────────────────────────────────────────
export const AllStates = {
  name: 'All States — medium',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      {[
        { label: 'Default',         props: { placeholder: 'Select an option' } },
        { label: 'Filled',          props: { value: 'Bitcoin', placeholder: 'Select an option' } },
        { label: 'Disabled',        props: { disabled: true, placeholder: 'Select an option' } },
        { label: 'Disabled Filled', props: { disabled: true, value: 'Bitcoin' } },
        { label: 'Error',           props: { error: true, placeholder: 'Select an option', errorText: 'Select a valid option.' } },
        { label: 'Error Filled',    props: { error: true, value: 'Invalid', errorText: 'This option is unavailable.' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={LABEL_STYLE}>{label}</div>
          <SelectBasic size="medium" showLabel={false} showHint={false} {...props} />
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSED — LabelKey + SelectBasic + HintText
// ─────────────────────────────────────────────────────────────────────────────

// ── Composed — Default ────────────────────────────────────────────────────────
export const ComposedDefault = {
  name: 'Composed — Default',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectBasic
        size="medium"
        label="Asset"
        placeholder="Select an asset"
        hintText="Choose your preferred asset."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full anatomy: LabelKey (normal) · trigger (default) · HintText (default). Standard composed select.',
      },
    },
  },
};

// ── Composed — Required ───────────────────────────────────────────────────────
export const ComposedRequired = {
  name: 'Composed — Required',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectBasic
        size="medium"
        label="Asset"
        required
        placeholder="Select an asset"
        hintText="This field is required."
      />
    </div>
  ),
};

// ── Composed — Error ──────────────────────────────────────────────────────────
export const ComposedError = {
  name: 'Composed — Error',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectBasic
        size="medium"
        label="Asset"
        required
        error
        value="Invalid selection"
        placeholder="Select an asset"
        errorText="This option is no longer available."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Error state: LabelKey stays normal · trigger gets error border · HintText switches to error (red). ' +
          '`errorText` overrides `hintText` when `error=true`.',
      },
    },
  },
};

// ── Composed — Disabled ───────────────────────────────────────────────────────
export const ComposedDisabled = {
  name: 'Composed — Disabled',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectBasic
        size="medium"
        label="Asset"
        disabled
        value="Bitcoin"
        placeholder="Select an asset"
        hintText="This field is currently unavailable."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state: LabelKey switches to disabled · trigger muted · HintText switches to disabled.',
      },
    },
  },
};

// ── Composed — Optional + Help ────────────────────────────────────────────────
export const ComposedOptionalHelp = {
  name: 'Composed — Optional + Help link',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectBasic
        size="medium"
        label="Preferred exchange"
        optional
        showHelp
        helpText="What is this?"
        placeholder="Select an exchange"
        hintText="This field is optional."
      />
    </div>
  ),
};

// ── Composed — All States ─────────────────────────────────────────────────────
export const ComposedAllStates = {
  name: 'Composed — All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 300 }}>
      <SelectBasic size="medium" label="Default"  placeholder="Select an asset" hintText="Helper text." />
      <SelectBasic size="medium" label="Filled"   value="Bitcoin" placeholder="Select an asset" hintText="Helper text." />
      <SelectBasic size="medium" label="Error" required error value="Invalid" errorText="Select a valid option." />
      <SelectBasic size="medium" label="Disabled" disabled value="Bitcoin" hintText="Currently unavailable." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Four key composed states: Default · Filled · Error · Disabled. LabelKey and HintText coordinate state automatically.',
      },
    },
  },
};
