import React from "react";

/**
 * ArrowLeftSLine — "arrow-left-s-line" icon from Design System Scalable V.2.1.0
 * DS node: 1941:85 | ❖ Drawer page (via Link Buttons [1.1])
 *
 * Render: FILLED solid chevron polygon. NOT stroke-based.
 * ⚠️  ChevronLeftSmall.jsx uses an open 3-point stroke path — different glyph.
 * fill bound to Figma color variable → render fill="currentColor" (no stroke).
 * Vector at offset (8.5, 6.2715) within 24×24 frame, size 7.0002×11.4552.
 *
 * Primary use: Link Buttons [1.1] inside ↳drawer-header (visible: false — hidden slot).
 * Criticality: LOW — not a structural Drawer requirement.
 * Extracted: 2026-08-25 — DS D1.3 icon audit.
 */
export default function ArrowLeftSLine(props) {
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
      <g transform="translate(8.5 6.2715)">
        <path
          d="M 2.5452 5.7276 L 7.0002 10.1826 L 5.7276 11.4552 L 0 5.7276 L 5.7276 0 L 7.0002 1.2726 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
