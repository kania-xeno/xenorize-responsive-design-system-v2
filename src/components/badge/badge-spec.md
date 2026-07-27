# Badge — Implementation Spec

Source: Figma "Design System Scalable — All Platform V.2.1.0 → ❖ badge"
Component set: `2008:2857`, page: `❖ Badges` (`2008:2806`)
DS version: v2.1.0
Implemented: 30/06/2026 | Updated: 30/06/2026 (v2 — typography + spacing revisions)

---

## Props API

```ts
interface BadgeProps {
  type?:          'basic' | 'dot' | 'left-icon' | 'right-icon'; // default: 'basic'
  badgeStyle?:    'filled' | 'light' | 'lighter' | 'stroke';    // default: 'filled'
  color?:         'gray' | 'blue' | 'orange' | 'red' | 'green'
                | 'purple' | 'sky' | 'pink' | 'teal';           // default: 'gray'
  size?:          'small' | 'medium';                           // default: 'small'
  label?:         string;    // Text label — basic, dot, left-icon, right-icon types
  number?:        string;    // Number=On count label — basic type only. Replaces label. Same text style as label for its size.
  icon?:          ReactComponent; // Default: BubbleAlert. Any icon from Icon System V.2.0.0.
  showIcon?:      boolean;   // Show/hide icon slot. Default: true
  disabled?:      boolean;   // Disabled=On. Default: false
  className?:     string;
}
```

Note: prop is named `badgeStyle` (not `style`) to avoid collision with the HTML `style` attribute.

---

## Layout Types

### Basic
`[label]` or `[number]` — text only, no icon or dot.
Number=On activates when the `number` prop is set on `type="basic"`. Uses the same text style as the label for its size (micro/regular for small, caption/regular for medium) — no weight override.

### With Dot
`[dot-container(4×4 circle)] [label]` — dot before label.
Dot color reuses `badge/{color}/{style}/text` token. No dedicated dot token in V1.
Dot container for Small is **14×14** (reduced from 16×16 in v2). Small now also has 2px vertical padding (was 0).

### Left Icon
`[icon] [label]` — icon before label.

### Right Icon
`[label] [icon]` — icon after label.

---

## Spacing

All spacing values bound to `responsive` collection `spacing/X` tokens. Updated v2 — 30/06/2026.

**Medium variants use asymmetric vertical padding (`paddingTop=2px`, `paddingBottom=4px`).** This is intentional optical alignment per Figma. Implement as-is.

| Type | Size | paddingTop | paddingBottom | paddingLeft | paddingRight | gap |
|---|---|---|---|---|---|---|
| Basic | Small | 2px ⬆ | 2px ⬇ | 8px | 8px | 2px |
| Basic | Medium | 2px | 4px ⚠ asymmetric | 10px | 10px | 2px |
| Number=On | Small | 2px | 2px | 4px | 4px | 2px |
| Number=On | Medium | 2px | 4px ⚠ asymmetric | 4px | 4px | 2px |
| With Dot | Small | 2px ⬆ | 2px ⬆ | 0 | 8px | 0 |
| With Dot | Medium | 2px | 4px ⚠ asymmetric | 2px | 8px | 0 |
| Left Icon | Small | 2px | 2px | 6px | 8px | 4px |
| Left Icon | Medium | 2px | 4px ⚠ asymmetric | 6px | 8px | 4px |
| Right Icon | Small | 2px | 2px | 8px | 6px | 4px |
| Right Icon | Medium | 2px | 4px ⚠ asymmetric | 8px | 6px | 4px |

⬆ = changed from v1 | ⚠ = asymmetric vertical (intentional)

---

## Typography

Updated v2 — 30/06/2026. Text styles now bound in Figma (DS Gap resolved). Small and Medium now differ in font size, line height, and letter spacing.

