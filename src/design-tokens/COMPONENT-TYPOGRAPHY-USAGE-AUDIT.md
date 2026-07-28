# Component Typography Usage Audit

**Status:** SUPERSEDED — pre-fix snapshot; see Batch Closure Status below  
**Date:** 2026-07-27  
**Scope:** `src/components/**/*.css`  
**Foundation reference:** `src/design-tokens/tokens.css` — `--text-style-*` properties now available for all 43 Figma text styles  
**Method:** Manual read of every component CSS file + grep for all typography properties

---

## Batch Closure Status — 2026-07-28

This document is a **pre-fix audit snapshot** (2026-07-27). The typography tokenization batch is now complete. All findings below are preserved as historical pre-fix reference only.

| Component | Pre-fix status | Batch status |
|---|---|---|
| Button | B — Partial | ✅ RESOLVED — `--text-style-body-medium-lg-*` / `body-medium-md-*` / `caption-semibold-*` / `micro-regular-*` |
| Badge | B — Partial | ✅ RESOLVED — `--text-style-micro-regular-*` / `micro-medium-*` / `caption-regular-*` / `caption-semibold-*` |
| Alert | B — Partial | ✅ RESOLVED — `--text-style-body-regular-md-*` / `body-semibold-md-*` / `caption-regular-*` / `caption-semibold-*` |
| Input Text | B — Partial | ✅ RESOLVED — `--text-style-body-regular-md-*` / `caption-regular-*`; digit input confirmed intentional exception |
| LabelKey | C — Hardcoded | ✅ RESOLVED — `--text-style-body-semibold-md-*` / `caption-regular-*`; `0.02em` letter-spacing bug corrected to `0.002em` |
| HintText | C — Hardcoded | ✅ RESOLVED — `--text-style-caption-regular-*`; `0.02em` letter-spacing bug corrected |
| PasswordStrength | C — Hardcoded | ✅ RESOLVED — `--text-style-caption-regular-*`; `0.02em` letter-spacing bug corrected |
| ButtonGroup | B — Partial | ✅ RESOLVED — `--text-style-body-semibold-md-*` / `caption-semibold-*` |
| Accordion | B — Partial | ✅ RESOLVED — `--text-style-body-semibold-md-*` / `body-regular-md-*`; letter-spacing confirmed with Figma |
| Breadcrumb | C — Hardcoded | ✅ RESOLVED — `--text-style-body-regular-md-*` |
| Avatar | B — Partial + D | ✅ RESOLVED — pre-fix D exception was incorrect; all 9 sizes map to DS text styles; `--text-style-h2-regular-*` / `body-medium-xl-*` / `body-medium-lg-*` / `body-medium-md-*` / `caption-regular-*` (Figma-confirmed 2026-07-28) |
| ChartDonut (tooltip) | C — Hardcoded | ⏸ DEFERRED — tooltip typography is a separate Tooltip/ChartTooltip component handoff; DS Auditor has not handed off Tooltip yet; ChartDonut.css not edited |
| CompactSelect | Not in repo | 🚫 BLOCKED — component not in repo; pending DS Auditor handoff |
| Select | Not in repo | 🚫 BLOCKED — component not in repo; pending DS Auditor handoff |

> **Typography batch can close with ChartDonut tooltip explicitly deferred as a separate component/handoff.**

---

## Summary (pre-fix snapshot)

| Metric | Count |
|---|---|
| Total CSS files scanned | 16 |
| Files with no typography (layout/icon only) | 4 |
| Files with typography usage | 12 |
| **A — Already tokenized** (`--text-style-*` vars) | **0** |
| **B — Partially tokenized** (`--font-*` vars, no `--text-style-*`) | **7** |
| **C — Hardcoded** (raw values, no vars) | **5** |
| **D — Intentional exception (within B)** | **1** (Avatar initials font-sizes) |

### Files with no typography (skip)
- `key-component/KeyIcon.css` — icon container only
- `avatar/TopStatus.css` — `line-height: 0` is structural (prevents inline gap), not a text style
- `avatar/BottomStatus.css` — same as above
- `input-text/FormField.css` — structural layout only (flex column + gap)

