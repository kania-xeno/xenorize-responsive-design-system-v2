/**
 * dateUtils.js — Date Picker family pure-function date utilities
 * Source of truth: Figma ↳date-picker node 2397:2096 (DT-D2 2026-11-04)
 * No external date library — native Date + Intl only (DT-D2 directive).
 *
 * Week model: Monday-first (index 0 = Mon, 6 = Sun) — CONFIRMED IN FIGMA (A3.9.1)
 * Column order: Mon Tue Wed Thu Fri Sat Sun
 */

// ── Constants ─────────────────────────────────────────────────────────────────

/** MON_FIRST_OFFSET: (getDay() + 6) % 7 → converts JS Sun=0 to Mon=0 */
const MON_FIRST = (d) => (d.getDay() + 6) % 7;

// ── Core calendar math ────────────────────────────────────────────────────────

/**
 * getDaysInMonth(year, month) → number of days (1-based month: 1=Jan, 12=Dec)
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

/**
 * getFirstWeekdayOfMonth(year, month) → 0-6 where 0=Mon (Figma spec)
 * month: 1-based (1=Jan, 12=Dec)
 */
export function getFirstWeekdayOfMonth(year, month) {
  // JS Date month is 0-based; day 1 of the month
  return MON_FIRST(new Date(year, month - 1, 1));
}

/**
 * needsSixWeeks(year, month) → boolean
 * Returns true when a month's grid requires 6 rows (beyond 5×7=35 cells).
 * Formula from A3.9.3: (firstWeekdayOffset + daysInMonth) > 35
 */
export function needsSixWeeks(year, month) {
  return getFirstWeekdayOfMonth(year, month) + getDaysInMonth(year, month) > 35;
}

/**
 * buildCalendarGrid(year, month, { firstDayOfWeek = 0, minDate, maxDate, disabledDates, markedDates })
 * Returns array of { date, inCurrentMonth, isToday, isDisabled, isMarked }
 * Length: 35 or 42 (5 or 6 weeks × 7 columns).
 * Overflow cells (prev/next month) are always disabled per Figma specimen (A3.9.2).
 *
 * @param {number} year
 * @param {number} month 1-based
 * @param {object} [opts]
 * @param {number}   [opts.firstDayOfWeek=0] 0=Mon (Figma default), 1=Tue, … 6=Sun
 * @param {Date|null} [opts.minDate]
 * @param {Date|null} [opts.maxDate]
 * @param {Date[]}   [opts.disabledDates=[]]
 * @param {Date[]}   [opts.markedDates=[]]
 * @returns {{ date: Date, inCurrentMonth: boolean, isOverflow: boolean, isToday: boolean, isDisabled: boolean, isMarked: boolean }[]}
 */
export function buildCalendarGrid(year, month, opts = {}) {
  const {
    firstDayOfWeek = 0,
    minDate = null,
    maxDate = null,
    disabledDates = [],
    markedDates = [],
  } = opts;

  const today = startOfDay(new Date());
  const daysInMonth = getDaysInMonth(year, month);
  // Offset: how many cells before day 1, relative to firstDayOfWeek
  const rawOffset = getFirstWeekdayOfMonth(year, month);
  const offset = (rawOffset - firstDayOfWeek + 7) % 7;
  const totalCells = offset + daysInMonth > 35 ? 42 : 35;
  const cells = [];

  // Flatten disabled dates to timestamp set for fast lookup
  const disabledSet = new Set(disabledDates.map((d) => startOfDay(d).getTime()));
  const markedSet   = new Set(markedDates.map((d)   => startOfDay(d).getTime()));

  for (let i = 0; i < totalCells; i++) {
    // Calculate what date this cell represents
    // Cell 0 starts at (day 1 - offset)
    const dayOfMonth = i - offset + 1;
    const cellDate = new Date(year, month - 1, dayOfMonth);
    const inCurrentMonth = dayOfMonth >= 1 && dayOfMonth <= daysInMonth;
    const ts = startOfDay(cellDate).getTime();
    const isToday = ts === today.getTime();

    const isOutOfRange =
      (minDate && ts < startOfDay(minDate).getTime()) ||
      (maxDate && ts > startOfDay(maxDate).getTime());

    // isOverflow: cell belongs to previous or next month (C3 DT-D2.1)
    // Figma renders overflow dates as visible disabled cells, not hidden filler.
    const isOverflow = !inCurrentMonth;
    const isDisabled = isOverflow || isOutOfRange || disabledSet.has(ts);
    const isMarked   = markedSet.has(ts);

    cells.push({ date: cellDate, inCurrentMonth, isOverflow, isToday, isDisabled, isMarked });
  }

  return cells;
}

// ── Date identity helpers ─────────────────────────────────────────────────────

