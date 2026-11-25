# Workspace Instructions for Gemini (h0r0m4n.github.io)

Follow the project context in `CLAUDE.md` (Eleventy v3+, Nunjucks, Markdown, Dart Sass `@use`, WCAG accessibility, senior-level craft).

## Automatic Site Versioning (`src/_data/site.js`)

The `version` field in `src/_data/site.js` uses a `MAJOR.MINOR` string format (e.g., `'12.2'`). It powers both the CSS/JS cache-buster (`?v={{ site.version }}`) and the version displayed on `/about/`.

When making changes to the site, automatically bump `version` in `src/_data/site.js` according to the scope and impact of the work:

- **Major bump (`X+1.0`)**: Major visual redesigns, new core sections (e.g., launching a new top-level section), or large structural/routing overhauls.
- **Minor bump (`X.Y+1`)**: New features, new blog articles or case studies, meaningful layout/CSS/JS/SEO improvements, or data/content updates (skills, software, hardware, testimonials).
- **No bump**: Pure typo fixes, internal documentation/AI-config-only updates, or CI/chore maintenance with no user-facing site impact.

### Versioning Discipline
- **Bump once per logical change**: During multi-turn iterative tweaking, do not bump on every small back-and-forth adjustment—bump once when finalizing the change (or right before committing).
- **Mention the bump**: Briefly note the version change (e.g., `12.2 -> 12.3`) in your summary and/or commit message.

## Workflow Notes
- **Do not commit or push** until the user explicitly approves.
- **Avoid `npm run clean`** unless explicitly needed, as it wipes `.cache` and forces `@11ty/eleventy-img` to re-encode all portfolio images. Use `npm run build` directly for fast incremental builds.
