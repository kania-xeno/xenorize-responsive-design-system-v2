# Layer 1 & 2 Figma Parity Audit

**Files audited:** `src/design-tokens/tokens.json` · `src/design-tokens/tokens.css`
**Figma source:** Design System Scalable V2.1.0
**Collections audited:** `primitive` (Layer 1) · `theme` (Layer 2 / semantic)
**Date:** 2026-07-24
**Scope:** Layer 1 and Layer 2 only — component collection excluded from this pass.
**Status:** Report only — no edits applied, no commits made.

---

## Figma Inspection Method

Figma was inspected via REST-backed MCP tools (`get_variable_defs`, `get_metadata`).
The Figma Desktop Bridge plugin was not connected during this session; the `figma_get_variables` tool was unavailable.

Variables were collected from two Figma nodes:
- **Node `1995:2560` (Supporting text)** — yielded semantic text/alert/typography variables
- **Node `658:2055` (Button page)** — yielded the richest variable set: button component variables, brand/alpha/surface/text/status semantics, typography, spacing, radius, shadow, and alpha color primitives

The canary variable `color/primitive/brand/stpatrick/800 = #20184B` was provided by the user as a known Figma variable to validate. This was not directly visible from the button node but is consistent with the stpatrick alpha color family observed there (`color/alpha/stpatrick/16 = #513ebe29`).

**Figma variables are confirmed inspected. Token types covered: color, alpha, typography, spacing, radius, shadow/effects. Component collection was not audited.**

---

## A. Summary Counts

| Source | Count | Notes |
|--------|-------|-------|
| Figma L1 primitives inspected | 17+ confirmed | REST API only; not exhaustive |
| Figma L2 theme/semantic inspected | 25+ confirmed | REST API only; not exhaustive |
| Repo JSON — L1 (`primitive.*`) paths | **446** | Color 153, Typography 193, Spacing 18, Radius 17, Breakpoint 21, Shadow 44 |
| Repo JSON — L2 (`semantic.*`) paths | **226** | Color 118, Chart 102 (incl. note), Shadow FocusRing 6 |
| Repo CSS — `--prim-*` vars (L1) | **153** | Color primitives only; no prim-spacing, prim-radius, prim-shadow vars |
| Repo CSS — L2 (`--color-*`, `--chart-*`, `--shadow-*`) | ~**200** | 84 `--color-*` + 51 `--chart-*` + 26 `--shadow-*` (not all semantic) |
| CSS total vars | **1,034** | Includes all component vars |
| CSS dark block overrides | **232** | `[data-theme="dark"]` block |

---

## B. Missing from Repo

### B1 — Figma Primitive → Missing in JSON

| Figma Path | Figma Value | Status |
|------------|-------------|--------|
| `color/primitive/brand/stpatrick/800` | `#20184B` | **MISSING** — no stpatrick key exists anywhere in tokens.json |
| `color/alpha/stpatrick/16` | `#513ebe29` | **MISSING** — repo has `primary16` but with wrong base color |
| `color/alpha/black/24` | `#1717173d` | **MISSING** — no black/24 alpha token exists |

### B2 — Figma Primitive → Missing in CSS

| Figma Path | Expected CSS Var | Status |
|------------|-----------------|--------|
| `color/primitive/brand/stpatrick/800` | `--prim-stpatrick-800` or `--prim-purple-800` | **MISSING** |
| `color/alpha/stpatrick/16` | `--prim-alpha-stpatrick16` | **MISSING** |
| `color/alpha/black/24` | `--prim-alpha-black24` | **MISSING** |

### B3 — Figma Theme → Missing in JSON

| Figma Path | Notes |
|------------|-------|
| `color/bg/weak` (canonical) | JSON has `semantic.color.bg.weak` ✓ but CSS has only the alias variants `--color-bg-weak-25` / `--color-bg-weak-50`, not the canonical `--color-bg-weak` |

### B4 — Figma Theme → Missing in CSS

None. All 58 confirmed L2 semantic.color JSON tokens have correct CSS equivalents in the light block. Dark block overrides are present for all tokens that have a different dark value in JSON. ✓

---

## C. Value Mismatches

### C1 — Primitive Value Mismatches

