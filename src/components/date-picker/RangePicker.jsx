import React, { useState, useCallback, useEffect } from "react";
import "./DatePicker.css";
import CalendarPanel from "./CalendarPanel.jsx";
import CalendarFooter from "./CalendarFooter.jsx";
import TimeFilter from "./TimeFilter.jsx";
import { startOfDay, addMonths, isSameDay, isBefore, resolvePeriodRange, DEFAULT_PERIOD_RANGES } from "./dateUtils.js";

// ── Module-level helper ───────────────────────────────────────────────────────
//
// normalizeRange — apply startOfDay, guard nulls, swap reversed.
// C6 DT-D2.2 (original component-level fn); moved to module level C1 DT-D2.2.2
// so it can be used safely inside useEffect without stale-closure risk.

function normalizeRange(r) {
  if (!r) return { start: null, end: null };
  const start = r.start ? startOfDay(r.start) : null;
  const end   = r.end   ? startOfDay(r.end)   : null;
  // Swap if reversed (start > end) so callers can pass in any order
  if (start && end && isBefore(end, start)) {
    return { start: end, end: start };
  }
  return { start, end };
}

/**
 * RangePicker — dual-panel calendar range picker with optional Time Filter sidebar
 * Maps to Figma ↳date-picker, 🧩 Type=Range Picker variant (node 2397:2151)
 * Figma geometry: 936×432 · cr:20 · regular-shadow/medium
 *
 * Layout: [TimeFilter 200px | Panel 1 368px | Panel 2 368px] + Footer 68px
 *
 * Range selection model:
 *   Phase 'idle':          No start selected. First click = rangeStart, enter phase 'started'.
 *   Phase 'started':       rangeStart set, hoverDate tracks mouse. Second click = rangeEnd.
 *                          If second click is before rangeStart, the two are swapped (normalized).
 *   Period presets:        Clicking a preset resolves to { start, end } and completes selection.
 *
 * Range endpoint visual: Range/Active (DP-A2.3-DEC-01: same variant for start and end caps,
 * matching Figma specimen where Jan 7 uses Range/Active same as interior cell endpoints).
 *
 * Commit semantics (C1 DT-D2.2.2, C1 DT-D2.2.3):
 *   showFooter=false: selection commits immediately through onRangeChange on second cell click.
 *                     First click does NOT fire onRangeChange — only the complete range does.
 *   showFooter=true:  cell clicks and preset selections update an internal draft only.
 *                     onRangeChange + onApply fire exactly once when Apply is clicked.
 *                     Cancel discards draft and restores the last committed range + preset.
 *                     Apply is enabled when draft has both endpoints OR a preset was explicitly
 *                     selected (draftPresetSelected=true). "All time" resolves to null/null and
 *                     is a valid complete preset — Apply is enabled after selecting it.
 *
 * Cancel availability (C3 DT-D2.2.3):
 *   Cancel is ALWAYS available as a dismissal action, even when globally disabled=true.
 *   CalendarFooter's Cancel button has no disabled prop and fires regardless of Apply state.
 *   The footer's `disabled` prop only controls the Apply button.
 *
 * @param {{ start: Date|null, end: Date|null } | null} [rangeValue]       Controlled range
 * @param {{ start: Date|null, end: Date|null } | null} [defaultRangeValue] Uncontrolled init
 * @param {({ start: Date|null, end: Date|null }) => void} [onRangeChange]  Commits selection
 * @param {({ start: Date|null, end: Date|null }) => void} [onApply]        Apply button
 * @param {() => void} [onCancel]
 * @param {boolean}   [showFooter=true]       Figma 👞 Footer BOOLEAN
 * @param {boolean}   [showTimeFilter=true]   Figma ⏳ Time Filter BOOLEAN
 * @param {string|null} [timeFilterValue]     Active period preset key
 * @param {Array<{label:string,value:string}>} [timeFilterOptions]  Custom presets
 * @param {(value: string) => void} [onTimeFilterChange]
 * @param {Date}      [defaultViewDate]       Initial left-panel view month
 * @param {Date|null} [minDate]
 * @param {Date|null} [maxDate]
 * @param {Date[]}    [disabledDates=[]]
 * @param {Date[]}    [markedDates=[]]
 * @param {string}    [locale='en-US']
 * @param {number}    [firstDayOfWeek=0]      0=Mon (Figma default)
 * @param {boolean}   [disabled=false]
 * @param {string}    [className]
 * @param {string}    [aria-label]
 * @param {string}    [aria-labelledby]
 * @param {React.Ref} [ref]
 */
