# Effect / Shadow Component Audit — Batch 1

**Status:** CLOSED — all planned components completed  
**Batch opened:** 2026-07-28  
**Batch closed:** 2026-07-29  
**Auditor:** Design Technologist  
**Figma source of truth:** Design System Scalable — All Platform V.2.1.0 (`0aVnOgjVWH1YL8JCnjXTBi`)

---

## Scope

Audit every component's shadow/effect/border/radius implementation against Figma. Figma is the source of truth for all effect decisions. Dark-mode shadow overrides are never proposed unless Figma explicitly defines a dark effect style or DS Auditor requests one.

---

## Component Results

| # | Component | Verdict | Runtime changed | Notes |
|---|-----------|---------|-----------------|-------|
| 1 | InputText | **REPAIRED / COMMITTED** | `InputText.css`, `tokens.css` | See repair detail below |
| 2 | Accordion | **PASS** | None | `--accordion-shadow` matches Figma. Hover/Active have no shadow. |
| 3 | Alert | **PASS** | None | Stroke style only; `--shadow-regular-medium` matches Figma exactly. |
| 4 | Button | **PASS** | None | Focus ring matches Figma. Default/Hover/Disabled have no effects. |
| 5 | Avatar | **PASS** | None | Status badge `filter:drop-shadow` matches Figma. Container has no effect. |

---

## InputText — Repair Detail

**Files changed:** `src/components/input-text/InputText.css`, `src/design-tokens/tokens.css`  
**Committed:** Yes

| Change | Before | After |
|--------|--------|-------|
| Border radius | `--radius-8` (8px) | `--radius-10` (10px) — Figma-confirmed |
| Default state | `border: 1px solid #eaeaea` | `box-shadow: var(--shadow-custom-input-default)` + `border: 1px solid transparent` |
| Filled state | no shadow | `box-shadow: var(--shadow-custom-input-default)` + `border: 1px solid var(--input-text-basic-border-filled)` |
| Hover state | border + `--shadow-hover-ring-primary` | border-color change only — ring removed (Figma has no hover ring) |
| Focus state | `--shadow-focus-ring-primary` | `--shadow-focus-ring-neutral` — Figma uses neutral/slate ring, not primary/violet |
| Error hover/focus | error ring | error ring retained — correct |
| Token emission | `customInput` values not emitted | `--shadow-custom-input-default/hover/active` added to `tokens.css` |
| DigitInput | unchanged | unchanged — excluded from audit scope |

Full audit detail: `src/components/input-text/input-text-effect-audit.md`

---

## Accordion — Key Findings

- Default: `box-shadow: var(--accordion-shadow)` — matches Figma DROP_SHADOW `color/alpha/black/4`
- Hover: no shadow, no border — matches Figma (no effect on hover variant)
- Active: no shadow, no border — matches Figma
- Focus ring and Disabled state token namespacing remain open DS Auditor decisions (carried from prior audit)
- Dark mode shadow visibility — visual QA / DS Auditor note only; no dark override added

---

## Alert — Key Findings

- Shadow exists on Stroke style only (`[data-style="stroke"]`) via `--shadow-regular-medium`
- `color/alpha/black/10` in Figma resolves to `rgba(23,23,23,0.10)` — token matches exactly
- Filled / Light / Lighter have no shadow — correct
- Toast shadow (`alert--toast`) applies `--shadow-regular-medium` on all alertStyle values as positional elevation affordance; Figma has no toast variant — DS Auditor to confirm whether non-Stroke toast styles should carry this shadow

Docs updated: `src/components/alert/alert-spec.md` — Section 7 (Shadow) stamped PASS, DS Gaps and Open Questions updated to remove stale mismatch entries.

---

## Button — Key Findings

- Default / Hover / Disabled: no effects in Figma, no `box-shadow` in code — correct
- Focus ring: 2-layer DROP_SHADOW in Figma (glow spread=4 + white gap spread=2) maps correctly to `box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba({type},0.16)` — all three types confirmed
- Focus border tokens: `--button-focus-ring-primary` `#513ebe3d`, `--button-focus-ring-error` `#ea34343d`, `--button-focus-ring-neutral` `#82879c3d` — all match Figma source variables
- Base `border: 1px solid transparent` accepted as layout-stability implementation detail (prevents reflow on focus activation)

Docs updated: `src/components/button/button-large-spec.md` — Focus ring section stamped PASS, Deferred section added.

---

## Avatar — Key Findings

