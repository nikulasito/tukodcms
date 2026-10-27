# Higalaay Festival Frontend Handoff

This folder contains the frontend-only Higalaay Festival website for developer review and integration with the separate CMS/backend system.

## Included

- Public website pages in plain HTML
- Shared CSS and frontend JavaScript
- Festival images, partner logos, favicon, and font
- Home carousel, event detail pages, partner modal, volunteer modal, navigation, responsive layout, and frontend-only form states

## Pages

- `index.html` - Home
- `/about/` - About Higalaay
- `/events/` - Events listing
- `event-*.html` - Event detail pages
- `/plan-your-visit/` - Plan Your Visit
- `/sponsor/` - Be a Partner
- `/contact/` - Contact Us

## Run locally

Because this is a static frontend, no Node, PHP, database, or backend service is required to preview the design.

From this folder, use any static server. For example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

Opening `index.html` directly also works for basic visual review, but a static server is recommended so all browser behavior matches normal hosting.

## Backend integration notes

The forms currently show frontend confirmation states only. Connect these selectors to the separate backend/CMS:

- `.contact-form` for Contact Us submissions
- `.partner-form` for Be a Partner submissions
- `.partner-modal-trigger` and `#partner-modal` for partner inquiries
- `.volunteer-modal-trigger` and `#volunteer-modal` for volunteer inquiries

The frontend does not include the legacy Express backend, Laravel backend, CMS admin, authentication, database files, Node modules, build output, or deployment configuration.
