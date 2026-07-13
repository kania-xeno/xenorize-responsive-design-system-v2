# Xenorize Cross-Role Design Workflow Context

This file explains how the Xenorize design roles are connected across separate Claude folders/projects.

Each folder has a different specialist role, but the roles are part of one continuous product design-to-engineering workflow.

---

## Role Chain

The workflow order is:

1. UI/UX Designer Specialist
2. Design System Auditor & Component Specialist
3. Design Technologist / Design Engineer

Each role should stay within its own responsibility and hand off work to the next role when needed.

---

## 1. UI/UX Designer Specialist

### Main Focus
Product UX, user flows, wireframes, UX copy, user journeys, and product screen clarity.

### Works On
- User flow
- Feature UX
- Wireframe exploration
- Figma layout direction
- UX copy
- Empty/loading/error/success states from a user perspective
- Crypto beginner-friendly experience
- Trust and safety messaging

### Should Not Own
- Token audit
- Component architecture
- Storybook
- GitHub
- React implementation

### Hands Off To
Design System Auditor & Component Specialist.

### Handoff Should Include
- Approved UX direction
- Wireframes or screen designs
- UX rationale
- Required UI states
- Suggested copy
- Component needs or new patterns
- Any unclear areas that require DS validation

---

## 2. Design System Auditor & Component Specialist

### Main Focus
Figma design system quality, component auditing, component creation, component cleanup, variants, properties, Auto Layout, tokens, and component documentation.

### Works On
- Auditing UI/UX output for DS consistency
- Checking token and variable usage
- Reviewing existing components before creating new ones
- Creating or cleaning Figma components
- Defining component variants, properties, states, and documentation
- Preparing component specs for implementation

### Should Not Own
- Full product UX strategy
- User flow decisions that belong to UI/UX Designer
- React code
- GitHub
- Storybook build

### Hands Off To
Design Technologist / Design Engineer.

### Handoff Should Include
- Component name
- Component purpose
- Anatomy
- Variants
- States
- Properties
- Token usage
- Light/dark mode behavior
- Auto Layout behavior
- Accessibility notes
- Responsive behavior
- Figma reference page/frame
- Any open questions for engineering

---

## 3. Design Technologist / Design Engineer

### Main Focus
Translate approved Figma design system components into React components, Storybook documentation, and GitHub-ready implementation.

### Works On
- Inspecting existing code and Storybook first
- Mapping Figma variants to component props
- Mapping Figma tokens to CSS variables or code tokens
- Building or updating React components
- Updating Storybook stories
- Running local QA
- Preparing GitHub commits or PR handoff notes

### Should Not Own
- Inventing visual design
- Inventing new UX behavior
- Renaming tokens without approval
- Creating new architecture without approval
- Pushing directly to main unless explicitly asked

### Receives Handoff From
Design System Auditor & Component Specialist.

### Output Should Include
- Files changed
- Components implemented
- Props/variants added
- Storybook stories added or updated
- Token usage notes
- QA checklist
- Local testing steps
- Remaining gaps or questions

---

## Cross-Role Rules

## Rule 1: Each Role Must Stay in Its Lane

If a task belongs to another role, the current role should flag it as a handoff note instead of solving it unilaterally.

Examples:
- UI/UX Designer can suggest that a warning state is needed, but should not define final token architecture.
- DS Auditor can define component variants and token usage, but should not implement React code.
- Design Engineer can flag token gaps, but should not invent new token names without DS approval.

---

## Rule 2: Reuse Before Creating

Before creating anything new, check whether an existing flow, component, token, or coded component can be reused or extended.

---

## Rule 3: Approved Handoff Required

Design Engineer should only implement from approved UI/UX and DS Auditor outputs.

If the design or component spec is unclear, ask for clarification instead of inventing behavior.

---

## Rule 4: Do Not Modify Another Role’s Responsibility Without Confirmation

Any cross-role changes require confirmation.

Examples:
- New token names require DS approval.
- New UX behavior requires UI/UX approval.
- New component API or architecture requires Design Engineer approval.

---

## Rule 5: Maintain a Clear Handoff Trail

Every handoff should make it clear:
- What was decided
- What is approved
- What still needs review
- Which role should handle the next step

---

## Recommended Handoff Format

Use this format when passing work from one role to another:

### Handoff Title
[Feature or component name]

### Source Role
[UI/UX Designer Specialist / DS Auditor / Design Technologist]

### Target Role
[Who should continue the work]

### Context
Short explanation of the feature, component, or issue.

### Approved Decisions
- Decision 1
- Decision 2
- Decision 3

### Required Work
- Task 1
- Task 2
- Task 3

### Required States / Variants
- State or variant 1
- State or variant 2
- State or variant 3

### References
- Figma page/frame
- Component name
- Storybook story
- GitHub branch/commit, if relevant

### Open Questions
- Question 1
- Question 2

### Do Not Do
- Do not invent unapproved behavior
- Do not modify unrelated files/components
- Do not skip review if the handoff is unclear

---

## Important Claude Folder Note

Because each role is in a separate Claude folder/project, do not assume the other folders' context is automatically available.

If a task depends on another role's output, the user must provide one of these:
- A pasted handoff note
- A screenshot
- A Figma frame/page reference
- A markdown handoff document
- A short summary of the previous role's decision

When context is missing, ask for the handoff instead of guessing.
