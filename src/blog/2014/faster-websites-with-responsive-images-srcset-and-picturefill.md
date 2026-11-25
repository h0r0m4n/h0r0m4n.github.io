---
title: Making websites faster with responsive images, srcset and Picturefill
description: Scaling images with CSS was never enough for real performance. Here is why responsive images matter for bandwidth and accessibility, and how I use srcset (1x, 1.5x, 2x) and Picturefill 2.0 in practice.
category: Development
date: 2014-11-12
---

Back in 2010 when [I wrote about Responsive Web Design](/blog/responsive-web-design-and-thinking-beyond-devices/), making images flexible with `max-width: 100%` felt like a great solution. Visually it worked, and images stopped breaking out of fluid grids on phones and tablets.

The problem is that CSS only changes how an image looks on screen, not what the browser actually downloads.

If you put a 1800px Retina image on a page and scale it down with CSS to fit a 320px phone screen, the mobile browser still downloads the entire heavy desktop file over a 3G connection. Over the last couple of years, as high-DPI screens became normal on phones, tablets and laptops, page weights exploded, and images are now easily the biggest part of almost every website.

Lately I have been obsessed with frontend performance and finding clean ways to make pages load faster. Fixing how we serve images is easily the biggest win you can get.

## Why bandwidth and speed are also about accessibility

When people talk about web performance, they often treat it as a purely technical topic or something only big e-commerce sites care about. For me, speed is directly connected to accessibility too.

Not everyone visits your site from a fast office fiber connection on a brand new MacBook. Plenty of people are browsing on a slow 3G mobile signal, on a train where the connection keeps dropping, on older smartphones with limited memory, or on strict mobile data plans where every megabyte costs money.

If a portfolio page or an article downloads 4 or 5 megabytes of oversized images just to show a few small thumbnails, the page feels broken for those users. Cutting image weight by 60% or 80% doesn't just make the site feel snappy on desktop, it makes the content actually reachable and usable for way more people.

Think about a simple hero image: a large desktop JPEG at 1800px might easily weigh around 300 KB. A properly sized 640px version of the same photo for a phone is closer to 50 KB. Multiply that across five or ten images on a single page and you are saving megabytes of bandwidth on every visit.

## Picturefill and the new `<picture>` and `srcset` standards

For a long time we didn't have a real standard in HTML to tell the browser which image file to download. That is why [Picturefill](https://scottjehl.github.io/picturefill/), created by [Scott Jehl](https://scottjehl.com/) of [Filament Group](https://www.filamentgroup.com/) back in 2012, became such an important tool for frontend developers.

The first version of Picturefill used custom `<span data-picture>` markup as a temporary workaround while the [Responsive Images Community Group](https://responsiveimages.org/) worked on a real spec. Earlier this year though, Filament Group released [Picturefill 2.0](https://github.com/scottjehl/picturefill/releases/tag/2.0.0), which uses the real native `<picture>`, `srcset` and `sizes` syntax.

Even better, native browser support is finally starting to land right now. Chrome 38 and Opera 25 just shipped native `<picture>` and `srcset` support last month, and Safari 8 and iOS 8 support `srcset` with density descriptors. For Firefox, Internet Explorer and older browsers, dropping in Picturefill 2.0 lets us use the exact same standard HTML today without waiting years for every browser to catch up.

Setting up Picturefill 2.0 in the `<head>` only takes two lines:

```html
<script>
  // Picture element HTML5 shiv for older IE
  document.createElement("picture");
</script>
<script src="/js/picturefill.min.js" async></script>
```

Because it loads with `async`, it won't block the rest of the page from rendering, and in browsers that already support `<picture>` natively it simply gets out of the way.

## Serving 1x, 1.5x and 2x with `srcset`

For fixed-size UI elements like product thumbnails, badges or icons, the simplest and cleanest approach is using `srcset` with pixel density descriptors.

Instead of only exporting `1x` and `2x`, I like preparing `1x`, `1.5x` and `2x` versions whenever it makes sense. That way standard desktop monitors get the light `1x` file, mid-density Android phones and 150% displays get `1.5x` instead of downloading a massive `2x` asset they don't fully need, and Retina displays still get crisp `2x` graphics:

```html
<img
  src="/images/product-thumb-1x.jpg"
  srcset="/images/product-thumb-1x.jpg 1x,
          /images/product-thumb-1.5x.jpg 1.5x,
          /images/product-thumb-2x.jpg 2x"
  width="240"
  height="180"
  alt="Product thumbnail preview">
```

Notice that `src` is still there as a safe fallback for browsers that don't understand `srcset` and don't run JavaScript.

## Combining `<picture>`, media queries and `1x` / `1.5x` / `2x`

When a layout changes across breakpoints, or when you want different image crops on small screens versus large desktop monitors (art direction), you can combine `<picture>` with `media` queries and density descriptors inside each `<source>`:

```html
<picture>
  <!--[if IE 9]><video style="display: none;"><![endif]-->
  <source media="(min-width: 60em)"
          srcset="/images/hero-large-1x.jpg 1x,
                  /images/hero-large-1.5x.jpg 1.5x,
                  /images/hero-large-2x.jpg 2x">
  <source media="(min-width: 35em)"
          srcset="/images/hero-medium-1x.jpg 1x,
                  /images/hero-medium-1.5x.jpg 1.5x,
                  /images/hero-medium-2x.jpg 2x">
  <source srcset="/images/hero-small-1x.jpg 1x,
                  /images/hero-small-1.5x.jpg 1.5x,
                  /images/hero-small-2x.jpg 2x">
  <!--[if IE 9]></video><![endif]-->
  <img srcset="/images/hero-small-1x.jpg 1x, /images/hero-small-2x.jpg 2x"
       alt="Showcase overview of the project">
</picture>
```

That tiny IE 9 conditional `<video>` wrapper looks a little weird at first, I know, but it is a clever Picturefill 2.0 trick so Internet Explorer 9 doesn't ignore `<source>` tags inside `<picture>`.

With this setup, a small phone downloads the small crop at its exact screen density, a tablet gets the medium crop, and a wide desktop screen gets the full landscape image. Nobody downloads bytes they will never see.

## Using width descriptors and `sizes` for fluid images

If the image crop stays the same and only the display width changes with the fluid grid, you don't even need `<picture>`. You can give the browser the real pixel widths (`w`) of your exported images together with a `sizes` attribute, and let the browser do the math automatically based on both screen width and pixel density:

```html
<img
  src="/images/case-study-640.jpg"
  srcset="/images/case-study-480.jpg 480w,
          /images/case-study-960.jpg 960w,
          /images/case-study-1440.jpg 1440w,
          /images/case-study-1920.jpg 1920w"
  sizes="(min-width: 60em) 50vw, 100vw"
  alt="Interface layout preview">
```

In this example, on a desktop viewport wider than `60em` the image takes half the screen (`50vw`), while on smaller viewports it takes the full width (`100vw`). The browser combines that with whether the device is `1x`, `1.5x` or `2x` and downloads only the single best file.

Yes, exporting multiple image sizes adds a bit of extra work to the workflow (unless you automate it with [Grunt](https://gruntjs.com/) or [Gulp](https://gulpjs.com/) tasks or your CMS), and the HTML is definitely more verbose than a plain `<img>` tag. Still, once you test a heavy page on a real 3G connection before and after using `srcset` and Picturefill, it is very hard to go back. Fast websites are simply better websites for everyone.
