# Typography / Text Style Foundation Audit

**Status:** COMPLETE — Figma data fully retrieved via Desktop Bridge  
**Date:** 2026-07-27  
**Source:** Figma Design System Scalable — All Platform V.2.1.0  
**Method:** `figma.getLocalTextStylesAsync()` via Desktop Bridge plugin (live, authoritative)

---

## Part A — Figma Text Styles (Source of Truth)

43 TEXT styles confirmed. Raw Figma API values rounded for readability (e.g. 115.999…% → 116%).

> **Letter-spacing unit note:** Figma returns PERCENT values. CSS conversion: N% → N/100 em  
> (e.g. 0.2% → `0.002em`, -1% → `-0.01em`, 0.5% → `0.005em`)

### A1. Display — Sofia Pro

| Figma Style | Font Family | Figma Style Name | CSS Weight | Font Size (desktop) | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| `Display1/extraBold` | Sofia Pro | Black | 900 | 48px | 116% | -1% → `-0.01em` |
| `Display1/medium` | Sofia Pro | Medium | 500 | 48px | 116% | -1% → `-0.01em` |
| `Display1/regular` | Sofia Pro | Regular | 400 | 48px | 116% | -1% → `-0.01em` |
| `Display2/extraBold` | Sofia Pro | Black | 900 | 40px | 120% | -0.5% → `-0.005em` |
| `Display2/medium` | Sofia Pro | Medium | 500 | 40px | 120% | -0.5% → `-0.005em` |
| `Display2/regular` | Sofia Pro | Regular | 400 | 40px | 120% | -0.5% → `-0.005em` |

> Sofia Pro has a native Medium (500) weight. `extraBold` maps to Black (900), not ExtraBold (800).

### A2. Headings h1–h2 — Sofia Pro

| Figma Style | Font Family | Figma Style Name | CSS Weight | Font Size (desktop) | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| `h1/extraBold` | Sofia Pro | Black | 900 | 32px | 125% | 0 |
| `h1/medium` | Sofia Pro | Medium | 500 | 32px | 125% | 0 |
| `h1/regular` | Sofia Pro | Regular | 400 | 32px | 125% | 0 |
| `h2/extraBold` | Sofia Pro | Black | 900 | 24px | 133% | 0 |
| `h2/medium` | Sofia Pro | Medium | 500 | 24px | 133% | 0 |
| `h2/regular` | Sofia Pro | Regular | 400 | 24px | 133% | 0 |

### A3. Heading h3 — Open Sans

| Figma Style | Font Family | Figma Style Name | CSS Weight | Font Size (desktop) | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| `h3/bold` | Open Sans | Bold | 700 | 20px | 140% | 0 |
| `h3/medium` | Open Sans | Regular† | 400† | 20px | 140% | 0 |
| `h3/regular` | Open Sans | Regular | 400 | 20px | 140% | 0 |

> **†** Open Sans has no native Medium (500) weight. Figma resolves `h3/medium` to Regular (400). `h3/medium` and `h3/regular` render identically.

### A4. Heading h4 — Sofia Pro ⚠️

| Figma Style | Font Family | Figma Style Name | CSS Weight | Font Size (desktop) | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| `h4/bold` | **Sofia Pro** | Bold | 700 | 18px | 145% | 0 |
| `h4/medium` | **Sofia Pro** | Medium | 500 | 18px | 145% | 0 |
| `h4/regular` | **Sofia Pro** | Regular | 400 | 18px | 145% | 0 |

> ⚠️ **h4 uses Sofia Pro, not Open Sans.** tokens.json and README.md both incorrectly document h4 as Open Sans. This is confirmed directly from `fontName.family` in the live Figma file.

### A5. Body — Open Sans

All body styles use Open Sans. Figma's `body/medium/*` maps to SemiBold (Open Sans has no native 500 weight).

