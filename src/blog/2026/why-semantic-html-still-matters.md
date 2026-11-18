---
title: Why Semantic HTML Still Beats Custom Div Soup
description: Modern browsers ship native dialogs, popovers, and disclosures that eliminate hundreds of lines of fragile JavaScript while improving accessibility for free.
category: Frontend
date: 2026-10-14
---

Every few years the frontend ecosystem rediscovers a simple truth: the platform already solves a surprising amount of UI complexity if you let it. Native elements like `<details>`, `<dialog>`, `<time>`, and semantic landmarks do far more than look tidy in DevTools.

## Built-in behavior you don't have to maintain

Consider an accordion or a hardware setup list. Reaching for a JavaScript state library or custom ARIA toggles introduces edge cases around keyboard focus, screen reader announcements, and hydration timing. With native `<details>` and `<summary>`, all of that works before a single byte of script executes.

```html
<details name="setup">
  <summary>Workstation</summary>
  <p>Zero-JavaScript disclosure with native keyboard and screen reader support.</p>
</details>
```

### Three habits that pay off immediately

1. **Use `<button>` for actions and `<a>` for navigation**: never attach click handlers to `<div>` or `<span>` elements.
2. **Respect heading hierarchy**: let visual styling come from classes (like `.h4` or `.h6`) rather than skipping from `<h1>` straight to `<h4>`.
3. **Prefer CSS over JS for state styling**: modern selectors like `:has()`, `:focus-visible`, and `details[open]` replace a huge chunk of class-toggling boilerplate.

Good semantics are not just an accessibility checklist item—they are the cheapest way to make a codebase resilient five years from now.
