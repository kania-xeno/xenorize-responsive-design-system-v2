import React from "react";
import Button from "../button/Button.jsx";
import ButtonLink from "../button-link/ButtonLink.jsx";
import CheckboxLabel from "../checkbox/CheckboxLabel.jsx";
import SwitchLabel from "../switch/SwitchLabel.jsx";
import "./DrawerFooter.css";

/**
 * DrawerFooter — ↳drawer-footer sub-component
 *
 * Figma source: Design System Scalable — All Platform V.2.1.0
 *   Page:           ❖  Drawer
 *   Component set:  ↳drawer-footer  (node 2097:807)
 *   Variant axis:   🧩 Type (5 variants)
 *
 * Variants (all: 400×84px, HORIZONTAL, padding 20px, gap 16px):
 *   ↔️ Stretch     — Cancel + Primary (both FILL width)
 *   📂 Basic       — Cancel + Primary (both HUG width, right-aligned)
 *   ✅ Checkbox    — CheckboxLabel (FILL) + Cancel + Primary
 *   🔀 Toggle      — SwitchLabel (HUG) + Cancel + Primary
 *   🔗 Link Button — ButtonLink (HUG) + Cancel + Primary
 *
 * Token bindings:
 *   Root bg         → --drawer-surface-bg
 *   Top border      → --drawer-footer-border
 *
 * ⚠️  Do not use standalone — use inside Drawer shell only (usage spec DR rule).
 *
 * @param {'stretch'|'basic'|'checkbox'|'toggle'|'link-button'} [type='stretch']
 *   Figma "🧩 Type" axis.
 *
 * @param {string}   [primaryLabel='Confirm']   Primary CTA button label.
 * @param {string}   [secondaryLabel='Cancel']  Secondary CTA button label.
 * @param {function} [onPrimary]                Primary CTA onClick.
 * @param {function} [onSecondary]              Secondary CTA onClick.
 * @param {boolean}  [primaryDisabled=false]    Disable primary CTA.
 * @param {boolean}  [secondaryDisabled=false]  Disable secondary CTA.
 *
 * Checkbox type props (type='checkbox'):
 * @param {boolean|'indeterminate'} [checkboxChecked=false]
 * @param {string}   [checkboxLabel='Don\'t show again']
 * @param {function} [onCheckboxChange]
 * @param {boolean}  [checkboxDisabled=false]
 *
 * Toggle type props (type='toggle'):
 * @param {boolean}  [toggleChecked]
 * @param {boolean}  [toggleDefaultChecked]
 * @param {string}   [toggleLabel='Enable']
 * @param {function} [onToggleChange]
 * @param {boolean}  [toggleDisabled=false]
 *
 * Link Button type props (type='link-button'):
 * @param {string}   [linkLabel='Learn more']
 * @param {function} [onLinkClick]
 * @param {string}   [linkHref]
 *
 * @param {string}   [className]
 */
export default function DrawerFooter({
  type = "stretch",
  primaryLabel = "Confirm",
  secondaryLabel = "Cancel",
  onPrimary,
  onSecondary,
  primaryDisabled = false,
  secondaryDisabled = false,
  // Checkbox type
  checkboxChecked = false,
  checkboxLabel = "Don't show again",
  onCheckboxChange,
  checkboxDisabled = false,
  // Toggle type
  toggleChecked,
  toggleDefaultChecked,
  toggleLabel = "Enable",
  onToggleChange,
  toggleDisabled = false,
  // Link Button type
  linkLabel = "Learn more",
  onLinkClick,
  linkHref,
  className = "",
}) {
  /* ── Shared CTA buttons ─────────────────────────────────────────────────── */
  const secondaryBtn = (
    <Button
      type="neutral"
      variant="outline"
      size="large"
      disabled={secondaryDisabled}
      onClick={onSecondary}
      className="drawer-footer__btn-secondary"
    >
      {secondaryLabel}
    </Button>
  );

  const primaryBtn = (
    <Button
      type="primary"
      variant="filled"
      size="large"
      disabled={primaryDisabled}
      onClick={onPrimary}
      className="drawer-footer__btn-primary"
    >
      {primaryLabel}
    </Button>
  );

  /* ── Left slot renderers ────────────────────────────────────────────────── */
  const renderLeftSlot = () => {
    switch (type) {
      case "checkbox":
        return (
          <CheckboxLabel
            checked={checkboxChecked}
            disabled={checkboxDisabled}
            label={checkboxLabel}
            onChange={onCheckboxChange}
            className="drawer-footer__checkbox"
          />
        );
      case "toggle":
        return (
          <SwitchLabel
            checked={toggleChecked}
            defaultChecked={toggleDefaultChecked}
            disabled={toggleDisabled}
            label={toggleLabel}
            onChange={onToggleChange}
            className="drawer-footer__toggle"
          />
        );
      case "link-button":
        return (
          <ButtonLink
            style="primary"
            size="medium"
            href={linkHref}
            onClick={onLinkClick}
            className="drawer-footer__link"
          >
            {linkLabel}
          </ButtonLink>
        );
      default:
        return null;
    }
  };

  const hasLeftSlot = ["checkbox", "toggle", "link-button"].includes(type);
  const isStretch = type === "stretch";

  return (
    <div
      className={[
        "drawer-footer",
        `drawer-footer--${type}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Left slot (checkbox / toggle / link-button types) */}
      {hasLeftSlot && (
        <div className="drawer-footer__left">{renderLeftSlot()}</div>
      )}

      {/* Actions: secondary + primary */}
      <div
        className={[
          "drawer-footer__actions",
          isStretch ? "drawer-footer__actions--stretch" : "",
          !hasLeftSlot && !isStretch ? "drawer-footer__actions--right" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {secondaryBtn}
        {primaryBtn}
      </div>
    </div>
  );
}