| Figma Path | Figma Value | Repo Path | Repo Value | Type |
|------------|-------------|-----------|------------|------|
| `color/alpha/stpatrick/16` | `#513ebe29` | `primitive.color.alpha.primary16` | `#7963ba29` | **Wrong name + wrong value** — base color `#7963ba` is not in primitive palette |
| `color/alpha/black/10` | `#1717171a` | `primitive.color.alpha.black4` | `#1717170a` | **Wrong name + wrong value** — `0a` ≈ 4%, `1a` ≈ 10%; different alpha amounts |
| `color/alpha/slate/16` | `#82879c29` | `primitive.color.alpha.slate16` | `#99a0ae29` | **Value mismatch** — base color differs: `#82879c` (Figma slate) vs `#99a0ae` (repo) |

### C2 — Repo-only Primitives with Suspicious Values (no Figma backing found)

| Repo Path | Value | Issue |
|-----------|-------|-------|
| `primitive.color.alpha.primary10` | `#476cff1a` | Base `#476cff` not in primitive palette (not purple-*, not any scale) — likely stale |
| `primitive.color.alpha.red10` | `#fb37481a` | Base `#fb3748` not in official red scale — likely stale |

### C3 — Theme / L2 Value Mismatches

**None detected.** All 58 L2 semantic color tokens where both JSON and CSS exist have correct values. ✓

### C4 — Typography Value Mismatches

| Figma Variable | Figma Value | Repo CSS | Notes |
|----------------|-------------|----------|-------|
| `fontSize/body/lg` | `16` (flat) | `--font-size-body-lg: 16px` (desktop), `14px` (tablet/mobile) | Expected — Figma stores desktop single value, CSS correctly applies responsive overrides via `@media`. No fix needed. |

No typography value mismatches beyond the expected responsive divergence.

---

## D. Alias Mismatches

No alias mismatches detected. Where L2 JSON tokens exist and have CSS counterparts, the primitive alias chain is correct:

- JSON: `semantic.color.brand.primary.light = primitive.color.purple.600`
- CSS: `--color-brand-primary: var(--prim-purple-600)` ✓

The naming convention difference (JSON camelCase vs CSS kebab-case) is consistent throughout and is not a mismatch — it is the established translation rule.

---

## E. Repo-only Stale Tokens

### E1 — JSON-only (in tokens.json, no CSS output emitted)

| JSON Category | Path Count | Notes |
|--------------|------------|-------|
| `primitive.breakpoint.modal.*` | 18 | Modal `maxWidth` / `maxHeight` for sm/md/lg × desktop/tablet/mobile. No `--breakpoint-modal-*` CSS vars emitted. |
| `primitive.typography.textStyles.*` | 149 | Full composite text style specs (font, weight, size, lineHeight, letterSpacing). No `--text-style-*` CSS vars emitted. Architecture decision pending. |
| `primitive.shadow.components.*` | 15 | Component shadow definitions (tooltip, buttons, toggle, customInput, etc.). No CSS vars emitted. Intentional deferral or oversight — cannot confirm without DS sign-off. |
| `primitive.shadow.focusRing.primaryDark` / `neutralDark` / `errorDark` | 3 | Dark-mode focus ring variants exist in JSON but are NOT emitted in the CSS dark block. |

### E2 — CSS-only (in tokens.css, no JSON L2 semantic equivalent)

These 26 `--color-*` CSS vars exist in the light block with no direct JSON `semantic.color.*` counterpart. Most are alias variants or legacy names used by component CSS.

