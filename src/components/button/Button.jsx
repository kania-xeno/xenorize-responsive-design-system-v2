import React from "react";
import "./Button.css";

/**
 * Button — Large
 * Spec: components/button/button-large-spec.md
 *
 * @param {"primary"|"secondary"|"error"|"neutral"} [type="primary"]
 * @param {"filled"|"stroke"|"outline"|"lighter"|"tonal"|"ghost"} [variant="filled"]
 * @param {"large"} [size="large"]
 * @param {React.ReactNode} [leftIcon]
 * @param {React.ReactNode} [rightIcon]
 * @param {boolean} [onlyIcon=false]
 * @param {number|string} [badge]
 * @param {boolean} [disabled=false]
 * @param {React.ReactNode} [children]
 * @param {(e: React.MouseEvent) => void} [onClick]
 * @param {string} [className]
 * @param {string} [aria-label]
 *
 * Content slot precedence (see "Content slot rules" in button-large-spec.md):
 * 1. `onlyIcon` — renders a single 40x40 icon (leftIcon ?? rightIcon) only.
 *    `badge` and `children` are ignored.
 * 2. `badge` (when not onlyIcon) — renders label text + badge only.
 *    `leftIcon`/`rightIcon` are ignored.
 * 3. Otherwise — renders leftIcon? + label text + rightIcon?.
 */
export default function Button({
  type = "primary",
  variant = "filled",
  size = "large",
  leftIcon,
  rightIcon,
  onlyIcon = false,
  badge,
  disabled = false,
  children,
  onClick,
  className = "",
  "aria-label": ariaLabel,
  ...rest
}) {
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);
  const hasBadge = badge !== undefined && badge !== null && badge !== "";
  const hasLabel = Boolean(children);

  if (process.env.NODE_ENV !== "production") {
    if (onlyIcon && !ariaLabel && !children) {
      // eslint-disable-next-line no-console
      console.warn(
        "Button: icon-only buttons require an `aria-label` for accessibility."
      );
    }
    if (onlyIcon && hasBadge) {
      // eslint-disable-next-line no-console
      console.warn("Button: `badge` is ignored when `onlyIcon` is true.");
    }
    if (!onlyIcon && hasBadge && (hasLeftIcon || hasRightIcon)) {
      // eslint-disable-next-line no-console
      console.warn(
        "Button: `leftIcon`/`rightIcon` are ignored when `badge` is set — badge buttons render label text + badge only."
      );
    }
    if (!onlyIcon && hasBadge && !hasLabel) {
      // eslint-disable-next-line no-console
      console.warn("Button: a badge requires visible label text (`children`) — badge-only buttons are not supported.");
    }
    if (!onlyIcon && !hasBadge && (hasLeftIcon || hasRightIcon) && !hasLabel) {
      // eslint-disable-next-line no-console
      console.warn(
        "Button: icons require visible label text (`children`) — use `onlyIcon` for an icon with no label."
      );
    }
  }

  const classes = [
    "button",
    `button--${variant}`,
    `button--${type}`,
    `button--size-${size}`,
    onlyIcon ? "button--onlyIcon" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  let content;
  if (onlyIcon) {
    // Icon only: a single 40x40 icon, nothing else.
    content = (hasLeftIcon || hasRightIcon) && (
      <span className="button__icon">{leftIcon ?? rightIcon}</span>
    );
  } else if (hasBadge) {
    // Badge active: label + badge only — icons are not shown alongside a badge.
    content = (
      <>
        {hasLabel && <span className="button__label">{children}</span>}
        <span className="button__badge">{badge}</span>
      </>
    );
  } else {
    // Default: optional left/right icons alongside the label.
    content = (
      <>
        {hasLeftIcon && <span className="button__icon button__icon--left">{leftIcon}</span>}
        {hasLabel && <span className="button__label">{children}</span>}
        {hasRightIcon && <span className="button__icon button__icon--right">{rightIcon}</span>}
      </>
    );
  }

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
