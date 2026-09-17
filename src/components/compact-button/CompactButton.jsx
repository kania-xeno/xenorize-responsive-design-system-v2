import React from "react";
import "./CompactButton.css";

/**
 * CompactButton — Icon-only compact action button
 * Specs: component-compact-button-a3-handoff-specification.md (CB-A3-D final)
 * Source: Figma node 2285:642 (↳button-compact, page ❖ Button)
 *         Design System Scalable - All Platform-V.2.1.0 (key: 0aVnOgjVWH1YL8JCnjXTBi)
 * Preflight: DT-R0-F + DT-R1 reconciliation (2026-09-17)
 *
 * @param {React.ReactNode} icon
 *   Required. The icon element to render inside the button. Must be an SVG
 *   component that respects `currentColor` (the button sets `color` per state).
 *
 * @param {"ghost"|"stroke"|"modifiable"|"white"} [variant="ghost"]
 *   Visual style. Maps to Figma "🏵️ Style".
 *   - ghost:      Transparent at rest, bg on hover/active. No border, no shadow.
 *   - stroke:     White bg + 1 px border + shadow at rest. bg on hover/active.
 *   - modifiable: Transparent at rest (same as ghost). hover-dark tint on hover.
 *                 hover-dark bg + white border on active (MOD-01).
 *   - white:      White bg + shadow at rest (no border). bg on hover/active.
 *
 * @param {"large"|"medium"} [size="large"]
 *   Container size. Maps to Figma "📏 Size".
 *   - large:  24 × 24 px container, 2 px padding → 20 × 20 px icon area.
 *   - medium: 20 × 20 px container, 1 px padding → 18 × 18 px icon area.
 *
 * @param {boolean} [fullRadius=false]
 *   When true, applies `border-radius: var(--radius-full)` (999 px — pill shape).
 *   Maps to Figma "⭕️ Full Radius = On". Default is `var(--radius-6)` (6 px).
 *
 * @param {boolean} [disabled=false]
 *   Disables the button. All variants render transparent with disabled icon color.
 *   Removes bg, border, and shadow via CSS `!important` overrides.
 *
 * @param {"button"|"submit"|"reset"} [type="button"]
 *   HTML button `type` attribute.
 *
 * @param {string} [aria-label]
 *   Provides the accessible name directly. Required unless `aria-labelledby` is used.
 *
 * @param {string} [aria-labelledby]
 *   References an existing element whose text becomes the accessible name.
 *   Satisfies the accessible-name requirement when `aria-label` is not provided.
 *
 * @param {React.Ref} [ref]
 *   Forwarded to the underlying `<button>` element (React 19: direct prop).
 *
 * @param {string} [className]
 *   Additional CSS classes appended to the base class list.
 *
 * @designer-decisions (implement exactly — do not "fix")
 *   MOD-01:   Modifiable/Active border uses `--button-compact-bg-default` (a fill
 *             token reused as border color). Pre-existing designer decision.
 *   SEM-02:   `--button-compact-icon-active` fires on :hover; `--button-compact-icon-inverse`
 *             fires on :active. Token names are inverted relative to CSS state names.
 *   DD-VIS-01: Modifiable/Active contrast 1.03:1 (L) / 1.28:1 (D) — designer-accepted
 *             WCAG 1.4.11 exception. Implemented as specified; do not suppress.
 */
export default function CompactButton({
  icon,
  variant = "ghost",
  size = "large",
  fullRadius = false,
  disabled = false,
  type = "button",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className = "",
  ref,
  ...rest
}) {
  if (process.env.NODE_ENV !== "production") {
    if (!ariaLabel && !ariaLabelledBy) {
      console.warn(
        "CompactButton: an accessible name is required — " +
          "provide `aria-label` or `aria-labelledby`. " +
          "This button has no visible label text."
      );
    }
    if (!icon) {
      console.warn("CompactButton: `icon` is required.");
    }
    const validVariants = ["ghost", "stroke", "modifiable", "white"];
    if (!validVariants.includes(variant)) {
      console.warn(
        `CompactButton: invalid variant "${variant}". ` +
          `Expected one of: ${validVariants.join(", ")}.`
      );
    }
    const validSizes = ["large", "medium"];
    if (!validSizes.includes(size)) {
      console.warn(
        `CompactButton: invalid size "${size}". Expected "large" or "medium".`
      );
    }
  }

  const classes = [
    "compact-button",
    `compact-button--${variant}`,
    `compact-button--${size}`,
    fullRadius ? "compact-button--full-radius" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      ref={ref}
      {...rest}
    >
      <span className="compact-button__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
