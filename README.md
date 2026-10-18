# Royal Barber Shop Preston — Static Website

Premium responsive single-page barbershop site built using **plain HTML, CSS and JavaScript** with no build tools, Node dependencies or account requirements.

## Deploy

Upload the contents of this folder (not the parent folder) to a static host such as Cloudflare Pages, Netlify, GitHub Pages or a standard web host. Set `index.html` as the entry point. No build command is needed.

For Cloudflare Pages, upload the ZIP contents as a static site, or push this folder to GitHub and connect the repository. Framework preset: None. Build command: leave blank. Output directory: `.`.

## Functionality

- Responsive website, sticky navigation, mobile menu and mobile call/book actions.
- Services that preselect the relevant item in the enquiry form.
- Mobile-friendly booking enquiry: validates required fields and published opening hours (using UK date), then prepares a `mailto:` enquiry and provides a separate copy-to-clipboard fallback. **This does NOT provide live appointments, store requests or automatically email the shop.** The visitor must send the email from their own email app. Bookings are NOT confirmed until the shop replies.
- Timezone-aware open/closed indicator using `Europe/London` (including DST). Published opening times may differ on bank holidays.
- Image gallery with a click-to-expand lightbox.
- Contact actions: `tel:` calls, `mailto:` emails, Google Maps directions, Instagram, Facebook and TikTok.
- Semantic local-business JSON-LD, social previews, meta description, robots.txt and accessibility considerations.

## Important pre-publication review

1. Confirm the shop's phone +44 7842 614388, email barberroyal8@gmail.com, address 8 Woodplumpton Road, Ashton-on-Ribble, Preston PR2 2LP, and opening hours.
2. Confirm the listed services (especially hot towel and children's haircuts) with the owner.
3. The site uses **illustrative stock photography**, not pictures of the business or staff. Replace with the client's own licensed photos when available. An explanation is included below the gallery.
4. No fabricated testimonials, rankings, owner names, prices, history, founding dates, or instant online booking were added.
5. This static site intentionally uses **external Unsplash image URLs** and Google Fonts; the browser needs internet access for the photography and fonts. For maximum reliability, replace remote image links with optimized/licensed local files.
6. Set up the real business domain and validate Google Search Console when the owner authorizes the site going live. Add a canonical URL and a sitemap with the actual domain once known. Do not add fictional domain URLs.
7. Check whether the privacy-page description suits the business's actual practices after deployment; consult a qualified adviser if needed.

## Main assets / layout

- `index.html` — semantic site, content, SVG icon symbols, SEO and contact actions
- `styles.css` — responsive editorial design
- `script.js` — nav, dynamic opening hours, gallery and booking-enquiry flow
- `privacy.html` — plain-English privacy information
- `assets/favicon.svg` — custom barbershop monogram favicon
- `manifest.webmanifest` — basic installable-site metadata
- `_headers` — optional Cloudflare/Netlify security headers

## Photo sources

Unsplash photos were selected because they are published as free under the Unsplash License. Attribution is appreciated and the business can choose to add visible photographer credits. Sources:

- Mehdi Pezhvak — https://unsplash.com/photos/a-barber-cuts-someones-hair-in-a-barbershop-dhHnyxdNS0k
- Jonathan Cooper — https://unsplash.com/photos/a-man-getting-his-hair-cut-at-a-barber-shop-XqVhINFvXK0
- Aleksandar Andreev — https://unsplash.com/photos/a-man-in-a-barber-shop-getting-his-hair-cut-XbM0XATexu8
- César Badilla Miranda — https://unsplash.com/photos/a-man-getting-his-hair-cut-at-a-barber-shop-t34TLxxmwws
- Redd Francisco — https://unsplash.com/photos/a-barber-shop-with-a-chair-and-a-mirror-BBGyxhtPpC0
- John Karlo Mendoza — https://unsplash.com/photos/barber-cutting-mans-hair-idzUojjazCg

The photos are of other barbershops or barbering scenes; they are not represented as real Royal Barber Shop work.
