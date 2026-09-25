import React from 'react';
import ChartDonutSingleColor from './ChartDonutSingleColor';
import '../../design-tokens/tokens.css';

export default {
  title: 'Components/Chart Donut/Single Color',
  component: ChartDonutSingleColor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Donut chart with tonal shade variation within a single color palette. `series` selects which palette (1–8, up, down). `shades` controls how many tonal segments appear (1–5). ⚠️ `series` here = color palette, not slice count.',
      },
    },
  },
  argTypes: {
    series: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 'up', 'down', 'empty'],
      description: 'Color palette. ⚠️ This is palette selection, not slice count.',
    },
    shades: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Number of tonal segments.',
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l', 'xl'],
      description: 'Fixed chart size (120/180/240/300px).',
    },
    isEmpty: {
      control: 'boolean',
      description: 'Explicit empty state. Also set when series="empty".',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Enable per-shade Tooltip interaction. Each shade shows its own Tooltip on hover and keyboard focus.',
    },
    tooltipLabel: {
      control: false, // deprecated in C2 — hidden from controls
      description: '⚠️ DEPRECATED in C2. Use data[].label for per-shade labels. This prop is ignored.',
    },
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const withDark = (story) => (
  <div data-theme="dark" style={{ padding: 32, background: '#1a1b24' }}>
    {story()}
  </div>
);

// ── Series 1–8 (shades=3 default) ────────────────────────────────────────────

export const Series1 = { args: { series: 1, shades: 3, size: 'm' }, name: 'Series 1' };
export const Series2 = { args: { series: 2, shades: 3, size: 'm' }, name: 'Series 2' };
export const Series3 = { args: { series: 3, shades: 3, size: 'm' }, name: 'Series 3' };
export const Series4 = { args: { series: 4, shades: 3, size: 'm' }, name: 'Series 4' };
export const Series5 = { args: { series: 5, shades: 3, size: 'm' }, name: 'Series 5' };
export const Series6 = { args: { series: 6, shades: 3, size: 'm' }, name: 'Series 6' };
export const Series7 = { args: { series: 7, shades: 3, size: 'm' }, name: 'Series 7' };
export const Series8 = { args: { series: 8, shades: 3, size: 'm' }, name: 'Series 8' };
export const SeriesUp   = { args: { series: 'up',   shades: 3, size: 'm' }, name: 'Series Up' };
export const SeriesDown = { args: { series: 'down', shades: 3, size: 'm' }, name: 'Series Down' };
export const SeriesEmpty = {
  args: { series: 'empty', shades: 1, isEmpty: true, size: 'm' },
  name: 'Series Empty',
};

// ── All series — grid ─────────────────────────────────────────────────────────

