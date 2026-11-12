import React from "react";
import { formatDayNumber, formatFullDate } from "./dateUtils.js";

/**
 * DayCell — a single 40×40 calendar day cell
 * Maps to Figma ↳day-cells COMPONENT_SET (node 2397:2044) — 12 variants
 * (C1 DT-D2.1: corrected from stale reference 2397:2140)
 *
 * Variant mapping (all state classes in DatePicker.css):
 *   Basic/Default       → (no extra class)
 *   Basic/Hover         → :hover (CSS)
 *   Basic/Active        → day-cell--active
 *   Basic/Disabled      → day-cell--disabled
 *   Basic/Default+Marked→ day-cell--marked
 *   Basic/Hover+Marked  → day-cell--marked :hover (F01: text stays text/default)
 *   Basic/Active+Marked → day-cell--marked day-cell--active
 *   Basic/Disabled+Mark → day-cell--marked day-cell--disabled
 *   Range/Default       → day-cell--range
 *   Range/Hover         → day-cell--range :hover (CSS)
 *   Range/Active        → day-cell--range-active  (start or end cap)
 *   Range/Disabled      → day-cell--range-disabled
 *
 * Overflow cells (prev/next month):
 *   isOverflow=true → isDisabled=true from buildCalendarGrid.
 *   Rendered as day-cell--disabled with day number visible (C3 DT-D2.1).
 *   Figma renders them as visible disabled cells, not hidden filler.
 *
 * Today dot vs Marked dot:
 *   No "today dot" (indicator for the current date) exists in the Figma COMPONENT_SET.
 *   DT-D2.1 inspection: todayDotSearch returned empty; variants have a single TEXT child only.
 *
 *   "Marked dot" (C2 DT-D2.2): 4 Marked variant ELLIPSE nodes DO exist in live Figma
 *   (nodes 2397:2056, 2397:2059, 2397:2063, 2397:2066). These are 3×3px ELLIPSE children,
 *   bottom-centered at 6px from bottom. Restored as ::after pseudo-element in DatePicker.css.
 *   isMarked=true → adds day-cell--marked CSS class → renders the dot via ::after.
 *
 *   isMarked is used for BOTH the visual ::after dot AND semantic aria-label text (C4 DT-D2.1).
 *
 * Accessibility: role="gridcell", aria-selected, aria-disabled, aria-label (full date)
 * Focus model:   roving tabindex (tabIndex={0} on focused cell, -1 on all others)
 *
 * @param {Date}     date              The date this cell represents
 * @param {string}  [locale='en-US']   Intl locale for aria-label
 * @param {boolean} [isSelected]       Basic/Active — currently selected date
 * @param {boolean} [isDisabled]       Disabled (overflow, out-of-range, or explicit)
 * @param {boolean} [isOverflow]       Prev/next month cell — rendered as disabled (C3)
 * @param {boolean} [isMarked]         Marked — adds day-cell--marked class; CSS ::after dot restored C2 DT-D2.2
 * @param {boolean} [isInRange]        Range interior cell (Type=Range)
 * @param {boolean} [isRangeStart]     Range start endpoint (Range/Active)
 * @param {boolean} [isRangeEnd]       Range end endpoint (Range/Active)
 * @param {boolean} [isRangePreview]   In-progress range preview (hover before end selected)
 * @param {number}  [tabIndex=-1]      Roving tabindex value (0 = focused cell)
 * @param {(date: Date) => void} [onClick]
 * @param {(date: Date) => void} [onMouseEnter]
 * @param {(e: React.KeyboardEvent) => void} [onKeyDown]
 * @param {React.Ref} [ref]            Forwarded to div element (roving focus)
 */
const DayCell = React.forwardRef(function DayCell(
  {
    date,
    locale = "en-US",
    isSelected = false,
    isDisabled = false,
    isOverflow = false,
    isMarked = false,
    isInRange = false,
    isRangeStart = false,
    isRangeEnd = false,
    isRangePreview = false,
    tabIndex = -1,
    onClick,
    onMouseEnter,
    onKeyDown,
  },
  ref
) {
  if (!date) return null;

  const dayNumber = formatDayNumber(date);
  const fullLabel  = formatFullDate(date, locale);

  // Build class list from state flags
  const classes = ["day-cell"];

  if (isRangeStart || isRangeEnd) {
    // Range endpoint: Range/Active — Figma 2397:2072
    classes.push("day-cell--range-active");
    if (isMarked)   classes.push("day-cell--marked");
    if (isDisabled) classes.push("day-cell--range-disabled");
  } else if (isInRange) {
    // Range interior: Range/Default — Figma 2397:2067
    classes.push("day-cell--range");
    if (isDisabled) classes.push("day-cell--range-disabled");
  } else if (isRangePreview) {
    // In-progress hover preview
    classes.push("day-cell--range-preview");
  } else {
    // Basic type variants (including overflow cells which are always disabled)
    if (isSelected) classes.push("day-cell--active");
    if (isDisabled) classes.push("day-cell--disabled");
    if (isMarked)   classes.push("day-cell--marked");
  }

  // Aria annotations
  const ariaSelected = isSelected || isRangeStart || isRangeEnd || undefined;
  const ariaDisabled = isDisabled || undefined;

  const handleClick = () => {
    if (!isDisabled && onClick) onClick(date);
  };

  const handleMouseEnter = () => {
    // A2 DT-D2-A: Do not fire onMouseEnter on disabled cells — prevents hover-preview
    // from updating while cursor passes over overflow, out-of-range, or explicitly disabled cells.
    if (!isDisabled && onMouseEnter) onMouseEnter(date);
  };

  return (
    <div
      ref={ref}
      role="gridcell"
      className={classes.join(" ")}
      aria-selected={ariaSelected}
      aria-disabled={ariaDisabled}
      aria-label={fullLabel}
      tabIndex={isDisabled ? -1 : tabIndex}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onKeyDown={!isDisabled ? onKeyDown : undefined}
      /* data-date for external hooks / testing */
      data-date={date.toISOString().slice(0, 10)}
    >
      {dayNumber}
    </div>
  );
});

export default DayCell;
