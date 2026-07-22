# Phase 2B Inspection Report — Design Technologist

**Date:** 2026-07-22
**Phase:** 2B — Inspection and Reporting Only
**Status:** No files moved. No code edited. No migration executed. Report only.
**Next gate:** Phase 2C cannot begin until (1) Input Text QA closes, (2) DS Lead approves this report, (3) a dedicated migration task is opened.

---

## 1. Current Repo Structure Summary

### What exists today

```
repo root/
├── .git/
├── .github/
│   └── workflows/           ← CI/CD directory exists (empty workflow config not confirmed)
├── .gitignore
├── .storybook/
│   ├── main.js
│   └── preview.js
├── 00_Xenorize_Cross_Role_Design_Workflow_Context.md   ← NOT in target structure
├── 01_Xenorize_Design_Technologist_Knowledge_Context.md
├── 02_Xenorize_Design_Technologist_Workflow_SOP.md
├── 03_Xenorize_Design_Technologist_Good_Output_Examples.md
├── 04_Xenorize_Design_Technologist_Bad_Patterns_to_Avoid.md
├── 05_Xenorize_Component_Handoff_Brief_Template.md
├── CLAUDE.md
├── README.md
├── autopush.mjs                                        ← NOT in target structure
├── design-tokens/                                      ← ROOT-LEVEL DUPLICATE (stale)
│   ├── README.md
│   ├── tokens.css
│   └── tokens.json
├── index.html
├── package.json
├── progress-15-06-2026.md                              ← NOT in target structure
├── progress-22-06-2026.md                              ← NOT in target structure
└── src/
    ├── App.jsx
    ├── assets/
    │   └── avatar/
    │       ├── avatar-sample-illustration.png
    │       ├── avatar-sample-memoji.png
    │       └── avatar-sample-photo.png
    ├── components/
    │   ├── _placeholders/
    │   ├── accordion/
    │   ├── alert/
    │   ├── avatar/
    │   ├── badge/
    │   ├── breadcrumb/
    │   ├── button/
    │   ├── button-group/
    │   ├── chart-donut/
    │   ├── icons/              ← RAW ICONS HERE — wrong per governance
    │   ├── input-text/
    │   └── key-component/
    ├── design-tokens/          ← CORRECT target location (active)
    │   ├── README.md
    │   ├── tokens.css
    │   └── tokens.json
    ├── index.css
    └── main.jsx
```

### Target folders that already exist

| Target folder | Exists? | Notes |
|---|---|---|
| `src/components/` | ✓ YES | Correct location and purpose |
| `src/design-tokens/` | ✓ YES | Correct, actively used |
| `src/assets/` | ⚠️ PARTIAL | Exists but only `avatar/` subfolder; missing `logos/`, `flags/`, `illustrations/`, `badges/`, `demo/` |
| `.storybook/` | ✓ YES | `main.js` and `preview.js` present |
| `.github/` | ✓ YES | `workflows/` directory present |

### Target folders that do NOT yet exist

| Target folder | Status |
|---|---|
| `src/icons/` | MISSING — icons currently live in `src/components/icons/` |
| `docs/` | MISSING — no repo-operational documentation folder |

### Non-target items at repo root (not in target structure)

- `00_` through `05_` Xenorize SOP/knowledge files — these are DT-role context files; per the placement rules, SOP/process files belong in the Auditor's workspace, not the code repo. Their presence at repo root is a governance deviation but does not break builds. Governance doc explicitly flags these as "Do not stage."
- `design-tokens/` at repo root — stale duplicate of `src/design-tokens/`; actively diverged (the root copy is older and missing tokens). Not the authoritative copy.
- `progress-*.md` — operational notes, not repo documentation; belong in `docs/` or removed.
- `autopush.mjs` — repo automation script; acceptable at root but should be documented in `docs/contribution.md` once that folder exists.

---

## 2. Current Icon Location and Risk

### Location confirmed

