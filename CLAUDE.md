# Project Context: h0r0m4n.github.io

This file provides context for LLMs (like Gemini, Claude, or ChatGPT) assisting with the development and maintenance of this repository.

## Overview
- **Project**: Personal Portfolio Website for Roman Horokhovatskyy (Staff Product Designer at Analog Devices Inc.)
- **Stack**: Eleventy (11ty) v3+, Node.js (>=18.0.0), Nunjucks, Markdown, and Sass.
- **Goal**: A modern, highly optimized, and visually premium static portfolio site highlighting strategic contributions, AI automation initiatives, and advanced workflows using Figma and AI coding tools.

## Author's Expertise & Tone
When generating code, copy, or making architectural decisions, remember that the author is a Staff Product Designer with advanced expertise in:
- **Design & Methods**: Design Strategy, UX/UI, Design Systems, Data Visualization, Systems Thinking, and Agile workflows.
- **Development**: Highly proficient in semantic HTML, Nunjucks, CSS/Sass architectures, JavaScript, React, and WCAG accessibility standards.
- **Copywriting & Content**: Expert in technical writing, crafting compelling case studies, and professional copywriting that highlights strategic impact and user-centered design.
- **AI Tooling**: Deep experience with LLMs and AI coding tools.
*All generated code should reflect senior-level best practices, and copy should be professional and concise.*

## Technology Stack & Dependencies
- **Static Site Generator**: `@11ty/eleventy` (^3.1.5)
- **Templating**: Nunjucks (`.njk`) for layouts and components; Markdown (`.md`) for content (case studies).
- **Styling**: Sass (`sass` ^1.83.0), utilizing the modern `@use` module system. Compiled via Dart Sass.
- **Image Optimization**: `@11ty/eleventy-img` for automatically generating responsive images (AVIF, WebP, JPEG) at multiple widths.
- **Build Tools**: `npm-run-all2` for parallel and sequential task execution.

## Directory Structure
- `src/` - The main source directory for the Eleventy build.
  - `_data/` - Global data files (e.g., `site.js`, `skills.json`, `testimonials.json`).
  - `_includes/` - Contains layouts (`layouts/`), reusable partials/components (`components/`), and inline assets like SVGs (`assets/`).
  - `js/` - Client-side JavaScript.
  - `sass/` - Sass source files. Global styles in root, component-specific styles in `components/`.
  - `static/` - Static assets copied directly to `dist/` (fonts, raw assets, small videos).
  - `work/` - Markdown files for case studies, grouped into subdirectories by year (e.g., `2018`, `2021`). These form the `work` collection.
- `dist/` - The compiled output directory (generated after build, git-ignored).
- `.eleventy.js` - The core configuration file defining collections, shortcodes, filters, and passthrough file copying.

## Custom Shortcodes (Nunjucks/Markdown)
The `.eleventy.js` config provides several custom shortcodes heavily used throughout the site:
- **Media**: `{% video %}`, `{% image %}`, `{% image-big %}`, `{% carousel %}`, `{% thumbnail %}`, `{% lightbox %}`, `{% book %}`, `{% testimonial %}`.
  *(Note: Many of these are async shortcodes leveraging `eleventy-img` to dynamically generate responsive `<picture>` markup).*
- **Utility**: `{% stats %}` (for rendering project metadata blocks), `{% year %}` (current year), `{% experienceYears %}` (calculates years of experience from a start date).

## Key Collections & Filters
- **Collections**: `work` (aggregates all case studies in `src/work/**/*.md` and reverses them chronologically).
- **Filters**: `head` (limits array size), `permalinkNotFalse` (filters out drafts/hidden pages), `base64`, `year`.
