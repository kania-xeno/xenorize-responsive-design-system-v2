import React from "react";
import "./ModalHeader.css";
import {
  CrossSmall,
  TriangleExclamation,
  CircleCheckFilled,
  CircleInfoFilled,
  SettingsGear2,
} from "../../icons/index.js";

/**
 * ModalHeader — internal component (not a primary public API)
 *
 * Consumed by CardModal. Do not expose directly in consumer code.
 *
 * Types:
 *   basic        — title + close button (no icon)
 *   left-icon    — icon frame (default/placeholder) + title + close
 *   error        — red icon frame (TriangleExclamation) + title + close
 *   warning      — yellow icon frame (TriangleExclamation) + title + close
 *   success      — green icon frame (CircleCheckFilled) + title + close
 *   information  — blue icon frame (CircleInfoFilled) + title + close
 *
 * Sizes:
 *   medium  — 76px height, 40×40 icon frame (status/left-icon types only)
 *   small   — 56px height, 24×24 direct icon (no background frame)
 */

const STATUS_ICONS = {
  error:       TriangleExclamation,
  warning:     TriangleExclamation,
  success:     CircleCheckFilled,
  information: CircleInfoFilled,
  "left-icon": SettingsGear2,
};

export default function ModalHeader({
  type = "basic",
  size = "medium",
  title,
  description,
  onClose,
  titleId,
  descriptionId,
}) {
  const IconComponent = STATUS_ICONS[type] ?? null;
  const hasIcon = type !== "basic" && IconComponent !== null;
  const hasIconFrame = hasIcon && size === "medium";
  const hasDirectIcon = hasIcon && size === "small";

  return (
    <div
      className={[
        "modal-header",
        `modal-header--${size}`,
        `modal-header--${type}`,
      ].join(" ")}
    >
      {/* Icon frame: medium size, non-basic types — 40×40 */}
      {hasIconFrame && (
        <span
          className="modal-header__icon-frame"
          aria-hidden="true"
        >
          <IconComponent className="modal-header__icon-svg" />
        </span>
      )}

      {/* Direct icon: small size — 24×24, no background frame */}
      {hasDirectIcon && (
        <span
          className="modal-header__icon-direct"
          aria-hidden="true"
        >
          <IconComponent className="modal-header__icon-svg" />
        </span>
      )}

      {/* Text area */}
      <div className="modal-header__text">
        <span
          id={titleId}
          className="modal-header__title"
        >
          {title}
        </span>
        {size === "medium" && description && (
          <p
            id={descriptionId}
            className="modal-header__description"
          >
            {description}
          </p>
        )}
      </div>

      {/* Close button */}
      <button
        type="button"
        className="modal-header__close"
        aria-label="Close"
        onClick={onClose}
      >
        <CrossSmall aria-hidden="true" />
      </button>
    </div>
  );
}
