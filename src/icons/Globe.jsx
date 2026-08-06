import React from "react";

/**
 * Globe — "globus, map, earth, globe" icon from Icon System V.2.0.0
 * Variant: filled=off, stroke=1, radius=0, join=square (node 9:31986)
 * Component key: f10db00b29239b38934a277ca2a589db5c1d2066
 *
 * Renders at 24×24 and inherits color via `currentColor`.
 * Two stroke paths — outer globe (meridians + circle) + equator line.
 * strokeLinecap="square", strokeJoin="miter" (DS default for this variant).
 */
export default function Globe(props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5M12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5M12 21.5C9.79086 21.5 8 17.2467 8 12C8 6.75329 9.79086 2.5 12 2.5M12 21.5C14.2091 21.5 16 17.2467 16 12C16 6.75329 14.2091 2.5 12 2.5"
        stroke="currentColor"
        strokeLinecap="square"
      />
      <path
        d="M21 12H3"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}
