import React, { useState } from 'react';
import SelectExchange from './SelectExchange.jsx';
import Upbit from '../../assets/exchanges/Upbit.jsx';
import Binance from '../../assets/exchanges/Binance.jsx';
import Bybit from '../../assets/exchanges/Bybit.jsx';
import Gemini from '../../assets/exchanges/Gemini.jsx';
import KuCoin from '../../assets/exchanges/KuCoin.jsx';
import OKX from '../../assets/exchanges/OKX.jsx';
import Coinbase from '../../assets/exchanges/Coinbase.jsx';
import Kraken from '../../assets/exchanges/Kraken.jsx';
import DropdownOption from '../dropdown/DropdownOption.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// SelectExchange — ↳exchange trigger component
// Figma source: Design System Scalable V.2.1.0 → ❖ Select Field → ↳exchange
// ComponentSet node: 2176:35457
// 18 variants = 6 states × 3 sizes
// States: Default · Filled · Hover · Open · Disabled · Error
// Sizes:  Medium (40px) · Small (36px) · X-Small (32px)
//
// Composes SelectBasic with:
//   — default left icon: Upbit (representative exchange asset)
//   — CSS modifier class: .select-exchange
//   — token namespace: select-exchange/* (15 L3 vars)
// Consumer provides specific exchange logo via `exchangeIcon` when selecting.
//
// ⚠️ DS gap C-01 (implemented as-designed):
//   Figma ↳exchange Open and Error states use select-exchange/text/placeholder
//   (color-text-muted) instead of text/filled (color-text-strong).
//   Same C-01 pattern as SelectCoin — see SelectCoin.stories.jsx for details.
// ─────────────────────────────────────────────────────────────────────────────

const LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: '#5c5c5c',
  marginBottom: 4,
};