- Avatar container: no effects, `border-radius: var(--radius-full)`, `surface/neutral/weak` fill — all correct
- TopStatus and BottomStatus badges: Figma DROP_SHADOW `color/alpha/black/4` (rgba(23,23,23,0.04)), offset (0,1), radius=2, spread=0, `showShadowBehindNode: false`
- CSS: `filter: drop-shadow(0 1px 2px rgba(23, 23, 23, 0.04))` — all values match
- `filter: drop-shadow()` is the correct CSS choice for SVG-based badges (follows painted pixel outline, not bounding box)
- White separation ring is an SVG fill layer in Figma, not a CSS shadow/border — correctly rendered inside SVG, no CSS property needed
- Shadow value hardcoded with Figma source comment (`color/alpha/black/4`) — no CSS token emitted for this primitive; accepted as-is

---

## Deferred Items

| Item | Reason | Owner | Do not repair until |
|------|--------|-------|---------------------|
| ButtonSpecial (`↳buttons-special`) | Not implemented; separate DS Auditor / component scoping task | DS Auditor | Explicit scoping decision |
| `--shadow-glow-brand-primary` color correction | `#9589D9` in token vs `brand/primary/base` (~`#403297`) in Figma; only relevant when ButtonSpecial is built | DS Auditor | ButtonSpecial implementation kicked off |
| ChartDonut tooltip shadow | Tooltip is a separate component / handoff; out of scope for this batch | Product/DS | Tooltip handoff or audit initiated |
| CompactSelect / Select | Blocked — no current handoff or relearn; component not yet in scope | DS Auditor | Handoff or relearn available |
| Dark mode shadow visibility (all components) | No Figma dark effect style defined for any PASS component; visual QA note only | DS Auditor | Figma explicitly defines dark effect OR DS Auditor explicitly requests override |
| F-07 InputText ring color delta | `state/focus-ring/primary` differs between Figma Shadows page (`#7963ba`) and tokens.json (`#513ebe`); DS Auditor must decide which is authoritative | DS Auditor | DS Auditor decision |
| Accordion focus ring token gap | No `accordion/focus-ring` token exists; focus ring is not implemented in V1 and remains pending DS Auditor decision | DS Auditor | DS Auditor decision |
| Accordion disabled state token namespace | Carried from prior audit | DS Auditor | DS Auditor decision |
| Alert toast shadow on non-Stroke styles | Figma has no toast variant; DS Auditor to confirm intent | DS Auditor | DS Auditor confirmation |

---

## Standing Architecture Rules

These rules apply to all current and future shadow/effect work in this codebase:

1. **Figma is the source of truth.** Always inspect Figma before any effect-related file edit. If Figma cannot be accessed, stop and report.
2. **No dark-mode shadow overrides unless Figma defines them or DS Auditor requests them.** If a shadow looks subtle in dark mode, classify as visual QA / DS Auditor note only.
3. **No invented tokens, states, variants, or behavior.** Only emit tokens that have a Figma source.
4. **Do not use `box-shadow` on SVG-based components.** Use `filter: drop-shadow()` when the shadow must follow the painted pixel shape.
5. **`--shadow-glow-*` tokens** are reserved for ButtonSpecial. Do not bind them to any other component.

---

## Files Changed This Batch

### Runtime (component CSS + tokens)

| File | Change type |
|------|-------------|
| `src/components/input-text/InputText.css` | Repaired — radius, shadow, border, focus ring, hover ring |
| `src/design-tokens/tokens.css` | Additive — `--shadow-custom-input-default/hover/active` emitted |

### Docs only

| File | Change type |
|------|-------------|
| `src/components/alert/alert-spec.md` | Effect/Shadow audit PASS stamp, DS Gaps and Open Questions cleanup |
| `src/components/button/button-large-spec.md` | Effect/Shadow audit PASS stamp, Deferred section added |
| `src/components/input-text/input-text-effect-audit.md` | Full audit record (created this batch) |
| `src/effect-shadow-audit-batch.md` | This file |

### Not changed

`Button.css`, `Button.jsx`, `Avatar.css`, `Avatar.jsx`, `TopStatus.css`, `TopStatus.jsx`, `BottomStatus.css`, `BottomStatus.jsx`, `Accordion.css`, `Accordion.jsx`, `Alert.css`, `Alert.jsx`, all `*.stories.jsx`, `tokens.json` — none edited in this batch.

---

## Next Steps

1. DS Auditor to review and action the deferred items table above.
2. Open a separate task to scope and implement ButtonSpecial (`↳buttons-special`).
3. Begin Batch 2 of the effect/shadow audit when next components are prioritised (CompactSelect/Select require handoff first).
