import React from 'react';
import './Breadcrumb.css';

/**
 * BreadcrumbItem — ↳items-breadcrumb
 * Figma node set: 2177:41698
 * Design System Scalable V.2.1.0
 *
 * Renders an individual breadcrumb slot: icon, label, or both.
 * State (Default/Active) controls label + icon token selection.
 *
 * V1 scope: Default + Active only.
 * No Hover, Disabled, or Focus states — not defined in Figma V1.
 */
export default function BreadcrumbItem({
  /** Visible label text. Required when showText=true. */
  label = '',
  /** State controls token selection (text + icon color). */
  state = 'default', // 'default' | 'active'
  /** Show the icon slot. */
  showIcon = false,
  /** Show the text label. */
  showText = true,
  /**
   * Icon component. Must accept className and style props.
   * Color is applied via currentColor at the path level.
   * Required when showIcon=true.
   */
  icon = null,
  /**
   * Accessible label. Required when showIcon=true and showText=false.
   * Silently applied to the wrapper span as aria-label.
   */
  ariaLabel = '',
  className = '',
  ...rest
}) {
  const isActive = state === 'active';

  // Icon-only or text-only → gap 8px; icon+text → gap 6px (Figma Auto Layout)
  const hasGap = showIcon && showText;

  const wrapperClass = [
    'breadcrumb-item',
    isActive ? 'breadcrumb-item--active' : 'breadcrumb-item--default',
    !hasGap && showIcon && !showText ? 'breadcrumb-item--icon-only' : '',
    !hasGap && showText && !showIcon ? 'breadcrumb-item--text-only' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // aria-label only when icon-only (no visible label)
  const labelAttr =
    showIcon && !showText && ariaLabel ? { 'aria-label': ariaLabel } : {};

  return (
    <span className={wrapperClass} {...labelAttr} {...rest}>
      {showIcon && icon && (
        <span
          className="breadcrumb-item__icon"
          aria-hidden={showText ? 'true' : undefined}
        >
          {icon}
        </span>
      )}
      {showText && label && (
        <span className="breadcrumb-item__label">{label}</span>
      )}
    </span>
  );
}
