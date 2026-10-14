# Button Special — Implementation Spec

**Design System:** Scalable V.2.1.0  
**Figma node:** `↳buttons-special` — `2015:333`  
**File key:** `0aVnOgjVWH1YL8JCnjXTBi` · **Page:** ❖ Button  
**Component key:** `d383123d2e8b55c6e148a50f80b52bce6f27f7b8`  
**Status:** Production — DT-D2 through DT-D4 complete  
**Last updated:** 2026-10-14

---

## 1. Component Identity and Canonical Figma Source

| Field | Value |
|---|---|
| Component set name | `↳buttons-special` |
| Node ID | `2015:333` |
| Type | `COMPONENT_SET` |
| Child count | 36 variants |
| Page | ❖ Button |
| File | Design System Scalable - All Platform-V.2.1.0 |
| File key | `0aVnOgjVWH1YL8JCnjXTBi` |

> Figma is the visual source of truth. This spec reflects the current implementation contract. Any visual discrepancy between source and this spec must be escalated to the DS Auditor, not resolved locally.

---

## 2. Source File Inventory

```
src/components/button-special/
├── ButtonSpecial.jsx          ← runtime component (250 lines)
├── ButtonSpecial.css          ← all styles and token bindings (384 lines)
├── ButtonSpecial.stories.jsx  ← 15 production stories (1106 lines)
├── button-special-spec.md     ← this file
└── index.js                   ← re-export convenience (5 lines)
```

**Token definitions:** `src/design-tokens/tokens.css` — all `--button-special-*` tokens at lines 1770–1831 (light) and 2039–2041 (dark overrides).

**Token source:** `src/design-tokens/tokens.json`

**Handoff and phase reports:** Stored in `/handoffs/Component/` (A0–A3) and the DT project root (DT-D0 through DT-D4). Do not move these into `src/components/`.

---

## 3. Variant Matrix

**36 variants = 4 Types × 3 States × 3 Sizes.** Matrix is complete — no gaps, no extras.

| Axis | Figma property | Values | Count |
|---|---|---|---|
| Type | `🧩 Type` | Neutral, Basic, Primary, Destructive | 4 |
| State | `📌 State` | Default, Hover, Disabled | 3 |
| Size | `📏 Size` | Medium (40), Small (36), X-Small (32) | 3 |

Active, Pressed, Focus, and Loading are **absent from the Figma matrix**. Do not implement as variant states.

---

## 4. Runtime Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"neutral"\|"basic"\|"primary"\|"destructive"` | `"neutral"` | Visual style. Maps to Figma `🧩 Type`. Generates CSS class `button-special--{variant}`. Named `variant` to avoid collision with native button `type` attr (DD-02.1). |
| `type` | `"button"\|"submit"\|"reset"` | `"button"` | Native HTML button `type`. Forwarded to `<button>`. Default `"button"` prevents accidental form submission. |
| `size` | `"medium"\|"small"\|"x-small"` | `"medium"` | Maps to Figma `📏 Size`. No Large (DD-12). |
| `disabled` | `boolean` | `false` | Native HTML `disabled`. Maps to Figma `📌 State=Disabled`. NOT `aria-disabled` (DD-06). |
| `children` | `ReactNode` | — | Label text. Maps to Figma `✏️ Edit Text`. |
| `showLabel` | `boolean` | `true` | Whether the label slot renders. Maps to Figma `✏️ Show Text`. |
| `showLeftIcon` | `boolean` | `true` | Whether left icon slot renders. Maps to Figma `⬅️ Left Icon`. |
| `showRightIcon` | `boolean` | `true` | Whether right icon slot renders. Maps to Figma `➡️ Right Icon`. |
| `leftIcon` | `ReactNode` | `<ArrowLeftSLine />` | Custom left icon. Maps to Figma `⬅️ Pick Left` (default: node 1941:85). |
| `rightIcon` | `ReactNode` | `<ArrowRightSLine />` | Custom right icon. Maps to Figma `➡️ Pick Right` (default: node 1941:83). |
| `aria-label` | `string` | — | Accessible name. Required when label is not rendered (DD-07). |
| `aria-labelledby` | `string` | — | ID reference for accessible name. Satisfies DD-07 when `aria-label` is absent. |
| `ref` | `React.Ref` | — | Forwarded to native `<button>`. React 19 direct-ref pattern. |
| `className` | `string` | `""` | Additional CSS classes appended to the component class list. |
| `...rest` | `object` | — | All additional native button attributes forwarded to `<button>` (onClick, data-*, name, value, etc.). |

