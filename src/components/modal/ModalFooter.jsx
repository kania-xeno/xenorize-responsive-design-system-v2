import React from "react";
import "./ModalFooter.css";
import Button from "../button/Button.jsx";

/**
 * ModalFooter — internal component (not a primary public API)
 *
 * Consumed by CardModal. Do not expose directly in consumer code.
 *
 * Types:
 *   basic        — [secondary?] primary buttons, right-aligned
 *   stretch      — [secondary?] primary buttons, equal width, filling row
 *   checkbox     — left slot (checkbox) + right buttons
 *   toggle       — left slot (toggle/switch) + right buttons
 *   information  — left slot (informational text/icon) + right buttons
 *   link-button  — left slot (ButtonLink) + right buttons
 *
 * Button sizing: medium ONLY (per handoff spec — never large or small)
 *
 * Props:
 *   type            {string}    — footer layout type (see above)
 *   primaryLabel    {string}    — primary CTA label
 *   onPrimary       {function}  — primary CTA handler
 *   primaryType     {string}    — Button type prop (default: "primary")
 *   primaryVariant  {string}    — Button variant prop (default: "filled")
 *   primaryDisabled {boolean}   — disables primary CTA
 *   secondaryLabel  {string}    — secondary CTA label (optional)
 *   onSecondary     {function}  — secondary CTA handler
 *   leftContent     {node}      — pre-composed element for left slot
 *                                 (checkbox, toggle, info text, ButtonLink)
 *   className       {string}    — extra class(es) on footer root
 */
export default function ModalFooter({
  type = "basic",
  primaryLabel = "Confirm",
  onPrimary,
  primaryType = "primary",
  primaryVariant = "filled",
  primaryDisabled = false,
  secondaryLabel,
  onSecondary,
  leftContent,
  className = "",
}) {
  const isStretch = type === "stretch";

  return (
    <div
      className={[
        "modal-footer",
        `modal-footer--${type}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Left slot: checkbox / toggle / information / link-button */}
      {leftContent && (
        <div className="modal-footer__left">{leftContent}</div>
      )}

      {/* Actions row */}
      <div
        className={[
          "modal-footer__actions",
          isStretch ? "modal-footer__actions--stretch" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {secondaryLabel && (
          <Button
            type="neutral"
            variant="outline"
            size="medium"
            onClick={onSecondary}
            className={isStretch ? "modal-footer__btn--stretch" : undefined}
          >
            {secondaryLabel}
          </Button>
        )}

        <Button
          type={primaryType}
          variant={primaryVariant}
          size="medium"
          disabled={primaryDisabled}
          onClick={onPrimary}
          className={isStretch ? "modal-footer__btn--stretch" : undefined}
        >
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
}
