import React, { useState } from 'react';
import './Switch.css';

/**
 * Switch — atomic toggle control (↳switch)
 *
 * Figma source: Design System Scalable — All Platform V.2.1.0
 *   Page:           ❖ Switch
 *   Component set:  ↳switch
 *   Total variants: 8 (4 states × 2 active modes)
 *   DS version:     v2.1.0 — component renamed from "Toggle" on 2026-08-03
 *
 * Layer anatomy (all variants, Figma layoutMode: NONE):
 *   Container  32×20px — no fill, no stroke
 *   Track      RECTANGLE 28×16px at (2,2) — cornerRadius: radius/full (999px)
 *   Thumb      ELLIPSE   12×12px — cornerRadius: radius/full, DROP_SHADOW black/4
 *   Dot        ELLIPSE    4×4px  — same fill as Track; absent in Disabled state
 *
 * Token bindings (L3 — emitted in tokens.css):
 *   Track Off:         --switch-track-off   (border/neutral/subtle  ~#eaeaea)
 *   Track On:          --switch-track-on    (brand/primary/base      #402f97)
 *   Track Hover/Off:   --switch-track-hover (text/neutral/disabled  ~#d1d1d1)
 *   Thumb (all):       --switch-knob-bg     (surface/neutral/white   #ffffff)
 *   Thumb shadow:      --shadow-below-sm    (0 1px 2px 0 rgba(23,23,23,0.04))
 *   Track/Thumb radius:--radius-full
 *
 * State behaviour (confirmed — handoff brief 2026-08-03):
 *   Default/Off   → Track: off-gray,    Thumb: white, shadow ✓
 *   Default/On    → Track: brand-purple, Thumb: white, shadow ✓
 *   Hover/Off     → Track: hover-gray,  Thumb: white, shadow ✓
 *   Hover/On      → Track: brand-purple (unchanged from On), shadow ✓
 *   Pressed/Off   → visually identical to Default/Off — no extra CSS rule
 *   Pressed/On    → visually identical to Default/On  — no extra CSS rule
 *   Disabled/Off  → Track: white (knob-bg), Thumb: off-gray (track-off), 1px stroke, no shadow, no Dot
 *   Disabled/On   → same inversion as Disabled/Off; Thumb translates to On position
 *
 * Effect style `components/toggle/switch` (S:57a40f...) exists in DS but is
 * NOT applied to any variant. --shadow-below-sm is the correct thumb shadow.
 * Do not apply the effect style without DS owner confirmation.
 *
 * Dot (4×4): fill always matches Track → invisible in static rendering.
 * Present for structural fidelity; primarily serves Figma Smart Animate motion.
 * Conditionally omitted by JSX when disabled=true.
 *
 * Accessibility:
 *   - Native <input type="checkbox"> provides pointer/keyboard semantics.
 *   - role="switch" overrides the default checkbox role for screen readers.
 *   - aria-checked mirrors the checked prop (required by ARIA switch role).
 *   - Space bar toggles the switch (native checkbox behaviour).
 *   - Disabled prevents interaction; cursor changes to not-allowed.
 *   - Focus-visible ring applied via CSS on .switch__track (see Switch.css).
 *
 * SwitchCard override note:
 *   SwitchCard re-tokenizes Track and Thumb via --switch-card-toggle-bg and
 *   --switch-card-toggle-ball. Override via CSS scoped to .switch-card .switch
 *   in SwitchCard.css — do not add cardMode prop to this component.
 *
 * @param {boolean}  [checked]            Controlled checked state.
 *   When provided the component is controlled — pass onChange to avoid a React
 *   read-only warning. When omitted the component is uncontrolled (see defaultChecked).
 * @param {boolean}  [defaultChecked=false] Initial checked state for uncontrolled usage.
 *   Ignored when checked is provided.
 * @param {boolean}  [disabled=false]
 * @param {string}   [size='medium']     Only 'medium' (32×20px) exists in DS v2.1.0.
 *   Accepted for API compatibility; no visual difference between values.
 * @param {string}   [id]               Forwarded to <input>.
 * @param {string}   [name]             Forwarded to <input>.
 * @param {string}   [value]            Forwarded to <input>.
 * @param {string}   [aria-label]       Label when no visible label element is present.
 * @param {string}   [aria-labelledby]  ID of a visible label element.
 * @param {function} [onChange]         Native React ChangeEvent handler.
 * @param {string}   [className]        Additional class(es) for the outer <span>.
 */
export default function Switch({
  checked,           // undefined → uncontrolled; boolean → controlled
  defaultChecked,    // initial state for uncontrolled usage; ignored when checked is provided
  disabled = false,
  size = 'medium',   // only 'medium' confirmed in DS v2.1.0; accepted for compat
  onChange,
  id,
  name,
  value,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  ...rest
}) {
  const isControlled = checked !== undefined;

  // Tracks checked value in uncontrolled mode so modifier classes and aria-checked
  // stay correct after the user toggles. Ignored entirely in controlled mode.
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

  const isChecked = isControlled ? checked : internalChecked;

  function handleChange(e) {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  }

  const classNames = [
    'switch',
    `switch--${size}`,
    isChecked ? 'switch--checked'  : '',
    disabled  ? 'switch--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      {/*
        Visually hidden native checkbox. Covers the full .switch area so all
        pointer + keyboard events go to the native control. opacity:0 hides it;
        .switch__track renders the custom visual.
      */}
      <input
        type="checkbox"
        role="switch"
        className="switch__input"
        id={id}
        name={name}
        value={value}
        {...(isControlled
          ? { checked: isChecked }
          : { defaultChecked }
        )}
        disabled={disabled}
        onChange={handleChange}
        aria-checked={isChecked}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...rest}
      />

      {/* aria-hidden: visual representation only — input above is the accessible control */}
      <span className="switch__track" aria-hidden="true">
        {/* Thumb rendered first so it sits below the Dot in CSS stacking order.
            The Dot (rendered after) paints on top of the Thumb surface — this is
            the correct Figma layer order: Dot ABOVE Thumb. The dot is a small
            4×4 circle whose fill matches the Track, creating a visible center mark
            inside the white knob in all non-disabled states. */}
        <span className="switch__thumb" />
        {/*
          Dot — 4×4 ELLIPSE, present in Default / Hover / Pressed states.
          Fill matches Track fill → visible as a small track-colored dot inside
          the white Thumb (e.g. gray dot in Off, purple dot in On).
          Absent in Disabled per Figma (Disabled variants have no Dot layer).
          Centered within the Thumb; translates with it via CSS transform.
        */}
        {!disabled && <span className="switch__dot" />}
      </span>
    </span>
  );
}
