import Badge from './Badge.jsx';
import BubbleAlert from '../icons/BubbleAlert.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Badge — General stories
// Figma source: Design System Scalable V.2.1.0 → ❖ badge (2008:2857)
// V1 scope: All 4 types, 4 styles, 9 colors, 2 sizes, Number=On/Off, Disabled
// Out of scope: Hover / Focus / Pressed / Loading — not defined in Figma (DS Gap)
//               Yellow — no Figma variant (badge/yellow/* tokens pending DS Auditor)
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Badge/General',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `
**Badge** — small display label for status, category, count, or annotation.

**Badge is not interactive.** It has no click, hover, focus, or keyboard behavior. Do not add event handlers to badge.

**4 Types:**
- **Basic** — text label only (default)
- **With Dot** — 4×4px circle dot before text
- **Left Icon** — icon before text
- **Right Icon** — icon after text

**4 Styles:**
- **Filled** — solid background, highest emphasis
- **Light** — mid-tone tint, medium-high emphasis
- **Lighter** — very light tint, medium-low emphasis (default for most uses)
- **Stroke** — transparent background, 1px border, lowest emphasis

**9 Colors:** Gray, Blue, Orange, Red, Green, Purple, Sky, Pink, Teal

**2 Sizes:** Small (16px) · Medium (20px)

