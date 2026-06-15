# Button — Large — Design QA

Comparing `Button.jsx` / `Button.css` against the Figma "↳buttons-large" frame (node `1897:1592`).

## Method

- Full-frame screenshot of `1897:1592` (Primary / Neutral / Error rows × Filled / Stroke / Lighter / Ghost columns × Default / Hover / Focus / Disabled states, text + icon-only).
- Cross-checked against the per-variant `get_design_context` pulls done while writing the spec (8 nodes covering every Type/Style combination).
- A static preview harness, `qa-preview.html`, was built reproducing every cell of the matrix using the real `Button.css` classes — open it in a browser for a final side-by-side visual check (an automated screenshot couldn't be taken this session: Claude in Chrome wasn't connected, and the sandbox can't install headless-browser system libs without network access).

## Structure / layout — ✅ pass

- Container padding 10px, gap 4px, radius 8px — matches `--spacing-10` / `--spacing-4` / `--radius-8`.
- Text buttons have the documented min-width of 80px; icon-only buttons render as 40×40px squares with a centered 20×20px icon — matches the icon variants in every column of the Figma frame.
- Badge slot not present in the sampled frame (Figma's reference only shows the plain + icon-only pairs), so badge styling is carried over unchanged from the spec (`--color-surface-neutral-soft` / `--color-text-neutral-strong` / `--radius-full`) — flagged as untested visually, no contradicting evidence found.

## Color / state — ✅ pass

All values below were already confirmed token-for-token via `get_design_context` against `tokens.css`; the screenshot is consistent with each:

| Type | Style | Default | Hover | Focus | Disabled |
|---|---|---|---|---|---|
| Primary | Filled | `#302571` bg / white text ✅ | `#403297` bg ✅ | border + ring `#7963ba3d` ✅ | `#f5f5f5` bg / `#7b7b7b` text ✅ |
| Primary | Stroke | `#7263cc` border / `#302571` text ✅ | `#eceaf8` bg / `#302571` border ✅ | ring visible ✅ | uniform disabled ✅ |
| Primary | Lighter | `#eceaf8` bg / `#302571` text ✅ | `#dad6f2` bg ✅ | ring visible ✅ | uniform disabled ✅ |
| Primary | Ghost | transparent / `#302571` text ✅ | `#eceaf8` bg on hover ✅ | ring visible ✅ | uniform disabled ✅ |
| Neutral | Filled | `#262626` bg / white text ✅ | `#1c1c1c` bg ✅ | ring `#82879c3d` ✅ | uniform disabled ✅ |
| Neutral | Stroke | `#eaeaea` border / `#333` text ✅ | `#f4f4f6` bg / `#262626` border ✅ | ring visible ✅ | uniform disabled ✅ |
| Neutral | Lighter | `#f4f4f6` bg / `#333` text ✅ | `#ebecef` bg ✅ | ring visible ✅ | uniform disabled ✅ |
| Neutral | Ghost | transparent / `#333` text ✅ | `#f4f4f6` bg ✅ | ring visible ✅ | uniform disabled ✅ |
| Error | Filled | `#cb1515` bg / white text ✅ | `#b91313` bg ✅ | ring `#ea34343d` ✅ | uniform disabled ✅ |
| Error | Stroke | `#cb1515` border/text ✅ | `#fcdfdf` bg / `#b91313` border ✅ | ring visible ✅ | uniform disabled ✅ |
| Error | Lighter | `#fcdfdf` bg / `#941010` text ✅ | `#fcdfdf` bg (no change) ✅ | ring visible ✅ | uniform disabled ✅ |
| Error | Ghost | transparent / `#cb1515` text ✅ | `#fcdfdf` bg ✅ | ring visible ✅ | uniform disabled ✅ |

Note: Lighter/Error hover bg in Figma and in `tokens.css` are identical (`#fcdfdf` → `#fcdfdf`) — i.e. no visible hover change for that one cell. This matches both the token data and the screenshot, so it's intentional, not a bug.

## Accessibility — ✅ pass

- Renders a native `<button type="button">`.
- `disabled` prop maps to the native `disabled` attribute (not just a CSS class), so disabled buttons are removed from the tab order and announce correctly.
- Dev-time console warning fires if `onlyIcon` is used without `aria-label`/children.
- Focus styling uses `:focus-visible`, so mouse clicks won't show the ring but keyboard nav will — matches the "Focus" column being a distinct state from "Default" in Figma.

## Open items

- **Visual pixel-diff not run.** `qa-preview.html` (in this folder) reproduces the full matrix with the real CSS — recommend opening it in a browser next to the Figma frame for a final eyeball pass, since this session couldn't reach Chrome or install a headless browser in the sandbox.
- **Badge** styling is per-spec but has no matching reference cell in the sampled Figma frame to confirm against.
- Carries forward from the token audit: Date Picker `Paragraph/Small` → "Plus Jakarta Sans" leftover (unrelated to Button, tracked in `design-review-flags.md`).

## Verdict

Button (Large) implementation matches the Figma design system on all structural, color, state, and accessibility criteria that could be verified. Ready to use as the proof-of-concept pattern for the next component (Text Input).
