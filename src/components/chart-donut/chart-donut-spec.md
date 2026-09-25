# Chart Donut — Implementation Spec

**Design System:** Scalable V.2.1.0
**Figma nodes:** `↳chart-donut-multicolor` (2365:5839) · `↳chart-donut-single-color` (2386:3131)
**Page:** ❖ Chart
**Status:** V1 Implemented · C2 Tooltip Implemented
**Last updated:** 2026-09-25

---

## Overview

Chart Donut is a two-component data visualization set for displaying proportional data in a ring (donut) format.

- **ChartDonutMulticolor** — multiple categories, each slice a distinct series color
- **ChartDonutSingleColor** — single category, all slices use tonal shade variation within one palette

Both components are pure SVG (no D3 dependency). C2 adds per-slice/per-shade Tooltip interaction via the production Tooltip component.

> ⚠️ `Series=` means opposite things across the two components — in multicolor it equals slice count; in single-color it equals color palette. This is a DS naming inconsistency (Gap D) — confirmed by DS Auditor, do not rename.

---

## Component Props

### ChartDonutMulticolor

| Prop | Type | Default | Notes |
|---|---|---|---|
| `slices` | `1–8 \| 'empty'` | `3` | Number of slices **or** empty state. Ignored when `data` is `{label,value}[]` format. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | Fixed size variant (120/180/240/300px). |
| `data` | `null \| number[] \| {label:string,value:number}[]` | `null` | Slice data. See Data API below. |
| `showTooltip` | `boolean` | `false` | Enable per-slice Tooltip interaction. |
| `tooltipLabel` | `string` | — | **DEPRECATED in C2.** Superseded by `data[].label`. Kept for backwards compat only; ignored at runtime. |
| `className` | `string` | `''` | Additional CSS class on wrapper. |

### ChartDonutSingleColor

| Prop | Type | Default | Notes |
|---|---|---|---|
| `series` | `1–8 \| 'up' \| 'down' \| 'empty'` | `1` | Color palette. In single-color, `series` = palette (not slice count). |
| `shades` | `1–5` | `3` | Number of tonal segments. Ignored when `isEmpty=true` or `series='empty'`. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | Fixed size variant (120/180/240/300px). |
| `data` | `null \| number[] \| {label:string,value:number}[]` | `null` | Shade data. See Data API below. |
| `isEmpty` | `boolean` | `false` | Empty state. Also triggered when `series='empty'`. |
| `showTooltip` | `boolean` | `false` | Enable per-shade Tooltip interaction. |
| `tooltipLabel` | `string` | — | **DEPRECATED in C2.** Superseded by `data[].label` and shade-name fallbacks. Ignored at runtime. |
| `className` | `string` | `''` | Additional CSS class on wrapper. |

---

## Data API (C2)

Both components accept `data` in three formats:

| Format | Example | Slice count source | Tooltip labels |
|---|---|---|---|
| `null` | `data={null}` | `slices` prop (multicolor) or `shades` prop (single-color) | Fallback labels (see below) |
| `number[]` | `data={[40, 25, 20, 15]}` | `slices` / `shades` prop (as before) | Fallback labels |
| `{label,value}[]` | `data={[{label:'A',value:40},…]}` | `data.length` (multicolor only) | `data[i].label` |

**Fallback labels:**
- Multicolor: `"Series 1"`, `"Series 2"`, … `"Series N"`
- SingleColor: capitalized shade names — `"Default"`, `"Light"`, `"Lighter"`, `"Dark"`, `"Darker"`

**Zero/invalid values** (0, negative, NaN, null) are silently skipped — no arc is rendered for that entry, and no Tooltip or tab stop is created for it. Original color/shade index is preserved for remaining valid entries.

**Backwards compatibility:** existing call sites using `slices`/`shades` + `data={number[]}` continue to work unchanged. `tooltipLabel` is accepted but ignored.

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

| Size | Dimensions |
|---|---|
| S | 120 × 120 px |
| M | 180 × 180 px |
| L | 240 × 240 px |
| XL | 300 × 300 px |

Fixed dimensions — no responsive behavior.

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
- **face straight px** = (outerR − cr) − (innerR + cr) = outerR − innerR − 2·cr
- **dao** = asin(cr / (outerR − cr)) — outer corner angular pullback
- **dai** = asin(cr / innerR) — inner corner angular pullback

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

| Shades | Shade 1 | Shade 2 | Shade 3 | Shade 4 | Shade 5 |
|---|---|---|---|---|---|
| 1 | `default` (100%) | — | — | — | — |
| 2 | `default` (80%) | `light` (20%) | — | — | — |
| 3 | `default` (50%) | `lighter` (25%) | `light` (25%) | — | — |
| 4 | `default` (40%) | `light` (25%) | `lighter` (20%) | `dark` (15%) | — |
| 5 | `default` (35%) | `light` (25%) | `lighter` (20%) | `dark` (12%) | `darker` (8%) |