| Property | Small | Medium |
|---|---|---|
| Font | Open Sans | Open Sans |
| Weight — label | Regular (400) | Regular (400) |
| Weight — number | Regular (400) — same as label | Regular (400) — same as label |
| Font size | 10px | **12px** ⬆ |
| Line height | **150%** (1.5) ⬆ | **133%** (~1.33) ⬆ |
| Letter spacing | **0.5%** (0.005em) ⬆ | 0.2% (0.002em) |
| Text style | `micro/regular` ✅ tokenized | `caption/regular` ✅ tokenized |
| CSS vars | `--text-style-micro-regular-*` | `--text-style-caption-regular-*` |

⬆ = changed from v1

> ⚠️ **Stale note in handoff brief Section 11** (flagged for DS Auditor): "Small and Medium badges both use 10px font size. This is intentional per the current Figma spec." This line was not updated for v2 and contradicts Section 7 (Typography table) and Section 2 (Updates applied v2). Section 7 is the correct source of truth. Medium is 12px.

---

## Radius

`border-radius: 999px` — full pill. Bound to `radius-full` (responsive collection).

---

## Disabled State

Disabled=On has **no dedicated token namespace**. It reuses Stroke-style tokens regardless of which `badgeStyle` is selected.

Implementation: when `disabled=true`, Badge.jsx passes `data-style="stroke"` to the element. CSS `.badge--disabled` then overrides `--_badge-bg: transparent` and sets `--_badge-border-color` from the stroke token. The result is visually identical to the Stroke style for the given color.

| Role | Source |
|---|---|
| background | transparent |
| border | `badge/{color}/stroke/stroke` |
| text | `badge/{color}/stroke/text` |
| icon | `badge/{color}/stroke/icon` |

Opacity: 1. No node-level dimming.

---

## Token Reference — All 144 Tokens

Source: Figma component collection `badge/{color}/{style}/{role}`, resolved via theme collection light (1781:34) and dark (1781:35) modes. Extracted 30/06/2026.

### Gray

| Token | CSS Variable | Light | Dark |
|---|---|---|---|
| `badge/gray/filled/bg` | `--badge-gray-filled-bg` | `#1c1c1c` | `#ffffff` |
| `badge/gray/filled/text` | `--badge-gray-filled-text` | `#ffffff` | `#1b1c22` |
| `badge/gray/filled/icon` | `--badge-gray-filled-icon` | `#ffffff` | `#1b1c22` |
| `badge/gray/filled/stroke` | `--badge-gray-filled-stroke` | `#1c1c1c` | `#ffffff` |
| `badge/gray/light/bg` | `--badge-gray-light-bg` | `#f4f4f6` | `#2d2f39` |
| `badge/gray/light/text` | `--badge-gray-light-text` | `#1c1c1c` | `#ffffff` |
| `badge/gray/light/icon` | `--badge-gray-light-icon` | `#333333` | `#ccced7` |
| `badge/gray/light/stroke` | `--badge-gray-light-stroke` | `#f4f4f6` | `#2d2f39` |
| `badge/gray/lighter/bg` | `--badge-gray-lighter-bg` | `#f4f4f6` | `#2d2f39` |
| `badge/gray/lighter/text` | `--badge-gray-lighter-text` | `#7b7b7b` | `#989dae` |
| `badge/gray/lighter/icon` | `--badge-gray-lighter-icon` | `#7b7b7b` | `#989dae` |
| `badge/gray/lighter/stroke` | `--badge-gray-lighter-stroke` | `#f5f5f5` | `#2d2f39` |
| `badge/gray/stroke/bg` | `--badge-gray-stroke-bg` | `#ffffff` | `#1b1c22` |
| `badge/gray/stroke/text` | `--badge-gray-stroke-text` | `#333333` | `#ccced7` |
| `badge/gray/stroke/icon` | `--badge-gray-stroke-icon` | `#333333` | `#ccced7` |
| `badge/gray/stroke/stroke` | `--badge-gray-stroke-stroke` | `#d1d1d1` | `#6b7189` |

### Blue

