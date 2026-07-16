/**
 * SearchIcon — ⚠️ PLACEHOLDER
 * Replace SVG paths with real DS icon when available.
 * Used by: SearchInput (leading icon)
 * Bind: fill="currentColor" (fill-based icon)
 */
export default function SearchIcon(props) {
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
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
