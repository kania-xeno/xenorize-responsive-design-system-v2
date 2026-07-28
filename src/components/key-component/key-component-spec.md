# Key Component Spec

**Design System:** Scalable V.2.1.0  
**Figma Page:** ❖ Key Component  
**Token Collection:** `VariableCollectionId:1902:2617` — single mode `"variable"`  
**Date:** 2026-07-14  
**Status:** Implemented. PasswordStrength uses placeholder icons — see §4.

---

## Components

| Component | Figma Node | File |
|---|---|---|
| `↳label-key` | `1956:5490` | `LabelKey.jsx` / `LabelKey.css` |
| `↳hint-text` | `1956:5592` | `HintText.jsx` / `HintText.css` |
| `↳password-strength` | `1956:5602` | `PasswordStrength.jsx` / `PasswordStrength.css` |
| `↳key-icon` | TBD | `KeyIcon.jsx` / `KeyIcon.css` |

All files live in `src/components/key-component/`.

---

## 1. KeyIcon (`↳key-icon`)

### Overview
Circular icon container. Display-only. No interactive states.

### Anatomy
```
div.key-icon  (wrapper — sets size, bg, border-radius, color for currentColor inheritance)
  span.key-icon__icon  (decorative, aria-hidden)
    {icon SVG}
```

### Variants
- **Style:** `stroke` (white bg + 1px border) · `lighter` (tinted bg, no border)
- **Color:** `blue` `gray` `orange` `red` `green` `yellow` `purple` `pink` `teal`
- **Size:** `s` (32px) · `m` (40px) · `l` (48px) · `xl` (56px) · `2xl` (64px)

### Sizing
| Size | Width/Height | Padding |
|------|-------------|---------|
| `s`  | 32px        | 8px     |
| `m`  | 40px        | 10px    |
| `l`  | 48px        | 12px    |
| `xl` | 56px        | 14px    |
| `2xl`| 64px        | 16px    |

Border-radius: `999px` (full circle at all sizes).

### Icon color inheritance
The wrapper sets `color: var(--key-icon-icon-{color})`. Inner SVG inherits via `currentColor` (fill on `path`). The `key-icon__icon` span is `aria-hidden="true"`.

### Token map — Style: Stroke
| Property | Token |
|---|---|
| `background-color` | `--key-icon-stroke-bg` |
| `border` | `1px solid var(--key-icon-stroke-border)` |
| `color` (currentColor) | `--key-icon-icon-{color}` |

### Token map — Style: Lighter
| Property | Token |
|---|---|
| `background-color` | `--key-icon-lighter-bg-{color}` |
| `border` | none |
| `color` (currentColor) | `--key-icon-icon-{color}` |

### Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `style` | `'stroke'` \| `'lighter'` | `'stroke'` | |
| `color` | `'blue'` \| `'gray'` \| … (9 total) | `'gray'` | |
| `size` | `'s'` \| `'m'` \| `'l'` \| `'xl'` \| `'2xl'` | `'m'` | |
| `icon` | `ReactNode` | `null` | Pass any DS icon that uses `currentColor` |
| `aria-label` | `string` | — | Set when icon is meaningful; omit for decorative |
| `className` | `string` | `''` | |

### Accessibility
- `aria-hidden="true"` by default (decorative).
- Pass `aria-label` to make it meaningful.

---

## 2. LabelKey (`↳label-key`)

### Overview
Form field label row. 2 states. Width 100%. Height HUG. The 242px Figma canvas value is a constraint, not a fixed code width.

### Anatomy
```
div.label-key[.label-key--disabled]
  span.label-key__label        — main label text
  span.label-key__required     — asterisk (*) — conditional
  span.label-key__optional     — sublabel text — conditional
  span.label-key__info-icon    — 16×16 icon — conditional
  span.label-key__help
    a.label-key__help-link / button.label-key__help-link  — conditional
```

Layout: `inline-flex`, `flex-direction: row`, `align-items: center`, `gap: 2px`.

