import React from "react";
import DropdownList from "./DropdownList.jsx";
import DropdownOption from "./DropdownOption.jsx";
import SingaporeFlag from "../../assets/flags/Singapore.jsx";
import SynergyLogo from "../../assets/logos/Synergy.jsx";
import ShazamLogo from "../../assets/logos/Shazam.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// Dropdown List — container height stories
// Figma source: Design System Scalable V.2.1.0 → ❖ Dropdown → dropdown-list
// Two height variants:
//   fixed  — max-height 252px, includes Search input, options scroll
//   hug    — no max-height, panel wraps content, no Search input
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

// Helper — returns leftIcon for a given type (undefined = Globe default for basic)
const getIcon = (type) => {
  switch (type) {
    case "country":  return <SingaporeFlag width={20} height={20} />;
    case "provider": return <SynergyLogo width={32} height={24} />;
    case "brand":    return <ShazamLogo width={24} height={24} />;
    case "company":  return <SynergyLogo width={20} height={20} />;
    default:         return undefined; // basic → Globe default
  }
};

// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: "Components/Dropdown/Dropdown List",
  component: DropdownList,
  parameters: {
    docs: {
      description: {
        component: `
**DropdownList** (\`dropdown-list\`) — scrollable panel container for option rows.

| Token | Alias | CSS var |
|---|---|---|
| \`dropdown-list/bg/default\` | \`background/base\` | \`--color-bg-base\` |
| \`dropdown-list/shadow/default\` | \`regular-shadow/medium\` | \`--shadow-regular-medium\` |

Width: 340px fixed. Panel border removed (user QA 2026-08-06). Corner radius: 16px (\`--radius-16\`).

**Height variants:** \`fixed\` (252px max — with Search) · \`hug\` (wraps content — no Search)

Figma: \`dropdown-list\` node on page \`❖ Dropdown\`
        `,
      },
    },
    controls: { disable: true },
  },
  argTypes: {
    height: {
      control: { type: "radio" },
      options: ["fixed", "hug"],
      description: "Panel height: `fixed` (252px max, with Search) · `hug` (wraps content, no Search).",
      table: { defaultValue: { summary: "fixed" } },
    },
    showSearch: {
      control: "boolean",
      description: "Override the default search visibility. Fixed shows search by default; hug hides it.",
    },
  },
  args: {
    height: "fixed",
  },
};

// ── 0. Playground ──────────────────────────────────────────────────────────────
// Use the Controls panel to switch height and toggle nested components on each row.

export const Playground = {
  name: "Playground",
  parameters: {
    controls: { disable: false },
    docs: {
      description: {
        story:
          "Switch `height` between **fixed** (252px, with Search) and **hug** (no max-height, no Search) via the Controls panel. " +
          "Row props below come from the story args — edit them in Controls to toggle toggle, badge, checkbox, chevron per row.",
      },
    },
  },
  argTypes: {
    // Per-row controls exposed in the Playground
    showToggle:   { control: "boolean", description: "Show Switch toggle on each row." },
    showCheckbox: { control: "boolean", description: "Show Checkbox on each row." },
    showBadge:    { control: "boolean", description: "Show Badge on each row." },
    showButton:   { control: "boolean", description: "Show link Button on each row." },
    showRightIcon:{ control: "boolean", description: "Show right chevron on each row." },
    size:         {
      control: { type: "radio" },
      options: ["small", "large"],
      description: "Row size: small (40px) · large (56px).",
    },
    type: {
      control: { type: "select" },
      options: ["basic", "country", "avatar", "provider", "brand", "company"],
      description: "Left-slot asset type.",
    },
  },
  args: {
    height: "fixed",
    showToggle: false,
    showCheckbox: false,
    showBadge: false,
    showButton: false,
    showRightIcon: false,
    size: "small",
    type: "basic",
  },
  render: (args) => {
    const rows = [
      { label: "Dashboard",    sublabel: "",                description: "Overview" },
      { label: "Analytics",    sublabel: "View reports",    description: "Charts and data" },
      { label: "Settings",     sublabel: "",                description: "Configure" },
      { label: "Profile",      sublabel: "Edit account",    description: "Your info" },
      { label: "Billing",      sublabel: "",                description: "Plans" },
      { label: "Sign out",     sublabel: "",                description: "" },
    ];

    return (
      <div>
        <div style={LABEL_STYLE}>Dropdown List</div>
        <div style={SUB_LABEL_STYLE}>height="{args.height}"</div>
        <DropdownList
          height={args.height}
          showSearch={args.showSearch}
          aria-label="Playground example"
        >
          {rows.map(({ label, sublabel, description }, i) => (
            <DropdownOption
              key={label}
              size={args.size}
              type={args.type}
              label={label}
              sublabel={sublabel || undefined}
              description={args.size === "large" ? description || undefined : undefined}
              leftIcon={args.type !== "avatar" ? getIcon(args.type) : undefined}
              selected={i === 2}
              showToggle={args.showToggle}
              showCheckbox={args.showCheckbox}
              showBadge={args.showBadge}
              showButton={args.showButton}
              showRightIcon={args.showRightIcon}
            />
          ))}
        </DropdownList>
      </div>
    );
  },
};

