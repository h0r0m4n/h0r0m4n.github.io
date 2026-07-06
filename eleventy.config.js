import siteData from './src/_data/site.js';

import outdent from 'outdent';
import path from 'path';
import Image from '@11ty/eleventy-img';
import { DateTime } from 'luxon';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';

export default function (eleventyConfig) {
    // Copy
    const passthroughCopies = [
        {"src/static/fonts": "/static/fonts"},
        {"src/static/assets": "/static/assets"},
        {"src/static/work/*.mp4": "/static/work"},
        {"src/static/testimonials": "/static/testimonials"},
        {"src/static/books": "/static/books"},
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

    eleventyConfig.addFilter('permalinkNotFalse', (items) => {
        return items.filter(item => {
            return (item.data.permalink !== false)
        })
    });

    eleventyConfig.addFilter('base64', (str) => {
        return Buffer.from(str.toString()).toString('base64');
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
        if (siteData.startingDate) {
            return DateTime.fromISO(siteData.startingDate).startOf('day');
        } else if (siteData.starting) {
            const startYear = siteData.starting;
            const startMonth = siteData.startingMonth || 1;
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

    async function getPictureMarkup(src, alt, widths, urlPath, outputDir, decoding = 'async', sizes = '(min-width: 50rem) 50rem, 100vw') {
        const resetColor = "\x1b[0m";
        const fgCyan = "\x1b[36m";
        console.log(`[eleventy-img]${fgCyan} Processing ${src}...${resetColor}`);
        
        let stats = await Image(src, {
            widths,
            formats: ["jpeg", "webp", "avif"],
            sharpJpegOptions: { quality: 85 },
            sharpWebpOptions: { quality: 80 },
            sharpAvifOptions: { quality: 65 },
            filenameFormat: function (id, src, width, format, options) {
                const extension = path.extname(src);
                const name = path.basename(src, extension);
                return `${name}-${width}w.${format}`;
            },
            urlPath,
            outputDir,
        });

        let lowestSrc = stats["jpeg"][0];
        let largestSrc = stats["jpeg"][stats["jpeg"].length - 1];

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
            decoding="${decoding}"
            alt="${alt || ''}"
            src="${lowestSrc.url}"
            sizes='${sizes}'
            srcset="${srcset["jpeg"]}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}">`;

        return { sourceAVIF, sourceWEBP, img, largestSrc };
    }

    // Work image
    // Usage: {% image "src/static/work/file-name.jpg" "My alt…" "My caption…" %}
    eleventyConfig.addShortcode('image', async (src, alt, caption) => {
        const { sourceAVIF, sourceWEBP, img, largestSrc } = await getPictureMarkup(src, alt, [960, 1280, 1920, 2560], "/static/work", "./dist/static/work", 'async', '(min-width: 93.75rem) 84rem, (min-width: 75rem) 68rem, (min-width: 50rem) 68rem, 100vw');

        return outdent`
            <figure class="large">
                <a href="${largestSrc.url}" data-fancybox="gallery" ${caption ? `data-caption="${caption}"` : ``} class="t__hover t__hover--2" style="display: block;">
                    <picture>
                        ${sourceAVIF}
                        ${sourceWEBP}
                        ${img}
                    </picture>
                </a>
                ${caption ? `<figcaption class="t__container">${caption}</figcaption>` : ``}
            </figure>
        `;
    });

    // Work image full-width
    // Usage: {% image-big "src/static/work/file-name.jpg" "My alt…" "My caption…" %}
    eleventyConfig.addShortcode('image-big', async (src, alt, caption) => {
      const { sourceAVIF, sourceWEBP, img, largestSrc } = await getPictureMarkup(src, alt, [1920, 2560, 3840, 5120], "/static/work", "./dist/static/work", 'async', '100vw');

      return outdent`
          <figure class="full">
              <a href="${largestSrc.url}" data-fancybox="gallery" ${caption ? `data-caption="${caption}"` : ``} class="t__hover t__hover--2" style="display: block;">
                  <picture>
                      ${sourceAVIF}
                      ${sourceWEBP}
                      ${img}
                  </picture>
              </a>
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
  
        const { sourceAVIF, sourceWEBP, img } = await getPictureMarkup(
          imageSrc, 
          alt ? `${alt} - Slide ${i}` : `Slide ${i}`, 
          [960, 1280, 1920, 2560], 
          "/static/work", 
          "./dist/static/work"
        );
  
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
        const { sourceAVIF, sourceWEBP, img } = await getPictureMarkup(src, alt, [960, 1280, 2560], "/static/work", "./dist/static/work", "sync", '(min-width: 93.75rem) 25vw, (min-width: 50rem) 50vw, 100vw');

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
      const { sourceAVIF, sourceWEBP, img, largestSrc } = await getPictureMarkup(src, caption, [960, 1280, 2560], "/static/work", "./dist/static/work", "sync", '(min-width: 50rem) 50vw, 100vw');
  
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
        const { sourceAVIF, sourceWEBP, img } = await getPictureMarkup(src, alt, [160, 240, 320], "/static/work", "./dist/static/work", 'async', '160px');

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
        const { sourceAVIF, sourceWEBP, img } = await getPictureMarkup(src, alt, [64, 96, 128], "/static/testimonials", "./dist/static/testimonials", 'async', '64px');

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
