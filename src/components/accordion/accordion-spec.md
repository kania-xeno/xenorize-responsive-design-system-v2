# Accordion — Implementation Spec

Source: Figma "Design System Scalable — All Platform V.2.1.0 → ❖ Accordion"  
Component set: `2024:943`, page: `2024:936`  
DS version: v2.1.0  
Implemented: 29/06/2026

---

## Props API

```ts
interface AccordionProps {
  title:        string;    // Header label — always visible
  body:         string;    // Body content — visible when open
  flipIcon?:    boolean;   // false (default): info left + chevron right
                           // true: chevron left, no info icon
  defaultOpen?: boolean;   // Initial open state. Default: false
  className?:   string;    // Extra class names on the root element
}
```

---

## Layout Configurations

### Flip Icon = Off (default)

Structure: `[CircleInfo icon] [title text — fills] [chevron]`

Use for: FAQ lists, help text panels, settings explanations where the info icon adds contextual meaning.

### Flip Icon = On

Structure: `[chevron] [title text — fills]`

Use for: Navigation patterns, compact left-chevron-first layouts. The info icon is entirely absent — the text frame gains the icon's width. This is a structural difference, not a visual toggle.

---

## States — V1 Scope

V1 implements Default, Hover, and Active only. Focus and Disabled are DS gaps — see below.

### Default (Collapsed)

- Background: `--accordion-bg-default`
- Border: 1px solid `--accordion-border` ✓
- Shadow: `--accordion-shadow` (`0 1px 2px 0 rgba(23,23,23,0.04)`) ✓
- Info icon color: `--accordion-icon-soft` (muted)
- Chevron color: `--accordion-icon-default`
- Body: hidden

### Hover

- Background: `--accordion-bg-hover`
- Border: **none** (transparent — intentional DS design, not a bug)
- Shadow: **none** (intentional)
- Info icon color: `--accordion-icon-default` (shifts from muted to full-strength)
- Chevron color: `--accordion-icon-default`
- Body: hidden
- Transition: DISSOLVE 0.2s ease-out (background-color, border-color, box-shadow)

### Active (Open)

- Background: `--accordion-bg-active` (same resolved value as Hover — intentional)
- Border: none
- Shadow: none
- Info icon color: `--accordion-icon-default`
- Chevron: swaps to `ChevronTopSmall` to indicate expanded state
- Body: **visible** — `--accordion-text-body`
- Expand/collapse transition: SMART_ANIMATE 0.2s ease-out (grid-template-rows)

### Focus ⚠️ DS Gap — Not Implemented in V1

No `accordion/focus-ring` token exists in the DS component collection. The trigger's `:focus` outline is suppressed in V1 with a code comment flagging the WCAG 2.4.7 requirement. Pending DS Auditor approval for the appropriate focus ring token.

**Do not remove the code comment.** It documents the known gap and prevents future suppression without review.

### Disabled ⚠️ DS Gap — Not Implemented in V1

No `accordion/disabled/*` token namespace exists. Not in V1 scope. If needed, the recommended interim approach is `opacity: 0.4` with `pointer-events: none` + `aria-disabled="true"` — but this requires DS Auditor sign-off before implementation.

---

## Token Reference

| DS Token                | CSS Variable              | Light     | Dark      | Used on |
|-------------------------|---------------------------|-----------|-----------|---------|
| `accordion/bg/default`  | `--accordion-bg-default`  | `#ffffff` | `#24262e` | Container — Default, Focus |
| `accordion/bg/hover`    | `--accordion-bg-hover`    | `#f6f7f8` | `#2d2f39` | Container — Hover |
| `accordion/bg/active`   | `--accordion-bg-active`   | `#f6f7f8` | `#2d2f39` | Container — Active |
| `accordion/border`      | `--accordion-border`      | `#eaeaea` | `#515567` | Container border — Default only |
| `accordion/icon/soft`   | `--accordion-icon-soft`   | `#a3a3a3` | `#989dae` | Info icon — Default |
| `accordion/icon/default`| `--accordion-icon-default`| `#5c5c5c` | `#ccced7` | Info icon Hover/Active + Chevron all states |
| `accordion/text/title`  | `--accordion-text-title`  | `#1c1c1c` | `#ffffff` | Title text |
| `accordion/text/body`   | `--accordion-text-body`   | `#5c5c5c` | `#ccced7` | Body text |

`accordion/bg/hover` and `accordion/bg/active` alias the same theme token (`surface/neutral/weak`) and resolve identically in both modes. This is intentional DS design — not a bug.

`accordion/icon/default` and `accordion/text/body` alias the same theme token (`icon/sub`) and resolve identically in both modes.

