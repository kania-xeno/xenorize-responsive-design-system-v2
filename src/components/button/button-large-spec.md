# Button — Large — Implementation Spec

Source: Figma "Design System Scalable - All Platform V.2.1.0 → General Components → Button".  
All values reference `design-tokens/tokens.css`.  
Last updated: 22/06/2026

---

## Anatomy

1. Container — flex row, `align-items: center`, `justify-content: center`
2. Left icon (optional, 20×20px)
3. Label text (optional when `onlyIcon`)
4. Right icon (optional, 20×20px)
5. Badge (optional, pill-shaped counter — replaces icons when set)

---

## Sizing — Large

| Property | Value | Token |
|---|---|---|
| Padding | 10px all sides | `--spacing-10` |
| Gap between children | 4px | `--spacing-4` |
| Border radius | 8px | `--radius-8` |
| Min width (text variant) | 80px | — |
| Icon-only size | 40×40px | — |
| Icon size | 20×20px | — |
| Label inline padding | 4px (left + right) | `--spacing-4` |
| Font family | Open Sans | `--font-family-body` |
| Font weight | 600 (Medium) | `--font-weight-medium` |
| Font size | 16px / 1.5 line-height | `--font-size-body-lg` |

---

## Props API

```ts
type ButtonType    = "primary" | "error" | "neutral";
// "secondary" (teal) is built and tokenised — hidden from Storybook
// until a product use-case is confirmed. Re-add to options to enable.

type ButtonVariant = "filled" | "stroke" | "outline" | "lighter" | "tonal" | "ghost";

interface ButtonProps {
  type?:      ButtonType;      // default "primary"
  variant?:   ButtonVariant;   // default "filled"
  size?:      "large";         // only "large" implemented so far
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  onlyIcon?:  boolean;         // renders icon-only 40×40 square
  badge?:     number | string; // renders pill counter (replaces icons)
  disabled?:  boolean;
  children?:  React.ReactNode; // label text
  onClick?:   (e: React.MouseEvent) => void;
  className?: string;
  "aria-label"?: string;       // required for onlyIcon buttons
}
```

### Valid type × variant combinations

Not all combos exist in the design system. The table below shows what's currently tokenised and active:

| variant | primary | error | neutral | secondary* |
|---|:---:|:---:|:---:|:---:|
| filled | ✓ | ✓ | ✓ | ✓* |
| stroke | ✓ | ✓ | ✓ | — |
| outline | ✓ | — | — | ✓* |
| lighter | ✓ | ✓ | ✓ | — |
| tonal | ✓ | — | — | ✓* |
| ghost | ✓ | ✓ | ✓ | ✓* |

\* Secondary is tokenised and CSS-ready but hidden from Storybook until a product use-case is confirmed.

---

## Color tokens — Light mode

### Filled (solid background)

| Type | bg | bg:hover | bg:active | text |
|---|---|---|---|---|
| primary | `--button-fill-primary-bg` #302571 | `--button-fill-primary-bg-hover` #403297 | `--button-fill-primary-bg-active` #513ebe | `--button-fill-primary-text` #fff |
| error | `--button-fill-destructive-bg` #cb1515 | `--button-fill-destructive-bg-hover` #b91313 | `--button-fill-destructive-bg-active` #941010 | `--button-fill-destructive-text` #fff |
| neutral | `--button-fill-neutral-bg` #262626 | `--button-fill-neutral-bg-hover` #1c1c1c | `--button-fill-neutral-bg-active` #161616 | `--button-fill-neutral-text` #fff |

### Stroke (transparent bg, 1px border)

| Type | text | border | border:hover | bg:hover |
|---|---|---|---|---|
| primary | `--button-stroke-primary-text` #302571 | `--button-stroke-primary-border` #7263cc | `--button-stroke-primary-border-hover` #302571 | `--button-stroke-primary-bg-hover` #eceaf8 |
| error | `--button-stroke-error-text` #cb1515 | `--button-stroke-error-border` #cb1515 | `--button-stroke-error-border-hover` #b91313 | `--button-stroke-error-bg-hover` #fcdfdf |
| neutral | `--button-stroke-neutral-text` #333 | `--button-stroke-neutral-border` #eaeaea | `--button-stroke-neutral-border-hover` #262626 | `--button-stroke-neutral-bg-hover` #f4f4f6 |

### Outline (transparent bg, 1px border — primary + secondary only)

Same visual as stroke but a separate token namespace in Figma.

