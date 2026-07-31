import React, { useRef, useEffect } from 'react';
import './Checkbox.css';

/**
 * Checkbox — atomic checkbox control (↳checkbox)
 *
 * Figma source: Design System Scalable — All Platform V.2.1.0
 *   Page:           ❖ Checkbox
 *   Component set:  ↳checkbox  (node 2113:34056)
 *   Total variants: 24 (4 states × 2 Active axes × 2 Indeterminate axes × 2 sizes)
 *
 * Token bindings (L3 — emitted in tokens.css):
 *   bg (unchecked)  → --checkbox-border-default   (Figma bg RECTANGLE fill in Default/Off)
 *   bg hover        → --checkbox-bg-hover
 *   bg checked      → --checkbox-bg-active
 *   bg disabled     → --checkbox-bg-disabled
 *   inner box fill  → --checkbox-bg               (surface/white)
 *   icon fill       → --checkbox-icon-check        (surface/white, via currentColor)
 *   box shadow      → --shadow-below-xs            (box layer, Default/Hover/Focused only)
 *   focus ring      → --shadow-focus-ring-primary  (bg layer, focus-visible state)
 *   bg corner radii → --radius-4
 *   box corner radii→ --radius-2
 *
 * Architecture:
 *   Visually hidden <input type="checkbox"> provides all keyboard, pointer, and
 *   accessibility semantics. A sibling <span class="checkbox__bg"> provides the
 *   custom visual. CSS sibling combinator (~) connects input state to visual state.
 *
 * Phase 1 constraints:
 *   --checkbox-border-disabled NOT applied (DS Q2 — Figma layer binding unconfirmed).
 *   CheckboxLabel and CheckboxCard are Phase 2.
 *
 * SVG glyphs extracted directly from Figma ↳checkbox VECTOR layers (node 2113:34056).
 * These are checkbox-private symbols — not from src/icons.
 *
 * @param {boolean|'indeterminate'} [checked=false]
 *   Controlled checked state. true = checked, false = unchecked, 'indeterminate' = mixed.
 *   Providing checked without onChange will produce a React controlled-input warning.
 * @param {boolean} [disabled=false]
 * @param {'medium'|'small'} [size='medium']
 *   medium = 20×20px outer / 16×16px bg. small = 16×16px outer / 14×14px bg.
 * @param {function} [onChange]  Native React ChangeEvent handler.
 */

// Private — Check VECTOR extracted from Figma ↳checkbox (node 2113:34056).
// VECTOR bounds in Figma: w=9.060659, h=6.590991. windingRule: EVENODD.
function CheckIcon() {
  return (
    <svg
      className="checkbox__icon"
      width="9.060659"
      height="6.590991"
      viewBox="0 0 9.060659408569336 6.5909905433654785"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 9.060659408569336 1.0606601238250732 L 3.530330181121826 6.5909905433654785 L 0 3.0606603622436523 L 1.0606601238250732 2 L 3.530330181121826 4.469669818878174 L 8 0 L 9.060659408569336 1.0606601238250732 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Private — Subtract VECTOR extracted from Figma ↳checkbox (node 2113:34056).
// VECTOR bounds in Figma: w=8, h=1.5. windingRule: EVENODD.
function SubtractIcon() {
  return (
    <svg
      className="checkbox__icon"
      width="8"
      height="1.5"
      viewBox="0 0 8 1.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 0 1.5 L 0 0 L 8 0 L 8 1.5 L 0 1.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Checkbox({
  checked = false,
  disabled = false,
  size = 'medium',
  onChange,
  ...rest
}) {
  const inputRef = useRef(null);

  const isChecked      = checked === true;
  const isIndeterminate = checked === 'indeterminate';

  // indeterminate is a DOM property — cannot be set via HTML attribute alone.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  // box layer is only rendered in Default and Hover states (unchecked, not disabled).
  // This naturally removes --shadow-below-xs in Checked/Indeterminate/Disabled states,
  // matching Figma (no effectStyleId on Active/Disabled variant bg/box layers).
  const showBox = !isChecked && !isIndeterminate && !disabled;

  const classNames = [
    'checkbox',
    `checkbox--${size}`,
    isChecked       ? 'checkbox--checked'       : '',
    isIndeterminate ? 'checkbox--indeterminate'  : '',
    disabled        ? 'checkbox--disabled'       : '',
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      <input
        ref={inputRef}
        type="checkbox"
        className="checkbox__input"
        checked={isChecked}
        disabled={disabled}
        onChange={onChange}
        aria-checked={isIndeterminate ? 'mixed' : isChecked}
        {...rest}
      />
      {/* aria-hidden: visual representation only — the input above is the accessible control */}
      <span className="checkbox__bg" aria-hidden="true">
        {showBox        && <span className="checkbox__box" />}
        {isChecked      && <CheckIcon />}
        {isIndeterminate && <SubtractIcon />}
      </span>
    </span>
  );
}
