import React from 'react';
import SelectBasic from './SelectBasic.jsx';
import CryptoCoin from '../../icons/CryptoCoin.jsx';
import './SelectCoin.css';

/**
 * SelectCoin — ↳coin trigger component
 *
 * Figma ComponentSet: 2175:29967 · Page: ❖ Select Field
 * Design System Scalable V.2.1.0
 * Token namespace: select-coin/* (15 L3 vars)
 *
 * 18 variants = 6 states × 3 sizes (no Type axis — always has left icon)
 * States: Default · Filled · Hover · Open · Disabled · Error
 * Sizes:  Medium (40px) · Small (36px) · X-Small (32px)
 *
 * Anatomy: composes SelectBasic, adds CryptoCoin as default left icon +
 * select-coin/* token namespace. All layout, spacing, and state logic
 * delegates to SelectBasic.
 *
 * Figma left icon INSTANCE: "crypto-coin" → CryptoCoin (Icon System, 20×20).
 * Consumer passes `coinIcon` with a specific coin asset (e.g. <Bitcoin />) when
 * a coin is selected. CryptoCoin.jsx is the generic placeholder — do NOT use
 * CoinPlaceholder.jsx (node 21:4686 is a credit card asset, not a coin).
 *
 * ⚠️ DS gap C-01 — implemented as-designed:
 *   Figma ↳coin Open and Error states bind text to select-coin/text/placeholder
 *   (color-text-muted) instead of select-coin/text/filled (color-text-strong).
 *   This differs from SelectBasic which uses text/filled in Open/Error.
 *   SelectCoin.css overrides --_sb-text to maintain Figma fidelity.
 *
 * Padding (Figma-confirmed, same as SelectBasic):
 *   Medium:  L=12, R=10, V=10, gap=8, radius=10
 *   Small:   L=10, R=8,  V=8,  gap=8, radius=8
 *   X-Small: L=8,  R=6,  V=6,  gap=6, radius=8
 *
 * Reuse: SelectBasic (layout, state, a11y), CryptoCoin (Icon System, default), LabelKey,
 *   HintText, DropdownList. Consumer-supplied coin assets in src/assets/coins/
 *   (exported from Figma Assets V.2.0.0).
 *
 * @param {ReactNode} [coinIcon]          — Specific coin asset (e.g. <Bitcoin />) when selected.
 *                                          Defaults to <CryptoCoin /> (generic coin placeholder).
 * @param {string}    [size='medium']     — 'medium' | 'small' | 'x-small'
 * @param {string}    [value='']          — Selected value (empty = placeholder state)
 * @param {string}    [placeholder]       — Placeholder text
 * @param {boolean}   [disabled=false]    — Disabled state
 * @param {boolean}   [error=false]       — Error state
 * @param {string}    [errorText]         — Error message shown in HintText
 * @param {string}    [label='Label']     — Label text (forwarded to LabelKey)
 * @param {boolean}   [showLabel=true]    — Render LabelKey row
 * @param {boolean}   [required=false]    — Required asterisk on label
 * @param {boolean}   [optional=false]    — "(Optional)" sublabel on label
 * @param {string}    [sublabel]          — Sublabel text override
 * @param {boolean}   [showInfo=false]    — Info icon on label
 * @param {boolean}   [showHelp=false]    — Help link on label
 * @param {string}    [helpText]          — Help link text
 * @param {string}    [helpHref]          — Help link href
 * @param {string}    [hintText]          — Hint message below trigger
 * @param {boolean}   [showHint=true]     — Render HintText when message present
 * @param {boolean}   [showLeftIcon=true] — Show the left icon slot
 * @param {boolean}   [isOpen]            — Controlled open state
 * @param {Function}  [onClick]           — Trigger activation callback
 * @param {Function}  [onFocus]           — Focus callback
 * @param {Function}  [onBlur]            — Blur callback
 * @param {string}    [id]                — id on trigger button
 * @param {string}    [name]              — name attribute
 * @param {string}    [aria-label]        — aria-label
 * @param {string}    [aria-labelledby]   — aria-labelledby
 * @param {string}    [aria-describedby]  — Additional aria-describedby id(s)
 * @param {ReactNode} [children]          — <DropdownOption> elements for the dropdown panel
 * @param {string}    [searchValue]       — Controlled search value in DropdownList
 * @param {Function}  [onSearch]          — Search change handler
 * @param {string}    [className]         — Additional class on root element
 */
export default function SelectCoin({
  coinIcon,
  className = '',
  ...props
}) {
  const leftIcon = coinIcon ?? <CryptoCoin width={20} height={20} />;
  return (
    <SelectBasic
      {...props}
      leftIcon={leftIcon}
      className={['select-coin', className].filter(Boolean).join(' ')}
    />
  );
}