// ── 1. Fixed — with Nested Components ─────────────────────────────────────────

export const FixedWithNested = {
  name: "Fixed — Nested Components",
  parameters: {
    docs: {
      description: {
        story: `
\`height="fixed"\` — max-height 252px (~6 small rows visible), Search input at top.

Each row demonstrates a different nested component: Toggle, Badge, Checkbox, right chevron. All components are independently controlled — they can appear simultaneously (no mutual exclusion).
        `,
      },
    },
  },
  render: () => {
    const rows = [
      { label: "Notifications",  sublabel: "",             showToggle: true,  toggleValue: true,  showRightIcon: false, showBadge: false, showCheckbox: false },
      { label: "Dark mode",      sublabel: "System pref",  showToggle: true,  toggleValue: false, showRightIcon: false, showBadge: false, showCheckbox: false },
      { label: "Security",       sublabel: "",             showToggle: false, toggleValue: false, showRightIcon: true,  showBadge: true,  badgeLabel: "New", showCheckbox: false },
      { label: "Billing",        sublabel: "",             showToggle: false, toggleValue: false, showRightIcon: true,  showBadge: false, showCheckbox: false },
      { label: "Team members",   sublabel: "3 active",     showToggle: false, toggleValue: false, showRightIcon: true,  showBadge: false, showCheckbox: false },
      { label: "Integrations",   sublabel: "",             showToggle: false, toggleValue: false, showRightIcon: true,  showBadge: true,  badgeLabel: "5", showCheckbox: false },
      { label: "Sign out",       sublabel: "",             showToggle: false, toggleValue: false, showRightIcon: false, showBadge: false, showCheckbox: false },
    ];

    return (
      <div>
        <div style={LABEL_STYLE}>Fixed — max 252px</div>
        <div style={SUB_LABEL_STYLE}>7 rows · toggle · badge · chevron · scrolls after 6</div>
        <DropdownList height="fixed" aria-label="Fixed with nested components">
          {rows.map(({ label, sublabel, badgeLabel, ...rowProps }, i) => (
            <DropdownOption
              key={label}
              size="small"
              type="basic"
              label={label}
              sublabel={sublabel || undefined}
              badgeLabel={badgeLabel}
              selected={false}
              {...rowProps}
            />
          ))}
        </DropdownList>
      </div>
    );
  },
};

// ── 2. Fixed — Checkbox Multi-select ─────────────────────────────────────────

