import React, { useRef, useCallback, useState, useEffect } from "react";
import DayCell from "./DayCell.jsx";
import {
  buildCalendarGrid,
  isSameDay,
  isInRange,
  isRangeEndpoint,
  getDaysInMonth,
} from "./dateUtils.js";

/**
 * CalendarGrid — 5 or 6 week rows of DayCell components
 * Maps to: Week Rows inside Date Picker Items (Figma A3.4.2)
 *
 * Implements:
 *   - Dynamic 5 or 6 week rows (DP-A2.3-DEC-03: expand dynamically — A3.9.3)
 *   - Overflow (prev/next month) cells rendered as disabled Basic/Disabled (A3.9.2)
 *   - Roving tabindex keyboard navigation (WAI-ARIA grid pattern — A3.12.5)
 *   - Arrow key navigation (↑↓←→) within grid
 *   - Home / End: first / last cell in row
 *   - PageUp / PageDown: same weekday in prev / next month (delegated to parent)
 *   - Enter / Space: select cell
 *
 * @param {number}   year
 * @param {number}   month               1-based
 * @param {string}  [locale='en-US']
 * @param {number}  [firstDayOfWeek=0]   0=Mon (Figma default)
 * @param {Date|null} [selectedDate]     Single selected date (DatePicker)
 * @param {Date|null} [rangeStart]       Range start (RangePicker)
 * @param {Date|null} [rangeEnd]         Range end (RangePicker)
 * @param {Date|null} [hoverDate]        In-progress hover date during range selection
 * @param {Date|null} [minDate]
 * @param {Date|null} [maxDate]
 * @param {Date[]}   [disabledDates=[]]
 * @param {Date[]}   [markedDates=[]]
 * @param {(date: Date) => void} [onSelect]
 * @param {(date: Date) => void} [onHover]
 * @param {(delta: number) => void} [onMonthChange]  called with ±1 for PageUp/PageDown
 * @param {boolean}  [disabled=false]    Global disabled — forces all cells to tabIndex=-1 and
 *                                       blocks keyboard navigation. (C3 DT-D2.2.3)
 * @param {string}   [gridId]            id for the grid element (aria-labelledby target)
 * @param {string}   [labelledBy]        aria-labelledby → heading id
 */
