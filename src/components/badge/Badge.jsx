import React from 'react';
import BubbleAlert from '../../icons/BubbleAlert.jsx';
import './Badge.css';

// ─────────────────────────────────────────────────────────────────────────────
// Badge — display-only label component
// Figma source: Design System Scalable V.2.1.0 → ❖ badge (2008:2857)
// DS version: v2.1.0
//
// Badge is NOT interactive — no click, focus, hover, or keyboard behavior.
// Do not add onClick, onKeyDown, tabIndex, role="button", or focus rings.
// ─────────────────────────────────────────────────────────────────────────────

export default function Badge({
  // Type — controls layout and anatomy
  type = 'basic',      // 'basic' | 'dot' | 'left-icon' | 'right-icon'

  // Style — controls fill / border treatment
  badgeStyle = 'filled', // 'filled' | 'light' | 'lighter' | 'stroke'

  // Color — semantic color variant (9 approved colors)
  color = 'gray',      // 'gray' | 'blue' | 'orange' | 'red' | 'green' | 'purple' | 'sky' | 'pink' | 'teal'

  // Size — controls height and padding
  size = 'small',      // 'small' | 'medium'

  // Content
  label = 'Badge',     // Text label for basic / dot / left-icon / right-icon types
  number = null,       // String — when provided, activates Number=On (basic type only). Replaces label.

  // Icon — instance swap equivalent (must be from Icon System V.2.0.0)
  icon: IconComponent = BubbleAlert,
  showIcon = true,     // Show/hide the icon slot

  // State
  disabled = false,    // Disabled uses stroke-style tokens — no dedicated namespace

  className = '',
}) {
  // Disabled state reuses stroke-style tokens visually.
  // We pass 'stroke' as the resolved style so CSS data attributes apply the right tokens.
  const resolvedStyle = disabled ? 'stroke' : badgeStyle;

  const rootClass = [
    'badge',
    `badge--${type}`,
    `badge--${size}`,
    disabled ? 'badge--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  // Number=On: renders a numeric count label, basic type only.
  // Typography: same text style as label for its size (micro/regular small, caption/regular medium).
  const isNumber = number !== null && type === 'basic';

  // Icon rendering — only for left-icon and right-icon types.
  const iconEl = showIcon && IconComponent
    ? <span className="badge__icon" aria-hidden="true"><IconComponent /></span>
    : null;

  return (
    <span
      className={rootClass}
      data-color={color}
      data-style={resolvedStyle}
      aria-hidden={undefined}
    >
      {/* Left Icon type */}
      {type === 'left-icon' && iconEl}

      {/* Dot type */}
      {type === 'dot' && (
        <span className="badge__dot-container" aria-hidden="true">
          <span className="badge__dot" />
        </span>
      )}

      {/* Label / Number */}
      {isNumber
        ? <span className="badge__number">{number}</span>
        : <span className="badge__label">{label}</span>
      }

      {/* Right Icon type */}
      {type === 'right-icon' && iconEl}
    </span>
  );
}
