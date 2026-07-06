// Main application script
// Extracted from inline scripts for cacheability and minification
(function () {
    'use strict';

    // Read configuration from data attributes on <body>
    var body = document.body;
    var passwordHash = body.dataset.pwdHash || '';
    var isWorkPage = body.dataset.pageType === 'work';
    var isProjectsPage = body.dataset.pageType === 'projects';
    var siteUrl = body.dataset.siteUrl || '';

    // ---- Service Worker Cleanup ----
    if (window.navigator && navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations()
        .then(function(registrations) {
            registrations.forEach(function(registration) {
                registration.unregister();
            });
        });
    }

    // ---- Password Modal Logic ----
    var featuredWork = 'FeaturedWork';
    var featuredModal = document.getElementById('modal');
    var featuredClose = document.getElementById('modal-close');
    var featuredPassword = document.getElementById('modal-password');
    var featuredEnter = document.getElementById('modal-enter');
    var featuredUrl = '';

    // Close modal
    if (featuredClose) {
        featuredClose.onclick = function() {
            featuredModal.classList.toggle('open');
            featuredPassword.classList.remove('error');
            featuredPassword.value = '';
        };
    }

    // Close modal on esc button (not on work pages where carousel handles Escape)
    if (!isWorkPage) {
        document.addEventListener('keyup', function(event) {
            if (event.key === 'Escape') {
                featuredModal.classList.remove('open');
                featuredPassword.classList.remove('error');
                featuredPassword.value = '';
            }
        });
    }

    // Check password natively
    function checkPassword(parentLink) {
        if (btoa(featuredPassword.value) === passwordHash) {
            localStorage.setItem(featuredWork, passwordHash);
            location.href = parentLink;
            featuredPassword.classList.remove('error');
            return true;
        } else {
            featuredPassword.classList.add('error');
            featuredPassword.classList.add('error--play');
            setTimeout(function(){
                featuredPassword.classList.remove('error--play');
            }, 500);
        }
    }

    // Static decoupled event listeners
    if (featuredEnter && featuredPassword) {
        featuredEnter.addEventListener('click', function () {
            if (featuredUrl) checkPassword(featuredUrl);
        });

        featuredPassword.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                featuredEnter.click();
            }
        });
    }

    document.addEventListener('click', function (event) {
        // Only for links with specific class
        if (!event.target.matches('.t__card__link')) return;

        // Verify properly using Hash matching
        if (localStorage.getItem(featuredWork) !== passwordHash) {
            // Show the <Modal>
            featuredModal.classList.toggle('open');
            featuredPassword.focus();

            // Prevent enter the URL natively
            event.preventDefault();

            // Save the URL dynamically based on current event
            featuredUrl = event.target.href;
        }
    }, false);

    // If the user access `?pwd=...` url don't require password anymore
    var queryString = window.location.search;
    if (queryString === '?pwd=' + atob(passwordHash)) {
        localStorage.setItem(featuredWork, passwordHash);
    }

    // STRICT verify: If the local storage value is different redirect to the homepage natively.
    if (isWorkPage) {
        if (localStorage.getItem(featuredWork) !== passwordHash) {
            location.href = siteUrl;
        }
    }

    // ---- Remove hash from URL ----
    function removeLocationHash(){
        var noHashURL = window.location.href.replace(/#.*$/, '');
        window.history.replaceState('', document.title, noHashURL);
    }
    window.addEventListener('popstate', removeLocationHash);
    window.addEventListener('hashchange', function(event){
        event.preventDefault();
        removeLocationHash();
    });
    window.addEventListener('load', removeLocationHash);

    // ---- Lightbox configs (Fancybox) ----
    if ((isProjectsPage || isWorkPage) && typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox]', {
            contentClick: false,
            Thumbs: {
                type: 'classic',
            },
            Toolbar: {
                display: {
                    left: [],
                    middle: ['infobar'],
                    right: ['close'],
                }
            }
        });
    }

    // ---- Carousel configs ----
    if (isWorkPage && typeof Carousel !== 'undefined') {
        document.querySelectorAll('.f-carousel').forEach(function(carousel) {
            var options = {
                infinite: false,
                Dots: {
                    minCount: 5
                }
            };
            new Carousel(carousel, options);
        });
    }
})();
