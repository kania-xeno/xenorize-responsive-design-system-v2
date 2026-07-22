# Icon Foundation — Implementation Plan

**Date:** 2026-07-22  
**Status:** PLAN ONLY — no changes applied  
**Scope:** Design system icon infrastructure for Xenorize Design Engineer repo  
**Rule:** No invented paths. No external icon packs. All paths must originate from Figma node data.

---

## Context

Currently, icons are ad-hoc: each component pulls from `src/components/icons/` on demand, with no central manifest, no Storybook gallery, and no consistent verification tracking. The goal is a local icon foundation that eliminates Figma MCP dependency at runtime, makes icons discoverable in Storybook, and enforces a clear per-icon verification status.

---

## Section A — Target Structure

```
src/
├── icons/                              ← new canonical home
│   ├── index.js                        ← named barrel export for all icons
│   ├── icon-usage-manifest.json        ← per-icon metadata and verification status
│   └── IconGallery.stories.jsx         ← Storybook: Foundations/Icons gallery
│
└── components/
    └── icons/                          ← CURRENT location (16 files)
        └── *.jsx                       ← to be moved to src/icons/ in migration step
```

### `src/icons/index.js` — barrel export pattern

```js
// Auto-generated (or manually maintained) named exports
export { default as BubbleAlert }      from './BubbleAlert.jsx';
export { default as CalendarIcon }     from './CalendarIcon.jsx';
export { default as ChevronDownSmall } from './ChevronDownSmall.jsx';
export { default as ChevronRightSmall }from './ChevronRightSmall.jsx';
export { default as ChevronTopSmall }  from './ChevronTopSmall.jsx';
export { default as CircleCheck }      from './CircleCheck.jsx';
export { default as CircleInfo }       from './CircleInfo.jsx';
export { default as CircleX }          from './CircleX.jsx';
export { default as CopyIcon }         from './CopyIcon.jsx';
export { default as CrossLarge }       from './CrossLarge.jsx';
export { default as EyeIcon }          from './EyeIcon.jsx';
export { default as EyeOffIcon }       from './EyeOffIcon.jsx';
export { default as LinkIcon }         from './LinkIcon.jsx';
export { default as LockIcon }         from './LockIcon.jsx';
export { default as PhoneIcon }        from './PhoneIcon.jsx';
export { default as Rose }             from './Rose.jsx';
export { default as SearchIcon }       from './SearchIcon.jsx';
// ... add as icons are promoted to verified
```

### Import path change for all consumers

All current imports of the form:
```js
import FooIcon from '../icons/FooIcon.jsx';
```
become:
```js
import { FooIcon } from '../../icons';
// or keep direct import:
import FooIcon from '../../icons/FooIcon.jsx';
```

Both forms work once icons live in `src/icons/`. Direct imports are fine; the barrel is for gallery and convenience.

---

## Section B — Initial Batch (Current Inventory + Pending)

The initial batch is the 16 icons already in `src/components/icons/` plus Rose (Figma-extracted, file pending). These are the only icons that have been sourced from Figma; no others should be added without Figma node verification.

**Target for phase 2+ expansion:** a Figma audit of all product screens will identify the remaining icons needed across the full design system. The user's stated target is ~58 product-used icons total (not all 1,400+ in the DS icon set). The gap of ~41 icons beyond the current 17 requires a separate Figma audit pass (outside scope of this plan).

### Current batch — 17 icons

