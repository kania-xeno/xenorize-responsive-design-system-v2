import React, { useState } from 'react';
import SelectCountry from './SelectCountry.jsx';
import SingaporeFlag from '../../assets/flags/Singapore.jsx';
import Abkhazia from '../../assets/flags/Abkhazia.jsx';
import Afghanistan from '../../assets/flags/Afghanistan.jsx';
import Albania from '../../assets/flags/Albania.jsx';
import Algeria from '../../assets/flags/Algeria.jsx';
import AmericanSamoa from '../../assets/flags/AmericanSamoa.jsx';
import Andorra from '../../assets/flags/Andorra.jsx';
import Angola from '../../assets/flags/Angola.jsx';
import Globe from '../../icons/Globe.jsx';
import DropdownOption from '../dropdown/DropdownOption.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// SelectCountry — ↳country trigger component
// Figma source: Design System Scalable V.2.1.0 → ❖ Select Field → ↳country
// ComponentSet node: 2174:20606
// 18 variants = 6 states × 3 sizes
// States: Default · Filled · Hover · Open · Disabled · Error
// Sizes:  Medium (40px) · Small (36px) · X-Small (32px)
//
// Composes SelectBasic with:
//   — default left icon: Globe (generic country placeholder)
//   — CSS modifier class: .select-country
//   — token namespace: select-country/* (15 L3 vars)
// Consumer provides specific flag via `countryIcon` when a country is selected.
// ─────────────────────────────────────────────────────────────────────────────

const LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: '#5c5c5c',
  marginBottom: 4,
};

