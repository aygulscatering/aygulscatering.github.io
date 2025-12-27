# Aygu Catering Website

## Pages

- `index.html` — Homepage (matches the `code.html` design system)
- `code.html` — Landing page reference (original structure preserved with minimal functional updates)
- `services.html`, `menu.html`, `about.html`, `contact.html` — Supporting pages
- `privacy.html`, `terms.html` — Policy pages
- `404.html` — Not found page

## Landing Page Changes (from the provided `code.html`)

- Updated branding and copy to “Aygu Catering”
- Added SEO + social meta tags (description, canonical, Open Graph, Twitter)
- Added a Past Events gallery section with captions/dates and lazy-loaded images
- Added an accessible modal viewer for gallery images (click to open, `Esc` to close)
- Added mobile navigation toggle behavior and a skip link for keyboard users

## Assets and Sources / Attributions

- Styling (landing pages): Tailwind CSS via CDN (`https://cdn.tailwindcss.com`)
- Fonts: Google Fonts “Work Sans” (`https://fonts.googleapis.com`)
- Icons: Google Material Symbols (`https://fonts.googleapis.com`)
- Photography used in `index.html` / `code.html`: remote placeholder images hosted on `lh3.googleusercontent.com` (replace with your licensed event photos)

## Local Preview

- Run `python3 -m http.server 8000` and open `http://localhost:8000/`