| # | Export name | DS canonical name | Figma node | Variant | Status |
|---|---|---|---|---|---|
| 1 | `BubbleAlert` | bubble-alert | `9:77916` | filled=on, stroke=1, radius=0, join=round | ✅ verified |
| 2 | `CalendarIcon` | calendar-2 | `9:87135` | filled=off, stroke=1, radius=0, join=square | ✅ verified |
| 3 | `ChevronDownSmall` | chevron-down-small | `9:2273` | filled=off, stroke=1, radius=0, join=square | ✅ verified |
| 4 | `ChevronRightSmall` | chevron-right-small | unknown | filled=off, stroke=1, radius=0, join=square | ⚠️ derived |
| 5 | `ChevronTopSmall` | chevron-top-small | `9:2212` | filled=off, stroke=1, radius=0, join=square | ✅ verified |
| 6 | `CircleCheck` | circle-check | `9:96443` (node known) | filled=on, stroke=1 (inferred) | ⚠️ placeholder |
| 7 | `CircleInfo` | circle-info | `9:98583` | filled=on, stroke=1, radius=0, join=round | ✅ verified |
| 8 | `CircleX` | circle-x | `9:100399` (node known) | filled=on, stroke=1 (inferred) | ⚠️ placeholder |
| 9 | `CopyIcon` | layers/copy | `1897:1833` | non-standard (20×20 component, not icon set) | ✅ verified (different origin) |
| 10 | `CrossLarge` | cross-large | `9:103236` | filled=off, stroke=1, radius=0, join=square | ✅ verified |
| 11 | `EyeIcon` | eye-open | `9:105540` | filled=off, stroke=1, radius=0, join=square | ✅ verified |
| 12 | `EyeOffIcon` | eye-closed | `9:105616` | filled=off, stroke=1, radius=0, join=round | ✅ verified |
| 13 | `LinkIcon` | chain-link-4 | `9:99575` | filled=off, stroke=1, radius=0, join=round | ✅ verified |
| 14 | `LockIcon` | lock | `9:40033` | filled=off, stroke=1, radius=0, join=square | ✅ verified |
| 15 | `PhoneIcon` | phone | `9:8281` | filled=off, stroke=1, radius=0, join=round | ✅ verified |
| 16 | `Rose` | rose / flower | `9:83079` | filled=off, stroke=1, radius=0, join=square | 🟡 extracted (file pending) |
| 17 | `SearchIcon` | magnifying-glass-2 | `9:92084` | filled=off, stroke=1, radius=0, join=square | ✅ verified |

**Status key:**
- ✅ **verified** — path data sourced directly from Figma node, variant confirmed
- 🟡 **extracted** — Figma node queried and paths captured this session; JSX file not yet written
- ⚠️ **derived** — path inferred/rotated from a related icon; Figma node not directly queried
- ⚠️ **placeholder** — Figma node ID is known but path data not yet extracted; temporary geometry in file

**Note on KeyIcon:** `src/components/key-component/KeyIcon.jsx` is a composite component (renders a keyboard key symbol), not a member of the icon set. It stays in `key-component/` and is excluded from `src/icons/`.

---

## Section C — Verification Status Schema

Each icon in `icon-usage-manifest.json` carries this schema:

```jsonc
{
  "icons": [
    {
      "canonicalName": "circle-check",        // DS canonical kebab-case name (from Figma search tags)
      "exportName": "CircleCheck",            // PascalCase React export
      "filePath": "src/icons/CircleCheck.jsx",
      "category": "status",                   // one of: status, navigation, ui, brand, input
      "variant": {
        "filled": "on",                       // "on" | "off"
        "stroke": 1,                          // 1 | 2
        "radius": 0,                          // 0 | ... (corner radius)
        "join": "round"                       // "round" | "miter" | "square"
      },
      "nodeId": "9:96443",                    // Figma node ID — null if unknown
      "status": "placeholder",               // "verified" | "extracted" | "derived" | "placeholder" | "blocked"
      "verifiedAt": null,                     // ISO date when Figma path was extracted
      "usedBy": ["PasswordStrength"],         // component names that import this icon
      "notes": "Temporary geometry. Extract path from node 9:96443 on next Figma session."
    }
  ]
}
```

**Status values:**

| Value | Meaning |
|---|---|
| `verified` | Path sourced directly from Figma node in this session; node ID confirmed |
| `extracted` | Path captured from Figma this session; JSX not yet written to disk |
| `derived` | Path computed from a related icon (rotation, reflection); Figma node not queried |
| `placeholder` | Node ID known; path NOT from Figma; temporary geometry is in the file |
| `blocked` | Figma node not accessible (MCP offline, token missing, node deleted) |

Icons in any status other than `verified` must carry a `notes` field explaining what is missing and what action unblocks them.

---

## Section D — Storybook Gallery Spec

**Location:** `src/icons/IconGallery.stories.jsx`  
**Storybook title:** `Foundations/Icons`

### Gallery story: `AllIcons`

Renders every icon from the manifest in a responsive grid. Each cell shows:
- Rendered icon at the control-selected size
- Export name (`CircleCheck`) below the icon
- DS canonical name (`circle-check`) in smaller subtext
- Status badge (color-coded chip):
  - ✅ verified → green
  - 🟡 extracted → yellow
  - ⚠️ derived → orange  
  - ⚠️ placeholder → red
  - 🚫 blocked → grey

### Controls (Storybook args)

| Control | Type | Default | Description |
|---|---|---|---|
| `size` | range (12–48, step 4) | `24` | Icon render size in px |
| `color` | select: `currentColor`, `brand`, `subtle`, `error` | `currentColor` | Maps to a CSS token for preview |
| `theme` | select: `light`, `dark` | `light` | Wraps gallery in `data-theme="dark"` |
| `filterStatus` | select: `all`, `verified`, `derived`, `placeholder` | `all` | Filters by status badge |
| `search` | text | `""` | Filters by export name or canonical name (client-side) |

