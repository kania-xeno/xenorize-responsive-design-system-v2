import React from 'react';
import './ChartDonut.css';

/**
 * ChartDonutSingleColor — ↳chart-donut-single-color
 * Figma node set: 2386:3131
 * Design System Scalable V.2.1.0 · Page: ❖ Chart
 *
 * Arc geometry confirmed from Figma Plugin API + fillGeometry (2026-07-14):
 *   • type:          ELLIPSE (filled paths, NOT stroked circles)
 *   • innerRadius:   0.52 (arcData.innerRadius)
 *   • cornerRadius:  8px fixed, all sizes → DS primitive token "number/size-8"
 *   • strokeCap:     NONE  →  stroke-linecap="round" is WRONG; use filled path + corner arcs
 *   • gap:           0.04 rad (~2.29°) between adjacent slices
 *   • single shade:  full 360° circle (arcData = full circle, no gap, no corners)
 *   • face geometry: radial line pt(outerR-cr, angle) → pt(innerR+cr, angle) at each end
 *   • dao = asin(cr/(outerR-cr)), dai = asin(cr/innerR) — see ChartDonutMulticolor.jsx
 *
 * ⚠️ `series` here = COLOR PALETTE, NOT slice count.
 *    In ChartDonutMulticolor, `slices` = slice count.
 *
 * Tonal shade pattern (from Figma handoff):
 *   shades=1: default (100%)
 *   shades=2: default (80%) · light (20%)
 *   shades=3: default (50%) · lighter (25%) · light (25%)
 *   shades=4: default (40%) · light (25%) · lighter (20%) · dark (15%)
 *   shades=5: default (35%) · light (25%) · lighter (20%) · dark (12%) · darker (8%)
 *
 * V1 scope: display-only. No Hover or Focus states — not defined in Figma.
 */

// ── Arc constants (confirmed from Figma Plugin API) ───────────────────────────

const INNER_RADIUS_RATIO = 0.52;
const SLICE_GAP_RAD      = 0.04;   // gap between adjacent shade segments
const CORNER_RADIUS      = 8;      // bound to DS token "number/size-8"
const TWO_PI             = Math.PI * 2;

// ── Polar → Cartesian ─────────────────────────────────────────────────────────

function p2c(cx, cy, r, angle) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

// ── Rounded arc path ──────────────────────────────────────────────────────────
//
// Identical geometry to ChartDonutMulticolor. Verified against Figma fillGeometry (2026-07-14).
// See ChartDonutMulticolor.jsx for full geometry notes.

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
  s:  { dim: 120, tooltipX: 122 },
  m:  { dim: 180, tooltipX: 182 },
  l:  { dim: 240, tooltipX: 242 },
  xl: { dim: 300, tooltipX: 302 },
};

// ── Tonal shade pattern ───────────────────────────────────────────────────────
//
// Each entry: { shade, weight }
// Weights are from the Figma handoff "approximate arc %" table.

const SHADE_PATTERNS = {
  1: [{ shade: 'default', weight: 1 }],
  2: [
    { shade: 'default', weight: 0.80 },
    { shade: 'light',   weight: 0.20 },
  ],
  3: [
    { shade: 'default',  weight: 0.50 },
    { shade: 'lighter',  weight: 0.25 },
    { shade: 'light',    weight: 0.25 },
  ],
  4: [
    { shade: 'default',  weight: 0.40 },
    { shade: 'light',    weight: 0.25 },
    { shade: 'lighter',  weight: 0.20 },
    { shade: 'dark',     weight: 0.15 },
  ],
  5: [
    { shade: 'default',  weight: 0.35 },
    { shade: 'light',    weight: 0.25 },
    { shade: 'lighter',  weight: 0.20 },
    { shade: 'dark',     weight: 0.12 },
    { shade: 'darker',   weight: 0.08 },
  ],
};

// ── Token resolver ────────────────────────────────────────────────────────────

function getToken(series, shade) {
  if (series === 'up')   return `var(--chart-up-${shade})`;
  if (series === 'down') return `var(--chart-down-${shade})`;
  return `var(--chart-series-${series}-${shade})`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChartDonutSingleColor({
  /**
   * Color palette. In single-color, Series = PALETTE (not slice count).
   * 'empty' triggers the no-data state.
   */
  series = 1,
  /** Number of tonal segments (1–5). Ignored when isEmpty=true. */
  shades = 3,
  /** Fixed size variant. Maps to 120/180/240/300px. */
  size = 'm',
  /**
   * Array of numeric values (one per shade segment).
   * Falls back to weight-based distribution if omitted.
   */
  data = null,
  /**
   * Explicit empty state. Also triggered when series='empty'.
   * Matches Figma's `empty states=true` axis.
   */
  isEmpty = false,
  /** Show the tooltip overlay. */
  showTooltip = false,
  /** Tooltip text content. */
  tooltipLabel = 'Series',
  className = '',
}) {
  const isEmptyState = isEmpty || series === 'empty';
  const shadeCount   = Math.min(Math.max(Number(shades), 1), 5);
  const pattern      = SHADE_PATTERNS[shadeCount] ?? SHADE_PATTERNS[3];
  const { dim, tooltipX } = SIZE_MAP[size] ?? SIZE_MAP.m;
  const cx = dim / 2;
  const cy = dim / 2;
  const outerR = dim / 2;
  const innerR = outerR * INNER_RADIUS_RATIO;

  const sliceData = isEmptyState
    ? []
    : (data && data.length >= shadeCount
        ? data.slice(0, shadeCount)
        : pattern.map((p) => p.weight));

  const total = sliceData.reduce((s, v) => s + v, 0) || 1;
  const arcs  = isEmptyState ? [] : computeArcs(sliceData, total);
  const fills = pattern.map((p) => getToken(series, p.shade));

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
        {isEmptyState ? (
          /* Empty state — full 360° ring with --chart-empty */
          <path
            d={fullRingPath(cx, cy, outerR, innerR)}
            fill="var(--chart-empty)"
            fillRule="evenodd"
          />
        ) : (
          arcs.map((arc, i) =>
            arc.full ? (
              /* Single-shade (shades=1): full donut ring — matches Figma Shades=1 */
              <path
                key={i}
                d={fullRingPath(cx, cy, outerR, innerR)}
                fill={fills[i]}
                fillRule="evenodd"
              />
            ) : (
              /* Multi-shade: rounded arc path — cornerRadius=8, gap=0.04 rad */
              <path
                key={i}
                d={roundedArcPath(cx, cy, outerR, innerR, arc.start, arc.end, CORNER_RADIUS)}
                fill={fills[i]}
              />
            )
          )
        )}
      </svg>

      {showTooltip && !isEmptyState && (
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
