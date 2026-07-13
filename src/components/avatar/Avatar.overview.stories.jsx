import Avatar from './Avatar.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Avatar — Overview stories
// Cross-size and cross-mode reference for Avatar
// Figma source: Design System Scalable — All Platform V.2.1.0
//   ↳ Avatar component set (2107:27), page ❖ Avatar
// ─────────────────────────────────────────────────────────────────────────────

// Figma-exported avatar asset — DS component set 2107:27, Persona=James Brown
// Exported 25/06/2026 via Desktop Bridge plugin (figma_execute + getImageByHash)
import samplePhoto from '../../assets/avatar/avatar-sample-photo.png';

const SAMPLE_SRC = samplePhoto;

const LABEL_STYLE = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 11,
  fontWeight: 600,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const SUB_LABEL_STYLE = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 11,
  color: '#aaa',
};

export default {
  title: 'Components/Avatar/Overview',
  parameters: {
    docs: {
      description: {
        component: `
**Avatar — Size & Mode Overview**

Cross-size and cross-mode reference for all Avatar variants.

**Size guidance:**
- **80** — profile headers, onboarding, focal identity
- **48** — default for most UI contexts (lists, cards, feeds)
- **32** — supporting element in dense UI
- **20** — inline text references, fine-print attribution

**Status badges:** supported at all 9 sizes, including 24 and 20.

**Content modes:** Image → Text (initials) → Icon silhouette — automatic priority fallback.
        `,
      },
    },
  },
};

// ── All Sizes ─────────────────────────────────────────────────────────────────

export const AllSizes = {
  name: 'All Sizes',
  parameters: {
    docs: {
      description: {
        story: 'All 9 sizes shown in both image mode and text mode. Size is fixed in px — use the one that matches the visual hierarchy of the context. When in doubt, use 48.',
      },
    },
  },
  render: () => {
    const sizes = [80, 72, 64, 56, 48, 40, 32, 24, 20];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* Image mode — all sizes */}
        <section>
          <div style={{ marginBottom: 16 }}>
            <span style={LABEL_STYLE}>Image mode — all sizes</span>
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {sizes.map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Avatar src={SAMPLE_SRC} name="James Brown" size={size} />
                <span style={SUB_LABEL_STYLE}>{size}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Text mode — all sizes */}
        <section>
          <div style={{ marginBottom: 16 }}>
            <span style={LABEL_STYLE}>Text mode (initials) — all sizes</span>
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {sizes.map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Avatar name="James Brown" size={size} />
                <span style={SUB_LABEL_STYLE}>{size}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Icon mode — all sizes */}
        <section>
          <div style={{ marginBottom: 16 }}>
            <span style={LABEL_STYLE}>Icon mode (silhouette) — all sizes</span>
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {sizes.map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Avatar size={size} aria-label="Unknown user" />
                <span style={SUB_LABEL_STYLE}>{size}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Status badges — all 9 sizes, including 24 and 20 */}
        <section>
          <div style={{ marginBottom: 16 }}>
            <span style={LABEL_STYLE}>With status badges — all sizes (80 to 20)</span>
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {[80, 72, 64, 56, 48, 40, 32, 24, 20].map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ padding: '6px 8px' }}>
                  <Avatar
                    src={SAMPLE_SRC}
                    name="James Brown"
                    size={size}
                    topStatus="verified"
                    bottomStatus="online"
                  />
                </div>
                <span style={SUB_LABEL_STYLE}>{size}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    );
  },
};