### Variants
| State | Notes |
|---|---|
| `normal` | Default |
| `disabled` | All text → `label-text-disabled`; icon → `label-icon-disabled`; help → `label-text-disabled`, `pointer-events: none` |

### Token map
| Element | Token | Maps to |
|---|---|---|
| Label text (normal) | `--key-component-label-label` | `→ key-component-label-text → text/neutral/default` |
| Required `*` | `--color-text-brand-primary` | Direct (no key-component alias) |
| Optional sublabel | `--key-component-label-optional-text` | `→ text/neutral/sub` |
| Info icon (normal) | `--key-component-label-icon` | `→ icon/soft` |
| Info icon (disabled) | `--key-component-label-icon-disabled` | `→ icon/dissabled ⚠️` |
| All text (disabled) | `--key-component-label-text-disabled` | `→ text/neutral/disabled` |
| Help link color | `--key-component-hint-button` | `→ text/brand/link` |

### Help action
- Renders as `<a>` if `helpHref` is provided, otherwise `<button>`.
- LabelKey-internal — NOT the global Link Button component.
- Uses `--key-component-hint-button` token.
- Disabled: `pointer-events: none`, `cursor: default`, color → `--key-component-label-text-disabled`.

### Typography
| Element | DS Text Style | Size | Weight | Line-height | Letter-spacing | CSS vars |
|---|---|---|---|---|---|---|
| Label | `body/medium/md` | 14px | 600 (SemiBold) | 143% | 0 | `--text-style-body-medium-md-*` |
| Required `*` | `body/medium/md` | 14px | 600 (SemiBold) | 143% | 0 | `--text-style-body-medium-md-*` |
| Optional sublabel | `body/regular/md` | 14px | 400 | 143% | 0 | `--text-style-body-regular-md-*` |
| Help link | `caption/regular` | 12px | 400 | 133% | 0.002em | `--text-style-caption-regular-*` |

Implemented via `--text-style-*` CSS custom properties. Font family (Open Sans) is resolved through token vars.

⚠️ `body/medium/md` is a Figma text style name — it resolves to Open Sans SemiBold (600). Do not map to `fontWeight.medium` (500).

### Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string` | `'Label'` | |
| `sublabel` | `string` | `'(Optional)'` | |
| `showSublabel` | `boolean` | `false` | |
| `showRequired` | `boolean` | `false` | Renders `*` — aria-hidden |
| `showInfo` | `boolean` | `false` | Renders CircleInfo icon |
| `showHelp` | `boolean` | `false` | Renders help action |
| `helpText` | `string` | `'Help?'` | |
| `helpHref` | `string` | — | If set, renders `<a>` |
| `onHelpClick` | `function` | — | If no `helpHref`, renders `<button>` |
| `state` | `'normal'` \| `'disabled'` | `'normal'` | |
| `className` | `string` | `''` | |

### Accessibility
- Required `*` is `aria-hidden="true"` — the required state should be communicated via the associated `<input required>` or `aria-required`.
- Info icon has `role="img"` + `aria-label="More information"`.
- Help button: `aria-disabled="true"` when disabled.

---

## 3. HintText (`↳hint-text`)

### Overview
Inline form field hint. 4 states. Width 100%. Height HUG. The 190px Figma canvas value is a constraint.

### Anatomy
```
div.hint-text.hint-text--{state}
  span.hint-text__icon   — 16×16, aria-hidden — conditional
    {icon SVG}
  span.hint-text__message — text content
```

Layout: `inline-flex`, `flex-direction: row`, `align-items: center`, `gap: 4px`.

### States & tokens
| State | Icon token | Text token | Notes |
|---|---|---|---|
| `default` | `--key-component-hint-icon` | `--key-component-hint-text` | SEPARATE tokens |
| `error` | `--key-component-hint-error` | `--key-component-hint-error` | shared |
| `success` | `--key-component-hint-success` | `--key-component-hint-success` | shared |
| `disabled` | `--key-component-hint-icon-disabled` | `--key-component-hint-icon-disabled` | BOTH use icon-disabled ⚠️ |

