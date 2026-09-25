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
    data: {
      control: 'object',
      description:
        'Slice data. Accepts: null (equal weights, fallback labels "Series N"), number[] (values only, backwards compat), or {label,value}[] (C2 format — count inferred from data.length). Zero values are skipped.',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Enable per-slice Tooltip interaction. Each slice shows its own Tooltip on hover and keyboard focus.',
    },
    tooltipLabel: {
      control: false, // deprecated in C2 — hidden from controls
      description: '⚠️ DEPRECATED in C2. Use data[].label for per-slice labels. This prop is ignored.',
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

// ── Data-driven (uneven distribution) ─────────────────────────────────────────
//
// Verifies that the `data` prop overrides the equal-weight fallback.
// Values [40, 25, 20, 15] represent a realistic revenue split across 4 categories.

export const DataDrivenLight = {
  name: 'Data Driven — Light',
  args: { slices: 4, size: 'm', data: [40, 25, 20, 15] },
};

export const DataDrivenDark = {
  name: 'Data Driven — Dark',
  decorators: [withDark],
  args: { slices: 4, size: 'm', data: [40, 25, 20, 15] },
};

export const DataDrivenSized = {
  name: 'Data Driven — All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
      {(['s', 'm', 'l', 'xl']).map((sz) => (
        <div key={sz} style={{ textAlign: 'center' }}>
          <ChartDonutMulticolor slices={4} size={sz} data={[40, 25, 20, 15]} />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {sz.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  ),
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

// ── Tooltip (C2) ──────────────────────────────────────────────────────────────
//
// C2 — Dynamic per-slice Tooltip (designer-approved).
//
// Each rendered slice owns its own production Tooltip instance (Floating UI,
// uncontrolled hover/focus/touch mode). `showTooltip` enables or disables all
// slice Tooltips simultaneously.
//
// Interaction:
//   Hover 300 ms → opens. Mouse-leave → closes immediately.
//   Keyboard focus (Tab) → opens. Blur / Escape → closes.
//   Touch tap → opens; second tap / outside tap / scroll → closes.
//   Only one Tooltip may be visible at any time.
//
// Visual contract:
//   size="xs", appearance="light", showTail={true}
//   placement: computed per-slice from 8-sector compass midAngle
//     (single-slice full ring → "top")
//   Floating UI flip() + shift() handle viewport-edge adjustments automatically.
//
// Content: `${label} · ${pct}%`
//   label — from data[].label, else fallback "Series N"
//   pct   — value / total × 100 (whole numbers omit decimal)
//
// Backwards compat: `tooltipLabel` is deprecated and ignored in C2.
//   The `disabled` flag mechanism (from C1) still drives interaction gating,
//   but now activates per-slice rather than on the container.

// ── C2 tooltip — equal 4-slice (fallback labels) ──────────────────────────────

export const TooltipEqual4Slices = {
  name: 'Tooltip — Equal 4 Slices (hover each)',
  args: { slices: 4, size: 'm', showTooltip: true },
};

// ── C2 tooltip — unequal data with custom labels ──────────────────────────────

export const TooltipUnequalData = {
  name: 'Tooltip — Unequal 4 Slices with Labels',
  args: {
    size: 'm',
    showTooltip: true,
    data: [
      { label: 'Enterprise', value: 50 },
      { label: 'SMB',        value: 33 },
      { label: 'Mid-Market', value: 12 },
      { label: 'Other',      value: 5  },
    ],
  },
};

// ── C2 tooltip — 5-slice with varied weights ──────────────────────────────────

export const Tooltip5Slices = {
  name: 'Tooltip — 5 Slices (12 / 25 / 33 / 5 / 25)',
  args: {
    size: 'm',
    showTooltip: true,
    data: [
      { label: 'Alpha',   value: 12 },
      { label: 'Beta',    value: 25 },
      { label: 'Gamma',   value: 33 },
      { label: 'Delta',   value: 5  },
      { label: 'Epsilon', value: 25 },
    ],
  },
};

// ── C2 tooltip — single 100% slice ────────────────────────────────────────────

export const TooltipSingleSlice = {
  name: 'Tooltip — Single 100% Slice (placement: top)',
  args: {
    size: 'm',
    showTooltip: true,
    data: [{ label: 'Total Revenue', value: 100 }],
  },
};

// ── C2 tooltip — 8 slices ─────────────────────────────────────────────────────

export const Tooltip8Slices = {
  name: 'Tooltip — 8 Slices (all compass sectors)',
  args: {
    size: 'm',
    showTooltip: true,
    data: [
      { label: 'A', value: 20 },
      { label: 'B', value: 15 },
      { label: 'C', value: 18 },
      { label: 'D', value: 10 },
      { label: 'E', value: 12 },
      { label: 'F', value: 8  },
      { label: 'G', value: 9  },
      { label: 'H', value: 8  },
    ],
  },
};

// ── C2 tooltip — disabled (showTooltip=false) ─────────────────────────────────

export const TooltipDisabled = {
  name: 'Tooltip — Disabled (showTooltip=false)',
  args: {
    size: 'm',
    showTooltip: false,
    data: [
      { label: 'Enterprise', value: 50 },
      { label: 'SMB',        value: 30 },
      { label: 'Other',      value: 20 },
    ],
  },
};

// ── C2 tooltip — empty chart (no slices rendered, no tooltips) ────────────────

export const TooltipEmptyChart = {
  name: 'Tooltip — Empty Chart (no Tooltips rendered)',
  args: { slices: 'empty', size: 'm', showTooltip: true },
};

// ── C2 tooltip — long label (wraps in Tooltip popup) ─────────────────────────

export const TooltipLongLabel = {
  name: 'Tooltip — Long Label',
  args: {
    size: 'm',
    showTooltip: true,
    data: [
      { label: 'Revenue from Digital Channels — Q2 2026', value: 60 },
      { label: 'Traditional',                              value: 40 },
    ],
  },
};

// ── C2 tooltip — zero-value slice filtered ────────────────────────────────────

export const TooltipZeroValueSkipped = {
  name: 'Tooltip — Zero Value Slice Skipped',
  args: {
    size: 'm',
    showTooltip: true,
    data: [
      { label: 'Active',   value: 60 },
      { label: 'Inactive', value: 0  },  // filtered out — no arc, no Tooltip
      { label: 'Pending',  value: 40 },
    ],
  },
};

// ── C2 tooltip — all four sizes ───────────────────────────────────────────────

export const TooltipAllSizes = {
  name: 'Tooltip — All 4 Sizes',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
      {['s', 'm', 'l', 'xl'].map((sz) => (
        <div key={sz} style={{ textAlign: 'center' }}>
          <ChartDonutMulticolor
            size={sz}
            showTooltip={true}
            data={[
              { label: 'Series A', value: 40 },
              { label: 'Series B', value: 30 },
              { label: 'Series C', value: 20 },
              { label: 'Series D', value: 10 },
            ]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {sz.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── C2 tooltip — viewport right edge ─────────────────────────────────────────

export const TooltipViewportRight = {
  name: 'Tooltip — Viewport Right Edge (Floating UI flip)',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <ChartDonutMulticolor
        size="m"
        showTooltip={true}
        data={[
          { label: 'Enterprise', value: 50 },
          { label: 'SMB',        value: 30 },
          { label: 'Other',      value: 20 },
        ]}
      />
    </div>
  ),
};

// ── C2 tooltip — legacy number[] backwards compat ─────────────────────────────

export const TooltipLegacyNumberArray = {
  name: 'Tooltip — Legacy number[] Data (fallback labels)',
  args: {
    slices: 4,
    size: 'm',
    showTooltip: true,
    data: [40, 25, 20, 15], // legacy format — tooltips use "Series 1", "Series 2"...
  },
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
