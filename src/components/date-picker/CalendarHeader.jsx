import React from "react";
import CompactButton from "../compact-button/CompactButton.jsx";
import ArrowLeftSLine from "../../icons/ArrowLeftSLine.jsx";
import ArrowRightSLine from "../../icons/ArrowRightSLine.jsx";
import { formatMonthYear } from "./dateUtils.js";

/**
 * CalendarHeader — month / year header with prev and next navigation
 * Maps to Figma ↳date-selector COMPONENT_SET (node 2397:2083), 4 variants:
 *   Left Icon Off/Off · Left On/Off · Left Off/On · Left On/On
 *
 * Figma geometry: 288px base → placed at 328px via FILL (panel 328px wide)
 * Container fill: surface/bg-hover (#F6F7F8) — applies to all 4 variants (O-10)
 * Text fill:      text/default (#7B7B7B)
 * cr:             8px (remote 34e691fc…/2839:30, local --radius-8)
 * Nav buttons:    CompactButton variant="white" size="large" (24×24, White/Default/Large 24)
 *                 Confirmed from Figma gate: ↳button-compact, White, Large 24 (DT-D2.0 §5)
 *
 * @param {Date}     viewDate        The month currently in view
 * @param {string}  [locale]         Intl locale (default 'en-US')
 * @param {boolean} [showPrev=true]  Show previous-month CompactButton
 * @param {boolean} [showNext=true]  Show next-month CompactButton
 * @param {boolean} [disablePrev]    Disable prev nav (minDate boundary)
 * @param {boolean} [disableNext]    Disable next nav (maxDate boundary)
 * @param {()=>void} [onPrev]        Callback: navigate to previous month
 * @param {()=>void} [onNext]        Callback: navigate to next month
 * @param {string}  [headingId]      id applied to heading span for aria-labelledby
 */
export default function CalendarHeader({
  viewDate,
  locale = "en-US",
  showPrev = true,
  showNext = true,
  disablePrev = false,
  disableNext = false,
  onPrev,
  onNext,
  headingId,
}) {
  const label = formatMonthYear(viewDate, locale);

  return (
    <div className="calendar-header" role="presentation">
      {/* Left nav — arrow-left-s-line icon in CompactButton white/large */}
      <div className="calendar-header__nav">
        {showPrev ? (
          <CompactButton
            icon={<ArrowLeftSLine />}
            variant="white"
            size="large"
            aria-label="Previous month"
            disabled={disablePrev}
            onClick={onPrev}
          />
        ) : (
          /* Spacer to maintain consistent header width when icon is hidden */
          <span style={{ display: "inline-block", width: 24, height: 24 }} aria-hidden="true" />
        )}
      </div>

      {/* Month / Year heading — aria-live="polite" for screen reader announcements */}
      <span
        id={headingId}
        className="calendar-header__label"
        role="heading"
        aria-level={2}
        aria-live="polite"
      >
        {label}
      </span>

      {/* Right nav — arrow-right-s-line icon in CompactButton white/large */}
      <div className="calendar-header__nav">
        {showNext ? (
          <CompactButton
            icon={<ArrowRightSLine />}
            variant="white"
            size="large"
            aria-label="Next month"
            disabled={disableNext}
            onClick={onNext}
          />
        ) : (
          <span style={{ display: "inline-block", width: 24, height: 24 }} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
