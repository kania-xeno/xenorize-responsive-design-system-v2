# InputText Full Effect Architecture Audit

**Date:** 2026-07-28  
**Scope:** `src/components/input-text/InputText.css` vs Figma `Design System Scalable V.2.1.0` (file `0aVnOgjVWH1YL8JCnjXTBi`, page `584:4586`)  
**Status:** Audit only — no files edited, no commits made  
**Constraint:** Figma is source of truth. No invented tokens, states, or behavior.

---

## Figma State Inspection Results

All states inspected via `get_design_context` on `BasicInput` Medium nodes on the InputText page.

| State | Figma Node | Visual Layers | Radius |
|-------|-----------|---------------|--------|
| Default | `1957:1474` | Effect: `components/custom-input/Input (Default)` — 3-layer shadow. **No stroke.** | `var(--number/size-10, 10px)` |
| Hover | `1957:1756` | Stroke only: `var(--input-text/basic/border/hover, #dad6f2)`. **No shadow or ring.** | `var(--number/size-10, 10px)` |
| Focus | `1957:2038` | Stroke `var(--input-text/basic/border/focus, #7263cc)` + effect `components/buttons/important-focus` = neutral/slate ring `rgba(130,135,156,0.16)` with white gap | `var(--number/size-10, 10px)` |
| Filled | `1957:2318` | Effect: `components/custom-input/Input (Default)` (same 3-layer as Default) + stroke `var(--input-text/basic/border/filled, #7263cc)` | `var(--number/size-10, 10px)` |
| Error | `1957:2882` | Stroke only: `var(--input-text/basic/border/error, #cb1515)`. **No shadow.** | `var(--number/size-10, 10px)` |
| Disabled | `1957:2600` | Stroke only: `var(--input-text/basic/border/disabled, #eaeaea)` on `#f5f5f5` bg. **No shadow.** | `var(--number/size-10, 10px)` |

**Dark mode (section `2642:3354`):** Only Focus, Filled, Disabled are defined. **No dark Hover state in Figma** — hover is light-mode only.

### `components/custom-input/Input (Default)` effect breakdown

```
0px 0px 0px 1px   var(--style/custom/dropshadow/8, rgba(23,23,23,0.08))   ← outline ring
0px 1px 1px -0.5px var(--style/custom/dropshadow/4, rgba(23,23,23,0.04))  ← subtle depth
0px 3px 3px -1.5px var(--style/custom/dropshadow/4, rgba(23,23,23,0.04))  ← ambient depth
```

Matches `primitive.shadow.components.customInput.default` in `tokens.json`:
```
"0 0 0 1px rgba(23,23,23,0.08), 0 1px 1px -0.5px rgba(23,23,23,0.04), 0 3px 3px -1.5px rgba(23,23,23,0.04)"
```

### `components/buttons/important-focus` effect breakdown

Effect uses `color/alpha/slate/16` + white gap:
```
0px 0px 0px 4px rgba(130,135,156,0.16)   ← slate-16 outer ring
0px 0px 0px 2px rgba(255,255,255,1)       ← white gap
```

This is the **neutral** focus ring, NOT primary/violet.

---

## Comparison: Figma vs Code

### InputText.css Current Behaviour (BasicInput)

```css
/* Base — applies to all variants */
.input-text {
  border: 1px solid;        /* CSS border on every state */
  border-radius: var(--radius-8);   /* 8px */
}

.input-text--basic {
  background-color: var(--input-text-basic-bg-default);
  border-color:     var(--input-text-basic-border-default);   /* #eaeaea */
}

.input-text--basic.input-text--filled:not(.input-text--disabled):not(.input-text--error) {
  border-color: var(--input-text-basic-border-filled);        /* #7263cc */
}

.input-text--basic:hover:not(.input-text--disabled):not(.input-text--error):not(:focus-within) {
  border-color: var(--input-text-basic-border-hover);         /* #dad6f2 */
  box-shadow:   var(--shadow-hover-ring-primary);             /* 0 0 0 3px rgba(81,62,190,0.16) */
}

.input-text--basic:focus-within:not(.input-text--disabled):not(.input-text--error) {
  border-color: var(--input-text-basic-border-focus);         /* #7263cc */
  box-shadow:   var(--shadow-focus-ring-primary);             /* 0 0 0 2px #fff, 0 0 0 4px rgba(81,62,190,0.16) */
}
```

