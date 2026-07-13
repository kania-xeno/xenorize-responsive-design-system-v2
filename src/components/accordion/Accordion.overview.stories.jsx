import Accordion from './Accordion.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Accordion — Overview stories
// Cross-configuration reference and interactive Playground for Accordion
// Figma source: Design System Scalable V.2.1.0 → ❖ Accordion (2024:936)
// ─────────────────────────────────────────────────────────────────────────────

const SAMPLE_TITLE = 'What is an accordion component?';
const SAMPLE_BODY =
  'An accordion is an interactive disclosure component that shows a title row in a collapsed state and reveals a description body when the user clicks or taps it.';

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
};

export default {
  title: 'Components/Accordion/Overview',
  parameters: {
    docs: {
      description: {
        component: `
**Accordion — Configuration & State Overview**

Cross-configuration reference for all Accordion variants.

**Layout configurations:**
- **Flip Icon Off** — info icon left · title · chevron right
- **Flip Icon On** — chevron left · title (no info icon)

Use the **Playground** story to test props interactively.
        `,
      },
    },
  },
};

// ── Both Configurations ───────────────────────────────────────────────────────

export const BothConfigurations = {
  name: 'Both Configurations',
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side reference: Flip Icon Off (left) and Flip Icon On (right), shown in both collapsed and expanded states.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 960 }}>
      <div>
        <div style={LABEL_STYLE}>Collapsed</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 }}>
          <div>
            <div style={SUB_LABEL_STYLE}>Flip Icon = Off</div>
            <Accordion title={SAMPLE_TITLE} body={SAMPLE_BODY} flipIcon={false} />
          </div>
          <div>
            <div style={SUB_LABEL_STYLE}>Flip Icon = On</div>
            <Accordion title={SAMPLE_TITLE} body={SAMPLE_BODY} flipIcon={true} />
          </div>
        </div>
      </div>

      <div>
        <div style={LABEL_STYLE}>Expanded</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 }}>
          <div>
            <div style={SUB_LABEL_STYLE}>Flip Icon = Off</div>
            <Accordion title={SAMPLE_TITLE} body={SAMPLE_BODY} flipIcon={false} defaultOpen />
          </div>
          <div>
            <div style={SUB_LABEL_STYLE}>Flip Icon = On</div>
            <Accordion title={SAMPLE_TITLE} body={SAMPLE_BODY} flipIcon={true} defaultOpen />
          </div>
        </div>
      </div>
    </div>
  ),
};

// ── Playground ────────────────────────────────────────────────────────────────
// Interactive QA/design sandbox.
// Focus and Disabled are excluded — DS gaps, not V1 scope.
//
// Hover is simulated via a story-injected CSS class. In production,
// hover is purely CSS (:hover) and cannot be forced via a prop.

const PLAYGROUND_HOVER_STYLE = `
  .accordion--story-hover {
    background-color: var(--accordion-bg-hover) !important;
    border-color: transparent !important;
    box-shadow: none !important;
  }
  .accordion--story-hover .accordion__info-icon {
    color: var(--accordion-icon-default) !important;
  }
`;

export const Playground = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: `
Interactive sandbox for design QA and component exploration.

**Controls:**
- **state** — \`default\` (collapsed) · \`hover\` (simulated) · \`active\` (expanded)
- **flipIcon** — layout configuration
- **title / body** — editable text content
- **theme** — light or dark mode

**Hover note:** Hover state here is simulated via a story helper class. In production it is driven by CSS \`:hover\` — no JS prop required.

**Excluded:** Focus and Disabled are DS gaps — no \`accordion/focus-ring\` or \`accordion/disabled/*\` tokens exist. Not V1 scope.
        `,
      },
    },
  },
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active'],
      description:
        'Visual state. Hover is simulated in Storybook — in production it is CSS :hover only.',
      table: { defaultValue: { summary: 'default' } },
    },
    flipIcon: {
      control: 'boolean',
      description:
        'false: info icon left + chevron right. true: chevron left, no info icon.',
      table: { defaultValue: { summary: 'false' } },
    },
    title: {
      control: 'text',
      description: 'Header label — always visible.',
    },
    body: {
      control: 'text',
      description: 'Body content — revealed when active.',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Color mode. Applies data-theme to the story wrapper.',
      table: { defaultValue: { summary: 'light' } },
    },
  },
  args: {
    state: 'default',
    flipIcon: false,
    title: SAMPLE_TITLE,
    body: SAMPLE_BODY,
    theme: 'light',
  },
  render: ({ state, flipIcon, title, body, theme }) => {
    const isOpen    = state === 'active';
    const isHovered = state === 'hover';
    const isDark    = theme === 'dark';

    return (
      <>
        {isHovered && <style>{PLAYGROUND_HOVER_STYLE}</style>}
        <div
          {...(isDark ? { 'data-theme': 'dark' } : {})}
          style={isDark
            ? { background: '#1b1c22', padding: 24, borderRadius: 8 }
            : {}}
        >
          <Accordion
            key={`${state}-${flipIcon}-${theme}`}
            title={title}
            body={body}
            flipIcon={flipIcon}
            defaultOpen={isOpen}
            className={isHovered ? 'accordion--story-hover' : ''}
          />
        </div>
      </>
    );
  },
};
