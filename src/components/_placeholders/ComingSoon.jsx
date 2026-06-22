import React from "react";

/**
 * ComingSoon — placeholder shown in Storybook for components/sizes/variants
 * that are planned but not yet built. Keeps the navigation tree visible for
 * planning without pretending the component exists.
 */
export default function ComingSoon({ label }) {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "var(--spacing-8)",
        padding: "var(--spacing-20)",
        border: "1px dashed var(--button-stroke-neutral-border, #ccc)",
        borderRadius: "var(--radius-8)",
        fontFamily: "var(--font-family-body)",
        color: "var(--button-stroke-neutral-text, #888)",
      }}
    >
      <strong style={{ fontSize: "var(--font-size-body-lg)" }}>Coming soon</strong>
      <span style={{ fontSize: "var(--font-size-body-md, 14px)" }}>
        {label} hasn't been built yet.
      </span>
    </div>
  );
}
