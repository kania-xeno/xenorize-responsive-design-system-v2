# Breadcrumb — Implementation Spec

**Design System:** Scalable V.2.1.0
**Figma nodes:** `↳items-breadcrumb` (2177:41698) · `↳breadcrumbs-group` (2177:41749)
**Status:** V1 Implemented
**Last updated:** 2026-07-06

---

## Overview

Breadcrumb is a two-component navigational trail system.

- `BreadcrumbItem` — individual slot: label, optional icon, state
- `Breadcrumb` — assembled trail: items array, divider style, WAI-ARIA `<nav>` landmark

The group inserts a divider element between every adjacent pair of items. Dividers are explicit rendered nodes, not CSS pseudo-elements.

---

## Component Props

### BreadcrumbItem

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | `''` | Visible text. Required when `showText=true`. |
| `state` | `'default' \| 'active'` | `'default'` | Controls token selection for text and icon. |
| `showIcon` | `boolean` | `false` | Renders the icon slot. |
| `showText` | `boolean` | `true` | Renders the text label. |
| `icon` | `ReactElement` | `null` | Icon component. Required when `showIcon=true`. |
| `ariaLabel` | `string` | `''` | Required when `showIcon=true` and `showText=false` (icon-only items). |
| `className` | `string` | `''` | Additional CSS class. |

### Breadcrumb

| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | `BreadcrumbItemDescriptor[]` | `[]` | Trail items (see shape below). |
| `divider` | `'arrow' \| 'slash' \| 'dot'` | `'arrow'` | Divider style between items. |
| `ariaLabel` | `string` | `'Breadcrumb'` | `aria-label` on the `<nav>` landmark. |
| `className` | `string` | `''` | Additional CSS class on `<nav>`. |

### BreadcrumbItemDescriptor shape

```ts
{
  label:      string;            // visible text
  state?:     'default' | 'active'; // default: 'default'
  showIcon?:  boolean;           // default: false
  showText?:  boolean;           // default: true
  icon?:      ReactElement;      // required when showIcon=true
  ariaLabel?: string;            // required when icon-only
  href?:      string;            // wraps item in <a> when provided
}
```

---

## Variants / Axes

### ↳items-breadcrumb

| Axis | Values | Notes |
|---|---|---|
| State | Default, Active | Controls text + icon token |
| Text | On, Off | `showText` prop |
| Icon | On, Off | `showIcon` prop |

### ↳breadcrumbs-group

| Axis | Values | Notes |
|---|---|---|
| Divider | Arrow, Slash, Dot | `divider` prop |
| Quantity | 3, 4, 5 | Length of `items` array |

---

## Token Reference

All tokens are in the `--breadcrumb-*` namespace. Defined in `src/design-tokens/tokens.css`.

| CSS Token | Theme Alias | Value (Light) | Value (Dark) | Role |
|---|---|---|---|---|
| `--breadcrumb-text-default` | `text/neutral/subtle` | `#7b7b7b` | `#ccced7` | Label — Default state |
| `--breadcrumb-text-active` | `text/neutral/strong` | `#1c1c1c` | `#ffffff` | Label — Active state |
| `--breadcrumb-icon-default` | `icon/sub` | `#5c5c5c` | `#ccced7` | Icon — Default state |
| `--breadcrumb-icon-active` | `icon/strong` | `#1c1c1c` | `#ffffff` | Icon — Active state |
| `--breadcrumb-divider` | `icon/soft` | `#a3a3a3` | `#989dae` | All divider types |

> **Note:** Token hex values derived from `--color-*` primitives in `tokens.css` (Figma Desktop Bridge unavailable at implementation time). Verify against `nested-breadcrumb/*` Figma variables on next connected session.

---

## Anatomy

```
<nav aria-label="Breadcrumb">         ← WAI-ARIA nav landmark
  <ol class="breadcrumb__list">       ← flex row, gap 6px, list-style none
    <li class="breadcrumb__item"      ← aria-current="page" on last+active item
        aria-current="page">
      <a class="breadcrumb__link">    ← optional, wraps when href provided
        <span class="breadcrumb-item breadcrumb-item--active">
          <span class="breadcrumb-item__icon">  ← 20×20, color via currentColor
            <ChevronRightSmall />
          </span>
          <span class="breadcrumb-item__label">Category</span>
        </span>
      </a>
    </li>
    <span class="breadcrumb__divider breadcrumb__divider--arrow" aria-hidden="true">
      <ChevronRightSmall />                     ← Arrow divider
    </span>
    <!-- OR -->
    <span class="breadcrumb__divider breadcrumb__divider--slash" aria-hidden="true">
      /                                         ← Slash divider
    </span>
    <!-- OR -->
    <span class="breadcrumb__divider breadcrumb__divider--dot" aria-hidden="true">
      •                                         ← Dot divider
    </span>
  </ol>
</nav>
```

---

## Typography

| Element | Text Style | Font | Size | Weight | Line Height |
|---|---|---|---|---|---|
| Item label | `body/regular/md` | Open Sans | 14px | 400 | 143% (≈ 20px) |
| Slash divider | `body/regular/md` | Open Sans | 14px | 400 | 143% |
| Dot divider | `body/regular/md` | Open Sans | 14px | 400 | 143% |
| Arrow divider | — (SVG) | — | — | — | — |

---

## Spacing

| Property | Value | Source |
|---|---|---|
| Item padding | 0 all sides | Figma Auto Layout |
| Item gap (icon + text) | 6px | Figma Auto Layout |
| Item gap (single element) | 8px | Figma Auto Layout |
| Group gap (all children) | 6px | Figma Auto Layout |
| Item height | 20px | Figma fixed |
| Divider width | 20px | Figma fixed (matches icon frame) |
| Icon slot | 20×20px | Figma icon frame |

