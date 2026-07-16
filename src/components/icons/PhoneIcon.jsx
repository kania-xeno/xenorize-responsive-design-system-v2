/**
 * PhoneIcon — ⚠️ PLACEHOLDER
 * Replace SVG paths with real DS icon when available.
 * Used by: PhoneNumberInput (country/flag area indicator)
 * Bind: fill="currentColor" (fill-based icon)
 */
export default function PhoneIcon(props) {
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
      {/* ⚠️ PLACEHOLDER geometry — replace with DS path data */}
      <path
        d="M6.5 3.5C6.5 3.5 5 3.5 4.5 5C4 6.5 4.5 8 6 9.5L10.5 14C12 15.5 13.5 16 15 15.5C16.5 15 16.5 13.5 16.5 13.5L14.5 11.5L12.5 13L7 7.5L8.5 5.5L6.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
