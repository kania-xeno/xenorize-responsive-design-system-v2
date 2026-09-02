import React, { useId } from "react";
import Modal from "./Modal.jsx";
import ModalHeader from "./ModalHeader.jsx";
import ModalFooter from "./ModalFooter.jsx";
import "./CardModal.css";

/**
 * CardModal — primary public API for general-purpose dialogs
 *
 * Wraps the Modal runtime shell with ModalHeader and ModalFooter.
 * Supports 4 sizes and 4 height behaviours. The xsmall size is
 * mobile-only (bottom sheet); it falls back to 400px on desktop.
 *
 * Props:
 *   open                  {boolean}  — controlled open state
 *   onClose               {function} — called on Escape / overlay click / close btn
 *
 *   — Header (mandatory — all 40 Figma card-modal variants include a header) —
 *   header                {node}     — custom header node; undefined/null/false → auto-composed default.
 *   headerType            {string}   — "basic" | "left-icon" | "error" | "warning" | "success" | "information"
 *   headerSize            {string}   — "medium" (default) | "small"
 *   title                 {string}   — modal title (sets aria-labelledby on the default header)
 *   description           {string}   — subtitle shown in medium header (optional)
 *
 *   — Footer (mandatory — all 40 Figma card-modal variants include a footer) —
 *   footer                {node}     — custom footer node; undefined/null/false → auto-composed default.
 *   footerType            {string}   — "basic" | "stretch" | "checkbox" | "toggle" | "information" | "link-button"
 *   primaryLabel          {string}   — primary CTA label (default: "Confirm")
 *   onPrimary             {function} — primary CTA handler
 *   primaryType           {string}   — Button type (default: "primary")
 *   primaryVariant        {string}   — Button variant (default: "filled")
 *   primaryDisabled       {boolean}  — disables primary CTA
 *   secondaryLabel        {string}   — secondary CTA label (optional)
 *   onSecondary           {function} — secondary CTA handler
 *   leftContent           {node}     — footer left slot (checkbox/toggle/link-button content)
 *
 *   — Shell —
 *   size                  {string}   — "xsmall" | "small" | "medium" (default) | "large"
 *   height                {string}   — "hug" (default) | "short" | "tall" | "venti"
 *   closeOnEscape         {boolean}  — default true
 *   closeOnOverlayClick   {boolean}  — default true
 *   className             {string}   — extra class(es) on the panel
 *   children              {node}     — modal body content
 *
 *   — ARIA —
 *   When using the auto-composed default header (header prop omitted / null / false):
 *     aria-labelledby  {string}  — omit to use the auto-generated title id (recommended)
 *     aria-describedby {string}  — omit to use the auto-generated description id when description is set
 *
 *   When providing a fully custom header node:
 *     RULE: The rendered dialog must never carry an aria-labelledby that points to a
 *           non-existent element. CardModal does NOT inject its auto-generated id into
 *           your custom header tree.
 *     You MUST supply ONE of:
 *       aria-labelledby {string}  — id of the title element inside your custom header
 *       aria-label      {string}  — visible label string when no id-linkable title exists
 *     Omitting both triggers a dev-only console.warn and leaves the dialog unlabelled.
 *     aria-describedby {string}  — id of the description element, if any, in your custom header
 */
export default function CardModal({
  open = false,
  onClose,
  // Header
  header,
  headerType = "basic",
  headerSize = "medium",
  title,
  description,
  // Footer
  footer,
  footerType = "basic",
  primaryLabel = "Confirm",
  onPrimary,
  primaryType = "primary",
  primaryVariant = "filled",
  primaryDisabled = false,
  secondaryLabel,
  onSecondary,
  leftContent,
  // Shell
  size = "medium",
  height = "hug",
  closeOnEscape = true,
  closeOnOverlayClick = true,
  className = "",
  // ARIA
  "aria-labelledby": ariaLabelledByProp,
  "aria-describedby": ariaDescribedByProp,
  "aria-label": ariaLabel,
  children,
}) {
  const autoId = useId();
  const idSlug = autoId.replace(/:/g, "");

  // hasCustomHeader gates all ARIA auto-id logic.
  // `||` intentional: undefined / null / false all mean "use default".
  const hasCustomHeader = Boolean(header);

  // DEFAULT HEADER: auto-generate ids so ModalHeader title/description nodes
  // can receive them. Consumer may override either via explicit prop.
  //
  // CUSTOM HEADER: do NOT emit the auto-generated id — the custom header tree
  // does not contain an element with that id. Only use consumer-supplied ids.
  // An undefined titleId means no aria-labelledby will be emitted by Modal.
  const titleId = hasCustomHeader
    ? ariaLabelledByProp                                  // undefined → no aria-labelledby
    : (ariaLabelledByProp ?? `card-modal-title-${idSlug}`);

  // descId: ModalHeader only renders the description element when size==="medium" && description.
  // Generating descId for size="small" would produce a dangling aria-describedby reference.
  const descId = hasCustomHeader
    ? ariaDescribedByProp                                  // undefined → no aria-describedby
    : (ariaDescribedByProp ?? (description && headerSize === "medium" ? `card-modal-desc-${idSlug}` : undefined));

  // Dev guard: custom header with no accessible name → dialog will be unlabelled.
  if (
    process.env.NODE_ENV !== "production" &&
    hasCustomHeader &&
    !ariaLabelledByProp &&
    !ariaLabel
  ) {
    console.warn(
      "CardModal: a custom `header` was provided but neither `aria-labelledby` nor " +
        "`aria-label` was passed. The dialog will have no accessible name. " +
        "Pass `aria-labelledby` pointing to the title element inside your header, " +
        "or `aria-label` as a fallback."
    );
  }

  const isXSmall = size === "xsmall";

  // Dev hint: xsmall is mobile-only
  if (
    process.env.NODE_ENV !== "production" &&
    isXSmall &&
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches
  ) {
    console.warn(
      "CardModal: size=\"xsmall\" is a mobile-only bottom sheet. " +
        "Use size=\"small\", \"medium\", or \"large\" for desktop/tablet contexts."
    );
  }

  // Header and footer are MANDATORY (Figma: 0 of 40 card-modal variants are headerless/footerless).
  // Use `||` not `??`: undefined/null/false all render the default slot.
  // A truthy React node is treated as a custom override.
  const resolvedHeader =
    header || (
      <ModalHeader
        type={headerType}
        size={headerSize}
        title={title}
        description={description}
        onClose={onClose}
        titleId={titleId}
        descriptionId={description ? descId : undefined}
      />
    );

  const resolvedFooter =
    footer || (
      <ModalFooter
        type={footerType}
        primaryLabel={primaryLabel}
        onPrimary={onPrimary}
        primaryType={primaryType}
        primaryVariant={primaryVariant}
        primaryDisabled={primaryDisabled}
        secondaryLabel={secondaryLabel}
        onSecondary={onSecondary}
        leftContent={leftContent}
      />
    );

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={size}
      height={height}
      isBottomSheet={isXSmall}
      closeOnEscape={closeOnEscape}
      closeOnOverlayClick={closeOnOverlayClick}
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={descId}
      aria-label={ariaLabel}
      className={["card-modal", className].filter(Boolean).join(" ")}
    >
      {/* Grabber affordance: mobile xsmall only — visual, no drag gesture in D2 */}
      {isXSmall && (
        <div className="card-modal__grabber" aria-hidden="true">
          <span className="card-modal__grabber-bar" />
        </div>
      )}

      {resolvedHeader}

      <div className="card-modal__body">{children}</div>

      {resolvedFooter}
    </Modal>
  );
}
