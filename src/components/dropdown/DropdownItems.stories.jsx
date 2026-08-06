import React from "react";
import DropdownOption from "./DropdownOption.jsx";
import ShazamLogo from "../../assets/logos/Shazam.jsx";
import SingaporeFlag from "../../assets/flags/Singapore.jsx";
import SynergyLogo from "../../assets/logos/Synergy.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// Dropdown Items — per-type stories
// Figma source: Design System Scalable V.2.1.0 → ❖ Dropdown → ↳dropdown-items
// 6 types × 2 sizes. States shown on Basic; other types show default only.
//
// Left-slot Figma sizes (confirmed 2026-08-06 re-inspection):
//   Basic    Small: Globe 20×20 (bare)     Large: Globe 20×20 inside Icon 40×40 frame
//   Country  Small: Flag  20×20 (bare)     Large: Flag  20×20 inside Country 40×40 frame
//   Avatar   Small: Avatar 20×20 (bare)    Large: Avatar 40×40 (bare)
//   Provider Small: Logo  32×24 landscape  Large: Logo  32×24 inside Provider 40×40 frame
//   Brand    Small: Logo  24×24 (bare)     Large: Logo  32×32 inside Brand 40×40 frame
//   Company  Small: Logo  20×20 (bare)     Large: Logo  24×24 inside Company 40×40 frame
//
// Text frame: HORIZONTAL layout, gap 4px (Label | Sublabel on same row).
// Sublabel is visible=false in Figma defaults — shown here to demo the prop.
// ─────────────────────────────────────────────────────────────────────────────

const LABEL_STYLE = {
  fontFamily: "var(--font-family-body)",
  fontSize: 11,
  fontWeight: 600,
  color: "var(--color-text-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: 4,
};

const SUB_LABEL_STYLE = {
  fontFamily: "var(--font-family-body)",
  fontSize: 11,
  color: "var(--color-text-subtle)",
  marginBottom: 8,
};

// Simulated hover/selected-hover — CSS :hover cannot be forced via prop.
const HOVER_CSS = `
  .dropdown-option--story-hover:not([aria-disabled="true"]) {
    background-color: var(--dropdown-items-bg-hover) !important;
  }
  .dropdown-option--story-hover .dropdown-option__label {
    color: var(--dropdown-items-text-hover) !important;
  }
  .dropdown-option--story-hover .dropdown-option__sublabel {
    color: var(--dropdown-items-subtext-hover) !important;
  }
  .dropdown-option--story-selected-hover {
    background-color: var(--dropdown-items-bg-selected-hover) !important;
  }
  .dropdown-option--story-selected-hover .dropdown-option__label {
    color: var(--dropdown-items-text-selected-hover) !important;
  }
  .dropdown-option--story-selected-hover .dropdown-option__sublabel {
    color: var(--dropdown-items-subtext-selected-hover) !important;
  }
`;

// Neutral layout wrapper — gives DropdownOption (width: 100%) the DS row width (340px)
const ROW_WRAP = { width: 340 };

// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: "Components/Dropdown/Dropdown Items",
  component: DropdownOption,
  parameters: {
    docs: {
      description: {
        component: `
**DropdownOption** (\`↳dropdown-items\`) — individual option row.

6 types × 5 states × 2 sizes (40px small · 56px large).

**Text frame layout:** Label and Sublabel sit on the **same horizontal row** (Figma: \`layoutMode: HORIZONTAL, gap: 4px\`). When both are provided, sublabel appears to the right of the label.

Left-slot anatomy differs by size and type — see individual stories.

Figma: \`↳dropdown-items\` node \`2090:6272\`
        `,
      },
    },
    controls: { disable: true },
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["basic", "country", "avatar", "provider", "brand", "company"],
      description: "Item type — controls left-slot asset and frame.",
      table: { defaultValue: { summary: "basic" } },
    },
    size: {
      control: { type: "select" },
      options: ["small", "large"],
      description: "Row height: small (40px) · large (56px).",
      table: { defaultValue: { summary: "small" } },
    },
    selected: {
      control: "boolean",
      description: "Selected state (aria-selected).",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state (aria-disabled). Row stays in DOM.",
      table: { defaultValue: { summary: "false" } },
    },
    showToggle: {
      control: "boolean",
      description: "Show inline Switch toggle.",
      table: { defaultValue: { summary: "false" } },
    },
    toggleValue: {
      control: "boolean",
      description: "Toggle on/off state.",
      table: { defaultValue: { summary: "false" } },
    },
    showCheckbox: {
      control: "boolean",
      description: "Show multi-select Checkbox (left of left-slot).",
      table: { defaultValue: { summary: "false" } },
    },
    checked: {
      control: "boolean",
      description: "Checkbox checked state.",
      table: { defaultValue: { summary: "false" } },
    },
    showBadge: {
      control: "boolean",
      description: "Show Badge slot.",
      table: { defaultValue: { summary: "false" } },
    },
    badgeLabel: {
      control: "text",
      description: "Badge text.",
      table: { defaultValue: { summary: '"Badge"' } },
    },
    showButton: {
      control: "boolean",
      description: "Show link Button slot.",
      table: { defaultValue: { summary: "false" } },
    },
    buttonLabel: {
      control: "text",
      description: "Link button text.",
      table: { defaultValue: { summary: '"Link"' } },
    },
    showRightIcon: {
      control: "boolean",
      description: "Show right chevron icon.",
      table: { defaultValue: { summary: "false" } },
    },
    label: {
      control: "text",
      table: { defaultValue: { summary: "Option label" } },
    },
    sublabel: { control: "text" },
    description: {
      control: "text",
      description: "Supporting description — rendered only for size=large.",
    },
  },
  args: {
    type: "basic",
    size: "small",
    label: "Option label",
    sublabel: "Secondary text",
    description: "Supporting description",
    selected: false,
    disabled: false,
    showToggle: false,
    toggleValue: false,
    showCheckbox: false,
    checked: false,
    showBadge: false,
    badgeLabel: "Badge",
    showButton: false,
    buttonLabel: "Link",
    showRightIcon: false,
  },
};