| CSS Var | Value | Classification |
|---------|-------|----------------|
| `--color-bg-soft-200` | `var(--prim-slate-200)` | Alias — duplicate of `--color-surface-soft-alt` |
| `--color-bg-weak-25` | `var(--prim-neutral-25)` | Alias for `semantic.color.bg.weak` |
| `--color-bg-weak-50` | `var(--prim-neutral-25)` | Duplicate alias (same value as -25) |
| `--color-bg-white-0` | `var(--prim-slate-0)` | Alias for `--color-surface-white` |
| `--color-border-neutral-default` | `var(--prim-neutral-300)` | Alias for `--color-border-default` |
| `--color-border-neutral-strong` | `var(--prim-neutral-600)` | Alias for `--color-border-strong` |
| `--color-border-neutral-subtle` | `var(--prim-neutral-200)` | Alias for `--color-border-subtle` |
| `--color-border-stroke-soft-200` | `var(--prim-neutral-75)` | Duplicate of `--color-border-stroke-soft` |
| `--color-brand-primary-base` | `var(--prim-purple-600)` | Alias for `--color-brand-primary` |
| `--color-brand-primary-darker` | `var(--prim-purple-700)` | Alias for `--color-brand-primary-dark` |
| `--color-extra-alpha-black-4` | `var(--prim-alpha-black4)` | References stale `black4` primitive (wrong value vs Figma) |
| `--color-icon-sub-600` | `var(--prim-neutral-600)` | Alias for `--color-icon-sub` |
| `--color-surface-neutral-soft` | `var(--prim-slate-100)` | Alias for `--color-surface-soft` |
| `--color-surface-neutral-soft-alt` | `var(--prim-slate-200)` | Alias for `--color-surface-soft-alt` |
| `--color-surface-neutral-strong-950` | `var(--prim-neutral-950)` | Alias for `--color-surface-strong` |
| `--color-surface-neutral-weak` | `var(--prim-slate-50)` | Alias for `--color-surface-weak` |
| `--color-surface-neutral-white` | `var(--prim-slate-0)` | Alias for `--color-surface-white` |
| `--color-text-brand-primary` | `var(--prim-purple-700)` | Alias for `--color-text-brand` |
| `--color-text-disabled-300` | `var(--prim-neutral-300)` | Alias for `--color-text-disabled` |
| `--color-text-neutral-disabled` | `var(--prim-neutral-300)` | Alias for `--color-text-disabled` |
| `--color-text-neutral-inverse` | `var(--prim-white)` | Alias for text inverse |
| `--color-text-neutral-muted` | `var(--prim-neutral-500)` | Alias for `--color-text-muted` |
| `--color-text-neutral-strong` | `var(--prim-neutral-800)` | Alias for `--color-text-strong` |
| `--color-text-strong-950` | `var(--prim-neutral-875)` | References `--prim-neutral-875` (check this prim exists) |
| `--color-text-sub-600` | `var(--prim-neutral-600)` | Alias for icon/text sub |
| `--color-text-white-0` | `var(--prim-white)` | Alias for `--color-text-white` |

---

## F. Raw Value Exceptions

Layer 2 / theme tokens that use raw hex, rgba, or composite strings instead of alias references.

| CSS Var | Value | Classification |
|---------|-------|----------------|
| `--shadow-glow-brand-primary` | `0 0 0 1px #9589D9, ...` | **Needs prim ref** — `#9589D9` = `--prim-purple-300` |
| `--shadow-glow-brand-secondary` | `0 0 0 1px #84EBDD, ...` | **Needs prim ref** — `#84EBDD` = `--prim-teal-300` |
| `--shadow-glow-destructive` | `0 0 0 1px #FB7185, ...` | **Needs prim ref** — `#FB7185` = `--prim-red-300` |
| `--shadow-glow-dark` | `0 0 0 1px #1C1C1C, ...` | **Needs prim ref** — `#1C1C1C` = `--prim-neutral-800` |
| `--shadow-glow-light` | `0 0 0 1px #F7F7F7, ...` | **Needs prim ref** — `#F7F7F7` = `--prim-neutral-25` |
| `--shadow-focus-ring-primary` | `0 0 0 2px #ffffff, ...` | **Valid alpha exception** — light block uses raw white as backdrop (dark block uses `--prim-slate-900`) |
| `--button-lighter-primary-bg-hover` | `#20184b` (dark block) | **Documented exception** — awaits `stpatrick/800` primitive. See Issue #8 note in tokens.css. Once `--prim-purple-800` (or `--prim-stpatrick-800`) is added, this should reference it. |
| `--prim-alpha-black4` | `#1717170a` | **Valid primitive raw value** — but value is wrong vs Figma (`color/alpha/black/10 = #1717171a`). Needs fix after rename. |
| `--prim-alpha-primary16` | `#7963ba29` | **Stale primitive raw value** — base color not in palette. Should be replaced by `--prim-alpha-stpatrick16: #513ebe29`. |
| `--prim-alpha-primary10` | `#476cff1a` | **Stale primitive raw value** — base `#476cff` not in palette. Needs design verification or removal. |
| `--prim-alpha-red10` | `#fb37481a` | **Stale primitive raw value** — `#fb3748` not in official red scale. Needs design verification or removal. |

