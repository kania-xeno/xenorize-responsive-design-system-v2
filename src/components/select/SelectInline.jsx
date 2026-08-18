import React, { useId, useState } from 'react';
import Globe from '../../icons/Globe.jsx';
import Singapore from '../../assets/flags/Singapore.jsx';
import ChevronDownSmall from '../../icons/ChevronDownSmall.jsx';
import ChevronTopSmall from '../../icons/ChevronTopSmall.jsx';
import './SelectInline.css';

/**
 * SelectInline — ↳inline-select trigger component
 *
 * Figma ComponentSet: 2174:4316 · Page: ❖ Select Field
 * Design System Scalable V.2.1.0
 * Token namespace: inline-select/* (11 L3 vars)
 *
 * 8 variants = 2 types × 4 states (no Size axis)
 * Types:  💠 Icon  (Globe default left icon,     outer gap=4)
 *         🌍 Country (Singapore default left icon, outer gap=6)
 * States: Default · Hover · Open · Disabled
 *         (No Filled, Error, Placeholder states — not in Figma ComponentSet)
 *
 * Anatomy (horizontal auto layout, hug-content, NO border/background):
 *   [Left icon slot — 20×20]
 *   [Text + chevron sub-frame — inner flex, gap=2]
 *     [Value text]
 *     [Chevron icon — ChevronDownSmall/ChevronTopSmall, 20×20]
 *
 * Standalone component — does NOT wrap SelectBasic (different anatomy:
 * no full-field layout, no LabelKey, no HintText, no DropdownList,
 * no border, no background, no size axis).
 *
 * Token design:
 *   Left icon and text use --_is-icon / --_is-text.
 *   Chevron has its own separate token: --_is-chevron.
 *   Default state: chevron = icon/sub (muted); Hover/Open: chevron = icon/strong.
 *   Text token has type-specific names in tokens.css (text-default-icon vs
 *   text-default-country) even though both resolve to color-text-strong.
 *   Default state sets the type-specific token; all other states use shared tokens.
 *
 * Figma left icons:
 *   Type=Icon:    "globus, map, earth, globe" → Globe (Icon System)
 *   Type=Country: "Singapore" → Singapore flag (assets/flags/)
 *
 * Figma outer itemSpacing (gap between icon and text-group sub-frame):
 *   Icon type:    4px (Figma-confirmed)
 *   Country type: 6px (Figma-confirmed)
 * Figma inner itemSpacing (gap between text and chevron):
 *   All variants: 2px (Figma-confirmed)
 *
 * Dropdown rendering: this component is a trigger only. Dropdown panel
 * is the parent/consumer's responsibility (same as CompactSelect pattern).
 *
 * @param {'icon'|'country'} [type='icon']  — Type axis. 'icon' = Globe; 'country' = Singapore flag.
 * @param {string}    [value='']             — Currently selected value (displayed as text)
 * @param {string}    [placeholder='Select'] — Fallback text when no value is set
 * @param {boolean}   [disabled=false]       — Disabled state
 * @param {ReactNode} [leftIcon]             — Override default left icon (Globe or Singapore)
 * @param {boolean}   [isOpen]               — Controlled open state (uncontrolled when omitted)
 * @param {Function}  [onClick]              — Called when trigger is activated
 * @param {Function}  [onFocus]              — Called when trigger gains focus
 * @param {Function}  [onBlur]              — Called when trigger loses focus
 * @param {string}    [id]                   — id on the trigger button
 * @param {string}    [name]                 — name attribute on trigger
 * @param {string}    [aria-label]           — aria-label (recommended when no visible label)
 * @param {string}    [aria-labelledby]      — aria-labelledby when label is external
 * @param {string}    [aria-describedby]     — Additional aria-describedby id(s)
 * @param {string}    [className]            — Additional class on root button element
 */
export default function SelectInline({
  // Type axis — controls outer gap and default left icon
  type = 'icon',

  // Content
  value = '',
  placeholder = 'Select',

  // State
  disabled = false,

  // Left icon override
  leftIcon,

  // Controlled open state
  isOpen: isOpenProp,

  // Interaction
  onClick,
  onFocus,
  onBlur,

  // Accessibility
  id,
  name,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,

  // Layout
  className = '',
}) {
  const autoId = useId();
  const triggerId = id || `inline-select-${autoId}`;

  // Uncontrolled open state — defer to isOpenProp when provided
  const [openInternal, setOpenInternal] = useState(false);
  const isOpen = isOpenProp !== undefined ? isOpenProp : openInternal;

  const displayValue = value.length > 0 ? value : placeholder;

  // ── Type → default icon and CSS modifier ──────────────────────────────────
  const typeClass = type === 'country' ? 'inline-select--country' : 'inline-select--icon';

  const resolvedLeftIcon = leftIcon ?? (
    type === 'country'
      ? <Singapore width={20} height={20} />
      : <Globe width={20} height={20} />
  );

  // ── Root class ────────────────────────────────────────────────────────────
  const rootClass = [
    'inline-select',
    typeClass,
    isOpen   ? 'inline-select--open'     : '',
    disabled ? 'inline-select--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  // ── Trigger interaction ───────────────────────────────────────────────────
  function handleClick(e) {
    if (disabled) return;
    if (isOpenProp === undefined) setOpenInternal(!isOpen);
    onClick?.(e);
  }

  function handleKeyDown(e) {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick(e);
    }
    if (e.key === 'Escape' && isOpen) {
      if (isOpenProp === undefined) setOpenInternal(false);
    }
  }

  return (
    <button
      type="button"
      id={triggerId}
      name={name}
      className={rootClass}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {/* Left icon — Globe (Icon type) or Singapore flag (Country type), 20×20 */}
      <span className="inline-select__icon-left" aria-hidden="true">
        {resolvedLeftIcon}
      </span>

      {/* Text + chevron sub-frame — inner flex, gap=2 (Figma-confirmed) */}
      <span className="inline-select__text-group">
        <span className="inline-select__text">
          {displayValue}
        </span>
        <span className="inline-select__chevron" aria-hidden="true">
          {isOpen
            ? <ChevronTopSmall  width={20} height={20} />
            : <ChevronDownSmall width={20} height={20} />
          }
        </span>
      </span>
    </button>
  );
}