| Figma Style | Figma Style Name | CSS Weight | Font Size (desktop) | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `body/bold/xl` | Bold | 700 | 18px | 155% | 0 |
| `body/bold/lg` | Bold | 700 | 16px | 150% | 0 |
| `body/bold/md` | Bold | 700 | 14px | 143% | 0 |
| `body/semiBold/xl` | SemiBold | 600 | 18px | 155% | 0 |
| `body/semiBold/lg` | SemiBold | 600 | 16px | 150% | 0 |
| `body/semiBold/md` | SemiBold | 600 | 14px | 143% | 0 |
| `body/medium/xl` | SemiBold† | 600† | 18px | 155% | 0 |
| `body/medium/lg` | SemiBold† | 600† | 16px | 150% | 0 |
| `body/medium/md` | SemiBold† | 600† | 14px | 143% | 0 |
| `body/regular/xl` | Regular | 400 | 18px | 143% | 0 |
| `body/regular/lg` | Regular | 400 | 16px | 143% | 0 |
| `body/regular/md` | Regular | 400 | 14px | 143% | 0 |
| `body/light/xl` | Light | 300 | 18px | 155% | 0 |
| `body/light/lg` | Light | 300 | 16px | 155% | 0 |
| `body/light/md` | Light | 300 | 14px | 143% | 0 |

> **†** `body/medium/*` intentionally resolves to SemiBold (600). Open Sans has no native 500 weight. This is documented in the Figma style descriptions.  
> Note: `body/regular` uses 143% line-height across all sizes — differs from `body/bold` and `body/light` at xl/lg (155%).

### A6. Caption — Open Sans, 12px

| Figma Style | Figma Style Name | CSS Weight | Font Size | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `caption/bold` | Bold | 700 | 12px | 133% | 0.2% → `0.002em` |
| `caption/semiBold` | SemiBold | 600 | 12px | 133% | 0.2% → `0.002em` |
| `caption/regular` | Regular | 400 | 12px | 133% | 0.2% → `0.002em` |
| `caption/light` | Light | 300 | 12px | 133% | 0.2% → `0.002em` |

### A7. Label — Open Sans, 10px

| Figma Style | Figma Style Name | CSS Weight | Font Size | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `label/bold` | Bold | 700 | 10px | 140% | 0.2% → `0.002em` |
| `label/semiBold` | SemiBold | 600 | 10px | 140% | 0.2% → `0.002em` |
| `label/regular` | Regular | 400 | 10px | 140% | 0.2% → `0.002em` |
| `label/light` | Light | 300 | 10px | 140% | 0.2% → `0.002em` |

### A8. Micro — Open Sans, 10px (responsive: 8px tablet/mobile)

| Figma Style | Figma Style Name | CSS Weight | Font Size (desktop) | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `micro/medium` | SemiBold† | 600† | 10px | 150% | 0.5% → `0.005em` |
| `micro/regular` | Regular | 400 | 10px | 150% | 0.5% → `0.005em` |

> **†** `micro/medium` resolves to SemiBold (Open Sans has no native 500 weight).

---

## Part B — Responsive Font Sizes (Figma Variables)

Confirmed from `responsive` variable collection. These drive the responsive CSS overrides.

| Variable | Desktop | Tablet | Mobile |
|---|---|---|---|
| `fontSize/display/1` | 48px | 40px | 32px |
| `fontSize/display/2` | 40px | 32px | 32px |
| `fontSize/heading/1` | 32px | 24px | 24px |
| `fontSize/heading/2` | 24px | 20px | 20px |
| `fontSize/heading/3` | 20px | 18px | 16px |
| `fontSize/heading/4` | 18px | 16px | 16px |
| `fontSize/body/xl` | 18px | 16px | 16px |
| `fontSize/body/lg` | 16px | 14px | 14px |
| `fontSize/body/md` | 14px | 14px | 14px |
| `fontSize/body/sm` | 12px | 12px | 12px |
| `fontSize/label` | 10px | 10px | 10px |
| `fontSize/micro` | 10px | 8px | 8px |

> `fontSize/body/sm` (12px) = caption scale. There is no `body/sm` text style in Figma — caption uses this size.  
> `fontSize/label` (10px) and `fontSize/micro` (10px desktop, 8px tablet/mobile) share desktop size but diverge at smaller breakpoints.

---

## Part C — Comparison: tokens.json

File: `src/design-tokens/tokens.json` → `primitive.typography.textStyles`

### C1. Matches ✓

