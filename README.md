# Design System

React component library generated from the Figma design system, with design tokens and Storybook documentation.

## Structure

- `src/design-tokens/` — `tokens.css` (CSS custom properties) and `tokens.json` (master token source), generated from Figma.
- `src/components/` — React components. Each component folder contains the `.jsx`, `.css`, an implementation spec (`*-spec.md`), a design QA report (`*-qa.md`), and a Storybook story (`*.stories.jsx`).
- `.storybook/` — Storybook configuration. `preview.js` loads `tokens.css` globally so every story has access to the design tokens.

## Running it locally

You'll need [Node.js](https://nodejs.org/) (v20 or later recommended) installed.

1. Open a terminal in this folder (`Design Engineer`).
2. Install dependencies (first time only):

   ```
   npm install
   ```

3. Start Storybook:

   ```
   npm run storybook
   ```

4. Storybook opens automatically at **http://localhost:6006**. The `Button` component is under **Components → Button** — use the "Playground" story and the Controls panel to try every `type` / `variant` / `size` combination, or open "AllVariants" to see the full matrix at once.

### Other commands

- `npm run dev` — run the plain Vite app (`src/App.jsx`) at http://localhost:5173, useful for testing components outside Storybook.
- `npm run build-storybook` — build a static Storybook site into `storybook-static/`, which you can deploy/share (e.g. drag the folder onto Netlify, or host on any static server) so others can view it without running anything locally.

## Adding a new component

1. Write the implementation spec (`src/components/<name>/<name>-spec.md`) referencing tokens in `tokens.css`.
2. Build `<Name>.jsx` + `<Name>.css` using only CSS custom properties from `tokens.css` — no hardcoded colors/spacing.
3. Add `<Name>.stories.jsx` covering each variant/state.
4. Run `npm run storybook` to preview, and write up a `*-qa.md` comparing against the Figma reference.
