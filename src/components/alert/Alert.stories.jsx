import Alert from './Alert.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Alert / Toast Notification — General stories
// Figma source: Design System Scalable V.2.1.0 → ↳alert-toast-notification (1995:2497)
// 5 statuses × 4 styles × 3 sizes = 60 variants
// Status prop → token: error→danger | warning | success | information→info | feature
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Alert/General',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: `
**Alert / Toast Notification** — display and notification component.

Alert communicates status, feedback, or system information. It may contain action link buttons but is **not itself interactive**.

**5 Statuses:** Error, Warning, Success, Information, Feature

**4 Styles:** Filled · Light · Lighter · Stroke

**3 Sizes:** X-Small (32) · Small (36) · Large

**Behavior:**
- X-Small / Small: single row, center-aligned, 16×16 status icon
- Large: multi-row (title + description + actions), top-aligned, 20×20 status icon
- Toast: fixed-position, auto-dismisses after \`autoDismiss\` ms (Error never auto-dismisses)
- Toast stacking: 8px gap, max 3 simultaneous (orchestrated by consumer)

**Accessibility:**
- Error / Warning → \`aria-live="assertive"\`
- Success / Information / Feature → \`aria-live="polite"\`
- Dismiss button has \`aria-label="Dismiss"\`
- Status icon is decorative (\`aria-hidden\`)

**DS Notes:**
- Status \`error\` maps to token namespace \`danger\`
- Status \`information\` maps to token namespace \`info\`
- Filled/Light/Lighter border = bg (intentionally invisible — do not remove)
- Shadow exists only on Stroke style
- Actions divider "∙" uses body/regular/md (Open Sans Regular 400) — same font as the alert body

Figma source: [Design System Scalable V.2.1.0 → ↳alert-toast-notification](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi?node-id=1995-2497)
        `,
      },
    },
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['error', 'warning', 'success', 'information', 'feature'],
      description: 'Semantic status. Maps to token namespace: error→danger, information→info.',
    },
    alertStyle: {
      control: { type: 'select' },
      options: ['filled', 'light', 'lighter', 'stroke'],
      description: 'Fill treatment. Filled = highest emphasis. Stroke = lowest + shadow.',
    },
    size: {
      control: { type: 'select' },
      options: ['x-small', 'small', 'large'],
      description: 'X-Small (32) and Small (36) are single-row. Large is multi-row with title + description + actions.',
    },
    message: {
      control: 'text',
      description: 'Single-line message for X-Small/Small. Title text for Large.',
    },
    description: {
      control: 'text',
      description: 'Body text below title. Large only.',
    },
    primaryAction: {
      control: 'text',
      description: 'Label for primary link button. Optional.',
    },
    secondaryAction: {
      control: 'text',
      description: 'Label for secondary link button. Large only. Separated from primary by "∙" divider (Open Sans Regular, body/regular/md).',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show/hide dismiss (cross-large) icon button.',
    },
    toast: {
      control: 'boolean',
      description: 'When true: fixed position, bottom-right, auto-dismiss timer active.',
    },
    autoDismiss: {
      control: { type: 'number' },
      description: 'Auto-dismiss delay in ms (toast=true only). 0 = no auto-dismiss. Error status always skips.',
    },
  },
  args: {
    status: 'information',
    alertStyle: 'lighter',
    size: 'small',
    message: 'Your changes have been saved.',
    description: '',
    primaryAction: '',
    secondaryAction: '',
    dismissible: true,
    toast: false,
    autoDismiss: 5000,
  },
};

// ── 1. Statuses ───────────────────────────────────────────────────────────────

