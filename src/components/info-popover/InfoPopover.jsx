/* ─────────────────────────────────────────────────────────────────────────────
   InfoPopover — component
   Source:   Figma ↳info-popover (3486:74, 16 variants = 8 placements × 2 appearances)
   File key: 0aVnOgjVWH1YL8JCnjXTBi
   Tokens:   --info-popover-light-*, --info-popover-dark-*, --shadow-components-tooltip-*
   Tail:     12×6 px (same geometry as Tooltip SM tail). Custom SVG — NOT FloatingArrow.
   Role:     role="dialog" + aria-modal={false} + aria-labelledby. NOT role="tooltip".
   Trigger:  Click to open (useClick). Close on Escape / click-outside (useDismiss).
   D3 ref:   component-info-popover-dt-d3-runtime-implementation.md

   Constraints (all always active):
   • Do NOT use role="tooltip"
   • Do NOT use FloatingArrow (custom tail only)
   • Do NOT modify CompactButton, Tooltip, or token values
   • SINGLE-MODE tokens: light/dark driven by `appearance` prop — NOT [data-theme]
   • AE-01: --info-popover-light-text-description = #A3A3A3 on #FFFFFF = 2.53:1
     KNOWN ACCESSIBILITY EXCEPTION — DESIGNER ACCEPTED. Do not alter.
   ──────────────────────────────────────────────────────────────────────────── */

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
  autoUpdate,
  arrow as arrowMiddleware,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";

import CompactButton from "../compact-button/CompactButton.jsx";
import CrossSmall from "../../icons/CrossSmall.jsx";
import CircleInfo from "../../icons/CircleInfo.jsx";
import "./InfoPopover.css";

/* ── Constants ─────────────────────────────────────────────────────────────── */

/** Valid placement values matching Figma's 8 Type variants → @floating-ui mapping.
 *  Figma "Top Left" = FUI `bottom-start`; "Top Center" = `bottom`; etc.
 *  Props API uses FUI convention: placement describes where the popover appears.
 */
const VALID_PLACEMENTS = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "right",
];

/**
 * Tail geometry — 12×6 px triangle (same as Tooltip SM tail).
 * safeW = tailWidth(12) + 3 px overhang each side.
 * Bezier constants match Tooltip's D2-A.1 confirmed values.
 */
const TAIL_CFG = {
  safeW:  18,      // SVG width for top/bottom placements
  tailH:  6,       // triangle depth (px)
  svgH:   8.379,   // total SVG height (tailH + seam zone)
  seamY:  6.379,   // y-top of seam-cover rect
  baseY:  6.879,   // y of triangle base points
  halfB:  7.207,   // half triangle base width
};

/**
 * Maps the floating element's side to the tail's positioned edge.
 * Side 'bottom' (popover above trigger) → tail hangs off bottom of surface.
 */
const TAIL_STATIC_SIDE = {
  top:    "bottom",
  bottom: "top",
  left:   "right",
  right:  "left",
};

/* ── InfoPopoverTail ───────────────────────────────────────────────────────── */

/**
 * Figma-accurate composite tail for InfoPopover.
 * Geometry: 12×6 px bezier triangle + seam-cover rect (same as Tooltip SM).
 * Light: fill + 1 px stroke. Dark: fill only, no stroke.
 * Orientation-aware: left/right placements swap DOM w/h; internal <g transform>
 * rotates geometry (NOT CSS rotation on the outer element — keeps layout box correct).
 */
