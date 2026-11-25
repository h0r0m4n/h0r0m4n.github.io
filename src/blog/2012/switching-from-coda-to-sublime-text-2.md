---
title: Switching from Coda to Sublime Text 2
description: After years with Panic's Coda on Mac, Sublime Text 2 became my main code editor. Here is why speed, multiple cursors, Package Control, SideBarEnhancements and Emmet won me over.
category: Development
date: 2012-12-27
---

For a long time [Coda](https://panic.com/coda/) by [Panic](https://panic.com/) was my daily code editor on Mac. Having FTP, a visual preview, CSS tools and a file browser all packed into one native OS X app felt great, especially when I was jumping between client WordPress sites and small HTML projects.

Over the past few months though, I kept noticing Coda feeling heavier than I wanted, especially when opening larger projects or jumping quickly between dozens of files. Even after Coda 2 came out earlier this year, I decided to give [Sublime Text 2](https://www.sublimetext.com/2) a proper try for a full week of real client work.

That one week turned into a permanent switch. Sublime Text 2 is now my editor of choice, and going back to anything slower feels almost impossible.

## Speed and staying on the keyboard

The first thing you notice about Sublime Text 2 is how ridiculously fast it is. It opens instantly, handles huge files without stuttering, and gets completely out of your way with a clean, dark interface and that tiny minimap on the right.

Even more than raw speed, it changed how I move around a project. With Goto Anything (`Cmd+P`) I can type a few letters of any filename and jump straight to it, or add `@` to jump to a specific CSS selector or PHP function inside that file. The Command Palette (`Cmd+Shift+P`) puts almost every editor action a couple of keystrokes away, so my hands barely have to leave the keyboard.

## Multiple cursors change everything

If I had to pick a single feature that sold me on Sublime Text 2 right away, it is multiple cursors.

Once you get used to selecting a word and hitting `Cmd+D` to select the next occurrences, or holding `Cmd` and clicking in five different places to edit five lines at once, editing HTML and CSS feels completely different. Renaming a class across a block of markup, wrapping a list of items in `<li>` tags with `Cmd+Shift+L`, or cleaning up repetitive WordPress template code takes two seconds instead of annoying find-and-replace dialogs.

It sounds like a small trick until you try to edit code in another editor without it and immediately miss it.

## Package Control and my favorite plugins

Out of the box, Sublime Text 2 is intentionally minimal, which is why it stays so fast. What really makes it work for daily projects is installing [Package Control](https://wbond.net/sublime_packages/package_control) by Will Bond. Instead of manually downloading plugin folders from GitHub, Package Control lets you search, install and keep plugins updated right from the Command Palette.

I try not to overload my setup with fifty extensions, so these are the few plugins I install first on any machine.

### SideBarEnhancements

One of the few rough edges in default Sublime Text 2 is the sidebar. Out of the box you only get very basic actions like New File, Rename and Delete, which felt like a big downgrade coming from Coda.

[SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements) fixes that completely. It adds all the everyday file operations you expect: Duplicate, Move, Copy Path, Open in Browser, Reveal in Finder and Move to Trash. It really feels like something that should be built into the editor out of the box.

### Emmet (formerly Zen Coding)

If you write a lot of HTML and CSS by hand, [Emmet](https://emmet.io/) (which just evolved out of [Zen Coding](https://code.google.com/p/zen-coding/) by Sergey Chikuyonok) is a massive time saver.

Instead of typing opening and closing tags over and over, you write a short CSS-like abbreviation and press `Tab`:

```text
nav.main-nav>ul>li.nav-item*4>a[href="#"]{Item $}
```

And Emmet instantly expands it into clean markup:

```html
<nav class="main-nav">
  <ul>
    <li class="nav-item"><a href="#">Item 1</a></li>
    <li class="nav-item"><a href="#">Item 2</a></li>
    <li class="nav-item"><a href="#">Item 3</a></li>
    <li class="nav-item"><a href="#">Item 4</a></li>
  </ul>
</nav>
```

It works for CSS properties too (`m10-20` becomes `margin: 10px 20px;`, `fz14` becomes `font-size: 14px;`), and when you combine Emmet with Sublime's multiple cursors, writing front-end code gets ridiculously fast.

### A couple of small extras

Beyond those two, I also like keeping [BracketHighlighter](https://github.com/facelessuser/BracketHighlighter) installed so matching HTML tags and PHP braces are always clear in the gutter, and [Soda Theme](https://github.com/buymeasoda/soda-theme) for a cleaner, more native-looking Mac UI around the tabs and sidebar.

## Leaving the all-in-one IDE behind

Switching from Coda did mean giving up a built-in FTP client, so I went back to using [Transmit](https://panic.com/transmit/) alongside Sublime Text 2 (and [Git](https://git-scm.com/) whenever the project allows it). At first I thought splitting tools would slow me down, but the opposite happened: having a dedicated, lightning-fast code editor that does one job really well beats an all-in-one app every time.
