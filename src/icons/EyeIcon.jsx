/**
 * EyeIcon
 * DS canonical: eye-open · node 9:105540
 * Source: Icon System - V.2.0.0
 * Variant: filled=off · stroke=1 · radius=0 · join=square
 * Used by: PasswordInput toggle (password hidden → click to reveal)
 * Pairing: showPassword=false → EyeIcon · showPassword=true → EyeOffIcon
 */
export default function EyeIcon({ size = 24, ...props }) {
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
      <path
        d="M2 12C6.82745 2.00007 17.1725 1.99995 22 11.9999C17.1725 21.9999 6.82745 22 2 12Z"
        strokeLinecap="round"
      />
      <path
        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
