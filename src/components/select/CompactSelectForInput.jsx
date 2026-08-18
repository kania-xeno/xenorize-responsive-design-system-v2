import React, { useId, useState } from 'react';
import ChevronDownSmall from '../../icons/ChevronDownSmall.jsx';
import ChevronTopSmall from '../../icons/ChevronTopSmall.jsx';
import './CompactSelectForInput.css';

/**
 * CompactSelectForInput — ↳compact-select-for-input trigger component
 *
 * Figma ComponentSet: 1971:7724 · Page: ❖ Select Field
 * Design System Scalable V.2.1.0
 * Token namespace: compact-select/* (shared with ↳compact-select)
 *
 * 12 variants = 4 states × 3 sizes (no Type axis)
 * States: Default · Hover · Open · Disabled  (no Placeholder / Filled / Error)
 * Sizes:  Medium (40px) · Small (36px) · X-Small (32px)
 *
 * Anatomy (horizontal auto layout):
 *   [Flag/icon slot — optional, 20×20]     ← `🌍 Country` boolean + `🌎 Choose Country` swap
 *   [Text+chevron sub-frame]               ← inner flex container, gap=2
 *     [Value text]
 *     [Chevron icon — ChevronDownSmall/ChevronTopSmall, 20×20]
 *
 * CRITICAL: This component MUST be embedded inside ↳input-text (InputText).
 * It has no border of its own — the parent InputText provides border, background
 * context, and state management. Never use standalone.
 *
 * Reuse: shares the compact-select/* token namespace with CompactSelect.
 * Separate ComponentSet in Figma (different anatomy: sub-frame for text+chevron,
 * gap=8 outer vs gap=4 in compact-select, gap=2 inner). Token reuse only.
 *
 * Token mapping (Figma-confirmed):
 *   Default: bg=compact-select/bg/default
 *   Hover:   bg=compact-select/bg/hover
 *   Open:    bg=compact-select/bg/active  ← NOTE: bg/active not bg/default
 *   Disabled: bg=compact-select/bg/disabled
 *   All non-disabled: text=compact-select/text/default, icon=compact-select/icon/default
 *   Disabled: text=compact-select/text/disabled, icon=compact-select/icon/disabled
 *   No border token on any state — parent InputText provides border.
 *
 * @param {string}    [size='medium']       — 'medium' | 'small' | 'x-small'
 * @param {string}    [value='SGP']         — Currently selected value/code
 * @param {string}    [placeholder='SGP']   — Fallback when no value set
 * @param {boolean}   [disabled=false]      — Disabled state
 * @param {ReactNode} [leftIcon]            — Flag or icon component (20×20)
 * @param {boolean}   [showLeftIcon=true]   — Whether to render the left icon slot
 * @param {boolean}   [isOpen]              — Controlled open state
 * @param {Function}  [onClick]             — Called when trigger is activated
 * @param {Function}  [onFocus]             — Called when trigger gains focus
 * @param {Function}  [onBlur]              — Called when trigger loses focus
 * @param {string}    [id]                  — id on the trigger button
 * @param {string}    [name]                — name attribute
 * @param {string}    [aria-label]          — aria-label (e.g. "Phone country code")
 * @param {string}    [aria-labelledby]     — aria-labelledby when label is external
 * @param {string}    [aria-describedby]    — Additional aria-describedby id(s)
 * @param {string}    [className]           — Additional class on root button element
 */
export default function CompactSelectForInput({
  // Size
  size = 'medium',

  // Content
  value = 'SGP',
  placeholder = 'SGP',

  // State
  disabled = false,

  // Left icon slot (flag or icon component)
  leftIcon,
  showLeftIcon = true,

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
  const triggerId = id || `compact-select-for-input-${autoId}`;

  // Uncontrolled open state — defer to isOpenProp when provided
  const [openInternal, setOpenInternal] = useState(false);
  const isOpen = isOpenProp !== undefined ? isOpenProp : openInternal;

  const displayValue = value.length > 0 ? value : placeholder;

  // ── Size → CSS suffix ──────────────────────────────────────────────────────
  const sizeClass = {
    medium:    'compact-select-for-input--md',
    small:     'compact-select-for-input--sm',
    'x-small': 'compact-select-for-input--xs',
  }[size] ?? 'compact-select-for-input--md';

  // ── Root class ────────────────────────────────────────────────────────────
  const rootClass = [
    'compact-select-for-input',
    sizeClass,
    isOpen   ? 'compact-select-for-input--open'     : '',
    disabled ? 'compact-select-for-input--disabled'  : '',
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
      {/* Flag / icon slot — 20×20 */}
      {leftIcon && showLeftIcon && (
        <span className="compact-select-for-input__icon-left" aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {/* Text + chevron sub-frame — inner flex, gap=2 (Figma: Text sub-frame) */}
      <span className="compact-select-for-input__text-group">
        <span className="compact-select-for-input__text">
          {displayValue}
        </span>
        <span className="compact-select-for-input__icon-chevron" aria-hidden="true">
          {isOpen
            ? <ChevronTopSmall  width={20} height={20} />
            : <ChevronDownSmall width={20} height={20} />
          }
        </span>
      </span>
    </button>
  );
}
