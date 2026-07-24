# tokens.json ↔ tokens.css Parity Audit
**Files:** `src/design-tokens/tokens.json` · `src/design-tokens/tokens.css`
**Scope:** Active files only — root-level `design-tokens/` was deleted this session.
**Date:** 2026-07-24
**Status:** Report only — no edits applied, no commits made.

---

## Files Audited

| File | Lines | Entries |
|------|-------|---------|
| `src/design-tokens/tokens.json` | 1,577 | 1,030 token paths |
| `src/design-tokens/tokens.css` | 1,546 | 1,051 CSS variables |

---

## Dimension 1 — CSS Variables with No JSON Source

CSS variables that exist in `tokens.css` but have no corresponding block in `tokens.json`.

### Badge — 144 vars, no `component.badge` block

The largest gap in the system. All 144 `--badge-*` variables are defined in CSS with full light/dark mode coverage, but `tokens.json` has **no `component.badge` block at all**. This breaks the 3-layer architecture for the entire Badge component — there is no JSON source of truth for these values.

Includes: bg, text, border vars for default, success, warning, error, info, neutral badge types across two modes.

**Verdict:** Architecture gap. `component.badge` block must be added to `tokens.json` to restore parity.

### ButtonGroup — 13 vars, no `component.buttonGroup` block

All `--button-group-*` variables (border-radius, gap, border, bg, text for grouped/active/hover states) exist in CSS but have no corresponding JSON block.

**Verdict:** Architecture gap.

### Breadcrumb — 5 vars, no `component.breadcrumb` block

`--breadcrumb-text`, `--breadcrumb-text-hover`, `--breadcrumb-separator`, `--breadcrumb-active-text`, `--breadcrumb-icon-color` exist in CSS, but `tokens.json` has only a `component.nestedBreadcrumb` block (5 tokens). The top-level breadcrumb component has no JSON source.

**Verdict:** Architecture gap. The `component.nestedBreadcrumb` block does not cover this.

### Chart — 54+ vars, no `component.chart` block

`tokens.css` contains `--chart-tooltip-bg`, `--chart-tooltip-border`, `--chart-tooltip-text`, `--chart-series-1` through `--chart-series-8`, `--chart-up-color`, `--chart-down-color`, and `--chart-grid-*`. `tokens.json` has `primitive.color.chart.*` (raw scale), but no semantic `component.chart` or `semantic.color.chart` block.

Includes chart tooltip tokens (see Dimension 3 for deferral status).

**Verdict:** Architecture gap — no semantic or component layer for chart tokens.

### CompactSelect — 9 vars, no JSON block

`--compact-select-bg`, `--compact-select-border`, `--compact-select-text`, hover/focus/active variants. No JSON block exists.

**Verdict:** Architecture gap.

### InputText — 198 vars, only 3 JSON tokens

`tokens.json` has `component.inputText` with only 3 entries: `borderDefault`, `borderFocus`, `borderError`. But `tokens.css` has 198 `--input-text-*` variables covering states (default, hover, focus, error, disabled, readOnly), sub-elements (label, helper, placeholder, icon, prefix, suffix), and full dark mode.

**Verdict:** Severe architecture gap — JSON coverage is ~1.5% of CSS reality.

### Button Secondary / Outline — CSS vars present, JSON marks reserved

`tokens.css` contains `--button-fill-secondary-*`, `--button-outline-*`, and `--button-ghost-secondary-*`. `tokens.json` marks secondary as `"_note": "Not yet used in Button.css — reserved for secondary type."` and no outline block exists at all in JSON.

**Verdict:** CSS is ahead of JSON. These are partially deferred (see Dimension 3).

---

## Dimension 2 — JSON Tokens with No CSS Output

Token paths that exist in `tokens.json` but produce **zero CSS variables** in `tokens.css`.

### Typography textStyles composites — ~160 property values, no CSS output

`primitive.typography.textStyles` contains full composite definitions for every text style variant:

```
display1, display2, h1, h2, h3, h4,
body/regular/xs, body/regular/sm, body/regular/md, body/regular/lg,
body/medium/xs, body/medium/sm, body/medium/md, body/medium/lg,
body/semibold/xs, body/semibold/sm, body/semibold/md, body/semibold/lg,
caption/regular, caption/semiBold,
label/xs, label/sm, label/md, label/lg,
micro/regular, micro/semibold
```

Each entry has `fontSize`, `lineHeight`, `letterSpacing`, and `fontWeight` properties. None of these composite values are emitted as CSS variables. Only `--font-size-*`, `--font-family-*`, and `--font-weight-*` flat vars exist in CSS.

**Impact:** Line-height and letter-spacing overrides must currently be hardcoded in component CSS (e.g., `Button.css` now hardcodes `line-height: 1.33` and `letter-spacing: 0.024px` for caption/semiBold). This creates drift risk.

**Verdict:** Not emitted intentionally or oversight — unclear. No CSS vars for `--text-style-*` composite values. Clarification needed before fixing.

