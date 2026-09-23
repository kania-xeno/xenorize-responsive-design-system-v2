import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow as arrowMiddleware,
  useHover,
  useFocus,
  useClick,
  useInteractions,
  useDismiss,
  safePolygon,
} from "@floating-ui/react";
import "./Tooltip.css";

/**
 * Tooltip — contextual label, display-only.
 *
 * Opens on pointer hover (300 ms delay) and keyboard focus.
 * Closes on pointer leave, blur, Escape, ancestor scroll, or outside tap.
 *
 * WCAG 1.4.13: pointer may move from trigger to tooltip surface without
 * closing (safePolygon on useHover).
 *
 * Shadow and color tokens are appearance-static — selected by the `appearance`
 * prop, NOT by the surrounding [data-theme] context.
 *
 * Touch contract:
 *   First tap  → opens.
 *   Second tap → closes.
 *   Outside tap → closes.
 *   Scroll → closes.
 *   Escape → closes.
 *   Primary action on trigger (navigation, submit) is NOT prevented.
 *   Consumers requiring tap-to-reveal rich content must use InfoPopover.
 *
 * Keyboard contract:
 *   Enter/Space still execute the trigger's own primary action.
 *   useClick has keyboardHandlers=false so Enter/Space do NOT toggle Tooltip.
 *   Tooltip opens/closes via useFocus only (Tab focus / blur).
 *
 * Trigger-prop composition contract:
 *   All consumer props (className, style, data-*, ARIA, onClick, onFocus, etc.)
 *   are preserved. Floating UI event handlers are COMPOSED on top via
 *   getReferenceProps({ ...children.props }), which calls both the consumer
 *   handler and the Floating UI handler. The consumer ref is MERGED with the
 *   Floating UI reference setter via a stable memoized mergeRefs utility.
 *
 * ARIA lifecycle (D2-A.2 B):
 *   semanticOpen → mounted → aria-describedby added (with dedup via Set)
 *   → visual fade-in → tooltip readable by AT.
 *   semanticOpen=false → aria-hidden=true immediately (AT stops)
 *   → aria-describedby removed immediately (semanticOpen && mounted)
 *   → visual fade-out → unmount.
 *
 * Semantic open (D2-A.2 A):
 *   semanticOpen = !disabled && isOpen.
 *   Drives Floating UI open, ARIA, lifecycle, and rendering.
 *   Disabled uncontrolled: local state cleared.
 *   Disabled controlled: onOpenChange(false) called once (ref-guarded).
 *   Parent remains responsible for updating its controlled open value.
 *
 * @param {React.ReactElement}  children          — trigger element (required)
 * @param {React.ReactNode}     content           — tooltip label (required)
 * @param {'xs'|'sm'}           [size='xs']       — 2X-Small (24px) or X-Small (34px)
 * @param {'light'|'dark'}      [appearance='light']
 * @param {boolean}             [showTail=true]
 * @param {string}              [placement='top'] — Floating UI placement
 * @param {number}              [openDelay=300]   — ms before hover-open
 * @param {number}              [closeDelay=0]    — ms before hover-close
 * @param {boolean}             [open]            — controlled open state
 * @param {boolean}             [defaultOpen=false]
 * @param {function}            [onOpenChange]
 * @param {boolean}             [disabled=false]
 * @param {string}              [id]              — tooltip id (auto-generated if omitted)
 * @param {string}              [className='']    — extra class on the surface
 * @param {Element|null}        [portalContainer] — portal target, default document.body
 *
 * Props that must NOT exist: role, type, darkMode, text, showArrow
 */

// ── Approved placement values ─────────────────────────────────────────────
const VALID_PLACEMENTS = [
  "top", "top-start", "top-end",
  "bottom", "bottom-start", "bottom-end",
  "left", "right",
];

// ── Tail geometry per size ────────────────────────────────────────────────
const SIZE_CONFIG = {
  xs: { tailWidth: 8, tailHeight: 4 },  // 2X-Small: 8×4 px tail
  sm: { tailWidth: 12, tailHeight: 6 }, // X-Small:  12×6 px tail
};

