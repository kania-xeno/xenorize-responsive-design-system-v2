/**
 * LockIcon — ⚠️ PLACEHOLDER
 * Replace SVG paths with real DS icon when available.
 * Used by: PasswordInput (leading icon)
 * ⚠️ STROKE-BASED VECTOR — must use stroke="currentColor" fill="none"
 * Do NOT change to fill="currentColor".
 */
export default function LockIcon(props) {
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
      <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 9V6.5C7 4.567 8.343 3 10 3C11.657 3 13 4.567 13 6.5V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
