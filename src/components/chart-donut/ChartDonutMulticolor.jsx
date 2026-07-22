import React from 'react';
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
 * V1 scope: display-only. No Hover or Focus states — not defined in Figma.
 */

// ── Arc constants (confirmed from Figma Plugin API) ───────────────────────────

const INNER_RADIUS_RATIO = 0.52;   // arcData.innerRadius = 0.5199999809...
const SLICE_GAP_RAD     = 0.04;    // gap between adjacent slices (measured from arcData)
const CORNER_RADIUS     = 8;       // cornerRadius = 8, bound to DS token "number/size-8"
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
//   → [A corner CCW] → innerFaceS → Z  (Z closes: innerFaceS → outerFaceS = start face)
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
    `A ${cr} ${cr} 0 0 0 ${f(innerArcE.x)} ${f(innerArcE.y)}`,
    `A ${innerR} ${innerR} 0 ${largeInner} 0 ${f(innerArcS.x)} ${f(innerArcS.y)}`,
    `A ${cr} ${cr} 0 0 0 ${f(innerFaceS.x)} ${f(innerFaceS.y)}`,
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

// Full 360° donut ring (single-slice or empty state helper)
function fullRingPath(cx, cy, outerR, innerR) {
  const f = (n) => n.toFixed(4);
  // Two full arcs, evenodd fill creates the hole
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

// Single-slice: full 360° (matches Figma arcData.startingAngle=-π/2, endingAngle=3π/2)
// Multi-slice:  0.04 rad gap between adjacent slices, each slice inset 0.02 rad per boundary

function computeArcs(data, total) {
  const count = data.length;

  if (count === 1) {
    // Matches Figma single-slice: full circle, no gap, no corners
    return [{ start: -Math.PI / 2, end: 3 * Math.PI / 2, full: true }];
  }

  const usableAngle = TWO_PI - count * SLICE_GAP_RAD;
  let cursor = -Math.PI / 2;
  return data.map((value) => {
    const span = (value / total) * usableAngle;
    const start = cursor + SLICE_GAP_RAD / 2;
    const end   = start + span;
    cursor += span + SLICE_GAP_RAD;
    return { start, end, full: false };
  });
}

// ── Size config ───────────────────────────────────────────────────────────────

const SIZE_MAP = {
  s:  { dim: 120, tooltipX: 122 },
  m:  { dim: 180, tooltipX: 182 },
  l:  { dim: 240, tooltipX: 242 },
  xl: { dim: 300, tooltipX: 302 },
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

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChartDonutMulticolor({
  /**
   * Number of slices to display, or 'empty' for the no-data state.
   * In multicolor, Series = SLICE COUNT (not palette).
   */
  slices = 3,
  /** Fixed size variant. Maps to 120/180/240/300px. */
  size = 'm',
  /**
   * Array of numeric values (one per slice).
   * Length should match `slices`. If omitted, equal distribution is used.
   */
  data = null,
  /** Show the tooltip overlay. In code, control with hover/event logic. */
  showTooltip = false,
  /** Tooltip text content. */
  tooltipLabel = 'Series',
  className = '',
}) {
  const isEmpty = slices === 'empty';
  const count = isEmpty ? 0 : Math.min(Number(slices), 8);
  const { dim, tooltipX } = SIZE_MAP[size] ?? SIZE_MAP.m;
  const cx = dim / 2;
  const cy = dim / 2;
  const outerR = dim / 2;
  const innerR = outerR * INNER_RADIUS_RATIO;

  // Normalise data
  const sliceData = isEmpty
    ? []
    : (data && data.length >= count ? data.slice(0, count) : Array(count).fill(1));

  const total = sliceData.reduce((s, v) => s + v, 0) || 1;
  const arcs  = isEmpty ? [] : computeArcs(sliceData, total);

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
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        {isEmpty ? (
          /* Empty state — full 360° ring with --chart-empty */
          <path
            d={fullRingPath(cx, cy, outerR, innerR)}
            fill="var(--chart-empty)"
            fillRule="evenodd"
          />
        ) : (
          arcs.map((arc, i) =>
            arc.full ? (
              /* Single-slice: full donut ring — matches Figma Series=1 */
              <path
                key={i}
                d={fullRingPath(cx, cy, outerR, innerR)}
                fill={SERIES_COLORS[i]}
                fillRule="evenodd"
              />
            ) : (
              /* Multi-slice: rounded arc path — cornerRadius=8, gap=0.04 rad */
              <path
                key={i}
                d={roundedArcPath(cx, cy, outerR, innerR, arc.start, arc.end, CORNER_RADIUS)}
                fill={SERIES_COLORS[i]}
              />
            )
          )
        )}
      </svg>

      {showTooltip && !isEmpty && (
        <div
          className="chart-donut__tooltip"
          style={{
            position: 'absolute',
            left: tooltipX,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          {tooltipLabel}
        </div>
      )}
    </div>
  );
}
