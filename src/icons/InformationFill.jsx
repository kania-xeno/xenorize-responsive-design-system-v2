import React from "react";

/**
 * InformationFill — bespoke Status Modal icon (DS file, Modal page)
 * Standalone COMPONENT — not part of Icon System V.2.0.0.
 * Node: 2467:2222 · Size: 24×24
 *
 * Filled icon — circle with "i" bar and dot (information shape).
 * Renders at 24×24. Inherits color via `currentColor` (fill).
 *
 * Figma source: DS file 0aVnOgjVWH1YL8JCnjXTBi · Modal page · node 2467:2222
 * Extracted: 2026-08-28 · Modal D1 icon sync
 * Required by: StatusModal — type="info"
 */
export default function InformationFill(props) {
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
        d="M12 21C7.0293 21 3 16.9707 3 12C3 7.0293 7.0293 3 12 3C16.9707 3 21 7.0293 21 12C21 16.9707 16.9707 21 12 21ZM11.1 11.1V16.5H12.9V11.1H11.1ZM11.1 7.5V9.3H12.9V7.5H11.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
