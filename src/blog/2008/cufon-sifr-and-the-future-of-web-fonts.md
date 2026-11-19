---
title: Cufon, sIFR and why web typography needs real standards
description: Replacing text with sIFR or Cufon makes websites less accessible just to look nicer. Real art direction on the web needs proper web font standards and licenses.
category: Accessibility
date: 2008-11-24
---

Every web designer knows how frustrating it is to be stuck with the same few web-safe fonts. Arial, Georgia, Verdana, Helvetica, Times New Roman. Year after year our layouts get better, while typography on the web feels basically the same as ten years ago.

Because of this limit, people came up with all kind of tricks to replace HTML text with custom fonts. First it was image replacement with PNGs, then sIFR (which replaces headings with small Flash movies), and lately Cufon, that draws letters using JavaScript with `<canvas>` and VML. I understand why designers get excited about them, because screenshots look much closer to print design.

Still, I think both sIFR and Cufon are bad for accessibility and push the web in the wrong direction.

## Making an accessible web less accessible

What I always liked about the web is that it is accessible out of the box. Normal text in HTML can be selected, copied, searched, resized, indexed by Google and read by screen readers without doing anything special. You get all of this for free just by using standard markup.

Now we are slowly throwing that away in favor of aesthetics:

- With sIFR, every heading becomes a small Flash object. Pages get heavier, Flash has to load multiple times on the same screen, keyboard navigation gets weird, and very often you see the fallback font flicker before the `.swf` replaces it.
- With Cufon, you don't need Flash anymore, which sounds better at first, but it turns real text into vector drawings on the page. Try to select a title made with Cufon, copy a word or search it with `Ctrl+F`: it doesn't behave like real text anymore, because on screen it is literally just drawn shapes.
- Both methods try to hide the original text somewhere behind or off-screen so screen readers can still read it. In my view that is just a hack to cover a problem we created ourselves.

I don't think good visual design should mean breaking basic things like selecting text or using a screen reader.

## Web font standards and licenses have to change

The funny part is that CSS already has `@font-face` in the spec for years:

```css
@font-face {
  font-family: "CustomHeadline";
  src: url("/fonts/custom-headline.otf") format("opentype");
}

h1 {
  font-family: "CustomHeadline", Georgia, serif;
}
```

Safari 3.1 already proved this year that native `@font-face` with real OpenType and TrueType fonts works cleanly. Text stays real text, fast and accessible, with zero JavaScript hacks or Flash plugins. Now other browsers need to support it in a consistent way instead of sticking to proprietary stuff like EOT in Internet Explorer.

Even more important than browsers, though, is the license problem.

Right now most type foundries only sell desktop licenses that forbid you to upload font files on a web server. That is the main reason why tools like sIFR and Cufon even exist, because designers try to work around licensing limits. Until font foundries update their licenses for the web and let us legally embed real fonts, people will keep using broken workarounds.

For me, proper web font standards together with clear web font licenses are the real next step toward true art direction in web design. Not more scripts trying to fake text with Flash or canvas.