| Token | CSS Variable | Light | Dark |
|---|---|---|---|
| `badge/blue/filled/bg` | `--badge-blue-filled-bg` | `#0d4896` | `#7cb0f4` |
| `badge/blue/filled/text` | `--badge-blue-filled-text` | `#ffffff` | `#1b1c22` |
| `badge/blue/filled/icon` | `--badge-blue-filled-icon` | `#ffffff` | `#1b1c22` |
| `badge/blue/filled/stroke` | `--badge-blue-filled-stroke` | `#0d4896` | `#7cb0f4` |
| `badge/blue/light/bg` | `--badge-blue-light-bg` | `#7cb0f4` | `#0d4896` |
| `badge/blue/light/text` | `--badge-blue-light-text` | `#0d4896` | `#7cb0f4` |
| `badge/blue/light/icon` | `--badge-blue-light-icon` | `#1264ce` | `#3182ed` |
| `badge/blue/light/stroke` | `--badge-blue-light-stroke` | `#7cb0f4` | `#0d4896` |
| `badge/blue/lighter/bg` | `--badge-blue-lighter-bg` | `#deebfc` | `#0a3671` |
| `badge/blue/lighter/text` | `--badge-blue-lighter-text` | `#0d4896` | `#7cb0f4` |
| `badge/blue/lighter/icon` | `--badge-blue-lighter-icon` | `#1264ce` | `#3182ed` |
| `badge/blue/lighter/stroke` | `--badge-blue-lighter-stroke` | `#deebfc` | `#0a3671` |
| `badge/blue/stroke/bg` | `--badge-blue-stroke-bg` | `#ffffff` | `#1b1c22` |
| `badge/blue/stroke/text` | `--badge-blue-stroke-text` | `#0d4896` | `#7cb0f4` |
| `badge/blue/stroke/icon` | `--badge-blue-stroke-icon` | `#1264ce` | `#3182ed` |
| `badge/blue/stroke/stroke` | `--badge-blue-stroke-stroke` | `#1264ce` | `#3182ed` |

### Orange

| Token | CSS Variable | Light | Dark |
|---|---|---|---|
| `badge/orange/filled/bg` | `--badge-orange-filled-bg` | `#3c2e00` | `#d2a106` |
| `badge/orange/filled/text` | `--badge-orange-filled-text` | `#ffffff` | `#1b1c22` |
| `badge/orange/filled/icon` | `--badge-orange-filled-icon` | `#ffffff` | `#1b1c22` |
| `badge/orange/light/bg` | `--badge-orange-light-bg` | `#f1c21b` | `#483700` |
| `badge/orange/light/text` | `--badge-orange-light-text` | `#3c2e00` | `#d2a106` |
| `badge/orange/light/icon` | `--badge-orange-light-icon` | `#684e00` | `#b28600` |
| `badge/orange/lighter/bg` | `--badge-orange-lighter-bg` | `#fddc69` | `#3c2e00` |
| `badge/orange/lighter/text` | `--badge-orange-lighter-text` | `#3c2e00` | `#d2a106` |
| `badge/orange/lighter/icon` | `--badge-orange-lighter-icon` | `#684e00` | `#b28600` |
| `badge/orange/stroke/text` | `--badge-orange-stroke-text` | `#3c2e00` | `#d2a106` |
| `badge/orange/stroke/icon` | `--badge-orange-stroke-icon` | `#684e00` | `#b28600` |
| `badge/orange/stroke/stroke` | `--badge-orange-stroke-stroke` | `#684e00` | `#b28600` |

### Red

