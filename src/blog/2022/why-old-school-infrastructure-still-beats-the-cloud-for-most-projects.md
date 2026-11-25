---
title: Why old-school infrastructure still beats the cloud for most projects
description: Inspired by DHH's essay on leaving the cloud, why owning boring in-house servers is often more cost-effective than renting from AWS, and my concern about cloud-only IT education.
category: Development
date: 2022-11-04
---

A couple of weeks ago [David Heinemeier Hansson (DHH)](https://dhh.dk/) published an essay called [Why we're leaving the cloud](https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0), explaining why [37signals](https://37signals.com/) is pulling [Basecamp](https://basecamp.com/) and [HEY](https://www.hey.com/) off [AWS](https://aws.amazon.com/) and [Google Cloud](https://cloud.google.com/) and moving back to their own hardware.

Reading it felt like a real relief. Finally I am not the only one thinking that putting everything in the cloud makes very little sense for the majority of projects.

I will be the first to admit that I am not a DevOps engineer or an infrastructure specialist. My background is in design and front-end development. Still, working closely with engineering teams and clients over the past decade, I have watched the same pattern repeat itself over and over: simple, predictable products getting wrapped in expensive, over-engineered cloud setups just because that is what everyone assumes you are supposed to do.

## "Old school" does not mean ineffective

Somewhere along the last ten years, cloud marketing did an incredible job of convincing the whole tech industry that running your own servers or using a straightforward, traditional hosting setup is somehow outdated or amateur.

As DHH points out so clearly, "the cloud" is mostly just a nicer name for renting someone else's computers at a steep markup. Paying half a million dollars a year just for managed database and search services on HEY when you could buy serious hardware and run it for years is a wild number to read out loud, and the same math plays out on smaller scales across hundreds of medium-sized companies.

Calling an in-house setup or a well-configured server "old school" misses the point completely. Boring, predictable infrastructure that you actually own and understand is often way more cost-effective, runs reliably for years without surprise monthly bills, and does not collapse just because a major AWS region has a bad afternoon.

Sure, the cloud makes total sense at the two extremes DHH mentions: tiny side projects where a managed platform like [Heroku](https://www.heroku.com/) or [Render](https://render.com/) saves you time on day one, or sudden viral traffic spikes where you genuinely do not know if you need ten servers or a hundred next week. Most businesses and web products though do not live at either extreme. They have steady, predictable traffic and a clear idea of what they need.

## A whole generation trained to default to AWS

What worries me even more than the monthly invoices is how we got to a point where nobody even questions this anymore.

Look at modern IT university degrees, coding bootcamps and online engineering courses today. So many of them are heavily built around AWS, [Azure](https://azure.microsoft.com/), Google Cloud and cloud certifications. Students learn how to wire together managed cloud services, [Kubernetes](https://kubernetes.io/) clusters and serverless functions before they have ever set up a plain Linux box, configured a web server from scratch, or seen how much traffic a single decent machine can actually handle on its own.

Whether intentional or not, that kind of education creates a whole generation of developers and architects who automatically choose and recommend the cloud as their first and only option. It is not even because they compared the numbers and decided AWS won on merit. It is simply because they have never tried, learned or operated any other kind of solution.

When your entire training teaches you to solve every problem by clicking through an AWS console, building a calm, self-hosted, in-house solution feels scary and unfamiliar, even when it would be simpler, cheaper and easier to maintain over five years.

## Questioning the default

Again, I am not pretending to be an infrastructure guru who can architect a global data center. You do not need to be a specialist to notice when an industry stops thinking critically and just follows the loudest default.

We have seen this cycle before in design and front-end too, where heavy tools and trendy stacks become mandatory just because everybody talks about them, until people pause and realize a simpler approach actually works better.

I am really glad DHH and 37signals are speaking up publicly and putting real numbers behind it. The cloud is a useful tool when you genuinely need elasticity, not a law of nature. Giving "old school" in-house solutions a fair look again makes much more sense for budgets and teams, and it is healthier for an open, decentralized web too.
