/**
 * LinkIcon
 * DS canonical: chain-link-4 · node 9:99575
 * Source: Icon System - V.2.0.0
 * Variant: filled=off · stroke=1 · radius=0 · join=round
 * Used by: LinkInput (leading icon)
 * ⚠️ icon/disabled = #A3A3A3 (icon/soft)
 */
export default function LinkIcon({ size = 24, ...props }) {
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
      <path d="M9.95972 18.63L9.78472 18.805C8.19139 20.3983 5.60808 20.3983 4.01474 18.805L3.66473 18.455C2.07139 16.8617 2.07139 14.2783 3.66473 12.685L7.07474 9.275C8.66807 7.68166 11.2514 7.68166 12.8447 9.275L13.1947 9.62501C13.8614 10.2917 14.2491 11.1317 14.3579 12M9.64147 12C9.75024 12.8683 10.138 13.7083 10.8047 14.375L11.1547 14.725C12.748 16.3183 15.3313 16.3183 16.9247 14.725L20.3347 11.315C21.928 9.72166 21.928 7.13835 20.3347 5.54501L19.9847 5.195C18.3913 3.60167 15.808 3.60166 14.2147 5.195L14.0397 5.37" />
    </svg>
  );
}
