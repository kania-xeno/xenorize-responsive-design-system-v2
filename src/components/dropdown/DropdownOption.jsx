import React from "react";
import ChevronRightSmall from "../../icons/ChevronRightSmall.jsx";
import Globe from "../../icons/Globe.jsx";
import Avatar from "../avatar/Avatar.jsx";
import Badge from "../badge/Badge.jsx";
import Checkbox from "../checkbox/Checkbox.jsx";
import Switch from "../switch/Switch.jsx";
import ButtonLink from "../button-link/ButtonLink.jsx";
import "./DropdownOption.css";

/**
 * DropdownOption — single option row (↳dropdown-items)
 *
 * Figma source: Design System Scalable — All Platform V.2.1.0
 *   Page:           ❖ Dropdown
 *   Component set:  ↳dropdown-items  (node 2090:6272)
 *   Total variants: 60 (6 types × 5 states × 2 sizes)
 *
 * Token bindings (L3 — emitted in tokens.css):
 *   Root fill     → dropdown-items/bg/{state}
 *   Label         → dropdown-items/text/{state}
 *   Sublabel      → dropdown-items/subtext/{state}
 *   Descriptions  → dropdown-items/descriptions/{state}  (Large only)
 *   Icon frame    → dropdown-items/icon-border/default   (Large non-Basic only)
 *   Left icon     → dropdown-items/icon/default → icon/strong (Basic type, state-invariant)
 *   Chevron       → dropdown-items/chevron/default → brand/primary/base (state-invariant)
 *
 * Nested components (each owns its own tokens):
 *   ↳checkbox    — Checkbox ✅
 *   ↳switch      — Switch ✅ (DS renamed from ↳toggle in v2.1.0 — 2026-08-03)
 *   ↳badge       — Badge ✅
 *   ↳buttons-link / ↳buttons-small — ButtonLink ✅ (known gap: Large uses ↳buttons-small filled; ButtonLink used for both)
 *   ↳avatar      — Avatar ✅
 *   left-slot icons/logos/flags — <img> or ReactNode via leftIcon prop
 *   chevron-right-small — ChevronRightSmall ✅
 *
 * DS gaps (do not implement until DS Auditor fixes):
 *   G1 Row corner radius (8px) — unbound in Figma; using --radius-8 value
 *   DI-03 Chevron color does not change in Disabled state — accepted DS gap
 *   G4 dropdown-items/descriptions/default aliases icon/sub (not a text token)
 *   G5 Large Basic has a 40×40 Icon FRAME in Figma but no icon-border stroke.
 *      Code renders a bare left-slot at 40×40 (same visual result; no frame div needed)
 *
 * @param {"basic"|"country"|"avatar"|"provider"|"brand"|"company"} [type="basic"]
 * @param {"small"|"large"} [size="small"]
 *
 * @param {string} [label="Label"]        Main label text.
 * @param {string} [sublabel]             Secondary label. Shown when provided.
 * @param {string} [description]          Description text. Large size only.
 *
 * @param {boolean} [showLeftIcon=true]   Show/hide left slot.
 * @param {React.ReactNode} [leftIcon]    Icon, flag <img>, avatar, or logo <img>.
 *                                        Defaults to nothing if not provided.
 * @param {boolean} [showRightIcon=true]  Show/hide right chevron slot.
 * @param {React.ReactNode} [rightIcon]   Override right icon. Default: ChevronRightSmall.
 *
 * @param {boolean} [showCheckbox=false]  Multi-select checkbox. Hidden by default.
 * @param {boolean} [checked=false]       Checkbox state.
 * @param {boolean} [showToggle=true]     Toggle switch. Visible by default.
 * @param {boolean} [toggleValue=false]   Toggle on/off state.
 * @param {(v:boolean)=>void} [onToggle]  Toggle change handler.
 * @param {boolean} [showBadge=false]     Badge slot. Hidden by default.
 * @param {string}  [badgeLabel="Badge"]  Badge text.
 * @param {boolean} [showButton=false]    Link button slot. Hidden by default.
 * @param {string}  [buttonLabel="Link"]  Link button text.
 * @param {()=>void} [onButtonClick]      Link button click handler.
 *
 * @param {boolean} [selected=false]      aria-selected state.
 * @param {boolean} [disabled=false]      aria-disabled state. Row stays in DOM.
 *
 * @param {()=>void} [onClick]            Row click handler (select action).
 * @param {string}  [id]
 * @param {string}  [className]
 */
