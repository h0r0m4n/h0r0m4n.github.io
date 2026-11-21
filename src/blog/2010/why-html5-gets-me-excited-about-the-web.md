---
title: Why HTML5 gets me so excited about the future of the web
description: After receiving my copy of Introducing HTML5, seeing native video, audio, canvas, semantic tags and offline storage come together makes me more excited about open web standards than ever.
category: Accessibility
date: 2010-09-01
---

My copy of "Introducing HTML5" by Bruce Lawson and Remy Sharp just arrived a few days ago, and reading through it got me genuinely excited about where the web is heading.

Back in 2007 [I wrote](/blog/why-i-dont-believe-in-flash/) that I didn't believe in Flash for building websites and that open web standards were the only thing that really made sense long term. At the time, even if you loved standards, you still had to admit that HTML and CSS had big limits when it came to multimedia or richer web apps.

Even though HTML5 is still a W3C Working Draft, a surprising amount of it already works in modern browsers today. What excites me the most is not just the shiny demos, it is how many practical benefits and accessibility improvements we get right out of the box.

## Native video, audio and canvas without Flash

For years, putting a simple video or audio player on a page meant embedding Flash and hoping the visitor had the right plugin version installed. With the new native `<video>`, `<audio>` and `<canvas>` elements, media and graphics run directly inside the browser.

```html
<video width="640" height="360" controls poster="preview.jpg">
  <source src="demo.mp4" type="video/mp4">
  <source src="demo.ogv" type="video/ogg">
  <p>Your browser does not support HTML5 video. <a href="demo.mp4">Download the video</a>.</p>
</video>
```

Even with the current codec split between MP4 (H.264), Ogg and the new WebM format (so you still provide more than one `<source>` file), the advantages are massive right away:

- No more Flash plugin crashes taking down the whole browser tab.
- Closing huge security holes that came from relying on an external binary plugin that needed constant patches.
- Much lower CPU usage and drastically better battery life on smartphones and mobile devices, where running heavy plugins was a real disaster.
- Native browser controls that work with keyboard navigation out of the box, instead of custom Flash buttons nobody can tab into.

And with `<audio>` and `<canvas>`, podcasts, sound players, charts and interactive drawings can all live cleanly inside standard web pages too.

## Semantic structure for search engines and accessibility

For a long time, even standards-based pages were basically a soup of `<div id="header">`, `<div id="nav">`, `<div id="content">` and `<div id="footer">`. To a human reading the code those IDs made sense, but to a browser, a search engine or a screen reader they were all just generic boxes.

HTML5 gives us a much cleaner `<!DOCTYPE html>` and real semantic elements that describe what each part of the page actually is:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My Article</title>
  </head>
  <body>
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/blog/">Blog</a></li>
        </ul>
      </nav>
    </header>

    <article>
      <header>
        <h1>Why semantics matter</h1>
        <time datetime="2010-08-22">August 22, 2010</time>
      </header>
      <section>
        <p>Clear structure helps both people and machines read the page.</p>
      </section>
    </article>

    <aside>
      <h2>Related links</h2>
    </aside>

    <footer>
      <p>Copyright 2010</p>
    </footer>
  </body>
</html>
```

Using tags like `<header>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>` and `<time>` gives screen readers real landmarks to jump around the page, and helps search engines understand what is main content versus navigation or sidebar links.

I also love the new form input types like `type="email"`, `type="url"`, `type="tel"` and the `required` attribute. On an iPhone, an email field automatically opens the keyboard with the `@` key, and basic validation starts working natively without loading another JavaScript library. And if an older browser like IE7 or IE8 doesn't recognize them, they just fall back to normal text inputs safely.

## Offline features and local storage

Another huge step forward in HTML5 is that web pages don't have to completely die the second you lose your internet connection, or depend only on tiny cookies to remember state.

With Web Storage (`localStorage` and `sessionStorage`), storing user preferences or draft form data right in the browser takes just a couple of lines of JavaScript, without sending extra data back and forth on every HTTP request like cookies do:

```js
// Save a user preference locally
localStorage.setItem('theme', 'compact');

// Read it back on the next visit
var savedTheme = localStorage.getItem('theme');
```

Combined with the HTML5 Application Cache (`manifest="cache.manifest"`), you can even tell the browser which HTML, CSS, JavaScript and image files to keep locally so a web app or documentation page stays usable while you are offline on a train or on a slow mobile connection.

Of course we still have to deal with older Internet Explorer versions for a while (using small scripts like Remy Sharp's html5shiv for IE), and parts of the spec are still evolving. Still, after reading "Introducing HTML5", this feels like the biggest real upgrade the web has had in years, because it makes websites faster, safer and more accessible by default.