For `series='up'`: tokens resolve to `--chart-up-{shade}`.
For `series='down'`: tokens resolve to `--chart-down-{shade}`.

### Tooltip Tokens

The per-slice/per-shade Tooltips use the **production Tooltip component** with its own token system (`--tooltip-*`). No chart-scoped tooltip tokens are defined.

> ⚠️ Stale spec note (updated 2026-09-25): `--chart-tooltip-bg`, `--chart-tooltip-border`, `--chart-tooltip-text` were present in an earlier version of `tokens.css` but have since been **removed and deferred**. A `DEFERRED` comment block at `tokens.css` lines 1455–1457 reads: "Tooltip tokens removed from Chart scope. Tooltip is a separate component and will be handled in its own handoff/audit. Do not add --chart-tooltip-* vars here." No CSS variable definitions for these tokens exist in `tokens.css` or `tokens.json`. `PARITY-AUDIT.md` lines 44 and 122 contain a historical reference claiming these are "active in CSS" — that reference is now **stale** and does not reflect current token file state. The production Tooltip component handles its own styling via `--tooltip-*` tokens.

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
└─ <svg role="img" aria-label="…">     ← arc rendering; aria exposed (C2)
    ├─ <Tooltip key={i} …>             ← per-slice Tooltip (C2)
    │   └─ <path class="chart-donut__slice"
    │         role="img"
    │         aria-label="${label}: ${pct}"
    │         tabIndex={0|-1} />
    └─ <path aria-hidden="true" />      ← empty state arc (no Tooltip)
```

**C2 structural notes:**
- `<Tooltip>` uses `React.cloneElement` internally — no DOM wrapper div between SVG and `<path>`. SVG validity is preserved.
- The Tooltip popup renders to `document.body` via `ReactDOM.createPortal`. It does not render inside the SVG element.
- One Tooltip instance per rendered slice. Each manages its own Floating UI state.

---

## C2 — Per-Slice Tooltip System

### Interaction Contract

| Trigger | Behavior |
|---|---|
| Pointer hover (mouse) | Opens after 300 ms (`openDelay`). Mouse-leave closes immediately. |
| Keyboard focus (Tab) | Opens immediately on focus. Blur closes. |
| Escape key | Closes active Tooltip. |
| Touch tap | Opens on first tap. Second tap / outside tap / ancestor scroll closes. |
| One at a time | Only one Tooltip may be open simultaneously. Each slice's Floating UI is independent — mouse-leave closes slice A before slice B opens. |

### Visual Contract

| Property | Value |
|---|---|
| `size` | `"xs"` |
| `appearance` | `"light"` |
| `showTail` | `true` |
| `placement` | Dynamic — computed from slice midpoint angle (8-sector compass) |
| Viewport edge | Floating UI `flip()` + `shift()` auto-adjust |

### Placement Algorithm

Slice midpoint angle `midAngle = (startAngle + endAngle) / 2` (radians, −π/2 = 12 o'clock, clockwise positive) maps to 8 Floating UI placement directions:

| Degree range (midAngle) | Direction | Placement |
|---|---|---|
| −157.5° to −112.5° | NW | `top-start` |
| −112.5° to −67.5°  | N  | `top` |
| −67.5° to −22.5°   | NE | `top-end` |
| −22.5° to +22.5°   | E  | `right` |
| +22.5° to +67.5°   | SE | `bottom-end` |
| +67.5° to +112.5°  | S  | `bottom` |
| +112.5° to +157.5° | SW | `bottom-start` |
| ±157.5° to ±180°   | W  | `left` |

**Single 100% slice (full ring):** `placement="top"` (stable fallback regardless of angle).

### Tooltip Content Format

```
"${label} · ${pct}"
```

`pct` is `value / total × 100`, formatted as: whole percentages without decimal (`"25%"`); fractional up to 1 decimal with no trailing zero (`"12.5%"`).

Example: `"Enterprise · 50%"`, `"Default · 50%"`, `"Series 1 · 33.3%"`

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
A cr cr 0 0 1 outerArcS              ← outer start corner (CW, small)
A outerR outerR 0 large 1 outerArcE  ← outer main arc (CW)
A cr cr 0 0 1 outerFaceE             ← outer end corner (CW, small)
L innerFaceE                          ← straight face at end
A cr cr 0 0 1 innerArcE              ← inner end corner (CW — corrected from CCW)
A innerR innerR 0 large 0 innerArcS  ← inner main arc (CCW)
A cr cr 0 0 1 innerFaceS             ← inner start corner (CW — corrected from CCW)
Z
```

Usable arc = 2π − (sliceCount × gapRad). Each slice span = (value/total) × usableAngle.

---

## Accessibility (C2)