### Highest priority fixes (by component priority list)
1. `button/Button.css` — partial; `line-height` hardcoded across all 3 sizes
2. `input-text/InputText.css` — partial; `font-size: 14px` hardcoded (not using `--font-size-body-md`)
3. `badge/Badge.css` — partial; both size variants fully hardcode `font-size` and `line-height`

### Cross-cutting bug discovered
**`0.02em` letter-spacing error in 3 key-component files.** Correct value for caption (0.2% Figma) is `0.002em`. These files use `0.02em` (10× too large). Must be corrected when these components are tokenized.

---

## Findings by Component

---

### 1. Button — `src/components/button/Button.css`

**Pre-fix status: B — Partially tokenized** — ✅ **RESOLVED**

Uses `--font-family-body`, `--font-weight-medium`, `--font-size-body-lg`, `--font-size-body-md`, `--font-size-body-sm`, `--font-size-micro`, `--font-weight-medium` as vars. Does NOT use `--text-style-*` tokens.

#### Typography blocks

| Selector | font-family | font-weight | font-size | line-height | letter-spacing |
|---|---|---|---|---|---|
| `.button` (Large) | `var(--font-family-body)` ✓ | `var(--font-weight-medium)` ✓ | `var(--font-size-body-lg)` ✓ | `1.5` ❌ | — |
| `.button__badge` | — inherits | `var(--font-weight-medium)` ✓ | `var(--font-size-micro)` ✓ | — | `0.05px` ❌ |
| `.button--size-small` | — inherits | — inherits | `var(--font-size-body-sm)` ✓ | `1.33` ❌ | `0.024px` ❌ |
| `.button--size-medium` | — inherits | — inherits | `var(--font-size-body-md)` ✓ | `1.43` ❌ | — |

#### Hardcoded properties
- `line-height: 1.5` — Large button (150% → matches `--text-style-body-semibold-lg-line-height`)
- `line-height: 1.33` — Small button
- `line-height: 1.43` — Medium button
- `letter-spacing: 0.05px` — badge counter (should be `0.005em` via `--text-style-micro-medium-letter-spacing`)
- `letter-spacing: 0.024px` — Small button (should be `0.002em` via `--text-style-caption-semibold-letter-spacing`)

#### Proposed target text-style tokens

| Selector | Proposed token group |
|---|---|
| `.button` (Large) | `--text-style-body-semibold-lg-*` (Open Sans / 600 / 16px / 150% / 0) |
| `.button__badge` | `--text-style-micro-medium-*` (Open Sans / semibold=600 / 10px / 150% / 0.005em) |
| `.button--size-small` | `--text-style-caption-semibold-*` (Open Sans / 600 / 12px / 133% / 0.002em) |
| `.button--size-medium` | `--text-style-body-semibold-md-*` (Open Sans / 600 / 14px / 143% / 0) |

> **⚠️ Weight note:** `.button` base uses `var(--font-weight-medium)` = 500. `--font-weight-medium` was previously 600; it is now 500 (correct). Open Sans has no native 500 — this will now render as Regular (400). If button labels should be SemiBold (600), the token should be `var(--font-weight-semibold)` or the button should reference `--text-style-body-semibold-lg-font-weight`. **Verify against Figma before fixing.** The comment in Button.css says "Figma: body/medium/md" for the medium size — `body/medium/*` resolves to SemiBold/600 in our DS. This suggests the intended render weight is 600, meaning the base `.button` should likely also reference `--font-weight-semibold` (not medium).

**Confidence:** High for line-height/letter-spacing. Medium for weight (requires Figma weight verification).

---

### 2. Input Text — `src/components/input-text/InputText.css`

**Pre-fix status: B — Partially tokenized** — ✅ **RESOLVED**

Uses `var(--font-family-body)` for font-family but hardcodes font-size, font-weight, and line-height.

#### Typography blocks

