import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import "./Drawer.css";

/* ─────────────────────────────────────────────────────────────────────────────
 * Drawer — ↳overlay-drawer shell
 *
 * Figma source: Design System Scalable — All Platform V.2.1.0
 *   Page:            ❖  Drawer
 *   Component set:   ↳overlay-drawer  (node 2605:3611) — 3 variants
 *   Standalone ref:  ↳anchor-drawer   (node 2499:13695)
 *
 * Variants mapped:
 *   Side Drawer (≥768px) — fixed right panel, slides from right edge
 *   Bottom Sheet (<768px) — slides up from bottom
 *
 * Figma geometry:
 *   Desktop: 1440×1024 canvas, panel 570×FILL at x:854, y:16, radius:16, inset:16
 *   Mobile Half (2605:3610): Sheet 412×406px (y:406 from top of 812px canvas)
 *   Mobile Full (2605:3609): Sheet 412×730px (y:82 from top of 812px canvas)
 *   Mobile handle: 36×4px → --drawer-mobile-handle
 *   Snap midpoint: (406 + 730) / 2 = 568px at the 412×812 Figma reference viewport.
 *     Actual midpoint is computed dynamically at drag-start: (min(50vh,406) + min(90vh,730)) / 2.
 *     On shorter viewports the vh value wins; 568px applies only at 812px canvas height.
 *
 * Token bindings:
 *   Overlay backdrop  → --drawer-surface-overlay
 *   Panel bg          → --drawer-surface-bg
 *   Mobile handle     → --drawer-mobile-handle
 *
 * Runtime behaviors (not representable in Figma — DR-09):
 *   A. Open / close via `open` prop
 *   B. Escape key → onClose  (gated by closeOnEscape)
 *   C. Overlay click → onClose  (gated by closeOnOverlayClick)
 *   D. Body scroll lock (overflow:hidden) while open
 *   E. Focus restore to trigger element on close
 *   F. Focus trap: Tab/Shift+Tab locked within panel
 *   G. Portal: ReactDOM.createPortal → document.body
 *   H. Mobile drag handle: pointerdown on handle area → drag → snap to Half/Full
 *      - Drag target: handle-area only (not content or header)
 *      - During drag: follows pointer directly, no transition
 *      - Clamp: between responsive Half target (min(50vh, 406px)) and Full target (min(90vh, 730px))
 *        406px / 730px are Figma reference maximums (CSS max-height caps at 412×812px).
 *        On shorter viewports the vh value wins; on tall viewports max-height caps apply.
 *      - On release: snaps at viewport-responsive midpoint = (halfH + fullH) / 2
 *        At the 412×812 Figma reference viewport this resolves to 568px.
 *      - No swipe-to-dismiss; Half is the minimum floor
 *      - Desktop/Tablet (≥768px): drag logic is a no-op (breakpoint check)
 *      - Keyboard drag: deferred
 *
 * Accessibility:
 *   role=dialog, aria-modal=true
 *   aria-labelledby — auto-wired to DrawerHeader titleId; accepts override
 *   aria-describedby — auto-wired when header has visible description; accepts override
 *   aria-label — for drawers without a visible title element
 *
 * Animation:
 *   Desktop: translateX(calc(100% + 16px)) → translateX(0)  (300ms ease)
 *   Mobile:  translateY(100%) → translateY(0)  (300ms ease)
 *   Overlay: opacity 0 → 1  (300ms ease)
 *   @media (prefers-reduced-motion: reduce) → transitions off; unmount via JS
 *
 * ⚠️  Content Divider intentionally deferred.
 * ⚠️  Mobile swipe-to-dismiss deferred (sprint confirmation pending).
 * ⚠️  Mobile drag handle keyboard interaction deferred.
 *
 * @param {boolean}          open                  Controlled open state.
 * @param {function}         onClose               Called when close is requested.
 * @param {React.ReactNode}  header                DrawerHeader instance.
 * @param {React.ReactNode}  [footer]              DrawerFooter instance.
 * @param {React.ReactNode}  children              Content slot (content-drawer SLOT).
 * @param {'half'|'full'}    [mobileHeight='full'] Initial mobile sheet height (uncontrolled).
 *                                                 Reset to this value each time Drawer closes.
 * @param {boolean}          [closeOnEscape=true]  Escape key fires onClose.
 * @param {boolean}          [closeOnOverlayClick=true] Backdrop click fires onClose.
 * @param {string}           [aria-labelledby]     Overrides auto titleId wiring.
 * @param {string}           [aria-describedby]    Overrides auto descriptionId wiring.
 * @param {string}           [aria-label]          Accessible name when no visible title.
 * @param {string}           [className]           Added to the panel element.
 * @param {object}           [overlayProps]        Extra props for overlay <div>.
 *                                                 onClick is merged with internal handler.
 * @param {object}           [panelProps]          Extra props for panel <div>.
 *                                                 role/aria-modal/tabIndex/onTransitionEnd
 *                                                 are always protected; className is merged.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ── Mobile drag constants (Figma reference maximums) ────────────────────────
 * Half node 2605:3610: Sheet 412×406px   Full node 2605:3609: Sheet 412×730px
 * These are the CSS max-height caps — the upper bound at any viewport.
 * At the Figma reference viewport (412×812):
 *   50vh = 406px → max-height: 406px → Half = 406px ✓
 *   90vh = 730.8px → max-height: 730px → Full = 730px ✓
 * At shorter viewports (e.g. 667px):
 *   50vh = 333.5px < 406px → Half = 333.5px (responsive, capped by max-height)
 *   90vh = 600.3px < 730px → Full = 600.3px (responsive, capped by max-height)
 * Snap midpoint and clamp bounds are computed dynamically at drag-start time
 * from window.innerHeight to avoid height jumps on non-Figma-reference viewports.
 * ─────────────────────────────────────────────────────────────────────────── */