export default function DropdownOption({
  // Variant axes
  type = "basic",
  size = "small",

  // Content
  label = "Label",
  sublabel,
  description,

  // Left slot
  showLeftIcon = true,
  leftIcon,

  // Right slot
  showRightIcon = true,
  rightIcon,

  // Controls
  showCheckbox = false,
  checked = false,
  showToggle = true,
  toggleValue = false,
  onToggle,
  showBadge = false,
  badgeLabel = "Badge",
  showButton = false,
  buttonLabel = "Link",
  onButtonClick,

  // State
  selected = false,
  disabled = false,

  // Interaction
  onClick,

  // DOM
  id,
  className = "",
  ...rest
}) {
  const isLarge = size === "large";

  // Large non-Basic non-Avatar types get a FRAME wrapper with icon-border stroke
  // Avatar is always a bare INSTANCE even in Large — no FRAME, no border (DS design)
  // Large Basic is also a bare INSTANCE in Figma (DS gap G5)
  const hasIconFrame = isLarge && type !== "basic" && type !== "avatar";

  // ── Interaction handlers ───────────────────────────────────────────────────

  const handleRowClick = (e) => {
    if (disabled) return;
    onClick?.(e);
  };

  const handleRowKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRowClick(e);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // link button action is product-specific, does NOT select
    if (disabled) return;
    onButtonClick?.(e);
  };

  // ── Left slot rendering ────────────────────────────────────────────────────

  const renderLeftSlot = () => {
    if (!showLeftIcon) return null;

    if (type === "avatar") {
      // Avatar: always bare INSTANCE, no FRAME, no icon-border — by DS design
      return (
        <span
          className="dropdown-option__left-slot dropdown-option__left-slot--avatar"
          aria-hidden="true"
        >
          {leftIcon ?? <Avatar size={isLarge ? 40 : 20} />}
        </span>
      );
    }

    // Basic type defaults to Globe (resolved G9 — Globe.jsx now in src/icons/)
    const effectiveIcon = leftIcon ?? (type === "basic" ? <Globe width={20} height={20} /> : null);
    const innerContent = effectiveIcon ? (
      <span className="dropdown-option__left-icon-inner" aria-hidden="true">
        {effectiveIcon}
      </span>
    ) : null;

    if (hasIconFrame) {
      // Large non-Basic: FRAME wrapper with icon-border/default stroke
      // Frame name in Figma: Icon / Country / Provider / Brand / Company
      return (
        <span
          className={`dropdown-option__left-slot dropdown-option__left-frame dropdown-option__left-frame--${type}`}
          aria-hidden="true"
        >
          {innerContent}
        </span>
      );
    }

    // Small (all types) or Large Basic: bare slot, no frame, no border
    return (
      <span className="dropdown-option__left-slot" aria-hidden="true">
        {innerContent}
      </span>
    );
  };

  // ── Text / content block ───────────────────────────────────────────────────

  const labelEl = <span className="dropdown-option__label">{label}</span>;
  const sublabelEl = sublabel ? (
    <span className="dropdown-option__sublabel">{sublabel}</span>
  ) : null;

  const renderContent = () => {
    if (isLarge) {
      // Large: Content > Text > (Label + Sublabel) + Descriptions
      const descEl = description ? (
        <span className="dropdown-option__description">{description}</span>
      ) : null;
      return (
        <span className="dropdown-option__content">
          <span className="dropdown-option__text">
            {labelEl}
            {sublabelEl}
          </span>
          {descEl}
        </span>
      );
    }
    // Small: Text > (Label + Sublabel)
    return (
      <span className="dropdown-option__text">
        {labelEl}
        {sublabelEl}
      </span>
    );
  };

  // ── Toggle (Switch) ────────────────────────────────────────────────────────
  // ↳switch (32×20px) — DS renamed from ↳toggle in v2.1.0 (2026-08-03).
  // stopPropagation prevents toggle click from also triggering row selection.

  const renderToggle = () => {
    if (!showToggle) return null;
    return (
      <span
        className="dropdown-option__toggle"
        onClick={(e) => e.stopPropagation()}
      >
        <Switch
          checked={toggleValue}
          disabled={disabled}
          onChange={(e) => onToggle?.(e.target.checked)}
        />
      </span>
    );
  };

  // ── Checkbox ───────────────────────────────────────────────────────────────
  // ↳checkbox (20×20px) — multi-select slot, hidden by default.

  const renderCheckbox = () => {
    if (!showCheckbox) return null;
    return (
      <span className="dropdown-option__checkbox">
        <Checkbox
          checked={checked}
          size="small"
          disabled={disabled}
          onChange={() => {}}
        />
      </span>
    );
  };

  // ── Link button ────────────────────────────────────────────────────────────
  // ↳buttons-link (Small) / ↳buttons-small (Large) — ButtonLink used for both.
  // Known gap: Large Figma slot uses a filled ↳buttons-small; ButtonLink is the
  // closest available DS component until a compact filled variant ships.

  const renderButton = () => {
    if (!showButton) return null;
    return (
      <ButtonLink
        size="small"
        style="neutral"
        disabled={disabled}
        onClick={handleButtonClick}
      >
        {buttonLabel}
      </ButtonLink>
    );
  };

  // ── Root ──────────────────────────────────────────────────────────────────

  return (
    <div
      role="option"
      id={id}
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={handleRowClick}
      onKeyDown={handleRowKeyDown}
      data-type={type}
      data-size={size}
      className={[
        "dropdown-option",
        `dropdown-option--${type}`,
        `dropdown-option--${size}`,
        selected ? "dropdown-option--selected" : "",
        disabled ? "dropdown-option--disabled" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {/* Checkbox — multi-select, hidden by default */}
      {renderCheckbox()}

      {/* Left slot — icon / flag / avatar / logo */}
      {renderLeftSlot()}

      {/* Text / content */}
      {renderContent()}

      {/* Badge — hidden by default */}
      {showBadge && (
        <Badge label={badgeLabel} size="small" />
      )}

      {/* Toggle — visible by default */}
      {renderToggle()}

      {/* Link button — hidden by default */}
      {renderButton()}

      {/* Right chevron — visible by default */}
      {showRightIcon && (
        <span className="dropdown-option__right-icon" aria-hidden="true">
          {rightIcon ?? <ChevronRightSmall />}
        </span>
      )}
    </div>
  );
}
