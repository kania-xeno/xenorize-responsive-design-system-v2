import React from 'react';
import Breadcrumb from './Breadcrumb';
import ChevronRightSmall from '../../icons/ChevronRightSmall.jsx';
import Rose from '../../icons/Rose.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumb — General stories
// Figma source: Design System Scalable V.2.1.0
//   ↳items-breadcrumb (2177:41698) + ↳breadcrumbs-group (2177:41749)
// Axes: item (State × Text × Icon) | group (Divider × Quantity)
// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Breadcrumb/General',
  parameters: {
    docs: {
      description: {
        component: `
**Breadcrumb** — navigational trail showing hierarchy from root to current page.

Two-component system:
- \`BreadcrumbItem\` — individual slot (label, icon, state)
- \`Breadcrumb\` — assembled trail (items array, divider style, WAI-ARIA nav)

**Divider types:** Arrow (ChevronRightSmall icon), Slash (\`/\`), Dot (\`•\`)

**States:** Default (subdued text + icon) | Active (strong text + icon — current page)

The last item is conventionally set to Active and carries \`aria-current="page"\`. The group does not enforce this automatically.

**Token mapping:**
- Default label: \`text/neutral/subtle\` → \`--breadcrumb-text-default\`
- Active label: \`text/neutral/strong\` → \`--breadcrumb-text-active\`
- Default icon: \`icon/sub\` → \`--breadcrumb-icon-default\`
- Active icon: \`icon/strong\` → \`--breadcrumb-icon-active\`
- Divider: \`icon/soft\` → \`--breadcrumb-divider\`

**V1 DS Gaps:**
- No Hover state defined in Figma
- No Disabled state defined in Figma
- No Focus state defined in Figma (WCAG 2.4.7 gap — DS Auditor to resolve)
- Icon named \`rose, flower, romance, love\` in Figma — semantic rename pending

Figma: [Design System Scalable V.2.1.0 → Breadcrumb](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi?node-id=2177-41749)
        `,
      },
    },
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

// Item leading icon: Rose (Figma node 9:83079)
// Arrow divider: ChevronRightSmall (kept as divider, separate from item icon)
const iconEl = <Rose />;

// 3-item trail — text only
const ITEMS_3 = [
  { label: 'Home',     state: 'default', showText: true },
  { label: 'Products', state: 'default', showText: true },
  { label: 'Category', state: 'active',  showText: true },
];

// 4-item trail
const ITEMS_4 = [
  { label: 'Home',      state: 'default', showText: true },
  { label: 'Products',  state: 'default', showText: true },
  { label: 'Category',  state: 'default', showText: true },
  { label: 'Item',      state: 'active',  showText: true },
];

// 5-item trail
const ITEMS_5 = [
  { label: 'Home',      state: 'default', showText: true },
  { label: 'Products',  state: 'default', showText: true },
  { label: 'Category',  state: 'default', showText: true },
  { label: 'Sub',       state: 'default', showText: true },
  { label: 'Item',      state: 'active',  showText: true },
];

// 3-item trail with icons
const ITEMS_3_ICON = [
  { label: 'Home',     state: 'default', showText: true, showIcon: true, icon: iconEl },
  { label: 'Products', state: 'default', showText: true, showIcon: true, icon: iconEl },
  { label: 'Category', state: 'active',  showText: true, showIcon: true, icon: iconEl },
];

// Icon-only trail
const ITEMS_ICON_ONLY = [
  { label: '',  state: 'default', showText: false, showIcon: true, icon: iconEl, ariaLabel: 'Home' },
  { label: '',  state: 'default', showText: false, showIcon: true, icon: iconEl, ariaLabel: 'Products' },
  { label: '',  state: 'active',  showText: false, showIcon: true, icon: iconEl, ariaLabel: 'Category' },
];

const LABEL_STYLE = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 11,
  fontWeight: 600,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 8,
};

function Row({ label, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {label && <div style={LABEL_STYLE}>{label}</div>}
      {children}
    </div>
  );
}

// ── 1. States ─────────────────────────────────────────────────────────────────

export const StateDefault = {
  name: 'State — Default',
  parameters: {
    docs: { description: { story: 'All items in Default state. Subdued label (text/neutral/subtle) and icon (icon/sub).' } },
    controls: { disable: true },
  },
  render: () => (
    <Breadcrumb
      items={ITEMS_3.map(i => ({ ...i, state: 'default' }))}
      divider="arrow"
    />
  ),
};

export const StateActive = {
  name: 'State — Active',
  parameters: {
    docs: { description: { story: 'Last item set to Active — strong label (text/neutral/strong) and icon (icon/strong). Carries aria-current="page".' } },
    controls: { disable: true },
  },
  render: () => (
    <Breadcrumb items={ITEMS_3} divider="arrow" />
  ),
};

// ── 2. Dividers ───────────────────────────────────────────────────────────────

