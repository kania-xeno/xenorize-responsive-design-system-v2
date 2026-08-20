import React, { useEffect, useRef } from "react";
import SearchInput from "../input-text/SearchInput.jsx";
import "./DropdownList.css";

/**
 * DropdownList — panel container
 *
 * Figma source: Design System Scalable — All Platform V.2.1.0
 *   Page: ❖ Dropdown
 *   Component set: dropdown-list
 *   Node: VariableCollectionId:1902:2617 (component variable collection)
 *
 * Token bindings (L3 — emitted in tokens.css):
 *   Fill   → --dropdown-list-bg-default     → background/base      → --color-bg-base
 *   Stroke → --dropdown-list-border-default → border/neutral/soft  → --color-border-neutral-default
 *   Shadow → --dropdown-list-shadow-default → regular-shadow/medium → --shadow-regular-medium
 *   Radius → 16px (unbound in Figma — DS gap; use --radius-16)
 *
 * Layout (Figma-confirmed):
 *   Panel: display flex, flex-direction column, padding 8px
 *   Fixed variant: gap 12px (search + options wrapper stacked)
 *   Hug variant:   gap 4px, overflow-y visible (no search)
 *   Options wrapper: flex column, gap 4px, overflow-y auto
 *
 * @param {"fixed"|"hug"} [height="fixed"]
 *   "fixed" = 252px max (~6 option rows) — includes Search input
 *   "hug"   = no max-height, panel wraps content — no Search input
 *
 * @param {boolean} [showSearch]
 *   Show a SearchInput at the top. Defaults to true when height="fixed".
 *   Pass showSearch={false} to suppress on fixed panels if needed.
 *
 * @param {string} [searchValue]    Controlled value for the search input.
 * @param {function} [onSearch]     onChange handler — receives the input event.
 * @param {string} [searchPlaceholder="Search..."]
 *
 * @param {React.ReactNode} [children]
 *   <DropdownOption> elements.
 *
 * @param {string} [id]
 * @param {string} [aria-label]
 * @param {string} [aria-labelledby]
 *   aria-label or aria-labelledby identifies the listbox for screen readers.
 *   Provide one of them — usually pointing to the trigger label.
 *
 * @param {string} [className]
 */
export default function DropdownList({
  height = "fixed",
  showSearch,
  searchValue,
  onSearch,
  searchPlaceholder = "Search...",
  children,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  className = "",
  ...rest
}) {
  // Default: show search only on fixed panels (matches Figma Fixed variant with Search)
  const hasSearch = showSearch !== undefined ? showSearch : height === "fixed";

  // ── Scroll-to-selected on open ──────────────────────────────────────────────
  // DropdownList is conditionally rendered ({isOpen && <DropdownList>}), so this
  // mounts fresh every time the dropdown opens. On mount, locate the currently
  // selected option (aria-selected="true") and bring it into view within the
  // scroll container (.dropdown-list__options, overflow-y:auto). scrollIntoView
  // with block:'nearest' is a no-op if the item is already visible, preventing
  // unnecessary scroll. behavior:'instant' avoids animation on dropdown open.
  const rootRef = useRef(null);
  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;
    const selected = container.querySelector('[aria-selected="true"]');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
  }, []);

  return (
    <div
      ref={rootRef}
      role="listbox"
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={[
        "dropdown-list",
        `dropdown-list--${height}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {hasSearch && (
        <SearchInput
          size="xs"
          className="dropdown-list__search"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearch}
        />
      )}
      {hasSearch ? (
        <div className="dropdown-list__options">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