const RangePicker = React.forwardRef(function RangePicker(
  {
    rangeValue,
    defaultRangeValue = null,
    onRangeChange,
    onApply,
    onCancel,
    showFooter = true,
    showTimeFilter = true,
    timeFilterValue: timeFilterValueProp,
    timeFilterOptions = DEFAULT_PERIOD_RANGES,
    onTimeFilterChange,
    defaultViewDate,
    minDate = null,
    maxDate = null,
    disabledDates = [],
    markedDates = [],
    locale = "en-US",
    firstDayOfWeek = 0,
    disabled = false,
    className = "",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  },
  ref
) {
  const isControlled = rangeValue !== undefined;

  // Committed range (uncontrolled only — last Apply'd value or initial).
  // In controlled mode the parent owns the committed range via `rangeValue` prop.
  const [committedRange, setCommittedRange] = useState(() =>
    normalizeRange(defaultRangeValue)
  );

  // Draft range — what the user has staged in the calendar.
  // Meaningful when showFooter=true: cell/preset clicks update this without firing onRangeChange.
  // Initialized from defaultRangeValue so the calendar shows a selection on first render.
  const [draftRange, setDraftRange] = useState(() =>
    normalizeRange(defaultRangeValue)
  );

  // Selection phase: 'idle' | 'started'
  const [phase, setPhase] = useState("idle");
  // Phase start date (first click during active selection)
  const [pendingStart, setPendingStart] = useState(null);
  // Hover date for in-progress preview
  const [hoverDate, setHoverDate] = useState(null);

  // C1 DT-D2.2.3: Draft and committed time filter state.
  //   showFooter=true:  preset clicks update draftTimeFilter only. Apply commits it.
  //   showFooter=false: preset clicks commit immediately (committedTimeFilter updated on selection).
  const isTimeFilterControlled = timeFilterValueProp !== undefined;
  const [committedTimeFilter, setCommittedTimeFilter] = useState(() => timeFilterValueProp ?? null);
  const [draftTimeFilter, setDraftTimeFilter] = useState(() => timeFilterValueProp ?? null);

  // C2 DT-D2.2.3: Track whether a complete preset was explicitly selected.
  // Required so Apply is enabled after "All time" (null/null range — a valid selection).
  const [draftPresetSelected, setDraftPresetSelected] = useState(false);

  // Active preset shown in the sidebar:
  //   Controlled  → always timeFilterValueProp
  //   Footer=true → draftTimeFilter (staged, not yet committed)
  //   Footer=false → committedTimeFilter (last committed selection)
  const activeTimeFilter = isTimeFilterControlled
    ? timeFilterValueProp
    : (showFooter ? draftTimeFilter : committedTimeFilter);

  // Left-panel view month; right panel is always leftView + 1 month.
  // Initialized to defaultViewDate or committed range start or today.
  const [leftViewDate, setLeftViewDate] = useState(() => {
    const initRange = normalizeRange(defaultRangeValue);
    const base = defaultViewDate || (initRange?.start ?? new Date());
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const rightViewDate = addMonths(leftViewDate, 1);

  // C1 DT-D2.2.2: Sync draft, view, and pending phase when controlled rangeValue changes externally.
  // Resets stale in-progress selection; navigates to the new range's start month.
  useEffect(() => {
    if (!isControlled) return;
    const normalized = normalizeRange(rangeValue);
    setDraftRange(normalized);
    // Always reset any stale pending selection phase
    setPhase("idle");
    setPendingStart(null);
    setHoverDate(null);
    // Navigate left panel to range start if set
    if (normalized.start) {
      setLeftViewDate((prev) => {
        const s = normalized.start;
        return prev.getFullYear() === s.getFullYear() && prev.getMonth() === s.getMonth()
          ? prev
          : new Date(s.getFullYear(), s.getMonth(), 1);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeValue]);

  // C1 DT-D2.2.3: Sync draftTimeFilter when controlled timeFilterValue changes externally.
  // Keeps the sidebar preset highlight current without committing through the user's Apply path.
  useEffect(() => {
    if (!isTimeFilterControlled) return;
    setDraftTimeFilter(timeFilterValueProp ?? null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFilterValueProp]);

  // What was last committed (used for no-footer display and canApply)
  const displayCommitted = isControlled ? normalizeRange(rangeValue) : committedRange;

  // C1 DT-D2.2.3: Apply enabled when:
  //   showFooter=true  → draft has both endpoints, OR a preset was explicitly selected
  //                      (this covers "All time" which is a valid complete selection)
  //   showFooter=false → Apply never shown; guard still used for internal tracking
  const canApply = showFooter
    ? (draftPresetSelected || !!(draftRange.start && draftRange.end))
    : !!(displayCommitted.start && displayCommitted.end);

  // ── Commit helper (no-footer path only) ─────────────────────────────────────

  const commitRange = useCallback(
    (range) => {
      if (!isControlled) setCommittedRange(range);
      if (onRangeChange) onRangeChange(range);
    },
    [isControlled, onRangeChange]
  );

  // ── Selection logic ─────────────────────────────────────────────────────────

  const handleCellSelect = useCallback(
    (date) => {
      if (disabled) return;
      const d = startOfDay(date);

      if (phase === "idle") {
        // Start of new selection
        setPendingStart(d);
        setPhase("started");
        // C2 DT-D2.2.3: Cell selection clears the preset flag (manual override of preset).
        setDraftPresetSelected(false);
        if (showFooter) {
          // Draft mode: stage partial selection; do NOT fire onRangeChange
          setDraftRange({ start: d, end: null });
          // Clear draft time filter when user starts manual cell selection (uncontrolled only)
          if (!isTimeFilterControlled) setDraftTimeFilter(null);
        }
        // C5 DT-D2.2.3: No-footer mode — do NOT emit partial range on first click.
        // onRangeChange fires exactly once after the second click with a complete range.
      } else {
        // Complete the range — normalize start ≤ end
        const start = pendingStart;
        const end   = d;
        const normalized = isBefore(start, end) || isSameDay(start, end)
          ? { start, end }
          : { start: end, end: start };
        setPendingStart(null);
        setPhase("idle");
        setHoverDate(null);
        setDraftPresetSelected(false);
        if (showFooter && !isTimeFilterControlled) setDraftTimeFilter(null);

        if (showFooter) {
          setDraftRange(normalized);
        } else {
          commitRange(normalized);
        }
      }
    },
    [phase, pendingStart, commitRange, disabled, showFooter, isTimeFilterControlled]
  );

  const handleCellHover = useCallback(
    (date) => {
      if (phase === "started") {
        setHoverDate(startOfDay(date));
      }
    },
    [phase]
  );

  // C1 DT-D2.2.3: handleTimeFilterChange manages draft vs committed time filter.
  const handleTimeFilterChange = useCallback(
    (value) => {
      if (onTimeFilterChange) onTimeFilterChange(value);
      // Resolve preset to a date range
      const resolved = resolvePeriodRange(value);
      if (resolved) {
        setPhase("idle");
        setPendingStart(null);
        setHoverDate(null);
        if (showFooter) {
          // Draft mode: stage preset + range; do NOT fire onRangeChange
          if (!isTimeFilterControlled) setDraftTimeFilter(value);
          setDraftPresetSelected(true);
          setDraftRange(normalizeRange(resolved));
        } else {
          // No-footer mode: commit immediately
          if (!isTimeFilterControlled) {
            setDraftTimeFilter(value);
            setCommittedTimeFilter(value);
          }
          setDraftPresetSelected(false);
          commitRange(normalizeRange(resolved));
        }
        // C1 DT-D2.2: Guard resolved.start before navigating — 'all-time' returns {start:null,end:null}
        // so calling .getFullYear() on null would crash. Only navigate if start is a Date.
        if (resolved.start) {
          setLeftViewDate(
            new Date(resolved.start.getFullYear(), resolved.start.getMonth(), 1)
          );
        }
      }
    },
    [onTimeFilterChange, commitRange, showFooter, isTimeFilterControlled]
  );

  // C1 DT-D2.2.2 / C1 DT-D2.2.3: Apply commits draft range + preset exactly once.
  // onRangeChange fires with {start:null,end:null} for "All time" — a valid complete preset.
  const handleApply = useCallback(() => {
    if (!isControlled) setCommittedRange(draftRange);
    if (!isTimeFilterControlled) setCommittedTimeFilter(draftTimeFilter);
    setDraftPresetSelected(false); // reset preset flag after commit
    if (onRangeChange) onRangeChange(draftRange);
    if (onApply) onApply(draftRange);
  }, [isControlled, draftRange, isTimeFilterControlled, draftTimeFilter, onRangeChange, onApply]);

  // C1 DT-D2.2.2 / C3 DT-D2.2.3: Cancel discards draft and restores the last committed
  // range + preset. Cancel is ALWAYS available as a dismissal action — CalendarFooter's
  // Cancel button has no disabled prop and fires regardless of Apply's disabled state.
  const handleCancel = useCallback(() => {
    if (showFooter) {
      const committed = isControlled ? normalizeRange(rangeValue) : committedRange;
      setDraftRange(committed);
      setPhase("idle");
      setPendingStart(null);
      setHoverDate(null);
      // Restore draft preset to the last committed preset (undoes staged preset selection)
      if (!isTimeFilterControlled) setDraftTimeFilter(committedTimeFilter);
      setDraftPresetSelected(false);
    }
    if (onCancel) onCancel();
  }, [showFooter, isControlled, rangeValue, committedRange, isTimeFilterControlled, committedTimeFilter, onCancel]);

  // ── View navigation ─────────────────────────────────────────────────────────

  const handleLeftViewChange = (newDate) => {
    // Ensure left panel doesn't advance past right panel (keep 1+ month gap)
    setLeftViewDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
  };

  // Right panel nav — user navigates right panel directly
  const handleRightViewChange = (newDate) => {
    // Advance left panel so right = new date
    const prevLeft = addMonths(newDate, -1);
    setLeftViewDate(new Date(prevLeft.getFullYear(), prevLeft.getMonth(), 1));
  };

  // Active range to display in calendar:
  //   phase=started → show pending start (no end, preview in progress)
  //   showFooter=true  → show draft range
  //   showFooter=false → show committed range
  const displayRange =
    phase === "started"
      ? { start: pendingStart, end: null }
      : (showFooter ? draftRange : displayCommitted);

  const rootClass = ["range-picker", className].filter(Boolean).join(" ");

  // C9 DT-D2.2: Provide a default accessible name for role="dialog" when neither
  // aria-label nor aria-labelledby is supplied. Screen readers require an accessible
  // name on dialogs per WAI-ARIA 1.2 spec.
  const accessibleName = ariaLabel || (!ariaLabelledBy ? "Date range picker" : undefined);

  // C1 DT-D2.2.3: When an "All time" (or other null-range) preset is staged (draftPresetSelected=true)
  // and the draft range is null/null, CalendarFooter would compute an empty label from rangeStart/End.
  // Pass the preset's display label as an override so the footer shows e.g. "All time" instead of "".
  // When draftPresetSelected is false (manual cell selection) or draftRange has real dates, pass null
  // so CalendarFooter auto-computes from rangeStart/rangeEnd as usual.
  const footerRangeLabel =
    draftPresetSelected && !draftRange.start && !draftRange.end
      ? (timeFilterOptions.find((o) => o.value === draftTimeFilter)?.label ?? null)
      : null;

  return (
    <div
      ref={ref}
      className={rootClass}
      role="dialog"
      aria-modal="false"
      aria-label={accessibleName}
      aria-labelledby={ariaLabelledBy}
    >
      {/* ── Time Filter (200px sidebar) ── */}
      <TimeFilter
        show={showTimeFilter}
        value={activeTimeFilter}
        options={timeFilterOptions}
        disabled={disabled}
        onChange={!disabled ? handleTimeFilterChange : undefined}
      />

      {/* ── Dual calendar + footer ── */}
      <div className="range-picker__content">
        <div className="range-picker__dual-calendar">
          {/* Left panel (Panel 1 — earlier month) */}
          <CalendarPanel
            viewDate={leftViewDate}
            locale={locale}
            firstDayOfWeek={firstDayOfWeek}
            panelPosition="left"
            showPrevNav={true}
            showNextNav={false}  /* Only right panel has next-nav (DP-A2.0 §5 all On/On) */
            disabled={disabled}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={disabledDates}
            markedDates={markedDates}
            rangeStart={displayRange.start}
            rangeEnd={displayRange.end}
            hoverDate={phase === "started" ? hoverDate : null}
            onSelect={!disabled ? handleCellSelect : undefined}
            onHover={!disabled ? handleCellHover : undefined}
            onViewChange={handleLeftViewChange}
          />

          {/* Right panel (Panel 2 — later month, always leftView + 1) */}
          <CalendarPanel
            viewDate={rightViewDate}
            locale={locale}
            firstDayOfWeek={firstDayOfWeek}
            panelPosition="right"
            showPrevNav={false}  /* Left panel owns prev-nav */
            showNextNav={true}
            disabled={disabled}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={disabledDates}
            markedDates={markedDates}
            rangeStart={displayRange.start}
            rangeEnd={displayRange.end}
            hoverDate={phase === "started" ? hoverDate : null}
            onSelect={!disabled ? handleCellSelect : undefined}
            onHover={!disabled ? handleCellHover : undefined}
            onViewChange={handleRightViewChange}
          />
        </div>

        {/* ── Footer ── */}
        {/* C1 DT-D2.2.3: rangeLabel override shows preset name when draft range is null/null
            (e.g. "All time"). CalendarFooter auto-computes label when rangeLabel=null. */}
        <CalendarFooter
          show={showFooter}
          isRange={true}
          rangeStart={draftRange.start}
          rangeEnd={draftRange.end}
          locale={locale}
          disabled={!canApply || disabled}
          rangeLabel={footerRangeLabel}
          onCancel={handleCancel}
          onApply={handleApply}
        />
      </div>
    </div>
  );
});

export default RangePicker;
