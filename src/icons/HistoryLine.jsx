import React from "react";

/**
 * HistoryLine — "history-line" icon from Design System Scalable V.2.1.0
 * DS node: 2097:202 | ❖ Drawer page
 *
 * Render: FILLED path (clock-with-return-arrow). No stroke.
 * fill bound to Figma color variable → render fill="currentColor".
 * Vector at offset (3, 3) within 24×24 frame, size 18×18.
 *
 * Primary use: Drawer header left icon slot (Key Icons [1.0] / Left Icon, 24×24px).
 * Role: SAMPLE — swappable slot, not a structural Drawer requirement.
 * Extracted: 2026-08-25 — DS D1.3 icon audit.
 */
export default function HistoryLine(props) {
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
      <g transform="translate(3 3)">
        <path
          d="M 9 0 C 13.9707 0 18 4.0293 18 9 C 18 13.9707 13.9707 18 9 18 C 4.0293 18 0 13.9707 0 9 L 1.8 9 C 1.8 12.9762 5.0238 16.2 9 16.2 C 12.9762 16.2 16.2 12.9762 16.2 9 C 16.2 5.0238 12.9762 1.8 9 1.8 C 6.525 1.8 4.3416 3.0483 3.0465 4.95 L 5.4 4.95 L 5.4 6.75 L 0 6.75 L 0 1.35 L 1.8 1.35 L 1.8 3.6 C 3.4416 1.413 6.0561 0 9 0 Z M 9.9 4.5 L 9.9 8.6265 L 12.8187 11.5452 L 11.5452 12.8187 L 8.1 9.3717 L 8.1 4.5 L 9.9 4.5 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
