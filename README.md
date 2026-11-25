# Morley Mower Centre: website redesign mockup

> **Pitch points below were written when the site was built and most haven't been rechecked.** Phones get a separate Wix version, so "wider than the screen" is **not confirmed**. Confirmed 25 Nov 2026: one of two call links is badly formed (`tel:61 0893755600`), and the footer says 2018. Check each one on the live site, on a real phone, before saying it.

Rebuild of http://morleymowercentre.com.au (Wix site). Plain HTML/CSS/JS, no build step. Open `index.html` in a browser.

Business details (taken from the live site): 1/26 Rudloc Rd, Morley WA 6062 · (08) 9375 5600 · sales@morleymowercentre.com.au · Mon–Fri 8:00am–5:00pm, Sat 8:00am–2:00pm · facebook.com/MorleyMowerCentre

## Pages

| File | Old page | Contents |
|---|---|---|
| `index.html` | Home | Hero, store info strip, product categories, workshop teaser, brands, guarantee / genuine parts / finance |
| `services.html` | Service/Repairs (`/services-8`) | Their full workshop text and services list, service booking form, satisfaction guarantee |
| `products.html` | Products + the category pages in the menu | Category tiles, the full category list, link to their STIHL online shop |
| `brands.html` | Brands | All 14 brand logos |
| `finance.html` | Finance (`/general-clean`) | humm90, Zip and FinApps with their links and calculators |
| `contact.html` | Contact Us | Phone, email, address, hours, Facebook, enquiry form, Google map |

Shared files: `css/style.css` and `js/main.js` (mobile menu, footer year, and forms that open the visitor's email app with the details filled in).

**Polish features:** dark mode that follows the phone/computer setting, with a sun/moon toggle that remembers the choice and no flash on load; staggered fade-up of sections and cards on scroll; smooth hover effects on buttons, cards, nav links and images; an animated mobile menu (the hamburger turns into an X, and Escape or a tap outside closes it); a sticky header that turns frosted with a shadow once you scroll; smooth in-page scrolling; a back-to-top button; lazy-loaded images; visible keyboard focus outlines. All motion switches off for visitors who have "reduce motion" turned on.

## What changed compared with the old site (sales pitch)

- **Works on phones.** The old site is wider than the screen on mobile, so the logo and headings get cut off. The new one fits every width with no sideways scrolling (tested at 360, 375, 768, 1024 and 1366px).
- **Tap-to-call everywhere.** A call bar stays at the bottom of the screen on phones ("Call now" and "Book a service"), and there's a call button in the header. Their old "CALL NOW" link uses a broken number format (`tel:61 0893755600`).
- **Proper mobile menu** (hamburger) in place of the Wix menu, which has more than 30 links.
- **Real text, not pictures of text.** The old home page tagline is an image, so Google can't read it and it goes blurry. It's now real text, and every page has a proper title and description for search.
- **Hours and address on every page** (top bar and footer), plus "Open 6 days" up front.
- **Services are easy to scan.** The long single list is now grouped cards, with the booking form on the same page.
- **Modern, faster pages.** No Wix scripts, chat widget or app bloat. Images are resized and lazy-loaded.
- **Up-to-date footer.** The old footer still says "©2018 … Proudly created with Wix.com". The new one shows the current year.
- **Same brand.** It keeps their orange-and-black logo and colours, with a cleaner layout.

Not included on purpose: product prices (they change often and live in their Wix store), Google review numbers, and the newsletter sign-up. These can be added once they're a client.

## Image sources

All images were downloaded from the business's own Wix image host (`https://static.wixstatic.com/media/…`), as used on morleymowercentre.com.au. Some were resized through Wix's own resizer.

| File | Wix media ID | Used on old site |
|---|---|---|
| `logo.png` | `6f91fc_e85e378e431c496084636c8493047d27~mv2.png` | Header logo |
| `hero.jpg` | `6f91fc_914c178482f640c2b91e21320855a85e~mv2.png` (converted to JPG) | Home hero banner |
| `stihl-service.jpg` | `6f91fc_333ae4582340400998efc69d075b4454~mv2.jpg` | Service/Repairs page |
| `workshop.jpg` | `6f91fc_afb10dbf03004c45b577ec91326251ed~mv2.jpg` | Service/Repairs page |
| `cat-battery.jpg` | `6f91fc_fd5bed65df67419195aa6ae8341ad98f~mv2.jpg` | Home category tile |
| `cat-chainsaws.png` | `6f91fc_a77deb1792544c96b954e3b01ffd70c2~mv2.png` | Home category tile |
| `cat-blowers.png` | `6f91fc_724474306c3c445ca54ddbe8c301b9bb~mv2.png` | Home category tile |
| `cat-lawnmowers.jpg` | `6f91fc_2ef708d4f52548eba59ea3755e1448a9~mv2.jpg` | Home category tile |
| `cat-zero-turn.jpg` | `6f91fc_4bc14eb01f6c4eb1a5aefa95e20d2b59~mv2.jpg` | Home category tile |
| `cat-ride-on.jpg` | `6f91fc_a9fef07ee59c475588f4201cdaf5c484~mv2_d_2000_2000_s_2.jpg` | Home category tile |
| `cat-cleaning.jpg` | `6f91fc_5eaa9224a3694cb78792a8d55bc219e6~mv2.jpg` | Home category tile |
| `brand-*.jpg/png` (16 files) | Logos from the Products and Brands pages | Products / Brands pages |
| `finance-1.webp` (humm90) | `6f91fc_1eacd49aaaf64df5a19c65d9df9f9364~mv2.webp` | Finance page |
| `finance-2.png` (Zip) | `6f91fc_7c22e46f1134447aa4564b003199c6d2~mv2.png` | Finance page |
| `finance-3.png` (FinApps) | `6f91fc_fd694b449ab6433090222a6ecfe5e80d~mv2.png` | Finance page |

`brand-alroh.jpg` and `brand-mey.png` were downloaded from the old Products page but aren't used yet (those brands aren't on their Brands page).
