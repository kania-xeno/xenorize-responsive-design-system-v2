import React from "react";

/**
 * CircleCheck — PLACEHOLDER
 * ⚠️ SVG paths are temporary geometry. Replace with DS icon paths when available.
 *
 * DS source: "circle-check, check radio, circle, checkbox, check, checkmark, confirm"
 * Figma vector node: 9:96443 · Page: icon system
 *
 * Matches CircleInfo interface: 20×20, currentColor fill, aria-hidden, {...props} spread.
 * All consumers (PasswordStrength) use width=16 height=16 passed via props.
 *
 * TODO: Extract real SVG path data from Figma once Desktop Bridge plugin is running
 *       or FIGMA_ACCESS_TOKEN is configured.
 */
export default function CircleCheck(props) {
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
      {/* PLACEHOLDER — white checkmark cutout */}
      <path
        d="M5.5 10.5L8.5 13.5L14.5 7.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