---

## States

| State | CSS modifier | Text token | Icon token | Divider token |
|---|---|---|---|---|
| Default | `.breadcrumb-item--default` | `--breadcrumb-text-default` | `--breadcrumb-icon-default` | `--breadcrumb-divider` |
| Active | `.breadcrumb-item--active` | `--breadcrumb-text-active` | `--breadcrumb-icon-active` | `--breadcrumb-divider` |

State behavior:
- Divider color is invariant — same token across all item states
- Each item's state is set independently via the `state` prop
- The last item is conventionally set to Active (`state="active"`) to indicate the current page
- `aria-current="page"` is applied automatically to the last `<li>` when its item's `state === 'active'`
- The group component does not enforce which item is active

---

## Divider Architecture

Dividers are explicit rendered React nodes — not CSS `::before`/`::after` pseudo-elements and not CSS `list-style`.

This matches Figma's explicit child node model (Arrow = icon instance; Slash/Dot = TEXT nodes).

```jsx
// Arrow — icon renders stroke from --breadcrumb-divider via currentColor
<span class="breadcrumb__divider breadcrumb__divider--arrow" aria-hidden="true">
  <ChevronRightSmall />
</span>

// Slash / Dot — text character, color from --breadcrumb-divider via CSS
<span class="breadcrumb__divider breadcrumb__divider--slash" aria-hidden="true">/</span>
<span class="breadcrumb__divider breadcrumb__divider--dot"   aria-hidden="true">•</span>
```

All dividers carry `aria-hidden="true"` — they are presentational separators, not navigation labels.

---

## Accessibility

| Requirement | Implementation |
|---|---|
| Navigation landmark | `<nav aria-label="Breadcrumb">` wraps the trail |
| Ordered list | `<ol>` + `<li>` — screen readers announce position ("2 of 3") |
| Current page | `aria-current="page"` on the last `<li>` when item `state === 'active'` |
| Icon-only items | `aria-label` on `<span.breadcrumb-item>` wrapper; icon `aria-hidden="true"` |
| Divider separators | `aria-hidden="true"` on all divider elements |
| Icon SVG | `aria-hidden="true"` on all `<svg>` elements |

WAI-ARIA pattern: [Breadcrumb Example](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

**DS Gap:** No Focus state is defined in Figma V1. WCAG 2.4.7 (Focus Visible) requires a visible focus indicator. DS Auditor must define token + variant before implementing. Browsers apply a default `:focus-visible` outline on `<a>` elements as a fallback.

---

## Icon Architecture

The Arrow divider uses `ChevronRightSmall` — a 24×24 viewBox SVG rendered at 20×20.

Path: `M 10 8 L 14 12 L 10 16` — a right-pointing chevron derived from `ChevronDownSmall` (node 9:2273) rotated 90° CW.

> ⚠️ Path derived — Figma Desktop Bridge was unavailable at implementation time. Verify actual Figma path coordinates on next connected session.

Icon color is applied via `currentColor` on the `stroke` attribute. The color is set on `.breadcrumb__divider` or `.breadcrumb-item__icon` via the `color` CSS property, which cascades to `currentColor`.

Item icons (in `BreadcrumbItem`) follow the same pattern — icon color controlled at the item wrapper level, inherited by the SVG path.

---

## File Map

```
src/components/breadcrumb/
├── BreadcrumbItem.jsx               ← Individual item slot
├── Breadcrumb.jsx                   ← Trail assembly + WAI-ARIA nav
├── Breadcrumb.css                   ← All tokens, layout, state modifiers
├── Breadcrumb.stories.jsx           ← General stories (states, dividers, quantity, icon modes, dark)
├── Breadcrumb.overview.stories.jsx  ← AllCombinations + Playground
└── breadcrumb-spec.md               ← This file

src/components/icons/
└── ChevronRightSmall.jsx            ← Arrow divider icon (shared)

src/design-tokens/
└── tokens.css                       ← 5 breadcrumb tokens × 2 modes = 10 declarations
```

---

## V1 Scope Boundaries

| Item | Status | Notes |
|---|---|---|
| Default + Active states | ✅ Implemented | |
| Text label items | ✅ Implemented | |
| Icon-only items | ✅ Implemented | Requires `ariaLabel` prop |
| Icon + Text items | ✅ Implemented | |
| Arrow / Slash / Dot dividers | ✅ Implemented | |
| Quantity 3–5 | ✅ Implemented | `items` array |
| Hover state | ❌ Not in scope | Not defined in Figma V1 |
| Disabled state | ❌ Not in scope | Not defined in Figma V1 |
| Focus state | ❌ Not in scope | Not defined in Figma V1 — WCAG gap |
| Size variants | ❌ Not in scope | Single 20px height only |
| Quantity 6+ | ❌ Not in scope | Not in Figma V1 |

---

## DS Gaps

| Gap | Impact | Owner |
|---|---|---|
| No Hover state | Interaction fidelity | DS Auditor to define token + variant |
| No Disabled state | Accessibility | DS Auditor to define token + variant |
| No Focus state | WCAG 2.4.7 violation | DS Auditor — high priority |
| Active state not enforced by group | Logic managed in consuming code | Acceptable V1 trade-off |
| Icon named `rose, flower, romance, love` | Semantic clarity | DS to rename |
| Token values derived (Figma Bridge offline) | Hex values unverified | Verify on next Figma-connected session |
