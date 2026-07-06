# Component Spec — Button Group

**Component:** `ButtonGroup` + `ButtonGroupItem`
**DS Version:** v2.1.0
**Implemented:** 03/07/2026
**Figma source:** Design System Scalable V.2.1.0 → `↳button-group` (node `2271:7422`) + `↳button-group-items` (node `2271:7498`)
**File key:** `0aVnOgjVWH1YL8JCnjXTBi`

---

## 1. Component Architecture

Two-component system.

| Component | File | Role |
|---|---|---|
| `ButtonGroup` | `ButtonGroup.jsx` | Container — outer border, radius, overflow clip, item orchestration |
| `ButtonGroupItem` | `ButtonGroupItem.jsx` | Individual slot — content, state, 1px all-sides border |

Internal dividers are **not explicit elements** — they emerge from overlapping 1px CENTER-aligned borders on adjacent items at `gap: 0`.

---

## 2. Props API

### ButtonGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `Item[]` | `[]` | Array of item definitions (see Item shape below) |
| `size` | `'small' \| 'x-small' \| '2x-small'` | `'small'` | Uniform size applied to all items |
| `value` | `string \| number` | `undefined` | Controlled: active item value |
| `onChange` | `(value) => void` | `null` | Controlled: called on item click |
| `defaultValue` | `string \| number` | `undefined` | Uncontrolled: initial active item value |
| `aria-label` | `string` | `'Options'` | Accessible label for the group (`role="group"`) |
| `className` | `string` | `''` | Additional CSS class on container |

**Item shape:**

```ts
{
  label:     string;           // Visible text
  value:     string | number;  // Unique identifier
  leftIcon?: ReactNode;        // Icon left of label
  rightIcon?: ReactNode;       // Icon right of label (ignored when onlyIcon)
  onlyIcon?: boolean;          // Hide label — ariaLabel required
  ariaLabel?: string;          // Required when onlyIcon=true
  disabled?: boolean;          // Disable this item independently
}
```

### ButtonGroupItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `'Button'` | Visible text — hidden when `onlyIcon=true` |
| `size` | `'small' \| 'x-small' \| '2x-small'` | `'small'` | Size modifier |
| `state` | `'default' \| 'hover' \| 'active' \| 'disabled'` | `'default'` | Visual state |
| `onlyIcon` | `boolean` | `false` | Icon-only mode — hides label |
| `leftIcon` | `ReactNode` | `null` | Left icon slot |
| `rightIcon` | `ReactNode` | `null` | Right icon slot (ignored when `onlyIcon`) |
| `onClick` | `function` | `null` | Click handler |
| `aria-label` | `string` | `''` | Required when `onlyIcon=true` |
| `className` | `string` | `''` | Additional CSS class |

---

## 3. Variants

### ButtonGroup

| Axis | Values |
|---|---|
| `✌️ Quantity` | 2, 3, 4, 5, 6 |
| `📏 Size` | Small (36), X-Small (32), 2X-Small (24) |

### ButtonGroupItem

| Axis | Values |
|---|---|
| `📌 State` | Default, Hover, Active, Disabled |
| `📏 Size` | Small (36), X-Small (32), 2X-Small (24) |
| `🔳 Only Icon` | Off, On |
| `⬅️ Left Icon` | Off, On |
| `➡️ Right Icon` | Off, On |

---

## 4. Size & Dimensions

| Size | Height | Pad T/B | Pad L/R | Gap | Font size | Container radius |
|---|---|---|---|---|---|---|
| Small (36) | 36px | 8px | 16px | 8px | 14px | 8px (`--radius-8`) |
| X-Small (32) | 32px | 6px | 14px | 6px | 14px | 8px (`--radius-8`) |
| 2X-Small (24) | 24px | 4px | 12px | 4px | 12px | 6px (`--radius-6`) |

**Container width:** `inline-flex` — width determined by content. Do not hardcode the Figma canvas value.

**Item corner radius:** 0 — no per-item radius. Container clips corners via `overflow: hidden`.

---

## 5. States

| State | Item BG | Label token | Icon token | Border token |
|---|---|---|---|---|
| Default | `--button-group-item-bg-default` | `--button-group-item-text-default` | `--button-group-item-icon-default` | `--button-group-item-border-default` |
| Hover | `--button-group-item-bg-hover` | `--button-group-item-text-default` | `--button-group-item-icon-default` | `--button-group-item-border-default` |
| Active | `--button-group-item-bg-active` | `--button-group-item-text-active` | `--button-group-item-icon-active` | `--button-group-item-border-default` |
| Disabled | `--button-group-item-bg-hover`* | `--button-group-item-text-disabled` | `--button-group-item-icon-disabled` | `--button-group-item-border-disabled` |