**DS V1 decision:** `--key-component-hint-text-disabled` is confirmed bound but NOT consumed. Both icon and text in `disabled` state use `--key-component-hint-icon-disabled` (→ `icon/dissabled` ⚠️ — intentional DS typo).

### Token resolution
| Token | Maps to |
|---|---|
| `--key-component-hint-icon` | `→ icon/sub` |
| `--key-component-hint-text` | `→ text/neutral/default` |
| `--key-component-hint-error` | `→ status/danger` |
| `--key-component-hint-success` | `→ status/success (#0f6d32)` |
| `--key-component-hint-icon-disabled` | `→ icon/dissabled (#d1d1d1)` |
| `--key-component-hint-button` | `→ text/brand/link` (also used by LabelKey) |

### Typography
| Element | DS Text Style | Size | Weight | Line-height | Letter-spacing | CSS vars |
|---|---|---|---|---|---|---|
| Message | `caption/regular` | 12px | 400 | 133% | 0.002em | `--text-style-caption-regular-*` |

Implemented via `--text-style-caption-regular-*` CSS custom properties. All 4 states (Default/Error/Disabled/Success) share the same text style — confirmed via Figma.

### Icon
Default: `CircleInfo` (information-fill, `currentColor`, 16×16). Per DS V1 all 4 states share the same icon shape. Future Cleanup #2: distinct icons per state is a DS enhancement request.

### Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `message` | `string` | `'This is a hint text to help user.'` | |
| `state` | `'default'` \| `'error'` \| `'success'` \| `'disabled'` | `'default'` | |
| `showIcon` | `boolean` | `true` | |
| `icon` | `ReactNode` | — | Overrides default CircleInfo |
| `id` | `string` | — | For `aria-describedby` on the associated `<input>` |
| `className` | `string` | `''` | |

### Accessibility
- Error state: `role="alert"` + `aria-live="polite"` for live region announcement.
- Icon: `aria-hidden="true"` (decorative).
- Link `id` to `<input aria-describedby={id}>` for screen reader association.

---

## 4. PasswordStrength (`↳password-strength`)

### Overview
Password rule checker. Fixed width 300px, one size only. 4 strength levels driven by `strength` prop. VERTICAL AL — gap=8 — paddingTop=6.

### Anatomy
```
div.password-strength.password-strength--{strength}
  div.password-strength__level            (bar row — 4px height, HORIZONTAL AL, gap=4px⚠️)
    div.password-strength__bar--{state}   × 3 (flex: 1, border-radius: 1.2px)
  span.password-strength__header          ("Must contain at least;")
  div.password-strength__condition        × N (HORIZONTAL AL, gap=4px)
    span.password-strength__condition-icon--{success|failed}
      CircleCheck | CircleX (16×16)       ← ⚠️ PLACEHOLDER icons
    span.password-strength__condition-label
```

> ⚠️ Inter-bar gap (4px) is assumed — not specified in handoff brief. Review at QA.

### Strength → Bar color map
| Strength | Bar 1 | Bar 2 | Bar 3 |
|---|---|---|---|
| `empty` | `password/default` | `password/default` | `password/default` |
| `weak` | `password/error` | `password/default` | `password/default` |
| `moderate` | `password/warning` | `password/warning` | `password/default` |
| `strong` | `password/success` | `password/success` | `password/success` |

### Condition icon token map
| Condition | Icon | Color token |
|---|---|---|
| Satisfied | `CircleCheck` ⚠️ placeholder | `--key-component-password-success` |
| Failed | `CircleX` ⚠️ placeholder | `--key-component-password-icon` |

### Token map
| Element | Token | Maps to |
|---|---|---|
| Bar — inactive | `--key-component-password-default` | `surface/neutral/soft-alt` |
| Bar — weak | `--key-component-password-error` | `status/danger` |
| Bar — moderate | `--key-component-password-warning` | `status/warning (#684e00)` |
| Bar — strong + satisfied icon | `--key-component-password-success` | `status/success` |
| Failed icon | `--key-component-password-icon` | `icon/soft` |
| All text | `--key-component-password-text` | `text/neutral/default` |