Shadow token: `color/alpha/black/4` (primitive) → `rgba(23, 23, 23, 0.04)`. Applied as `--accordion-shadow` in tokens.css. Default and Focus states only.

---

## Icon Implementation

| Icon | Component | Node | Variant | Used on |
|------|-----------|------|---------|---------|
| Info (circle-info) | `CircleInfo.jsx` | `9:98583` | filled=on, stroke=1, radius=0, join=round | Left slot — Flip Icon = Off |
| Chevron down | `ChevronDownSmall.jsx` | `9:2273` | filled=off, stroke=1, radius=0, join=square | Chevron — collapsed state |
| Chevron up | `ChevronTopSmall.jsx` | `9:2212` | filled=off, stroke=1, radius=0, join=square | Chevron — expanded state |

All icons render at 20×20px. `CircleInfo` uses `viewBox="0 0 20 20"` (vector content fills the space). Chevron icons use `viewBox="0 0 24 24"` with the 8×4 chevron path centered at offset (8, 10) within the 24×24 component frame, preserving optical balance.

All icons inherit color via `currentColor`. No hardcoded colors.

---

## Typography

| Element | DS Text Style | Font | Weight | Size | Line height | Letter spacing | CSS vars |
|---------|---|------|--------|------|-------------|----------------|---|
| Title | `body/semiBold/md` | Open Sans | SemiBold (600) | 14px | 143% | 0 | `--text-style-body-semibold-md-*` |
| Body | `body/regular/md` | Open Sans | Regular (400) | 14px | 143% | 0 | `--text-style-body-regular-md-*` |

Typography is implemented via `--text-style-*` CSS custom properties in `Accordion.css`. Previous `letter-spacing: -0.084px` was corrected to `0` after Figma inspection.

---

## Spacing and Layout

| Property | Value | Source |
|----------|-------|--------|
| Container width | `width: 100%` | DS spec (Figma 440px is a canvas constraint) |
| Padding | 14px all sides | Figma |
| Element gap (trigger row) | 10px | Figma container gap |
| Title → body gap | 6px | Figma text frame gap |
| Border radius | `var(--radius-10)` → 10px | Responsive collection token |
| Border weight | 1px | Default state only |
| Collapsed height | ~48px (HUG) | Figma |
| Expanded height | ~94px (HUG — grows with body content) | Figma |

---

## Expand / Collapse Animation

CSS grid-row animation technique:
- Collapsed: `grid-template-rows: 0fr` on `.accordion__body-wrap`
- Expanded: `grid-template-rows: 1fr`
- `.accordion__body` has `min-height: 0; overflow: hidden`
- Transition: `grid-template-rows 0.2s ease-out` (matches SMART_ANIMATE Figma spec)

Background/border/shadow transition: `0.2s ease-out` on all three properties (matches DISSOLVE Figma spec).

---

## Accessibility

- Trigger is a native `<button type="button">` — keyboard accessible by default (Enter/Space)
- `aria-expanded` on the trigger reflects open/closed state
- `aria-controls` links trigger to body panel by ID
- `aria-hidden={!isOpen}` on the body panel
- Icon spans have `aria-hidden="true"` (decorative)
- `useId()` generates a stable, unique body ID per instance

### Known gaps

- **Focus ring** — V1 suppresses `outline` with a code comment. Pending `accordion/focus-ring` token from DS Auditor.
- **Disabled state** — not implemented in V1. Requires DS Auditor approval for token namespace.

---

## File Map

| File | Purpose |
|------|---------|
| `Accordion.jsx` | Component implementation |
| `Accordion.css` | Styles — tokens, Figma-sourced layout values, and tokenized typography |
| `Accordion.stories.jsx` | Storybook stories (Default, Active, both layouts, dark mode) |
| `accordion-spec.md` | This file |
| `src/components/icons/CircleInfo.jsx` | Info icon |
| `src/components/icons/ChevronDownSmall.jsx` | Chevron down icon |
| `src/components/icons/ChevronTopSmall.jsx` | Chevron up icon |
| `src/design-tokens/tokens.css` | Token additions: `--accordion-*` (light + dark) |

---

## Open Items

- **Focus ring token** — No `accordion/focus-ring` token in DS component collection. DT to confirm closest DS focus ring token with DS Auditor before implementing. `:focus-visible` should not be suppressed in production.
- **Disabled token namespace** — No `accordion/disabled/*` namespace. Pending DS Auditor.
- **Typography tokenization** — resolved. Title and body now use Figma-confirmed `--text-style-*` vars.
- **Dark mode shadow** — `color/alpha/black/4` is a primitive alpha. Verify shadow visibility on dark surfaces (`#24262e` background) — may need DS Auditor guidance if not visible.
