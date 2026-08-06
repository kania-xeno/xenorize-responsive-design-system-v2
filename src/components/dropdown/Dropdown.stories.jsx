import React from "react";
import DropdownList from "./DropdownList.jsx";
import DropdownOption from "./DropdownOption.jsx";
import ShazamLogo from "../../assets/logos/Shazam.jsx";
import SingaporeFlag from "../../assets/flags/Singapore.jsx";
import SynergyLogo from "../../assets/logos/Synergy.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// Dropdown — top-level overview
// Figma source: Design System Scalable V.2.1.0 → ❖ Dropdown
// Sub-sections: Dropdown Items · Dropdown List
// ─────────────────────────────────────────────────────────────────────────────

const LABEL_STYLE = {
  fontFamily: "var(--font-family-body)",
  fontSize: 11,
  fontWeight: 600,
  color: "var(--color-text-muted)",   /* --prim-neutral-500 (#7b7b7b) — replaces hardcoded #888 */
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: 4,
};

const SUB_LABEL_STYLE = {
  fontFamily: "var(--font-family-body)",
  fontSize: 11,
  color: "var(--color-text-subtle)", /* --prim-neutral-400 (#a3a3a3) — replaces hardcoded #aaa */
  marginBottom: 8,
};

/**
 * Returns a leftIcon ReactNode for the given type and size.
 * Returns undefined for "basic" (Globe renders by default) and "avatar" (internal).
 *
 * Figma-confirmed sizes (re-inspection 2026-08-06):
 *   basic    → undefined — Globe.jsx is default in DropdownOption
 *   country  → SingaporeFlag 20×20 (both sizes — bare small, inside Country frame large)
 *   provider → SynergyLogo 32×24 landscape (Figma: Mastercard 32×24; using Synergy as placeholder)
 *   brand    → ShazamLogo 24×24 (small) · 32×32 (large — inside Brand frame)
 *   company  → SynergyLogo 20×20 (small) · 24×24 (large — Figma: Synergy both sizes)
 *   avatar   → undefined — Avatar rendered internally by DropdownOption
 */
const getIcon = (type, small = true) => {
  switch (type) {
    case "country":
      return <SingaporeFlag width={20} height={20} />;
    case "provider":
      return <SynergyLogo width={32} height={24} />;
    case "brand":
      return <ShazamLogo width={small ? 24 : 32} height={small ? 24 : 32} />;
    case "company":
      return <SynergyLogo width={small ? 20 : 24} height={small ? 20 : 24} />;
    case "basic":
    case "avatar":
    default:
      return undefined;
  }
};

const ALL_TYPES = [
  { type: "basic",    label: "Basic",    sublabel: "Icon + label" },
  { type: "country",  label: "Country",  sublabel: "Singapore" },
  { type: "avatar",   label: "Avatar",   sublabel: "James Brown" },
  { type: "provider", label: "Provider", sublabel: "provider.io" },
  { type: "brand",    label: "Brand",    sublabel: "BrandName" },
  { type: "company",  label: "Company",  sublabel: "ACME Corp" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: "Components/Dropdown",
  component: DropdownOption,
  parameters: {
    docs: {
      description: {
        component: `
**Dropdown** — two-component system.

**DropdownOption** (\`↳dropdown-items\`) — individual option row. 6 types × 5 states × 2 sizes.

**DropdownList** (\`dropdown-list\`) — scrollable panel container. 2 height variants.

See sub-sections for per-type and per-container stories.

Figma source: [Design System Scalable V.2.1.0 → ❖ Dropdown](https://www.figma.com/design/0aVnOgjVWH1YL8JCnjXTBi)
        `,
      },
    },
    controls: { disable: true },
  },
};

// ── Overview ──────────────────────────────────────────────────────────────────

export const Overview = {
  name: "Overview",
  parameters: {
    docs: {
      description: {
        story: `
All 6 item types (Small + Large) and both DropdownList height variants at a glance.

**Item types:** basic · country · avatar · provider · brand · company

**List heights:** fixed (max 252px) · huge (max 104px)
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>

      {/* ── Item Types ─────────────────────────────────────────────────────── */}
      <div>
        <div style={LABEL_STYLE}>Item Types</div>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

          {/* Small */}
          <div>
            <div style={SUB_LABEL_STYLE}>Small — 40px</div>
            <div style={{ width: 340 }}>
              {ALL_TYPES.map(({ type, label, sublabel }) => (
                <DropdownOption
                  key={type}
                  size="small"
                  type={type}
                  label={label}
                  sublabel={sublabel}
                  leftIcon={getIcon(type, true)}
                  showToggle={false}
                  showRightIcon={false}
                />
              ))}
            </div>
          </div>

          {/* Large */}
          <div>
            <div style={SUB_LABEL_STYLE}>Large — 56px</div>
            <div style={{ width: 340 }}>
              {ALL_TYPES.map(({ type, label, sublabel }) => (
                <DropdownOption
                  key={type}
                  size="large"
                  type={type}
                  label={label}
                  sublabel={sublabel}
                  leftIcon={getIcon(type, false)}
                  showToggle={false}
                  showRightIcon={false}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── List Container ─────────────────────────────────────────────────── */}
      <div>
        <div style={LABEL_STYLE}>List Container</div>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

          {/* Fixed */}
          <div>
            <div style={SUB_LABEL_STYLE}>Fixed — max 252px</div>
            <DropdownList height="fixed" aria-label="Overview — fixed height">
              {["Dashboard", "Analytics", "Settings", "Profile", "Billing", "Sign out", "Help"].map((label, i) => (
                <DropdownOption
                  key={label}
                  size="small"
                  type="basic"
                  label={label}

                  selected={i === 2}
                  showToggle={false}
                  showRightIcon={false}
                />
              ))}
            </DropdownList>
          </div>

          {/* Huge */}
          <div>
            <div style={SUB_LABEL_STYLE}>Huge — max 104px</div>
            <DropdownList height="huge" aria-label="Overview — huge height">
              {["Option one", "Option two", "Option three", "Option four"].map((label, i) => (
                <DropdownOption
                  key={label}
                  size="small"
                  type="basic"
                  label={label}

                  selected={i === 1}
                  showToggle={false}
                  showRightIcon={false}
                />
              ))}
            </DropdownList>
          </div>

        </div>
      </div>

    </div>
  ),
};
