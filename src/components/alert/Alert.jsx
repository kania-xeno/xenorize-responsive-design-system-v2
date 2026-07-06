import React, { useEffect, useRef } from 'react';
import BubbleAlert from '../icons/BubbleAlert.jsx';
import CrossLarge from '../icons/CrossLarge.jsx';
import './Alert.css';

// ─────────────────────────────────────────────────────────────────────────────
// Alert / Toast Notification — display and notification component
// Figma source: Design System Scalable V.2.1.0 → ↳alert-toast-notification (1995:2497)
// DS version: v2.1.0
//
// Alert may contain interactive link buttons but is NOT itself interactive.
// Do not add onClick, tabIndex, or role="button" to the alert container.
//
// Status → token namespace mapping (Figma label → CSS token name):
//   error       → danger
//   warning     → warning
//   success     → success
//   information → info
//   feature     → feature
//
// Sizes:
//   x-small (32) — single row, center-aligned, 16×16 icon, 8px padding/gap
//   small   (36) — single row, center-aligned, 16×16 icon, 8px padding/gap
//   large        — multi-row, top-aligned, 20×20 icon, 12px padding/gap
// ─────────────────────────────────────────────────────────────────────────────

// Maps prop `status` values → token namespace used in CSS data attributes
const STATUS_TOKEN_MAP = {
  error:       'danger',
  warning:     'warning',
  success:     'success',
  information: 'info',
  feature:     'feature',
};

// aria-live role per status (WCAG)
// Error + Warning → assertive; others → polite
const ARIA_LIVE_MAP = {
  error:       'assertive',
  warning:     'assertive',
  success:     'polite',
  information: 'polite',
  feature:     'polite',
};

export default function Alert({
  // Variant axes
  status      = 'information', // 'error' | 'warning' | 'success' | 'information' | 'feature'
  alertStyle  = 'lighter',     // 'filled' | 'light' | 'lighter' | 'stroke'
  size        = 'small',       // 'x-small' | 'small' | 'large'

  // Content
  message     = '',            // Single-line for x-small/small. Title for large.
  description = '',            // Large only — body text below title
  primaryAction   = '',        // Label for primary link button (optional)
  secondaryAction = '',        // Label for secondary link button (optional, large only)

  // Behavior
  dismissible  = true,         // Show/hide dismiss (cross-large) icon
  toast        = false,        // When true: fixed-position toast behavior
  autoDismiss  = 5000,         // ms — 0 = no auto-dismiss. Error always skips.
  onDismiss    = null,         // Callback when dismissed (via button or auto)
  onPrimaryAction   = null,    // Callback for primary action click
  onSecondaryAction = null,    // Callback for secondary action click

  className = '',
}) {
  const tokenStatus = STATUS_TOKEN_MAP[status] || 'info';
  const isLarge     = size === 'large';
  const ariaLive    = ARIA_LIVE_MAP[status] || 'polite';

  // Auto-dismiss timer — error never auto-dismisses
  const timerRef = useRef(null);

  useEffect(() => {
    if (!toast) return;
    if (status === 'error') return;
    if (!autoDismiss || autoDismiss <= 0) return;

    timerRef.current = setTimeout(() => {
      if (onDismiss) onDismiss();
    }, autoDismiss);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast, status, autoDismiss, onDismiss]);

  const rootClass = [
    'alert',
    `alert--${size}`,
    toast ? 'alert--toast' : '',
    className,
  ].filter(Boolean).join(' ');

  // ── Render helpers ──────────────────────────────────────────────────────────

  const statusIconEl = (
    <span className="alert__status-icon" aria-hidden="true">
      <BubbleAlert
        width={isLarge ? 20 : 16}
        height={isLarge ? 20 : 16}
      />
    </span>
  );

  const dismissIconEl = dismissible ? (
    <button
      className="alert__dismiss"
      aria-label="Dismiss"
      onClick={onDismiss}
      type="button"
    >
      <CrossLarge width={16} height={16} />
    </button>
  ) : null;

  const primaryActionEl = primaryAction ? (
    <button
      className="alert__action alert__action--primary"
      onClick={onPrimaryAction}
      type="button"
    >
      {primaryAction}
    </button>
  ) : null;

  const secondaryActionEl = secondaryAction && isLarge ? (
    <>
      {/* Divider — Inter font as per DS spec */}
      <span className="alert__action-divider" aria-hidden="true">∙</span>
      <button
        className="alert__action alert__action--secondary"
        onClick={onSecondaryAction}
        type="button"
      >
        {secondaryAction}
      </button>
    </>
  ) : null;

  // ── Layout variants ─────────────────────────────────────────────────────────

  if (isLarge) {
    // Large — multi-row: Content wrapper (Text frame + Actions frame) + dismiss
    return (
      <div
        className={rootClass}
        data-status={tokenStatus}
        data-style={alertStyle}
        role="alert"
        aria-live={ariaLive}
      >
        {statusIconEl}

        <div className="alert__content">
          <div className="alert__text">
            {message    && <span className="alert__title">{message}</span>}
            {description && <span className="alert__description">{description}</span>}
          </div>

          {(primaryAction || secondaryAction) && (
            <div className="alert__actions">
              {primaryActionEl}
              {secondaryActionEl}
            </div>
          )}
        </div>

        {dismissIconEl}
      </div>
    );
  }

  // X-Small / Small — single flat row
  return (
    <div
      className={rootClass}
      data-status={tokenStatus}
      data-style={alertStyle}
      role="alert"
      aria-live={ariaLive}
    >
      {statusIconEl}
      <span className="alert__message">{message}</span>
      {primaryActionEl}
      {dismissIconEl}
    </div>
  );
}
