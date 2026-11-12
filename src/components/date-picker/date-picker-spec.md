# Date Picker — Component Specification

**DT Phase:** DT-D4 · Final Source Reconciliation  
**Date:** 2026-11-11  
**Author:** DT (Design Technologist)  
**Figma file:** Design System Scalable - All Platform-V.2.1.0 (`0aVnOgjVWH1YL8JCnjXTBi`)  
**Figma page:** ❖ Date Picker  
**Status:** Production-ready. Untracked — ready for `git add + commit`.

---

## 1. Overview

The Date Picker family consists of two related calendar picker components:

- **DatePicker** — single-date calendar picker (node `2397:2097`)
- **RangePicker** — dual-panel date-range picker (node `2397:2151`)

Both share a common token namespace (`date-picker/*`), sub-components, CSS file, and behavioral model. They are co-located in `src/components/date-picker/` and exported from a single barrel (`index.js`).

---

## 2. Figma Source

| Item | Value |
|---|---|
| File key | `0aVnOgjVWH1YL8JCnjXTBi` |
| File name | Design System Scalable - All Platform-V.2.1.0 |
| Page | ❖ Date Picker |
| Component set | `↳date-picker` · node `2397:2096` |
| DatePicker variant | `🧩 Type=Date Picker` · node `2397:2097` |
| RangePicker variant | `🧩 Type=Range Picker` · node `2397:2151` |
| Day label set | `↳day label` · node `2397:2041` |
| Day-cells set | `↳day-cells` · node `2397:2044` |
| Period-range set | `↳period-range` · node `2397:2076` |
| Date-selector set | `↳date-selector` · node `2397:2083` |

All 7 canonical nodes verified live in Figma as part of DT-D4.

---

## 3. Component Variants (Figma)

### DatePicker variant axes

| Axis | Values |
|---|---|
| `🧩 Type` | `Date Picker` / `Range Picker` |
| `👞 Footer` | `true` / `false` |
| `🌗 Theme` | Light / Dark (via `[data-theme]` in code) |

### Visual states (DayCell)

Default, Hover, Active (selected), Range-active (in range), Disabled, Marked (dot overlay).

---

## 4. Anatomy / Sub-Components

```
DatePicker (root .date-picker, role="dialog")
  └─ CalendarPanel
       ├─ CalendarHeader   (prev/next month navigation)
       ├─ WeekdayLabels    (Mon–Sun row, role="row")
       └─ CalendarGrid     (role="grid" — roving tabindex)
            └─ DayCell[]   (role="gridcell")
  └─ CalendarFooter        (conditional on showFooter=true)
       ├─ [cancel button]  (always enabled)
       └─ [apply button]   (disabled until draft exists)

RangePicker (root .range-picker, role="dialog")
  ├─ TimeFilter             (preset ranges — left panel)
  └─ .range-picker__dual-calendar
       ├─ CalendarPanel (left)   + CalendarFooter
       └─ CalendarPanel (right)
```

Sub-component files:
- `CalendarPanel.jsx` — month container, passes disabled flag
- `CalendarHeader.jsx` — month/year label + prev/next buttons
- `WeekdayLabels.jsx` — weekday header row (Mon–Sun)
- `CalendarGrid.jsx` — grid with roving tabindex keyboard nav
- `DayCell.jsx` — individual day cell with all visual states
- `CalendarFooter.jsx` — Cancel/Apply footer (DP: 160px buttons; RP: 108px)
- `TimeFilter.jsx` — preset period-range selector (RP only)
- `PeriodRange.jsx` — single period-range option row

---

## 5. DatePicker API

