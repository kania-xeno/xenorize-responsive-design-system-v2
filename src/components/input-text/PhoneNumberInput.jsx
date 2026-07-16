import './InputText.css';
import PhoneIcon from '../icons/PhoneIcon.jsx';

/**
 * PhoneNumberInput — ↳input-text/phone-number
 * Source: Design System Scalable V.2.1.0 · Page: ❖ Input Text
 * Token namespace: input-text/phone-number/*
 *
 * ⚠️ PhoneIcon is a placeholder. Real implementation will need a country
 * flag/dropdown. This placeholder uses a static phone icon as leading icon.
 * ⚠️ icon/disabled = #D1D1D1 (icon/dissabled — intentional DS typo)
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
export default function PhoneNumberInput({
  size = 'md',
  disabled = false,
  error = false,
  value,
  onChange,
  placeholder = '+1 (555) 000-0000',
  id,
  name,
  className = '',
  ...rest
}) {
  const isFilled = value !== undefined ? value.length > 0 : false;

  const rootClass = [
    'input-text',
    'input-text--phone-number',
    `input-text--${size}`,
    isFilled && !disabled && !error ? 'input-text--filled' : '',
    disabled ? 'input-text--disabled' : '',
    error   ? 'input-text--error'    : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      {/* ⚠️ PLACEHOLDER — replace with country flag/dropdown when DS specifies */}
      <span className="input-text__icon-leading" aria-hidden="true">
        <PhoneIcon />
      </span>
      <input
        className="input-text__field"
        type="tel"
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