| Section | Status |
|---|---|
| display1 (extraBold / medium / regular) | ✓ font, weight, lineHeight, letterSpacing all match |
| display2 (extraBold / medium / regular) | ✓ all match |
| h1 (extraBold / medium / regular) | ✓ all match |
| h2 (extraBold / medium / regular) | ✓ all match |
| h3/bold, h3/regular | ✓ match (Open Sans, correct weights, 20px, 140%) |
| body/bold (xl/lg/md) | ✓ values match |
| body/semiBold (xl/lg/md) | ✓ values match |
| body/regular (xl/lg/md) | ✓ values match |
| body/light (xl/lg/md) | ✓ values match |
| caption (bold/semiBold/regular/light) | ✓ all match |
| label (bold/semiBold/regular) | ✓ match |
| micro (medium/regular) | ✓ match |
| fontSize scale (all 12 sizes, responsive) | ✓ all match |
| fontWeight scale (light/regular/medium/semibold/bold/black) | ✓ values match |
| fontFamily.display = "Sofia Pro" | ✓ |
| fontFamily.body = "Open Sans" | ✓ |

### C2. Mismatches and Gaps ❌

#### Gap 1 — h4 font family is WRONG
```
tokens.json says:  font: "Open Sans"   ← INCORRECT
Figma live data:   font: "Sofia Pro"   ← CORRECT
```
Both `h4.bold` and `h4.regular` in tokens.json reference Open Sans. Figma confirms all h4 variants (bold, medium, regular) use Sofia Pro.

**Also incorrect in README.md:** "Sofia Pro for display/h1–h2, Open Sans for h3/h4" — the h4 portion is wrong.

#### Gap 2 — h3/medium missing from tokens.json
Figma has `h3/medium` (Open Sans, Regular/400, 20px, 140%, 0%). tokens.json has `h3.bold` and `h3.regular` only.

Note: Since Open Sans has no native 500 weight, h3/medium renders identically to h3/regular in-browser. However, the style exists in Figma and should be documented.

#### Gap 3 — h4/medium missing from tokens.json
Figma has `h4/medium` (Sofia Pro, Medium/500, 18px, 145%, 0%). tokens.json has `h4.bold` and `h4.regular` only.

#### Gap 4 — body/medium group entirely missing from tokens.json
Figma has 3 body/medium styles:
- `body/medium/xl` → Open Sans SemiBold, 18px, 155%
- `body/medium/lg` → Open Sans SemiBold, 16px, 150%
- `body/medium/md` → Open Sans SemiBold, 14px, 143%

None appear in tokens.json. Note: their rendered values are identical to body/semiBold equivalents (same font style, same metrics), so these are semantic aliases rather than distinct rendered styles.

#### Gap 5 — label/light missing from tokens.json
Figma has `label/light` (Open Sans, Light/300, 10px, 140%, 0.2%). tokens.json has `label.bold`, `label.semiBold`, and `label.regular` — Light variant is absent.

#### Gap 6 — body textStyle schema is inconsistent
Display/heading styles use separate fields:
```json
{ "font": "Sofia Pro", "weight": "black", "size": "fontSize.display1", "lineHeight": "116%", "letterSpacing": "-1%" }
```
Body styles embed size and lineHeight as a single string:
```json
{ "font": "Open Sans", "weight": "bold", "xl": "18px/155%", "lg": "16px/150%", "md": "14px/143%", "letterSpacing": "0%" }
```
This inconsistency makes body styles harder to parse programmatically. The body format also hard-codes absolute px values instead of referencing the responsive `fontSize.*` variables.

---

## Part D — Comparison: tokens.css

File: `src/design-tokens/tokens.css`

### D1. Present ✓

| CSS Custom Property Group | Status |
|---|---|
| `--font-family-display`, `--font-family-body` | ✓ present and correct |
| `--font-weight-light/regular/medium/semibold/bold/black` | ✓ present and correct |
| `--font-size-display-1` through `--font-size-micro` (12 vars) | ✓ present and correct |
| Responsive overrides `@media (max-width: 768px)` and `@media (max-width: 412px)` | ✓ correct breakpoints and values |

### D2. Missing ❌

