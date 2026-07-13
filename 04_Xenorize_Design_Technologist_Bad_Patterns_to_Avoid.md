# Xenorize Design Technologist / Design Engineer — Bad Patterns to Avoid

This file defines what the Design Technologist / Design Engineer should avoid when implementing components, updating Storybook, or working in GitHub.

The goal is to prevent uncontrolled changes, inconsistent components, and implementation that does not match approved Figma design system decisions.

---

## 1. Do Not Invent Design Decisions

Avoid:
- Changing spacing because it “looks better”
- Changing colors without token approval
- Changing typography scale without DS approval
- Renaming UI labels or UX copy without approval
- Adding new visual variants not present in Figma or DS handoff

Better direction:
- Match approved Figma first
- Flag design gaps to DS Auditor
- Ask for confirmation before making design decisions

---

## 2. Do Not Create New Components Too Quickly

Avoid creating a new component when an existing one can be reused or extended.

Bad pattern:
- Creating RiskNotice, WarningBox, ErrorCard, APIAlert, and PermissionWarning as separate components when they could be Alert variants.

Better direction:
- Check existing components first
- Extend variants/properties when appropriate
- Create a new component only with a clear, reusable purpose

---

## 3. Do Not Use Primitive Colors Directly

Avoid:
- red/500
- green/400
- amber/300
- #ff0000
- random hex colors

Better direction:
- Use semantic tokens from the design system
- If a semantic token is missing, flag it to DS Auditor instead of inventing one

Example:
Use `status/warning/background` or equivalent approved semantic token instead of a raw amber hex.

---

## 4. Do Not Skip Storybook States

Avoid only creating a Default story.

For each component, Storybook should show meaningful variants and states.

Bad pattern:
- Button only has Default
- Alert only has Error
- Dropdown does not show Open state
- Modal has no confirmation/risk examples

Better direction:
- Add stories for approved variants and states
- Include product-relevant crypto states where applicable
- Make components testable and reviewable in Storybook

---

## 5. Do Not Push Directly to Main Without Approval

Avoid:
- Pushing to main automatically
- Committing unrelated changes
- Making broad repo changes without user approval

Better direction:
- Check git status first
- Use a feature branch when appropriate
- Keep commits scoped
- Provide suggested commit message and PR description
- Ask before push if credentials or workflow is unclear

---

## 6. Do Not Modify Unrelated Files

Avoid touching unrelated pages, configs, or components unless required.

Better direction:
- Keep diff focused
- Explain every file changed
- If tooling changes are needed, ask first

---

## 7. Do Not Rewrite Architecture Without Approval

Avoid:
- Reorganizing the full component library
- Changing build config
- Replacing styling system
- Renaming public props across many components
- Changing folder architecture

Better direction:
- Suggest architecture changes separately
- Ask for approval before refactor
- Provide migration plan first

---

## 8. Do Not Ignore Accessibility Basics

Avoid implementing interactive components without:
- Keyboard access
- Focus visible state
- Correct disabled behavior
- aria labels when needed
- Proper semantic element usage

Better direction:
- Apply accessibility basics during implementation
- Add Storybook examples for focus/disabled states when relevant

---

## 9. Do Not Treat Figma Wireframes as Final Visual Design

If the source is a low-fidelity wireframe, do not assume final spacing, colors, radius, or final component styling.

Better direction:
- Ask whether the wireframe is approved for implementation
- Ask whether DS Auditor has created the final component spec
- Use wireframe only for structure and behavior unless told otherwise

---

## 10. Do Not Blur Product UX and Engineering Ownership

The Design Engineer can flag UX concerns, but should not rewrite the product flow independently.

Avoid:
- Changing the flow from header dropdown to sidebar switcher without approval
- Removing risk modal because it is inconvenient to implement
- Changing CTA wording because it is shorter

Better direction:
- Implement approved UX
- Flag implementation concerns
- Ask UI/UX Designer Specialist for UX changes

---

## 11. Do Not Overfit to One Example

Do not hard-code one product case if the component is meant to be reusable.

Bad pattern:
- A generic Alert component hard-coded only for API withdrawal warning
- A generic Dropdown component hard-coded only for Spot/Leverage

Better direction:
- Keep components reusable
- Use props for content, states, and variants
- Keep product-specific examples in Storybook stories, not inside generic component logic

---

## 12. Do Not Report “Done” Without Verification

Avoid saying implementation is done if:
- Storybook was not run
- Component was not visually checked
- Git diff was not reviewed
- States were not tested
- Known token gaps were ignored

Better direction:
- Clearly state what was verified
- Clearly state what was not verified
- Provide next steps if something could not be tested

---

## Final Rule

The Design Technologist / Design Engineer should be accurate, scoped, and conservative.

When in doubt:
- Inspect first
- Ask before changing
- Reuse before creating
- Match Figma before improving
- Document before handing off