### Shadow components — 22+ paths, no CSS output

`primitive.shadow.components` contains paths for:

```
tooltip, buttons.primary, buttons.secondary, buttons.neutral,
fancyButtons.primary, fancyButtons.secondary, fancyButtons.neutral,
toggle.active, toggle.inactive,
customButton.default, customButton.hover, customButton.active,
customInput.default, customInput.focus, customInput.error
```

None of these are emitted as CSS variables. Only `primitive.shadow.focusRing.*` and `primitive.shadow.glow.*` have CSS output (via `--shadow-*` vars).

**Verdict:** Intentional deferral or oversight — cannot determine without design confirmation. No component currently references these paths.

### Dark-mode focus ring variants — 3 paths, no CSS output

`primitive.shadow.focusRing.primaryDark`, `neutralDark`, and `errorDark` exist in JSON but have no corresponding `--shadow-focus-ring-*-dark` CSS variables. Only the base (light-mode) focus rings are emitted.

**Verdict:** Dark-mode focus ring is handled via `:root[data-theme="dark"]` block, but these specific dark variants are not in the dark block. Possible oversight.

---

## Dimension 3 — Active CSS Tokens That Should Be Deferred

CSS vars that exist and are valid, but reference component variants or features not yet approved in Figma DS V2.1.0.

### Chart tooltip — `--chart-tooltip-bg`, `--chart-tooltip-border`, `--chart-tooltip-text`

Chart tooltip is **not an approved component** in DS V2.1.0. These 3 vars are active in CSS, have no JSON source, and produce UI behavior in any chart component that references them.

**Recommendation:** Move to a `/* DEFERRED */` comment block until chart tooltip is formally approved.

### Button secondary fill — `--button-fill-secondary-*` (6 vars, both modes)

Button secondary type is **not approved** in DS V2.1.0. JSON marks it reserved. These CSS vars exist but no component code references them (per the `_note` annotation). Low immediate risk, but should be commented out until secondary is approved.

### Button outline secondary — `--button-outline-secondary-*`

`--button-outline-secondary-bg-hover: #e4fbf7` exists in CSS (with a raw hex — see Dimension 6). Outline is marked as a legacy alias in some comments. Secondary outline is doubly deferred.

**Recommendation:** Remove or comment-defer the secondary-specific outline tokens.

### Button ghost secondary — `--button-ghost-secondary-*` (2 vars)

Same status as fill secondary: not approved, JSON has no source, CSS has vars.

---

## Dimension 4 — Typography textStyles Not Reflected as CSS Variables

This is a dedicated call-out from Dimension 2.

`tokens.json` → `primitive.typography.textStyles` holds the complete set of text style specs used by Figma's text style library. None are emitted as CSS variables.

**Current CSS coverage for typography:**

| CSS variable pattern | Coverage |
|----------------------|----------|
| `--font-size-*` | Emitted (body-xs through body-lg, micro, heading) |
| `--font-family-body`, `--font-family-mono` | Emitted |
| `--font-weight-regular`, `--font-weight-medium`, `--font-weight-semibold` | Emitted |
| `--line-height-*` | **Not emitted** |
| `--letter-spacing-*` | **Not emitted** |
| `--text-style-*` (composite) | **Not emitted** |

**Direct consequence:** `Button.css` now hardcodes `line-height: 1.33` and `letter-spacing: 0.024px` inline rather than referencing a token. Every future component touching `caption/semiBold` will face the same problem.

**Recommendation (for design review):** Emit flat per-style CSS vars:
```css
--text-style-caption-semibold-line-height: 1.33;
--text-style-caption-semibold-letter-spacing: 0.024px;
```
Do not act on this until approved — this is a tokens architecture decision.

---

## Dimension 5 — Shadow Tokens Documented but Not Active

### `primitive.shadow.components.*` — 22+ paths, zero CSS output

See Dimension 2. All component shadow definitions (tooltip, buttons, fancyButtons, toggle, customButton, customInput) are fully documented in JSON but no CSS variables are emitted.

**Classification:** Cannot confirm as intentional without DS Auditor input. No current component CSS references these shadow values, so there is no visible breakage. However, any engineer who reads the JSON would expect these to be available as CSS vars.

**Recommendation:** Confirm with DS team whether this is a planned-but-not-yet-emitted set or a gap. Add a `/* TODO: emit component shadow vars */` comment to the JSON block if deferral is intentional.

### `primitive.shadow.glow.*` — emitted in CSS but use raw hex

`--shadow-glow-primary`, `--shadow-glow-secondary`, etc. are emitted but their values embed raw hex colors (e.g., `rgba(64, 50, 151, 0.4)`) rather than referencing `--prim-purple-*` variables. The hex values appear correct but are not traceable through the token system.

---

## Dimension 6 — Raw Hex Values in Active CSS

Total lines with raw hex: 369 (of 1,546 lines — 24%)

### Classification

