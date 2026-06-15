# Button — Large — Implementation Spec

Source: Figma "General Components → Button" page (`↳buttons-large` frame). All values reference `design-tokens/tokens.css`.

## Anatomy

1. Container — flex row, `align-items: center`, `justify-content: center`
2. Left icon (optional, 20×20px)
3. Label text (optional when `onlyIcon`)
4. Right icon (optional, 20×20px)
5. Badge (optional, pill-shaped counter)

## Sizing — Large

| Property | Value | Token |
|---|---|---|
| Padding | 10px all sides | `--spacing-10` |
| Gap between children | 4px | `--spacing-4` |
| Border radius | 8px | `--radius-8` |
| Min width (text variant) | 80px | — |
| Icon-only size | 40×40px (10px padding + 20px icon) | — |
| Icon size | 20×20px | — |
| Label inline padding | 4px (left+right) | `--spacing-4` |
| Font | Open Sans, 600, 16px / 1.5 | `--font-family-body`, `--font-weight-medium`, `--font-size-body-lg` |

## Props API

```ts
type ButtonType = "primary" | "error" | "neutral";
type ButtonStyleVariant = "filled" | "stroke" | "lighter" | "ghost";
type ButtonState = "default" | "hover" | "focus" | "disabled"; // hover/focus are CSS-driven, disabled is a prop

interface ButtonProps {
  type?: ButtonType;            // default "primary"
  variant?: ButtonStyleVariant; // default "filled"
  size?: "large";                // only "large" implemented so far
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onlyIcon?: boolean;            // renders icon-only square button (uses leftIcon slot)
  badge?: number | string;       // renders pill counter
  disabled?: boolean;
  children?: React.ReactNode;    // label text
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}
```

## Color mapping (Large, all states)

### Filled

| Type | bg | bg:hover | text |
|---|---|---|---|
| primary | `--button-fill-primary-bg` (#302571) | `--button-fill-primary-bg-hover` (#403297) | `--button-fill-primary-text` (#fff) |
| error | `--button-fill-destructive-bg` (#cb1515) | `--button-fill-destructive-bg-hover` (#b91313) | `--button-fill-destructive-text` (#fff) |
| neutral | `--button-fill-neutral-bg` (#262626) | `--button-fill-neutral-bg-hover` (#1c1c1c) | `--button-fill-neutral-text` (#fff) |

### Stroke (transparent bg, 1px border)

| Type | border | border:hover | bg:hover | text |
|---|---|---|---|---|
| primary | `--button-stroke-primary-border` (#7263cc) | `--button-stroke-primary-border-hover` (#302571) | `--button-stroke-primary-bg-hover` (#eceaf8) | `--button-stroke-primary-text` (#302571) |
| error | `--button-stroke-error-border` (#cb1515) | `--button-stroke-error-border-hover` (#b91313) | `--button-stroke-error-bg-hover` (#fcdfdf) | `--button-stroke-error-text` (#cb1515) |
| neutral | `--button-stroke-neutral-border` (#eaeaea) | `--button-stroke-neutral-border-hover` (#262626) | `--button-stroke-neutral-bg-hover` (#f4f4f6) | `--button-stroke-neutral-text` (#333) |

### Lighter (tinted bg, no border)

| Type | bg | bg:hover | text |
|---|---|---|---|
| primary | `--button-lighter-primary-bg` (#eceaf8) | `--button-lighter-primary-bg-hover` (#dad6f2) | `--button-lighter-primary-text` (#302571) |
| error | `--button-lighter-error-bg` (#fcdfdf) | `--button-lighter-error-bg-hover` (#fcdfdf) | `--button-lighter-error-text` (#941010) |
| neutral | `--button-lighter-neutral-bg` (#f4f4f6) | `--button-lighter-neutral-bg-hover` (#ebecef) | `--button-lighter-neutral-text` (#333) |

### Ghost (transparent, no border)

| Type | bg:hover | text |
|---|---|---|
| primary | `--button-ghost-primary-bg-hover` (#eceaf8) | `--button-ghost-primary-text` (#302571) |
| error | `--button-ghost-error-bg-hover` (#fcdfdf) | `--button-ghost-error-text` (#cb1515) |
| neutral | `--button-ghost-neutral-bg-hover` (#f4f4f6) | `--button-ghost-neutral-text` (#333) |

### Disabled (overrides all variants/types)

- bg: `--button-disabled-bg` (#f5f5f5)
- text: `--button-disabled-text` (#7b7b7b)
- border: none, no hover/focus effects
- `cursor: not-allowed`, `pointer-events: none`

### Focus (keyboard focus-visible)

Applies a 1px border + double box-shadow ring, color keyed to `type`:

| Type | border | box-shadow |
|---|---|---|
| primary | `--button-focus-ring-primary` (#7963ba3d) | `--shadow-focus-ring-primary` |
| error | `--button-focus-ring-error` (#ea34343d) | `--shadow-focus-ring-error` |
| neutral | `--button-focus-ring-neutral` (#82879c3d) | `--shadow-focus-ring-neutral` |

## Badge

- bg: `--color-surface-neutral-soft` (#f4f4f6)
- text: `--color-text-neutral-strong` (#1c1c1c)
- font: 10px (`--font-size-micro`), weight 600, letter-spacing 0.05px
- padding: 4px 3px, `border-radius: --radius-full`

## Accessibility

- Renders as a native `<button>` element
- `disabled` prop sets the native `disabled` attribute (not just visual styling)
- Icon-only buttons (`onlyIcon`) require an `aria-label` — component should warn in dev if missing and no `children`
- Focus ring must remain visible for keyboard navigation (`:focus-visible`, not `:focus`) — do not suppress with `outline: none` without the ring replacement
- Color contrast: all text/bg combinations above meet WCAG AA for the given font sizes (verified against documented hex values)

## Open items

- Sizes `medium` / `small` not yet specced — `size` prop reserved for future variants
- `badges` slot only documented for the "2" count case in Figma; assumed generic numeric/text content
