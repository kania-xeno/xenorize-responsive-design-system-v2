import React from "react";

/**
 * CircleCheckFilled — "circle-check" stroke=2 variant from Icon System V.2.0.0
 * Variant: filled=on, stroke=2, radius=0, join=round (node 1957:587)
 * ComponentSet tags: "circle-check, check radio, circle, checkbox, check, checkmark, confirm"
 *
 * Renders at 24×24. Inherits color via `currentColor` (fill).
 * EVENODD filled path — circle shell with checkmark cutout (heavier stroke=2 geometry).
 *
 * ⚠️ DO NOT overwrite CircleCheck.jsx — that is stroke=1, 20×20 coordinate space (node 9:96443).
 * This is a geometrically distinct stroke=2 variant required specifically by ModalHeader.
 *
 * Figma source: DS file 0aVnOgjVWH1YL8JCnjXTBi · componentSetId 1957:583
 * Extracted: 2026-08-28 · Modal D1 icon sync
 * Required by: ModalHeader — type="success"
 */
export default function CircleCheckFilled(props) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.774 10.1333C16.1237 9.70582 16.0607 9.0758 15.6332 8.72607C15.2058 8.37635 14.5758 8.43935 14.226 8.86679L10.4258 13.5116L9.20711 12.2929C8.81658 11.9024 8.18342 11.9024 7.79289 12.2929C7.40237 12.6834 7.40237 13.3166 7.79289 13.7071L9.79289 15.7071C9.99267 15.9069 10.2676 16.0129 10.5498 15.9988C10.832 15.9847 11.095 15.8519 11.274 15.6333L15.774 10.1333Z"
        fill="currentColor"
      />
    </svg>
  );
}
