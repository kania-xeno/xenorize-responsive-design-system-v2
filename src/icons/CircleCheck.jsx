import React from "react";

/**
 * CircleCheck — "circle-check" icon from Icon System V.2.0.0
 * Variant: filled=on, stroke=1, radius=0, join=round (node 9:96443)
 *
 * Renders at 20×20 and inherits color via `currentColor`.
 * Path is a filled EVENODD shape — outer circle + checkmark cutout.
 * viewBox matches the vector's own coordinate space (20×20 within 24×24 frame).
 *
 * Figma source: Icon System file LedlgNlwu4pXBMmGmAr6op · componentSetId 9:96382
 * Extracted: 2026-07-23
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM13.387 7.81662C13.5618 7.6029 13.5303 7.28789 13.3166 7.11302C13.1029 6.93816 12.7879 6.96966 12.613 7.18338L8.46288 12.2558L6.85355 10.6464C6.65829 10.4512 6.34171 10.4512 6.14645 10.6464C5.95118 10.8417 5.95118 11.1583 6.14645 11.3536L8.14645 13.3536C8.24634 13.4534 8.38382 13.5064 8.52491 13.4994C8.666 13.4923 8.79752 13.426 8.88698 13.3166L13.387 7.81662Z"
        fill="currentColor"
      />
    </svg>
  );
}
