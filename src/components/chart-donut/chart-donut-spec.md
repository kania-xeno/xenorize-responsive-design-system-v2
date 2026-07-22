# Chart Donut — Implementation Spec

**Design System:** Scalable V.2.1.0
**Figma nodes:** `↳chart-donut-multicolor` (2365:5839) · `↳chart-donut-single-color` (2386:3131)
**Page:** ❖ Chart
**Status:** V1 Implemented
**Last updated:** 2026-07-14

---

## Overview

Chart Donut is a two-component data visualization set for displaying proportional data in a ring (donut) format.

- **ChartDonutMulticolor** — multiple categories, each slice a distinct series color
- **ChartDonutSingleColor** — single category, all slices use tonal shade variation within one palette

Both components are pure SVG (no D3 dependency) with no interactive states in V1.

> ⚠️ `Series=` means opposite things across the two components — in multicolor it equals slice count; in single-color it equals color palette. This is a DS naming inconsistency (Gap D) — confirmed by DS Auditor, do not rename.

---

## Component Props

### ChartDonutMulticolor

| Prop | Type | Default | Notes |
|---|---|---|---|
| `slices` | `1–8 \| 'empty'` | `3` | Number of slices **or** empty state. In multicolor, `slices` = slice count (not palette). |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | Fixed size variant (120/180/240/300px). |
| `data` | `number[]` | `null` | Arc values per slice. Defaults to equal distribution if omitted. |
| `showTooltip` | `boolean` | `false` | Show tooltip overlay. |
| `tooltipLabel` | `string` | `'Series'` | Tooltip text content. |
| `className` | `string` | `''` | Additional CSS class on wrapper. |

### ChartDonutSingleColor

| Prop | Type | Default | Notes |
|---|---|---|---|
| `series` | `1–8 \| 'up' \| 'down' \| 'empty'` | `1` | Color palette. In single-color, `series` = palette (not slice count). |
| `shades` | `1–5` | `3` | Number of tonal segments. Ignored when `isEmpty=true` or `series='empty'`. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | Fixed size variant (120/180/240/300px). |
| `data` | `number[]` | `null` | Arc values per shade. Defaults to weight-based distribution if omitted. |
| `isEmpty` | `boolean` | `false` | Empty state. Also triggered when `series='empty'`. Matches Figma's `empty states=true` axis. |
| `showTooltip` | `boolean` | `false` | Show tooltip overlay. |
| `tooltipLabel` | `string` | `'Series'` | Tooltip text content. |
| `className` | `string` | `''` | Additional CSS class on wrapper. |

---

## Variants / Axes

### ↳chart-donut-multicolor — 3 axes, 36 variants

| Axis | Figma Values | Prop | Notes |
|---|---|---|---|
| `Type` | `Single` | — | One value only — reserved for future expansion |
| `Size` | `S`, `M`, `L`, `XL` | `size` | Fixed pixel dimensions |
| `Series` | `1`–`8`, `empty` | `slices` | Slice count (not palette) |

### ↳chart-donut-single-color — 4 axes, 204 variants

| Axis | Figma Values | Prop | Notes |
|---|---|---|---|
| `Size` | `S`, `M`, `L`, `XL` | `size` | Fixed pixel dimensions |
| `Shades` | `1`–`5` | `shades` | Number of tonal segments |
| `Series` | `1`–`8`, `up`, `down`, `empty` | `series` | Color palette (not slice count) |
| `empty states` | `false`, `true` | `isEmpty` | `true` only when `series='empty'` |

---

## Sizes

| Size | Dimensions | Tooltip x |
|---|---|---|
| S | 120 × 120 px | 122 |
| M | 180 × 180 px | 182 |
| L | 240 × 240 px | 242 |
| XL | 300 × 300 px | 302 |

Fixed dimensions — no responsive behavior. Tooltip y = vertical center of component.

---

## Arc Constants

Confirmed from Figma Plugin API (`arcData`) and `fillGeometry` (2026-07-14):