---

## Findings Classification

Scale: **A** = correct / within tolerance · **B** = minor arch diff, visual match · **C** = token emission gap · **D** = runtime mismatch · **E** = DS Auditor sign-off required · **F** = deferred

---

### F-01 · Border Radius: 8px vs 10px — **D**

| | Value |
|--|--|
| Figma | `var(--number/size-10, 10px)` — all states |
| Code | `var(--radius-8)` = **8px** |
| Delta | **2px** on every state, every variant |

A matching CSS radius token already exists: `--radius-10: 10px`. `--radius-8` = 8px is close but not matching.

---

### F-02 · Default State: Effect Shadow vs CSS Border — **D**

| | Rendering |
|--|--|
| Figma | `components/custom-input/Input (Default)` effect (3-layer shadow); **zero CSS border/stroke** |
| Code | `border: 1px solid var(--input-text-basic-border-default)` (`#eaeaea`); **no box-shadow** |

Visually the difference is subtle — `rgba(23,23,23,0.08)` on white ≈ `#e9e9e9`, close to `#eaeaea`. However the depth layers (`0 1px 1px` and `0 3px 3px`) are entirely absent in code, producing a flatter appearance.

The `primitive.shadow.components.customInput.default` token in `tokens.json` matches Figma exactly but **is not emitted to `tokens.css`** (see F-06).

---

### F-03 · Hover State: Unwanted Ring — **D**

| | Rendering |
|--|--|
| Figma | 1px stroke `#dad6f2` only. **No outer ring.** |
| Code | 1px border `#dad6f2` ✓ + `box-shadow: var(--shadow-hover-ring-primary)` = `0 0 0 3px rgba(81,62,190,0.16)` ✗ |

The hover ring is present in code but **does not exist in Figma**. Figma's hover interaction is border-color change only.

The `state/hover-ring/primary` effect style does exist on the Shadows page (`1836:1433`) but it is **not applied to InputText hover** in Figma.

---

### F-04 · Focus Ring: Primary vs Neutral — **D**

| | Effect used | Color |
|--|--|--|
| Figma | `components/buttons/important-focus` | `rgba(130,135,156,0.16)` — **neutral/slate** |
| Code | `var(--shadow-focus-ring-primary)` | `rgba(81,62,190,0.16)` — **primary/violet** |

Figma uses the slate focus ring (neutral), not the primary violet ring. The correct token `--shadow-focus-ring-neutral` already exists in `tokens.css`:

```css
/* tokens.css — already emitted */
--shadow-focus-ring-neutral: 0 0 0 2px #ffffff, 0 0 0 4px rgba(143,143,143,0.16);
```

> ⚠️ **Note:** The `--shadow-focus-ring-neutral` value uses `rgba(143,143,143,0.16)` but Figma's `components/buttons/important-focus` uses `rgba(130,135,156,0.16)` (slate). These differ. See F-07.

Dark mode: `--shadow-focus-ring-neutral` in `[data-theme="dark"]` = `0 0 0 2px var(--prim-slate-900), 0 0 0 4px rgba(130,135,156,0.24)`. Dark neutral ring uses the correct slate value.

---

### F-05 · Filled State: Missing Effect Shadow — **D**

| | Rendering |
|--|--|
| Figma | `components/custom-input/Input (Default)` effect (same 3-layer as Default) **+ 1px stroke `#7263cc`** |
| Code | 1px border `#7263cc` ✓; **no box-shadow** |

The filled state visually shows the same depth shadow as Default in Figma, but code applies no shadow. Border color matches. Companion to F-02.

---

### F-06 · `customInput` Tokens Not Emitted to CSS — **C**

`tokens.json` defines:

