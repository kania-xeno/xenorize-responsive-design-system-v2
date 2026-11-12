/**
 * DatePicker.stories.jsx — Production Overview / Playground
 * Storybook hierarchy: Components / Date Picker / Overview
 *
 * Figma: Design System Scalable - All Platform-V.2.1.0 › ❖ Date Picker
 *   Component set: 2397:2096 · DP root: 2397:2097 · RP root: 2397:2151
 *   Stroke: INSIDE 1px · VariableID:2609:4318 → --date-picker-border-default
 *   Shadow: DROP_SHADOW y:16 blur:32 spread:-12 rgba(23,23,23,0.10) = regular-shadow/medium
 *   Corner radius: 20px (--radius-20)
 * Phase: DT-D3 · 2026-11-05
 *
 * D3.1 API audit: All props verified against DatePicker.jsx (195 lines) and
 *   RangePicker.jsx (446 lines). No stale or invented API found.
 * D3.4 Visual contract: ::after overlay border (see Section 14 — Token Usage)
 * D3.5 Accessibility: See Section 12
 */

import React, { useState } from "react";
import DatePicker from "./DatePicker.jsx";
import RangePicker from "./RangePicker.jsx";

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Convert an ISO-8601 string from a Storybook text control into a Date object.
 * Returns null for empty, undefined, or unparseable input.
 * Never pass ISO strings directly to DatePicker/RangePicker — always convert first.
 */
function isoToDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

// ── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: "Components/Date Picker/Overview",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**Date Picker — Production Documentation**

