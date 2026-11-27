# Morley Mower Centre: website redesign mockup

> **Pitch points below were written when the site was built and most haven't been rechecked.** Phones get a separate Wix version, so "wider than the screen" is **not confirmed**. Confirmed 25 Nov 2026: one of two call links is badly formed (`tel:61 0893755600`), and the footer says 2018. Check each one on the live site, on a real phone, before saying it.

Rebuild of http://morleymowercentre.com.au (Wix site). Plain HTML/CSS/JS, no build step. Open `index.html` in a browser.

Business details (taken from the live site): 1/26 Rudloc Rd, Morley WA 6062 · (08) 9375 5600 · sales@morleymowercentre.com.au · Mon–Fri 8:00am–5:00pm, Sat 8:00am–2:00pm · facebook.com/MorleyMowerCentre

## Pages

| File | Old page | Contents |
|---|---|---|
| `index.html` | Home | Hero, store info strip, product categories, workshop teaser, brands, guarantee / genuine parts / finance |
| `services.html` | Service/Repairs (`/services-8`) | Their full workshop text and services list, service booking form, satisfaction guarantee |
| `products.html` | Products | 9 category cards (with product counts), brand tiles, every category as a link, their STIHL online shop |
| `lawn-mowers.html`, `ride-on-mowers.html`, `chainsaws.html`, `blowers.html`, `brushcutters.html`, `hedge-trimmers.html`, `cleaning.html`, `batteries.html`, `more-equipment.html` | The category pages in their menu (`/lawnmowers`, `/ride-on-mowers`, `/chainsaws`…) | Every product in that category with photo, name, brand and price, plus "Call to check stock" and "Enquire" buttons. Filter by brand, sort by price. |
| `brand-stihl.html`, `brand-cub-cadet.html`, `brand-honda.html`, `brand-ego.html`, `brand-victa.html`, `brand-masport.html`, `brand-rover.html`, `brand-briggs-and-stratton.html` | Their brand pages (`/stihl`, `/honda`…) | That brand's products, grouped by category |
| `brands.html` | Brands | 8 brands that have products in their store (each links to its brand page), then the 6 others as plain logos |
| `finance.html` | Finance (`/general-clean`) | humm90, Zip and FinApps with their links and calculators |
| `contact.html` | Contact Us | Phone, email, address, hours, Facebook, enquiry form (filled in for you when you tap "Enquire" on a product), Google map |

Shared files: `css/style.css` and `js/main.js` (mobile menu, theme, footer year, product filter and sort, and the forms).

**Forms:** there's no server, so the Services and Contact forms open the visitor's own email app. We chose to say so plainly rather than sign up to a form service (Formspree or similar), because that needs an account and the owner's say on where enquiries go. The button now reads **Email us**, with a **Call us** button next to it and a line explaining what happens. After pressing it, the message also appears ready to copy, with the email address and phone number, for anyone whose email app doesn't open. Swap in a form service if they sign up.

**Polish features:** dark mode that follows the phone/computer setting, with a sun/moon toggle that remembers the choice and no flash on load; staggered fade-up of sections and cards on scroll; smooth hover effects on buttons and on anything that links somewhere (cards, chips, brand logos, nav links). Nothing that only looks clickable has a hover effect; an animated mobile menu (the hamburger turns into an X, and Escape or a tap outside closes it); a sticky header that turns frosted with a shadow once you scroll; smooth in-page scrolling; a back-to-top button; lazy-loaded images; visible keyboard focus outlines. All motion switches off for visitors who have "reduce motion" turned on.

## Products and prices

**Copied from their own Wix store on 27 November 2026.** Prices change, so recheck before showing the owner. `PRODUCTS.md` lists all 311 products with price, sale price, the store pages each was on, its product page, and its photo's file name and Wix media ID.

