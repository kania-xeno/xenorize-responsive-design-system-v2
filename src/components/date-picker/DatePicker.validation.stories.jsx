/**
 * DatePicker.validation.stories.jsx — DT-D2-A Validation Harness
 *
 * Temporary story file for Phase C visual match + Phase D browser interaction.
 * 20 stories covering all DT-D2-A test scenarios.
 *
 * Reference: component-date-picker-dt-d2-runtime-implementation.md
 * Figma: Design System Scalable - All Platform-V.2.1.0 › ❖ Date Picker
 *   Component set 2397:2096, DP variant 2397:2097, RP variant 2397:2151
 *
 * DO NOT use in production storySort — this is a validation harness only.
 */

import React, { useState } from "react";
import DatePicker from "./DatePicker.jsx";
import RangePicker from "./RangePicker.jsx";

// ── Shared reference dates ────────────────────────────────────────────────────
// Dec 2023 (5-week month) — Figma specimen month
const DEC_2023 = new Date(2023, 11, 1);
// Oct 2023 (6-week month) — Oct 1 is Sunday → 6 rows with Mon-first
const OCT_2023 = new Date(2023, 9, 1);
// Nov 2024 (5-week month) — Nov 1 is Friday → 5 rows with Mon-first
const NOV_2024 = new Date(2024, 10, 1);
// Jan 2024 (edge — after Dec 2023 overflow)
const JAN_2024 = new Date(2024, 0, 1);

const MARKED = [
  new Date(2023, 11, 5),
  new Date(2023, 11, 12),
  new Date(2023, 11, 20),
];
const DISABLED_DATES = [
  new Date(2023, 11, 10),
  new Date(2023, 11, 15),
  new Date(2023, 11, 25),
];