### Filter story: `DerivedAndPlaceholder`

Auto-filters to `status !== "verified"` — a QA view of all icons needing Figma verification. This story has controls disabled; it is a static reference.

### Implementation notes

- Gallery imports all icons from `src/icons/index.js` (named exports)
- Manifest JSON is imported to get status per icon
- No external dependencies needed — plain React, currentColor, CSS vars
- Dark mode wrapper uses `data-theme="dark"` consistent with the rest of the system
- The gallery is read-only: no click actions, no navigation

---

## Section E — Rules

These rules govern all work in the icon foundation, now and in future sessions.

**E1 — No invented paths.** Every `<path d="...">` in a `.jsx` file must originate from a Figma node. The only exception is a file explicitly marked `status: "placeholder"` in the manifest, which must carry a `⚠️ PATH PLACEHOLDER` header comment and a `TODO` pointing to the Figma node ID.

**E2 — No external icon packs.** Do not import from Heroicons, Feather, Lucide, or any npm icon package. All icons come from the Xenorize Icon System V.2.0.0 in Figma.

**E3 — currentColor only.** All stroke and fill values in JSX files must use `"currentColor"`. No hardcoded hex, no CSS variable references inside SVG attributes. Token colors are applied by the parent component's CSS.

**E4 — Standard props interface.** Every icon component accepts `{ ...props }` spread onto the `<svg>` element. Size defaults are set via props (`width`, `height`) with sensible defaults. `aria-hidden="true"` is always present on the `<svg>`. No additional wrapper `<div>`.

**E5 — 24×24 viewBox.** All icons use `viewBox="0 0 24 24"` regardless of render size, matching the Figma frame. Exceptions only where Figma explicitly uses a different frame size (document in the file header).

**E6 — Mark blocked, don't invent.** If Figma is unavailable when an icon is needed, create the file as a `placeholder` with the known node ID in the header. Do not rotate or mirror another icon's path unless the Figma geometry explicitly confirms the relationship (as was done for ChevronDownSmall → Up). Label any derived icon with `⚠️ PATH DERIVED` in the header.

**E7 — One icon, one file.** Each JSX file exports exactly one icon component as its default export. No icon sprite sheets, no multi-icon files.

**E8 — Manifest stays in sync.** Any time a JSX file is created, updated, or promoted from placeholder to verified, the manifest entry must be updated in the same commit. The manifest is the source of truth for Storybook gallery status badges.

**E9 — No DS tokens inside SVG.** Do not reference `var(--color-*)` inside SVG `stroke` or `fill` attributes. CSS variables do not resolve in SVG attribute context in all browsers. Token application happens in the parent component's CSS (e.g., `color: var(--breadcrumb-icon-default)`).

**E10 — Target variant.** The default variant for all new icons is `filled=off, stroke=1, radius=0, join=square` unless the DS component spec explicitly calls for a different variant. Variant must be documented in the file header.

---

## Section F — Output Report

### F1 — Current inventory summary

| Metric | Count |
|---|---|
| Total icon files in `src/components/icons/` | 16 |
| Pending (extracted, file not written) | 1 (Rose) |
| Status: verified | 12 |
| Status: extracted (file pending) | 1 (Rose) |
| Status: derived (path not from Figma) | 1 (ChevronRightSmall) |
| Status: placeholder (temp geometry) | 2 (CircleCheck, CircleX) |
| Total target batch (user-stated) | ~58 |
| Gap to fill (requires Figma audit) | ~41 |

### F2 — Target file structure (new files)

| File | Action | Notes |
|---|---|---|
| `src/icons/Rose.jsx` | CREATE | Figma paths already extracted (session 2026-07-22); ready to write |
| `src/icons/index.js` | CREATE | Barrel export; includes all 17 icons from initial batch |
| `src/icons/icon-usage-manifest.json` | CREATE | All 17 icons with status, nodeId, usedBy, notes |
| `src/icons/IconGallery.stories.jsx` | CREATE | Storybook gallery; imports from index.js + manifest |
| All existing `src/components/icons/*.jsx` | MOVE → `src/icons/` | 16 files; import paths in consumers must be updated |
| `src/components/icons/` directory | DELETE (empty after move) | After all imports updated |

### F3 — Import path updates required (consumers of moved icons)

