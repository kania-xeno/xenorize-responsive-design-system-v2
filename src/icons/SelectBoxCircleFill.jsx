import React from "react";

/**
 * SelectBoxCircleFill — bespoke Status Modal icon (DS file, Modal page)
 * Standalone COMPONENT — not part of Icon System V.2.0.0.
 * Node: 2467:2220 · Size: 24×24
 *
 * Filled icon — circle with a checkmark cutout (success/confirm shape).
 * Renders at 24×24. Inherits color via `currentColor` (fill).
 *
 * Figma source: DS file 0aVnOgjVWH1YL8JCnjXTBi · Modal page · node 2467:2220
 * Extracted: 2026-08-28 · Modal D1 icon sync
 * Required by: StatusModal — type="success"
 */
export default function SelectBoxCircleFill(props) {
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
        d="M12 21C7.0293 21 3 16.9707 3 12C3 7.0293 7.0293 3 12 3C16.9707 3 21 7.0293 21 12C21 16.9707 16.9707 21 12 21ZM11.1027 15.6L17.4657 9.2361L16.1931 7.9635L11.1027 13.0548L8.5566 10.5087L7.284 11.7813L11.1027 15.6Z"
        fill="currentColor"
      />
    </svg>
  );
}
