import React from "react";
import "./Button.css";

/**
 * Button — Large
 * Spec: components/button/button-large-spec.md
 *
 * @param {"primary"|"error"|"neutral"} [type="primary"]
 * @param {"filled"|"stroke"|"lighter"|"ghost"} [variant="filled"]
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
  if (process.env.NODE_ENV !== "production" && onlyIcon && !ariaLabel && !children) {
    // eslint-disable-next-line no-console
    console.warn(
      "Button: icon-only buttons require an `aria-label` for accessibility."
    );
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

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
    >
      {leftIcon && <span className="button__icon button__icon--left">{leftIcon}</span>}
      {!onlyIcon && children && <span className="button__label">{children}</span>}
      {onlyIcon && !leftIcon && children && (
        <span className="button__icon">{children}</span>
      )}
      {!onlyIcon && rightIcon && (
        <span className="button__icon button__icon--right">{rightIcon}</span>
      )}
      {badge !== undefined && badge !== null && (
        <span className="button__badge">{badge}</span>
      )}
    </button>
  );
}