### Dev-mode guards (dev only, no production overhead)

- Invalid `variant`, `type`, or `size` → `console.warn` with fallback
- Icon-only / empty label without `aria-label` or `aria-labelledby` → `console.warn` (DD-07)
- No visible content at all → separate `console.warn`

---

## 5. Anatomy

```
<button class="button-special button-special--{variant} button-special--{size}">

  [::before]  ← gradient stroke ring (HC-01)
               Neutral, Primary, Destructive non-disabled only.
               Basic has NO ::before in any state.

  [::after]   ← gradient overlay (--bs-overlay)
               Neutral, Primary, Destructive non-disabled only.
               Basic has NO ::after in any state.

  <span class="button-special__icon button-special__icon--left" aria-hidden="true">
    {leftIconEl}           ← default: <ArrowLeftSLine />
  </span>

  <span class="button-special__label">
    {children}
  </span>

  <span class="button-special__icon button-special__icon--right" aria-hidden="true">
    {rightIconEl}          ← default: <ArrowRightSLine />
  </span>

</button>
```

Render slots respect `showLeftIcon`, `showLabel`, `showRightIcon` booleans.

---

## 6. Size and Geometry

| Size | Height | Padding (all sides) | Border radius | Icon size | Gap (slots) | Width |
|---|---|---|---|---|---|---|
| medium | 40px | 10px | `--radius-10` | 20×20px | 4px | HUG (content-driven) |
| small | 36px | 8px | `--radius-8` | 20×20px | 4px | HUG (content-driven) |
| x-small | 32px | 6px | `--radius-8` | 20×20px | 4px | HUG (content-driven) |

DD-11: Medium=`--radius-10`, Small=`--radius-8`, X-Small=`--radius-8`.  
No Large size (DD-12 — out of scope).  
Label: 4px horizontal padding inside `.button-special__label` (matches Figma Text frame `paddingLeft=4 paddingRight=4`).

---

## 7. Type / State Visual Contract

### Neutral

| State | Background | Text | Icon | Box-shadow | Overlay | Stroke |
|---|---|---|---|---|---|---|
| Default | `--prim-neutral-950` `#161616` | `--color-text-white` | `--color-icon-inverse` | `--button-special-shadow-neutral` | `--button-special-overlay-neutral-default` (0.16) | HC-01 ✅ |
| Hover | (unchanged) | `--button-special-text-neutral-hover` | `--button-special-icon-neutral-hover` | same | `--button-special-overlay-neutral-hover` (0.24) | HC-01 ✅ |
| Disabled | `--button-special-bg-neutral-disabled` | `--color-text-disabled` | `--button-special-icon-neutral-disabled` | none | none | none |
| Focus-visible | — | — | — | + `--shadow-focus-ring-neutral` | — | — |

### Basic

| State | Background | Text | Icon | Box-shadow | Overlay | Stroke |
|---|---|---|---|---|---|---|
| Default | `--color-surface-white` `#ffffff` | `--color-text-default` | inherits text | ring (`0 0 0 1px --color-surface-weak`) + ambient | none | none |
| Hover | `--color-surface-soft-alt` `#ebecef` | `--button-special-text-basic-hover` | `--button-special-icon-basic-hover` | none (ZERO effects) | none | none |
| Disabled | `--button-special-bg-basic-disabled` | `--color-text-disabled` | `--button-special-icon-basic-disabled` | none | none | none |
| Focus-visible | — | — | — | + `--shadow-focus-ring-neutral` (stacked with default) | — | — |

> Basic is the only type with ZERO effects on Hover. No gradient stroke or gradient overlay in any Basic state.

### Primary

| State | Background | Text | Icon | Box-shadow | Overlay | Stroke |
|---|---|---|---|---|---|---|
| Default | `--button-fill-primary-bg` `#302571` | `--color-text-white` | `--color-icon-inverse` | ring (`0 0 0 1px --color-brand-primary`) + ambient | `--button-special-overlay-primary-default` (61.1% stop, 0.16) | HC-01 ✅ |
| Hover | `--button-fill-primary-bg-hover` `#403297` | `--button-special-text-primary-hover` | `--button-special-icon-primary-hover` | same | `--button-special-overlay-primary-hover` (61.1% stop, 0.24) | HC-01 ✅ |
| Disabled | `--button-special-bg-primary-disabled` | `--color-text-disabled` | `--button-special-icon-primary-disabled` | none | none | none |
| Focus-visible | — | — | — | + `--shadow-focus-ring-primary` | — | — |