// ── 0. Playground ─────────────────────────────────────────────────────────────

export const Playground = {
  args: {
    sublabel: "(sublabel)",
    showToggle: true,
    showCheckbox: true,
    showBadge: true,
    showButton: true,
    showRightIcon: true,
    type: "company",
    size: "large"
  },
  name:"Playground",
  parameters:{
    controls: { disable: false },
    docs: {
      description: {
        story: "Interactive sandbox — use the Controls panel to configure every prop. All nested components (Checkbox, Badge, Toggle, Button, chevron) can be shown simultaneously via their independent `show*` controls. Left icon uses Figma-accurate sizing per type.",
      },
    },
  },
  render:(args) => (
    <div style={{ width: 340 }}>
      <DropdownOption
        {...args}
        leftIcon={
          // Basic: no leftIcon → Globe renders by default (src/icons/Globe.jsx)
          args.type === "country"  ? <SingaporeFlag width={20} height={20} /> :
          args.type === "provider" ? <SynergyLogo width={32} height={24} /> :
          args.type === "brand"    ? <ShazamLogo width={args.size === "large" ? 32 : 24} height={args.size === "large" ? 32 : 24} /> :
          args.type === "company"  ? <SynergyLogo width={args.size === "large" ? 24 : 20} height={args.size === "large" ? 24 : 20} /> :
          args.type === "avatar"   ? undefined :
          undefined
        }
      />
    </div>
  )
};

// ── 1. Basic ──────────────────────────────────────────────────────────────────