Raw icon files live at `src/components/icons/`. The governance target is `src/icons/`. These are two different paths — no migration has occurred yet.

### Icon count

**16 files total:**
BubbleAlert.jsx, CalendarIcon.jsx, ChevronDownSmall.jsx, ChevronRightSmall.jsx, ChevronTopSmall.jsx, CircleCheck.jsx, CircleInfo.jsx, CircleX.jsx, CopyIcon.jsx, CrossLarge.jsx, EyeIcon.jsx, EyeOffIcon.jsx, LinkIcon.jsx, LockIcon.jsx, PhoneIcon.jsx, SearchIcon.jsx

### Compliance check against foundation icon rules

| Rule | Status | Notes |
|---|---|---|
| SVG-only, no layout wrapper | ✓ PASS (14/16) | CircleCheck and CircleX have extra comment markers but no wrapper div |
| `currentColor` for color | ⚠️ FAIL (2/16) | `CircleCheck.jsx` has hardcoded `stroke="white"` on the checkmark path — violates currentColor-only rule |
| No click handling / interaction | ✓ PASS (16/16) | Confirmed — no onClick, onHover, or interactive props in any icon file |
| No margin / padding / background | ✓ PASS (16/16) | Confirmed |
| `viewBox="0 0 24 24"` | ⚠️ FAIL (2/16) | `CircleCheck.jsx` and `CircleX.jsx` use `viewBox="0 0 20 20"` — governance requires 24×24 per Icon System master frame |
| `size` prop only | ⚠️ DEVIATION (2/16) | `BubbleAlert.jsx` uses `width`/`height` props (default 12) instead of `size`. `CircleCheck.jsx` / `CircleX.jsx` have no size prop at all (fixed `width="20" height="20"`) |
| DS-sourced paths | ⚠️ PLACEHOLDER (2/16) | `CircleCheck.jsx` and `CircleX.jsx` are confirmed placeholders with TODO markers and synthetic geometry. All 14 others have real DS paths from Figma |

**Summary:** 14 of 16 icon files comply with foundation icon rules. The 2 non-compliant files (`CircleCheck.jsx`, `CircleX.jsx`) are known placeholders blocked on DS SVG path extraction — flagged separately as Task #7, blocked pending Figma DS file connection.

### Naming convention

Current convention: `{Name}Icon.jsx` or descriptive (e.g. `BubbleAlert.jsx`, `ChevronDownSmall.jsx`).
Target convention per governance: `Icon{CanonicalName}.jsx` in `src/icons/`.
This is a two-part mismatch: path AND naming. Both need to change in Phase 2C. The naming migration is tracked as a separate PR task from the prior session.

### Import path blast radius — icons

**HIGH.** This is the governance doc's highest-rated single migration risk.

30 icon import statements across 16 consumer files. All use the relative path pattern `'../icons/IconName.jsx'` (relative from inside their component subfolder, resolving to `src/components/icons/`).

If icons move to `src/icons/`, every import changes from `'../icons/X'` to `'../../icons/X'` (or to an aliased path if an alias is configured).

Consumer files that would need updating:

| File | Icons imported |
|---|---|
| `input-text/PasswordInput.jsx` | LockIcon, EyeIcon, EyeOffIcon |
| `input-text/LinkInput.jsx` | LinkIcon |
| `input-text/SearchInput.jsx` | SearchIcon |
| `input-text/PhoneNumberInput.jsx` | PhoneIcon |
| `input-text/DateInput.jsx` | CalendarIcon |
| `alert/Alert.jsx` | BubbleAlert, CrossLarge |
| `accordion/Accordion.jsx` | CircleInfo, ChevronDownSmall, ChevronTopSmall |
| `key-component/HintText.jsx` | CircleInfo |
| `key-component/LabelKey.jsx` | CircleInfo |
| `key-component/PasswordStrength.jsx` | CircleCheck, CircleX |
| `key-component/KeyIcon.stories.jsx` | CircleInfo |
| `button/Button.stories.jsx` | CopyIcon |
| `button/Button.medium.stories.jsx` | CopyIcon |
| `button/Button.small.stories.jsx` | CopyIcon |
| `button/Button.overview.stories.jsx` | CopyIcon |
| `breadcrumb/Breadcrumb.jsx` | ChevronRightSmall |
| `breadcrumb/Breadcrumb.stories.jsx` | ChevronRightSmall |
| `breadcrumb/Breadcrumb.overview.stories.jsx` | ChevronRightSmall |
| `button-group/ButtonGroup.stories.jsx` | ChevronDownSmall, ChevronTopSmall |
| `button-group/ButtonGroup.overview.stories.jsx` | ChevronDownSmall, ChevronTopSmall |
| `badge/Badge.jsx` | BubbleAlert |
| `badge/Badge.stories.jsx` | BubbleAlert |

