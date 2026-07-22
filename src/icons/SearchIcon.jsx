/**
 * SearchIcon
 * DS canonical: magnifying-glass-2 · node 9:92084
 * Source: Icon System - V.2.0.0
 * Variant: filled=off · stroke=1 · radius=0 · join=square
 * Used by: SearchInput (leading icon)
 */
export default function SearchIcon({ size = 24, ...props }) {
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
      <path d="M11 18.5C15.1421 18.5 18.5 15.1421 18.5 11C18.5 6.85786 15.1421 3.5 11 3.5C6.85786 3.5 3.5 6.85786 3.5 11C3.5 15.1421 6.85786 18.5 11 18.5Z" />
      <path d="M20.25 20.25L16.3 16.3" />
    </svg>
  );
}
