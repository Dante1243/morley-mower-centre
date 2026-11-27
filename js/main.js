// Morley Mower Centre: menu, theme, motion, product filters and forms. No libraries.
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function each(sel, fn, from) { Array.prototype.forEach.call((from || document).querySelectorAll(sel), fn); }

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
  // Only on a fresh visit (not reload, back or a #link), only for things below the screen,
  // and never on the product lists, which are too tall to reveal as one block.
  var visit = window.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  var fresh = !location.hash && (!visit || visit.type === 'navigate');
  if (!reduceMotion && fresh && 'IntersectionObserver' in window) {
    var targets = [];
    each('main .section:not(.shop) > .container > *:not(.grid):not(.brand-grid):not(.split), main .split > *, main .cta-band .container > *', function (el) { targets.push(el); });
    each('main .section:not(.shop) .grid, main .section:not(.shop) .brand-grid', function (grid) {
      Array.prototype.forEach.call(grid.children, function (el, i) {
        el.style.setProperty('--d', (i % 4) * 70 + 'ms');
        targets.push(el);
      });
    });
    var heard = false;
    var io = new IntersectionObserver(function (entries) {
      heard = true;
      entries.forEach(function (en) {
        if (!en.isIntersecting && en.boundingClientRect.top > 0) return;
        var el = en.target;
        io.unobserve(el);
        el.classList.add('in');
        // Taken off afterwards, so hover effects don't inherit the delay
        setTimeout(function () { el.classList.remove('reveal', 'in'); el.style.removeProperty('--d'); }, 900);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) return; // on screen at load: leave it alone
      el.classList.add('reveal');
      io.observe(el);
    });
    // Safety net: if the observer never reports (odd embedded browsers), show everything
    setTimeout(function () {
      if (!heard) each('.reveal', function (el) { el.classList.add('in'); });
    }, 2000);
  }

  // ---------- Footer year ----------
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---------- Product lists: filter by brand, sort by price ----------
  each('.shop-tools', function (tools) {
    var shop = tools.closest('.shop');
    if (!shop) return;
    var items = Array.prototype.slice.call(shop.querySelectorAll('.product'));
    var count = tools.querySelector('.shop-count');
    var sel = tools.querySelector('select');
    var brand = '';
    tools.hidden = false;
    function apply() {
      var n = 0;
      items.forEach(function (li) { var hide = !!brand && li.getAttribute('data-brand') !== brand; li.hidden = hide; if (!hide) n++; });
      each('.shop-group', function (g) { g.hidden = !g.querySelector('.product:not([hidden])'); }, shop);
      each('.jump a', function (a) { var g = document.getElementById(a.getAttribute('href').slice(1)); if (g) a.parentNode.hidden = g.hidden; }, shop);
      if (count) count.textContent = brand ? 'Showing ' + n + ' of ' + items.length + ' products' : 'Showing ' + items.length + ' products';
    }
    each('.chip-btn', function (b) {
      b.addEventListener('click', function () {
        brand = b.getAttribute('data-brand') || '';
        each('.chip-btn', function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }, tools);
        apply();
      });
    }, tools);
    if (sel) sel.addEventListener('change', function () {
      var v = sel.value;
      each('.products', function (ul) {
        var lis = Array.prototype.slice.call(ul.children);
        lis.sort(function (a, b) {
          var order = a.getAttribute('data-i') - b.getAttribute('data-i');
          if (!v) return order;
          var d = a.getAttribute('data-price') - b.getAttribute('data-price');
          return (v === 'asc' ? d : -d) || order;
        });
        lis.forEach(function (li) { ul.appendChild(li); });
      }, shop);
    });
  });

  // ---------- "Enquire" from a product: fill in the contact form ----------
  var params = null;
  try { params = new URLSearchParams(window.location.search); } catch (e) {}
  var product = params && params.get('product');
  var message = document.getElementById('cm');
  if (product && message && !message.value) {
    var price = params.get('price');
    message.value = "Hi, I'm interested in the " + product.slice(0, 200) + (price ? ' (listed at ' + price.slice(0, 20) + ')' : '') + '. Is it in stock?';
    var title = document.getElementById('enquire-title');
    if (title) title.textContent = 'Ask about this product';
  }

  // ---------- Enquiry forms ----------
  // No server for the mockup: "Email us" opens the visitor's own email app with the details filled in.
  // If no email app opens, the message is shown ready to copy, with the email address and phone number.
  each('form[data-mailto]', function (form) {
    var to = form.getAttribute('data-mailto');
    var status = form.querySelector('.status');
    var fallback = form.querySelector('.fallback');
    var copyText = fallback && fallback.querySelector('textarea');
    var copyBtn = fallback && fallback.querySelector('.copy-msg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [];
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || !el.value || !el.value.trim()) return;
        var label = form.querySelector('label[for="' + el.id + '"]');
        lines.push((label ? label.textContent.replace('*', '').trim() : el.name) + ': ' + el.value.trim().replace(/\r?\n/g, '\r\n'));
      });
      var subject = form.getAttribute('data-subject') || 'Website enquiry';
      var body = lines.join('\r\n');
      var a = document.createElement('a');
      a.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      document.body.appendChild(a); a.click(); a.remove();
      if (status) status.textContent = 'Your email app should now be open with this filled in. Press send there to reach us.';
      if (fallback && copyText) {
        copyText.value = 'To: ' + to + '\r\nSubject: ' + subject + '\r\n\r\n' + body;
        fallback.hidden = false;
      }
    });
    if (copyBtn && copyText) copyBtn.addEventListener('click', function () {
      var done = function () { copyBtn.textContent = 'Copied'; setTimeout(function () { copyBtn.textContent = 'Copy message'; }, 2000); };
      var old = function () { copyText.select(); try { if (document.execCommand('copy')) done(); } catch (e) {} };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(copyText.value).then(done, old);
      else old();
    });
  });
})();
