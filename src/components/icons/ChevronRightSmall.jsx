import React from "react";

/**
 * ChevronRightSmall — "chevron-right-small" icon from Icon System V.2.0.0
 * Variant: filled=off, stroke=1, radius=0, join=square
 *
 * ⚠️ PATH DERIVED — Figma Desktop Bridge unavailable at implementation time.
 * Derived from the coordinate system of ChevronDownSmall (node 9:2273) and
 * ChevronTopSmall (node 9:2212) which share the same 24×24 frame and 8px span.
 *   Down:  M 8 10 L 12 14 L 16 10  (horizontal, apex at y=14)
 *   Up:    M 8 14 L 12 10 L 16 14  (horizontal, apex at y=10)
 *   Right: M 10 8 L 14 12 L 10 16  (vertical, apex at x=14) ← 90° CW rotation
 * Verify Figma node ID on next connected session.
 *
 * Used as the Arrow divider in the Breadcrumb component.
 * Color inherited via `currentColor` (stroke only, no fill).
 */
export default function ChevronRightSmall(props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M 10 8 L 14 12 L 10 16"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
