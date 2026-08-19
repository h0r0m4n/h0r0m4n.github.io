---
title: Design System for the Web
description: Developed a Design System, unifying 10+ SaaS interfaces into a cohesive, efficient user experience, enhancing usability and consistency.
client: SIAE
css:
  primary: '#fff'
  secondary: '#2A97DF'
  tertiary: '#2A97DF'
  neutral1: 'rgba(255, 255, 255, 0.5)'
  neutral2: 'rgba(255, 255, 255, 0.25)'
  neutral3: 'rgba(255, 255, 255, 0.12)'
  neutral4: 'rgba(255, 255, 255, 0.06)'
  thumbnailHover: 'rgba(255, 255, 255, 0.12)'
  colorBackground: '#242e44'
role: Lead Designer
roles:
  - User Experience Design
  - User Iterface Design
  - Design Systems
  - Icon Design
  - Design Thinking
  - Responsive Design
  - Mobile First Design
  - Agile
  - WCAG
platform: Web
date: 2021-06-24
finished: true
thumbnail: src/static/work/siae-design-system.jpg
thumbnailRatio: 4-3
---

## Problem Statement

SIAE, a leading Italian non-profit organisation, had experienced rapid growth, expanding its service offerings to over ten distinct SaaS products. As the company scaled, it faced a growing challenge: a need for more consistency across its digital experiences. Each service had its unique look and feel, leading to confusion and frustration for users. This fragmentation also hindered the efficiency of the design and development teams, who needed help to maintain and scale the growing product portfolio.

## Discovery & Initial Assessment

To address this issue, I conducted user research to understand the impact of the inconsistent design on user experience.

{% image "src/static/work/siae-design-system-workshop.jpg" "" "Some workshops and meetings that brought together representatives from different disciplines." %}

The findings revealed that the fragmented interfaces made it difficult for users to navigate between services and understand the brand identity. This inconsistency also created challenges for the development team, leading to increased time spent on repetitive tasks and a higher risk of errors.

## Designing a Solution

Based on the research findings, I proposed the creation of a Design System, a centralised repository of reusable components, patterns, and guidelines that would ensure consistency across all SIAE products. This approach would improve the user experience and streamline the design and development processes.

### Design Library

I needed to reframe the problem into something our design and engineering understand more: collecting all the existing components into a spreadsheet that eventually handed over 200 unique components from all the SIAE services.

Each component has been categorized, segmented, and labelled for each template and service.

{% image "src/static/work/siae-design-system-components-list.jpg" "" "This was the inventory spreadsheet that grouped around 200+ unique components across essential product flows." %}

The most important part of the design was to create a consistent visual language across all SIAE services. This included a new colour palette, typography and iconography. Working closely with SIAE's brand guidelines we start to develop a new identity system.

Based on the existing components and collaboration with the SIAEs brand, I led the redesign of each component. A design library made of reusable components is what I, with my team, built. This helped us maintain and update UI changes as quickly as possible. And it become a great communication tool for the engineering team since each component included its properties and all necessary states such as hover, focus and more.

{% stats "Previous Typography System" "33 styles" "New Typography System" "14 styles" "" "" "" "" %}
{% stats "Previous Colour System" "21 colours" "New Colour System" "14 colours" "" "" "" "" %}

{% image "src/static/work/siae-sass-figma-library.jpg" "" "Overview of the new components designed in Figma utilising all the features such as properties, auto layout and much more." %}

### Prototyping

Thanks to the Design Library, it was possible to significantly increase the redesigned speed of each SIAE service by using components from its components library. This approach allowed us to better communicate the look and feel of a new design while focusing on each component's functionality.

{% stats "Components" "200+" "Prototypes" "25+" "Less time spent on prototypes" "-80%" "" "" %}

I was able to create interactive prototypes that were tested with real users. These prototypes were often used as part of an agile sprint and allowed us to iterate on each service rapidly.

{% image "src/static/work/siae-design-system-prototypes.jpg" "" "An overview of the complexity of the prototype." %}

This provided several benefits:

- The consistency improved dramatically between each service.
- Less time was spent on the prototypes thanks to the Atomic Design methodology.
- Using multiple Figma libraries allowed us to make changes on the fly.

{% image-big "src/static/work/siae-design-system-1.jpg" "" "The page features an advanced table component design meticulously crafted and tailored to meet the specific needs of SIAE's customers." %}
{% image-big "src/static/work/siae-design-system-2.jpg" "" "The news article template emphasizes a long-form approach, incorporating strategically placed image regions to enhance visual engagement." %}
{% image-big "src/static/work/siae-design-system-3.jpg" "" "The logged-in homepage displays an array of available services." %}
{% image-big "src/static/work/siae-design-system-4.jpg" "" "The news page hosts various collections of articles and a dedicated press room section." %}
{% image-big "src/static/work/siae-design-system-5.jpg" "" "The homepage, created in collaboration with the marketing team, is tailored for logged-out users." %}

## Challenges & Solutions

The implementation of the Design System presented several challenges. First, gathering and organising the vast amount of existing components and patterns across the ten different services was essential. This required careful categorisation, standardisation, and documentation of each element.

Second, we had to establish a consistent visual language across all SIAE products. This involved defining a new colour palette, typography system, and iconography while ensuring these elements adhered to SIAE's brand guidelines.

Third, we needed a user-friendly documentation website to make the Design System accessible to designers and developers. This website would explain each component, its usage, and its properties.

### Documentation website

Collaborating with several stakeholders and the rest of the team, I led the writing of the documentation to showcase and explain the SIAE’s design system, components, page templates, workflows and branding guidelines. The technological stack (to use industry parlance) was as follows:

- GitHub for code repository and versioning
- 11ty as file static-generator

#### Design Tokens

Design tokens are a key element in ensuring consistency across multiple platforms and products. They allow you to abstract the values for colors, typography, spacing, and other design elements into a centralized system. This approach not only makes updates easier but also ensures that any changes propagate consistently across all products.

##### Colour Tokens

```json
{
  "color": {
    "on-light": {
      "1": "rgb(42, 58, 84)",
      "2": "rgba(42, 58, 84, 80%)",
      "3": "rgba(42, 58, 84, 70%)",
      …
    },
    "on-dark": {
      "1": "rgb(255, 255, 255)",
      "2": "rgba(255, 255, 255, 80%)",
      "3": "rgba(255, 255, 255, 70%)",
      …
    },
    "brand": {
      "1": "rgb(10, 108, 174)",
      "2": "rgba(10, 108, 174, 75%)",
      "3": "rgba(10, 108, 174, 50%)",
      …
    },
    "semantics": {
      "success": "rgb(10, 132, 0)",
      "danger": "rgb(226, 14, 14)",
      "warning": "rgb(233, 110, 0)",
      …
    }
  }
}
```

##### Typography Tokens

```json
{
  "font": {
    "family": "'IBM Plex Sans Condensed', sans-serif",
    "line-height": {
      "1": "1",
      "2": "1.2",
      "3": "1.5",
      …
    },
    "size": {
      "1": "56px",
      "2": "48px",
      "3": "38px",
      …
    }
  }
}
```

##### Spacing Tokens

```json
{
  "spacing": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    …
  }
}
```

##### Parcing

With the engineering team, we decided that our design tokens would be stored in JSON, which can be easily parsed and transformed into various formats, such as CSS, Sass, XML, and more, making them incredibly versatile. This flexibility allowed different teams within an organisation and me to use the same design tokens in the format that best suits their workflow, ensuring consistency and reducing the risk of errors.

So this JSON:

```json
{
  "color": {
    "on-light": {
      "1": "rgb(42, 58, 84)",
      "2": "rgba(42, 58, 84, 80%)",
      "3": "rgba(42, 58, 84, 70%)",
      …
    }
  }
}
```

can be converted easily in this CSS:

```css
:root {
  --color-on-light-1: rgb(42, 58, 84);
  --color-on-light-2: rgba(42, 58, 84, 80%);
  --color-on-light-3: rgba(42, 58, 84, 70%);
  …
}
```

or Sass:

```css
$color-on-light-1: rgb(42, 58, 84);
$color-on-light-2: rgba(42, 58, 84, 80%);
$color-on-light-3: rgba(42, 58, 84, 70%);
…
```

#### Design principles

Contain specific information regarding the visual references and design principles for creating interfaces or other design deliverables. This section focuses on branding (colours, typography, trademarks, logos and more). It also covers guidance on content such as tone of voice and language recommendations.

{% video-large "siae-design-system-1" "" "Overview of our design principles (in italian language)" %}

#### Guidelines

The guidelines section contains valuable information on iconography and essential components such as interactive areas, buttons, lists and much more.

{% video-large "siae-design-system-2" "" "Overview of components" %}

#### Models

The models cover groups of components joined together to form a relatively complex and distinct section of an interface.

{% video-large "siae-design-system-3" "" "Overview of models" %}

#### Templates

Templates explain how to keep the patterns consistent with the rest of the products and demonstrate the critical templates used in SIAE services.

{% video-large "siae-design-system-4" "" "Overview of SaaS templates" %}
{% video-large "siae-design-system-5" "" "Overview of generic page templates" %}

## Implementation & Timeline

The development of the SIAE Design System took approximately twelve months, involving collaboration between the design, development, and marketing teams. I conducted regular workshops and meetings to ensure all stakeholders were aligned on the system's goals and implementation.

## Results & Impact

Implementing the SIAE Design System has had a positive impact on the organisation. It has achieved the following key objectives:

1. **Enhanced User Experience**: The consistent design across all products has led to a more intuitive and consistent user experience, improving the overall brand perception and user satisfaction.
2. **Increased Efficiency**: The Design System has streamlined the design and development processes, reducing the time spent on repetitive tasks and increasing the speed of product development. This has also led to improved code quality and reduced development errors.
3. **Reduced Costs**: Standardizing components and patterns has reduced the need for custom development, leading to cost savings. The improved efficiency has also freed up resources to focus on more strategic initiatives.
4. **Enhanced Brand Identity**: The consistent visual language has reinforced SIAE's brand identity across all products, strengthening its brand recognition and reputation.

Besides the adoption of design systen, there were a few other significant results:

{% stats "Registration flow had a better conversion, with new customers increasing up to" "30%" "Completions of new depots using design system guides and components increased by up to" "73%" "" "" %}

## Learnings & Recommendations

Throughout the project, I learned several valuable lessons that I would recommend to other teams doing similar work:

1. **Prioritize Collaboration**: Collaboration between designers, developers, and marketing teams is crucial for successfully implementing a Design System. This ensures that all stakeholders are aligned on the goals and objectives of the system.
2. **Embrace Flexibility**: A rigid approach to enforcing the Design System can lead to resistance and hinder adoption. It's essential to be flexible and allow for some customisation to accommodate specific product needs and requirements.
3. **Document Thoroughly**: A well-documented Design System is essential for its adoption and effective use. Clear documentation should be readily accessible to both designers and developers.
4. **Continuously Refine**: The Design System should be an evolving entity that adapts to the changing needs of the organisation and the evolving user landscape. Regular reviews and updates are necessary to maintain its relevance and effectiveness.
