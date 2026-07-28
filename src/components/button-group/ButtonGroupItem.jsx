import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// ButtonGroupItem — individual segmented control item
// Figma source: Design System Scalable V.2.1.0 → ↳button-group-items (2271:7498)
// DS version: v2.1.0
//
// State per item — each item manages its own state independently.
// The container (ButtonGroup) manages which item is active.
//
// Sizes:
//   small    (36) — pad 8/16px, gap 8px, body/medium/md (SemiBold 600, 14px)
//   x-small  (32) — pad 6/14px, gap 6px, body/medium/md (SemiBold 600, 14px)
//   2x-small (24) — pad 4/12px, gap 4px, caption/regular (Regular 400, 12px)
//
// Icon fill applies at the SVG level — not the wrapper — via CSS color.
// ─────────────────────────────────────────────────────────────────────────────

export default function ButtonGroupItem({
  label       = 'Button',        // Visible text — hidden when onlyIcon=true
  size        = 'small',         // 'small' | 'x-small' | '2x-small'
  state       = 'default',       // 'default' | 'hover' | 'active' | 'disabled'
  onlyIcon    = false,           // true → icon-only, label hidden, aria-label required
  leftIcon    = null,            // ReactNode — icon left of label
  rightIcon   = null,            // ReactNode — icon right of label (ignored when onlyIcon)
  onClick     = null,
  'aria-label': ariaLabel = '',  // Required when onlyIcon=true
  className   = '',
}) {
  const isDisabled = state === 'disabled';
  const isActive   = state === 'active';

  const sizeClass = {
    'small':    'button-group-item--small',
    'x-small':  'button-group-item--x-small',
    '2x-small': 'button-group-item--2x-small',
  }[size] || 'button-group-item--small';

  const stateClass = {
    'default':  '',
    'hover':    'button-group-item--hover',
    'active':   'button-group-item--active',
    'disabled': 'button-group-item--disabled',
  }[state] || '';

  const rootClass = [
    'button-group-item',
    sizeClass,
    stateClass,
    onlyIcon ? 'button-group-item--only-icon' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={rootClass}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      aria-pressed={isActive}
      aria-label={onlyIcon ? ariaLabel : undefined}
      tabIndex={isDisabled ? -1 : undefined}
    >
      {/* Left icon — shown when leftIcon or onlyIcon */}
      {(leftIcon || onlyIcon) && (
        <span className="button-group-item__icon button-group-item__icon--left" aria-hidden="true">
          {onlyIcon ? leftIcon : leftIcon}
        </span>
      )}

      {/* Label — hidden when onlyIcon */}
      {!onlyIcon && (
        <span className="button-group-item__label">{label}</span>
      )}

      {/* Right icon — shown only when rightIcon and not onlyIcon */}
      {!onlyIcon && rightIcon && (
        <span className="button-group-item__icon button-group-item__icon--right" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