export default {
  title: 'Components/Select/Select Exchange',
  component: SelectExchange,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳exchange` — Exchange selection trigger. Composes **SelectBasic** with an Upbit default icon and `select-exchange/*` token namespace. ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '6 states: Default · Filled · Hover · Open · Disabled · Error. ' +
          'Pass `exchangeIcon` to replace Upbit with a specific exchange logo when an exchange is selected. ' +
          '**⚠️ DS gap C-01 (implemented as-designed):** Open and Error states use `text/placeholder` (muted) — ' +
          'same Figma-specified behavior as SelectCoin.',
      },
    },
  },
  argTypes: {
    size:        { control: 'radio',   options: ['medium', 'small', 'x-small'], description: 'Trigger height' },
    value:       { control: 'text',    description: 'Selected value — empty = placeholder state' },
    placeholder: { control: 'text',    description: 'Placeholder text when no exchange selected' },
    disabled:    { control: 'boolean', description: 'Disabled state' },
    error:       { control: 'boolean', description: 'Error state' },
    errorText:   { control: 'text',    description: 'Error message shown in HintText' },
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
// Figma ↳exchange Open state shows these exact exchange labels:
//   Binance, ByBit, Gemini, Kucoin, OKX (+ generic "Label" 6th entry)
// All exchange assets exported from Figma Assets file (V7Aj14atpopNg29CeUwgDy)
// variant: square=true, dark=false — consistent with Upbit.jsx pattern.
//
// 8 options total → options area overflows fixed panel → scroll demonstrated.
const PLAYGROUND_EXCHANGE_OPTIONS = [
  { label: 'Binance',  icon: <Binance  width={20} height={20} />, hasIcon: true },
  { label: 'ByBit',    icon: <Bybit    width={20} height={20} />, hasIcon: true },
  { label: 'Gemini',   icon: <Gemini   width={20} height={20} />, hasIcon: true },
  { label: 'KuCoin',   icon: <KuCoin   width={20} height={20} />, hasIcon: true },
  { label: 'OKX',      icon: <OKX      width={20} height={20} />, hasIcon: true },
  { label: 'Upbit',    icon: <Upbit    width={20} height={20} />, hasIcon: true },
  { label: 'Coinbase', icon: <Coinbase width={20} height={20} />, hasIcon: true },
  { label: 'Kraken',   icon: <Kraken   width={20} height={20} />, hasIcon: true },
];

export const Playground = {
  args: {
    size:        'medium',
    placeholder: 'Select an exchange',
    disabled:    false,
    error:       false,
    errorText:   'Please select a valid exchange.',
    showLabel:   true,
    label:       'Exchange',
    required:    false,
    hintText:    'Select your preferred trading exchange.',
    showHint:    true,
  },
  render: (args) => {
    const [isOpen, setIsOpen]         = useState(false);
    const [value, setValue]           = useState('');
    const [selectedIcon, setSelected] = useState(null);

    const handleSelect = (label, icon) => {
      setValue(label);
      setSelected(icon);  // null for non-Upbit → trigger falls back to Upbit placeholder
      setIsOpen(false);
    };

    return (
      <div style={{ width: 300 }}>
        <SelectExchange
          {...args}
          value={value}
          exchangeIcon={selectedIcon ?? undefined}
          isOpen={isOpen}
          onClick={() => setIsOpen((o) => !o)}
        >
          {PLAYGROUND_EXCHANGE_OPTIONS.map(({ label, icon, hasIcon }) => (
            <DropdownOption
              key={label}
              label={label}
              size="small"
              type="basic"
              leftIcon={icon ?? undefined}
              showLeftIcon={hasIcon}
              selected={value === label}
              showToggle={false}
              showRightIcon={false}
              onClick={(e) => { e.stopPropagation(); handleSelect(label, icon); }}
            />
          ))}
        </SelectExchange>
      </div>
    );
  },
};

// ── Default (Upbit placeholder) ───────────────────────────────────────────────
export const Default = {
  name: 'Default (Upbit)',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectExchange
        size="medium"
        label="Exchange"
        placeholder="Select an exchange"
        hintText="Select your preferred trading exchange."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default/placeholder state: Upbit exchange logo from `src/assets/exchanges/`. ' +
          'Upbit is the Figma ↳exchange default icon (`"icn-exchange-Upbit Symbol"` INSTANCE name). ' +
          'Asset colors are hardcoded — they do not respond to DS token color.',
      },
    },
  },
};

// ── Filled ────────────────────────────────────────────────────────────────────
export const Filled = {
  name: 'Filled',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectExchange
        size="medium"
        label="Exchange"
        value="Upbit"
        placeholder="Select an exchange"
        hintText="Select your preferred trading exchange."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Filled state: pass `exchangeIcon` with a specific exchange asset when an exchange is selected. ' +
          'Shown here without a custom `exchangeIcon` — Upbit remains as the icon.',
      },
    },
  },
};

// Exchange options for static Open story — all real assets exported from Figma.
const EXCHANGE_OPTIONS = [
  { label: 'Upbit',    icon: <Upbit    width={20} height={20} />, hasIcon: true },
  { label: 'Binance',  icon: <Binance  width={20} height={20} />, hasIcon: true },
  { label: 'Coinbase', icon: <Coinbase width={20} height={20} />, hasIcon: true },
  { label: 'Kraken',   icon: <Kraken   width={20} height={20} />, hasIcon: true },
  { label: 'OKX',      icon: <OKX      width={20} height={20} />, hasIcon: true },
  { label: 'Bybit',    icon: <Bybit    width={20} height={20} />, hasIcon: true },
];

// ── Open (controlled) — C-01 ─────────────────────────────────────────────────
export const Open = {
  name: 'Open — C-01: muted text',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectExchange
        size="medium"
        label="Exchange"
        isOpen={true}
        placeholder="Select an exchange"
        hintText="Select your preferred trading exchange."
      >
        {EXCHANGE_OPTIONS.map(({ label, icon, hasIcon }) => (
          <DropdownOption
            key={label}
            label={label}
            size="small"
            type="basic"
            leftIcon={icon ?? undefined}
            showLeftIcon={hasIcon}
            showToggle={false}
            showRightIcon={false}
          />
        ))}
      </SelectExchange>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**DS gap C-01 (as-designed):** Open state text remains `color-text-muted`. ' +
          'Same CSS override pattern as SelectCoin — `.select-exchange.select-basic--open .select-basic__trigger` (specificity 0,3,0).',
      },
    },
  },
};

// ── Error — C-01 ─────────────────────────────────────────────────────────────
export const ErrorState = {
  name: 'Error — C-01: muted text',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectExchange
        size="medium"
        label="Exchange"
        error
        required
        placeholder="Select an exchange"
        errorText="Please select a valid exchange."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '**DS gap C-01 (as-designed):** Error state text also remains `color-text-muted`. Border changes to danger color; shadow from SelectBasic propagates.',
      },
    },
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectExchange
        size="medium"
        label="Exchange"
        disabled
        value="Upbit"
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
          <SelectExchange size={size} placeholder="Select an exchange" showLabel={false} showHint={false} />
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
        { label: 'Default',         props: { placeholder: 'Select an exchange' } },
        { label: 'Filled',          props: { value: 'Upbit', placeholder: 'Select an exchange' } },
        { label: 'Open (C-01)',     props: { isOpen: true, placeholder: 'Select an exchange' } },
        { label: 'Error (C-01)',    props: { error: true, required: true, placeholder: 'Select an exchange', errorText: 'Select a valid exchange.' } },
        { label: 'Disabled',        props: { disabled: true, placeholder: 'Select an exchange' } },
        { label: 'Disabled Filled', props: { disabled: true, value: 'Upbit' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={LABEL_STYLE}>{label}</div>
          <SelectExchange size="medium" showLabel={false} showHint={false} {...props} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'C-01 labels on Open and Error — muted text color is Figma-specified behavior for this component.',
      },
    },
  },
};

// ── Custom Exchange Icon ──────────────────────────────────────────────────────
export const CustomExchangeIcon = {
  name: 'With Custom Exchange Icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <div>
        <div style={LABEL_STYLE}>Default: Upbit (representative exchange)</div>
        <SelectExchange size="medium" placeholder="Select an exchange" showLabel={false} showHint={false} />
      </div>
      <div>
        <div style={LABEL_STYLE}>With exchangeIcon: custom logo (Upbit shown)</div>
        <SelectExchange
          size="medium"
          exchangeIcon={<Upbit width={20} height={20} />}
          value="Upbit"
          placeholder="Select an exchange"
          showLabel={false}
          showHint={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pass `exchangeIcon` with a specific exchange asset from `src/assets/exchanges/` when an exchange is selected. ' +
          'Exchange logos have hardcoded fill colors — they do not respond to `currentColor`.',
      },
    },
  },
};
