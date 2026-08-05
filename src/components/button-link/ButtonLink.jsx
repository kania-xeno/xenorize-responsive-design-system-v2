import React from "react";
import "./ButtonLink.css";

/**
 * ButtonLink — Inline link-style button
 *
 * Figma source: 0aVnOgjVWH1YL8JCnjXTBi, component set node 1958:12240 (↳buttons-link)
 * Token namespace: link-button/*
 * DS version: v2.1.0
 *
 * ⚠️  This is NOT a variant of Button. Do not implement via the Button component.
 *     Token namespace `link-button/*` is entirely separate from `button/*`.
 *
 * @param {"primary"|"neutral"|"information"|"error"|"modifable"} [style="neutral"]
 *   Maps to Figma "🏵️ Style". Note: "modifable" is a Figma DS typo — preserved intentionally.
 *
 * @param {"medium"|"small"} [size="medium"]
 *   "medium" = 20px height / 14px text. "small" = 16px height / 12px text.
 *
 * @param {boolean} [underline=false]
 *   Renders a border-bottom underline using link-button/[style]/underline token.
 *   Uses border-bottom, NOT text-decoration: underline (matches Figma Frame stroke anatomy).
 *
 * @param {boolean} [disabled=false]
 *
 * @param {React.ReactNode} [leftIcon]
 *   Icon element shown to the left of the label. Visibility controlled by its presence.
 *
 * @param {React.ReactNode} [rightIcon]
 *   Icon element shown to the right of the label.
 *
 * @param {string} [href]
 *   When provided, renders an <a> element. When absent, renders a <button>.
 *
 * @param {(e: React.MouseEvent) => void} [onClick]
 *
 * @param {string} [aria-label]
 *   Recommended when icon-only (no visible label text).
 *
 * @param {React.ReactNode} [children]  Label text (preferred).
 * @param {string} [label]              Label text (alternate — maps to children if children absent).
 * @param {string} [className]
 *
 * Deprecated / legacy icon props (kept for backward compat with Figma spec naming):
 * @param {boolean} [showLeftIcon]   If false, hides leftIcon even when provided.
 * @param {boolean} [showRightIcon]  If false, hides rightIcon even when provided.
 */
export default function ButtonLink({
  style = "neutral",
  size = "medium",
  underline = false,
  disabled = false,
  leftIcon,
  rightIcon,
  showLeftIcon,
  showRightIcon,
  href,
  onClick,
  className = "",
  "aria-label": ariaLabel,
  children,
  label,
  ...rest
}) {
  const text = children ?? label;

  // showLeftIcon/showRightIcon allow explicit toggle (Figma boolean prop parity).
  // If the prop is not passed (undefined), icon visibility is determined by whether the icon element exists.
  const renderLeft  = leftIcon  && showLeftIcon  !== false;
  const renderRight = rightIcon && showRightIcon !== false;

  if (process.env.NODE_ENV !== "production") {
    if (!text && !ariaLabel) {
      console.warn(
        "ButtonLink: no visible label text and no `aria-label` provided. " +
        "Accessible name is required for screen readers."
      );
    }
  }

  const classes = [
    "button-link",
    `button-link--${style}`,
    `button-link--${size}`,
    underline  ? "button-link--underline"  : "",
    disabled   ? "button-link--disabled"   : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {renderLeft && (
        <span className="button-link__icon button-link__icon--left" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {text && <span className="button-link__label">{text}</span>}
      {renderRight && (
        <span className="button-link__icon button-link__icon--right" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </>
  );

  /* ── <a> path ─────────────────────────────────────────────────────────── */
  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={
          disabled
            ? (e) => e.preventDefault()
            : onClick
        }
        {...rest}
      >
        {content}
      </a>
    );
  }

  /* ── <button> path ────────────────────────────────────────────────────── */
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
    >
      {content}
    </button>
  );
}