export const Basic = {
  name: "Basic",
  parameters: {
    docs: {
      description: {
        story: `
Base type. Globe icon (\`src/icons/Globe.jsx\`) is the default left-slot — no \`leftIcon\` prop needed.

**Left slot:** Globe 20×20 (Small, bare) · Globe 20×20 inside Icon 40×40 frame (Large, no border — DS gap G5).

**Text frame:** Label + Sublabel on the same horizontal row. Sublabel is \`visible=false\` in Figma defaults.

All 5 states shown. Hover rows simulate \`:hover\` via injected CSS class.
        `,
      },
    },
  },
  render: () => {
    const STATES = [
      { label: "Default",              selected: false, disabled: false, className: "" },
      { label: "Hover (simulated)",    selected: false, disabled: false, className: "dropdown-option--story-hover" },
      { label: "Selected",             selected: true,  disabled: false, className: "" },
      { label: "Selected Hover (sim)", selected: true,  disabled: false, className: "dropdown-option--story-selected-hover" },
      { label: "Disabled",             selected: false, disabled: true,  className: "" },
    ];

    return (
      <>
        <style>{HOVER_CSS}</style>
        <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

          {/* Small */}
          <div>
            <div style={LABEL_STYLE}>Small — 40px</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              {STATES.map(({ label, selected, disabled, className }) => (
                <div key={label}>
                  <div style={SUB_LABEL_STYLE}>{label}</div>
                  <div style={ROW_WRAP}>
                    <DropdownOption
                      size="small"
                      type="basic"
                      label="Option label"
                      sublabel="Secondary"
                      selected={selected}
                      disabled={disabled}
                      showToggle={false}
                      className={className}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Large */}
          <div>
            <div style={LABEL_STYLE}>Large — 56px</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              {STATES.map(({ label, selected, disabled, className }) => (
                <div key={label}>
                  <div style={SUB_LABEL_STYLE}>{label}</div>
                  <div style={ROW_WRAP}>
                    <DropdownOption
                      size="large"
                      type="basic"
                      label="Option label"
                      sublabel="Secondary"
                      description="Supporting description"
                      selected={selected}
                      disabled={disabled}
                      showToggle={false}
                      className={className}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </>
    );
  },
};

// ── 2. Country ────────────────────────────────────────────────────────────────

export const Country = {
  name: "Country",
  parameters: {
    docs: {
      description: {
        story: `
Country flag in the left slot.

**Left slot:** Flag 20×20 (Small, bare) · Flag 20×20 inside Country 40×40 FRAME with \`icon-border/default\` + \`radius/full\` (Large).

Figma: Singapore flag (node 2:3050), component key \`e6ec72555e590fb6d707a83aa724a99492761321\`.
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

      <div>
        <div style={LABEL_STYLE}>Small — 40px</div>
        <div style={ROW_WRAP}>
          <DropdownOption
            size="small"
            type="country"
            label="Singapore"
            sublabel="+65"
            leftIcon={<SingaporeFlag width={20} height={20} />}
            showToggle={false}
          />
          <DropdownOption
            size="small"
            type="country"
            label="Singapore"
            sublabel="+65"
            leftIcon={<SingaporeFlag width={20} height={20} />}
            selected
            showToggle={false}
          />
          <DropdownOption
            size="small"
            type="country"
            label="Singapore"
            sublabel="+65"
            leftIcon={<SingaporeFlag width={20} height={20} />}
            disabled
            showToggle={false}
          />
        </div>
      </div>

      <div>
        <div style={LABEL_STYLE}>Large — 56px</div>
        <div style={ROW_WRAP}>
          <DropdownOption
            size="large"
            type="country"
            label="Singapore"
            sublabel="+65"
            description="Southeast Asia"
            leftIcon={<SingaporeFlag width={20} height={20} />}
            showToggle={false}
          />
          <DropdownOption
            size="large"
            type="country"
            label="Singapore"
            sublabel="+65"
            description="Southeast Asia"
            leftIcon={<SingaporeFlag width={20} height={20} />}
            selected
            showToggle={false}
          />
        </div>
      </div>

    </div>
  ),
};

// ── 3. Avatar ─────────────────────────────────────────────────────────────────

export const AvatarType = {
  name: "Avatar",
  parameters: {
    docs: {
      description: {
        story: `
Avatar in the left slot. No \`leftIcon\` prop — DropdownOption renders Avatar internally for \`type="avatar"\`.

**Left slot:** Avatar 20px (Small, bare) · Avatar 40px (Large, bare). No FRAME wrapper on either size (DS design intent).
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

      <div>
        <div style={LABEL_STYLE}>Small — 40px</div>
        <div style={ROW_WRAP}>
          <DropdownOption
            size="small"
            type="avatar"
            label="James Brown"
            sublabel="james@company.com"
            showToggle={false}
          />
          <DropdownOption
            size="small"
            type="avatar"
            label="James Brown"
            sublabel="james@company.com"
            selected
            showToggle={false}
          />
        </div>
      </div>

      <div>
        <div style={LABEL_STYLE}>Large — 56px</div>
        <div style={ROW_WRAP}>
          <DropdownOption
            size="large"
            type="avatar"
            label="James Brown"
            sublabel="james@company.com"
            description="Admin"
            showToggle={false}
          />
          <DropdownOption
            size="large"
            type="avatar"
            label="James Brown"
            sublabel="james@company.com"
            description="Admin"
            selected
            showToggle={false}
          />
        </div>
      </div>

    </div>
  ),
};

// ── 4. Provider ───────────────────────────────────────────────────────────────

export const Provider = {
  name: "Provider",
  parameters: {
    docs: {
      description: {
        story: `
Provider/API service logo in the left slot. Figma: Mastercard 32×24 (landscape aspect ratio, not square).

**Left slot:** Logo 32×24 landscape (Small, bare) · Logo 32×24 inside Provider 40×40 FRAME with \`icon-border/default\` + \`radius/full\` (Large).

Asset: SynergyLogo (placeholder — Figma uses Mastercard 32×24).
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

      <div>
        <div style={LABEL_STYLE}>Small — 40px</div>
        <div style={ROW_WRAP}>
          <DropdownOption
            size="small"
            type="provider"
            label="Synergy API"
            sublabel="synergy.io"
            leftIcon={<SynergyLogo width={32} height={24} />}
            showToggle={false}
          />
          <DropdownOption
            size="small"
            type="provider"
            label="Synergy API"
            sublabel="synergy.io"
            leftIcon={<SynergyLogo width={32} height={24} />}
            selected
            showToggle={false}
          />
        </div>
      </div>

      <div>
        <div style={LABEL_STYLE}>Large — 56px</div>
        <div style={ROW_WRAP}>
          <DropdownOption
            size="large"
            type="provider"
            label="Synergy API"
            sublabel="synergy.io"
            description="API services"
            leftIcon={<SynergyLogo width={32} height={24} />}
            showToggle={false}
          />
          <DropdownOption
            size="large"
            type="provider"
            label="Synergy API"
            sublabel="synergy.io"
            description="API services"
            leftIcon={<SynergyLogo width={32} height={24} />}
            selected
            showToggle={false}
          />
        </div>
      </div>

    </div>
  ),
};

// ── 5. Brand ──────────────────────────────────────────────────────────────────

export const Brand = {
  name: "Brand",
  parameters: {
    docs: {
      description: {
        story: `
Exchange / brand mark in the left slot. Figma: Notion — 24×24 (Small) · 32×32 (Large).

**Left slot:** Logo 24×24 (Small, bare) · Logo 32×32 inside Brand 40×40 FRAME with \`icon-border/default\` + \`radius/full\` (Large).

Asset: ShazamLogo (placeholder — Figma uses Notion).
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

      <div>
        <div style={LABEL_STYLE}>Small — 40px</div>
        <div style={ROW_WRAP}>
          <DropdownOption
            size="small"
            type="brand"
            label="Shazam"
            sublabel="Music recognition"
            leftIcon={<ShazamLogo width={24} height={24} />}
            showToggle={false}
          />
          <DropdownOption
            size="small"
            type="brand"
            label="Shazam"
            sublabel="Music recognition"
            leftIcon={<ShazamLogo width={24} height={24} />}
            selected
            showToggle={false}
          />
        </div>
      </div>

      <div>
        <div style={LABEL_STYLE}>Large — 56px</div>
        <div style={ROW_WRAP}>
          <DropdownOption
            size="large"
            type="brand"
            label="Shazam"
            sublabel="Music recognition"
            description="iOS · Android · macOS"
            leftIcon={<ShazamLogo width={32} height={32} />}
            showToggle={false}
          />
          <DropdownOption
            size="large"
            type="brand"
            label="Shazam"
            sublabel="Music recognition"
            description="iOS · Android · macOS"
            leftIcon={<ShazamLogo width={32} height={32} />}
            selected
            showToggle={false}
          />
        </div>
      </div>

    </div>
  ),
};

// ── 6. Company ────────────────────────────────────────────────────────────────

export const Company = {
  name: "Company",
  parameters: {
    docs: {
      description: {
        story: `
Company / coin logo in the left slot. Figma: Synergy — 20×20 (Small) · 24×24 (Large).

**Left slot:** Logo 20×20 (Small, bare) · Logo 24×24 inside Company 40×40 FRAME with \`icon-border/default\` + \`radius/full\` (Large).

Asset: SynergyLogo (matches Figma component set sample).
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

      <div>
        <div style={LABEL_STYLE}>Small — 40px</div>
        <div style={ROW_WRAP}>
          <DropdownOption
            size="small"
            type="company"
            label="ACME Corp"
            sublabel="acme.com"
            leftIcon={<SynergyLogo width={20} height={20} />}
            showToggle={false}
          />
          <DropdownOption
            size="small"
            type="company"
            label="ACME Corp"
            sublabel="acme.com"
            leftIcon={<SynergyLogo width={20} height={20} />}
            selected
            showToggle={false}
          />
        </div>
      </div>

      <div>
        <div style={LABEL_STYLE}>Large — 56px</div>
        <div style={ROW_WRAP}>
          <DropdownOption
            size="large"
            type="company"
            label="ACME Corp"
            sublabel="acme.com"
            description="Global enterprise"
            leftIcon={<SynergyLogo width={24} height={24} />}
            showToggle={false}
          />
          <DropdownOption
            size="large"
            type="company"
            label="ACME Corp"
            sublabel="acme.com"
            description="Global enterprise"
            leftIcon={<SynergyLogo width={24} height={24} />}
            selected
            showToggle={false}
          />
        </div>
      </div>

    </div>
  ),
};
