import Accordion from './Accordion.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Accordion — General stories
// Figma source: Design System Scalable V.2.1.0 → ❖ Accordion (2024:936)
// V1 scope: Default, Hover, Active × Flip Icon Off/On
// Out of scope: Focus (DS gap — no accordion/focus-ring token),
//               Disabled (DS gap — no accordion/disabled/* namespace)
// ─────────────────────────────────────────────────────────────────────────────

const SAMPLE_TITLE = 'What is an accordion component?';
const SAMPLE_BODY =
  'An accordion is an interactive disclosure component that shows a title row in a collapsed state and reveals a description body when the user clicks or taps it.';
const LONG_BODY =
  'An accordion is an interactive disclosure component that progressively reveals content to reduce visual complexity. It keeps UIs compact by default while allowing users to access supplementary detail on demand. Use it for FAQs, settings explanations, help text, and detail panels where the content is useful but not required at a glance.';

export default {
  title: 'Components/Accordion/General',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: `
**Accordion** — interactive disclosure component. Collapses body content until the user expands it.

**Two layout configurations** controlled by the \`flipIcon\` prop:
- **Flip Icon Off** (default): info icon left · title fills · chevron right
- **Flip Icon On**: chevron left · title fills · no info icon

**Flip Icon = On removes the info icon entirely** — the text frame gains extra width. This is a structural difference, not a visual toggle. Do not expect the icon to move to the right.

**Border and shadow** appear in Default state only. Their absence on Hover and Active is intentional DS design — not a bug.

**\`accordion/bg/hover\` and \`accordion/bg/active\` resolve identically** — they alias the same theme token (\`surface/neutral/weak\`).

**Transitions:**
- Hover: \`background-color\`, \`border-color\`, \`box-shadow\` — DISSOLVE 0.2s ease-out
- Expand/collapse: \`grid-template-rows\` — SMART_ANIMATE 0.2s ease-out

**DS Gaps (not implemented in V1):**
- Focus ring — no \`accordion/focus-ring\` token. Pending DS Auditor.
- Disabled state — no \`accordion/disabled/*\` namespace. Pending DS Auditor.

Figma source: [Design System Scalable V.2.1.0 → ❖ Accordion](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi?node-id=2024:936)
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Header label — always visible' },
    body: { control: 'text', description: 'Body content — revealed when open' },
    flipIcon: {
      control: 'boolean',
      description:
        'false: info icon left + chevron right. true: chevron left, no info icon.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state (uncontrolled).',
    },
  },
  args: {
    title: SAMPLE_TITLE,
    body: SAMPLE_BODY,
    flipIcon: false,
    defaultOpen: false,
  },
};

// ── 1. Default — Flip Icon Off ────────────────────────────────────────────────

export const DefaultFlipIconOff = {
  name: 'Default — Flip Icon Off',
  parameters: {
    docs: {
      description: {
        story:
          'Collapsed state. Standard layout: info icon left · title · chevron right. Border and shadow visible in Default only.',
      },
    },
  },
  args: {
    title: SAMPLE_TITLE,
    body: SAMPLE_BODY,
    flipIcon: false,
    defaultOpen: false,
  },
};

// ── 2. Default — Flip Icon On ─────────────────────────────────────────────────

export const DefaultFlipIconOn = {
  name: 'Default — Flip Icon On',
  parameters: {
    docs: {
      description: {
        story:
          'Collapsed state. Flipped layout: chevron left · title fills. The info icon is absent — not moved. The text frame gains the icon width.',
      },
    },
  },
  args: {
    title: SAMPLE_TITLE,
    body: SAMPLE_BODY,
    flipIcon: true,
    defaultOpen: false,
  },
};

// ── 3. Active (Open) — Flip Icon Off ─────────────────────────────────────────

export const ActiveFlipIconOff = {
  name: 'Active — Flip Icon Off',
  parameters: {
    docs: {
      description: {
        story:
          'Expanded state. Chevron swaps to up arrow. Background shifts to active tint (same value as Hover). Border and shadow absent.',
      },
    },
  },
  args: {
    title: SAMPLE_TITLE,
    body: SAMPLE_BODY,
    flipIcon: false,
    defaultOpen: true,
  },
};

// ── 4. Active (Open) — Flip Icon On ──────────────────────────────────────────

export const ActiveFlipIconOn = {
  name: 'Active — Flip Icon On',
  parameters: {
    docs: {
      description: {
        story:
          'Expanded state. Flipped layout. Chevron on left swaps to up arrow.',
      },
    },
  },
  args: {
    title: SAMPLE_TITLE,
    body: SAMPLE_BODY,
    flipIcon: true,
    defaultOpen: true,
  },
};

// ── 5. Dark Mode ──────────────────────────────────────────────────────────────

export const DarkMode = {
  name: 'Dark Mode',
  parameters: {
    docs: {
      description: {
        story:
          'Both configurations in dark mode. All accordion/* tokens alias through the theme collection — colors update automatically via data-theme="dark".',
      },
    },
    controls: { disable: true },
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div
      data-theme="dark"
      style={{
        background: '#1b1c22',
        padding: 32,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Accordion title={SAMPLE_TITLE} body={SAMPLE_BODY} flipIcon={false} />
        <Accordion title={SAMPLE_TITLE} body={SAMPLE_BODY} flipIcon={true} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Accordion title={SAMPLE_TITLE} body={SAMPLE_BODY} flipIcon={false} defaultOpen />
        <Accordion title={SAMPLE_TITLE} body={SAMPLE_BODY} flipIcon={true} defaultOpen />
      </div>
    </div>
  ),
};

// ── 6. Long Body Text ─────────────────────────────────────────────────────────

export const LongBodyText = {
  name: 'Long Body Text',
  parameters: {
    docs: {
      description: {
        story:
          'Expanded state with longer body content. The accordion uses HUG height — the container grows naturally with content. No fixed height or overflow truncation.',
      },
    },
  },
  args: {
    title: SAMPLE_TITLE,
    body: LONG_BODY,
    flipIcon: false,
    defaultOpen: true,
  },
};

// ── 7. Grouped Accordions ─────────────────────────────────────────────────────

export const GroupedAccordions = {
  name: 'Grouped Accordions',
  parameters: {
    docs: {
      description: {
        story:
          'Multiple accordions in a list. Each instance manages its own state independently. There is no group component in the DS — spacing and stacking are product-level layout concerns.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
      <Accordion
        title="What is an accordion component?"
        body="An accordion is an interactive disclosure component that shows a title row in a collapsed state and reveals body content when clicked."
        flipIcon={false}
      />
      <Accordion
        title="When should I use an accordion?"
        body="Use accordions for supplementary content where progressive disclosure adds value — FAQs, settings explanations, help text, and detail panels."
        flipIcon={false}
        defaultOpen
      />
      <Accordion
        title="What are the two layout configurations?"
        body="Flip Icon Off has the info icon on the left. Flip Icon On has the chevron on the left and no info icon. This is a structural difference, not an icon rotation."
        flipIcon={false}
      />
    </div>
  ),
};
