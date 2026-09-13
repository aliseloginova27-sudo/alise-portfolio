/* =========================================================
   Alise Loginova — Portfolio
   Shared behaviour: scroll reveal, mobile nav, tab filter, lightbox
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. REVEAL ON SCROLL ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el, i) {
      el.style.setProperty('--i', i % 6);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- 2. MOBILE NAV TOGGLE ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('nav.links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* ---------- 3. HOMEPAGE FILTER TABS ---------- */
  var tabs = document.querySelectorAll('.tabs button');
  var cards = document.querySelectorAll('.project-card');
  var grid = document.querySelector('.project-grid');
  if (tabs.length && grid) {
    function applyFilter(cat) {
      var visibleCount = 0;
      cards.forEach(function (card) {
        var match = cat === 'all' || card.getAttribute('data-cat') === cat;
        card.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });

      var empty = grid.querySelector('.empty-tab');
      if (visibleCount === 0) {
        if (!empty) {
          empty = document.createElement('div');
          empty.className = 'empty-tab';
          empty.textContent = 'More projects in this category coming soon.';
          grid.appendChild(empty);
        }
      } else if (empty) {
        empty.remove();
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        applyFilter(tab.getAttribute('data-cat'));
      });
    });

    var initialTab = document.querySelector('.tabs button.active') || tabs[0];
    applyFilter(initialTab.getAttribute('data-cat'));
  }

  /* ---------- 4. LIGHTBOX FOR CASE-STUDY IMAGES ---------- */
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(lightbox);
  var lightboxImg = lightbox.querySelector('img');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.frame img').forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

});
