# Component Spec — Alert / Toast Notification

**Component:** `Alert`
**DS Version:** v2.1.0
**Implemented:** 01/07/2026
**Figma source:** Design System Scalable V.2.1.0 → `↳alert-toast-notification` (node `1995:2497`)
**File key:** `0aVnOgjVWH1YL8JCnjXTBi`

---

## 1. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `status` | `'error' \| 'warning' \| 'success' \| 'information' \| 'feature'` | `'information'` | Semantic status. Maps to token namespace. |
| `alertStyle` | `'filled' \| 'light' \| 'lighter' \| 'stroke'` | `'lighter'` | Fill treatment. Named `alertStyle` to avoid collision with HTML `style`. |
| `size` | `'x-small' \| 'small' \| 'large'` | `'small'` | Layout size. X-Small and Small are single-row; Large is multi-row. |
| `message` | `string` | `''` | Single-line message (X-Small/Small) or title text (Large). |
| `description` | `string` | `''` | Body text below title. Large only. Ignored for X-Small/Small. |
| `primaryAction` | `string` | `''` | Label for primary link button. Optional for all sizes. |
| `secondaryAction` | `string` | `''` | Label for secondary link button. Large only. Renders "∙" divider (Open Sans) before it. |
| `dismissible` | `boolean` | `true` | Show/hide dismiss button (CrossLarge icon, 16×16). |
| `toast` | `boolean` | `false` | Fixed-position toast behavior (bottom-right). Enables auto-dismiss timer. |
| `autoDismiss` | `number` | `5000` | Auto-dismiss delay in ms. `toast=true` only. `status="error"` never auto-dismisses. |
| `onDismiss` | `function` | `null` | Called when dismiss button is clicked or auto-dismiss fires. |
| `onPrimaryAction` | `function` | `null` | Called when primary action button is clicked. |
| `onSecondaryAction` | `function` | `null` | Called when secondary action button is clicked. |
| `className` | `string` | `''` | Additional CSS class on root element. |

---

## 2. Status → Token Namespace Mapping

⚠️ Critical — Figma variant labels differ from token namespace names. This mapping is implemented in `Alert.jsx` via `STATUS_TOKEN_MAP`.

| Prop value (Figma label) | Token namespace | CSS data-status |
|---|---|---|
| `error` | `danger` | `data-status="danger"` |
| `warning` | `warning` | `data-status="warning"` |
| `success` | `success` | `data-status="success"` |
| `information` | `info` | `data-status="info"` |
| `feature` | `feature` | `data-status="feature"` |

---

## 3. Layout Anatomy

### X-Small (32) and Small (36) — Single flat row

```
.alert[data-status][data-style].alert--x-small / .alert--small
  ├── .alert__status-icon   BubbleAlert 16×16 — aria-hidden
  ├── .alert__message       flex: 1 — message text
  ├── .alert__action        optional primary link button
  └── .alert__dismiss       CrossLarge 16×16 — aria-label="Dismiss"
```

- `align-items: center`
- X-Small `padding: 6px 10px` (6px top/bottom · 10px left/right — Figma: py-6 px-10)
- Small `padding: 8px` all sides
- `gap: 8px`
- `border-radius: var(--radius-8)` (8px)

### Large — Multi-row

```
.alert[data-status][data-style].alert--large
  ├── .alert__status-icon   BubbleAlert 20×20 — aria-hidden
  ├── .alert__content       flex: 1 — flex-direction: column
  │    ├── .alert__text     flex-direction: column — gap: 4px
  │    │    ├── .alert__title        SemiBold (600) — message prop
  │    │    └── .alert__description  Regular (400) — description prop
  │    └── .alert__actions  flex-direction: row — gap: 8px
  │         ├── .alert__action--primary
  │         ├── .alert__action-divider  "∙" — Inter font
  │         └── .alert__action--secondary
  └── .alert__dismiss       CrossLarge 16×16 — aria-label="Dismiss"
```

- `align-items: flex-start` (top-aligned — `MIN` in Figma)
- `padding: 12px` all sides
- `gap: 12px`
- `border-radius: var(--radius-12)` (12px)

---