```json
"primitive.shadow.components.customInput": {
  "default": "0 0 0 1px rgba(23,23,23,0.08), 0 1px 1px -0.5px rgba(23,23,23,0.04), 0 3px 3px -1.5px rgba(23,23,23,0.04)",
  "hover":   "0 0 0 1px rgba(23,23,23,0.08)",
  "active":  "0 0 0 1.4px #403297, ..."
}
```

**None of these appear in `tokens.css`.** The `tokens.json` note says: *"Captured from Figma Effect Styles. Not yet usage-audited. Do not bind to components until component-level audit."*

This audit completes the usage audit for the `default` and `hover` values. The `active` value maps to the Focus/Active state (matches `customInput.active` = active border colour + depth + glow).

Pending emission variables needed:
- `--shadow-custom-input-default` ← `customInput.default`
- `--shadow-custom-input-hover` ← `customInput.hover`
- `--shadow-custom-input-active` ← `customInput.active`

---

### F-07 · Ring Color Delta: Figma vs Tokens — **E**

Two ring colors differ between Figma effect styles and `tokens.json`/`tokens.css`:

| Token | Figma Shadows Page (`1836:1433`) | tokens.json / tokens.css |
|--|--|--|
| `state/hover-ring/primary` | `rgba(121,99,186,0.16)` = `#7963ba` | `rgba(81,62,190,0.16)` = `#513ebe` |
| `state/focus-ring/primary` | `rgba(121,99,186,0.16)` = `#7963ba` | `rgba(81,62,190,0.16)` = `#513ebe` |
| `state/hover-ring/neutral` | `rgba(143,143,143,0.16)` | `rgba(143,143,143,0.16)` ✓ |
| `state/focus-ring/neutral` | `rgba(130,135,156,0.16)` = slate | tokens: `rgba(143,143,143,0.16)` (neutral) ← **also differs** |

The primary ring color (`#7963ba` vs `#513ebe`) is a delta between the Shadows page effect style and the primitive token. Since Figma's InputText focus uses the neutral/slate ring (not primary), this colour delta does not directly affect InputText — but it is a system-level inconsistency.

The neutral focus ring value (`rgba(130,135,156,0.16)` slate vs `rgba(143,143,143,0.16)` neutral) does affect InputText's focus ring if F-04 is repaired. **Requires DS Auditor decision** before changing either token value.

---

### F-08 · Disabled and Error (Static) States — **A**

Both are correct:
- Disabled: 1px border `#eaeaea`, bg `#f5f5f5`, no shadow ✓
- Error (static, before hover/focus): 1px border `#cb1515`, no shadow ✓
- Error hover ring: direction correct (adds ring on error+hover) ✓
- Error focus ring: direction correct (adds ring on error+focus) ✓

---

### F-09 · Dark Hover Ring — **A (gap is intentional)**

Figma dark section (`2642:3354`) defines: Focus, Filled, Disabled only. **No dark Hover state.**

`tokens.css` correctly emits no dark mode override for `--shadow-hover-ring-*`. The hover ring is light-mode only by DS design. No action needed.

---

## Summary Table

| ID | Finding | Severity | Classification |
|----|---------|----------|----------------|
| F-01 | Border radius 8px vs 10px (all states, all variants) | High | **D** — Runtime mismatch |
| F-02 | Default: CSS border instead of effect shadow; depth layers missing | Medium | **D** — Runtime mismatch |
| F-03 | Hover: unwanted primary ring added; Figma = border only | Medium | **D** — Runtime mismatch |
| F-04 | Focus: wrong ring (primary/violet vs neutral/slate) | Medium | **D** — Runtime mismatch |
| F-05 | Filled: missing 3-layer depth shadow | Medium | **D** — Runtime mismatch |
| F-06 | `customInput` tokens in tokens.json not emitted to tokens.css | — | **C** — Token emission gap |
| F-07 | Ring colour delta: Figma Shadows page vs tokens | — | **E** — DS Auditor required |
| F-08 | Disabled and static Error states | — | **A** — Correct |
| F-09 | Dark hover ring absent in both Figma and code | — | **A** — Intentional |

