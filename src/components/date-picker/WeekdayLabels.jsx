import React from "react";
import { formatWeekdayLabels } from "./dateUtils.js";

/**
 * WeekdayLabels — 7-cell row of day-of-week column headers (Mon → Sun)
 * Maps to Figma ↳day label COMPONENT_SET (node 2397:2041), 1 variant
 *
 * Figma geometry: 7 × 40×40 cells, cr:10 on COMPONENT master (R13 resolved)
 * Text fill: text/day-label (#A3A3A3)
 * Layout: 328×40 header row
 *
 * Accessibility: rendered as role="row" containing role="columnheader" cells,
 * matching the WAI-ARIA grid pattern (A3.12.5).
 *
 * @param {number} [firstDayOfWeek=0]  0=Mon (Figma default), …6=Sun
 * @param {string} [locale='en-US']    Intl locale
 */
export default function WeekdayLabels({ firstDayOfWeek = 0, locale = "en-US" }) {
  const labels = formatWeekdayLabels(firstDayOfWeek, locale);

  return (
    <div className="weekday-labels" role="row">
      {labels.map(({ short, long }, i) => (
        <div
          key={i}
          className="weekday-label"
          role="columnheader"
          aria-label={long}
          scope="col"
        >
          {short}
        </div>
      ))}
    </div>
  );
}
