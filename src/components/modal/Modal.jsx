import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

/**
 * Modal — shared runtime shell (internal)
 *
 * Not a primary public API. Consumed by CardModal and StatusModal.
 * Handles: portal, overlay, focus trap, Escape, scroll lock, focus restore,
 * reduced-motion, entrance/exit transition, safe unmount after close transition.
 *
 * Props:
 *   open                  {boolean}  — controlled open state
 *   onClose               {function} — called when Escape pressed or overlay clicked
 *   closeOnEscape         {boolean}  — default true
 *   closeOnOverlayClick   {boolean}  — default true
 *   role                  {string}   — "dialog" | "alertdialog"
 *   aria-labelledby       {string}   — id of the title element
 *   aria-describedby      {string}   — id of the description element
 *   aria-label            {string}   — label when no visible title id is available
 *   size                  {string}   — "small" | "medium" | "large" | "xsmall"
 *   height                {string}   — "hug" | "short" | "tall" | "venti"
 *   isBottomSheet         {boolean}  — true for xsmall on mobile
 *   className             {string}   — extra class(es) on the panel
 *   overlayProps          {object}   — extra props spread onto the overlay div
 *   panelProps            {object}   — extra props spread onto the panel div
 *   children              {node}
 */
const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function Modal({
  open = false,
  onClose,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  role = "dialog",
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  size = "medium",
  height = "hug",
  isBottomSheet = false,
  className = "",
  overlayProps = {},
  panelProps = {},
  children,
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const triggerRef = useRef(null);
  const raf1Ref = useRef(null);
  const raf2Ref = useRef(null);

  // ── Mount / open lifecycle (double-rAF for entrance) ──
  useEffect(() => {
    if (open) {
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
  }, [open]);

  // ── Reduced-motion: unmount immediately without waiting for transitionend ──
  // Guard: `open` must be false before allowing immediate unmount.
  // During opening, mounted=true and visible=false transiently (between setMounted(true)
  // and the double-rAF that fires setVisible(true)). Without the `open` guard, this
  // effect would race and unmount the modal immediately after it mounts when
  // prefers-reduced-motion is active.
  useEffect(() => {
    if (visible || !mounted || open) return;
    const mq =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) setMounted(false);
  }, [visible, mounted, open]);

  // ── Normal animated close: transitionend → unmount ──
  const handleTransitionEnd = useCallback(
    (e) => {
      if (e.target !== panelRef.current) return;
      // Listen to opacity for normal panels, transform for bottom-sheet (translateY only)
      if (e.propertyName !== "opacity" && e.propertyName !== "transform") return;
      if (!visible) setMounted(false);
    },
    [visible]
  );

  // ── Body scroll lock ──
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ── Focus restore ──
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
    } else {
      const el = triggerRef.current;
      if (el && typeof el.focus === "function") {
        // Defer so the focus restore runs after the panel unmounts
        requestAnimationFrame(() => el.focus());
      }
      triggerRef.current = null;
    }
  }, [open]);

  // ── Focus trap (Tab / Shift+Tab) ──
  useEffect(() => {
    if (!open) return;

    const getFocusable = () => {
      if (!panelRef.current) return [];
      return Array.from(
        panelRef.current.querySelectorAll(FOCUSABLE_SELECTORS)
      ).filter(
        (el) =>
          !el.closest("[inert]") &&
          !el.hasAttribute("inert") &&
          !el.closest("[aria-hidden='true']")
      );
    };

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) {
        e.preventDefault();
        return;
      }
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

    // Move initial focus into the panel
    requestAnimationFrame(() => {
      const focusable = getFocusable();
      if (focusable.length) {
        focusable[0].focus();
      } else if (panelRef.current) {
        panelRef.current.focus();
      }
    });

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // ── Escape key ──
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  if (!mounted) return null;

  const overlayClass = [
    "modal-overlay",
    visible ? "modal-overlay--open" : "",
    isBottomSheet ? "modal-overlay--bottom-sheet" : "",
    overlayProps.className,
  ]
    .filter(Boolean)
    .join(" ");

  const panelClass = [
    "modal-panel",
    `modal-panel--${size}`,
    height !== "hug" ? `modal-panel--h-${height}` : "",
    className,
    panelProps.className,
  ]
    .filter(Boolean)
    .join(" ");

  return ReactDOM.createPortal(
    <div
      {...overlayProps}
      ref={overlayRef}
      className={overlayClass}
      onClick={(e) => {
        if (e.target === overlayRef.current && closeOnOverlayClick) {
          onClose?.();
        }
        overlayProps.onClick?.(e);
      }}
    >
      <div
        {...panelProps}
        ref={panelRef}
        role={role}
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        tabIndex={-1}
        className={panelClass}
        style={panelProps.style}
        onTransitionEnd={(e) => {
          handleTransitionEnd(e);
          panelProps.onTransitionEnd?.(e);
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
