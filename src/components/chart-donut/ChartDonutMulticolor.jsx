import React from 'react';
import Tooltip from '../tooltip/Tooltip';
import './ChartDonut.css';

/**
 * ChartDonutMulticolor — ↳chart-donut-multicolor
 * Figma node set: 2365:5839
 * Design System Scalable V.2.1.0 · Page: ❖ Chart
 *
 * Arc geometry confirmed from Figma Plugin API + fillGeometry (2026-07-14):
 *   • type:          ELLIPSE (filled paths, NOT stroked circles)
 *   • innerRadius:   0.52 (arcData.innerRadius)
 *   • cornerRadius:  8px fixed, all sizes → DS primitive token "number/size-8"
 *   • strokeCap:     NONE  →  stroke-linecap="round" is WRONG; use filled path + corner arcs
 *   • gap:           0.04 rad (~2.29°) between adjacent slices
 *   • single slice:  full 360° circle (arcData = full circle, no gap, no corners)
 *
 * End-face geometry (from fillGeometry analysis):
 *   Each face is a radial line between pt(outerR-cr, angle) and pt(innerR+cr, angle).
 *   Outer corner: dao = asin(cr / (outerR-cr)), tangent internally to outer arc.
 *   Inner corner: dai = asin(cr / innerR), matches Figma's bezier transition point.
 *
 * C2 — Dynamic per-slice Tooltip (designer-approved):
 *   Each slice opens its own Tooltip on pointer hover and keyboard focus.
 *   `showTooltip` is an enable/disable flag (not a permanent open state).
 *   Tooltip placement is computed from each slice's radial midpoint angle.
 *   Content format: `${label} · ${percentage}%`
 *   Visual: size="xs", appearance="light", showTail={true}.
 *   Only one Tooltip is open at a time — each slice owns its own Floating UI instance.
 *
 * Interaction contract:
 *   Hover → opens after 300 ms (default openDelay). Mouse-leave → closes immediately.
 *   Keyboard focus (Tab) → opens immediately. Blur / Escape → closes.
 *   Touch → tap-to-open, second tap / outside tap / scroll → closes.
 *   No desktop click required.
 *
 * Data API (C2):
 *   data={null}                          — equal distribution, labels "Series 1" … "Series N"
 *   data={[40, 25, 20, 15]}              — legacy number[] (backwards compat), fallback labels
 *   data={[{label:'A',value:40}, ...]}   — full C2 format; count inferred from data.length
 *   Zero/invalid values are silently skipped (no arc rendered, no tab stop).
 *
 * Accessibility:
 *   SVG role="img" with aria-label summary.
 *   Each path role="img" aria-label="${label}: ${pct}" for AT announcement.
 *   tabIndex={0} on every slice when showTooltip=true; tabIndex={-1} when disabled.
 *   Tooltip aria-describedby lifecycle managed by the production Tooltip component.
 *
 * @deprecated tooltipLabel — unused in C2. Supply per-slice labels via data[].label.
 */

// ── Arc constants (confirmed from Figma Plugin API) ───────────────────────────

const INNER_RADIUS_RATIO = 0.52;   // arcData.innerRadius = 0.5199999809…
const SLICE_GAP_RAD     = 0.04;    // gap between adjacent slices (measured from arcData)
const CORNER_RADIUS     = 8;       // cornerRadius = 8 → DS token "number/size-8"
const TWO_PI            = Math.PI * 2;

// ── Polar → Cartesian ─────────────────────────────────────────────────────────

function p2c(cx, cy, r, angle) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

// ── Rounded arc path ──────────────────────────────────────────────────────────
//
// Matches Figma's ELLIPSE cornerRadius=8, verified against fillGeometry (2026-07-14).
//
// Each slice end-face is a RADIAL LINE from pt(outerR-cr, angle) to pt(innerR+cr, angle).
// Two small corner arcs (radius=cr) connect the face to the outer/inner main arcs:
//
//   Outer corner (CW):  arc from pt(outerR-cr, faceA) → pt(outerR, faceA±dao)
//                       dao = asin(cr / (outerR - cr))  [internal tangency to outer arc]
//
//   Inner corner (CCW): arc from pt(innerR, faceA±dai) → pt(innerR+cr, faceA)
//                       dai = asin(cr / innerR)          [matches Figma bezier transition]
//
// Path order (CW outer, CCW inner):
//   M outerFaceS → [A corner CW] → outerArcS → [A outer CW] → outerArcE
//   → [A corner CW] → outerFaceE → L innerFaceE
//   → [A corner CCW] → innerArcE → [A inner CCW] → innerArcS
//   → [A corner CCW] → innerFaceS → Z
//
// Falls back to flat ends when span < 2·dai (inner corner is the binding constraint).

