import React, { useState } from 'react';
import Switch from './Switch';
import Badge from '../badge/Badge';
import Avatar from '../avatar/Avatar';
import KeyIcon from '../key-component/KeyIcon';
import MastercardLogo from '../../assets/logos/Mastercard';
import TripAdvisorLogo from '../../assets/logos/TripAdvisor';
import CatalystLogo from '../../assets/logos/Catalyst';
import './SwitchCard.css';

/**
 * SwitchCard — ↳switch-card
 *
 * Figma node: 2278:136 · Page: ❖ Switch · DS v2.1.0
 *
 * Composite card wrapping an atomic ↳switch toggle.
 * 6 types × 4 states. Horizontal layout: left-slot → text content → switch.
 *
 * Token chain: L1 --prim-* → L2 --color-* → L3 --switch-card-*
 * All colors reference --switch-card-* tokens only. No hardcoded DS colors.
 *
 * Nested component token boundary — do NOT re-tokenize internals:
 *   - Badge: badge/* namespace
 *   - KeyIcon: key-icon/* namespace
 *   - Avatar: avatar/* namespace
 *   - Logos: asset-owned brand colors
 *
 * Switch override strategy:
 *   --switch-track-off and --switch-knob-bg are redefined at .switch-card scope
 *   in SwitchCard.css so the nested ↳switch uses card-context colors without
 *   modifying the atomic Switch component. No cardMode prop was added to Switch.
 *   See Switch.jsx override note.
 *
 * Shadow: Default state uses --shadow-below-sm (0 1px 2px 0 rgba(23,23,23,0.04)).
 *   Confirmed exact match to Figma Default state effect (color/alpha/black/4,
 *   offset 0 1, radius 2, spread 0).
 */

const VALID_TYPES = ['basic', 'left-icon', 'avatar', 'card-provider', 'brand', 'company'];

