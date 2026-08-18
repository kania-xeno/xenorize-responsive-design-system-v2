import React from 'react';

/**
 * Chainlink — cryptocurrency logo asset (SVG component)
 *
 * Source: Assets V.2.0.0 → ↪️ ❖ Major Brand Logo → Chainlink (LINK) (node 21:4096)
 * Natural size: 32×32px
 * Structure: blue hexagon chain-link mark (#2A5ADA)
 *
 * Asset colors are asset-owned — do NOT apply DS semantic tokens to fill values.
 */
export default function Chainlink({ width = 32, height = 32 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16 2L13.418 3.47706L6.38206 7.52294L3.80005 9V23L6.38206 24.4771L13.4826 28.5229L16.0646 30L18.6466 28.5229L25.618 24.4771L28.2 23V9L25.618 7.52294L18.5821 3.47706L16 2ZM8.96407 20.0459V11.9541L16 7.90826L23.036 11.9541V20.0459L16 24.0917L8.96407 20.0459Z" fill="#2A5ADA"/>
    </svg>
  );
}