export const FixedMultiSelect = {
  name: "Fixed — Multi-select",
  parameters: {
    docs: {
      description: {
        story: `
Checkbox multi-select pattern inside a fixed-height list. All rows show \`showCheckbox={true}\`. Some rows are pre-checked.
        `,
      },
    },
  },
  render: () => {
    const rows = [
      { label: "Dashboard",   sublabel: "",             checked: true  },
      { label: "Analytics",   sublabel: "View reports", checked: true  },
      { label: "Settings",    sublabel: "",             checked: false },
      { label: "Profile",     sublabel: "Edit account", checked: false },
      { label: "Billing",     sublabel: "",             checked: true  },
      { label: "Integrations",sublabel: "",             checked: false },
      { label: "Sign out",    sublabel: "",             checked: false },
    ];

    return (
      <div>
        <div style={LABEL_STYLE}>Fixed — multi-select</div>
        <div style={SUB_LABEL_STYLE}>7 rows · checkbox · 3 pre-checked</div>
        <DropdownList height="fixed" aria-label="Multi-select example">
          {rows.map(({ label, sublabel, checked }) => (
            <DropdownOption
              key={label}
              size="small"
              type="basic"
              label={label}
              sublabel={sublabel || undefined}
              showCheckbox={true}
              checked={checked}
              showToggle={false}
              showRightIcon={false}
            />
          ))}
        </DropdownList>
      </div>
    );
  },
};

// ── 3. Hug — wraps content ────────────────────────────────────────────────────

export const HugHeight = {
  name: "Hug — wraps content",
  parameters: {
    docs: {
      description: {
        story: `
\`height="hug"\` — no max-height, panel wraps its content. No Search input. Use for short, contextual menus.

Also shown: right chevron on navigable rows, Badge on count rows.
        `,
      },
    },
  },
  render: () => {
    const rows = [
      { label: "Edit",      sublabel: "", showRightIcon: false, showBadge: false },
      { label: "Duplicate", sublabel: "", showRightIcon: false, showBadge: false },
      { label: "Share",     sublabel: "", showRightIcon: true,  showBadge: false },
      { label: "Archive",   sublabel: "", showRightIcon: false, showBadge: true, badgeLabel: "3" },
      { label: "Delete",    sublabel: "", showRightIcon: false, showBadge: false },
    ];

    return (
      <div>
        <div style={LABEL_STYLE}>Hug — wraps content</div>
        <div style={SUB_LABEL_STYLE}>5 rows · no search · no scroll</div>
        <DropdownList height="hug" aria-label="Hug height example">
          {rows.map(({ label, sublabel, badgeLabel, ...rowProps }) => (
            <DropdownOption
              key={label}
              size="small"
              type="basic"
              label={label}
              sublabel={sublabel || undefined}
              badgeLabel={badgeLabel}
              showToggle={false}
              {...rowProps}
            />
          ))}
        </DropdownList>
      </div>
    );
  },
};

// ── 4. Large Items in List ────────────────────────────────────────────────────

export const LargeItems = {
  name: "Large Items",
  parameters: {
    docs: {
      description: {
        story: `
Large-size rows (56px each) inside a Fixed list. Description appears below Label + Sublabel on each row.

Shows mixed types: basic, country, avatar — each with a different nested component.
        `,
      },
    },
  },
  render: () => (
    <div>
      <div style={LABEL_STYLE}>Large Items — 56px rows</div>
      <div style={SUB_LABEL_STYLE}>Mixed types · description · nested components</div>
      <DropdownList height="fixed" aria-label="Large items example">
        <DropdownOption
          size="large"
          type="basic"
          label="Dashboard"
          sublabel="Main"
          description="Overview of all metrics"
          showToggle={false}
          showRightIcon={true}
        />
        <DropdownOption
          size="large"
          type="country"
          label="Singapore"
          sublabel="+65"
          description="Southeast Asia"
          leftIcon={<SingaporeFlag width={20} height={20} />}
          showToggle={false}
          showRightIcon={false}
        />
        <DropdownOption
          size="large"
          type="avatar"
          label="James Brown"
          sublabel="james@co.com"
          description="Admin"
          showToggle={true}
          toggleValue={true}
          showRightIcon={false}
          selected
        />
        <DropdownOption
          size="large"
          type="provider"
          label="Synergy API"
          sublabel="synergy.io"
          description="API services"
          leftIcon={<SynergyLogo width={32} height={24} />}
          showBadge={true}
          badgeLabel="New"
          showToggle={false}
          showRightIcon={false}
        />
        <DropdownOption
          size="large"
          type="brand"
          label="Shazam"
          sublabel="Music"
          description="iOS · Android · macOS"
          leftIcon={<ShazamLogo width={32} height={32} />}
          showToggle={false}
          showRightIcon={true}
        />
      </DropdownList>
    </div>
  ),
};