function InfoPopoverTail({ appearance, middlewareData, placement, tailRef }) {
  const cfg = TAIL_CFG;
  const side = placement.split("-")[0];
  const cx   = cfg.safeW / 2; // 9 — horizontal centre

  // Bezier path — same formula as Tooltip SM tail (D2-A.1)
  const path =
    `M ${cx - 1.4141} 1.0857 ` +
    `C ${cx - 0.633} 0.305 ${cx + 0.633} 0.305 ${cx + 1.4141} 1.0857 ` +
    `L ${cx + cfg.halfB} ${cfg.baseY} ` +
    `L ${cx - cfg.halfB} ${cfg.baseY} Z`;

  const isLight  = appearance === "light";
  const fill     = isLight ? "var(--info-popover-light-bg)"     : "var(--info-popover-dark-bg)";
  const stroke   = isLight ? "var(--info-popover-light-border)" : "none";
  const strokeW  = isLight ? 1 : 0;

  // arrowMiddleware provides x/y offset for the tail along the edge
  const ax = middlewareData?.arrow?.x;
  const ay = middlewareData?.arrow?.y;

  // For left/right placements: swap DOM w/h so arrowMiddleware measures correct footprint
  const isVertical = side === "left" || side === "right";
  const domW = isVertical ? cfg.svgH  : cfg.safeW;
  const domH = isVertical ? cfg.safeW : cfg.svgH;

  // Internal <g transform> rotates geometry for non-bottom placements
  let gTransform;
  if (side === "top") {
    gTransform = `rotate(180, ${cfg.safeW / 2}, ${cfg.svgH / 2})`;
  } else if (side === "left") {
    // Popover is to the right of trigger → tail points left
    gTransform = `translate(${cfg.svgH}, 0) rotate(90)`;
  } else if (side === "right") {
    // Popover is to the left of trigger → tail points right
    gTransform = `translate(0, ${cfg.safeW}) rotate(-90)`;
  }
  // side === "bottom": tail points up (default orientation) — no transform needed

  const posStyle = {
    position:      "absolute",
    pointerEvents: "none",
  };
  // Static edge offset — places tail flush at the correct surface edge
  posStyle[TAIL_STATIC_SIDE[side]] = -cfg.tailH;
  // arrowMiddleware cross-axis offset (x for top/bottom, y for left/right)
  if (ax != null) posStyle.left = ax;
  if (ay != null) posStyle.top  = ay;

  return (
    <svg
      ref={tailRef}
      aria-hidden="true"
      className="info-popover-tail"
      width={domW}
      height={domH}
      viewBox={`0 0 ${domW} ${domH}`}
      style={posStyle}
    >
      <g transform={gTransform || undefined}>
        {/* Triangle */}
        <path d={path} fill={fill} stroke={stroke} strokeWidth={strokeW} />
        {/* Seam-cover rect: hides the surface border at the tail junction */}
        <rect
          x={0}
          y={cfg.seamY}
          width={cfg.safeW}
          height={2}
          rx={1}
          fill={fill}
          stroke="none"
        />
      </g>
    </svg>
  );
}

/* ── mergeRefs ─────────────────────────────────────────────────────────────── */

/** Merges multiple React refs (function refs + ref objects) into one callback. */
function mergeRefs(...refs) {
  return (node) => {
    const cleanups = [];
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        const result = ref(node);
        if (typeof result === "function") cleanups.push(result);
      } else if (typeof ref === "object" && "current" in ref) {
        ref.current = node;
      }
    }
    if (cleanups.length > 0) return () => cleanups.forEach((fn) => fn());
  };
}

/* ── InfoPopover ───────────────────────────────────────────────────────────── */

