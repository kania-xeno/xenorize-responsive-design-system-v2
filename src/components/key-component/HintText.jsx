import React from 'react';
import CircleInfo from '../../icons/CircleInfo.jsx';
import './HintText.css';

/**
 * HintText — ↳hint-text
 * Figma node: 1956:5592 · Page: ❖ Key Component
 * Design System Scalable V.2.1.0
 * Token collection: VariableCollectionId:1902:2617 (single mode "variable")
 *
 * 4 variants: Default · Error · Disabled · Success.
 * Display-only — no hover, focus, or pressed states defined in Figma V1.
 *
 * Anatomy (HORIZONTAL AL, gap=4, width=100%):
 *   icon INSTANCE (16×16, optional) → key-component/hint/{state-token}
 *   hint text TEXT (FILL) → key-component/hint/{state-token}
 *
 * Token rule:
 *   Default  — icon: hint/icon (icon/sub), text: hint/text (text/neutral/default) — SEPARATE
 *   Error    — icon + text: hint/error (status/danger)
 *   Success  — icon + text: hint/success (status/success)
 *   Disabled — icon + text BOTH: hint/icon-disabled (icon/dissabled ⚠️)
 *              hint/text-disabled is confirmed bound but NOT consumed in V1.
 *
 * Icon: default is CircleInfo. Consumer can swap via `icon` prop.
 * All 4 states currently use the same icon shape (information-fill) per DS V1.
 * Per usage spec Future Cleanup #2: distinct icons per state are a DS enhancement request.
 */
export default function HintText({
  /** Hint message text. */
  message = 'This is a hint text to help user.',
  /** Component state — drives token selection. */
  state = 'default',
  /** Show the leading icon. */
  showIcon = true,
  /**
   * Icon element. Defaults to CircleInfo (information-fill).
   * Pass any DS icon component that uses currentColor.
   * Icon is decorative — aria-hidden is set internally.
   */
  icon,
  /** Additional class names. */
  className = '',
  /**
   * aria-describedby target: pass the id of the associated input so the hint
   * text is linked to the field (accessibility requirement).
   */
  id,
  ...props
}) {
  const safeState = ['default', 'error', 'disabled', 'success'].includes(state)
    ? state
    : 'default';

  const rootClasses = [
    'hint-text',
    `hint-text--${safeState}`,
    className,
  ].filter(Boolean).join(' ');

  const IconComponent = icon || <CircleInfo width={16} height={16} />;

  return (
    <div
      className={rootClasses}
      id={id}
      role={safeState === 'error' ? 'alert' : undefined}
      aria-live={safeState === 'error' ? 'polite' : undefined}
      {...props}
    >
      {showIcon && (
        <span className="hint-text__icon" aria-hidden="true">
          {IconComponent}
        </span>
      )}
      <span className="hint-text__message">{message}</span>
    </div>
  );
}
