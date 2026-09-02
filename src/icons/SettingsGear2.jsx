import React from "react";

/**
 * SettingsGear2 — "settings-gear-2" from Icon System V.2.0.0
 * Variant: filled=off, stroke=1, radius=0, join=square (node 1990:314)
 * ComponentSet tags: "settings-gear-2, preferences"
 *
 * Renders at 24×24. Inherits color via `currentColor` (stroke).
 * Stroke-only icon — gear outline (outer cog shape) + inner circle.
 *
 * Figma source: DS file 0aVnOgjVWH1YL8JCnjXTBi · componentSetId 1990:293
 * Extracted: 2026-08-28 · Modal D1 icon sync
 * Required by: ModalHeader — default/example Left Icon slot (placeholder)
 */
export default function SettingsGear2(props) {
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
        d="M9.15 5.35L6.0625 4.6375L4.6375 6.0625L5.35 9.15L2.5 11.05V12.95L5.35 14.85L4.6375 17.9375L6.0625 19.3625L9.15 18.65L11.05 21.5H12.95L14.85 18.65L17.9375 19.3625L19.3625 17.9375L18.65 14.85L21.5 12.95V11.05L18.65 9.15L19.3625 6.0625L17.9375 4.6375L14.85 5.35L12.95 2.5H11.05L9.15 5.35Z"
        stroke="currentColor"
      />
      <path
        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
        stroke="currentColor"
      />
    </svg>
  );
}
