import React from "react";

/**
 * PeriodRange — a single period-range preset item (Range Picker Time Filter)
 * Maps to Figma ↳period-range COMPONENT_SET (node 2397:2076) — 3 variants:
 *   Default (2397:2077), Hover (2397:2079), Active (2397:2081)
 *
 * Figma geometry: 168×36, cr:8, padL:12 padR:8 (asymmetric — O-09)
 * SM-05 preserved: Active and Hover share surface/bg-hover background
 * F02 open: prototype hover reaction absent in Figma — handled via CSS :hover
 *
 * @param {string}   label             Display label (e.g. "Last 7 days")
 * @param {string}  [value]            Value key for onSelect
 * @param {boolean} [isActive=false]   Active / selected state (period-range--active)
 * @param {boolean} [disabled=false]
 * @param {(value: string) => void} [onSelect]
 */
export default function PeriodRange({ label, value, isActive = false, disabled = false, onSelect }) {
  const classes = [
    "period-range",
    isActive ? "period-range--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    if (!disabled && onSelect) onSelect(value);
  };

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      aria-pressed={isActive}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
