import Alert from './Alert.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Alert — Overview stories
// Cross-configuration reference and interactive Playground
// Figma source: Design System Scalable V.2.1.0 → ↳alert-toast-notification (1995:2497)
// ─────────────────────────────────────────────────────────────────────────────

const STATUSES = ['error', 'warning', 'success', 'information', 'feature'];
const STYLES   = ['filled', 'light', 'lighter', 'stroke'];

const LABEL_STYLE = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 11,
  fontWeight: 600,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 8,
};

export default {
  title: 'Components/Alert/Overview',
  parameters: {
    docs: {
      description: {
        component: `
**Alert — Configuration & Status Overview**

Cross-reference for all Alert style and status combinations.

**AllCombinations** — QA reference: 5 statuses × 4 styles grid for Small size.

**Playground** — interactive sandbox with full prop controls.
        `,
      },
    },
  },
};

// ── All Combinations ──────────────────────────────────────────────────────────

export const AllCombinations = {
  name: 'All Combinations',
  parameters: {
    docs: {
      description: {
        story: 'All 5 statuses × 4 styles, Small size. Use as design QA reference. Rows = styles, columns = statuses.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 860 }}>
      {STYLES.map(style => (
        <div key={style}>
          <div style={LABEL_STYLE}>{style}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STATUSES.map(status => (
              <Alert
                key={status}
                status={status}
                alertStyle={style}
                size="small"
                message={`${status.charAt(0).toUpperCase() + status.slice(1)} — ${style}`}
                dismissible
              />
            ))}
          </div>
        </div>
      ))}

      {/* Large size reference row */}
      <div>
        <div style={LABEL_STYLE}>Large — Lighter reference</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['error', 'information', 'success'].map(status => (
            <Alert
              key={status}
              status={status}
              alertStyle="lighter"
              size="large"
              message={`${status.charAt(0).toUpperCase() + status.slice(1)} — large with description`}
              description="Additional context or body text appears here, below the title. Large alerts support multi-line content."
              primaryAction="Primary action"
              secondaryAction="Learn more"
              dismissible
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: `
Interactive sandbox for design QA and component exploration.

**Controls:**
- **status** — Error · Warning · Success · Information · Feature
- **alertStyle** — Filled · Light · Lighter · Stroke
- **size** — X-Small · Small · Large
- **message** — editable title or single-line message
- **description** — body text (Large only)
- **primaryAction** — primary link button label
- **secondaryAction** — secondary link button label (Large only)
- **dismissible** — show/hide dismiss button
- **theme** — Light or Dark mode

**Note:** The "∙" divider between action links uses body/regular/md (Open Sans Regular 400) — same as the alert body text.
        `,
      },
    },
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: STATUSES,
      description: 'Semantic status.',
      table: { defaultValue: { summary: 'information' } },
    },
    alertStyle: {
      control: { type: 'select' },
      options: STYLES,
      description: 'Fill treatment.',
      table: { defaultValue: { summary: 'lighter' } },
    },
    size: {
      control: { type: 'select' },
      options: ['x-small', 'small', 'large'],
      description: 'Layout size.',
      table: { defaultValue: { summary: 'small' } },
    },
    message: {
      control: 'text',
      description: 'Single-line message (X-Small/Small) or title (Large).',
    },
    description: {
      control: 'text',
      description: 'Body text below title. Large only.',
    },
    primaryAction: {
      control: 'text',
      description: 'Primary link button label.',
    },
    secondaryAction: {
      control: 'text',
      description: 'Secondary link button label (Large only).',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show/hide dismiss button.',
      table: { defaultValue: { summary: 'true' } },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Color mode.',
      table: { defaultValue: { summary: 'light' } },
    },
  },
  args: {
    status: 'information',
    alertStyle: 'lighter',
    size: 'small',
    message: 'Your changes have been saved successfully.',
    description: 'You can continue editing or navigate away — your progress is preserved.',
    primaryAction: 'View details',
    secondaryAction: 'Learn more',
    dismissible: true,
    theme: 'light',
  },
  render: ({ status, alertStyle, size, message, description, primaryAction, secondaryAction, dismissible, theme }) => {
    const isDark = theme === 'dark';
    return (
      <div
        {...(isDark ? { 'data-theme': 'dark' } : {})}
        style={isDark
          ? { background: '#1b1c22', padding: 24, borderRadius: 8 }
          : { padding: 0 }
        }
      >
        <Alert
          key={`${status}-${alertStyle}-${size}-${dismissible}-${theme}`}
          status={status}
          alertStyle={alertStyle}
          size={size}
          message={message}
          description={description}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          dismissible={dismissible}
        />
      </div>
    );
  },
};
