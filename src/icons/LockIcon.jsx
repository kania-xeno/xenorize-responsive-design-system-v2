/**
 * LockIcon
 * DS canonical: lock · node 9:40033
 * Source: Icon System - V.2.0.0
 * Variant: filled=off · stroke=1 · radius=0 · join=square
 * Used by: PasswordInput (leading icon)
 * ⚠️ icon/disabled = #D1D1D1 (icon/dissabled — intentional DS typo)
 */
export default function LockIcon({ size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4.5 9.5H19.5V21.5H4.5V9.5Z" strokeLinecap="square" />
      <path
        d="M15.5 9.5V6C15.5 4.067 13.933 2.5 12 2.5C10.067 2.5 8.5 4.067 8.5 6V9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 14V17" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}
