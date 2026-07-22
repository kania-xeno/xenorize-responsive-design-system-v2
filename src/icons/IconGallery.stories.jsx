import React, { useState } from 'react';
import * as Icons from './index.js';
import manifest from './icon-usage-manifest.json';

// ─────────────────────────────────────────────────────────────────────────────
// Foundations / Icons — Initial Local Batch
//
// This gallery shows the 17 icons currently available in src/icons/.
// It is NOT the complete product-used icon set.
// Remaining ~41 product-used icons require a separate Figma icon audit/export
// pass and will be added to this gallery as they are verified and created.
//
// Source: Xenorize Icon System V.2.0.0
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Foundations/Icons',
  parameters: {
    docs: {
      description: {
        component: `
**Icon Foundation — Initial Local Batch** (17 icons)

All icons in this gallery live in \`src/icons/\` and are exported from \`src/icons/index.js\`.

**This is not the complete product-used icon set.**
Approximately 41 additional product-used icons are pending a separate Figma icon audit/export pass.

**Status badges:**
- 🟢 \`verified\` — path sourced directly from Figma node
- 🟡 \`extracted\` — Figma paths captured and written this session
- 🟠 \`derived\` — path inferred from a related icon; Figma node not directly queried
- 🔴 \`placeholder\` — Figma node known; temporary geometry in file

**Usage:**
\`\`\`jsx
import { Rose, ChevronRightSmall } from '../../icons';
// or direct:
import Rose from '../../icons/Rose.jsx';
\`\`\`
        `,
      },
    },
    layout: 'fullscreen',
  },
};

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  verified:    { label: 'verified',    color: '#16a34a', bg: '#dcfce7', dot: '🟢' },
  extracted:   { label: 'extracted',   color: '#ca8a04', bg: '#fef9c3', dot: '🟡' },
  derived:     { label: 'derived',     color: '#ea580c', bg: '#ffedd5', dot: '🟠' },
  placeholder: { label: 'placeholder', color: '#dc2626', bg: '#fee2e2', dot: '🔴' },
  blocked:     { label: 'blocked',     color: '#6b7280', bg: '#f3f4f6', dot: '⚫' },
};

const COLOR_OPTIONS = {
  currentColor:   'inherit',
  'icon/default': 'var(--color-icon-default, #404040)',
  'icon/subtle':  'var(--color-icon-sub,     #737373)',
  'icon/soft':    'var(--color-icon-soft,    #a3a3a3)',
  'icon/strong':  'var(--color-icon-strong,  #171717)',
  'brand':        'var(--color-brand-primary, #7c3aed)',
  'error':        'var(--color-status-error,  #dc2626)',
};

// ── Gallery story ─────────────────────────────────────────────────────────────

