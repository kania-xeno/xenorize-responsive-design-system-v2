import React, { useState } from 'react';
import SelectCoin from './SelectCoin.jsx';
import CryptoCoin from '../../icons/CryptoCoin.jsx';
import Bitcoin from '../../assets/coins/Bitcoin.jsx';
import BinanceCoin from '../../assets/coins/BinanceCoin.jsx';
import BitcoinCash from '../../assets/coins/BitcoinCash.jsx';
import Cardano from '../../assets/coins/Cardano.jsx';
import Chainlink from '../../assets/coins/Chainlink.jsx';
import Ethereum from '../../assets/coins/Ethereum.jsx';
import Solana from '../../assets/coins/Solana.jsx';
import Polygon from '../../assets/coins/Polygon.jsx';
import DropdownOption from '../dropdown/DropdownOption.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// SelectCoin — ↳coin trigger component
// Figma source: Design System Scalable V.2.1.0 → ❖ Select Field → ↳coin
// ComponentSet node: 2175:29967
// 18 variants = 6 states × 3 sizes
// States: Default · Filled · Hover · Open · Disabled · Error
// Sizes:  Medium (40px) · Small (36px) · X-Small (32px)
//
// Composes SelectBasic with:
//   — default left icon: CryptoCoin (generic coin placeholder, Icon System)
//   — CSS modifier class: .select-coin
//   — token namespace: select-coin/* (15 L3 vars)
// Consumer provides specific coin asset via `coinIcon` when a coin is selected.
//
// ⚠️ DS gap C-01 (implemented as-designed):
//   Figma ↳coin Open and Error states use select-coin/text/placeholder
//   (color-text-muted) instead of text/filled (color-text-strong).
//   This differs from SelectBasic/SelectCountry — the text stays muted even
//   when the field is open or in error. SelectCoin.css overrides --_sb-text
//   via higher-specificity rules (0,3,0) to maintain Figma fidelity.
// ─────────────────────────────────────────────────────────────────────────────

const LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: '#5c5c5c',
  marginBottom: 4,
};

