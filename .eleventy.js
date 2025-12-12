const global = require('./src/_data/site');
const outdent = require('outdent');
const path = require('path');
const Image = require('@11ty/eleventy-img');
const { DateTime } = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
    // Copy
    const passthroughCopies = [
        {"src/static/fonts": "/static/fonts"},
        {"src/static/assets": "/static/assets"},
        {"src/static/work/*.mp4": "/static/work"},
        {"src/static/testimonials": "/static/testimonials"},
        {"src/static/books": "/static/books"},
        {"src/js": "/js"},
        "src/*.{png,svg,ico}",
        "src/site.webmanifest",
        "src/robots.txt",
        "src/CNAME"
    ];
    passthroughCopies.forEach(copy => eleventyConfig.addPassthroughCopy(copy));

    // Watch
    eleventyConfig.addWatchTarget('./src/sass/');

    // Collections
    eleventyConfig.addCollection('work', function(collectionApi) {
        return collectionApi.getFilteredByGlob('src/work/**/*.md').reverse();
    });

    // Get the first `n` elements of a collection
    eleventyConfig.addFilter('head', (array, n) => {
        if (n < 0) {
            return array.slice(n);
        }
    
        return array.slice(0, n);
    });

    // Exclude items with permalink set to false
    eleventyConfig.addFilter('permalinkNotFalse', (items) => {
        return items.filter(item => {
            return (item.data.permalink !== false)
        })
    });

    eleventyConfig.addFilter('year', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc'} ).get('year');
    });

    // Stats short-code
    // Usage: {% stats "Label 1" "Value 1" "Label 2" "Value 2" "Label 3" "Value 3" "Label 4" "Value 4" %}
    eleventyConfig.addShortcode('stats', function(label1, value1, label2, value2, label3, value3, label4, value4) {
        return outdent`
            <div class="stats">
                ${label1 ? `<p><span class="title">${label1}</span><span class="value">${value1}</span></p>` : ``}
                ${label2 ? `<p><span class="title">${label2}</span><span class="value">${value2}</span></p>` : ``}
                ${label3 ? `<p><span class="title">${label3}</span><span class="value">${value3}</span></p>` : ``}
                ${label4 ? `<p><span class="title">${label4}</span><span class="value">${value4}</span></p>` : ``}
            </div>
        `;
    });

    // Year short-code
    eleventyConfig.addShortcode('year', function() {
        return `${new Date().getFullYear()}`;
    });

    // Experience (years-only) helper and shortcodes
    const getStartDate = () => {
        if (global.startingDate) {
            return DateTime.fromISO(global.startingDate).startOf('day');
        } else if (global.starting) {
            const startYear = global.starting;
            const startMonth = global.startingMonth || 1;
            return DateTime.fromObject({ year: startYear, month: startMonth, day: 1 });
        }

        return DateTime.fromObject({ year: DateTime.now().year, month: 1, day: 1 });
    };

    const formatYearsOnly = () => {
        const start = getStartDate();
        const now = DateTime.now();
        const diff = now.diff(start, ['years']).toObject();
        const years = Math.floor(diff.years || 0);

        return `${years} ${years === 1 ? 'year' : 'years'}`;
    };

    eleventyConfig.addShortcode('experienceYears', formatYearsOnly);
    // Backwards-compatible alias (keeps templates working if they use `experience`)
    eleventyConfig.addShortcode('experience', formatYearsOnly);

    // Post video
    // Usage: {% video "my-video" "My caption…" %}
    eleventyConfig.addShortcode('video', function(src, autoplay, caption) {
        return outdent`
            <figure>
                <video width="960" height="540" controls muted ${autoplay ? `autoplay` : ``} playsinline disablePictureInPicture>
                    <source src="/static/work/${src}.mp4" type="video/mp4">
                </video>
                ${caption ? `<figcaption class="t__container">${caption}</figcaption>` : ''}
            </figure>
        `;
    });

    // Work image
    // Usage: {% image "src/static/work/file-name.jpg" "My alt…" "My caption…" %}
    eleventyConfig.addShortcode('image', async (src, alt, caption) => {

        let stats = await Image(src, {
            widths: [960, 1280, 1920, 2560],
            formats: ["jpeg", "webp", "avif"],
            sharpOptions: { quality: 90 },
            filenameFormat: function (id, src, width, format, options) {
                const extension = path.extname(src);
                const name = path.basename(src, extension);

                return `${name}-${width}w.${format}`;
            },
            urlPath: "/static/work",
            outputDir: "./dist/static/work",
        });
    
        let lowestSrc = stats["jpeg"][0];
    
        const srcset = Object.keys(stats).reduce(
            (acc, format) => ({
                ...acc,
                [format]: stats[format].reduce(
                    (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                    ""
                ),
            }),
            {}
        );
    
        const sourceAVIF = `<source type="image/avif" srcset="${srcset["avif"]}" >`;
        const sourceWEBP = `<source type="image/webp" srcset="${srcset["webp"]}" >`;
    
        const img = `<img
            loading="lazy"
            decoding="async"
            alt="${alt}"
            src="${lowestSrc.url}"
            sizes='(min-width: 40rem) 50rem, (min-width: 75rem) 50rem, (min-width: 92rem) 50rem'
            srcset="${srcset["jpeg"]}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}">`;

        return outdent`
            <figure class="large">
                <picture>
                    ${sourceAVIF}
                    ${sourceWEBP}
                    ${img}
                </picture>
                ${caption ? `<figcaption class="t__container">${caption}</figcaption>` : ``}
            </figure>
        `;
    });

    // Work image full-width
    // Usage: {% image-big "src/static/work/file-name.jpg" "My alt…" "My caption…" %}
    eleventyConfig.addShortcode('image-big', async (src, alt, caption) => {

      let stats = await Image(src, {
          widths: [1920, 2560, 3840, 5120],
          formats: ["jpeg", "webp", "avif"],
          sharpOptions: { quality: 90 },
          filenameFormat: function (id, src, width, format, options) {
              const extension = path.extname(src);
              const name = path.basename(src, extension);

              return `${name}-${width}w.${format}`;
          },
          urlPath: "/static/work",
          outputDir: "./dist/static/work",
      });
  
      let lowestSrc = stats["jpeg"][0];
  
      const srcset = Object.keys(stats).reduce(
          (acc, format) => ({
              ...acc,
              [format]: stats[format].reduce(
                  (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                  ""
              ),
          }),
          {}
      );
  
      const sourceAVIF = `<source type="image/avif" srcset="${srcset["avif"]}" >`;
      const sourceWEBP = `<source type="image/webp" srcset="${srcset["webp"]}" >`;
  
      const img = `<img
          loading="lazy"
          decoding="async"
          alt="${alt}"
          src="${lowestSrc.url}"
          sizes='(min-width: 40rem) 50rem, (min-width: 75rem) 50rem, (min-width: 92rem) 50rem'
          srcset="${srcset["jpeg"]}"
          width="${lowestSrc.width}"
          height="${lowestSrc.height}">`;

      return outdent`
          <figure class="full">
              <picture>
                  ${sourceAVIF}
                  ${sourceWEBP}
                  ${img}
              </picture>
              ${caption ? `<figcaption class="t__container">${caption}</figcaption>` : ``}
          </figure>
      `;
    });

    // Work carousel
    // Usage: {% carousel "src/static/work/file-name-1.jpg" "6" "My caption…" %}
    eleventyConfig.addAsyncShortcode('carousel', async (src, count, alt) => {
      const generateUniqueId = () => 'carousel-' + Math.random().toString(36).substr(2, 9);
      const id = generateUniqueId();
      let images = [];
  
      for (let i = 1; i <= count; i++) {
        let imageSrc = src.replace(/-1(\.[\w\d_-]+)$/i, `-${i}$1`);
  
        let stats = await Image(imageSrc, {
          widths: [960, 1280, 1920, 2560],
          formats: ["jpeg", "webp", "avif"],
          sharpOptions: { quality: 90 },
          filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src);
            const name = path.basename(src, extension);
            return `${name}-${width}w.${format}`;
          },
          urlPath: "/static/work",
          outputDir: "./dist/static/work",
        });
  
        let lowestSrc = stats["jpeg"][0];
  
        const srcset = Object.keys(stats).reduce(
          (acc, format) => ({
            ...acc,
            [format]: stats[format].reduce(
              (_acc, curr) => `${_acc} ${curr.srcset} ,`,
              ""
            ),
          }),
          {}
        );
  
        const sourceAVIF = `<source type="image/avif" srcset="${srcset["avif"]}" >`;
        const sourceWEBP = `<source type="image/webp" srcset="${srcset["webp"]}" >`;
  
        const img = `<img
          loading="lazy"
          decoding="async"
          alt="${alt ? `${alt} - Slide ${i}` : `Slide ${i}`}"
          src="${lowestSrc.url}"
          sizes='(min-width: 40rem) 50rem, (min-width: 75rem) 50rem, (min-width: 92rem) 50rem'
          srcset="${srcset["jpeg"]}"
          width="${lowestSrc.width}"
          height="${lowestSrc.height}">`;
  
        images.push(outdent`
          <picture class="f-carousel__slide">
            ${sourceAVIF}
            ${sourceWEBP}
            ${img}
          </picture>
        `);
      }
  
      return outdent`
        <figure id="${id}" class="f-carousel large">
          ${images.join('\n')}
        </figure>
      `;
    });

    // Work thumbnail
    // Usage: {% thumbnail "static/work/file-name.jpg" "My alt…" "16:10" %}
    eleventyConfig.addNunjucksAsyncShortcode('thumbnail', async (src, alt, ratio) => {

        let stats = await Image(src, {
            widths: [960, 1280, 2560],
            formats: ["jpeg", "webp", "avif"],
            sharpOptions: { quality: 90 },
            filenameFormat: function (id, src, width, format, options) {
                const extension = path.extname(src);
                const name = path.basename(src, extension);

                return `${name}-${width}w.${format}`;
            },
            urlPath: "/static/work",
            outputDir: "./dist/static/work",
        });
    
        let lowestSrc = stats["jpeg"][0];
    
        const srcset = Object.keys(stats).reduce(
            (acc, format) => ({
                ...acc,
                [format]: stats[format].reduce(
                    (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                    ""
                ),
            }),
            {}
        );

        const sourceAVIF = `<source type="image/avif" srcset="${srcset["avif"]}" >`;
        const sourceWEBP = `<source type="image/webp" srcset="${srcset["webp"]}" >`;
    
        const img = `<img
            loading="lazy"
            decoding="sync"
            alt="${alt}"
            src="${lowestSrc.url}"
            sizes='(min-width: 40rem) 50rem, (min-width: 75rem) 50rem, (min-width: 92rem) 50rem'
            srcset="${srcset["jpeg"]}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}">`;

        return outdent`
            <picture class="t__card__image t__ratio t__ratio--${ratio}">
                ${sourceAVIF}
                ${sourceWEBP}
                ${img}
            </picture>
        `;
    });

    // Work lightbox
    // Usage: {% lightbox "static/work/file-name.jpg" "Gallery 1" "Caption 1" "16:10" %}
    eleventyConfig.addNunjucksAsyncShortcode('lightbox', async (src, galleryName, caption, ratio) => {
      let stats = await Image(src, {
          widths: [960, 1280, 2560],
          formats: ["jpeg", "webp", "avif"],
          sharpOptions: { quality: 90 },
          filenameFormat: function (id, src, width, format, options) {
              const extension = path.extname(src);
              const name = path.basename(src, extension);
              return `${name}-${width}w.${format}`;
          },
          urlPath: "/static/work",
          outputDir: "./dist/static/work",
      });
  
      let largestSrc = stats["jpeg"][stats["jpeg"].length - 1];
      let lowestSrc = stats["jpeg"][0];
  
      const srcset = Object.keys(stats).reduce(
          (acc, format) => ({
              ...acc,
              [format]: stats[format].reduce(
                  (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                  ""
              ),
          }),
          {}
      );
  
      const sourceAVIF = `<source type="image/avif" srcset="${srcset["avif"]}" >`;
      const sourceWEBP = `<source type="image/webp" srcset="${srcset["webp"]}" >`;
  
      const img = `<img
          loading="lazy"
          decoding="sync"
          alt="${caption}"
          src="${lowestSrc.url}"
          sizes='(min-width: 40rem) 50rem, (min-width: 75rem) 50rem, (min-width: 92rem) 50rem'
          srcset="${srcset["jpeg"]}"
          width="${lowestSrc.width}"
          height="${lowestSrc.height}">`;
  
      return outdent`
          <a href="${largestSrc.url}" data-fancybox="${galleryName}" data-caption="${caption}" class="t__hover t__hover--2">
              <picture class="t__card__image t__ratio t__ratio--${ratio}">
                  ${sourceAVIF}
                  ${sourceWEBP}
                  ${img}
              </picture>
          </a>
      `;
    });

    // Book cover
    // Usage: {% book "static/file-name.jpg" "My alt…" %}
    eleventyConfig.addNunjucksAsyncShortcode('book', async (src, alt) => {

        let stats = await Image(src, {
            widths: [160, 240, 320],
            formats: ["jpeg", "webp", "avif"],
            sharpOptions: { quality: 90 },
            filenameFormat: function (id, src, width, format, options) {
                const extension = path.extname(src);
                const name = path.basename(src, extension);

                return `${name}-${width}w.${format}`;
            },
            urlPath: "/static/work",
            outputDir: "./dist/static/work",
        });
    
        let lowestSrc = stats["jpeg"][0];
    
        const srcset = Object.keys(stats).reduce(
            (acc, format) => ({
                ...acc,
                [format]: stats[format].reduce(
                    (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                    ""
                ),
            }),
            {}
        );

        const sourceAVIF = `<source type="image/avif" srcset="${srcset["avif"]}" >`;
        const sourceWEBP = `<source type="image/webp" srcset="${srcset["webp"]}" >`;
    
        const img = `<img
            loading="lazy"
            decoding="async"
            alt="${alt}"
            src="${lowestSrc.url}"
            sizes='(min-width: 40rem) 50rem, (min-width: 75rem) 50rem, (min-width: 92rem) 50rem'
            srcset="${srcset["jpeg"]}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}">`;

        return outdent`
            <picture>
                ${sourceAVIF}
                ${sourceWEBP}
                ${img}
            </picture>
        `;
    });

    // Testimonial avatar
    // Usage: {% testimonial "static/file-name.jpg" "My alt…" %}
    eleventyConfig.addNunjucksAsyncShortcode('testimonial', async (src, alt) => {

        let stats = await Image(src, {
            widths: [64, 96, 128],
            formats: ["jpeg", "webp", "avif"],
            sharpOptions: { quality: 90 },
            filenameFormat: function (id, src, width, format, options) {
                const extension = path.extname(src);
                const name = path.basename(src, extension);

                return `${name}-${width}w.${format}`;
            },
            urlPath: "/static/testimonials",
            outputDir: "./dist/static/testimonials",
        });
    
        let lowestSrc = stats["jpeg"][0];
    
        const srcset = Object.keys(stats).reduce(
            (acc, format) => ({
                ...acc,
                [format]: stats[format].reduce(
                    (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                    ""
                ),
            }),
            {}
        );

        const sourceAVIF = `<source type="image/avif" srcset="${srcset["avif"]}" >`;
        const sourceWEBP = `<source type="image/webp" srcset="${srcset["webp"]}" >`;
    
        const img = `<img
            loading="lazy"
            decoding="async"
            alt="${alt}"
            src="${lowestSrc.url}"
            sizes='(min-width: 40rem) 50rem, (min-width: 75rem) 50rem, (min-width: 92rem) 50rem'
            srcset="${srcset["jpeg"]}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}">`;

        return outdent`
            <picture>
                ${sourceAVIF}
                ${sourceWEBP}
                ${img}
            </picture>
        `;
    });

    // Enable syntax highlight
    eleventyConfig.addPlugin(syntaxHighlight);

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: '_includes',
            data: '_data'
        }
    }
}
