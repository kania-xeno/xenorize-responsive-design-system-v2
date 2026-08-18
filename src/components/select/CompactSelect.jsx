import React, { useId, useState } from 'react';
import ChevronDownSmall from '../../icons/ChevronDownSmall.jsx';
import ChevronTopSmall from '../../icons/ChevronTopSmall.jsx';
import './CompactSelect.css';

/**
 * CompactSelect — ↳compact-select trigger component
 *
 * Figma ComponentSet: 2174:4038 · Page: ❖ Select Field
 * Design System Scalable V.2.1.0
 * Token namespace: compact-select/* (shared with ↳compact-select-for-input)
 *
 * 54 variants = 3 types × 6 states × 3 sizes
 * Types:  Icon (swappable left icon) · Country (flag left icon) · Basic (no left icon)
 * States: Placeholder · Filled · Hover · Open · Error · Disabled
 * Sizes:  Medium (40px) · Small (36px) · X-Small (32px)
 *
 * Anatomy (horizontal auto layout, hug-content width):
 *   [Left icon slot — optional, 20×20 Icon System or flag/asset component]
 *   [Value / Placeholder text]
 *   [Chevron icon — fixed, ChevronDownSmall/ChevronTopSmall, 20×20]
 *
 * Type axis (Figma: 💠 Icon · 🌍 Country · 📂 Basic):
 *   type='icon'    + leftIcon → Icon layout    (xs L=6  | md L=10, sm L=8)
 *   type='country' + leftIcon → Country layout (xs L=8  | md L=10, sm L=8)
 *   type='basic'  / no leftIcon → Basic layout (xs L=10 | md L=12, sm L=12)
 *   Medium and Small padding is identical for Icon and Country types.
 *
 * Filled and Placeholder share identical token bindings — no CSS modifier
 * needed for Filled. State `isFilled` only controls text content display.
 *
 * No LabelKey. No HintText. This is a standalone trigger primitive.
 * Dropdown rendering is the parent's responsibility.
 *
 * DS gaps carried forward (non-blocking):
 *   compact-select/text/default not bound to text layers in Icon/Country type
 *   Figma variants. Code correctly uses the token per docs §15.
 *
 *   X-Small gap: Figma shows 2px; OQ9 binding map says spacing/4 (4px).
 *   Figma is source of truth — implemented as 2px.
 *
 * @param {string}    [size='medium']              — 'medium' | 'small' | 'x-small'
 * @param {'icon'|'country'|'basic'} [type='icon'] — Figma Type axis (💠 Icon · 🌍 Country · 📂 Basic).
 *                                                    Affects X-Small left padding only (Icon=6px, Country=8px, Basic=10px).
 *                                                    Medium and Small padding is type-invariant for Icon/Country.
 * @param {string}    [value='']            — Currently selected value (empty = placeholder state)
 * @param {string}    [placeholder='48']    — Placeholder text when no value selected
 * @param {boolean}   [disabled=false]      — Disabled state
 * @param {boolean}   [error=false]         — Error state
 * @param {ReactNode} [leftIcon]            — Left icon or flag component (20×20). Absent = Basic layout.
 * @param {boolean}   [isOpen]              — Controlled open state (uncontrolled when omitted)
 * @param {Function}  [onClick]             — Called when trigger is activated
 * @param {Function}  [onFocus]             — Called when trigger gains focus
 * @param {Function}  [onBlur]              — Called when trigger loses focus
 * @param {string}    [id]                  — id on the trigger button (for label association)
 * @param {string}    [name]                — name attribute on trigger for form serialisation
 * @param {string}    [aria-label]          — aria-label (required when no visible label is rendered)
 * @param {string}    [aria-labelledby]     — aria-labelledby when label is external
 * @param {string}    [aria-describedby]    — Additional aria-describedby id(s)
 * @param {string}    [className]           — Additional class on root button element
 */
export default function CompactSelect({
  // Size
  size = 'medium',

  // Type axis (Figma: 💠 Icon · 🌍 Country · 📂 Basic)
  // Controls X-Small left padding only — Medium/Small are type-invariant for Icon/Country.
  type = 'icon',

  // Content
  value = '',
  placeholder = '48',

  // State
  disabled = false,
  error = false,

  // Left icon slot (absent = Basic layout; present = Icon/Country layout)
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
  const triggerId = id || `compact-select-${autoId}`;

  // Uncontrolled open state — defer to isOpenProp when provided
  const [openInternal, setOpenInternal] = useState(false);
  const isOpen = isOpenProp !== undefined ? isOpenProp : openInternal;

  const isFilled = value.length > 0;

  // ── Size → CSS suffix ──────────────────────────────────────────────────────
  const sizeClass = {
    medium:    'compact-select--md',
    small:     'compact-select--sm',
    'x-small': 'compact-select--xs',
  }[size] ?? 'compact-select--md';

  // ── Root class ────────────────────────────────────────────────────────────
  const rootClass = [
    'compact-select',
    sizeClass,
    leftIcon              ? 'compact-select--has-icon'  : '',
    // Country adds X-Small left padding override (8px) over Icon's 6px — Figma-confirmed.
    // Modifier is only meaningful when leftIcon is present; no-op otherwise.
    type === 'country'    ? 'compact-select--country'   : '',
    isOpen                ? 'compact-select--open'       : '',
    error && !disabled    ? 'compact-select--error'      : '',
    disabled              ? 'compact-select--disabled'   : '',
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

  // Root element is the trigger button — compact-select has no LabelKey/HintText wrapper
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
      aria-invalid={error || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {/* Left icon slot — Icon System icon or flag/asset component, 20×20 */}
      {leftIcon && (
        <span className="compact-select__icon-left" aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {/* Value / Placeholder text */}
      <span className="compact-select__text">
        {isFilled ? value : placeholder}
      </span>

      {/* Right chevron — fixed, not swappable */}
      <span className="compact-select__icon-chevron" aria-hidden="true">
        {isOpen
          ? <ChevronTopSmall  width={20} height={20} />
          : <ChevronDownSmall width={20} height={20} />
        }
      </span>
    </button>
  );
}
