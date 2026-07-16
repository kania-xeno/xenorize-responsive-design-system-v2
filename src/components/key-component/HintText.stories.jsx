import React from 'react';
import HintText from './HintText.jsx';

export default {
  title: 'Components/Key Component/HintText/General',
  component: HintText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳hint-text` — Inline form field hint. 4 states: Default · Error · Success · Disabled. ' +
          'Width is 100%. Icon defaults to CircleInfo (information-fill) across all states per DS V1. ' +
          'Disabled: both icon and text use `--key-component-hint-icon-disabled` ' +
          '(`icon/dissabled` ⚠️ — intentional DS typo). ' +
          'Error state sets `role="alert"` + `aria-live="polite"` for screen reader announcements.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'radio',
      options: ['default', 'error', 'success', 'disabled'],
    },
    showIcon: { control: 'boolean' },
    message:  { control: 'text' },
  },
};

const DEFAULT_MESSAGE = 'This is a hint text to help user.';
const ERROR_MESSAGE   = 'This field is required.';
const SUCCESS_MESSAGE = 'Looks good!';
const DISABLED_MESSAGE = 'This field is disabled.';

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: {
    message: DEFAULT_MESSAGE,
    state: 'default',
    showIcon: true,
  },
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  name: 'Default',
  args: {
    message: DEFAULT_MESSAGE,
    state: 'default',
    showIcon: true,
  },
};

// ── Default — No Icon ─────────────────────────────────────────────────────────
export const DefaultNoIcon = {
  name: 'Default — No Icon',
  args: {
    message: DEFAULT_MESSAGE,
    state: 'default',
    showIcon: false,
  },
};

// ── Error ─────────────────────────────────────────────────────────────────────
export const Error = {
  name: 'Error',
  args: {
    message: ERROR_MESSAGE,
    state: 'error',
    showIcon: true,
  },
};

// ── Error — No Icon ───────────────────────────────────────────────────────────
export const ErrorNoIcon = {
  name: 'Error — No Icon',
  args: {
    message: ERROR_MESSAGE,
    state: 'error',
    showIcon: false,
  },
};

// ── Success ───────────────────────────────────────────────────────────────────
export const Success = {
  name: 'Success',
  args: {
    message: SUCCESS_MESSAGE,
    state: 'success',
    showIcon: true,
  },
};

// ── Success — No Icon ─────────────────────────────────────────────────────────
export const SuccessNoIcon = {
  name: 'Success — No Icon',
  args: {
    message: SUCCESS_MESSAGE,
    state: 'success',
    showIcon: false,
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  args: {
    message: DISABLED_MESSAGE,
    state: 'disabled',
    showIcon: true,
  },
};

// ── Disabled — No Icon ────────────────────────────────────────────────────────
export const DisabledNoIcon = {
  name: 'Disabled — No Icon',
  args: {
    message: DISABLED_MESSAGE,
    state: 'disabled',
    showIcon: false,
  },
};

// ── All States ────────────────────────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      {[
        { state: 'default',  message: DEFAULT_MESSAGE  },
        { state: 'error',    message: ERROR_MESSAGE    },
        { state: 'success',  message: SUCCESS_MESSAGE  },
        { state: 'disabled', message: DISABLED_MESSAGE },
      ].map(({ state, message }) => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c' }}>{state}</span>
          <HintText state={state} message={message} showIcon />
        </div>
      ))}
    </div>
  ),
};

// ── All States — No Icon ──────────────────────────────────────────────────────
export const AllStatesNoIcon = {
  name: 'All States — No Icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      {[
        { state: 'default',  message: DEFAULT_MESSAGE  },
        { state: 'error',    message: ERROR_MESSAGE    },
        { state: 'success',  message: SUCCESS_MESSAGE  },
        { state: 'disabled', message: DISABLED_MESSAGE },
      ].map(({ state, message }) => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c' }}>{state}</span>
          <HintText state={state} message={message} showIcon={false} />
        </div>
      ))}
    </div>
  ),
};

// ── Long Message — Wraps ──────────────────────────────────────────────────────
export const LongMessage = {
  name: 'Long Message (Wraps)',
  args: {
    message:
      'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.',
    state: 'error',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Text wraps at 100% width. Icon remains top-aligned via `align-items: center` on the root.',
      },
    },
  },
};