```jsx
import { DatePicker } from '@/components/date-picker';

<DatePicker
  value={Date|null}             // Controlled selected date
  defaultValue={Date|null}      // Uncontrolled initial date (default: null)
  onChange={(date) => void}     // Fires on commit (cell click if no footer; Apply if footer)
  onApply={(date) => void}      // Fires AFTER onChange on Apply click (showFooter=true only)
  onCancel={() => void}         // Fires on Cancel click
  showFooter={boolean}          // Footer with Apply/Cancel (default: true)
  defaultViewDate={Date|null}   // Initial view month (default: value or today)
  minDate={Date|null}           // Earliest selectable date
  maxDate={Date|null}           // Latest selectable date
  disabledDates={Date[]}        // Explicit disabled dates (default: [])
  markedDates={Date[]}          // Dates with dot marker (default: [])
  locale={'en-US'}              // Intl locale (default: 'en-US')
  firstDayOfWeek={0}            // 0=Mon (Figma default), 1=Tue, … 6=Sun
  disabled={false}              // Disable entire picker
  className={''}                // Additional root class
  aria-label={'...'}            // Accessible dialog label
  aria-labelledby={'id'}        // References external heading
  ref={React.Ref}               // Forwarded to root div
/>
```

---

## 6. RangePicker API

```jsx
import { RangePicker } from '@/components/date-picker';

<RangePicker
  rangeValue={{ start: Date|null, end: Date|null } | null}       // Controlled range
  defaultRangeValue={{ start: Date|null, end: Date|null } | null} // Uncontrolled init
  onRangeChange={({ start, end }) => void}  // Fires on range commit
  onApply={({ start, end }) => void}        // Fires AFTER onRangeChange on Apply
  onCancel={() => void}                     // Fires on Cancel
  showFooter={boolean}                      // Footer (default: true)
  timeFilterValue={string|null}             // Active preset key (controlled)
  timeFilterOptions={Array<{label, value}>} // Custom presets (default: DEFAULT_PERIOD_RANGES)
  onTimeFilterChange={(value) => void}      // Preset selection callback
  defaultViewDate={Date}                    // Initial left-panel view month
  minDate={Date|null}
  maxDate={Date|null}
  disabledDates={Date[]}
  markedDates={Date[]}
  locale={'en-US'}
  firstDayOfWeek={0}
  disabled={false}
  className={''}
  aria-label={'...'}
  aria-labelledby={'id'}
  ref={React.Ref}
/>
```

---

## 7. Shared Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Disables entire picker; forces all cells to `tabIndex=-1` |
| `minDate` | `Date\|null` | `null` | Cells before minDate are non-selectable |
| `maxDate` | `Date\|null` | `null` | Cells after maxDate are non-selectable |
| `disabledDates` | `Date[]` | `[]` | Specific dates disabled |
| `markedDates` | `Date[]` | `[]` | Dates with dot indicator (shown below cell number) |
| `locale` | `string` | `'en-US'` | Intl locale for month/weekday labels |
| `firstDayOfWeek` | `number` | `0` | 0=Mon (Figma default), 6=Sun |
| `className` | `string` | `''` | Added to root element |
| `aria-label` | `string` | auto | Dialog accessible name (auto-generated if neither label prop is set) |
| `aria-labelledby` | `string` | — | ID of external heading element |
| `ref` | `React.Ref` | — | Forwarded to root div |

---

## 8. Commit Semantics

### showFooter=true (default)

Cell clicks update an **internal draft** only — no callbacks fire until the user confirms.

1. User clicks a cell → `draftValue`/`draftRange` updated. No external event.
2. User clicks **Apply** → `onChange`/`onRangeChange` fires first (committed value), then `onApply` fires (same value). One call each.
3. User clicks **Cancel** → `draftValue`/`draftRange` reset to last committed value. `onCancel` fires.

The **Apply button** is disabled until `draftValue`/`draftRange` is non-null (DP) or has both endpoints / a preset selected (RP).  
The **Cancel button** is always enabled (never disabled).

### showFooter=false (immediate commit)

Cell clicks commit immediately:
- **DatePicker**: each cell click fires `onChange(date)`. `onApply` never fires.
- **RangePicker**: the **first click** sets `pendingStart` only — no callback fires. The **second click** completes the range and fires `onRangeChange({ start, end })`. `onApply` never fires.

---

## 9. Callback Contract

| Event | DatePicker callback | RangePicker callback | Fires when |
|---|---|---|---|
| Selection commit | `onChange(date: Date\|null)` | `onRangeChange({ start, end })` | On Apply (footer) or immediate click (no footer) |
| Apply confirmed | `onApply(date: Date\|null)` | `onApply({ start: Date\|null, end: Date\|null })` | Immediately after onChange on Apply click |
| Cancel | `onCancel()` | `onCancel()` | On Cancel click |