| Token | CSS Variable | Light | Dark |
|---|---|---|---|
| `badge/red/filled/bg` | `--badge-red-filled-bg` | `#941010` | `#f17e7e` |
| `badge/red/filled/text` | `--badge-red-filled-text` | `#ffffff` | `#1b1c22` |
| `badge/red/light/bg` | `--badge-red-light-bg` | `#f17e7e` | `#941010` |
| `badge/red/light/text` | `--badge-red-light-text` | `#941010` | `#f17e7e` |
| `badge/red/light/icon` | `--badge-red-light-icon` | `#cb1515` | `#ea3434` |
| `badge/red/lighter/bg` | `--badge-red-lighter-bg` | `#fcdfdf` | `#6f0c0c` |
| `badge/red/lighter/text` | `--badge-red-lighter-text` | `#941010` | `#f17e7e` |
| `badge/red/lighter/icon` | `--badge-red-lighter-icon` | `#cb1515` | `#ea3434` |
| `badge/red/stroke/text` | `--badge-red-stroke-text` | `#941010` | `#f17e7e` |
| `badge/red/stroke/icon` | `--badge-red-stroke-icon` | `#cb1515` | `#ea3434` |
| `badge/red/stroke/stroke` | `--badge-red-stroke-stroke` | `#cb1515` | `#ea3434` |

### Green

| Token | CSS Variable | Light | Dark |
|---|---|---|---|
| `badge/green/filled/bg` | `--badge-green-filled-bg` | `#09421e` | `#82eeaa` |
| `badge/green/filled/text` | `--badge-green-filled-text` | `#ffffff` | `#1b1c22` |
| `badge/green/light/bg` | `--badge-green-light-bg` | `#82eeaa` | `#159845` |
| `badge/green/light/text` | `--badge-green-light-text` | `#09421e` | `#82eeaa` |
| `badge/green/light/icon` | `--badge-green-light-icon` | `#0f6d32` | `#57e88c` |
| `badge/green/lighter/bg` | `--badge-green-lighter-bg` | `#edfdf3` | `#09421e` |
| `badge/green/lighter/text` | `--badge-green-lighter-text` | `#09421e` | `#82eeaa` |
| `badge/green/lighter/icon` | `--badge-green-lighter-icon` | `#0f6d32` | `#57e88c` |
| `badge/green/stroke/text` | `--badge-green-stroke-text` | `#09421e` | `#82eeaa` |
| `badge/green/stroke/icon` | `--badge-green-stroke-icon` | `#0f6d32` | `#57e88c` |
| `badge/green/stroke/stroke` | `--badge-green-stroke-stroke` | `#0f6d32` | `#57e88c` |

### Purple

| Token | CSS Variable | Light | Dark |
|---|---|---|---|
| `badge/purple/filled/bg` | `--badge-purple-filled-bg` | `#302571` | `#9589d9` |
| `badge/purple/filled/text` | `--badge-purple-filled-text` | `#ffffff` | `#1b1c22` |
| `badge/purple/light/bg` | `--badge-purple-light-bg` | `#9589d9` | `#302571` |
| `badge/purple/light/text` | `--badge-purple-light-text` | `#302571` | `#9589d9` |
| `badge/purple/light/icon` | `--badge-purple-light-icon` | `#403297` | `#7263cc` |
| `badge/purple/lighter/bg` | `--badge-purple-lighter-bg` | `#dad6f2` | `#0f0c24` |
| `badge/purple/lighter/text` | `--badge-purple-lighter-text` | `#302571` | `#9589d9` |
| `badge/purple/lighter/icon` | `--badge-purple-lighter-icon` | `#403297` | `#7263cc` |
| `badge/purple/stroke/text` | `--badge-purple-stroke-text` | `#302571` | `#9589d9` |
| `badge/purple/stroke/icon` | `--badge-purple-stroke-icon` | `#403297` | `#7263cc` |
| `badge/purple/stroke/stroke` | `--badge-purple-stroke-stroke` | `#403297` | `#7263cc` |

### Sky

