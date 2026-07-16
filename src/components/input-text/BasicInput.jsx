import './InputText.css';

/**
 * BasicInput — ↳input-text/basic
 * Source: Design System Scalable V.2.1.0 · Page: ❖ Input Text
 * Token namespace: input-text/basic/*
 *
 * Sizes:  md (40px) · sm (36px) · xs (32px)
 * States: default · hover (CSS) · focus (CSS) · filled (value present) · disabled · error
 *
 * @param {string}   [size='md']       — 'md' | 'sm' | 'xs'
 * @param {boolean}  [disabled=false]  — Disabled state
 * @param {boolean}  [error=false]     — Error state
 * @param {string}   [value]           — Controlled value
 * @param {Function} [onChange]        — Change handler
 * @param {string}   [placeholder]     — Placeholder text
 * @param {string}   [id]              — Input id (for label association)
 * @param {string}   [name]            — Input name
 * @param {ReactNode}[leadingIcon]     — Optional leading icon slot
 * @param {ReactNode}[trailingIcon]    — Optional trailing icon slot
 * @param {string}   [className]       — Extra class on root
 */
export default function BasicInput({
  size = 'md',
  disabled = false,
  error = false,
  value,
  onChange,
  placeholder = '',
  id,
  name,
  leadingIcon,
  trailingIcon,
  className = '',
  ...rest
}) {
  const isFilled = value !== undefined ? value.length > 0 : false;

  const rootClass = [
    'input-text',
    'input-text--basic',
    `input-text--${size}`,
    isFilled && !disabled && !error ? 'input-text--filled' : '',
    disabled ? 'input-text--disabled' : '',
    error   ? 'input-text--error'    : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      {leadingIcon && (
        <span className="input-text__icon-leading" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
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
      {trailingIcon && (
        <span className="input-text__icon-trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </div>
  );
}