**Important:** `onChange` and `onApply` are **two distinct callbacks**, not duplicates. `onChange` is the standard controlled-component update signal. `onApply` is for consumers who need to react specifically to an explicit Apply intent (e.g., triggering a search query or closing a dropdown). Both always fire together on Apply.

---

## 10. Keyboard Navigation

Keyboard handling is implemented in `CalendarGrid.jsx`.

| Key | Context | Behavior |
|---|---|---|
| `ArrowLeft` | Grid | Focus previous cell |
| `ArrowRight` | Grid | Focus next cell |
| `ArrowUp` | Grid | Focus same weekday in previous week |
| `ArrowDown` | Grid | Focus same weekday in next week |
| `Home` | Grid | Focus first enabled cell in current row |
| `End` | Grid | Focus last enabled cell in current row |
| `PageUp` | Grid | Navigate to previous month (preserves weekday) |
| `PageDown` | Grid | Navigate to next month (preserves weekday) |
| `Enter` / `Space` | Grid | Select / activate focused cell |
| `Escape` | Full component | No built-in dismiss — host must wire `onCancel` to close |
| `Tab` | Full component | Prev-month button → Next-month button → Grid → Footer buttons |

---

## 11. Accessibility / ARIA

| Element | Attribute | Value |
|---|---|---|
| Root div | `role` | `"dialog"` |
| Root div | `aria-modal` | `"false"` (widget embedded in page, not a true dialog) |
| Root div | `aria-label` | Auto-generated accessible name if neither `aria-label` nor `aria-labelledby` provided |
| Calendar grid | `role` | `"grid"` |
| Grid | `aria-label` | Current month + year (e.g., "January 2024") |
| Weekday header row | `role` | `"row"` |
| Each day cell | `role` | `"gridcell"` |
| Each day cell | `aria-selected` | `"true"` when selected |
| Each day cell | `aria-disabled` | `"true"` when disabled |
| Each day cell | `aria-label` | Full date string (e.g., "Monday, January 15, 2024") |
| Roving tabindex | `tabIndex` | `0` on focused cell, `-1` on all others |

**focus-visible:** Defined in `DatePicker.css`. `.day-cell:focus-visible` renders a 2px outline using `--date-picker-surface-bg-active`. `.period-range:focus-visible` similarly scoped. Do **not** suppress `outline` globally.

**200% zoom:** No fixed viewport dependency. All sizes in px fixed per Figma spec; layout uses flexbox, not absolute positioning for content areas. Text uses `var(--text-style-*)` tokens. Minimum tested viewport: 320px wide.

---

## 12. Token Usage — 15 L3 Variables

All 15 `date-picker/*` L3 variables are defined in:
- `src/design-tokens/tokens.json` → `component.datePicker` block
- `src/design-tokens/tokens.css` → `:root` block (lines 920–943) + `[data-theme="dark"]` overrides (lines 2258–2259)

| CSS Variable | JSON Key | Figma Alias | Light Value | Dark Value |
|---|---|---|---|---|
| `--date-picker-border-default` | `border.default` | `border/neutral/subtle` | `#eaeaea` | `#515567` |
| `--date-picker-border-disabled` | `border.disabled` | `text/neutral/disabled` | `#d1d1d1` | `#515567` |
| `--date-picker-range-bg-hover` | `range.bgHover` | `brand/primary/base` | `#403297` | `#9589d9` |
| `--date-picker-range-bg-selected` | `range.bgSelected` | `surface/brand/primary` | `#eceaf8` | `#0f0c24` |
| `--date-picker-surface-bg` | `surface.bg` | `surface/neutral/white` | `#ffffff` | `#24262e` |
| `--date-picker-surface-bg-active` | `surface.bgActive` | `brand/primary/base` | `#403297` | `#9589d9` |
| `--date-picker-surface-bg-hover` | `surface.bgHover` | `surface/neutral/weak` | `#f6f7f8` | `#2d2f39` |
| `--date-picker-surface-disabled` | `surface.disabled` | `text/neutral/disabled` | `#d1d1d1` | `#515567` |
| `--date-picker-text-active` | `text.active` | `text/neutral/inverse` | `#ffffff` | `#1b1c22` ★ |
| `--date-picker-text-day-label` | `text.dayLabel` | `text/neutral/subtle` | `#a3a3a3` | `#6b7189` |
| `--date-picker-text-default` | `text.default` | `text/neutral/muted` | `#7b7b7b` | `#989dae` |
| `--date-picker-text-disabled` | `text.disabled` | `text/neutral/disabled` | `#d1d1d1` | `#515567` |
| `--date-picker-text-hover` | `text.hover` | `text/neutral/strong` | `#1c1c1c` | `#ffffff` |
| `--date-picker-text-range-label` | `text.rangeLabel` | `text/neutral/muted` | `#7b7b7b` | `#989dae` |
| `--date-picker-text-range-value` | `text.rangeValue` | `text/neutral/strong` | `#1c1c1c` | `#ffffff` |