export const AllIcons = {
  name: 'All Icons — Initial Batch',
  parameters: {
    docs: {
      description: {
        story: 'All 17 icons in the initial local batch. Use controls to adjust size, color, and theme. Status badges indicate Figma verification level.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 12, max: 48, step: 4 },
      description: 'Icon render size (px). All icons use a 24×24 viewBox.',
      defaultValue: 24,
    },
    colorToken: {
      control: { type: 'select' },
      options: Object.keys(COLOR_OPTIONS),
      description: 'Color applied to icon container (inherits via currentColor).',
      defaultValue: 'currentColor',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme mode — wraps gallery in data-theme="dark".',
      defaultValue: 'light',
    },
    filterStatus: {
      control: { type: 'select' },
      options: ['all', 'verified', 'extracted', 'derived', 'placeholder'],
      description: 'Filter icons by verification status.',
      defaultValue: 'all',
    },
  },
  args: {
    size: 24,
    colorToken: 'currentColor',
    theme: 'light',
    filterStatus: 'all',
  },
  render: ({ size, colorToken, theme, filterStatus }) => {
    const [search, setSearch] = useState('');
    const color = COLOR_OPTIONS[colorToken] || 'inherit';

    const filtered = manifest.icons.filter((entry) => {
      const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        entry.exportName.toLowerCase().includes(q) ||
        entry.canonicalName.toLowerCase().includes(q) ||
        (entry.notes || '').toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });

    const gallery = (
      <div style={{ padding: 24, fontFamily: 'var(--font-family-body, system-ui, sans-serif)' }}>

        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: theme === 'dark' ? '#f5f5f5' : '#171717' }}>
            Icon Foundation — Initial Local Batch
          </h2>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: theme === 'dark' ? '#a3a3a3' : '#737373' }}>
            {manifest.icons.length} icons · <strong>Not the complete product-used set.</strong> ~41 additional icons pending Figma audit/export pass.
          </p>
          <input
            type="text"
            placeholder="Search by name or tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: 240,
              padding: '6px 10px',
              fontSize: 12,
              border: `1px solid ${theme === 'dark' ? '#3f3f46' : '#d4d4d4'}`,
              borderRadius: 6,
              background: theme === 'dark' ? '#27272a' : '#fff',
              color: theme === 'dark' ? '#f5f5f5' : '#171717',
              outline: 'none',
            }}
          />
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 12,
          }}
        >
          {filtered.map((entry) => {
            const IconComponent = Icons[entry.exportName];
            const statusCfg = STATUS_CONFIG[entry.status] || STATUS_CONFIG.blocked;
            return (
              <div
                key={entry.exportName}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 8px 12px',
                  border: `1px solid ${theme === 'dark' ? '#3f3f46' : '#e5e5e5'}`,
                  borderRadius: 8,
                  background: theme === 'dark' ? '#1c1c1e' : '#fff',
                }}
              >
                {/* Icon */}
                <div style={{ color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {IconComponent ? (
                    <IconComponent width={size} height={size} />
                  ) : (
                    <div
                      style={{
                        width: size,
                        height: size,
                        border: '1px dashed #dc2626',
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 9,
                        color: '#dc2626',
                      }}
                    >
                      ?
                    </div>
                  )}
                </div>

                {/* Export name */}
                <div style={{ fontSize: 11, fontWeight: 600, color: theme === 'dark' ? '#e5e5e5' : '#171717', textAlign: 'center', wordBreak: 'break-word' }}>
                  {entry.exportName}
                </div>

                {/* Canonical name */}
                <div style={{ fontSize: 10, color: theme === 'dark' ? '#71717a' : '#a3a3a3', textAlign: 'center' }}>
                  {entry.canonicalName}
                </div>

                {/* Status badge */}
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: 99,
                    background: statusCfg.bg,
                    color: statusCfg.color,
                    letterSpacing: '0.02em',
                  }}
                >
                  {statusCfg.dot} {statusCfg.label}
                </div>

                {/* Node ID */}
                <div style={{ fontSize: 9, color: theme === 'dark' ? '#52525b' : '#c4c4c4', fontFamily: 'monospace' }}>
                  {entry.nodeId ? `node ${entry.nodeId}` : 'node unknown'}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: theme === 'dark' ? '#71717a' : '#a3a3a3', fontSize: 13 }}>
            No icons match the current filter.
          </div>
        )}

        {/* Future expansion note */}
        <div style={{
          marginTop: 32,
          padding: '12px 16px',
          background: theme === 'dark' ? '#1c1c1e' : '#fafafa',
          border: `1px solid ${theme === 'dark' ? '#3f3f46' : '#e5e5e5'}`,
          borderRadius: 8,
          fontSize: 11,
          color: theme === 'dark' ? '#a3a3a3' : '#737373',
          lineHeight: 1.6,
        }}>
          <strong style={{ color: theme === 'dark' ? '#e5e5e5' : '#404040' }}>Future expansion:</strong>{' '}
          {manifest.futureExpansion.remainingCount} additional product-used icons are not yet available locally.
          They require a separate <strong>Figma icon audit/export pass</strong> to enumerate, verify, and extract
          into <code>src/icons/</code>. Do not add icons without Figma node verification.
        </div>
      </div>
    );

    return theme === 'dark' ? (
      <div data-theme="dark" style={{ background: '#09090b', minHeight: '100vh' }}>
        {gallery}
      </div>
    ) : (
      <div style={{ background: '#f9f9f9', minHeight: '100vh' }}>
        {gallery}
      </div>
    );
  },
};

// ── QA view — non-verified icons ─────────────────────────────────────────────

export const NeedsVerification = {
  name: 'QA — Needs Verification',
  parameters: {
    docs: {
      description: {
        story: 'Icons that are **not** fully verified from Figma: `derived` (path inferred) and `placeholder` (temporary geometry). These must be updated before the Icon Foundation is considered production-ready.',
      },
    },
    controls: { disable: true },
  },
  render: () => {
    const flagged = manifest.icons.filter(
      (e) => e.status === 'derived' || e.status === 'placeholder',
    );

    return (
      <div style={{ padding: 24, fontFamily: 'var(--font-family-body, system-ui, sans-serif)' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#171717' }}>
          Icons Needing Figma Verification
        </h2>
        <p style={{ margin: '0 0 20px', fontSize: 12, color: '#737373' }}>
          {flagged.length} icon{flagged.length !== 1 ? 's' : ''} with non-verified status. Query Figma node IDs listed below to replace with real paths.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
              <th style={{ textAlign: 'left', padding: '6px 12px', color: '#404040' }}>Icon</th>
              <th style={{ textAlign: 'left', padding: '6px 12px', color: '#404040' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '6px 12px', color: '#404040' }}>Figma Node</th>
              <th style={{ textAlign: 'left', padding: '6px 12px', color: '#404040' }}>Risk</th>
              <th style={{ textAlign: 'left', padding: '6px 12px', color: '#404040' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {flagged.map((entry) => {
              const statusCfg = STATUS_CONFIG[entry.status];
              const risk = entry.status === 'placeholder' ? 'Medium — production use' : 'Low — divider only';
              return (
                <tr key={entry.exportName} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{entry.exportName}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <span style={{ background: statusCfg.bg, color: statusCfg.color, padding: '2px 6px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>
                      {statusCfg.dot} {statusCfg.label}
                    </span>
                  </td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: entry.nodeId ? '#404040' : '#dc2626' }}>
                    {entry.nodeId || 'unknown'}
                  </td>
                  <td style={{ padding: '8px 12px', color: '#737373' }}>{risk}</td>
                  <td style={{ padding: '8px 12px', color: '#737373', maxWidth: 320 }}>{entry.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
};
