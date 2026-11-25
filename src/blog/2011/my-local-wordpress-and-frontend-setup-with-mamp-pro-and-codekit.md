---
title: My local WordPress and front-end setup with MAMP PRO and CodeKit
description: Running local WordPress sites on Mac with MAMP PRO 2 virtual hosts and automating Sass, LESS, JavaScript minification and browser reloads with the new CodeKit beta.
category: Development
date: 2011-12-08
---

This year has easily been my biggest year for [WordPress](https://wordpress.org/) client work. Last month [I wrote about Custom Post Types and Advanced Custom Fields](/blog/wordpress-custom-post-types-and-advanced-custom-fields/), which fixed a lot of the pain on the CMS side. The other half of working fast on WordPress projects though is having a solid local development setup on your Mac instead of editing files over FTP on a remote server.

For a while I tried configuring Mac OS X's built-in Apache and MySQL by hand, and I also used the free version of MAMP. Right now though, two Mac apps completely transformed my daily workflow: [MAMP PRO](https://www.mamp.info/en/mamp-pro/) for the PHP and WordPress stack, and the brand new [CodeKit](https://incident57.com/codekit/) beta for everything on the front-end.

## MAMP PRO 2 for the PHP and WordPress stack

The free version of [MAMP](https://www.mamp.info/) is totally fine when you only have one project running at `http://localhost:8888`. The problem starts the moment you are maintaining five or six different client WordPress sites at the same time.

Upgrading to MAMP PRO 2 (which came out this summer with proper Mac OS X Lion support) solved every headache I had with local PHP environments. The main reason I paid for it is virtual host management. Instead of editing `/etc/hosts` and Apache's `httpd-vhosts.conf` by hand every time a new project starts, you just open MAMP PRO, add a host like `client-project.local`, point it to your project folder, and click apply.

In daily WordPress work, a few small details make a huge difference:

- Every local WordPress install runs at the root of its own domain (`http://client-project.local/`), so root-relative URLs and `.htaccess` pretty permalinks behave exactly like they will on the live server.
- You can switch between PHP 5.2 and PHP 5.3 with a single click, which is a lifesaver when a client's old shared hosting server is still stuck on an older PHP version.
- Managing local MySQL databases is simple with the built-in [phpMyAdmin](https://www.phpmyadmin.net/) or by connecting straight into MAMP's MySQL socket from [Sequel Pro](https://www.sequelpro.com/).

Once MAMP PRO is running in the background, spinning up a fresh local WordPress site takes maybe two minutes.

## CodeKit for front-end automation

If MAMP PRO handles the back-end stack, [CodeKit](https://incident57.com/codekit/) by Bryan Jones is what takes care of the front-end. I was already a fan of his earlier [LESS.app](https://incident57.com/less/), and when the first CodeKit beta dropped last month I installed it immediately.

The idea is simple: you drag your project folder into CodeKit, and it watches your files in the background without forcing you to keep three terminal tabs open all day.

Every time you save a file in your editor, CodeKit automatically handles all the boring front-end tasks:

- Compiles [Sass](https://sass-lang.com/), [Compass](http://compass-style.org/), [LESS](http://lesscss.org/) and [CoffeeScript](http://coffeescript.org/) right on save, and pops up a Growl notification if you made a syntax mistake.
- Checks your JavaScript with [JSLint](http://www.jslint.com/) or [JSHint](https://jshint.com/), and combines and minifies scripts so you don't ship five separate uncompressed `.js` files to production.
- Losslessly optimizes PNG and JPEG images inside your theme folder with one click.
- Automatically refreshes Safari or Chrome when you edit HTML or PHP files, and even better, injects updated CSS directly into the open page without doing a full reload.

## Putting MAMP PRO and CodeKit together

Using both apps side by side is where the workflow really shines for WordPress theme development.

MAMP PRO serves the local WordPress site at `http://client-project.local/`, while CodeKit watches my theme directory inside `wp-content/themes/client-theme/`. I open the local site on one side of my monitor and my code editor on the other. When I tweak a Sass variable or adjust a layout rule and hit `Cmd+S`, CodeKit compiles the CSS and injects it live into Chrome in less than a second.

No more waiting on FTP uploads or babysitting terminal windows. If you build WordPress sites on a Mac, MAMP PRO and CodeKit together save hours every week.
