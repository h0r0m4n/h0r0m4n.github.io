---
title: Falling in love with Kirby CMS and why I prefer it to WordPress
description: After testing Kirby v1 and the Kirby Panel on a real client site, file-based content, blueprints and clean PHP templates beat WordPress and paid plugins for most custom websites.
category: Development
date: 2012-10-18
---

Earlier this year I discovered [Kirby](https://getkirby.com/), a file-based PHP CMS created by [Bastian Allgeier](https://bastianallgeier.com/) that launched its version 1 in January. Even after getting comfortable with [WordPress, Custom Post Types and ACF](/blog/wordpress-custom-post-types-and-advanced-custom-fields/), [WordPress](https://wordpress.org/) still carries a lot of weight: a MySQL database to maintain and migrate, endless core and plugin updates, security plugins, caching plugins, and paid add-ons every time a client needs something custom.

After testing Kirby on a few personal experiments, I saw its potential right away, and the first time I got a chance to pitch it to a client, I went for it.

The result was a tank of a website: super fast, completely manageable by the client through the [Kirby Panel](https://getkirby.com/panel) with structured fields for every single section, and built without buying a single third-party plugin.

## No database, just clean folders and text files

The biggest shift with Kirby is that there is no MySQL database at all. Your entire website structure is literally a folder tree inside `/content/`, and each page is a plain text file:

```text
content/
  01-projects/
    01-studio-website/
      project.txt
      hero.jpg
      detail-01.jpg
    02-brand-identity/
      project.txt
      cover.jpg
  02-about/
    about.txt
```

Inside `project.txt`, your structured fields are just readable plain text separated by four dashes:

```text
Title: Studio Website
----
Client: Acme Studio
----
Year: 2012
----
Text: A responsive portfolio built with clean HTML5 and CSS.
```

That alone makes Kirby way more versatile and reliable than WordPress in practice. Backing up a site means copying a folder. Moving from local to staging to production takes seconds with zero database dumps or broken serialized URLs. You can even put the entire site and its content under [Git](https://git-scm.com/) version control.

## Structured fields with blueprints, no plugins required

In WordPress, getting a clean, foolproof admin screen means installing ACF, configuring field groups in the database, hiding default meta boxes and hoping the next WordPress update doesn't break one of your plugins.

In Kirby v1, you just drop a simple [YAML](https://yaml.org/) blueprint file inside `site/panel/blueprints/project.php`:

```yaml
<?php if(!defined('KIRBY')) exit ?>

title: Project
pages: false
files: true
fields:
  title:
    label: Title
    type:  text
  client:
    label: Client
    type:  text
  year:
    label: Year
    type:  text
  text:
    label: Description
    type:  textarea
```

The Kirby Panel reads that blueprint and immediately builds a clean, minimal admin form for the client. They get structured inputs, drag-and-drop image uploads directly into the page folder, and [Markdown](https://daringfireball.net/projects/markdown/) / [Kirbytext](https://getkirby.com/docs/content/text) formatting without a bloated WYSIWYG toolbar where they can paste broken styles from Word.

And because blueprints are just files in your repository, you never have to pay for extra plugins or click around an admin screen to recreate fields on another server.

## Cleaner, faster PHP templates

Writing templates in Kirby is also much cleaner compared to WordPress's `WP_Query` loops and dozens of template tags. If a content file is named `project.txt`, Kirby automatically renders it with `site/templates/project.php`:

```php
<article class="project">
  <h1><?php echo html($page->title()) ?></h1>
  <p class="meta">
    <?php echo html($page->client()) ?> (<?php echo html($page->year()) ?>)
  </p>

  <div class="content">
    <?php echo kirbytext($page->text()) ?>
  </div>

  <?php foreach($page->images() as $image): ?>
    <img src="<?php echo $image->url() ?>" alt="<?php echo html($page->title()) ?>" />
  <?php endforeach ?>
</article>
```

Want to list all visible projects on the homepage? It is one readable line: `$pages->find('projects')->children()->visible()`. There is no fighting a blog engine to pretend it is a portfolio or a company website. You define the exact data structure the project actually needs, and Kirby stays completely out of your HTML.

## Moving my work to Kirby (when clients let me)

Since seeing how rock-solid that first client site turned out, I started moving almost all of my new custom projects over to Kirby. It is faster to build, easier to maintain, practically immune to the usual database and plugin headaches, and clients pick up the Panel in five minutes.

Of course, the reality of freelance work is that more than half of my clients still ask for WordPress simply because they already know the name, used it at a previous job, or have an internal team comfortable with it. I still build plenty of WordPress sites when a client asks for it.

Whenever the choice is mine though, Kirby v1 is easily my favorite CMS right now. For custom-designed websites, it is simply cleaner, more versatile and built like a tank.