No files outside `src/` import icons — blast radius is contained within the repo's source.

---

## 3. Current Asset Location and Risk

### Location confirmed

`src/assets/avatar/` — 3 files:
- `avatar-sample-illustration.png`
- `avatar-sample-memoji.png`
- `avatar-sample-photo.png`

### Missing asset subfolders

The following target subfolders do not exist yet:

| Target | Status |
|---|---|
| `src/assets/logos/` | MISSING |
| `src/assets/flags/` | MISSING |
| `src/assets/illustrations/` | MISSING |
| `src/assets/badges/` | MISSING |
| `src/assets/demo/` | MISSING |

### Observations

- No assets are co-located with component code. The Avatar component imports its images from `src/assets/avatar/`, not from inside its own component folder. This is already clean.
- No ambiguous assets found. The three avatar sample images are clearly non-icon (multi-color PNG photographs/illustrations, not single-color glyphs) — no confusion with `src/icons/` territory.
- `src/assets/avatar/` already uses the target naming pattern (`src/assets/{type}/`), so the avatar assets are in the right place. Only the missing subfolders need to be created when other asset types are added.

### Risk

**LOW.** Asset folder expansion requires creating new subfolders, not moving existing files. The 3 existing avatar images are already in the correct location. No import path updates needed.

---

## 4. Current Token File Location and Risk

### Location confirmed — DUPLICATE EXISTS

| Location | Files | Status |
|---|---|---|
| `design-tokens/` (repo root) | `tokens.css`, `tokens.json`, `README.md` | STALE COPY — outdated, not actively imported |
| `src/design-tokens/` | `tokens.css`, `tokens.json`, `README.md` | CORRECT, ACTIVE — this is the live authoritative copy |

The two `tokens.css` files are **NOT identical.** The root copy is missing:
- `--color-border-neutral-default` (line 143 in src version)
- Updated `--status-warning-base` value (root has stale `#763606`, src has corrected `#684e00`)
- Button fill secondary and destructive tokens (multiple missing entries)

Active token import consumers:
- `.storybook/preview.js` → imports `../src/design-tokens/tokens.css` ✓
- `src/index.css` → imports `./design-tokens/tokens.css` (resolves to `src/design-tokens/tokens.css`) ✓
- Component CSS files (`Alert.css`, `Accordion.css`, `Button.css`, `ButtonGroup.css`, `Badge.css`) — reference tokens via CSS custom properties consumed through the cascade; the token CSS comment in each file says "import it once at app root" — they do NOT import tokens.css themselves, they rely on the global import via `src/index.css`.

### Risk

**LOW for token migration** — `src/design-tokens/` is already the correct target location. No move needed for the active token files.

**MEDIUM for root-level stale copy** — the presence of `design-tokens/` at the repo root is a trap: any new developer or tool that guesses at a token path might find the stale copy and use it without knowing it's outdated. The root copy should be cleaned up (as a separate, simple housekeeping task), but this is not a blocker for Phase 2C and does not break anything currently.

---

## 5. Current Handoff Folder State

### Spelling

