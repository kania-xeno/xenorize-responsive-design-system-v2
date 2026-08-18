import React, { useId, useState } from 'react';
import LabelKey from '../key-component/LabelKey.jsx';
import HintText from '../key-component/HintText.jsx';
import DropdownList from '../dropdown/DropdownList.jsx';
import ChevronDownSmall from '../../icons/ChevronDownSmall.jsx';
import ChevronTopSmall from '../../icons/ChevronTopSmall.jsx';
import './SelectBasic.css';

/**
 * SelectBasic — ↳basic trigger component
 *
 * Figma ComponentSet: 2174:17255 · Page: ❖ Select Field
 * Design System Scalable V.2.1.0
 * Token namespace: select-basic/* (15 L3 vars, Phase 1)
 *
 * 18 variants = 6 states × 3 sizes
 * States:  Default · Hover · Open · Filled · Disabled · Error
 * Sizes:   Medium (40px) · Small (36px) · X-Small (32px)
 *
 * Anatomy (vertical Auto Layout, 100% wide, gap=4):
 *   LabelKey  (optional — ↳label-key)
 *   Trigger button (role="combobox", aria-haspopup="listbox")
 *     ├─ Left icon slot (optional — Icon System component, 20×20)
 *     ├─ Value / Placeholder text (fills remaining width)
 *     └─ Chevron icon (fixed — ChevronDownSmall/ChevronTopSmall)
 *   HintText  (optional — ↳hint-text)
 *   DropdownList (conditional — rendered as last child when isOpen=true)
 *     └─ children (<DropdownOption> elements) — provided by consumer
 *
 * Open state:
 *   When isOpen=true the component renders <DropdownList> as a direct
 *   sibling below HintText, matching the Figma Open-state hierarchy
 *   (Figma node 2174:17255 — dropdown-list INSTANCE visible:true, last
 *   child of the Open variant frame). The trigger's aria-controls is
 *   wired to the listbox id only while the panel is mounted.
 *
 *   DropdownList always uses height="fixed" — Figma Open state shows
 *   ↳search visible with no component property to suppress it.
 *   Pass searchValue/onSearch for controlled search; omit for uncontrolled.
 *
 * Nested DS components: LabelKey · HintText · DropdownList
 *   — do NOT re-implement their tokens or markup inside SelectBasic.
 * ↳badge layer exists in Figma as a permanently hidden structural slot
 *   (visible:false in all 18 variants including Open). Not exposed as a prop.
 *
 * DS issues carried forward (non-blocking):
 *   S-04 — icon/dissabled typo in global theme token (→ --select-basic-icon-disabled emits correct CSS)
 *   S-05 — left icon uses compact-select/icon/default in Figma; DT uses select-basic/icon/default
 *
 * @param {string}    [size='medium']       — 'medium' | 'small' | 'x-small'
 * @param {string}    [value='']            — Currently selected value (empty = placeholder state)
 * @param {string}    [placeholder]         — Placeholder text when no value selected
 * @param {boolean}   [disabled=false]      — Disabled state
 * @param {boolean}   [error=false]         — Error state
 * @param {string}    [errorText]           — Error message shown in HintText when error=true
 * @param {string}    [label='Label']       — Label text (forwarded to LabelKey)
 * @param {boolean}   [showLabel=true]      — Render the LabelKey row
 * @param {boolean}   [required=false]      — Show required asterisk on label
 * @param {boolean}   [optional=false]      — Show "(Optional)" sublabel on label
 * @param {string}    [sublabel]            — Sublabel text override, default "(Optional)"
 * @param {boolean}   [showInfo=false]      — Show info icon on label (forwarded to LabelKey)
 * @param {boolean}   [showHelp=false]      — Show help link on label (forwarded to LabelKey)
 * @param {string}    [helpText]            — Help link text (forwarded to LabelKey)
 * @param {string}    [helpHref]            — Help link href (forwarded to LabelKey)
 * @param {string}    [hintText]            — Hint message shown below trigger
 * @param {boolean}   [showHint=true]       — Render HintText when a message is present
 * @param {ReactNode} [leftIcon]            — Optional left icon (Icon System component, 20×20)
 * @param {boolean}   [showLeftIcon=true]   — Show the left icon when leftIcon is provided
 * @param {boolean}   [isOpen]              — Controlled open state (uncontrolled when omitted)
 * @param {Function}  [onClick]             — Called when the trigger is activated
 * @param {Function}  [onFocus]             — Called when the trigger gains focus
 * @param {Function}  [onBlur]              — Called when the trigger loses focus
 * @param {string}    [id]                  — id on the trigger button (for label association)
 * @param {string}    [name]                — name attribute on trigger for form serialisation
 * @param {string}    [aria-label]          — aria-label when no visible label is rendered
 * @param {string}    [aria-labelledby]     — aria-labelledby when label is external
 * @param {string}    [aria-describedby]    — Additional aria-describedby id(s)
 * @param {string}    [className]           — Additional class on root wrapper
 *
 * Dropdown panel (Open state — rendered by DropdownList when isOpen=true):
 * @param {ReactNode} [children]            — <DropdownOption> elements for the dropdown panel
 * @param {string}    [searchValue]         — Controlled value for the search input inside DropdownList
 * @param {Function}  [onSearch]            — onChange handler for the search input inside DropdownList
 */
