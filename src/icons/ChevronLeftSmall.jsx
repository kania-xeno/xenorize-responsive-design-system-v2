import React from "react";

/**
 * ChevronLeftSmall — "chevron-left-small" icon from Icon System V.2.0.0
 * Variant: filled=off, stroke=1, radius=0, join=square (variantId 9:2395)
 * componentSetId: 9:2354
 *
 * Vector at offset (x=10, y=8) within the 24×24 frame.
 * Local path: M 4 8 L 0 4 L 4 0 → absolute: M 14 8 L 10 12 L 14 16
 * Extracted from Icon System V.2.0.0 — 2026-08-13.
 * Color inherited via `currentColor` (stroke only, no fill).
 */
export default function ChevronLeftSmall(props) {
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
        d="M 14 8 L 10 12 L 14 16"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
