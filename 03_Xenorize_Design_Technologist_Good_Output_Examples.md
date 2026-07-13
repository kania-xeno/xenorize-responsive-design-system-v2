# Xenorize Design Technologist / Design Engineer — Good Output Examples

This file shows examples of the expected output style for the Xenorize Design Technologist / Design Engineer cowork.

The goal is to produce precise, scoped, implementation-focused answers that do not invent design decisions.

---

## Example 1 — Implementation Intake Review

### Task
Implement the approved Warning Alert component from Figma into the React component library and add it to Storybook.

### Expected Mode
Mode 1 — Implementation Intake Review

### Good Output Style

#### 1. Task Understanding
You want the approved Warning Alert component implemented in the Xenorize component library and documented in Storybook.

This component is needed for risk-sensitive states such as withdrawal permission detected, leverage risk warning, insufficient balance warning, and exchange maintenance notices.

#### 2. Source of Truth
Primary source of truth:
- Approved Figma Alert component
- DS Auditor notes on warning/amber state
- Existing Alert component implementation if available

#### 3. Existing Code Inspection Plan
I will first check:
- src/components/alert
- existing Alert.jsx or Alert.tsx
- existing Storybook Alert stories
- token usage for status/warning or status/danger
- existing icon and typography utilities

#### 4. Reuse or Create Decision
Expected direction: extend the existing Alert component if one exists.

A new component should only be created if the existing Alert cannot support warning state without becoming unclear or breaking existing usage.

#### 5. Implementation Plan
Possible files to update:
- src/components/alert/Alert.jsx
- src/components/alert/Alert.stories.jsx
- src/components/alert/index.js
- token mapping file if warning semantic token already exists

#### 6. Risk / Unknowns
Need to confirm whether the design system already has a semantic token for warning background, warning border, and warning text.

If missing, I will flag this to DS Auditor instead of inventing a token.

#### 7. Confirmation Checkpoint
Please confirm whether I should inspect the existing Alert implementation and prepare the exact implementation plan before editing files.

---

## Example 2 — Figma-to-Component Implementation Summary

### Task
Create a Market Switcher component from approved Figma wireframe/design.

### Expected Mode
Mode 2 — Figma-to-Component Implementation

### Good Output Style

#### Component Name
MarketSwitcher

#### Component Purpose
Allows users to switch between Xenorize market environments such as Spot Market and Leverage Market.

#### Props API
Suggested props:
- value: current selected market
- options: list of available markets
- onChange: callback when user selects a market
- disabled: disables the switcher
- loading: shows loading state
- showRiskBadge: shows risk label for leverage option

#### Variant Mapping
Figma state to code mapping:
- Default closed dropdown → state: closed
- Open dropdown → state: open
- Spot selected → value: spot
- Leverage selected → value: leverage
- Leverage unavailable → disabled option
- Loading switch → loading true

#### Token Mapping
Use existing semantic tokens:
- surface/default
- surface/raised
- text/primary
- text/secondary
- border/default
- status/warning if leverage risk badge is visible

Do not use primitive colors directly.

#### Storybook Stories
Add stories:
- DefaultSpot
- DefaultLeverage
- DropdownOpen
- LeverageUnavailable
- Loading
- WithRiskBadge
- MobileResponsive if applicable

#### QA Checklist
- Dropdown opens and closes correctly
- Keyboard navigation works
- Selected value is visible
- Disabled option cannot be selected
- Leverage risk badge is visible when required
- Storybook controls work
- Component matches approved Figma spacing and hierarchy

---

## Example 3 — Storybook Update

### Task
Add Storybook stories for BotStatusBadge.

### Expected Mode
Mode 3 — Storybook Library Update

### Good Output Style

#### Story Structure
Create stories for all bot states:
- Active
- Paused
- Waiting
- Error
- Completed
- Disconnected
- ForwardTestingActive
- LiveActive

#### Controls
Expose controls for:
- status
- label
- size
- showIcon

#### Documentation Notes
Bot status labels must be clear because users need to understand what the bot is currently doing.

Do not use the same visual treatment for warning, error, and inactive states.

#### Missing Design States
If the Figma file does not define a distinct state for “waiting for market condition,” flag it to DS Auditor.

#### QA Checklist
- Each state is visible in Storybook
- Icons match status meaning
- Labels are beginner-friendly
- Color usage maps to semantic tokens
- Focus and accessibility behavior are acceptable where interactive

---

## Example 4 — GitHub / PR Handoff

### Task
Summarize completed implementation after updating Button and Alert components.

### Expected Mode
Mode 6 — GitHub / PR Handoff

### Good Output Style

#### Summary
Updated Button and Alert components to match the approved Xenorize design system variants and added Storybook coverage for key states.

#### Files Changed
- src/components/button/Button.jsx
- src/components/button/Button.stories.jsx
- src/components/alert/Alert.jsx
- src/components/alert/Alert.stories.jsx
- src/components/index.js

#### Components Updated
- Button: added loading and active states
- Alert: added warning variant and updated documentation

#### Storybook Added/Updated
- Button/Default
- Button/Loading
- Button/Active
- Alert/Info
- Alert/Success
- Alert/Warning
- Alert/Error

#### Testing Performed
- npm run storybook
- Visual check in local Storybook
- Checked component props and variant rendering

#### Known Limitations
Warning token mapping needs final DS Auditor confirmation.

#### Suggested Commit Message
feat(ds): update button and alert components with storybook states

#### Suggested PR Description
This PR updates the Button and Alert components to better match the approved Figma design system and adds Storybook coverage for important product states. It includes loading/active button states and warning alert support for risk-sensitive crypto automation flows.

---

## Good Output Checklist

A good Design Engineer response should:
- Identify the correct SOP mode
- Inspect existing code before creating new code
- Reuse or extend existing components when possible
- Map Figma variants to code props
- Use semantic tokens
- Add Storybook stories for states
- Avoid changing UX or visual decisions without approval
- Summarize files changed
- Provide testing steps
- Provide commit/PR notes when relevant