export default function SelectBasic({
  // Size
  size = 'medium',

  // Content
  value = '',
  placeholder = 'Placeholder text...',
  label = 'Label',
  hintText = '',
  errorText = '',

  // State
  disabled = false,
  error = false,

  // Label row
  showLabel = true,
  required = false,
  optional = false,
  sublabel = '(Optional)',
  showInfo = false,
  showHelp = false,
  helpText = 'Help?',
  helpHref,

  // Hint row
  showHint = true,

  // Left icon slot
  leftIcon,
  showLeftIcon = true,

  // Controlled open state
  isOpen: isOpenProp,

  // Dropdown panel (forwarded to DropdownList when isOpen=true)
  children,
  searchValue,
  onSearch,

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
  const triggerId = id || `select-basic-${autoId}`;
  const hintId    = `${triggerId}-hint`;
  const listboxId = `${triggerId}-listbox`;

  // Uncontrolled open state — defer to isOpenProp when provided
  const [openInternal, setOpenInternal] = useState(false);
  const isOpen = isOpenProp !== undefined ? isOpenProp : openInternal;

  const isFilled = value.length > 0;

  // ── Size → CSS suffix ──────────────────────────────────────────────────────
  const sizeClass = {
    medium:  'select-basic--md',
    small:   'select-basic--sm',
    'x-small': 'select-basic--xs',
  }[size] ?? 'select-basic--md';

  // ── Hint/error message resolution ─────────────────────────────────────────
  // errorText overrides hintText when error=true (per usage spec §3)
  const resolvedHint = error && errorText ? errorText : hintText;
  const resolvedHintState = disabled ? 'disabled' : error ? 'error' : 'default';

  // ── Describedby wiring ────────────────────────────────────────────────────
  const hintVisible = showHint && resolvedHint;
  const resolvedDescribedBy = [
    hintVisible ? hintId : null,
    ariaDescribedBy || null,
  ].filter(Boolean).join(' ') || undefined;

  // ── Root class ────────────────────────────────────────────────────────────
  const rootClass = [
    'select-basic',
    sizeClass,
    isOpen               ? 'select-basic--open'     : '',
    isFilled && !isOpen  ? 'select-basic--filled'   : '',
    disabled             ? 'select-basic--disabled' : '',
    error && !disabled   ? 'select-basic--error'    : '',
    className,
  ].filter(Boolean).join(' ');

  // ── Trigger interaction ───────────────────────────────────────────────────
  function handleClick(e) {
    if (disabled) return;
    const next = !isOpen;
    if (isOpenProp === undefined) setOpenInternal(next);
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
    <div className={rootClass}>

      {/* ── Label row ── */}
      {showLabel && (
        <LabelKey
          label={label}
          state={disabled ? 'disabled' : 'normal'}
          showRequired={required}
          showSublabel={optional}
          sublabel={sublabel}
          showInfo={showInfo}
          showHelp={showHelp}
          helpText={helpText}
          helpHref={helpHref}
        />
      )}

      {/* ── Trigger button ── */}
      <button
        type="button"
        id={triggerId}
        name={name}
        className="select-basic__trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-disabled={disabled || undefined}
        aria-invalid={error || undefined}
        aria-required={required || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={resolvedDescribedBy}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {/* Left icon — optional, 20×20, stroke="currentColor" via --_sb-icon */}
        {leftIcon && showLeftIcon && (
          <span className="select-basic__icon-left" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Value / Placeholder text — fills remaining space */}
        <span className="select-basic__text">
          {isFilled ? value : placeholder}
        </span>

        {/* Right chevron — fixed, not swappable. Rotates on open. */}
        <span className="select-basic__icon-chevron" aria-hidden="true">
          {isOpen
            ? <ChevronTopSmall  width={20} height={20} />
            : <ChevronDownSmall width={20} height={20} />
          }
        </span>
      </button>

      {/* ── Hint / Error text ── */}
      {hintVisible && (
        <HintText
          message={resolvedHint}
          state={resolvedHintState}
          id={hintId}
        />
      )}

      {/* ── Dropdown panel ──
           Figma: dropdown-list INSTANCE, visible:true, last child of Open variant frame.
           Renders only when isOpen=true. Reuses existing DropdownList from the repo.
           ↳search (SearchInput) is handled internally by DropdownList (height="fixed").
           Children are <DropdownOption> elements provided by the consumer.           */}
      {isOpen && (
        <DropdownList
          id={listboxId}
          height="fixed"
          aria-labelledby={triggerId}
          searchValue={searchValue}
          onSearch={onSearch}
        >
          {children}
        </DropdownList>
      )}

    </div>
  );
}
