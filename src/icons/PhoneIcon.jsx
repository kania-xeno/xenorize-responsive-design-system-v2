/**
 * PhoneIcon
 * DS canonical: phone · node 9:8281
 * Source: Icon System - V.2.0.0
 * Variant: filled=off · stroke=1 · radius=0 · join=round
 * Used by: PhoneNumberInput (leading icon)
 * ⚠️ icon/disabled = #A3A3A3 (icon/soft)
 */
export default function PhoneIcon({ size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M9.5 20.5H14.5M5.5 1.5H18.5V22.5H5.5V1.5Z" />
    </svg>
  );
}
