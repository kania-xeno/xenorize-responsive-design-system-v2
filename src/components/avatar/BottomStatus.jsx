/**
 * BottomStatus — DS-sourced bottom-right status badge for Avatar
 *
 * DS Source: Design System Scalable — All Platform V.2.1.0
 * Figma component: BottomStatus (2107:2834)
 * Last updated: 25/06/2026
 *
 * Renders a scalable SVG badge using viewBox="0 0 32 32" with width/height="100%".
 * The container span is sized by Avatar.css via --_status-sz CSS custom property.
 * Positioning (absolute bottom/right) is applied by Avatar.css via .avatar__bottom-status.
 *
 * Types: online · idle · busy · away · company
 *
 * Badge anatomy (online/idle/busy/away):
 *   White Stroke circle: 20×20 centered at (6,6) → cx=16, cy=16, r=10
 *   Colored dot:         12×12 centered at (10,10) → cx=16, cy=16, r=6
 *
 * Company exception:
 *   White BG circle: 28×28 at (2,2) → cx=16, cy=16, r=14
 *   Inner icon: placeholder (Synergy brand icon — not available in V1)
 *   V1 renders white circle only; icon supply pending product-level integration.
 */

import './BottomStatus.css';

// ─── Accessible labels ───────────────────────────────────────────────────────

const ARIA_LABELS = {
  online:  'Online',
  idle:    'Idle',
  busy:    'Busy',
  away:    'Away',
  company: 'Company account',
};

// ─── Token map — colored dot per type ───────────────────────────────────────
// Source: avatar-spec.md § Bottom Status token reference

const DOT_TOKEN = {
  online:  '--status-success-base',      // success/green
  idle:    '--color-text-neutral-muted', // text/neutral/muted (not white — see spec)
  busy:    '--status-danger-base',       // danger/red
  away:    '--status-warning-base',      // warning/amber  (light: #684E00 · dark: #B28600)
};

// ─── SVG badge contents per type ────────────────────────────────────────────

function StatusDot({ tokenVar }) {
  return (
    <>
      {/* Stroke: always-white separation ring — content/always-white (#fff in all themes) · r=10 (20px visible) */}
      <circle cx="16" cy="16" r="10" fill="var(--color-content-always-white)" />
      {/* Colored dot — r=6 (12px visible) */}
      <circle cx="16" cy="16" r="6"  fill={`var(${tokenVar})`} />
    </>
  );
}

const BADGE_CONTENTS = {
  // Online — success/green dot
  online: () => <StatusDot tokenVar={DOT_TOKEN.online} />,

  // Idle — text/neutral/muted dot ("White Not" in Figma — muted gray, not white)
  idle: () => <StatusDot tokenVar={DOT_TOKEN.idle} />,

  // Busy — danger/red dot
  busy: () => <StatusDot tokenVar={DOT_TOKEN.busy} />,

  // Away — warning/amber dot
  away: () => <StatusDot tokenVar={DOT_TOKEN.away} />,

  // Company — white circle only in V1 (Synergy brand icon pending)
  // BG 28×28 at (2,2) → cx=16, cy=16, r=14
  // always-white bg — content/always-white (#fff in all themes). Designer decision 2026-08-26.
  company: () => (
    <circle cx="16" cy="16" r="14" fill="var(--color-content-always-white)" />
  ),
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * @param {object}  props
 * @param {'online'|'idle'|'busy'|'away'|'company'} props.type
 * @param {string}  [props.className]  — Additional class names (e.g. 'avatar__bottom-status' for positioning)
 * @param {boolean} [props.visualOnly] — When true, suppresses role="img" and aria-label, adds aria-hidden.
 *                                       Use ONLY when rendering inside <Avatar>: the outer role="img"
 *                                       composes the full label; a nested role="img" would be swallowed by AT.
 *                                       Standalone usage must NOT pass visualOnly.
 */
export default function BottomStatus({ type, className = '', visualOnly = false }) {
  if (!type || !BADGE_CONTENTS[type]) return null;

  const renderContents = BADGE_CONTENTS[type];
  const label = ARIA_LABELS[type] ?? type;

  // visualOnly: used inside Avatar — outer role="img" carries the full label;
  // nested role="img" is suppressed to avoid AT swallowing the inner label.
  const a11yProps = visualOnly
    ? { 'aria-hidden': true }
    : { role: 'img', 'aria-label': label };

  return (
    <span
      className={`bottom-status bottom-status--${type}${className ? ` ${className}` : ''}`}
      {...a11yProps}
    >
      <svg
        viewBox="0 0 32 32"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {renderContents()}
      </svg>
    </span>
  );
}