| Selector | font-family | font-weight | font-size | line-height | letter-spacing |
|---|---|---|---|---|---|
| `.input-text__field` | `var(--font-family-body)` ✓ | `400` ❌ | `14px` ❌ | `1.43` ❌ | `0` (ok) |
| `.input-text--xs .input-text__field` | — inherits | — inherits | `12px` ❌ | — inherits 1.43 | — |
| `.digit-input__cell` | `var(--font-family-body)` ✓ | `400` ❌ | `24px` ❌ | `1` ❌ | — |

#### Hardcoded properties
- `font-size: 14px` — field (should be `var(--font-size-body-md)`)
- `font-size: 12px` — xs variant (should be `var(--font-size-body-sm)`)
- `font-weight: 400` — field and digit cell
- `line-height: 1.43` — field
- `font-size: 24px` — digit cell
- `line-height: 1` — digit cell

#### Proposed target text-style tokens

| Selector | Proposed token group |
|---|---|
| `.input-text__field` (default) | `--text-style-body-regular-md-*` (Open Sans / 400 / 14px / 143% / 0) |
| `.input-text--xs .input-text__field` | `--text-style-caption-regular-*` (Open Sans / 400 / 12px / 133% / 0.002em) — note: current has `letter-spacing: 0`, not 0.002em; verify Figma |
| `.digit-input__cell` | **D — Intentional exception candidate** |

> **⚠️ Digit input exception:** `.digit-input__cell` uses `font-size: 24px` / `line-height: 1`. 24px is not in any Figma text style. This is a custom display style for center-aligned OTP digits in fixed 80×64px cells. Likely intentional. Flag for explicit Figma confirmation before tokenizing.

**Confidence:** High for `.input-text__field`. Low/exception for `.digit-input__cell`.

---

### 3. Badge — `src/components/badge/Badge.css`

**Pre-fix status: B — Partially tokenized** — ✅ **RESOLVED**

Uses `var(--font-family-body)` but does not use `--font-size-*` vars for size variants. Size variants fully hardcode font-size and line-height.

#### Typography blocks

| Selector | font-family | font-weight | font-size | line-height | letter-spacing |
|---|---|---|---|---|---|
| `.badge` (base) | `var(--font-family-body)` ✓ | `400` ❌ | — (size-specific) | — | — |
| `.badge__number` | — inherits | `600` ❌ | — inherits | — | — |
| `.badge--small` | — inherits | — inherits base | `10px` ❌ | `1.5` ❌ | `0.005em` ✓ |
| `.badge--medium` | — inherits | — inherits base | `12px` ❌ | `1.33` ❌ | `0.002em` ✓ |

> Letter-spacing values in badge are already in correct em format and match the text-style tokens.

#### Hardcoded properties
- `font-weight: 400` — base `.badge`
- `font-weight: 600` — `.badge__number`
- `font-size: 10px` — small variant (should be `var(--font-size-micro)` or `var(--font-size-label)`)
- `font-size: 12px` — medium variant (should be `var(--font-size-body-sm)`)
- `line-height: 1.5` — small
- `line-height: 1.33` — medium

#### Proposed target text-style tokens

The badge uses a two-layer pattern: base sets default weight (regular), `.badge__number` overrides to semibold. Text style selection depends on both size variant AND number variant.

| Selector combination | Text style | Token group |
|---|---|---|
| `.badge--small` (default, no number) | `micro/regular` | `--text-style-micro-regular-*` |
| `.badge--small.has(.badge__number)` | `micro/medium` (renders SemiBold/600) | `--text-style-micro-medium-*` |
| `.badge--medium` (default, no number) | `caption/regular` | `--text-style-caption-regular-*` |
| `.badge--medium.has(.badge__number)` | `caption/semibold` | `--text-style-caption-semibold-*` |

> **Note:** `badge--small` maps to `micro/*` (10px), not `label/*` (also 10px). Distinction: micro has 150% line-height and 0.005em tracking; label has 140% and 0.002em. Badge uses 150%/0.005em → micro is correct.

**Confidence:** High.

---

### 4. Alert — `src/components/alert/Alert.css`

**Pre-fix status: B — Partially tokenized** — ✅ **RESOLVED**