### Typography
| Element | DS Text Style | Size | Weight | Line-height | Letter-spacing | CSS vars |
|---|---|---|---|---|---|---|
| Header ("Must contain at least;") | `caption/regular` | 12px | 400 | 133% | 0.002em | `--text-style-caption-regular-*` |
| Condition label | `caption/regular` | 12px | 400 | 133% | 0.002em | `--text-style-caption-regular-*` |

Implemented via `--text-style-caption-regular-*` CSS custom properties — confirmed via Figma `figma_execute` inspection.

### Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `strength` | `'empty'` \| `'weak'` \| `'moderate'` \| `'strong'` | `'empty'` | |
| `conditions` | `Array<{ label: string, satisfied: boolean }>` | 3 Figma defaults | Configurable per handoff §10 |
| `className` | `string` | `''` | |

Default conditions: `"At least 1 uppercase"` · `"At least 1 number"` · `"At least 8 characters"`.

### Placeholder icon resolution
`CircleCheck.jsx` and `CircleX.jsx` use temporary SVG geometry. To replace:
1. Open Desktop Bridge plugin in Figma → re-run Figma MCP extraction (nodes `9:96443` / `9:100399`)
2. Export SVG from Figma manually and provide path data
3. Configure `FIGMA_ACCESS_TOKEN` environment variable

Only `src/components/icons/CircleCheck.jsx` and `CircleX.jsx` need updating — no changes to PasswordStrength itself.

---

## 5. DS Gaps & Future Cleanup

| # | Gap | Decision |
|---|---|---|
| 1 | `icon/dissabled` — typo in theme layer token | Do NOT rename — this IS the source of truth |
| 2 | HintText icon per state (distinct shapes) | DS enhancement request — not in V1 |
| 3 | `--key-component-hint-text-disabled` | Confirmed bound, not consumed in V1 |
| 4 | CircleCheck / CircleX SVG paths | Placeholder geometry used — see §4 for resolution steps |
| 5 | Bar inter-gap (4px) | Assumed — not in handoff brief; confirm at QA |

---

## 6. Dark Mode Architecture

Key Component and KeyIcon tokens live in `VariableCollectionId:1902:2617` (single mode `"variable"`). This collection is intentionally single-mode. Dark mode resolves at the **theme layer** via alias chain, not in this collection. Do NOT add `[data-theme="dark"]` entries for `key-component/*` or `key-icon/*` tokens.

---

## 7. Token File Reference

All key-component and key-icon tokens: `src/design-tokens/tokens.css`

### Key additions in this release
```
--key-component-label-label          (alias for --key-component-label-text)
--key-component-label-icon           #a3a3a3
--key-component-label-icon-disabled  #d1d1d1
--key-component-hint-success         #0f6d32
--key-component-hint-text-disabled   #d1d1d1  (bound, not consumed in V1)
--key-component-password-icon-disabled #d1d1d1
```

### Stale corrections in this release
```
--key-component-password-warning     #684e00  (was #763606)
--key-icon-orange                    #3c2e00  (was #482104)
--key-icon-orange-lighter-bg         #fddc69  (was #fef4ec)
--key-icon-yellow                    #684e00  (was #763606)
--key-icon-yellow-lighter-bg         #f1c21b  (was #f8af78)
--key-icon-teal                      #22d3bb  (was #0f766e)
--key-icon-teal-lighter-bg           #cffbf5  (was #ccfbf1)
--key-icon-stroke-border             #d1d1d1  (was #a3a3a3)
```

### Spec-name aliases added
```
--key-icon-icon-{color}         (→ --key-icon-{color}) × 9
--key-icon-lighter-bg-{color}   (→ --key-icon-{color}-lighter-bg) × 9
```