| Element | Attribute | Value |
|---|---|---|
| `<svg>` | `role` | `"img"` |
| `<svg>` | `aria-label` | `"Donut chart — N series"` / `"Empty donut chart"` |
| `<path>` (interactive) | `role` | `"img"` |
| `<path>` (interactive) | `aria-label` | `"${label}: ${pct}"` (e.g. `"Enterprise: 50%"`) |
| `<path>` (interactive) | `tabIndex` | `0` when `showTooltip=true`, `-1` otherwise |
| `<path>` (empty state) | `aria-hidden` | `"true"` |
| Tooltip association | `aria-describedby` | Managed by production Tooltip (`useId()` per instance) |

**Focus indicator:** `.chart-donut__slice:focus-visible` shows `2px solid var(--color-border-brand-primary)` ring (WCAG 2.4.7 Focus Visible).

---

## Typography

| Layer | Text Style | Font | Size | Weight |
|---|---|---|---|---|
| Tooltip text | `caption/regular` | Open Sans | 12px | 400 |

(Rendered by production Tooltip component — no custom typography in chart-donut files.)

---

## States

| State | Multicolor | Single-color | Notes |
|---|---|---|---|
| Default (with data) | ✅ slices=1–8 | ✅ All series + shades | Active data — series fills |
| Up trend | ❌ | ✅ series='up' | `--chart-up-*` palette |
| Down trend | ❌ | ✅ series='down' | `--chart-down-*` palette |
| Empty / no data | ✅ slices='empty' | ✅ series='empty', isEmpty=true | `--chart-empty` full-circle arc |
| Hover | ❌ Not in scope | ❌ Not in scope | DS Gap B — no fill/scale change on hover |
| Focus | ✅ Focus ring via CSS | ✅ Focus ring via CSS | WCAG 2.4.7 — `focus-visible` ring on `.chart-donut__slice` |
| Tooltip | ✅ Per-slice (C2) | ✅ Per-shade (C2) | Opens on hover/focus; placement from midAngle |

---

## Light / Dark Mode

| Token group | Mode behavior |
|---|---|
| `--chart-series-1–8-*` (all shades) | Theme-adaptive ✅ |
| `--chart-up-*` · `--chart-down-*` | Theme-adaptive ✅ |
| `--chart-empty` (alias) | Theme-adaptive via CSS cascade ✅ |
| Tooltip appearance | Handled by production Tooltip (`appearance="light"`) |

No per-component dark-mode overrides needed for chart fills or empty state.

> **`--chart-tooltip-*` do not exist.** See Tooltip Tokens section. The production Tooltip handles its own styling.

---

## File Map

```
src/components/chart-donut/
├── ChartDonutMulticolor.jsx            ← Multicolor component (C2)
├── ChartDonutSingleColor.jsx           ← Single-color component (C2)
├── ChartDonut.css                      ← Shared styles, sizes, slice focus ring
├── ChartDonutMulticolor.stories.jsx    ← Stories (series, sizes, dark, C2 tooltip)
├── ChartDonutSingleColor.stories.jsx   ← Stories (series, shades, sizes, dark, C2 tooltip)
├── ChartDonut.overview.stories.jsx     ← AllCombinations + Playground (both)
└── chart-donut-spec.md                 ← This file

src/design-tokens/
└── tokens.css                          ← 100 chart declarations:
                                           80 series (1–8 × 5 shades × 2 modes)
                                           10 up (5 shades × 2 modes)
                                           10 down (5 shades × 2 modes)
                                           1 --chart-empty alias
                                           (Note: no --chart-tooltip-* tokens)
```

---

## Implementation History

| Phase | Description | Date |
|---|---|---|
| V1 | Initial implementation (arc geometry, sizes, tokens, empty state) | 2026-07-14 |
| C1 | Tooltip as container-level wrapper (controlled `open=`) | 2026-07-xx |
| C1-A | Convert Tooltip to uncontrolled (`disabled=` flag, hover/focus/touch) | 2026-09-xx |
| C2 | Per-slice/per-shade dynamic Tooltip; `data[]` API; accessibility | 2026-09-25 |

---

## Scope Boundaries

