import LabelKey  from '../key-component/LabelKey.jsx';
import HintText  from '../key-component/HintText.jsx';
import './FormField.css';

/**
 * FormField — composed form field layout
 *
 * Assembles the DS anatomy:
 *   LabelKey   ← existing ↳label-key component, unchanged
 *   Input Field ← any ↳input-text/* variant passed as `children`
 *   HintText    ← existing ↳hint-text component, unchanged
 *
 * This wrapper ONLY handles layout and state coordination.
 * It does not duplicate LabelKey or HintText logic or CSS.
 *
 * State coordination:
 *   disabled=true  → LabelKey state='disabled' + HintText state='disabled'
 *   error=true     → LabelKey state='normal'   + HintText state='error'
 *   (disabled takes precedence over error)
 *
 * ⚠️ Accessibility note: LabelKey renders a <div>/<span>, not an HTML <label>.
 * Until the DS upgrades LabelKey to render <label htmlFor>, associate the
 * label to the input via `aria-label` or `aria-labelledby` externally.
 * Pass `id` to the child input and `hintId` here for `aria-describedby` wiring.
 *
 * @param {boolean} showLabel       — Render LabelKey above the input (default true). Set false for field-only.
 * @param {boolean} showHint        — Render HintText below the input (default true). Set false to hide even when hint is set.
 * @param {string}  label           — Label text (forwarded to LabelKey)
 * @param {boolean} showRequired    — Show asterisk (forwarded to LabelKey)
 * @param {boolean} showSublabel    — Show optional sublabel (forwarded to LabelKey)
 * @param {string}  sublabel        — Sublabel text, default "(Optional)"
 * @param {boolean} showInfo        — Show info icon (forwarded to LabelKey)
 * @param {boolean} showHelp        — Show help link (forwarded to LabelKey)
 * @param {string}  helpText        — Help link text (forwarded to LabelKey)
 * @param {string}  helpHref        — Help link href (forwarded to LabelKey)
 * @param {string}  hint            — Hint message. If empty or showHint=false, HintText is not rendered.
 * @param {string}  hintState       — 'default' | 'error' | 'success' | 'disabled'
 *                                    Auto-set to 'disabled' when disabled=true.
 *                                    Auto-set to 'error' when error=true and no override.
 * @param {boolean} hintShowIcon    — Show icon in HintText (default true)
 * @param {string}  hintId          — id applied to HintText for aria-describedby wiring
 * @param {boolean} disabled        — Coordinates disabled state across LabelKey + HintText
 * @param {boolean} error           — Coordinates error state on HintText
 * @param {*}       children        — The input field component (any ↳input-text/* variant)
 * @param {string}  className       — Additional class on the root wrapper
 */
export default function FormField({
  // Visibility toggles
  showLabel     = true,
  showHint      = true,

  // LabelKey props
  label        = 'Label',
  showRequired  = false,
  showSublabel  = false,
  sublabel      = '(Optional)',
  showInfo      = false,
  showHelp      = false,
  helpText      = 'Help?',
  helpHref,

  // HintText props
  hint          = '',
  hintState,
  hintShowIcon  = true,
  hintId,

  // State coordination
  disabled      = false,
  error         = false,

  // Layout
  children,
  className     = '',
}) {
  const labelState        = disabled ? 'disabled' : 'normal';
  const resolvedHintState = disabled ? 'disabled'
                          : hintState ?? (error ? 'error' : 'default');

  return (
    <div className={['form-field', className].filter(Boolean).join(' ')}>
      {showLabel && (
        <LabelKey
          label={label}
          state={labelState}
          showRequired={showRequired}
          showSublabel={showSublabel}
          sublabel={sublabel}
          showInfo={showInfo}
          showHelp={showHelp}
          helpText={helpText}
          helpHref={helpHref}
        />
      )}

      {children}

      {showHint && hint && (
        <HintText
          state={resolvedHintState}
          message={hint}
          showIcon={hintShowIcon}
          id={hintId}
        />
      )}
    </div>
  );
}
