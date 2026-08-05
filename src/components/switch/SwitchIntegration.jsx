import React, { useState } from 'react';
import Switch from './Switch';
import Badge from '../badge/Badge';
import Button from '../button/Button';
import './SwitchIntegration.css';

/**
 * SwitchIntegration — ↳switch-integration
 *
 * Figma source: Design System Scalable — All Platform V.2.1.0
 *   Page:           ❖ Switch
 *   Component set:  ↳switch-integration (node 2278:30)
 *   Total variants: 4 (2 types × 2 styles)
 *   DS version:     v2.1.0
 *
 * Composite integration row for app/service toggle use-cases.
 * Displays a brand logo pill, title, description, optional link button,
 * and a Switch toggle.
 *
 * Variant axes:
 *   🧩 Type:  horizontal | vertical
 *   🏵️ Style: card | list
 *
 * Horizontal+Card (2278:31): bordered card row. Switch in-flow at right.
 *   Brand logo: 24×24px target inside pill (40px pill total).
 *   Typography: body/medium/md (14px) title, caption/regular (12px) description.
 *
 * Horizontal+List (2278:41): naked row, no card chrome. Switch in-flow at right.
 *   Brand logo: 32×32px target inside pill (48px pill total).
 *   Typography: body/medium/lg (16px) title, body/regular/md (14px) description.
 *
 * Vertical+Card (2278:51): bordered card column. Switch positioned absolute top-right.
 *   Brand logo: 24×24px target. Link button: full-width.
 *
 * Vertical+List (2278:61): naked column. Switch positioned absolute top-right.
 *   Brand logo: 32×32px target. Link button: full-width.
 *
 * Token chain: L1 --prim-* → L2 --color-* → L3 --switch-card-*
 * Figma reuses --switch-card/* token namespace for container styling.
 * No --switch-integration/* namespace exists in the DS.
 * No new L3 tokens required — all tokens already present in tokens.css.
 *
 * Nested component boundary:
 *   Switch (↳switch): nested instance — do not rebuild internals.
 *   Badge (↳badge): nested instance — do not rebuild internals.
 *   No SwitchCard or SwitchLabel nested — SwitchIntegration owns its own layout.
 *
 * Switch override strategy (same as SwitchCard):
 *   --switch-track-off and --switch-knob-bg are redefined at .switch-integration scope
 *   in SwitchIntegration.css so the nested Switch uses card-context colors without
 *   modifying the atomic Switch component. See Switch.jsx override note.
 *
 * Link button:
 *   Uses the existing Button component (neutral / outline / size-responsive).
 *   Horizontal variants: size="small". Vertical variants: size="medium".
 *   Consumer supplies linkIcon (ReactNode) forwarded to Button's icon prop.
 *   Default label: "Manage".
 *
 * Accessibility:
 *   Root is a <div>, NOT a <label>. The link button is a separate interactive element;
 *   using <label> for the root would cause link button clicks to also toggle the Switch.
 *   Switch gets aria-labelledby pointing to the title span for a precise accessible name.
 *   Disabled: forwarded to Switch + HTML disabled on link button.
 *
 * @param {'horizontal'|'vertical'} [type='horizontal']   Layout direction.
 * @param {'card'|'list'}           [style='card']        Visual chrome.
 * @param {string}                  [title='']            Primary label text.
 * @param {string}                  [description]         Body text below title.
 * @param {boolean|string}          [badge]               Badge — true → "NEW", string → custom.
 * @param {React.ReactNode}         [brandAsset]          Brand logo inside the pill.
 * @param {boolean}                 [showBrand=true]      Show/hide brand pill.
 * @param {string}                  [linkLabel='Manage']  Link button text label.
 * @param {React.ReactNode}         [linkIcon]            Icon in link button (optional).
 * @param {function}                [onLinkClick]         Click handler for link button.
 * @param {boolean}                 [showLink=true]       Show/hide link button.
 * @param {boolean}                 [checked]             Controlled switch state.
 * @param {boolean}                 [defaultChecked]      Initial uncontrolled state.
 * @param {boolean}                 [disabled=false]      Disables switch + link button.
 * @param {function}                [onChange]            Switch change handler.
 * @param {boolean}                 [showSwitch=true]     Show/hide switch.
 * @param {string}                  [switchId]            ID for Switch <input>.
 * @param {string}                  [id]                  ID on root <div>.
 * @param {string}                  [className='']        Extra class names on root.
 */

