// Morley Mower Centre: menu, theme, motion and forms. No libraries.
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Theme toggle ----------
  var themeBtn = document.querySelector('.theme-toggle');
  function storedTheme() { try { return localStorage.getItem('mmc-theme'); } catch (e) { return null; } }
  function setTheme(t, save) {
    if (!reduceMotion) {
      root.classList.add('theme-anim');
      setTimeout(function () { root.classList.remove('theme-anim'); }, 350);
    }
    root.setAttribute('data-theme', t);
    if (themeBtn) themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (save) { try { localStorage.setItem('mmc-theme', t); } catch (e) {} }
  }
  if (themeBtn) {
    themeBtn.setAttribute('aria-label', root.getAttribute('data-theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeBtn.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
  }
  // Follow system changes until the visitor picks a theme themselves
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) { if (!storedTheme()) setTheme(e.matches ? 'dark' : 'light', false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  }

  // ---------- Mobile menu ----------
  var toggle = document.querySelector('.menu-toggle');
  var links = document.getElementById('nav-links');
  function setMenu(open) {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (toggle && links) {
    toggle.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && links.classList.contains('open')) { setMenu(false); toggle.focus(); } });
    document.addEventListener('click', function (e) { if (links.classList.contains('open') && !e.target.closest('.site-header')) setMenu(false); });
  }

  // ---------- Sticky header shadow + back to top ----------
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');
  var scrolled = null, shown = null;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var s = y > 40, t = y > 600;
    if (header && s !== scrolled) { header.classList.toggle('scrolled', s); scrolled = s; }
    if (toTop && t !== shown) { toTop.classList.toggle('show', t); shown = t; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  // ---------- Scroll reveal (staggered) ----------
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var targets = [];
    document.querySelectorAll('main .section > .container > *:not(.grid):not(.brand-grid):not(.split), main .split > *, main .cta-band .container > *').forEach(function (el) { targets.push(el); });
    document.querySelectorAll('main .grid, main .brand-grid').forEach(function (grid) {
      Array.prototype.forEach.call(grid.children, function (el, i) {
        el.style.setProperty('--d', (i % 4) * 70 + 'ms');
        targets.push(el);
      });
    });
    var heard = false;
    var io = new IntersectionObserver(function (entries) {
      heard = true;
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) {
      // Anything already on screen at load stays visible (no flash)
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) return;
      el.classList.add('reveal');
      io.observe(el);
    });
    // Safety net: if the observer never reports (odd embedded browsers), show everything
    setTimeout(function () {
      if (!heard) document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    }, 2000);
  }

  // ---------- Footer year ----------
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---------- Enquiry forms ----------
  // Opens the visitor's email app with the details filled in
  // (no server needed for the mockup; swap for a real form handler when live).
  document.querySelectorAll('form[data-mailto]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [];
      form.querySelectorAll('input, select, textarea').forEach(function (el) {
        if (!el.name || !el.value) return;
        var label = form.querySelector('label[for="' + el.id + '"]');
        lines.push((label ? label.textContent.replace('*', '').trim() : el.name) + ': ' + el.value);
      });
      var subject = form.getAttribute('data-subject') || 'Website enquiry';
      window.location.href = 'mailto:' + form.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));
    });
  });
})();