| Missing CSS Custom Property Group | Notes |
|---|---|
| `--line-height-*` | No line-height variables exist. Line-height must be hard-coded per component. |
| `--letter-spacing-*` | No letter-spacing variables exist. `0.002em` (caption/label) and `0.005em` (micro) must be hard-coded per component. |
| `--text-style-*` composite shorthand | No composite text-style properties. Engineers must assemble all 5 type properties manually per component. |

### D3. Responsive Font Size Coverage

The tablet override covers: display-1, display-2, heading-1 through heading-4, body-xl, body-lg, micro. It correctly omits body-md (14px at all breakpoints), body-sm/caption (12px at all breakpoints), and label (10px at all breakpoints), since those don't change. ✓

---

## Part E — Font Loading Check

| Item | Status |
|---|---|
| `@font-face` declarations in any project CSS | **Not found** |
| Google Fonts CDN link (`fonts.googleapis.com`) | **Not found** |
| Adobe Fonts / Typekit CDN link | **Not found** |
| Fontsource npm package | **Not confirmed** |
| `--font-family-display: "Sofia Pro", system-ui, sans-serif` defined in tokens.css | ✓ |
| `--font-family-body: "Open Sans", system-ui, sans-serif` defined in tokens.css | ✓ |

**Sofia Pro** is a commercial font (Morisawa/MyFonts). It is NOT available via Google Fonts or any free CDN. It must be licensed and self-hosted (WOFF2) or served via Adobe Fonts (Typekit). Without a load mechanism, all display/h1–h4 text falls back to `system-ui`.

**Open Sans** is available via Google Fonts, Fontsource (`@fontsource/open-sans`), or self-hosting. Without a confirmed load mechanism, body/caption/label/micro text falls back to `system-ui`.

**Action required:** Confirm how both fonts are loaded in the host application before this token system is declared production-ready.

---

## Part F — Summary of Findings

### Critical (blocks accurate implementation)

| # | Finding | File | Scope |
|---|---|---|---|
| F1 | `h4` font family documented as "Open Sans" — Figma confirms "Sofia Pro" | tokens.json, README.md | h4/bold, h4/regular (and missing h4/medium) |
| F2 | Font loading mechanism not found for either Sofia Pro or Open Sans | Project-wide | All text |

### High (missing tokens present in Figma)

| # | Finding | Impact |
|---|---|---|
| F3 | `h4/medium` missing from tokens.json | No token reference for Sofia Pro Medium at h4 scale |
| F4 | `body/medium/*` group (3 styles) missing from tokens.json | No semantic layer for medium-emphasis body text |
| F5 | `label/light` missing from tokens.json | Missing weight variant for label scale |
| F6 | `h3/medium` missing from tokens.json | Renders same as h3/regular, but style exists in Figma |

### Medium (schema and CSS gaps)

| # | Finding | Impact |
|---|---|---|
| F7 | No `--line-height-*` CSS variables | All line-heights hard-coded per component |
| F8 | No `--letter-spacing-*` CSS variables | Letter-spacing for caption/label/micro hard-coded per component |
| F9 | No `--text-style-*` composite CSS variables | No single-var shorthand for component consumption |
| F10 | Body textStyles use inconsistent schema in tokens.json | Inconsistent with display/heading schema; not parseable the same way |

### Low (informational / by design)

| # | Finding | Notes |
|---|---|---|
| F11 | `h3/medium` and `h3/regular` render identically | By design — Open Sans has no native 500 weight |
| F12 | `body/medium/*` and `body/semiBold/*` render identically | By design — Figma style descriptions document this |
| F13 | `micro/medium` resolves to SemiBold (600) | By design — same Open Sans weight limitation |
| F14 | `fontSize/body/sm` (12px) = caption scale; no `body/sm` text style in Figma | Naming could clarify this is the caption size variable |

---

## Part G — No-Implement Notice

This audit is **documentation only**. No changes have been made to any token file, component CSS, or Figma file.  
All findings require explicit approval before implementation begins.

---

*Audit conducted: 2026-07-27. Figma data source: `figma.getLocalTextStylesAsync()` via Desktop Bridge plugin. All 43 text styles confirmed live.*
