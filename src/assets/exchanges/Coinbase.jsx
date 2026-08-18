import React from 'react';

/**
 * Coinbase — exchange logo asset (SVG component)
 *
 * Source: Assets V.2.0.0 → ↪️ ❖ Exchange → icn-exchange-Coinbase Symbol
 * Node: 13:3101 (variant: square=true, dark=false) | componentSetId: 13:3100
 * Natural size: 32×32px
 * Structure: blue rounded square (#0052FF) + white Coinbase C-mark
 *
 * Asset colors are asset-owned — do NOT apply DS semantic tokens to fill values.
 */
export default function Coinbase({ width = 32, height = 32 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="#0052FF"/>
      <path d="M15.9859 22.0007C12.6709 22.0007 9.98662 19.3151 9.98662 16C9.98662 12.6849 12.6722 10.0007 15.9859 10.0007C18.9556 10.0007 21.4214 12.1661 21.8965 15.0006H27.9409C27.4302 8.84014 22.2761 4 15.9859 4C9.36129 4 3.98593 9.37536 3.98593 16C3.98593 22.6246 9.36129 28 15.9859 28C22.2761 28 27.4316 23.1599 27.9409 16.9994H21.891C21.4159 19.8352 18.9556 22.0007 15.9859 22.0007Z" fill="white"/>
    </svg>
  );
}
