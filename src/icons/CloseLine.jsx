import React from "react";

/**
 * CloseLine — "close-line" icon from Design System Scalable V.2.1.0
 * DS node: 2097:204 | ❖ Drawer page
 *
 * Render: FILLED solid polygon (X shape). NOT stroke-based.
 * ⚠️  CrossLarge.jsx uses two open stroke paths — different glyph. Do NOT substitute.
 *
 * fill bound to Figma color variable → render fill="currentColor" (no stroke).
 * Vector at offset (6.2724, 6.2724) within 24×24 frame, size 11.4552×11.4552.
 *
 * Primary use: Drawer dismiss / close button (↳button-compact, 20×20px).
 * Extracted: 2026-08-25 — DS D1.3 icon audit.
 */
export default function CloseLine(props) {
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
      <g transform="translate(6.2724 6.2724)">
        <path
          d="M 5.7276 4.455 L 10.1826 0 L 11.4552 1.2726 L 7.0002 5.7276 L 11.4552 10.1826 L 10.1826 11.4552 L 5.7276 7.0002 L 1.2726 11.4552 L 0 10.1826 L 4.455 5.7276 L 0 1.2726 L 1.2726 0 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