/** startOfDay — zero-out h/m/s/ms and return new Date */
export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isSameDay(a, b) {
  if (!a || !b) return false;
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

export function isBefore(a, b) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfter(a, b) {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

/**
 * isInRange — returns true if date is strictly between start and end (exclusive of start/end).
 * Used for "range-interior" cell styling.
 */
export function isInRange(date, start, end) {
  if (!start || !end) return false;
  const ts = startOfDay(date).getTime();
  const s  = startOfDay(start).getTime();
  const e  = startOfDay(end).getTime();
  const lo = Math.min(s, e);
  const hi = Math.max(s, e);
  return ts > lo && ts < hi;
}

/**
 * isRangeEndpoint — returns true if date equals start or end of range (inclusive).
 */
export function isRangeEndpoint(date, start, end) {
  if (!date) return false;
  return isSameDay(date, start) || isSameDay(date, end);
}

// ── Navigation ────────────────────────────────────────────────────────────────

/** addMonths — returns new Date shifted by delta months, clamped to last day of target month */
export function addMonths(date, delta) {
  const d = new Date(date);
  const targetMonth = d.getMonth() + delta;
  d.setMonth(targetMonth);
  // If month overflowed (e.g. Jan 31 + 1mo = Mar 3), clamp
  if (d.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    d.setDate(0); // last day of previous month
  }
  return d;
}

// ── Formatting ────────────────────────────────────────────────────────────────

/**
 * formatMonthYear — "January 2024" (or locale equivalent)
 */
export function formatMonthYear(date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);
}

/**
 * formatWeekdayLabels — returns array of 7 short weekday strings starting from firstDayOfWeek
 * firstDayOfWeek: 0=Mon (Figma default), 1=Tue, … 6=Sun
 * @returns {Array<{ short: string, long: string }>}
 */
export function formatWeekdayLabels(firstDayOfWeek = 0, locale = 'en-US') {
  // Use a known Monday for anchor: 2024-01-01 = Monday
  const anchor = new Date(2024, 0, 1 + firstDayOfWeek);
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(anchor);
    d.setDate(anchor.getDate() + i);
    const short = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d);
    const long  = new Intl.DateTimeFormat(locale, { weekday: 'long'  }).format(d);
    result.push({ short, long });
  }
  return result;
}

/**
 * formatRangeDate — "Dec 18, 2023" — matches Figma range-summary label format (A3.9.4)
 * Uses 2-digit day to match "Jan 07" in specimen (A3.4.3 range label).
 */
export function formatRangeDate(date, locale = 'en-US') {
  if (!date) return '';
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * formatFullDate — accessible aria-label for a day cell: "Thursday, January 18, 2024"
 */
export function formatFullDate(date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * formatDayNumber — "18" (day of month as string)
 */
export function formatDayNumber(date) {
  return String(date.getDate());
}

// ── Period-range presets (Range Picker Time Filter) ───────────────────────────

/**
 * DEFAULT_PERIOD_RANGES — 8 preset ranges matching Figma Time Filter specimen
 * Labels confirmed live from Figma nodes 2397:2153–2397:2160 (DT-D2.1 2026-11-04).
 * Ordering matches the 8 ↳period-range instances in Time Filter frame 2397:2152.
 *
 * REMOVED (not in Figma):  yesterday, last-90-days, this-month, last-month, last-year
 */
export const DEFAULT_PERIOD_RANGES = [
  { label: 'Today',           value: 'today' },
  { label: 'Last 7 days',     value: 'last-7-days' },
  { label: 'Last 30 days',    value: 'last-30-days' },
  { label: 'Last 3 months',   value: 'last-3-months' },
  { label: 'Last 12 months',  value: 'last-12-months' },
  { label: 'Month to date',   value: 'month-to-date' },
  { label: 'Year to date',    value: 'year-to-date' },
  { label: 'All time',        value: 'all-time' },
];

/**
 * resolvePeriodRange — resolves a preset value to { start, end } Date range
 * All 8 presets match Figma Time Filter labels (2397:2153–2397:2160, DT-D2.1 2026-11-04).
 *
 * "All time" returns { start: null, end: null } — signals "no date filter" to the consumer.
 * Rolling windows (last-N-days / last-N-months) are inclusive of today.
 * Month-to-date and Year-to-date end on today (not month/year end).
 */
export function resolvePeriodRange(value) {
  const today = startOfDay(new Date());
  const year  = today.getFullYear();
  const month = today.getMonth(); // 0-based

  switch (value) {
    case 'today':
      return { start: today, end: today };

    case 'last-7-days': {
      const s = new Date(today);
      s.setDate(s.getDate() - 6);             // 7 days inclusive: today − 6
      return { start: s, end: today };
    }

    case 'last-30-days': {
      const s = new Date(today);
      s.setDate(s.getDate() - 29);            // 30 days inclusive: today − 29
      return { start: s, end: today };
    }

    case 'last-3-months': {
      const s = new Date(today);
      s.setMonth(s.getMonth() - 3);           // same day 3 calendar months ago
      return { start: s, end: today };
    }

    case 'last-12-months': {
      const s = new Date(today);
      s.setFullYear(s.getFullYear() - 1);     // same day 12 calendar months ago
      return { start: s, end: today };
    }

    case 'month-to-date':
      return {
        start: new Date(year, month, 1),      // first day of current month
        end:   today,
      };

    case 'year-to-date':
      return {
        start: new Date(year, 0, 1),          // January 1 of current year
        end:   today,
      };

    case 'all-time':
      return { start: null, end: null };      // no date boundary — consumer applies no filter

    default:
      return null;
  }
}
