import React from 'react';

/**
 * CatalystLogo — company/placeholder asset (SVG component)
 *
 * Source: Assets V.2.0.0 → Placeholder Logo → Catalyst (node 2280:1113, Style=Original)
 * Natural size: 40×40px. Orange (#FA7319) circle background with 3 white-to-transparent
 * linear gradient overlays at fill-opacity 0.72 / 0.88 / 0.72, masked by a clipPath.
 * Used in SwitchCard type="company" via the `companyAsset` prop.
 *
 * useId() is used to generate unique gradient and clipPath IDs per render, preventing
 * conflicts when multiple instances appear on the same page (e.g., card grids).
 * Pattern follows Aurora.jsx exactly — replace `:` from React's useId() output.
 *
 * Asset colors are asset-owned — do NOT apply DS tokens to fill values.
 * SVG path data extracted from Figma node 2280:1113 via exportAsync({format:'SVG'}).
 */
export default function CatalystLogo() {
  const uid  = React.useId().replace(/:/g, '');
  const g0   = `catalyst-g0-${uid}`;
  const g1   = `catalyst-g1-${uid}`;
  const g2   = `catalyst-g2-${uid}`;
  const clip = `catalyst-clip-${uid}`;
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath={`url(#${clip})`}>
        <path
          d="M0 20C0 8.95431 8.95431 0 20 0V0C31.0457 0 40 8.95431 40 20V20C40 31.0457 31.0457 40 20 40V40C8.95431 40 0 31.0457 0 20V20Z"
          fill="#FA7319"
        />
        <path
          d="M0 36.0001C6.62744 36.0001 12 30.6275 12 24.0002C12 17.3727 6.62744 12.0001 0 12.0001V20.4001C1.98821 20.4001 3.59998 22.0119 3.59998 24.0002C3.59998 25.9883 1.98821 27.6001 0 27.6001V36.0001Z"
          fill={`url(#${g0})`}
          fillOpacity="0.72"
        />
        <path
          d="M40 16.0005C37.9494 15.3509 35.7657 15.0004 33.4999 15.0004C21.6258 15.0004 12 24.6263 12 36.5003C12 37.6922 12.097 38.8614 12.2834 40.0004H25.6421C25.1652 38.9312 24.9001 37.7468 24.9001 36.5003C24.9001 31.7507 28.7503 27.9003 33.4999 27.9003C36.0959 27.9003 38.4231 29.0505 40 30.869V16.0005Z"
          fill={`url(#${g1})`}
          fillOpacity="0.88"
        />
        <path
          d="M2.10986 0.000366211C3.10475 9.00025 10.7349 16.0004 20 16.0004C29.265 16.0004 36.8953 9.00025 37.8901 0.000366211H25.0175C24.2228 1.99258 22.2757 3.40035 20 3.40035C17.7242 3.40035 15.7773 1.99258 14.9825 0.000366211H2.10986Z"
          fill={`url(#${g2})`}
          fillOpacity="0.72"
        />
      </g>
      <defs>
        <linearGradient
          id={g0}
          x1="5.99999"
          y1="12.0001"
          x2="5.99999"
          y2="48.3926"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.313079" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={g1}
          x1="26"
          y1="15.0004"
          x2="26"
          y2="52.9092"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.313079" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={g2}
          x1="20"
          y1="0.000366211"
          x2="20"
          y2="24.2621"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.313079" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clip}>
          <path
            d="M0 20C0 8.95431 8.95431 0 20 0V0C31.0457 0 40 8.95431 40 20V20C40 31.0457 31.0457 40 20 40V40C8.95431 40 0 31.0457 0 20V20Z"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
