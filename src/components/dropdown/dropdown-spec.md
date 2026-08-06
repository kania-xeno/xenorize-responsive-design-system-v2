# Component Spec — DropdownList / DropdownOption

**Prepared by:** Design Technologist / Design Engineer
**DS version:** Scalable Design System — All Platform V.2.1.0
**Figma file:** `0aVnOgjVWH1YL8JCnjXTBi` — page `❖ Dropdown`
**Implementation date:** 2026-07-30
**Last updated:** 2026-08-06 — Phase 2 runtime fixes (Globe icon, spacing, avatar size, DropdownList layout + Search)
**Status:** Implemented — L3 tokens emitted in tokens.css

---

## 1. Component Overview

Two components on the `❖ Dropdown` Figma page:

| Figma component | Code component | File |
|---|---|---|
| `dropdown-list` | `DropdownList` | `DropdownList.jsx` / `DropdownList.css` |
| `↳dropdown-items` | `DropdownOption` | `DropdownOption.jsx` / `DropdownOption.css` |

**Out of scope:** Select trigger, CompactSelect trigger, typeahead, nested submenus, open/close animation.
**In scope (Phase 2):** Search in Fixed dropdown-list panel (SearchInput, size=xs).

---

## 2. Figma Source

| Item | Value |
|---|---|
| File | Design System Scalable — All Platform V.2.1.0 |
| File key | `0aVnOgjVWH1YL8JCnjXTBi` |
| Page | `❖ Dropdown` |
| `↳dropdown-items` node | `2090:6272` |
| `dropdown-list` node | Confirm during intake (deep-inspect exceeds token limit) |
| `↳dropdown-items` variants | 60 (6 types × 5 states × 2 sizes) |
| `dropdown-list` variants | 2 (fixed height · huge height) |
| L3 variable collection | `component` (`VariableCollectionId:1902:2617`, modeId `1902:0`) |

**Figma inspection completed:** 2026-07-30
**L3 variable implementation status in Figma:** ✅ COMPLETE — 20 variables bound

---

## 3. Component Anatomy

### 3.1 DropdownList (panel)

```
.dropdown-list [role="listbox"]
  ├── display: flex; flex-direction: column
  ├── padding: 8px (all sides)
  ├── background-color: var(--dropdown-list-bg-default)
  ├── border: 1px solid var(--dropdown-list-border-default)
  ├── box-shadow: var(--dropdown-list-shadow-default)    ← regular-shadow/medium
  ├── border-radius: var(--radius-16)     ← 16px (unbound in Figma — DS gap)
  ├── width: 340px                        ← Figma fixed width (confirm OQ2)
  ├── max-height: 252px (fixed) | 104px (huge)
  │
  ├── [Fixed only] gap: 12px
  │   ├── <SearchInput size="xs" placeholder="Search..." />   ← 324×32px
  │   └── .dropdown-list__options                             ← flex col, gap 8, overflow scroll
  │       └── [DropdownOption children]
  │
  └── [Huge] gap: 8px, overflow-y auto
      └── [DropdownOption children] (no search)
```

### 3.2 DropdownOption — Small (40px)

Figma layer path: `↳dropdown-items > {layers below}`

```
.dropdown-option [role="option"]          — root frame, bg fill per state
  ├── .dropdown-option__checkbox          — INSTANCE (↳checkbox), optional, hidden by default
  ├── .dropdown-option__left-slot         — bare INSTANCE, no frame
  ├── .dropdown-option__text              — FRAME (Text)
  │   ├── .dropdown-option__label         — TEXT (Label), body/regular/md
  │   └── .dropdown-option__sublabel      — TEXT ((Sublabel)), caption/regular, optional
  ├── (Badge component)                   — optional, hidden by default
  ├── .dropdown-option__toggle            — INSTANCE (↳toggle), visible by default
  ├── .dropdown-option__link-btn          — INSTANCE (↳buttons-link), hidden by default
  └── .dropdown-option__right-icon        — INSTANCE (chevron-right-small), visible by default
```