**Confirmed on disk: `design-system-handsoff`** (transposed "s" — missing the "d" to make it "handoff").
Governance confirmed target spelling: `design-system-handoff`.
This rename has NOT been executed. The folder is still the wrong spelling.

### Current subfolder structure

```
design-system-handsoff/
├── Assets/                     ← EXISTS but EMPTY
├── Component/                  ← 26 files (handoff briefs + usage specs)
│   ├── component-accordion-handoff-brief.md
│   ├── component-accordion-usage-spec.md
│   ├── component-alert-handoff-brief.md
│   ├── component-alert-usage-spec.md
│   ├── component-avatar-handoff-brief.md
│   ├── component-avatar-usage-spec.md
│   ├── component-badge-handoff-brief.md
│   ├── component-badge-usage-spec.md
│   ├── component-bottom-status-handoff-brief.md
│   ├── component-bottom-status-usage-spec.md
│   ├── component-breadcrumb-handoff-brief.md
│   ├── component-breadcrumb-usage-spec.md
│   ├── component-button-group-handoff-brief.md
│   ├── component-button-group-usage-spec.md
│   ├── component-button-handoff-brief.md
│   ├── component-button-usage-spec.md
│   ├── component-chart-donut-handoff-brief.md
│   ├── component-chart-donut-usage-spec.md
│   ├── component-input-text-handoff-brief.docx
│   ├── component-input-text-usage-spec.docx
│   ├── component-key-component-handoff-brief.md
│   ├── component-key-component-usage-spec.md
│   ├── component-risk-gauge-learning-note.md
│   ├── component-risk-gauge-micro-icon-note.md
│   ├── component-top-status-handoff-brief.md
│   └── component-top-status-usage-spec.md
├── Icon/                       ← 4 files (icon library docs)
│   ├── icon-library-audit-report.md
│   ├── icon-library-handoff-brief.md
│   ├── icon-library-inventory.csv
│   └── icon-library-usage-spec.md
└── DS-Token-Impact-Handoff-border-neutral-default.docx  ← AT ROOT (no subfolder)
```

### Mismatches against target shape

| Current | Target | Notes |
|---|---|---|
| `Component/` | `components/` | Rename: uppercase → lowercase |
| `Icon/` | `foundations/icons/` | Rename + restructure into `foundations/` parent |
| `Assets/` (empty) | `foundations/assets/` | Rename + restructure into `foundations/` parent; currently empty |
| (missing) | `foundations/tokens-and-styles/` | New subfolder needed for token/style governance docs |
| (missing) | `governance/` | New subfolder needed for the 3 meta governance docs |
| (missing) | `tokens/` | New subfolder for point-in-time token audit reports |
| (missing) | `patterns/` | New subfolder for UX pattern specs |
| Root: `DS-Token-Impact-Handoff-border-neutral-default.docx` | Should be in `tokens/` | Token audit report placed at wrong level |

### Cross-references using old spelling or old folder names

No cross-references using `design-system-handsoff/` spelling or `Component/`/`Icon/` old folder names were found inside the handoff doc files themselves. The one reference found (`component-key-component-usage-spec.md`) uses `src/design-tokens/tokens.css` — a code path, not a handoff doc cross-reference, and it uses the correct spelling.

However: the governance docs themselves (`repository-structure-guideline.md`, `design-system-handoff-placement-rules.md`, etc.) live in the **Auditor's `governance/` folder**, not yet in `design-system-handsoff/`. These have not been promoted. The promotion into `design-system-handoff/governance/` is a Phase 2C step.

---

## 6. Current Storybook Taxonomy State

### What currently exists

All stories are filed under `Components/`:

```
Components/
├── Accordion/General
├── Accordion/Overview
├── Alert/General
├── Alert/Overview
├── Avatar/General
├── Avatar/Overview
├── Badge/General
├── Badge/Overview
├── Breadcrumb/General
├── Breadcrumb/Overview
├── Button Group/General
├── Button Group/Overview
├── Button/General/Large
├── Button/General/Medium
├── Button/General/Small
├── Button/Overview
├── Button/Special/Large
├── Button/Special/Medium
├── Button/Special/Small
├── Chart Donut/Multicolor
├── Chart Donut/Overview
├── Chart Donut/Single Color
├── Input Text/Basic/General
├── Input Text/Date/General
├── Input Text/Digit Input/General
├── Input Text/Link/General
├── Input Text/Overview
├── Input Text/Password/General
├── Input Text/Phone Number/General
├── Input Text/Search/General
├── Key Component/HintText/General
├── Key Component/KeyIcon/General
├── Key Component/LabelKey/General
└── Key Component/PasswordStrength/General
```

### What is missing per governance target

| Target entry | Current state | Notes |
|---|---|---|
| `Foundations/Icons/General` | MISSING — no Storybook story for icons at all | Icons live only in `src/components/icons/` with no story file |
| `Foundations/Tokens/Colors` | MISSING | |
| `Foundations/Tokens/Typography` | MISSING | |
| `Foundations/Tokens/Spacing` | MISSING | |
| `Foundations/Tokens/Radius` | MISSING | |
| `Foundations/Tokens/Shadows` | MISSING | |
| `Foundations/Tokens/Borders` | MISSING | |
| `Foundations/Assets/General` | MISSING | |

### Observations

**`Components/Key Component/`** — placing LabelKey, HintText, KeyIcon, and PasswordStrength under `Components/` is correct. These are genuine product-level composition components used within Input Text, not raw foundation primitives. They do not belong under `Foundations/Icons/`.

**Motion and Z-Index** — correctly absent from Storybook. Per governance, neither has a confirmed Figma source of truth yet, so no Storybook page should exist for either. None does. ✓

**No `Foundations/` tier exists at all.** The entire `Foundations/` section of the Storybook navigation is unbuilt. Creating it requires:
1. Icon story files to be written (one per icon, or one overview — after icon move to `src/icons/`)
2. Token documentation stories for each token category
3. Asset documentation if applicable

---

## 7. Import-Path Blast Radius Estimate

| Area | Risk | Detail |
|---|---|---|
| Icon files | **HIGH** | 30 import statements across 22 consumer files. All use relative paths that resolve from `src/components/{component}/` to `../icons/`. Moving to `src/icons/` changes every path to `../../icons/`. The icon move has the highest single blast radius of any Phase 2C step. Do this as a deliberate, isolated pass. |
| Token CSS | **LOW** | Only 2 direct import consumers: `src/index.css` (resolves correctly from `./design-tokens/`) and `.storybook/preview.js` (imports `../src/design-tokens/tokens.css`). Both already point to the correct `src/design-tokens/` location. No path changes needed for the active token files. |
| Root `design-tokens/` cleanup | **LOW** | Deleting or archiving the stale root `design-tokens/` folder has zero import impact because nothing actively imports from it. Safe to remove as a housekeeping step. |
| Asset files | **LOW** | Only the `Avatar` component appears to consume assets from `src/assets/`. Current location `src/assets/avatar/` is already the governance-correct path. Adding new asset subfolders is additive — no existing paths change. |
| Handoff folder rename | **LOW** | No code imports handoff docs. The rename from `design-system-handsoff` to `design-system-handoff` does not break any build, import, or runtime path. Risk is limited to bookmark links, README references, and any external docs that reference the folder by name. |
| Storybook taxonomy | **MEDIUM** | Rewriting story `title` fields changes Storybook navigation but does not affect component runtime behavior. Risk is limited to broken Storybook deep-links if anyone has bookmarked specific story URLs. Build will not break. |

---

## 8. Governance Mismatch Table

