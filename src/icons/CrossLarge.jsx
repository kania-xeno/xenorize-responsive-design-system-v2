import React from "react";

// cross-large, crossed large, close
// Icon System - V.2.0.0 | Component set: 9:103195 | Node: 9:103236
// Variant: filled=off, stroke=1, radius=0, join=square
// Frame: 24×24 | Vector child: x=4.5, y=4.5, w=15, h=15
// Path data: M 0 0 L 15 15 M 15 0 L 0 15
// Rendered via stroke (filled=off) — use stroke="currentColor" in SVG
// Primary use in Alert dismiss: rendered at 16×16px
export default function CrossLarge({ width = 16, height = 16, ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <g transform="translate(4.5 4.5)">
        <path
          d="M 0 0 L 15 15 M 15 0 L 0 15"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </g>
    </svg>
  );
}