Uses `--font-family-body`, `--font-size-body-md`, `--font-size-body-sm` vars but hardcodes font-weight, line-height, and letter-spacing.

#### Typography blocks

| Selector | font-family | font-weight | font-size | line-height | letter-spacing |
|---|---|---|---|---|---|
| `.alert` (base, Large) | `var(--font-family-body)` ✓ | `400` ❌ | `var(--font-size-body-md)` ✓ | `1.43` ❌ | — |
| `.alert__title` | — inherits | `600` ❌ | — inherits | — inherits | — |
| `.alert__description` | — inherits | `400` ❌ | — inherits | — inherits | — |
| `.alert__action` | `var(--font-family-body)` ✓ | `600` ❌ | `var(--font-size-body-md)` ✓ | `1.43` ❌ | — |
| `.alert__action-divider` | `var(--font-family-body)` ✓ | `400` ❌ | `var(--font-size-body-md)` ✓ | `1.43` ❌ | — |
| `.alert--x-small` | — inherits | — inherits | `var(--font-size-body-sm)` ✓ | `1.33` ❌ | `0.024px` ❌ |
| `.alert--small` | — inherits | — inherits | `var(--font-size-body-sm)` ✓ | `1.33` ❌ | `0.024px` ❌ |
| `.(x-small\|small) .alert__action` | — inherits | — inherits 600 | `var(--font-size-body-sm)` ✓ | `1.33` ❌ | `0.024px` ❌ |

#### Hardcoded properties
- `font-weight: 400` in `.alert` base, `.alert__description`, `.alert__action-divider`
- `font-weight: 600` in `.alert__title`, `.alert__action`
- `line-height: 1.43` in base and several selectors
- `line-height: 1.33` in x-small/small
- `letter-spacing: 0.024px` — pixel-based; should be `var(--text-style-caption-regular-letter-spacing)` = `0.002em` (equivalent at 12px but not responsive)

#### Proposed target text-style tokens

| Selector | Proposed token group |
|---|---|
| `.alert` base (Large) | `--text-style-body-regular-md-*` |
| `.alert__title` | `--text-style-body-semibold-md-*` (inherits size from base, overrides weight) |
| `.alert__description` | `--text-style-body-regular-md-*` (same as base, explicit) |
| `.alert__action` (Large) | `--text-style-body-semibold-md-*` |
| `.alert__action-divider` (Large) | `--text-style-body-regular-md-*` |
| `.alert--x-small` / `.alert--small` | `--text-style-caption-regular-*` |
| `.(x-small\|small) .alert__action` | `--text-style-caption-semibold-*` |

> **Note:** Alert comments say "typography/weight/medium → 600 per DS spec" for `.alert__action`. This is the `body/medium` pattern (Open Sans → SemiBold/600). The correct token reference is `--text-style-body-semibold-md-font-weight` or `var(--font-weight-semibold)`.

**Confidence:** High.

---

### 5. Chart Donut — `src/components/chart-donut/ChartDonut.css`

**Pre-fix status: C — Hardcoded** — ⏸ **DEFERRED — separate Tooltip/ChartTooltip component handoff required**

ChartDonut.css was NOT edited. The tooltip typography gap is intentionally deferred. The tooltip should be treated as a separate `Tooltip / ChartTooltip` component. DS Auditor has not handed off Tooltip/ChartTooltip yet. ChartDonut main component is closed for typography; tooltip typography remains a documented deferred gap.

#### Pre-fix typography blocks (historical reference)

| Selector | font-family | font-weight | font-size | line-height | letter-spacing |
|---|---|---|---|---|---|
| Chart tooltip | `'Open Sans', sans-serif` ❌ | `400` ❌ | `12px` ❌ | `1.5` ❌ | — |

#### Pre-fix hardcoded properties
All: font-family (raw string), font-size, font-weight, line-height.

#### Pre-fix proposed target text-style tokens (historical — not applied)
`caption/regular` is the closest by size + weight:

| Proposed | Values |
|---|---|
| `--text-style-caption-regular-*` | Open Sans / 400 / 12px / **133%** / 0.002em |