### 3.3 DropdownOption — Large (56px)

```
.dropdown-option [role="option"]          — root frame, bg fill per state
  ├── .dropdown-option__checkbox          — INSTANCE (↳checkbox), optional, hidden by default
  ├── .dropdown-option__left-frame        — FRAME (Icon/Country/Provider/Brand/Company)
  │   └── .dropdown-option__left-slot     — nested INSTANCE (left-slot)
  │   [No frame for Basic type — DS gap G5]
  │   [No frame for Avatar type — by design]
  ├── .dropdown-option__content           — FRAME (Content)
  │   ├── .dropdown-option__text          — FRAME (Text)
  │   │   ├── .dropdown-option__label     — TEXT (Label), body/regular/md
  │   │   └── .dropdown-option__sublabel  — TEXT ((Sublabel)), caption/regular, optional
  │   └── .dropdown-option__description   — TEXT (Descriptions), caption/regular, optional
  ├── (Badge component)                   — optional, hidden by default
  ├── .dropdown-option__toggle            — INSTANCE (↳toggle), visible by default
  ├── .dropdown-option__link-btn          — INSTANCE (↳buttons-link/↳buttons-small), hidden by default
  └── .dropdown-option__right-icon        — INSTANCE (chevron-right-small), visible by default
```

---

## 4. Variant Axes

### DropdownOption

| Axis | Figma label | Prop | Values |
|---|---|---|---|
| Type | `🧩 Type` | `type` | `basic` · `country` · `avatar` · `provider` · `brand` · `company` |
| State | `📌 State` | CSS state selectors + `selected` / `disabled` props | `default` · `hover` · `selected` · `selected-hover` · `disabled` |
| Size | `📏 Size` | `size` | `small` (40px) · `large` (56px) |

### DropdownList

| Axis | Figma label | Prop | Values |
|---|---|---|---|
| Height | `size` | `height` | `fixed` (252px) · `huge` (104px) |

---

## 5. State Map

| Figma state | CSS selector | aria attribute |
|---|---|---|
| Default | `:not([aria-selected]):not(:hover)` | `aria-selected="false"` |
| Hover | `:hover` | `aria-selected="false"` |
| Selected | `[aria-selected="true"]` | `aria-selected="true"` |
| Selected Hover | `[aria-selected="true"]:hover` | `aria-selected="true"` |
| Disabled | `[aria-disabled="true"]` | `aria-disabled="true"` |

---

## 6. Token Map

### 6.1 L3 Architecture

```
Primitive (L1) → Theme/Semantic (L2) → Component Variable (L3) → Layer binding (L4)
```

L3 variables are emitted in `tokens.css` under the `--dropdown-items-*` and `--dropdown-list-*` namespaces. Component CSS files consume them directly — no `:root` blocks in component CSS.

### 6.2 DropdownOption — L3 token table (confirmed in Figma 2026-07-30)

