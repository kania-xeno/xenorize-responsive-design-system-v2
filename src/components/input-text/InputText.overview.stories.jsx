import React, { useState } from 'react';
import BasicInput       from './BasicInput.jsx';
import DateInput        from './DateInput.jsx';
import PasswordInput    from './PasswordInput.jsx';
import PhoneNumberInput from './PhoneNumberInput.jsx';
import SearchInput      from './SearchInput.jsx';
import DigitInput       from './DigitInput.jsx';
import LinkInput        from './LinkInput.jsx';
import FormField        from './FormField.jsx';

export default {
  title: 'Components/Input Text/Overview',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**Input Text — ↳input-text** · Design System Scalable V.2.1.0\n\n' +
          '7 variants: Basic · Date · Password · Phone Number · Search · Digit Input · Link.\n\n' +
          'All variants share a common CSS architecture (`InputText.css`) using scoped ' +
          '`--_it-*` custom properties per variant. Tokens are namespaced under `input-text/{variant}/*` ' +
          '(193 tokens total from collection `VariableCollectionId:1902:2617`).\n\n' +
          '**Shadow/effect tokens** (6 ring tokens added to `:root`):\n' +
          '`--shadow-hover-ring-{primary|neutral|error}` and ' +
          '`--shadow-focus-ring-{primary|neutral|error}`.\n\n' +
          '**⚠️ QA Flags:**\n' +
          '- `--input-text-search-placeholder-disabled` inferred as #A3A3A3 — verify visually.\n' +
          '- Digit Input Error state is CSS-class based — verify border/shadow against DS intent.\n' +
          '- All icons (CalendarIcon, PhoneIcon, SearchIcon, LockIcon, EyeIcon, LinkIcon) are ' +
          'placeholders pending final DS SVG paths.\n' +
          '- `icon/dissabled` intentional DS typo — do not rename.',
      },
    },
  },
};

// ── Composed — All Variants ───────────────────────────────────────────────────
// Lead story: shows full DS anatomy (LabelKey + Input + HintText) for all 7 variants.
export const ComposedAllVariants = {
  name: 'Composed — All Variants',
  render: () => {
    const [pwShow, setPwShow] = useState(false);
    const [digits, setDigits] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
        <FormField label="Email address" hint="We'll never share your email.">
          <BasicInput size="md" placeholder="name@example.com" />
        </FormField>

        <FormField label="Date of birth" hint="Enter as DD/MM/YYYY.">
          <DateInput size="md" placeholder="DD/MM/YYYY" />
        </FormField>

        <FormField label="Password" showRequired hint="Must be at least 8 characters.">
          <PasswordInput
            size="md"
            showPassword={pwShow}
            onToggle={() => setPwShow((s) => !s)}
            placeholder="Enter password"
            onChange={() => {}}
          />
        </FormField>

        <FormField label="Phone number" hint="Include your country code.">
          <PhoneNumberInput size="md" placeholder="+1 (555) 000-0000" />
        </FormField>

        <FormField label="Search components" hint="Search by component name or token.">
          <SearchInput size="md" placeholder="Search…" />
        </FormField>

        <FormField label="Portfolio URL" hint="Enter the full URL including https://.">
          <LinkInput size="md" placeholder="https://" />
        </FormField>

        <FormField label="Verification code" hint="Enter the 6-digit code sent to your email.">
          <DigitInput length={6} value={digits} onChange={setDigits} />
        </FormField>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Full DS anatomy for all 7 Input Text variants. Each field uses the composed pattern: ' +
          'LabelKey (↳label-key) above · Input field in the middle · HintText (↳hint-text) below. ' +
          'Components are reused directly — no duplication. Layout via FormField.',
      },
    },
  },
};

