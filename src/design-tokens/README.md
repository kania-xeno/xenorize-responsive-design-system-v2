# Design Tokens — Step 1 Output

Extracted from the Figma design system file on 2026-06-15, refreshed same day after new variables were added to the **Key Component** (label/hint/password, phone number input) and **Avatar/status palette** sections, then re-verified same day after the design team's alignment pass on the flagged components below. This is the foundation layer for the design-to-React workflow — every component spec and React component going forward should reference these tokens instead of hardcoded values.

## Files

- **tokens.json** — master token source, organized by category (spacing, radius, breakpoint, typography, shadow, color, components). Use this if you want to run it through Style Dictionary or generate a Tailwind theme later.
- **tokens.css** — CSS custom properties, ready to import into a React app (`import './design-tokens/tokens.css'` once at the root). Includes responsive typography overrides via media queries matching the Figma breakpoints (1440 / 760 / 412px).

## Structure

- **spacing** — full scale, 0–80px, identical across breakpoints
- **radius** — full scale, 0–52px + `full` (999px, pill shape)
- **breakpoint** — desktop (1440px) / tablet (760px) / mobile (412px) container widths, plus modal sizing per breakpoint
- **typography** — font families (Sofia Pro for display/h1–h2, Open Sans for h3/h4/body/caption/label/micro), weight scale, responsive font-size scale, and all 44 documented type styles
- **shadow** — below/upper elevation shadows, regular shadows, button glows, focus/hover rings
- **color** — semantic primitives (text, background, surface, border, status, brand, alpha), now including an extended status palette (lighter/base/dark for danger, warning, success, info, sky, feature)
- **components** — alias tokens scoped to specific components (button, table, modal, date picker, select fields, tab menu, drawer, key component label/hint/password fields, key-icon status icons, phone number input, etc.), extracted from the variables actually bound to each component in Figma

## Audit notes — flag for design system review

A few inconsistencies surfaced while extracting these tokens. Status after the design team's alignment pass (2026-06-15):

1. **Font family drift in form components — mostly resolved.** The Typography reference page documents two families — Sofia Pro (display/headings) and Open Sans (body/caption/label).
   - ✅ **Select Field** (basic/country/coin/exchange + compact select) now uses **Open Sans** throughout (`body/regular/md`, `caption/regular`) — the "Inter" usage is gone.
   - ✅ **Key Component** (label/hint/password fields, phone number input) now uses **Open Sans** throughout — the "Inter" usage is gone.
   - ⚠️ **Date Picker** is mostly fixed (`Label/Small` now resolves to Open Sans via `body/medium/md`), but one style — **`Paragraph/Small`** — still resolves to **"Plus Jakarta Sans"**. Worth a follow-up check to confirm whether this style is still applied to a visible layer or just a leftover/unused style definition.

2. **Near-duplicate "soft" surface/border colors — resolved.** Border colors across Date Picker, Select Field (all variants), Modal, Drawer, Button, and Checkbox now consistently resolve to `border/neutral/subtle` = `#eaeaea`. The separate `surface/neutral/soft-alt` = `#ebecef` token remains, but it's used consistently (Modal + Drawer soft backgrounds) as a distinct semantic token rather than a stray duplicate — no longer flagged.

3. **Status color naming — resolved.** Avatar, Modal, Drawer, and Key Icon variables now consistently use the nested `status/{category}/{lighter|base|dark}` naming (e.g. `status/danger/lighter`), matching the `palette` structure already in `tokens.json`. No more flat `status/x-surface` vs nested naming collisions found.

4. **Breakpoint variables aren't bound to components.** The Breakpoint page documents container/modal sizing values clearly, but no component in the sampled set has these bound as live variables — they appear to be reference-only. Confirm with the team whether breakpoint values should be wired into modal/drawer components as variables, or whether they're meant purely as a CSS media-query reference (which is how they're treated in `tokens.css`).

## Next step

With tokens in place, the next step in the plan is picking 1–2 components (recommend **Button** and **Text Input** — both foundational and used everywhere) to take through: component spec → React build → design QA, establishing the pattern before scaling to the rest of the ~25 components.