| L3 variable | Variable ID | L2 alias | Emitted CSS var | States |
|---|---|---|---|---|
| `dropdown-items/bg/default` | `3149:896` | `surface/neutral/white` | `--color-surface-neutral-white` | Default |
| `dropdown-items/bg/hover` | `3149:897` | `surface/neutral/soft` | `--color-surface-neutral-soft` | Hover |
| `dropdown-items/bg/selected` | `3149:898` | `surface/neutral/soft` | `--color-surface-neutral-soft` | Selected |
| `dropdown-items/bg/selected-hover` | `3149:899` | `surface/neutral/soft-alt` | `--color-surface-neutral-soft-alt` | Selected Hover |
| `dropdown-items/bg/disabled` | `3149:900` | `surface/neutral/white` | `--color-surface-neutral-white` | Disabled |
| `dropdown-items/text/default` | `3149:901` | `text/neutral/strong` | `--color-text-neutral-strong` | Default |
| `dropdown-items/text/hover` | `3149:902` | `text/neutral/strong` | `--color-text-neutral-strong` | Hover |
| `dropdown-items/text/selected` | `3149:903` | `text/neutral/strong` | `--color-text-neutral-strong` | Selected |
| `dropdown-items/text/selected-hover` | `3149:904` | `text/neutral/strong` | `--color-text-neutral-strong` | Selected Hover |
| `dropdown-items/text/disabled` | `3149:905` | `text/neutral/disabled` | `--color-text-neutral-disabled` | Disabled |
| `dropdown-items/subtext/default` | `3149:906` | `text/neutral/subtle` | `--color-text-subtle` ⚠️ | Default |
| `dropdown-items/subtext/hover` | `3149:907` | `text/neutral/subtle` | `--color-text-subtle` ⚠️ | Hover |
| `dropdown-items/subtext/selected` | `3149:908` | `text/neutral/subtle` | `--color-text-subtle` ⚠️ | Selected |
| `dropdown-items/subtext/selected-hover` | `3149:909` | `text/neutral/subtle` | `--color-text-subtle` ⚠️ | Selected Hover |
| `dropdown-items/subtext/disabled` | `3149:910` | `text/neutral/disabled` | `--color-text-neutral-disabled` | Disabled |
| `dropdown-items/descriptions/default` | `3149:911` | `icon/sub` | `--color-icon-sub` | All except Disabled |
| `dropdown-items/descriptions/disabled` | `3149:912` | `text/neutral/disabled` | `--color-text-neutral-disabled` | Disabled |
| `dropdown-items/icon-border/default` | `3149:913` | `border/neutral/subtle` | `--color-border-neutral-subtle` | All (state-invariant) |

