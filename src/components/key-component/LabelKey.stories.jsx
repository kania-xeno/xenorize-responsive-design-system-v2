import React from 'react';
import LabelKey from './LabelKey.jsx';

export default {
  title: 'Components/Key Component/LabelKey/General',
  component: LabelKey,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳label-key` — Form field label row. 2 states (Normal · Disabled). ' +
          'Supports required asterisk, optional sublabel, info icon, and inline help action. ' +
          'Width is 100% — the 242px Figma canvas value is a constraint, not a fixed code width. ' +
          'Help action is LabelKey-internal only — NOT the global Link Button component.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'radio',
      options: ['normal', 'disabled'],
    },
    showSublabel: { control: 'boolean' },
    showRequired: { control: 'boolean' },
    showInfo:     { control: 'boolean' },
    showHelp:     { control: 'boolean' },
    label:        { control: 'text' },
    sublabel:     { control: 'text' },
    helpText:     { control: 'text' },
  },
};

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: {
    label: 'Label',
    state: 'normal',
    showSublabel: false,
    showRequired: false,
    showInfo: false,
    showHelp: false,
    helpText: 'Help?',
  },
};

// ── Default (Normal) ──────────────────────────────────────────────────────────
export const Default = {
  name: 'Default (Normal)',
  args: {
    label: 'Email address',
    state: 'normal',
  },
};

// ── With Required ─────────────────────────────────────────────────────────────
export const WithRequired = {
  name: 'With Required (*)',
  args: {
    label: 'Email address',
    showRequired: true,
    state: 'normal',
  },
};

// ── With Optional Sublabel ────────────────────────────────────────────────────
export const WithOptionalText = {
  name: 'With Optional Sublabel',
  args: {
    label: 'Nickname',
    showSublabel: true,
    sublabel: '(Optional)',
    state: 'normal',
  },
};

// ── With Info Icon ────────────────────────────────────────────────────────────
export const WithInfo = {
  name: 'With Info Icon',
  args: {
    label: 'VAT number',
    showInfo: true,
    state: 'normal',
  },
};

// ── With Help Action ──────────────────────────────────────────────────────────
export const WithHelp = {
  name: 'With Help Action',
  args: {
    label: 'Password',
    showHelp: true,
    helpText: 'What is this?',
    state: 'normal',
  },
};

// ── All Extras — Normal ───────────────────────────────────────────────────────
export const AllExtrasNormal = {
  name: 'All Extras — Normal',
  args: {
    label: 'Company name',
    showRequired: true,
    showSublabel: false,
    showInfo: true,
    showHelp: true,
    helpText: 'Help?',
    state: 'normal',
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled = {
  name: 'Disabled',
  args: {
    label: 'Email address',
    state: 'disabled',
  },
};

// ── Disabled — All Extras ─────────────────────────────────────────────────────
export const DisabledAllExtras = {
  name: 'Disabled — All Extras',
  args: {
    label: 'Company name',
    showRequired: true,
    showInfo: true,
    showHelp: true,
    helpText: 'Help?',
    state: 'disabled',
  },
};

// ── All Variants ──────────────────────────────────────────────────────────────
export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <LabelKey label="Default" />
      <LabelKey label="Required" showRequired />
      <LabelKey label="Optional" showSublabel sublabel="(Optional)" />
      <LabelKey label="With info icon" showInfo />
      <LabelKey label="With help action" showHelp helpText="What is this?" />
      <LabelKey label="Required + Info" showRequired showInfo />
      <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '4px 0' }} />
      <LabelKey label="Disabled" state="disabled" />
      <LabelKey label="Disabled + Required" showRequired state="disabled" />
      <LabelKey label="Disabled + Info" showInfo state="disabled" />
      <LabelKey label="Disabled + Help" showHelp helpText="Help?" state="disabled" />
    </div>
  ),
};