export default {
  title: 'Components/Select/Select Country',
  component: SelectCountry,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳country` — Country selection trigger. Composes **SelectBasic** with a Globe default icon and `select-country/*` token namespace. ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '6 states: Default · Filled · Hover · Open · Disabled · Error. ' +
          'Pass `countryIcon` to replace Globe with a specific flag asset when a country is selected (e.g. `<SingaporeFlag />`). ' +
          'All layout, spacing, state, and accessibility logic delegates to SelectBasic. ' +
          'Token namespace: `select-country/*` — values currently identical to `select-basic/*`; namespace applied for future divergence isolation.',
      },
    },
  },
  argTypes: {
    size:        { control: 'radio',   options: ['medium', 'small', 'x-small'], description: 'Trigger height: medium (40px) · small (36px) · x-small (32px)' },
    value:       { control: 'text',    description: 'Selected value — empty = placeholder state' },
    placeholder: { control: 'text',    description: 'Placeholder text when no country selected' },
    disabled:    { control: 'boolean', description: 'Disabled state' },
    error:       { control: 'boolean', description: 'Error state' },
    errorText:   { control: 'text',    description: 'Error message shown in HintText when error=true' },
    showLabel:   { control: 'boolean', description: 'Show LabelKey row' },
    label:       { control: 'text',    description: 'LabelKey label text' },
    required:    { control: 'boolean', description: 'Required asterisk on LabelKey' },
    hintText:    { control: 'text',    description: 'Hint message below trigger' },
    showHint:    { control: 'boolean', description: 'Show HintText row' },
  },
};

// ── Playground ────────────────────────────────────────────────────────────────
// Interactive: click trigger to open/close; click an option to select it.
//
// Figma ↳country Open state shows 6 options with alphabetical country flags:
//   Abkhazia, Afghanistan, Albania, Algeria, American Samoa, Andorra
// All flag assets are exported from Figma Assets file (V7Aj14atpopNg29CeUwgDy)
// and written to src/assets/flags/ as JSX components.
//
// 8 options total → options area overflows fixed panel → scroll demonstrated.
const PLAYGROUND_COUNTRY_OPTIONS = [
  { label: 'Abkhazia',       icon: <Abkhazia     width={20} height={20} /> },
  { label: 'Afghanistan',    icon: <Afghanistan  width={20} height={20} /> },
  { label: 'Albania',        icon: <Albania      width={20} height={20} /> },
  { label: 'Algeria',        icon: <Algeria      width={20} height={20} /> },
  { label: 'American Samoa', icon: <AmericanSamoa width={20} height={20} /> },
  { label: 'Andorra',        icon: <Andorra      width={20} height={20} /> },
  { label: 'Angola',         icon: <Angola       width={20} height={20} /> },
  { label: 'Singapore',      icon: <SingaporeFlag width={20} height={20} /> },
];

export const Playground = {
  args: {
    size:        'medium',
    placeholder: 'Select a country',
    disabled:    false,
    error:       false,
    errorText:   'Please select a valid country.',
    showLabel:   true,
    label:       'Country',
    required:    false,
    hintText:    'Select your country of residence.',
    showHint:    true,
  },
  render: (args) => {
    const [isOpen, setIsOpen]         = useState(false);
    const [value, setValue]           = useState('');
    const [selectedIcon, setSelected] = useState(null);

    const handleSelect = (label, icon) => {
      setValue(label);
      setSelected(icon);
      setIsOpen(false);
    };

    return (
      <div style={{ width: 300 }}>
        <SelectCountry
          {...args}
          value={value}
          countryIcon={selectedIcon ?? undefined}
          isOpen={isOpen}
          onClick={() => setIsOpen((o) => !o)}
        >
          {PLAYGROUND_COUNTRY_OPTIONS.map(({ label, icon }) => (
            <DropdownOption
              key={label}
              label={label}
              size="small"
              type="basic"
              leftIcon={icon}
              selected={value === label}
              showToggle={false}
              showRightIcon={false}
              onClick={(e) => { e.stopPropagation(); handleSelect(label, icon); }}
            />
          ))}
        </SelectCountry>
      </div>
    );
  },
};

// ── Default (Globe placeholder) ───────────────────────────────────────────────
export const Default = {
  name: 'Default (Globe)',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectCountry
        size="medium"
        label="Country"
        placeholder="Select a country"
        hintText="Select your country of residence."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default/placeholder state: Globe icon from Icon System. ' +
          'Globe is the Figma ↳country default icon (`"globus, map, earth, globe"` INSTANCE name).',
      },
    },
  },
};

// ── Filled (specific flag) ────────────────────────────────────────────────────
export const WithCountryFlag = {
  name: 'Filled — With Country Flag',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectCountry
        size="medium"
        label="Country"
        countryIcon={<SingaporeFlag width={20} height={20} />}
        value="Singapore"
        placeholder="Select a country"
        hintText="Select your country of residence."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Filled state with a specific flag: pass `countryIcon` to replace Globe with the selected country\'s flag. ' +
          'Shown here with SingaporeFlag. Flag colors are asset-owned — they do not respond to DS token color.',
      },
    },
  },
};

// ── Open (controlled) ────────────────────────────────────────────────────────
// Country options for Open story — Singapore plus 5 countries without extracted flag assets.
// Globe is used as placeholder for entries without a real flag in src/assets/flags/.
// Real flag assets for Playground: see PLAYGROUND_COUNTRY_OPTIONS above.
const COUNTRY_OPTIONS = [
  { label: 'Singapore',      icon: <SingaporeFlag width={20} height={20} /> },
  { label: 'United States',  icon: <Globe width={20} height={20} /> },
  { label: 'United Kingdom', icon: <Globe width={20} height={20} /> },
  { label: 'Japan',          icon: <Globe width={20} height={20} /> },
  { label: 'Germany',        icon: <Globe width={20} height={20} /> },
  { label: 'Australia',      icon: <Globe width={20} height={20} /> },
];

export const Open = {
  name: 'Open',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectCountry
        size="medium"
        label="Country"
        isOpen={true}
        placeholder="Select a country"
        hintText="Select your country of residence."
      >
        {COUNTRY_OPTIONS.map(({ label, icon }) => (
          <DropdownOption
            key={label}
            label={label}
            size="small"
            type="basic"
            leftIcon={icon}
            showToggle={false}
            showRightIcon={false}
          />
        ))}
      </SelectCountry>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Open state: trigger shows focus ring + DropdownList rendered below HintText. No C-01 gap here — SelectCountry uses `text-filled` in Open state (same as SelectBasic).',
      },
    },
  },
};

// ── Error ─────────────────────────────────────────────────────────────────────
export const ErrorState = {
  name: 'Error',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectCountry
        size="medium"
        label="Country"
        error
        required
        placeholder="Select a country"
        errorText="Please select a valid country."
      />
    </div>
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectCountry
        size="medium"
        label="Country"
        disabled
        value="Singapore"
        countryIcon={<SingaporeFlag width={20} height={20} />}
        hintText="This field is currently unavailable."
      />
    </div>
  ),
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      {(['medium', 'small', 'x-small']).map((size) => (
        <div key={size}>
          <div style={LABEL_STYLE}>size="{size}"</div>
          <SelectCountry
            size={size}
            placeholder="Select a country"
            showLabel={false}
            showHint={false}
          />
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
        { label: 'Default',         props: { placeholder: 'Select a country' } },
        { label: 'Filled',          props: { value: 'Singapore', countryIcon: <SingaporeFlag width={20} height={20} /> } },
        { label: 'Open',            props: { isOpen: true, placeholder: 'Select a country' } },
        { label: 'Error',           props: { error: true, required: true, placeholder: 'Select a country', errorText: 'Select a valid country.' } },
        { label: 'Disabled',        props: { disabled: true, placeholder: 'Select a country' } },
        { label: 'Disabled Filled', props: { disabled: true, value: 'Singapore', countryIcon: <SingaporeFlag width={20} height={20} /> } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={LABEL_STYLE}>{label}</div>
          <SelectCountry size="medium" showLabel={false} showHint={false} {...props} />
        </div>
      ))}
    </div>
  ),
};