| Token | CSS Variable | Light | Dark |
|---|---|---|---|
| `badge/sky/filled/bg` | `--badge-sky-filled-bg` | `#2597d0` | `#97dcff` |
| `badge/sky/filled/text` | `--badge-sky-filled-text` | `#ffffff` | `#1b1c22` |
| `badge/sky/light/bg` | `--badge-sky-light-bg` | `#97dcff` | `#2597d0` |
| `badge/sky/light/text` | `--badge-sky-light-text` | `#2597d0` | `#97dcff` |
| `badge/sky/light/icon` | `--badge-sky-light-icon` | `#35ade9` | `#68cdff` |
| `badge/sky/lighter/bg` | `--badge-sky-lighter-bg` | `#d5f1ff` | `#18658b` |
| `badge/sky/lighter/text` | `--badge-sky-lighter-text` | `#2597d0` | `#97dcff` |
| `badge/sky/lighter/icon` | `--badge-sky-lighter-icon` | `#35ade9` | `#68cdff` |
| `badge/sky/stroke/text` | `--badge-sky-stroke-text` | `#2597d0` | `#97dcff` |
| `badge/sky/stroke/icon` | `--badge-sky-stroke-icon` | `#35ade9` | `#68cdff` |
| `badge/sky/stroke/stroke` | `--badge-sky-stroke-stroke` | `#35ade9` | `#68cdff` |

### Pink

| Token | CSS Variable | Light | Dark |
|---|---|---|---|
| `badge/pink/filled/bg` | `--badge-pink-filled-bg` | `#d0257a` | `#ff97cb` |
| `badge/pink/filled/text` | `--badge-pink-filled-text` | `#ffffff` | `#1b1c22` |
| `badge/pink/light/bg` | `--badge-pink-light-bg` | `#ff97cb` | `#d0257a` |
| `badge/pink/light/text` | `--badge-pink-light-text` | `#d0257a` | `#ff97cb` |
| `badge/pink/light/icon` | `--badge-pink-light-icon` | `#e9358f` | `#ff68b3` |
| `badge/pink/lighter/bg` | `--badge-pink-lighter-bg` | `#ffd5ea` | `#8b1852` |
| `badge/pink/lighter/text` | `--badge-pink-lighter-text` | `#d0257a` | `#ff97cb` |
| `badge/pink/lighter/icon` | `--badge-pink-lighter-icon` | `#e9358f` | `#ff68b3` |
| `badge/pink/stroke/text` | `--badge-pink-stroke-text` | `#d0257a` | `#ff97cb` |
| `badge/pink/stroke/icon` | `--badge-pink-stroke-icon` | `#e9358f` | `#ff68b3` |
| `badge/pink/stroke/stroke` | `--badge-pink-stroke-stroke` | `#e9358f` | `#ff68b3` |

### Teal

| Token | CSS Variable | Light | Dark |
|---|---|---|---|
| `badge/teal/filled/bg` | `--badge-teal-filled-bg` | `#1daf9c` | `#84ebdd` |
| `badge/teal/filled/text` | `--badge-teal-filled-text` | `#ffffff` | `#1b1c22` |
| `badge/teal/light/bg` | `--badge-teal-light-bg` | `#84ebdd` | `#178c7d` |
| `badge/teal/light/text` | `--badge-teal-light-text` | `#1daf9c` | `#84ebdd` |
| `badge/teal/light/icon` | `--badge-teal-light-icon` | `#22d3bb` | `#3fdec9` |
| `badge/teal/lighter/bg` | `--badge-teal-lighter-bg` | `#cffbf5` | `#16645a` |
| `badge/teal/lighter/text` | `--badge-teal-lighter-text` | `#1daf9c` | `#84ebdd` |
| `badge/teal/lighter/icon` | `--badge-teal-lighter-icon` | `#22d3bb` | `#3fdec9` |
| `badge/teal/stroke/text` | `--badge-teal-stroke-text` | `#1daf9c` | `#84ebdd` |
| `badge/teal/stroke/icon` | `--badge-teal-stroke-icon` | `#22d3bb` | `#3fdec9` |
| `badge/teal/stroke/stroke` | `--badge-teal-stroke-stroke` | `#22d3bb` | `#3fdec9` |