function roundedArcPath(cx, cy, outerR, innerR, startA, endA, cr) {
  const span = endA - startA;

  const dao = Math.asin(Math.min(cr / (outerR - cr), 1));
  const dai = Math.asin(Math.min(cr / innerR, 1));

  if (span <= 2 * dai + 0.001) {
    return flatArcPath(cx, cy, outerR, innerR, startA, endA);
  }

  function pt(r, a) { return p2c(cx, cy, r, a); }
  const f = (n) => n.toFixed(4);

  const outerFaceS = pt(outerR - cr, startA);
  const outerFaceE = pt(outerR - cr, endA);
  const innerFaceS = pt(innerR + cr, startA);
  const innerFaceE = pt(innerR + cr, endA);

  const outerArcS = pt(outerR, startA + dao);
  const outerArcE = pt(outerR, endA   - dao);
  const innerArcS = pt(innerR, startA + dai);
  const innerArcE = pt(innerR, endA   - dai);

  const largeOuter = (span - 2 * dao) > Math.PI ? 1 : 0;
  const largeInner = (span - 2 * dai) > Math.PI ? 1 : 0;

  return [
    `M ${f(outerFaceS.x)} ${f(outerFaceS.y)}`,
    `A ${cr} ${cr} 0 0 1 ${f(outerArcS.x)} ${f(outerArcS.y)}`,
    `A ${outerR} ${outerR} 0 ${largeOuter} 1 ${f(outerArcE.x)} ${f(outerArcE.y)}`,
    `A ${cr} ${cr} 0 0 1 ${f(outerFaceE.x)} ${f(outerFaceE.y)}`,
    `L ${f(innerFaceE.x)} ${f(innerFaceE.y)}`,
    `A ${cr} ${cr} 0 0 1 ${f(innerArcE.x)} ${f(innerArcE.y)}`,
    `A ${innerR} ${innerR} 0 ${largeInner} 0 ${f(innerArcS.x)} ${f(innerArcS.y)}`,
    `A ${cr} ${cr} 0 0 1 ${f(innerFaceS.x)} ${f(innerFaceS.y)}`,
    'Z',
  ].join(' ');
}

// Flat-end fallback for degenerate (very short) arcs
function flatArcPath(cx, cy, outerR, innerR, startA, endA) {
  function pt(r, a) { return p2c(cx, cy, r, a); }
  const large = endA - startA > Math.PI ? 1 : 0;
  const o1 = pt(outerR, startA), o2 = pt(outerR, endA);
  const i1 = pt(innerR, endA),   i2 = pt(innerR, startA);
  const f = (n) => n.toFixed(4);
  return [
    `M ${f(o1.x)} ${f(o1.y)}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${f(o2.x)} ${f(o2.y)}`,
    `L ${f(i1.x)} ${f(i1.y)}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${f(i2.x)} ${f(i2.y)}`,
    'Z',
  ].join(' ');
}

// Full 360° donut ring (single-slice or empty state)
function fullRingPath(cx, cy, outerR, innerR) {
  const f = (n) => n.toFixed(4);
  return [
    `M ${f(cx + outerR)} ${f(cy)}`,
    `A ${outerR} ${outerR} 0 1 1 ${f(cx - outerR)} ${f(cy)}`,
    `A ${outerR} ${outerR} 0 1 1 ${f(cx + outerR)} ${f(cy)}`,
    `M ${f(cx + innerR)} ${f(cy)}`,
    `A ${innerR} ${innerR} 0 1 1 ${f(cx - innerR)} ${f(cy)}`,
    `A ${innerR} ${innerR} 0 1 1 ${f(cx + innerR)} ${f(cy)}`,
    'Z',
  ].join(' ');
}

// ── Arc computation ───────────────────────────────────────────────────────────