---

## Recommended Repair Plan

> **All repairs require separate explicit approval before any file is touched.**  
> Ordered by impact/risk (safest first).

---

### Repair 1 — Focus ring: primary → neutral `[tokens.css, InputText.css — LOW RISK]`

**Files:** `InputText.css` only  
**Change:** Replace `var(--shadow-focus-ring-primary)` with `var(--shadow-focus-ring-neutral)` on all non-error focus-within selectors across all 6 variants.  
**Why safe:** `--shadow-focus-ring-neutral` already exists in `tokens.css` (light + dark). Single string replace across the file.  
**Caveat:** The neutral token value (`rgba(143,143,143,0.16)`) differs slightly from the Figma slate value (`rgba(130,135,156,0.16)`). Needs F-07 DS Auditor decision if exact colour accuracy is required.

---

### Repair 2 — Border radius: `--radius-8` → `--radius-10` `[InputText.css — LOW RISK]`

**Files:** `InputText.css`  
**Change:** Replace `border-radius: var(--radius-8)` with `border-radius: var(--radius-10)`.  
**Why safe:** `--radius-10: 10px` is already emitted in `tokens.css`. Single value in `.input-text` base class. Applies uniformly.

---

### Repair 3 — Hover ring: remove from InputText `[InputText.css — MEDIUM RISK]`

**Files:** `InputText.css`  
**Change:** Remove `box-shadow: var(--shadow-hover-ring-primary)` from all 6 variant hover selectors.  
**Why:** Figma hover = border-color change only; no ring applied.  
**Risk:** Visual regression for users accustomed to the ring. Confirm with product/design before landing.

---

### Repair 4 — Emit `customInput` shadow tokens `[tokens.css — LOW RISK]`

**Files:** `src/design-tokens/tokens.css`  
**Change:** Add three CSS variables to `:root`:
```css
--shadow-custom-input-default: 0 0 0 1px rgba(23,23,23,0.08), 0 1px 1px -0.5px rgba(23,23,23,0.04), 0 3px 3px -1.5px rgba(23,23,23,0.04);
--shadow-custom-input-hover:   0 0 0 1px rgba(23,23,23,0.08);
--shadow-custom-input-active:  0 0 0 1.4px #403297, 0 1px 1px -0.5px rgba(23,23,23,0.04), 0 3px 3px -1.5px rgba(23,23,23,0.04), 0 6px 6px -3px rgba(23,23,23,0.02);
```
**Why safe:** Additive only — no existing vars changed.  
**Prerequisite for Repair 5.**

---

### Repair 5 — Default/Filled: switch to effect shadow `[InputText.css — HIGH RISK]`

**Files:** `InputText.css`  
**Change (high level):**
1. Remove `border: 1px solid` from `.input-text` base class.
2. For Default state: apply `box-shadow: var(--shadow-custom-input-default)` instead.
3. For Filled state: apply `box-shadow: var(--shadow-custom-input-default)` + keep `border: 1px solid var(--input-text-basic-border-filled)`.
4. For Hover/Focus/Error/Disabled: add explicit `border: 1px solid` per-state (already handled by border-color tokens, just needs the `border-style` / `border-width` to be present).

**Risk:** Architectural restructure of the base class. Affects all 7 variants. Requires visual QA pass across all states after change.  
**Prerequisite:** Repair 4 must land first.

---

### Not Repaired / Deferred

- **F-07 (ring color delta):** Requires DS Auditor to decide whether Figma Shadows page (`#7963ba`) or tokens.json (`#513ebe`) is authoritative. Do not change token values without sign-off.

---

## Scope Note

This audit covers the `BasicInput` variant (`input-text--basic`) in detail. The same effect patterns apply to `date`, `password`, `phone-number`, `search`, and `link` variants — they share `InputText.css` and the same `:hover`/`:focus-within` selectors. `DigitInput` uses a different cell-based architecture and is excluded from this audit.
