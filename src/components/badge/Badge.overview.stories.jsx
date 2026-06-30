import Badge from './Badge.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Badge — Overview stories
// Cross-configuration reference and interactive Playground for Badge
// Figma source: Design System Scalable V.2.1.0 → ❖ badge (2008:2857)
// ─────────────────────────────────────────────────────────────────────────────

const COLORS = ['gray', 'blue', 'orange', 'red', 'green', 'purple', 'sky', 'pink', 'teal'];
const STYLES = ['filled', 'light', 'lighter', 'stroke'];

const LABEL_STYLE = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 11,
  fontWeight: 600,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 4,
};

const SUB_LABEL_STYLE = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 11,
  color: '#aaa',
  marginBottom: 8,
  textTransform: 'capitalize',
};

export default {
  title: 'Components/Badge/Overview',
  parameters: {
    docs: {
      description: {
        component: `
**Badge — Configuration & Color Overview**

Cross-reference for all Badge style and color combinations.

**Use AllColors** to review all 9 colors across all 4 styles at a glance.

Use the **Playground** story to test props interactively.
        `,
      },
    },
  },
};

// ── All Colors ────────────────────────────────────────────────────────────────

export const AllColors = {
  name: 'All Colors',
  parameters: {
    docs: {
      description: {
        story: 'All 9 colors across all 4 styles. Rows = styles, columns = colors. Use this as the design QA reference view.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
      {STYLES.map(style => (
        <div key={style}>
          <div style={LABEL_STYLE}>{style}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
            {COLORS.map(color => (
              <Badge
                key={color}
                badgeStyle={style}
                color={color}
                size="small"
                label={color.charAt(0).toUpperCase() + color.slice(1)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Medium size reference row */}
      <div>
        <div style={LABEL_STYLE}>Medium — Filled reference</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
          {COLORS.map(color => (
            <Badge
              key={color}
              badgeStyle="filled"
              color={color}
              size="medium"
              label={color.charAt(0).toUpperCase() + color.slice(1)}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

// ── Playground ────────────────────────────────────────────────────────────────
// Interactive QA/design sandbox — full prop controls.
// No hover/focus/pressed controls — badge is display-only, not interactive.
// Yellow is excluded — no Figma variant (badge/yellow/* tokens pending DS Auditor).

export const Playground = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: `
Interactive sandbox for design QA and component exploration.

**Controls:**
- **type** — Basic · With Dot · Left Icon · Right Icon
- **badgeStyle** — Filled · Light · Lighter · Stroke
- **color** — All 9 approved colors (Yellow excluded — no Figma variant)
- **size** — Small (16px) · Medium (20px)
- **label** — editable text label
- **number** — when set, activates Number=On (basic type only, replaces label)
- **showIcon** — show/hide icon slot
- **disabled** — Disabled=On state
- **theme** — Light or Dark mode

**Excluded:** Hover / Focus / Pressed / Loading — badge is display-only by design. No state controls needed.

**Yellow excluded:** \`badge/yellow/*\` tokens exist but no Figma variant. Not V1 scope.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['basic', 'dot', 'left-icon', 'right-icon'],
      description: 'Layout type.',
      table: { defaultValue: { summary: 'basic' } },
    },
    badgeStyle: {
      control: { type: 'select' },
      options: ['filled', 'light', 'lighter', 'stroke'],
      description: 'Fill treatment.',
      table: { defaultValue: { summary: 'filled' } },
    },
    color: {
      control: { type: 'select' },
      options: ['gray', 'blue', 'orange', 'red', 'green', 'purple', 'sky', 'pink', 'teal'],
      description: '9 approved colors. Yellow excluded (DS gap).',
      table: { defaultValue: { summary: 'gray' } },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'Small = 16px. Medium = 20px.',
      table: { defaultValue: { summary: 'small' } },
    },
    label: {
      control: 'text',
      description: 'Text label (1–3 words max).',
    },
    number: {
      control: 'text',
      description: 'Number=On (SemiBold). Basic type only. Replaces label when set.',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show/hide icon. Applies to left-icon and right-icon types.',
      table: { defaultValue: { summary: 'true' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state — transparent bg, stroke border, muted text.',
      table: { defaultValue: { summary: 'false' } },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Color mode. Applies data-theme to story wrapper.',
      table: { defaultValue: { summary: 'light' } },
    },
  },
  args: {
    type: 'basic',
    badgeStyle: 'filled',
    color: 'gray',
    size: 'small',
    label: 'Badge',
    number: null,
    showIcon: true,
    disabled: false,
    theme: 'light',
  },
  render: ({ type, badgeStyle, color, size, label, number, showIcon, disabled, theme }) => {
    const isDark = theme === 'dark';

    return (
      <div
        {...(isDark ? { 'data-theme': 'dark' } : {})}
        style={isDark
          ? { background: '#1b1c22', padding: 24, borderRadius: 8, display: 'inline-block' }
          : { display: 'inline-block' }
        }
      >
        <Badge
          key={`${type}-${badgeStyle}-${color}-${size}-${disabled}-${theme}`}
          type={type}
          badgeStyle={badgeStyle}
          color={color}
          size={size}
          label={label}
          number={number || null}
          showIcon={showIcon}
          disabled={disabled}
        />
      </div>
    );
  },
};
