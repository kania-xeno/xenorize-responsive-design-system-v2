import React, { useState, useId } from 'react';
import CircleInfo from '../../icons/CircleInfo.jsx';
import ChevronDownSmall from '../../icons/ChevronDownSmall.jsx';
import ChevronTopSmall from '../../icons/ChevronTopSmall.jsx';
import './Accordion.css';

/**
 * Accordion — interactive disclosure component
 *
 * Source: Design System Scalable V.2.1.0 → ❖ Accordion (page 2024:936)
 * Component set node: 2024:943
 * Implemented: 29/06/2026
 *
 * V1 scope: Default, Hover, Active states. Both Flip Icon layouts.
 * Out of scope: Focus ring (DS gap — no accordion/focus-ring token),
 *               Disabled state (DS gap — no accordion/disabled/* namespace).
 *
 * @param {string}  title        — Accordion header label (always visible)
 * @param {string}  body         — Body content revealed when open
 * @param {boolean} flipIcon     — false (default): info icon left + chevron right
 *                                  true: chevron left, no info icon
 * @param {boolean} defaultOpen  — Initial open state (uncontrolled)
 * @param {string}  className    — Additional class names for the root element
 */
export default function Accordion({
  title,
  body,
  flipIcon = false,
  defaultOpen = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const uid = useId();
  const bodyId = `accordion-body-${uid.replace(/:/g, '')}`;

  const toggle = () => setIsOpen(prev => !prev);

  const rootClass = [
    'accordion',
    isOpen ? 'accordion--open' : '',
    flipIcon ? 'accordion--flip-icon' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <button
        className="accordion__trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={toggle}
      >
        {/* Flip Icon = Off: info icon on the left */}
        {!flipIcon && (
          <span className="accordion__info-icon" aria-hidden="true">
            <CircleInfo />
          </span>
        )}

        {/* Flip Icon = On: chevron on the left */}
        {flipIcon && (
          <span className="accordion__chevron" aria-hidden="true">
            {isOpen ? <ChevronTopSmall /> : <ChevronDownSmall />}
          </span>
        )}

        <span className="accordion__title">{title}</span>

        {/* Flip Icon = Off: chevron on the right */}
        {!flipIcon && (
          <span className="accordion__chevron" aria-hidden="true">
            {isOpen ? <ChevronTopSmall /> : <ChevronDownSmall />}
          </span>
        )}

        {/* Flip Icon = On: no right element */}
      </button>

      {/* Body — grid-row animation for expand/collapse */}
      <div className="accordion__body-wrap">
        <div
          id={bodyId}
          className="accordion__body"
          aria-hidden={!isOpen}
        >
          <p className="accordion__body-text">{body}</p>
        </div>
      </div>
    </div>
  );
}
