import './InputText.css';
import LinkIcon from '../icons/LinkIcon.jsx';

/**
 * LinkInput — ↳input-text/link
 * Source: Design System Scalable V.2.1.0 · Page: ❖ Input Text
 * Token namespace: input-text/link/*
 *
 * ⚠️ LinkIcon is a placeholder — replace with final DS icon path.
 * ⚠️ icon/disabled = #A3A3A3 (icon/soft) — same as date, differs from basic.
 * ⚠️ Ring state: hover/focus use primary (purple) ring — same as basic.
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
export default function LinkInput({
  size = 'md',
  disabled = false,
  error = false,
  value,
  onChange,
  placeholder = 'https://',
  id,
  name,
  className = '',
  ...rest
}) {
  const isFilled = value !== undefined ? value.length > 0 : false;

  const rootClass = [
    'input-text',
    'input-text--link',
    `input-text--${size}`,
    isFilled && !disabled && !error ? 'input-text--filled' : '',
    disabled ? 'input-text--disabled' : '',
    error   ? 'input-text--error'    : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <span className="input-text__icon-leading" aria-hidden="true">
        <LinkIcon />
      </span>
      <input
        className="input-text__field"
        type="url"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error || undefined}
        {...rest}
      />
    </div>
  );
}