**Disabled:** Transparent background + 1px border using stroke-style tokens. Same visual result regardless of which style is selected. No dedicated \`badge/{color}/disabled/*\` namespace — uses Stroke tokens.

**DS Gaps (not implemented):**
- Yellow variant — \`badge/yellow/*\` tokens exist but no Figma variant. Pending DS Auditor.
- Dot color token — dot reuses \`badge/{color}/{style}/text\` token. No dedicated dot token.
- Typography text style — 10px font not bound to a DS text style token.
- Hover / Focus / Pressed states — by design (badge is display-only).

Figma source: [Design System Scalable V.2.1.0 → ❖ badge](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi?node-id=2008-2857)
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['basic', 'dot', 'left-icon', 'right-icon'],
      description: 'Layout type controlling anatomy.',
    },
    badgeStyle: {
      control: { type: 'select' },
      options: ['filled', 'light', 'lighter', 'stroke'],
      description: 'Fill treatment. Filled = highest emphasis. Stroke = lowest.',
    },
    color: {
      control: { type: 'select' },
      options: ['gray', 'blue', 'orange', 'red', 'green', 'purple', 'sky', 'pink', 'teal'],
      description: '9 approved semantic colors. Yellow excluded (pending DS Auditor).',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'Small = 16px height (10px font). Medium = 20px height (12px font). Size difference is driven by font size, line height, and vertical padding.',
    },
    label: {
      control: 'text',
      description: 'Text label. Keep to 1–3 words.',
    },
    number: {
      control: 'text',
      description: 'Number=On label (SemiBold). Only applies when type=basic. Replaces label.',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show or hide the icon slot. Applies to left-icon and right-icon types only.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state — transparent bg, 1px stroke border, muted text.',
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
  },
};

// ── 1. Types ──────────────────────────────────────────────────────────────────

export const TypeBasic = {
  name: 'Type — Basic',
  parameters: {
    docs: {
      description: {
        story: 'Default type. Text label only — no icon or dot.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge type="basic" badgeStyle="filled" color="blue" size="small" label="Active" />
      <Badge type="basic" badgeStyle="lighter" color="gray" size="small" label="Draft" />
      <Badge type="basic" badgeStyle="filled" color="red" size="small" label="Error" />
      <Badge type="basic" badgeStyle="light" color="green" size="small" label="Success" />
    </div>
  ),
};

export const TypeWithDot = {
  name: 'Type — With Dot',
  parameters: {
    docs: {
      description: {
        story: 'Dot indicator before the label. Dot color reuses the text token — no dedicated dot color token in V1.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge type="dot" badgeStyle="filled" color="green" size="small" label="Online" />
      <Badge type="dot" badgeStyle="lighter" color="gray" size="small" label="Idle" />
      <Badge type="dot" badgeStyle="filled" color="red" size="small" label="Offline" />
      <Badge type="dot" badgeStyle="light" color="orange" size="small" label="Away" />
    </div>
  ),
};

export const TypeLeftIcon = {
  name: 'Type — Left Icon',
  parameters: {
    docs: {
      description: {
        story: 'Icon before label. Default icon: bubble-alert (Icon System V.2.0.0, node 9:77916). Pass any icon component from the Icon System via the icon prop.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge type="left-icon" badgeStyle="filled" color="blue" size="small" label="Info" />
      <Badge type="left-icon" badgeStyle="lighter" color="orange" size="small" label="Warning" />
      <Badge type="left-icon" badgeStyle="filled" color="red" size="small" label="Alert" />
      <Badge type="left-icon" badgeStyle="light" color="purple" size="small" label="New" />
    </div>
  ),
};

export const TypeRightIcon = {
  name: 'Type — Right Icon',
  parameters: {
    docs: {
      description: {
        story: 'Icon after label. Use for directional affordance (e.g. external link, dropdown indicator).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge type="right-icon" badgeStyle="filled" color="teal" size="small" label="View" />
      <Badge type="right-icon" badgeStyle="lighter" color="sky" size="small" label="Open" />
      <Badge type="right-icon" badgeStyle="stroke" color="gray" size="small" label="More" />
    </div>
  ),
};

// ── 2. Styles ─────────────────────────────────────────────────────────────────

export const StyleFilled = {
  name: 'Style — Filled',
  parameters: {
    docs: {
      description: {
        story: 'Solid background. Highest visual emphasis. Use for primary status only.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {['gray','blue','orange','red','green','purple','sky','pink','teal'].map(color => (
        <Badge key={color} badgeStyle="filled" color={color} size="small" label={color.charAt(0).toUpperCase() + color.slice(1)} />
      ))}
    </div>
  ),
};

export const StyleLight = {
  name: 'Style — Light',
  parameters: {
    docs: {
      description: {
        story: 'Mid-tone tinted background. Medium-high emphasis. Color identity is strong but less heavy than Filled.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {['gray','blue','orange','red','green','purple','sky','pink','teal'].map(color => (
        <Badge key={color} badgeStyle="light" color={color} size="small" label={color.charAt(0).toUpperCase() + color.slice(1)} />
      ))}
    </div>
  ),
};

export const StyleLighter = {
  name: 'Style — Lighter',
  parameters: {
    docs: {
      description: {
        story: 'Very light tinted background. Medium-low emphasis. Default for most secondary labels.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {['gray','blue','orange','red','green','purple','sky','pink','teal'].map(color => (
        <Badge key={color} badgeStyle="lighter" color={color} size="small" label={color.charAt(0).toUpperCase() + color.slice(1)} />
      ))}
    </div>
  ),
};

export const StyleStroke = {
  name: 'Style — Stroke',
  parameters: {
    docs: {
      description: {
        story: 'Transparent background with 1px colored border. Lowest emphasis. Use for optional or inactive tags.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {['gray','blue','orange','red','green','purple','sky','pink','teal'].map(color => (
        <Badge key={color} badgeStyle="stroke" color={color} size="small" label={color.charAt(0).toUpperCase() + color.slice(1)} />
      ))}
    </div>
  ),
};

// ── 3. Sizes ──────────────────────────────────────────────────────────────────

export const Sizes = {
  name: 'Sizes',
  parameters: {
    docs: {
      description: {
        story: 'Small (16px height, 10px font) vs Medium (20px height, 12px font). Size difference is driven by font size, line height, and vertical padding. Medium uses asymmetric padding (2px top / 4px bottom) — intentional optical alignment.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#aaa', width: 56 }}>Small</span>
        <Badge badgeStyle="filled" color="blue" size="small" label="Active" />
        <Badge type="dot" badgeStyle="lighter" color="green" size="small" label="Online" />
        <Badge type="left-icon" badgeStyle="filled" color="purple" size="small" label="New" />
        <Badge badgeStyle="stroke" color="gray" size="small" number="42" />
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#aaa', width: 56 }}>Medium</span>
        <Badge badgeStyle="filled" color="blue" size="medium" label="Active" />
        <Badge type="dot" badgeStyle="lighter" color="green" size="medium" label="Online" />
        <Badge type="left-icon" badgeStyle="filled" color="purple" size="medium" label="New" />
        <Badge badgeStyle="stroke" color="gray" size="medium" number="42" />
      </div>
    </div>
  ),
};

// ── 4. Number=On ──────────────────────────────────────────────────────────────

export const NumberOn = {
  name: 'Number=On',
  parameters: {
    docs: {
      description: {
        story: 'Numeric count label in SemiBold (600). Basic type only. Use for notification counts, unread indicators. Display "999+" for counts over 999.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#aaa', width: 56 }}>Small</span>
        {['gray','blue','red','green'].map(color => (
          <Badge key={color} badgeStyle="filled" color={color} size="small" number="5" />
        ))}
        <Badge badgeStyle="lighter" color="gray" size="small" number="128" />
        <Badge badgeStyle="stroke" color="gray" size="small" number="999+" />
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#aaa', width: 56 }}>Medium</span>
        {['gray','blue','red','green'].map(color => (
          <Badge key={color} badgeStyle="filled" color={color} size="medium" number="5" />
        ))}
        <Badge badgeStyle="lighter" color="gray" size="medium" number="128" />
        <Badge badgeStyle="stroke" color="gray" size="medium" number="999+" />
      </div>
    </div>
  ),
};

// ── 5. Disabled ───────────────────────────────────────────────────────────────

export const Disabled = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Disabled=On. Transparent background + 1px border using stroke-style tokens. Same visual regardless of which style is selected. Opacity = 1 — no node-level dimming.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {['gray','blue','orange','red','green','purple','sky','pink','teal'].map(color => (
          <Badge key={color} badgeStyle="filled" color={color} size="small" label="Disabled" disabled />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Badge type="left-icon" badgeStyle="light" color="blue" size="small" label="Info" disabled />
        <Badge type="dot" badgeStyle="filled" color="green" size="small" label="Online" disabled />
        <Badge badgeStyle="lighter" color="gray" size="small" number="42" disabled />
      </div>
    </div>
  ),
};

// ── 6. Dark Mode ──────────────────────────────────────────────────────────────

export const DarkMode = {
  name: 'Dark Mode',
  parameters: {
    docs: {
      description: {
        story: 'All 4 styles across sample colors in dark mode. Token chain resolves automatically via data-theme="dark".',
      },
    },
    controls: { disable: true },
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div
      data-theme="dark"
      style={{ background: '#1b1c22', padding: 32, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {['filled','light','lighter','stroke'].map(style => (
        <div key={style} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#6b7189', width: 52, flexShrink: 0, textTransform: 'capitalize' }}>{style}</span>
          {['gray','blue','red','green','purple','orange'].map(color => (
            <Badge key={color} badgeStyle={style} color={color} size="small" label={color.charAt(0).toUpperCase() + color.slice(1)} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ── 7. Show Icon Toggle ───────────────────────────────────────────────────────

export const ShowIconToggle = {
  name: 'Show Icon Toggle',
  parameters: {
    docs: {
      description: {
        story: 'showIcon=false hides the icon while preserving the badge layout type. The icon slot is removed from the DOM entirely.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge type="left-icon" badgeStyle="filled" color="blue" size="small" label="With icon" showIcon={true} />
      <Badge type="left-icon" badgeStyle="filled" color="blue" size="small" label="No icon" showIcon={false} />
      <Badge type="right-icon" badgeStyle="lighter" color="gray" size="small" label="With icon" showIcon={true} />
      <Badge type="right-icon" badgeStyle="lighter" color="gray" size="small" label="No icon" showIcon={false} />
    </div>
  ),
};
