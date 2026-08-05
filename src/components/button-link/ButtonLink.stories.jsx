import React from 'react';
import ButtonLink from './ButtonLink.jsx';
import ChevronRightSmall from '../../icons/ChevronRightSmall.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// ButtonLink — ↳buttons-link
// Figma: node 1958:12240 — 80 variants (5 styles × 4 states × 2 sizes × 2 underline)
//
// Navigation: Components/Button Link/General
//   Playground      — interactive Controls sandbox
//   Overview        — all styles, sizes, and icon combos at a glance
//   All Styles      — 4 visible styles in Default state (Medium + Small)
//   As Link / As Button — <a> vs <button> semantic element
//   Icons           — left / right / both / none combos
//   Sizes           — Medium vs Small side-by-side
//   States          — Default / Disabled per style
//   Underline       — border-bottom on/off per style
//
// Token namespace: link-button/*
// Underline: border-bottom (not text-decoration) — matches Figma Frame stroke anatomy
//
// Note: "modifable" style (inverse/dark-surface) is intentionally hidden from
// Storybook stories. CSS + runtime support is preserved in ButtonLink.css for
// nested usage inside ↳alert, ↳switch-integration, etc.
// ─────────────────────────────────────────────────────────────────────────────

// ── Icon helpers ──────────────────────────────────────────────────────────────
// ChevronRightSmall is the repo's right-facing chevron icon.
// Left-facing chevron is derived by mirroring (no ChevronLeftSmall.jsx in src/icons/).

function ChevronLeft({ size }) {
  return (
    <ChevronRightSmall
      width={size}
      height={size}
      style={{ transform: 'scaleX(-1)', display: 'block' }}
    />
  );
}

function ChevronRight({ size }) {
  return (
    <ChevronRightSmall
      width={size}
      height={size}
      style={{ display: 'block' }}
    />
  );
}

// ── Story layout helpers ──────────────────────────────────────────────────────

const ROW = {
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  flexWrap: 'wrap',
};

const COL = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

