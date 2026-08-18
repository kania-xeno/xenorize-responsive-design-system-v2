import React from "react";

/**
 * CryptoCoin — "crypto-coin" icon from Icon System V.2.0.0
 * Variant: filled=off, stroke=1, radius=0, join=square (variantId 9:49980)
 * componentSetId: 9:49939
 *
 * Vector at offset (x=2.5, y=2.5) within the 24×24 frame.
 * Two paths: outer circle + coin dollar symbol (both stroke only, no fill).
 * Extracted from Icon System V.2.0.0 — 2026-08-13.
 * Color inherited via `currentColor` (stroke only, no fill).
 */
export default function CryptoCoin(props) {
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
      {/* Outer circle — local path offset +2.5, +2.5 */}
      <path
        d="M 21.5 12 C 21.5 17.2467 17.2467 21.5 12 21.5 C 6.7533 21.5 2.5 17.2467 2.5 12 C 2.5 6.7533 6.7533 2.5 12 2.5 C 17.2467 2.5 21.5 6.7533 21.5 12 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Coin dollar symbol — local path offset +2.5, +2.5 */}
      <path
        d="M 12 6.5 L 12 8.25 M 12 8.25 C 9.9289 8.25 8.25 9.9289 8.25 12 C 8.25 14.0711 9.9289 15.75 12 15.75 M 12 8.25 C 13.3358 8.25 14.5084 8.9484 15.1727 10 M 12 15.75 L 12 17.5 M 12 15.75 C 13.3358 15.75 14.5084 15.0516 15.1727 14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