### Destructive

| State | Background | Text | Icon | Box-shadow | Overlay | Stroke |
|---|---|---|---|---|---|---|
| Default | `--button-fill-destructive-bg` `#cb1515` | `--color-text-white` | `--color-icon-inverse` | ring (`0 0 0 1px --status-danger-base`) + ambient | `--button-special-overlay-destructive-default` (0% stop, 0.16) | HC-01 ✅ |
| Hover | same fill `#cb1515` | `--button-special-text-destructive-hover` | `--button-special-icon-destructive-hover` | same | `--button-special-overlay-destructive-hover` (0% stop, 0.24) | HC-01 ✅ |
| Disabled | `--button-special-bg-destructive-disabled` | `--color-text-disabled` | `--button-special-icon-destructive-disabled` | none | none | none |
| Focus-visible | — | — | — | + `--shadow-focus-ring-error` | — | — |

> Destructive Default and Hover share the same base fill. Hover differentiation is via overlay opacity change (0.16 → 0.24) only — not a fill change.

---

## 8. Token Contract

All `--button-special-*` tokens are defined in `tokens.css`. Light values at line 1770; dark overrides at line 2039.

### Background tokens

| Token | Resolves to | Light value |
|---|---|---|
| `--button-special-bg-neutral-disabled` | `--color-surface-soft` | `#f4f4f6` |
| `--button-special-bg-basic-disabled` | `--color-surface-weak` | `#f6f7f8` |
| `--button-special-bg-primary-disabled` | `--color-surface-weak` | `#f6f7f8` |
| `--button-special-bg-destructive-disabled` | `--color-surface-weak` | `#f6f7f8` |

### Text tokens

| Token | Resolves to | Light value |
|---|---|---|
| `--button-special-text-neutral-hover` | `--color-text-white` | `#ffffff` |
| `--button-special-text-basic-hover` | `--color-text-default` | `#333333` |
| `--button-special-text-primary-hover` | `--color-text-white` | `#ffffff` |
| `--button-special-text-destructive-hover` | `--color-text-white` | `#ffffff` |

### Icon tokens

| Token | Resolves to | Light value |
|---|---|---|
| `--button-special-icon-neutral-hover` | `--color-icon-inverse` | `#f7f7f7` |
| `--button-special-icon-neutral-disabled` | `--color-icon-disabled` | `#d1d1d1` |
| `--button-special-icon-basic-hover` | `--color-icon-sub` | `#5c5c5c` |
| `--button-special-icon-basic-disabled` | `--color-icon-disabled` | `#d1d1d1` |
| `--button-special-icon-primary-hover` | `--color-icon-inverse` | `#f7f7f7` |
| `--button-special-icon-primary-disabled` | `--color-icon-disabled` | `#d1d1d1` |
| `--button-special-icon-destructive-hover` | `--color-icon-inverse` | `#f7f7f7` |
| `--button-special-icon-destructive-disabled` | `--color-icon-disabled` | `#d1d1d1` |

> DD-09: icon/neutral, icon/destructive, and icon/primary hover all resolve to `--color-icon-inverse` — semantically correct per approved decision.  
> DD-10: Figma typo `icon/dissabled` → corrected to `--color-icon-disabled` in all disabled icon tokens.

### Effect tokens

| Token | Value |
|---|---|
| `--button-special-shadow-neutral` | `0 1px 2px rgba(27,28,29,0.48)` (HC-02) |
| `--button-special-stroke-gradient` | `linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)` (HC-01) |
| `--button-special-overlay-neutral-default` | `linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 100%)` |
| `--button-special-overlay-neutral-hover` | `linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)` |
| `--button-special-overlay-primary-default` | `linear-gradient(180deg, rgba(255,255,255,0.16) 61.1%, rgba(255,255,255,0) 100%)` (DD-08) |
| `--button-special-overlay-primary-hover` | `linear-gradient(180deg, rgba(255,255,255,0.24) 61.1%, rgba(255,255,255,0) 100%)` (DD-08) |
| `--button-special-overlay-destructive-default` | `linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 100%)` |
| `--button-special-overlay-destructive-hover` | `linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)` |