export default function SwitchCard({
  /**
   * Card type — controls which left-slot asset is rendered.
   * 'basic' | 'left-icon' | 'avatar' | 'card-provider' | 'brand' | 'company'
   */
  type = 'basic',

  /** Primary label — displayed as the card heading. */
  label = '',

  /** Sublabel — secondary inline text in the title row, next to the label. */
  sublabel,

  /** Description — body text below the title row. */
  description,

  /**
   * Badge — true to show the default "NEW" blue lighter badge,
   * or a string to use a custom badge label.
   * false/undefined → badge is hidden.
   */
  badge,

  // ── Switch state ─────────────────────────────────────────────────────────

  /** Controlled checked state. When provided, SwitchCard is a controlled component. */
  checked,

  /** Initial checked state for uncontrolled usage (default: false). */
  defaultChecked,

  /** Change handler — receives the native InputEvent from the Switch. */
  onChange,

  /** Disabled — forwarded to the nested Switch and applies Disabled card styles. */
  disabled = false,

  // ── Left-slot assets ─────────────────────────────────────────────────────

  /**
   * type="left-icon" — icon element rendered inside the KeyIcon container.
   * Must use currentColor for its fill (KeyIcon sets fill via CSS color inherit).
   */
  leftIcon,

  /**
   * type="avatar" — props spread onto <Avatar size={40} />.
   * Accepts: src, name, solidBg, topStatus, bottomStatus, alt, aria-label.
   * Note: size is fixed at 40 per DS spec and cannot be overridden here.
   */
  avatarProps,

  /**
   * type="brand" — custom brand logo element.
   * Defaults to <TripAdvisorLogo /> when not provided.
   */
  brandAsset,

  /**
   * type="company" — custom company logo element.
   * Defaults to <CatalystLogo /> when not provided.
   */
  companyAsset,

  /**
   * type="card-provider" — custom provider logo element.
   * Defaults to <MastercardLogo /> when not provided.
   */
  providerAsset,

  // ── DOM / a11y ────────────────────────────────────────────────────────────

  /** ID attribute on the card root <label> element. */
  id,

  /**
   * ID forwarded to the Switch <input> element.
   * The root <label> uses htmlFor to associate the full card click area with
   * this input. Auto-generated (stable per instance) when not provided.
   */
  switchId,

  /** Extra class names on the root element. */
  className = '',
}) {
  // ── Controlled / uncontrolled state ────────────────────────────────────────
  // SwitchCard always drives Switch in controlled mode internally.
  // Uncontrolled: local state tracks changes.
  // Controlled: checked prop is passed through unchanged.
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isChecked = isControlled ? checked : internalChecked;

  function handleChange(e) {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e);
  }

  // ── Stable IDs ────────────────────────────────────────────────────────────
  // uid is generated once per instance and never changes across renders.
  // labelId  — id on the visible label span; Switch uses aria-labelledby
  //            so the card label text is its accessible name.
  // resolvedSwitchId — id on the Switch <input>; the root <label> uses htmlFor
  //            to associate the full card click area with the input.
  //            Uses the caller-supplied switchId when provided.
  const uid = React.useId();
  const labelId          = `${uid}-label`;
  const resolvedSwitchId = switchId ?? `${uid}-switch`;

  // ── Type guard ─────────────────────────────────────────────────────────────
  const safeType = VALID_TYPES.includes(type) ? type : 'basic';

  // ── Left slot ──────────────────────────────────────────────────────────────
  // Absent for type="basic". The left-slot div is rendered only when non-null.
  let leftSlot = null;
  switch (safeType) {
    case 'left-icon':
      // KeyIcon: style=lighter, color=purple, size=m (40×40, padding 10, icon 20)
      // Figma: key-icon/lighter/bg/purple — #dad6f2 bg, purple icon fill.
      leftSlot = (
        <KeyIcon
          style="lighter"
          color="purple"
          size="m"
          icon={leftIcon ?? null}
        />
      );
      break;
    case 'avatar':
      // Avatar at size=40 (DS spec, not overridable via avatarProps).
      // avatarProps spreads src, name, solidBg, topStatus, bottomStatus, etc.
      leftSlot = (
        <Avatar
          {...(avatarProps || {})}
          size={40}
        />
      );
      break;
    case 'card-provider':
      // Default: Mastercard (32×24, includes dark bg + rounded corners in SVG).
      leftSlot = providerAsset ?? <MastercardLogo />;
      break;
    case 'brand':
      // Default: TripAdvisor (32×32 natural; CSS scales to 40×40 per Figma slot).
      leftSlot = brandAsset ?? <TripAdvisorLogo />;
      break;
    case 'company':
      // Default: Catalyst (40×40 natural size, fills slot exactly).
      leftSlot = companyAsset ?? <CatalystLogo />;
      break;
    default:
      leftSlot = null;
  }

  // ── Badge ──────────────────────────────────────────────────────────────────
  // Figma: basic type · lighter style · blue color · small size.
  const showBadge = Boolean(badge);
  const badgeLabel = typeof badge === 'string' ? badge : 'NEW';

  // ── Root class ─────────────────────────────────────────────────────────────
  const rootClass = [
    'switch-card',
    `switch-card--${safeType}`,
    disabled ? 'switch-card--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    // Root is <label htmlFor={resolvedSwitchId}> so the full card click area
    // activates the Switch input. This satisfies the requirement that SwitchCard
    // behaves as one selectable control.
    //
    // No double-toggle guard needed. Chrome (and modern browsers per HTML spec
    // §4.12.4.3) skip the label's secondary activation when the click originates
    // from the associated control — a single toggle fires in all scenarios.
    // Verified via browser test: cards with and without the guard produced
    // identical results (1 change event) for content-area and direct switch clicks.
    // Native label/input behavior is preferred per DS implementation policy.
    //
    // Disabled: a disabled <input> ignores label activation natively.
    // Future interactive children inside the card must stop propagation themselves.
    <label
      id={id}
      htmlFor={resolvedSwitchId}
      className={rootClass}
      data-checked={isChecked ? true : undefined}
      data-disabled={disabled ? true : undefined}
    >
      {/* Left slot — absent for type="basic" ─────────────────────────────── */}
      {/* aria-hidden: all left-slot visuals are decorative in the card context.
          The label text carries the accessible meaning.                       */}
      {leftSlot !== null && (
        <div className="switch-card__left-slot" aria-hidden="true">
          {leftSlot}
        </div>
      )}

      {/* Content ─────────────────────────────────────────────────────────── */}
      {/* Grows to fill horizontal space between left slot and switch.         */}
      <div className="switch-card__content">

        {/* Title row: label + sublabel + badge (horizontal, gap 4px) */}
        <div className="switch-card__title-row">
          <span id={labelId} className="switch-card__label">
            {label}
          </span>
          {sublabel && (
            <span className="switch-card__sublabel">{sublabel}</span>
          )}
          {showBadge && (
            <Badge
              type="basic"
              badgeStyle="lighter"
              color="blue"
              size="small"
              label={badgeLabel}
            />
          )}
        </div>

        {/* Description — below the title row */}
        {description && (
          <p className="switch-card__description">{description}</p>
        )}

      </div>

      {/* Switch ───────────────────────────────────────────────────────────── */}
      {/* Right-aligned, top-aligned per Figma items-start.
          id={resolvedSwitchId} ties this input to the root <label> via htmlFor.
          aria-labelledby references the label span for a precise accessible name
          (overrides the full label text content for AT).
          Controlled by SwitchCard state (isChecked) in all modes.            */}
      <Switch
        id={resolvedSwitchId}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        aria-labelledby={labelId}
        className="switch-card__switch"
      />
    </label>
  );
}