function computeArcs(data, total) {
  const count = data.length;
  if (count === 1) {
    return [{ start: -Math.PI / 2, end: 3 * Math.PI / 2, full: true }];
  }
  const usableAngle = TWO_PI - count * SLICE_GAP_RAD;
  let cursor = -Math.PI / 2;
  return data.map((value) => {
    const span  = (value / total) * usableAngle;
    const start = cursor + SLICE_GAP_RAD / 2;
    const end   = start + span;
    cursor += span + SLICE_GAP_RAD;
    return { start, end, full: false };
  });
}

// ── Size config ───────────────────────────────────────────────────────────────

const SIZE_MAP = {
  s:  { dim: 120 },
  m:  { dim: 180 },
  l:  { dim: 240 },
  xl: { dim: 300 },
};

// ── Series color tokens ───────────────────────────────────────────────────────

const SERIES_COLORS = [
  'var(--chart-series-1-default)',
  'var(--chart-series-2-default)',
  'var(--chart-series-3-default)',
  'var(--chart-series-4-default)',
  'var(--chart-series-5-default)',
  'var(--chart-series-6-default)',
  'var(--chart-series-7-default)',
  'var(--chart-series-8-default)',
];

// ── C2 utilities ─────────────────────────────────────────────────────────────

/**
 * Maps a slice midpoint angle to a Tooltip placement direction.
 * 8 compass sectors of 22.5° each, centered on the 8 compass points.
 * Angle convention: -π/2 = 12 o'clock (top), clockwise = positive.
 *
 * Expected results for 4 equal slices (starting at top, clockwise):
 *   upper-right (mid ≈ -45°) → 'top-end'
 *   lower-right (mid ≈ +45°) → 'bottom-end'
 *   lower-left  (mid ≈ +135°) → 'bottom-start'
 *   upper-left  (mid ≈ -135°) → 'top-start'
 */
function getSlicePlacement(midAngle) {
  const deg = (midAngle * 180) / Math.PI;
  if (deg >= -157.5 && deg < -112.5) return 'top-start';  // NW
  if (deg >= -112.5 && deg < -67.5)  return 'top';         // N
  if (deg >= -67.5  && deg < -22.5)  return 'top-end';     // NE
  if (deg >= -22.5  && deg <  22.5)  return 'right';        // E
  if (deg >=  22.5  && deg <  67.5)  return 'bottom-end';   // SE
  if (deg >=  67.5  && deg < 112.5)  return 'bottom';       // S
  if (deg >= 112.5  && deg < 157.5)  return 'bottom-start'; // SW
  return 'left';                                             // W
}

/**
 * Formats a percentage for Tooltip display.
 * Whole numbers: "25%". Fractional: up to 1 decimal, no trailing zero.
 */
function formatPercent(value, total) {
  if (!total || total <= 0) return '—';
  const pct = (value / total) * 100;
  return `${+pct.toFixed(1)}%`;
}

/**
 * Normalizes the data prop to { values, labels } for sliceCount entries.
 * Accepts: null, number[], or {label,value}[].
 * Zero-value entries are preserved here; filtered in the component.
 */
