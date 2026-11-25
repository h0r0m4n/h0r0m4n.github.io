---
title: Moving the heavy lifting to the browser with ES6, AngularJS and Webpack
description: Why shifting UI rendering and interaction logic from traditional PHP servers to client-side JavaScript makes web apps feel faster, and how ES6, AngularJS and Webpack fit into my 2015 workflow.
category: Development
date: 2015-10-20
---

For most of my career, building a dynamic website followed the same classic pattern: the server did almost all the work. Whether I was working with [WordPress](/blog/wordpress-custom-post-types-and-advanced-custom-fields/) or [Kirby](/blog/falling-in-love-with-kirby-cms-and-why-i-prefer-it-to-wordpress/), [PHP](https://www.php.net/) queried the data, assembled the entire HTML document on the server, and sent a fresh page back to the browser on every single click.

That model still works great for blogs and content sites. Lately though, as web projects feel more and more like full applications, I have been pushing the heavy lifting into the browser with JavaScript instead of making the server regenerate HTML for every small interaction.

## Why letting the browser do more work makes sense

Think about a typical product catalog or dashboard built the traditional PHP way. The user clicks a category filter, sorts by price, or moves to page two. Each action sends a request back to the PHP server, runs a query, renders the whole header, sidebar, footer and grid from scratch, and forces a full browser reload. Even on a fast server, that constant round-trip makes the interface feel sluggish, and the server ends up burning CPU cycles rendering the exact same layout chrome over and over for every visitor.

When you move that heavy lifting to client-side JavaScript, the division of labor becomes much cleaner. PHP (or whatever back-end you use) stops worrying about HTML markup and just returns lightweight [JSON](https://www.json.org/) data from a simple API endpoint.

Once the browser has that data, JavaScript handles filtering, sorting, searching, form validation and view updates right on the user's machine. Modern laptops and smartphones have plenty of power for this, the server load drops dramatically, and the interface responds instantly without flashing a blank white page on every click.

## Writing cleaner client-side code with AngularJS and ES6

Over the last couple of years [AngularJS](https://angularjs.org/) became my go-to framework for structuring these client-side interfaces. Having two-way data binding, reusable directives, services and client-side routing made it way easier to keep complex front-end apps organized instead of ending up with a giant tangle of jQuery callbacks.

What really changed my day-to-day JavaScript this year though is [ECMAScript 2015 (ES6)](http://www.ecma-international.org/ecma-262/6.0/), which was officially finalized in June. Features like `const` and `let`, arrow functions, template literals, classes and native `import`/`export` modules finally make JavaScript feel like a real, clean language for large front-end codebases.

Pairing ES6 classes and modules with AngularJS makes controllers and services much easier to read:

```js
// projects.controller.js
export default class ProjectsController {
  constructor(ProjectsService) {
    this.search = '';
    this.projects = [];

    ProjectsService.getAll().then((items) => {
      this.projects = items;
    });
  }

  get filteredProjects() {
    const query = this.search.toLowerCase();
    return this.projects.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
  }
}

ProjectsController.$inject = ['ProjectsService'];
```

Instead of hitting PHP every time the user types a letter into the search box, the filtering happens live in memory at 60 frames per second.

## Why Webpack became essential with ES6

There is one obvious catch with writing ES6 right now: browsers do not natively support ES6 modules or all the new syntax yet. If you just drop `import` and `class` straight into a `<script>` tag, it will break in most browsers.

For a while I tried gluing things together with [Grunt](https://gruntjs.com/) and [Gulp](https://gulpjs.com/) tasks, concatenating files in a fragile manual order. Moving to [Webpack](https://webpack.github.io/) together with [Babel](https://babeljs.io/) (which was renamed from 6to5 earlier this year) solved that completely.

Webpack understands my `import` and `export` statements, follows the entire dependency graph starting from a single entry file, passes everything through `babel-loader` to compile ES6 down to standard ES5 that runs everywhere, and outputs one clean bundle for the browser:

```js
// webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};
```

Yes, setting up [npm](https://www.npmjs.com/), Webpack and Babel takes a bit more effort upfront compared to dropping a single `<script>` tag into a PHP template. Once it is wired up though, you get real modular JavaScript, clean ES6 syntax today, and a single optimized bundle without manually managing twenty script tags in your HTML.

## Not every site needs it, but for web apps it wins

I am not saying you should throw away PHP or server-rendered HTML for every small brochure site or blog. When a page is mostly static text, sending clean HTML straight from the server is still the simplest and most accessible choice.

For interactive dashboards, search-heavy catalogs and real web applications though, letting the server serve clean JSON while ES6, AngularJS and Webpack handle the heavy lifting in the browser is a massive step forward. Users get a faster, smoother experience, and our front-end code finally has the structure it deserves.
