import React from "react";

/**
 * CopyIcon — "layers / copy" icon used by Figma's icon-only Button variant
 * (node 1897:1833, two overlapping rounded squares, 20x20).
 *
 * Renders at 20x20 and inherits color via `currentColor`, matching the
 * button's `.button__icon` sizing.
 */
export default function CopyIcon(props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="6.67"
        y="6.67"
        width="11.67"
        height="11.67"
        rx="1.67"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.33 13.33c-0.92 0-1.67-0.75-1.67-1.67V3.33c0-0.92 0.75-1.67 1.67-1.67h8.33c0.92 0 1.67 0.75 1.67 1.67"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
