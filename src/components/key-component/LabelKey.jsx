import React from 'react';
import CircleInfo from '../icons/CircleInfo.jsx';
import './LabelKey.css';

/**
 * LabelKey — ↳label-key
 * Figma node: 1956:5490 · Page: ❖ Key Component
 * Design System Scalable V.2.1.0
 * Token collection: VariableCollectionId:1902:2617 (single mode "variable")
 *
 * 2 variants: Normal · Disabled.
 * Display-only — no hover, focus, or pressed states defined in Figma V1.
 *
 * Anatomy (HORIZONTAL AL, gap=2, width=100%, height=HUG):
 *   Label TEXT → key-component/label/label
 *   * TEXT     → text/brand/primary (Normal) | key-component/label/text-disabled (Disabled)
 *   (Optional) TEXT → key-component/label/optional-text
 *   info icon INSTANCE (16×16) → key-component/label/icon (Normal) | key-component/label/icon-disabled (Disabled)
 *   Help link → key-component/hint/button (LabelKey-internal — NOT global Link Button component)
 *
 * Width: 100% — 242px Figma value is a canvas constraint only.
 */
export default function LabelKey({
  /** Main label text. */
  label = 'Label',
  /** Sublabel text — shown when showSublabel=true. */
  sublabel = '(Optional)',
  /** Show the optional sublabel text. */
  showSublabel = false,
  /** Show the required asterisk (*). */
  showRequired = false,
  /** Show the info icon. */
  showInfo = false,
  /** Show the help link action. */
  showHelp = false,
  /** Help link visible text. */
  helpText = 'Help?',
  /** href for the help link — renders as <a> when provided. */
  helpHref,
  /** onClick handler for the help link — renders as <button> when provided (and no helpHref). */
  onHelpClick,
  /** Component state. */
  state = 'normal',
  /** Additional class names. */
  className = '',
}) {
  const isDisabled = state === 'disabled';

  const rootClasses = [
    'label-key',
    isDisabled ? 'label-key--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  // Help action: renders as <a> if helpHref provided, else <button>
  const HelpElement = helpHref ? 'a' : 'button';
  const helpProps = helpHref
    ? { href: helpHref, target: '_blank', rel: 'noopener noreferrer' }
    : { type: 'button', onClick: isDisabled ? undefined : onHelpClick };

  return (
    <div className={rootClasses}>
      {/* Label */}
      <span className="label-key__label">{label}</span>

      {/* Required asterisk */}
      {showRequired && (
        <span className="label-key__required" aria-hidden="true">*</span>
      )}

      {/* Optional sublabel */}
      {showSublabel && (
        <span className="label-key__optional">{sublabel}</span>
      )}

      {/* Info icon — 16×16, INSTANCE_SWAP slot (default: CircleInfo) */}
      {showInfo && (
        <span
          className="label-key__info-icon"
          aria-label="More information"
          role="img"
        >
          <CircleInfo width={16} height={16} aria-hidden="true" />
        </span>
      )}

      {/* Help action — LabelKey-internal, NOT global Link Button component */}
      {showHelp && (
        <span className="label-key__help">
          <HelpElement
            className="label-key__help-link"
            disabled={isDisabled && HelpElement === 'button' ? true : undefined}
            aria-disabled={isDisabled ? true : undefined}
            {...helpProps}
          >
            {helpText}
          </HelpElement>
        </span>
      )}
    </div>
  );
}
