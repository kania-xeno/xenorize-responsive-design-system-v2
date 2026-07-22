import React from 'react';
import KeyIcon from './KeyIcon.jsx';
import CircleInfo from '../../icons/CircleInfo.jsx';

export default {
  title: 'Components/Key Component/KeyIcon/General',
  component: KeyIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`↳key-icon` — Circular icon container. 2 styles × 9 colors × 5 sizes. Display-only. ' +
          'Icon fill is inherited via `currentColor` from the wrapper token.',
      },
    },
  },
  argTypes: {
    style: {
      control: 'select',
      options: ['stroke', 'lighter'],
      description: 'Stroke = white bg + 1px border. Lighter = color bg, no border.',
    },
    color: {
      control: 'select',
      options: ['blue', 'gray', 'orange', 'red', 'green', 'yellow', 'purple', 'pink', 'teal'],
    },
    size: {
      control: 'select',
      options: ['2xl', 'xl', 'l', 'm', 's'],
      description: 's=32px · m=40px · l=48px · xl=56px · 2xl=64px',
    },
  },
};

const COLORS = ['blue', 'gray', 'orange', 'red', 'green', 'yellow', 'purple', 'pink', 'teal'];
const SIZES  = ['s', 'm', 'l', 'xl', '2xl'];

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: {
    style: 'stroke',
    color: 'blue',
    size: 'm',
    icon: <CircleInfo />,
  },
};

// ── All Colors — Stroke ───────────────────────────────────────────────────────
export const AllColorsStroke = {
  name: 'All Colors — Stroke (size M)',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {COLORS.map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <KeyIcon style="stroke" color={color} size="m" icon={<CircleInfo />} />
          <span style={{ fontSize: 11, color: '#5c5c5c', fontFamily: 'monospace' }}>{color}</span>
        </div>
      ))}
    </div>
  ),
};

// ── All Colors — Lighter ──────────────────────────────────────────────────────
export const AllColorsLighter = {
  name: 'All Colors — Lighter (size M)',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {COLORS.map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <KeyIcon style="lighter" color={color} size="m" icon={<CircleInfo />} />
          <span style={{ fontSize: 11, color: '#5c5c5c', fontFamily: 'monospace' }}>{color}</span>
        </div>
      ))}
    </div>
  ),
};

// ── All Sizes — Gray Stroke ───────────────────────────────────────────────────
export const AllSizesGrayStroke = {
  name: 'All Sizes — Gray Stroke',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <KeyIcon style="stroke" color="gray" size={size} icon={<CircleInfo />} />
          <span style={{ fontSize: 11, color: '#5c5c5c', fontFamily: 'monospace' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

// ── Style: Stroke ─────────────────────────────────────────────────────────────
export const StyleStroke = {
  name: 'Style: Stroke',
  args: {
    style: 'stroke',
    color: 'blue',
    size: 'm',
    icon: <CircleInfo />,
  },
};

// ── Style: Lighter ────────────────────────────────────────────────────────────
export const StyleLighter = {
  name: 'Style: Lighter',
  args: {
    style: 'lighter',
    color: 'blue',
    size: 'm',
    icon: <CircleInfo />,
  },
};
