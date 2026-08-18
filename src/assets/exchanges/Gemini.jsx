import React from 'react';

/**
 * Gemini — exchange logo asset (SVG component)
 *
 * Source: Assets V.2.0.0 → ↪️ ❖ Exchange → icn-exchange-Gemini Symbol
 * Node: 13:3620 (variant: square=true, dark=false) | componentSetId: 13:3619
 * Natural size: 32×32px
 * Structure: cyan rounded square (#00DCFA) + white Gemini G-mark
 *
 * Asset colors are asset-owned — do NOT apply DS semantic tokens to fill values.
 */
export default function Gemini({ width = 32, height = 32 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="#00DCFA"/>
      <path d="M18.9716 6.80627C15.565 6.80627 12.6834 9.41989 12.3371 12.7372C9.01985 13.0834 6.40625 15.9651 6.40625 19.3717C6.40625 23.0352 9.37727 26.0063 13.0408 26.0063C16.4474 26.0063 19.3179 23.3927 19.6753 20.0754C22.9926 19.7291 25.6062 16.8475 25.6062 13.4408C25.6062 9.7773 22.6351 6.80627 18.9716 6.80627ZM24.0313 14.2227C23.6851 16.49 21.9315 18.2325 19.6641 18.5899V14.2227H24.0313ZM7.96994 18.5899C8.31619 16.3225 10.0698 14.5801 12.3371 14.2227V18.5899H7.96994ZM18.1786 20.0754C17.8324 22.6108 15.6432 24.4426 13.119 24.4426C10.5835 24.4426 8.40554 22.6108 8.0593 20.0754H18.1786ZM18.1786 14.2338V18.601H13.8115V14.2338H18.1786ZM24.0201 12.7483H13.8115C14.1577 10.2129 16.3469 8.38114 18.8711 8.38114C21.4847 8.29179 23.6739 10.2129 24.0201 12.7483Z" fill="white"/>
    </svg>
  );
}
