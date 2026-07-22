/**
 * EyeOffIcon
 * DS canonical: eye-closed · node 9:105616
 * Source: Icon System - V.2.0.0
 * Variant: filled=off · stroke=1 · radius=0 · join=round
 * Used by: PasswordInput toggle (password visible → click to hide)
 * Pairing: showPassword=false → EyeIcon · showPassword=true → EyeOffIcon
 */
export default function EyeOffIcon({ size = 24, ...props }) {
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
      <path d="M3.5 13.1017C8.43545 18.3493 15.5645 18.3493 20.5 13.1017" />
      <path d="M3.5 7.43583C5.96774 4.81197 8.98389 3.50002 12 3.5C15.0162 3.49998 18.0323 4.81186 20.5 7.43564" />
      <path d="M12 17.25V20.5" />
      <path d="M8 16.75L6.5 19.2321" />
      <path d="M15.75 16.75L17.5 19.2321" />
    </svg>
  );
}