\* Disabled item bg reuses `bg-hover` token (`surface/neutral/weak`) — no separate disabled-bg token exists in DS.

**State behavior:**
- Container fill and border do NOT change across states — only item-level tokens shift
- Hover and Active share the same BG (`surface/neutral/weak`) — distinguished by label/icon color
- Each item's state is independent — one can be Active while others are Default
- Exactly one item should be Active at a time (enforced by consumer, not component)

---

## 6. Token Map

### Light mode (`:root`) + Dark mode (`[data-theme="dark"]`)

| CSS Variable | DS Token | Alias | Light | Dark |
|---|---|---|---|---|
| `--button-group-bg` | `button-group/bg` | `surface/neutral/white` | `#ffffff` | `#24262e` |
| `--button-group-border` | `button-group/border` | `border/neutral/default` | `#d1d1d1` | `#6b7189` |
| `--button-group-item-bg-default` | `button-group-item/bg/default` | `surface/neutral/white` | `#ffffff` | `#24262e` |
| `--button-group-item-bg-hover` | `button-group-item/bg/hover` | `surface/neutral/weak` | `#f6f7f8` | `#2d2f39` |
| `--button-group-item-bg-active` | `button-group-item/bg/active` | `surface/neutral/weak` | `#f6f7f8` | `#2d2f39` |
| `--button-group-item-border-default` | `button-group-item/border/default` | `border/neutral/soft` | `#eaeaea` | `#515567` |
| `--button-group-item-border-disabled` | `button-group-item/border/disabled` | `border/neutral/soft` | `#eaeaea` | `#515567` |
| `--button-group-item-icon-default` | `button-group-item/icon/default` | `icon/sub` | `#5c5c5c` | `#ccced7` |
| `--button-group-item-icon-active` | `button-group-item/icon/active` | `icon/strong` | `#1c1c1c` | `#ffffff` |
| `--button-group-item-icon-disabled` | `button-group-item/icon/disabled` | `icon/dissabled` ⚠️ | `#d1d1d1` | `#989dae` |
| `--button-group-item-text-default` | `button-group-item/text/default` | `text/neutral/subtle` | `#7b7b7b` | `#ccced7` |
| `--button-group-item-text-active` | `button-group-item/text/active` | `text/neutral/strong` | `#1c1c1c` | `#ffffff` |
| `--button-group-item-text-disabled` | `button-group-item/text/disabled` | `state/disabled-text` | `#d1d1d1` | `#989dae` |

⚠️ `icon/dissabled` typo is DS-intentional — do not rename.

**Token resolution method:** Values derived from `--color-*` primitives already present in `tokens.css` (synced 22/06/2026) since Figma Desktop Bridge was not connected at implementation time. Subject to verification on next Figma sync.

---

## 7. Typography

| Size | Font | Weight | Size | Line height |
|---|---|---|---|---|
| Small (36) | Open Sans | SemiBold (600) | 14px (`--font-size-body-md`) | 143% |
| X-Small (32) | Open Sans | SemiBold (600) | 14px (`--font-size-body-md`) | 143% |
| 2X-Small (24) | Open Sans | SemiBold (600) | 12px (`--font-size-body-sm`) | 143% |

Typography not tokenized at the component level per DS spec. Font size is implemented as a literal value per size modifier.

---

## 8. Border Architecture

| Location | Weight | Token | Note |
|---|---|---|---|
| Container outer border | 1px | `--button-group-border` | Structural outline of the whole group |
| Item border | none | — | Items have NO border of their own |
| Divider between items | 1px | `--button-group-item-border-default` | `border-left` on every non-first item via `+` sibling selector |

**Divider mechanics:** No separate divider elements. A `border-left` on `.button-group-item + .button-group-item` creates a 1px vertical line between each adjacent pair. The container's `overflow: hidden` clips the divider flush to the top and bottom edges.

**Why not `border: 1px all-sides` per item?** Figma uses "1px CENTER stroke on all sides" on items, which Figma clips to the container bounds. In CSS, `border: 1px solid` is rendered fully inside the element's layout box — `overflow: hidden` does not clip it. The result is each item rendering a visible rectangular border inside the group (the "separate boxes" bug). The `border-left` sibling approach produces the correct visual: outer container border + 1px vertical dividers only.