// ── Meta ──────────────────────────────────────────────────────────────────────
export default {
  title: "Components/Date Picker/Validation",
  parameters: {
    docs: {
      description: {
        component: `
**DT-D2-A Validation Harness** — 20 stories for live Figma visual match and real browser interaction testing.

Figma source: \`Design System Scalable - All Platform-V.2.1.0\` › \`❖ Date Picker\`
- Component set: \`2397:2096\`
- Date Picker: \`2397:2097\`
- Range Picker: \`2397:2151\`
        `,
      },
    },
    layout: "centered",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 01 — Default DP
// Figma: Type=Date Picker, default state, Dec 2023 view, no selection
// ─────────────────────────────────────────────────────────────────────────────
export const DefaultDP = {
  name: "01 — Default Date Picker",
  render: () => (
    <DatePicker
      defaultViewDate={DEC_2023}
      showFooter={false}
      aria-label="Default date picker"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 02 — Default RP
// Figma: Type=Range Picker, Dec 2023 / Jan 2024, range Dec 18–Jan 7 selected
// ─────────────────────────────────────────────────────────────────────────────
export const DefaultRP = {
  name: "02 — Default Range Picker",
  render: () => (
    <RangePicker
      defaultViewDate={DEC_2023}
      defaultRangeValue={{
        start: new Date(2023, 11, 18),
        end:   new Date(2024, 0, 7),
      }}
      aria-label="Default range picker"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 03 — Footer Hidden (no-footer mode)
// Figma: 👞 Footer OFF → selection commits on second click, no Apply/Cancel
// ─────────────────────────────────────────────────────────────────────────────
export const FooterHidden = {
  name: "03 — Footer Hidden",
  render: () => {
    const [range, setRange] = useState(null);
    return (
      <div>
        <RangePicker
          defaultViewDate={DEC_2023}
          showFooter={false}
          onRangeChange={setRange}
          aria-label="Range picker without footer"
        />
        <p style={{ fontSize: 12, color: "var(--color-text-neutral-muted, #888)", marginTop: 8, textAlign: "center" }}>
          {range ? `Selected: ${range.start?.toDateString()} – ${range.end?.toDateString()}` : "No selection yet"}
        </p>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 04 — Time Filter Hidden
// Figma: ⏳ Time Filter OFF → no sidebar, 936px collapses to 736px
// ─────────────────────────────────────────────────────────────────────────────
export const TimeFilterHidden = {
  name: "04 — Time Filter Hidden",
  render: () => (
    <RangePicker
      defaultViewDate={DEC_2023}
      showTimeFilter={false}
      aria-label="Range picker without time filter"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 05 — Controlled DP
// Controlled value = Dec 20, 2023. Clicking changes are reflected externally.
// ─────────────────────────────────────────────────────────────────────────────
export const ControlledDP = {
  name: "05 — Controlled Date Picker",
  render: () => {
    const [date, setDate] = useState(new Date(2023, 11, 20));
    return (
      <div>
        <DatePicker
          value={date}
          defaultViewDate={DEC_2023}
          showFooter={false}
          onChange={setDate}
          aria-label="Controlled date picker"
        />
        <p style={{ fontSize: 12, color: "var(--color-text-neutral-muted, #888)", marginTop: 8, textAlign: "center" }}>
          Controlled: {date?.toDateString() ?? "null"}
        </p>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 06 — Controlled RP
// Controlled rangeValue synced from parent.
// ─────────────────────────────────────────────────────────────────────────────
export const ControlledRP = {
  name: "06 — Controlled Range Picker",
  render: () => {
    const [range, setRange] = useState({ start: new Date(2023, 11, 18), end: new Date(2024, 0, 7) });
    return (
      <div>
        <RangePicker
          rangeValue={range}
          defaultViewDate={DEC_2023}
          onRangeChange={setRange}
          aria-label="Controlled range picker"
        />
        <p style={{ fontSize: 12, color: "var(--color-text-neutral-muted, #888)", marginTop: 8, textAlign: "center" }}>
          {range.start ? `${range.start.toDateString()} – ${range.end?.toDateString()}` : "Uncommitted"}
        </p>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 07 — Marked Dates
// Figma: Basic/Default+Marked — 3×3px dot 6px from bottom
// ─────────────────────────────────────────────────────────────────────────────
export const MarkedDates = {
  name: "07 — Marked Dates",
  render: () => (
    <DatePicker
      defaultViewDate={DEC_2023}
      markedDates={MARKED}
      showFooter={false}
      aria-label="Date picker with marked dates"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 08 — Disabled Dates
// Figma: Basic/Disabled — specific dates individually disabled
// ─────────────────────────────────────────────────────────────────────────────
export const DisabledDates = {
  name: "08 — Disabled Dates",
  render: () => (
    <DatePicker
      defaultViewDate={DEC_2023}
      disabledDates={DISABLED_DATES}
      showFooter={false}
      aria-label="Date picker with disabled dates"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 09 — minDate / maxDate
// Only Dec 10–20 selectable. All others disabled by range constraint.
// ─────────────────────────────────────────────────────────────────────────────
export const MinMaxDate = {
  name: "09 — minDate / maxDate",
  render: () => (
    <DatePicker
      defaultViewDate={DEC_2023}
      minDate={new Date(2023, 11, 10)}
      maxDate={new Date(2023, 11, 20)}
      showFooter={false}
      aria-label="Date picker with min and max date"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 10 — Global Disabled
// All cells disabled (tabIndex=-1, aria-disabled=true, no interaction)
// A1 DT-D2-A: isDisabled={disabled || cell.isDisabled} validates here
// ─────────────────────────────────────────────────────────────────────────────
export const GlobalDisabled = {
  name: "10 — Global Disabled",
  render: () => (
    <DatePicker
      defaultViewDate={DEC_2023}
      defaultValue={new Date(2023, 11, 20)}
      showFooter={true}
      disabled={true}
      aria-label="Globally disabled date picker"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 11 — All Time Preset
// RP with "all-time" preset staged. Apply should be enabled. Range label "All time".
// C2 DT-D2.2.3: draftPresetSelected=true; footerRangeLabel override
// ─────────────────────────────────────────────────────────────────────────────
export const AllTimePreset = {
  name: "11 — All Time Preset",
  render: () => (
    <RangePicker
      defaultViewDate={DEC_2023}
      aria-label="Range picker with All Time preset"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 12 — Apply / Cancel Draft
// RP with footer. Test draft staging → Apply commits; Cancel restores.
// ─────────────────────────────────────────────────────────────────────────────
export const ApplyCancelDraft = {
  name: "12 — Apply / Cancel Draft",
  render: () => {
    const [committed, setCommitted] = useState(null);
    const [log, setLog] = useState([]);
    const addLog = (msg) => setLog((l) => [...l.slice(-4), msg]);
    return (
      <div>
        <RangePicker
          defaultViewDate={DEC_2023}
          onRangeChange={(r) => { setCommitted(r); addLog(`Apply: ${r.start?.toDateString()} – ${r.end?.toDateString()}`); }}
          onCancel={() => addLog("Cancel")}
          aria-label="Range picker Apply/Cancel test"
        />
        <div style={{ fontSize: 11, color: "var(--color-text-neutral-muted, #888)", marginTop: 8, maxWidth: 936 }}>
          {log.map((m, i) => <div key={i}>{m}</div>)}
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 13 — 5-Week Month
// December 2023 — 5 rows (Mon Nov 27 – Sun Dec 31 + overflow)
// ─────────────────────────────────────────────────────────────────────────────
export const FiveWeekMonth = {
  name: "13 — 5-Week Month (Dec 2023)",
  render: () => (
    <DatePicker
      defaultViewDate={DEC_2023}
      showFooter={false}
      aria-label="5-week month December 2023"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 14 — 6-Week Month
// October 2023 — 6 rows (Mon Sep 25 – Sun Nov 5)
// ─────────────────────────────────────────────────────────────────────────────
export const SixWeekMonth = {
  name: "14 — 6-Week Month (Oct 2023)",
  render: () => (
    <DatePicker
      defaultViewDate={OCT_2023}
      showFooter={false}
      aria-label="6-week month October 2023"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 15 — Light Theme
// Explicit light — tokens.css :root values
// ─────────────────────────────────────────────────────────────────────────────
export const LightTheme = {
  name: "15 — Light Theme",
  parameters: { globals: { theme: "light" } },
  render: () => (
    <DatePicker
      defaultViewDate={DEC_2023}
      defaultValue={new Date(2023, 11, 20)}
      showFooter={false}
      aria-label="Light theme date picker"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 16 — Dark Theme
// tokens.css [data-theme="dark"] overrides on all L2 tokens
// ─────────────────────────────────────────────────────────────────────────────
export const DarkTheme = {
  name: "16 — Dark Theme",
  parameters: { globals: { theme: "dark" } },
  render: () => (
    <RangePicker
      defaultViewDate={DEC_2023}
      defaultRangeValue={{
        start: new Date(2023, 11, 18),
        end:   new Date(2024, 0, 7),
      }}
      aria-label="Dark theme range picker"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 17 — Long Locale Labels (fr-FR)
// Weekday and month labels in French — test overflow/truncation
// ─────────────────────────────────────────────────────────────────────────────
export const LongLocaleLabels = {
  name: "17 — Long Locale Labels (fr-FR)",
  render: () => (
    <DatePicker
      defaultViewDate={DEC_2023}
      locale="fr-FR"
      showFooter={false}
      aria-label="Sélecteur de date fr-FR"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 18 — Keyboard Validation
// DP for Phase D keyboard testing (Tab, Arrow, Home/End, PageUp/PageDown,
// Enter/Space, global-disabled block).
// No pre-selection — roving tabIndex starts at first enabled cell.
// ─────────────────────────────────────────────────────────────────────────────
export const KeyboardValidation = {
  name: "18 — Keyboard Validation",
  render: () => {
    const [date, setDate] = useState(null);
    const [log, setLog] = useState([]);
    return (
      <div>
        <DatePicker
          defaultViewDate={DEC_2023}
          showFooter={false}
          onChange={(d) => { setDate(d); setLog((l) => [...l.slice(-6), `Selected: ${d?.toDateString()}`]); }}
          aria-label="Keyboard validation date picker"
        />
        <div style={{ fontSize: 11, color: "var(--color-text-neutral-muted, #888)", marginTop: 8, textAlign: "center" }}>
          {date ? date.toDateString() : "No selection"}
        </div>
        <div style={{ fontSize: 10, color: "var(--color-text-neutral-subtle, #aaa)", marginTop: 4, textAlign: "center" }}>
          {log.map((m, i) => <div key={i}>{m}</div>)}
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 19 — Focus-Visible Validation
// DP with one pre-disabled date to verify focus-visible ring on enabled cells
// and that disabled cells do NOT show a focus ring.
// ─────────────────────────────────────────────────────────────────────────────
export const FocusVisibleValidation = {
  name: "19 — Focus-Visible Validation",
  render: () => (
    <DatePicker
      defaultViewDate={DEC_2023}
      disabledDates={[new Date(2023, 11, 1)]}
      showFooter={false}
      aria-label="Focus-visible validation date picker"
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 20 — Edge-Month Navigation
// Starts at January 2024 — test PageUp to December 2023 (31→31 same day),
// then PageDown back. Verify Jan 31 → Feb 28 clamp.
// ─────────────────────────────────────────────────────────────────────────────
export const EdgeMonthNavigation = {
  name: "20 — Edge-Month Navigation (Jan 2024)",
  render: () => (
    <DatePicker
      defaultViewDate={JAN_2024}
      showFooter={false}
      aria-label="Edge month navigation date picker"
    />
  ),
};