Note: `text/neutral/subtle` has no dedicated `--color-text-neutral-subtle` alias in tokens.css. `--color-text-subtle` (semantic.color.text.subtle → prim-neutral-400, #a3a3a3) is the correct emitted equivalent and is used here.

**Variables NOT created (nested instances own their own tokens):**
- `dropdown-items/icon/*` — left-slot icons are nested INSTANCEs
- `dropdown-items/right-icon/*` — chevron-right-small is a nested INSTANCE
- `dropdown-items/border/*` — no direct-owned stroke on root frame

### 6.3 DropdownList — L3 token table (confirmed in Figma 2026-07-30)

| L3 variable | Variable ID | L2 alias | Emitted CSS var |
|---|---|---|---|
| `dropdown-list/bg/default` | `3149:914` | `background/base` | `--color-bg-base` |
| `dropdown-list/border/default` | `3149:915` | `border/neutral/soft` | `--color-border-neutral-default` |
| `dropdown-list/shadow/default` | — | Figma Effect: `regular-shadow/medium` | `--dropdown-list-shadow-default` → `--shadow-regular-medium` |

Notes:
- `background/base` → `semantic.color.bg.base` → `--color-bg-base` (slate-0, #ffffff, mode-invariant).
- `border/neutral/soft` has no dedicated alias in tokens.css; `--color-border-neutral-default` (semantic.color.border.default) is the closest emitted equivalent.
- Shadow: Figma panel uses Effect Style `regular-shadow/medium` → `0 16px 32px -12px rgba(23,23,23,0.10)`.

### 6.4 Special token — chevron stroke

The `chevron-right-small` stroke is bound directly to `brand/primary/base` (a theme/L2 token), not through an L3 component token. This is state-invariant across all 5 states — the chevron color does not change. **Do not re-tokenize.** Code uses `--color-brand-primary-base` directly on `.dropdown-option__right-icon`.

---

## 7. Typography

| Element | Text style | Size | Weight | Font |
|---|---|---|---|---|
| Label | `body/regular/md` | 14px | Regular (400) | Open Sans |
| Sublabel | `caption/regular` | 12px | Regular (400) | Open Sans |
| Descriptions (Large) | `caption/regular` | 12px | Regular (400) | Open Sans |
| Link button text | `body/medium/md` | 14px | SemiBold (600) | Open Sans |

---

## 8. Spacing / Radius / Border

| Element | Value | Token | Source |
|---|---|---|---|
| Row height — Small | 40px | — | `dropdown-option--small` (Phase 2 fix — was 36px) |
| Row height — Large | 56px | — | `dropdown-option--large` |
| Row padding (H) | 8px | `--spacing-8` | Figma paddingLeft/Right: 8 |
| Row gap — Small | 8px | `--spacing-8` | Figma itemSpacing: 8 |
| Row gap — Large | 12px | `--spacing-12` | Figma itemSpacing: 12 |
| Row corner radius — Small | 8px | `--radius-8` | Unbound in Figma (G1) |
| Row corner radius — Large | 10px | `--radius-10` | Confirmed tokens.css:284 |
| Avatar size — Small | 20px | — | `<Avatar size={20}>` (Phase 2 fix — was 24px) |
| Avatar size — Large | 40px | — | `<Avatar size={40}>` (Phase 2 fix — was 32px) |
| Icon frame size — Large | 40×40px | — | Figma Large Icon FRAME (Phase 2 fix — was 32×32) |
| Icon frame radius | `radius/full` (999px, circular) | `--radius-full, 9999px` | Applied to `.dropdown-option__left-frame` |
| Icon frame border | 1px | `--dropdown-items-icon-border-default` | `border/neutral/subtle` |
| Chevron icon | 24×24px | — | `chevron-right-small` INSTANCE (Phase 2 fix — was 16×16 in CSS) |
| Panel width | 340px | — | Fixed in Figma (confirm OQ2) |
| Panel padding | 8px | — | All sides — Figma confirmed |
| Panel height — fixed | 252px max | — | `dropdown-list--fixed` (includes Search + options) |
| Panel height — huge | 104px max | — | `dropdown-list--huge` (no Search) |
| Panel gap — fixed | 12px | — | Gap between SearchInput and options wrapper |
| Panel gap — huge | 8px | — | Gap between options |
| Panel corner radius | 16px | `--radius-16` | Unbound in Figma (G2) |
| Panel border | 1px | `--dropdown-list-border-default` | `border/neutral/soft` |
| Panel shadow | `regular-shadow/medium` | `--dropdown-list-shadow-default` | Figma Effect Style — `0 16px 32px -12px rgba(23,23,23,0.10)` |
| Search input (Fixed) | 324×32px | `size="xs"` | SearchInput X-Small — Figma ↳search INSTANCE inside Fixed panel |

---

## 9. Nested Components

These appear as nested INSTANCE children in the Figma component. Do not re-tokenize inside DropdownOption.

| Figma instance | Code status | Implementation note |
|---|---|---|
| `↳checkbox` | ✅ `<Checkbox size="small">` | Implemented Phase 2B (2026-08-05) |
| `↳switch` (formerly `↳toggle`) | ✅ `<Switch>` (32×20px) | Implemented Phase 2B. DS renamed ↳toggle → ↳switch in v2.1.0 (2026-08-03) |
| `↳badge` | ✅ `<Badge>` | Used directly |
| `↳buttons-link` (Small) / `↳buttons-small` (Large) | ✅ `<ButtonLink size="small" style="neutral">` | Implemented Phase 2B. Known gap: Large uses ↳buttons-small (filled); ButtonLink used for both until compact filled variant ships |
| `↳avatar` | ✅ `<Avatar>` | Used directly for `type="avatar"` — Small: `size={20}`, Large: `size={40}` (Phase 2 fix — was 24/32) |
| Left-slot icon/flag/logo | ❌ Not a component | `<img>` or ReactNode via `leftIcon` prop |
| `chevron-right-small` | ✅ `<ChevronRightSmall>` | Used directly |

---

## 10. Props API

### DropdownList

```ts
interface DropdownListProps {
  height?: "fixed" | "huge";       // default: "fixed" (252px)
  showSearch?: boolean;            // default: true when height="fixed", false when height="huge"
  searchValue?: string;            // controlled search input value
  onSearch?: (e: ChangeEvent) => void;
  searchPlaceholder?: string;      // default: "Search..."
  children: ReactNode;             // DropdownOption elements
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
}
```

### DropdownOption

```ts
interface DropdownOptionProps {
  type?: "basic" | "country" | "avatar" | "provider" | "brand" | "company";  // default: "basic"
  size?: "small" | "large";       // default: "small"

  label?: string;                 // default: "Label"
  sublabel?: string;
  description?: string;           // Large only

  showLeftIcon?: boolean;         // default: true
  leftIcon?: ReactNode;           // icon / flag / avatar / logo

  showRightIcon?: boolean;        // default: true
  rightIcon?: ReactNode;          // default: <ChevronRightSmall>

  showCheckbox?: boolean;         // default: false
  checked?: boolean;
  showToggle?: boolean;           // default: true
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  showBadge?: boolean;            // default: false
  badgeLabel?: string;
  showButton?: boolean;           // default: false
  buttonLabel?: string;
  onButtonClick?: () => void;

  selected?: boolean;
  disabled?: boolean;

  onClick?: () => void;
  id?: string;
  className?: string;
}
```

---

## 11. Accessibility

| Rule | Implementation |
|---|---|
| Panel container | `role="listbox"` — on `.dropdown-list` |
| Option row | `role="option"` — on `.dropdown-option` |
| Selected state | `aria-selected={selected}` — toggled by consumer |
| Disabled state | `aria-disabled="true"` — row stays in DOM, `pointer-events: none` |
| Keyboard — row | `tabIndex={0}` (focusable); Enter/Space triggers `onClick` |
| Keyboard — toggle | Separately focusable, `role="switch"`, `aria-checked` |
| Keyboard — checkbox | Separately focusable, `aria-label="Select {label}"` |
| Focus ring | `outline: 2px solid var(--color-brand-primary-base)` on `:focus-visible` |
| Chevron | `aria-hidden="true"` on right icon span |
| Left slot | `aria-hidden="true"` on icon/logo spans |

---

## 12. Left Slot — Type-to-Asset Mapping

| Type | Left slot asset | Engineering source |
|---|---|---|
| `basic` | System icon — Globe | `src/icons/Globe.jsx` — extracted Phase 2 (2026-08-06) from Icon System V.2.0.0, node 9:31986. Default `leftIcon` when none provided. |
| `country` | Country flag | `src/assets/flags/Singapore.jsx` — ✅ extracted Phase 2D (2026-08-05) — DS preferred: Singapore (node 2:3050) |
| `avatar` | Avatar | `<Avatar>` component |
| `provider` | Provider card logo | `src/assets/logos/Synergy.jsx` — ✅ extracted Phase 2D (2026-08-05) — DS preferred: Synergy Original (node 19:3225) |
| `brand` | Exchange brand logo | `src/assets/logos/Shazam.jsx` — ✅ confirmed in repo |
| `company` | Company/coin logo | `src/assets/logos/TripAdvisor.jsx` — ✅ confirmed in repo |
| Right slot | Chevron | `<ChevronRightSmall>` |

Assets (flags, logos) are NOT system icons. Do not put them in `src/icons/`.

---

## 13. Left Slot — Frame vs Bare by Size and Type

| Size | Type | Left slot structure | Icon border |
|---|---|---|---|
| Small | all types | bare INSTANCE, no frame | none |
| Large | basic | bare INSTANCE, no frame | none (DS gap G5) |
| Large | avatar | bare INSTANCE, no frame | none (by DS design) |
| Large | country | FRAME (`Country`) + INSTANCE | `icon-border/default` stroke |
| Large | provider | FRAME (`Provider`) + INSTANCE | `icon-border/default` stroke |
| Large | brand | FRAME (`Brand`) + INSTANCE | `icon-border/default` stroke |
| Large | company | FRAME (`Company`) + INSTANCE | `icon-border/default` stroke |

---

## 14. DS Gaps and Issues

| # | Severity | Issue | DT action |
|---|---|---|---|
| G1 | Medium | Row corner radius (8px) unbound in Figma | Use `--radius-8` value until DS binds |
| G2 | Medium | Panel corner radius (16px) unbound in Figma | Use `--radius-16` value until DS binds |
| G3 | Medium | `chevron-right-small` stroke does not change in Disabled state | No override — DS gap; report to DS |
| G4 | Low | `dropdown-items/descriptions/default` aliases `icon/sub` (icon token, not text token) | Uses `--color-icon-sub`; flag to DS for review |
| G5 | Low | Large Basic has a 40×40 Icon FRAME in Figma but no icon-border stroke (unlike other Large types) | Code renders bare left-slot at 40×40 — no frame wrapper div needed. CSS `.dropdown-option--large .dropdown-option__left-slot` set to 40×40 |
| G6 | Info | `dropdown-items/bg/hover` and `dropdown-items/bg/selected` alias same L2 token | Both use `surface/neutral/soft` — confirmed design intent |
| G7 | Info | `text/neutral/subtle` has no `--color-text-neutral-subtle` alias in tokens.css | Using `--color-text-subtle` (semantic.color.text.subtle) — functionally correct |
| G8 | Info | `border/neutral/soft` has no dedicated alias in tokens.css | Using `--color-border-neutral-default` as closest emitted equivalent |
| G9 | ✅ Resolved | Basic type icon `"globus, map, earth, globe"` — extracted from Icon System V.2.0.0, node 9:31986 | `Globe.jsx` created in `src/icons/`. Applied as default `leftIcon` for Basic type in DropdownOption (Phase 2) |

---

## 15. Open Questions

| # | Question | Blocking? |
|---|---|---|
| OQ1 | Panel shadow: should `dropdown-list` have a shadow/elevation token? | ✅ Resolved — Figma confirms `regular-shadow/medium`; `--dropdown-list-shadow-default` applied |
| OQ2 | Panel width: fixed 340px or match-trigger width? | No — confirm with designer |
| OQ3 | Panel height variants: overflow scroll or truncate? | Implemented as scroll — confirm with DS |
| OQ4 | Toggle inside row: is `onToggle` intentionally separate from `onClick`? | Yes — implemented as separate handlers |
| OQ5 | `type=avatar`: confirm size (32px Large / 24px Small) | ✅ Resolved — Large 40px, Small 20px. Confirmed Phase 1B Figma inspection. |
| OQ6 | `type=brand`: are both 24px and 32px logo sizes shown simultaneously? | DT to inspect in Figma |
| OQ7 | Token approval: when will dropdown-items/* and dropdown-list/* tokens be added to tokens.css? | ✅ Resolved — 21 L3 tokens emitted in tokens.css |
| OQ8 | When will Checkbox and Toggle components be implemented in code? | Blocks removing placeholder slots |
| OQ9 | Do asset directories (flags, logos/exchanges, logos/providers, logos/coins) exist in `src/assets/`? | ✅ Resolved — `src/assets/logos/` confirmed. `src/assets/flags/` created Phase 2D. No dedicated exchange/provider/coin subdirectories — all logos flat in `src/assets/logos/` |

---

## 16. Implementation Checklist

### DropdownList

- [x] Component file: `src/components/dropdown/DropdownList.jsx`
- [x] CSS file: `src/components/dropdown/DropdownList.css`
- [x] `role="listbox"` on container
- [x] `aria-label` / `aria-labelledby` props
- [x] `--dropdown-list-bg-default` applied to background
- [x] `--dropdown-list-border-default` applied to border
- [x] `--radius-16` applied to corner radius
- [x] Two height variants: `fixed` (252px) / `huge` (104px)
- [x] Flex column layout with 8px padding (Phase 2)
- [x] Fixed variant: SearchInput (size=xs) + options wrapper (flex col, gap 8, overflow scroll) (Phase 2)
- [x] Huge variant: no Search, overflow-y auto
- [x] `--dropdown-list-shadow-default` applied via `box-shadow` (Figma: `regular-shadow/medium`)
- [x] L3 tokens emitted in `tokens.css` (`--dropdown-list-*`)
- [x] Storybook story (`Dropdown.stories.jsx` — stories: Playground, Overview, Dropdown Items, Dropdown Item Types, Dropdown Item States, Dropdown Item Nested Components, Dropdown List, Dropdown List Heights, Disabled / Dark Mode QA)

### DropdownOption

- [x] Component file: `src/components/dropdown/DropdownOption.jsx`
- [x] CSS file: `src/components/dropdown/DropdownOption.css`
- [x] L3 tokens emitted in `tokens.css` (`--dropdown-items-*`)
- [x] 6 type variants: basic / country / avatar / provider / brand / company
- [x] 5 states via CSS selectors + `selected` / `disabled` props
- [x] 2 sizes: small (40px) / large (56px) (Phase 2 fix — small was 36px)
- [x] Large: Descriptions rendered when `description` prop provided
- [x] Large non-Basic: `.dropdown-option__left-frame` with `icon-border/default`
- [x] Avatar: bare left slot, no frame, no border
- [x] Checkbox: `<Checkbox size="small">` — hidden by default
- [x] Switch (↳switch): `<Switch>` (32×20px) — visible by default. DS renamed from ↳toggle in v2.1.0 (2026-08-03)
- [x] Badge: `<Badge>` — hidden by default
- [x] ButtonLink: `<ButtonLink size="small" style="neutral">` — hidden by default. Known gap: Large Figma slot uses ↳buttons-small (filled); ButtonLink used for both sizes
- [x] Left icon: shown by default, hidden via `showLeftIcon=false`
- [x] Right chevron: shown by default via `<ChevronRightSmall>`
- [x] Row corner radius: `--radius-8` (8px — unbound in Figma, G1)
- [x] `role="option"` + `aria-selected` on each row
- [x] `aria-disabled="true"` on disabled rows — kept in DOM
- [x] Keyboard: Enter/Space triggers row click
- [x] Switch: `stopPropagation` on wrapper prevents toggle from selecting/closing the row
- [x] Checkbox: separately focusable, `aria-label` delegated to Checkbox component
- [x] Replace checkbox placeholder with `<Checkbox>` — completed Phase 2B (2026-08-05)
- [x] Replace toggle placeholder with `<Switch>` (↳switch) — completed Phase 2B (2026-08-05)
- [x] Replace link button placeholder with `<ButtonLink>` — completed Phase 2B (2026-08-05)
- [x] L3 tokens emitted in `tokens.css` (`--dropdown-items-*`)
- [x] Country flag: `<SingaporeFlag>` — extracted Phase 2D (2026-08-05) from Assets V.2.0.0 → Country Flags → Singapore (node 2:3050). File: `src/assets/flags/Singapore.jsx`
- [x] Provider logo: `<SynergyLogo>` — extracted Phase 2D (2026-08-05) from Assets V.2.0.0 → Placeholder Logo → Synergy Original (node 19:3225). File: `src/assets/logos/Synergy.jsx`
- [x] Storybook story (see `Dropdown.stories.jsx`)

---

## 17. File Structure

```
src/components/dropdown/
  ├── DropdownList.jsx          Panel container
  ├── DropdownList.css          Panel styles (L3 tokens in tokens.css)
  ├── DropdownOption.jsx        Option row
  ├── DropdownOption.css        Row styles (L3 tokens in tokens.css)
  ├── Dropdown.stories.jsx      Storybook — 9 stories (Playground · BasicList · AllTypesSmall ·
  │                             AllTypesLarge · AllStates · WithControls · ScrollFixed ·
  │                             ScrollHuge · DarkMode)
  └── dropdown-spec.md          This file
```
