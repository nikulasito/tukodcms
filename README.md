# TukodPH CMS

TukodPH CMS is a lightweight PHP and JavaScript content management system for festival websites. It includes the Control Desk, a JSON API, and sample Diyandi and Higalaay sites.

## Run locally

Serve this folder with PHP 8+ (for example, using Apache or XAMPP) and open the project URL in your browser. The API is served from `api/`. Make sure PHP can write to the `data/` directory.

Set the `TUKODPH_CMS_USERNAME` and `TUKODPH_CMS_PASSWORD` environment variables before signing in. Avoid using default or shared credentials in a deployed environment.

## Project contents

- `index.html`, `app.js`, `styles.css` — CMS Control Desk
- `api/` — PHP API
- `data/` — portal and content data
- `diyandi/`, `higalaay/` — sample festival sites
- `templates/` — reusable festival website templates

See [README-INTEGRATION.md](README-INTEGRATION.md) for deployment and CMS/API integration details.
