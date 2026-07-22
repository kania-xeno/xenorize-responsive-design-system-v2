import React from "react";

/**
 * CircleInfo — "circle-info" icon from Icon System V.2.0.0
 * Variant: filled=on, stroke=1, radius=0, join=round (node 9:98583)
 *
 * Renders at 20×20 and inherits color via `currentColor`.
 * Path is a filled EVENODD shape — outer circle + "i" stem + "i" dot.
 * viewBox matches the vector's own coordinate space (20×20 within 24×24 frame).
 */
export default function CircleInfo(props) {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 10 0 C 4.4772 0 0 4.4772 0 10 C 0 15.5228 4.4772 20 10 20 C 15.5228 20 20 15.5228 20 10 C 20 4.4772 15.5228 0 10 0 Z M 8 8.5 C 8 8.2239 8.2239 8 8.5 8 L 10 8 C 10.2761 8 10.5 8.2239 10.5 8.5 L 10.5 13.5 C 10.5 13.7761 10.2761 14 10 14 C 9.7239 14 9.5 13.7761 9.5 13.5 L 9.5 9 L 8.5 9 C 8.2239 9 8 8.7761 8 8.5 Z M 10 6 C 9.7239 6 9.5 6.2239 9.5 6.5 C 9.5 6.7761 9.7239 7 10 7 C 10.2761 7 10.5 6.7761 10.5 6.5 C 10.5 6.2239 10.2761 6 10 6 Z"
        fill="currentColor"
      />
    </svg>
  );
}