---

## G. Mode Handling Verification

### G1 — Light/Dark mode parity in JSON
All 59 `semantic.color.*` token bases have both `.light` and `.dark` values. ✓

### G2 — CSS dark block completeness
For every token where `dark ≠ light` in JSON, a corresponding CSS dark override is present in `[data-theme="dark"]`. ✓

Mode gap count: **0** ✓

### G3 — Tokens with identical light/dark values (JSON-only semantics)
The following semantic.color categories have **identical light and dark primitives** in JSON (i.e., no dark-mode change):

- `semantic.color.brand.*` (all 9 tokens) — brand colors unchanged in dark mode
- `semantic.color.border.brandHover/brandPrimary` — brand borders unchanged
- `semantic.color.border.danger` — danger border unchanged
- `semantic.color.status.dangerDark` — locked to red.600 in both modes
- `semantic.color.status.errorBase` — locked to red.300
- `semantic.color.status.infoDark`, `skyDark` — locked in both modes
- `semantic.color.icon.brand` — brand icon unchanged

These are intentional. No action needed unless Figma defines a different dark value.

### G4 — Chart mode handling
CSS correctly implements chart dark-mode inversion (lighter↔darker, default shifts to .400):

- Light block: 31 chart vars (series 1–8 × lighter/default/darker, plus up/down/empty)
- Dark block: 30 chart var overrides (same pattern, inverted scale)
- Full 5-shade vars (`--chart-*-light` and `--chart-*-dark`) are defined in the CSS but only light/default/darker have dark-block overrides. The light-shade and dark-shade variants are consistent with the inversion pattern.

### G5 — Dark block chart var gap

The `[data-theme="dark"]` block does **not** override `--chart-empty`. The light value is `var(--color-surface-weak)` which does have its own dark override (`--color-surface-weak` → `var(--prim-slate-700)` in dark block), so the effective dark chart-empty value resolves correctly through the cascade.

---

## H. Canary Check — `color/primitive/brand/stpatrick/800 = #20184B`

| Check | Result |
|-------|--------|
| Variable exists in Figma | ✓ Confirmed — user-provided; consistent with `color/alpha/stpatrick/16 = #513ebe29` seen on Button page |
| `stpatrick` key in tokens.json | ✗ **MISSING** — no stpatrick concept exists anywhere |
| `primitive.color.purple.800` in tokens.json | ✗ **MISSING** — purple scale goes 50→700→900 (800 skipped) |
| `--prim-stpatrick-800` or `--prim-purple-800` in tokens.css | ✗ **MISSING** |
| `#20184B` in tokens.css | Present **only** as raw hex in the dark button block: `--button-lighter-primary-bg-hover: #20184b` |
| Button dark override can reference it | Not yet — primitive must be added first |

**Action required:** This primitive must be added to JSON and CSS as a prerequisite to properly aliasing the `--button-lighter-primary-bg-hover` dark override.

---

## I. CSS Structure Alignment (L1 and L2)

| Dimension | Status | Notes |
|-----------|--------|-------|
| L1 color → `--prim-color-*` | ✓ Aligned | All 153 JSON color primitives have CSS `--prim-*` vars with correct values |
| L1 spacing → `--spacing-*` | ✓ Aligned | All 18 spacing tokens match |
| L1 radius → `--radius-*` | ✓ Aligned | All 17 radius tokens match |
| L1 breakpoints (screen) → `--breakpoint-*` | ✓ Aligned | 3/3 screen breakpoints match |
| L1 breakpoints (modal) → `--breakpoint-modal-*` | ✗ Gap | 18 modal dimension tokens in JSON, 0 CSS vars emitted |
| L1 typography (family/weight) → `--font-family-*`, `--font-weight-*` | ✓ Aligned | Matches JSON and Figma |
| L1 typography (fontSize) → `--font-size-*` | ✓ Aligned (responsive) | CSS correctly applies 3-breakpoint responsive values |
| L1 typography (textStyles composites) → `--text-style-*` | ✗ Gap | 149 paths not emitted. Architecture decision needed. |
| L1 shadows (below/upper/regular/glow) → `--shadow-*` | ~ Partial | Emitted, but raw hex used instead of prim refs in glow shadows |
| L1 shadows (components) → CSS | ✗ Not emitted | 15 paths — intentional deferral or oversight |
| L2 semantic color → `--color-*` | ✓ Aligned (58/59) | 1 token missing canonical var; covered by aliases |
| L2 chart → `--chart-*` | ✓ Aligned | Light + dark blocks correct |
| L2 focus ring shadows → `--shadow-focus-ring-*` | ~ Partial | Light + dark values correct; dark variants (primaryDark etc.) in JSON not emitted as separate CSS vars |

