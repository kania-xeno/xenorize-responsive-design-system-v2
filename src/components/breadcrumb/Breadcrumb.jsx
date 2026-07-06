import React from 'react';
import BreadcrumbItem from './BreadcrumbItem';
import ChevronRightSmall from '../icons/ChevronRightSmall';
import './Breadcrumb.css';

/**
 * Breadcrumb — ↳breadcrumbs-group
 * Figma node set: 2177:41749
 * Design System Scalable V.2.1.0
 *
 * Assembles a navigational trail from an items array.
 * Inserts a divider between every adjacent pair of items.
 *
 * Divider types:
 *   'arrow'  — ChevronRightSmall icon (SVG, stroke=currentColor)
 *   'slash'  — "/" text character
 *   'dot'    — "•" text character
 * All dividers share token --breadcrumb-divider (→ icon/soft).
 *
 * Active state: set items[n].state = 'active' for the current page item.
 * Typically the last item is active; the group does not enforce this.
 *
 * V1 scope: 3–5 items, arrow/slash/dot dividers, default+active state.
 * No Hover, Disabled, Focus states — not defined in Figma V1.
 */
export default function Breadcrumb({
  /**
   * Array of item descriptors.
   * Shape: {
   *   label: string,          // visible text (required when showText=true)
   *   state: 'default'|'active', // defaults to 'default'
   *   showIcon: boolean,      // defaults to false
   *   showText: boolean,      // defaults to true
   *   icon: ReactElement,     // icon to render (when showIcon=true)
   *   ariaLabel: string,      // required when icon-only
   *   href: string,           // optional — wraps item in <a>
   * }
   */
  items = [],
  /** Divider style between items. */
  divider = 'arrow', // 'arrow' | 'slash' | 'dot'
  /** Accessible label for the <nav> landmark. */
  ariaLabel = 'Breadcrumb',
  className = '',
}) {
  const renderDivider = (index) => {
    if (divider === 'arrow') {
      return (
        <span
          key={`divider-${index}`}
          className="breadcrumb__divider breadcrumb__divider--arrow"
          aria-hidden="true"
        >
          <ChevronRightSmall />
        </span>
      );
    }
    const char = divider === 'slash' ? '/' : '•';
    return (
      <span
        key={`divider-${index}`}
        className={`breadcrumb__divider breadcrumb__divider--${divider}`}
        aria-hidden="true"
      >
        {char}
      </span>
    );
  };

  return (
    <nav aria-label={ariaLabel} className={`breadcrumb ${className}`.trim()}>
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const {
            label = '',
            state = 'default',
            showIcon = false,
            showText = true,
            icon = null,
            ariaLabel: itemAriaLabel = '',
            href,
          } = item;

          const isLast = index === items.length - 1;

          const itemNode = (
            <BreadcrumbItem
              label={label}
              state={state}
              showIcon={showIcon}
              showText={showText}
              icon={icon}
              ariaLabel={itemAriaLabel}
            />
          );

          // Wrap in <a> if href provided (non-last items are typically links)
          const content = href ? (
            <a href={href} className="breadcrumb__link">
              {itemNode}
            </a>
          ) : (
            itemNode
          );

          return (
            <React.Fragment key={index}>
              <li
                className="breadcrumb__item"
                aria-current={isLast && state === 'active' ? 'page' : undefined}
              >
                {content}
              </li>
              {!isLast && renderDivider(index)}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
