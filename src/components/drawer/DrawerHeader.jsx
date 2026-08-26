import React from "react";
import { CloseLine, HistoryLine } from "../../icons/index.js";
import "./DrawerHeader.css";

/**
 * DrawerHeader — ↳drawer-header sub-component
 *
 * Figma source: Design System Scalable — All Platform V.2.1.0
 *   Page:           ❖  Drawer
 *   Component set:  ↳drawer-header  (node 2097:769)
 *   Variant axes:   🧩 Type × 📏 Size
 *
 * Variants (4):
 *   📂 Basic  × Small (68px) — title + close button
 *   ⬅️ Left Icon × Small (68px) — icon + title + close button
 *   📂 Basic  × Large (92px) — title + description + close button
 *   ⬅️ Left Icon × Large (92px) — key-icon-container + title + description + close button
 *
 * Layout (HORIZONTAL auto layout, padding 20px):
 *   gap: 12px (small) | 16px (large)
 *   align-items: center
 *
 * Token bindings:
 *   Root bg         → --drawer-surface-bg
 *   Title text      → --drawer-text-title
 *   Description     → --drawer-text-description
 *   Close icon      → --drawer-text-title (currentColor via .drawer-header__close)
 *
 * DEFERRED — Content Divider (➖ Divider = true):
 *   The ↳drawer-header divider uses Content Divider [1.1] in Figma.
 *   This sub-component is intentionally deferred — not yet implemented.
 *   The divider prop and any CSS fallback border have been removed.
 *   Do not add interim CSS border. Carry forward to the Content Divider
 *   implementation phase.
 *
 * DEFERRED — ↳button-compact (dismiss button):
 *   Figma uses ↳button-compact (ComponentSet 2285:642, 24×24px, Ghost/Default).
 *   ↳button-compact is a separate DS component set — NOT a variant of Button.jsx.
 *   The existing Button.jsx (↳buttons-large/medium/small) only produces
 *   onlyIcon sizes of 32/36/40px — none matches 24×24.
 *   The dismiss button is implemented as a raw <button> styled in
 *   .drawer-header__close until ↳button-compact ships as a coded component.
 *
 * LEFT ICON DEFAULT — HistoryLine confirmed:
 *   Figma "💠 Pick Icon" INSTANCE_SWAP property explicitly defaults to node
 *   2097:202 (history-line). HistoryLine is kept as the runtime fallback when
 *   type='left-icon' and no icon prop is provided.
 *
 * ⚠️  Do not use standalone — use inside Drawer shell only (usage spec DR rule).
 *
 * @param {string}              title                Title text. Maps to "✏️ Edit Title".
 * @param {string}              [description]        Subtitle. Shown in Large size only.
 * @param {'basic'|'left-icon'} [type='basic']       Figma "🧩 Type" axis.
 * @param {'small'|'large'}     [size='small']       Figma "📏 Size" axis.
 * @param {React.ElementType}   [icon=HistoryLine]   Left icon component. Maps to "💠 Pick Icon".
 *                                                   Default confirmed from Figma INSTANCE_SWAP default (2097:202).
 *                                                   Active only when type='left-icon'.
 * @param {React.ReactNode}     [badge]              Badge instance. Maps to "⏺️ Number".
 * @param {boolean}             [showCloseButton=true] Maps to "✖️ Dismiss Icon".
 * @param {React.ReactNode}     [linkButton]         Link button slot. Maps to "🧩 Button".
 * @param {function}            [onClose]            Close handler for the dismiss button.
 * @param {string}              [titleId]            id for title span → wired to drawer aria-labelledby.
 * @param {string}              [descriptionId]      id for description → wired to drawer aria-describedby.
 * @param {string}              [className]
 */
export default function DrawerHeader({
  title = "Insert title here",
  description,
  type = "basic",
  size = "small",
  icon: IconComponent,
  badge,
  showCloseButton = true,
  linkButton,
  onClose,
  titleId,
  descriptionId,
  className = "",
}) {
  const isLeftIcon = type === "left-icon";
  const isLarge = size === "large";

  // HistoryLine confirmed as Figma INSTANCE_SWAP default (node 2097:202).
  const ResolvedIcon = IconComponent ?? HistoryLine;

  return (
    <div
      className={[
        "drawer-header",
        `drawer-header--${size}`,
        isLeftIcon ? "drawer-header--left-icon" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Left icon slot ──────────────────────────────────────────────────── */}
      {isLeftIcon && (
        isLarge ? (
          /* Large: Key Icons [1.0] — 48×48 container with bg */
          <span className="drawer-header__icon-container" aria-hidden="true">
            <ResolvedIcon />
          </span>
        ) : (
          /* Small: bare 24×24 icon, no container */
          <span className="drawer-header__icon" aria-hidden="true">
            <ResolvedIcon />
          </span>
        )
      )}

      {/* ── Title area (FILL) ───────────────────────────────────────────────── */}
      <div className="drawer-header__title-area">
        {/* Title row: text + optional badge */}
        <div className="drawer-header__title-row">
          <span id={titleId} className="drawer-header__title">
            {title}
          </span>
          {badge && (
            <span className="drawer-header__badge" aria-hidden="true">
              {badge}
            </span>
          )}
        </div>

        {/* Description — Large only (👁️ Show Description = true) */}
        {isLarge && description && (
          <p id={descriptionId} className="drawer-header__description">
            {description}
          </p>
        )}

        {/* Link Button slot (🧩 Button = true) — off by default */}
        {linkButton && (
          <div className="drawer-header__link-button">{linkButton}</div>
        )}
      </div>

      {/* ── Dismiss button ───────────────────────────────────────────────────
       * Figma: ↳button-compact (ComponentSet 2285:642) — 24×24px, Ghost/Default.
       * ↳button-compact is a separate DS component from Button.jsx.
       * Implemented as a raw <button> (see DEFERRED note above) until
       * ↳button-compact ships as a coded component.
       * ─────────────────────────────────────────────────────────────────── */}
      {showCloseButton && (
        <button
          type="button"
          className="drawer-header__close"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseLine />
        </button>
      )}
    </div>
  );
}
