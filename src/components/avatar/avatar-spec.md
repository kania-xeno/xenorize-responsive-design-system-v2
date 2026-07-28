# Avatar — Implementation Spec

Source: Figma "Design System Scalable — All Platform V.2.1.0 → ❖ Avatar"
Component set: `2107:27`
Sub-components: `Top Status` (`2107:2850`) · `Bottom Status` (`2107:2834`)
All values reference `design-tokens/tokens.css`.
Last updated: 25/06/2026

---

## Props API

```ts
interface AvatarProps {
  src?:          string;          // Image URL → image mode
  name?:         string;          // Display name → initials derived → text mode
  size?:         80 | 72 | 64 | 56 | 48 | 40 | 32 | 24 | 20;  // default: 48
  solidBg?:      boolean;         // Opaque bg on coloured/dark surfaces. default: false
  topStatus?:    'verified' | 'pin' | 'favorite' | 'add' | 'remove' | 'notification';
  bottomStatus?: 'online' | 'idle' | 'busy' | 'away' | 'company';
  alt?:          string;          // Alt text (image mode). Falls back to name.
  'aria-label'?: string;          // Overrides all label derivation.
  className?:    string;
}
```

---

## Content Mode Priority Chain

| Priority | Mode        | Condition                     | Container BG             |
|----------|-------------|-------------------------------|--------------------------|
| 1        | image       | `src` prop present            | none (photo fills circle)|
| 2        | text        | `name` → initials derivable   | `surface/neutral/weak`   |
| 3        | icon        | neither src nor name          | `surface/neutral/weak`   |

Memoji and Illustration modes are image-based — pass via `src` prop. No separate prop needed.

---

## Initials Derivation Rules (V1)

| Input name      | Result |
|-----------------|--------|
| "James Brown"   | "JB"   |
| "Sophia"        | "SO"   |
| "Ö. Müller"     | "M"    |
| "" / undefined  | ""→icon mode fallback |

- Two+ words: first initial + last initial
- Single word: first 2 letters
- Uppercase always
- Special characters and symbols stripped before processing
- Max 2 characters — enforced at derivation, not CSS

---

## Sizing

| Size | Width × Height | DS Text Style | Icon svg size |
|------|---------------|--------------|--------------|
| 80px | 80×80         | `h2/regular` | 72% of 80    |
| 72px | 72×72         | `h2/regular` | 72% of 72    |
| 64px | 64×64         | `h2/regular` | 72% of 64    |
| 56px | 56×56         | `body/medium/xl` | 72% of 56 |
| 48px | 48×48         | `body/medium/xl` | 72% of 48 |
| 40px | 40×40         | `body/medium/lg` | 72% of 40 |
| 32px | 32×32         | `body/medium/md` | 72% of 32 |
| 24px | 24×24         | `caption/regular` | 72% of 24 |
| 20px | 20×20         | `caption/regular` | 72% of 20 |

See Typography section below for full per-size text style details.

---

## Typography

Initials typography is tokenized via `--text-style-*` CSS custom properties in `Avatar.css`. Each size group maps to a distinct DS text style. Confirmed from Figma inspection of each size variant individually (nodes 2107:172–204, 28 July 2026).

| Size(s) | DS Text Style | Font | Weight | Size | Line height | Letter-spacing | CSS vars |
|---------|--------------|------|--------|------|-------------|----------------|---------|
| 80, 72, 64 | `h2/regular` | Sofia Pro | Regular (400) | 24px | 133% | 0 | `--text-style-h2-regular-*` |
| 56, 48 | `body/medium/xl` | Open Sans | SemiBold (600) | 18px | 155% | 0 | `--text-style-body-medium-xl-*` |
| 40 | `body/medium/lg` | Open Sans | SemiBold (600) | 16px | 150% | 0 | `--text-style-body-medium-lg-*` |
| 32 | `body/medium/md` | Open Sans | SemiBold (600) | 14px | 143% | 0 | `--text-style-body-medium-md-*` |
| 24, 20 | `caption/regular` | Open Sans | Regular (400) | 12px | 133% | 0.002em | `--text-style-caption-regular-*` |

