import Avatar from './Avatar.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Avatar — General stories
// Figma source: Design System Scalable — All Platform V.2.1.0
//   ↳ Avatar component set (2107:27), page ❖ Avatar
//   ↳ Top Status (2107:2850) · Bottom Status (2107:2834)
// DS Auditor handoff: design-system-handsoff/component-avatar-handoff-brief.md
// ─────────────────────────────────────────────────────────────────────────────

// Figma-exported avatar assets — DS component set 2107:27
// Exported 25/06/2026 via Desktop Bridge plugin (figma_execute + getImageByHash)
import samplePhoto        from '../../assets/avatar/avatar-sample-photo.png';
import sampleMemoji       from '../../assets/avatar/avatar-sample-memoji.png';
import sampleIllustration from '../../assets/avatar/avatar-sample-illustration.png';

const SAMPLE_SRC       = samplePhoto;
const SAMPLE_SRC_2     = sampleMemoji;
const SAMPLE_SRC_3     = sampleIllustration;

export default {
  title: 'Components/Avatar/General',
  component: Avatar,
  argTypes: {
    src: { control: 'text' },
    name: { control: 'text' },
    size: {
      control: 'select',
      options: [80, 72, 64, 56, 48, 40, 32, 24, 20],
    },
    solidBg: { control: 'boolean' },
    topStatus: {
      control: 'select',
      options: [undefined, 'verified', 'pin', 'favorite', 'add', 'remove', 'notification'],
    },
    bottomStatus: {
      control: 'select',
      options: [undefined, 'online', 'idle', 'busy', 'away', 'company'],
    },
    alt: { control: 'text' },
    'aria-label': { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
**Avatar** is the visual identity element used to represent a person, user, or organisation throughout the product.

---

### Content mode priority chain

Avatar automatically selects a content mode based on available data — no manual mode prop needed:

\`\`\`
src (image) → name (initials) → icon (generic silhouette)
\`\`\`

Pass \`src\` for a photo, \`name\` for initials fallback, or neither for the generic silhouette.

---

### Sizes

| Size | Typical context |
|------|----------------|
| 80   | Profile headers, onboarding, identity confirmation |
| 72   | Featured user sections, detail modals |
| 64   | Sidebar profiles, team member cards |
| 56   | User mention cards, connection lists |
| 48   | **Default** — comment threads, activity feeds, cards |
| 40   | Compact lists, notification rows |
| 32   | Inline mentions, data table rows |
| 24   | Micro-dense tables, inline attribution |
| 20   | Inline text references, fine-print attribution |

---

### Token pattern

Avatar binds directly to theme tokens — no \`avatar/*\` component namespace:
\`\`\`
surface/neutral/weak   → container background (text + icon + solidBg)
text/neutral/strong    → initials text
content/always-white   → status ring + notification/company bg + icon silhouette (theme-invariant #fff)
status/{type}/base     → status badge colour
radius/full            → border-radius (999px)
\`\`\`

---

### Do
- Always provide \`alt\`, \`aria-label\`, or \`name\` — never leave an avatar without an accessible label
- Use **48** as the default size; only go larger when the avatar is the focal point
- Use \`topStatus\` and \`bottomStatus\` normally — Avatar automatically composes their semantic meaning into its outer \`aria-label\` (e.g. \`"James Brown, Verified, Online"\`). No manual aria work is needed on the status props.
- Use \`solidBg\` only on coloured or transparent surfaces that need contrast

### Don't
- Don't show the generic silhouette for a known user — pass \`name\` to get initials instead
- Don't use Avatar to represent categories, tags, or non-person entities
- Don't implement interactive avatar behavior in V1 — wrap in \`<button>\` or \`<a>\` at product level
        `,
      },
    },
  },
};

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground = {
  name: 'Playground',
  args: {
    src: SAMPLE_SRC,
    name: 'James Brown',
    size: 48,
    solidBg: false,
    topStatus: undefined,
    bottomStatus: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground — use the controls panel to explore all props.',
      },
    },
  },
};

// ── Default ───────────────────────────────────────────────────────────────────

