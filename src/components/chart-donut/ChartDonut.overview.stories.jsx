import React from 'react';
import ChartDonutMulticolor from './ChartDonutMulticolor';
import ChartDonutSingleColor from './ChartDonutSingleColor';
import '../../design-tokens/tokens.css';

export default {
  title: 'Components/Chart Donut/Overview',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Overview of all Chart Donut variants. Two components: Multicolor (series = slice count) and Single Color (series = palette + shades = tonal segments).',
      },
    },
  },
};

// ── Shared styles ─────────────────────────────────────────────────────────────

const label = (text) => (
  <div style={{
    marginTop: 8,
    fontSize: 11,
    color: 'var(--color-text-neutral-subtle, #7b7b7b)',
    fontFamily: 'Open Sans, sans-serif',
    textAlign: 'center',
  }}>
    {text}
  </div>
);

const sectionTitle = (text) => (
  <h3 style={{
    margin: '32px 0 16px',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'Open Sans, sans-serif',
    color: 'var(--color-text-neutral-strong, #1c1c1c)',
    borderBottom: '1px solid var(--color-border-neutral-soft, #e5e5e5)',
    paddingBottom: 8,
  }}>
    {text}
  </h3>
);

const row = (children) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end', marginBottom: 16 }}>
    {children}
  </div>
);

// ── All Combinations ──────────────────────────────────────────────────────────

export const AllCombinations = {
  name: 'All Combinations',
  render: () => (
    <div>
      {/* ── Multicolor ── */}
      {sectionTitle('Multicolor — All Series (Size M)')}
      {row(
        [1, 2, 3, 4, 5, 6, 7, 8, 'empty'].map((s) => (
          <div key={s}>
            <ChartDonutMulticolor slices={s} size="m" />
            {label(s === 'empty' ? 'Empty' : `${s} slice${s > 1 ? 's' : ''}`)}
          </div>
        ))
      )}

      {sectionTitle('Multicolor — All Sizes (Series 4)')}
      {row(
        ['s', 'm', 'l', 'xl'].map((sz) => (
          <div key={sz}>
            <ChartDonutMulticolor slices={4} size={sz} />
            {label(sz.toUpperCase())}
          </div>
        ))
      )}

      {/* ── Single Color ── */}
      {sectionTitle('Single Color — All Series · Shades 3 (Size M)')}
      {row(
        [1, 2, 3, 4, 5, 6, 7, 8, 'up', 'down', 'empty'].map((s) => (
          <div key={s}>
            <ChartDonutSingleColor
              series={s}
              shades={s === 'empty' ? 1 : 3}
              isEmpty={s === 'empty'}
              size="m"
            />
            {label(
              s === 'up' ? 'Up' :
              s === 'down' ? 'Down' :
              s === 'empty' ? 'Empty' :
              `S${s}`
            )}
          </div>
        ))
      )}

      {sectionTitle('Single Color — All Shades · Series 1 (Size M)')}
      {row(
        [1, 2, 3, 4, 5].map((sh) => (
          <div key={sh}>
            <ChartDonutSingleColor series={1} shades={sh} size="m" />
            {label(`${sh} shade${sh !== 1 ? 's' : ''}`)}
          </div>
        ))
      )}

      {sectionTitle('Single Color — Up / Down · All Shades (Size M)')}
      {row(
        ['up', 'down'].flatMap((s) =>
          [1, 2, 3, 4, 5].map((sh) => (
            <div key={`${s}-${sh}`}>
              <ChartDonutSingleColor series={s} shades={sh} size="m" />
              {label(`${s}/${sh}`)}
            </div>
          ))
        )
      )}

      {sectionTitle('Single Color — All Sizes · Series 2 · Shades 3')}
      {row(
        ['s', 'm', 'l', 'xl'].map((sz) => (
          <div key={sz}>
            <ChartDonutSingleColor series={2} shades={3} size={sz} />
            {label(sz.toUpperCase())}
          </div>
        ))
      )}
    </div>
  ),
};

// ── Dark Mode All Combinations ────────────────────────────────────────────────

export const DarkModeAllCombinations = {
  name: 'Dark Mode — All Combinations',
  render: () => (
    <div data-theme="dark" style={{ background: '#1a1b24', padding: 32, borderRadius: 12 }}>
      {sectionTitle('Multicolor — All Series (Size M)')}
      {row(
        [1, 2, 3, 4, 5, 6, 7, 8, 'empty'].map((s) => (
          <div key={s}>
            <ChartDonutMulticolor slices={s} size="m" />
            {label(s === 'empty' ? 'Empty' : `${s} slice${s > 1 ? 's' : ''}`)}
          </div>
        ))
      )}

      {sectionTitle('Single Color — All Series · Shades 3 (Size M)')}
      {row(
        [1, 2, 3, 4, 5, 6, 7, 8, 'up', 'down', 'empty'].map((s) => (
          <div key={s}>
            <ChartDonutSingleColor
              series={s}
              shades={s === 'empty' ? 1 : 3}
              isEmpty={s === 'empty'}
              size="m"
            />
            {label(
              s === 'up' ? 'Up' :
              s === 'down' ? 'Down' :
              s === 'empty' ? 'Empty' :
              `S${s}`
            )}
          </div>
        ))
      )}

      {sectionTitle('Single Color — All Shades · Series 1 (Size M)')}
      {row(
        [1, 2, 3, 4, 5].map((sh) => (
          <div key={sh}>
            <ChartDonutSingleColor series={1} shades={sh} size="m" />
            {label(`${sh} shade${sh !== 1 ? 's' : ''}`)}
          </div>
        ))
      )}
    </div>
  ),
};

// ── Playground — Multicolor ───────────────────────────────────────────────────

export const PlaygroundMulticolor = {
  name: 'Playground — Multicolor',
  args: {
    slices: 4,
    size: 'm',
    showTooltip: false,
    tooltipLabel: 'Series',
  },
  argTypes: {
    slices: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 'empty'],
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l', 'xl'],
    },
    showTooltip: { control: 'boolean' },
    tooltipLabel: { control: 'text' },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
  },
  render: ({ theme = 'light', ...args }) => (
    <div
      data-theme={theme}
      style={{
        padding: 32,
        background: theme === 'dark' ? '#1a1b24' : 'transparent',
        borderRadius: 8,
        display: 'inline-block',
      }}
    >
      <ChartDonutMulticolor {...args} />
    </div>
  ),
};

// ── Playground — Single Color ─────────────────────────────────────────────────

export const PlaygroundSingleColor = {
  name: 'Playground — Single Color',
  args: {
    series: 1,
    shades: 3,
    size: 'm',
    isEmpty: false,
    showTooltip: false,
    tooltipLabel: 'Category',
  },
  argTypes: {
    series: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 'up', 'down', 'empty'],
    },
    shades: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l', 'xl'],
    },
    isEmpty: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
    tooltipLabel: { control: 'text' },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
  },
  render: ({ theme = 'light', ...args }) => (
    <div
      data-theme={theme}
      style={{
        padding: 32,
        background: theme === 'dark' ? '#1a1b24' : 'transparent',
        borderRadius: 8,
        display: 'inline-block',
      }}
    >
      <ChartDonutSingleColor {...args} />
    </div>
  ),
};
