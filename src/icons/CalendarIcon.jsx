/**
 * CalendarIcon
 * DS canonical: calendar-2 · node 9:87135
 * Source: Icon System - V.2.0.0
 * Variant: filled=off · stroke=1 · radius=0 · join=square
 * Used by: DateInput (trailing icon)
 */
export default function CalendarIcon({ size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3.5 4.5H20.5V20.5H3.5V4.5Z" />
      <path d="M3.5 9.5H20.5" strokeLinejoin="round" />
      <path d="M7.5 4.5V2.5" strokeLinejoin="round" />
      <path d="M16.5 4.5V2.5" strokeLinejoin="round" />
    </svg>
  );
}