Note: sizes 80–64 use the display font (Sofia Pro); sizes 56 and below use the body font (Open Sans). Previous implementation used `--font-family-body`, `--font-weight-medium`, hardcoded `line-height: 1`, and DT-estimated font-sizes — all corrected.

---

## Status Badge Rules

- **Top status** component: `<TopStatus type="..." />` — delegates to `TopStatus.jsx`
- **Bottom status** component: `<BottomStatus type="..." />` — delegates to `BottomStatus.jsx`
- **DOM architecture**: badges are children of `.avatar` (outer wrapper, `overflow: visible`), NOT inside `.avatar__circle` (inner clip layer). This allows badges to overflow outside the circle boundary.
- **Top status** positioned: top-right, `top: 0; right: var(--_status-right)` — aligns flush with avatar top, overflows right
- **Bottom status** positioned: bottom-right, `bottom: 0; right: var(--_status-right)` — aligns flush with avatar bottom, overflows right
- **Both statuses** can appear simultaneously
- **All sizes supported**: badges render at all 9 sizes (80–20). No suppression at 24 or 20.
- **SVG scaling**: TopStatus and BottomStatus SVGs use `viewBox="0 0 32 32"` with `width="100%" height="100%"`. The container `<span>` is sized by `--_status-sz` CSS custom property. SVG scales proportionally to the custom property value.
- **White ring**: rendered as Stroke layer inside the SVG (`surface/neutral/white` fill), not via CSS box-shadow
- **Drop shadow**: `filter: drop-shadow(0 1px 2px rgba(23,23,23,0.04))` on badge `<span>` wrapper

### Badge Geometry — Figma source of truth

Values extracted from Figma Avatar component set (2107:27) via Desktop Bridge inspection, 25/06/2026.
Applied via CSS custom properties on `.avatar--size-{n}` selectors.

| Avatar Size | Badge Size (`--_status-sz`) | Right offset (`--_status-right`) | Top offset | Bottom offset |
|-------------|----------------------------|----------------------------------|------------|---------------|
| 80          | 32px                       | −8px                             | 0          | 0             |
| 72          | 32px                       | −8px                             | 0          | 0             |
| 64          | 28px                       | −8px                             | 0          | 0             |
| 56          | 24px                       | −6px                             | 0          | 0             |
| 48          | 20px                       | −6px                             | 0          | 0             |
| 40          | 18px                       | −6px                             | 0          | 0             |
| 32          | 16px                       | −6px                             | 0          | 0             |
| 24          | 12px                       | −4px                             | 0          | 0             |
| 20          | 10px                       | −4px                             | 0          | 0             |

### Top Status — BG token per type

| Code value    | Figma label      | CSS variable                  | Light     | Dark      |
|---------------|------------------|-------------------------------|-----------|-----------|
| `verified`    | ✅ Verified       | `--status-sky-base`           | `#35ADE9` | `#68CDFF` |
| `pin`         | 📌 Pin           | `--status-feature-base`       | `#403297` | `#7263CC` |
| `favorite`    | ⭐️ Favorite      | `--status-success-base`       | `#0F6D32` | `#57E88C` |
| `add`         | ➕ Add           | `--color-text-neutral-muted`  | `#7B7B7B` | `#989DAE` |
| `remove`      | ❌ Remove         | `--status-danger-base`        | `#CB1515` | `#EA3434` |
| `notification`| 🔔 Notification  | `--color-surface-neutral-white` (outer) + `--status-danger-base` (dot) | `#FFFFFF` + `#CB1515` | same |

### Bottom Status — dot token per type

| Code value | Figma label     | CSS variable                  | Light     | Dark      |
|------------|-----------------|-------------------------------|-----------|-----------|
| `online`   | 🟢 Green Not    | `--status-success-base`       | `#0F6D32` | `#57E88C` |
| `idle`     | ⚪️ White Not    | `--color-text-neutral-muted`  | `#7B7B7B` | `#989DAE` |
| `busy`     | 🔴 Red Not      | `--status-danger-base`        | `#CB1515` | `#EA3434` |
| `away`     | 🟡 Yellow Not   | `--status-warning-base`       | `#684E00` | `#B28600` |
| `company`  | 🏢 Company      | `--color-surface-neutral-white` | `#FFFFFF` | `#FFFFFF` |