---

## Icon Implementation

| Icon | Component | Node | Variant | Render size | Used on |
|---|---|---|---|---|---|
| bubble-alert | `BubbleAlert.jsx` | `9:77916` | filled=on, stroke=1, radius=0, join=round | 12×12px | Left Icon + Right Icon types |

Frame: 24×24. Vector child: x=3, y=3, w=18, h=18.5. SVG uses `<g transform="translate(3 3)">` to position path in 24×24 viewBox. `fill="currentColor"`, `aria-hidden="true"`.

Default render size is `width=12 height=12` (badge usage). Can be overridden via props.

Icon color: `currentColor` inherits from `.badge__icon { color: var(--_badge-icon) }`.

Icon instance swap: pass any icon component from Icon System V.2.0.0 via the `icon` prop. The component must use `currentColor` and `aria-hidden="true"` on its SVG.

---

## Accessibility

- Badge is a visual indicator — not focusable, not interactive.
- Do not add `tabIndex`, `role="button"`, or event handlers.
- Icon is decorative — `aria-hidden="true"` on the SVG.
- Do not use badge as the sole status indicator — always pair with visible text.
- For Number=On (notification counts): the parent element must provide accessible context (e.g., "Inbox, 3 unread messages" via `aria-label`).
- All token combinations are calibrated to meet WCAG 2.1 AA (4.5:1 text contrast). Verify if any custom tokens are added.

---

## CSS Architecture

Scoped local CSS custom properties per color+style combination:

```css
.badge[data-color="blue"][data-style="filled"] {
  --_badge-bg:   var(--badge-blue-filled-bg);
  --_badge-text: var(--badge-blue-filled-text);
  --_badge-icon: var(--badge-blue-filled-icon);
}
```

Base `.badge` rule consumes only `--_badge-bg`, `--_badge-text`, `--_badge-border-color`. No color logic in the base rule. 36 attribute combos (9 colors × 4 styles).

Stroke style and disabled both use `--_badge-bg: transparent` and `--_badge-border-color: var(--badge-{color}-stroke-stroke)`.

---

## File Map

| File | Purpose |
|---|---|
| `Badge.jsx` | Component implementation |
| `Badge.css` | All styles — scoped vars + base rules |
| `Badge.stories.jsx` | General stories (`Components/Badge/General`) |
| `Badge.overview.stories.jsx` | Overview stories (`Components/Badge/Overview`) |
| `badge-spec.md` | This file |
| `src/components/icons/BubbleAlert.jsx` | Default icon |
| `src/design-tokens/tokens.css` | 144 `--badge-*` tokens (light + dark) |

---

## DS Gaps

| Gap | Impact | Status |
|---|---|---|
| Yellow variant | `badge/yellow/*` tokens exist (16 vars) but no Figma variant | DS Auditor decision pending |
| Disabled token namespace | Disabled reuses Stroke tokens — no dedicated `badge/{color}/disabled/*` | Acceptable for V1. Document for DS roadmap. |
| Dot color token | Dot uses `text` token — cannot style dot independently | DS Auditor decision required if divergence needed |
| ~~Typography text style~~ | ~~Font not bound to a named DS text style~~ | ✅ Resolved — `micro/regular` (small) and `caption/regular` (medium) bound and tokenized via `--text-style-*` vars. Number=On confirmed to share the same text style as label — no weight override. |
| Hover/Focus/Pressed/Loading | Not defined in Figma — badge is display-only by design | Not a gap, by intention |

---

## Open Items

- **Yellow:** `badge/yellow/*` tokens exist in component collection (16 vars). Pending DS Auditor decision to add variant or remove tokens.
- **Dot independence:** If design requires dot color ≠ text color, a dedicated `badge/{color}/{style}/dot` token is needed. Requires DS Auditor.
- **Disabled namespace:** If disabled and stroke need to diverge visually, a `badge/{color}/disabled/*` namespace is required. Not needed for V1.