// ── Composed — Error States ───────────────────────────────────────────────────
export const ComposedErrorStates = {
  name: 'Composed — Error States',
  render: () => {
    const [pwShow, setPwShow] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
        <FormField label="Email address" showRequired error hint="Please enter a valid email address.">
          <BasicInput size="md" error value="not-an-email" placeholder="name@example.com" />
        </FormField>

        <FormField label="Date of birth" showRequired error hint="Please enter a valid date (DD/MM/YYYY).">
          <DateInput size="md" error value="99/99/9999" placeholder="DD/MM/YYYY" />
        </FormField>

        <FormField label="Password" showRequired error hint="Password must be at least 8 characters.">
          <PasswordInput
            size="md"
            error
            value="weak"
            showPassword={pwShow}
            onToggle={() => setPwShow((s) => !s)}
            onChange={() => {}}
          />
        </FormField>

        <FormField label="Phone number" showRequired error hint="Please enter a valid phone number.">
          <PhoneNumberInput size="md" error value="123" placeholder="+1 (555) 000-0000" />
        </FormField>

        <FormField label="Portfolio URL" error hint="Please enter a valid URL starting with https://.">
          <LinkInput size="md" error value="not-a-valid-url" placeholder="https://" />
        </FormField>

        <FormField label="Verification code" error hint="Incorrect code. Please try again.">
          <DigitInput length={6} value="000000" error onChange={() => {}} />
        </FormField>
      </div>
    );
  },
};

// ── Composed — Disabled States ────────────────────────────────────────────────
export const ComposedDisabledStates = {
  name: 'Composed — Disabled States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
      <FormField label="Email address" disabled hint="This field is currently disabled.">
        <BasicInput size="md" disabled placeholder="name@example.com" />
      </FormField>

      <FormField label="Date of birth" disabled hint="This field is currently disabled.">
        <DateInput size="md" disabled placeholder="DD/MM/YYYY" />
      </FormField>

      <FormField label="Password" disabled hint="Password cannot be changed at this time.">
        <PasswordInput size="md" disabled showPassword={false} onChange={() => {}} placeholder="Enter password" />
      </FormField>

      <FormField label="Phone number" disabled hint="This field is currently disabled.">
        <PhoneNumberInput size="md" disabled placeholder="+1 (555) 000-0000" />
      </FormField>

      <FormField label="Portfolio URL" disabled hint="This field is currently disabled.">
        <LinkInput size="md" disabled placeholder="https://" />
      </FormField>

      <FormField label="Verification code" disabled hint="Verification is currently unavailable.">
        <DigitInput length={6} value="" disabled onChange={() => {}} />
      </FormField>
    </div>
  ),
};

// ── All Variants — Default (bare fields) ──────────────────────────────────────
export const AllVariantsDefault = {
  name: 'All Variants — Default',
  render: () => {
    const [pwShow, setPwShow] = useState(false);
    const [digits, setDigits] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
        {[
          { label: 'Basic',        node: <BasicInput size="md" placeholder="Placeholder" /> },
          { label: 'Date',         node: <DateInput  size="md" placeholder="DD/MM/YYYY" /> },
          { label: 'Password',     node: <PasswordInput size="md" placeholder="Enter password" showPassword={pwShow} onToggle={() => setPwShow(s => !s)} value="" onChange={() => {}} /> },
          { label: 'Phone Number', node: <PhoneNumberInput size="md" placeholder="+1 (555) 000-0000" /> },
          { label: 'Search',       node: <SearchInput size="md" placeholder="Search…" /> },
          { label: 'Link',         node: <LinkInput   size="md" placeholder="https://" /> },
        ].map(({ label, node }) => (
          <div key={label}>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
              {label}
            </div>
            {node}
          </div>
        ))}
        <div>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 8 }}>
            Digit Input
          </div>
          <DigitInput length={6} value={digits} onChange={setDigits} />
        </div>
      </div>
    );
  },
};

// ── All Variants — Filled ─────────────────────────────────────────────────────
export const AllVariantsFilled = {
  name: 'All Variants — Filled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      {[
        { label: 'Basic',        node: <BasicInput size="md" value="User input text" /> },
        { label: 'Date',         node: <DateInput  size="md" value="25/12/2025" /> },
        { label: 'Password',     node: <PasswordInput size="md" value="MyS3cretPass!" showPassword={false} onChange={() => {}} /> },
        { label: 'Phone Number', node: <PhoneNumberInput size="md" value="+1 (415) 555-0100" /> },
        { label: 'Search',       node: <SearchInput size="md" value="design tokens" /> },
        { label: 'Link',         node: <LinkInput   size="md" value="https://example.com/tokens" /> },
      ].map(({ label, node }) => (
        <div key={label}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            {label}
          </div>
          {node}
        </div>
      ))}
      <div>
        <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 8 }}>
          Digit Input
        </div>
        <DigitInput length={6} value="847291" onChange={() => {}} />
      </div>
    </div>
  ),
};