| Item | Status | Notes |
|---|---|---|
| Multicolor Series=1–8 | ✅ Implemented | |
| Multicolor Series=empty | ✅ Implemented | |
| Single-color Series=1–8 | ✅ Implemented | |
| Single-color Series=up/down | ✅ Implemented | |
| Single-color Series=empty + isEmpty | ✅ Implemented | |
| Shades=1–5 | ✅ Implemented | |
| All 4 sizes (S/M/L/XL) | ✅ Implemented | |
| Per-slice Tooltip (C2) | ✅ Implemented | Dynamic placement; hover/focus/touch; one open at a time |
| `data={label,value}[]` API (C2) | ✅ Implemented | Count from data.length (multicolor); labels per slice |
| `data={number[]}` backwards compat | ✅ Implemented | Fallback labels used |
| Zero-value slice filtering (C2) | ✅ Implemented | No arc, no Tooltip, no tab stop |
| Keyboard accessibility (C2) | ✅ Implemented | tabIndex, role="img", aria-label, focus ring |
| Light + dark mode | ✅ Implemented | Via token cascade |
| Hover fill/scale state | ❌ Not in scope | DS Gap B — requires DS Auditor approval |
| Tooltip dark appearance | ❌ Not in scope | `appearance="light"` is the approved contract |
| Animated slice transitions | ❌ Not in scope | Not defined in Figma |
| `tooltip/dark` variant | ❌ Not in scope | Requires DS Auditor decision |

---

## DS Gaps

| # | Gap | Impact | Owner |
|---|---|---|---|
| B | No hover fill/scale state on slices | Interaction fidelity | DS Auditor — proposed: hovered slice → `/dark`, non-hovered → 40% opacity |
| D | `Series=` naming means opposite things across the two components | Developer confusion | DS Auditor to rename in future DS version |
| E | `Type=Single` axis (multicolor) has only one value | None | Reserved for future expansion |

### DS Gap Clearance Record

| Gap | Resolution | Date |
|---|---|---|
| External `stroke/soft-200` on tooltip shadow (effect[1]) | ✅ Replaced with `border/neutral/soft` on `components/tooltip` local effect style | 2026-07-07 |
| No empty state variant | ✅ `Series=empty` added to both component sets; `empty states` boolean axis added to single-color (204 variants) | 2026-07-07 |
| `tooltip/light` vs `tooltip/dark` ambiguity | ✅ Confirmed intentional — two-mode design choice, not a gap | 2026-07-07 |
| Gap C (Tooltip position hardcoded per size) | ✅ Resolved in C2 — dynamic placement computed from slice midAngle via 8-sector compass | 2026-09-25 |
| `--chart-tooltip-*` stale spec tokens | ✅ Confirmed non-existent in tokens.css; spec corrected; production Tooltip handles styling | 2026-09-25 |

---

## QA Checklist (C2)

> **C2.14 — Designer browser review:** Completed and approved in Storybook (2026-09-25). All per-slice Tooltip stories were reviewed live by the designer. This was a manual designer review, not an automated browser test.

### Geometry and rendering
- [ ] Multicolor — Series=1–8 render correct slice count with distinct series colors
- [ ] Multicolor — Series=empty renders single full-circle arc in `--chart-empty`
- [ ] Single-color — Shades=1–5 render correct number of tonal segments
- [ ] Single-color — Series=1–8 each render the correct color palette
- [ ] Single-color — Series=up renders `--chart-up-*` palette
- [ ] Single-color — Series=down renders `--chart-down-*` palette
- [ ] Single-color — Series=empty + isEmpty=true renders empty arc
- [ ] All 4 sizes render at correct dimensions (120/180/240/300px)
- [ ] Arc constants: startingAngle=−π/2, innerRadius=0.52, ~2° gap
- [ ] Zero-value slices produce no arc, no Tooltip, no tab stop

### Tooltip behavior (C2)
- [ ] Hover on a slice opens its Tooltip after ~300 ms
- [ ] Mouse-leave closes the Tooltip immediately
- [ ] Keyboard focus (Tab) opens Tooltip immediately
- [ ] Blur closes Tooltip
- [ ] Escape key closes active Tooltip
- [ ] Only one Tooltip visible at a time (slice A closes before B opens)
- [ ] Tooltip content format: `"${label} · ${pct}%"`
- [ ] Fallback labels: multicolor → "Series N", single-color → "Default", "Light", etc.
- [ ] Custom labels from `data[].label` appear in Tooltip
- [ ] Placement matches 8-sector compass (4-equal-slice multicolor: NE, SE, SW, NW)
- [ ] Single 100% slice uses `placement="top"`
- [ ] Floating UI flip/shift handles viewport edges
- [ ] `showTooltip=false` disables all Tooltips; slices not keyboard-focusable

### Accessibility (C2)
- [ ] `<svg>` has `role="img"` and descriptive `aria-label`
- [ ] Each `<path>` has `role="img"` and `aria-label="${label}: ${pct}"`
- [ ] `tabIndex=0` on interactive slices when `showTooltip=true`
- [ ] `tabIndex=-1` on interactive slices when `showTooltip=false`
- [ ] Focus ring visible on `:focus-visible` (2px brand-primary border)
- [ ] Screen reader announces slice label and percentage via `aria-label`

### Mode
- [ ] Light mode chart colors match Figma
- [ ] Dark mode chart colors match Figma (all series + shades)
- [ ] Empty state matches in both light and dark
- [ ] No hardcoded hex colors — all values from DS tokens
