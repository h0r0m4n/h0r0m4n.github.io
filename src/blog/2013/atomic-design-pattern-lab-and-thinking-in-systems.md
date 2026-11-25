---
title: Atomic Design, Pattern Lab and why we need to think in systems
description: Why Brad Frost's Atomic Design methodology and Pattern Lab matter for scalable products, multi-disciplinary teams, cleaner QA and ending duplicated UI patterns.
category: Design
date: 2013-12-16
---

Since [Brad Frost](https://bradfrost.com/) published his post on [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) back in June, the idea has been stuck in my head. It takes the exact modular mindset from OOCSS, SMACSS, Bootstrap and [rapid HTML prototyping](/blog/rapid-prototyping-in-html-and-why-static-mockups-fall-short/) and gives it a clear, practical structure.

The more I work on larger web applications, the more convinced I am that this systemic way of thinking is not just a trendy design metaphor. For medium and large companies, it is really the only sustainable way forward.

## Breaking interfaces down like LEGO bricks

If you have not read Brad's post yet, the idea is inspired by chemistry. Instead of designing whole pages from top to bottom, you break an interface down into five levels, starting from the smallest parts and combining them up into full screens.

At the base you have atoms, which are the smallest HTML building blocks like a label, an input field, a button, a heading, a color swatch or a font style. On their own they do not do much, just like single LEGO bricks. Combine a few atoms together and you get molecules, small functional units such as a search form made of a label, a text input and a submit button.

Put molecules and atoms together and you get organisms, distinct sections of an interface like a site header containing a logo, a primary navigation menu and that search form. Templates then arrange those organisms into a page-level layout structure using placeholder content, and finally pages are real instances of templates filled with real copy, real images and real data, where you test whether the system actually holds up.

I like to explain this to clients and teams as a box of LEGO bricks with a clear set of rules and patterns. You do not sculpt a brand new piece of plastic every time you want to build a house or a car. You combine the same reliable bricks in predictable ways, and when you do need a new piece, you design it so it clicks cleanly with everything else in the box.

## Why Pattern Lab makes it real

A lot of people talk about style guides, and usually what happens is someone creates a nice PDF or a static [Sketch](https://www.sketch.com/) document at the start of a project, puts it in a shared folder, and two months later nobody opens it again because the live product has already moved on.

That is why [Pattern Lab](https://patternlab.io/), the open-source tool Brad Frost built together with [Dave Olsen](https://dmolsen.com/), is so important. Instead of being a static document sitting on the side, Pattern Lab is a living front-end environment built with PHP and [Mustache](https://mustache.github.io/) templates.

Because it uses Mustache partials and JSON data, your atoms actually live inside your molecules, which actually live inside your organisms and templates. If you update a button atom or change the spacing inside a card molecule, that change automatically flows through every organism, template and page that uses it. It even includes Brad's [ish.](https://bradfrost.com/demo/ish/) viewport resizer right in the toolbar, so you can test every single pattern at random screen widths instead of just checking one desktop width and one iPhone width.

Seeing your whole interface broken down in a real browser like this changes how you design. You stop making one-off visual decisions for a single page and start asking: "Does this pattern belong in our system, and how will it behave everywhere else?"

## Scaling across teams of designers and developers

When you are a solo designer building a five-page brochure site, you can probably keep the whole interface in your head. The moment you have a team with three designers and six developers working on a growing product, keeping things in your head falls apart fast.

I have seen the exact same thing happen in medium and large companies over and over again. One developer builds a modal window for the account settings page. Two months later, another developer needs a confirmation dialog on the checkout flow, does not know the first modal exists (or cannot easily reuse its CSS), and writes a brand new one from scratch. Meanwhile, a designer working on a new marketing landing page creates a slightly different button radius and a third shade of blue.

Before anyone notices, the codebase has four different dropdowns, six card styles that are 90% identical, and thousands of lines of custom CSS fighting each other.

A shared atomic pattern library solves this at the root. Both designers and developers look at the exact same living catalog of components and speak the same language. When a new feature comes in, the first step is checking what molecules and organisms we already have, not reinventing them.

## Better QA, easier maintenance and fewer bugs

This systemic mindset really pays off once the product is in production and needs to be maintained over years.

Think about QA testing. If your site has ten custom-coded forms scattered across ten different templates, your QA team has to test every single one of them across browsers and devices every time something changes, and fixing a bug in one place leaves the other nine broken.

When those ten forms are all built from the same tested input atoms and form molecules, you fix a bug or an accessibility issue once and every screen that uses that pattern gets the fix automatically. Your QA surface shrinks, the number of weird visual regressions drops, and onboarding a new developer or designer onto the project becomes way faster because the rules are right there in front of them.

The same applies to complexity. Whether you are designing a simple notification banner or a massive enterprise dashboard with filters, tables, sidebars and charts, breaking the problem down into small, predictable pieces keeps the whole system under control.

## The only real way for medium and large products

Small agencies and solo freelancers can get away with crafting custom one-off pages for a while, though even on smaller projects thinking in patterns saves a ton of time.

For medium and large companies building real digital products that have to grow, evolve and stay consistent across multiple teams, I really believe an atomic, systemic approach is the only solution that holds up over time. Designing pages one by one simply does not scale anymore. Designing systems of reusable parts does.
