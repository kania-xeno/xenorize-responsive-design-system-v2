/**
 * Avatar — Display-only component
 *
 * DS Source: Design System Scalable — All Platform V.2.1.0
 * Figma component set: 2107:27, page ❖ Avatar
 * Handoff: design-system-handsoff/component-avatar-handoff-brief.md
 * Last updated: 25/06/2026
 *
 * DOM structure:
 *   .avatar              — outer wrapper (position:relative; overflow:visible)
 *     .avatar__circle    — inner circle (overflow:hidden; border-radius:full) — clips content only
 *       img / initials / icon
 *     <TopStatus>        — positioned absolute, overflows outside circle
 *     <BottomStatus>     — positioned absolute, overflows outside circle
 *
 * Content mode priority (automatic fallback chain):
 *   1. image  — src prop is present
 *   2. text   — name prop is present (initials derived)
 *   3. icon   — generic silhouette (last resort)
 *
 * Status badges delegate to <TopStatus> and <BottomStatus> DS components.
 * All 9 sizes support status badges (no suppression at 24 or 20).
 * Interactive avatar behaviour is out of scope for V1 — wrap in <button>/<a> at product level.
 */

import './Avatar.css';
import TopStatus    from './TopStatus.jsx';
import BottomStatus from './BottomStatus.jsx';

// ── Initials derivation ──────────────────────────────────────────────────────

/**
 * Derives initials from a display name.
 * - Two+ words: first initial + last initial (e.g. "James Brown" → "JB")
 * - Single word: first 2 letters (e.g. "Phoenix" → "PH")
 * - Symbols/special characters are stripped before processing.
 * - Result is always uppercase, max 2 characters.
 */
function getInitials(name) {
  if (!name) return '';
  const cleaned = name.replace(/[^a-zA-Z\s]/g, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * @param {object}  props
 * @param {string}  [props.src]          — Image URL. When present → image mode.
 * @param {string}  [props.name]         — User display name. Used to derive initials when no src.
 * @param {number}  [props.size=48]      — Avatar size in px: 80|72|64|56|48|40|32|24|20
 * @param {boolean} [props.solidBg=false]— Opaque surface/neutral/weak background (for coloured surfaces)
 * @param {string}  [props.topStatus]    — verified|pin|favorite|add|remove|notification
 * @param {string}  [props.bottomStatus] — online|idle|busy|away|company
 * @param {string}  [props.alt]          — Alt text for image mode. Falls back to name.
 * @param {string}  [props['aria-label']]— Overrides all accessible label derivation.
 * @param {string}  [props.className]    — Extra class names on the outer wrapper.
 */
export default function Avatar({
  src,
  name,
  size = 48,
  solidBg = false,
  topStatus,
  bottomStatus,
  alt,
  'aria-label': ariaLabel,
  className = '',
}) {
  // Content mode — priority chain: image → text → icon
  const hasImage    = Boolean(src);
  const initials    = getInitials(name);
  const hasText     = initials.length > 0;
  const contentMode = hasImage ? 'image' : hasText ? 'text' : 'icon';

  // Accessible label
  const accessibleLabel = ariaLabel || alt || name || 'User avatar';

  // Outer wrapper classes (overflow: visible — allows badges to protrude)
  const outerClasses = [
    'avatar',
    `avatar--size-${size}`,
    `avatar--${contentMode}`,
    solidBg ? 'avatar--solid-bg' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={outerClasses} role="img" aria-label={accessibleLabel}>

      {/* ── Inner circle — clips content to circle shape.
           overflow:hidden lives here, NOT on the outer wrapper. ── */}
      <div className="avatar__circle">

        {contentMode === 'image' && (
          <img
            src={src}
            alt=""
            className="avatar__image"
          />
        )}

        {contentMode === 'text' && (
          <span className="avatar__initials" aria-hidden="true">
            {initials}
          </span>
        )}

        {contentMode === 'icon' && (
          <span className="avatar__icon" aria-hidden="true">
            {/* Generic person silhouette — fills use --color-surface-neutral-white via CSS */}
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="20" cy="14" r="7" />
              <ellipse cx="20" cy="34" rx="14" ry="10" />
            </svg>
          </span>
        )}

      </div>

      {/* ── Status badges — outside the clip circle, overflow is allowed ── */}
      {topStatus && (
        <TopStatus type={topStatus} className="avatar__top-status" />
      )}

      {bottomStatus && (
        <BottomStatus type={bottomStatus} className="avatar__bottom-status" />
      )}

    </div>
  );
}