const MOBILE_HALF_H = 406; // Figma max — matches CSS max-height for .drawer-panel--mobile-half
const MOBILE_FULL_H = 730; // Figma max — matches CSS max-height for .drawer-panel--mobile-full
export default function Drawer({
  open = false,
  onClose,
  header,
  footer,
  children,
  mobileHeight = "full",
  closeOnEscape = true,
  closeOnOverlayClick = true,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  className = "",
  overlayProps = {},
  panelProps = {},
}) {
  /* ── Mount / visibility state ────────────────────────────────────────────── */
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  /* ── Mobile drag state (D3.2) ───────────────────────────────────────────── */
  // mobileHeightState: tracks current snap position (Half or Full).
  // Initialized from prop; reset to prop value when Drawer closes (uncontrolled).
  const [mobileHeightState, setMobileHeightState] = useState(mobileHeight);
  // dragHeight: px value during active drag (null = not dragging, CSS class applies)
  const [dragHeight, setDragHeight] = useState(null);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(null);
  const dragStartHRef = useRef(null);
  const currentDragHRef = useRef(null);
  // Responsive snap targets — computed from window.innerHeight at each drag-start.
  // Using viewport-aware values prevents a height jump when the JS constant (406/730)
  // differs from the actual CSS-rendered height on shorter mobile viewports.
  const dragHalfHRef = useRef(MOBILE_HALF_H);   // current viewport's half target
  const dragFullHRef = useRef(MOBILE_FULL_H);   // current viewport's full target
  const dragSnapMidRef = useRef((MOBILE_HALF_H + MOBILE_FULL_H) / 2); // snap threshold

  /* ── Stable IDs ─────────────────────────────────────────────────────────── */
  const autoId = useId();
  const idSlug = autoId.replace(/:/g, "");

  // aria-labelledby: consumer override wins; otherwise auto-generate
  const titleId = ariaLabelledBy ?? `drawer-title-${idSlug}`;

  // aria-describedby auto-wiring:
  // Only emit when header is a React element that will render a visible description
  // (size='large' AND description prop present). Avoids pointing to non-existent element.
  // Consumer-provided ariaDescribedBy always wins.
  const autoDescId = `drawer-desc-${idSlug}`;
  const headerHasDescription =
    React.isValidElement(header) &&
    header.props.size === "large" &&
    Boolean(header.props.description);
  const resolvedAriaDescribedBy =
    ariaDescribedBy ?? (headerHasDescription ? autoDescId : undefined);

  const panelRef = useRef(null);
  const overlayRef = useRef(null);

  /* ── Open / close lifecycle ─────────────────────────────────────────────── */
  useEffect(() => {
    if (open) {
      setMounted(true);
      // Double rAF so the portal renders before the open class triggers the transition
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(raf1);
    } else {
      setVisible(false);
      // Unmount handled by transitionend (normal) or reduced-motion effect (below)
    }
  }, [open]);

  /* ── Reduced-motion unmount fix ─────────────────────────────────────────── */
  // When prefers-reduced-motion:reduce disables transitions, transitionend never
  // fires and the portal would stay mounted after close. Detect and unmount directly.
  useEffect(() => {
    if (visible) return;   // only run when closing
    if (!mounted) return;  // already unmounted
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) setMounted(false);
  }, [visible, mounted]);

  /* ── Normal animated close: transitionend → unmount ────────────────────── */
  const handleTransitionEnd = useCallback(
    (e) => {
      if (e.target !== panelRef.current) return;
      if (e.propertyName !== "transform") return;
      if (!visible) setMounted(false);
    },
    [visible]
  );

  /* ── Body scroll lock (D) ───────────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* ── Focus restore (E) ──────────────────────────────────────────────────── */
  const triggerRef = useRef(null);
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
    } else {
      if (triggerRef.current && typeof triggerRef.current.focus === "function") {
        triggerRef.current.focus();
      }
      triggerRef.current = null;
    }
  }, [open]);

  /* ── Focus trap (F) ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!open || !panelRef.current) return;

    const FOCUSABLE_SELECTORS = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    const getFocusable = () =>
      Array.from(panelRef.current.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
        (el) => !el.closest("[inert]") && !el.hasAttribute("inert")
      );

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Move focus into panel on open
    const focusable = getFocusable();
    if (focusable.length) {
      focusable[0].focus();
    } else {
      panelRef.current.focus();
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, visible]);

  /* ── Escape key (B) — gated by closeOnEscape ────────────────────────────── */
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  /* ── Mobile drag: reset snap state on close (H) ────────────────────────── */
  // When the Drawer closes, reset internal height state to the initial prop value
  // so re-opening always starts at the configured position.
  useEffect(() => {
    if (!open) {
      setMobileHeightState(mobileHeight);
      setDragHeight(null);
      isDraggingRef.current = false;
      dragStartYRef.current = null;
      dragStartHRef.current = null;
      currentDragHRef.current = null;
      dragHalfHRef.current = MOBILE_HALF_H;
      dragFullHRef.current = MOBILE_FULL_H;
      dragSnapMidRef.current = (MOBILE_HALF_H + MOBILE_FULL_H) / 2;
    }
  }, [open, mobileHeight]);

  /* ── Mobile drag handlers (H) ──────────────────────────────────────────── */
  // Guard: only active at <768px. Desktop/Tablet are unaffected.
  const isMobileBreakpoint = useCallback(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches,
    []
  );

  const handleHandlePointerDown = useCallback(
    (e) => {
      if (!isMobileBreakpoint()) return;
      // Prevent scroll and text selection during drag
      e.preventDefault();
      // Capture pointer so pointermove/pointerup fire on this element
      // even when the pointer moves outside it (required for reliable drag)
      e.currentTarget.setPointerCapture(e.pointerId);

      // Read the panel's ACTUAL rendered height — this is what CSS has set
      // (50vh/90vh capped by max-height) at the current viewport.
      // Using a JS constant (406/730) instead would cause a height jump when
      // the CSS value differs, e.g. at 667px viewport: CSS half = 333.5px ≠ 406px.
      const startH = panelRef.current
        ? panelRef.current.getBoundingClientRect().height
        : (mobileHeightState === "full" ? MOBILE_FULL_H : MOBILE_HALF_H);

      // Compute responsive snap targets from current viewport height.
      // MOBILE_HALF_H / MOBILE_FULL_H are Figma reference maximums (cap values).
      // At short viewports the vh wins; at tall viewports max-height wins.
      const vh = typeof window !== "undefined" ? window.innerHeight : 812;
      const halfH = Math.min(vh * 0.5, MOBILE_HALF_H);
      const fullH = Math.min(vh * 0.9, MOBILE_FULL_H);
      dragHalfHRef.current = halfH;
      dragFullHRef.current = fullH;
      dragSnapMidRef.current = (halfH + fullH) / 2;

      dragStartYRef.current = e.clientY;
      dragStartHRef.current = startH;
      currentDragHRef.current = startH;
      isDraggingRef.current = true;
      setDragHeight(startH);
    },
    [isMobileBreakpoint, mobileHeightState]
  );

  const handleHandlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    // Upward drag (start > current) → positive delta → taller
    const delta = dragStartYRef.current - e.clientY;
    const raw = (dragStartHRef.current ?? dragHalfHRef.current) + delta;
    // Clamp between responsive half/full targets (computed at drag-start from viewport).
    // These match the actual CSS-rendered heights — no swipe-to-dismiss.
    const clamped = Math.max(dragHalfHRef.current, Math.min(dragFullHRef.current, raw));
    currentDragHRef.current = clamped;
    setDragHeight(clamped);
  }, []);

  const handleHandlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const h = currentDragHRef.current ?? dragHalfHRef.current;
    // Snap: cross viewport-responsive midpoint → Full; below → Half.
    // dragSnapMidRef is (halfH + fullH) / 2 computed at drag-start from window.innerHeight.
    // At 812px this equals 568px (matching Figma); at shorter viewports it scales down.
    setMobileHeightState(h >= dragSnapMidRef.current ? "full" : "half");
    setDragHeight(null);
    dragStartYRef.current = null;
    dragStartHRef.current = null;
    currentDragHRef.current = null;
  }, []);

  /* ── Nothing to render ───────────────────────────────────────────────────── */
  if (!mounted) return null;

  /* ── Portal (G) ─────────────────────────────────────────────────────────── */
  return ReactDOM.createPortal(
    <div
      {...overlayProps}
      ref={overlayRef}
      /* className: merge consumer's class with internal classes */
      className={[
        "drawer-overlay",
        visible ? "drawer-overlay--open" : "",
        overlayProps.className,
      ]
        .filter(Boolean)
        .join(" ")}
      /* onClick: merge internal close handler with consumer's callback.
       * closeOnOverlayClick gates whether overlay click fires onClose.   */
      onClick={(e) => {
        if (e.target === overlayRef.current && closeOnOverlayClick) onClose?.();
        overlayProps.onClick?.(e);
      }}
    >
      <div
        /* Spread consumer panelProps FIRST so critical attrs below always win */
        {...panelProps}
        ref={panelRef}
        /* ── Critical dialog attributes — never overridable by panelProps ── */
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={resolvedAriaDescribedBy}
        aria-label={ariaLabel ?? undefined}
        tabIndex={-1}
        /* className: merge consumer's class with internal classes.
         * mobileHeightState (internal) drives snap position instead of raw prop,
         * so drag interaction updates the class correctly.
         * drawer-panel--dragging added during active drag for CSS cursor override. */
        className={[
          "drawer-panel",
          `drawer-panel--mobile-${mobileHeightState}`,
          dragHeight !== null ? "drawer-panel--dragging" : "",
          className,
          panelProps.className,
        ]
          .filter(Boolean)
          .join(" ")}
        /* During drag: override height directly and disable transition so the panel
         * follows the pointer without any easing. Inline style removed on snap,
         * restoring CSS-class-based height and the existing transform transition. */
        style={{
          ...panelProps.style,
          ...(dragHeight !== null
            ? { height: `${dragHeight}px`, transition: "none" }
            : {}),
        }}
        /* onTransitionEnd: merge internal unmount handler with consumer's callback */
        onTransitionEnd={(e) => {
          handleTransitionEnd(e);
          panelProps.onTransitionEnd?.(e);
        }}
      >
        {/* ── Mobile drag handle ──────────────────────────────────────────── */}
        {/* Pointer events on handle-area only — not content or header.
         * setPointerCapture in onPointerDown routes subsequent move/up events
         * back here even when the pointer leaves the element.
         * aria-hidden: keyboard drag is deferred; handle is not focusable. */}
        <div
          className="drawer-panel__handle-area"
          aria-hidden="true"
          onPointerDown={handleHandlePointerDown}
          onPointerMove={handleHandlePointerMove}
          onPointerUp={handleHandlePointerUp}
          onPointerCancel={handleHandlePointerUp}
        >
          <span className="drawer-panel__handle" />
        </div>

        {/* ── Header slot ─────────────────────────────────────────────────── */}
        {header && (
          <div className="drawer-panel__header">
            {React.isValidElement(header)
              ? React.cloneElement(header, {
                  // Auto-wire titleId → header renders <span id={titleId}>
                  titleId: header.props.titleId ?? titleId,
                  // Auto-wire descriptionId → header renders <p id={autoDescId}>
                  // Only injected when header will render a visible description
                  descriptionId:
                    header.props.descriptionId ??
                    (headerHasDescription ? autoDescId : undefined),
                  // Default onClose if not explicitly set on header
                  onClose: header.props.onClose ?? onClose,
                })
              : header}
          </div>
        )}

        {/* ── Content slot (content-drawer SLOT) ──────────────────────────── */}
        <div className="drawer-panel__body">{children}</div>

        {/* ── Footer slot ─────────────────────────────────────────────────── */}
        {footer && <div className="drawer-panel__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