// ── Tail composite config (from Figma SVG exports, 2026-09-22) ────────────
// safeW  = Safe RECT width (tailWidth + 3 overhang each side)
// tailH  = triangle depth in px
// svgH   = total SVG height (tailH + seam zone, from Figma export)
// seamY  = y-top of the seam-cover rect (0.5 px above triangle base)
// baseY  = y of the triangle base (Figma-exported, includes outside stroke)
// halfB  = half the triangle base width (from Figma-exported coordinates)
// The bezier tip curve is identical for xs and sm — same absolute shape.
const TAIL_CONFIG = {
  xs: { safeW: 14, tailH: 4, svgH: 6.379, seamY: 4.379, baseY: 4.879, halfB: 5.207 },
  sm: { safeW: 18, tailH: 6, svgH: 8.379, seamY: 6.379, baseY: 6.879, halfB: 7.207 },
};

// Offset side: the tooltip surface edge the tail hangs off.
const TAIL_STATIC_SIDE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

/**
 * TooltipTail — Figma-accurate composite tail, replaces FloatingArrow.
 *
 * Geometry from Figma SVG exports (nodes 2267:40/90 and 2267:386/252):
 *   • Triangle with cubic-bezier–rounded tip (same curve for xs + sm).
 *   • Seam-cover rect (seamY → seamY+2) hides the surface ring at the junction.
 * Light:  triangle fill + 1px border stroke; seam rect fills with surface bg.
 * Dark:   triangle fill only (no stroke); no visible ring to cover.
 *
 * D2-A.1 fix — bounding-box correctness:
 *   For left/right placements the SVG width/height attributes are SWAPPED
 *   (svgH×safeW) so the DOM element's measured footprint is correct for
 *   arrowMiddleware. An internal <g transform> rotates the geometry inside
 *   the viewport instead of CSS rotation on the outer element, which would
 *   leave the layout box at pre-rotation dimensions.
 *
 * Natural orientation (no transform): tip at y≈0 (top), base at y=baseY.
 *   bottom → no transform    (tip up  = toward reference above)
 *   top    → rotate 180°     (tip down = toward reference below)
 *   left   → viewport svgH×safeW, translate+rotate +90° (tip right)
 *   right  → viewport svgH×safeW, translate+rotate −90° (tip left)
 */
function TooltipTail({ size, appearance, middlewareData, placement, tailRef }) {
  const cfg  = TAIL_CONFIG[size] ?? TAIL_CONFIG.xs;
  const side = placement.split('-')[0];
  const cx   = cfg.safeW / 2; // horizontal center: 7 (xs) or 9 (sm)

  // Exact bezier path from Figma export — tip rounded, straight sides.
  // Tip bezier control-point y=0.305 is identical for both sizes.
  const p = `M ${cx - 1.4141} 1.0857 ` +
    `C ${cx - 0.633} 0.305 ${cx + 0.633} 0.305 ${cx + 1.4141} 1.0857 ` +
    `L ${cx + cfg.halfB} ${cfg.baseY} ` +
    `L ${cx - cfg.halfB} ${cfg.baseY} Z`;

  const isLight = appearance === 'light';
  const fill    = isLight ? 'var(--tooltip-light-bg)' : 'var(--tooltip-dark-bg)';
  const stroke  = isLight ? 'var(--tooltip-light-border)' : 'none';
  const strokeW = isLight ? 1 : 0;

  const ax = middlewareData?.arrow?.x;
  const ay = middlewareData?.arrow?.y;

  // For left/right, swap DOM dimensions so arrowMiddleware measures the
  // correct footprint (svgH × safeW, not safeW × svgH).
  const isVertical = side === 'left' || side === 'right';
  const domW = isVertical ? cfg.svgH : cfg.safeW;
  const domH = isVertical ? cfg.safeW : cfg.svgH;

  // Internal <g> transform instead of CSS rotation on the outer SVG element.
  // side === 'bottom': no transform (natural: tip at top, pointing up toward reference)
  let gTransform;
  if (side === 'top') {
    // tip points down toward reference below tooltip
    gTransform = `rotate(180, ${cfg.safeW / 2}, ${cfg.svgH / 2})`;
  } else if (side === 'left') {
    // tip points right toward reference to the right of tooltip
    gTransform = `translate(${cfg.svgH}, 0) rotate(90)`;
  } else if (side === 'right') {
    // tip points left toward reference to the left of tooltip
    gTransform = `translate(0, ${cfg.safeW}) rotate(-90)`;
  }

  // Build position style imperatively to avoid key collision.
  // For 'bottom' side: TAIL_STATIC_SIDE sets `top: -tailH`; arrowMiddleware ay=null
  //   so we must NOT write `top: undefined` which would override the static `top`.
  // For 'right' side: TAIL_STATIC_SIDE sets `left: -tailH`; arrowMiddleware ax=null
  //   so we must NOT write `left: undefined` which would override the static `left`.
  const posStyle = { position: 'absolute', pointerEvents: 'none' };
  posStyle[TAIL_STATIC_SIDE[side]] = -cfg.tailH; // static edge offset
  if (ax != null) posStyle.left = ax;             // arrowMiddleware x (top/bottom)
  if (ay != null) posStyle.top  = ay;             // arrowMiddleware y (left/right)

  return (
    <svg
      ref={tailRef}
      aria-hidden="true"
      className="tooltip-tail"
      width={domW}
      height={domH}
      viewBox={`0 0 ${domW} ${domH}`}
      style={posStyle}
    >
      <g transform={gTransform || undefined}>
        {/* Triangle — Figma-derived bezier tip + straight sides */}
        <path d={p} fill={fill} stroke={stroke} strokeWidth={strokeW} />
        {/* Seam cover — hides surface ring (light) / ensures flush join (dark) */}
        <rect x={0} y={cfg.seamY} width={cfg.safeW} height={2} rx={1} fill={fill} stroke="none" />
      </g>
    </svg>
  );
}

