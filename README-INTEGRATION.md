# TukodPH CMS + Diyandi API Integration (Testing Build)

This package connects the exported Diyandi frontend to the TukodPH Control Desk through a tenant-scoped PHP/JSON API. The frontend can be hosted on Hostinger, Netlify, Vercel static hosting, Cloudflare Pages, or another domain because the API supports cross-origin public content requests.

## What is included

- **Diyandi Festival** is registered in the CMS portal selector as tenant `diyandi-festival`.
- The **Layout builder is hidden** from the CMS navigation.
- CMS login, portal switching, content creation/editing, draft/review/publish/offline states, and portal provisioning are connected to the API data store.
- Festival-specific CMS entry URLs can lock a user directly into one portal workspace, for example `/diyandi/`.
- Portal provisioning now includes a template catalog. Templates are generic festival website options and share one standardized implementation family: `standard-festival-site` / `festival-site-v1`.
- Published Diyandi records are exposed through a public read endpoint.
- The Diyandi static frontend loads published content at runtime using `cms-config.js` and `tukod-cms-client.js`.
- The Diyandi contact form posts inquiries into the CMS API data store.
- Existing static copy remains visible as fallback if the API is temporarily unavailable.

## Folder/package roles

- `cms/` - upload to the CMS subdomain, for example `cms.tukodph.com`.
- `diyandi/` - upload to the Diyandi domain or any static web host.

## 1. Deploy the CMS

1. Create a subdomain such as `cms.tukodph.com` in Hostinger.
2. Upload the **contents** of the CMS package to that subdomain's document root.
3. Confirm that PHP can write to these folders:
   - `data/`
   - `data/content/`
   - `data/inquiries/`
4. Recommended permissions are `755` first. Use `775` only if PHP cannot save changes.
5. Set environment variables for the CMS login before opening the admin:
   - `TUKODPH_CMS_USERNAME`
   - `TUKODPH_CMS_PASSWORD`
6. Open `https://cms.tukodph.com/` for the global desk, or a festival-scoped login such as `https://cms.tukodph.com/diyandi/`.

For local XAMPP or Apache, wire the same variables through the virtual host or server environment before signing in.

### Festival-scoped users

For scoped access, define users through `cms_users` in `cms/config.local.php` or `TUKODPH_CMS_USERS_JSON` in production. Example:

```php
return [
  'cms_users' => [
    [
      'username' => 'editor_302',
      'password' => 'TukodPH2026!',
      'role' => 'editor',
      'tenants' => ['diyandi-festival'],
      'defaultTenant' => 'diyandi-festival',
      'canSwitchTenants' => false,
    ],
  ],
];
```

With that setup:

- `https://cms.tukodph.com/diyandi/` logs the user straight into the Diyandi workspace.
- Content, media, events, and other CMS data remain scoped to `diyandi-festival`.
- Portal switching stays hidden unless the signed-in account has cross-portal permission.

### Template provisioning

When provisioning a new festival portal, administrators now choose from the template catalog returned by:

```text
GET /api/index.php?action=templates
```

The current provisionable templates are generic festival layouts, not festival-specific starter content:

- `Heritage Festival`
- `Vibrant Festival`

Both templates point to the shared starter scaffold under:

```text
cms/templates/shared/festival-site-v1/starter/
```

That shared scaffold defines the standard route structure, CMS bridge entry points, and file organization for every new festival website. Template differences should stay in theme, art direction, branding, and content rather than code architecture.

## 2. Deploy the Diyandi frontend

1. Open `cms-config.js`.
2. Confirm the production CMS API URL:

```js
window.TUKOD_CMS_CONFIG = {
  tenantId: 'diyandi-festival',
  apiUrl: 'https://cms.tukodph.com/api/index.php',
  debug: false,
  fallbackToStatic: true
};
```

3. Upload the **contents** of the frontend package to the Diyandi domain/document root.
4. Use HTTPS for both the CMS and frontend. A secure frontend cannot fetch content from an insecure HTTP API.

## 3. Verify the integration

1. Sign in to the CMS.
2. Confirm that **Diyandi Festival** is the active portal or select it from **Active portal**.
3. Open **Content desk**.
4. Edit `home-hero`.
5. Change the Summary, save or submit it for review, then authorize publication.
6. Reload the Diyandi website. The published text should update from the API.
7. Submit the contact form on `/contact` and confirm the inquiry is written to `data/inquiries/diyandi-festival.json`.

Only records with `status: published` are returned to the public website. Taking a record offline removes it from the public response, and the static frontend text becomes the fallback.

## Public API contract

Public read endpoint:

```text
GET /api/index.php?action=public-content&tenant=diyandi-festival
X-Tenant-ID: diyandi-festival
```

Public contact endpoint:

```text
POST /api/index.php?action=submit-inquiry
Content-Type: application/json
X-Tenant-ID: diyandi-festival
```

Response shape:

```json
{
  "ok": true,
  "tenant": "diyandi-festival",
  "records": {
    "home-hero": {
      "fields": {
        "heading": "Diyandi",
        "summary": "...",
        "ctaLabel": "Explore the festival",
        "ctaUrl": "/events"
      }
    }
  }
}
```

Frontend elements are connected using attributes such as:

```html
<p
  data-tukod-record="home-hero"
  data-tukod-text-field="summary"
>
  Static fallback copy
</p>
```

This contract is independent of the frontend framework. A future React/Next.js, Laravel Blade, WordPress, or plain HTML frontend can consume the same endpoint.

## Testing-build limitations

- Data is stored in JSON files instead of MySQL.
- Media upload and verification remain simulated; image paths can be attached to content records.
- Authentication is still a lightweight PHP session, but the username and password now come from environment variables instead of checked-in source.
- Contact submissions are stored in JSON and are not rate-limited yet.
- There is no CSRF token layer, user management, or production audit database yet.
- For production, migrate the endpoints into the Laravel backend, use MySQL, Laravel Sanctum/session authentication, role permissions, validation, revision history, inbox tooling, and a real media storage service.