## 4. Spacing

| Size | Padding | Gap | Text gap (Large) | Actions gap (Large) |
|---|---|---|---|---|
| X-Small (32) | 6px top/bottom · 10px left/right | 8px | — | — |
| Small (36) | 8px all | 8px | — | — |
| Large | 12px all | 12px | 4px | 8px |

---

## 5. Typography

| Element | Font | Weight | Size | Line height | Letter-spacing |
|---|---|---|---|---|---|
| Message — X-Small/Small | Open Sans | Regular (400) | `var(--font-size-body-sm)` = 12px | 133% | 0.024px |
| Title — Large | Open Sans | SemiBold (600) | `var(--font-size-body-md)` = 14px | 143% | — |
| Description — Large | Open Sans | Regular (400) | `var(--font-size-body-md)` = 14px | 143% | — |
| Action link — X-Small/Small | Open Sans | SemiBold (600) | `var(--font-size-body-sm)` = 12px | 133% | 0.024px |
| Action link — Large | Open Sans | SemiBold (600) | `var(--font-size-body-md)` = 14px | 143% | — |
| Divider "∙" — Large | Open Sans | Regular (400) | `var(--font-size-body-md)` | 143% | — |

ℹ️ X-Small and Small use `fontSize/body/sm` (12px, 133%, 0.024px tracking) — Figma: caption/regular style. Large uses `fontSize/body/md` (14px, 143%).

⚠️ `typography/weight/medium` renders at SemiBold (600) — legacy naming. Implement value (600), not name.

---

## 6. Border

- Weight: 1px on all variants
- `filled / light / lighter`: `border-color = bg-color` — intentionally invisible. Do not remove the border.
- `stroke`: `border-color = alert/{status}/stroke/border` — only visible border in the system

---

## 7. Shadow

Shadow exists **only on Stroke style**.

| Property | Value |
|---|---|
| CSS token used | `var(--shadow-regular-medium)` |
| Token value | `0 16px 32px -12px rgba(14,18,27,0.10)` |
| Figma spec | Y=16, Spread=−12, Radius=32, `color/alpha/black/10` |
| Note | Token uses `rgba(14,18,27,0.10)` vs pure black — within acceptable tolerance. Flagged for DS Auditor. |

---

## 8. Token Map — All 80 Variables

### Pattern: `--alert-{status}-{style}-{role}`

Token status names use the **namespace** (not Figma label):
`danger` · `warning` · `success` · `info` · `feature`

#### Light Mode (`:root`)

