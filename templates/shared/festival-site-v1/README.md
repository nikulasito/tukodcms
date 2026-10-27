# Standard Festival Site v1

This shared implementation contract defines the standardized structure for TukodPH festival websites.

## Rules

- Festival templates share the tenant API, content model, and CMS bridge contract.
- Public renderers, page routes, section anchors, and layout-driven behaviors must remain template-aware.
- Templates may change visual direction, design tokens, typography choices, spacing, and art direction.
- Templates must not ship festival-specific content, branding, names, or editorial copy.
- Festival-specific differences belong in CMS content, assets, branding settings, and theme selections.

## Expected structure

- `frontend/`
- `frontend/index.html`
- `frontend/about/index.html`
- `frontend/events/index.html`
- `frontend/contact/index.html`
- `frontend/cms-config.js`
- `frontend/tukod-cms-client.js`
- `seed-content.json`
- `template.json`

## Implementation family

- `implementationFamily`: `standard-festival-site`
- `structureVersion`: `festival-site-v1`