const VALID_TYPES  = ['horizontal', 'vertical'];
const VALID_STYLES = ['card', 'list'];

export default function SwitchIntegration({
  type = 'horizontal',
  style = 'card',
  title = '',
  description,
  badge,
  brandAsset,
  showBrand = true,
  linkLabel = 'Manage',
  linkIcon,
  onLinkClick,
  showLink = true,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  showSwitch = true,
  switchId,
  id,
  className = '',
}) {
  // ── Controlled / uncontrolled state ────────────────────────────────────────
  // SwitchIntegration always drives Switch in controlled mode internally.
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
  // titleId  — id on the title span; Switch uses aria-labelledby for its
  //            accessible name.
  // resolvedSwitchId — id on the Switch <input>; allows external label
  //                    association. Uses caller-supplied switchId when provided.
  const uid = React.useId();
  const titleId          = `${uid}-title`;
  const resolvedSwitchId = switchId ?? `${uid}-switch`;

  // ── Type + style guards ────────────────────────────────────────────────────
  const safeType  = VALID_TYPES.includes(type)   ? type  : 'horizontal';
  const safeStyle = VALID_STYLES.includes(style) ? style : 'card';

  // ── Badge ──────────────────────────────────────────────────────────────────
  // Figma: basic type · lighter style · blue color · small size.
  const showBadge  = Boolean(badge);
  const badgeLabel = typeof badge === 'string' ? badge : 'NEW';

  // ── Root class ─────────────────────────────────────────────────────────────
  const rootClass = [
    'switch-integration',
    `switch-integration--${safeType}`,
    `switch-integration--${safeStyle}`,
    disabled ? 'switch-integration--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    // Root is <div>, NOT <label htmlFor>.
    // The link button (↳buttons-link) is a separate interactive element inside
    // the component. Using <label> would cause link button clicks to also activate
    // the Switch, producing incorrect double-interaction behavior.
    // Switch gets aria-labelledby so it has a precise accessible name from the title.
    <div
      id={id}
      className={rootClass}
      data-checked={isChecked ? true : undefined}
      data-disabled={disabled ? true : undefined}
    >
      {/* Brand pill ─────────────────────────────────────────────────────── */}
      {/* Figma: rounded pill with bg + border + shadow + 8px padding.
          Logo size target: 24px (Card) or 32px (List) — CSS-controlled via
          .switch-integration--card/list .switch-integration__brand > *.
          aria-hidden: decorative visual; title text is the accessible name.     */}
      {showBrand && brandAsset && (
        <div className="switch-integration__brand" aria-hidden="true">
          {brandAsset}
        </div>
      )}

      {/* Text content ──────────────────────────────────────────────────── */}
      {/* Horizontal: flex-1 grows to fill space between brand, link, and switch.
          Vertical: full width (Switch is absolutely positioned, out of flow).   */}
      <div className="switch-integration__content">

        {/* Title row: title + badge (horizontal flex, gap 4px) */}
        <div className="switch-integration__title-row">
          <span id={titleId} className="switch-integration__title">
            {title}
          </span>
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
          <p className="switch-integration__description">{description}</p>
        )}

      </div>

      {/* Link button ────────────────────────────────────────────────────── */}
      {/* Figma now uses the general Button component, neutral style.
          size: small for horizontal variants, medium for vertical variants.
          Vertical: .switch-integration__link-btn CSS enforces width: 100%.
          icon: linkIcon ReactNode (no default — do not create new assets).       */}
      {showLink && (
        <Button
          type="neutral"
          variant="outline"
          size={safeType === 'vertical' ? 'medium' : 'small'}
          disabled={disabled}
          onClick={onLinkClick}
          icon={linkIcon || undefined}
          className="switch-integration__link-btn"
        >
          {linkLabel}
        </Button>
      )}

      {/* Switch ─────────────────────────────────────────────────────────── */}
      {/* Horizontal: in document flow at the far right (natural flex order).
          Vertical:   position: absolute, pinned to top-right corner of card.
            Card: top/right = 19px (border 1px + padding 16px + 2px visual inset).
            List: top/right = 12px (no padding/border — direct margin from edge).
          aria-labelledby references the title span for a precise accessible name. */}
      {showSwitch && (
        <Switch
          id={resolvedSwitchId}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-labelledby={titleId}
          className="switch-integration__switch"
        />
      )}
    </div>
  );
}