function normalizeSliceData(data, sliceCount) {
  const fallbackLabels = (n) => Array.from({ length: n }, (_, i) => `Series ${i + 1}`);

  if (!data || data.length === 0) {
    return { values: null, labels: fallbackLabels(sliceCount) };
  }

  if (typeof data[0] === 'object' && data[0] !== null) {
    // C2 format: {label, value}[] — count inferred from data.length, not slices prop
    return {
      values: data.map((d) =>
        typeof d.value === 'number' && isFinite(d.value) && d.value > 0 ? d.value : 0
      ),
      labels: data.map((d, i) =>
        typeof d.label === 'string' && d.label.trim() ? d.label.trim() : `Series ${i + 1}`
      ),
    };
  }

  // Legacy number[] format — values only, fallback labels
  return {
    values: data.slice(0, sliceCount),
    labels: fallbackLabels(sliceCount),
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChartDonutMulticolor({
  /**
   * Number of slices, or 'empty' for the no-data state.
   * Ignored when data is supplied as {label,value}[] (count inferred from data.length).
   */
  slices = 3,
  /** Fixed size variant. Maps to 120/180/240/300px. */
  size = 'm',
  /**
   * Slice data. Three accepted formats:
   *   null                      — equal distribution; labels: "Series 1", "Series 2"…
   *   number[]                  — values only (backwards compat); fallback labels used
   *   {label: string, value: number}[]  — C2 format; supplies both values and Tooltip labels
   * Zero or negative values are silently skipped.
   */
  data = null,
  /**
   * Enable per-slice Tooltip interaction.
   * true  → hover/focus/touch open per-slice Tooltip; tabIndex=0 on each slice.
   * false → all slice Tooltips disabled; slices are not keyboard focusable.
   */
  showTooltip = false,
  /**
   * @deprecated since C2. Superseded by data[].label. This prop is accepted for
   * backwards compatibility but is not used. Remove from call sites.
   */
  tooltipLabel, // eslint-disable-line no-unused-vars
  className = '',
}) {
  const isEmpty = slices === 'empty';
  const { dim } = SIZE_MAP[size] ?? SIZE_MAP.m;
  const cx = dim / 2;
  const cy = dim / 2;
  const outerR = dim / 2;
  const innerR = outerR * INNER_RADIUS_RATIO;

  // ── Resolve slice count ────────────────────────────────────────────────
  // C2 format: count comes from data.length; legacy: count comes from `slices`.
  let sliceCount;
  if (!isEmpty && Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    sliceCount = Math.min(data.length, 8);
  } else {
    sliceCount = isEmpty ? 0 : Math.min(Number(slices), 8);
  }

  // ── Normalize and resolve data ─────────────────────────────────────────
  const { values, labels } = !isEmpty
    ? normalizeSliceData(data, sliceCount)
    : { values: null, labels: [] };

  const rawValues = isEmpty
    ? []
    : (values && values.length >= sliceCount
        ? values.slice(0, sliceCount)
        : Array(sliceCount).fill(1));

  // Filter zero/invalid entries; preserve original color index for series consistency
  const entries = rawValues
    .map((v, i) => ({
      value: typeof v === 'number' && isFinite(v) && v > 0 ? v : 0,
      label: labels[i] ?? `Series ${i + 1}`,
      colorIndex: i,
    }))
    .filter((e) => e.value > 0);

  const total = entries.reduce((s, e) => s + e.value, 0) || 1;
  const arcs  = !isEmpty && entries.length > 0 ? computeArcs(entries.map((e) => e.value), total) : [];

  return (
    <div
      className={`chart-donut chart-donut--${size} ${className}`.trim()}
      style={{ width: dim, height: dim, position: 'relative' }}
    >
      <svg
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={
          isEmpty
            ? 'Empty donut chart'
            : `Donut chart — ${entries.length} series`
        }
        style={{ display: 'block' }}
      >
        {isEmpty ? (
          /* Empty state — full 360° ring with --chart-empty */
          <path
            d={fullRingPath(cx, cy, outerR, innerR)}
            fill="var(--chart-empty)"
            fillRule="evenodd"
            aria-hidden="true"
          />
        ) : (
          entries.map((entry, i) => {
            const arc = arcs[i];
            if (!arc) return null;

            // Full ring (single valid slice) uses stable placement "top"
            const midAngle = arc.full ? null : (arc.start + arc.end) / 2;
            const placement = arc.full ? 'top' : getSlicePlacement(midAngle);
            const pct     = formatPercent(entry.value, total);
            const content = `${entry.label} · ${pct}`;
            const ariaLabel = `${entry.label}: ${pct}`;

            const pathProps = {
              fill: SERIES_COLORS[entry.colorIndex] ?? SERIES_COLORS[0],
              className: 'chart-donut__slice',
              tabIndex: showTooltip ? 0 : -1,
              role: 'img',
              'aria-label': ariaLabel,
            };

            const pathNode = arc.full ? (
              <path
                d={fullRingPath(cx, cy, outerR, innerR)}
                fillRule="evenodd"
                {...pathProps}
              />
            ) : (
              <path
                d={roundedArcPath(cx, cy, outerR, innerR, arc.start, arc.end, CORNER_RADIUS)}
                {...pathProps}
              />
            );

            return (
              <Tooltip
                key={entry.colorIndex}
                content={content}
                size="xs"
                appearance="light"
                placement={placement}
                showTail={true}
                disabled={!showTooltip}
              >
                {pathNode}
              </Tooltip>
            );
          })
        )}
      </svg>
    </div>
  );
}