export const StatusError = {
  name: 'Status — Error',
  parameters: {
    docs: { description: { story: 'Error status (token: danger). Uses assertive aria-live. Does not auto-dismiss when toast=true.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Alert status="error" alertStyle="lighter" size="small" message="Unable to save changes. Please try again." dismissible />
      <Alert status="error" alertStyle="filled"  size="small" message="Critical error — action required." dismissible />
    </div>
  ),
};

export const StatusWarning = {
  name: 'Status — Warning',
  parameters: {
    docs: { description: { story: 'Warning status. Uses assertive aria-live.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Alert status="warning" alertStyle="lighter" size="small" message="Your session will expire in 5 minutes." dismissible />
      <Alert status="warning" alertStyle="filled"  size="small" message="Unsaved changes detected." dismissible />
    </div>
  ),
};

export const StatusSuccess = {
  name: 'Status — Success',
  parameters: {
    docs: { description: { story: 'Success status. Uses polite aria-live.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Alert status="success" alertStyle="lighter" size="small" message="Your profile has been updated." dismissible />
      <Alert status="success" alertStyle="filled"  size="small" message="Payment confirmed." dismissible />
    </div>
  ),
};

export const StatusInformation = {
  name: 'Status — Information',
  parameters: {
    docs: { description: { story: 'Information status (token: info). Uses polite aria-live.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Alert status="information" alertStyle="lighter" size="small" message="A new version is available." dismissible />
      <Alert status="information" alertStyle="filled"  size="small" message="Scheduled maintenance on Sunday." dismissible />
    </div>
  ),
};

export const StatusFeature = {
  name: 'Status — Feature',
  parameters: {
    docs: { description: { story: 'Feature status. Use for product announcements, new feature highlights.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Alert status="feature" alertStyle="lighter" size="small" message="New: AI-assisted suggestions are now available." dismissible />
      <Alert status="feature" alertStyle="filled"  size="small" message="Introducing the new dashboard experience." dismissible />
    </div>
  ),
};

// ── 2. Styles ─────────────────────────────────────────────────────────────────

export const StyleFilled = {
  name: 'Style — Filled',
  parameters: {
    docs: { description: { story: 'Solid saturated background. Highest emphasis. Icon and text are white (inverse). Border = bg (invisible by design — do not remove).' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['error','warning','success','information','feature'].map(status => (
        <Alert key={status} status={status} alertStyle="filled" size="small"
          message={`${status.charAt(0).toUpperCase() + status.slice(1)} — filled style`} dismissible />
      ))}
    </div>
  ),
};

export const StyleLight = {
  name: 'Style — Light',
  parameters: {
    docs: { description: { story: 'Mid-tone tinted background. Medium-high emphasis. Border = bg (invisible by design).' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['error','warning','success','information','feature'].map(status => (
        <Alert key={status} status={status} alertStyle="light" size="small"
          message={`${status.charAt(0).toUpperCase() + status.slice(1)} — light style`} dismissible />
      ))}
    </div>
  ),
};

export const StyleLighter = {
  name: 'Style — Lighter',
  parameters: {
    docs: { description: { story: 'Very light tinted background. Medium-low emphasis. Default for most use cases. Border = bg (invisible by design).' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['error','warning','success','information','feature'].map(status => (
        <Alert key={status} status={status} alertStyle="lighter" size="small"
          message={`${status.charAt(0).toUpperCase() + status.slice(1)} — lighter style`} dismissible />
      ))}
    </div>
  ),
};

export const StyleStroke = {
  name: 'Style — Stroke',
  parameters: {
    docs: { description: { story: 'Transparent background, 1px colored border, drop shadow. Lowest emphasis. Shadow uses --shadow-regular-medium (DS token approx of color/alpha/black/10 at Y=16, Spread=−12, Radius=32).' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {['error','warning','success','information','feature'].map(status => (
        <Alert key={status} status={status} alertStyle="stroke" size="small"
          message={`${status.charAt(0).toUpperCase() + status.slice(1)} — stroke style`} dismissible />
      ))}
    </div>
  ),
};

// ── 3. Sizes ──────────────────────────────────────────────────────────────────

export const SizeXSmall = {
  name: 'Size — X-Small (32)',
  parameters: {
    docs: { description: { story: 'Single row, center-aligned. 6px top/bottom, 10px left/right, 8px gap. 16×16 icon. Corner radius: 8px.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Alert status="information" alertStyle="lighter" size="x-small" message="X-Small alert — information." dismissible />
      <Alert status="error"       alertStyle="lighter" size="x-small" message="X-Small alert — error." dismissible />
      <Alert status="success"     alertStyle="filled"  size="x-small" message="X-Small alert — success." dismissible />
    </div>
  ),
};

export const SizeSmall = {
  name: 'Size — Small (36)',
  parameters: {
    docs: { description: { story: 'Single row, center-aligned. 8px all-side padding + 8px gap. 16×16 icon. Corner radius: 8px. Same single-row structure as X-Small, but uses 8px all-side padding and body/regular/md message typography.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Alert status="information" alertStyle="lighter" size="small" message="Small alert — information." dismissible />
      <Alert status="error"       alertStyle="lighter" size="small" message="Small alert — error." dismissible />
      <Alert status="success"     alertStyle="filled"  size="small" message="Small alert — success." dismissible />
    </div>
  ),
};

export const SizeLarge = {
  name: 'Size — Large',
  parameters: {
    docs: { description: { story: 'Multi-row: title + description + actions. Top-aligned (flex-start). 12px padding + 12px gap. 20×20 icon. Corner radius: 12px. "∙" divider uses body/regular/md (Open Sans Regular 400).' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Alert
        status="information" alertStyle="lighter" size="large"
        message="Your account has pending verification"
        description="Please verify your email address to continue using all features. Check your inbox for a verification link."
        primaryAction="Resend email"
        secondaryAction="Learn more"
        dismissible
      />
      <Alert
        status="error" alertStyle="lighter" size="large"
        message="Payment failed"
        description="We could not process your payment. Please update your billing information and try again."
        primaryAction="Update billing"
        dismissible
      />
      <Alert
        status="success" alertStyle="filled" size="large"
        message="Export complete"
        description="Your report has been exported successfully. It will be available in your downloads folder for 7 days."
        primaryAction="Download now"
        secondaryAction="View all exports"
        dismissible
      />
    </div>
  ),
};

// ── 4. With / Without action ──────────────────────────────────────────────────

export const WithAction = {
  name: 'With Action Link',
  parameters: {
    docs: { description: { story: 'Primary action link button. Small/X-Small: single action only. Large: primary + optional secondary separated by "∙" divider (Open Sans Regular, body/regular/md).' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Alert status="information" alertStyle="lighter" size="small"
        message="A new version is available." primaryAction="Update now" dismissible />
      <Alert status="warning" alertStyle="lighter" size="small"
        message="Your subscription expires soon." primaryAction="Renew" dismissible />
      <Alert status="information" alertStyle="lighter" size="large"
        message="Your plan has been upgraded"
        description="You now have access to all Pro features. Explore what's new."
        primaryAction="Explore features" secondaryAction="Learn more" dismissible />
    </div>
  ),
};

export const WithoutDismiss = {
  name: 'Without Dismiss',
  parameters: {
    docs: { description: { story: 'dismissible=false — no dismiss button rendered. Use for persistent alerts that cannot be closed by the user.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Alert status="warning" alertStyle="lighter" size="small"
        message="Scheduled maintenance window: Sunday 02:00–04:00 UTC." dismissible={false} />
      <Alert status="error" alertStyle="filled" size="small"
        message="Service unavailable — please check back shortly." dismissible={false} />
    </div>
  ),
};

// ── 5. Dark mode ──────────────────────────────────────────────────────────────

export const DarkMode = {
  name: 'Dark Mode',
  parameters: {
    docs: { description: { story: 'All 5 statuses in lighter style, dark mode. Token chain resolves automatically via data-theme="dark".' } },
    controls: { disable: true },
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div
      data-theme="dark"
      style={{ background: '#1b1c22', padding: 24, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 8 }}
    >
      {['error','warning','success','information','feature'].map(status => (
        <Alert key={status} status={status} alertStyle="lighter" size="small"
          message={`${status.charAt(0).toUpperCase() + status.slice(1)} — dark mode`} dismissible />
      ))}
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['error','warning','success','information','feature'].map(status => (
          <Alert key={status} status={status} alertStyle="filled" size="small"
            message={`${status.charAt(0).toUpperCase() + status.slice(1)} — filled, dark`} dismissible />
        ))}
      </div>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['error','success','information'].map(status => (
          <Alert key={status} status={status} alertStyle="stroke" size="small"
            message={`${status.charAt(0).toUpperCase() + status.slice(1)} — stroke, dark`} dismissible />
        ))}
      </div>
    </div>
  ),
};