/**
 * InfoPopover — click-triggered informational dialog with a custom bezier tail.
 *
 * Anatomy (Figma ↳info-popover 3486:74):
 *   [Left Icon 20×20] [Label: Title + Description] [Dismiss 24×24]
 *   Surface: 12 px padding, 12 px gap, 12 px radius, max-width 280 px
 *   Tail:    12×6 px (same as Tooltip SM)
 *
 * ARIA contract:
 *   • Floating element: role="dialog" aria-modal={false} aria-labelledby={titleId}
 *   • Trigger: aria-expanded aria-haspopup="dialog" aria-controls={id}
 *
 * Accepted accessibility exception AE-01:
 *   --info-popover-light-text-description → #A3A3A3 on #FFFFFF = 2.53:1
 *   KNOWN ACCESSIBILITY EXCEPTION — DESIGNER ACCEPTED.
 *   Do NOT classify as accessible, darken, substitute, or report as WCAG AA.
 *
 * @param {React.ReactElement}  children        - Trigger element (required, single element)
 * @param {string}              title           - Popover title (required)
 * @param {string}              [description]   - Supplemental description text
 * @param {string}              [placement]     - @floating-ui placement (default: "bottom")
 * @param {'light'|'dark'}      [appearance]    - Appearance mode (default: "light")
 * @param {boolean}             [showTail]      - Show/hide bezier tail (default: true)
 * @param {boolean}             [showLeftIcon]  - Show/hide left icon slot (default: true)
 * @param {React.ReactNode}     [leftIcon]      - Left icon (default: <CircleInfo />)
 * @param {boolean}             [showDismiss]   - Show/hide dismiss button (default: true)
 * @param {string}              [dismissLabel]  - aria-label on the dismiss button (default: "Close")
 * @param {function}            [onDismiss]     - Called when the popover is dismissed by the user.
 *                                                Signature: ({ reason }) where reason is one of:
 *                                                "dismiss-button" | "escape-key" | "outside-press" | "ancestor-scroll"
 *                                                NOT called for trigger-toggle (reference-press) or controlled parent close.
 * @param {boolean}             [open]          - Controlled open state
 * @param {boolean}             [defaultOpen]   - Uncontrolled initial open state
 * @param {function}            [onOpenChange]  - Callback when open state changes (all transitions)
 * @param {boolean}             [disabled]      - Disable open/close interaction
 * @param {string}              [id]            - Stable id for the dialog element
 * @param {string}              [className]     - Additional class names on the dialog
 * @param {Element|null}        [portalContainer] - Portal target (default: document.body)
 */