export const AllSeriesLight = {
  name: 'All Series — Light',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 'up', 'down', 'empty'].map((s) => (
        <div key={s} style={{ textAlign: 'center' }}>
          <ChartDonutSingleColor
            series={s}
            shades={s === 'empty' ? 1 : 3}
            isEmpty={s === 'empty'}
            size="m"
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontFamily: 'Open Sans, sans-serif', textTransform: 'capitalize' }}>
            {s === 'up' ? 'Up' : s === 'down' ? 'Down' : s === 'empty' ? 'Empty' : `Series ${s}`}
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
      {[1, 2, 3, 4, 5, 6, 7, 8, 'up', 'down', 'empty'].map((s) => (
        <div key={s} style={{ textAlign: 'center' }}>
          <ChartDonutSingleColor
            series={s}
            shades={s === 'empty' ? 1 : 3}
            isEmpty={s === 'empty'}
            size="m"
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#ccced7', fontFamily: 'Open Sans, sans-serif', textTransform: 'capitalize' }}>
            {s === 'up' ? 'Up' : s === 'down' ? 'Down' : s === 'empty' ? 'Empty' : `Series ${s}`}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Shades 1–5 ────────────────────────────────────────────────────────────────

export const Shades1 = { args: { series: 1, shades: 1, size: 'm' }, name: 'Shades 1' };
export const Shades2 = { args: { series: 1, shades: 2, size: 'm' }, name: 'Shades 2' };
export const Shades3 = { args: { series: 1, shades: 3, size: 'm' }, name: 'Shades 3' };
export const Shades4 = { args: { series: 1, shades: 4, size: 'm' }, name: 'Shades 4' };
export const Shades5 = { args: { series: 1, shades: 5, size: 'm' }, name: 'Shades 5' };

export const AllShades = {
  name: 'All Shades — Series 1',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((sh) => (
        <div key={sh} style={{ textAlign: 'center' }}>
          <ChartDonutSingleColor series={1} shades={sh} size="m" />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {sh} shade{sh !== 1 ? 's' : ''}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Size variants ─────────────────────────────────────────────────────────────

export const SizeS  = { args: { series: 2, shades: 3, size: 's'  }, name: 'Size S (120px)' };
export const SizeM  = { args: { series: 2, shades: 3, size: 'm'  }, name: 'Size M (180px)' };
export const SizeL  = { args: { series: 2, shades: 3, size: 'l'  }, name: 'Size L (240px)' };
export const SizeXL = { args: { series: 2, shades: 3, size: 'xl' }, name: 'Size XL (300px)' };

export const AllSizes = {
  name: 'All Sizes — Series 2 · Shades 3',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
      {['s', 'm', 'l', 'xl'].map((sz) => (
        <div key={sz} style={{ textAlign: 'center' }}>
          <ChartDonutSingleColor series={2} shades={3} size={sz} />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {sz.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Up / Down palettes ────────────────────────────────────────────────────────

export const AllShadesUp = {
  name: 'All Shades — Up',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((sh) => (
        <div key={sh} style={{ textAlign: 'center' }}>
          <ChartDonutSingleColor series="up" shades={sh} size="m" />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {sh} shade{sh !== 1 ? 's' : ''}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AllShadesDown = {
  name: 'All Shades — Down',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((sh) => (
        <div key={sh} style={{ textAlign: 'center' }}>
          <ChartDonutSingleColor series="down" shades={sh} size="m" />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {sh} shade{sh !== 1 ? 's' : ''}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Tooltip (C2) ──────────────────────────────────────────────────────────────
//
// C2 — Dynamic per-shade Tooltip (designer-approved).
//
// Each rendered shade segment owns its own production Tooltip instance
// (Floating UI, uncontrolled hover/focus/touch mode). `showTooltip` enables
// or disables all shade Tooltips simultaneously.
//
// Interaction: identical to ChartDonutMulticolor C2.
//   Hover 300 ms → opens. Mouse-leave → closes immediately.
//   Keyboard focus (Tab) → opens. Blur / Escape → closes.
//   One Tooltip open at a time.
//
// Visual contract:
//   size="xs", appearance="light", showTail={true}
//   placement: computed from 8-sector compass midAngle per shade
//   Single-shade full ring → stable placement "top"
//
// Content: `${shadeLabel} · ${pct}%`
//   shadeLabel — from data[].label, else capitalized shade name ("Default", "Light", …)
//   pct        — value / total × 100
//
// Backwards compat: `tooltipLabel` is deprecated and ignored in C2.

// ── C2 tooltip — shades=3 default weights (shade name fallback labels) ─────────

export const TooltipShades3 = {
  name: 'Tooltip — Shades 3 (shade name labels)',
  args: { series: 1, shades: 3, size: 'm', showTooltip: true },
};

// ── C2 tooltip — all 5 shades ────────────────────────────────────────────────

export const TooltipShades5 = {
  name: 'Tooltip — Shades 5 (all compass sectors)',
  args: { series: 2, shades: 5, size: 'm', showTooltip: true },
};

// ── C2 tooltip — custom labels via data ──────────────────────────────────────

export const TooltipCustomLabels = {
  name: 'Tooltip — Custom Labels via data[]',
  args: {
    series: 3,
    shades: 3,
    size: 'm',
    showTooltip: true,
    data: [
      { label: 'Q1', value: 50 },
      { label: 'Q2', value: 25 },
      { label: 'Q3', value: 25 },
    ],
  },
};

// ── C2 tooltip — single shade (100% ring, placement=top) ─────────────────────

export const TooltipSingleShade = {
  name: 'Tooltip — Single Shade 100% (placement: top)',
  args: { series: 1, shades: 1, size: 'm', showTooltip: true },
};

// ── C2 tooltip — disabled ────────────────────────────────────────────────────

export const TooltipDisabled = {
  name: 'Tooltip — Disabled (showTooltip=false)',
  args: { series: 2, shades: 3, size: 'm', showTooltip: false },
};

// ── C2 tooltip — empty chart (no Tooltips rendered) ──────────────────────────

export const TooltipEmptyChart = {
  name: 'Tooltip — Empty Chart (no Tooltips rendered)',
  args: { series: 'empty', shades: 1, isEmpty: true, size: 'm', showTooltip: true },
};

// ── C2 tooltip — zero-value shade skipped ────────────────────────────────────

export const TooltipZeroValueSkipped = {
  name: 'Tooltip — Zero Value Shade Skipped',
  args: {
    series: 1,
    shades: 3,
    size: 'm',
    showTooltip: true,
    data: [
      { label: 'Active',   value: 70 },
      { label: 'Inactive', value: 0  },  // filtered — no arc, no Tooltip
      { label: 'Pending',  value: 30 },
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
          <ChartDonutSingleColor series={3} shades={3} size={sz} showTooltip={true} />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {sz.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── C2 tooltip — all palette options ─────────────────────────────────────────

export const TooltipAllPalettes = {
  name: 'Tooltip — All Palettes (hover to inspect labels)',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 'up', 'down'].map((s) => (
        <div key={s} style={{ textAlign: 'center' }}>
          <ChartDonutSingleColor series={s} shades={3} size="m" showTooltip={true} />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {typeof s === 'number' ? `S${s}` : s.charAt(0).toUpperCase() + s.slice(1)}
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
      <ChartDonutSingleColor series={3} shades={3} size="m" showTooltip={true} />
    </div>
  ),
};

// ── Dark mode ─────────────────────────────────────────────────────────────────

export const DarkModeSeries1 = {
  name: 'Dark Mode — Series 1 · Shades 5',
  decorators: [withDark],
  args: { series: 1, shades: 5, size: 'm' },
};

export const DarkModeUp = {
  name: 'Dark Mode — Up · Shades 3',
  decorators: [withDark],
  args: { series: 'up', shades: 3, size: 'm' },
};

export const DarkModeDown = {
  name: 'Dark Mode — Down · Shades 3',
  decorators: [withDark],
  args: { series: 'down', shades: 3, size: 'm' },
};

export const DarkModeEmpty = {
  name: 'Dark Mode — Empty',
  decorators: [withDark],
  args: { series: 'empty', isEmpty: true, size: 'm' },
};
