import React from 'react';
import PasswordStrength from './PasswordStrength.jsx';

export default {
  title: 'Components/Key Component/PasswordStrength/General',
  component: PasswordStrength,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳password-strength` — Password rule checker. Fixed width 300px. ' +
          '4 strength levels drive bar colors: Empty · Weak · Moderate · Strong. ' +
          'Condition rows show `circle-check` (satisfied) or `circle-x` (failed). ' +
          '**⚠️ CircleCheck and CircleX are placeholder icons** — replace with DS paths from ' +
          'Figma nodes 9:96443 / 9:100399 when available.',
      },
    },
  },
  argTypes: {
    strength: {
      control: 'radio',
      options: ['empty', 'weak', 'moderate', 'strong'],
      description:
        'empty — all bars default · weak — bar 1 error · moderate — bars 1–2 warning · strong — all success',
    },
  },
};

const ALL_SATISFIED = [
  { label: 'At least 1 uppercase',  satisfied: true },
  { label: 'At least 1 number',     satisfied: true },
  { label: 'At least 8 characters', satisfied: true },
];

const ALL_FAILED = [
  { label: 'At least 1 uppercase',  satisfied: false },
  { label: 'At least 1 number',     satisfied: false },
  { label: 'At least 8 characters', satisfied: false },
];

const PARTIAL = [
  { label: 'At least 1 uppercase',  satisfied: true  },
  { label: 'At least 1 number',     satisfied: false },
  { label: 'At least 8 characters', satisfied: true  },
];

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: {
    strength: 'empty',
    conditions: ALL_FAILED,
  },
};

// ── Empty ─────────────────────────────────────────────────────────────────────
export const Empty = {
  name: 'Strength: Empty',
  args: {
    strength: 'empty',
    conditions: ALL_FAILED,
  },
};

// ── Weak ──────────────────────────────────────────────────────────────────────
export const Weak = {
  name: 'Strength: Weak',
  args: {
    strength: 'weak',
    conditions: ALL_FAILED,
  },
};

// ── Moderate ──────────────────────────────────────────────────────────────────
export const Moderate = {
  name: 'Strength: Moderate',
  args: {
    strength: 'moderate',
    conditions: PARTIAL,
  },
};

// ── Strong ────────────────────────────────────────────────────────────────────
export const Strong = {
  name: 'Strength: Strong',
  args: {
    strength: 'strong',
    conditions: ALL_SATISFIED,
  },
};

// ── All Strength Levels ───────────────────────────────────────────────────────
export const AllStrengthLevels = {
  name: 'All Strength Levels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {[
        { strength: 'empty',    conditions: ALL_FAILED,    label: 'empty' },
        { strength: 'weak',     conditions: ALL_FAILED,    label: 'weak' },
        { strength: 'moderate', conditions: PARTIAL,       label: 'moderate' },
        { strength: 'strong',   conditions: ALL_SATISFIED, label: 'strong' },
      ].map(({ strength, conditions, label }) => (
        <div key={strength}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 8 }}>
            strength="{label}"
          </div>
          <PasswordStrength strength={strength} conditions={conditions} />
        </div>
      ))}
    </div>
  ),
};

// ── Condition States ──────────────────────────────────────────────────────────
export const ConditionStates = {
  name: 'Condition States (Mixed)',
  args: {
    strength: 'moderate',
    conditions: PARTIAL,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Satisfied conditions use `circle-check` (color: `password/success`). ' +
          'Failed conditions use `circle-x` (color: `password/icon` → `icon/soft`). ' +
          '⚠️ Both icons are placeholders — awaiting DS paths.',
      },
    },
  },
};

// ── Custom Conditions ─────────────────────────────────────────────────────────
export const CustomConditions = {
  name: 'Custom Conditions',
  args: {
    strength: 'moderate',
    conditions: [
      { label: 'At least 1 uppercase letter', satisfied: true  },
      { label: 'At least 1 special character', satisfied: false },
      { label: 'At least 1 number',            satisfied: true  },
      { label: 'At least 8 characters',        satisfied: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'The `conditions` prop accepts any array of `{ label, satisfied }` objects. ' +
          'Not limited to 3 — expands to match.',
      },
    },
  },
};
