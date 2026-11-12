import React, { useId } from "react";
import CalendarHeader from "./CalendarHeader.jsx";
import WeekdayLabels from "./WeekdayLabels.jsx";
import CalendarGrid from "./CalendarGrid.jsx";
import { addMonths } from "./dateUtils.js";

/**
 * CalendarPanel — a single month calendar panel
 * Combines: CalendarHeader + WeekdayLabels + CalendarGrid
 * Maps to Figma "Date Picker Items" frame (2397:2098) for DP,
 * and Left/Right panels inside dual-calendar frame for RP.
 *
 * Figma geometry (A3.4.2):
 *   368×364 · padT:20 padL:20 padR:20 padB:0 · gap:8
 *   Border-bottom: 1px solid date-picker/border/default (DP only)
 *   For RP: Panel 1 has right-border; Panel 2 has no extra borders
 *
 * @param {Date}      viewDate           Month currently in view
 * @param {string}   [locale='en-US']
 * @param {number}   [firstDayOfWeek=0]  0=Mon (Figma default)
 * @param {string}   [panelPosition]     'left' | 'right' (for RP CSS modifier)
 * @param {boolean}  [showPrevNav=true]  Show previous-month CompactButton
 * @param {boolean}  [showNextNav=true]  Show next-month CompactButton
 * @param {boolean}  [disabled=false]    Whole-panel disabled — disables nav buttons (C5 DT-D2.2)
 *                                       and forces all CalendarGrid cells to tabIndex=-1 (C3 DT-D2.2.3)
 * @param {Date|null} [minDate]
 * @param {Date|null} [maxDate]
 * @param {Date|null} [selectedDate]     Single selected date (DatePicker)
 * @param {Date[]}   [disabledDates=[]]
 * @param {Date[]}   [markedDates=[]]
 * @param {Date|null} [rangeStart]
 * @param {Date|null} [rangeEnd]
 * @param {Date|null} [hoverDate]
 * @param {(date: Date) => void} [onSelect]
 * @param {(date: Date) => void} [onHover]
 * @param {(viewDate: Date) => void} [onViewChange]  Called when user navigates months
 */
export default function CalendarPanel({
  viewDate,
  locale = "en-US",
  firstDayOfWeek = 0,
  panelPosition,
  showPrevNav = true,
  showNextNav = true,
  disabled = false,
  minDate = null,
  maxDate = null,
  selectedDate = null,
  disabledDates = [],
  markedDates = [],
  rangeStart = null,
  rangeEnd = null,
  hoverDate = null,
  onSelect,
  onHover,
  onViewChange,
}) {
  // Stable heading ID for aria-labelledby
  const headingId = useId();

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth() + 1; // 1-based for dateUtils

  // Disable prev nav if first day of view month is at or before minDate
  // C5 DT-D2.2: also disable when whole panel is disabled
  const disablePrev = disabled || (minDate
    ? new Date(year, month - 1, 1) <= minDate
    : false);

  const disableNext = disabled || (maxDate
    ? new Date(year, month, 1) > maxDate
    : false);

  const handlePrev = () => {
    if (!disabled && onViewChange) onViewChange(addMonths(viewDate, -1));
  };

  const handleNext = () => {
    if (!disabled && onViewChange) onViewChange(addMonths(viewDate, 1));
  };

  const handleMonthChange = (delta) => {
    if (onViewChange) onViewChange(addMonths(viewDate, delta));
  };

  const panelClass = [
    "calendar-panel",
    panelPosition === "left"  ? "calendar-panel--left"  : "",
    panelPosition === "right" ? "calendar-panel--right" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={panelClass}>
      <CalendarHeader
        viewDate={viewDate}
        locale={locale}
        showPrev={showPrevNav}
        showNext={showNextNav}
        disablePrev={disablePrev}
        disableNext={disableNext}
        onPrev={handlePrev}
        onNext={handleNext}
        headingId={headingId}
      />

      {/* role="rowgroup" is implied inside role="grid" — WeekdayLabels provides role="row" */}
      <WeekdayLabels firstDayOfWeek={firstDayOfWeek} locale={locale} />

      {/* C3 DT-D2.2.3: disabled forwarded to CalendarGrid — forces all cells to tabIndex=-1
          and blocks keyboard navigation when the whole picker is globally disabled. */}
      <CalendarGrid
        year={year}
        month={month}
        locale={locale}
        firstDayOfWeek={firstDayOfWeek}
        selectedDate={selectedDate}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        hoverDate={hoverDate}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        markedDates={markedDates}
        disabled={disabled}
        onSelect={onSelect}
        onHover={onHover}
        onMonthChange={handleMonthChange}
        labelledBy={headingId}
      />
    </div>
  );
}
