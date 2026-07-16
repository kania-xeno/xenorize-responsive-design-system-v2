import './InputText.css';
import LockIcon    from '../icons/LockIcon.jsx';
import EyeIcon     from '../icons/EyeIcon.jsx';
import EyeOffIcon  from '../icons/EyeOffIcon.jsx';

/**
 * PasswordInput — ↳input-text/password
 * Source: Design System Scalable V.2.1.0 · Page: ❖ Input Text
 * Token namespace: input-text/password/*
 *
 * Toggle icon pairing:
 *   showPassword=false → EyeIcon    (eye open  — password hidden, click to reveal)
 *   showPassword=true  → EyeOffIcon (eye slash — password visible, click to hide)
 *
 * ⚠️ LockIcon, EyeIcon, EyeOffIcon are stroke-based VECTORs — stroke="currentColor" fill="none"
 * ⚠️ icon/disabled = #D1D1D1 (icon/dissabled — intentional DS typo)
 *
 * Stateless — showPassword is controlled externally (Q4 Option A).
 *
 * Sizes:  md (40px) · sm (36px) · xs (32px)
 * States: default · hover (CSS) · focus (CSS) · filled · disabled · error
 *
 * @param {string}   [size='md']
 * @param {boolean}  [disabled=false]
 * @param {boolean}  [error=false]
 * @param {boolean}  [showPassword=false]  — Controlled externally
 * @param {Function} [onToggle]            — Called when eye icon is clicked
 * @param {string}   [value]
 * @param {Function} [onChange]
 * @param {string}   [placeholder]
 * @param {string}   [id]
 * @param {string}   [name]
 * @param {string}   [className]
 */
export default function PasswordInput({
  size = 'md',
  disabled = false,
  error = false,
  showPassword = false,
  onToggle,
  value,
  onChange,
  placeholder = 'Enter password',
  id,
  name,
  className = '',
  ...rest
}) {
  const isFilled = value !== undefined ? value.length > 0 : false;

  const rootClass = [
    'input-text',
    'input-text--password',
    `input-text--${size}`,
    isFilled && !disabled && !error ? 'input-text--filled' : '',
    disabled ? 'input-text--disabled' : '',
    error   ? 'input-text--error'    : '',
    className,
  ].filter(Boolean).join(' ');

  function handleToggleMouseDown(e) {
    // Prevent input blur when toggle is clicked
    e.preventDefault();
  }

  return (
    <div className={rootClass}>
      <span className="input-text__icon-leading" aria-hidden="true">
        <LockIcon />
      </span>
      <input
        className="input-text__field"
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error || undefined}
        {...rest}
      />
      <button
        type="button"
        className="input-text__toggle"
        onMouseDown={handleToggleMouseDown}
        onClick={onToggle}
        disabled={disabled}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        tabIndex={disabled ? -1 : 0}
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
