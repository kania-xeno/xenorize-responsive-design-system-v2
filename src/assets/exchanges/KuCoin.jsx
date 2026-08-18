import React from 'react';

/**
 * KuCoin — exchange logo asset (SVG component)
 *
 * Source: Assets V.2.0.0 → ↪️ ❖ Exchange → icn-exchange-KuCoin Symbol
 * Node: 13:3647 (variant: square=true, dark=false) | componentSetId: 13:3646
 * Natural size: 32×32px
 * Structure: green rounded square (#28CD96) + white KuCoin K-mark
 *
 * Asset colors are asset-owned — do NOT apply DS semantic tokens to fill values.
 */
export default function KuCoin({ width = 32, height = 32 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="#28CD96"/>
      <path d="M12.4103 16.0039L18.583 9.83119L22.4738 13.722C23.1545 14.4182 24.2838 14.4182 24.9568 13.722C25.6529 13.0413 25.6529 11.912 24.9568 11.239L19.8283 6.11055C19.1322 5.42985 18.0183 5.42985 17.3299 6.11055L9.92727 13.5132V9.11955C9.92727 8.15265 9.14602 7.35592 8.16365 7.35592C7.19675 7.35592 6.40002 8.13718 6.40002 9.11955V22.896C6.40002 23.8629 7.18128 24.6596 8.16365 24.6596C9.13055 24.6596 9.92727 23.8783 9.92727 22.896V18.4869L17.3299 25.8895C18.026 26.5702 19.1399 26.5702 19.8283 25.8895L24.9568 20.7611C25.6374 20.0649 25.6374 18.951 24.9568 18.278C24.2606 17.5973 23.1467 17.5973 22.4738 18.278L18.583 22.1689L12.4103 16.0039ZM18.583 17.7675C17.6006 17.7675 16.8039 16.9863 16.8039 16.0039C16.8039 15.0215 17.5851 14.2248 18.5675 14.2248C19.5499 14.2248 20.3466 15.006 20.3466 15.9884V16.0039C20.3311 16.9708 19.5499 17.7521 18.583 17.7675Z" fill="white"/>
    </svg>
  );
}