> **⚠️ Line-height discrepancy (pre-fix finding):** Current chart tooltip uses `line-height: 1.5` (150%). `caption/regular` is 133%. `micro/regular` is 150% but at 10px, not 12px. There is no 12px/150% Figma text style. This may be an intentional tooltip deviation for readability. Tooltip/ChartTooltip handoff from DS Auditor should clarify. Do not tokenize until handoff is received.

**Confidence (pre-fix):** Low for line-height. High for font-family/weight/size.

---

### 6. Breadcrumb — `src/components/breadcrumb/Breadcrumb.css`

**Pre-fix status: C — Hardcoded** — ✅ **RESOLVED**

All typography properties hardcoded. No token vars used.

#### Typography blocks

| Selector | font-family | font-weight | font-size | line-height | letter-spacing |
|---|---|---|---|---|---|
| `.breadcrumb-divider` (approx) | `'Open Sans', sans-serif` ❌ | `400` ❌ | `14px` ❌ | `1.43` ❌ | — |
| `.breadcrumb-item__label` | `'Open Sans', sans-serif` ❌ | `400` ❌ | `14px` ❌ | `1.43` ❌ | — |

#### Hardcoded properties
All: font-family (raw string), font-size, font-weight, line-height.

#### Proposed target text-style tokens
Both selector blocks → `body/regular/md`:

```css
/* Proposed: */
font-family:    var(--text-style-body-regular-md-font-family);
font-weight:    var(--text-style-body-regular-md-font-weight);
font-size:      var(--text-style-body-regular-md-font-size);
line-height:    var(--text-style-body-regular-md-line-height);
letter-spacing: var(--text-style-body-regular-md-letter-spacing);
```

**Confidence:** High. Values match exactly: Open Sans / 400 / 14px / 143% / 0.

---

### 7. Button Group — `src/components/button-group/ButtonGroup.css`

**Pre-fix status: B — Partially tokenized** — ✅ **RESOLVED**

Uses `--font-family-body` and `--font-size-body-*` vars but hardcodes font-weight and line-height.

#### Typography blocks

| Selector | font-family | font-weight | font-size | line-height | letter-spacing |
|---|---|---|---|---|---|
| `.button-group-item` (base) | `var(--font-family-body)` ✓ | `600` ❌ | `var(--font-size-body-md)` ✓ | `1.43` ❌ | `0` (ok) |
| `--small`, `--x-small` | — inherits | — inherits | `var(--font-size-body-md)` ✓ | — inherits | — |
| `--2x-small` | — inherits | — inherits | `var(--font-size-body-sm)` ✓ | — inherits 1.43 | — |

#### Hardcoded properties
- `font-weight: 600` — base (all sizes inherit)
- `line-height: 1.43` — base (all sizes inherit, including 2x-small which should be 133%)

> **⚠️ 2x-small line-height issue:** The `--2x-small` variant uses `font-size: 12px` (via `--font-size-body-sm`) but inherits `line-height: 1.43` from the base. `caption/*` styles use 133%, not 143%. When tokenizing 2x-small, line-height should be `var(--text-style-caption-semibold-line-height)` = 133%.

#### Proposed target text-style tokens

| Size | Proposed token group |
|---|---|
| Base / small / x-small (14px) | `--text-style-body-semibold-md-*` (Open Sans / 600 / 14px / 143% / 0) |
| 2x-small (12px) | `--text-style-caption-semibold-*` (Open Sans / 600 / 12px / 133% / 0.002em) |

**Confidence:** High.

---

### 8. Accordion — `src/components/accordion/Accordion.css`

**Pre-fix status: B — Partially tokenized (ambiguous)** — ✅ **RESOLVED**

Uses `--font-family-body`, `--font-weight-semibold`, `--font-weight-regular` vars but hardcodes font-size, line-height (in px), and letter-spacing.

#### Typography blocks

