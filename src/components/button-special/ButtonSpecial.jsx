import React from "react";
import ArrowLeftSLine from "../../icons/ArrowLeftSLine.jsx";
import ArrowRightSLine from "../../icons/ArrowRightSLine.jsx";
import "./ButtonSpecial.css";

/**
 * ButtonSpecial — Design System: ↳buttons-special
 * Figma: node 2015:333, file 0aVnOgjVWH1YL8JCnjXTBi, page ❖ Button
 * DT phase: D2-A.1 Runtime Cleanup (2026-10-07)
 * Spec: component-button-special-a3-consolidated-handoff-specification.md
 * Decisions: component-button-special-dt-d1-token-decision-reconciliation.md
 *
 * 36 Figma variants: 4 Types × 3 States × 3 Sizes
 *
 * @param {"neutral"|"basic"|"primary"|"destructive"} [variant="neutral"]
 *   Visual style. Maps to Figma "🧩 Type" variant axis.
 *   Generates the CSS modifier class `button-special--{variant}`.
 *   (D2.1: renamed from `type` to avoid collision with the native HTML button type attribute.)
 *
 * @param {"button"|"submit"|"reset"} [type="button"]
 *   Native HTML button type attribute. Forwarded directly to the <button> element.
 *   Use `type="submit"` inside forms. Default "button" prevents accidental form submission.
 *
 * @param {"medium"|"small"|"x-small"} [size="medium"]
 *   Size. Maps to Figma "📏 Size" variant axis.
 *   Medium=40px, Small=36px, X-Small=32px height.
 *   No Large size (DD-12 — out of scope).
 *
 * @param {boolean} [disabled=false]
 *   Native HTML disabled. Maps to Figma "📌 State=Disabled".
 *   Uses native `disabled` attribute — NOT `aria-disabled` (DD-06).
 *
 * @param {React.ReactNode} [children]
 *   Label text. Maps to Figma "✏️ Edit Text". Default Figma content: "Button".
 *   Numeric `0` is treated as rendered content (not empty).
 *
 * @param {boolean} [showLabel=true]
 *   Whether the label text slot is rendered. Maps to Figma "✏️ Show Text".
 *   When the resolved label is absent (showLabel=false, null/undefined/empty/whitespace children),
 *   an accessible name via `aria-label` or `aria-labelledby` is required (DD-07).
 *
 * @param {boolean} [showLeftIcon=true]
 *   Whether the left icon slot is visible. Maps to Figma "⬅️ Left Icon".
 *
 * @param {boolean} [showRightIcon=true]
 *   Whether the right icon slot is visible. Maps to Figma "➡️ Right Icon".
 *
 * @param {React.ReactNode} [leftIcon]
 *   Custom element for the left icon slot. Maps to Figma "⬅️ Pick Left".
 *   Defaults to <ArrowLeftSLine /> (Figma default: arrow-left-s-line, node 1941:85).
 *
 * @param {React.ReactNode} [rightIcon]
 *   Custom element for the right icon slot. Maps to Figma "➡️ Pick Right".
 *   Defaults to <ArrowRightSLine /> (Figma default: arrow-right-s-line, node 1941:83).
 *
 * @param {string} [aria-label]
 *   Accessible name for the button. Required when label is not rendered (DD-07).
 *
 * @param {string} [aria-labelledby]
 *   ID reference to an element providing the accessible name. Satisfies the icon-only
 *   accessible name requirement when aria-label is not provided.
 *
 * @param {React.Ref} [ref]
 *   Forwarded to the native <button> element. React 19 direct-ref pattern (matches CompactButton).
 *
 * @param {string} [className]
 *   Additional CSS classes appended to the component class list.
 *
 * @param {object} [rest]
 *   Any additional native button attributes (onClick, data-*, aria-*, name, value, etc.)
 *   are forwarded to the underlying <button> element.
 *
 * @designer-decisions (implement exactly — do not "fix")
 *   DD-01: Neutral fill is near-black (--prim-neutral-950 = #161616 = gray/0). Do not treat gray/0 as white.
 *   DD-02: Font weight is --font-weight-semibold (600). Figma token "typography/weight/medium" renders SemiBold.
 *   DD-03: Focus ring reuses existing --shadow-focus-ring-{primary|neutral|error} tokens. No new tokens.
 *   DD-04: HC-01 gradient stroke via ::before pseudo-element. border-image not used (breaks border-radius).
 *   DD-05: No Loading state, no loading prop, no loading tokens.
 *   DD-06: Native HTML disabled attribute only. aria-disabled is not used.
 *   DD-07: icon-only (or empty label) requires aria-label or aria-labelledby. Dev-mode warning enforced.
 *   DD-08: Primary overlay stop preserved at exactly 61.1%.
 *   DD-09: icon/neutral/destructive/primary hover → --color-icon-inverse (semantic, value-equivalent).
 *   DD-10: Figma typo "icon/dissabled" → correct spelling --color-icon-disabled in all CSS.
 *   DD-11: Radius: Medium=--radius-10, Small=--radius-8, X-Small=--radius-8.
 *   DD-12: Storybook stories cover Medium, Small, X-Small. No Large.
 *
 * @not-in-scope
 *   - Loading state (DD-05 / A2.2-DEC-03)
 *   - Active / Pressed state (absent from Figma matrix)
 *   - `state` prop — hover via CSS :hover, disabled via native disabled
 */
