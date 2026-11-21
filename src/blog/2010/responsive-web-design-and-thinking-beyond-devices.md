---
title: Responsive web design and thinking beyond fixed devices
description: After reading Ethan Marcotte on A List Apart, fluid grids, flexible media and CSS Media Queries feel like the real answer to adapting websites to any screen size.
category: Accessibility
date: 2010-11-18
---

Recently I came across an article on A List Apart by Ethan Marcotte called "Responsive Web Design", and honestly it felt like a lightbulb moment.

Back last year, after getting my iPhone 3GS, [I wrote](/blog/first-impressions-of-the-iphone-3gs-and-the-mobile-web/) that making a separate mobile site on an `m.` subdomain or building native apps for every platform felt like the wrong long term direction. I kept thinking there had to be a way in web standards to make a single site adapt cleanly to smaller screens.

What Marcotte proposes finally puts all the pieces together in a simple and practical way: combining fluid grids, flexible images and CSS Media Queries so the same website can adapt to whatever screen is viewing it.

## Not just mobile, tablet and desktop

Now that the iPad is out with Safari on a 9.7-inch screen, we are already dealing with at least three different classes of devices, and more will surely come.

Still, thinking about this over the past few days, I don't think we should focus too much on fixed labels like "mobile", "tablet" and "desktop". Those buckets already start to fall apart if you look closely.

What does "desktop" even mean today? An external monitor, sure, but which one? 20, 24, 27 or 32 inches? On the other side, a lot of small laptops and netbooks right now have screens that are actually smaller, or have less vertical resolution, than an iPad. And people don't even keep their browser windows maximized all the time on big monitors anyway.

Instead of designing three rigid versions for three specific gadgets, it makes much more sense to design sites that stay comfortable and accessible across a full range of widths, including larger resolutions where a fixed 960px layout starts looking tiny in the middle of the screen.

## Three practical things to start focusing on

For me, trying to apply this in real projects comes down to three main basics:

1. A fluid, responsive grid: moving away from rigid pixel widths for every container and column, using percentage widths together with Media Queries to adjust the layout when the screen gets narrower or wider.
2. Flexible images and video: making sure photos and embedded videos don't break out of their containers on smaller screens, starting with simple rules like `max-width: 100%` so media scales together with the grid.
3. Adapting `font-size`: text that looks fine on a laptop can become way too small on a big 27-inch screen or awkward on a phone. Using relative units like `em` or percentages and adjusting the base `font-size` with Media Queries helps keep reading comfortable everywhere.

```css
img, video {
  max-width: 100%;
  height: auto;
}

@media screen and (max-width: 768px) {
  body {
    font-size: 95%;
  }
}
```

Of course browser support (especially older Internet Explorer versions) still needs some care and fallbacks, and changing how we design grids is not something that happens overnight. Even so, this feels like the first real, standards-based answer to the multi-device web.
