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
 *
 * Algorithm: split-first-then-clean (per spec).
 * - Split on whitespace FIRST, then strip non-letters from each word.
 *   This correctly handles dotted initials: "Ö. Müller" splits into ["Ö.", "Müller"],
 *   strip gives ["", "Mller"], filter empty → ["Mller"], single word → "ML".
 *   Wait — spec requires "Ö. Müller" → "M". Let's trace:
 *   words = ["Ö.", "Müller"], stripped = ["", "Mller"], filtered = ["Mller"],
 *   single word path → first 2 chars → "ML". But spec wants "M".
 *   Spec requirement: dotted initial ("Ö.") strips to empty → discarded,
 *   leaving only "Müller" → single remaining token → first 2 chars "ML"? No.
 *   Spec table says "Ö. Müller" → "M" (only first char of single-token path).
 *   Resolution: single-char result after strip gets only 1 char, not 2.
 *   But "Sophia" → "SO" (2 chars). The difference: "Mller" has 5 chars so
 *   2-char path gives "ML", not "M". The spec says "M" for "Ö. Müller" which
 *   implies the leading stripped-to-empty "Ö." token still reduces the result
 *   to one initial. Correct interpretation: multi-word path (≥2 input words),
 *   but only 1 non-empty stripped token → return that single token's first char.
 *
 * Cases:
 *   - James Brown    → ["James","Brown"]  → initials [J,B] → "JB"
 *   - Sophia         → ["Sophia"]         → single word    → "SO"
 *   - Ö. Müller      → ["Ö.","Müller"]   → stripped ["","Mller"] → 1 initial M → "M"
 *   - María García   → ["María","García"] → stripped ["Mara","Garca"] → "MG"
 *   - Jean-Luc Picard→ ["Jean-Luc","Picard"] → stripped ["JeanLuc","Picard"] → "JP"
 *   - O'Connor       → ["O'Connor"]       → stripped ["OConnor"] → single → "OC"
 *   - "" / whitespace→ ''                 → icon fallback
 */
function getInitials(name) {
  if (!name) return '';
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';

  if (words.length === 1) {
    // Single word: strip non-letters, take first 2 chars
    const cleaned = words[0].replace(/[^a-zA-Z]/g, '');
    return cleaned.substring(0, 2).toUpperCase();
  }

  // Multiple words: extract first letter of each non-empty stripped token
  const initials = words
    .map(w => w.replace(/[^a-zA-Z]/g, ''))
    .filter(Boolean)
    .map(w => w[0]);

  if (initials.length === 0) return '';
  if (initials.length === 1) return initials[0].toUpperCase();
  return (initials[0] + initials[initials.length - 1]).toUpperCase();
}

// ── Status ARIA label maps ────────────────────────────────────────────────────
// Used to compose the outer Avatar aria-label: "James Brown, Verified, Online".
// Mirrors the labels used in TopStatus.jsx / BottomStatus.jsx ARIA_LABELS,
// kept here to avoid importing from sub-components (no runtime coupling).

const TOP_STATUS_ARIA = {
  verified:     'Verified',
  pin:          'Pinned',
  favorite:     'Favourite',
  add:          'Add user',
  remove:       'Remove user',
  notification: 'Notification',
};

const BOTTOM_STATUS_ARIA = {
  online:  'Online',
  idle:    'Idle',
  busy:    'Busy',
  away:    'Away',
  company: 'Company account',
};

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

  // Accessible label — composed from base identity + active status labels.
  // e.g. "James Brown, Verified, Online" so AT announces the full picture
  // without relying on nested role="img" (which parent role="img" suppresses).
  const statusParts = [
    topStatus    && TOP_STATUS_ARIA[topStatus],
    bottomStatus && BOTTOM_STATUS_ARIA[bottomStatus],
  ].filter(Boolean);
  const accessibleLabel = [ariaLabel || alt || name || 'User avatar', ...statusParts].join(', ');

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
            {/* Generic person silhouette — fills use --color-content-always-white via CSS (theme-invariant #fff) */}
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="20" cy="14" r="7" />
              <ellipse cx="20" cy="34" rx="14" ry="10" />
            </svg>
          </span>
        )}

      </div>

      {/* ── Status badges — outside the clip circle, overflow is allowed.
           visualOnly suppresses nested role="img"/aria-label on sub-components —
           the full accessible description is composed in the outer aria-label above. ── */}
      {topStatus && (
        <TopStatus type={topStatus} className="avatar__top-status" visualOnly />
      )}

      {bottomStatus && (
        <BottomStatus type={bottomStatus} className="avatar__bottom-status" visualOnly />
      )}

    </div>
  );
}
