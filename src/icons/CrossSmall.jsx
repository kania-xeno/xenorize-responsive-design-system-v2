import React from "react";

/**
 * CrossSmall — "cross-small" icon from Icon System V.2.0.0
 * Variant: filled=off, stroke=1, radius=0, join=square (node 1991:615)
 *
 * Renders at 24×24. Inherits color via `currentColor` (stroke).
 * Stroke-only icon — two diagonal lines forming an X.
 *
 * Figma source: DS file 0aVnOgjVWH1YL8JCnjXTBi · componentSetId 1991:594
 * Extracted: 2026-08-28 · Modal D1 icon sync
 * Required by: ModalHeader close button
 */
export default function CrossSmall(props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M7.5 7.5L16.5 16.5M16.5 7.5L7.5 16.5"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}