★ `--date-picker-text-active` and `--date-picker-range-bg-selected` require explicit `[data-theme="dark"]` overrides because their L2 aliases (`--color-text-white`, `--color-brand-primary-lighter`) lack semantic dark counterparts.

**Zero raw hex values** in `date-picker/*` declarations. All entries use `var(--...)` aliases.

---

## 13. Visual Contract — Geometry

### DatePicker

| Element | Figma geometry |
|---|---|
| Root | 368 × 432 px (HUG height) |
| Corner radius | `--radius-20` (20 px) |
| Calendar panel | 368 × 364 px · padding: 20px all sides · gap: 8px |
| Weekday labels row | 368 × 32 px |
| Day cell | 40 × 40 px (HUG, 7 columns) |
| Calendar footer | 368 × 68 px · padding: 16px all sides · gap: 16px |
| Footer buttons | 160 × 36 px each (flex:1) |

### RangePicker

| Element | Figma geometry |
|---|---|
| Root | 936 × 432 px (HUG height) |
| Corner radius | `--radius-20` (20 px) |
| Time filter panel | 200 × 432 px · padT:20 padL/R:16 padB:2 · gap:8 |
| Dual calendar area | Two 368px panels |
| Calendar footer (RP) | padding-left: 24px (not 16px) · buttons: 108 × 36 px |

### CalendarHeader

| Element | Figma geometry |
|---|---|
| Header container | 328 × 24 px · no padding |
| Month/year label | Centered, `--text-style-body-semibold-md-*` |
| Prev/Next buttons | 24 × 24 px icon buttons |

---

## 14. Shadow

**Token:** `--shadow-regular-medium`  
**Value:** `0 16px 32px -12px rgba(23, 23, 23, 0.10)`  
**Figma effect style:** `S:db7835b95af1177386115f15bed114d33042e783`  
**Applied to:** `.date-picker`, `.range-picker` root elements.

Shadow does not change in dark mode (design decision — single shadow token value).

---

## 15. Border / Stroke Overlay

The 1px outer border is rendered via `::after` pseudo-element on `.date-picker` and `.range-picker`, **not** via `border` or `inset box-shadow`.

```css
.date-picker::after,
.range-picker::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid var(--date-picker-border-default);
  border-radius: inherit;
  box-sizing: border-box;
  pointer-events: none;
  z-index: 1;
}
```

**Why not `inset box-shadow`:** The root has `overflow: hidden` and direct children apply `background: var(--date-picker-surface-bg)` on all 4 edges, which would obscure an inset shadow.

**Constraints (DT-D4.12 mutation boundary):**
- Do not retain both the inset-shadow stroke and the pseudo-element stroke.
- The overlay must not affect layout dimensions.
- The overlay must not block pointer interaction (`pointer-events: none`).
- The overlay must not cover focus-visible rings (focus rings have higher z-order).
- Do not darken or replace `--date-picker-border-default`.
- Do not add a raw hex color.

---

## 16. Dark Mode

Dark mode is applied by setting `data-theme="dark"` on `document.documentElement` (or any ancestor). The component does not manage theme state internally.

```jsx
// Host app — toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark');
```

