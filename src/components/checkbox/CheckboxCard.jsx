import React from 'react';
import Checkbox from './Checkbox.jsx';
import KeyIcon from '../key-component/KeyIcon.jsx';
import './CheckboxCard.css';

// Nested instance inventory (Figma ↳checkbox-card):
//   ↳checkbox      — implemented ✅ (Checkbox.jsx)
//   ↳badge         — Badge.jsx available ✅. Consumer passes pre-configured <Badge> via `badge` prop.
//   Key Icons [1.1]— implemented ✅ (KeyIcon.jsx, type="left-icon")
//   ↳avatar        — Avatar.jsx available ✅. Consumer provides as ReactNode via `avatar` prop.
//   ↳buttons-link  — not present in CheckboxCard anatomy.
//   Provider/Brand/Company — asset slots; colors are asset-owned.


/**
 * CheckboxCard — rich selectable card with trailing checkbox (↳checkbox-card)
 *
 * Figma source: Design System Scalable — All Platform V.2.1.0
 *   Page:           ❖ Checkbox
 *   Component set:  ↳checkbox-card  (node 2166:660)
 *   Total variants: 24 (6 types × 4 states: Default / Hover / Active / Disabled)
 *
 * Token bindings (L3 — emitted in tokens.css):
 *   Card bg       → --checkbox-card-bg-{default|hover|active|disabled}
 *   Card border   → --checkbox-card-border-{default|hover|active|disabled}
 *   Label text    → --checkbox-card-text-label
 *   Sublabel text → --checkbox-card-text-sublabel
 *   Description   → --checkbox-card-text-description
 *   Card radius   → --radius-12
 *
 * Shadow: Default state → box-shadow: var(--shadow-regular-xsmall).
 *   DS owner confirmed 2026-07-31: Effect Style 'regular-shadow/x-small' binds to
 *   color/alpha/black/4 (rgba(23,23,23,0.04)), matching --shadow-regular-xsmall.
 *   Disabled state: box-shadow: none (Effect Style absent from Disabled variants in Figma).
 *
 * Hover: Background-only per Figma. No border change on hover (Hover card has no stroke).
 *
 * Focused: No Focused wrapper variant in Figma. Browser default outline preserved.
 *   The nested Checkbox shows its own focus ring independently.
 *
 * MUST NOT use radio-card/* tokens — those belong to ↳radio-card component only.
 *
 * Nested instance rules (do NOT re-tokenize from this wrapper):
 *   ↳checkbox  → trailing visual/control; keeps its own --checkbox-* tokens unchanged.
 *   ↳badge     → consumer passes pre-configured <Badge> via `badge` prop.
 *                Badge owns its own tokens — CheckboxCard does NOT configure badge tokens.
 *   ↳avatar    → consumer provides as ReactNode; Avatar owns its own tokens.
 *   Key Icons  → rendered via KeyIcon component; KeyIcon owns its own tokens.
 *   Provider/Brand/Company assets → asset-owned colors; do NOT re-tokenize.
 *
 * Accessibility:
 *   - role="checkbox" on card root — card is one selectable control.
 *   - aria-checked reflects checked state.
 *   - aria-disabled on disabled cards.
 *   - Space and Enter toggle the card (onKeyDown handler).
 *   - tabIndex={-1} on disabled cards (not keyboard-reachable).
 *   - Trailing Checkbox wrapped in aria-hidden="true" — hidden from AT;
 *     card root is the authoritative checkbox for screen readers.
 *
 * @param {boolean}    [checked=false]
 * @param {boolean}    [disabled=false]
 * @param {'basic'|'left-icon'|'avatar'|'card-provider'|'brand'|'company'} [type='basic']
 * @param {string}     label              Required — primary label text.
 * @param {string}     [sublabel]         Optional sublabel in title row.
 * @param {string}     [description]      Optional description below title row.
 * @param {React.ReactNode} [badge]       Optional badge in title row (after sublabel).
 *                                        Consumer provides a pre-configured <Badge> instance.
 *                                        Badge owns its own tokens — no override from this wrapper.
 * @param {React.ReactNode} [icon]        type='left-icon' — passed to KeyIcon as inner icon.
 * @param {React.ReactNode} [avatar]      type='avatar'    — Avatar component or ReactNode.
 * @param {React.ReactNode} [providerAsset] type='card-provider' — Mastercard SVG or ReactNode.
 * @param {React.ReactNode} [brandAsset]  type='brand'     — Brand SVG or ReactNode.
 * @param {React.ReactNode} [companyAsset] type='company'  — Company SVG or ReactNode.
 * @param {function}   [onChange]         Receives new boolean checked value.
 * @param {string}     [className]
 */