---

## Token Reference

| Token (DS name)         | CSS variable                     | Light       | Dark        | Used for |
|-------------------------|----------------------------------|-------------|-------------|----------|
| `surface/neutral/weak`  | `--color-surface-neutral-weak`   | `#F6F7F8`   | `#2D2F39`   | Container bg (text + icon + solidBg) |
| `surface/neutral/white` | `--color-surface-neutral-white`  | `#FFFFFF`   | `#FFFFFF`   | Status ring + icon silhouette + notification/company bg |
| `text/neutral/strong`   | `--color-text-neutral-strong`    | `#1C1C1C`   | `#FFFFFF`   | Initials text |
| `text/neutral/inverse`  | `--color-text-neutral-inverse`   | `#FFFFFF`   | `#FFFFFF`   | Status badge icon fills (referenced in handoff, not explicitly used in CSS V1) |
| `text/neutral/muted`    | `--color-text-neutral-muted`     | `#7B7B7B`   | `#989DAE`   | Add badge bg + Idle dot |
| `status/sky/base`       | `--status-sky-base`              | `#35ADE9`   | `#68CDFF`   | Top: Verified |
| `status/feature/base`   | `--status-feature-base`          | `#403297`   | `#7263CC`   | Top: Pin |
| `status/success/base`   | `--status-success-base`          | `#0F6D32`   | `#57E88C`   | Top: Favorite / Bottom: Online |
| `status/danger/base`    | `--status-danger-base`           | `#CB1515`   | `#EA3434`   | Top: Remove + Notification dot / Bottom: Busy |
| `status/warning/base`   | `--status-warning-base`          | `#684E00`   | `#B28600`   | Bottom: Away |
| `radius/full`           | `--radius-full`                  | `999px`     | —           | All border-radius |

---

## Icon Silhouette — DS Gap

The `Body` and `Head` ellipses inside the Icon mode `image` frame in Figma have **no bound variable** — fills are hardcoded `#FFFFFF`.

**Resolution in code:** `fill: var(--color-surface-neutral-white)` applied via `.avatar__icon svg` in `Avatar.css`. This is the correct semantic token (white fill, mode-agnostic) and avoids replicating the hardcoded value.

Flagged to DS Auditor for official variable binding in Figma.

---

## Solid BG

`solidBg=true` adds `background: var(--color-surface-neutral-weak)` to the container. This is the same token used by Text and Icon modes. In Image mode the container bg shows through if the image has transparency or fails to load. Does not add any extra visual treatment.

---

## Accessibility

- All avatars render with `role="img"` and `aria-label` (derived from `alt`, `name`, or default "User avatar")
- Icon mode uses `aria-label="User avatar"` unless overridden
- Top and bottom status badges each render with `role="img"` and semantic `aria-label`
- Status colour is never the sole communication of meaning
- At sizes 24 and 20, interactive usage requires adequate padding or wrapper touch target (min 44×44px)
- Do not wrap Avatar in an interactive element for V1 — wrap at product level when needed

---

## Open Items

- ~~**Initials font sizes**~~ — **Resolved 2026-07-28**: Figma-confirmed text styles applied via `--text-style-*` vars in `Avatar.css`. See Typography section for full per-size mapping.
- ~~**Status badge dark mode**~~ — **Resolved 25/06/2026**: all `--status-*` tokens have `[data-theme="dark"]` overrides in `tokens.css`
- ~~`--status-warning-base` value mismatch~~ — **Resolved 25/06/2026**: updated to `#684E00` (light) / `#B28600` (dark) per Figma source of truth
- **Company icon** — Bottom status Company type has a white circle only in V1. The Figma component uses a "Synergy" placeholder icon instance. Awaiting product-level icon supply
- **Icon silhouette DS gap** — Figma fills hardcoded; flagged to DS Auditor for variable binding
- **Interactive avatar** — No hover/focus state defined in DS. Wrap at product level; DS gap flagged
- ~~**Status badge sizing at 32px and below**~~ — **Resolved 25/06/2026**: badge size now scales with avatar size via Figma-sourced `--_status-sz` per size class