export default {
  title: 'Components/Select/Select Coin',
  component: SelectCoin,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳coin` — Cryptocurrency selection trigger. Composes **SelectBasic** with a CryptoCoin default icon and `select-coin/*` token namespace. ' +
          '3 sizes: md (40px) · sm (36px) · xs (32px). ' +
          '6 states: Default · Filled · Hover · Open · Disabled · Error. ' +
          'Pass `coinIcon` to replace CryptoCoin with a specific coin asset when a coin is selected. ' +
          '**⚠️ DS gap C-01 (implemented as-designed):** Open and Error states use `text/placeholder` (muted) instead of `text/filled` (strong) — ' +
          'matching Figma intent, which differs from SelectBasic behavior.',
      },
    },
  },
  argTypes: {
    size:        { control: 'radio',   options: ['medium', 'small', 'x-small'], description: 'Trigger height' },
    value:       { control: 'text',    description: 'Selected value — empty = placeholder state' },
    placeholder: { control: 'text',    description: 'Placeholder text when no coin selected' },
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
// Figma ↳coin Open state shows these exact options (with tickers):
//   Bitcoin (BTC), Binance Coin (BNB), Bitcoin Cash (BCH), Cardano (ADA), Chainlink (LINK)
// All coin assets exported from Figma Assets file (V7Aj14atpopNg29CeUwgDy)
// and written to src/assets/coins/ as JSX components.
//
// 8 options total → options area overflows fixed panel → scroll demonstrated.
const PLAYGROUND_COIN_OPTIONS = [
  { label: 'Bitcoin (BTC)',      icon: <Bitcoin     width={20} height={20} /> },
  { label: 'Binance Coin (BNB)', icon: <BinanceCoin width={20} height={20} /> },
  { label: 'Bitcoin Cash (BCH)', icon: <BitcoinCash width={20} height={20} /> },
  { label: 'Cardano (ADA)',      icon: <Cardano     width={20} height={20} /> },
  { label: 'Chainlink (LINK)',   icon: <Chainlink   width={20} height={20} /> },
  { label: 'Ethereum (ETH)',     icon: <Ethereum    width={20} height={20} /> },
  { label: 'Solana (SOL)',       icon: <Solana      width={20} height={20} /> },
  { label: 'Polygon (MATIC)',    icon: <Polygon     width={20} height={20} /> },
];

export const Playground = {
  args: {
    size:        'medium',
    placeholder: 'Select a coin',
    disabled:    false,
    error:       false,
    errorText:   'Please select a valid coin.',
    showLabel:   true,
    label:       'Coin',
    required:    false,
    hintText:    'Select your preferred cryptocurrency.',
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
        <SelectCoin
          {...args}
          value={value}
          coinIcon={selectedIcon ?? undefined}
          isOpen={isOpen}
          onClick={() => setIsOpen((o) => !o)}
        >
          {PLAYGROUND_COIN_OPTIONS.map(({ label, icon }) => (
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
        </SelectCoin>
      </div>
    );
  },
};

// ── Default (CryptoCoin placeholder) ─────────────────────────────────────────
export const Default = {
  name: 'Default (CryptoCoin)',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectCoin
        size="medium"
        label="Coin"
        placeholder="Select a coin"
        hintText="Select your preferred cryptocurrency."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default/placeholder state: CryptoCoin generic icon from Icon System. ' +
          'CryptoCoin is the Figma ↳coin default icon (`"crypto-coin"` INSTANCE name).',
      },
    },
  },
};

// ── Filled ────────────────────────────────────────────────────────────────────
export const Filled = {
  name: 'Filled',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectCoin
        size="medium"
        label="Coin"
        value="Bitcoin"
        placeholder="Select a coin"
        hintText="Select your preferred cryptocurrency."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Filled state: pass `coinIcon` with a specific coin asset (e.g. `<Bitcoin />` from `src/assets/coins/`). ' +
          'Shown here without a custom `coinIcon` — CryptoCoin remains as the icon. ' +
          'In production, swap to the selected coin\'s own asset.',
      },
    },
  },
};

// Coin options for static Open story — real assets where available.
// Polkadot was not in scope for Figma extraction; CryptoCoin remains for it.
const COIN_OPTIONS = [
  { label: 'Bitcoin',  icon: <Bitcoin     width={20} height={20} /> },
  { label: 'Ethereum', icon: <Ethereum    width={20} height={20} /> },
  { label: 'Solana',   icon: <Solana      width={20} height={20} /> },
  { label: 'Cardano',  icon: <Cardano     width={20} height={20} /> },
  { label: 'Polkadot', icon: <CryptoCoin  width={20} height={20} /> },
  { label: 'Polygon',  icon: <Polygon     width={20} height={20} /> },
];

// ── Open (controlled) — C-01 ─────────────────────────────────────────────────
export const Open = {
  name: 'Open — C-01: muted text',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectCoin
        size="medium"
        label="Coin"
        isOpen={true}
        placeholder="Select a coin"
        hintText="Select your preferred cryptocurrency."
      >
        {COIN_OPTIONS.map(({ label, icon }) => (
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
      </SelectCoin>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**DS gap C-01 (as-designed):** Open state text remains `color-text-muted` (placeholder color), ' +
          'not `color-text-strong` (filled color) as in SelectBasic. ' +
          'Implemented via `.select-coin.select-basic--open .select-basic__trigger` (specificity 0,3,0) ' +
          'overriding SelectBasic\'s 0,2,0 rule.',
      },
    },
  },
};

// ── Error — C-01 ─────────────────────────────────────────────────────────────
export const ErrorState = {
  name: 'Error — C-01: muted text',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectCoin
        size="medium"
        label="Coin"
        error
        required
        placeholder="Select a coin"
        errorText="Please select a valid coin."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**DS gap C-01 (as-designed):** Error state text also remains `color-text-muted`. ' +
          'Only border-color changes to `select-coin/border/error` (danger color). ' +
          'Box-shadow from SelectBasic\'s base error rule is not overridden — it propagates correctly.',
      },
    },
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  render: () => (
    <div style={{ width: 300 }}>
      <SelectCoin
        size="medium"
        label="Coin"
        disabled
        value="Bitcoin"
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
          <SelectCoin size={size} placeholder="Select a coin" showLabel={false} showHint={false} />
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
        { label: 'Default',         props: { placeholder: 'Select a coin' } },
        { label: 'Filled',          props: { value: 'Bitcoin', placeholder: 'Select a coin' } },
        { label: 'Open (C-01)',     props: { isOpen: true, placeholder: 'Select a coin' } },
        { label: 'Error (C-01)',    props: { error: true, required: true, placeholder: 'Select a coin', errorText: 'Select a valid coin.' } },
        { label: 'Disabled',        props: { disabled: true, placeholder: 'Select a coin' } },
        { label: 'Disabled Filled', props: { disabled: true, value: 'Bitcoin' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={LABEL_STYLE}>{label}</div>
          <SelectCoin size="medium" showLabel={false} showHint={false} {...props} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Note C-01 labels on Open and Error states — these intentionally show muted text color, ' +
          'matching the Figma-defined behavior for SelectCoin.',
      },
    },
  },
};

// ── Custom Coin Icon ──────────────────────────────────────────────────────────
export const CustomCoinIcon = {
  name: 'With Custom Coin Icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <div>
        <div style={LABEL_STYLE}>Default: CryptoCoin (generic placeholder)</div>
        <SelectCoin size="medium" placeholder="Select a coin" showLabel={false} showHint={false} />
      </div>
      <div>
        <div style={LABEL_STYLE}>With coinIcon: custom icon (CryptoCoin shown)</div>
        <SelectCoin
          size="medium"
          coinIcon={<CryptoCoin width={20} height={20} />}
          value="Bitcoin"
          placeholder="Select a coin"
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
          'Pass `coinIcon` with a specific coin asset (e.g. `<Bitcoin />`, `<Ethereum />` from `src/assets/coins/`) ' +
          'to replace the CryptoCoin generic placeholder when a coin is selected. ' +
          'Shown here with CryptoCoin in both slots for visual comparison of the pattern.',
      },
    },
  },
};
