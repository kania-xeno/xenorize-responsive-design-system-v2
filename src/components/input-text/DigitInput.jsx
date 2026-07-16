import { useRef } from 'react';
import './InputText.css';

/**
 * DigitInput — ↳input-text/digit-input
 * Source: Design System Scalable V.2.1.0 · Page: ❖ Input Text
 * Token namespace: input-text/digit-input/field/*
 *
 * ⚠️ No size axis — fixed cell: 80×64px (confirmed from Figma node 1986:195).
 * ⚠️ No placeholder. No icon tokens. No label inside cell.
 * ⚠️ Error state uses CSS class (.digit-input__cell--error) — Figma has 5
 *    variants (Default/Hover/Focus/Filled/Disabled), no Error variant.
 *    Error styling applied externally via `error` prop on the wrapper.
 * ⚠️ Cell gap (8px) assumed — verify at QA.
 * ⚠️ Font size in cell (24px) assumed — verify at QA.
 * ⚠️ Auto-advance on digit entry is included as UX behaviour.
 *
 * @param {number}   [length=6]        — Number of digit cells
 * @param {string}   [value='']        — Controlled string of digits (e.g. '1234')
 * @param {Function} [onChange]        — Called with new full-string value
 * @param {boolean}  [disabled=false]
 * @param {boolean}  [error=false]
 * @param {string}   [id]              — Applied to first cell for label association
 * @param {string}   [className]
 */
export default function DigitInput({
  length = 6,
  value = '',
  onChange,
  disabled = false,
  error = false,
  id,
  className = '',
}) {
  const refs = useRef([]);

  function handleKeyDown(e, index) {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        refs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handleInput(e, index) {
    const incoming = e.target.value.replace(/\D/g, '').slice(-1);
    if (!incoming) return;
    const chars = value.split('');
    chars[index] = incoming;
    const next = chars.join('').padEnd(length, '').slice(0, length);
    onChange?.(next);
    // Advance focus to next empty or next cell
    if (index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange?.(pasted.padEnd(length, '').slice(0, length));
    const nextIndex = Math.min(pasted.length, length - 1);
    refs.current[nextIndex]?.focus();
  }

  return (
    <div className={['digit-input', className].filter(Boolean).join(' ')}>
      {Array.from({ length }, (_, i) => {
        const digit = value[i] ?? '';
        const cellClass = [
          'digit-input__cell',
          digit               ? 'digit-input__cell--filled'   : '',
          disabled            ? 'digit-input__cell--disabled'  : '',
          error && !disabled  ? 'digit-input__cell--error'     : '',
        ].filter(Boolean).join(' ');

        return (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            className={cellClass}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            id={i === 0 ? id : undefined}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${length}`}
            aria-invalid={error || undefined}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onInput={(e) => handleInput(e, i)}
            onPaste={i === 0 ? handlePaste : undefined}
            onChange={() => {}}  // Controlled — suppress React warning
          />
        );
      })}
    </div>
  );
}