### Shared DS tokens consumed (not --button-special-*)

| Token | Role | Light value |
|---|---|---|
| `--prim-neutral-950` | Neutral fill | `#161616` (DD-01) |
| `--color-text-white` | Neutral/Primary/Destructive text | `#ffffff` |
| `--color-text-default` | Basic text | `#333333` |
| `--color-text-disabled` | All disabled text | `#c8c8c8` |
| `--color-icon-inverse` | Neutral/Primary/Destructive default icons | `#f7f7f7` |
| `--color-icon-disabled` | All disabled icons | `#d1d1d1` |
| `--color-icon-sub` | Basic hover icon | `#5c5c5c` |
| `--color-surface-white` | Basic default fill | `#ffffff` |
| `--color-surface-soft-alt` | Basic hover fill | `#ebecef` |
| `--color-surface-weak` | Basic ring (spread=1) | `#f6f7f8` |
| `--prim-alpha-black10` | Basic ambient shadow | `rgba(23,23,23,0.10)` |
| `--button-fill-primary-bg` | Primary default fill | `#302571` |
| `--button-fill-primary-bg-hover` | Primary hover fill | `#403297` |
| `--color-brand-primary` | Primary ring | `#403297` |
| `--prim-alpha-black24` | Primary/Destructive ambient shadow | `rgba(23,23,23,0.24)` |
| `--button-fill-destructive-bg` | Destructive fill | `#cb1515` |
| `--status-danger-base` | Destructive ring | `#cb1515` |
| `--shadow-focus-ring-primary` | Primary focus ring | (3-layer, see tokens.css L662) |
| `--shadow-focus-ring-neutral` | Neutral/Basic focus ring | (3-layer, see tokens.css L663) |
| `--shadow-focus-ring-error` | Destructive focus ring | (3-layer, see tokens.css L664) |
| `--radius-10` | Medium border radius | `10px` |
| `--radius-8` | Small/X-Small border radius | `8px` |
| `--text-style-body-semibold-md-font-family` | Font family | Open Sans |
| `--text-style-body-semibold-md-font-size` | Font size | `14px` |
| `--text-style-body-semibold-md-line-height` | Line height | `143%` (HC-06) |
| `--font-weight-semibold` | Font weight | `600` (DD-02) |

---

## 9. Gradient Stroke, Overlay, and Effect Architecture

### HC-01 — Gradient stroke (::before)

Applies to: **Neutral, Primary, Destructive non-disabled only.** Basic has no `::before` in any state.

```css
.button-special--{neutral|primary|destructive}:not(:disabled)::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  padding: 1px;  /* 1px INSIDE stroke */
  background: var(--button-special-stroke-gradient);
  /* Mask removes center, exposes gradient in 1px padding ring only */
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

`border-image` is NOT used — it breaks with `border-radius` (DD-04). The `::before` mask pattern is the approved implementation.

### HC-03/04 — Gradient overlay (::after)

Applies to: **Neutral, Primary, Destructive non-disabled only.** Basic has no `::after` in any state.

```css
.button-special--{neutral|primary|destructive}:not(:disabled)::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: var(--bs-overlay, none);  /* CSS custom property — set per type/state */
  pointer-events: none;
  transition: background 200ms ease-out;
}
```

The `--bs-overlay` CSS variable is set on each type class and overridden on `:hover`. This lets the overlay transition smoothly without class toggling.

### Z-index stacking

- `::before` and `::after`: `z-index: 0`
- `.button-special__icon` and `.button-special__label`: `position: relative` — rendered above pseudo-elements
- `isolation: isolate` on `.button-special` creates a stacking context, containing the layers

### Focus ring (DD-03)

Focus rings use the 3-layer `box-shadow` pattern (white ring + colored halo):

```
--shadow-focus-ring-primary: 0 0 0 2px #ffffff, 0 0 0 4px rgba(81,62,190,0.16)
--shadow-focus-ring-neutral: 0 0 0 2px #ffffff, 0 0 0 4px rgba(143,143,143,0.16)
--shadow-focus-ring-error:   0 0 0 2px #ffffff, 0 0 0 4px rgba(234,52,52,0.16)
```

Type → focus ring: Neutral=neutral, Basic=neutral, Primary=primary, Destructive=error.

For types with an existing `box-shadow` (e.g. Neutral's HC-02 shadow), the focus ring is **stacked** after the component shadow in the `box-shadow` declaration — both apply simultaneously.

---

## 10. Interaction and Disabled Behavior

### Hover transition

```
transition:
  background-color 200ms ease-out,
  color            200ms ease-out,
  box-shadow       200ms ease-out;
