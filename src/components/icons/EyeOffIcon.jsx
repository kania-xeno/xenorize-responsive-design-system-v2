/**
 * EyeOffIcon — ⚠️ PLACEHOLDER
 * Replace SVG paths with real DS icon when available.
 * Used by: PasswordInput toggle (hide password — password is currently visible)
 *
 * ⚠️ STROKE-BASED VECTOR — must use stroke="currentColor" fill="none"
 * Do NOT change to fill="currentColor".
 *
 * Pairing:
 *   showPassword=false → EyeIcon    (eye open  — click to reveal)
 *   showPassword=true  → EyeOffIcon (eye slash — click to hide)
 */
export default function EyeOffIcon(props) {
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

      {/* Eye outline */}
      <path
        d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Iris */}
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />

      {/* Diagonal slash — indicates "off / hidden" */}
      <line
        x1="3"
        y1="17"
        x2="17"
        y2="3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