export default function CheckboxCard({
  checked = false,
  disabled = false,
  type = 'basic',
  label,
  sublabel,
  badge,
  description,
  icon,
  avatar,
  providerAsset,
  brandAsset,
  companyAsset,
  onChange,
  className = '',
}) {
  const handleClick = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const handleKeyDown = (e) => {
    if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  // ── Left slot — varies by type ──────────────────────────────────────────────
  //
  // Asset color rule: do NOT apply fill tokens to provider/brand/company assets.
  // Asset-owned colors must be preserved as-is (see handoff brief Section 10).

  let leftSlot = null;

  if (type === 'left-icon' && icon) {
    // Key Icons [1.1] shell — KeyIcon owns its own tokens; do NOT re-tokenize.
    // style="stroke" and color="gray" are defaults matching Figma. Consumer may
    // override by wrapping icon in a pre-configured KeyIcon if needed.
    leftSlot = (
      <span className="checkbox-card__left checkbox-card__left--icon">
        <KeyIcon
          size="m"
          style="stroke"
          color="gray"
          icon={icon}
          aria-hidden
        />
      </span>
    );
  } else if (type === 'avatar' && avatar) {
    // ↳avatar — Avatar component owns all its tokens; render as-is.
    leftSlot = (
      <span className="checkbox-card__left checkbox-card__left--avatar">
        {avatar}
      </span>
    );
  } else if (type === 'card-provider' && providerAsset) {
    // Card Provider — 24×32px container, border-radius: var(--radius-4).
    // bg: #252525 is asset-owned by DS design decision. No DS token for this value.
    // See CheckboxCard.css .checkbox-card__left--provider.
    leftSlot = (
      <span className="checkbox-card__left checkbox-card__left--provider">
        {providerAsset}
      </span>
    );
  } else if (type === 'brand' && brandAsset) {
    // Brand SVG — 40×40px, no containing frame or bg. Asset colors are brand-specific.
    leftSlot = (
      <span className="checkbox-card__left checkbox-card__left--brand">
        {brandAsset}
      </span>
    );
  } else if (type === 'company' && companyAsset) {
    // Company SVG — 40×40px circular container. bg is brand-specific primitive (not tokenized).
    leftSlot = (
      <span className="checkbox-card__left checkbox-card__left--company">
        {companyAsset}
      </span>
    );
  }

  // ── Class names ─────────────────────────────────────────────────────────────
  const cardClasses = [
    'checkbox-card',
    `checkbox-card--${type}`,
    checked   ? 'checkbox-card--checked'  : '',
    disabled  ? 'checkbox-card--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled ? true : undefined}
      tabIndex={disabled ? -1 : 0}
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Left slot — rendered when type !== 'basic' and asset/icon provided */}
      {leftSlot}

      {/* Content — label, sublabel, badge, description */}
      <span className="checkbox-card__content">
        <span className="checkbox-card__title-row">
          <span className="checkbox-card__label">{label}</span>
          {sublabel && (
            <span className="checkbox-card__sublabel">{sublabel}</span>
          )}
          {badge && (
            /* Badge slot — Badge owns its own tokens; no override here. */
            <span className="checkbox-card__badge">{badge}</span>
          )}
        </span>
        {description && (
          <span className="checkbox-card__description">{description}</span>
        )}
      </span>

      {/* Trailing checkbox — visual only.
          aria-hidden="true" removes it from the AT accessibility tree.
          The card root (role="checkbox", aria-checked) is the authoritative control.
          tabIndex={-1} prevents independent keyboard focus on the nested input.
          onChange={() => {}} is a no-op; card root handles all interaction. */}
      <span className="checkbox-card__trailing" aria-hidden="true">
        <Checkbox
          checked={checked}
          disabled={disabled}
          size="medium"
          onChange={() => {}}
          tabIndex={-1}
        />
      </span>
    </div>
  );
}
