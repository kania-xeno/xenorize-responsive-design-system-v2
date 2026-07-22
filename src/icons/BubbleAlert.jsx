import React from "react";

// bubble-alert, comment, feedback
// Icon System - V.2.0.0 | Component set: 9:77857 | Node: 9:77916
// Variant: filled=on, stroke=1, radius=0, join=round
// Frame: 24×24 | Vector child: x=3, y=3, w=18, h=18.5
// Winding rule: EVENODD
// Primary use in Badge: rendered at 12×12px
export default function BubbleAlert({ width = 12, height = 12, ...props }) {
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
      <g transform="translate(3 3)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 0.5 0 C 0.367 0 0.24 0.053 0.146 0.146 C 0.053 0.24 0 0.367 0 0.5 L 0 15.5 C 0 15.776 0.224 16 0.5 16 L 5.834 16 L 8.677 18.383 C 8.862 18.538 9.131 18.539 9.317 18.385 L 12.196 16 L 17.5 16 C 17.776 16 18 15.776 18 15.5 L 18 0.5 C 18 0.224 17.776 0 17.5 0 L 0.5 0 Z M 9 4 C 9.276 4 9.5 4.224 9.5 4.5 L 9.5 9 C 9.5 9.276 9.276 9.5 9 9.5 C 8.724 9.5 8.5 9.276 8.5 9 L 8.5 4.5 C 8.5 4.224 8.724 4 9 4 Z M 9 12.25 C 9.414 12.25 9.75 11.914 9.75 11.5 C 9.75 11.086 9.414 10.75 9 10.75 C 8.586 10.75 8.25 11.086 8.25 11.5 C 8.25 11.914 8.586 12.25 9 12.25 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
