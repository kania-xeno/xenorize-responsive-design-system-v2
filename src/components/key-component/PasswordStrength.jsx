import React from 'react';
import CircleCheck from '../../icons/CircleCheck.jsx';
import CircleX from '../../icons/CircleX.jsx';
import './PasswordStrength.css';

/**
 * PasswordStrength — ↳password-strength
 * Figma node: 1956:5602 · Page: ❖ Key Component
 * Design System Scalable V.2.1.0
 * Token collection: VariableCollectionId:1902:2617 (single mode "variable")
 *
 * 4 variants driven by `strength` prop:
 *   empty    — all 3 bars: password/default
 *   weak     — bar 1: password/error  · bars 2–3: password/default
 *   moderate — bars 1–2: password/warning · bar 3: password/default
 *   strong   — all 3 bars: password/success
 *
 * Condition icon token map:
 *   satisfied → <CircleCheck> → color: password/success
 *   failed    → <CircleX>    → color: password/icon (icon/soft)
 *
 * ⚠️ CircleCheck and CircleX are PLACEHOLDER components.
 *    Replace SVG paths when DS icon paths are available (Figma nodes 9:96443 / 9:100399).
 *
 * Fixed width: 300px (one size only per DS).
 * VERTICAL AL — gap=8 — paddingTop=6.
 *
 * Anatomy:
 *   Level bar row (3 equal bars, 4px height, radius 1.2px)
 *   "Must contain at least;" header text
 *   Condition row × N (icon 16×16 + label text)
 */

const STRENGTHS = ['empty', 'weak', 'moderate', 'strong'];

/**
 * Maps each bar (1-indexed) to its CSS modifier class for a given strength.
 * Modifier aligns with token names: default · error · warning · success.
 */
const BAR_MAP = {
  empty:    ['default', 'default', 'default'],
  weak:     ['error',   'default', 'default'],
  moderate: ['warning', 'warning', 'default'],
  strong:   ['success', 'success', 'success'],
};

const DEFAULT_CONDITIONS = [
  { label: 'At least 1 uppercase', satisfied: false },
  { label: 'At least 1 number',    satisfied: false },
  { label: 'At least 8 characters', satisfied: false },
];

export default function PasswordStrength({
  /** Strength level — drives bar colors. */
  strength = 'empty',
  /**
   * Condition rows. Each item: { label: string, satisfied: boolean }.
   * Defaults to the 3 Figma-specified conditions, all unsatisfied.
   */
  conditions = DEFAULT_CONDITIONS,
  /** Additional class names on the root element. */
  className = '',
  ...props
}) {
  const safeStrength = STRENGTHS.includes(strength) ? strength : 'empty';
  const bars = BAR_MAP[safeStrength];

  const rootClasses = [
    'password-strength',
    `password-strength--${safeStrength}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClasses} {...props}>
      {/* ── Level bar row ── */}
      <div className="password-strength__level" aria-hidden="true">
        {bars.map((barState, i) => (
          <div
            key={i}
            className={`password-strength__bar password-strength__bar--${barState}`}
          />
        ))}
      </div>

      {/* ── Header text ── */}
      <span className="password-strength__header">Must contain at least;</span>

      {/* ── Condition rows ── */}
      {conditions.map((condition, i) => {
        const isSatisfied = Boolean(condition.satisfied);
        return (
          <div key={i} className="password-strength__condition">
            <span
              className={[
                'password-strength__condition-icon',
                isSatisfied
                  ? 'password-strength__condition-icon--success'
                  : 'password-strength__condition-icon--failed',
              ].join(' ')}
              aria-hidden="true"
            >
              {isSatisfied
                ? <CircleCheck width={16} height={16} />
                : <CircleX width={16} height={16} />
              }
            </span>
            <span className="password-strength__condition-label">
              {condition.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