| Selector | font-family | font-weight | font-size | line-height | letter-spacing |
|---|---|---|---|---|---|
| `.accordion__title` | `var(--font-family-body)` ✓ | `var(--font-weight-semibold)` ✓ | `14px` ❌ | `20px` ❌ | `-0.084px` ❌ |
| `.accordion__body-text` | `var(--font-family-body)` ✓ | `var(--font-weight-regular)` ✓ | `14px` ❌ | `20px` ❌ | `-0.084px` ❌ |

#### Hardcoded properties
- `font-size: 14px` (both) — should be `var(--font-size-body-md)`
- `line-height: 20px` (both) — 20px at 14px = 142.8% ≈ 143%; should be a percentage or `var(--text-style-body-semibold-md-line-height)`
- `letter-spacing: -0.084px` (both) — `-0.084px` at 14px = -0.6% = `-0.006em`

#### ⚠️ Letter-spacing anomaly — requires Figma verification

`-0.084px` / `-0.006em` does **not** match any Figma text style in the design system:
- `body/semibold/md` → `letter-spacing: 0` (no tracking)
- `body/regular/md` → `letter-spacing: 0` (no tracking)

The closest text styles by other properties are `body/semibold/md` and `body/regular/md` respectively, but neither has negative letter-spacing. This value appears to be a per-component deviation. **Must be verified against Figma before tokenizing.**

If confirmed as a per-component style: retain `letter-spacing: -0.084px` with an explicit comment; tokenize all other properties.

#### Proposed target text-style tokens (pending Figma confirmation)

| Selector | Proposed token group | Caveat |
|---|---|---|
| `.accordion__title` | `--text-style-body-semibold-md-*` | Letter-spacing must be verified; likely exception |
| `.accordion__body-text` | `--text-style-body-regular-md-*` | Same caveat |

**Confidence:** Low (letter-spacing anomaly requires Figma verification before fixing).

---

### 9. Avatar — `src/components/avatar/Avatar.css`

**Pre-fix status: B — Partially tokenized + D (intentional exception)** — ✅ **RESOLVED 2026-07-28**

The pre-fix D exception classification was **incorrect**. Figma inspection of each size variant individually (nodes 2107:172–204, 2026-07-28) confirmed that all 9 sizes DO map to named DS text styles. The proportional font-size scale in the pre-fix CSS was a DT estimate, not a Figma-confirmed value.

**Actual Figma-confirmed mapping (now in Avatar.css):**

| Size(s) | DS Text Style | CSS vars |
|---|---|---|
| 80, 72, 64 | `h2/regular` | `--text-style-h2-regular-*` |
| 56, 48 | `body/medium/xl` | `--text-style-body-medium-xl-*` |
| 40 | `body/medium/lg` | `--text-style-body-medium-lg-*` |
| 32 | `body/medium/md` | `--text-style-body-medium-md-*` |
| 24, 20 | `caption/regular` | `--text-style-caption-regular-*` |

See `avatar-spec.md` § Typography for full per-size detail.

#### Pre-fix typography blocks (historical reference — now superseded)

| Selector | font-family | font-weight | font-size | line-height | Notes |
|---|---|---|---|---|---|
| `.avatar__initials` (base) | `var(--font-family-body)` | `var(--font-weight-medium)` | — (set per size) | `1` ❌ | line-height: 1 was incorrect |
| `.avatar--size-{n} .avatar__initials` | — | — | `8–28px` ❌ | — | DT-estimated scale — all wrong |

**Confidence:** High (Figma-confirmed).

---

### 10. LabelKey — `src/components/key-component/LabelKey.css`

**Pre-fix status: C — Hardcoded** — ✅ **RESOLVED**

All typography properties hardcoded using raw `'Open Sans', sans-serif` font string.

#### Typography blocks

| Selector | font-family | font-weight | font-size | line-height | letter-spacing |
|---|---|---|---|---|---|
| `.label-key__label` | `'Open Sans', sans-serif` ❌ | `600` ❌ | `14px` ❌ | `1.43` ❌ | `0` (ok) |
| `.label-key__required` | `'Open Sans', sans-serif` ❌ | `600` ❌ | `14px` ❌ | `1.43` ❌ | — |
| `.label-key__optional` | `'Open Sans', sans-serif` ❌ | `400` ❌ | `12px` ❌ | `1.33` ❌ | `0.02em` ⚠️ |
| `.label-key__help-link` | `'Open Sans', sans-serif` ❌ | `400` ❌ | `12px` ❌ | `1.33` ❌ | — |