| Type | text | border | border:hover | bg:hover |
|---|---|---|---|---|
| primary | `--button-outline-primary-text` #302571 | `--button-outline-primary-border` #7263cc | `--button-outline-primary-border-hover` #302571 | `--button-outline-primary-bg-hover` #eceaf8 |

### Lighter (tinted bg, no border)

| Type | text | bg | bg:hover |
|---|---|---|---|
| primary | `--button-lighter-primary-text` #302571 | `--button-lighter-primary-bg` #eceaf8 | `--button-lighter-primary-bg-hover` #dad6f2 |
| error | `--button-lighter-error-text` #941010 | `--button-lighter-error-bg` #fcdfdf | `--button-lighter-error-bg-hover` #fcdfdf |
| neutral | `--button-lighter-neutral-text` #333 | `--button-lighter-neutral-bg` #f4f4f6 | `--button-lighter-neutral-bg-hover` #ebecef |

### Tonal (tinted bg + active state — primary + secondary only)

Like lighter but includes an active/pressed state.

| Type | text | bg | bg:hover | bg:active |
|---|---|---|---|---|
| primary | `--button-tonal-primary-text` #302571 | `--button-tonal-primary-bg` #eceaf8 | `--button-tonal-primary-bg-hover` #dad6f2 | `--button-tonal-primary-bg-active` #b8b0e5 |

### Ghost (transparent, no border)

| Type | text | bg:hover |
|---|---|---|
| primary | `--button-ghost-primary-text` #302571 | `--button-ghost-primary-bg-hover` #eceaf8 |
| error | `--button-ghost-error-text` #cb1515 | `--button-ghost-error-bg-hover` #fcdfdf |
| neutral | `--button-ghost-neutral-text` #333 | `--button-ghost-neutral-bg-hover` #f4f4f6 |

### Disabled (overrides all variants and types)

| Property | Token | Value |
|---|---|---|
| Background | `--button-disabled-bg` | #f5f5f5 |
| Text | `--button-disabled-text` | #7b7b7b |
| Border | `--button-disabled-border` | #eaeaea |
| Cursor | — | `not-allowed` |
| Pointer events | — | `none` |

### Focus ring (keyboard `:focus-visible`)

| Type | border color | box-shadow token |
|---|---|---|
| primary | `--button-focus-ring-primary` #513ebe3d | `--shadow-focus-ring-primary` |
| error | `--button-focus-ring-error` #ea34343d | `--shadow-focus-ring-error` |
| neutral | `--button-focus-ring-neutral` #82879c3d | `--shadow-focus-ring-neutral` |

---

## Dark mode

Dark mode is handled via `[data-theme="dark"]` overrides in `tokens.css`. The same CSS custom property names are used — only the values change. Every token listed above has a dark-mode equivalent. See `tokens.css` for the full dark block.

---

## Badge

- bg: `--color-surface-neutral-soft` (#f4f4f6 light / #2d2f39 dark)
- text: `--color-text-neutral-strong` (#1c1c1c light / #fff dark)
- font: 10px (`--font-size-micro`), weight 600, letter-spacing 0.05px
- padding: 3px 4px, `border-radius: --radius-full`

---

## Content slot rules

`onlyIcon`, `badge`, `leftIcon`/`rightIcon`, and `children` are not freely combinable. Priority order:

| Priority | Condition | Renders | Ignored |
|---|---|---|---|
| 1 | `onlyIcon` is true | Single icon (leftIcon ?? rightIcon) in a 40×40 square | badge, children, unused icon slot |
| 2 | `badge` is set (and not onlyIcon) | Label text + badge pill | leftIcon, rightIcon |
| 3 | Otherwise | leftIcon? + label + rightIcon? | — |

Rules of thumb:
- Badge always requires label text — badge-only is not supported.
- Icons require label text — use `onlyIcon` for an icon with no label.
- Icons and badge never appear together — badge wins and icons are suppressed.
- Left + right icons together alongside label is valid.

The component logs `console.warn` in development for any invalid combination.

---

## Accessibility

- Renders as a native `<button type="button">` element
- `disabled` sets the native HTML `disabled` attribute (not just visual)
- Icon-only buttons require `aria-label` — dev warning if missing
- Focus ring uses `:focus-visible` (keyboard only, not mouse click)
- Do not suppress `outline: none` without the custom focus ring in place
- All text/bg contrast combinations meet WCAG AA at the given font sizes

---

## Open items

- Sizes `medium` / `small` not yet built — `size` prop reserved
- `secondary` type built and tokenised — activate when use-case is confirmed
- Badge slot only tested with short numeric/text values; long strings untested