All 15 `date-picker/*` tokens resolve to dark values automatically via `[data-theme="dark"]` overrides in `tokens.css`. Two tokens require explicit primitive overrides:

- `--date-picker-text-active` → `var(--prim-slate-900)` = `#1b1c22`
- `--date-picker-range-bg-selected` → `var(--prim-brand-stpatrick-900)` = `#0f0c24`

---

## 17. Storybook Hierarchy

**Titles:**
- `Components/Date Picker/Overview` — `DatePicker.stories.jsx`
- `Components/Date Picker/Validation` — `DatePicker.validation.stories.jsx`

**storySort in `.storybook/preview.js`:**
```js
'Date Picker',
[
  'Overview',
  ['Playground', 'Date Picker', 'Range Picker', 'Disabled', 'Without Footer', 'Dark Theme'],
  'Validation',
  '*',
],
```

**Overview stories (6):**
1. `Playground` — interactive pickerType control (toggle between DatePicker and RangePicker)
2. `Date Picker` — static showcase (DatePicker, showFooter=true)
3. `Range Picker` — static showcase (RangePicker, showFooter=true)
4. `Disabled` — both pickers with disabled=true
5. `Without Footer` — both pickers with showFooter=false
6. `Dark Theme` — both pickers with data-theme="dark"

**Validation stories (20):** DefaultDP, DefaultRP, FooterHidden, TimeFilterHidden, ControlledDP, ControlledRP, MarkedDates, DisabledDates, MinMaxDate, GlobalDisabled, AllTimePreset, ApplyCancelDraft, FiveWeekMonth, SixWeekMonth, LightTheme, DarkTheme, LongLocaleLabels, KeyboardValidation, FocusVisibleValidation, + placeholder.

---

## 18. File Inventory

All files in `src/components/date-picker/`:

| File | Size | Purpose |
|---|---|---|
| `CalendarFooter.jsx` | 4 KB | Cancel/Apply footer bar |
| `CalendarGrid.jsx` | 13 KB | Grid with keyboard nav (roving tabindex) |
| `CalendarHeader.jsx` | 3 KB | Month/year header + prev/next nav |
| `CalendarPanel.jsx` | 4 KB | Month container (passes disabled flag) |
| `DatePicker.css` | 26 KB | All CSS — tokens, geometry, states, dark mode |
| `DatePicker.jsx` | 7 KB | Single-date picker main component |
| `DatePicker.stories.jsx` | 39 KB | Overview stories + full documentation |
| `DatePicker.validation.stories.jsx` | 21 KB | 20 validation stories for engineering QA |
| `DayCell.jsx` | 6 KB | Day cell with all visual/interactive states |
| `PeriodRange.jsx` | 1 KB | Period-range option row (TimeFilter) |
| `RangePicker.jsx` | 20 KB | Date-range picker main component |
| `TimeFilter.jsx` | 2 KB | Preset period selector (RP left panel) |
| `WeekdayLabels.jsx` | 1 KB | Weekday header row (Mon–Sun) |
| `dateUtils.js` | 11 KB | Date arithmetic (no external date library) |
| `index.js` | 302 B | Barrel: exports DatePicker + RangePicker |
| `date-picker-spec.md` | — | This file |
| `__tests__/date-picker-validate.js` | 51 KB | Validation script |

---

## 19. Import / Export

**Barrel import (recommended):**
```js
import { DatePicker, RangePicker } from '@/components/date-picker';
// or
import { DatePicker, RangePicker } from '../../components/date-picker';
```

**index.js:**
```js
export { default as DatePicker }  from "./DatePicker.jsx";
export { default as RangePicker } from "./RangePicker.jsx";
```

No circular imports exist between DatePicker.jsx and RangePicker.jsx.

---

## 20. Dependencies

**Internal (repo):**
- `Button` / `CompactButton` — used in `CalendarFooter.jsx` for Cancel/Apply buttons
- `src/design-tokens/tokens.css` — 15 L3 `date-picker/*` vars + radius + shadow tokens

**External:**
- `react` — `useState`, `useCallback`, `useEffect`, `forwardRef`
- **No external date library** — all date arithmetic in `dateUtils.js`

---

## 21. DateUtils Functions

