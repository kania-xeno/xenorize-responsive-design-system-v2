import React from "react";
import Button from "../button/Button.jsx";
import { formatRangeDate } from "./dateUtils.js";

/**
 * CalendarFooter — Cancel and Apply buttons, plus optional range summary label
 * Maps to Figma "Footer Actions" frames:
 *   DP: node 2397:2148 — 368×68 · pad:16 all · gap:16 · 2×160px buttons
 *   RP: node 2397:2263 — 736×68 · padT:16 padB:16 padL:24 padR:16 · gap:16 (O-05)
 *       + TEXT range-label node 2397:2264 · 448×20 FILL
 *
 * Both buttons use ↳buttons-medium (Primary/Filled) — matching Figma
 * Footer buttons: `type="primary" variant="filled" size="medium"`
 * DP button size: 160px (flex:1); RP button size: 108px (fixed width, no flex:1)
 *
 * When hidden: show=false → returns null (conditional rendering — no DOM node emitted,
 *   so the border-top separator also disappears with the footer; no residual 1px line)
 *
 * @param {boolean}   [show=true]       Visibility — maps to Figma 👞 Footer BOOLEAN
 * @param {boolean}   [isRange=false]   Range Picker mode — shows range label, 108px buttons
 * @param {Date|null} [rangeStart]      For range summary label
 * @param {Date|null} [rangeEnd]        For range summary label
 * @param {string}   [locale='en-US']
 * @param {boolean}  [disabled=false]   Disables the Apply button only. Cancel is ALWAYS enabled
 *                                       and available as a dismissal action even when disabled=true.
 *                                       (C3 DT-D2.2.3: CalendarFooter Cancel has no disabled prop)
 * @param {string|null} [rangeLabel]     Optional override for the auto-computed range label text.
 *                                       Used to display preset names (e.g. "All time") when the
 *                                       resolved range is null/null. Pass null to auto-compute.
 * @param {() => void} [onCancel]
 * @param {() => void} [onApply]
 */
export default function CalendarFooter({
  show = true,
  isRange = false,
  rangeStart = null,
  rangeEnd = null,
  locale = "en-US",
  disabled = false,
  rangeLabel = null,
  onCancel,
  onApply,
}) {
  // DT-D2-A.1: Conditional rendering — when show=false, return null so the footer
  // element and its border-top separator are both absent from the DOM.
  // This eliminates the residual 1px divider line that appeared when show=false
  // with the previous display:none approach.
  if (!show) return null;

  // Build range summary label text (A3.4.3, A3.6.2)
  // Format: "Range: Dec 18, 2023 - Jan 07, 2024"
  // Segment 0: "Range: " (Regular 400, text/range-label)
  // Segment 1: date range value (SemiBold 600, text/range-value)
  // C1 DT-D2.2.3: rangeLabel prop overrides auto-computation when provided (non-null).
  // Used by RangePicker to display preset names (e.g. "All time") for null/null ranges.
  const rangeLabelValue = (() => {
    if (rangeLabel !== null) return rangeLabel;
    if (!rangeStart && !rangeEnd) return "";
    if (rangeStart && !rangeEnd) return formatRangeDate(rangeStart, locale);
    if (!rangeStart && rangeEnd) return formatRangeDate(rangeEnd, locale);
    return `${formatRangeDate(rangeStart, locale)} - ${formatRangeDate(rangeEnd, locale)}`;
  })();

  return (
    <div className="calendar-footer">
      {/* Range summary label (RP only) — two-segment text */}
      {isRange && (
        <div className="calendar-footer__range-label" aria-live="polite">
          <span className="calendar-footer__range-label-prefix">Range: </span>
          <span className="calendar-footer__range-label-value">
            {rangeLabelValue || " "}
          </span>
        </div>
      )}

      {/* Cancel button */}
      <Button
        type="neutral"
        variant="outline"
        size="medium"
        onClick={onCancel}
      >
        Cancel
      </Button>

      {/* Apply button */}
      <Button
        type="primary"
        variant="filled"
        size="medium"
        disabled={disabled}
        onClick={onApply}
      >
        Apply
      </Button>
    </div>
  );
}
