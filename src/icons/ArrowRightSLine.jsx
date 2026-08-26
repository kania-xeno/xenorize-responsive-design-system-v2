import React from "react";

/**
 * ArrowRightSLine — "arrow-right-s-line" icon from Design System Scalable V.2.1.0
 * DS node: 1941:83 | ❖ Drawer page (via Link Buttons [1.1])
 *
 * Render: FILLED solid chevron polygon. NOT stroke-based.
 * ⚠️  ChevronRightSmall.jsx uses an open 3-point stroke path — different glyph.
 * fill bound to Figma color variable → render fill="currentColor" (no stroke).
 * Vector at offset (8.5, 6.2715) within 24×24 frame, size 7.0002×11.4552.
 *
 * Primary use: Link Buttons [1.1] inside ↳drawer-header (visible: false — hidden slot).
 * Criticality: LOW — not a structural Drawer requirement.
 * Extracted: 2026-08-25 — DS D1.3 icon audit.
 */
export default function ArrowRightSLine(props) {
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
          d="M 4.455 5.7276 L 0 1.2726 L 1.2726 0 L 7.0002 5.7276 L 1.2726 11.4552 L 0 10.1826 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