| Property | Value | Source |
|---|---|---|
| `startingAngle` | −π/2 (−1.5708 rad) | 12 o'clock — consistent across all variants |
| `innerRadius ratio` | 0.52 × outerRadius | `arcData.innerRadius = 0.5199999809` |
| Slice gap | 0.04 rad (~2.29°) | `arcData` confirmed, each slice inset 0.02 rad per boundary |
| `cornerRadius` | 8px fixed | `node.cornerRadius = 8` → DS token `number/size-8` |
| `strokeCap` | NONE | Filled paths, NOT stroked circles |

Arc percentages in Figma layer names (e.g. `slice-1 (35%)`) are labels only. Real values come from the `data` prop.

---

## Per-Size Geometry

Corner offsets change with size because the radii scale while `cr=8px` stays fixed.

| Size | dim | outerR | innerR | arc thickness | face straight px | dao (outer) | dai (inner) |
|---|---|---|---|---|---|---|---|
| S | 120 px | 60 | 31.2 | 28.8 px | 12.8 px | 8.9° (0.155 rad) | 14.9° (0.261 rad) |
| M | 180 px | 90 | 46.8 | 43.2 px | 27.2 px | 5.6° (0.098 rad) | 9.8°  (0.171 rad) |
| L | 240 px | 120 | 62.4 | 57.6 px | 41.6 px | 4.1° (0.071 rad) | 7.4°  (0.128 rad) |
| XL | 300 px | 150 | 78.0 | 72.0 px | 56.0 px | 3.2° (0.056 rad) | 5.9°  (0.103 rad) |

- **arc thickness** = outerR − innerR
- **face straight px** = (outerR − cr) − (innerR + cr) = outerR − innerR − 2·cr (straight segment on end-face between the two corner arcs)
- **dao** = asin(cr / (outerR − cr)) — outer corner angular pullback
- **dai** = asin(cr / innerR) — inner corner angular pullback (matches Figma `fillGeometry` bezier transition points)

A slice falls back to flat ends when `span ≤ 2·dai` (inner corners are the binding constraint).

---

## Token Reference

### Multicolor — Slice Fills

Each slice uses a **different series** at `/default` shade only.

| Slice | CSS Token | Role |
|---|---|---|
| slice-1 | `--chart-series-1-default` | Indigo |
| slice-2 | `--chart-series-2-default` | Orange |
| slice-3 | `--chart-series-3-default` | Cyan |
| slice-4 | `--chart-series-4-default` | Rose |
| slice-5 | `--chart-series-5-default` | Yellow |
| slice-6 | `--chart-series-6-default` | Fuchsia |
| slice-7 | `--chart-series-7-default` | Lime |
| slice-8 | `--chart-series-8-default` | Amber |

All `--chart-series-*` tokens are theme-adaptive (defined in `:root` + `[data-theme="dark"]`).

### Single Color — Tonal Shading Pattern

All slices use the same series palette (e.g. `--chart-series-N-*` or `--chart-up-*` or `--chart-down-*`), differentiated by shade token.

| Shades | Slice 1 | Slice 2 | Slice 3 | Slice 4 | Slice 5 |
|---|---|---|---|---|---|
| 1 | `default` (100%) | — | — | — | — |
| 2 | `default` (80%) | `light` (20%) | — | — | — |
| 3 | `default` (50%) | `lighter` (25%) | `light` (25%) | — | — |
| 4 | `default` (40%) | `light` (25%) | `lighter` (20%) | `dark` (15%) | — |
| 5 | `default` (35%) | `light` (25%) | `lighter` (20%) | `dark` (12%) | `darker` (8%) |

For `series='up'`: tokens resolve to `--chart-up-{shade}`.
For `series='down'`: tokens resolve to `--chart-down-{shade}`.

### Tooltip Tokens

> Tooltip tokens are **intentionally fixed** (single mode, component collection). No `[data-theme="dark"]` override — this is by design, not a gap.