```

Overlay (`::after`) also transitions: `transition: background 200ms ease-out`.

Transition values from Figma prototype reactions (A3.13 — DISSOLVE 200ms EASE_OUT).

### Disabled

```css
.button-special:disabled {
  cursor: not-allowed;
  pointer-events: auto;  /* keeps cursor: not-allowed visible */
}
```

- Disabled state uses native HTML `disabled` attribute only (DD-06 — NOT `aria-disabled`)
- `pointer-events: auto` is intentional — allows `cursor: not-allowed` to render; does NOT make the button interactive (native `disabled` prevents all interaction)
- No `::before` or `::after` on disabled variants (`:not(:disabled)` selector)
- All disabled variants: bg from `--button-special-bg-{type}-disabled`, text from `--color-text-disabled`, icon from `--color-icon-disabled`, `box-shadow: none`

### Basic/Hover zero-effects

Basic/Hover has `box-shadow: none`. This is the only non-disabled active state with zero effects. Do not add back a shadow.

---

## 11. Accessibility Contract

| Requirement | Implementation |
|---|---|
| Icon slots invisible to AT | `aria-hidden="true"` on both `.button-special__icon` spans |
| Icon-only accessible name | `aria-label` or `aria-labelledby` required when `showLabel=false` or children is empty (DD-07 / A3-DEC-01). Dev-mode `console.warn` enforced. |
| Disabled semantics | Native `disabled` attribute (DD-06). `aria-disabled` not used. |
| Focus indicator | `:focus-visible` with `--shadow-focus-ring-{type}` per type. White ring + colored halo. |
| Focus scope | `:focus-visible` is triggered by keyboard/pointer (browser UA). Not simulated by a Figma Focus variant. |
| `ref` forwarding | Direct ref on `<button>` element (React 19 pattern). `ref.current instanceof HTMLButtonElement === true`. |
| Form submission | `type="button"` default prevents accidental form submission. `type="submit"` required explicitly for form controls. |

---

## 12. Storybook Coverage

**Title:** `Components/Button/Special/General` (unchanged from production)  
**File:** `src/components/button-special/ButtonSpecial.stories.jsx`  
**Tags:** `["autodocs"]`

| # | Export | Story name | Covers |
|---|---|---|---|
| 1 | `Playground` | Playground | Interactive controls for all props |
| 2 | `AllTypes` | All Types | All 4 types × all 3 sizes |
| 3 | `AllSizes` | All Sizes | All sizes per type |
| 4 | `StateMatrix` | State Matrix | All types × all states × all sizes |
| 5 | `IconConfiguration` | Icon Configuration | Left/right/both/text-only icon configurations |
| 6 | `IconOnlyAccessibleName` | Icon Only / Accessible Name | `aria-label` / icon-only usage |
| 7 | `CustomIcons` | Custom Icons | `leftIcon` / `rightIcon` overrides |
| 8 | `Disabled` | Disabled | All types disabled |
| 9 | `HoverValidation` | Hover Validation | Hover state per type |
| 10 | `DarkTheme` | Dark Theme | Token cascade in dark mode |
| 11 | `NativeSubmitAndReset` | Native Submit and Reset | `type="submit"` / `type="reset"` in forms |
| 12 | `KeyboardFocus` | Accessibility / Keyboard Focus | `:focus-visible` ring per type |
| 13 | `ContentEdgeCases` | Content Edge Cases | Empty children, zero, whitespace, booleans |
| 14 | `LongLabel` | Long Label / HUG Width | Width growth with long text |
| 15 | `RefForwarding` | Ref Forwarding | React 19 direct-ref; `instanceof HTMLButtonElement` check |

---

## 13. Supported and Unsupported States

### Supported (implemented)

| State | How triggered |
|---|---|
| Default | No modifiers |
| Hover | CSS `:hover:not(:disabled)` |
| Disabled | Native `disabled` attribute |
| Focus-visible | CSS `:focus-visible` |

### Not in scope / unsupported

| State | Reason |
|---|---|
| Loading | DD-05 / A2.2-DEC-03 — absent from Figma matrix; no tokens; not in scope |
| Active / Pressed | Absent from Figma matrix; no visual definition |
| Figma `📌 State=Focus` | Not present in the 36-variant matrix; `:focus-visible` is the production a11y behavior |
| Large size | DD-12 — does not exist in Figma |
| `aria-disabled` | DD-06 — native `disabled` only |
| `state` prop | Hover via CSS `:hover`; disabled via native `disabled`; no JS-driven state prop |

---

## 14. Known Limitations and Open Decisions

| Code | Description | Status |
|---|---|---|
| HC-01 | Gradient stroke (`rgba(255,255,255,0.12) → transparent`) — no Figma L3 backing; production-only component token. Mode-invariant (always white on colored bg). | Approved for production (DT-D1) |
| HC-02 | Neutral ambient shadow (`rgba(27,28,29,0.48)`) — not directly tokenized in Figma; encoded as `--button-special-shadow-neutral`. Mode-invariant. | Approved for production (DT-D1) |
| HC-03/04 | Primary and Destructive gradient overlays — no Figma L3 variable binding (Figma platform limitation). Encoded as `--button-special-overlay-{type}-*`. Mode-invariant. | Approved for production (DT-D1) |
| HC-05 | Overlay opacity values (0.16/0.24) are hardcoded gradient stops — Figma platform limitation, not a DS gap. | Accepted |
| HC-06/07 | Typography: line-height (143%) and letter-spacing (0%) are hardcoded — no token. | Accepted (low risk) |
| DD-08 | Primary overlay stop at exactly 61.1% — unique across all 36 variants. Preserved as-is per DD-08. Do not normalize to 0% or 100%. | Locked |
| Dark mode | All structural tokens (surfaces, text, icons, focus rings) are theme-adaptive. Effect tokens (HC-01 through HC-04) are mode-invariant — white gradients on colored backgrounds render acceptably at both modes. | Accepted |
| Figma desc | The `↳buttons-special` component set has no Figma description field. | DS gap — no action required from DT |

---

## 15. Regression Boundaries

Changes to this component **require** re-reading the Figma source before editing:

- Do not change any `--button-special-*` token value without a Figma-backed decision.
- Do not add gradient stroke (`::before`) to `Basic` — it has none in Figma.
- Do not add gradient overlay (`::after`) to `Basic` — it has none in Figma.
- Do not normalize Primary overlay stop from 61.1% to another value (DD-08).
- Do not add `aria-disabled`. Disabled semantics use native `disabled` only (DD-06).
- Do not add a `state` prop. Hover is CSS `:hover`; disabled is native `disabled`.
- Do not add a Loading state without a Figma definition and explicit scope approval (DD-05).
- Do not change the Storybook title from `Components/Button/Special/General`.
- Do not colocate A3, DT-D0–D4, or other phase/handoff reports inside `src/components/button-special/`.
- Do not compensate for token drift with local hardcoded CSS. Escalate to DS Auditor.

---

## 16. Maintenance and Source-of-Truth Rules

1. **Figma node 2015:333 is the visual source of truth.** Before any visual change, inspect the live Figma node.
2. **Token changes require Figma backing.** Any change to a `--button-special-*` token must trace to a Figma Auditor decision.
3. **This spec is updated after implementation, not before.** If a visual discrepancy is found, escalate to the DS Auditor. If an approved decision changes the implementation, update both `ButtonSpecial.css`, `tokens.css`, and this spec together.
4. **Handoff and phase reports stay outside `src/`.** `/handoffs/Component/` (A0–A3) and the DT project root (DT-D0–D4) are the audit trail. This spec is the living implementation contract.
5. **Use `variant` for type, `type` for behavior.** This is an intentional API decision (DT-D2.1) — `variant` drives visual style, `type` drives native button behavior. Do not rename either without updating all call sites and stories.
6. **React 19 direct-ref pattern.** `ref` is accepted as a direct prop — no `React.forwardRef` wrapper. Do not add `forwardRef` unless the React version changes require it.
