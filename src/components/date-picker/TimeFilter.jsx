import React from "react";
import PeriodRange from "./PeriodRange.jsx";
import { DEFAULT_PERIOD_RANGES } from "./dateUtils.js";

/**
 * TimeFilter — sidebar with 8 period-range preset items (Range Picker only)
 * Maps to Figma "Time Filter" frame (node 2397:2152)
 *
 * Figma geometry: 200×432 · padT:20 padL:16 padR:16 padB:2 · gap:8
 * Right border: 1px solid date-picker/border/default
 * 8 ↳period-range instances: 168×36 each
 *
 * When hidden: showTimeFilter=false → adds time-filter--hidden CSS class (display:none)
 *
 * @param {boolean} [show=true]              Visibility — maps to Figma ⏳ Time Filter BOOLEAN
 * @param {string|null} [value]              Currently active period key
 * @param {Array<{label:string,value:string}>} [options]  Custom period list (defaults to DEFAULT_PERIOD_RANGES)
 * @param {boolean} [disabled=false]         Disable all period-range items (C5 DT-D2.2)
 * @param {(value: string) => void} [onChange]
 */
export default function TimeFilter({
  show = true,
  value: activeValue = null,
  options = DEFAULT_PERIOD_RANGES,
  disabled = false,
  onChange,
}) {
  const classes = ["time-filter", !show ? "time-filter--hidden" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={classes} aria-label="Preset time ranges">
      {options.map((opt) => (
        <PeriodRange
          key={opt.value}
          label={opt.label}
          value={opt.value}
          isActive={opt.value === activeValue}
          disabled={disabled}
          onSelect={onChange}
        />
      ))}
    </nav>
  );
}
