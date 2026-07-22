import './InputText.css';
import CalendarIcon from '../../icons/CalendarIcon.jsx';

/**
 * DateInput — ↳input-text/date
 * Source: Design System Scalable V.2.1.0 · Page: ❖ Input Text
 * Token namespace: input-text/date/*
 *
 * Trailing calendar icon (⚠️ placeholder) always present.
 * icon/disabled = #A3A3A3 (icon/soft) — differs from basic (#D1D1D1).
 *
 * Sizes:  md (40px) · sm (36px) · xs (32px)
 * States: default · hover (CSS) · focus (CSS) · filled · disabled · error
 *
 * @param {string}   [size='md']
 * @param {boolean}  [disabled=false]
 * @param {boolean}  [error=false]
 * @param {string}   [value]
 * @param {Function} [onChange]
 * @param {string}   [placeholder]
 * @param {string}   [id]
 * @param {string}   [name]
 * @param {string}   [className]
 */
export default function DateInput({
  size = 'md',
  disabled = false,
  error = false,
  value,
  onChange,
  placeholder = 'DD/MM/YYYY',
  id,
  name,
  className = '',
  ...rest
}) {
  const isFilled = value !== undefined ? value.length > 0 : false;

  const rootClass = [
    'input-text',
    'input-text--date',
    `input-text--${size}`,
    isFilled && !disabled && !error ? 'input-text--filled' : '',
    disabled ? 'input-text--disabled' : '',
    error   ? 'input-text--error'    : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <input
        className="input-text__field"
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error || undefined}
        {...rest}
      />
      <span className="input-text__icon-trailing" aria-hidden="true">
        <CalendarIcon />
      </span>
    </div>
  );
}
