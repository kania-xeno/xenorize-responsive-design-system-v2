import React, { useId } from "react";
import Modal from "./Modal.jsx";
import Button from "../button/Button.jsx";
import {
  ErrorWarningFill,
  AlertFill,
  SelectBoxCircleFill,
  InformationFill,
} from "../../icons/index.js";
import "./StatusModal.css";

/**
 * StatusModal — primary public API for semantic status dialogs
 *
 * Displays one of four semantic statuses (error, warning, success, information)
 * with a 48×48 icon, title, optional body copy, and CTA buttons.
 * Has no close button — dismissal is via CTA or Escape key only.
 *
 * Accessibility:
 *   role="alertdialog"  — error, warning (urgent, auto-announced by screen readers)
 *   role="dialog"       — success, information (polite)
 *
 * Shadow rule:
 *   variant="overlay"   — shadow present (via .modal-panel default in Modal.css)
 *   variant="default"   — shadow removed (overridden here)
 *
 * Props:
 *   open                  {boolean}  — controlled open state
 *   onClose               {function} — called on Escape (and overlay click when enabled)
 *   status                {string}   — "error" | "warning" | "success" | "information"
 *   alignment             {string}   — "horizontal" (icon left, text right) | "vertical" (icon top)
 *   variant               {string}   — "overlay" (default, has shadow) | "default" (no shadow)
 *   title                 {string}   — modal heading (sets aria-labelledby)
 *   body                  {string}   — body copy (sets aria-describedby, optional)
 *   primaryLabel          {string}   — primary CTA label (default: "OK")
 *   onPrimary             {function} — primary CTA handler (falls back to onClose)
 *   secondaryLabel        {string}   — secondary CTA label (optional)
 *   onSecondary           {function} — secondary CTA handler
 *   closeOnEscape         {boolean}  — default true
 *   closeOnOverlayClick   {boolean}  — default false (status modals are intentional)
 *   className             {string}   — extra class(es) on the panel
 *   aria-labelledby       {string}   — override auto-generated title id
 *   aria-describedby      {string}   — override auto-generated body id
 */

const STATUS_CONFIG = {
  error: {
    Icon: ErrorWarningFill,
    role: "alertdialog",
  },
  warning: {
    Icon: AlertFill,
    role: "alertdialog",
  },
  success: {
    Icon: SelectBoxCircleFill,
    role: "dialog",
  },
  information: {
    Icon: InformationFill,
    role: "dialog",
  },
};

export default function StatusModal({
  open = false,
  onClose,
  status = "information",
  alignment = "horizontal",
  variant = "overlay",
  title,
  body,
  primaryLabel = "OK",
  onPrimary,
  secondaryLabel,
  onSecondary,
  closeOnEscape = true,
  closeOnOverlayClick = false,
  className = "",
  "aria-labelledby": ariaLabelledByProp,
  "aria-describedby": ariaDescribedByProp,
}) {
  const autoId = useId();
  const idSlug = autoId.replace(/:/g, "");
  const titleId = ariaLabelledByProp ?? `status-modal-title-${idSlug}`;
  const bodyId =
    ariaDescribedByProp ?? (body ? `status-modal-body-${idSlug}` : undefined);

  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.information;
  const { Icon, role } = config;

  // Dev-only guard: title is required for ARIA labelling
  if (process.env.NODE_ENV !== "production" && !title) {
    console.warn(
      "StatusModal: `title` prop is required for accessible labelling. " +
        "Provide a non-empty string."
    );
  }

  // variant="default" — standalone, without an overlay backdrop (usage spec §2)
  //   - transparent overlay (no bg, no blur)
  //   - narrower panel: 412px max-width (Figma Default reference)
  //   - no shadow (handled by .status-modal--default in StatusModal.css)
  const isDefault = variant === "default";

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="medium"
      height="hug"
      closeOnEscape={closeOnEscape}
      closeOnOverlayClick={closeOnOverlayClick}
      role={role}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      overlayProps={isDefault ? { className: "modal-overlay--no-backdrop" } : {}}
      panelProps={isDefault ? { style: { maxWidth: "412px" } } : {}}
      className={[
        "status-modal",
        `status-modal--${status}`,
        `status-modal--${alignment}`,
        `status-modal--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Content area: icon + text */}
      <div className="status-modal__content">
        {/* Icon frame: 48×48 */}
        <span
          className="status-modal__icon-frame"
          aria-hidden="true"
        >
          <Icon className="status-modal__icon-svg" />
        </span>

        {/* Text */}
        <div className="status-modal__text">
          <span
            id={titleId}
            className="status-modal__title"
          >
            {title}
          </span>
          {body && (
            <p
              id={bodyId}
              className="status-modal__body"
            >
              {body}
            </p>
          )}
        </div>
      </div>

      {/* Actions row */}
      <div className="status-modal__actions">
        {secondaryLabel && (
          <Button
            type="neutral"
            variant="outline"
            size="medium"
            onClick={onSecondary}
          >
            {secondaryLabel}
          </Button>
        )}
        <Button
          type="primary"
          variant="filled"
          size="medium"
          onClick={onPrimary ?? onClose}
        >
          {primaryLabel}
        </Button>
      </div>
    </Modal>
  );
}
