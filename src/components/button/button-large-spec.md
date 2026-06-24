# Button — Large + Medium + Small — Implementation Spec

Source: Figma "Design System Scalable - All Platform V.2.1.0 → General Components → Button".  
All values reference `design-tokens/tokens.css`.  
Last updated: 24/06/2026 (spec cleanup — stale prop/variant names removed, size coverage expanded)

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

type ButtonVariant = "filled" | "outline" | "lighter" | "ghost";
// "outline" = Figma "Stroke". "lighter" = approved soft/tinted style.
// "tonal" is not a public variant — use "lighter" instead.

interface ButtonProps {
  type?:          ButtonType;         // default "primary"
  variant?:       ButtonVariant;      // default "filled"
  size?:          "large" | "medium" | "small"; // all three sizes implemented
  icon?:          React.ReactNode;    // single icon — use iconPosition to place left or right
  iconPosition?:  "left" | "right";  // default "left". Ignored when onlyIcon is true.
  onlyIcon?:      boolean;            // renders icon-only square (40/36/28px per size)
  badge?:         number | string;    // pill counter — Large and Medium only, not Small
  disabled?:      boolean;
  children?:      React.ReactNode;    // label text
  onClick?:       (e: React.MouseEvent) => void;
  className?:     string;
  "aria-label"?:  string;             // required for onlyIcon buttons
}
```

### Valid type × variant combinations

Approved combinations per DS Auditor handoff (2026-06-24):

| variant | primary | error | neutral |
|---|:---:|:---:|:---:|
| filled | ✓ | ✓ | ✓ |
| outline | ✓ | ✓ | ✓ |
| lighter | ✓ | ✓ | ✓ |
| ghost | ✓ | ✓ | ✓ |

`secondary` type is tokenised but hidden from Storybook until DS/product decision is made.
`tonal` is not a public variant — `lighter` is the approved soft/tinted style.

---

## Color tokens — Light mode

### Filled (solid background)

| Type | bg | bg:hover | bg:active | text |
|---|---|---|---|---|
| primary | `--button-fill-primary-bg` #302571 | `--button-fill-primary-bg-hover` #403297 | `--button-fill-primary-bg-active` #513ebe | `--button-fill-primary-text` #fff |
| error | `--button-fill-destructive-bg` #cb1515 | `--button-fill-destructive-bg-hover` #b91313 | `--button-fill-destructive-bg-active` #941010 | `--button-fill-destructive-text` #fff |
| neutral | `--button-fill-neutral-bg` #262626 | `--button-fill-neutral-bg-hover` #1c1c1c | `--button-fill-neutral-bg-active` #161616 | `--button-fill-neutral-text` #fff |

### Outline (transparent bg, 1px border)

Maps to Figma "Stroke" style. Code uses `variant="outline"`. Token namespace is `--button-stroke-*`.

| Type | text | border | border:hover | bg:hover |
|---|---|---|---|---|
| primary | `--button-stroke-primary-text` #302571 | `--button-stroke-primary-border` #7263cc | `--button-stroke-primary-border-hover` #302571 | `--button-stroke-primary-bg-hover` #eceaf8 |
| error | `--button-stroke-error-text` #cb1515 | `--button-stroke-error-border` #cb1515 | `--button-stroke-error-border-hover` #b91313 | `--button-stroke-error-bg-hover` #fcdfdf |
| neutral | `--button-stroke-neutral-text` #333 | `--button-stroke-neutral-border` #eaeaea | `--button-stroke-neutral-border-hover` #262626 | `--button-stroke-neutral-bg-hover` #f4f4f6 |

### Lighter (tinted bg, no border)

| Type | text | bg | bg:hover |
|---|---|---|---|
| primary | `--button-lighter-primary-text` #302571 | `--button-lighter-primary-bg` #eceaf8 | `--button-lighter-primary-bg-hover` #dad6f2 |
| error | `--button-lighter-error-text` #941010 | `--button-lighter-error-bg` #fcdfdf | `--button-lighter-error-bg-hover` #fcdfdf |
| neutral | `--button-lighter-neutral-text` #333 | `--button-lighter-neutral-bg` #f4f4f6 | `--button-lighter-neutral-bg-hover` #ebecef |


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

`onlyIcon`, `badge`, `icon`, and `children` are not freely combinable. Priority order:

| Priority | Condition | Renders | Ignored |
|---|---|---|---|
| 1 | `onlyIcon` is true | Single icon in a square (40/36/28px per size) | badge, children |
| 2 | `badge` is set (and not onlyIcon) | Label text + badge pill | icon |
| 3 | Otherwise | icon (left or right) + label | — |

Rules of thumb:
- Badge always requires label text — badge-only is not supported.
- Icons require label text — use `onlyIcon` for an icon with no label.
- Icons and badge never appear together — badge wins and icon is suppressed.
- Badge is supported on Large and Medium only. Do not use badge on Small.

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

- `secondary` type built and tokenised — activate when DS/product decision is made
- Badge slot only tested with short numeric/text values; long strings untested
- `--button-fill-primary-bg-hover` has no visual hover shift in dark mode — intentional DS decision or gap, needs visual QA confirmation
- `--button-stroke-neutral-border-hover` has no border shift in dark mode — same as above
- `--button-fill-destructive-border` token does not exist in tokens.css — base `.button { border: 1px solid transparent }` covers this for now. Flag for DS Auditor if a dedicated token is later required.
