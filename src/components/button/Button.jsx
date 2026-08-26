import React from "react";
import "./Button.css";

/**
 * Button — Large + Medium + Small
 * Specs: components/button/button-large-spec.md, button-medium-spec.md, button-small-spec.md
 * Sources:
 *   Large  — Figma node 1897:1592 (↳buttons-large)
 *   Medium — Figma node 1921:3648 (↳buttons-medium)
 *   Small  — Figma node 1921:4253 (↳buttons-small)
 *
 * @param {"primary"|"neutral"|"error"} [type="primary"]
 *   Maps to Figma "🧩 Type". "secondary" is built but hidden until a use-case is confirmed.
 *
 * @param {"filled"|"outline"|"lighter"|"ghost"} [variant="filled"]
 *   Maps to Figma "🏵️ Style". "outline" = Figma "Stroke".
 *
 * @param {"large"|"medium"|"small"} [size="large"]
 *
 * @param {React.ReactNode} [icon]
 *   The icon to display. Use `iconPosition` to place it left or right.
 *   Only ONE icon is allowed per button (Figma rule).
 *
 * @param {"left"|"right"} [iconPosition="left"]
 *   Where the icon appears. Ignored when `onlyIcon` is true or `badge` is set.
 *
 * @param {boolean} [onlyIcon=false]
 *   Renders a standalone icon-only button with no label or badge.
 *   Size: 40×40 (large) · 36×36 (medium) · 32×32 (small).
 *   Requires `icon` and `aria-label`.
 *
 * @param {number|string} [badge]
 *   Pill counter shown to the right of the label. Not allowed when an icon is shown.
 *
 * @param {boolean} [disabled=false]
 * @param {React.ReactNode} [children]  Label text.
 * @param {(e: React.MouseEvent) => void} [onClick]
 * @param {string} [className]
 * @param {string} [aria-label]  Required for `onlyIcon` buttons.
 *
 * Content slot precedence (matches Figma):
 * 1. `onlyIcon` true  → icon only (40×40 large / 36×36 medium / 32×32 small). `badge` and `children` are ignored.
 * 2. `badge` set      → label + badge only. `icon` is ignored. Badge is suppressed on Small (DS rule).
 * 3. Otherwise        → icon? (left or right) + label.
 */
export default function Button({
  type = "primary",
  variant = "filled",
  size = "large",
  icon,
  iconPosition = "left",
  onlyIcon = false,
  badge,
  disabled = false,
  children,
  onClick,
  className = "",
  "aria-label": ariaLabel,
  // Legacy props — kept for backward compat but mapped internally
  leftIcon,
  rightIcon,
  showLeftIcon,
  showRightIcon,
  ...rest
}) {
  // Legacy prop support: map leftIcon/rightIcon → icon + iconPosition
  if (!icon) {
    if (leftIcon) { icon = leftIcon; iconPosition = "left"; }
    else if (rightIcon) { icon = rightIcon; iconPosition = "right"; }
  }

  const hasIcon = Boolean(icon);
  // Badge is a DS-supported feature on Large and Medium only — suppress on Small.
  const hasBadge =
    badge !== undefined && badge !== null && badge !== "" && size !== "small";
  const hasLabel = Boolean(children);

  if (process.env.NODE_ENV !== "production") {
    if (size === "small" && badge !== undefined && badge !== null && badge !== "") {
      console.warn(
        "Button: Badge is not supported on Small (DS constraint). The badge prop is ignored. " +
        "Use Large or Medium if a badge is required."
      );
    }
    if (onlyIcon && !ariaLabel) {
      console.warn("Button: icon-only buttons require an `aria-label` for accessibility.");
    }
    if (onlyIcon && !hasIcon) {
      console.warn("Button: `onlyIcon` is true but no `icon` was provided.");
    }
    if (!onlyIcon && hasBadge && hasIcon) {
      console.warn("Button: `badge` and `icon` cannot appear together — badge wins and the icon is hidden.");
    }
    if (!onlyIcon && !hasBadge && hasIcon && !hasLabel) {
      console.warn("Button: an icon requires label text (`children`) — use `onlyIcon` for an icon with no label.");
    }
    if (leftIcon && rightIcon) {
      console.warn("Button: only one icon is allowed. `leftIcon` takes priority — `rightIcon` is ignored.");
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
    // Standalone icon-only button (Figma "🔳 Only Icon = On")
    content = hasIcon && <span className="button__icon">{icon}</span>;
  } else if (hasBadge) {
    // Label + badge (icon not shown alongside badge per Figma rules)
    content = (
      <>
        {hasLabel && <span className="button__label">{children}</span>}
        <span className="button__badge">{badge}</span>
      </>
    );
  } else {
    // Text only, or text + one icon (left or right)
    content = (
      <>
        {hasIcon && iconPosition === "left" && (
          <span className="button__icon button__icon--left">{icon}</span>
        )}
        {hasLabel && <span className="button__label">{children}</span>}
        {hasIcon && iconPosition === "right" && (
          <span className="button__icon button__icon--right">{icon}</span>
        )}
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