---

## J. High-Priority Fixes (Recommended Order)

Do not apply fixes until reviewed and confirmed. Each fix should be one issue at a time with Figma verification.

**Priority 1 — Add missing stpatrick/800 primitive (unblocks Issue #8)**
1. Add `primitive.color.purple.800 = #20184B` to `tokens.json` (fills the gap in the purple scale; use `purple.800` to stay consistent with existing naming, not stpatrick)
2. Add `--prim-purple-800: #20184B` to `tokens.css` (L1 prim block, between 700 and 900)
3. Update `--button-lighter-primary-bg-hover: #20184b` in dark block → `var(--prim-purple-800)` and update the comment

**Priority 2 — Add missing stpatrick alpha primitive**
4. Add `primitive.color.alpha.stpatrick16 = #513ebe29` to `tokens.json`
5. Add `--prim-alpha-stpatrick16: #513ebe29` to `tokens.css`
6. Update `--color-extra-alpha-black-4` reference chain (if it uses any corrected alpha)

**Priority 3 — Fix alpha color value mismatches**
7. Rename `primitive.color.alpha.black4` → `black10` and fix value: `#1717170a` → `#1717171a` in JSON + CSS
8. Add `primitive.color.alpha.black24 = #1717173d` to JSON + CSS
9. Fix `primitive.color.alpha.slate16` value: `#99a0ae29` → `#82879c29` in JSON + CSS
10. Verify and remove stale `primary10 = #476cff1a` and `red10 = #fb37481a` after confirming no component references

**Priority 4 — Remove or rename stale primary16**
11. Remove `primitive.color.alpha.primary16 = #7963ba29` (replace with `stpatrick16`)
12. Update any component CSS that references `--prim-alpha-primary16`

**Priority 5 — Add missing modal breakpoints to CSS**
13. Emit 18 `--breakpoint-modal-*` CSS vars for maxWidth/maxHeight across sm/md/lg × desktop/tablet/mobile

**Priority 6 — Fix shadow glow raw hex → prim refs**
14. Replace raw hex in `--shadow-glow-brand-primary`, `--shadow-glow-brand-secondary`, `--shadow-glow-destructive`, `--shadow-glow-dark`, `--shadow-glow-light`

**Priority 7 — Architecture decisions (DS sign-off required)**
15. Decide whether to emit `--text-style-*` vars for lineHeight/letterSpacing composites
16. Decide whether to emit `primitive.shadow.components.*` as CSS vars
17. Add or remove dark-mode focus ring variants (`primaryDark/neutralDark/errorDark`) based on Figma confirmation
18. Consolidate CSS alias vars (26 CSS-only `--color-*` aliases) or add them to JSON semantic layer

---

## K. Validation Checklist

- [x] Figma was directly inspected via REST API (not inferred from repo alone)
- [x] Audit includes: color, alpha color, typography, spacing, radius, breakpoint, shadow/effects
- [x] Component collection was NOT audited in this pass
- [x] No token files were modified during this audit (tokens.json, tokens.css unchanged)
- [x] Canary `color/primitive/brand/stpatrick/800 = #20184B` explicitly checked and confirmed missing
- [x] Light mode values verified
- [x] Dark mode values verified
- [x] JSON structure reviewed for mode-aware shape
- [x] CSS prim-var references verified for L2 tokens

---

*Audit only — no files modified. Awaiting DS review before applying fixes.*
