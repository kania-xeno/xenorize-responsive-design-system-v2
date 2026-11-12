import React, { useState, useCallback, useEffect } from "react"; // C6 DT-D2.2.3: removed unused useId
import "./DatePicker.css";
import CalendarPanel from "./CalendarPanel.jsx";
import CalendarFooter from "./CalendarFooter.jsx";
import { startOfDay, isSameDay, addMonths } from "./dateUtils.js";

/**
 * DatePicker — single-date calendar picker
 * Maps to Figma ↳date-picker, 🧩 Type=Date Picker variant (node 2397:2097)
 * Figma geometry: 368×432 · cr:20 · regular-shadow/medium
 *
 * Supports controlled and uncontrolled usage.
 *
 * Commit semantics (C1 DT-D2.2.2):
 *   showFooter=false: selection commits immediately through onChange on every cell click.
 *   showFooter=true:  cell clicks update an internal draft only. onChange + onApply fire
 *                     exactly once when Apply is clicked. Cancel discards the draft and
 *                     restores the last committed value. Apply is disabled when draft is empty.
 *
 * @param {Date|null}   [value]              Controlled selected date
 * @param {Date|null}   [defaultValue]       Uncontrolled initial selected date
 * @param {(date: Date|null) => void} [onChange]  Called when selection commits (on click if
 *                                                 showFooter=false; on Apply if showFooter=true)
 * @param {(date: Date|null) => void} [onApply]   Called with committed value when Apply clicked
 * @param {() => void}  [onCancel]           Called when Cancel is clicked
 * @param {boolean}     [showFooter=true]    Map to Figma 👞 Footer BOOLEAN (default true)
 * @param {Date|null}   [defaultViewDate]    Initial calendar view month (defaults to value or today)
 * @param {Date|null}   [minDate]            Earliest selectable date
 * @param {Date|null}   [maxDate]            Latest selectable date
 * @param {Date[]}      [disabledDates=[]]   Explicit disabled dates
 * @param {Date[]}      [markedDates=[]]     Dates with marked dot indicator
 * @param {string}      [locale='en-US']     Intl locale for formatting
 * @param {number}      [firstDayOfWeek=0]   0=Mon (Figma default), 1=Tue, … 6=Sun
 * @param {boolean}     [disabled=false]     Disable entire picker
 * @param {string}      [className]
 * @param {string}      [aria-label]         Accessible label for the dialog
 * @param {string}      [aria-labelledby]    References external heading
 * @param {React.Ref}   [ref]               Forwarded to root div
 */
const DatePicker = React.forwardRef(function DatePicker(
  {
    value,
    defaultValue = null,
    onChange,
    onApply,
    onCancel,
    showFooter = true,
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
  const isControlled = value !== undefined;

  // Committed value (uncontrolled only — last Apply'd date or initial).
  // In controlled mode the parent owns the committed value via `value` prop.
  const [committedValue, setCommittedValue] = useState(() =>
    defaultValue ? startOfDay(defaultValue) : null
  );

  // Draft value — what the user has staged in the calendar.
  // Meaningful when showFooter=true: cell clicks update this without firing onChange.
  // Initialized from defaultValue so the calendar shows a selection on first render.
  const [draftValue, setDraftValue] = useState(() =>
    defaultValue ? startOfDay(defaultValue) : null
  );

  // Calendar view month state
  const [viewDate, setViewDate] = useState(() => {
    const base = defaultViewDate || (draftValue ?? new Date());
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  // C1 DT-D2.2.2: Sync draft and view when controlled value changes externally.
  // Keeps the calendar navigated to the new value's month and resets the staged draft.
  useEffect(() => {
    if (!isControlled) return;
    const d = value ? startOfDay(value) : null;
    setDraftValue(d);
    if (d) {
      setViewDate((prev) => {
        if (
          prev.getFullYear() === d.getFullYear() &&
          prev.getMonth() === d.getMonth()
        ) {
          return prev; // already on the right month — no state update
        }
        return new Date(d.getFullYear(), d.getMonth(), 1);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // What shows as "selected" (highlighted) in the calendar:
  //   showFooter=true  → draft (staged selection — not yet committed)
  //   showFooter=false → committed value (or controlled value directly)
  const selectedDate = showFooter
    ? draftValue
    : (isControlled ? (value ? startOfDay(value) : null) : committedValue);

  // Apply is enabled when there is a draft value (showFooter=true)
  // or any selection (showFooter=false, Apply never shown).
  const canApply = !!draftValue;

  const handleSelect = useCallback(
    (date) => {
      if (disabled) return;
      const d = startOfDay(date);
      if (showFooter) {
        // Draft mode: update staged selection; do NOT fire onChange yet.
        setDraftValue(d);
      } else {
        // No-footer mode: immediate commit.
        if (!isControlled) setCommittedValue(d);
        if (onChange) onChange(d);
      }
    },
    [disabled, showFooter, isControlled, onChange]
  );

  // C1 DT-D2.2.2: Apply commits the draft exactly once through onChange + onApply.
  const handleApply = useCallback(() => {
    if (!isControlled) setCommittedValue(draftValue);
    if (onChange) onChange(draftValue);
    if (onApply) onApply(draftValue);
  }, [isControlled, draftValue, onChange, onApply]);

  // C1 DT-D2.2.2: Cancel discards draft and restores the last committed value.
  const handleCancel = useCallback(() => {
    if (showFooter) {
      const committed = isControlled
        ? (value ? startOfDay(value) : null)
        : committedValue;
      setDraftValue(committed);
    }
    if (onCancel) onCancel();
  }, [showFooter, isControlled, value, committedValue, onCancel]);

  const handleViewChange = useCallback((newViewDate) => {
    setViewDate(new Date(newViewDate.getFullYear(), newViewDate.getMonth(), 1));
  }, []);

  const rootClass = ["date-picker", className].filter(Boolean).join(" ");

  // C9 DT-D2.2: Provide a default accessible name for role="dialog" when neither
  // aria-label nor aria-labelledby is supplied. Screen readers require an accessible
  // name on dialogs per WAI-ARIA 1.2 spec.
  const accessibleName = ariaLabel || (!ariaLabelledBy ? "Date picker" : undefined);

  return (
    <div
      ref={ref}
      className={rootClass}
      role="dialog"
      aria-modal="false"
      aria-label={accessibleName}
      aria-labelledby={ariaLabelledBy}
    >
      <CalendarPanel
        viewDate={viewDate}
        locale={locale}
        firstDayOfWeek={firstDayOfWeek}
        disabled={disabled}
        selectedDate={selectedDate}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        markedDates={markedDates}
        onSelect={!disabled ? handleSelect : undefined}
        onViewChange={handleViewChange}
      />

      <CalendarFooter
        show={showFooter}
        isRange={false}
        disabled={!canApply || disabled}
        locale={locale}
        onCancel={handleCancel}
        onApply={handleApply}
      />
    </div>
  );
});

export default DatePicker;
