# Button — Small — Implementation Spec

Source: Figma "Design System Scalable - All Platform V.2.1.0 → General Components → Button".
Node: 1921:4253 (`↳buttons-small`)
All values reference `design-tokens/tokens.css`.
Last updated: 24/06/2026 (corrected icon-only size to 32×32px, icon size to 20×20px per DS QA)

---

## Anatomy

Same as Large — flex row with: left icon (optional) → label → right icon (optional) → badge (optional).

---

## Sizing — Small

| Property | Value | Token |
|---|---|---|
| Padding | 6px all sides | `--spacing-6` |
| Gap between children | 4px | `--spacing-4` |
| Border radius | **6px** | `--radius-6` |
| Min width (text variant) | 48px | — |
| Icon-only size | 32×32px | — |
| Icon size | 20×20px | — |
| Label inline padding | 4px (left + right) | `--spacing-4` |
| DS Text Style | `caption/semiBold` | `--text-style-caption-semibold-*` |
| Font family | Open Sans | `--text-style-caption-semibold-font-family` |
| Font weight | SemiBold (600) | `--text-style-caption-semibold-font-weight` |
| Font size | 12px | `--text-style-caption-semibold-font-size` |
| Line height | 133% | `--text-style-caption-semibold-line-height` |
| Letter spacing | 0.002em | `--text-style-caption-semibold-letter-spacing` |

### Diff vs Large and Medium

| Property | Large | Medium | Small |
|---|---|---|---|
| Padding | 10px `--spacing-10` | 8px `--spacing-8` | **6px `--spacing-6`** |
| DS Text Style | `body/medium/lg` | `body/medium/md` | **`caption/semiBold`** |
| Font size | 16px | 14px | **12px** |
| Height | 40px | 36px | **32px** |
| Border radius | 8px `--radius-8` | 8px `--radius-8` | **6px `--radius-6`** |
| Icon size | 20×20px | 20×20px | 20×20px |
| Icon-only | 40×40px | 36×36px | **32×32px** |
| Min width | 80px | 64px | **48px** |

> Note: Small is the only size with a different border radius (6px vs 8px). Icon size is 20×20px across all sizes. Icon-only button is 32×32px.

Colors, variants, types, and states are identical to Large and Medium.

---

## Props API

```ts
interface ButtonProps {
  type?:         "primary" | "error" | "neutral";
  variant?:      "filled" | "outline" | "lighter" | "ghost";
  size?:         "large" | "medium" | "small";   // ← use "small"
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

All color tokens are shared with Large and Medium. See `button-large-spec.md` for the full color table.

---

## CSS implementation

Small overrides the base button with a size modifier class:

```css
.button--size-small {
  padding:        var(--spacing-6);
  border-radius:  var(--radius-6);
  min-width:      48px;
  /* Typography: caption/semiBold — overrides the Large base */
  font-family:    var(--text-style-caption-semibold-font-family);
  font-weight:    var(--text-style-caption-semibold-font-weight);
  font-size:      var(--text-style-caption-semibold-font-size);
  line-height:    var(--text-style-caption-semibold-line-height);
  letter-spacing: var(--text-style-caption-semibold-letter-spacing);
}

/* Icon size for small is 20×20 (same as base) — no .button__icon override needed. */

.button--size-small.button--onlyIcon {
  width: 32px;
  height: 32px;
  padding: 0;
  min-width: 0;
}
```

No new color rules needed — all variant/type/state CSS from Large applies unchanged.

---

## Content slot rules

Identical to Large. See `button-large-spec.md`.

---

## Accessibility

Identical to Large. See `button-large-spec.md`.
Icon-only buttons at 32×32px exceed the WCAG 2.5.5 minimum target size of 24×24px.
