import React from 'react';
import SelectBasic from './SelectBasic.jsx';
import Upbit from '../../assets/exchanges/Upbit.jsx';
import './SelectExchange.css';

/**
 * SelectExchange — ↳exchange trigger component
 *
 * Figma ComponentSet: 2176:35457 · Page: ❖ Select Field
 * Design System Scalable V.2.1.0
 * Token namespace: select-exchange/* (15 L3 vars)
 *
 * 18 variants = 6 states × 3 sizes (no Type axis — always has left icon)
 * States: Default · Filled · Hover · Open · Disabled · Error
 * Sizes:  Medium (40px) · Small (36px) · X-Small (32px)
 *
 * Anatomy: composes SelectBasic, adds Upbit as default left icon +
 * select-exchange/* token namespace. All layout, spacing, and state logic
 * delegates to SelectBasic.
 *
 * Figma left icon INSTANCE: "icn-exchange-Upbit Symbol" → Upbit asset (20×20).
 * Consumer passes `exchangeIcon` with a specific exchange logo when a different
 * exchange is selected.
 *
 * ⚠️ DS gap C-01 — implemented as-designed:
 *   Figma ↳exchange Open and Error states bind text to select-exchange/text/placeholder
 *   (color-text-muted) instead of select-exchange/text/filled (color-text-strong).
 *   This differs from SelectBasic which uses text/filled in Open/Error.
 *   SelectExchange.css overrides --_sb-text to maintain Figma fidelity.
 *
 * Padding (Figma-confirmed, same as SelectBasic):
 *   Medium:  L=12, R=10, V=10, gap=8, radius=10
 *   Small:   L=10, R=8,  V=8,  gap=8, radius=8
 *   X-Small: L=8,  R=6,  V=6,  gap=6, radius=8
 *
 * Reuse: SelectBasic (layout, state, a11y), Upbit (src/assets/exchanges/, default), LabelKey,
 *   HintText, DropdownList. Consumer-supplied exchange assets in src/assets/exchanges/
 *   (exported from Figma Assets V.2.0.0).
 *
 * @param {ReactNode} [exchangeIcon]      — Specific exchange logo (e.g. <Binance />) when selected.
 *                                          Defaults to <Upbit /> (representative exchange).
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
export default function SelectExchange({
  exchangeIcon,
  className = '',
  ...props
}) {
  const leftIcon = exchangeIcon ?? <Upbit width={20} height={20} />;
  return (
    <SelectBasic
      {...props}
      leftIcon={leftIcon}
      className={['select-exchange', className].filter(Boolean).join(' ')}
    />
  );
}