// ── All Variants — Disabled ───────────────────────────────────────────────────
export const AllVariantsDisabled = {
  name: 'All Variants — Disabled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      {[
        { label: 'Basic',        node: <BasicInput size="md" disabled placeholder="Placeholder" /> },
        { label: 'Date',         node: <DateInput  size="md" disabled placeholder="DD/MM/YYYY" /> },
        { label: 'Password',     node: <PasswordInput size="md" disabled placeholder="Enter password" showPassword={false} onChange={() => {}} /> },
        { label: 'Phone Number', node: <PhoneNumberInput size="md" disabled placeholder="+1 (555) 000-0000" /> },
        { label: 'Search',       node: <SearchInput size="md" disabled placeholder="Search…" /> },
        { label: 'Link',         node: <LinkInput   size="md" disabled placeholder="https://" /> },
      ].map(({ label, node }) => (
        <div key={label}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            {label}
          </div>
          {node}
        </div>
      ))}
      <div>
        <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 8 }}>
          Digit Input
        </div>
        <DigitInput length={6} value="" disabled onChange={() => {}} />
      </div>
    </div>
  ),
};

// ── All Variants — Error ──────────────────────────────────────────────────────
export const AllVariantsError = {
  name: 'All Variants — Error',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      {[
        { label: 'Basic',        node: <BasicInput size="md" error value="Invalid value" /> },
        { label: 'Date',         node: <DateInput  size="md" error value="99/99/9999" /> },
        { label: 'Password',     node: <PasswordInput size="md" error value="weak" showPassword={false} onChange={() => {}} /> },
        { label: 'Phone Number', node: <PhoneNumberInput size="md" error value="123" /> },
        { label: 'Search',       node: <SearchInput size="md" error value="!bad query" /> },
        { label: 'Link',         node: <LinkInput   size="md" error value="not-a-valid-url" /> },
      ].map(({ label, node }) => (
        <div key={label}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            {label}
          </div>
          {node}
        </div>
      ))}
      <div>
        <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 8 }}>
          Digit Input
        </div>
        <DigitInput length={6} value="" error onChange={() => {}} />
      </div>
    </div>
  ),
};

// ── Size Comparison — md / sm / xs ────────────────────────────────────────────
export const SizeComparison = {
  name: 'Size Comparison (Basic)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      {(['md', 'sm', 'xs']).map((size) => (
        <div key={size}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5c5c5c', marginBottom: 4 }}>
            size="{size}" — {size === 'md' ? '40px' : size === 'sm' ? '36px' : '32px'}
          </div>
          <BasicInput size={size} placeholder="Placeholder" />
        </div>
      ))}
    </div>
  ),
};

// ── Token Architecture Note ───────────────────────────────────────────────────
export const TokenArchitectureNote = {
  name: 'Token Architecture',
  render: () => (
    <div style={{ fontFamily: 'monospace', fontSize: 12, lineHeight: 1.7, color: '#3c3c3c', maxWidth: 600 }}>
      <p style={{ fontWeight: 600, fontSize: 13 }}>3-Layer Token System</p>
      <p>Component → Theme → Primitive</p>
      <p style={{ marginTop: 12, fontWeight: 600 }}>Namespace: input-text/&#123;variant&#125;/*</p>
      <p>Collection: VariableCollectionId:1902:2617 · Mode: "variable" (single-mode)</p>
      <p>Total tokens: 193 input-text/* component variables</p>
      <p style={{ marginTop: 12, fontWeight: 600 }}>Shadow/Effect Tokens (added to :root):</p>
      <p>--shadow-hover-ring-&#123;primary|neutral|error&#125;</p>
      <p>--shadow-focus-ring-&#123;primary|neutral|error&#125;</p>
      <p style={{ marginTop: 12, fontWeight: 600 }}>CSS Architecture:</p>
      <p>Shared structure in InputText.css. Per-variant scoped --_it-* custom properties.</p>
      <p>Dark mode: component collection is intentionally single-mode — no [data-theme="dark"] at component level.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Reference note on the token and CSS architecture for the Input Text system.',
      },
    },
  },
};