- **Where from:** each category page of their store (`morleymowercentre.com.au/lawnmowers`, `/ride-on-mowers`, `/chainsaws`, `/copy-of-blowers` (their "Pole saws"), `/blowers`, `/brushcutters`, `/edgers`, `/hedge-trimmers`, `/pressure-cleaners`, `/cleaning-systems`, `/chippers-shredders`, `/concrete-saws`, `/multi-systems`) and each brand page (`/stihl`, `/cub-cadet`, `/honda`, `/ego`, `/masport`, `/rover`, `/victa`, `/briggs-and-stratton`). The product data sits in the page itself, so a plain download got it. `?page=N` loads more than the first 20. 26 products (batteries, chargers, generators, engines, cylinder mowers) are only on brand pages.
- **Empty in their store that day:** KombiSystems (`/kombi-systems`; the KombiSystem tools are under Multi systems), Sprayers/Spreaders (`/sprayers-spreaders`; the sprayers are under Pressure cleaners), and the Ferris, Shindaiwa, Billygoat and Deutscher brand pages.
- **Prices:** their regular price, plus the sale price where their store showed one (checked in the browser: "Regular Price $2,099.00, Sale Price $1,480.00"). Cents are dropped when they're .00.
- **Names:** as in their store, with these fixed: "DETHACHER" → "DETHATCHER", "WATTLE BOTTLE" → "WATER BOTTLE", "GRASSTRIMMER" → "GRASS TRIMMER", "POWER +" → "POWER+", missing spaces ("FSA 90AUTOCUT", `14"CUT`, `ST1620E-T(SKIN)`), and two Briggs & Stratton names cut off at "4 STROKE E" → "4 STROKE ENGINE".
- **Brand:** from the brand page it's listed on, otherwise the first word of the name (Atom, Mey, Alroh, Senix). RAT BARROW shows no brand.
- **Stock:** their store doesn't track stock (`isTrackingInventory: false`), so we show none. Every product has **Call to check stock** (tap-to-call) and **Enquire** (opens the contact form with the product and price filled in). Their "IN STOCK" and "WHILE STOCKS LASTS" ribbons are left out. Their other ribbons (Battery, Petrol, Electric, Attachment, Power head, 4-stroke, Pro model, New arrival, Most popular) show as tags.
- **Our grouping:** we merged some of their categories into 9 pages: pole saws with chainsaws, edgers with brushcutters, pressure cleaners + sprayers + cleaning systems into one page, and Multi systems, chippers, concrete saws, generators and engines into "Multi-tools & more". Each product is on its brand page and on one category page, except 10 (mostly EGO pole tools and Honda attachments) that their store lists in two categories, so they're on two.
- **How it was built:** a throwaway script in the session scratchpad read the saved store pages and wrote the plain HTML pages. To update prices, redo the download, or edit the price in the HTML by hand.

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
- **Their whole range in one place, with prices.** All 311 products from their store, on 9 category pages and 8 brand pages, each with a "Call to check stock" button. Filter by brand and sort by price. Their STIHL online shop link is kept.

Not included on purpose: stock levels (we have no stock data), Google review numbers, and the newsletter sign-up. These can be added once they're a client.

## Don't say

- That anything is in stock, or that the site shows stock. It doesn't.
- That the prices are live or current. They're a copy from 27 Nov 2026.
- That the forms send enquiries. They open the visitor's email app.
- That they sell sprayers/spreaders or KombiSystems as separate ranges, or Ferris, Shindaiwa, Billy Goat, Deutscher, Echo or Oregon right now. Those store pages were empty; the logos are only from their Brands page.

## Confirm with the owner

- How they'd want stock shown, if at all (their Wix store doesn't track it).
- Whether the prices and sale prices are still right, and whether they want prices online at all.
- Whether they still sell the brands with empty store pages (Ferris, Shindaiwa, Billy Goat, Deutscher), plus Echo and Oregon.
- Where web enquiries should go if we switch the forms to a form service.

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
| `products/*.webp` (311 files) | One per product; each file and its Wix media ID is listed in `PRODUCTS.md` | The product's first photo in their Wix store, downloaded 27 Nov 2026 at 480px |

The Brushcutters, Hedge trimmers and Multi-tools category cards on `products.html` reuse product photos (STIHL FS 131, STIHL HS 82 R, STIHL KM 131 R). The three Masport cylinder mower photos are only 145 × 167px in their store, so they show small rather than blown up.

`brand-alroh.jpg` and `brand-mey.png` were downloaded from the old Products page but aren't used yet (those brands aren't on their Brands page).