| Token | Light value |
|---|---|
| `--alert-danger-filled-bg` | `#941010` |
| `--alert-danger-filled-border` | `#941010` |
| `--alert-danger-filled-icon` | `#ffffff` |
| `--alert-danger-filled-text` | `#ffffff` |
| `--alert-danger-light-bg` | `#f17e7e` |
| `--alert-danger-light-border` | `#f17e7e` |
| `--alert-danger-light-icon` | `#cb1515` |
| `--alert-danger-light-text` | `#941010` |
| `--alert-danger-lighter-bg` | `#fcdfdf` |
| `--alert-danger-lighter-border` | `#fcdfdf` |
| `--alert-danger-lighter-icon` | `#cb1515` |
| `--alert-danger-lighter-text` | `#941010` |
| `--alert-danger-stroke-bg` | `#ffffff` |
| `--alert-danger-stroke-border` | `#cb1515` |
| `--alert-danger-stroke-icon` | `#cb1515` |
| `--alert-danger-stroke-text` | `#941010` |
| `--alert-warning-filled-bg` | `#3c2e00` |
| `--alert-warning-filled-border` | `#3c2e00` |
| `--alert-warning-filled-icon` | `#ffffff` |
| `--alert-warning-filled-text` | `#ffffff` |
| `--alert-warning-light-bg` | `#f1c21b` |
| `--alert-warning-light-border` | `#f1c21b` |
| `--alert-warning-light-icon` | `#684e00` |
| `--alert-warning-light-text` | `#3c2e00` |
| `--alert-warning-lighter-bg` | `#fddc69` |
| `--alert-warning-lighter-border` | `#fddc69` |
| `--alert-warning-lighter-icon` | `#684e00` |
| `--alert-warning-lighter-text` | `#3c2e00` |
| `--alert-warning-stroke-bg` | `#ffffff` |
| `--alert-warning-stroke-border` | `#684e00` |
| `--alert-warning-stroke-icon` | `#684e00` |
| `--alert-warning-stroke-text` | `#3c2e00` |
| `--alert-success-filled-bg` | `#09421e` |
| `--alert-success-filled-border` | `#09421e` |
| `--alert-success-filled-icon` | `#ffffff` |
| `--alert-success-filled-text` | `#ffffff` |
| `--alert-success-light-bg` | `#82eeaa` |
| `--alert-success-light-border` | `#82eeaa` |
| `--alert-success-light-icon` | `#0f6d32` |
| `--alert-success-light-text` | `#09421e` |
| `--alert-success-lighter-bg` | `#edfdf3` |
| `--alert-success-lighter-border` | `#edfdf3` |
| `--alert-success-lighter-icon` | `#0f6d32` |
| `--alert-success-lighter-text` | `#09421e` |
| `--alert-success-stroke-bg` | `#ffffff` |
| `--alert-success-stroke-border` | `#0f6d32` |
| `--alert-success-stroke-icon` | `#0f6d32` |
| `--alert-success-stroke-text` | `#09421e` |
| `--alert-info-filled-bg` | `#0d4896` |
| `--alert-info-filled-border` | `#0d4896` |
| `--alert-info-filled-icon` | `#ffffff` |
| `--alert-info-filled-text` | `#ffffff` |
| `--alert-info-light-bg` | `#7cb0f4` |
| `--alert-info-light-border` | `#7cb0f4` |
| `--alert-info-light-icon` | `#1264ce` |
| `--alert-info-light-text` | `#0d4896` |
| `--alert-info-lighter-bg` | `#deebfc` |
| `--alert-info-lighter-border` | `#deebfc` |
| `--alert-info-lighter-icon` | `#1264ce` |
| `--alert-info-lighter-text` | `#0d4896` |
| `--alert-info-stroke-bg` | `#ffffff` |
| `--alert-info-stroke-border` | `#1264ce` |
| `--alert-info-stroke-icon` | `#1264ce` |
| `--alert-info-stroke-text` | `#0d4896` |
| `--alert-feature-filled-bg` | `#302571` |
| `--alert-feature-filled-border` | `#302571` |
| `--alert-feature-filled-icon` | `#ffffff` |
| `--alert-feature-filled-text` | `#ffffff` |
| `--alert-feature-light-bg` | `#9589d9` |
| `--alert-feature-light-border` | `#9589d9` |
| `--alert-feature-light-icon` | `#403297` |
| `--alert-feature-light-text` | `#302571` |
| `--alert-feature-lighter-bg` | `#dad6f2` |
| `--alert-feature-lighter-border` | `#dad6f2` |
| `--alert-feature-lighter-icon` | `#403297` |
| `--alert-feature-lighter-text` | `#302571` |
| `--alert-feature-stroke-bg` | `#ffffff` |
| `--alert-feature-stroke-border` | `#403297` |
| `--alert-feature-stroke-icon` | `#403297` |
| `--alert-feature-stroke-text` | `#302571` |

Dark mode overrides follow the same pattern in `[data-theme="dark"]`. See `tokens.css`.

---

## 9. Icons

### Status Icon — BubbleAlert

| Field | Value |
|---|---|
| File | `src/components/icons/BubbleAlert.jsx` |
| Icon System name | `bubble-alert, comment, feedback` |
| Node | DS file `9:77916` (Icon page) |
| Variant | `filled=on, stroke=1, radius=0, join=round` |
| Size in X-Small/Small | `width={16} height={16}` |
| Size in Large | `width={20} height={20}` |
| Color application | `fill="currentColor"` → inherits `color: var(--_alert-icon)` |
| Accessible label | None — decorative (`aria-hidden="true"` on wrapper span) |

### Dismiss Icon — CrossLarge

