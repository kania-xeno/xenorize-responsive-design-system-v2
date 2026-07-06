import React from "react";

/**
 * ChevronTopSmall — "chevron-top-small" icon from Icon System V.2.0.0
 * Variant: filled=off, stroke=1, radius=0, join=square (node 9:2212)
 *
 * Renders at 20×20 (the standard 24×24 component frame scaled to 20×20).
 * The vector content (8×4 chevron) is centered at offset (8,10) within
 * the 24×24 frame — preserved here via viewBox="0 0 24 24".
 * Color inherited via `currentColor` (stroke only, no fill).
 */
export default function ChevronTopSmall(props) {
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
        d="M 8 14 L 12 10 L 16 14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
