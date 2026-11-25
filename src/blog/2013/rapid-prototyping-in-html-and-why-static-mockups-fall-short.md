---
title: Rapid prototyping in HTML and why static mockups fall short
description: From OOCSS and SMACSS to Bootstrap and Foundation, modular front-end blocks changed how I prototype. Why working HTML prototypes beat static tools like Balsamiq, InVision and Marvel for real user testing.
category: Design
date: 2013-11-26
---

A few years ago [when I started moving away from Photoshop to Sketch](/blog/moving-beyond-photoshop-drawit-and-sketch/), it already felt like a huge step forward for my design workflow. Sketch is fast, clean and built for screen design, and I still use it all the time for visual exploration and iconography.

Lately though, I noticed a pattern on almost every web project I work on. You can spend days crafting dozens of clean artboards in Sketch, aligning every pixel, and at the end of the week what do you actually have? A folder full of static images. Nothing responds when you resize the window, no form actually accepts text, and no dropdown or modal behaves like it will in a real browser.

That is why more and more of my early design work has moved straight into rapid prototyping in HTML, CSS and a bit of basic JavaScript.

## From static pages to reusable building blocks

This way of working did not come out of nowhere. Over the last few years, the front-end community completely changed how we think about interfaces, moving away from styling individual pages one by one and toward building systems of reusable blocks.

Back in 2009, Nicole Sullivan introduced the idea of [OOCSS (Object-Oriented CSS)](https://github.com/stubbornella/oocss). For the first time, people stopped thinking in terms of whole pages and started looking at repeating visual patterns as independent objects that could be reused anywhere, regardless of context. When she wrote about the [Media Object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) pattern a year later, it clicked for a lot of us: an image next to a block of text is the same structural block whether it lives in a comment thread, a sidebar or a news feed.

Then in 2011, Jonathan Snook published [SMACSS (Scalable and Modular Architecture for CSS)](http://smacss.com/), which gave us a practical way to organize stylesheets into Base, Layout, Module and State rules. That concept of a "Module" is basically the exact ancestor of what we treat as a UI component today, whether it is a card, a button group, a navigation bar or an alert box.

Around the same time, in August 2011, Twitter released [Bootstrap](https://getbootstrap.com/), and ZURB followed just a couple of months later with [Foundation](https://get.foundation/). Even though Bootstrap is not a heavy JavaScript application framework, it completely normalized the idea of assembling interfaces out of ready-made blocks: navbars, badges, alerts, tabs, modals and carousels. With Bootstrap 3 going mobile-first this summer and Foundation 5 just out, you can spin up a responsive grid with working interactive widgets in ten minutes.

All of this changed rapid prototyping completely. You no longer have to reinvent the wheel from scratch every time you want to test an idea in the browser.

## Putting blocks together instead of drawing pictures

When I prototype a new flow now, I rarely start by drawing every single state in a graphics editor. Instead, I grab a lightweight starter setup with Bootstrap or Foundation (or my own small set of SMACSS-style modules) and start assembling the page directly in HTML.

A simple responsive layout with a navigation bar, a feedback alert and a few content cards takes less than a minute to put together:

```html
<div class="container">
  <div class="alert alert-info">
    Your draft has been saved automatically.
  </div>

  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="panel panel-default">
        <div class="panel-heading">Project overview</div>
        <div class="panel-body">
          <p>Quick summary text to test how real copy wraps on smaller screens.</p>
          <a href="#details" class="btn btn-primary">Open details</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

It does not need to look like the final polished product yet. The point is that in five minutes you have something alive in Chrome, Safari and on your phone. You can change the copy, add three more cards, test what happens when a headline wraps onto three lines, and immediately see how the grid behaves at 320px, 768px and 1280px.

Try doing that manually in [Sketch](https://www.sketch.com/) across three breakpoints and ten screens, and you will lose half a day just nudging rectangles around.

## Where Balsamiq, InVision and Marvel fall short

I know a lot of designers rely on wireframing and click-through tools, and I have used plenty of them myself. [Balsamiq Mockups](https://balsamiq.com/) is fine if you just want to sketch a rough layout in a meeting and throw it away an hour later, though a marker and a whiteboard are usually faster.

Tools like [InVision](https://www.invisionapp.com/), or the new [Marvel App](https://marvelapp.com/) that lets you link screens directly from Dropbox, are definitely better than emailing a folder of numbered PNGs to a client. You can draw hotspots over static mockups and click from screen A to screen B.

The problem is that they still only simulate a website. Under the hood you are still looking at flat pictures. Users cannot type into a search field, cannot open a real select menu on iOS, cannot scroll a sticky header smoothly, and cannot resize the browser to see how a responsive layout adapts. Worse, every time you want to test a small variation in copy or layout, you have to go back to Sketch or Photoshop, edit multiple artboards, export everything again and re-link the hotspots.

In HTML, you edit one template or one CSS class, refresh the browser, and the whole prototype updates.

## Real prototypes make user testing actually useful

The biggest reason I push for HTML prototyping is **user testing**.

When you put a static mockup or a Balsamiq wireframe in front of a real person, half of the session is spent explaining what would happen if this were real: "imagine you typed your email here", "pretend this menu opens when you tap it", "ignore that the text is cut off". People behave differently when they know they are looking at a drawing, and they tend to give polite, surface-level feedback.

When you hand someone a phone or sit them in front of a laptop with a real HTML prototype, all that pretending disappears. You immediately see if a button is too small to tap with a thumb, if a form feels tedious to fill out, if a carousel hides important content, or if a navigation bar collapses in a confusing way on mobile.

Clients and stakeholders react differently too. Showing a working prototype in a browser builds way more trust and clarity than presenting static slides. Instead of debating abstract ideas, everyone is clicking through the actual experience and spotting real usability problems early, when changing things is still cheap.

## Designers should learn basic HTML, CSS and JavaScript

This brings me to something that always starts heated debates in our industry, but I genuinely believe it: web designers should learn to write basic HTML, CSS and JavaScript.

I am not saying every designer needs to become a full-time software engineer or architect complex backend code. You do not need to write production-ready JavaScript applications from scratch.

What you do need is enough comfort with HTML semantics, CSS layout, and a bit of basic JavaScript or [jQuery](https://jquery.com/) to connect states, toggle classes and use component libraries like Bootstrap or Foundation without fear.

Once you understand the material you are actually designing for, everything changes. You stop handing developers impossible layouts that fall apart as soon as real data hits the page. You prototype much faster than drawing static screens by hand, and you spend your time testing real interfaces with real people instead of polishing fake pictures.