const LABEL_STYLE = {
  fontFamily: 'monospace',
  fontSize: 10,
  fontWeight: 700,
  color: 'var(--color-text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

function SLabel({ children, style }) {
  return <span style={{ ...LABEL_STYLE, ...style }}>{children}</span>;
}

// ── Visible styles (modifable excluded from Storybook; CSS support retained) ──
const STYLES = ['neutral', 'primary', 'information', 'error'];

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Button/Button Link/General',
  component: ButtonLink,
  parameters: {
    docs: {
      description: {
        component: `
**ButtonLink** — inline link-style button. Standalone component, NOT a variant of Button.

Figma: \`↳buttons-link\` node 1958:12240 · Design System Scalable V.2.1.0 → ❖ Buttons

**Styles:** \`neutral\` · \`primary\` · \`information\` · \`error\`

**Sizes:** \`medium\` (14px / 20px icons) · \`small\` (12px / 16px icons)

**Underline:** \`border-bottom\` using \`link-button/[style]/underline\` token — NOT \`text-decoration\`.

**HTML element:** \`<a>\` when \`href\` is provided · \`<button>\` otherwise.

**Token namespace:** \`link-button/*\` (L3 component collection, separate from \`button/*\`)

**Accessibility:**
- Visible label text serves as accessible name
- Add \`aria-label\` for icon-only usage
- \`:focus-visible\` ring via \`--shadow-focus-ring-primary\` (D-07 closed — code-only)
- \`<a disabled>\`: sets \`href={undefined}\`, \`aria-disabled\`, \`tabIndex={-1}\`

Figma source: [Design System Scalable V.2.1.0 → node 1958:12240](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi?node-id=1958-12240)
        `,
      },
    },
  },
  argTypes: {
    style: {
      control: { type: 'select' },
      options: STYLES,
      description: 'Visual style variant.',
    },
    size: {
      control: { type: 'radio' },
      options: ['medium', 'small'],
      description: '`medium` = 14px text, 20px icons · `small` = 12px text, 16px icons.',
    },
    underline: {
      control: 'boolean',
      description: 'Renders `border-bottom` using the `link-button/[style]/underline` token.',
    },
    disabled: {
      control: 'boolean',
    },
    leftIcon: {
      control: false,
      description: 'Icon element shown to the left. Pass any React node (SVG, icon component).',
    },
    rightIcon: {
      control: false,
      description: 'Icon element shown to the right.',
    },
    href: {
      control: 'text',
      description: 'When set, renders an `<a>` element. Leave empty for `<button>`.',
    },
    children: {
      control: 'text',
      description: 'Label text.',
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. Playground
// ─────────────────────────────────────────────────────────────────────────────

export const Playground = {
  name: 'Playground',
  args: {
    children: 'Link Button',
    style: 'neutral',
    size: 'medium',
    underline: false,
    disabled: false,
    href: '',
  },
  render: ({ children, href, size, ...args }) => (
    <ButtonLink
      {...args}
      size={size}
      href={href || undefined}
      leftIcon={<ChevronLeft size={size === 'small' ? 16 : 20} />}
      rightIcon={<ChevronRight size={size === 'small' ? 16 : 20} />}
    >
      {children}
    </ButtonLink>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Overview
// ─────────────────────────────────────────────────────────────────────────────

export const Overview = {
  name: 'Overview',
  parameters: {
    docs: {
      description: {
        story: 'All 4 styles × 2 sizes × icon combos at a glance.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ ...COL, gap: 28 }}>
      {['medium', 'small'].map((size) => (
        <div key={size} style={COL}>
          <SLabel>{size === 'medium' ? 'Medium (20)' : 'Small (16)'}</SLabel>
          {/* Text only */}
          <div style={ROW}>
            {STYLES.map((s) => (
              <ButtonLink key={s} style={s} size={size}>{cap(s)}</ButtonLink>
            ))}
          </div>
          {/* With left + right icons */}
          <div style={ROW}>
            {STYLES.map((s) => {
              const iconSize = size === 'small' ? 16 : 20;
              return (
                <ButtonLink
                  key={s}
                  style={s}
                  size={size}
                  leftIcon={<ChevronLeft size={iconSize} />}
                  rightIcon={<ChevronRight size={iconSize} />}
                >
                  {cap(s)}
                </ButtonLink>
              );
            })}
          </div>
          {/* With underline */}
          <div style={ROW}>
            {STYLES.map((s) => (
              <ButtonLink key={s} style={s} size={size} underline>{cap(s)} underline</ButtonLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. All Styles
// ─────────────────────────────────────────────────────────────────────────────

export const AllStyles = {
  name: 'All Styles',
  parameters: {
    docs: {
      description: {
        story: 'Four style variants in Default state — Medium and Small sizes.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ ...COL, gap: 32 }}>
      <div style={COL}>
        <SLabel>Medium (20)</SLabel>
        <div style={ROW}>
          {STYLES.map((s) => (
            <ButtonLink key={s} style={s} size="medium">{cap(s)}</ButtonLink>
          ))}
        </div>
      </div>
      <div style={COL}>
        <SLabel>Small (16)</SLabel>
        <div style={ROW}>
          {STYLES.map((s) => (
            <ButtonLink key={s} style={s} size="small">{cap(s)}</ButtonLink>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. As Link / As Button
// ─────────────────────────────────────────────────────────────────────────────

export const AsLinkVsButton = {
  name: 'As Link / As Button',
  parameters: {
    docs: {
      description: {
        story: `
When \`href\` is provided → renders \`<a href="...">\` (navigation).
When \`href\` is absent → renders \`<button type="button">\` (in-page action).

Disabled \`<a>\`: \`href={undefined}\`, \`aria-disabled="true"\`, \`tabIndex={-1}\`, click prevented.
        `,
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={COL}>
      <SLabel>As &lt;a&gt; — href provided</SLabel>
      <div style={ROW}>
        <ButtonLink style="primary" size="medium" href="https://example.com" rightIcon={<ChevronRight size={20} />}>
          Navigate (opens href)
        </ButtonLink>
        <ButtonLink style="neutral" size="medium" href="https://example.com" disabled rightIcon={<ChevronRight size={20} />}>
          Disabled link
        </ButtonLink>
      </div>

      <SLabel style={{ marginTop: 8 }}>As &lt;button&gt; — no href</SLabel>
      <div style={ROW}>
        <ButtonLink style="primary" size="medium" onClick={() => alert('clicked')} rightIcon={<ChevronRight size={20} />}>
          In-page action
        </ButtonLink>
        <ButtonLink style="neutral" size="medium" disabled rightIcon={<ChevronRight size={20} />}>
          Disabled button
        </ButtonLink>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Icons
// ─────────────────────────────────────────────────────────────────────────────

export const Icons = {
  name: 'Icons',
  parameters: {
    docs: {
      description: {
        story: 'Icon color inherits from text via `currentColor`. Icon size scales with component: 20px at Medium, 16px at Small.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={COL}>
      <SLabel>Medium — icon combos (Neutral)</SLabel>
      <div style={ROW}>
        <ButtonLink style="neutral" size="medium" leftIcon={<ChevronLeft size={20} />}>Left icon</ButtonLink>
        <ButtonLink style="neutral" size="medium" rightIcon={<ChevronRight size={20} />}>Right icon</ButtonLink>
        <ButtonLink style="neutral" size="medium" leftIcon={<ChevronLeft size={20} />} rightIcon={<ChevronRight size={20} />}>Both icons</ButtonLink>
        <ButtonLink style="neutral" size="medium">No icons</ButtonLink>
      </div>

      <SLabel style={{ marginTop: 8 }}>Small — icon combos (Primary)</SLabel>
      <div style={ROW}>
        <ButtonLink style="primary" size="small" leftIcon={<ChevronLeft size={16} />}>Left icon</ButtonLink>
        <ButtonLink style="primary" size="small" rightIcon={<ChevronRight size={16} />}>Right icon</ButtonLink>
        <ButtonLink style="primary" size="small" leftIcon={<ChevronLeft size={16} />} rightIcon={<ChevronRight size={16} />}>Both icons</ButtonLink>
        <ButtonLink style="primary" size="small">No icons</ButtonLink>
      </div>

      <SLabel style={{ marginTop: 8 }}>All styles — right icon (Medium)</SLabel>
      <div style={ROW}>
        {STYLES.map((s) => (
          <ButtonLink key={s} style={s} size="medium" rightIcon={<ChevronRight size={20} />}>
            {cap(s)}
          </ButtonLink>
        ))}
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Sizes
// ─────────────────────────────────────────────────────────────────────────────

export const Sizes = {
  name: 'Sizes',
  parameters: {
    docs: {
      description: {
        story: `
**Medium (20):** 14px / 143% line-height / 0 letter-spacing / 20px icons.
**Small (16):** 12px / 133% line-height / 0.2% letter-spacing / 16px icons.

Both sizes use SemiBold 600 (\`--font-weight-semibold\`).
        `,
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={COL}>
      {STYLES.map((s) => (
        <div key={s} style={{ ...ROW, gap: 32 }}>
          <div style={{ width: 100 }}><SLabel>{s}</SLabel></div>
          <ButtonLink style={s} size="medium" leftIcon={<ChevronLeft size={20} />} rightIcon={<ChevronRight size={20} />}>
            {cap(s)} Medium
          </ButtonLink>
          <ButtonLink style={s} size="small" leftIcon={<ChevronLeft size={16} />} rightIcon={<ChevronRight size={16} />}>
            {cap(s)} Small
          </ButtonLink>
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. States
// ─────────────────────────────────────────────────────────────────────────────

export const States = {
  name: 'States',
  parameters: {
    docs: {
      description: {
        story: `
**Default** — base color per style.
**Disabled** — all styles render gray/500 via \`link-button/[style]/disabled\` tokens.
**Hover** — observe in the browser (pseudo-state, not simulatable via prop).

Note: Information hover = same color as Default by design (G-04 accepted).
        `,
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={COL}>
      <SLabel>Default</SLabel>
      <div style={ROW}>
        {STYLES.map((s) => (
          <ButtonLink key={s} style={s} size="medium">{cap(s)}</ButtonLink>
        ))}
      </div>

      <SLabel style={{ marginTop: 8 }}>Disabled</SLabel>
      <div style={ROW}>
        {STYLES.map((s) => (
          <ButtonLink key={s} style={s} size="medium" disabled>{cap(s)}</ButtonLink>
        ))}
      </div>

      <SLabel style={{ marginTop: 8 }}>Disabled + Underline</SLabel>
      <div style={ROW}>
        {STYLES.map((s) => (
          <ButtonLink key={s} style={s} size="medium" disabled underline>{cap(s)}</ButtonLink>
        ))}
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Underline
// ─────────────────────────────────────────────────────────────────────────────

export const Underline = {
  name: 'Underline',
  parameters: {
    docs: {
      description: {
        story: `
Underline rendered as \`border-bottom\` using \`link-button/[style]/underline\` token.
Matches Figma anatomy: underline is a bottom stroke on an "Underline Frame" wrapper — NOT \`text-decoration\`.
        `,
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={COL}>
      <SLabel>Underline Off vs On (Medium)</SLabel>
      <div style={{ ...COL, gap: 8 }}>
        {STYLES.map((s) => (
          <div key={s} style={ROW}>
            <div style={{ width: 120 }}><SLabel>{s}</SLabel></div>
            <ButtonLink style={s} size="medium" underline={false}>Without underline</ButtonLink>
            <ButtonLink style={s} size="medium" underline>With underline</ButtonLink>
          </div>
        ))}
      </div>

      <SLabel style={{ marginTop: 8 }}>Underline disabled state</SLabel>
      <div style={ROW}>
        {STYLES.map((s) => (
          <ButtonLink key={s} style={s} size="medium" underline disabled>
            {cap(s)} disabled
          </ButtonLink>
        ))}
      </div>
    </div>
  ),
};
