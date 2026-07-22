import React from "react";

/**
 * Rose — "rose, flower, romance, love" icon from Icon System V.2.0.0
 * Variant: filled=off, stroke=1, radius=0, join=square
 * Figma node: 9:83079 · Page: icon system
 * Frame: 24×24
 *
 * 3 vector children (local-space paths + frame x/y offsets):
 *   Vector 1 — stem:      x=12, y=19.5  →  translate(12, 19.5)
 *   Vector 2 — calyx arc: x=7.5, y=2.5  →  translate(7.5, 2.5)
 *   Vector 3 — rose body: x=4.5, y=6.5  →  translate(4.5, 6.5)
 *
 * All strokes: currentColor, strokeWidth=1, strokeLinecap=square, strokeLinejoin=miter, fill=none.
 * Paths extracted from Figma Desktop Bridge (Plugin API) — session 2026-07-22.
 *
 * Used by: Breadcrumb (item leading icon)
 * Semantic rename of DS icon pending — functional name in Figma is "rose, flower, romance, love"
 */
export default function Rose({ size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Vector 1 — stem */}
      <g transform="translate(12, 19.5)">
        <path
          d="M 0 0 L 0 2"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </g>

      {/* Vector 2 — calyx arc */}
      <g transform="translate(7.5, 2.5)">
        <path
          d="M 0 4 C 1.0965598672628403 2.104879515511649 2.5134905576705933 0.8779738971165247 4.5 0 C 6.486509442329407 0.8779738971165247 7.903439998626709 2.104879515511649 9 4"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </g>

      {/* Vector 3 — rose body */}
      <g transform="translate(4.5, 6.5)">
        <path
          d="M 9 12.5 L 9 8 C 9 6.259281635284424 8.44404125213623 4.648414611816406 7.500001430511475 3.3352773189544678 M 7.500001430511475 3.3352773189544678 C 6.047886848449707 1.3154191970825195 3.6775596141815186 0 1 0 L 0 0 L 0 5.5 C 0 9.642135620117188 3.3578643798828125 13 7.5 13 C 11.642135620117188 13 15 9.642135620117188 15 5.5 L 15 0 L 14 0 C 11.322440147399902 0 8.952116012573242 1.3154191970825195 7.500001430511475 3.3352773189544678 Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </g>
    </svg>
  );
}