This family contains two picker variants that share a common CSS layer, token namespace
(\`--date-picker-*\`), and sub-components (\`CalendarPanel\`, \`CalendarFooter\`, \`TimeFilter\`).
Both components are **inline** calendar widgets — they do not manage their own trigger,
popover positioning, or mounting animation. The host component manages open/close lifecycle.

---

### 1. Component Purpose

\`DatePicker\` selects a single \`Date\`. \`RangePicker\` selects a date range
\`{ start: Date|null, end: Date|null }\` with an optional preset time-filter sidebar.
Both render as a styled dialog region at a fixed width; height hugs content.

Typical embedding pattern: host renders a text field that shows the formatted selection,
and mounts/unmounts the picker inside a floating panel (Popover, Dropdown, Modal).
The pickers have no trigger button of their own.

---

### 2. DatePicker vs RangePicker

| | \`DatePicker\` | \`RangePicker\` |
|---|---|---|
| Figma type | \`🧩 Type=Date Picker\` | \`🧩 Type=Range Picker\` |
| Figma node | 2397:2097 | 2397:2151 |
| Root width | 368 px | 936 px (200 px time filter + 736 px calendars) |
| Root height | HUG (~432 px with footer) | HUG (~432 px with footer) |
| Corner radius | 20 px (\`--radius-20\`) | 20 px (\`--radius-20\`) |
| Selection unit | Single \`Date\` | \`{ start: Date\\|null, end: Date\\|null }\` |
| Calendar panels | 1 | 2 (left + right, synchronized month nav) |
| Time Filter sidebar | — | Optional (200 px, \`showTimeFilter=true\` default) |
| Selection phases | — | idle → pendingStart → started → complete |
| \`aria-label\` default | \`"Date picker"\` | \`"Date range picker"\` |

Both roots render \`role="dialog" aria-modal="false"\` and share \`regular-shadow/medium\` drop
shadow and the \`--date-picker-border-default\` outer stroke (rendered via \`::after\` overlay).

---

### 3. Import and Basic Usage

\`\`\`jsx
import { DatePicker, RangePicker } from '@/components/date-picker';

// Uncontrolled DatePicker — no initial selection
<DatePicker aria-label="Pick a date" />

// Uncontrolled RangePicker — with time filter
<RangePicker aria-label="Pick a date range" />

// Pre-select a date without managing state
<DatePicker
  defaultValue={new Date(2024, 0, 15)}
  aria-label="Pick a date"
/>

// Pre-select a range without managing state
<RangePicker
  defaultRangeValue={{ start: new Date(2024, 0, 10), end: new Date(2024, 0, 20) }}
  aria-label="Pick a date range"
/>
\`\`\`

---

### 4. Controlled Usage

Pass \`value\` / \`rangeValue\` to control the component from outside.
When either prop is defined (even as \`null\`), the component is in controlled mode
and will not update its display on its own — the host must update state via \`onChange\`.

\`\`\`jsx
// DatePicker — controlled
function MyDatePicker() {
  const [date, setDate] = useState(null);
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      aria-label="Check-in date"
    />
  );
}

// RangePicker — controlled
function MyRangePicker() {
  const [range, setRange] = useState({ start: null, end: null });
  return (
    <RangePicker
      rangeValue={range}
      onRangeChange={setRange}
      aria-label="Booking date range"
    />
  );
}
\`\`\`

To clear the selection pass \`value={null}\` or \`rangeValue={{ start: null, end: null }}\`.

---

### 5. Uncontrolled Usage

Pass \`defaultValue\` / \`defaultRangeValue\` to pre-seed the picker without managing its state.
The component owns its state from that point; \`onChange\` / \`onRangeChange\` still fires on commits.

\`\`\`jsx
<DatePicker
  defaultValue={new Date(2024, 3, 15)}
  onChange={(date) => console.log('committed', date)}
  aria-label="Pick a date"
/>

<RangePicker
  defaultRangeValue={{ start: new Date(2024, 0, 1), end: new Date(2024, 0, 31) }}
  onRangeChange={(range) => console.log('committed', range)}
  aria-label="Pick a date range"
/>
\`\`\`

---

### 6. Draft and Committed State

**When \`showFooter=true\` (default — draft mode):**
- Cell clicks update an **internal draft** only. \`onChange\` / \`onRangeChange\` does **not** fire yet.
- **Apply** commits the draft: fires \`onChange\` / \`onRangeChange\` first, then \`onApply\` (same value, same call).
- **Cancel** discards the draft and restores the last committed value. Fires \`onCancel\`.

**When \`showFooter=false\` (immediate commit):**
- Every cell click commits immediately through \`onChange\` / \`onRangeChange\`.
- For RangePicker: commit fires after the **second** click (range complete), not after the first.
- Apply and Cancel are not rendered. \`onApply\` and \`onCancel\` will never be called.

**Note:** When \`showFooter=true\`, clicking Apply fires \`onChange\` first, then \`onApply\`, both with
the same value. If the same function is passed to both, it will be called twice. Use separate
handlers (or omit one) if that matters.

---

### 7. Footer Behavior (\`showFooter\`)

Figma property: **👞 Footer** BOOLEAN (default on).

\`CalendarFooter\` is conditionally rendered — when \`showFooter=false\`, the component returns
\`null\`. No element is emitted and the border-top divider also disappears (no residual 1 px line).

Footer buttons:
- **Cancel** — \`type="neutral" variant="outline" size="medium"\`. Always enabled, even when the
  picker is in \`disabled\` state (Figma C3 DT-D2.2.3 — Cancel is always a valid dismissal).
  Calls \`onCancel\`.
- **Apply** — \`type="primary" variant="filled" size="medium"\`. Disabled when no draft selection
  exists or when \`disabled=true\`. Calls \`onChange\`/\`onRangeChange\` then \`onApply\`.

RangePicker footer includes a range summary label (e.g. "Range: Jan 1, 2024 - Jan 31, 2024")
with \`aria-live="polite"\`. The \`footerRangeLabel\` prop overrides the auto-computed text
(used by preset time filters to show names like "All time" for null/null ranges).

---

### 8. Time Filter Behavior (\`showTimeFilter\`, Range Picker only)

Figma property: **⏳ Time Filter** BOOLEAN (default on).

Renders a \`<nav aria-label="Preset time ranges">\` sidebar (200 px) on the left edge.
When \`showTimeFilter=false\`, the sidebar is hidden and the visible width narrows to 736 px.

Default preset options (from \`DEFAULT_PERIOD_RANGES\`):
Today, Yesterday, Last 7 days, Last 30 days, This month, Last month, This year, All time.

Each preset resolves to a \`{ start, end }\` date range. "All time" resolves to \`{ null, null }\`.
Selecting a preset fires \`onTimeFilterChange(value)\` and navigates the left panel to the
resolved start date.

Customize presets via \`timeFilterOptions\` (array of \`{ label: string, value: string }\`).
Control the active preset externally via \`timeFilterValue\`.

---

### 9. Date Constraints

\`\`\`jsx
// Block dates before Jan 1, 2024 and after Dec 31, 2024
<DatePicker
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2024, 11, 31)}
  aria-label="Pick a date"
/>

// Block specific individual dates
<DatePicker
  disabledDates={[new Date(2024, 0, 1), new Date(2024, 11, 25)]}
  aria-label="Pick a date"
/>

// Add a visual dot marker to specific dates
<DatePicker
  markedDates={[new Date(2024, 0, 15), new Date(2024, 2, 20)]}
  aria-label="Pick a date"
/>
\`\`\`

Cells outside \`minDate\`/\`maxDate\` and cells in \`disabledDates\` receive the disabled visual
state and are excluded from keyboard navigation. \`markedDates\` adds a visual dot marker only
(no ARIA semantics for the marking — see Section 17 Known Limitations).

---

### 10. Disabled Behavior (\`disabled\`)

When \`disabled=true\`:
- All cell clicks are suppressed
- Navigation arrows (prev/next month) are suppressed
- Time Filter preset clicks are suppressed (RangePicker)
- The Apply button is disabled
- **Cancel remains enabled** (Figma C3 DT-D2.2.3 — always available as a dismissal action)

Use \`disabled=true\` when the host container is loading or when the date field is locked.
To block individual dates without disabling the entire picker, use \`disabledDates\` instead.

---

### 11. Keyboard Interactions

| Key | Scope | Action |
|---|---|---|
| ← → ↑ ↓ | Calendar grid | Navigate between day cells |
| Enter / Space | Calendar grid | Select / activate focused cell |
| Tab | Full component | Move focus forward through interactive elements |
| Shift+Tab | Full component | Move focus backward |
| Escape | Full component | No built-in dismiss — wire \`onCancel\` to close the host |

**Focus order (DatePicker):**
Prev-month button → Next-month button → Grid cells (roving tabindex) → Footer buttons.

**Focus order (RangePicker):**
Time Filter items → Left panel nav buttons → Left grid → Right panel nav buttons →
Right grid → Footer buttons.

**Roving tabindex:**
Exactly one grid cell holds \`tabindex="0"\` at all times; all others hold \`tabindex="-1"\`.
Arrow key presses update which cell holds \`tabindex="0"\` and move DOM focus to it.
This avoids ~42 (6×7 grid) excessive tab stops in the keyboard flow.

---

### 12. Accessibility Requirements

**Root element:**
Both pickers render \`role="dialog" aria-modal="false"\`. They are inline widgets — the host
overlay (if any) handles modal semantics. \`aria-modal="false"\` ensures assistive technology
does not trap the virtual cursor inside the picker region.

**Accessible name — always required:**
Provide \`aria-label\` or \`aria-labelledby\` on every instance. When neither is supplied the
component injects a default (\`"Date picker"\` / \`"Date range picker"\`), but explicit labels
are preferred for meaningful announcements:

\`\`\`jsx
<DatePicker aria-label="Check-in date" />
<RangePicker aria-label="Booking date range" />

// Or reference an external label
<label id="dp-label">Check-in date</label>
<DatePicker aria-labelledby="dp-label" />
\`\`\`

**Calendar grid semantics:**
- Grid wrapper: \`role="grid"\` with an \`aria-label\` for the visible month (e.g. "January 2024")
- Each week row: \`role="row"\`
- Each day cell: \`role="gridcell"\` with \`tabindex="-1"\` (or \`"0"\` for the roving focus cell)
- Selected cell: \`aria-selected="true"\`
- Disabled cell: \`aria-disabled="true"\`
- Today: \`aria-current="date"\`
- Column headers: \`role="columnheader"\` for Mon, Tue, … (locale-aware abbreviations)

**Range Picker additional semantics:**
- Range start and end cells: \`aria-selected="true"\`
- In-range cells: visually highlighted but not \`aria-selected\`
- Footer range summary: \`aria-live="polite"\` on the label container

**Focus management:**
- \`focus-visible\` outlines are component-managed. Do **not** suppress \`outline\` globally —
  host CSS must not contain \`:focus { outline: none }\` without a replacement ring.
- The component does **not** auto-focus itself on mount — host controls initial focus.
- When the picker is dismissed, the host must return focus to the trigger element.

**Navigation buttons:**
- Prev/next-month buttons have accessible labels (e.g. \`aria-label="Previous month"\`).
  Icon-only buttons are not bare \`<div>\` elements.

**Time Filter nav:**
- Renders \`<nav aria-label="Preset time ranges">\` with accessible button labels per preset.

---

### 13. Light and Dark Themes

The component reads theme context from the nearest ancestor carrying \`data-theme="dark"\`.
All \`--date-picker-*\` tokens resolve to dark-mode values automatically at that boundary.

| Token | Light value | Dark value |
|---|---|---|
| \`--date-picker-border-default\` | \`rgb(234, 234, 234)\` | \`rgb(81, 85, 103)\` |
| \`--date-picker-surface-bg\` | white/light surface | dark surface |
| \`--shadow-regular-medium\` | \`0 16px 32px -12px rgba(23,23,23,0.10)\` | unchanged |

The global Storybook theme toolbar (sun/moon icon) sets \`data-theme\` on \`<html>\` and
\`<body>\`, which propagates to all pickers on the page. The **Dark Theme** story forces dark
mode locally via \`data-theme="dark"\` on its wrapper element for independent verification.

Consumers using the global Storybook toolbar do not need any per-story wrapping — the
\`withTheme\` decorator in \`preview.js\` sets the attribute on the document root, which
ensures L2 → L3 token inheritance resolves correctly (see \`preview.js\` comment for why
\`document.documentElement\` is required, not a wrapper div).

---

### 14. Token Usage

All \`--date-picker-*\` variables are declared in \`DatePicker.css\` and scoped to
\`.date-picker\` and \`.range-picker\`. No hardcoded colors, radii, or shadows are used.

**Key tokens:**

| CSS Variable | Maps to Figma / DS token | Purpose |
|---|---|---|
| \`--date-picker-border-default\` | VariableID:2609:4318 · border/neutral/subtle | Outer stroke + footer divider |
| \`--date-picker-surface-bg\` | VariableID:2609:4322 · surface/neutral/white | Calendar background fill |
| \`--date-picker-surface-bg-hover\` | VariableID:2609:4324 · surface/neutral/weak | Day cell hover background |
| \`--date-picker-surface-bg-active\` | VariableID:2609:4323 · brand/primary/base | Selected day background |
| \`--date-picker-surface-disabled\` | VariableID:2609:4325 · text/neutral/disabled | Disabled day background |
| \`--date-picker-text-default\` | VariableID:2609:4328 · text/neutral/muted | Default day text |
| \`--date-picker-text-hover\` | VariableID:2609:4330 · text/neutral/strong | Hover / in-range text |
| \`--date-picker-text-active\` | VariableID:2609:4326 · text/neutral/inverse | Selected day text |
| \`--date-picker-text-disabled\` | VariableID:2609:4329 · text/neutral/disabled | Disabled day text |
| \`--date-picker-text-day-label\` | VariableID:2609:4327 · text/neutral/subtle | Weekday header label |
| \`--date-picker-text-range-label\` | VariableID:3896:219 · text/neutral/muted | Range summary label |
| \`--date-picker-text-range-value\` | VariableID:3896:220 · text/neutral/strong | Range summary value |
| \`--date-picker-range-bg-selected\` | VariableID:2609:4321 · surface/brand/primary | In-range cell background |
| \`--radius-20\` | responsive radius token | Component corner radius (20 px) |
| \`--shadow-regular-medium\` | regular-shadow/medium | Drop shadow |

**D3.4 — Visual Contract:**

The 1 px outer border is rendered by a \`::after\` pseudo-element on the root — not via
\`box-shadow: inset\` or \`border\`. The inset-shadow approach was ruled out because
\`.date-picker\` / \`.range-picker\` carry \`overflow: hidden\`, and direct children apply
\`background: var(--date-picker-surface-bg)\` which covers all 4 inner edges, eliminating
any inset shadow. The \`::after\` overlay sits above the content in z-order but below
focus rings, and does not interfere with layout or interaction.

\`\`\`css
/* DatePicker.css — do not replicate in host */
.date-picker,
.range-picker {
  position: relative;        /* required: ::after uses position:absolute */
  box-shadow: var(--shadow-regular-medium);
  border-radius: var(--radius-20);
}

.date-picker::after,
.range-picker::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid var(--date-picker-border-default);
  border-radius: inherit;
  box-sizing: border-box;
  pointer-events: none;      /* does not block clicks */
  z-index: 1;                /* above content, below focus rings */
}
\`\`\`

The overlay:
- Does **not** affect layout dimensions (\`position: absolute; inset: 0\`)
- Does **not** block pointer events (\`pointer-events: none\`)
- Does **not** cover focus-visible rings (focus rings have higher z-order)
- Requires \`.date-picker\` / \`.range-picker\` root to have \`position: relative\`

The \`CalendarFooter\` border-top divider is part of \`CalendarFooter\`'s own CSS and
disappears automatically when \`showFooter=false\` causes the footer to return \`null\`.

---

### 15. Supported States

| State | Trigger | Visual |
|---|---|---|
| Default / empty | On mount | No day selected |
| Day hovered | Pointer over grid cell | Hover background |
| Day selected | Click or Enter/Space | Accent fill |
| Today | Matches current date | Ring / border indicator |
| In-range | Day between range start and end (RP only) | Muted fill |
| Range start | First selected date in range (RP only) | Accent fill + left cap |
| Range end | Second selected date in range (RP only) | Accent fill + right cap |
| Pending selection | First click in RP before second click | Start cell highlighted, hover shows preview range |
| Disabled cell | Outside min/max or in \`disabledDates\` | Muted text, no hover, \`aria-disabled\` |
| Marked | In \`markedDates\` | Dot indicator below date number |
| Disabled component | \`disabled=true\` | All cells and nav suppressed; Cancel still active |
| Out-of-month | Prev/next month cells visible in grid | Muted text |
| Hover preview range | Cursor over grid while in pendingStart phase (RP) | Soft range highlight from start to hovered cell |

---

### 16. Unsupported or Runtime-Owned Behavior

The following behaviors are **not implemented** by this component:

| Behavior | Notes |
|---|---|
| Multi-select (> 2 dates) | Not supported. Use \`RangePicker\` for two-date selection. |
| Week selection | Not supported. Individual day selection only. |
| Year / decade view | Navigation is month-level only via prev/next arrows. |
| Input field / free-text entry | No internal text input. Host provides trigger and formats the display label. |
| Popover / tooltip positioning | The component is inline; host manages positioning (Popover, Dropdown, etc.). |
| Open / close animation | Component is always visible once mounted; host controls mounting and may apply CSS transitions. |
| Touch swipe gesture | Month navigation is button-only; no swipe gesture. |
| Date range max span enforcement | No built-in maximum range duration validation. |
| Localized calendar systems | Only Gregorian calendar. \`locale\` affects formatting labels, not the calendar system. |
| Week number display | Not rendered in the grid. |
| DST-aware time calculation | \`startOfDay()\` is called internally. Time-of-day is discarded; DST edge cases at midnight are not handled specially. |

---

### 17. Known Limitations

- **Year navigation** — Requires clicking the month arrows repeatedly. No year/decade jump view exists.
- **RangePicker no-footer commit timing** — With \`showFooter=false\`, \`onRangeChange\` fires
  only after the **second** click completes the range, not after the first click.
- **\`defaultViewDate\` is mount-only** — It is applied once at mount. Programmatic \`value\` or
  \`rangeValue\` changes do not reposition the visible month.
- **\`markedDates\` has no ARIA semantics** — The dot marker is visual only. Screen readers
  receive no announcement for a marked date.
- **Custom \`timeFilterOptions\` are not validated against \`minDate\`/\`maxDate\`** — Preset ranges
  that extend beyond the allowed boundary are not automatically trimmed.
- **\`onApply\` and \`onChange\` both fire on Apply** — When \`showFooter=true\`, clicking Apply
  fires \`onChange\` first, then \`onApply\`, both with the same value. Passing the same function
  to both results in two calls per commit. Pass separate handlers if the distinction matters.
        `,
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 1 — Playground
// Controlled wrapper. pickerType is a Storybook-only control — not a component prop.
// ISO date strings from controls are converted to Date objects inside the render wrapper.
// ─────────────────────────────────────────────────────────────────────────────

export const Playground = {
  name: "Playground",
  parameters: {
    docs: {
      description: {
        story: `
Fully interactive controlled wrapper. Toggle **pickerType** to switch between DatePicker and
RangePicker. All controls map to real component props — ISO date strings in the controls are
converted to \`Date\` objects before being passed to the components.

The callback log shows all events in chronological order. When \`showFooter=true\`, clicking Apply
fires \`onChange\` / \`onRangeChange\` first, then \`onApply\`, each logged separately with its
callback name. When \`showFooter=false\`, only \`onChange\` / \`onRangeChange\` fires per cell click.
        `,
      },
    },
  },
  argTypes: {
    // Storybook-only: not a component prop
    pickerType: {
      name: "pickerType",
      description: "Switch between DatePicker and RangePicker (Storybook-only control)",
      control: { type: "select" },
      options: ["date-picker", "range-picker"],
      table: { category: "Storybook Only" },
    },
    // --- Shared real props ---
    showFooter: {
      name: "showFooter",
      description: "Show footer with Apply / Cancel buttons. When false, selection commits immediately.",
      control: { type: "boolean" },
      table: { category: "Props" },
    },
    disabled: {
      name: "disabled",
      description: "Disable all interaction. Cancel remains active on RangePicker.",
      control: { type: "boolean" },
      table: { category: "Props" },
    },
    locale: {
      name: "locale",
      description: "Intl locale for month/day formatting (e.g. 'en-US', 'de-DE').",
      control: { type: "text" },
      table: { category: "Props" },
    },
    firstDayOfWeek: {
      name: "firstDayOfWeek",
      description: "First day of week column: 0=Mon (Figma default), 6=Sun.",
      control: { type: "number", min: 0, max: 6 },
      table: { category: "Props" },
    },
    minDate: {
      name: "minDate",
      description: "Earliest selectable date as ISO string (e.g. '2024-01-01'). Converted to Date internally.",
      control: { type: "text" },
      table: { category: "Props" },
    },
    maxDate: {
      name: "maxDate",
      description: "Latest selectable date as ISO string. Converted to Date internally.",
      control: { type: "text" },
      table: { category: "Props" },
    },
    // --- DatePicker-specific ---
    value: {
      name: "value (DatePicker)",
      description: "Controlled selected date as ISO string. Converted to Date internally. Only used when pickerType=date-picker.",
      control: { type: "text" },
      table: { category: "DatePicker Props" },
    },
    // --- RangePicker-specific ---
    rangeStart: {
      name: "rangeValue.start (RangePicker)",
      description: "Controlled range start as ISO string. Converted to Date internally. Only used when pickerType=range-picker.",
      control: { type: "text" },
      table: { category: "RangePicker Props" },
    },
    rangeEnd: {
      name: "rangeValue.end (RangePicker)",
      description: "Controlled range end as ISO string. Converted to Date internally. Only used when pickerType=range-picker.",
      control: { type: "text" },
      table: { category: "RangePicker Props" },
    },
    showTimeFilter: {
      name: "showTimeFilter (RangePicker)",
      description: "Show Time Filter sidebar with preset range shortcuts. Only used when pickerType=range-picker.",
      control: { type: "boolean" },
      table: { category: "RangePicker Props" },
    },
  },
  args: {
    pickerType: "date-picker",
    showFooter: true,
    disabled: false,
    locale: "en-US",
    firstDayOfWeek: 0,
    minDate: "",
    maxDate: "",
    value: "",
    rangeStart: "",
    rangeEnd: "",
    showTimeFilter: true,
  },
  render: (args) => {
    // Convert ISO strings to Date objects
    const minDate = isoToDate(args.minDate);
    const maxDate = isoToDate(args.maxDate);

    if (args.pickerType === "range-picker") {
      return (
        <RangePlayground
          rangeStart={isoToDate(args.rangeStart)}
          rangeEnd={isoToDate(args.rangeEnd)}
          showFooter={args.showFooter}
          showTimeFilter={args.showTimeFilter}
          disabled={args.disabled}
          locale={args.locale}
          firstDayOfWeek={args.firstDayOfWeek}
          minDate={minDate}
          maxDate={maxDate}
        />
      );
    }

    return (
      <DatePlayground
        value={isoToDate(args.value)}
        showFooter={args.showFooter}
        disabled={args.disabled}
        locale={args.locale}
        firstDayOfWeek={args.firstDayOfWeek}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  },
};

// D3.1 audit note: separate handlers for onChange and onApply demonstrate the real callback
// contract. When showFooter=true, Apply fires onChange first (with committed value) then
// onApply (with same value). Both are distinct callbacks — the runtime intentionally calls
// both. Using separate handlers lets the Playground log each callback independently.
// Issue in the previous D3 implementation: the same handler was wired to both callbacks,
// which was ambiguous story logging — not a runtime bug. This is corrected here.

function DatePlayground({ value, showFooter, disabled, locale, firstDayOfWeek, minDate, maxDate }) {
  const [controlled, setControlled] = useState(value ?? null);
  const [log, setLog] = useState([]);

  const addEntry = (callbackName, date) => {
    const fmtDate = date ? date.toLocaleDateString(locale) : "null";
    setLog((prev) => [
      { ts: new Date().toLocaleTimeString(), label: callbackName, value: fmtDate },
      ...prev.slice(0, 5),
    ]);
  };

  const handleChange = (date) => {
    setControlled(date);
    addEntry("onChange", date);
  };

  const handleApply = (date) => {
    addEntry("onApply", date);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <DatePicker
        value={controlled}
        onChange={handleChange}
        onApply={handleApply}
        onCancel={() => setLog((prev) => [{ ts: new Date().toLocaleTimeString(), label: "onCancel", value: "—" }, ...prev.slice(0, 5)])}
        showFooter={showFooter}
        disabled={disabled}
        locale={locale}
        firstDayOfWeek={firstDayOfWeek}
        minDate={minDate}
        maxDate={maxDate}
      />
      <CommitLog entries={log} />
    </div>
  );
}

function RangePlayground({ rangeStart, rangeEnd, showFooter, showTimeFilter, disabled, locale, firstDayOfWeek, minDate, maxDate }) {
  const [range, setRange] = useState({ start: rangeStart ?? null, end: rangeEnd ?? null });
  const [log, setLog] = useState([]);

  const fmt = (d) => (d ? d.toLocaleDateString(locale) : "null");

  const addEntry = (callbackName, r) => {
    const fmtRange = r ? `${fmt(r.start)} → ${fmt(r.end)}` : "—";
    setLog((prev) => [
      { ts: new Date().toLocaleTimeString(), label: callbackName, value: fmtRange },
      ...prev.slice(0, 5),
    ]);
  };

  const handleRangeChange = (r) => {
    setRange(r);
    addEntry("onRangeChange", r);
  };

  const handleApply = (r) => {
    addEntry("onApply", r);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <RangePicker
        rangeValue={range}
        onRangeChange={handleRangeChange}
        onApply={handleApply}
        onCancel={() => setLog((prev) => [{ ts: new Date().toLocaleTimeString(), label: "onCancel", value: "—" }, ...prev.slice(0, 5)])}
        showFooter={showFooter}
        showTimeFilter={showTimeFilter}
        disabled={disabled}
        locale={locale}
        firstDayOfWeek={firstDayOfWeek}
        minDate={minDate}
        maxDate={maxDate}
      />
      <CommitLog entries={log} />
    </div>
  );
}

// CommitLog — labeled callback event log
// entries: Array<{ ts: string, label: string, value: string }>
// label: callback name (onChange, onApply, onRangeChange, onCancel)
function CommitLog({ entries }) {
  if (entries.length === 0) return (
    <div style={{
      fontFamily: "var(--text-style-body-medium-md-font-family, monospace)",
      fontSize: 11,
      color: "#aaa",
      textAlign: "center",
    }}>
      Callbacks — no events yet
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 300 }}>
      <div style={{ fontFamily: "var(--text-style-body-medium-md-font-family, sans-serif)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
        Callback log
      </div>
      {entries.map((e, i) => (
        <div key={i} style={{ fontFamily: "monospace", fontSize: 12, color: i === 0 ? "#1c1c1c" : "#aaa" }}>
          <span style={{ color: i === 0 ? "#0070f3" : "#bbb", fontWeight: 600 }}>{e.label}</span>
          {" — "}{e.value}{" "}
          <span style={{ fontSize: 10, color: "#ccc" }}>{e.ts}</span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2 — DatePicker
// ─────────────────────────────────────────────────────────────────────────────

export const DatePickerStory = {
  name: "Date Picker",
  parameters: {
    docs: {
      description: {
        story: `
Single-date picker. Figma \`🧩 Type=Date Picker\` variant (node 2397:2097).
368 × 432 px · radius 20 · footer shown (default).

Rendered uncontrolled with no initial selection. Click a date to stage it; Apply to commit.
        `,
      },
    },
  },
  render: () => (
    <DatePicker
      defaultViewDate={new Date(2024, 0, 1)}
      aria-label="Date picker"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 3 — RangePicker
// ─────────────────────────────────────────────────────────────────────────────

export const RangePickerStory = {
  name: "Range Picker",
  parameters: {
    docs: {
      description: {
        story: `
Dual-panel range picker with Time Filter sidebar. Figma \`🧩 Type=Range Picker\` (node 2397:2151).
936 × 432 px · radius 20 · footer shown · time filter shown (defaults).

Click a first date to start the range, then a second date to complete it. Apply to commit.
        `,
      },
    },
  },
  render: () => (
    <RangePicker
      defaultViewDate={new Date(2024, 0, 1)}
      aria-label="Date range picker"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 4 — Disabled
// ─────────────────────────────────────────────────────────────────────────────

export const Disabled = {
  name: "Disabled",
  parameters: {
    docs: {
      description: {
        story: `
Both picker types with \`disabled=true\`. All cell clicks and nav arrows are suppressed.
On RangePicker, Cancel remains active as a dismissal action (Figma C3 DT-D2.2.3).
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <div style={{ fontFamily: "var(--text-style-body-medium-md-font-family, sans-serif)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
          Date Picker — disabled
        </div>
        <DatePicker
          defaultValue={new Date(2024, 0, 15)}
          defaultViewDate={new Date(2024, 0, 1)}
          disabled
          aria-label="Date picker (disabled)"
        />
      </div>
      <div>
        <div style={{ fontFamily: "var(--text-style-body-medium-md-font-family, sans-serif)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
          Range Picker — disabled
        </div>
        <RangePicker
          defaultRangeValue={{ start: new Date(2024, 0, 10), end: new Date(2024, 0, 20) }}
          defaultViewDate={new Date(2024, 0, 1)}
          disabled
          aria-label="Date range picker (disabled)"
        />
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 5 — WithoutFooter
// ─────────────────────────────────────────────────────────────────────────────

export const WithoutFooter = {
  name: "Without Footer",
  parameters: {
    docs: {
      description: {
        story: `
Both pickers with \`showFooter=false\`. The footer element is removed entirely — no border divider
appears at the bottom. Selection commits immediately on each cell click via \`onChange\` /
\`onRangeChange\` (no draft state; no Apply / Cancel buttons).
        `,
      },
    },
  },
  render: () => {
    // Local controlled wrappers so the selection is visible
    function NoFooterDP() {
      const [val, setVal] = useState(null);
      return (
        <div>
          <div style={{ fontFamily: "var(--text-style-body-medium-md-font-family, sans-serif)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
            Date Picker — showFooter=false
          </div>
          <DatePicker
            value={val}
            onChange={setVal}
            showFooter={false}
            defaultViewDate={new Date(2024, 0, 1)}
            aria-label="Date picker without footer"
          />
          <div style={{ marginTop: 8, fontFamily: "monospace", fontSize: 12, color: "#888" }}>
            {val ? `Selected: ${val.toLocaleDateString("en-US")}` : "No selection"}
          </div>
        </div>
      );
    }

    function NoFooterRP() {
      const [range, setRange] = useState({ start: null, end: null });
      const fmt = (d) => (d ? d.toLocaleDateString("en-US") : "—");
      return (
        <div>
          <div style={{ fontFamily: "var(--text-style-body-medium-md-font-family, sans-serif)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
            Range Picker — showFooter=false
          </div>
          <RangePicker
            rangeValue={range}
            onRangeChange={setRange}
            showFooter={false}
            defaultViewDate={new Date(2024, 0, 1)}
            aria-label="Date range picker without footer"
          />
          <div style={{ marginTop: 8, fontFamily: "monospace", fontSize: 12, color: "#888" }}>
            {`Start: ${fmt(range.start)}  End: ${fmt(range.end)}`}
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <NoFooterDP />
        <NoFooterRP />
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6 — DarkTheme
// ─────────────────────────────────────────────────────────────────────────────

export const DarkTheme = {
  name: "Dark Theme",
  parameters: {
    docs: {
      description: {
        story: `
Both pickers rendered on a dark surface. The global Storybook theme toolbar also toggles dark
mode — this story forces dark locally via \`data-theme="dark"\` on the wrapper element so it is
visible regardless of the toolbar state.

Token resolution at dark mode:
- \`--date-picker-border-default\` → \`rgb(81, 85, 103)\`
- \`--date-picker-surface-bg\` → dark surface
- \`--shadow-regular-medium\` unchanged (design decision)
        `,
      },
    },
  },
  render: () => (
    <div
      data-theme="dark"
      style={{
        padding: 32,
        background: "#1b1c22",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 32,
        alignItems: "flex-start",
      }}
    >
      <div>
        <div style={{ fontFamily: "var(--text-style-body-medium-md-font-family, sans-serif)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
          Date Picker — dark
        </div>
        <DatePicker
          defaultViewDate={new Date(2024, 0, 1)}
          aria-label="Date picker (dark theme)"
        />
      </div>
      <div>
        <div style={{ fontFamily: "var(--text-style-body-medium-md-font-family, sans-serif)", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
          Range Picker — dark
        </div>
        <RangePicker
          defaultViewDate={new Date(2024, 0, 1)}
          aria-label="Date range picker (dark theme)"
        />
      </div>
    </div>
  ),
};
