---
title: Writing HTML and CSS faster with Jade and Sass
description: Why I prefer indented Sass (.sass) over SCSS and pair it with Jade templates, variables and mixins to speed up rapid prototyping and front-end development.
category: Development
date: 2013-12-28
---

A few weeks ago [I wrote about rapid prototyping in HTML](/blog/rapid-prototyping-in-html-and-why-static-mockups-fall-short/) and why building directly in the browser beats pushing static mockups around. Once you actually work that way every day though, you hit a second bottleneck pretty quickly: plain HTML and CSS are verbose and repetitive.

Even with [Sublime Text 2](/blog/switching-from-coda-to-sublime-text-2/) and [Emmet](https://emmet.io/) speeding up my typing, maintaining a ten-page HTML prototype by hand gets messy fast. If you want to change one link in the navigation bar, you have to edit ten files. If you want to test a list of six cards with slightly different titles, you copy and paste the same `<div>` structure six times. And in plain CSS you keep repeating the same hex colors, font stacks and vendor prefixes over and over.

Over the last year I fell in love with a combination that solves all of this cleanly: [Jade](http://jade-lang.com/) for HTML and indented [Sass](https://sass-lang.com/) (the original `.sass` syntax, not `.scss`) for CSS.

## Why Jade beats writing raw HTML

Jade is a template engine created by [TJ Holowaychuk](https://github.com/visionmedia) for [Node.js](https://nodejs.org/). Instead of angle brackets and closing tags everywhere, Jade uses clean indentation to define structure, and it lets you use real variables, loops, conditionals, mixins and template inheritance.

Here is a simple example of a card grid written in regular HTML:

```html
<section class="projects">
  <h2>Selected work</h2>
  <div class="project-card">
    <h3>Portfolio redesign</h3>
    <p>Responsive layout and pattern library.</p>
    <a href="/work/portfolio.html" class="btn">View project</a>
  </div>
  <div class="project-card">
    <h3>Mobile booking flow</h3>
    <p>HTML prototype tested with twelve users.</p>
    <a href="/work/booking.html" class="btn">View project</a>
  </div>
  <div class="project-card">
    <h3>Checkout refresh</h3>
    <p>Simplified form fields and error states.</p>
    <a href="/work/checkout.html" class="btn">View project</a>
  </div>
</section>
```

Now look at the exact same output written in Jade using a data array, a loop and a reusable mixin:

```jade
- var projects = [
-   { title: 'Portfolio redesign', desc: 'Responsive layout and pattern library.', url: '/work/portfolio.html' },
-   { title: 'Mobile booking flow', desc: 'HTML prototype tested with twelve users.', url: '/work/booking.html' },
-   { title: 'Checkout refresh', desc: 'Simplified form fields and error states.', url: '/work/checkout.html' }
- ]

mixin projectCard(item)
  .project-card
    h3= item.title
    p= item.desc
    a.btn(href=item.url) View project

section.projects
  h2 Selected work
  each project in projects
    +projectCard(project)
```

For rapid prototyping this is a game changer. If I want to change `.project-card` from a `<div>` to an `<article>` or add a category badge to every card, I change it in one mixin and every card updates immediately.

Even better is template inheritance with `extends`, `block` and `include`. I can define a single `_layout.jade` file with my `<head>`, header and footer, and every prototype page only writes its own content block:

```jade
extends _layout

block content
  include _hero
  section.projects
    h2 Selected work
    each project in projects
      +projectCard(project)
```

No more copy-pasting headers across fifteen static `.html` files, and no more forgetting to close a `</div>` and breaking the layout.

## Why I choose indented Sass (`.sass`) instead of SCSS

On the CSS side, most developers I talk to use SCSS because it looks just like standard CSS with curly braces and semicolons. I understand why it is easier for people to adopt, and you can paste plain CSS straight into it.

Personally though, I strongly prefer the original indented `.sass` syntax. Once you drop `{`, `}` and `;`, your stylesheets become way cleaner to scan and faster to type, and your brain stays in the exact same indentation mindset as Jade.

Compare a small button and card block in plain CSS:

```css
.project-card {
  background: #ffffff;
  border: 1px solid #e2e2e2;
  padding: 20px;
  margin-bottom: 24px;
}

.project-card h3 {
  color: #222222;
  margin-top: 0;
}

.project-card .btn {
  display: inline-block;
  padding: 10px 16px;
  background: #0066cc;
  color: #ffffff;
  text-decoration: none;
}

.project-card .btn:hover {
  background: #004f9e;
}
```

And here is the same styling in indented `.sass`, using variables, nesting, color functions and a mixin:

```sass
$brand: #0066cc
$text: #222222
$border: #e2e2e2
$space: 20px

@mixin button($bg)
  display: inline-block
  padding: 10px 16px
  background: $bg
  color: #ffffff
  text-decoration: none
  &:hover
    background: darken($bg, 10%)

.project-card
  background: #ffffff
  border: 1px solid $border
  padding: $space
  margin-bottom: $space + 4px

  h3
    color: $text
    margin-top: 0

  .btn
    @include button($brand)
```

There is zero visual noise. You immediately see the hierarchy from the indentation alone, and if a client wants to test a different accent color across the whole prototype, changing `$brand` in one line updates every button, hover state and link across the entire site.

## How it fits into my daily workflow

You do not even need a complicated terminal setup to use Jade and Sass together today. On Mac, [CodeKit](https://incident57.com/codekit/) watches your project folder, compiles `.jade` and `.sass` files automatically on save, handles partials and reloads the browser for you. If you work cross-platform or prefer the command line, [Prepros](https://prepros.io/) and [Grunt](https://gruntjs.com/) do the same job nicely.

Between Jade templates with logic and variables on one side, and indented Sass with mixins and partials on the other, building and iterating on HTML prototypes is faster than ever. Once you get used to writing clean, indentation-based markup and styles without braces or closing tags, going back to raw HTML and plain CSS feels painfully slow.