export const Default = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: 'Baseline reference — size 48, image mode. This is the most common avatar usage.',
      },
    },
  },
  render: () => (
    <Avatar src={SAMPLE_SRC} name="James Brown" size={48} aria-label="James Brown" />
  ),
};

// ── Content Modes ─────────────────────────────────────────────────────────────

export const ContentModes = {
  name: 'Content Modes',
  parameters: {
    docs: {
      description: {
        story: `All 5 content modes at size 48. The component selects the mode automatically based on available props — \`src\` → \`name\` → generic silhouette. Memoji and Illustration are image sources passed via \`src\`.`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      {[
        { label: 'Image', el: <Avatar src={samplePhoto} name="James Brown" size={48} /> },
        { label: 'Memoji (via src)', el: <Avatar src={sampleMemoji} name="James Brown" size={48} /> },
        { label: 'Illustration (via src)', el: <Avatar src={sampleIllustration} name="James Brown" size={48} /> },
        { label: 'Text (initials)', el: <Avatar name="James Brown" size={48} /> },
        { label: 'Icon (silhouette)', el: <Avatar size={48} aria-label="Unknown user" /> },
      ].map(({ label, el }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          {el}
          <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#888' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

// ── Initials (Text Mode) ──────────────────────────────────────────────────────

export const InitialsTextMode = {
  name: 'Initials (Text Mode)',
  parameters: {
    docs: {
      description: {
        story: `Text mode renders initials derived from the \`name\` prop. Two-word names use first + last initial ("JB"). Single-word names use the first 2 letters ("SO"). Max 2 characters, always uppercase.`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      {[
        { name: 'James Brown',    label: '"James Brown" → JB' },
        { name: 'Sophia',         label: '"Sophia" → SO' },
        { name: 'A',              label: '"A" → A' },
        { name: 'María García',   label: '"María García" → MG' },
        { name: 'Lee Wang Chen',  label: '"Lee Wang Chen" → LC' },
      ].map(({ name, label }) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar name={name} size={48} />
          <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#888', textAlign: 'center', maxWidth: 100 }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

// ── Icon Fallback ─────────────────────────────────────────────────────────────

export const IconFallback = {
  name: 'Icon Fallback',
  parameters: {
    docs: {
      description: {
        story: `Icon mode is the last resort — used when no \`src\` or \`name\` is available (anonymous users, deleted accounts). Always pair with \`aria-label="Unknown user"\` or equivalent.`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Avatar size={48} aria-label="Unknown user" />
      <Avatar size={48} solidBg aria-label="Unknown user" />
    </div>
  ),
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
// (Full cross-size reference is in Avatar.overview.stories.jsx)

export const AllSizes = {
  name: 'All Sizes',
  parameters: {
    docs: {
      description: {
        story: 'All 9 sizes in text mode. For the full cross-size reference including image mode, see the Overview → All Sizes story.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {[80, 72, 64, 56, 48, 40, 32, 24, 20].map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar name="James Brown" size={size} />
          <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#888' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

// ── With Top Status ───────────────────────────────────────────────────────────

export const WithTopStatus = {
  name: 'With Top Status',
  parameters: {
    docs: {
      description: {
        story: 'All 6 top status types at size 48. Top status communicates role, action, or identity verification. Only one type at a time.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      {[
        { type: 'verified',     label: 'Verified' },
        { type: 'pin',          label: 'Pin' },
        { type: 'favorite',     label: 'Favorite' },
        { type: 'add',          label: 'Add' },
        { type: 'remove',       label: 'Remove' },
        { type: 'notification', label: 'Notification' },
      ].map(({ type, label }) => (
        <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar src={SAMPLE_SRC} name="James Brown" size={48} topStatus={type} />
          <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#888' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

// ── With Bottom Status ────────────────────────────────────────────────────────

export const WithBottomStatus = {
  name: 'With Bottom Status',
  parameters: {
    docs: {
      description: {
        story: 'All 5 bottom status types at size 48. Bottom status communicates presence or account type. Never rely on colour alone — each badge has an accessible `aria-label`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      {[
        { type: 'online',  label: 'Online' },
        { type: 'idle',    label: 'Idle' },
        { type: 'busy',    label: 'Busy' },
        { type: 'away',    label: 'Away' },
        { type: 'company', label: 'Company' },
      ].map(({ type, label }) => (
        <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar src={SAMPLE_SRC} name="James Brown" size={48} bottomStatus={type} />
          <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#888' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

// ── Both Status Badges ────────────────────────────────────────────────────────

export const BothStatusBadges = {
  name: 'Both Status Badges',
  parameters: {
    docs: {
      description: {
        story: 'Top and bottom status can appear simultaneously — they communicate independent information (role/action vs. presence). All 9 sizes support both badges.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Avatar src={SAMPLE_SRC} name="James Brown" size={48} topStatus="verified" bottomStatus="online" />
        <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#888' }}>verified + online</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Avatar src={SAMPLE_SRC} name="James Brown" size={48} topStatus="notification" bottomStatus="busy" />
        <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#888' }}>notification + busy</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Avatar name="James Brown" size={48} topStatus="pin" bottomStatus="away" />
        <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#888' }}>pin + away (initials)</span>
      </div>
    </div>
  ),
};

// ── Solid BG ──────────────────────────────────────────────────────────────────

export const SolidBG = {
  name: 'Solid BG',
  parameters: {
    docs: {
      description: {
        story: `\`solidBg=true\` adds an opaque \`surface/neutral/weak\` background. Use only when the avatar appears on a coloured, dark, or transparent surface — not as a universal default.`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
      {/* On coloured surface */}
      <div style={{ background: 'var(--status-sky-base)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Avatar name="James Brown" size={48} />
            <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: 'white' }}>solidBg=off</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Avatar name="James Brown" size={48} solidBg />
            <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: 'white' }}>solidBg=on</span>
          </div>
        </div>
      </div>
      {/* On dark surface */}
      <div style={{ background: '#1b1c22', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Avatar name="James Brown" size={48} />
            <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#999' }}>solidBg=off</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Avatar name="James Brown" size={48} solidBg />
            <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#999' }}>solidBg=on</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ── Light Mode ────────────────────────────────────────────────────────────────

export const LightMode = {
  name: 'Light Mode',
  parameters: {
    docs: {
      description: {
        story: 'Image, text, and icon modes in light theme context. All token fills are sourced from the theme collection and resolve automatically.',
      },
    },
  },
  render: () => (
    <div data-theme="light" style={{ background: '#fff', padding: 24, borderRadius: 12, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar src={SAMPLE_SRC} name="James Brown" size={48} topStatus="verified" bottomStatus="online" />
      <Avatar name="James Brown" size={48} topStatus="pin" bottomStatus="busy" />
      <Avatar size={48} aria-label="Unknown user" />
      <Avatar name="Sophia Williams" size={48} solidBg />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode = {
  name: 'Dark Mode',
  parameters: {
    docs: {
      description: {
        story: 'Image, text, and icon modes in dark theme context. surface/neutral/weak shifts to #2D2F39. text/neutral/strong shifts to #FFFFFF. Verify icon silhouette and status ring visibility.',
      },
    },
  },
  render: () => (
    <div data-theme="dark" style={{ background: '#1b1c22', padding: 24, borderRadius: 12, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar src={SAMPLE_SRC} name="James Brown" size={48} topStatus="verified" bottomStatus="online" />
      <Avatar name="James Brown" size={48} topStatus="pin" bottomStatus="busy" />
      <Avatar size={48} aria-label="Unknown user" />
      <Avatar name="Sophia Williams" size={48} solidBg />
    </div>
  ),
};

// ── Accessible Labels ─────────────────────────────────────────────────────────

export const AccessibleLabels = {
  name: 'Accessible Labels',
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates correct accessible label patterns. Inspect with a screen reader or accessibility tree.

**Avatar with statuses — composed label:**

Avatar composes a single \`aria-label\` from identity + active status descriptions. AT announces the full context from the outer element without needing to traverse into badge sub-components.

\`\`\`
role="img" aria-label="James Brown, Verified, Online"
  └─ nested TopStatus  → aria-hidden="true"  (not independently announced)
  └─ nested BottomStatus → aria-hidden="true"  (not independently announced)
\`\`\`

**Standalone TopStatus / BottomStatus** (used outside Avatar): retain their own \`role="img"\` + \`aria-label\` and are announced normally by AT.

**Rules:**
- Every avatar must have \`aria-label\` or \`alt\` describing the person — never leave it empty
- Icon mode (unknown user) must use \`aria-label="Unknown user"\` or equivalent
- Status meaning is announced via the composed outer label — status colour is never the sole communication of meaning
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Avatar src={SAMPLE_SRC} name="James Brown" size={48} topStatus="verified" bottomStatus="online" />
        <code style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>
          aria-label="James Brown, Verified, Online"<br />
          nested status visuals: aria-hidden="true"
        </code>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Avatar size={48} aria-label="Unknown user" />
        <code style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>
          aria-label="Unknown user"
        </code>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Avatar src={SAMPLE_SRC} size={48} alt="Profile photo of Jane Doe" bottomStatus="busy" />
        <code style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>
          aria-label="Profile photo of Jane Doe, Busy"<br />
          nested status visual: aria-hidden="true"
        </code>
      </div>
    </div>
  ),
};

// ── Top Status — All Sizes ────────────────────────────────────────────────────

const SIZES = [80, 72, 64, 56, 48, 40, 32, 24, 20];

const SIZE_LABEL_STYLE = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 11,
  color: '#888',
};

export const TopStatusAllSizes = {
  name: 'Top Status — All Sizes',
  parameters: {
    docs: {
      description: {
        story: `
Top status badge rendered at all 9 avatar sizes. Badge size and right offset are sourced from Figma and applied via CSS custom properties per size class.

**Figma values (Desktop Bridge inspection, 25/06/2026):**

| Size | Badge | right offset |
|------|-------|-------------|
| 80   | 32px  | −8px        |
| 72   | 32px  | −8px        |
| 64   | 28px  | −8px        |
| 56   | 24px  | −6px        |
| 48   | 20px  | −6px        |
| 40   | 18px  | −6px        |
| 32   | 16px  | −6px        |
| 24   | 12px  | −4px        |
| 20   | 10px  | −4px        |

All sizes now support status badges — the previous 24/20 suppression has been removed.
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {['verified', 'pin', 'favorite', 'add', 'remove', 'notification'].map(type => (
        <div key={type}>
          <div style={{ marginBottom: 12, fontFamily: 'var(--font-family-body)', fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {type}
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {SIZES.map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Avatar src={SAMPLE_SRC} name="James Brown" size={size} topStatus={type} />
                </div>
                <span style={SIZE_LABEL_STYLE}>{size}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Bottom Status — All Sizes ─────────────────────────────────────────────────

export const BottomStatusAllSizes = {
  name: 'Bottom Status — All Sizes',
  parameters: {
    docs: {
      description: {
        story: `
Bottom status badge rendered at all 9 avatar sizes. Badge size and right offset scale with avatar size via CSS custom properties sourced from Figma.

All sizes now support status badges — the previous 24/20 suppression has been removed.
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {['online', 'idle', 'busy', 'away', 'company'].map(type => (
        <div key={type}>
          <div style={{ marginBottom: 12, fontFamily: 'var(--font-family-body)', fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {type}
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {SIZES.map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Avatar src={SAMPLE_SRC} name="James Brown" size={size} bottomStatus={type} />
                </div>
                <span style={SIZE_LABEL_STYLE}>{size}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Both Status Badges — All Sizes ────────────────────────────────────────────

export const BothStatusBadgesAllSizes = {
  name: 'Both Status Badges — All Sizes',
  parameters: {
    docs: {
      description: {
        story: `
Both TopStatus and BottomStatus rendered simultaneously at all 9 sizes. Verifies that top-right and bottom-right badge positions are independent and scale correctly at every size.
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {SIZES.map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar
              src={SAMPLE_SRC}
              name="James Brown"
              size={size}
              topStatus="verified"
              bottomStatus="online"
            />
          </div>
          <span style={SIZE_LABEL_STYLE}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

// ── Size 24 with Status Badges ────────────────────────────────────────────────

export const Size24WithBadge = {
  name: 'Size 24 — With Badges',
  parameters: {
    docs: {
      description: {
        story: `
**Size 24 with status badges.** Previously suppressed in V1 — now supported.

Figma values for size 24: badge = 12px, right offset = −4px.

All 6 top status types and all 5 bottom status types shown. Both badges shown simultaneously at the end.
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      <div>
        <div style={{ marginBottom: 12, fontFamily: 'var(--font-family-body)', fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Top Status — size 24
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {['verified', 'pin', 'favorite', 'add', 'remove', 'notification'].map(type => (
            <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ padding: '6px 8px' }}>
                <Avatar src={SAMPLE_SRC} name="James Brown" size={24} topStatus={type} />
              </div>
              <span style={SIZE_LABEL_STYLE}>{type}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 12, fontFamily: 'var(--font-family-body)', fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Bottom Status — size 24
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {['online', 'idle', 'busy', 'away', 'company'].map(type => (
            <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ padding: '6px 8px' }}>
                <Avatar src={SAMPLE_SRC} name="James Brown" size={24} bottomStatus={type} />
              </div>
              <span style={SIZE_LABEL_STYLE}>{type}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 12, fontFamily: 'var(--font-family-body)', fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Both — size 24
        </div>
        <div style={{ padding: '6px 8px', display: 'inline-flex' }}>
          <Avatar src={SAMPLE_SRC} name="James Brown" size={24} topStatus="verified" bottomStatus="online" />
        </div>
      </div>

    </div>
  ),
};

// ── Size 20 with Status Badges ────────────────────────────────────────────────

export const Size20WithBadge = {
  name: 'Size 20 — With Badges',
  parameters: {
    docs: {
      description: {
        story: `
**Size 20 with status badges.** Previously suppressed in V1 — now supported.

Figma values for size 20: badge = 10px, right offset = −4px.

All top and bottom types shown. At size 20 both badges are rendered — verify they protrude correctly and do not overlap the circle content.
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      <div>
        <div style={{ marginBottom: 12, fontFamily: 'var(--font-family-body)', fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Top Status — size 20
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {['verified', 'pin', 'favorite', 'add', 'remove', 'notification'].map(type => (
            <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ padding: '6px 8px' }}>
                <Avatar src={SAMPLE_SRC} name="James Brown" size={20} topStatus={type} />
              </div>
              <span style={SIZE_LABEL_STYLE}>{type}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 12, fontFamily: 'var(--font-family-body)', fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Bottom Status — size 20
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {['online', 'idle', 'busy', 'away', 'company'].map(type => (
            <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ padding: '6px 8px' }}>
                <Avatar src={SAMPLE_SRC} name="James Brown" size={20} bottomStatus={type} />
              </div>
              <span style={SIZE_LABEL_STYLE}>{type}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 12, fontFamily: 'var(--font-family-body)', fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Both — size 20
        </div>
        <div style={{ padding: '6px 8px', display: 'inline-flex' }}>
          <Avatar src={SAMPLE_SRC} name="James Brown" size={20} topStatus="verified" bottomStatus="online" />
        </div>
      </div>

    </div>
  ),
};

// ── Interactive Avatar (DS Gap placeholder) ───────────────────────────────────

export const InteractiveAvatar = {
  name: 'Interactive Avatar',
  parameters: {
    docs: {
      description: {
        story: `
**⚠️ DS Gap — placeholder story**

Interactive avatar (hover/focus states) is not defined in the DS Avatar component for V1.

If the product requires a clickable avatar, wrap it in a \`<button>\` or \`<a>\` at the product level — do not use a bare \`<div>\`. Example:

\`\`\`jsx
<button type="button" onClick={openProfile} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', borderRadius: '50%' }}>
  <Avatar src={src} name={name} size={48} />
</button>
\`\`\`

Focus ring token for Avatar is not defined in the DS. Flag for DS Auditor before implementing a focus treatment.
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <button
        type="button"
        onClick={() => {}}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', borderRadius: '50%' }}
        aria-label="Open James Brown's profile"
      >
        <Avatar src={SAMPLE_SRC} name="James Brown" size={48} />
      </button>
      <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#888' }}>
        Wrapped in &lt;button&gt; at product level — no DS focus ring defined yet
      </span>
    </div>
  ),
};