| Component file | Icons imported | Import path change |
|---|---|---|
| `Accordion.jsx` | CircleInfo, ChevronDownSmall, ChevronTopSmall | `../icons/` → `../../icons/` |
| `Alert.jsx` | BubbleAlert, CrossLarge | `../icons/` → `../../icons/` |
| `Badge.jsx` | BubbleAlert | `../icons/` → `../../icons/` |
| `Breadcrumb.jsx` | ChevronRightSmall | `../icons/ChevronRightSmall` → `../../icons/ChevronRightSmall` |
| `DateInput.jsx` | CalendarIcon | `../icons/` → `../../icons/` |
| `LinkInput.jsx` | LinkIcon | `../icons/` → `../../icons/` |
| `PasswordInput.jsx` | LockIcon, EyeIcon, EyeOffIcon | `../icons/` → `../../icons/` |
| `PhoneNumberInput.jsx` | PhoneIcon | `../icons/` → `../../icons/` |
| `SearchInput.jsx` | SearchIcon | `../icons/` → `../../icons/` |
| `HintText.jsx` | CircleInfo | `../icons/` → `../../icons/` |
| `LabelKey.jsx` | CircleInfo | `../icons/` → `../../icons/` |
| `PasswordStrength.jsx` | CircleCheck, CircleX | `../icons/` → `../../icons/` |
| `Breadcrumb.stories.jsx` | ChevronRightSmall | `../icons/` → `../../icons/` |
| `Breadcrumb.overview.stories.jsx` | ChevronRightSmall | `../icons/` → `../../icons/` |
| `Badge.stories.jsx` | BubbleAlert | `../icons/` → `../../icons/` |
| `ButtonGroup.stories.jsx` | ChevronDownSmall, ChevronTopSmall | `../icons/` → `../../icons/` |
| `ButtonGroup.overview.stories.jsx` | ChevronDownSmall, ChevronTopSmall | `../icons/` → `../../icons/` |
| `Button.*.stories.jsx` (4 files) | CopyIcon | `../icons/` → `../../icons/` |
| `KeyIcon.stories.jsx` | CircleInfo | `../icons/` → `../../icons/` |

**Total import-path edits: 19 files, ~25 import lines.**

### F4 — Icons needing Figma verification (before next migration step)

| Icon | Issue | Figma node | Blocking |
|---|---|---|---|
| `ChevronRightSmall` | Path derived by 90° rotation — not extracted from Figma | unknown | Low risk (divider only) |
| `CircleCheck` | Placeholder geometry; node ID known (`9:96443`) | `9:96443` | Medium (PasswordStrength renders it in production) |
| `CircleX` | Placeholder geometry; node ID known (`9:100399`) | `9:100399` | Medium (PasswordStrength renders it in production) |
| `Rose` | Paths extracted from Figma this session; JSX file not written yet | `9:83079` | High (Breadcrumb item icon blocked on this) |

### F5 — Migration risk and recommended order

**Risk: LOW.** All 19 consumer files and their import paths are fully enumerated. No dynamic imports, no `require()` strings, no glob imports. The move is a mechanical find-and-replace plus a directory rename.

**Recommended execution order:**

1. **Write `Rose.jsx`** (unblocks Breadcrumb icon fix — approved, pending)
2. **Create `src/icons/` directory** and copy all 16 existing `.jsx` files into it
3. **Write `src/icons/index.js`** barrel (includes Rose)
4. **Write `src/icons/icon-usage-manifest.json`** with all 17 icons
5. **Update import paths** in all 19 consumer files (mechanical, no logic change)
6. **Delete `src/components/icons/`** once imports are verified
7. **Write `src/icons/IconGallery.stories.jsx`** — can be done after step 4
8. **Verify in Storybook** — confirm all icon-using stories still render; check gallery

Steps 1–7 should be done in a single session and committed together to avoid a broken-import state. Steps 2–6 are zero-behavior-change; they are pure structural moves.

### F6 — Storybook gallery feasibility

**Feasible with current 17 icons.** The `IconGallery.stories.jsx` can be written immediately after steps 1–4. Status badges in the gallery will correctly flag ChevronRightSmall (derived), CircleCheck, and CircleX (placeholder) for visual review. The gallery does not depend on Figma MCP — it renders from local JSX files.

### F7 — Out of scope for this plan

- Phase 2+ icon expansion (~41 additional icons): requires a separate Figma audit pass
- Icon variant switching (filled/stroke toggle): not a V1 DS feature
- Icon sizing tokens: use props; no token layer needed for icon size
- Animated icons: none in V1 DS
- Phase 2C migration (component token layer for non-Breadcrumb components): explicitly excluded

---

*Plan complete. No files have been created or modified. Awaiting approval before applying any changes.*
