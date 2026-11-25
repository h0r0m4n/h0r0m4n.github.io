---
title: Why I don't believe in the future of Flash
description: Full Flash websites are everywhere right now, but I think they break too many basic things about the web. Here is why I prefer W3C standards.
category: Accessibility
date: 2007-03-15
---

If you look around web design galleries right now, it feels like half of the sites are made completely in Flash. Long intro animations, custom mouse cursors, sounds when you hover a button and fancy transitions between pages are everywhere, especially on agency sites and portfolios.

Even if everybody seems to love it, I honestly don't believe in Flash for building websites and in my opinion it doesn't have a real future on the web.

Flash is fine for animations or small multimedia pieces, sure. The problem starts when you put an entire website inside a single `.swf` file. Doing that breaks almost everything that makes the web work in the first place. Open W3C standards like [XHTML 1.0](https://www.w3.org/TR/xhtml1/), [CSS](https://www.w3.org/Style/CSS/) and [WCAG 1.0](https://www.w3.org/TR/WCAG10/) are maybe less impressive at first look, but they make much more sense in the long run.

## A website is not a video

The main issue with full-Flash websites is that they ignore how people actually use a browser. When a site is built only in Flash, very simple things stop working properly:

- You can't bookmark a specific page or send a direct link to a friend, because the URL never changes.
- Pressing the browser Back button usually takes you completely out of the site instead of the previous page.
- You can't select and copy text (for example an email address or a phone number), you can't search the page with `Ctrl+F`, and you can't resize the font from the browser if the text is too small.
- Almost every site makes you wait with a "Loading... 50%" bar just to read a simple About or Contact page.

When you have to rebuild scrollbars, links and navigation from zero inside Flash, for me it is already a sign that we are using the wrong tool.

## Depending on a closed plugin

Another big problem is that a Flash website depends completely on a proprietary plugin from one company. If a user doesn't have the right version of [Flash Player](https://www.adobe.com/products/flashplayer/) installed, or is browsing from an office computer where plugins are blocked, the page is basically an empty box.

On top of that, search engines have a hard time reading content locked inside a `.swf` file, and accessibility becomes a real mess. Following W3C WCAG 1.0 guidelines means people should be able to read and navigate a site no matter if they use [Firefox](https://www.mozilla.com/firefox/), Internet Explorer, [Opera](https://www.opera.com/), only a keyboard, or a screen reader. A full-Flash site simply leaves those users out.

## Why W3C standards work better in practice

Using clean XHTML 1.0 and external CSS files avoids all these problems right away. Content stays separated from the visual style:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
  <head>
    <title>Portfolio - About</title>
    <link rel="stylesheet" type="text/css" href="/css/screen.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="/css/print.css" media="print" />
  </head>
  <body>
    <h1>About</h1>
    <p>Simple and accessible content that works in any browser.</p>
  </body>
</html>
```

In day to day work the difference is huge:

1. Updating text or fixing a small typo takes seconds. You just edit the HTML or CSS file, without opening a heavy `.fla` project, exporting a new `.swf` and uploading everything again.
2. Pages are way lighter and faster to load, and they don't make your computer fan spin just to show a navigation menu.
3. With a separate `print.css` the exact same page prints nicely on paper and still makes sense on text browsers or small devices.
4. When you really need interactivity, unobtrusive JavaScript, [DOM scripting](https://domscripting.com/) and [AJAX](https://adaptivepath.org/ideas/ajax-new-approach-web-applications/) can add it on top of a normal XHTML page without breaking it for everyone else.

Visual trends pass fast. Most of the Flash intros from three years ago already look slow and old today. Standard HTML and CSS pages stay fast, linkable and readable even years later. Flash will probably stay around for video players or browser games, but for building real websites I really don't see a future in it.
