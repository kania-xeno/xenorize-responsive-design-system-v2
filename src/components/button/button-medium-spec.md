# Button — Medium — Implementation Spec

Source: Figma "Design System Scalable - All Platform V.2.1.0 → General Components → Button".
Node: 1921:3648 (`↳buttons-medium`)
All values reference `design-tokens/tokens.css`.
Last updated: 22/06/2026

---

## Anatomy

Same as Large — flex row with: left icon (optional) → label → right icon (optional) → badge (optional).

---

## Sizing — Medium

| Property | Value | Token |
|---|---|---|
| Padding | 8px all sides | `--spacing-8` |
| Gap between children | 4px | `--spacing-4` |
| Border radius | 8px | `--radius-8` |
| Min width (text variant) | 64px | — |
| Icon-only size | 36×36px | — |
| Icon size | 20×20px | — |
| Label inline padding | 4px (left + right) | `--spacing-4` |
| Font family | Open Sans | `--font-family-body` |
| Font weight | 600 (SemiBold) | `--font-weight-medium` |
| Font size | 14px / ~1.43 line-height | `--font-size-body-md` |

### Diff vs Large

| Property | Large | Medium |
|---|---|---|
| Padding | 10px (`--spacing-10`) | 8px (`--spacing-8`) |
| Font size | 16px (`--font-size-body-lg`) | 14px (`--font-size-body-md`) |
| Height | 40px | 36px |
| Icon-only | 40×40px | 36×36px |
| Min width | 80px | 64px |

Colors, variants, types, states, and all tokens are identical to Large.

---

## Props API

```ts
// Identical to Large — only size differs
interface ButtonProps {
  type?:         "primary" | "error" | "neutral";
  variant?:      "filled" | "outline" | "lighter" | "ghost";
  size?:         "large" | "medium";   // ← use "medium"
  icon?:         React.ReactNode;
  iconPosition?: "left" | "right";
  onlyIcon?:     boolean;
  badge?:        number | string;
  disabled?:     boolean;
  children?:     React.ReactNode;
  onClick?:      (e: React.MouseEvent) => void;
  "aria-label"?: string;
}
```

---

## Color tokens

All color tokens are shared with Large. See `button-large-spec.md` for the full color table.

Summary:
- Filled, Outline (= Figma Stroke), Lighter, Ghost — same tokens
- Disabled: `--button-disabled-bg` / `--button-disabled-text` / `--button-disabled-border`
- Focus ring: `--button-focus-ring-{type}` / `--shadow-focus-ring-{type}`

---

## CSS implementation

Medium is implemented as a size modifier class on the shared `Button.css`:

```css
.button--size-medium {
  padding: var(--spacing-8);
  font-size: var(--font-size-body-md);
  min-width: 64px;
}

.button--size-medium.button--onlyIcon {
  width: 36px;
  height: 36px;
}
```

No new color rules needed — all variant/type/state CSS from Large applies unchanged.

---

## Content slot rules

Identical to Large. See `button-large-spec.md`.

---

## Accessibility

Identical to Large. See `button-large-spec.md`.

---

## Open items

- Size `small` not yet built — `size` prop reserved