export const DividerArrow = {
  name: 'Divider — Arrow',
  parameters: {
    docs: { description: { story: 'ChevronRightSmall icon as divider. Stroke inherits --breadcrumb-divider (icon/soft).' } },
    controls: { disable: true },
  },
  render: () => <Breadcrumb items={ITEMS_3} divider="arrow" />,
};

export const DividerSlash = {
  name: 'Divider — Slash',
  parameters: {
    docs: { description: { story: '"/" text character as divider. body/regular/md text style, color from --breadcrumb-divider.' } },
    controls: { disable: true },
  },
  render: () => <Breadcrumb items={ITEMS_3} divider="slash" />,
};

export const DividerDot = {
  name: 'Divider — Dot',
  parameters: {
    docs: { description: { story: '"•" text character as divider. body/regular/md text style, color from --breadcrumb-divider.' } },
    controls: { disable: true },
  },
  render: () => <Breadcrumb items={ITEMS_3} divider="dot" />,
};

export const AllDividers = {
  name: 'Dividers — All Types',
  parameters: {
    docs: { description: { story: 'All three divider types side-by-side for comparison.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row label="Arrow"><Breadcrumb items={ITEMS_3} divider="arrow" /></Row>
      <Row label="Slash"><Breadcrumb items={ITEMS_3} divider="slash" /></Row>
      <Row label="Dot">  <Breadcrumb items={ITEMS_3} divider="dot"   /></Row>
    </div>
  ),
};

// ── 3. Quantity ───────────────────────────────────────────────────────────────

export const Quantity3 = {
  name: 'Quantity — 03',
  parameters: {
    docs: { description: { story: '3 items (V1 minimum). Reference width: 388px.' } },
    controls: { disable: true },
  },
  render: () => <Breadcrumb items={ITEMS_3} divider="arrow" />,
};

export const Quantity4 = {
  name: 'Quantity — 04',
  parameters: {
    docs: { description: { story: '4 items. Reference width: 528px.' } },
    controls: { disable: true },
  },
  render: () => <Breadcrumb items={ITEMS_4} divider="arrow" />,
};

export const Quantity5 = {
  name: 'Quantity — 05',
  parameters: {
    docs: { description: { story: '5 items (V1 maximum). Reference width: 668px.' } },
    controls: { disable: true },
  },
  render: () => <Breadcrumb items={ITEMS_5} divider="arrow" />,
};

export const AllQuantities = {
  name: 'Quantity — All',
  parameters: {
    docs: { description: { story: 'All V1 quantity values stacked.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row label="3 items"><Breadcrumb items={ITEMS_3} divider="arrow" /></Row>
      <Row label="4 items"><Breadcrumb items={ITEMS_4} divider="arrow" /></Row>
      <Row label="5 items"><Breadcrumb items={ITEMS_5} divider="arrow" /></Row>
    </div>
  ),
};

// ── 4. Icon combinations ──────────────────────────────────────────────────────

export const TextOnly = {
  name: 'Icon — Text only',
  parameters: {
    docs: { description: { story: 'showIcon=false, showText=true on all items. Standard breadcrumb trail.' } },
    controls: { disable: true },
  },
  render: () => <Breadcrumb items={ITEMS_3} divider="arrow" />,
};

export const IconAndText = {
  name: 'Icon — Icon + Text',
  parameters: {
    docs: { description: { story: 'showIcon=true, showText=true on all items. Icon slot + label, gap 6px.' } },
    controls: { disable: true },
  },
  render: () => <Breadcrumb items={ITEMS_3_ICON} divider="arrow" />,
};

export const IconOnly = {
  name: 'Icon — Icon only',
  parameters: {
    docs: { description: { story: 'showIcon=true, showText=false. Each item requires ariaLabel for accessibility.' } },
    controls: { disable: true },
  },
  render: () => <Breadcrumb items={ITEMS_ICON_ONLY} divider="arrow" />,
};

// ── 5. Dark mode ──────────────────────────────────────────────────────────────

export const DarkMode = {
  name: 'Dark Mode',
  parameters: {
    docs: { description: { story: 'All tokens auto-resolve via [data-theme="dark"]. No CSS overrides needed.' } },
    backgrounds: { default: 'dark' },
    controls: { disable: true },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: 24, background: '#1b1c22', borderRadius: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Row label="Arrow — Dark"><Breadcrumb items={ITEMS_3} divider="arrow" /></Row>
        <Row label="Slash — Dark"><Breadcrumb items={ITEMS_3} divider="slash" /></Row>
        <Row label="Dot — Dark">  <Breadcrumb items={ITEMS_3} divider="dot"   /></Row>
        <Row label="Icon + Text — Dark"><Breadcrumb items={ITEMS_3_ICON} divider="arrow" /></Row>
      </div>
    </div>
  ),
};
