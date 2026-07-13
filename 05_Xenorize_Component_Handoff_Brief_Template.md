# Xenorize Component Handoff Brief Template

This file defines the fixed component-level handoff format for Xenorize Design System work.

Use this format when handing off a component from the Design System Auditor & Component Specialist to the Design Technologist / Design Engineer.

This template is for component-level handoff only, not full screen or feature handoff.

---

## When to Use This Template

Use this template for:
- New component creation
- Existing component update
- Variant addition
- Component cleanup
- Component refactor
- State definition
- Token usage clarification
- Storybook implementation preparation
- Figma-to-code component handoff

Examples:
- Button Large missing variants
- Input field states
- Dropdown menu component
- Alert warning variant
- Badge status component
- Modal component
- Table component
- Navigation item component

Do not use this template for:
- Full product screen handoff
- Full user flow review
- Marketing visual design
- UX strategy document
- Backend/API technical specification

---

# Component Handoff Brief

## 1. Component Name

[Component name]

Example:
Button

---

## 2. Component Status

Status:
- New component / Existing component update / Variant addition / Cleanup / Fix

Current Figma status:
- Approved / Needs audit / In progress / Needs clarification

Current Code status:
- Not built / Placeholder only / Partially built / Built but needs update

---

## 3. Source of Truth

Figma source:
[Paste Figma component/page/link here]

Design system reference:
[Token set, component set, or existing DS reference]

Related existing code:
[File path if known]

Storybook reference:
[Storybook path if known]

---

## 4. Scope of This Handoff

This handoff covers:
- [Variant / size / state / property being handed off]

This handoff does not cover:
- [Anything outside scope]

Example:
This handoff covers Button Large only.
This does not cover Button Medium, Button Small, Icon Button, or loading button behavior unless explicitly stated.

---

## 5. Component Anatomy

Main parts:
- Container
- Label
- Icon left
- Icon right
- Focus ring
- State layer

Optional parts:
- [List optional parts]

Notes:
- Define which parts are required and which parts are optional.
- Mention if any anatomy differs by variant, size, or state.

---

## 6. Variants / Properties

Required variants:
- Type: Primary / Secondary
- Variant: Filled / Outline / Tonal
- Size: Large / Medium / Small
- State: Default / Hover / Pressed / Focus / Disabled / Loading

Component properties:
- label
- leftIcon
- rightIcon
- disabled
- loading
- type
- variant
- size

Notes:
- Only include variants and properties that are approved or in scope.
- If a variant is not approved yet, mark it as out of scope or needs clarification.

---

## 7. Token Usage

Use existing tokens only.

Background:
[token name]

Text:
[token name]

Border:
[token name]

Icon:
[token name]

Focus ring:
[token name]

Spacing:
[token name or value]

Radius:
[token name or value]

Shadow:
[token name or value, if applicable]

Do not create new token names without approval.

If a required token does not exist, flag it as a DS gap instead of inventing one.

---

## 8. Behavior Rules

Interaction behavior:
- Default:
- Hover:
- Pressed:
- Focus:
- Disabled:
- Loading:

Responsive behavior:
- [How it behaves across desktop/tablet/mobile if relevant]

Accessibility:
- Keyboard focus required
- Visible focus state required
- Disabled state must not be focusable if native disabled
- Button label must remain readable in light and dark mode
- Icon-only components require accessible label
- Interactive elements must meet minimum touch/click target guidance

---

## 9. Light / Dark Mode

Light mode:
- [Expected behavior]

Dark mode:
- [Expected behavior]

Any mode-specific notes:
- [Notes]

Notes:
- Mention if values are tokenized separately for light and dark mode.
- Do not hardcode light/dark values if approved tokens exist.

---

## 10. Storybook Requirements

Create/update Storybook stories for:
- Default
- All variants
- All types
- All sizes, if in scope
- Disabled
- Focus
- With icon
- Loading, if in scope
- Light mode
- Dark mode

Storybook should show:
- Props table
- Usage examples
- Do / Don’t notes if needed
- Design notes if needed
- Accessibility notes if needed

---

## 11. Implementation Notes

Engineer should:
- Reuse existing component if possible
- Extend existing props instead of creating a duplicate component
- Keep implementation scoped to this component only
- Do not modify unrelated components
- Do not invent visual behavior not present in Figma
- Ask before changing component API, tokens, or architecture

Suggested implementation approach:
- [Add notes if needed]

---

## 12. QA Checklist

Before marking complete, check:
- Matches Figma visually
- Uses approved tokens
- Supports required variants
- Supports light/dark mode
- Storybook stories are complete
- Keyboard focus works
- Disabled state works
- Hover/pressed/focus states match the design spec
- No unrelated files changed
- Responsive behavior is acceptable
- Component API is documented
- No invented token names
- No hardcoded values where tokens exist

---

## 13. Open Questions

- [Question 1]
- [Question 2]
- [Question 3]

If there are no open questions, write:
No open questions. Ready for Design Technologist intake review.

---

# Prompt to Call This Format

Use this prompt inside the Design System Auditor & Component Specialist folder:

```txt
Use the uploaded Component Handoff Brief Template.

I want to prepare a component-level handoff for the Design Technologist / Design Engineer.

Component:
[Component name]

Current need:
[Example: Complete Button Large missing variants: secondary, outline, tonal]

Important:
- This is component-level handoff only, not full screen UI handoff
- Do not create or modify Figma components yet unless I explicitly ask
- Do not invent token names
- Do not invent new behavior
- Use existing DS/Figma references when available
- Flag missing tokens, variants, or states as open questions

Please output the Component Handoff Brief using the fixed template.
```

---

# Prompt for Design Technologist Intake

Use this prompt after the DS Auditor produces the handoff and you want the Design Technologist to review it:

```txt
Use SOP Mode 1 — Implementation Intake Review.

Review this Component Handoff Brief from the DS Auditor.

Important:
- Do not implement yet
- Do not modify files yet
- Do not create new design decisions
- Do not invent token names
- Inspect existing code, Storybook, and token files first

Please output:
1. Scope of task
2. Existing component/code found
3. Existing Storybook stories found
4. Existing token usage found
5. Gaps or risks
6. Implementation plan
7. Files expected to change
8. Storybook update plan
9. QA checklist
10. Questions or approvals needed before execution
```

---

# Final Rule

For now, use this template for component handoff only.

When Xenorize starts handing off full product screens or feature flows, use a separate Screen / Feature Handoff Brief instead.
