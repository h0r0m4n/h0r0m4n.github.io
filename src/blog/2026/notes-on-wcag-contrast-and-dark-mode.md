---
title: Practical Notes on WCAG Contrast, Dark Mode, and Text Wrapping
description: Small CSS details—from prefers-color-scheme tokens to balanced headlines—that quietly elevate reading comfort across every device.
category: Accessibility
date: 2026-08-25
---

Good reading experiences rarely call attention to themselves. They are usually the result of dozens of quiet typographic and contrast decisions working together so the reader never has to squint or fight the layout.

## Dark mode is not just inverting colors

Pure white text on pure black backgrounds can create uncomfortable halation for many readers, while subtle borders that looked crisp in light mode often vanish on dark surfaces. Defining neutral elevation steps with translucent alpha layers keeps cards, code blocks, and dividers legible across both themes.

```css
h1, h2, h3 {
  text-wrap: balance;
}

p, blockquote {
  text-wrap: pretty;
}
```

### Checklist for every long-form page

- Keep body copy line lengths comfortable (roughly 60–75 characters per line).
- Use unitless `line-height` and `rem`/`em` typography so browser zoom up to 200% never clips text.
- Never lock text containers to a fixed `height`—let content dictate block size.
- Verify focus rings (`:focus-visible`) on both light and dark color schemes.

When these fundamentals are handled at the layout level, every new article inherits solid ergonomics automatically.