| Area | Current state | Target state | Risk | Suggested later action |
|---|---|---|---|---|
| Raw icon location | `src/components/icons/` | `src/icons/` | HIGH | Phase 2C: move as a dedicated pass. Update 30 import statements across 22 files after move. |
| Icon naming convention | `{Name}Icon.jsx` / descriptive | `Icon{CanonicalName}.jsx` | MEDIUM | Phase 2C: rename files alongside the folder move. Update all imports simultaneously. |
| Icon Storybook placement | No Storybook docs for icons | `Foundations/Icons/General` | LOW | Phase 2C: create `src/icons/Icons.stories.jsx` with `title: 'Foundations/Icons/General'` after icon move. |
| `src/icons/` folder | Does not exist | Must exist | MEDIUM | Phase 2C: create as part of icon move. |
| `docs/` folder | Does not exist | `docs/contribution.md`, `docs/storybook-guidelines.md`, `docs/token-guidelines.md` | LOW | Can happen independently of Input Text QA. Lowest-risk Phase 2C item. |
| Root `design-tokens/` (duplicate) | Stale duplicate at repo root | Should not exist / be removed | MEDIUM | Phase 2C or sooner: delete root `design-tokens/` folder. No import impact. |
| `00_–05_` SOP files at repo root | Present at repo root | Belong in Auditor workspace, not repo | LOW | Phase 2C: discuss with DS Lead whether to remove from repo or keep as reference. Do not stage per existing constraint. |
| `src/assets/` completeness | Only `avatar/` subfolder | `avatars/`, `logos/`, `flags/`, `illustrations/`, `badges/`, `demo/` | LOW | Phase 2C: create missing subfolders as assets are added. No existing paths change. |
| Handoff folder spelling | `design-system-handsoff` | `design-system-handoff` | LOW | Phase 2C: rename folder. Update any README or docs links that reference it. No build impact. |
| Handoff subfolders (Component/) | `Component/` (uppercase) | `components/` (lowercase) | LOW | Phase 2C: rename alongside folder rename above. |
| Handoff subfolders (Icon/) | `Icon/` | `foundations/icons/` | LOW | Phase 2C: create `foundations/` parent, move docs into new path. |
| Handoff subfolders (Assets/) | `Assets/` (empty) | `foundations/assets/` | LOW | Phase 2C: rename + restructure. Currently empty so no file moves needed. |
| Handoff — governance subfolder | Does not exist in handoff | `design-system-handoff/governance/` | LOW | Phase 2C: create and promote the 4 governance docs from Auditor workspace. |
| Handoff — tokens subfolder | Does not exist | `design-system-handoff/tokens/` | LOW | Phase 2C: create; move `DS-Token-Impact-Handoff-border-neutral-default.docx` into it. |
| Handoff — patterns subfolder | Does not exist | `design-system-handoff/patterns/` | LOW | Phase 2C: create when first pattern spec is ready. |
| Storybook Foundations tier | Does not exist | `Foundations/Icons/`, `Foundations/Tokens/*`, `Foundations/Assets/` | MEDIUM | Phase 2C: add story files after icon move; add token docs stories. Rewriting `title` fields has no build risk. |
| Token Storybook docs | None | `Foundations/Tokens/{Colors,Typography,Spacing,Radius,Shadows,Borders}` | LOW | Phase 2C: create as standalone `.stories.jsx` files in `src/design-tokens/` or `src/foundations/`. |
| CircleCheck / CircleX compliance | PLACEHOLDER — 20×20 viewBox, hardcoded `stroke="white"` | DS-sourced 24×24, currentColor only | HIGH (icon quality) | Blocked on DS SVG path extraction (Task #7). Must fix before any icon migration — these 2 files do not meet foundation icon rules yet. |

---

## 9. Recommended Phase 2C Migration Order

This is a sequencing recommendation only. No step below is authorized until Phase 2C is formally opened (Input Text QA closed + DS Lead approval + dedicated task).

1. **Resolve CircleCheck and CircleX placeholders first.** These 2 files are non-compliant with foundation icon rules today (wrong viewBox, hardcoded color). They must be corrected with real DS paths before the icon folder is moved — migrating broken files to `src/icons/` would entrench non-compliance in the target location.

2. **Delete root `design-tokens/` stale copy.** Zero blast radius. No imports affected. Clean up before any other work so there's no ambiguity about which token file is authoritative. Can be done as a quick housekeeping PR.

3. **Create `docs/` folder with stub files.** Zero code risk. Establishes the engineering docs home. Can happen before or independently of icon migration.

4. **Rename handoff folder and reorganize.** Rename `design-system-handsoff` → `design-system-handoff`, then rename subfolders (`Component/` → `components/`, `Icon/` → `foundations/icons/`, `Assets/` → `foundations/assets/`), create `governance/`, `tokens/`, `patterns/` subfolders, and promote the 4 governance docs from the Auditor workspace. No build impact at all.

5. **Icon folder move + rename (highest blast radius — do this deliberately).** Create `src/icons/`. Move all 16 icon files, renaming each from `{Name}Icon.jsx` to `Icon{CanonicalName}.jsx` at the same time (don't do it in two separate passes). Update all 30 import statements. Run Storybook and Vite build to verify.

6. **Add `Foundations/Icons/` Storybook story.** After icon move, create `src/icons/Icons.stories.jsx` with `title: 'Foundations/Icons/General'`.

7. **Create `Foundations/Tokens/` Storybook documentation stories** for Colors, Typography, Spacing, Radius, Shadows, Borders.

8. **Create missing `src/assets/` subfolders** as actual assets are added (logos, flags, etc.) — additive only.

Items 2, 3, and 4 can happen before Input Text QA closes since they involve no source code changes. Items 5–8 are the higher-risk code changes and must wait for the full Phase 2C gate.

---

## 10. Blockers Before Phase 2C

| Blocker | Type | Detail |
|---|---|---|
| Input Text QA not yet closed | HARD GATE | All Phase 2C code changes (icon move, import path updates) are blocked. Items 2, 3, 4 above (housekeeping, docs, handoff rename) could technically proceed but the governance plan defers them to the same Phase 2C window. |
| CircleCheck / CircleX placeholders | CODE QUALITY | These 2 files must be fixed (Task #7, awaiting DS SVG paths) before the icon migration. Moving them to `src/icons/` in their current state would entrench non-compliance. |
| DS Lead approval of this report | PROCESS GATE | Phase 2C cannot open until DS Lead approves this report and a dedicated migration task is created. |
| `src/icons/` index convention | MINOR OPEN QUESTION | Governance recommends an `index.js` registry in `src/icons/`. No such file exists. Confirm whether consumers should import from `src/icons/index.js` (named exports) or from individual files — this affects how the 30 import statements are rewritten. |

---

## 11. Items That Must Wait Until Input Text QA Closes

Per the governance blocking condition established in `repository-structure-guideline.md` §6 and reaffirmed in `phase-2-governance-promotion-and-dt-intake-plan.md` §11:

- Renaming `design-system-handsoff/` → `design-system-handoff/` and restructuring its subfolders.
- Moving icon files from `src/components/icons/` → `src/icons/`.
- Renaming icon files from `{Name}Icon.jsx` to `Icon{CanonicalName}.jsx`.
- Updating any import paths (30 icon imports, any others).
- Creating the Storybook `Foundations/` tier.
- Any other Phase 2C code change or repo restructuring.

Additionally specific to Input Text QA:

- The 7 Input Text icon imports (`LockIcon`, `EyeIcon`, `EyeOffIcon`, `LinkIcon`, `SearchIcon`, `PhoneIcon`, `CalendarIcon`) are the highest-confidence import paths in the repo right now — they are actively under QA review. The icon migration must not proceed while those imports are being tested, since changing them would invalidate in-flight QA results.
- The 3 missing `placeholder-error` tokens in `tokens.css` and the 3 missing `--_it-placeholder` assignments in `InputText.css` (found in the prior token audit) must be resolved and QA-verified before this component is considered closed.

---

*Phase 2B complete. Inspection and reporting only — no files moved, no code edited, no migration executed, no commit prepared. Awaiting DS Lead approval to open Phase 2C.*
