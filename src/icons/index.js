/**
 * Icon Foundation — Initial Local Batch
 * Xenorize Design System — Icon System V.2.0.0
 *
 * Scope: 17 icons migrated/created in this pass.
 * This is NOT the complete product-used icon set.
 * Remaining ~41 product-used icons require a separate Figma icon audit/export pass.
 *
 * Status key (see icon-usage-manifest.json for per-icon detail):
 *   verified   — path sourced directly from Figma node, variant confirmed
 *   extracted  — Figma paths captured this session; file written from those paths
 *   derived    — path inferred from a related icon; Figma node not directly queried
 *   placeholder — Figma node ID known; temporary geometry in file, real path pending
 */

// ── verified ──────────────────────────────────────────────────────────────────
export { default as BubbleAlert }       from './BubbleAlert.jsx';
export { default as CalendarIcon }      from './CalendarIcon.jsx';
export { default as ChevronDownSmall }  from './ChevronDownSmall.jsx';
export { default as ChevronTopSmall }   from './ChevronTopSmall.jsx';
export { default as CircleInfo }        from './CircleInfo.jsx';
export { default as CopyIcon }          from './CopyIcon.jsx';
export { default as CrossLarge }        from './CrossLarge.jsx';
export { default as EyeIcon }           from './EyeIcon.jsx';
export { default as EyeOffIcon }        from './EyeOffIcon.jsx';
export { default as LinkIcon }          from './LinkIcon.jsx';
export { default as LockIcon }          from './LockIcon.jsx';
export { default as PhoneIcon }         from './PhoneIcon.jsx';
export { default as ChevronRightSmall } from './ChevronRightSmall.jsx';
export { default as SearchIcon }        from './SearchIcon.jsx';

// ── extracted (Figma paths captured 2026-07-22) ───────────────────────────────
export { default as Rose }              from './Rose.jsx';

// ── extracted (Figma paths captured 2026-08-13 — Select Family Phase 2) ──────
export { default as ChevronLeftSmall }  from './ChevronLeftSmall.jsx';
export { default as CryptoCoin }        from './CryptoCoin.jsx';

// ── extracted (Figma paths captured 2026-08-25 — Drawer D1.3 icon audit) ─────
export { default as CloseLine }         from './CloseLine.jsx';        // close-line DS:2097:204 — FILLED polygon; required for Drawer dismiss
export { default as HistoryLine }       from './HistoryLine.jsx';      // history-line DS:2097:202 — FILLED path; Drawer header sample icon
export { default as ArrowLeftSLine }    from './ArrowLeftSLine.jsx';   // arrow-left-s-line DS:1941:85 — FILLED chevron; Drawer link-button slot (hidden)
export { default as ArrowRightSLine }   from './ArrowRightSLine.jsx';  // arrow-right-s-line DS:1941:83 — FILLED chevron; Drawer link-button slot (hidden)

// ── placeholder (Figma node known — temporary geometry) ──────────────────────
export { default as CircleCheck }       from './CircleCheck.jsx';
export { default as CircleX }           from './CircleX.jsx';
