import React, { useState } from 'react';
import ButtonGroupItem from './ButtonGroupItem.jsx';
import './ButtonGroup.css';

// ─────────────────────────────────────────────────────────────────────────────
// ButtonGroup — segmented control container
// Figma source: Design System Scalable V.2.1.0 → ↳button-group (2271:7422)
// DS version: v2.1.0
//
// Two-component system: ButtonGroup (container) + ButtonGroupItem (slot).
// Container manages outer border, radius, and overflow clipping.
// Items manage content, state, and internal dividers via 1px all-sides borders.
//
// Quantity: 2–6 items. Do not exceed 6.
// Typically one item is Active at a time (mutually exclusive selection).
//
// Controlled mode:  pass `value` + `onChange`
// Uncontrolled mode: pass `defaultValue` (or omit for no initial selection)
// ─────────────────────────────────────────────────────────────────────────────

export default function ButtonGroup({
  // Item definitions
  items = [],
  // [{
  //   label:     string,
  //   value:     string | number,   // unique identifier
  //   leftIcon:  ReactNode,
  //   rightIcon: ReactNode,
  //   onlyIcon:  boolean,
  //   ariaLabel: string,            // required when onlyIcon=true
  //   disabled:  boolean,
  // }]

  // Size applies uniformly to all items
  size = 'small',               // 'small' | 'x-small' | '2x-small'

  // Controlled
  value        = undefined,     // active item value (controlled)
  onChange     = null,          // (value) => void (controlled)

  // Uncontrolled
  defaultValue = undefined,     // initial active item value

  // Container
  'aria-label': ariaLabel = 'Options',
  className = '',
}) {
  // Internal state — only used in uncontrolled mode
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled   = value !== undefined;
  const activeValue    = isControlled ? value : internalValue;

  const handleItemClick = (itemValue) => {
    if (!isControlled) {
      setInternalValue(itemValue);
    }
    if (onChange) onChange(itemValue);
  };

  const sizeClass = {
    'small':    'button-group--small',
    'x-small':  'button-group--x-small',
    '2x-small': 'button-group--2x-small',
  }[size] || 'button-group--small';

  return (
    <div
      className={['button-group', sizeClass, className].filter(Boolean).join(' ')}
      role="group"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const isActive   = item.value === activeValue;
        const isDisabled = item.disabled === true;
        const itemState  = isDisabled ? 'disabled' : isActive ? 'active' : 'default';

        return (
          <ButtonGroupItem
            key={item.value}
            label={item.label}
            size={size}
            state={itemState}
            onlyIcon={item.onlyIcon}
            leftIcon={item.leftIcon}
            rightIcon={item.rightIcon}
            aria-label={item.ariaLabel}
            onClick={() => !isDisabled && handleItemClick(item.value)}
          />
        );
      })}
    </div>
  );
}
