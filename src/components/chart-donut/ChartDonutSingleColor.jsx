import React from 'react';
import Tooltip from '../tooltip/Tooltip';
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
 *   • gap:           0.04 rad (~2.29°) between adjacent shade segments
 *   • single shade:  full 360° circle (arcData = full circle, no gap, no corners)
 *   • face geometry: radial line pt(outerR-cr, angle) → pt(innerR+cr, angle) at each end
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
 * C2 — Dynamic per-shade Tooltip (designer-approved):
 *   Each shade segment opens its own Tooltip on pointer hover and keyboard focus.
 *   `showTooltip` is an enable/disable flag (not a permanent open state).
 *   Tooltip placement is computed from each shade's radial midpoint angle.
 *   Content format: `${shadeLabel} · ${percentage}%`
 *   Visual: size="xs", appearance="light", showTail={true}.
 *
 * Fallback labels: shade names are capitalized — "Default", "Light", "Lighter", "Dark", "Darker".
 * Custom labels override shade names when data={[{label,value},…]} is supplied.
 *
 * Interaction contract: identical to ChartDonutMulticolor C2.
 *   One Tooltip open at a time (each shade is a separate Floating UI instance).
 *   Hover 300 ms delay → open. Mouse-leave → close. Focus → open. Blur/Esc → close.
 *
 * @deprecated tooltipLabel — unused in C2. Supply per-shade labels via data[].label.
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
    `A ${cr} ${cr} 0 0 1 ${f(innerArcE.x)} ${f(innerArcE.y)}`,   // inner end corner — CW
    `A ${innerR} ${innerR} 0 ${largeInner} 0 ${f(innerArcS.x)} ${f(innerArcS.y)}`,
    `A ${cr} ${cr} 0 0 1 ${f(innerFaceS.x)} ${f(innerFaceS.y)}`, // inner start corner — CW
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
  s:  { dim: 120 },
  m:  { dim: 180 },
  l:  { dim: 240 },
  xl: { dim: 300 },
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

// ── C2 utilities ──────────────────────────────────────────────────────────────

/**
 * Capitalizes the first letter of a shade name.
 * "default" → "Default", "lighter" → "Lighter"
 */
function capitalizeShade(shade) {
  if (!shade) return shade;
  return shade.charAt(0).toUpperCase() + shade.slice(1);
}

/**
 * Maps a shade midpoint angle to a Tooltip placement direction.
 * 8 compass sectors of 22.5° each, centered on each compass point.
 * Angle convention: -π/2 = 12 o'clock (top), clockwise = positive.
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
 * Whole numbers: "50%". Fractional: up to 1 decimal, no trailing zero.
 */
function formatPercent(value, total) {
  if (!total || total <= 0) return '—';
  const pct = (value / total) * 100;
  return `${+pct.toFixed(1)}%`;
}

/**
 * Normalizes the data prop for shade segments.
 * Falls back to shade names ("Default", "Light", …) when no custom labels are provided.
 *
 * @param {null|number[]|{label,value}[]} data
 * @param {Array<{shade:string,weight:number}>} pattern
 * @returns {{ values: number[]|null, labels: string[] }}
 */
function normalizeShadeData(data, pattern) {
  const shadeLabels = pattern.map((p) => capitalizeShade(p.shade));

  if (!data || data.length === 0) {
    return { values: null, labels: shadeLabels };
  }

  if (typeof data[0] === 'object' && data[0] !== null) {
    // {label, value}[] — C2 format
    return {
      values: data.map((d) =>
        typeof d.value === 'number' && isFinite(d.value) && d.value > 0 ? d.value : 0
      ),
      labels: data.map((d, i) =>
        typeof d.label === 'string' && d.label.trim() ? d.label.trim() : shadeLabels[i] ?? capitalizeShade(`shade${i + 1}`)
      ),
    };
  }

  // Legacy number[] format — values only, shade name fallback labels
  return { values: data, labels: shadeLabels };
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
   * Shade data. Three accepted formats:
   *   null                      — pattern-weighted distribution; labels: shade names
   *   number[]                  — values only (backwards compat); shade name labels used
   *   {label: string, value: number}[]  — C2 format; supplies both values and Tooltip labels
   * Zero or negative values are silently skipped.
   */
  data = null,
  /**
   * Explicit empty state. Also triggered when series='empty'.
   * Matches Figma's `empty states=true` axis.
   */
  isEmpty = false,
  /**
   * Enable per-shade Tooltip interaction.
   * true  → hover/focus/touch open per-shade Tooltip; tabIndex=0 on each shade segment.
   * false → all shade Tooltips disabled; segments are not keyboard focusable.
   */
  showTooltip = false,
  /**
   * @deprecated since C2. Superseded by data[].label and shade-name fallbacks.
   * Accepted for backwards compatibility but is not used. Remove from call sites.
   */
  tooltipLabel, // eslint-disable-line no-unused-vars
  className = '',
}) {
  const isEmptyState = isEmpty || series === 'empty';
  const shadeCount   = Math.min(Math.max(Number(shades), 1), 5);
  const pattern      = SHADE_PATTERNS[shadeCount] ?? SHADE_PATTERNS[3];
  const { dim } = SIZE_MAP[size] ?? SIZE_MAP.m;
  const cx = dim / 2;
  const cy = dim / 2;
  const outerR = dim / 2;
  const innerR = outerR * INNER_RADIUS_RATIO;

  // ── Normalize data and resolve values ─────────────────────────────────
  const { values, labels } = !isEmptyState
    ? normalizeShadeData(data, pattern)
    : { values: null, labels: [] };

  const rawValues = isEmptyState
    ? []
    : (values && values.length >= shadeCount
        ? values.slice(0, shadeCount)
        : pattern.map((p) => p.weight));

  // Filter zero/invalid entries; preserve original shade index for color token lookup
  const entries = rawValues
    .map((v, i) => ({
      value: typeof v === 'number' && isFinite(v) && v > 0 ? v : 0,
      label: labels[i] ?? capitalizeShade(pattern[i]?.shade ?? `Shade ${i + 1}`),
      fill: getToken(series, pattern[i]?.shade ?? 'default'),
      shadeIndex: i,
    }))
    .filter((e) => e.value > 0);

  const total = entries.reduce((s, e) => s + e.value, 0) || 1;
  const arcs  = !isEmptyState && entries.length > 0 ? computeArcs(entries.map((e) => e.value), total) : [];

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
          isEmptyState
            ? 'Empty donut chart'
            : `Donut chart — ${entries.length} shade${entries.length !== 1 ? 's' : ''}, Series ${series}`
        }
        style={{ display: 'block' }}
      >
        {isEmptyState ? (
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

            // Full ring (single shade) uses stable placement "top"
            const midAngle = arc.full ? null : (arc.start + arc.end) / 2;
            const placement = arc.full ? 'top' : getSlicePlacement(midAngle);
            const pct     = formatPercent(entry.value, total);
            const content = `${entry.label} · ${pct}`;
            const ariaLabel = `${entry.label}: ${pct}`;

            const pathProps = {
              fill: entry.fill,
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
                key={entry.shadeIndex}
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
