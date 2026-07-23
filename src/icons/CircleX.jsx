import React from "react";

/**
 * CircleX — "circle-x" icon from Icon System V.2.0.0
 * Variant: filled=on, stroke=1, radius=0, join=round (node 9:100399)
 *
 * Renders at 20×20 and inherits color via `currentColor`.
 * Path is a filled EVENODD shape — outer circle + × cutout.
 * viewBox matches the vector's own coordinate space (20×20 within 24×24 frame).
 *
 * Figma source: Icon System file LedlgNlwu4pXBMmGmAr6op · componentSetId 9:100327
 * Extracted: 2026-07-23
 */
export default function CircleX(props) {
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
        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM7.35355 6.64645C7.15829 6.45118 6.84171 6.45118 6.64645 6.64645C6.45118 6.84171 6.45118 7.15829 6.64645 7.35355L9.29289 10L6.64645 12.6464C6.45118 12.8417 6.45118 13.1583 6.64645 13.3536C6.84171 13.5488 7.15829 13.5488 7.35355 13.3536L10 10.7071L12.6464 13.3536C12.8417 13.5488 13.1583 13.5488 13.3536 13.3536C13.5488 13.1583 13.5488 12.8417 13.3536 12.6464L10.7071 10L13.3536 7.35355C13.5488 7.15829 13.5488 6.84171 13.3536 6.64645C13.1583 6.45118 12.8417 6.45118 12.6464 6.64645L10 9.29289L7.35355 6.64645Z"
        fill="currentColor"
      />
    </svg>
  );
}
