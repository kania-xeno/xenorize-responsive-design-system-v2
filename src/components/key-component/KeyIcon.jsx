import React from 'react';
import './KeyIcon.css';

/**
 * KeyIcon — ↳key-icon
 * Figma node: 2166:306 · Page: ❖ Key Component
 * Design System Scalable V.2.1.0
 * Token collection: VariableCollectionId:1902:2617 (single mode "variable")
 *
 * 90 variants: 2 styles × 9 colors × 5 sizes.
 * Display-only — no hover, focus, or pressed states defined in Figma V1.
 *
 * Icon fill: The wrapper sets `color: var(--key-icon-icon-{color})`.
 * Inner icon SVG uses `currentColor` and inherits the fill automatically.
 * Do NOT set fill directly on the icon — it must come through currentColor.
 *
 * Token chain (icon fill): key-icon/icon/{color} → semantic status token → primitive
 * Token chain (lighter bg): key-icon/lighter/bg/{color} → semantic token → primitive
 * Token chain (stroke):     key-icon/stroke/bg → surface/neutral/white
 *                           key-icon/stroke/border → border/neutral/default (1px)
 */

const COLORS = ['blue', 'gray', 'orange', 'red', 'green', 'yellow', 'purple', 'pink', 'teal'];
const SIZES  = ['2xl', 'xl', 'l', 'm', 's'];
const STYLES = ['stroke', 'lighter'];

export default function KeyIcon({
  /** Visual style. 'stroke' = white bg + 1px border. 'lighter' = color bg, no border. */
  style = 'stroke',
  /** Icon color. Drives both the inner icon fill and (for 'lighter') the background. */
  color = 'gray',
  /** Size variant. Maps to container dimensions: s=32, m=40, l=48, xl=56, 2xl=64px. */
  size = 'm',
  /**
   * Icon element to render inside the container.
   * Any JSX element — typically a DS icon component that uses currentColor.
   * The icon inherits its fill color from the wrapper via currentColor.
   */
  icon = null,
  /** Additional class names on the wrapper. */
  className = '',
  /** aria-label for decorative use: omit or set aria-hidden on the wrapper. */
  'aria-label': ariaLabel,
  ...props
}) {
  const safeStyle = STYLES.includes(style) ? style : 'stroke';
  const safeColor = COLORS.includes(color) ? color : 'gray';
  const safeSize  = SIZES.includes(size)   ? size  : 'm';

  const classes = [
    'key-icon',
    `key-icon--${safeStyle}`,
    `key-icon--${safeColor}`,
    `key-icon--${safeSize}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{ color: `var(--key-icon-icon-${safeColor})` }}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      {...props}
    >
      {icon && (
        <span className="key-icon__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </div>
  );
}