| Field | Value |
|---|---|
| File | `src/components/icons/CrossLarge.jsx` |
| Icon System name | `cross-large, crossed large, close` |
| Node | DS file `9:103236` |
| Variant | `filled=off, stroke=1, radius=0, join=square` |
| Size | `width={16} height={16}` (all sizes) |
| Color application | `stroke="currentColor"` → inherits `color: var(--_alert-icon)` |
| Accessible label | ✅ Required — `aria-label="Dismiss"` on `<button>` wrapper |

---

## 10. Accessibility

| Requirement | Implementation |
|---|---|
| Error / Warning → assertive | `aria-live="assertive"` on root `<div role="alert">` |
| Success / Information / Feature → polite | `aria-live="polite"` on root `<div role="alert">` |
| Dismiss button keyboard accessible | `<button type="button" aria-label="Dismiss">` |
| Action link keyboard accessible | `<button type="button">` with visible text label |
| Status icon decorative | `aria-hidden="true"` on `.alert__status-icon` wrapper |
| Dismiss icon decorative | `aria-hidden="true"` on SVG inside button (label is on button) |
| Do not rely on color alone | Status icon provides secondary semantic cue alongside text |

---

## 11. CSS Architecture

```
.alert                          Base — consumes scoped vars
  .alert--x-small / --small     Size modifiers (padding, gap, radius)
  .alert--large                 Large modifier (padding, gap, radius, align)
  .alert--toast                 Toast position modifier

.alert[data-status][data-style] Sets 4 scoped vars:
  --_alert-bg
  --_alert-border
  --_alert-icon
  --_alert-text

.alert[data-style="stroke"]     Adds box-shadow (stroke only)
```

20 combos (5 statuses × 4 styles). All token vars live in `tokens.css`.

---

## 12. File Map

| File | Role |
|---|---|
| `src/components/alert/Alert.jsx` | Component |
| `src/components/alert/Alert.css` | Styles |
| `src/components/alert/Alert.stories.jsx` | Storybook — `Components/Alert/General` |
| `src/components/alert/Alert.overview.stories.jsx` | Storybook — `Components/Alert/Overview` |
| `src/components/alert/alert-spec.md` | This file |
| `src/components/icons/CrossLarge.jsx` | Dismiss icon |
| `src/components/icons/BubbleAlert.jsx` | Status icon (pre-existing) |
| `src/design-tokens/tokens.css` | 80 alert tokens (light + dark) |

---

## 13. DS Gaps

| Gap | Impact | Status |
|---|---|---|
| Shadow token mismatch | Figma uses `color/alpha/black/10` (pure black alpha); implementation uses `--shadow-regular-medium` (`rgba(14,18,27,0.10)`). Difference is imperceptible. | Flagged for DS Auditor |
| `link-button/modifable/default` typo | "modifable" missing "i" — typo in DS token name. Do not rename without DS Auditor approval. | Implement as-is |
| `typography/weight/medium` naming | Token named "medium" renders at SemiBold (600). Legacy naming. | Implement value (600) |
| "∙" divider font — spec error corrected | Previous spec stated Inter font. Figma deep inspection (`get_design_context`) confirmed Open Sans (`typography/font/open-sans`). Fixed in Alert.css and spec. | Resolved |
| Duplicate "Supporting text" layer names | Title and description share Figma layer name — distinguished by position. | DT decision: title = first, body = second |
| Shadow visibility in dark mode | `color/alpha/black/10` may be imperceptible on dark surfaces. | Monitor — flag to DS Auditor if invisible |
| No Loading / Indeterminate state | Not in Figma scope. | Do not implement |
| Toast stacking orchestration | Stacking (8px gap, max 3) must be managed by the consumer — not internal to Alert. | Consumer responsibility |

---

## 14. Open Questions

See handoff brief Section 14 for full list. DT notes:

1. Shadow in dark mode — `--shadow-regular-medium` may not be visible on `#1b1c22` background. Verify during visual QA.
2. Action link `color` — implemented as `--link-button-modifable-default` which is `#ffffff` in light mode and `#1b1c22` in dark mode. Review against actual DS link button behavior in context.
3. Toast stacking — consumer must manage ordering, z-index increment, and max-3 limit. Alert does not stack itself.
