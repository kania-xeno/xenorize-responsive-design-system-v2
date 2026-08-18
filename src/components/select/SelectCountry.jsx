import React from 'react';
import SelectBasic from './SelectBasic.jsx';
import Globe from '../../icons/Globe.jsx';
import './SelectCountry.css';

/**
 * SelectCountry — ↳country trigger component
 *
 * Figma ComponentSet: 2174:20606 · Page: ❖ Select Field
 * Design System Scalable V.2.1.0
 * Token namespace: select-country/* (15 L3 vars)
 *
 * 18 variants = 6 states × 3 sizes (no Type axis — always has left icon)
 * States: Default · Filled · Hover · Open · Disabled · Error
 * Sizes:  Medium (40px) · Small (36px) · X-Small (32px)
 *
 * Anatomy: composes SelectBasic, adds Globe as default left icon + select-country/*
 * token namespace. All layout, spacing, and state logic delegates to SelectBasic.
 *
 * Figma left icon INSTANCE: "globus, map, earth, globe" → Globe (Icon System, 20×20).
 * Consumer passes `countryIcon` with a specific flag component when a country is selected.
 *
 * Padding (Figma-confirmed, same as SelectBasic):
 *   Medium:  L=12, R=10, V=10, gap=8, radius=10
 *   Small:   L=10, R=8,  V=8,  gap=8, radius=8
 *   X-Small: L=8,  R=6,  V=6,  gap=6, radius=8
 *
 * Token note: select-country/* values are currently identical to select-basic/*.
 * Namespace applied for spec correctness and future divergence isolation.
 *
 * Reuse: SelectBasic (layout, state, a11y), Globe (Icon System, default), LabelKey,
 *   HintText, DropdownList. Consumer-supplied flag assets in src/assets/flags/
 *   (exported from Figma Assets V.2.0.0).
 *
 * @param {ReactNode} [countryIcon]       — Specific flag (e.g. <Singapore />) when selected.
 *                                          Defaults to <Globe /> (generic country placeholder).
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
export default function SelectCountry({
  countryIcon,
  className = '',
  ...props
}) {
  const leftIcon = countryIcon ?? <Globe width={20} height={20} />;
  return (
    <SelectBasic
      {...props}
      leftIcon={leftIcon}
      className={['select-country', className].filter(Boolean).join(' ')}
    />
  );
}