export default function CalendarGrid({
  year,
  month,
  locale = "en-US",
  firstDayOfWeek = 0,
  selectedDate = null,
  rangeStart = null,
  rangeEnd = null,
  hoverDate = null,
  minDate = null,
  maxDate = null,
  disabledDates = [],
  markedDates = [],
  onSelect,
  onHover,
  onMonthChange,
  gridId,
  labelledBy,
  disabled = false,
}) {
  const cells = buildCalendarGrid(year, month, {
    firstDayOfWeek,
    minDate,
    maxDate,
    disabledDates,
    markedDates,
  });

  // C3 DT-D2.2: Derive initial focused index from props.
  // Prefer: selectedDate or rangeStart → first non-disabled in-month cell.
  const deriveInitialIndex = useCallback(() => {
    const focusedDate = selectedDate || rangeStart || null;
    if (focusedDate) {
      const idx = cells.findIndex(
        (c) => c.inCurrentMonth && isSameDay(c.date, focusedDate)
      );
      if (idx !== -1) return idx;
    }
    const first = cells.findIndex((c) => c.inCurrentMonth && !c.isDisabled);
    return first !== -1 ? first : 0;
  }, [cells, selectedDate, rangeStart]);

  // C3 DT-D2.2: Stateful focusedIndex — updates on keyboard navigation so that
  // tabIndex={0} moves with the user's focus rather than snapping back to selectedDate.
  const [focusedIndex, setFocusedIndex] = useState(deriveInitialIndex);

  // C4 DT-D2.2.3: When month changes (PageUp/PageDown), re-derive the focused index.
  // pageKeyDayRef stores the day-of-month (1–31) of the last cell pressed with PageUp/PageDown,
  // so focus is restored to the EQUIVALENT date in the new month (not the same weekday column).
  // If the target month is shorter than the source, the day is clamped to the month's last day.
  // If the clamped target cell is disabled, the nearest enabled in-month cell is used.
  const pageKeyDayRef = useRef(null);

  useEffect(() => {
    if (pageKeyDayRef.current !== null) {
      // C4 DT-D2.2.3: Restore focus to equivalent date (day-of-month) in new month.
      const targetDay = pageKeyDayRef.current;
      pageKeyDayRef.current = null;

      // Clamp to new month's length (e.g. Mar 31 → Feb 28 when navigating back to Feb).
      const daysInNew = getDaysInMonth(year, month);
      const clampedDay = Math.min(targetDay, daysInNew);

      // Find in-month cell at the clamped day that is not individually disabled.
      let targetIdx = cells.findIndex(
        (c) => c.inCurrentMonth && c.date.getDate() === clampedDay && !c.isDisabled
      );

      if (targetIdx === -1) {
        // Target day is individually disabled — find nearest enabled in-month cell.
        const baseIdx = cells.findIndex(
          (c) => c.inCurrentMonth && c.date.getDate() === clampedDay
        );
        if (baseIdx !== -1) {
          // Search forward (later dates) and backward (earlier dates) simultaneously.
          let fwd = -1;
          for (let i = baseIdx; i < cells.length; i++) {
            if (cells[i].inCurrentMonth && !cells[i].isDisabled) { fwd = i; break; }
          }
          let bwd = -1;
          for (let i = baseIdx; i >= 0; i--) {
            if (cells[i].inCurrentMonth && !cells[i].isDisabled) { bwd = i; break; }
          }
          if (fwd !== -1 && bwd !== -1) {
            // Pick the closer one; prefer forward on ties.
            targetIdx = (fwd - baseIdx <= baseIdx - bwd) ? fwd : bwd;
          } else {
            targetIdx = fwd !== -1 ? fwd : bwd;
          }
        }
        if (targetIdx === -1) {
          targetIdx = deriveInitialIndex(); // last resort
        }
      }

      setFocusedIndex(targetIdx);
      // Defer focus to after render
      requestAnimationFrame(() => {
        const el = cellRefs.current[targetIdx];
        if (el) el.focus();
      });
    } else {
      // Month changed externally (e.g. view navigation) — re-derive from selection
      setFocusedIndex(deriveInitialIndex());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  // C1 DT-D2.2.2: Reconcile focusedIndex when selectedDate or rangeStart changes
  // within the same month. Cross-month changes are handled by [year, month] effect above.
  // Fires when a controlled value prop changes externally without navigating months,
  // ensuring keyboard focus tracks the new selection.
  useEffect(() => {
    setFocusedIndex(deriveInitialIndex());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, rangeStart]);

  // Refs array for imperative focus
  const cellRefs = useRef([]);
  const setRef = (i) => (el) => { cellRefs.current[i] = el; };

  const focusCellAt = useCallback(
    (index) => {
      const el = cellRefs.current[index];
      if (el) el.focus();
    },
    []
  );

  // C4 DT-D2.2: Find next non-disabled cell in given step direction (+1/-1/+7/-7).
  // Returns -1 if no valid cell is found (dead-end prevention).
  const findNextEnabled = useCallback(
    (startIdx, step) => {
      let idx = startIdx;
      while (idx >= 0 && idx < cells.length) {
        if (!cells[idx].isDisabled) return idx;
        idx += step;
      }
      return -1;
    },
    [cells]
  );

  // Keyboard navigation within the grid
  const handleKeyDown = useCallback(
    (e, cellIndex) => {
      // C3 DT-D2.2.3: Block all keyboard interaction when globally disabled.
      // Cells have tabIndex=-1 when disabled, so this only fires if a cell had focus
      // before the disabled state took effect. Still preventDefault to block scrolling.
      if (disabled) {
        const NAV_KEYS = ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown","Enter"," "];
        if (NAV_KEYS.includes(e.key)) e.preventDefault();
        return;
      }

      const totalCols = 7;

      let nextIndex = -1;
      let handled = true;

      switch (e.key) {
        // C4 DT-D2.2: skip disabled cells in arrow direction
        case "ArrowLeft":
          nextIndex = findNextEnabled(cellIndex - 1, -1);
          break;
        case "ArrowRight":
          nextIndex = findNextEnabled(cellIndex + 1, 1);
          break;
        case "ArrowUp":
          nextIndex = findNextEnabled(cellIndex - totalCols, -totalCols);
          break;
        case "ArrowDown":
          nextIndex = findNextEnabled(cellIndex + totalCols, totalCols);
          break;
        case "Home": {
          // First non-disabled cell in current row
          const rowStart = Math.floor(cellIndex / totalCols) * totalCols;
          nextIndex = findNextEnabled(rowStart, 1);
          // Clamp to this row
          if (nextIndex >= rowStart + totalCols) nextIndex = -1;
          break;
        }
        case "End": {
          // Last non-disabled cell in current row
          const rowStart2 = Math.floor(cellIndex / totalCols) * totalCols;
          const rowEnd = rowStart2 + totalCols - 1;
          nextIndex = findNextEnabled(rowEnd, -1);
          // Clamp to this row
          if (nextIndex < rowStart2) nextIndex = -1;
          break;
        }
        // C4 DT-D2.2.3: PageUp/PageDown — preventDefault + store day-of-month for
        // equivalent-date focus restoration (not same column). See pageKeyDayRef above.
        case "PageUp":
          e.preventDefault();
          pageKeyDayRef.current = cells[cellIndex]?.date?.getDate() ?? 1;
          if (onMonthChange) onMonthChange(-1);
          return;
        case "PageDown":
          e.preventDefault();
          pageKeyDayRef.current = cells[cellIndex]?.date?.getDate() ?? 1;
          if (onMonthChange) onMonthChange(1);
          return;
        case "Enter":
        case " ": {
          const cell = cells[cellIndex];
          if (cell && !cell.isDisabled && onSelect) onSelect(cell.date);
          e.preventDefault();
          return;
        }
        default:
          handled = false;
      }

      if (handled && nextIndex !== -1) {
        e.preventDefault();
        setFocusedIndex(nextIndex);
        focusCellAt(nextIndex);
      } else if (handled) {
        // No valid cell to move to — still prevent default to avoid browser side effects
        e.preventDefault();
      }
    },
    [cells, onMonthChange, onSelect, focusCellAt, findNextEnabled, disabled]
  );

  // Determine effective hover range for preview
  // During range selection (rangeStart set, rangeEnd not), show in-progress range
  const hasStartOnly = rangeStart && !rangeEnd && hoverDate;
  const previewStart = hasStartOnly ? rangeStart : null;
  const previewEnd   = hasStartOnly ? hoverDate  : null;
  const effectiveRangeStart = rangeEnd ? rangeStart : null;
  const effectiveRangeEnd   = rangeEnd ? rangeEnd   : null;

  // Chunk into 7-cell rows
  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <div
      id={gridId}
      className="calendar-grid"
      role="grid"
      aria-labelledby={labelledBy}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="calendar-row" role="row">
          {row.map((cell, colIndex) => {
            const globalIndex = rowIndex * 7 + colIndex;
            // C3 DT-D2.1: overflow cells (prev/next month) are rendered as disabled,
            // not hidden. Guard selection/range computations on inCurrentMonth.
            const inMonth = cell.inCurrentMonth;
            const isSel = inMonth && isSameDay(cell.date, selectedDate);
            const isStart = inMonth && isSameDay(cell.date, effectiveRangeStart);
            const isEnd   = inMonth && isSameDay(cell.date, effectiveRangeEnd);
            const inRange = inMonth && isInRange(cell.date, effectiveRangeStart, effectiveRangeEnd);
            const isPreview = inMonth && previewStart && previewEnd &&
              isInRange(cell.date, previewStart, previewEnd);
            const isPreviewEndpoint = inMonth && (
              isSameDay(cell.date, previewStart) || isSameDay(cell.date, previewEnd)
            );

            return (
              <DayCell
                key={colIndex}
                ref={setRef(globalIndex)}
                date={cell.date}
                locale={locale}
                isSelected={isSel}
                isDisabled={disabled || cell.isDisabled}
                isOverflow={cell.isOverflow}
                isMarked={cell.isMarked}
                isInRange={inRange}
                isRangeStart={isStart || (isPreviewEndpoint && isSameDay(cell.date, previewStart))}
                isRangeEnd={isEnd   || (isPreviewEndpoint && isSameDay(cell.date, previewEnd))}
                isRangePreview={!!isPreview}
                tabIndex={(disabled || globalIndex !== focusedIndex) ? -1 : 0}
                onClick={onSelect}
                onMouseEnter={onHover}
                onKeyDown={(e) => handleKeyDown(e, globalIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
