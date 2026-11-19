---
title: First impressions with the iPhone 3GS and the mobile web
description: After using my first iPhone for a few weeks, from Skype and Maps to Safari, I think mobile interfaces are the future, even if the mobile web right now is in pretty bad shape.
category: Mobile Design
date: 2009-09-18
---

A few weeks ago I bought my first iPhone, an iPhone 3GS. I knew it was going to be a nice phone, of course, but using it every day actually changed how I think about mobile devices and interfaces.

Until recently a phone was just for calls, SMS and maybe checking emails when you really had no choice. With a good touch screen, 3G and the App Store, the iPhone feels more like a tiny computer that you always have in your pocket.

## Skype and Maps on the go

Two apps in particular surprised me right away because they are genuinely useful in daily life.

The first one is Skype. I started using it for work when I am away from the computer, replying to chat messages on the go and even taking calls whenever I am on Wi-Fi. Several of my colleagues were honestly surprised that I could reply to messages and jump on calls while outside the office.

The second one is Maps. Having GPS together with the digital compass on the 3GS makes finding places around the city so much easier. Once you get used to it, going back to normal paper maps or printing directions before leaving home feels very old.

## Safari is my most used app, and the mobile web is in trouble

Even with all the apps on the App Store, the app I open the most every day is still Safari. And that is where you really see how dramatic the situation of the web on mobile is right now.

Mobile Safari is great and pinch-to-zoom works surprisingly well, so you can technically open almost any website. In reality though, almost all websites are built only for desktop screens (usually around 960px wide) and only a very small number have a "special" mobile or iPhone version on a separate domain like `m.` or `iphone.`.

On a 3.5-inch screen, browsing normal desktop sites gets tiring very fast:

- You are constantly zooming in and out and scrolling sideways just to read a paragraph or find the menu.
- Small links and menus that depend on mouse `:hover` are really annoying to tap with a finger.
- Whenever a site still uses Flash, Mobile Safari just shows an empty box.

In my opinion mobile interfaces are clearly the future. There will be more and more people browsing from phones like this, so we really need to start investing in interfaces that actually work well on these devices.

## Native apps vs web standards

Looking at how bad most websites feel on a phone today, building a native iPhone app with Objective-C and the iPhone SDK looks like the most logical choice. Native apps run fast, feel right at home on iPhone OS 3 and are easy for users to find in the App Store.

Still, from a practical point of view I am not completely convinced this is sustainable for most projects. Having a website plus a separate native app (or even a separate mobile website) means managing two different repositories, two builds, two deploy processes and supporting everything over time. It quickly becomes complicated and especially expensive. And it won't stop at iPhone either, because Android, BlackBerry, Nokia and Palm WebOS are all out there too.

Personally, I still believe much more in web standards. There should be a way on the web to make normal websites adapt properly to phones without having to build dedicated mobile versions or separate native apps for every platform. We are not really there yet, but I hope web standards move in that direction soon, because right now browsing the web on a phone needs a lot of work.