#### ⚠️ Letter-spacing bug: `0.02em` → should be `0.002em`

`.label-key__optional` uses `letter-spacing: 0.02em`. Figma caption letter-spacing = 0.2% → `0.002em`. The current value is 10× too large (2% instead of 0.2%). This bug must be corrected when tokenizing.

**Correct value:** `var(--text-style-caption-regular-letter-spacing)` = `0.002em`

#### Proposed target text-style tokens

| Selector | Proposed token group |
|---|---|
| `.label-key__label` | `--text-style-body-semibold-md-*` (Open Sans / 600 / 14px / 143% / 0) |
| `.label-key__required` | `--text-style-body-semibold-md-*` (same) |
| `.label-key__optional` | `--text-style-caption-regular-*` (Open Sans / 400 / 12px / 133% / **0.002em**) |
| `.label-key__help-link` | `--text-style-caption-regular-*` (no letter-spacing specified — verify Figma) |

**Confidence:** High. Values match exactly once letter-spacing bug is corrected.

---

### 11. HintText — `src/components/key-component/HintText.css`

**Pre-fix status: C — Hardcoded** — ✅ **RESOLVED**

#### Typography blocks

| Selector | font-family | font-weight | font-size | line-height | letter-spacing |
|---|---|---|---|---|---|
| `.hint-text__message` | `'Open Sans', sans-serif` ❌ | `400` ❌ | `12px` ❌ | `1.33` ❌ | `0.02em` ⚠️ |

#### ⚠️ Letter-spacing bug: same as LabelKey
`0.02em` should be `0.002em` (Figma caption: 0.2% → 0.002em).

#### Proposed target text-style tokens

| Selector | Proposed token group |
|---|---|
| `.hint-text__message` | `--text-style-caption-regular-*` |

```css
/* Proposed: */
.hint-text__message {
  font-family:    var(--text-style-caption-regular-font-family);
  font-weight:    var(--text-style-caption-regular-font-weight);
  font-size:      var(--text-style-caption-regular-font-size);
  line-height:    var(--text-style-caption-regular-line-height);
  letter-spacing: var(--text-style-caption-regular-letter-spacing); /* 0.002em — fixes current 0.02em bug */
}
```

**Confidence:** High.

---

### 12. PasswordStrength — `src/components/key-component/PasswordStrength.css`

**Pre-fix status: C — Hardcoded** — ✅ **RESOLVED**

#### Typography blocks

| Selector | font-family | font-weight | font-size | line-height | letter-spacing |
|---|---|---|---|---|---|
| `.password-strength__header` | `'Open Sans', sans-serif` ❌ | `400` ❌ | `12px` ❌ | `1.33` ❌ | `0.02em` ⚠️ |
| `.password-strength__condition-label` | `'Open Sans', sans-serif` ❌ | `400` ❌ | `12px` ❌ | `1.33` ❌ | `0.02em` ⚠️ |

#### ⚠️ Letter-spacing bug: both selectors
Same `0.02em` → `0.002em` correction required.

#### Proposed target text-style tokens

Both selectors → `--text-style-caption-regular-*`

**Confidence:** High.

---

## Suggested Fix Order (pre-fix — historical reference)

> **Note (2026-07-28):** The fixes below have been completed. This section is preserved as a historical record of the fix plan.

Based on component priority list, severity, and fix clarity:

### Fix 1 — `button/Button.css`
**Why first:** Highest traffic component. Three distinct sizes each have hardcoded line-height. `letter-spacing: 0.05px` in badge and `0.024px` in small are in px — not responsive. Weight ambiguity (medium vs semibold) must be Figma-confirmed first; the rest can proceed.

**Scope of changes:** Replace `line-height: 1.5 / 1.33 / 1.43` with `var(--text-style-*-line-height)` in three selectors. Replace px letter-spacing values with em-based token vars. Confirm weight token (medium vs semibold) with Figma before touching font-weight.