| Layer | CSS Token | Behavior |
|---|---|---|
| Background | `--chart-tooltip-bg` | Fixed (#ffffff) |
| Border | `--chart-tooltip-border` | Fixed (#f5f5f5) |
| Text | `--chart-tooltip-text` | Fixed (#1c1c1c) |
| Shadow | `box-shadow` approximation | Matches DS `components/tooltip` effect style |

### Empty State Token

| Layer | CSS Token | Behavior |
|---|---|---|
| Full-circle arc | `--chart-empty` | Theme-adaptive — alias to `--color-surface-neutral-weak` |

`--chart-empty: var(--color-surface-neutral-weak)` is defined once in `:root`. The CSS cascade automatically picks up the dark-mode value of `--color-surface-neutral-weak` inside `[data-theme="dark"]`.

---

## Anatomy

Both components use NONE layout in Figma — all children absolutely positioned.

```
.chart-donut                   ← wrapper div, width/height set inline
│
└─ <svg>                       ← arc rendering
    ├─ <path fill="--chart-series-N-default" />   (multicolor slices)
    ├─ <path fill="--chart-series-N-{shade}" />   (single-color shades)
    └─ <circle stroke="--chart-empty" />           (empty state only)

.chart-donut__tooltip          ← positioned div (absolute), show/hide via showTooltip
```

---

## Arc Math

Pure SVG polar coordinate math. No D3 dependency.

```js
// Polar → Cartesian
x = cx + r * Math.cos(angle)
y = cy + r * Math.sin(angle)

// Corner offsets (verified against Figma fillGeometry)
dao = asin(cr / (outerR - cr))   // outer corner angular pullback
dai = asin(cr / innerR)           // inner corner angular pullback

// Face tangent points (start and end radial faces)
outerFaceS = pt(outerR - cr, startAngle)
outerFaceE = pt(outerR - cr, endAngle)
innerFaceS = pt(innerR + cr, startAngle)
innerFaceE = pt(innerR + cr, endAngle)

// Arc boundary points
outerArcS = pt(outerR, startAngle + dao)
outerArcE = pt(outerR, endAngle   - dao)
innerArcS = pt(innerR, startAngle + dai)
innerArcE = pt(innerR, endAngle   - dai)

// Rounded donut slice path
M outerFaceS
A cr cr 0 0 1 outerArcS          ← outer start corner (CW, small)
A outerR outerR 0 large 1 outerArcE  ← outer main arc (CW)
A cr cr 0 0 1 outerFaceE         ← outer end corner (CW, small)
L innerFaceE                      ← straight face at end
A cr cr 0 0 0 innerArcE          ← inner end corner (CCW, small)
A innerR innerR 0 large 0 innerArcS  ← inner main arc (CCW)
A cr cr 0 0 0 innerFaceS         ← inner start corner (CCW, small)
Z                                 ← closes: innerFaceS → outerFaceS (start face)
```

Usable arc = 2π − (sliceCount × gapRad). Each slice span = (value/total) × usableAngle.

---

## Typography

| Layer | Text Style | Font | Size | Weight |
|---|---|---|---|---|
| Tooltip text | `caption/regular` | Open Sans | 12px | 400 |

---

## States

| State | Multicolor | Single-color | Notes |
|---|---|---|---|
| Default (with data) | ✅ slices=1–8 | ✅ All series + shades | Active data — series fills |
| Up trend | ❌ | ✅ series='up' | `--chart-up-*` palette |
| Down trend | ❌ | ✅ series='down' | `--chart-down-*` palette |
| Empty / no data | ✅ slices='empty' | ✅ series='empty', isEmpty=true | `--chart-empty` full-circle arc |
| Hover | ❌ Not in scope | ❌ Not in scope | DS Gap B — not defined in Figma |
| Focus | ❌ Not in scope | ❌ Not in scope | DS Gap — not defined in Figma |

---

## Light / Dark Mode

| Token group | Mode behavior |
|---|---|
| `--chart-series-1–8-*` (all shades) | Theme-adaptive ✅ |
| `--chart-up-*` · `--chart-down-*` | Theme-adaptive ✅ |
| `--chart-empty` (alias) | Theme-adaptive via CSS cascade ✅ |
| `--chart-tooltip-bg/border/text` | Fixed by design — intentional |

No per-component dark-mode overrides needed for chart fills or empty state. Tooltip is fixed — do not add dark override.

---

## File Map

```
src/components/chart-donut/
├── ChartDonutMulticolor.jsx            ← Multicolor component
├── ChartDonutSingleColor.jsx           ← Single-color component
├── ChartDonut.css                      ← Shared styles, sizes, tooltip
├── ChartDonutMulticolor.stories.jsx    ← General stories (all series, sizes, dark)
├── ChartDonutSingleColor.stories.jsx   ← General stories (all series, shades, sizes, dark)
├── ChartDonut.overview.stories.jsx     ← AllCombinations + Playground (both)
└── chart-donut-spec.md                 ← This file

src/design-tokens/
└── tokens.css                          ← 103 chart declarations:
                                           80 series (1–8 × 5 shades × 2 modes)
                                           10 up (5 shades × 2 modes)
                                           10 down (5 shades × 2 modes)
                                           3 tooltip (fixed, :root only)
                                           1 --chart-empty alias
```

---

## V1 Scope Boundaries

| Item | Status | Notes |
|---|---|---|
| Multicolor Series=1–8 | ✅ Implemented | |
| Multicolor Series=empty | ✅ Implemented | |
| Single-color Series=1–8 | ✅ Implemented | |
| Single-color Series=up/down | ✅ Implemented | |
| Single-color Series=empty + isEmpty | ✅ Implemented | |
| Shades=1–5 | ✅ Implemented | |
| All 4 sizes (S/M/L/XL) | ✅ Implemented | |
| Tooltip display-only | ✅ Implemented | Static overlay; no hover trigger in V1 |
| Light + dark mode | ✅ Implemented | Via token cascade |
| Equal-distribution data fallback | ✅ Implemented | When `data` prop omitted |
| Hover state | ❌ Not in scope | DS Gap B — requires DS Auditor approval |
| Focus / keyboard interaction | ❌ Not in scope | DS Gap — not defined in Figma |
| Dynamic tooltip (slice centroid) | ❌ Not in scope | V1 fixed position; product to implement |
| `tooltip/dark` variant | ❌ Not in scope | Requires DS Auditor decision |

---

## DS Gaps

| # | Gap | Impact | Owner |
|---|---|---|---|
| B | No Hover state on either component | Interaction fidelity | DS Auditor — proposed: hovered slice → `/dark`, non-hovered → 40% opacity |
| C | Tooltip x/y hardcoded per size in Figma | Dynamic positioning in code | Engineer to implement slice-centroid-based tooltip in product |
| D | `Series=` naming means opposite things across the two components | Developer confusion | DS Auditor to rename in future DS version |
| E | `Type=Single` axis (multicolor) has only one value | None | Reserved for future expansion |
| F | Tooltip shadow stack is a multi-layer drop-shadow baked into `components/tooltip` effect style; no individual shadow tokens | CSS approximation | Flag if DS shadow token system expands |

### DS Gap Clearance Record (2026-07-07)

| Gap | Resolution |
|---|---|
| External `stroke/soft-200` on tooltip shadow (effect[1]) | ✅ Replaced with `border/neutral/soft` on `components/tooltip` local effect style |
| No empty state variant | ✅ `Series=empty` added to both component sets; `empty states` boolean axis added to single-color (204 variants) |
| `tooltip/light` vs `tooltip/dark` ambiguity | ✅ Confirmed intentional — two-mode design choice, not a gap |

---

## QA Checklist

- [ ] Multicolor — Series=1–8 render correct slice count with distinct series colors
- [ ] Multicolor — Series=empty renders single full-circle arc in `--chart-empty`
- [ ] Single-color — Shades=1–5 render correct number of tonal segments
- [ ] Single-color — Series=1–8 each render the correct color palette
- [ ] Single-color — Series=up renders `--chart-up-*` palette
- [ ] Single-color — Series=down renders `--chart-down-*` palette
- [ ] Single-color — Series=empty + isEmpty=true renders empty arc
- [ ] All 4 sizes render at correct dimensions (120/180/240/300px)
- [ ] Arc constants: startingAngle=−π/2, innerRadius=0.52, ~2° gap
- [ ] Tooltip renders with `--chart-tooltip-*` tokens (fixed — not theme-switched)
- [ ] Tooltip text uses caption/regular (Open Sans 12px)
- [ ] Light mode chart colors match Figma
- [ ] Dark mode chart colors match Figma (all series + shades)
- [ ] Empty state matches in both light and dark
- [ ] `--chart-tooltip-*` tokens remain fixed in dark mode
- [ ] No hover, focus, or interactive states implemented
- [ ] No hardcoded hex colors — all values from DS tokens
