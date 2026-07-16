/**
 * CalendarIcon — ⚠️ PLACEHOLDER
 * Replace SVG paths with real DS icon when available.
 * Used by: DateInput (trailing icon)
 * Bind: fill="currentColor" (fill-based icon)
 */
export default function CalendarIcon(props) {
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
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 2v3M13 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
