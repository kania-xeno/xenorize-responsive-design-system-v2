import React from 'react';

/**
 * OKX — exchange logo asset (SVG component)
 *
 * Source: Assets V.2.0.0 → ↪️ ❖ Exchange → icn-exchange-OKX Symbol
 * Node: 13:3692 (variant: square=true, dark=false) | componentSetId: 13:3691
 * Natural size: 32×32px
 * Structure: near-black rounded square (#000008) + white OKX grid mark
 *
 * Asset colors are asset-owned — do NOT apply DS semantic tokens to fill values.
 */
export default function OKX({ width = 32, height = 32 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="#000008"/>
      <path d="M12.9777 8H8.35558C8.15922 8 8 8.15915 8 8.35558V12.9778C8 13.1741 8.15922 13.3334 8.35558 13.3334H12.9777C13.1741 13.3334 13.3333 13.1741 13.3333 12.9778V8.35558C13.3333 8.15915 13.1741 8 12.9777 8Z" fill="white"/>
      <path d="M18.3137 13.3336H13.6915C13.4952 13.3336 13.336 13.4927 13.336 13.6891V18.3114C13.336 18.5077 13.4952 18.6669 13.6915 18.6669H18.3137C18.51 18.6669 18.6692 18.5077 18.6692 18.3114V13.6891C18.6692 13.4927 18.51 13.3336 18.3137 13.3336Z" fill="white"/>
      <path d="M19.0223 8H23.6445C23.8409 8 24 8.15915 24 8.35558V12.9778C24 13.1741 23.8409 13.3334 23.6445 13.3334H19.0223C18.8259 13.3334 18.6667 13.1741 18.6667 12.9778V8.35558C18.6667 8.15915 18.8259 8 19.0223 8Z" fill="white"/>
      <path d="M12.9777 18.6666H8.35558C8.15922 18.6666 8 18.8258 8 19.0221V23.6444C8 23.8408 8.15922 24 8.35558 24H12.9777C13.1741 24 13.3333 23.8408 13.3333 23.6444V19.0221C13.3333 18.8258 13.1741 18.6666 12.9777 18.6666Z" fill="white"/>
      <path d="M19.0223 18.6666H23.6445C23.8409 18.6666 24 18.8258 24 19.0221V23.6444C24 23.8408 23.8409 24 23.6445 24H19.0223C18.8259 24 18.6667 23.8408 18.6667 23.6444V19.0221C18.6667 18.8258 18.8259 18.6666 19.0223 18.6666Z" fill="white"/>
    </svg>
  );
}