export default function ButtonSpecial({
  variant = "neutral",       // visual style: "neutral"|"basic"|"primary"|"destructive" (Figma 🧩 Type)
  type = "button",           // native HTML button type: "button"|"submit"|"reset"
  size = "medium",           // "medium"|"small"|"x-small" (Figma 📏 Size; no Large per DD-12)
  disabled = false,          // native HTML disabled (DD-06; NOT aria-disabled)
  children,                  // label text (Figma ✏️ Edit Text)
  showLabel = true,          // (Figma ✏️ Show Text)
  showLeftIcon = true,       // (Figma ⬅️ Left Icon)
  showRightIcon = true,      // (Figma ➡️ Right Icon)
  leftIcon,                  // custom left icon (default: <ArrowLeftSLine />, Figma ⬅️ Pick Left)
  rightIcon,                 // custom right icon (default: <ArrowRightSLine />, Figma ➡️ Pick Right)
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className = "",
  ref,                       // React 19 direct-ref (matches CompactButton pattern)
  ...rest
}) {
  // ── Development-only guards ──────────────────────────────────────────────
  if (process.env.NODE_ENV !== "production") {
    // Validate visual variant
    const validVariants = ["neutral", "basic", "primary", "destructive"];
    if (!validVariants.includes(variant)) {
      console.warn(
        `ButtonSpecial: invalid variant "${variant}". Expected one of: ${validVariants.join(", ")}. Falling back to "neutral".`
      );
    }

    // Validate native type
    const validTypes = ["button", "submit", "reset"];
    if (!validTypes.includes(type)) {
      console.warn(
        `ButtonSpecial: invalid type "${type}". Expected one of: ${validTypes.join(", ")}. Falling back to "button".`
      );
    }

    // Validate size
    const validSizes = ["medium", "small", "x-small"];
    if (!validSizes.includes(size)) {
      console.warn(
        `ButtonSpecial: invalid size "${size}". Expected one of: ${validSizes.join(", ")}. Falling back to "medium".`
      );
    }

    // ── Evidence-based accessible-name detection (D2-A.1.A) ──────────────
    //
    // A rendered label exists when showLabel=true AND children resolves to
    // non-null, non-undefined, non-empty, non-whitespace-only content.
    // Numeric `0` is valid rendered content and must NOT be treated as empty.
    //
    // React.Children.toArray strips null, undefined, booleans, and flattens
    // arrays — so false/true/[] and [null,false] all become [] (no children).
    // This correctly handles the cases where the previous IIFE returned true
    // for non-renderable values.
    const hasRenderedLabel = (() => {
      if (!showLabel) return false;
      if (children == null) return false;                        // null | undefined
      if (typeof children === "number") return true;             // 0 is valid content
      if (typeof children === "string") {
        return children.trim().length > 0;                      // "" and "   " → false
      }
      // React elements, arrays, booleans, mixed arrays:
      // React.Children.toArray filters null/undefined/boolean; keeps elements + numbers
      const childArray = React.Children.toArray(children);
      if (childArray.length === 0) return false;
      // Strings surviving the toArray pass may still be whitespace-only
      return childArray.some((child) => {
        if (typeof child === "string") return child.trim().length > 0;
        if (typeof child === "number") return true;
        return true; // React element — present and renderable
      });
    })();

    const hasAccessibleName =
      (typeof ariaLabel === "string" && ariaLabel.trim().length > 0) ||
      (typeof ariaLabelledBy === "string" && ariaLabelledBy.trim().length > 0);

    // Icon-only / empty-label accessibility check (DD-07 / A3-DEC-01)
    if (!hasRenderedLabel && !hasAccessibleName) {
      console.warn(
        "ButtonSpecial: the button has no rendered label text " +
          "(showLabel=false, or children is null/empty/whitespace). " +
          "Provide `aria-label` or `aria-labelledby` so assistive technology " +
          "can announce an accessible name. (DD-07 / A3-DEC-01)"
      );
    }

    // No-visible-content warning: no label, no icons (or all icons null)
    const hasVisibleLeftIcon = showLeftIcon && (leftIcon !== null && leftIcon !== undefined
      ? leftIcon !== false
      : true); // default ArrowLeftSLine always present when showLeftIcon=true
    const hasVisibleRightIcon = showRightIcon && (rightIcon !== null && rightIcon !== undefined
      ? rightIcon !== false
      : true); // default ArrowRightSLine always present when showRightIcon=true

    const hasVisibleContent = hasRenderedLabel || hasVisibleLeftIcon || hasVisibleRightIcon;

    // D2-A.1.B: no-visible-content warning fires regardless of aria-label presence.
    // Visual slots being empty is always a design concern, even if an accessible
    // name exists. The two warnings are independent: one is a visual problem,
    // the other is an accessibility problem.
    if (!hasVisibleContent) {
      console.warn(
        "ButtonSpecial: the button has no visible content " +
          "(showLabel=false or children is null/empty/whitespace/boolean, " +
          "showLeftIcon=false, showRightIcon=false). " +
          "Enable at least one of: showLabel with non-empty children, showLeftIcon, showRightIcon."
      );
    }
  }

  // ── Safe fallbacks (production-safe, no warnings) ────────────────────────
  const safeVariant = ["neutral", "basic", "primary", "destructive"].includes(variant)
    ? variant
    : "neutral";
  const safeType = ["button", "submit", "reset"].includes(type) ? type : "button";
  // D2-A.1.C: safeSize prevents unknown modifier classes (e.g. button-special--badvalue)
  // in both development and production. Falls back to "medium".
  const safeSize = ["medium", "small", "x-small"].includes(size) ? size : "medium";

  // ── Class list ──────────────────────────────────────────────────────────
  const classes = [
    "button-special",
    `button-special--${safeVariant}`,
    `button-special--${safeSize}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // ── Icon elements ───────────────────────────────────────────────────────
  const leftIconEl = leftIcon ?? <ArrowLeftSLine />;
  const rightIconEl = rightIcon ?? <ArrowRightSLine />;

  return (
    <button
      type={safeType}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      ref={ref}
      {...rest}
    >
      {showLeftIcon && (
        <span className="button-special__icon button-special__icon--left" aria-hidden="true">
          {leftIconEl}
        </span>
      )}
      {showLabel && (
        <span className="button-special__label">{children}</span>
      )}
      {showRightIcon && (
        <span className="button-special__icon button-special__icon--right" aria-hidden="true">
          {rightIconEl}
        </span>
      )}
    </button>
  );
}
