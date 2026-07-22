import './InputText.css';
import SearchIcon from '../../icons/SearchIcon.jsx';

/**
 * SearchInput — ↳input-text/search
 * Source: Design System Scalable V.2.1.0 · Page: ❖ Input Text
 * Token namespace: input-text/search/*
 *
 * ⚠️ Unique behavior: icon uses soft color (#A3A3A3) in default/empty state,
 *    switches to brand (#403297) on hover/focus/filled — handled in CSS.
 * ⚠️ placeholder/* uses text/neutral/subtle (#A3A3A3) not muted.
 * ⚠️ text-disabled = text/neutral/disabled (#D1D1D1) — unique to search.
 * ⚠️ SearchIcon is a placeholder.
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
export default function SearchInput({
  size = 'md',
  disabled = false,
  error = false,
  value,
  onChange,
  placeholder = 'Search…',
  id,
  name,
  className = '',
  ...rest
}) {
  const isFilled = value !== undefined ? value.length > 0 : false;

  const rootClass = [
    'input-text',
    'input-text--search',
    `input-text--${size}`,
    isFilled && !disabled && !error ? 'input-text--filled' : '',
    disabled ? 'input-text--disabled' : '',
    error   ? 'input-text--error'    : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <span className="input-text__icon-leading" aria-hidden="true">
        <SearchIcon />
      </span>
      <input
        className="input-text__field"
        type="search"
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
