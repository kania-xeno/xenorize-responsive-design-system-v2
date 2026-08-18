import React from 'react';

/**
 * Binance — exchange logo asset (SVG component)
 *
 * Source: Assets V.2.0.0 → ↪️ ❖ Exchange → icn-exchange-Binance Symbol
 * Node: 13:3092 (variant: square=true, dark=false) | componentSetId: 13:3091
 * Natural size: 32×32px
 * Structure: black rounded square (#0B0E11) + gold BNB diamond pattern (#F0B90B)
 *
 * Asset colors are asset-owned — do NOT apply DS semantic tokens to fill values.
 */
export default function Binance({ width = 32, height = 32 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="#0B0E11"/>
      <path d="M16 10.5202L12.116 14.4041L9.85596 12.1441L16 6L22.146 12.1461L19.886 14.4062L16 10.5202Z" fill="#F0B90B"/>
      <path d="M10.5201 15.9998L8.26009 13.7398L6 15.9999L8.25997 18.2599L10.5201 15.9998Z" fill="#F0B90B"/>
      <path d="M16 21.4797L12.116 17.5958L9.85273 19.8528L9.85588 19.8559L16 26L22.146 19.8539L22.1472 19.8528L19.8859 17.5939L16 21.4797Z" fill="#F0B90B"/>
      <path d="M23.7401 18.2602L26.0001 16.0002L23.7401 13.7402L21.4802 16.0002L23.7401 18.2602Z" fill="#F0B90B"/>
      <path d="M18.2933 15.9989H18.2923L18.2944 16L15.9999 18.2945L13.7086 16.0032L13.7055 16L15.9999 13.7055L18.2933 15.9989Z" fill="#F0B90B"/>
    </svg>
  );
}
