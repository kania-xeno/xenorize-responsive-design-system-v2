import React from 'react';
import ChartDonutMulticolor from './ChartDonutMulticolor';
import '../../design-tokens/tokens.css';

export default {
  title: 'Components/Chart Donut/Multicolor',
  component: ChartDonutMulticolor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Donut chart with distinct series colors. `slices` controls how many segments appear (1–8). Each slice maps to a different `chart/series/N/default` token.',
      },
    },
  },
  argTypes: {
    slices: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 'empty'],
      description: 'Number of slices — or "empty" for no-data state.',
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l', 'xl'],
      description: 'Fixed chart size (120/180/240/300px).',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip overlay.',
    },
    tooltipLabel: {
      control: 'text',
      description: 'Tooltip text content.',
    },
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const withDark = (story) => (
  <div data-theme="dark" style={{ padding: 32, background: '#1a1b24' }}>
    {story()}
  </div>
);

// ── Series count ──────────────────────────────────────────────────────────────

export const Series1 = {
  args: { slices: 1, size: 'm' },
  name: 'Series 1',
};

export const Series2 = {
  args: { slices: 2, size: 'm' },
  name: 'Series 2',
};

export const Series3 = {
  args: { slices: 3, size: 'm' },
  name: 'Series 3',
};

export const Series4 = {
  args: { slices: 4, size: 'm' },
  name: 'Series 4',
};

export const Series5 = {
  args: { slices: 5, size: 'm' },
  name: 'Series 5',
};

export const Series6 = {
  args: { slices: 6, size: 'm' },
  name: 'Series 6',
};

export const Series7 = {
  args: { slices: 7, size: 'm' },
  name: 'Series 7',
};

export const Series8 = {
  args: { slices: 8, size: 'm' },
  name: 'Series 8',
};

export const SeriesEmpty = {
  args: { slices: 'empty', size: 'm' },
  name: 'Series Empty',
};

// ── All series — grid ─────────────────────────────────────────────────────────

export const AllSeriesLight = {
  name: 'All Series — Light',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 'empty'].map((s) => (
        <div key={s} style={{ textAlign: 'center' }}>
          <ChartDonutMulticolor slices={s} size="m" />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {s === 'empty' ? 'Empty' : `Series ${s}`}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AllSeriesDark = {
  name: 'All Series — Dark',
  decorators: [withDark],
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 'empty'].map((s) => (
        <div key={s} style={{ textAlign: 'center' }}>
          <ChartDonutMulticolor slices={s} size="m" />
          <div style={{ marginTop: 8, fontSize: 12, color: '#ccced7', fontFamily: 'Open Sans, sans-serif' }}>
            {s === 'empty' ? 'Empty' : `Series ${s}`}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Size variants ─────────────────────────────────────────────────────────────

export const SizeS = {
  args: { slices: 3, size: 's' },
  name: 'Size S (120px)',
};

export const SizeM = {
  args: { slices: 3, size: 'm' },
  name: 'Size M (180px)',
};

export const SizeL = {
  args: { slices: 3, size: 'l' },
  name: 'Size L (240px)',
};

export const SizeXL = {
  args: { slices: 3, size: 'xl' },
  name: 'Size XL (300px)',
};

export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
      {(['s', 'm', 'l', 'xl']).map((sz) => (
        <div key={sz} style={{ textAlign: 'center' }}>
          <ChartDonutMulticolor slices={4} size={sz} />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {sz.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Tooltip ───────────────────────────────────────────────────────────────────

export const WithTooltip = {
  args: { slices: 4, size: 'm', showTooltip: true, tooltipLabel: 'Q2 Revenue' },
  name: 'With Tooltip',
};

// ── Dark mode ─────────────────────────────────────────────────────────────────

export const DarkMode = {
  name: 'Dark Mode — Series 4',
  decorators: [withDark],
  args: { slices: 4, size: 'm' },
};

export const DarkModeEmpty = {
  name: 'Dark Mode — Empty',
  decorators: [withDark],
  args: { slices: 'empty', size: 'm' },
};