export default function InfoPopover({
  children,
  title,
  description,
  placement     = "bottom",
  appearance    = "light",
  showTail      = true,
  showLeftIcon  = true,
  leftIcon,
  showDismiss   = true,
  dismissLabel  = "Close",
  onDismiss,
  open: controlledOpen,
  defaultOpen   = false,
  onOpenChange,
  disabled      = false,
  id,
  className     = "",
  portalContainer,
}) {
  /* ── Dev-only prop validation ─────────────────────────────────────────── */
  if (process.env.NODE_ENV !== "production") {
    if (!title) {
      console.warn("[InfoPopover] `title` prop is required.");
    }
    if (!["light", "dark"].includes(appearance)) {
      console.error(
        `[InfoPopover] Invalid appearance="${appearance}". Must be "light" or "dark".`
      );
    }
    if (!VALID_PLACEMENTS.includes(placement)) {
      console.error(
        `[InfoPopover] Invalid placement="${placement}". ` +
        `Must be one of: ${VALID_PLACEMENTS.join(", ")}.`
      );
    }
    if (!children || !React.isValidElement(children)) {
      console.error("[InfoPopover] children must be a single valid React element.");
    }
  }

  /* ── Safe prop resolution ─────────────────────────────────────────────── */
  const resolvedAppearance = ["light", "dark"].includes(appearance)
    ? appearance
    : "light";
  const resolvedPlacement = VALID_PLACEMENTS.includes(placement)
    ? placement
    : "bottom";

  /* ── Open state (controlled / uncontrolled) ───────────────────────────── */
  const isControlled       = controlledOpen !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isOpen             = isControlled ? controlledOpen : uncontrolled;
  const semanticOpen       = !disabled && isOpen;

  /* ── DOM mount / CSS opacity (two-state, avoids stale tail positions) ─── */
  const [mounted, setMounted]   = useState(defaultOpen && !disabled);
  const [visible, setVisible]   = useState(false);
  const raf1Ref = useRef(null);
  const raf2Ref = useRef(null);

  /* ── IDs ──────────────────────────────────────────────────────────────── */
  const autoId       = useId();
  const stableId     = id ?? `info-popover-${autoId.replace(/:/g, "")}`;
  const titleId      = `${stableId}-title`;
  // D3.1.2: stable descriptionId — only set when description exists; never empty string
  const descriptionId = description ? `${stableId}-description` : undefined;

  /* ── Refs ─────────────────────────────────────────────────────────────── */
  const arrowRef      = useRef(null); // tail SVG — fed to arrowMiddleware
  const dismissRef    = useRef(null); // CompactButton — receives focus on open
  // D3.1.3: tracks the FUI close reason so focus-return is reason-aware
  const closeReasonRef = useRef(null);

  /* ── Open-change handler ──────────────────────────────────────────────── */
  // D3.1.1 / D3.1.3: accepts FUI's (nextOpen, event, reason) signature.
  //   - Tracks closeReasonRef for focus-return decisions (D3.1.3).
  //   - Fires onDismiss for user-initiated close reasons.
  //     NOT fired for trigger-toggle ("reference-press") or controlled-parent close.
  //   - onOpenChange is always called (all transitions, all reasons).
  //
  // A3 ambiguity note: No InfoPopover-specific A3 handoff spec was found on disk.
  // onDismiss contract is derived from FUI v0.27.20 capabilities + D3.1 spec:
  //   fires for: "dismiss-button", "escape-key", "outside-press", "ancestor-scroll"
  //   silent for: "reference-press" (trigger toggle) and controlled parent close.
  const DISMISS_REASONS = new Set([
    "dismiss-button",
    "escape-key",
    "outside-press",
    "ancestor-scroll",
  ]);
  const handleOpenChange = useCallback(
    (nextOpen, event, reason) => {
      if (!nextOpen) {
        closeReasonRef.current = reason ?? null;
        if (onDismiss && DISMISS_REASONS.has(reason)) {
          onDismiss({ reason });
        }
      }
      if (!isControlled) setUncontrolled(nextOpen);
      onOpenChange?.(nextOpen, event, reason);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isControlled, onOpenChange, onDismiss]
  );

  /* ── Floating UI ──────────────────────────────────────────────────────── */
  const viewportOffset = showTail ? TAIL_CFG.tailH : 4;

  const {
    refs,
    floatingStyles,
    context,
    placement: activePlacement,
    middlewareData,
  } = useFloating({
    open:          semanticOpen,
    onOpenChange:  handleOpenChange,
    placement:     resolvedPlacement,
    middleware: [
      offset(viewportOffset),
      flip({ fallbackAxisSideDirection: "end" }),
      shift({ padding: 8 }),
      arrowMiddleware({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  // Click to open/close (touch + mouse + keyboard Enter/Space via button trigger)
  const click   = useClick(context,   { enabled: !disabled });
  // Dismiss: Escape key, click outside, ancestor scroll
  const dismiss = useDismiss(context, { ancestorScroll: true });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  /* ── Mount / fade lifecycle ───────────────────────────────────────────── */
  useEffect(() => {
    if (semanticOpen) {
      setMounted(true);
      // Double-rAF: mount first, then set visible on next paint for CSS transition
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

  // Unmount after fade-out (transitionend on the floating element)
  const handleTransitionEnd = useCallback(
    (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "opacity") return;
      if (!visible) setMounted(false);
    },
    [visible]
  );

  // Reduced-motion: skip fade, unmount immediately
  useEffect(() => {
    if (visible || !mounted || semanticOpen) return;
    const mq =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) setMounted(false);
  }, [visible, mounted, semanticOpen]);

  /* ── Disabled: close safely if open ──────────────────────────────────── */
  const disabledCloseRef = useRef(false);
  useEffect(() => {
    if (disabled && isOpen) {
      if (!isControlled) setUncontrolled(false);
      if (!disabledCloseRef.current) {
        disabledCloseRef.current = true;
        onOpenChange?.(false);
      }
    } else {
      disabledCloseRef.current = false;
    }
  }, [disabled, isOpen, isControlled, onOpenChange]);

  /* ── Focus management ─────────────────────────────────────────────────── */
  // Focus dismiss button when popover opens (keyboard-accessible entry point)
  useEffect(() => {
    if (semanticOpen && mounted && showDismiss && dismissRef.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dismissRef.current?.focus();
        });
      });
    }
  }, [semanticOpen, mounted, showDismiss]);

  // D3.1.3: Return focus to trigger on close — reason-aware.
  // Only restore focus for keyboard-initiated or explicit dismiss-button close.
  // Outside-press: user clicked another element — do not steal focus back.
  // Ancestor-scroll: user scrolled — focus jump would be disorienting.
  // Trigger-toggle (reference-press): focus was never moved away from trigger.
  // Controlled parent close: no reason captured — default safe = no steal.
  const FOCUS_RETURN_REASONS = new Set(["dismiss-button", "escape-key"]);
  const wasSemanticallyOpenRef = useRef(false);
  useEffect(() => {
    if (wasSemanticallyOpenRef.current && !semanticOpen) {
      const reason = closeReasonRef.current;
      if (FOCUS_RETURN_REASONS.has(reason)) {
        requestAnimationFrame(() => {
          refs.reference.current?.focus();
        });
      }
      closeReasonRef.current = null;
    }
    wasSemanticallyOpenRef.current = semanticOpen;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semanticOpen, refs.reference]);

  /* ── Trigger ref merge ────────────────────────────────────────────────── */
  // eslint-disable-next-line react/prop-types
  const consumerRef = children?.props?.ref ?? null;
  const mergedRef   = useMemo(
    () => mergeRefs(consumerRef, refs.setReference),
    [consumerRef, refs.setReference]
  );

  /* ── Guard ────────────────────────────────────────────────────────────── */
  if (!children || !React.isValidElement(children)) {
    return null;
  }

  /* ── Dismiss handler ──────────────────────────────────────────────────── */
  // D3.1.3: pass explicit reason so handleOpenChange fires onDismiss correctly
  // and focus-return logic knows to restore focus to the trigger.
  const handleDismiss = () => handleOpenChange(false, undefined, "dismiss-button");

  /* ── Resolved left icon ───────────────────────────────────────────────── */
  const resolvedLeftIcon = leftIcon ?? <CircleInfo />;

  /* ── Trigger ──────────────────────────────────────────────────────────── */
  // Compose getReferenceProps with existing children props and ARIA attributes.
  // aria-expanded + aria-haspopup + aria-controls declared here (not by useRole)
  // because InfoPopover does NOT use FloatingPortal's focus manager or useRole.
  const trigger = React.cloneElement(children, {
    ...getReferenceProps({ ...children.props }),
    ref:              mergedRef,
    "aria-expanded":  semanticOpen,
    "aria-haspopup":  "dialog",
    "aria-controls":  semanticOpen && mounted ? stableId : undefined,
  });

  /* ── Floating panel ───────────────────────────────────────────────────── */
  const floating = mounted
    ? ReactDOM.createPortal(
        <div
          ref={refs.setFloating}
          id={stableId}
          role="dialog"
          aria-modal={false}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          aria-hidden={!semanticOpen}
          data-placement={activePlacement}
          className={[
            "info-popover",
            `info-popover--${resolvedAppearance}`,
            visible ? "info-popover--open" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          style={floatingStyles}
          onTransitionEnd={handleTransitionEnd}
          {...getFloatingProps()}
        >
          {/* Custom bezier tail — NOT FloatingArrow (D3 constraint) */}
          {showTail && (
            <InfoPopoverTail
              appearance={resolvedAppearance}
              middlewareData={middlewareData}
              placement={activePlacement}
              tailRef={arrowRef}
            />
          )}

          {/* Left icon slot — CircleInfo (20×20, fill=currentColor) */}
          {showLeftIcon && (
            <span
              className="info-popover__left-icon"
              aria-hidden="true"
            >
              {resolvedLeftIcon}
            </span>
          )}

          {/* Label column — title (required) + description (optional) */}
          <div className="info-popover__label">
            <span id={titleId} className="info-popover__title">
              {title}
            </span>
            {description && (
              <span
                id={descriptionId}
                className="info-popover__description"
              >
                {/* AE-01: light description = #A3A3A3 on #FFFFFF = 2.53:1.
                    KNOWN ACCESSIBILITY EXCEPTION — DESIGNER ACCEPTED.
                    Do not alter color, add aria-*, or suppress axe warnings. */}
                {description}
              </span>
            )}
          </div>

          {/* Dismiss button — CompactButton ghost/large/no-fullRadius + CrossSmall */}
          {showDismiss && (
            <CompactButton
              ref={dismissRef}
              variant="ghost"
              size="large"
              fullRadius={false}
              icon={<CrossSmall />}
              aria-label={dismissLabel}
              onClick={handleDismiss}
              className="info-popover__dismiss"
            />
          )}
        </div>,
        portalContainer ?? document.body
      )
    : null;

  /* ── Render ───────────────────────────────────────────────────────────── */
  return (
    <>
      {trigger}
      {floating}
    </>
  );
}