// ── Ref merge utility ─────────────────────────────────────────────────────
// `useMergedRefs` is NOT exported by @floating-ui/react 0.27.x.
// React 19: ref is a regular prop — children.props.ref is the consumer ref.
// Handles: callback refs, object refs, null/undefined, React 19 cleanup returns.
// Object refs are reset to null when node unmounts (ref(null) or ref.current=null).
function mergeRefs(...refs) {
  return (node) => {
    const cleanups = [];
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        const result = ref(node);
        if (typeof result === "function") cleanups.push(result);
      } else if (typeof ref === "object" && "current" in ref) {
        // Sets to null on unmount (node=null), resetting the object ref.
        ref.current = node;
      }
    }
    // React 19: aggregate cleanup functions from callback refs.
    if (cleanups.length > 0) return () => cleanups.forEach((fn) => fn());
  };
}

export default function Tooltip({
  children,
  content,
  size = "xs",
  appearance = "light",
  showTail = true,
  placement = "top",
  openDelay = 300,
  closeDelay = 0,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  id,
  className = "",
  portalContainer,
}) {
  // ── Dev-only prop validation ──────────────────────────────────────────
  if (process.env.NODE_ENV !== "production") {
    if (content === null || content === undefined) {
      console.warn("[Tooltip] `content` should not be null or undefined.");
    }
    if (!["xs", "sm"].includes(size)) {
      console.error(
        `[Tooltip] Invalid size="${size}". Must be "xs" or "sm". Falling back to "xs".`
      );
    }
    if (!["light", "dark"].includes(appearance)) {
      console.error(
        `[Tooltip] Invalid appearance="${appearance}". Must be "light" or "dark". Falling back to "light".`
      );
    }
    if (!VALID_PLACEMENTS.includes(placement)) {
      console.error(
        `[Tooltip] Invalid placement="${placement}". ` +
          `Must be one of: ${VALID_PLACEMENTS.join(", ")}. Falling back to "top".`
      );
    }
    if (typeof openDelay !== "number" || openDelay < 0) {
      console.warn(
        `[Tooltip] openDelay should be a non-negative number. Got: ${openDelay}. Falling back to 300.`
      );
    }
    if (typeof closeDelay !== "number" || closeDelay < 0) {
      console.warn(
        `[Tooltip] closeDelay should be a non-negative number. Got: ${closeDelay}. Falling back to 0.`
      );
    }
  }

  // ── Safe prop resolution (D2-A.2 E) ──────────────────────────────────
  // Invalid values fall back to approved defaults. Resolved values drive
  // both JS behavior and CSS classes — no invalid string reaches either.
  const resolvedSize = ["xs", "sm"].includes(size) ? size : "xs";
  const resolvedAppearance = ["light", "dark"].includes(appearance) ? appearance : "light";
  const resolvedPlacement = VALID_PLACEMENTS.includes(placement) ? placement : "top";
  const resolvedOpenDelay =
    typeof openDelay === "number" && openDelay >= 0 ? openDelay : 300;
  const resolvedCloseDelay =
    typeof closeDelay === "number" && closeDelay >= 0 ? closeDelay : 0;

  const sizeConf = SIZE_CONFIG[resolvedSize];

  // ── Controlled / uncontrolled open state ─────────────────────────────
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  // ── Semantic open (D2-A.2 A) ─────────────────────────────────────────
  // Disabled Tooltip is never semantically open regardless of isOpen.
  // This drives: Floating UI open, lifecycle, ARIA, and rendering.
  const semanticOpen = !disabled && isOpen;

  // ── DOM mount / CSS visibility (two-state, mirrors Modal.jsx) ────────
  const [mounted, setMounted] = useState(defaultOpen && !disabled);
  const [visible, setVisible] = useState(false);

  const raf1Ref = useRef(null);
  const raf2Ref = useRef(null);

  // ── Stable tooltip ID ────────────────────────────────────────────────
  const autoId = useId();
  const stableId = id ?? `tooltip-${autoId.replace(/:/g, "")}`;

  // ── Arrow ref ────────────────────────────────────────────────────────
  const arrowRef = useRef(null);
  const viewportOffset = showTail ? sizeConf.tailHeight : 4;

  // ── Open-change handler (controlled + uncontrolled) ──────────────────
  const handleOpenChange = useCallback(
    (nextOpen) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  // ── Floating UI setup ─────────────────────────────────────────────────
  // open=semanticOpen: Floating UI sees disabled as closed (no positioning).
  // placement=resolvedPlacement: invalid value never reaches useFloating.
  const {
    refs,
    floatingStyles,
    context,
    placement: resolvedActivePlacement,
    middlewareData,
  } = useFloating({
      open: semanticOpen,
      onOpenChange: handleOpenChange,
      placement: resolvedPlacement,
      middleware: [
        offset(viewportOffset),
        flip({ fallbackAxisSideDirection: "end" }),
        shift({ padding: 8 }),
        arrowMiddleware({ element: arrowRef }),
      ],
      whileElementsMounted: autoUpdate,
    });

  // ── Interaction hooks ─────────────────────────────────────────────────
  // mouseOnly: hover does not open on touch-generated pointer events.
  const hover = useHover(context, {
    enabled: !disabled,
    delay: { open: resolvedOpenDelay, close: resolvedCloseDelay },
    handleClose: safePolygon(), // WCAG 1.4.13 — pointer may cross the gap
    mouseOnly: true,            // touch handled by useClick below
  });

  // Focus: opens on keyboard focus, closes on blur.
  const focus = useFocus(context, { enabled: !disabled });

  // Click/tap (D2-A.2 C):
  //   ignoreMouse=true     → touch events only (not mouse clicks)
  //   keyboardHandlers=false → Enter/Space do NOT toggle Tooltip via this hook.
  //                            Keyboard open/close comes from useFocus only.
  //                            Trigger's own Enter/Space primary action is preserved.
  const click = useClick(context, {
    enabled: !disabled,
    ignoreMouse: true,
    keyboardHandlers: false,
  });

  // Dismiss: Escape, outside tap, and ancestor scroll all close the tooltip.
  const dismiss = useDismiss(context, {
    ancestorScroll: true, // scroll dismissal (touch + desktop)
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    click,
    dismiss,
  ]);

  // ── Mount / open lifecycle (driven by semanticOpen, D2-A.2 A) ─────────
  useEffect(() => {
    if (semanticOpen) {
      setMounted(true);
      raf1Ref.current = requestAnimationFrame(() => {
        raf2Ref.current = requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
    }
    return () => {
      if (raf1Ref.current) cancelAnimationFrame(raf1Ref.current);
      if (raf2Ref.current) cancelAnimationFrame(raf2Ref.current);
    };
  }, [semanticOpen]);

  // ── Reduced-motion: unmount immediately, no transitionend wait ────────
  useEffect(() => {
    if (visible || !mounted || semanticOpen) return;
    const mq =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) setMounted(false);
  }, [visible, mounted, semanticOpen]);

  // ── Normal animated close: opacity transitionend → unmount ───────────
  const handleTransitionEnd = useCallback(
    (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "opacity") return;
      if (!visible) setMounted(false);
    },
    [visible]
  );

  // ── Disabled state: close safely (D2-A.2 A) ──────────────────────────
  // Uncontrolled: immediately clear local state.
  // Controlled: request closure once via onOpenChange (ref-guarded to prevent
  //   callback loops when the parent does not immediately update its open value).
  //   Parent remains responsible for updating controlled open — Tooltip renders
  //   hidden via semanticOpen while the parent's value is still true.
  const disabledCloseRef = useRef(false);
  useEffect(() => {
    if (disabled && isOpen) {
      if (!isControlled) {
        setUncontrolledOpen(false);
      }
      if (!disabledCloseRef.current) {
        disabledCloseRef.current = true;
        onOpenChange?.(false);
      }
    } else {
      disabledCloseRef.current = false;
    }
  }, [disabled, isOpen, isControlled, onOpenChange]);

  // ── Trigger ref merge (D2-A.2 D) ─────────────────────────────────────
  // React 19: ref is a regular prop — children.props.ref is the consumer ref.
  // useMemo gives stable identity — mergeRefs(...) is called once per
  // dependency change, not once per render invocation of the callback.
  const consumerRef = children?.props?.ref ?? null;
  const mergedRef = useMemo(
    () => mergeRefs(consumerRef, refs.setReference),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [consumerRef, refs.setReference]
  );

  // ── aria-describedby composition (D2-A.2 B) ──────────────────────────
  // Tooltip ID is appended only while semanticOpen AND mounted.
  // This ensures: (a) the referenced ID exists in DOM, (b) AT stops
  // announcing immediately on semantic close (not waiting for fade).
  // Consumer IDs are preserved and never erased. Set deduplicates.
  const consumerAriaDescribedBy = children?.props?.["aria-describedby"] ?? undefined;
  const tooltipAriaDescribedBy = (() => {
    if (!semanticOpen || !mounted) return consumerAriaDescribedBy || undefined;
    const ids = [
      ...new Set([consumerAriaDescribedBy, stableId].filter(Boolean)),
    ];
    return ids.length > 0 ? ids.join(" ") : undefined;
  })();

  // ── Invalid child guard (D2-A.2 F) ───────────────────────────────────
  // This check runs after all hooks (React rules) but before cloneElement.
  // In dev: throw a clear invariant — do not silently wrap an invalid child.
  // In prod: return null — safe fallback, no wrapped element with broken semantics.
  if (!children || !React.isValidElement(children)) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `[Tooltip] children must be a single valid React element. ` +
          `Received: ${children === null ? "null" : typeof children}`
      );
    }
    return null;
  }

  // ── Trigger element ───────────────────────────────────────────────────
  // Composition order:
  //   1. getReferenceProps({ ...children.props }) — consumer props + Floating UI
  //      event handlers composed on top (both run; consumer is not replaced).
  //   2. ref — stable merged ref (consumer + Floating UI).
  //   3. aria-describedby — our computed value with Set dedup.
  const trigger = React.cloneElement(children, {
    ...getReferenceProps({ ...children.props }),
    ref: mergedRef,
    "aria-describedby": tooltipAriaDescribedBy,
  });

  // ── Floating tooltip surface ──────────────────────────────────────────
  // aria-hidden follows semanticOpen (not visible) — AT stops immediately
  // on semantic close, regardless of fade-out animation duration.
  const floating = mounted
    ? ReactDOM.createPortal(
        <div
          ref={refs.setFloating}
          id={stableId}
          role="tooltip"
          aria-hidden={!semanticOpen}
          data-placement={resolvedActivePlacement}
          className={[
            "tooltip",
            `tooltip--${resolvedAppearance}`,
            `tooltip--${resolvedSize}`,
            visible ? "tooltip--open" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          style={floatingStyles}
          onTransitionEnd={handleTransitionEnd}
          {...getFloatingProps()}
        >
          {showTail && (
            <TooltipTail
              size={resolvedSize}
              appearance={resolvedAppearance}
              middlewareData={middlewareData}
              placement={resolvedActivePlacement}
              tailRef={arrowRef}
            />
          )}
          <span className="tooltip__content">{content}</span>
        </div>,
        portalContainer ?? document.body
      )
    : null;

  return (
    <>
      {trigger}
      {floating}
    </>
  );
}