`dateUtils.js` exports (no external date library):

| Function | Signature | Purpose |
|---|---|---|
| `startOfDay` | `(date: Date) => Date` | Strip time, midnight |
| `isSameDay` | `(a, b) => boolean` | Date equality |
| `addMonths` | `(date, delta) => Date` | Month navigation |
| `isBefore` | `(a, b) => boolean` | Date comparison |
| `resolvePeriodRange` | `(value, options) => {start, end}` | Preset → date range |
| `DEFAULT_PERIOD_RANGES` | `Array<{label, value}>` | Built-in period presets |
| `normalizeRange` | `({start, end}) => {start, end}` | Swap if end < start |

---

## 22. Known Design Notes

The following are intentional design decisions preserved from Figma. Do not "correct" these:

| ID | Note |
|---|---|
| SM-05 | Date Picker `Hover` state uses same bg as `Default+Hover` — not a bug |
| SM-06 | Range picker `/Range/Default` text uses `surface/bg-active` token as text fill — semantic mismatch preserved from Figma |
| O-05 | RangePicker footer padding-left is 24px (not 16px) — Figma spec asymmetry |
| O-06 | TimeFilter padding-bottom is 2px (not 20px) — Figma spec asymmetry |
| O-09 | Period-range item padding is 12px left, 8px right — asymmetric by Figma design |
| A3.5.5 | Several semantic mismatches in Figma are preserved verbatim in code |

---

## 23. Deferred / L3-Defined-Unbound Variables

Two tokens in the 15-var set are **L3-DEFINED-UNBOUND** in Figma: defined in the variable collection but not currently bound to any node. They are present in `tokens.json` and `tokens.css` for future use:

- `--date-picker-border-disabled` — border color for disabled state outlines
- `--date-picker-range-bg-hover` — hover background for in-range cells (RangePicker)

---

## 24. Git Boundary / Mutation Constraints (DT-D4.12)

**Allowed mutations:**
- `src/components/date-picker/**` — all files in this directory
- `.storybook/preview.js` — Date Picker storySort ordering only
- Single DT-D4 final reconciliation report at repo root

**Prohibited mutations:**
- `src/design-tokens/tokens.json` — unless live-proven parity failure
- `src/design-tokens/tokens.css` — unless live-proven parity failure
- Button Group, Button Special, shared Button, shared CompactButton implementations
- Unrelated component stories
- Figma master components
- Global/shared semantic tokens

**Operating constraints (always active):**
- Do NOT modify `tokens.json` or `tokens.css` without proven parity failure
- Do NOT install a date library
- Do NOT create placeholder files
- Do NOT copy shared component CSS into Date Picker
- Do NOT hardcode color, radius, typography, shadow, or focus values already represented by tokens
- Do not alter date logic, controlled/draft behavior, keyboard behavior
- Do not retain both inset-shadow stroke and pseudo-element stroke
- Do not darken or replace `--date-picker-border-default`
- Do not add a raw hex color
- The overlay must not affect layout dimensions, block pointer interaction, or cover focus-visible rings

---

## Revision History

| Phase | Date | Description |
|---|---|---|
| DT-D1.1 | 2026-11-04 | Token sync — 15 L3 `date-picker/*` variables in tokens.json + tokens.css |
| DT-D2.0 | 2026-11-04 | Initial implementation — all source files written |
| DT-D2.1 | 2026-11-04 | C1–C6 source corrections |
| DT-D2.2 | 2026-11-04 | C1–C9 corrections (commit semantics, controlled state, CalendarFooter) |
| DT-D2-A.1 | 2026-11-05 | Header/footer geometry corrections (padding, divider) |
| DT-D2-A.2 | 2026-11-05 | Root stroke — replaced inset shadow with `::after` overlay |
| DT-D3.0 | 2026-11-06 | Storybook: DatePicker.stories.jsx (Overview + Playground) |
| DT-D3.1 | 2026-11-06 | API patch: restored `onApply` per-entry labeled callbacks, fixed Playground description, reverted ButtonGroup mutation |
| DT-D4 | 2026-11-11 | Final source reconciliation — spec written, stale token table corrected, build gates passed |
