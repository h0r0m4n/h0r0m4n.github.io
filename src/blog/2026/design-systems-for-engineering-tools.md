---
title: Designing Dense Design Systems for Hardware Engineering Tools
description: Enterprise engineering tools don't play by the same rules as consumer apps. Here is how information density, keyboard navigation, and predictable component APIs shape our design system decisions.
category: Design Systems
date: 2026-11-10
---

Most design system advice on the internet assumes you are building a marketing site or a consumer SaaS dashboard with plenty of breathing room. Hardware engineering tools live in a very different world. Engineers spend eight hours a day inside oscilloscopes, schematic editors, register maps, and telemetry tables—and every wasted pixel or extra click compounds across thousands of micro-interactions.

## Density is not clutter

A common mistake when modernizing legacy engineering software is inflating whitespace until the interface "looks modern," only to hide half the parameters the user needs to compare side by side. Good density is about **signal-to-noise ratio**, not cramming elements together.

{% stats "Target grid unit" "4px" "Compact row height" "28px" "Keyboard shortcuts" "40+" "" "" %}

When we audit a complex workflow, we look at three things first:

1. **Alignment and tabular rhythm**: numerical values should use `font-variant-numeric: tabular-nums` so columns remain scannable during live updates.
2. **Progressive disclosure**: secondary configuration belongs in collapsible panels or drawers, never competing with primary telemetry.
3. **Predictable state feedback**: hover, focus, active, disabled, and dirty states must be unmistakably distinct in both light and dark themes.

### Token architecture that scales

Instead of inventing ad-hoc spacing or color overrides per tool, we separate semantic tokens from primitive scales. That way a compact density mode can adjust padding and line height globally without rewriting a single component template.

```css
:root[data-density="compact"] {
  --space-control-y: 0.25rem;
  --space-control-x: 0.5rem;
  --row-min-height: 1.75rem;
}
```

> Clarity in a dense interface comes from consistent hierarchy and restraint, not from hiding complexity behind extra layers of navigation.

## Designing with engineers, not just for them

The fastest way to break a design system is to treat Figma as the sole source of truth. When component properties mirror real props, tokens map directly to CSS custom properties, and accessibility semantics are baked into primitives from day one, designers and engineers stop translating and start collaborating on the actual product problem.
