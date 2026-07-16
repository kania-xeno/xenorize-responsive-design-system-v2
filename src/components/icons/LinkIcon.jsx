/**
 * LinkIcon — ⚠️ PLACEHOLDER
 * Replace SVG paths with real DS icon when available.
 * Used by: LinkInput (leading/trailing icon)
 * Bind: fill="currentColor" (fill-based icon)
 */
export default function LinkIcon(props) {
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
        d="M8.5 11.5L11.5 8.5M7.5 13C6.12 14.38 4 14.38 2.62 13C1.24 11.62 1.24 9.5 2.62 8.12L5.5 5.24C6.88 3.86 9 3.86 10.38 5.24C11.76 6.62 11.76 8.74 10.38 10.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12.5 7C13.88 5.62 16 5.62 17.38 7C18.76 8.38 18.76 10.5 17.38 11.88L14.5 14.76C13.12 16.14 11 16.14 9.62 14.76C8.24 13.38 8.24 11.26 9.62 9.88"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
