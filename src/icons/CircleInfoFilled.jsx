import React from "react";

/**
 * CircleInfoFilled — "circle-info" stroke=2 variant from Icon System V.2.0.0
 * Variant: filled=on, stroke=2, radius=0, join=round (node 1945:3461)
 * ComponentSet tags: "circle-info, info circle, tooltip, information"
 *
 * Renders at 24×24. Inherits color via `currentColor` (fill).
 * EVENODD filled path — circle shell with "i" stem + dot (heavier stroke=2 geometry).
 *
 * ⚠️ DO NOT overwrite CircleInfo.jsx — that is stroke=1, 20×20 coordinate space (node 9:98583).
 * This is a geometrically distinct stroke=2 variant required specifically by ModalHeader.
 *
 * Figma source: DS file 0aVnOgjVWH1YL8JCnjXTBi · componentSetId 1945:3457
 * Extracted: 2026-08-28 · Modal D1 icon sync
 * Required by: ModalHeader — type="info"
 */
export default function CircleInfoFilled(props) {
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
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM10 11C10 10.4477 10.4477 10 11 10H12C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12C10.4477 12 10 11.5523 10 11ZM12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7Z"
        fill="currentColor"
      />
    </svg>
  );
}
