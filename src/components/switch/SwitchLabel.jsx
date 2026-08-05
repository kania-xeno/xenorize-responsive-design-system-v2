import React, { useId } from 'react';
import Switch from './Switch.jsx';
import './SwitchLabel.css';

/**
 * SwitchLabel — switch + label row wrapper (↳switch-label)
 *
 * Figma source: Design System Scalable — All Platform V.2.1.0
 *   Page:           ❖ Switch
 *   Component set:  ↳switch-label  (node 2278:71)
 *   Total variants: 8 (Active × Description × Switch — 2×2×2)
 *   DS version:     v2.1.0
 *
 * Layer anatomy (Figma, layoutMode: HORIZONTAL, gap: 8px, counterAxisAlignItems: CENTER):
 *   Root wrapper   HORIZONTAL Auto Layout — gap 8px, CENTER, no padding
 *   ├─ ↳switch     nested instance (32×20px) — left when 🔄 Switch=Off, right when On
 *   └─ Content FRAME  VERTICAL, gap 10px
 *        ├─ Text FRAME  HORIZONTAL, gap 4px, CENTER
 *        │    ├─ Title  TEXT — label (Open Sans Regular 14px)
 *        │    └─ [sublabel / badge — not in Figma ↳switch-label, API forward-compat]
 *        └─ description TEXT — (Description=On only) Open Sans Regular 12px
 *
 * Fixed canvas: 300×20px (Description=Off) · 300×66px (Description=On)
 * Implement as width: 100% (canvas is layout placeholder).
 *
 * Variant axes:
 *   🟢 Active      Off / On  → passed to nested Switch (checked prop)
 *   📝 Description Off / On  → show/hide description text
 *   🔄 Switch      Off / On  → Off = switch LEFT of label; On = switch RIGHT (flip)
 *   — No Disabled axis in Figma; disabled is forwarded to Switch + cursor only.
 *   — No Badge or LinkButton axis in Figma ↳switch-label; included as forward-compat slots.
 *
 * Token bindings (L3 from tokens.css):
 *   Label text color   → --switch-card-text-label       (Figma: switch-card/text/label → text/neutral/strong)
 *   Description color  → --switch-card-text-description (Figma: switch-card/text/description → text/neutral/subtle)
 *   ⚠ DS note: ↳switch-label text layers are bound to switch-card/text/* tokens in Figma.
 *     No dedicated switch-label/* token namespace exists. This is a confirmed DS naming choice,
 *     not an error. Do NOT create switch-label/* tokens without DS owner approval.
 *
 * Nested instance ownership:
 *   ↳switch tokens flow through unchanged (no re-tokenization). SwitchLabel does NOT
 *   override --switch-* tokens. SwitchCard.css handles its own override via .switch-card scope.
 *
 * Focused: no Focused variant for ↳switch-label in Figma (DS owner decision D-06 closed).
 *   The nested Switch shows its own focus ring independently. No wrapper focus ring.
 *
 * Accessibility:
 *   - Root <label> wraps the Switch input — clicking anywhere in the row toggles the switch.
 *   - badge / linkButton spans use stopPropagation to avoid double-toggle.
 *   - id is forwarded to the Switch <input> for external label/aria association.
 *   - When description is provided, aria-describedby connects it to the Switch input.
 *
 * Props not in Figma ↳switch-label (forward-compatibility slots — report as DS gap):
 *   sublabel    — inline secondary text beside label (not in ↳switch-label anatomy)
 *   badge       — badge slot in label row (only in ↳switch-card in Figma)
 *   linkButton  — action slot in description area (only in ↳switch-integration in Figma)
 *
 * @param {boolean}         [checked]           Controlled state. If omitted → uncontrolled.
 * @param {boolean}         [defaultChecked]    Initial state for uncontrolled usage.
 * @param {boolean}         [disabled=false]    Forwarded to Switch; applies cursor: not-allowed.
 * @param {string}          label               Required — primary label text.
 * @param {string}          [sublabel]          Optional inline secondary text (not in DS, forward-compat).
 * @param {string}          [description]       Optional description below label row (Description=On axis).
 * @param {boolean}         [flip=false]        false = switch LEFT (🔄 Switch=Off); true = switch RIGHT (On).
 * @param {React.ReactNode} [badge]             Optional badge in label row. Consumer provides Badge instance.
 *                                              Not in Figma ↳switch-label — forward-compat slot.
 * @param {React.ReactNode} [linkButton]        Optional action in description area.
 *                                              Not in Figma ↳switch-label (only in ↳switch-integration).
 * @param {object}          [switchProps]       Additional props forwarded to Switch (spread before explicit props).
 * @param {string}          [id]                Forwarded to Switch <input>. Auto-generated if omitted.
 * @param {string}          [name]              Forwarded to Switch <input>.
 * @param {string}          [value]             Forwarded to Switch <input>.
 * @param {function}        [onChange]          Forwarded to Switch.
 * @param {string}          [className]         Additional class(es) on the root <label>.
 */
export default function SwitchLabel({
  checked,
  defaultChecked,
  disabled = false,
  label,
  sublabel,
  description,
  flip = false,
  badge,
  linkButton,
  switchProps,
  id: idProp,
  name,
  value,
  onChange,
  className,
}) {
  // useId requires React 18+. Project is on React 19 — safe.
  const uid = useId();
  const inputId = idProp ?? `switch-label-${uid}`;

  // aria-describedby: connect description to the Switch input when present.
  // Only set when we own a description — avoids overriding any switchProps value.
  const descriptionId = description ? `${inputId}-desc` : undefined;

  return (
    <label
      className={[
        'switch-label',
        flip     ? 'switch-label--flip'     : '',
        disabled ? 'switch-label--disabled' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* ↳switch instance — inherits switch/* tokens unchanged. */}
      <span className="switch-label__control">
        <Switch
          {...switchProps}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          {...(descriptionId ? { 'aria-describedby': descriptionId } : {})}
        />
      </span>

      {/* Content column: label row + optional description */}
      <span className="switch-label__text">

        {/* Label row: label + optional sublabel + optional badge.
            badge is not interactive but wrapped for stopPropagation safety. */}
        <span className="switch-label__label-row">
          <span className="switch-label__label">{label}</span>

          {sublabel && (
            <span className="switch-label__sublabel">{sublabel}</span>
          )}

          {badge && (
            /* Badge owns its own tokens — SwitchLabel does NOT configure badge tokens.
               stopPropagation: badge is typically non-interactive, but prevents accidental
               double-toggle if the consumer passes an interactive badge. */
            <span
              className="switch-label__badge"
              onClick={(e) => e.stopPropagation()}
            >
              {badge}
            </span>
          )}
        </span>

        {/* Description text — rendered when description prop is provided (📝 Description=On). */}
        {description && (
          <span
            id={descriptionId}
            className="switch-label__description"
          >
            {description}
          </span>
        )}

        {/* Link / action slot — not in Figma ↳switch-label (only in ↳switch-integration).
            stopPropagation prevents wrapping <label> from toggling switch when link is clicked. */}
        {linkButton && (
          <span
            className="switch-label__link-button"
            onClick={(e) => e.stopPropagation()}
          >
            {linkButton}
          </span>
        )}
      </span>
    </label>
  );
}