---

## 9. CSS Architecture

```
.button-group                           Container — inline-flex, outer border, radius, overflow:hidden
  .button-group--small                  Size modifier (radius 8px)
  .button-group--x-small               Size modifier (radius 8px)
  .button-group--2x-small              Size modifier (radius 6px)

.button-group-item                      Item — NO border, bg-default, text-default
  + .button-group-item                  Divider — border-left 1px on non-first items only
  .button-group-item--small            Size: h=36, pad=8/16, gap=8, font=14px
  .button-group-item--x-small         Size: h=32, pad=6/14, gap=6, font=14px
  .button-group-item--2x-small        Size: h=24, pad=4/12, gap=4, font=12px
  .button-group-item--hover           State: bg-hover
  .button-group-item--active          State: bg-active, text-active, icon-active
  .button-group-item--disabled        State: bg-hover (reuse), text-disabled, icon-disabled, cursor:not-allowed
  .button-group-item--only-icon       Only icon mode

.button-group-item__icon               Icon wrapper — color: var(--button-group-item-icon-*)
.button-group-item__label              Label text — inherits color from item
```

---

## 10. Icon Implementation

Icon color is applied via CSS `color` on `.button-group-item__icon`. SVG children inherit via `currentColor`.

- Default + Hover: `color: var(--button-group-item-icon-default)` → `icon/sub`
- Active: `color: var(--button-group-item-icon-active)` → `icon/strong`
- Disabled: `color: var(--button-group-item-icon-disabled)` → `icon/dissabled`

**Per Figma spec:** Token is applied at the `Vector` child level, not the instance level. In code, CSS `color` on the wrapper is sufficient — SVG `path` inherits via `fill="currentColor"`.

---

## 11. Accessibility

| Requirement | Implementation |
|---|---|
| Group role | `role="group"` on container + `aria-label` describing the group purpose |
| Active state | `aria-pressed="true"` on active item button |
| Icon-only | `aria-label` required on each icon-only button — no visible text fallback |
| Disabled items | `disabled` HTML attribute + `tabIndex={-1}` |
| Keyboard navigation | Tab enters/exits the group. Arrow key traversal within group: **not implemented** — see DS Gap |
| Focus ring | `:focus-visible` fallback applied (see DS Gap) |

---

## 12. File Map

| File | Role |
|---|---|
| `src/components/button-group/ButtonGroup.jsx` | Container component |
| `src/components/button-group/ButtonGroupItem.jsx` | Item component |
| `src/components/button-group/ButtonGroup.css` | Styles (container + item) |
| `src/components/button-group/ButtonGroup.stories.jsx` | `Components/Button Group/General` |
| `src/components/button-group/ButtonGroup.overview.stories.jsx` | `Components/Button Group/Overview` |
| `src/components/button-group/button-group-spec.md` | This file |
| `src/design-tokens/tokens.css` | 26 button-group token declarations (light + dark) |

---

## 13. DS Gaps

| Gap | Impact | Owner |
|---|---|---|
| No Focus state in Figma | Accessibility — WCAG 2.4.7. No token or variant defined. | DS Auditor to define token + Figma variant. Fallback `:focus-visible` applied in code. |
| No arrow-key navigation defined | Accessibility — WCAG 2.1.1 (keyboard). No behavior spec. | DS Auditor + Accessibility lead to define. |
| `icon/dissabled` typo in token name | Code mapping confusion | DS Auditor to schedule rename sprint |
| Container `cornerRadius` not token-bound in Figma | Minor — values are correct (8px/6px) | DS Auditor: bind to `radius/8` and `radius/6` |
| Token values derived from `--color-*` primitives | Risk if DS updates theme tokens without syncing primitives | Re-verify on next Figma Desktop Bridge session |
| No Loading state | Not in V1 scope | — |
| No `Primary`/`Error` type | Single neutral treatment only in V1 scope | — |
| Quantity > 6 | Not in scope | Use dropdown for > 6 options |

---

## 14. Open Questions

1. **Arrow key navigation** — should items be navigable with left/right arrow keys (radio group pattern) or is Tab-only acceptable? Needs accessibility spec.
2. **`aria-pressed` vs `aria-checked`** — usage spec recommends `role="radiogroup"` + `aria-checked`. Current implementation uses `aria-pressed` on `<button>`. Confirm pattern with accessibility lead.
3. **Token value verification** — 13 tokens derived from `--color-*` primitives. Verify against Figma theme collection on next connected session.
