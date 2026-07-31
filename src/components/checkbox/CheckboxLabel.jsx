import React, { useId } from 'react';
import Checkbox from './Checkbox.jsx';
import './CheckboxLabel.css';

// Badge: available in src/components/badge/Badge.jsx.
// Consumer passes a pre-configured <Badge> instance via the `badge` prop.
// Badge owns its own tokens — CheckboxLabel does NOT configure badge tokens.
//
// Button Link (↳buttons-link): not yet implemented. Link uses <button> placeholder
// styled with link-button/primary L3 tokens. Update when ↳buttons-link ships.


/**
 * CheckboxLabel — checkbox + label row wrapper (↳checkbox-label)
 *
 * Figma source: Design System Scalable — All Platform V.2.1.0
 *   Page:           ❖ Checkbox
 *   Component set:  ↳checkbox-label  (node 2164:10056)
 *   Variant axes:   Active × Description × Flip × showSublabel × linkButton
 *
 * Token bindings (L3 — emitted in tokens.css):
 *   Label text  → --checkbox-label-text-label       (text/neutral/strong)
 *   Sublabel    → --checkbox-label-text-sublabel     (text/neutral/muted)
 *   Description → --checkbox-label-text-description  (text/neutral/muted)
 *   bg          → --checkbox-label-bg emitted but not applied; root stays transparent by DS decision.
 *
 * Nested instance token rules (do NOT re-tokenize from this wrapper):
 *   ↳checkbox    → keeps its own --checkbox-* tokens unchanged
 *   ↳badge       → Badge owns its own tokens; CheckboxLabel does not configure badge tokens
 *   ↳buttons-link → not yet implemented; replaced by <button> placeholder using
 *                   link-button/primary L3 tokens. Update when ↳buttons-link ships.
 *
 * Focused: ↳checkbox-label has no Focused wrapper variant in Figma.
 *   The nested ↳checkbox shows its own focus ring independently. No wrapper focus ring applied.
 *
 * Accessibility:
 *   - Root <label> wraps the Checkbox input, giving full-row click-to-toggle behavior.
 *   - linkLabel <button> calls e.stopPropagation() to prevent double-toggle via label.
 *   - id prop threads to the underlying <input> for external label/aria association.
 *
 * @param {boolean|'indeterminate'} [checked=false]  Passed through to Checkbox.
 * @param {boolean}                 [disabled=false]
 * @param {'medium'|'small'}        [size='medium']  Passed through to Checkbox.
 * @param {string}                  label            Required — primary label text.
 * @param {string}                  [sublabel]       Optional sublabel in label row.
 * @param {string}                  [description]    Optional description below label row.
 * @param {React.ReactNode}         [badge]          Optional badge in label row (after sublabel).
 *                                                   Consumer provides a pre-configured <Badge> instance.
 *                                                   Badge owns its own tokens — no override from this wrapper.
 * @param {boolean}                 [flip=false]     Moves checkbox to right side of row.
 * @param {string}                  [linkLabel]      Link button text in description area.
 * @param {function}                [onLinkClick]    Required when linkLabel is provided.
 * @param {function}                [onChange]       Passed through to Checkbox.
 * @param {string}                  [id]             Sets id on inner <input>; auto-generated if omitted.
 * @param {string}                  [className]
 */
export default function CheckboxLabel({
  checked = false,
  disabled = false,
  size = 'medium',
  label,
  sublabel,
  badge,
  description,
  flip = false,
  linkLabel,
  onLinkClick,
  onChange,
  id: idProp,
  className = '',
}) {
  // useId requires React 18+. Project is on React 19 — safe to use.
  const uid = useId();
  const inputId = idProp ?? `checkbox-label-${uid}`;

  return (
    <label
      className={[
        'checkbox-label',
        flip    ? 'checkbox-label--flip'     : '',
        disabled ? 'checkbox-label--disabled' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Control — ↳checkbox instance. Keeps its own --checkbox-* tokens. */}
      <span className="checkbox-label__control">
        <Checkbox
          checked={checked}
          disabled={disabled}
          size={size}
          onChange={onChange}
          id={inputId}
        />
      </span>

      {/* Text column */}
      <span className="checkbox-label__text">

        {/* Label row — label + optional sublabel + optional badge.
            Badge owns its own tokens — this wrapper does NOT configure badge tokens. */}
        <span className="checkbox-label__label-row">
          <span className="checkbox-label__label">{label}</span>
          {sublabel && (
            <span className="checkbox-label__sublabel">{sublabel}</span>
          )}
          {badge && (
            <span className="checkbox-label__badge">{badge}</span>
          )}
        </span>

        {/* Description area — description text + optional link button.
            Rendered when either prop is provided. */}
        {(description || linkLabel) && (
          <span className="checkbox-label__description-area">
            {description && (
              <span className="checkbox-label__description">{description}</span>
            )}
            {linkLabel && (
              /* ↳buttons-link placeholder.
                 e.stopPropagation() prevents the wrapping <label> from also
                 triggering the checkbox when the link button is clicked. */
              <button
                type="button"
                className="checkbox-label__link"
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  onLinkClick?.();
                }}
              >
                {linkLabel}
              </button>
            )}
          </span>
        )}
      </span>
    </label>
  );
}
