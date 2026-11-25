---
title: WordPress, Custom Post Types and why Advanced Custom Fields changed my workflow
description: After starting with WordPress 2.6 and seeing Custom Post Types arrive in 3.0, Elliot Condon's Advanced Custom Fields finally made structured content and clean client input simple.
category: Development
date: 2011-11-10
---

I started working with [WordPress](https://wordpress.org/) back around [version 2.6](https://wordpress.org/news/2008/07/wordpress-26/), mostly because there was already a huge demand for it on the market. Clients knew the name, wanted an admin panel they could actually understand, and rarely had the budget for a custom CMS built from scratch.

For a while though, using WordPress for anything more complex than a normal blog or a small brochure site felt a bit forced. You ended up using regular blog categories to fake a portfolio, a team page or an events list, and hoping the client wouldn't mix everything up later.

Things really started to change last year with [WordPress 3.0](https://wordpress.org/news/2010/06/thelonious/), which finally brought proper [Custom Post Types](https://codex.wordpress.org/Post_Types) into core. Suddenly you could separate projects, case studies, team members or events cleanly in the sidebar, each with its own templates and URLs.

## The pain of writing custom metaboxes in PHP

Even with Custom Post Types, there was still a big annoying part left: managing structured data.

WordPress has always had default [custom fields](https://codex.wordpress.org/Custom_Fields), of course, but asking a client to manually type key and value pairs into a raw table is a recipe for disaster. One small typo in the field name and nothing shows up on the site.

So if a project needed structured data like a client name, a release date, a project link or extra image uploads, you had to code heavy custom metaboxes completely by hand in PHP. That meant writing [`add_meta_box()`](https://codex.wordpress.org/Function_Reference/add_meta_box), building all the form markup yourself, adding nonces, hooking into `save_post`, checking autosaves and permissions, sanitizing every value and saving everything with [`update_post_meta()`](https://codex.wordpress.org/Function_Reference/update_post_meta).

For one simple field it was annoying. For a full client website with twenty different fields across five templates, it meant repeating hundreds of lines of boilerplate code over and over, and most of the time the admin screen still ended up looking messy.

## How Advanced Custom Fields changed the game

Earlier this year I discovered [Advanced Custom Fields](https://www.advancedcustomfields.com/) (ACF), a plugin created by [Elliot Condon](https://www.elliotcondon.com/), and it honestly changed the rules of the game for me.

Instead of spending hours writing metabox PHP by hand, ACF gives you a really clean and intuitive graphical interface right inside WordPress. You build a field group, pick your field types, set up the location rules to decide where those fields appear (for example only on a "Projects" Custom Post Type, or only on the Homepage template), and you are ready to go.

Another detail I love is that you can even hide the default WordPress editor on specific pages when a layout is made purely of structured blocks. That way the client only sees the exact fields they actually need to fill in, without wondering what the big empty text box at the top is for.

I became a huge fan almost immediately and now I use it on basically every WordPress project I build.

## Real examples from my client sites

Here are a few everyday situations where ACF immediately made my life easier compared to old custom metabox setups.

### 1. Portfolio projects with clean metadata

On a portfolio or agency site, every project usually needs a client name, a release date, a live URL and maybe a flag to feature it on the homepage. Instead of putting all of that inside the main text editor, I set up a dedicated field group attached to the `project` Custom Post Type and pull each value safely in the template:

```php
<?php
$client   = get_field( 'client_name' );
$date     = get_field( 'release_date' );
$link     = get_field( 'project_url' );
$featured = get_field( 'featured_project' );
?>

<div class="project-meta<?php echo $featured ? ' featured' : ''; ?>">
  <?php if ( $client ) : ?>
    <p class="project-client"><?php echo esc_html( $client ); ?></p>
  <?php endif; ?>

  <?php if ( $date ) : ?>
    <p class="project-date"><?php echo esc_html( $date ); ?></p>
  <?php endif; ?>

  <?php if ( $link ) : ?>
    <p class="project-link">
      <a href="<?php echo esc_url( $link ); ?>">Visit website</a>
    </p>
  <?php endif; ?>
</div>
```

If an optional field like the live URL is left empty, the markup simply skips it without leaving broken links or empty HTML tags behind.

### 2. Events and schedules without inconsistent dates

Before ACF, whenever a client managed an events page inside a normal text box, every editor wrote dates in a different way: "12 Nov", "November 12th 2011", "12/11/11". Sorting or styling those blocks consistently was almost impossible.

Using a dedicated Date Picker field together with plain text fields for venue and city solves the problem completely. Every event stores the date in the exact same format, and the editor doesn't have to guess how to type it.

### 3. Art-directed blog posts and product pages

One of my favorite uses of ACF is making art-directed posts or product pages without having to create a separate PHP template for every special page.

For example, on a blog or a product showcase, most entries can follow the default site design. When a special article or a new product launch deserves its own visual mood, you can attach a small set of optional styling fields (like background color, accent color, header image or even a custom CSS field for that specific post) right inside the editor:

```php
<?php
$bg_color     = get_field( 'page_bg_color' );
$accent_color = get_field( 'page_accent_color' );
$custom_css   = get_field( 'post_custom_css' );

if ( $bg_color || $accent_color || $custom_css ) : ?>
  <style type="text/css">
    <?php if ( $bg_color ) : ?>
      body { background-color: <?php echo esc_attr( $bg_color ); ?>; }
    <?php endif; ?>
    <?php if ( $accent_color ) : ?>
      a, h1 { color: <?php echo esc_attr( $accent_color ); ?>; }
    <?php endif; ?>
    <?php if ( $custom_css ) : ?>
      <?php echo strip_tags( $custom_css ); ?>
    <?php endif; ?>
  </style>
<?php endif; ?>
```

If you leave those fields empty, the page uses the normal stylesheet. When you fill them in, that single article or product page can completely change its look and feel while still keeping the exact same clean HTML structure underneath.

## Controlling client input to protect the design

For me as a designer, the best part of ACF is not just saving PHP development time. It is how much better you can control the data that clients enter, so they don't accidentally break the layout two weeks after launch.

When you only give someone one giant WYSIWYG editor, you already know what happens: pasted styles from Microsoft Word, random inline colors, huge uncompressed images dropped in the middle of a paragraph, or missing fields that ruin the visual hierarchy.

With ACF you can guide almost every input properly:

- Choosing the right input types for each piece of content, like a plain text input instead of a rich editor, a dedicated image uploader, a date picker, a true/false checkbox, or a select dropdown when only a few specific options should be allowed.
- Marking critical fields as required, so an editor cannot publish a project or an event with missing data that leaves empty holes in a grid or card.
- Writing clear short instructions under each field (for example reminding the client to keep a summary under 140 characters, or what image proportions work best) and adding a safe fallback limit in PHP when rendering short teasers:

```php
<?php
$summary = get_field( 'short_summary' );
if ( $summary ) {
  echo '<p>' . esc_html( mb_strimwidth( $summary, 0, 140, '...' ) ) . '</p>';
}
?>
```

It makes the admin experience way less intimidating for clients, because they don't have to worry about breaking anything, and at the same time it keeps the front-end HTML clean and predictable. Between Custom Post Types in WordPress 3.0 and ACF, WordPress finally feels like a real CMS I am genuinely happy to build on.
