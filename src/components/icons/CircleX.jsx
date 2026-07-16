import React from "react";

/**
 * CircleX — PLACEHOLDER
 * ⚠️ SVG paths are temporary geometry. Replace with DS icon paths when available.
 *
 * DS source: "circle-x, close, checkbox, remove"
 * Figma vector node: 9:100399 · Page: icon system
 *
 * Matches CircleInfo interface: 20×20, currentColor fill, aria-hidden, {...props} spread.
 * All consumers (PasswordStrength) use width=16 height=16 passed via props.
 *
 * TODO: Extract real SVG path data from Figma once Desktop Bridge plugin is running
 *       or FIGMA_ACCESS_TOKEN is configured.
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
      {/* PLACEHOLDER — filled circle */}
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      {/* PLACEHOLDER — white × cutout */}
      <path
        d="M7 7L13 13M13 7L7 13"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