### Fix 2 — `input-text/InputText.css`
**Why second:** Core form component. `font-size: 14px` is hardcoded where `var(--font-size-body-md)` should be used — breaks the responsive system. `font-weight: 400` and `line-height: 1.43` should also use token vars. Digit input (`24px / line-height: 1`) should be flagged as intentional exception with a comment.

**Scope of changes:** 3 properties on `.input-text__field`, 1 on xs variant, comment + no-change for digit cell.

### Fix 3 — `badge/Badge.css`
**Why third:** Simple text styles (micro/caption), clean separation between size variants. Good proof-of-concept for two-tier pattern (base weight → number weight override). Also introduces `--font-size-micro` and `--font-size-body-sm` token vars to replace hardcoded sizes.

**Scope of changes:** Base class (2 props), two size variant blocks (font-size + line-height), number override (1 prop).

---

## Guardrail for Future Component CSS

```
Component CSS must not hardcode font-family, font-weight, font-size, line-height,
or letter-spacing when a matching --text-style-* token exists in tokens.css.

Correct usage:
  font-family:    var(--text-style-body-regular-md-font-family);
  font-weight:    var(--text-style-body-regular-md-font-weight);
  font-size:      var(--text-style-body-regular-md-font-size);
  line-height:    var(--text-style-body-regular-md-line-height);
  letter-spacing: var(--text-style-body-regular-md-letter-spacing);

Exceptions require an explicit comment citing the reason and a Figma node reference:
  font-size: 24px; /* Digit input display — no Figma text style; 80×64px fixed cell */
  font-size: 28px; /* Avatar initials — proportional to 80px container size; not a text style */

Avoid:
  font-family: 'Open Sans', sans-serif;  /* use var(--text-style-*-font-family) */
  font-weight: 600;                       /* use var(--text-style-*-font-weight) */
  font-size: 14px;                        /* use var(--text-style-*-font-size) or var(--font-size-body-md) */
  line-height: 1.43;                      /* use var(--text-style-*-line-height) */
  letter-spacing: 0.024px;               /* use var(--text-style-*-letter-spacing) in em units */
```

---

## Appendix — Full CSS File Inventory

> Batch closure status appended 2026-07-28. Pre-fix status preserved for reference.

| File | Typography | Pre-fix status | Batch status |
|---|---|---|---|
| `button/Button.css` | Yes | B — Partial | ✅ RESOLVED |
| `badge/Badge.css` | Yes | B — Partial | ✅ RESOLVED |
| `alert/Alert.css` | Yes | B — Partial | ✅ RESOLVED |
| `button-group/ButtonGroup.css` | Yes | B — Partial | ✅ RESOLVED |
| `breadcrumb/Breadcrumb.css` | Yes | C — Hardcoded | ✅ RESOLVED |
| `chart-donut/ChartDonut.css` | Yes | C — Hardcoded | ⏸ DEFERRED (tooltip = separate Tooltip/ChartTooltip handoff) |
| `accordion/Accordion.css` | Yes | B — Partial (ambiguous letter-spacing) | ✅ RESOLVED |
| `avatar/Avatar.css` | Yes | B — Partial + D exception | ✅ RESOLVED (D exception was incorrect; Figma-confirmed 2026-07-28) |
| `input-text/InputText.css` | Yes | B — Partial | ✅ RESOLVED |
| `input-text/FormField.css` | Layout only | — skip | — skip |
| `key-component/LabelKey.css` | Yes | C — Hardcoded (letter-spacing bug) | ✅ RESOLVED |
| `key-component/HintText.css` | Yes | C — Hardcoded (letter-spacing bug) | ✅ RESOLVED |
| `key-component/PasswordStrength.css` | Yes | C — Hardcoded (letter-spacing bug) | ✅ RESOLVED |
| `key-component/KeyIcon.css` | None | — skip | — skip |
| `avatar/TopStatus.css` | Structural only | — skip | — skip |
| `avatar/BottomStatus.css` | Structural only | — skip | — skip |