| Category | Examples | Classification |
|----------|----------|----------------|
| `--prim-*` primitive definitions | `--prim-purple-100: #ede8ff` | **Valid** — these ARE the primitive definitions. Raw hex is correct here. |
| `--button-focus-ring-*` alpha values | `--button-focus-ring-primary: rgba(64,50,151,.2)` | **Valid alpha exception** — no primitive var exists for alpha-composited values |
| `--color-extra-purple-500: #7d52f4` | Standalone in light block | **Stale / future token** — not referenced in any component, no JSON source. Should be removed or moved to a future/experimental block. |
| `--shadow-glow-*` embedded color | `rgba(64, 50, 151, 0.4)` in glow shadow | **Should reference prim vars** — hex matches `--prim-purple-700` but is hardcoded |
| `--button-outline-secondary-bg-hover: #e4fbf7` | Outline block | **Missing primitive** — `#e4fbf7` is not in the primitive palette; this is a one-off value with no token source |
| `--button-lighter-primary-bg-hover: #20184b` (dark block) | Dark mode lighter primary | **Missing primitive** — `#20184b` does not match any `prim-purple-*` stop |
| Badge dark block hex values | Multiple in dark `:root[data-theme="dark"]` block | **Architecture gap consequence** — result of no JSON source for badge; values are not wrong but are untraceable |
| `--chart-series-1` through `--chart-series-8` | Chart palette | **Should reference prim vars** — all 8 hex values match `prim-purple-*` and `prim-teal-*` stops but are hardcoded |

### Specific orphan hex values requiring action (after report review)

```
--color-extra-purple-500: #7d52f4           → REMOVE (stale, no component ref)
--button-outline-secondary-bg-hover: #e4fbf7 → ADD prim token or defer
--button-lighter-primary-bg-hover: #20184b  → ADD prim token (dark block)
--shadow-glow-primary: rgba(64,50,151,.4)   → reference --prim-purple-700 with alpha
--chart-series-1..8                         → reference prim-purple/prim-teal vars
```

---

## Dimension 7 — Recommended Cleanup Order

These are recommendations only. No changes should be made until each step is confirmed.

**Priority 1 — Remove stale tokens (no risk, no design dependency)**
1. Remove `--color-extra-purple-500: #7d52f4` from `tokens.css` — stale, no component ref, no JSON source.
2. Comment-defer `--button-fill-secondary-*`, `--button-ghost-secondary-*`, `--button-outline-secondary-*` — not approved in Figma V2.1.0.
3. Comment-defer `--chart-tooltip-bg/border/text` — chart tooltip not approved.

**Priority 2 — Restore 3-layer architecture for existing components**
4. Add `component.badge` block to `tokens.json` — 144 CSS vars need a JSON source.
5. Add `component.buttonGroup` block to `tokens.json`.
6. Add `component.breadcrumb` block to `tokens.json`.
7. Expand `component.inputText` in `tokens.json` from 3 tokens to full coverage (198 CSS vars need source).
8. Add `component.compactSelect` block to `tokens.json`.
9. Add `component.chart` block to `tokens.json` (pending chart approval status).

**Priority 3 — Resolve raw hex (traceable tokens only)**
10. Replace `--button-outline-secondary-bg-hover` hex with a primitive reference or remove if deferring secondary.
11. Replace `--button-lighter-primary-bg-hover` dark hex with correct `prim-purple-*` reference.
12. Replace `--shadow-glow-*` raw rgba with prim var + alpha.
13. Replace `--chart-series-1..8` with `prim-purple-*` and `prim-teal-*` references.

**Priority 4 — Architecture decisions (requires DS Auditor sign-off)**
14. Decide whether `primitive.shadow.components.*` should be emitted as CSS vars. If yes: add to tokens.css; if intentionally deferred: add explicit comment in JSON.
15. Decide whether typography textStyle composites (line-height, letter-spacing) should be emitted as flat CSS vars. If yes: design the variable naming convention first, then emit. This will allow `Button.css` and future components to reference tokens instead of hardcoding.
16. Confirm dark-mode focus ring variants (`primaryDark`, `neutralDark`, `errorDark`) — add to dark block if confirmed needed.

---

## Summary Table

| Dimension | Finding | Risk |
|-----------|---------|------|
| 1. CSS → no JSON | Badge (144), InputText (195 gap), ButtonGroup (13), CompactSelect (9), Breadcrumb (5), Chart (54) | High |
| 2. JSON → no CSS | textStyle composites (160+), shadow.components (22), dark focus ring variants (3) | Medium |
| 3. Should be deferred | chart-tooltip (3), button-secondary (6+), button-outline-secondary (partial) | Low-Medium |
| 4. Typography gap | Line-height / letter-spacing not tokenized → hardcoded in components | Medium |
| 5. Shadow gap | component shadows fully absent from CSS | Low (no component refs yet) |
| 6. Raw hex | 369 lines; 5 specific orphan values needing action | Low-Medium |
| 7. Cleanup order | Prioritized above | — |

---

*No edits applied. No commits made. Awaiting DS Auditor review before any changes.*
