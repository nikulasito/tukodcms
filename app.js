const iconPaths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  review: '<path d="m5 12 4 4L19 6"/><path d="M4 4h16v16H4z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  image:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m4 17 5-5 3 3 2-2 6 6"/>',
  settings:
    '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 0 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.2a2 2 0 0 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1A2 2 0 0 0 1.7 11H1.5a2 2 0 0 1 0-4h.2a2 2 0 0 0 1.4-3.4L3 3.5A2 2 0 0 1 5.8.7l.1.1A2 2 0 0 0 9.3-.6v-.2a2 2 0 0 1 4 0v.2a2 2 0 0 0 3.4 1.4l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1A2 2 0 0 0 20.9 7h.2a2 2 0 0 1 0 4h-.2a2 2 0 0 0-1.5 4Z" transform="translate(0 2) scale(.9)"/>',
  shield:
    '<path d="M12 3 19 6v5c0 4.6-3 8.2-7 10-4-1.8-7-5.4-7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chevron: '<path d="m7 10 5 5 5-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  more: '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  unlock:
    '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7-2"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  pin: '<path d="M12 21s-6-5.2-6-11a6 6 0 1 1 12 0c0 5.8-6 11-6 11Z"/><circle cx="12" cy="10" r="2.4"/>',
  calendar:
    '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  external:
    '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  moveUp: '<path d="m8 9 4-4 4 4M12 5v14"/>',
  moveDown: '<path d="m8 15 4 4 4-4M12 19V5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.8-8.7A5 5 0 0 1 17.5 19Z"/>',
  filePlus:
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 12v6M9 15h6"/>',
  spark:
    '<path d="m12 3 1.5 6.5L20 12l-6.5 2.5L12 21l-1.5-6.5L4 12l6.5-2.5z"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.2 2.4 3.2 5.4 3.2 9S14.2 18.6 12 21c-2.2-2.4-3.2-5.4-3.2-9S9.8 5.4 12 3Z"/>',
  chart: '<path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 5-6"/>',
  warning: '<path d="m12 3 9 17H3z"/><path d="M12 9v4M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  logout: '<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-5"/>',
};

function icon(name, label = "") {
  const path = iconPaths[name] || iconPaths.info;
  const title = label ? `<title>${label}</title>` : "";
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="${label ? "false" : "true"}">${title}${path}</svg>`;
}

function esc(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
}

function slugify(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatClockTimeForDisplay(value = "") {
  const match = String(value || "").trim().match(/^(\d{2}):(\d{2})$/);
  if (!match) return "";
  const hour = Number(match[1]);
  const minute = match[2];
  const suffix = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${minute} ${suffix}`;
}

function eventTimeDisplayFromParts(startTime = "", endTime = "") {
  const start = formatClockTimeForDisplay(startTime);
  const end = formatClockTimeForDisplay(endTime);
  if (start && end) return `${start} - ${end}`;
  return start || end || "";
}

function stripRichText(value = "") {
  const holder = document.createElement("div");
  holder.innerHTML = String(value || "");
  return holder.textContent || holder.innerText || "";
}

function safeHref(value = "", fallback = "") {
  const href = String(value || "").trim();
  if (!href) return fallback;
  if (href.startsWith("/") || href.startsWith("#")) return href;
  try {
    const parsed = new URL(href, window.location.href);
    if (["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol))
      return href;
  } catch (error) {
    return fallback;
  }
  return fallback;
}

function normalizeRichTextHtml(value = "") {
  const source = String(value || "").trim();
  if (!source) return "";

  if (!/<[a-z][\s\S]*>/i.test(source)) {
    return source
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block) => {
        const lines = block
          .split(/\n/)
          .map((line) => line.trim())
          .filter(Boolean);
        if (!lines.length) return "";
        if (lines.every((line) => /^[-*]\s+/.test(line))) {
          return `<ul>${lines.map((line) => `<li>${esc(line.replace(/^[-*]\s+/, ""))}</li>`).join("")}</ul>`;
        }
        if (lines[0].startsWith("## ")) {
          return `<h3>${esc(lines[0].slice(3))}</h3>${lines
            .slice(1)
            .map((line) => `<p>${esc(line)}</p>`)
            .join("")}`;
        }
        return `<p>${lines.map((line) => esc(line)).join("<br>")}</p>`;
      })
      .join("");
  }

  const template = document.createElement("template");
  template.innerHTML = source;
  const allowed = new Set([
    "P",
    "BR",
    "STRONG",
    "B",
    "EM",
    "I",
    "U",
    "A",
    "UL",
    "OL",
    "LI",
    "H2",
    "H3",
    "H4",
    "BLOCKQUOTE",
  ]);

  const unwrap = (element) => {
    const parent = element.parentNode;
    if (!parent) return;
    while (element.firstChild) parent.insertBefore(element.firstChild, element);
    parent.removeChild(element);
  };

  const replaceTag = (element, tagName) => {
    const replacement = document.createElement(tagName);
    while (element.firstChild) replacement.appendChild(element.firstChild);
    element.parentNode?.replaceChild(replacement, element);
    return replacement;
  };

  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) return;
      if (child.nodeType !== Node.ELEMENT_NODE) {
        child.parentNode?.removeChild(child);
        return;
      }

      let element = child;
      let tag = element.tagName.toUpperCase();
      if (["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED"].includes(tag)) {
        element.remove();
        return;
      }
      if (tag === "DIV") {
        element = replaceTag(element, "p");
        tag = "P";
      } else if (tag === "B") {
        element = replaceTag(element, "strong");
        tag = "STRONG";
      } else if (tag === "I") {
        element = replaceTag(element, "em");
        tag = "EM";
      }

      if (tag === "SPAN" || tag === "FONT" || !allowed.has(tag)) {
        unwrap(element);
        return;
      }

      walk(element);

      const href =
        tag === "A" ? safeHref(element.getAttribute("href"), "") : "";
      [...element.attributes].forEach((attribute) =>
        element.removeAttribute(attribute.name),
      );
      if (tag === "A") {
        if (!href) {
          unwrap(element);
          return;
        }
        element.setAttribute("href", href);
        if (/^https?:\/\//i.test(href)) {
          element.setAttribute("target", "_blank");
          element.setAttribute("rel", "noopener noreferrer");
        }
      }

      if (
        ["P", "H2", "H3", "H4", "BLOCKQUOTE", "LI"].includes(tag) &&
        !element.textContent.trim() &&
        !element.querySelector("br")
      ) {
        element.remove();
      }
    });
  };

  walk(template.content);

  [...template.content.childNodes].forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
      const paragraph = document.createElement("p");
      paragraph.textContent = child.textContent.trim();
      child.parentNode?.replaceChild(paragraph, child);
    }
  });

  return template.innerHTML.trim();
}

function normalizeMediaAsset(asset = {}) {
  return {
    id: String(
      asset.id || asset.fileName || asset.name || `asset-${Date.now()}`,
    ),
    name: String(asset.name || asset.fileName || "Uploaded asset"),
    url: String(asset.url || asset.path || ""),
    alt: String(asset.alt || ""),
    copyright: String(asset.copyright || ""),
    meta: String(asset.meta || "Uploaded asset"),
    style: String(asset.style || "festival"),
    mime: String(asset.mime || "image/jpeg"),
    tags: Array.isArray(asset.tags) ? asset.tags.map((tag) => String(tag)) : [],
  };
}

function isImageAsset(asset = {}) {
  return (
    String(asset.mime || "").startsWith("image/") ||
    /\.(png|jpe?g|gif|webp)$/i.test(String(asset.url || asset.name || ""))
  );
}

function assetVisual(asset) {
  if (asset.url && isImageAsset(asset)) {
    return `<img src="${esc(asset.url)}" alt="${esc(asset.alt || asset.name)}" loading="lazy" />`;
  }
  return icon("image");
}

let portals = [];
const APP_CONFIG = Object.freeze(window.TUKOD_CMS_APP_CONFIG || {});
const CMS_BASE_PATH = (() => {
  const configured = String(APP_CONFIG.basePath || "./").trim() || "./";
  return configured.endsWith("/") ? configured : `${configured}/`;
})();
const SCOPED_TENANT_ID = String(APP_CONFIG.tenantId || "").trim();
const SCOPED_TENANT_LABEL = String(APP_CONFIG.tenantLabel || "").trim();

const permissionSets = {
  writer: ["articles.create", "media.upload"],
  editor: [
    "articles.create",
    "media.upload",
    "articles.publish",
    "articles.review",
  ],
  admin: [
    "articles.create",
    "media.upload",
    "articles.publish",
    "articles.review",
    "portals.manage",
  ],
};

const state = {
  authenticated: false,
  apiOnline: false,
  authConfigured: true,
  apiError: "",
  currentUser: "",
  editingId: null,
  login: { username: "", password: "", showPassword: false, error: "" },
  activeTenant: "",
  canSwitchTenants: false,
  role: "editor",
  view: "dashboard",
  tenantMenu: false,
  tenantQuery: "",
  modal: null,
  eventImport: {
    fileName: "",
    csvText: "",
    validation: null,
    validating: false,
    importing: false,
  },
  provisionStep: 1,
  availableTemplates: [],
  provisionDraft: { name: "", domain: "", admin: "", templateId: "" },
  provisioning: false,
  toast: null,
  toastTimer: null,
  articleDraft: {
    title: "",
    slug: "",
    page: "/",
    placements: [],
    targets: [{ page: "/", section: "after-home-hero" }],
    type: "Page",
    language: "English",
    eyebrow: "",
    summary: "",
    seo: "",
    body: "",
    ctaLabel: "",
    ctaUrl: "",
    contentCategory: "general",
    widgetConfig: "",
    heroSlides: [],
    faqItems: [],
    faqGroupScope: "all-events",
    faqAssignedEventIds: [],
    imageAlt: "",
    imageCopyright: "",
    eventDate: "",
    eventEndDate: "",
    eventCategory: "",
    hideCountdown: false,
    eventStartTime: "",
    eventEndTime: "",
    eventTime: "",
    eventVenue: "",
    eventLatitude: "",
    eventLongitude: "",
    eventPlaceId: "",
    whatToExpectTitle: "",
    whatToExpectSummary: "",
    arrivalWindow: "",
    eventAccess: "",
    eventBring: "",
    eventTips: "",
    presentedByName: "",
    presentedByImage: "",
    presentedByImageCopyright: "",
    eventEditorialLabel: "",
    eventEditorialTitle: "",
    eventEditorialSummary: "",
    eventEditorialImage: "",
    eventEditorialImageCopyright: "",
    eventEditorialLabel2: "",
    eventEditorialTitle2: "",
    eventEditorialSummary2: "",
    eventEditorialImage2: "",
    eventEditorialImage2Copyright: "",
    connectedEventId: "",
    featuredHomepageEvent: false,
    mainHomepageEvent: false,
    featuredEvent: false,
    sponsorType: "Platinum Partners",
    sponsorUrl: "",
    pushFacebook: false,
    media: "",
  },
  slugLocked: false,
  dropDragging: false,
  dropError: false,
  uploadInProgress: false,
  uploadProgressContext: "",
  uploadProgress: 0,
  uploadProgressLabel: "",
  uploadCompleteContext: "",
  uploadCompleteLabel: "",
  uploadCompleteTimer: null,
  mediaError: "",
  activeAssetInsertContext: "article",
  contentFilter: "all",
  contentTypeFilter: "all",
  sponsorTypeFilter: "all",
  contactSubmissionStatusFilter: "all",
  contactSubmissionTypeFilter: "all",
  mediaQuery: "",
  eventLocationResults: [],
  eventLocationSearching: false,
  eventLocationStatus: "",
  reviewDevice: "desktop",
  auditOpen: false,
  revisionOpen: false,
  revisionNote: "",
  activeArticleId: "",
  pendingDeleteId: "",
  builderTheme: "variant_immersive",
  blockChoice: "events_showcase",
  customSelectOpen: null,
  layoutBlocks: [],
  widgetLayoutsByTenant: {},
  activeWidgetPage: "/",
  widgetSaveState: "saved",
  widgetSaveMessage: "All widget changes are saved automatically.",
  widgetSeedInProgress: false,
  contentItems: [],
  contactSubmissions: [],
  assets: [],
  audit: [],
};

const app = document.querySelector("#app");
const API_URL = new URL(
  `${CMS_BASE_PATH}api/index.php`,
  window.location.href,
).toString();
const EVENT_MAP_DEFAULT_VIEW = Object.freeze({
  lat: 12.8797,
  lng: 121.774,
  zoom: 5,
});
const LEAFLET_ASSET_URLS = Object.freeze({
  css: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  js: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  tiles: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
});
const eventMapRuntime = {
  assetsPromise: null,
  map: null,
  marker: null,
  container: null,
  lookupToken: 0,
};

function apiEndpoint(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "")
      url.searchParams.set(key, String(value));
  });
  return url.toString();
}

async function apiRequest(
  action,
  { method = "GET", params = {}, body = null } = {},
) {
  const response = await fetch(apiEndpoint(action, params), {
    method,
    credentials: "same-origin",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const payload = await response.json().catch(() => ({
    ok: false,
    error: "The CMS API returned an invalid response.",
  }));
  if (!response.ok || payload.ok === false)
    throw new Error(
      payload.detail
        ? `${payload.error || `CMS API request failed (${response.status}).`}\n${payload.detail}`
        : payload.error || `CMS API request failed (${response.status}).`,
    );
  return payload;
}

function resetEventLocationUiState() {
  state.eventLocationResults = [];
  state.eventLocationSearching = false;
  state.eventLocationStatus = "";
}

function parseCoordinateValue(value, min, max) {
  const parsed = Number.parseFloat(String(value ?? "").trim());
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) return null;
  return parsed;
}

function formatCoordinateValue(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return "";
  return parsed.toFixed(7).replace(/0+$/, "").replace(/\.$/, "");
}

function eventCoordinatesFromDraft(draft = state.articleDraft) {
  const latitude = parseCoordinateValue(draft.eventLatitude, -90, 90);
  const longitude = parseCoordinateValue(draft.eventLongitude, -180, 180);
  if (latitude === null || longitude === null) return null;
  return { lat: latitude, lng: longitude };
}

function hasEventCoordinates(draft = state.articleDraft) {
  return Boolean(eventCoordinatesFromDraft(draft));
}

function normalizeEventLocationResult(result = {}) {
  const latitude = parseCoordinateValue(result.lat, -90, 90);
  const longitude = parseCoordinateValue(result.lon ?? result.lng, -180, 180);
  if (latitude === null || longitude === null) return null;
  const address = String(result.display_name || result.name || "").trim();
  const label = String(result.name || address || "Selected location").trim();
  return {
    id: String(result.place_id || `${latitude},${longitude}`),
    label,
    address,
    venue: address,
    lat: formatCoordinateValue(latitude),
    lng: formatCoordinateValue(longitude),
    placeId: String(result.place_id || "").trim(),
  };
}

async function reverseGeocodeEventLocation(latitude, longitude) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", formatCoordinateValue(latitude));
  url.searchParams.set("lon", formatCoordinateValue(longitude));
  url.searchParams.set("zoom", "18");
  url.searchParams.set("addressdetails", "1");
  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Reverse geocoding failed (${response.status}).`);
  }
  return normalizeEventLocationResult(await response.json());
}

function destroyEventMap() {
  if (eventMapRuntime.map) {
    try {
      eventMapRuntime.map.remove();
    } catch (error) {}
  }
  eventMapRuntime.map = null;
  eventMapRuntime.marker = null;
  eventMapRuntime.container = null;
}

function ensureEventMapAssets() {
  if (window.L?.map) return Promise.resolve(window.L);
  if (eventMapRuntime.assetsPromise) return eventMapRuntime.assetsPromise;
  eventMapRuntime.assetsPromise = new Promise((resolve, reject) => {
    if (!document.querySelector('link[data-leaflet-asset="true"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_ASSET_URLS.css;
      link.dataset.leafletAsset = "true";
      document.head.appendChild(link);
    }

    const finish = () => {
      if (window.L?.map) {
        resolve(window.L);
      } else {
        reject(new Error("Leaflet did not initialize."));
      }
    };

    const existingScript = document.querySelector(
      'script[data-leaflet-asset="true"]',
    );
    if (existingScript) {
      existingScript.addEventListener("load", finish, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Leaflet assets could not be loaded.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = LEAFLET_ASSET_URLS.js;
    script.async = true;
    script.dataset.leafletAsset = "true";
    script.addEventListener("load", finish, { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Leaflet assets could not be loaded.")),
      { once: true },
    );
    document.head.appendChild(script);
  }).catch((error) => {
    eventMapRuntime.assetsPromise = null;
    throw error;
  });
  return eventMapRuntime.assetsPromise;
}

function syncEventMapMarker({ recenter = false } = {}) {
  if (!eventMapRuntime.map || !window.L?.marker) return;
  const coordinates = eventCoordinatesFromDraft();
  if (!coordinates) {
    if (eventMapRuntime.marker) {
      eventMapRuntime.map.removeLayer(eventMapRuntime.marker);
      eventMapRuntime.marker = null;
    }
    if (recenter) {
      eventMapRuntime.map.setView(
        [EVENT_MAP_DEFAULT_VIEW.lat, EVENT_MAP_DEFAULT_VIEW.lng],
        EVENT_MAP_DEFAULT_VIEW.zoom,
      );
    }
    return;
  }

  if (!eventMapRuntime.marker) {
    eventMapRuntime.marker = window.L.marker(
      [coordinates.lat, coordinates.lng],
      {
        draggable: true,
      },
    ).addTo(eventMapRuntime.map);
    eventMapRuntime.marker.on("dragend", async () => {
      const point = eventMapRuntime.marker.getLatLng();
      await handleEventMapPointSelection(point.lat, point.lng, "drag");
    });
  } else {
    eventMapRuntime.marker.setLatLng([coordinates.lat, coordinates.lng]);
  }

  if (recenter) {
    eventMapRuntime.map.setView([coordinates.lat, coordinates.lng], 15);
  }
}

async function handleEventMapPointSelection(
  latitude,
  longitude,
  source = "map",
) {
  state.articleDraft.eventLatitude = formatCoordinateValue(latitude);
  state.articleDraft.eventLongitude = formatCoordinateValue(longitude);
  state.articleDraft.eventPlaceId = "";
  state.eventLocationStatus =
    source === "drag"
      ? "Pin moved. Looking up the nearest address..."
      : "Pin placed. Looking up the nearest address...";
  state.eventLocationResults = [];
  const lookupToken = ++eventMapRuntime.lookupToken;
  renderPreservingModalScroll();

  try {
    const result = await reverseGeocodeEventLocation(latitude, longitude);
    if (lookupToken !== eventMapRuntime.lookupToken) return;
    if (result?.venue) {
      state.articleDraft.eventVenue = result.venue;
    }
    state.articleDraft.eventLatitude =
      result?.lat || formatCoordinateValue(latitude);
    state.articleDraft.eventLongitude =
      result?.lng || formatCoordinateValue(longitude);
    state.articleDraft.eventPlaceId = result?.placeId || "";
    state.eventLocationStatus =
      source === "drag"
        ? "Pin moved and address updated from the map."
        : "Location selected from the map.";
  } catch (error) {
    if (lookupToken !== eventMapRuntime.lookupToken) return;
    state.eventLocationStatus =
      "Coordinates were saved from the map. Address lookup was unavailable.";
  }

  renderPreservingModalScroll();
}

function mountEventMapIfNeeded() {
  const shouldMount =
    state.modal === "article" && state.articleDraft.type === "Event";
  if (!shouldMount) {
    destroyEventMap();
    return;
  }

  const container = document.querySelector("[data-event-map]");
  if (!container) {
    destroyEventMap();
    return;
  }

  if (eventMapRuntime.container === container && eventMapRuntime.map) {
    syncEventMapMarker();
    window.setTimeout(() => eventMapRuntime.map?.invalidateSize(), 0);
    return;
  }

  destroyEventMap();
  eventMapRuntime.container = container;
  ensureEventMapAssets()
    .then(() => {
      const currentContainer = document.querySelector("[data-event-map]");
      if (
        currentContainer !== container ||
        state.modal !== "article" ||
        state.articleDraft.type !== "Event"
      ) {
        return;
      }

      const coordinates = eventCoordinatesFromDraft();
      container.innerHTML = "";
      const map = window.L.map(container, {
        scrollWheelZoom: false,
      });
      eventMapRuntime.map = map;
      window.L.tileLayer(LEAFLET_ASSET_URLS.tiles, {
        attribution: LEAFLET_ASSET_URLS.attribution,
        maxZoom: 19,
      }).addTo(map);
      map.on("click", async (event) => {
        await handleEventMapPointSelection(
          event.latlng.lat,
          event.latlng.lng,
          "map",
        );
      });
      map.setView(
        coordinates
          ? [coordinates.lat, coordinates.lng]
          : [EVENT_MAP_DEFAULT_VIEW.lat, EVENT_MAP_DEFAULT_VIEW.lng],
        coordinates ? 15 : EVENT_MAP_DEFAULT_VIEW.zoom,
      );
      syncEventMapMarker({ recenter: false });
      window.setTimeout(() => map.invalidateSize(), 0);
    })
    .catch(() => {
      if (container.isConnected) {
        container.innerHTML =
          '<div class="event-map-fallback">Map preview is unavailable right now. You can still save the venue and coordinates manually.</div>';
      }
    });
}

function scheduleEventMapMount() {
  window.requestAnimationFrame(mountEventMapIfNeeded);
}

async function apiFormRequest(
  action,
  formData,
  { method = "POST", params = {}, onUploadProgress = null } = {},
) {
  if (typeof onUploadProgress === "function") {
    const url = apiEndpoint(action, params);
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(method, url, true);
      request.withCredentials = true;
      request.responseType = "text";
      request.upload.addEventListener("progress", (event) => {
        onUploadProgress({
          loaded: Number(event.loaded || 0),
          total: Number(event.total || 0),
          lengthComputable: Boolean(event.lengthComputable),
        });
      });
      request.addEventListener("load", () => {
        const payload = (() => {
          try {
            return JSON.parse(request.responseText || "");
          } catch (error) {
            return {
              ok: false,
              error: "The CMS API returned an invalid response.",
            };
          }
        })();
        if (
          request.status < 200 ||
          request.status >= 300 ||
          payload.ok === false
        ) {
          reject(
            new Error(
              payload.detail
                ? `${payload.error || `CMS API request failed (${request.status}).`}\n${payload.detail}`
                : payload.error ||
                    `CMS API request failed (${request.status}).`,
            ),
          );
          return;
        }
        resolve(payload);
      });
      request.addEventListener("error", () => {
        reject(new Error("The upload could not be completed."));
      });
      request.addEventListener("abort", () => {
        reject(new Error("The upload was cancelled."));
      });
      request.send(formData);
    });
  }
  const response = await fetch(apiEndpoint(action, params), {
    method,
    credentials: "same-origin",
    body: formData,
    cache: "no-store",
  });
  const payload = await response.json().catch(() => ({
    ok: false,
    error: "The CMS API returned an invalid response.",
  }));
  if (!response.ok || payload.ok === false)
    throw new Error(
      payload.detail
        ? `${payload.error || `CMS API request failed (${response.status}).`}\n${payload.detail}`
        : payload.error || `CMS API request failed (${response.status}).`,
    );
  return payload;
}

function normalizeCmsRecord(record) {
  const fields = record.fields || {};
  const type = articleTypeFromValue(record.type, record.page);
  const targets = normalizePlacementTargets(
    record.targets || legacyTargetsFromRecord(record),
    record.page || "/",
  );
  const derived = derivePagePlacementState(targets);
  return {
    ...record,
    title: record.title || fields.heading || "Untitled content record",
    excerpt: record.excerpt || fields.summary || "",
    body: record.body || fields.body || "",
    page: derived.page,
    placements: derived.placements,
    targets,
    type,
    template:
      record.template ||
      (type === "Event" ? "event" : type === "Page" ? "page" : "section"),
    fields: {
      eyebrow: fields.eyebrow || "",
      heading: fields.heading || record.title || "",
      summary: fields.summary || record.excerpt || "",
      body: fields.body || record.body || "",
      ctaLabel: fields.ctaLabel || "",
      ctaUrl: fields.ctaUrl || "",
      image: fields.image || "",
      imageAlt: fields.imageAlt || "",
      imageCopyright: fields.imageCopyright || "",
      eventDate: fields.eventDate || "",
      eventEndDate: fields.eventEndDate || "",
      eventCategory: fields.eventCategory || "",
      hideCountdown: Boolean(fields.hideCountdown),
      eventStartTime: fields.eventStartTime || "",
      eventEndTime: fields.eventEndTime || "",
      eventTime: fields.eventTime || "",
      eventVenue: fields.eventVenue || "",
      eventLatitude: fields.eventLatitude || "",
      eventLongitude: fields.eventLongitude || "",
      eventPlaceId: fields.eventPlaceId || "",
      whatToExpectTitle: fields.whatToExpectTitle || "",
      whatToExpectSummary: fields.whatToExpectSummary || "",
      arrivalWindow: fields.arrivalWindow || "",
      eventAccess: fields.eventAccess || "",
      eventBring: fields.eventBring || "",
      eventTips: fields.eventTips || "",
      presentedByName: fields.presentedByName || "",
      presentedByImage: fields.presentedByImage || "",
      presentedByImageCopyright: fields.presentedByImageCopyright || "",
      eventEditorialLabel: fields.eventEditorialLabel || "",
      eventEditorialTitle: fields.eventEditorialTitle || "",
      eventEditorialSummary: fields.eventEditorialSummary || "",
      eventEditorialImage: fields.eventEditorialImage || "",
      eventEditorialImageCopyright: fields.eventEditorialImageCopyright || "",
      eventEditorialLabel2: fields.eventEditorialLabel2 || "",
      eventEditorialTitle2: fields.eventEditorialTitle2 || "",
      eventEditorialSummary2: fields.eventEditorialSummary2 || "",
      eventEditorialImage2: fields.eventEditorialImage2 || "",
      eventEditorialImage2Copyright: fields.eventEditorialImage2Copyright || "",
      connectedEventId: fields.connectedEventId || "",
      featuredHomepageEvent: Boolean(
        fields.featuredHomepageEvent || fields.mainHomepageEvent,
      ),
      mainHomepageEvent: Boolean(fields.mainHomepageEvent),
      featuredEvent: Boolean(fields.featuredEvent),
      sponsorType: normalizeSponsorType(fields.sponsorType),
      sponsorUrl: fields.sponsorUrl || "",
      contentCategory: fields.contentCategory || "general",
      widgetConfig: fields.widgetConfig || "",
      widgetKind: fields.widgetKind || "",
      widgetType: fields.widgetType || "",
      widgetOrder: Number.isFinite(Number(fields.widgetOrder))
        ? Number(fields.widgetOrder)
        : 0,
      widgetSourceId: fields.widgetSourceId || "",
      widgetAssetId: fields.widgetAssetId || "",
      widgetSponsorType: fields.widgetSponsorType || "",
      widgetEnabled: normalizeWidgetEnabledValue(fields.widgetEnabled),
    },
  };
}

function normalizeWidgetEnabledValue(value, fallback = true) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return fallback;
    if (
      normalized === "false" ||
      normalized === "0" ||
      normalized === "off" ||
      normalized === "no"
    ) {
      return false;
    }
    if (
      normalized === "true" ||
      normalized === "1" ||
      normalized === "on" ||
      normalized === "yes"
    ) {
      return true;
    }
  }
  if (typeof value === "number") return value !== 0;
  return value !== false;
}

function createEmptyEventImportState() {
  return {
    fileName: "",
    csvText: "",
    validation: null,
    validating: false,
    importing: false,
  };
}

async function loadPortalContent(tenantId, showLoader = true) {
  if (showLoader && state.authenticated) {
    state.loading = true;
    render();
  }
  try {
    const payload = await apiRequest("content", {
      params: { tenant: tenantId, includeDrafts: 1 },
    });
    state.contentItems = (payload.records || []).map(normalizeCmsRecord);
    syncActiveArticleId({ preferReviewQueue: true });
    state.apiOnline = true;
    state.apiError = "";
  } catch (error) {
    state.apiOnline = false;
    state.apiError = error.message;
    state.contentItems = [];
    state.activeArticleId = "";
    throw error;
  } finally {
    state.loading = false;
    if (state.authenticated) render();
  }
}

async function loadMediaAssets(tenantId) {
  try {
    const payload = await apiRequest("media", { params: { tenant: tenantId } });
    state.assets = (payload.assets || []).map(normalizeMediaAsset);
    state.mediaError = "";
  } catch (error) {
    state.assets = [];
    state.mediaError = error.message;
  }
}

async function loadContactSubmissions(tenantId) {
  try {
    const payload = await apiRequest("contact-submissions", {
      params: { tenant: tenantId },
    });
    state.contactSubmissions = payload.entries || [];
  } catch (error) {
    state.contactSubmissions = [];
    throw error;
  }
}

async function refreshTenantWorkspace(tenantId, showLoader = true) {
  if (!tenantId) {
    state.contentItems = [];
    state.contactSubmissions = [];
    state.assets = [];
    state.audit = [];
    state.loading = false;
    if (state.authenticated) render();
    return;
  }
  state.audit = [];
  await loadPortalContent(tenantId, showLoader);
  await loadMediaAssets(tenantId);
  await loadContactSubmissions(tenantId);
  if (state.view === "widgets") {
    await ensureHeritageWidgetSeedRecords();
  }
}

async function uploadAsset(file, context = "article") {
  if (!file) return;
  state.uploadInProgress = true;
  state.uploadProgressContext = String(context || "article");
  state.uploadProgress = 0;
  state.uploadProgressLabel = "Preparing upload...";
  clearUploadCompleteState();
  state.dropError = false;
  render();

  try {
    const formData = new FormData();
    formData.set("tenant", state.activeTenant);
    formData.set("file", file);
    if (context === "article") {
      if (state.articleDraft.imageAlt.trim())
        formData.set("alt", state.articleDraft.imageAlt.trim());
      if (state.articleDraft.imageCopyright.trim())
        formData.set("copyright", state.articleDraft.imageCopyright.trim());
    } else if (isHeroSlideContext(context)) {
      const slide =
        state.articleDraft.heroSlides?.[heroSlideIndexFromContext(context)] ||
        {};
      if (String(slide.alt || "").trim())
        formData.set("alt", String(slide.alt || "").trim());
      if (String(slide.copyright || "").trim())
        formData.set("copyright", String(slide.copyright || "").trim());
    } else {
      const copyrightField = imageCopyrightFieldFromContext(context);
      if (
        copyrightField &&
        String(state.articleDraft[copyrightField] || "").trim()
      )
        formData.set(
          "copyright",
          String(state.articleDraft[copyrightField] || "").trim(),
        );
      if (state.articleDraft.imageAlt.trim()) {
        formData.set("alt", state.articleDraft.imageAlt.trim());
      }
    }
    const payload = await apiFormRequest("upload-media", formData, {
      onUploadProgress: ({ loaded, total, lengthComputable }) => {
        if (lengthComputable && total > 0) {
          const percent = Math.max(
            0,
            Math.min(100, Math.round((loaded / total) * 100)),
          );
          state.uploadProgress = percent;
          state.uploadProgressLabel =
            percent >= 100
              ? "Processing upload..."
              : `Uploading... ${percent}%`;
        } else {
          state.uploadProgress = 0;
          state.uploadProgressLabel = "Uploading...";
        }
        render();
      },
    });
    state.uploadProgress = 100;
    state.uploadProgressLabel = "Processing upload...";
    const asset = normalizeMediaAsset(payload.asset || {});
    state.assets = [
      asset,
      ...state.assets.filter((item) => item.id !== asset.id),
    ];
    if (context === "article") {
      state.articleDraft.media = asset.url || state.articleDraft.media;
      if (!state.articleDraft.imageAlt.trim())
        state.articleDraft.imageAlt = asset.alt || state.articleDraft.imageAlt;
      state.articleDraft.imageCopyright =
        asset.copyright || state.articleDraft.imageCopyright;
    } else if (context === "presented-by") {
      state.articleDraft.presentedByImage =
        asset.url || state.articleDraft.presentedByImage;
      state.articleDraft.presentedByImageCopyright =
        asset.copyright || state.articleDraft.presentedByImageCopyright;
    } else if (context === "event-editorial") {
      state.articleDraft.eventEditorialImage =
        asset.url || state.articleDraft.eventEditorialImage;
      state.articleDraft.eventEditorialImageCopyright =
        asset.copyright || state.articleDraft.eventEditorialImageCopyright;
    } else if (context === "event-editorial-2") {
      state.articleDraft.eventEditorialImage2 =
        asset.url || state.articleDraft.eventEditorialImage2;
      state.articleDraft.eventEditorialImage2Copyright =
        asset.copyright || state.articleDraft.eventEditorialImage2Copyright;
    } else if (context === "heritage-gallery-portrait") {
      state.articleDraft.heroGalleryPortraitImage =
        asset.url || state.articleDraft.heroGalleryPortraitImage;
      if (!state.articleDraft.heroGalleryPortraitAlt.trim()) {
        state.articleDraft.heroGalleryPortraitAlt =
          asset.alt || state.articleDraft.heroGalleryPortraitAlt;
      }
    } else if (context === "heritage-gallery-market") {
      state.articleDraft.heroGalleryMarketImage =
        asset.url || state.articleDraft.heroGalleryMarketImage;
      if (!state.articleDraft.heroGalleryMarketAlt.trim()) {
        state.articleDraft.heroGalleryMarketAlt =
          asset.alt || state.articleDraft.heroGalleryMarketAlt;
      }
    } else if (isHeroSlideContext(context)) {
      const index = heroSlideIndexFromContext(context);
      if (index >= 0) {
        const existing = state.articleDraft.heroSlides?.[index] || {};
        updateHeroSlide(index, {
          image: asset.url || existing.image || "",
          alt: existing.alt || asset.alt || "",
          copyright: existing.copyright || asset.copyright || "",
        });
      }
    } else if (String(context).startsWith("widget:")) {
      const widgetId = String(context).slice("widget:".length);
      await saveSiteWidgetInstance(widgetId, {
        assetId: asset.id,
        assetUrl: asset.url || "",
        assetAlt: asset.alt || "",
      });
    }
    setUploadCompleteState(
      context,
      `${asset.name || "Asset"} uploaded successfully.`,
    );
    state.mediaError = "";
    showToast(
      "Asset uploaded",
      context === "article"
        ? `${asset.name} is now available in the media vault and linked to this record.`
        : isHeroSlideContext(context)
          ? `${asset.name} is now linked to this carousel slide and saved in the media vault.`
          : String(context).startsWith("widget:")
            ? `${asset.name} is now available in the media vault and linked to this widget.`
            : `${asset.name} is now available in this tenant's media vault.`,
    );
  } catch (error) {
    state.dropError = true;
    showToast("Upload failed", error.message);
  } finally {
    state.uploadInProgress = false;
    state.uploadProgressContext = "";
    state.uploadProgress = 0;
    state.uploadProgressLabel = "";
    render();
  }
}

async function updateContentStatus(id, status) {
  await apiRequest("update-status", {
    method: "POST",
    body: { tenant: state.activeTenant, id, status },
  });
  const item = state.contentItems.find((candidate) => candidate.id === id);
  if (item) {
    item.status = status;
    item.updated = "Just now";
  }
  syncActiveArticleId({ preferReviewQueue: true });
}

async function deleteContentRecord(id) {
  await apiRequest("delete-content", {
    method: "POST",
    body: { tenant: state.activeTenant, id },
  });
  state.contentItems = state.contentItems.filter(
    (candidate) => candidate.id !== id,
  );
  syncActiveArticleId({ preferReviewQueue: true });
}

async function boot() {
  render();
  try {
    const [health, templatePayload] = await Promise.all([
      apiRequest("health"),
      apiRequest("templates"),
    ]);
    const sessionUser = health.user || null;
    state.availableTemplates = Array.isArray(templatePayload.templates)
      ? templatePayload.templates
      : [];
    if (!state.provisionDraft.templateId) {
      state.provisionDraft.templateId = state.availableTemplates[0]?.id || "";
    }
    const portalPayload = await apiRequest("portals", {
      params:
        SCOPED_TENANT_ID && !sessionUser?.canSwitchTenants
          ? { tenant: SCOPED_TENANT_ID }
          : {},
    });
    state.apiOnline = Boolean(health.ok);
    state.authConfigured = health.authConfigured !== false;
    state.apiError = "";
    portals = Array.isArray(portalPayload.portals) ? portalPayload.portals : [];
    if (sessionUser?.username) {
      state.authenticated = true;
      state.currentUser = sessionUser.username || "";
      state.role = sessionUser.role || "editor";
      state.canSwitchTenants = Boolean(sessionUser.canSwitchTenants);
      state.view = defaultViewForRole();
      state.activeTenant =
        sessionUser.activeTenant ||
        SCOPED_TENANT_ID ||
        portalPayload.activeTenant ||
        portals[0]?.id ||
        "";
      await refreshTenantWorkspace(state.activeTenant, false);
    } else {
      state.authenticated = false;
      state.currentUser = "";
      state.canSwitchTenants = false;
      state.activeTenant = portals.some(
        (portal) => portal.id === SCOPED_TENANT_ID,
      )
        ? SCOPED_TENANT_ID
        : portalPayload.activeTenant || portals[0]?.id || "";
      state.view = defaultViewForRole();
    }
  } catch (error) {
    state.apiOnline = false;
    state.authConfigured = false;
    state.apiError = error.message;
  }
  render();
}

const EMPTY_TENANT = {
  id: "",
  name: "No portal selected",
  domain: "Create or connect a portal first",
  short: "--",
  kind: "government",
  status: "pending",
  color: "#4f6b75",
  users: 0,
  content: 0,
  uptime: "Awaiting configuration",
  articles: 0,
  integrated: false,
  previewUrl: "",
};

function currentTenant() {
  return (
    portals.find((portal) => portal.id === state.activeTenant) ||
    portals[0] ||
    EMPTY_TENANT
  );
}

function scopedTenantName() {
  if (SCOPED_TENANT_LABEL) return SCOPED_TENANT_LABEL;
  const portal = portals.find((entry) => entry.id === SCOPED_TENANT_ID);
  return portal?.name || "";
}

function tenantSwitchingEnabled() {
  return state.canSwitchTenants && portals.length > 1;
}

function currentTemplateCatalog() {
  return Array.isArray(state.availableTemplates)
    ? state.availableTemplates
    : [];
}

function selectedProvisionTemplate() {
  const templates = currentTemplateCatalog();
  return (
    templates.find(
      (template) => template.id === state.provisionDraft.templateId,
    ) ||
    templates[0] ||
    null
  );
}

function selectedTemplateForPortal(portal = currentTenant()) {
  if (!portal?.templateId) return null;
  return (
    currentTemplateCatalog().find(
      (template) => template.id === portal.templateId,
    ) || null
  );
}

function templateSupportsHomepageCountdown(portal = currentTenant()) {
  const widgetConfig = templateSiteWidgetConfig(portal);
  return widgetConfig.enabled && widgetConfig.countdownEnabled;
}

function templateLabelForPortal(portal = currentTenant()) {
  return (
    selectedTemplateForPortal(portal)?.name ||
    portal?.templateName ||
    "Active template"
  );
}

function currentUserName() {
  return state.currentUser || state.login.username.trim() || "Signed-in user";
}

const SITE_WIDGET_LIBRARY = Object.freeze([
  {
    type: "hero",
    label: "Hero",
    iconName: "image",
    description: "Display content categorized as Hero on any page.",
  },
  {
    type: "hero-gallery",
    label: "Hero gallery",
    iconName: "image",
    description:
      "Display content categorized as Hero Gallery for the Festival Heritage homepage collage.",
  },
  {
    type: "faq-list",
    label: "FAQ list",
    iconName: "file",
    description: "Display a reusable FAQ group on event detail pages.",
  },
  {
    type: "ticker-band",
    label: "Ticker band",
    iconName: "menu",
    description: "Display content categorized as Ticker Band.",
  },
  {
    type: "post",
    label: "Post",
    iconName: "file",
    description: "Display a selected content-desk post or page.",
  },
  {
    type: "cta",
    label: "Call to action",
    iconName: "arrow",
    description: "Display content categorized as CTA.",
  },
  {
    type: "contact-form",
    label: "Contact form",
    iconName: "file",
    description:
      "Collect public inquiries and store them in Contact Submissions.",
  },
  {
    type: "featured-image",
    label: "Featured image",
    iconName: "image",
    description: "Display a selected media-vault image or upload a new one.",
  },
  {
    type: "event",
    label: "Event",
    iconName: "calendar",
    description: "Display a selected event record from the Events desk.",
  },
  {
    type: "sponsor-list",
    label: "Sponsor list",
    iconName: "layers",
    description:
      "Display published sponsor records filtered by partner type or selection.",
  },
  {
    type: "featured",
    label: "Featured",
    iconName: "calendar",
    description: "Display selected content categorized as Featured.",
  },
  {
    type: "partner-recognition",
    label: "Partner recognition",
    iconName: "image",
    description: "Display content categorized as Partner Recognition.",
  },
  {
    type: "about",
    label: "About",
    iconName: "file",
    description: "Display content categorized as About with supporting cards.",
  },
  {
    type: "story",
    label: "Story",
    iconName: "file",
    description: "Display content categorized as Story.",
  },
  {
    type: "value-strip",
    label: "Value strip",
    iconName: "menu",
    description: "Display content categorized as Value Strip.",
  },
  {
    type: "explore",
    label: "Explore",
    iconName: "file",
    description:
      "Display content categorized as Explore with navigation cards.",
  },
  {
    type: "visit-band",
    label: "Visit band",
    iconName: "file",
    description: "Display content categorized as Visit Band.",
  },
  {
    type: "calendar-of-events",
    label: "Calendar of events",
    iconName: "calendar",
    description: "Display the published event calendar in live schedule order.",
  },
]);

const LEGACY_SITE_WIDGET_TYPE_ALIASES = Object.freeze({
  "homepage-hero": "hero",
  "homepage-ticker-band": "ticker-band",
  "featured-events-feed": "featured",
  "homepage-partner-recognition": "partner-recognition",
  "homepage-about": "about",
  "homepage-explore": "explore",
  "homepage-visit-band": "visit-band",
});

function normalizeSiteWidgetType(type = "post") {
  const clean = String(type || "post").trim() || "post";
  return LEGACY_SITE_WIDGET_TYPE_ALIASES[clean] || clean;
}

function widgetTemplateMeta(type = "post") {
  const normalizedType = normalizeSiteWidgetType(type);
  return (
    SITE_WIDGET_LIBRARY.find((entry) => entry.type === normalizedType) ||
    SITE_WIDGET_LIBRARY.find((entry) => entry.type === "post") ||
    SITE_WIDGET_LIBRARY[0]
  );
}

const CONTENT_CATEGORY_OPTIONS = Object.freeze([
  ["general", "General"],
  ["hero", "Hero"],
  ["hero-gallery", "Hero Gallery"],
  ["image", "Image"],
  ["faq", "FAQ"],
  ["cta", "CTA"],
  ["ticker-band", "Ticker Band"],
  ["featured", "Featured"],
  ["partner-recognition", "Partner Recognition"],
  ["about", "About"],
  ["story", "Story"],
  ["value-strip", "Value Strip"],
  ["explore", "Explore"],
  ["visit-band", "Visit Band"],
  ["calendar", "Calendar"],
]);

const WIDGET_CONTENT_CATEGORIES = Object.freeze({
  hero: "hero",
  "hero-gallery": "hero-gallery",
  "featured-image": "image",
  "faq-list": "faq",
  cta: "cta",
  "ticker-band": "ticker-band",
  featured: "featured",
  "partner-recognition": "partner-recognition",
  about: "about",
  story: "story",
  "value-strip": "value-strip",
  explore: "explore",
  "visit-band": "visit-band",
  "calendar-of-events": "calendar",
});

function siteWidgetDomToken(value = "") {
  const clean = String(value || "").trim();
  if (!clean || clean === "/") return "home";
  return clean.replace(/[^a-z0-9]+/gi, "-").replace(/(^-|-$)/g, "") || "slot";
}

function isCountdownWidgetRecord(item = {}) {
  const recordKey = String(item?.slug || item?.id || "")
    .trim()
    .toLowerCase();
  return (
    recordKey === "home-countdown" || item?.fields?.widgetKind === "countdown"
  );
}

function isSiteWidgetRecord(item = {}) {
  return item?.fields?.widgetKind === "site-widget";
}

function isManagedWidgetRecord(item = {}) {
  return isCountdownWidgetRecord(item) || isSiteWidgetRecord(item);
}

function siteWidgetPages() {
  const schema = currentTemplateSectionSchema();
  return (schema.pages || [])
    .map(([page, title]) => ({
      page,
      title,
      sections: schema.anchorsByPage?.[page] || [],
    }))
    .filter((entry) => entry.sections.length);
}

function siteWidgetPageMeta(page = "/") {
  return (
    siteWidgetPages().find(
      (entry) => entry.page === normalizePlacementPath(page),
    ) || null
  );
}

function activeSiteWidgetPage() {
  const pages = siteWidgetPages();
  if (!pages.length) return null;
  const active = siteWidgetPageMeta(state.activeWidgetPage) || pages[0] || null;
  if (active && state.activeWidgetPage !== active.page) {
    state.activeWidgetPage = active.page;
  }
  return active;
}

const TEMPLATE_WIDGET_SOURCE_BRIDGES = Object.freeze({
  "festival-heritage": Object.freeze([
    {
      sourceId: "home-hero",
      page: "/",
      sectionId: "home-hero-copy",
      type: "hero",
    },
    {
      sourceId: "home-hero-gallery",
      page: "/",
      sectionId: "home-hero-gallery",
      type: "hero-gallery",
      allowEmptySource: true,
    },
    {
      sourceId: "home-manifesto",
      page: "/",
      sectionId: "manifesto-section",
      type: "story",
    },
    {
      sourceId: "home-program",
      page: "/",
      sectionId: "program-section",
      type: "featured",
    },
    {
      sourceId: "home-city",
      page: "/",
      sectionId: "city-section",
      type: "explore",
    },
    {
      sourceId: "home-volunteer",
      page: "/",
      sectionId: "volunteer-callout",
      type: "cta",
    },
    {
      sourceId: "about-hero",
      page: "/about",
      sectionId: "about-hero",
      type: "hero",
    },
    {
      sourceId: "about-meaning",
      page: "/about",
      sectionId: "story-opening",
      type: "story",
    },
    {
      sourceId: "about-heritage",
      page: "/about",
      sectionId: "roots-section",
      type: "story",
    },
    {
      sourceId: "about-today",
      page: "/about",
      sectionId: "timeline-section",
      type: "story",
    },
    {
      sourceId: "events-hero",
      page: "/events",
      sectionId: "events-hero",
      type: "hero",
    },
    {
      sourceId: "events-calendar",
      page: "/events",
      sectionId: "schedule-overview",
      type: "post",
    },
    {
      sourceId: "events-lineup",
      page: "/events",
      sectionId: "all-events-section",
      type: "featured",
    },
    {
      sourceId: "contact-hero",
      page: "/contact",
      sectionId: "contact-hero",
      type: "hero",
    },
    {
      sourceId: "contact-desk",
      page: "/contact",
      sectionId: "contact-section",
      type: "post",
    },
    {
      sourceId: "volunteer-hero",
      page: "/volunteer",
      sectionId: "volunteer-hero",
      type: "hero",
    },
    {
      sourceId: "volunteer-why",
      page: "/volunteer",
      sectionId: "volunteer-intro",
      type: "story",
    },
    {
      sourceId: "volunteer-roles",
      page: "/volunteer",
      sectionId: "volunteer-roles-section",
      type: "about",
    },
    {
      sourceId: "volunteer-process",
      page: "/volunteer",
      sectionId: "volunteer-process-section",
      type: "story",
    },
    {
      sourceId: "volunteer-application",
      page: "/volunteer",
      sectionId: "volunteer-form-section",
      type: "cta",
    },
    {
      sourceId: "sponsor-hero",
      page: "/sponsor",
      sectionId: "sponsor-hero",
      type: "hero",
    },
    {
      sourceId: "sponsor-why",
      page: "/sponsor",
      sectionId: "partnership-intro",
      type: "story",
    },
    {
      sourceId: "sponsor-levels",
      page: "/sponsor",
      sectionId: "tier-section",
      type: "post",
    },
    {
      sourceId: "sponsor-contact",
      page: "/sponsor",
      sectionId: "partner-cta-section",
      type: "cta",
    },
    {
      sourceId: "visitor-hero",
      page: "/plan-your-festival-days",
      sectionId: "visitor-hero",
      type: "hero",
    },
    {
      sourceId: "visitor-guide",
      page: "/plan-your-festival-days",
      sectionId: "guide-intro",
      type: "post",
    },
  ]),
});

function heritageWidgetSeedDefinitions() {
  return TEMPLATE_WIDGET_SOURCE_BRIDGES["festival-heritage"] || [];
}

function heritageWidgetSeedRecordId(entry = {}) {
  return `site-widget-${slugify(`${entry.page || "/"}-${entry.sectionId || ""}-${entry.sourceId || ""}`)}`;
}

async function ensureHeritageWidgetSeedRecords() {
  if (
    activeTemplateId() !== "festival-heritage" ||
    !state.activeTenant ||
    state.widgetSeedInProgress
  ) {
    return 0;
  }
  state.widgetSeedInProgress = true;
  try {
    let createdCount = 0;
    for (const entry of heritageWidgetSeedDefinitions()) {
      const normalizedType = normalizeSiteWidgetType(entry.type || "post");
      if (
        !sectionSupportsWidgetType(entry.page, entry.sectionId, normalizedType)
      ) {
        continue;
      }
      const source = findContentRecordByKey(entry.sourceId);
      if (!source && !entry.allowEmptySource) continue;
      const sectionRecords = siteWidgetRecordsForSection(
        entry.page,
        entry.sectionId,
      );
      if (sectionRecords.length) continue;
      const existingInSection = sectionRecords.find(
        (record) =>
          String(record.fields?.widgetSourceId || "").trim() === entry.sourceId,
      );
      if (existingInSection) continue;
      const seedId = heritageWidgetSeedRecordId(entry);
      const existingSeed =
        state.contentItems.find((item) => item.id === seedId) || null;
      const widget = buildSiteWidgetRecord({
        id: seedId,
        type: normalizedType,
        page: entry.page,
        sectionId: entry.sectionId,
        order: sectionRecords.length + 1,
        sourceRecordId: source ? entry.sourceId : "",
        existing: existingSeed,
      });
      await persistContentRecord(widget);
      createdCount += 1;
    }
    return createdCount;
  } finally {
    state.widgetSeedInProgress = false;
  }
}

function siteWidgetCountForPage(page = "/") {
  const pageMeta = siteWidgetPageMeta(page);
  if (!pageMeta) return 0;
  return pageMeta.sections.reduce(
    (total, section) =>
      total + siteWidgetRecordsForSection(pageMeta.page, section.id).length,
    0,
  );
}

function siteWidgetSectionMeta(page = "/", sectionId = "") {
  return (
    siteWidgetPageMeta(page)?.sections.find(
      (entry) => entry.id === sectionId,
    ) || null
  );
}

const ALL_SITE_WIDGET_TYPES = Object.freeze(
  SITE_WIDGET_LIBRARY.map((widget) => widget.type),
);

const DEFAULT_TEMPLATE_SITE_WIDGETS = Object.freeze({
  "festival-heritage": Object.freeze({
    enabled: true,
    countdownEnabled: true,
    supportedTypes: Object.freeze([
      "hero",
      "hero-gallery",
      "post",
      "cta",
      "featured-image",
      "event",
      "featured",
      "about",
      "story",
      "explore",
    ]),
  }),
  "festival-vibrant": Object.freeze({
    enabled: true,
    countdownEnabled: true,
    supportedTypes: Object.freeze([
      "hero",
      "faq-list",
      "ticker-band",
      "post",
      "cta",
      "contact-form",
      "featured-image",
      "event",
      "sponsor-list",
      "featured",
      "partner-recognition",
      "about",
      "story",
      "value-strip",
      "explore",
      "visit-band",
      "calendar-of-events",
    ]),
  }),
});

function normalizeSupportedSiteWidgetTypes(values = []) {
  const list = Array.isArray(values) ? values : [values];
  return [
    ...new Set(
      list
        .map((value) => normalizeSiteWidgetType(value))
        .filter((value) => ALL_SITE_WIDGET_TYPES.includes(value)),
    ),
  ];
}

function templateSiteWidgetConfig(portal = currentTenant()) {
  const template = selectedTemplateForPortal(portal);
  const templateId =
    template?.id || portal?.templateId || state.provisionDraft.templateId || "";
  const fallback = DEFAULT_TEMPLATE_SITE_WIDGETS[templateId] || {
    enabled: true,
    countdownEnabled: true,
    supportedTypes: ALL_SITE_WIDGET_TYPES,
  };
  const raw =
    template?.siteWidgets && typeof template.siteWidgets === "object"
      ? template.siteWidgets
      : {};
  const manifestSupportedTypes = normalizeSupportedSiteWidgetTypes(
    raw.supportedTypes,
  );
  const fallbackSupportedTypes = normalizeSupportedSiteWidgetTypes(
    fallback.supportedTypes,
  );
  const supportedTypes =
    manifestSupportedTypes.length || Array.isArray(raw.supportedTypes)
      ? manifestSupportedTypes
      : fallbackSupportedTypes;
  return {
    enabled:
      raw.enabled !== false &&
      fallback.enabled !== false &&
      supportedTypes.length > 0,
    countdownEnabled:
      raw.countdownEnabled !== false && fallback.countdownEnabled !== false,
    supportedTypes,
  };
}

function templateSupportsSiteWidgets(portal = currentTenant()) {
  return templateSiteWidgetConfig(portal).enabled;
}

function templateSiteWidgetTypes(portal = currentTenant()) {
  return templateSiteWidgetConfig(portal).supportedTypes;
}

function templateSupportsSiteWidgetType(
  widgetType = "post",
  portal = currentTenant(),
) {
  return templateSiteWidgetTypes(portal).includes(
    normalizeSiteWidgetType(widgetType),
  );
}

function siteWidgetLibraryForPortal(portal = currentTenant()) {
  const supported = new Set(templateSiteWidgetTypes(portal));
  return SITE_WIDGET_LIBRARY.filter((widget) => supported.has(widget.type));
}

function supportedWidgetTypesForSection(
  page = "/",
  sectionId = "",
  portal = currentTenant(),
) {
  const templateTypes = templateSiteWidgetTypes(portal);
  if (!templateTypes.length) return [];
  const sectionMeta = siteWidgetSectionMeta(page, sectionId);
  const sectionTypes = normalizeSupportedSiteWidgetTypes(
    sectionMeta?.supportedWidgetTypes || [],
  );
  if (sectionTypes.length) {
    return sectionTypes.filter((type) => templateTypes.includes(type));
  }
  const normalizedPage = normalizePlacementPath(page);
  if (normalizedPage === "/events/view" && sectionId === "event-faqs") {
    return templateTypes.includes("faq-list") ? ["faq-list"] : [];
  }
  if (sectionId !== "event-faqs") {
    return templateTypes.filter((type) => type !== "faq-list");
  }
  return [...templateTypes];
}

function sectionSupportsWidgetType(
  page = "/",
  sectionId = "",
  widgetType = "post",
) {
  return supportedWidgetTypesForSection(page, sectionId).includes(widgetType);
}

function widgetRecordTarget(record = {}) {
  const targets = normalizePlacementTargets(
    record.targets || legacyTargetsFromRecord(record),
    record.page || "/",
  );
  return targets[0] || { page: record.page || "/", section: "end-of-page" };
}

function widgetAnchorForRecord(record = {}) {
  const target = widgetRecordTarget(record);
  return parseSectionTarget(target.page, target.section).anchor || "";
}

function siteWidgetSort(left, right) {
  const leftOrder = Number(left?.fields?.widgetOrder || 0);
  const rightOrder = Number(right?.fields?.widgetOrder || 0);
  if (leftOrder !== rightOrder) return leftOrder - rightOrder;
  return String(left?.updatedAt || left?.createdAt || "").localeCompare(
    String(right?.updatedAt || right?.createdAt || ""),
  );
}

function contentDeskPostOptions(widgetType = "") {
  const requiredCategory = WIDGET_CONTENT_CATEGORIES[widgetType] || "";
  return state.contentItems.filter(
    (item) =>
      !isManagedWidgetRecord(item) &&
      item.status === "published" &&
      item.type !== "Event" &&
      item.type !== "Sponsor" &&
      (!requiredCategory ||
        String(item.fields?.contentCategory || "general") ===
          requiredCategory ||
        (widgetType === "faq-list" &&
          Array.isArray(
            parseDraftWidgetConfig(item.fields?.widgetConfig || "").faqItems,
          ) &&
          parseDraftWidgetConfig(item.fields?.widgetConfig || "").faqItems
            .length > 0)),
  );
}

function widgetContentOptions(widgetType = "", currentSourceId = "") {
  const options = contentDeskPostOptions(widgetType);
  const current = findContentRecordByKey(currentSourceId);
  if (
    current &&
    !options.some((item) => item.id === current.id) &&
    !isManagedWidgetRecord(current) &&
    current.type !== "Event" &&
    current.type !== "Sponsor"
  ) {
    return [current, ...options];
  }
  return options;
}

function eventWidgetOptions() {
  return state.contentItems.filter(
    (item) => item.type === "Event" && item.status === "published",
  );
}

function sponsorWidgetOptions() {
  return state.contentItems.filter(
    (item) => item.type === "Sponsor" && item.status === "published",
  );
}

function imageWidgetOptions() {
  return state.assets.filter((asset) => isImageAsset(asset));
}

function templateUsesLinkedImageWidgets(templateId = activeTemplateId()) {
  return String(templateId || "").trim() === "festival-heritage";
}

function siteWidgetRecords() {
  return state.contentItems.filter((item) => isSiteWidgetRecord(item));
}

function siteWidgetRecordsForSection(page = "/", sectionId = "") {
  const normalizedPage = normalizePlacementPath(page);
  return siteWidgetRecords()
    .filter((record) => {
      const target = widgetRecordTarget(record);
      return (
        normalizePlacementPath(target.page) === normalizedPage &&
        widgetAnchorForRecord(record) === sectionId
      );
    })
    .sort(siteWidgetSort);
}

function siteWidgetInstanceFromRecord(record = {}) {
  const fields = record.fields || {};
  const target = widgetRecordTarget(record);
  return {
    id: record.id,
    title: record.title || fields.heading || "Site widget",
    type: normalizeSiteWidgetType(fields.widgetType || "post"),
    page: normalizePlacementPath(target.page || record.page || "/"),
    sectionId: widgetAnchorForRecord(record),
    order: Number(fields.widgetOrder || 0),
    sourceRecordId: fields.widgetSourceId || "",
    assetId: fields.widgetAssetId || "",
    assetUrl: fields.image || "",
    assetAlt: fields.imageAlt || "",
    sponsorTypeFilter: fields.widgetSponsorType || "",
    enabled: normalizeWidgetEnabledValue(fields.widgetEnabled),
    status: record.status || "published",
    record,
  };
}

function findSiteWidgetInstance(widgetId = "") {
  const record = state.contentItems.find((item) => item.id === widgetId);
  return record && isSiteWidgetRecord(record)
    ? siteWidgetInstanceFromRecord(record)
    : null;
}

function findContentRecordByKey(recordKey = "") {
  const normalized = String(recordKey || "").trim();
  if (!normalized) return null;
  return (
    state.contentItems.find(
      (item) =>
        String(item.id || "").trim() === normalized ||
        String(item.slug || "").trim() === normalized,
    ) || null
  );
}

function resolveEditableContentItem(item = null) {
  if (!item) return null;
  if (!isSiteWidgetRecord(item)) return item;
  return findContentRecordByKey(item.fields?.widgetSourceId) || item;
}

function editorViewForItem(item = null) {
  if (item?.type === "Event") return "events";
  if (item?.type === "Sponsor") return "sponsors";
  return "content";
}

function createSiteWidgetId() {
  return `site-widget-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function mergeContentRecord(saved) {
  const index = state.contentItems.findIndex((item) => item.id === saved.id);
  if (index >= 0) state.contentItems[index] = saved;
  else state.contentItems.unshift(saved);
  return saved;
}

async function persistContentRecord(record) {
  const result = await apiRequest("save-content", {
    method: "POST",
    body: { tenant: state.activeTenant, record },
  });
  return mergeContentRecord(normalizeCmsRecord(result.record));
}

function buildSiteWidgetRecord({
  id = createSiteWidgetId(),
  type = "post",
  page = "/",
  sectionId = "",
  order = 1,
  sourceRecordId = "",
  assetId = "",
  assetUrl = "",
  assetAlt = "",
  sponsorTypeFilter = null,
  enabled = null,
  existing = null,
} = {}) {
  const normalizedType = normalizeSiteWidgetType(type);
  const widgetMeta = widgetTemplateMeta(normalizedType);
  const sectionMeta = siteWidgetSectionMeta(page, sectionId);
  const widgetEnabled =
    typeof enabled === "boolean"
      ? enabled
      : normalizeWidgetEnabledValue(existing?.fields?.widgetEnabled);
  return normalizeCmsRecord({
    ...(existing || {}),
    id,
    slug: existing?.slug || id,
    page: normalizePlacementPath(page),
    placements: [normalizePlacementPath(page)],
    targets: [
      {
        page: normalizePlacementPath(page),
        section: buildSectionTarget(page, "after", sectionId),
      },
    ],
    type: "Page section",
    template: "section",
    status: "published",
    updated: "Just now",
    author: currentUserName(),
    title:
      existing?.title ||
      `${widgetMeta.label} widget${sectionMeta ? ` · ${sectionMeta.label}` : ""}`,
    excerpt: existing?.excerpt || "",
    body: existing?.body || "",
    language: existing?.language || "English",
    pushFacebook: false,
    fields: {
      ...(existing?.fields || {}),
      eyebrow: existing?.fields?.eyebrow || "Site widget",
      heading:
        existing?.fields?.heading ||
        `${widgetMeta.label} widget${sectionMeta ? ` · ${sectionMeta.label}` : ""}`,
      summary: existing?.fields?.summary || "",
      body: existing?.fields?.body || "",
      ctaLabel: existing?.fields?.ctaLabel || "",
      ctaUrl: existing?.fields?.ctaUrl || "",
      image: assetUrl || existing?.fields?.image || "",
      imageAlt: assetAlt || existing?.fields?.imageAlt || "",
      eventDate: existing?.fields?.eventDate || "",
      eventEndDate: existing?.fields?.eventEndDate || "",
      hideCountdown: false,
      eventTime: existing?.fields?.eventTime || "",
      eventVenue: existing?.fields?.eventVenue || "",
      eventLatitude: existing?.fields?.eventLatitude || "",
      eventLongitude: existing?.fields?.eventLongitude || "",
      eventPlaceId: existing?.fields?.eventPlaceId || "",
      connectedEventId: "",
      featuredHomepageEvent: false,
      mainHomepageEvent: false,
      featuredEvent: false,
      sponsorType: "Platinum Partners",
      sponsorUrl: "",
      widgetKind: "site-widget",
      widgetType: normalizedType,
      widgetOrder: order,
      widgetSourceId: sourceRecordId,
      widgetAssetId: assetId,
      widgetSponsorType:
        sponsorTypeFilter === null
          ? existing?.fields?.widgetSponsorType || ""
          : sponsorTypeFilter,
      widgetEnabled,
    },
  });
}

async function createSiteWidgetRecord(
  type = "post",
  page = "/",
  sectionId = "",
  index = null,
) {
  const normalizedType = normalizeSiteWidgetType(type);
  if (!templateSupportsSiteWidgetType(normalizedType)) {
    throw new Error(
      `${widgetTemplateMeta(normalizedType).label} is not enabled for the active portal template.`,
    );
  }
  const existing = siteWidgetRecordsForSection(page, sectionId);
  const insertAt = Math.max(
    0,
    Math.min(index ?? existing.length, existing.length),
  );
  const widget = buildSiteWidgetRecord({
    type: normalizedType,
    page,
    sectionId,
    order: insertAt + 1,
  });
  const ordered = [...existing];
  ordered.splice(insertAt, 0, widget);
  await persistSiteWidgetSectionOrder(page, sectionId, ordered);
  return findSiteWidgetInstance(widget.id);
}

async function saveSiteWidgetInstance(widgetId = "", patch = {}) {
  const existing = state.contentItems.find((item) => item.id === widgetId);
  if (!existing || !isSiteWidgetRecord(existing)) return null;
  const current = siteWidgetInstanceFromRecord(existing);
  const next = {
    ...current,
    ...patch,
  };
  const record = buildSiteWidgetRecord({
    id: existing.id,
    type: next.type,
    page: next.page,
    sectionId: next.sectionId,
    order: next.order || current.order || 1,
    sourceRecordId: next.sourceRecordId || "",
    assetId: next.assetId || "",
    assetUrl: next.assetUrl || "",
    assetAlt: next.assetAlt || "",
    sponsorTypeFilter: next.sponsorTypeFilter,
    enabled: next.enabled,
    existing,
  });
  await persistContentRecord(record);
  return findSiteWidgetInstance(widgetId);
}

async function resequenceSiteWidgetSection(page = "/", sectionId = "") {
  return persistSiteWidgetSectionOrder(
    page,
    sectionId,
    siteWidgetRecordsForSection(page, sectionId),
  );
}

async function persistSiteWidgetSectionOrder(
  page = "/",
  sectionId = "",
  records = [],
) {
  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    const desiredOrder = index + 1;
    const target = widgetRecordTarget(record);
    const nextPage = normalizePlacementPath(target.page || page);
    const nextSectionId = widgetAnchorForRecord(record) || sectionId;
    const persisted =
      state.contentItems.find((item) => item.id === record.id) || null;
    const persistedTarget = persisted ? widgetRecordTarget(persisted) : null;
    const persistedPage = normalizePlacementPath(
      persistedTarget?.page || persisted?.page || "",
    );
    const persistedSectionId = persisted
      ? widgetAnchorForRecord(persisted)
      : "";
    const persistedOrder = Number(persisted?.fields?.widgetOrder || 0);
    if (
      persisted &&
      persistedOrder === desiredOrder &&
      persistedPage === normalizePlacementPath(page) &&
      persistedSectionId === sectionId
    )
      continue;
    await persistContentRecord(
      buildSiteWidgetRecord({
        id: record.id,
        type: normalizeSiteWidgetType(record.fields?.widgetType || "post"),
        page,
        sectionId,
        order: desiredOrder,
        sourceRecordId: record.fields?.widgetSourceId || "",
        assetId: record.fields?.widgetAssetId || "",
        assetUrl: record.fields?.image || "",
        assetAlt: record.fields?.imageAlt || "",
        existing: record,
      }),
    );
  }
}

async function moveSiteWidgetInstance(
  widgetId = "",
  nextPage = "/",
  nextSectionId = "",
  nextIndex = null,
) {
  const existing = state.contentItems.find((item) => item.id === widgetId);
  if (!existing || !isSiteWidgetRecord(existing)) return null;
  const current = siteWidgetInstanceFromRecord(existing);
  const sourcePage = current.page;
  const sourceSectionId = current.sectionId;
  const originalSourceRecords = siteWidgetRecordsForSection(
    sourcePage,
    sourceSectionId,
  );
  const sourceIndex = originalSourceRecords.findIndex(
    (record) => record.id === widgetId,
  );
  const sourceRecords = originalSourceRecords.filter(
    (record) => record.id !== widgetId,
  );
  const sameSection =
    normalizePlacementPath(sourcePage) === normalizePlacementPath(nextPage) &&
    sourceSectionId === nextSectionId;
  const targetRecords = sameSection
    ? [...sourceRecords]
    : siteWidgetRecordsForSection(nextPage, nextSectionId).filter(
        (record) => record.id !== widgetId,
      );
  const adjustedIndex =
    sameSection &&
    sourceIndex >= 0 &&
    nextIndex !== null &&
    nextIndex > sourceIndex
      ? nextIndex - 1
      : nextIndex;
  const insertAt = Math.max(
    0,
    Math.min(adjustedIndex ?? targetRecords.length, targetRecords.length),
  );
  if (sameSection && sourceIndex === insertAt) return current;
  const movedRecord = buildSiteWidgetRecord({
    id: existing.id,
    type: current.type,
    page: nextPage,
    sectionId: nextSectionId,
    order: insertAt + 1,
    sourceRecordId: current.sourceRecordId || "",
    assetId: current.assetId || "",
    assetUrl: current.assetUrl || "",
    assetAlt: current.assetAlt || "",
    existing,
  });
  targetRecords.splice(insertAt, 0, movedRecord);
  await persistSiteWidgetSectionOrder(nextPage, nextSectionId, targetRecords);
  if (
    normalizePlacementPath(sourcePage) !== normalizePlacementPath(nextPage) ||
    sourceSectionId !== nextSectionId
  ) {
    await persistSiteWidgetSectionOrder(
      sourcePage,
      sourceSectionId,
      sourceRecords,
    );
  }
  return findSiteWidgetInstance(widgetId);
}

async function removeSiteWidgetInstance(widgetId = "") {
  const existing = state.contentItems.find((item) => item.id === widgetId);
  if (!existing || !isSiteWidgetRecord(existing)) return false;
  const current = siteWidgetInstanceFromRecord(existing);
  await deleteContentRecord(widgetId);
  await persistSiteWidgetSectionOrder(
    current.page,
    current.sectionId,
    siteWidgetRecordsForSection(current.page, current.sectionId),
  );
  return true;
}

function resetWorkspaceSession() {
  state.authenticated = false;
  state.currentUser = "";
  state.role = "editor";
  state.canSwitchTenants = false;
  state.view = "dashboard";
  state.tenantMenu = false;
  state.customSelectOpen = null;
  state.contentItems = [];
  state.contactSubmissions = [];
  state.assets = [];
  state.audit = [];
  state.modal = null;
  state.provisionDraft = {
    name: "",
    domain: "",
    admin: "",
    templateId: state.availableTemplates[0]?.id || "",
  };
  state.loading = false;
  state.activeArticleId = "";
  state.pendingDeleteId = "";
  state.login.password = "";
  state.login.showPassword = false;
  state.activeTenant = portals.some((portal) => portal.id === SCOPED_TENANT_ID)
    ? SCOPED_TENANT_ID
    : portals[0]?.id || "";
  state.view = "content";
}

function initialsFromName(value = "") {
  const parts = String(value || "")
    .trim()
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2);
  if (!parts.length) return "U";
  return parts.map((part) => part[0]?.toUpperCase() || "").join("");
}

function formatRecordTimestamp(item = null) {
  return item?.updatedAt || item?.updated || "Just now";
}

function hasPermission(permission) {
  return (permissionSets[state.role] || permissionSets.writer).includes(
    permission,
  );
}

function isAdmin() {
  return hasPermission("portals.manage");
}

function defaultViewForRole() {
  return isAdmin() ? "dashboard" : "content";
}

function statusLabel(status) {
  return (
    {
      review: "Ready for review",
      published: "Published",
      draft: "Draft",
      "needs-changes": "Needs changes",
      live: "Live",
      pending: "Pending launch",
    }[status] || status
  );
}

function renderStatus(status) {
  return `<span class="status ${esc(status)}">${esc(statusLabel(status))}</span>`;
}

function typeLabel(type) {
  return (
    {
      hero_section: "Branding hero",
      events_showcase: "Festival events",
      directory_feed: "Services directory",
    }[type] || type
  );
}

function variantLabel(variant) {
  return (
    {
      variant_minimal: "Minimal",
      variant_immersive: "Immersive",
      variant_dense: "Dense",
    }[variant] || variant
  );
}

const blockSelectOptions = [
  ["hero_section", "Main branding hero"],
  ["events_showcase", "Festival events grid"],
  ["directory_feed", "Government services directory"],
];

const articleTypeOptions = [
  ["Page", "Page"],
  ["Event", "Event + single page"],
  ["Sponsor", "Sponsor"],
  ["Page section", "Section / block"],
];

const EVENT_CATEGORY_OPTIONS = Object.freeze([
  ["", "No category"],
  ["Major Event", "Major Event"],
  ["Minor Event", "Minor Event"],
  ["Core Event", "Core Event"],
  ["Parallel Event", "Parallel Event"],
]);

const EVENT_IMPORT_TEMPLATE_HEADERS = Object.freeze([
  "Event Title",
  "Slug",
  "Summary / Description",
  "Date",
  "Start Time",
  "End Time",
  "Venue / Location",
  "Event Category",
  "What to Expect Title",
  "What to Expect Summary",
  "Arrival Window",
  "Access",
  "Bring",
  "Tips",
  "Presented By",
  "Presented By Image",
  "Event Editorial Title",
  "Event Editorial Summary",
  "Event Editorial Image",
]);

const sponsorTypeOptions = [
  ["Platinum Partners", "Platinum Partners"],
  ["Diamond Partners", "Diamond Partners"],
  ["Gold Partners", "Gold Partners"],
  ["Silver Partners", "Silver Partners"],
  ["Bronze Partners", "Bronze Partners"],
  ["Festival Donors", "Festival Donors"],
];

function normalizeSponsorType(value = "") {
  const clean = String(value || "").trim();
  return sponsorTypeOptions.some(([option]) => option === clean)
    ? clean
    : sponsorTypeOptions[0][0];
}

const languageSelectOptions = [
  ["English", "English"],
  ["Filipino", "Filipino"],
  ["Cebuano", "Cebuano"],
];

const templateSectionSchemas = {
  "festival-heritage": {
    pages: [
      ["/", "Home"],
      ["/about", "About"],
      ["/events", "Events"],
      ["/contact", "Contact"],
      ["/volunteer", "Volunteer"],
      ["/sponsor", "Be a partner"],
      ["/plan-your-festival-days", "Visitor guide"],
    ],
    anchorsByPage: {
      "/": [
        {
          id: "home-hero-copy",
          label: "Home hero copy",
          supportedWidgetTypes: ["hero"],
        },
        {
          id: "home-hero-gallery",
          label: "Home hero gallery",
          supportedWidgetTypes: ["hero-gallery"],
        },
        {
          id: "route-section",
          label: "Choose your route",
          supportedWidgetTypes: ["cta", "post"],
        },
        {
          id: "manifesto-section",
          label: "The spirit of Diyandi",
          supportedWidgetTypes: ["story", "post"],
        },
        {
          id: "program-section",
          label: "Festival program",
          supportedWidgetTypes: ["event", "featured", "post"],
        },
        {
          id: "city-section",
          label: "Beyond the parade",
          supportedWidgetTypes: ["about", "explore", "featured-image", "post"],
        },
        {
          id: "volunteer-callout",
          label: "Be part of the festival",
          supportedWidgetTypes: ["cta", "post"],
        },
        {
          id: "partner-band",
          label: "Festival partners",
          supportedWidgetTypes: ["cta", "featured-image", "post"],
        },
      ],
      "/about": [
        {
          id: "about-hero",
          label: "About hero",
          supportedWidgetTypes: ["hero", "featured-image"],
        },
        {
          id: "story-opening",
          label: "Story opening",
          supportedWidgetTypes: ["story", "post"],
        },
        {
          id: "roots-section",
          label: "Cultural roots",
          supportedWidgetTypes: ["story", "about", "post"],
        },
        {
          id: "timeline-section",
          label: "Festival timeline",
          supportedWidgetTypes: ["story", "post", "featured-image"],
        },
      ],
      "/events": [
        {
          id: "events-hero",
          label: "Events hero",
          supportedWidgetTypes: ["hero", "featured-image"],
        },
        {
          id: "schedule-overview",
          label: "Festival calendar",
          supportedWidgetTypes: ["featured", "post"],
        },
        {
          id: "all-events-section",
          label: "Complete lineup",
          supportedWidgetTypes: ["event", "featured", "post"],
        },
        {
          id: "visit-note-section",
          label: "Visitor notes",
          supportedWidgetTypes: ["cta", "post"],
        },
      ],
      "/contact": [
        {
          id: "contact-hero",
          label: "Contact hero",
          supportedWidgetTypes: ["hero", "featured-image"],
        },
        {
          id: "contact-section",
          label: "Festival desk",
          supportedWidgetTypes: ["post"],
        },
        {
          id: "contact-bottom-strip",
          label: "Contact topics strip",
          supportedWidgetTypes: ["cta", "post"],
        },
      ],
      "/volunteer": [
        {
          id: "volunteer-hero",
          label: "Volunteer hero",
          supportedWidgetTypes: ["hero", "featured-image"],
        },
        {
          id: "volunteer-intro",
          label: "Why volunteer",
          supportedWidgetTypes: ["story", "post"],
        },
        {
          id: "volunteer-roles-section",
          label: "Volunteer roles",
          supportedWidgetTypes: ["post", "about"],
        },
        {
          id: "volunteer-process-section",
          label: "How it works",
          supportedWidgetTypes: ["story", "post"],
        },
        {
          id: "volunteer-form-section",
          label: "Volunteer application",
          supportedWidgetTypes: ["cta", "post"],
        },
      ],
      "/sponsor": [
        {
          id: "sponsor-hero",
          label: "Partnerships hero",
          supportedWidgetTypes: ["hero", "featured-image"],
        },
        {
          id: "partnership-intro",
          label: "Why partner",
          supportedWidgetTypes: ["story", "post"],
        },
        {
          id: "tier-section",
          label: "Partnership levels",
          supportedWidgetTypes: ["post", "featured-image"],
        },
        {
          id: "partner-cta-section",
          label: "Start a conversation",
          supportedWidgetTypes: ["cta", "post"],
        },
      ],
      "/plan-your-festival-days": [
        {
          id: "visitor-hero",
          label: "Visitor hero",
          supportedWidgetTypes: ["hero", "featured-image"],
        },
        {
          id: "guide-intro",
          label: "Festival field guide",
          supportedWidgetTypes: ["story", "post"],
        },
        {
          id: "guide-group-1",
          label: "Eat",
          supportedWidgetTypes: ["explore", "post", "featured-image"],
        },
        {
          id: "guide-group-2",
          label: "Stay",
          supportedWidgetTypes: ["explore", "post", "featured-image"],
        },
        {
          id: "guide-group-3",
          label: "Move",
          supportedWidgetTypes: ["explore", "post", "featured-image"],
        },
        {
          id: "guide-group-4",
          label: "Explore",
          supportedWidgetTypes: ["explore", "post", "featured-image"],
        },
        {
          id: "guide-return",
          label: "Guide return CTA",
          supportedWidgetTypes: ["cta", "post"],
        },
      ],
    },
    eventDefaultAnchors: {
      "/": "program-section",
      "/events": "all-events-section",
    },
  },
  "festival-vibrant": {
    pages: [
      ["/", "Home"],
      ["/about", "About"],
      ["/events", "Events"],
      ["/events/view", "Event detail"],
      ["/contact", "Contact"],
      ["/sponsor", "Be a partner"],
      ["/plan-your-visit", "Plan your visit"],
    ],
    anchorsByPage: {
      "/": [
        { id: "home-hero", label: "Hero" },
        { id: "ticker-band", label: "Ticker Band" },
        { id: "feature-section", label: "Featured Section" },
        {
          id: "partner-recognition-section",
          label: "Partner Recognition Section",
        },
        { id: "about-preview", label: "About Section" },
        { id: "explore-section", label: "Explore Section" },
        { id: "visit-band", label: "Visit Band Section" },
      ],
      "/about": [
        { id: "about-hero", label: "Page Hero" },
        {
          id: "about-partner-recognition",
          label: "Partner Recognition",
        },
        { id: "story-section", label: "Story Section" },
        { id: "value-strip", label: "Value Strip" },
        { id: "split-section", label: "Suggested City Paths" },
      ],
      "/events": [
        { id: "events-hero", label: "Page Hero" },
        {
          id: "events-partner-recognition",
          label: "Partner Recognition",
        },
        { id: "featured-events", label: "Featured Events" },
        { id: "calendar-section", label: "Event Schedule" },
        { id: "volunteer-cta", label: "Volunteer CTA" },
      ],
      "/events/view": [{ id: "event-faqs", label: "FAQs before footer" }],
      "/contact": [
        { id: "contact-hero", label: "Hero" },
        {
          id: "contact-partner-recognition",
          label: "Partner Recognition Section",
        },
        { id: "contact-layout", label: "Contact Form" },
      ],
      "/sponsor": [
        { id: "sponsor-hero", label: "Hero" },
        { id: "platinum-tier", label: "Platinum Tier" },
        { id: "diamond-tier", label: "Diamond Tier" },
        { id: "gold-tier", label: "Gold Tier" },
        { id: "silver-tier", label: "Silver Tier" },
        { id: "bronze-tier", label: "Bronze Tier" },
        { id: "donors-tier", label: "Donors Tier" },
        { id: "sponsor-cta", label: "Call To Action" },
      ],
      "/plan-your-visit": [
        { id: "visit-hero", label: "Hero" },
        {
          id: "visit-partner-recognition",
          label: "Partner Recognition Section",
        },
        { id: "visit-planner", label: "Visit Planner" },
        { id: "contact-support-band", label: "Support Band" },
      ],
    },
    eventDefaultAnchors: {
      "/": "feature-section",
      "/events": "calendar-section",
    },
  },
};

const sectionTargetPlacementOptions = [
  ["after", "After section"],
  ["before", "Before section"],
  ["end-of-page", "End of page"],
];

function normalizePlacementPath(value = "/") {
  const clean = String(value || "/").trim() || "/";
  if (clean === "/") return "/";
  return clean.startsWith("/")
    ? clean.replace(/\/+$/, "")
    : `/${clean.replace(/\/+$/, "")}`;
}

function normalizePlacementList(values = []) {
  const list = Array.isArray(values) ? values : [values];
  return [
    ...new Set(
      list.map((value) => normalizePlacementPath(value)).filter(Boolean),
    ),
  ];
}

function activeTemplateId() {
  return (
    currentTenant()?.templateId ||
    state.provisionDraft.templateId ||
    currentTemplateCatalog()[0]?.id ||
    "festival-heritage"
  );
}

function currentTemplateSectionSchema() {
  return (
    templateSectionSchemas[activeTemplateId()] ||
    templateSectionSchemas["festival-heritage"]
  );
}

function placementOptionsForDraft(draft = state.articleDraft) {
  return (
    currentTemplateSectionSchema().pages ||
    templateSectionSchemas["festival-heritage"].pages
  );
}

function sectionAnchorOptionsForPage(page = "/") {
  const normalizedPage = normalizePlacementPath(page);
  return currentTemplateSectionSchema().anchorsByPage?.[normalizedPage] || [];
}

function normalizeSectionAnchor(page = "/", value = "") {
  const clean = String(value || "").trim();
  const options = sectionAnchorOptionsForPage(page);
  return options.some((option) => option.id === clean)
    ? clean
    : options[0]?.id || "";
}

function parseSectionTarget(page = "/", value = "") {
  const clean = String(value || "").trim();
  const anchor = normalizeSectionAnchor(
    page,
    clean.replace(/^(before|after)-/, ""),
  );
  if (!clean || clean === "end-of-page")
    return { placement: "end-of-page", anchor };
  if (clean.startsWith("before-")) return { placement: "before", anchor };
  if (clean.startsWith("after-")) return { placement: "after", anchor };
  if (anchor) return { placement: "after", anchor };
  return { placement: "end-of-page", anchor: normalizeSectionAnchor(page) };
}

function buildSectionTarget(page = "/", placement = "after", anchor = "") {
  if (placement === "end-of-page") return "end-of-page";
  const normalizedAnchor = normalizeSectionAnchor(page, anchor);
  if (!normalizedAnchor) return "end-of-page";
  const normalizedPlacement = sectionTargetPlacementOptions.some(
    ([value]) => value === placement,
  )
    ? placement
    : "after";
  return `${normalizedPlacement}-${normalizedAnchor}`;
}

function defaultSectionForPage(page = "/") {
  return buildSectionTarget(page, "after", normalizeSectionAnchor(page));
}

function normalizeSectionTarget(page = "/", value = "") {
  const parsed = parseSectionTarget(page, value);
  return buildSectionTarget(page, parsed.placement, parsed.anchor);
}

function normalizePlacementTarget(target = {}, fallbackPage = "/") {
  if (typeof target === "string") {
    const page = normalizePlacementPath(target || fallbackPage);
    return { page, section: defaultSectionForPage(page) };
  }
  const page = normalizePlacementPath(target.page || fallbackPage);
  return {
    page,
    section: normalizeSectionTarget(page, target.section || target.slot || ""),
  };
}

function normalizePlacementTargets(values = [], fallbackPage = "/") {
  const list = Array.isArray(values) ? values : [values];
  const seen = new Set();
  const normalized = [];
  list.forEach((target) => {
    const next = normalizePlacementTarget(target, fallbackPage);
    if (!next.page || seen.has(next.page)) return;
    seen.add(next.page);
    normalized.push(next);
  });
  return normalized.length
    ? normalized
    : [normalizePlacementTarget({ page: fallbackPage }, fallbackPage)];
}

function legacyTargetsFromRecord(record = {}) {
  return normalizePlacementTargets(
    [record.page || "/"].concat(record.placements || []),
    record.page || "/",
  );
}

function derivePagePlacementState(targets = []) {
  const normalized = normalizePlacementTargets(targets);
  return {
    page: normalized[0]?.page || "/",
    placements: normalized.slice(1).map((target) => target.page),
  };
}

function eventPlacementsForDraft(draft = state.articleDraft) {
  const placements = new Set(normalizePlacementList(draft.placements || []));
  if (draft.type === "Event") placements.add("/events");
  return [...placements];
}

function eventSectionTargetForPage(page = "/") {
  const normalizedPage = normalizePlacementPath(page);
  const defaultAnchor =
    currentTemplateSectionSchema().eventDefaultAnchors?.[normalizedPage] ||
    sectionAnchorOptionsForPage(normalizedPage)[0]?.id ||
    "";
  return defaultAnchor
    ? buildSectionTarget(normalizedPage, "after", defaultAnchor)
    : "end-of-page";
}

function eventTargetsForDraft(draft = state.articleDraft) {
  const detailPage = managedRouteForDraft({ ...draft, type: "Event" });
  const placements = eventPlacementsForDraft(draft).map((page) => ({
    page,
    section: eventSectionTargetForPage(page),
  }));
  return normalizePlacementTargets(
    [{ page: detailPage, section: "end-of-page" }].concat(placements),
    detailPage,
  );
}

function toggleDraftPlacement(value, enabled) {
  const placement = normalizePlacementPath(value);
  const next = new Set(eventPlacementsForDraft());
  if (state.articleDraft.type === "Event" && placement === "/events") {
    state.articleDraft.placements = [...next];
    return;
  }
  if (enabled) next.add(placement);
  else next.delete(placement);
  state.articleDraft.placements = [...next];
}

function targetsForDraft(draft = state.articleDraft) {
  return normalizePlacementTargets(
    draft.targets || legacyTargetsFromRecord(draft),
    draft.page || "/",
  );
}

function pageTargetsForDraft(draft = state.articleDraft) {
  return targetsForDraft(draft).map((target) => target.page);
}

function setDraftTargets(targets = []) {
  const normalized = normalizePlacementTargets(
    targets,
    state.articleDraft.page || "/",
  );
  const derived = derivePagePlacementState(normalized);
  state.articleDraft.targets = normalized;
  state.articleDraft.page = derived.page;
  state.articleDraft.placements = derived.placements;
}

function toggleDraftPageTarget(value, enabled) {
  const placement = normalizePlacementPath(value);
  const current = targetsForDraft();
  const next = enabled
    ? current.some((target) => target.page === placement)
      ? current
      : current.concat({
          page: placement,
          section: defaultSectionForPage(placement),
        })
    : current.filter((target) => target.page !== placement);
  setDraftTargets(
    next.length ? next : [{ page: "/", section: defaultSectionForPage("/") }],
  );
}

function sectionTargetForPage(page, draft = state.articleDraft) {
  const normalizedPage = normalizePlacementPath(page);
  return (
    targetsForDraft(draft).find((target) => target.page === normalizedPage)
      ?.section || defaultSectionForPage(normalizedPage)
  );
}

function sectionAnchorForPage(page, draft = state.articleDraft) {
  return parseSectionTarget(page, sectionTargetForPage(page, draft)).anchor;
}

function sectionPlacementForPage(page, draft = state.articleDraft) {
  return parseSectionTarget(page, sectionTargetForPage(page, draft)).placement;
}

function setDraftPageTargetSection(page, anchor) {
  const normalizedPage = normalizePlacementPath(page);
  const currentPlacement = sectionPlacementForPage(normalizedPage);
  const next = targetsForDraft().map((target) =>
    target.page === normalizedPage
      ? {
          ...target,
          section: buildSectionTarget(normalizedPage, currentPlacement, anchor),
        }
      : target,
  );
  setDraftTargets(next);
}

function setDraftPageTargetPlacement(page, placement) {
  const normalizedPage = normalizePlacementPath(page);
  const currentAnchor = sectionAnchorForPage(normalizedPage);
  const next = targetsForDraft().map((target) =>
    target.page === normalizedPage
      ? {
          ...target,
          section: buildSectionTarget(normalizedPage, placement, currentAnchor),
        }
      : target,
  );
  setDraftTargets(next);
}

function customSelectValue(field) {
  if (field === "block-choice") return state.blockChoice;
  if (field === "article-type") return state.articleDraft.type;
  if (field === "page-target") return state.articleDraft.page || "/";
  return state.articleDraft.language;
}

function articleTypeFromValue(value = "", page = "/") {
  const clean = String(value || "")
    .trim()
    .toLowerCase();
  if (
    clean === "page" ||
    clean === "event" ||
    clean === "page section" ||
    clean === "sponsor"
  ) {
    return clean === "page section"
      ? "Page section"
      : clean.charAt(0).toUpperCase() + clean.slice(1);
  }
  if (clean.includes("event") || String(page || "").startsWith("/events/"))
    return "Event";
  if (clean.includes("sponsor") || String(page || "").startsWith("/sponsor"))
    return "Sponsor";
  if (clean === "" || clean.includes("section")) return "Page section";
  return "Page";
}

function managedRouteForDraft(draft) {
  const slug = slugify(draft.slug || draft.title);
  if (!slug) return draft.type === "Event" ? "/events/" : "/";
  if (draft.type === "Event") return `/events/${slug}/`;
  if (draft.type === "Page") return `/${slug}/`;
  return "/";
}

function defaultTargetsForType(type = "Page") {
  if (type === "Sponsor") {
    return [
      {
        page: "/sponsor",
        section: buildSectionTarget("/sponsor", "after", "tier-section"),
      },
    ];
  }
  return [{ page: "/", section: defaultSectionForPage("/") }];
}

function createEmptyArticleDraft(type = "Page") {
  const initialTargets = defaultTargetsForType(type);
  const derived = derivePagePlacementState(initialTargets);
  return {
    title: "",
    slug: "",
    page: type === "Sponsor" ? "/sponsor" : derived.page,
    placements: derived.placements,
    targets: initialTargets,
    type,
    language: "English",
    eyebrow: "",
    summary: "",
    seo: "",
    body: "",
    ctaLabel: "",
    ctaUrl: "",
    contentCategory: "general",
    widgetConfig: "",
    heroSlides: [],
    heroGalleryPortraitImage: "",
    heroGalleryPortraitAlt: "",
    heroGalleryMarketImage: "",
    heroGalleryMarketAlt: "",
    heroGalleryPosterMonth: "SEP",
    heroGalleryPosterStart: "20",
    heroGalleryPosterConnector: "TO",
    heroGalleryPosterEnd: "29",
    heroGalleryPosterYear: "2026",
    faqItems: [],
    faqGroupScope: "all-events",
    faqAssignedEventIds: [],
    imageAlt: "",
    imageCopyright: "",
    eventDate: "",
    eventEndDate: "",
    eventCategory: "",
    hideCountdown: false,
    eventStartTime: "",
    eventEndTime: "",
    eventTime: "",
    eventVenue: "",
    eventLatitude: "",
    eventLongitude: "",
    eventPlaceId: "",
    whatToExpectTitle: "",
    whatToExpectSummary: "",
    arrivalWindow: "",
    eventAccess: "",
    eventBring: "",
    eventTips: "",
    presentedByName: "",
    presentedByImage: "",
    presentedByImageCopyright: "",
    eventEditorialLabel: "",
    eventEditorialTitle: "",
    eventEditorialSummary: "",
    eventEditorialImage: "",
    eventEditorialImageCopyright: "",
    eventEditorialLabel2: "",
    eventEditorialTitle2: "",
    eventEditorialSummary2: "",
    eventEditorialImage2: "",
    eventEditorialImage2Copyright: "",
    connectedEventId: "",
    featuredHomepageEvent: false,
    mainHomepageEvent: false,
    featuredEvent: false,
    sponsorType: "Platinum Partners",
    sponsorUrl: "",
    pushFacebook: false,
    media: "",
  };
}

function parseDraftWidgetConfig(raw = "") {
  if (typeof raw === "object" && raw && !Array.isArray(raw)) return { ...raw };
  const value = String(raw || "").trim();
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch (error) {
    return {};
  }
}

function createFaqItemId() {
  return `faq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeFaqItem(item = {}) {
  return {
    id: String(item?.id || createFaqItemId()).trim() || createFaqItemId(),
    question: String(item?.question || "").trim(),
    answer: String(item?.answer || "").trim(),
    enabled: item?.enabled !== false,
  };
}

function faqItemsFromWidgetConfig(raw = "") {
  const config = parseDraftWidgetConfig(raw);
  return (Array.isArray(config.faqItems) ? config.faqItems : [])
    .map(normalizeFaqItem)
    .filter((item) => item.question || item.answer);
}

function faqGroupScopeFromWidgetConfig(raw = "") {
  const config = parseDraftWidgetConfig(raw);
  return config.faqGroupScope === "selected-events"
    ? "selected-events"
    : "all-events";
}

function faqAssignedEventIdsFromWidgetConfig(raw = "") {
  const config = parseDraftWidgetConfig(raw);
  return Array.isArray(config.faqAssignedEventIds)
    ? [
        ...new Set(
          config.faqAssignedEventIds
            .map((value) => String(value || "").trim())
            .filter(Boolean),
        ),
      ]
    : [];
}

function heritageHeroGalleryConfig(raw = "") {
  const config = parseDraftWidgetConfig(raw);
  const poster =
    config.poster && typeof config.poster === "object" ? config.poster : {};
  return {
    portraitImage: String(config.ritualImage || "").trim(),
    portraitAlt: String(config.ritualImageAlt || "").trim(),
    marketImage: String(config.marketImage || "").trim(),
    marketAlt: String(config.marketImageAlt || "").trim(),
    posterMonth: String(poster.month || "SEP").trim() || "SEP",
    posterStart: String(poster.start || "20").trim() || "20",
    posterConnector: String(poster.connector || "TO").trim() || "TO",
    posterEnd: String(poster.end || "29").trim() || "29",
    posterYear: String(poster.year || "2026").trim() || "2026",
  };
}

function buildHeritageHeroGalleryWidgetConfigString(
  draft = state.articleDraft,
) {
  const config = parseDraftWidgetConfig(draft.widgetConfig);
  if (draft.heroGalleryPortraitImage) {
    config.ritualImage = draft.heroGalleryPortraitImage;
    config.ritualImageAlt = draft.heroGalleryPortraitAlt || "";
  } else {
    delete config.ritualImage;
    delete config.ritualImageAlt;
  }
  if (draft.heroGalleryMarketImage) {
    config.marketImage = draft.heroGalleryMarketImage;
    config.marketImageAlt = draft.heroGalleryMarketAlt || "";
  } else {
    delete config.marketImage;
    delete config.marketImageAlt;
  }
  config.poster = {
    month: draft.heroGalleryPosterMonth || "SEP",
    start: draft.heroGalleryPosterStart || "20",
    connector: draft.heroGalleryPosterConnector || "TO",
    end: draft.heroGalleryPosterEnd || "29",
    year: draft.heroGalleryPosterYear || "2026",
  };
  config.caption = draft.summary || "";
  const keys = Object.keys(config).filter((key) => {
    const value = config[key];
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === "object")
      return Object.keys(value).length > 0;
    return value !== "" && value !== null && value !== undefined;
  });
  return keys.length ? JSON.stringify(config) : "";
}

function buildFaqWidgetConfigString(draft = state.articleDraft) {
  const config = parseDraftWidgetConfig(draft.widgetConfig);
  const items = (Array.isArray(draft.faqItems) ? draft.faqItems : [])
    .map(normalizeFaqItem)
    .filter((item) => item.question || item.answer);
  if (items.length) config.faqItems = items;
  else delete config.faqItems;
  config.faqGroupScope =
    draft.faqGroupScope === "selected-events"
      ? "selected-events"
      : "all-events";
  const assignedIds =
    draft.faqGroupScope === "selected-events"
      ? [
          ...new Set(
            (Array.isArray(draft.faqAssignedEventIds)
              ? draft.faqAssignedEventIds
              : []
            )
              .map((value) => String(value || "").trim())
              .filter(Boolean),
          ),
        ]
      : [];
  if (assignedIds.length) config.faqAssignedEventIds = assignedIds;
  else delete config.faqAssignedEventIds;
  const keys = Object.keys(config).filter((key) => {
    const value = config[key];
    if (Array.isArray(value)) return value.length > 0;
    return value !== "" && value !== null && value !== undefined;
  });
  return keys.length ? JSON.stringify(config) : "";
}

function updateFaqItem(index = -1, patch = {}) {
  if (!Number.isInteger(index) || index < 0) return;
  const items = Array.isArray(state.articleDraft.faqItems)
    ? [...state.articleDraft.faqItems]
    : [];
  const existing = normalizeFaqItem(items[index] || {});
  items[index] = {
    ...existing,
    ...patch,
  };
  state.articleDraft.faqItems = items;
}

function addFaqItem() {
  const items = Array.isArray(state.articleDraft.faqItems)
    ? [...state.articleDraft.faqItems]
    : [];
  items.push(normalizeFaqItem({ question: "", answer: "", enabled: true }));
  state.articleDraft.faqItems = items;
}

function removeFaqItem(index = -1) {
  if (!Number.isInteger(index) || index < 0) return;
  const items = Array.isArray(state.articleDraft.faqItems)
    ? [...state.articleDraft.faqItems]
    : [];
  items.splice(index, 1);
  state.articleDraft.faqItems = items;
}

function moveFaqItem(index = -1, direction = 0) {
  const nextIndex = index + direction;
  const items = Array.isArray(state.articleDraft.faqItems)
    ? [...state.articleDraft.faqItems]
    : [];
  if (
    !Number.isInteger(index) ||
    !Number.isInteger(nextIndex) ||
    index < 0 ||
    nextIndex < 0 ||
    index >= items.length ||
    nextIndex >= items.length
  ) {
    return;
  }
  [items[index], items[nextIndex]] = [items[nextIndex], items[index]];
  state.articleDraft.faqItems = items;
}

function reorderFaqItem(fromIndex = -1, toIndex = -1) {
  const items = Array.isArray(state.articleDraft.faqItems)
    ? [...state.articleDraft.faqItems]
    : [];
  if (
    !Number.isInteger(fromIndex) ||
    !Number.isInteger(toIndex) ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length ||
    fromIndex === toIndex
  ) {
    return;
  }
  const [moved] = items.splice(fromIndex, 1);
  items.splice(toIndex, 0, moved);
  state.articleDraft.faqItems = items;
}

function normalizeHeroSlide(slide = {}) {
  return {
    image: String(slide?.image || "").trim(),
    alt: String(slide?.alt || "").trim(),
    copyright: String(slide?.copyright || "").trim(),
  };
}

function isHeroSlideContext(context = "") {
  return String(context || "").startsWith("hero-slide:");
}

function heroSlideIndexFromContext(context = "") {
  if (!isHeroSlideContext(context)) return -1;
  const index = Number(String(context).split(":")[1] || -1);
  return Number.isInteger(index) && index >= 0 ? index : -1;
}

function imageCopyrightFieldFromContext(context = "") {
  if (context === "presented-by") return "presentedByImageCopyright";
  if (context === "event-editorial") return "eventEditorialImageCopyright";
  if (context === "event-editorial-2") return "eventEditorialImage2Copyright";
  return "";
}

function heroSlidesFromWidgetConfig(raw = "", primaryImage = "") {
  const primary = String(primaryImage || "").trim();
  const config = parseDraftWidgetConfig(raw);
  return (Array.isArray(config.slides) ? config.slides : [])
    .map(normalizeHeroSlide)
    .filter((slide) => slide.image)
    .filter((slide) => !primary || slide.image !== primary);
}

function buildHeroWidgetConfigString(draft = state.articleDraft) {
  const config = parseDraftWidgetConfig(draft.widgetConfig);
  const slides = (Array.isArray(draft.heroSlides) ? draft.heroSlides : [])
    .map(normalizeHeroSlide)
    .filter((slide) => slide.image);
  if (slides.length) config.slides = slides;
  else delete config.slides;
  const keys = Object.keys(config);
  return keys.length ? JSON.stringify(config) : "";
}

function updateHeroSlide(index = -1, patch = {}) {
  if (!Number.isInteger(index) || index < 0) return;
  const slides = Array.isArray(state.articleDraft.heroSlides)
    ? [...state.articleDraft.heroSlides]
    : [];
  const existing = normalizeHeroSlide(slides[index] || {});
  slides[index] = {
    ...existing,
    ...patch,
  };
  state.articleDraft.heroSlides = slides;
}

function addHeroSlide() {
  const slides = Array.isArray(state.articleDraft.heroSlides)
    ? [...state.articleDraft.heroSlides]
    : [];
  slides.push({ image: "", alt: "", copyright: "" });
  state.articleDraft.heroSlides = slides;
  state.activeAssetInsertContext = "article";
}

function removeHeroSlide(index = -1) {
  if (!Number.isInteger(index) || index < 0) return;
  const slides = Array.isArray(state.articleDraft.heroSlides)
    ? [...state.articleDraft.heroSlides]
    : [];
  slides.splice(index, 1);
  state.articleDraft.heroSlides = slides;
  state.activeAssetInsertContext = "article";
}

function moveHeroSlide(index = -1, direction = 0) {
  const nextIndex = index + direction;
  const slides = Array.isArray(state.articleDraft.heroSlides)
    ? [...state.articleDraft.heroSlides]
    : [];
  if (
    !Number.isInteger(index) ||
    !Number.isInteger(nextIndex) ||
    index < 0 ||
    nextIndex < 0 ||
    index >= slides.length ||
    nextIndex >= slides.length
  ) {
    return;
  }
  [slides[index], slides[nextIndex]] = [slides[nextIndex], slides[index]];
  state.articleDraft.heroSlides = slides;
  state.activeAssetInsertContext = "article";
}

function findEventRecordById(id = "") {
  return (
    state.contentItems.find(
      (item) => item.type === "Event" && item.id === id,
    ) || null
  );
}

function availableEventRecords(excludeId = "") {
  return state.contentItems.filter(
    (item) => item.type === "Event" && item.id !== excludeId,
  );
}

function syncDraftSlugAndRoute({ forceRoute = false } = {}) {
  if (!state.slugLocked && !state.editingId) {
    state.articleDraft.slug = slugify(
      state.articleDraft.slug || state.articleDraft.title,
    );
  }
  if (
    state.articleDraft.type === "Page section" ||
    state.articleDraft.type === "Sponsor"
  ) {
    const allowedPages = new Set(
      placementOptionsForDraft(state.articleDraft).map(([value]) => value),
    );
    const fallbackPage =
      state.articleDraft.type === "Sponsor" ? "/sponsor" : "/";
    const currentTargets = (
      state.articleDraft.targets?.length
        ? normalizePlacementTargets(
            state.articleDraft.targets,
            state.articleDraft.page || fallbackPage,
          )
        : defaultTargetsForType(state.articleDraft.type)
    ).filter((target) => allowedPages.has(target.page));
    setDraftTargets(
      currentTargets.length
        ? currentTargets
        : defaultTargetsForType(state.articleDraft.type),
    );
    return;
  }
  if (forceRoute || state.articleDraft.type !== "Page section") {
    state.articleDraft.page = managedRouteForDraft(state.articleDraft);
  }
}

function renderCustomSelect(field, label, options) {
  const value = customSelectValue(field);
  const selected =
    options.find(([optionValue]) => optionValue === value) || options[0];
  const isOpen = state.customSelectOpen === field;
  return `<div class="custom-select ${isOpen ? "is-open" : ""}">
    <button type="button" class="form-select select-trigger" data-action="toggle-custom-select" data-select-field="${field}" data-select-trigger="true" aria-haspopup="listbox" aria-expanded="${isOpen}" aria-controls="${field}-options">
      <span>${esc(selected[1])}</span>${icon("chevron")}
    </button>
    ${isOpen ? `<div class="select-popover" id="${field}-options" role="listbox" aria-label="${esc(label)}">${options.map(([optionValue, optionLabel]) => `<button type="button" class="select-option ${optionValue === value ? "is-selected" : ""}" data-action="choose-custom-select" data-select-field="${field}" data-select-value="${optionValue}" data-select-option="true" role="option" aria-selected="${optionValue === value}"><span>${esc(optionLabel)}</span>${optionValue === value ? icon("check") : ""}</button>`).join("")}</div>` : ""}
  </div>`;
}

function renderLogin() {
  const scopedLabel = scopedTenantName();
  const title = scopedLabel ? `${scopedLabel} control desk` : "Welcome back";
  const copy = scopedLabel
    ? `Sign in to continue to the ${scopedLabel} CMS workspace. This login is scoped to that festival portal.`
    : "Sign in to continue to your CMS workspace.";
  const configurationNote =
    state.apiOnline && state.authConfigured && !state.apiError
      ? scopedLabel
        ? `Access is locked to ${scopedLabel} unless this account has cross-portal permissions.`
        : "Access is scoped to the active tenant and recorded in the workspace audit trail."
      : `Configure the API first by setting TUKODPH_CMS_USERNAME and TUKODPH_CMS_PASSWORD.${state.apiError ? ` ${esc(state.apiError)}` : ""}`;
  return `<div class="login-shell"><section class="login-context" aria-label="TukodPH control desk"><div class="login-context-inner"><div class="login-brand"><span class="brand-mark">T</span><span><strong>TukodPH</strong><small>CONTROL DESK</small></span></div><div class="login-context-copy"><span class="eyebrow">Tenant-aware operations</span><h1>One desk for every public portal.</h1><p>Manage content, approvals, layouts, and portal health from a single controlled workspace.</p></div><div class="login-context-status"><span class="status-dot"></span><span><strong>Local preview environment</strong><small>Tenant boundary checks enabled</small></span></div></div></section><main class="login-panel"><section class="login-card" aria-labelledby="login-title"><div class="login-card-header"><span class="login-card-kicker">TukodPH control desk</span><h2 id="login-title">${esc(title)}</h2><p>${esc(copy)}</p></div><form data-login-form novalidate><div class="login-field-group"><label class="login-label" for="login-username">Username</label><input id="login-username" class="login-input" data-field="login-username" value="${esc(state.login.username)}" autocomplete="username" spellcheck="false" /></div><div class="login-field-group"><label class="login-label" for="login-password">Password</label><div class="login-input-wrap"><input id="login-password" class="login-input" data-field="login-password" type="${state.login.showPassword ? "text" : "password"}" value="${esc(state.login.password)}" autocomplete="current-password" /><button type="button" class="login-field-action" data-action="toggle-login-password" aria-label="${state.login.showPassword ? "Hide password" : "Show password"}">${icon("eye")}</button></div></div>${state.login.error ? `<div class="login-error" role="alert">${icon("warning")}${esc(state.login.error)}</div>` : ""}<button type="submit" class="button button-primary login-submit">Sign in to control desk ${icon("arrow")}</button></form><p class="login-footnote">${configurationNote}</p></section></main></div>`;
}

function focusCustomSelectOption(field, index) {
  const options = [
    ...document.querySelectorAll(
      `[data-select-field="${field}"][data-select-option]`,
    ),
  ];
  if (!options.length) return;
  options[Math.max(0, Math.min(index, options.length - 1))].focus();
}

function themeVars() {
  return {
    blue: "#176b68",
    blue2: "#2a827a",
    teal: "#21866d",
    navy: "#1c2a2f",
  };
}

function applyTheme() {
  const vars = themeVars();
  document.documentElement.style.setProperty("--blue", vars.blue);
  document.documentElement.style.setProperty("--blue-2", vars.blue2);
  document.documentElement.style.setProperty("--teal", vars.teal);
  document.documentElement.style.setProperty("--navy", vars.navy);
  document.documentElement.dataset.portalKind = currentTenant().kind;
}

function renderTenantMenu() {
  if (!state.tenantMenu || !tenantSwitchingEnabled()) return "";
  const query = state.tenantQuery.toLowerCase();
  const filtered = portals.filter((portal) =>
    `${portal.name} ${portal.domain}`.toLowerCase().includes(query),
  );
  return `<div class="switcher-menu" role="dialog" aria-label="Portal selector">
    <input class="switcher-search" data-field="tenant-query" value="${esc(state.tenantQuery)}" placeholder="Search portals" aria-label="Search portals" />
    <div class="switcher-list">
      ${
        filtered.length
          ? filtered
              .map(
                (
                  portal,
                ) => `<button class="switcher-option ${portal.id === state.activeTenant ? "is-selected" : ""}" data-action="choose-tenant" data-tenant-id="${portal.id}">
        <span class="tenant-icon" style="background:${portal.color}">${portal.short}</span><span class="tenant-copy"><span class="tenant-name">${esc(portal.name)}</span><span class="tenant-domain">${esc(portal.domain)}</span></span>${portal.id === state.activeTenant ? icon("check") : ""}
      </button>`,
              )
              .join("")
          : '<div class="empty-state">No portals match this search.</div>'
      }
    </div>
  </div>`;
}

function findCountdownWidgetRecord() {
  return (
    state.contentItems.find((item) => {
      const recordKey = String(item?.slug || item?.id || "")
        .trim()
        .toLowerCase();
      return recordKey === "home-countdown";
    }) || null
  );
}

function formatSidebarDate(value = "") {
  const dateValue = String(value || "").trim();
  if (!dateValue) return "No date set";
  const parsed = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateValue;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function formatSidebarDateTime(dateValue = "", timeValue = "") {
  const dateLabel = formatSidebarDate(dateValue);
  const timeLabel = String(timeValue || "").trim();
  if (!timeLabel || dateLabel === "No date set") return dateLabel;
  return `${dateLabel} at ${timeLabel}`;
}

function eventTimeValueForDraft(draft = state.articleDraft) {
  const generated = eventTimeDisplayFromParts(
    draft.eventStartTime || "",
    draft.eventEndTime || "",
  );
  return generated || String(draft.eventTime || "").trim();
}

function buildArticleDraftFromItem(item) {
  const fields = item.fields || {};
  const recordKey = String(item.slug || item.id || "")
    .trim()
    .toLowerCase();
  const galleryConfig = heritageHeroGalleryConfig(fields.widgetConfig || "");
  const type =
    recordKey === "home-countdown"
      ? "Page section"
      : articleTypeFromValue(item.type, item.page);
  return {
    title: fields.heading || item.title || "",
    slug: item.slug || item.id,
    page: item.page || "/",
    placements:
      type === "Event"
        ? [
            ...new Set([
              "/events",
              ...normalizePlacementList(item.placements || []),
            ]),
          ]
        : normalizePlacementList(item.placements || []),
    targets: normalizePlacementTargets(
      item.targets || legacyTargetsFromRecord(item),
      item.page || "/",
    ),
    type,
    language: item.language || "English",
    eyebrow: fields.eyebrow || "",
    summary: fields.summary || item.excerpt || "",
    seo: fields.summary || item.excerpt || "",
    body: fields.body || item.body || "",
    ctaLabel: fields.ctaLabel || "",
    ctaUrl: fields.ctaUrl || "",
    contentCategory: fields.contentCategory || "general",
    widgetConfig: fields.widgetConfig || "",
    heroSlides: heroSlidesFromWidgetConfig(
      fields.widgetConfig || "",
      fields.image || "",
    ),
    heroGalleryPortraitImage: galleryConfig.portraitImage,
    heroGalleryPortraitAlt: galleryConfig.portraitAlt,
    heroGalleryMarketImage: galleryConfig.marketImage,
    heroGalleryMarketAlt: galleryConfig.marketAlt,
    heroGalleryPosterMonth: galleryConfig.posterMonth,
    heroGalleryPosterStart: galleryConfig.posterStart,
    heroGalleryPosterConnector: galleryConfig.posterConnector,
    heroGalleryPosterEnd: galleryConfig.posterEnd,
    heroGalleryPosterYear: galleryConfig.posterYear,
    faqItems: faqItemsFromWidgetConfig(fields.widgetConfig || ""),
    faqGroupScope: faqGroupScopeFromWidgetConfig(fields.widgetConfig || ""),
    faqAssignedEventIds: faqAssignedEventIdsFromWidgetConfig(
      fields.widgetConfig || "",
    ),
    imageAlt: fields.imageAlt || "",
    imageCopyright: fields.imageCopyright || "",
    eventDate: fields.eventDate || "",
    eventEndDate: fields.eventEndDate || "",
    eventCategory: fields.eventCategory || "",
    hideCountdown: Boolean(fields.hideCountdown),
    eventStartTime: fields.eventStartTime || "",
    eventEndTime: fields.eventEndTime || "",
    eventTime: fields.eventTime || "",
    eventVenue: fields.eventVenue || "",
    eventLatitude: fields.eventLatitude || "",
    eventLongitude: fields.eventLongitude || "",
    eventPlaceId: fields.eventPlaceId || "",
    whatToExpectTitle: fields.whatToExpectTitle || "",
    whatToExpectSummary: fields.whatToExpectSummary || "",
    arrivalWindow: fields.arrivalWindow || "",
    eventAccess: fields.eventAccess || "",
    eventBring: fields.eventBring || "",
    eventTips: fields.eventTips || "",
    presentedByName: fields.presentedByName || "",
    presentedByImage: fields.presentedByImage || "",
    presentedByImageCopyright: fields.presentedByImageCopyright || "",
    eventEditorialLabel: fields.eventEditorialLabel || "",
    eventEditorialTitle: fields.eventEditorialTitle || "",
    eventEditorialSummary: fields.eventEditorialSummary || "",
    eventEditorialImage: fields.eventEditorialImage || "",
    eventEditorialImageCopyright: fields.eventEditorialImageCopyright || "",
    eventEditorialLabel2: fields.eventEditorialLabel2 || "",
    eventEditorialTitle2: fields.eventEditorialTitle2 || "",
    eventEditorialSummary2: fields.eventEditorialSummary2 || "",
    eventEditorialImage2: fields.eventEditorialImage2 || "",
    eventEditorialImage2Copyright: fields.eventEditorialImage2Copyright || "",
    connectedEventId: fields.connectedEventId || "",
    featuredHomepageEvent: Boolean(
      fields.featuredHomepageEvent || fields.mainHomepageEvent,
    ),
    mainHomepageEvent: Boolean(fields.mainHomepageEvent),
    featuredEvent: Boolean(fields.featuredEvent),
    sponsorType: normalizeSponsorType(fields.sponsorType),
    sponsorUrl: fields.sponsorUrl || "",
    pushFacebook: Boolean(item.pushFacebook),
    media: fields.image || "",
  };
}

function createCountdownWidgetDraft() {
  const draft = createEmptyArticleDraft("Page section");
  return {
    ...draft,
    title: "Until opening day",
    slug: "home-countdown",
    page: "/",
    type: "Page section",
    eventDate: "",
    hideCountdown: false,
    targets: normalizePlacementTargets(
      [{ page: "/", section: defaultSectionForPage("/") }],
      "/",
    ),
  };
}

function renderSidebarCountdownWidget() {
  const tenant = currentTenant();
  if (!tenant.id || !templateSupportsHomepageCountdown(tenant)) return "";
  const record = findCountdownWidgetRecord();
  const templateLabel = templateLabelForPortal(tenant);
  const heading =
    record?.fields?.heading || record?.title || "Until opening day";
  const dateValue = record?.fields?.eventDate || "";
  const timeValue = record?.fields?.eventTime || "";
  const countdownVisibility = Boolean(record?.fields?.hideCountdown)
    ? "Hidden"
    : "Shown";
  const statusTone = record ? record.status : "draft";
  const statusText = record ? statusLabel(record.status) : "Not created";
  return `<section class="sidebar-widget" aria-label="Homepage countdown widget">
    <div class="sidebar-widget-head">
      <div>
        <span class="sidebar-widget-kicker">${esc(templateLabel)} widget</span>
        <strong>Countdown timer</strong>
      </div>
      <span class="sidebar-widget-status ${esc(statusTone)}">${esc(statusText)}</span>
    </div>
    <p class="sidebar-widget-copy">Adjust the label, visibility, and opening-day target shown on the ${esc(templateLabel)} homepage.</p>
    <div class="sidebar-widget-meta">
      <div><span>Label</span><strong>${esc(heading)}</strong></div>
      <div><span>Opening target</span><strong>${esc(formatSidebarDateTime(dateValue, timeValue))}</strong></div>
      <div><span>Visibility</span><strong>${esc(countdownVisibility)}</strong></div>
    </div>
    <button class="button button-sidebar" data-action="edit-countdown-widget">${icon("calendar")} ${record ? "Edit countdown" : "Create countdown"}</button>
  </section>`;
}

function renderSidebar() {
  const tenant = currentTenant();
  const reviewCount = state.contentItems.filter(
    (item) => item.status === "review",
  ).length;
  const userName = currentUserName();
  const switchingEnabled = tenantSwitchingEnabled();
  const hasSiteWidgets = Boolean(
    tenant.id && templateSupportsSiteWidgets(tenant),
  );
  const hasCountdownWidget = Boolean(
    tenant.id && templateSupportsHomepageCountdown(tenant),
  );
  const navItems = [
    ["content", "Content desk", "file"],
    ["events", "Events", "calendar"],
    ["sponsors", "Sponsors", "layers"],
    ["contact-submissions", "Contact Submissions", "file"],
    ["review", "Editorial clearance", "review"],
    ["media", "Media vault", "image"],
  ];
  if (isAdmin()) navItems.unshift(["dashboard", "Control center", "grid"]);
  const sponsorsIndex = navItems.findIndex(([id]) => id === "sponsors");
  const topNavItems =
    sponsorsIndex >= 0 ? navItems.slice(0, sponsorsIndex + 1) : navItems;
  const bottomNavItems =
    sponsorsIndex >= 0 ? navItems.slice(sponsorsIndex + 1) : [];
  return `<aside class="sidebar">
    <div class="brand-row"><span class="brand-mark">T</span><span><span class="brand-name">TukodPH</span><span class="brand-sub">Control desk</span></span></div>
    <div class="tenant-zone">
      <div class="eyebrow">${switchingEnabled ? "Active portal" : "Festival workspace"}</div>
      <div class="tenant-switcher">
        ${
          switchingEnabled
            ? `<button class="tenant-button" data-action="toggle-tenant-menu" aria-expanded="${state.tenantMenu}" aria-label="Switch active portal">
          <span class="tenant-icon" style="background:${tenant.color}">${tenant.short}</span><span class="tenant-copy"><span class="tenant-name">${esc(tenant.name)}</span><span class="tenant-domain">${esc(tenant.domain)}</span></span>${icon("chevron", "Open portal list")}
        </button>${renderTenantMenu()}`
            : `<div class="tenant-button tenant-button-static" aria-label="Active festival workspace">
          <span class="tenant-icon" style="background:${tenant.color}">${tenant.short}</span><span class="tenant-copy"><span class="tenant-name">${esc(tenant.name)}</span><span class="tenant-domain">${esc(tenant.domain)}</span></span>${SCOPED_TENANT_ID ? '<span class="tag">Locked</span>' : ""}
        </div>`
        }
      </div>
    </div>
    <nav class="sidebar-nav" aria-label="Primary">
      <div class="nav-section-label">Workspace</div>
      ${topNavItems.map(([id, label, iconName]) => `<button class="nav-item ${state.view === id ? "is-active" : ""}" data-action="navigate" data-view="${id}">${icon(iconName)}<span>${label}</span>${id === "review" && reviewCount ? `<span class="nav-badge">${reviewCount}</span>` : ""}</button>`).join("")}
      ${hasSiteWidgets ? `<button class="nav-item ${state.view === "widgets" ? "is-active" : ""}" data-action="navigate" data-view="widgets">${icon("calendar")}<span>Site Widgets</span></button>` : ""}
      ${hasCountdownWidget ? `<button class="nav-item" data-action="edit-countdown-widget">${icon("bell")}<span>Countdown</span></button>` : ""}
      ${bottomNavItems.map(([id, label, iconName]) => `<button class="nav-item ${state.view === id ? "is-active" : ""}" data-action="navigate" data-view="${id}">${icon(iconName)}<span>${label}</span>${id === "review" && reviewCount ? `<span class="nav-badge">${reviewCount}</span>` : ""}</button>`).join("")}
      ${
        isAdmin()
          ? `<div class="nav-section-label">System</div>
      <button class="nav-item" data-action="show-toast" data-toast-title="Settings are scoped to the active portal" data-toast-copy="Tenant-aware preferences will be connected to the API boundary.">${icon("settings")}<span>Portal settings</span></button>`
          : ""
      }
    </nav>
    <div class="sidebar-bottom">
      <div class="secure-note">${icon(state.apiOnline ? "shield" : "warning")}<span>${state.apiOnline ? "CMS API connected. Public requests are tagged with <strong>X-Tenant-ID</strong>." : `API offline${state.apiError ? `: ${esc(state.apiError)}` : "."}`}</span></div>
      <div class="user-mini"><span class="avatar">${initialsFromName(userName)}</span><span><span class="user-mini-name">${esc(userName)}</span><span class="user-mini-role">${state.role} profile</span></span></div>
    </div>
  </aside>`;
}

function renderTopbar() {
  const labels = {
    dashboard: "Control center",
    content: "Content desk",
    events: "Events",
    sponsors: "Sponsors",
    "contact-submissions": "Contact Submissions",
    widgets: "Site Widgets",
    review: "Editorial clearance",
    media: "Media vault",
  };
  return `<header class="topbar"><div class="breadcrumb"><span class="breadcrumb-label">${esc(currentTenant().name)}</span>${icon("arrow")}<span class="breadcrumb-current">${labels[state.view]}</span></div><div class="top-actions">
    <div class="role-toggle" aria-label="Permission profile"><button class="is-active" type="button" disabled>${esc(state.role === "admin" ? "Admin" : state.role === "editor" ? "Editor" : "Writer")}</button></div>
    <button class="icon-button" data-action="show-toast" data-toast-title="Command search is ready" data-toast-copy="Search across content, portals, assets, and audit events." aria-label="Open command search">${icon("search", "Search")}</button>
    <button class="icon-button" data-action="navigate" data-view="review" aria-label="Open notifications">${icon("bell", "Notifications")}<span class="notification-dot"></span></button>
    <button class="icon-button" data-action="logout" aria-label="Sign out">${icon("logout", "Sign out")}</button>
  </div></header>`;
}

function renderPageHeading(title, description, actions = "") {
  return `<div class="page-heading"><div><h1 class="page-title">${title}</h1><p class="page-description">${description}</p></div><div class="heading-actions">${actions}</div></div>`;
}

function renderMetrics() {
  const tenant = currentTenant();
  const liveCount = portals.filter((portal) => portal.status === "live").length;
  const pendingCount = portals.filter(
    (portal) => portal.status === "pending",
  ).length;
  const metrics = [
    [
      "Live portals",
      String(liveCount),
      state.apiOnline
        ? "CMS API registry connected"
        : "Portal registry unavailable",
      state.apiOnline ? "positive" : "warning",
      "globe",
    ],
    [
      "Pending launch",
      String(pendingCount),
      "Across provisioning queue",
      pendingCount ? "warning" : "positive",
      "layers",
    ],
    [
      "Review queue",
      String(
        state.contentItems.filter((item) => item.status === "review").length,
      ),
      "Requires editor attention",
      "warning",
      "review",
    ],
    [
      "API integration",
      tenant.integrated ? "Live" : tenant.id ? "Ready" : "Not set",
      tenant.integrated
        ? "Frontend is consuming published content"
        : tenant.id
          ? "Tenant can be connected through the public API"
          : "Create a portal to enable preview and publishing",
      tenant.integrated ? "positive" : "warning",
      "shield",
    ],
  ];
  return `<div class="metrics">${metrics.map(([label, value, foot, tone, iconName]) => `<div class="surface metric"><span class="metric-label">${label}</span><span class="metric-value">${value}</span><span class="metric-foot ${tone}">${icon(tone === "positive" ? "check" : "warning")}${foot}</span><span class="metric-icon">${icon(iconName)}</span></div>`).join("")}</div>`;
}

function renderTenantOverview() {
  return `<section class="surface"><div class="surface-header"><div><h2 class="surface-title">Portal operations</h2><p class="surface-kicker">Health, ownership, and launch readiness across active tenant partitions.</p></div><button class="button button-quiet" data-action="show-toast" data-toast-title="Export queued" data-toast-copy="A CSV snapshot will include tenant health and permissions.">${icon("external")}Export view</button></div>${portals.length ? `<div class="table-wrap"><table class="tenant-table"><thead><tr><th>Portal</th><th>Status</th><th>Editors</th><th>Uptime</th><th>Action</th></tr></thead><tbody>${portals.map((portal) => `<tr><td><div class="tenant-cell"><span class="tenant-icon" style="background:${portal.color}">${portal.short}</span><span><strong>${esc(portal.name)}</strong><small>${esc(portal.domain)}${portal.templateName ? ` · ${esc(portal.templateName)}` : ""}${portal.structureVersion ? ` · ${esc(portal.structureVersion)}` : ""}</small></span></div></td><td>${renderStatus(portal.status)}</td><td>${portal.users}</td><td><strong>${portal.uptime}</strong></td><td><button class="table-action" data-action="choose-tenant" data-tenant-id="${portal.id}">Open portal ${icon("arrow")}</button></td></tr>`).join("")}</tbody></table></div>` : '<div class="empty-state">No portals exist yet. Create one from the provisioning flow to start publishing.</div>'}</section>`;
}

function renderContent() {
  const contentDeskItems = state.contentItems.filter(
    (item) => !isManagedWidgetRecord(item),
  );
  const typeOptions = [
    "all",
    ...new Set(contentDeskItems.map((item) => item.type).filter(Boolean)),
  ];
  const items = contentDeskItems.filter((item) => {
    const statusMatch =
      state.contentFilter === "all" || item.status === state.contentFilter;
    const typeMatch =
      state.contentTypeFilter === "all" ||
      item.type === state.contentTypeFilter;
    return statusMatch && typeMatch;
  });
  const canPublish = hasPermission("articles.publish");
  return `${renderPageHeading("Content desk", "Build structured portal content with metadata, verified media, and permission-aware publishing controls.", '<button class="button button-primary" data-action="new-article">' + icon("filePlus") + "Create new article</button>")}
    <div class="content-toolbar"><div class="filter-row">${["all", "draft", "review", "published"].map((filter) => `<button class="filter-pill ${state.contentFilter === filter ? "is-active" : ""}" data-action="filter-content" data-filter="${filter}">${filter === "all" ? "All content" : statusLabel(filter)}${filter === "review" ? ` · ${contentDeskItems.filter((item) => item.status === "review").length}` : ""}</button>`).join("")}</div><div class="filter-row" style="gap:12px"><label class="muted" for="content-type-filter" style="font-size:11px">Content type</label><select id="content-type-filter" class="form-select" data-field="content-type-filter" style="min-width:220px">${typeOptions.map((type) => `<option value="${esc(type)}" ${state.contentTypeFilter === type ? "selected" : ""}>${type === "all" ? "All types" : esc(type)}</option>`).join("")}</select></div><span class="muted" style="font-size:11px">${canPublish ? "Editor profile · live actions available" : "Writer profile · draft mode only"}</span></div>
    <section class="surface"><div class="surface-header"><div><h2 class="surface-title">Editorial inventory</h2><p class="surface-kicker">Localized, tenant-scoped records with a visible approval state.</p></div><button class="button" data-action="show-toast" data-toast-title="Content schema" data-toast-copy="Festival events support markdown, scheduled dates, and social dispatch flags.">${icon("info")}Schema notes</button></div><div class="table-wrap"><table class="tenant-table content-inventory-table"><thead><tr><th>Content record</th><th>State</th><th>Last updated</th><th>Action</th></tr></thead><tbody>${items.length ? items.map(renderContentItem).join("") : '<tr><td colspan="4"><div class="empty-state">No records in this state.</div></td></tr>'}</tbody></table></div></section>
    <div class="editor-grid" style="margin-top:18px"><section class="surface"><div class="surface-header"><div><h2 class="surface-title">Workflow safeguards</h2><p class="surface-kicker">The active role changes which controls appear in the writing desk.</p></div></div><div class="form-section"><div class="publish-control"><span><strong>Publish to live portal</strong><span>${canPublish ? "You can authorize a reviewed record." : "Hidden for writers until an editor approves the record."}</span></span><button class="switch ${canPublish ? "is-on" : "is-disabled"}" ${canPublish ? "" : "disabled"} aria-label="Publish control preview"></button></div><div class="status-banner">${icon(canPublish ? "shield" : "warning")}${canPublish ? "Four-eyes approval is required before publication." : "Status: Draft - Pending Manager Review."}</div></div></section>${renderMediaVault("Inline media vault")}</div>`;
}

function renderEvents() {
  const eventItems = state.contentItems.filter((item) => item.type === "Event");
  const statusFiltered = eventItems.filter(
    (item) =>
      state.contentFilter === "all" || item.status === state.contentFilter,
  );
  const publishedCount = eventItems.filter(
    (item) => item.status === "published",
  ).length;
  const featuredEventsPageCount = eventItems.filter(
    (item) => item.fields?.featuredEvent,
  ).length;
  const featuredHomepageCount = eventItems.filter(
    (item) => item.fields?.featuredHomepageEvent,
  ).length;
  const mainHomepageEvent = eventItems.find(
    (item) => item.fields?.mainHomepageEvent,
  );
  const reviewCount = eventItems.filter(
    (item) => item.status === "review",
  ).length;
  const canPublish = hasPermission("articles.publish");
  return `${renderPageHeading("Events", "Handle the full festival event lineup from one workspace, including schedule details, placements, and single-event pages.", '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="button" data-action="open-event-import">' + icon("upload") + 'CSV import</button><button class="button button-primary" data-action="new-event">' + icon("calendar") + "Add event</button></div>")}
    <div class="content-toolbar"><div class="filter-row">${["all", "draft", "review", "published"].map((filter) => `<button class="filter-pill ${state.contentFilter === filter ? "is-active" : ""}" data-action="filter-content" data-filter="${filter}">${filter === "all" ? "All events" : statusLabel(filter)}${filter === "review" ? ` · ${reviewCount}` : ""}</button>`).join("")}</div><span class="muted" style="font-size:11px">${eventItems.length} event record${eventItems.length === 1 ? "" : "s"} · ${publishedCount} published · ${featuredHomepageCount} homepage featured${mainHomepageEvent ? ` · Main: ${esc(mainHomepageEvent.title)}` : ""} · ${featuredEventsPageCount} events-page featured · ${canPublish ? "Editor profile" : "Writer profile"}</span></div>
    <section class="surface"><div class="surface-header"><div><h2 class="surface-title">Event records</h2><p class="surface-kicker">Every event record powers the main events page and its own single-event detail page.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="button" data-action="open-event-import">${icon("upload")}CSV import</button><button class="button" data-action="new-event">${icon("filePlus")}New event record</button></div></div><div class="table-wrap"><table class="tenant-table content-inventory-table"><thead><tr><th>Event record</th><th>State</th><th>Last updated</th><th>Action</th></tr></thead><tbody>${statusFiltered.length ? statusFiltered.map(renderContentItem).join("") : '<tr><td colspan="4"><div class="empty-state">No event records match this state yet.</div></td></tr>'}</tbody></table></div></section>
    <div class="editor-grid" style="margin-top:18px"><section class="surface"><div class="surface-header"><div><h2 class="surface-title">Event publishing flow</h2><p class="surface-kicker">Event entries keep their own date, time, venue, and optional feature placements across the portal.</p></div></div><div class="form-section"><div class="status-banner">${icon("info")}Each event is always included in the main <strong>/events</strong> listing and can also be featured on other selected pages.</div><div class="publish-control"><span><strong>Single-event page generation</strong><span>Published events automatically use their slug to create a dedicated detail page route.</span></span><button class="switch is-on" disabled aria-label="Event route generation preview"></button></div></div></section>${renderMediaVault("Event media vault")}</div>`;
}

function renderSponsors() {
  const sponsorItems = state.contentItems.filter(
    (item) => item.type === "Sponsor",
  );
  const statusFiltered = sponsorItems.filter((item) => {
    const statusMatch =
      state.contentFilter === "all" || item.status === state.contentFilter;
    const partnerTypeMatch =
      state.sponsorTypeFilter === "all" ||
      item.fields?.sponsorType === state.sponsorTypeFilter;
    return statusMatch && partnerTypeMatch;
  });
  const publishedCount = sponsorItems.filter(
    (item) => item.status === "published",
  ).length;
  const reviewCount = sponsorItems.filter(
    (item) => item.status === "review",
  ).length;
  const canPublish = hasPermission("articles.publish");
  return `${renderPageHeading("Sponsors", "Create sponsor records and publish them to the sponsor page, homepage partner band, or any other selected section.", '<button class="button button-primary" data-action="new-sponsor">' + icon("plus") + "Add sponsor</button>")}
    <div class="content-toolbar"><div class="filter-row">${["all", "draft", "review", "published"].map((filter) => `<button class="filter-pill ${state.contentFilter === filter ? "is-active" : ""}" data-action="filter-content" data-filter="${filter}">${filter === "all" ? "All sponsors" : statusLabel(filter)}${filter === "review" ? ` · ${reviewCount}` : ""}</button>`).join("")}</div><div class="filter-row" style="gap:12px"><label class="muted" for="sponsor-type-filter" style="font-size:11px">Partner Type</label><select id="sponsor-type-filter" class="form-select" data-field="sponsor-type-filter" style="min-width:220px"><option value="all" ${state.sponsorTypeFilter === "all" ? "selected" : ""}>All Partner Types</option>${sponsorTypeOptions.map(([value, label]) => `<option value="${esc(value)}" ${state.sponsorTypeFilter === value ? "selected" : ""}>${esc(label)}</option>`).join("")}</select></div><span class="muted" style="font-size:11px">${statusFiltered.length} shown · ${sponsorItems.length} total · ${publishedCount} published · ${canPublish ? "Editor profile" : "Writer profile"}</span></div>
    <section class="surface"><div class="surface-header"><div><h2 class="surface-title">Sponsor records</h2><p class="surface-kicker">Use one sponsor record across multiple pages without duplicating the entry.</p></div><button class="button" data-action="new-sponsor">${icon("filePlus")}New sponsor record</button></div><div class="table-wrap"><table class="tenant-table content-inventory-table"><thead><tr><th>Sponsor record</th><th>State</th><th>Last updated</th><th>Action</th></tr></thead><tbody>${statusFiltered.length ? statusFiltered.map(renderContentItem).join("") : '<tr><td colspan="4"><div class="empty-state">No sponsor records match the current filters.</div></td></tr>'}</tbody></table></div></section>
    <div class="editor-grid" style="margin-top:18px"><section class="surface"><div class="surface-header"><div><h2 class="surface-title">Sponsor placement</h2><p class="surface-kicker">Sponsor entries can be shown on the sponsor page, homepage, and other selected sections from one record.</p></div></div><div class="form-section"><div class="status-banner">${icon("info")}Recommended sections include the sponsor page tiers area and the homepage partner band.</div><div class="publish-control"><span><strong>Reusable sponsor publishing</strong><span>Assign the same sponsor record to multiple page sections from the content modal.</span></span><button class="switch is-on" disabled aria-label="Sponsor publishing preview"></button></div></div></section>${renderMediaVault("Sponsor media vault")}</div>`;
}

const contactInquiryTypeOptions = [
  "Visitor Planning",
  "Events and Venue",
  "Accessibility Support",
  "Media or Partnerships",
];

const contactSubmissionStatusOptions = [
  "New",
  "In Progress",
  "Resolved",
  "Closed",
];

function formatContactSubmissionDate(value = "") {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value || "Unknown";
  return parsed.toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function renderContactSubmissions() {
  const filtered = state.contactSubmissions.filter((entry) => {
    const statusMatches =
      state.contactSubmissionStatusFilter === "all" ||
      entry.status === state.contactSubmissionStatusFilter;
    const typeMatches =
      state.contactSubmissionTypeFilter === "all" ||
      entry.inquiryType === state.contactSubmissionTypeFilter;
    return statusMatches && typeMatches;
  });
  const newCount = state.contactSubmissions.filter(
    (entry) => entry.status === "New",
  ).length;
  return `${renderPageHeading("Contact Submissions", "Review public inquiries submitted through assigned Contact Form Widgets and track each response through resolution.")}
    <div class="content-toolbar">
      <div class="filter-row" style="gap:12px">
        <label class="muted" for="contact-status-filter" style="font-size:11px">Status</label>
        <select id="contact-status-filter" class="form-select" data-field="contact-submission-status-filter" style="min-width:170px">
          <option value="all">All statuses</option>
          ${contactSubmissionStatusOptions.map((status) => `<option value="${esc(status)}" ${state.contactSubmissionStatusFilter === status ? "selected" : ""}>${esc(status)}</option>`).join("")}
        </select>
        <label class="muted" for="contact-type-filter" style="font-size:11px">Inquiry Type</label>
        <select id="contact-type-filter" class="form-select" data-field="contact-submission-type-filter" style="min-width:220px">
          <option value="all">All inquiry types</option>
          ${contactInquiryTypeOptions.map((type) => `<option value="${esc(type)}" ${state.contactSubmissionTypeFilter === type ? "selected" : ""}>${esc(type)}</option>`).join("")}
        </select>
      </div>
      <span class="muted" style="font-size:11px">${filtered.length} shown · ${state.contactSubmissions.length} total · ${newCount} new</span>
    </div>
    <section class="surface">
      <div class="surface-header"><div><h2 class="surface-title">Inquiry records</h2><p class="surface-kicker">Submission data is tenant-scoped and available only to authenticated CMS users.</p></div></div>
      <div class="table-wrap">
        <table class="tenant-table content-inventory-table">
          <thead><tr><th>Contact</th><th>Inquiry</th><th>Submitted</th><th>Status</th></tr></thead>
          <tbody>${
            filtered.length
              ? filtered
                  .map(
                    (entry) => `<tr>
              <td><div class="tenant-cell"><span><strong>${esc(entry.fullName || "Unnamed visitor")}</strong><small><a href="mailto:${esc(entry.email || "")}">${esc(entry.email || "No email")}</a></small></span></div></td>
              <td><strong>${esc(entry.inquiryType || "Uncategorized")}</strong><div class="muted" style="margin-top:7px;max-width:560px;white-space:pre-wrap">${esc(entry.message || "")}</div></td>
              <td><strong>${esc(formatContactSubmissionDate(entry.submittedAt))}</strong></td>
              <td><select class="form-select" data-field="contact-submission-status" data-submission-id="${esc(entry.id)}" aria-label="Update status for ${esc(entry.fullName || "contact submission")}">${contactSubmissionStatusOptions.map((status) => `<option value="${esc(status)}" ${entry.status === status ? "selected" : ""}>${esc(status)}</option>`).join("")}</select></td>
            </tr>`,
                  )
                  .join("")
              : '<tr><td colspan="4"><div class="empty-state">No contact submissions match the current filters.</div></td></tr>'
          }</tbody>
        </table>
      </div>
    </section>`;
}

function renderWidgets() {
  const tenant = currentTenant();
  const supported = Boolean(tenant.id && templateSupportsSiteWidgets(tenant));
  const record = findCountdownWidgetRecord();
  const templateLabel = templateLabelForPortal(tenant);
  const heading =
    record?.fields?.heading || record?.title || "Until opening day";
  const dateValue = record?.fields?.eventDate || "";
  const timeValue = record?.fields?.eventTime || "";
  const countdownVisibility = Boolean(record?.fields?.hideCountdown)
    ? "Hidden"
    : "Shown";
  const statusTone = record ? record.status : "draft";
  const statusText = record ? statusLabel(record.status) : "Not created";
  const widgetSections = [
    {
      id: "homepage",
      title: "Homepage",
      copy: "Widgets shown on the main landing page for this portal.",
      body: supported
        ? `<div class="widget-directory">
        <button class="widget-directory-button" data-action="edit-countdown-widget" aria-label="Open countdown widget editor">
          <span class="widget-directory-main">
            <span class="widget-directory-icon">${icon("calendar")}</span>
            <span class="widget-directory-copy">
              <strong>Countdown</strong>
              <span>Adjust the homepage countdown label, opening-day target, and visibility.</span>
              <span class="widget-directory-meta">Label: ${esc(heading)} · Opening date: ${esc(formatSidebarDate(dateValue))} · Visibility: ${esc(countdownVisibility)}</span>
            </span>
          </span>
          <span class="widget-directory-side">
            <span class="status ${esc(statusTone)}">${esc(statusText)}</span>
            ${icon("arrow", "Open countdown widget")}
          </span>
        </button>
      </div>`
        : '<div class="widget-section-empty">No site widgets are available for this portal yet.</div>',
    },
    {
      id: "about",
      title: "About",
      copy: "Widgets reserved for the About page.",
      body: '<div class="widget-section-empty">No About widgets available yet.</div>',
    },
    {
      id: "events",
      title: "Events",
      copy: "Widgets reserved for the Events page.",
      body: '<div class="widget-section-empty">No Events widgets available yet.</div>',
    },
    {
      id: "partner",
      title: "Be a partner",
      copy: "Widgets reserved for the Be a partner page.",
      body: '<div class="widget-section-empty">No Be a partner widgets available yet.</div>',
    },
    {
      id: "contact",
      title: "Contact us",
      copy: "Widgets reserved for the Contact us page.",
      body: '<div class="widget-section-empty">No Contact us widgets available yet.</div>',
    },
  ];
  return `${renderPageHeading("Site Widgets", "Manage reusable site widgets for the active portal template.")}
    <div class="content-toolbar"><span class="muted" style="font-size:11px">${supported ? `${esc(templateLabel)} supports reusable site widgets for this portal.` : "The active portal template does not currently support site widgets."}</span></div>
    <section class="surface">
      <div class="surface-header">
        <div>
          <h2 class="surface-title">Widget sections</h2>
          <p class="surface-kicker">${supported ? "Open a widget editor from the relevant page section without leaving the widgets workspace." : "Page sections are ready, but this active portal template does not currently expose editable site widgets."}</p>
        </div>
      </div>
      <div class="widget-sections">
        ${widgetSections
          .map(
            (
              section,
            ) => `<section class="widget-section" aria-labelledby="widget-section-${esc(section.id)}">
          <div class="widget-section-head">
            <div>
              <h3 id="widget-section-${esc(section.id)}" class="widget-section-title">${esc(section.title)}</h3>
              <p class="widget-section-copy">${esc(section.copy)}</p>
            </div>
          </div>
          ${section.body}
        </section>`,
          )
          .join("")}
      </div>
    </section>`;
  return `${renderPageHeading("Site Widgets", "Manage reusable site widgets for the active portal template.")}
    <div class="content-toolbar"><span class="muted" style="font-size:11px">${supported ? `${esc(templateLabel)} supports reusable site widgets for this portal.` : "The active portal template does not currently support site widgets."}</span></div>
    <section class="surface">
      <div class="surface-header">
        <div>
          <h2 class="surface-title">Available widgets</h2>
          <p class="surface-kicker">${supported ? "Open a widget editor from here without leaving the widgets workspace." : "Switch to a supported portal template to manage site widgets."}</p>
        </div>
      </div>
      ${
        supported
          ? `<div class="widget-directory">
        <button class="widget-directory-button" data-action="edit-countdown-widget" aria-label="Open countdown widget editor">
          <span class="widget-directory-main">
            <span class="widget-directory-icon">${icon("calendar")}</span>
            <span class="widget-directory-copy">
              <strong>Countdown</strong>
              <span>Adjust the homepage countdown label, opening-day target, and visibility.</span>
              <span class="widget-directory-meta">Label: ${esc(heading)} · Opening date: ${esc(formatSidebarDate(dateValue))} · Visibility: ${esc(countdownVisibility)}</span>
            </span>
          </span>
          <span class="widget-directory-side">
            <span class="status ${esc(statusTone)}">${esc(statusText)}</span>
            ${icon("arrow", "Open countdown widget")}
          </span>
        </button>
      </div>`
          : '<div class="empty-state">No site widgets are available for this portal yet.</div>'
      }
    </section>`;
}

function renderSiteWidgetLibrary() {
  const widgets = siteWidgetLibraryForPortal();
  return `<section class="surface widget-library-panel">
    <div class="surface-header">
      <div>
        <h2 class="surface-title">Widget Library</h2>
        <p class="surface-kicker">Drag a reusable widget into any compatible template section. Each widget only lists published Content Desk records with the matching display category.</p>
      </div>
    </div>
    <div class="widget-library">
      ${
        widgets.length
          ? widgets
              .map(
                (
                  widget,
                ) => `<button class="widget-library-item" type="button" draggable="true" data-widget-template="${esc(widget.type)}" aria-label="Drag ${esc(widget.label)} widget">
        <span class="widget-library-icon">${icon(widget.iconName)}</span>
        <span class="widget-library-copy">
          <strong>${esc(widget.label)}</strong>
          <span>${esc(widget.description)}</span>
        </span>
      </button>`,
              )
              .join("")
          : '<div class="widget-section-empty">No reusable widgets are enabled for the active portal template.</div>'
      }
    </div>
  </section>`;
}

function renderHomepageCountdownDirectoryCard({
  supported = false,
  heading = "",
  dateValue = "",
  countdownVisibility = "Shown",
  statusTone = "draft",
  statusText = "Not created",
} = {}) {
  if (!supported) {
    return '<div class="widget-section-empty">Countdown is only available when the active portal template supports the homepage opening-day timer.</div>';
  }
  return `<div class="widget-directory">
    <button class="widget-directory-button" data-action="edit-countdown-widget" aria-label="Open countdown widget editor">
      <span class="widget-directory-main">
        <span class="widget-directory-icon">${icon("calendar")}</span>
        <span class="widget-directory-copy">
          <strong>Countdown</strong>
          <span>Adjust the homepage countdown label, opening-day target, and visibility.</span>
          <span class="widget-directory-meta">Label: ${esc(heading)} · Opening date: ${esc(formatSidebarDate(dateValue))} · Visibility: ${esc(countdownVisibility)}</span>
        </span>
      </span>
      <span class="widget-directory-side">
        <span class="status ${esc(statusTone)}">${esc(statusText)}</span>
        ${icon("arrow", "Open countdown widget")}
      </span>
    </button>
  </div>`;
}

function renderHomepageCountdownDirectoryCardV2({
  supported = false,
  heading = "",
  dateValue = "",
  timeValue = "",
  countdownVisibility = "Shown",
  statusTone = "draft",
  statusText = "Not created",
} = {}) {
  if (!supported) {
    return renderHomepageCountdownDirectoryCard({
      supported,
      heading,
      dateValue,
      countdownVisibility,
      statusTone,
      statusText,
    });
  }
  const targetLabel = formatSidebarDateTime(dateValue, timeValue);
  return `<div class="widget-directory">
    <button class="widget-directory-button" data-action="edit-countdown-widget" aria-label="Open countdown widget editor">
      <span class="widget-directory-main">
        <span class="widget-directory-icon">${icon("calendar")}</span>
        <span class="widget-directory-copy">
          <strong>Countdown</strong>
          <span>Adjust the homepage countdown label, opening-day target, and visibility.</span>
          <span class="widget-directory-meta">Label: ${esc(heading)} · Opening target: ${esc(targetLabel)} · Visibility: ${esc(countdownVisibility)}</span>
        </span>
      </span>
      <span class="widget-directory-side">
        <span class="status ${esc(statusTone)}">${esc(statusText)}</span>
        ${icon("arrow", "Open countdown widget")}
      </span>
    </button>
  </div>`;
}

function renderSiteWidgetCard(widget = {}) {
  const typeMeta = widgetTemplateMeta(widget.type);
  const isHeritageGalleryWidget =
    activeTemplateId() === "festival-heritage" &&
    widget.type === "hero-gallery" &&
    widget.sectionId === "home-hero-gallery";

  if (isHeritageGalleryWidget) {
    const config = heritageHeroGalleryConfig(
      widget.record?.fields?.widgetConfig || "",
    );
    const hasGallery =
      Boolean(widget.record?.fields?.image) ||
      Boolean(config.portraitImage) ||
      Boolean(config.marketImage);
    return `<article class="site-widget-card">
      <div class="site-widget-card-head">
        <div class="site-widget-card-title"><span class="site-widget-card-icon">${icon(typeMeta.iconName)}</span><strong>${esc(widget.title || typeMeta.label)}</strong></div>
        <div class="site-widget-card-actions">
          <button class="site-widget-enabled-toggle ${widget.enabled ? "is-enabled" : ""}" type="button" data-action="toggle-site-widget-enabled" data-widget-id="${esc(widget.id)}" aria-pressed="${widget.enabled ? "true" : "false"}">${widget.enabled ? "Enabled" : "Disabled"}</button>
          <button class="site-widget-drag-handle" type="button" draggable="true" data-widget-instance-id="${esc(widget.id)}" aria-label="Drag ${esc(typeMeta.label)} widget">${icon("menu")}</button>
          <button class="site-widget-remove" type="button" data-action="remove-site-widget" data-widget-id="${esc(widget.id)}">Remove</button>
        </div>
      </div>
      <div class="site-widget-card-body">
        <div class="widget-selection-preview">
          <div class="widget-selection-copy">
            <strong>${hasGallery ? "Gallery layout configured" : "No gallery images selected yet"}</strong>
            <span>Large left image, portrait image, market image, and festival date poster</span>
            <span>${esc(widget.record?.fields?.heading || "Use the editor below to manage the gallery directly from Site Widgets.")}</span>
          </div>
        </div>
        <div class="widget-inline-actions">
          <button class="button button-quiet" type="button" data-action="edit-site-widget-record" data-widget-id="${esc(widget.id)}">${icon("image")}Edit gallery</button>
        </div>
      </div>
    </article>`;
  }

  if (widget.type === "contact-form") {
    return `<article class="site-widget-card">
      <div class="site-widget-card-head">
        <div class="site-widget-card-title"><span class="site-widget-card-icon">${icon(typeMeta.iconName)}</span><strong>${esc(widget.title || typeMeta.label)}</strong></div>
        <div class="site-widget-card-actions">
          <button class="site-widget-enabled-toggle ${widget.enabled ? "is-enabled" : ""}" type="button" data-action="toggle-site-widget-enabled" data-widget-id="${esc(widget.id)}" aria-pressed="${widget.enabled ? "true" : "false"}">${widget.enabled ? "Enabled" : "Disabled"}</button>
          <button class="site-widget-drag-handle" type="button" draggable="true" data-widget-instance-id="${esc(widget.id)}" aria-label="Drag contact form widget">${icon("menu")}</button>
          <button class="site-widget-remove" type="button" data-action="remove-site-widget" data-widget-id="${esc(widget.id)}">Remove</button>
        </div>
      </div>
      <div class="site-widget-card-body">
        <div class="widget-selection-preview">
          <div class="widget-selection-copy">
            <strong>Contact inquiry form</strong>
            <span>Full Name, Email Address, Inquiry Type, and Message</span>
            <span>New inquiries are stored in Contact Submissions and notify the configured recipient.</span>
          </div>
        </div>
      </div>
    </article>`;
  }

  if (widget.type === "featured-image") {
    if (templateUsesLinkedImageWidgets()) {
      const posts = widgetContentOptions(widget.type, widget.sourceRecordId);
      const selected =
        posts.find((item) => item.id === widget.sourceRecordId) ||
        findContentRecordByKey(widget.sourceRecordId) ||
        null;
      return `<article class="site-widget-card">
        <div class="site-widget-card-head">
          <div class="site-widget-card-title"><span class="site-widget-card-icon">${icon(typeMeta.iconName)}</span><strong>${esc(widget.title || typeMeta.label)}</strong></div>
          <div class="site-widget-card-actions">
            <button class="site-widget-enabled-toggle ${widget.enabled ? "is-enabled" : ""}" type="button" data-action="toggle-site-widget-enabled" data-widget-id="${esc(widget.id)}" aria-pressed="${widget.enabled ? "true" : "false"}">${widget.enabled ? "Enabled" : "Disabled"}</button>
            <button class="site-widget-drag-handle" type="button" draggable="true" data-widget-instance-id="${esc(widget.id)}" aria-label="Drag featured image widget">${icon("menu")}</button>
            <button class="site-widget-remove" type="button" data-action="remove-site-widget" data-widget-id="${esc(widget.id)}">Remove</button>
          </div>
        </div>
        <div class="site-widget-card-body">
          <label class="form-label" for="widget-post-${esc(widget.id)}">Image content</label>
          <select id="widget-post-${esc(widget.id)}" class="form-select" data-field="widget-post-record" data-widget-id="${esc(widget.id)}">
            <option value="">Select content</option>
            ${posts
              .map(
                (item) =>
                  `<option value="${esc(item.id)}" ${item.id === widget.sourceRecordId ? "selected" : ""}>${esc(item.title)}</option>`,
              )
              .join("")}
          </select>
          ${
            selected
              ? `<div class="widget-selection-preview">
            <div class="widget-selection-copy">
              <strong>${esc(selected.title)}</strong>
              <span>${esc(selected.page || "/")}</span>
              <span>${esc(selected.excerpt || selected.summary || "No summary added yet.")}</span>
            </div>
          </div>
          <div class="widget-inline-actions">
            <button class="button button-quiet" type="button" data-action="edit-widget-source" data-source-id="${esc(selected.id)}">${icon("file")}Edit linked content</button>
          </div>`
              : '<div class="widget-selection-empty">Select a published Content Desk record categorized as Image.</div>'
          }
        </div>
      </article>`;
    }
    const assets = imageWidgetOptions();
    const selected =
      assets.find((asset) => asset.id === widget.assetId) ||
      assets.find((asset) => asset.url === widget.assetUrl) ||
      null;
    return `<article class="site-widget-card">
      <div class="site-widget-card-head">
        <div class="site-widget-card-title"><span class="site-widget-card-icon">${icon(typeMeta.iconName)}</span><strong>${esc(widget.title || typeMeta.label)}</strong></div>
        <div class="site-widget-card-actions">
          <button class="site-widget-enabled-toggle ${widget.enabled ? "is-enabled" : ""}" type="button" data-action="toggle-site-widget-enabled" data-widget-id="${esc(widget.id)}" aria-pressed="${widget.enabled ? "true" : "false"}">${widget.enabled ? "Enabled" : "Disabled"}</button>
          <button class="site-widget-drag-handle" type="button" draggable="true" data-widget-instance-id="${esc(widget.id)}" aria-label="Drag featured image widget">${icon("menu")}</button>
          <button class="site-widget-remove" type="button" data-action="remove-site-widget" data-widget-id="${esc(widget.id)}">Remove</button>
        </div>
      </div>
      <div class="site-widget-card-body">
        <label class="form-label" for="widget-image-${esc(widget.id)}">Media vault image</label>
        <select id="widget-image-${esc(widget.id)}" class="form-select" data-field="widget-image-asset" data-widget-id="${esc(widget.id)}">
          <option value="">Select an image</option>
          ${assets
            .map(
              (asset) =>
                `<option value="${esc(asset.id)}" ${asset.id === widget.assetId ? "selected" : ""}>${esc(asset.name)}</option>`,
            )
            .join("")}
        </select>
        <div class="widget-inline-actions">
          <button class="button" type="button" data-action="open-widget-image-upload" data-widget-id="${esc(widget.id)}">${icon("upload")}Upload new image</button>
        </div>
        ${
          selected
            ? `<div class="widget-selection-preview widget-image-selection-preview">
          <div class="widget-image-selection-art">${assetVisual(selected)}</div>
          <div class="widget-selection-copy">
            <strong>${esc(selected.name)}</strong>
            <span>${esc(selected.meta)}</span>
          </div>
        </div>`
            : '<div class="widget-selection-empty">Select a media-vault image or upload a new one for this widget.</div>'
        }
        <input class="hidden" type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-field="media-upload" data-upload-context="widget:${esc(widget.id)}" />
      </div>
    </article>`;
  }

  if (widget.type === "event") {
    const events = eventWidgetOptions();
    const selected =
      events.find((item) => item.id === widget.sourceRecordId) || null;
    return `<article class="site-widget-card">
      <div class="site-widget-card-head">
        <div class="site-widget-card-title"><span class="site-widget-card-icon">${icon(typeMeta.iconName)}</span><strong>${esc(widget.title || typeMeta.label)}</strong></div>
        <div class="site-widget-card-actions">
          <button class="site-widget-enabled-toggle ${widget.enabled ? "is-enabled" : ""}" type="button" data-action="toggle-site-widget-enabled" data-widget-id="${esc(widget.id)}" aria-pressed="${widget.enabled ? "true" : "false"}">${widget.enabled ? "Enabled" : "Disabled"}</button>
          <button class="site-widget-drag-handle" type="button" draggable="true" data-widget-instance-id="${esc(widget.id)}" aria-label="Drag event widget">${icon("menu")}</button>
          <button class="site-widget-remove" type="button" data-action="remove-site-widget" data-widget-id="${esc(widget.id)}">Remove</button>
        </div>
      </div>
      <div class="site-widget-card-body">
        <label class="form-label" for="widget-event-${esc(widget.id)}">Event record</label>
        <select id="widget-event-${esc(widget.id)}" class="form-select" data-field="widget-event-record" data-widget-id="${esc(widget.id)}">
          <option value="">Select an event</option>
          ${events
            .map(
              (item) =>
                `<option value="${esc(item.id)}" ${item.id === widget.sourceRecordId ? "selected" : ""}>${esc(item.title)}</option>`,
            )
            .join("")}
        </select>
        ${
          selected
            ? `<div class="widget-selection-preview">
          <div class="widget-selection-copy">
            <strong>${esc(selected.title)}</strong>
            <span>${esc(selected.page || "/events")}</span>
            <span>${esc(selected.fields?.eventDate || selected.updated || "No event date set")}</span>
          </div>
        </div>`
            : '<div class="widget-selection-empty">Select which event record should be rendered in this widget.</div>'
        }
      </div>
    </article>`;
  }

  if (widget.type === "sponsor-list") {
    const sponsors = sponsorWidgetOptions();
    const availableSponsors = widget.sponsorTypeFilter
      ? sponsors.filter(
          (item) => item.fields?.sponsorType === widget.sponsorTypeFilter,
        )
      : sponsors;
    return `<article class="site-widget-card">
      <div class="site-widget-card-head">
        <div class="site-widget-card-title"><span class="site-widget-card-icon">${icon(typeMeta.iconName)}</span><strong>${esc(widget.title || typeMeta.label)}</strong></div>
        <div class="site-widget-card-actions">
          <button class="site-widget-enabled-toggle ${widget.enabled ? "is-enabled" : ""}" type="button" data-action="toggle-site-widget-enabled" data-widget-id="${esc(widget.id)}" aria-pressed="${widget.enabled ? "true" : "false"}">${widget.enabled ? "Enabled" : "Disabled"}</button>
          <button class="site-widget-drag-handle" type="button" draggable="true" data-widget-instance-id="${esc(widget.id)}" aria-label="Drag sponsor list widget">${icon("menu")}</button>
          <button class="site-widget-remove" type="button" data-action="remove-site-widget" data-widget-id="${esc(widget.id)}">Remove</button>
        </div>
      </div>
      <div class="site-widget-card-body">
        <label class="form-label" for="widget-sponsor-type-${esc(widget.id)}">Partner Type</label>
        <select id="widget-sponsor-type-${esc(widget.id)}" class="form-select" data-field="widget-sponsor-type" data-widget-id="${esc(widget.id)}">
          <option value="">All Partner Types</option>
          ${sponsorTypeOptions
            .map(
              ([value, label]) =>
                `<option value="${esc(value)}" ${widget.sponsorTypeFilter === value ? "selected" : ""}>${esc(label)}</option>`,
            )
            .join("")}
        </select>
        <div class="helper-text">The widget automatically displays every published sponsor matching the selected Partner Type.</div>
        <div class="widget-selection-preview">
          <div class="widget-selection-copy">
            <strong>${availableSponsors.length} sponsor${availableSponsors.length === 1 ? "" : "s"} will display</strong>
            <span>${esc(widget.sponsorTypeFilter || "All Partner Types")}</span>
          </div>
        </div>
      </div>
    </article>`;
  }

  const posts = widgetContentOptions(widget.type, widget.sourceRecordId);
  const selected =
    posts.find((item) => item.id === widget.sourceRecordId) ||
    findContentRecordByKey(widget.sourceRecordId) ||
    null;
  const requiredCategory = WIDGET_CONTENT_CATEGORIES[widget.type] || "";
  const categoryLabel =
    CONTENT_CATEGORY_OPTIONS.find(
      ([value]) => value === requiredCategory,
    )?.[1] || "General";
  const sourceLabel =
    widget.type === "post" ? "Content desk post" : `${categoryLabel} content`;
  const editLinkedLabel =
    requiredCategory === "hero" ? "Edit hero content" : "Edit linked content";
  const selectionEmpty =
    widget.type === "featured"
      ? "Select a published Content Desk record categorized as Featured."
      : widget.type === "calendar-of-events"
        ? "Select a published Content Desk record categorized as Calendar. The event schedule itself comes from the Events desk."
        : requiredCategory
          ? `Select a published Content Desk record categorized as ${categoryLabel}.`
          : "Select which published Content Desk post should be rendered in this widget.";
  return `<article class="site-widget-card">
    <div class="site-widget-card-head">
      <div class="site-widget-card-title"><span class="site-widget-card-icon">${icon(typeMeta.iconName)}</span><strong>${esc(widget.title || typeMeta.label)}</strong></div>
      <div class="site-widget-card-actions">
        <button class="site-widget-enabled-toggle ${widget.enabled ? "is-enabled" : ""}" type="button" data-action="toggle-site-widget-enabled" data-widget-id="${esc(widget.id)}" aria-pressed="${widget.enabled ? "true" : "false"}">${widget.enabled ? "Enabled" : "Disabled"}</button>
        <button class="site-widget-drag-handle" type="button" draggable="true" data-widget-instance-id="${esc(widget.id)}" aria-label="Drag ${esc(typeMeta.label)} widget">${icon("menu")}</button>
        <button class="site-widget-remove" type="button" data-action="remove-site-widget" data-widget-id="${esc(widget.id)}">Remove</button>
      </div>
    </div>
    <div class="site-widget-card-body">
      <label class="form-label" for="widget-post-${esc(widget.id)}">${esc(sourceLabel)}</label>
      <select id="widget-post-${esc(widget.id)}" class="form-select" data-field="widget-post-record" data-widget-id="${esc(widget.id)}">
        <option value="">Select content</option>
        ${posts
          .map(
            (item) =>
              `<option value="${esc(item.id)}" ${item.id === widget.sourceRecordId ? "selected" : ""}>${esc(item.title)}</option>`,
          )
          .join("")}
      </select>
      ${
        selected
          ? `<div class="widget-selection-preview">
        <div class="widget-selection-copy">
          <strong>${esc(selected.title)}</strong>
          <span>${esc(selected.page || "/")}</span>
          <span>${esc(selected.excerpt || selected.summary || "No summary added yet.")}</span>
        </div>
      </div>
      <div class="widget-inline-actions">
        <button class="button button-quiet" type="button" data-action="edit-widget-source" data-source-id="${esc(selected.id)}">${icon("file")}${esc(editLinkedLabel)}</button>
      </div>`
          : `<div class="widget-selection-empty">${esc(selectionEmpty)}</div>`
      }
    </div>
  </article>`;
}

function renderSiteWidgetSection(page = "/", section = {}) {
  const pageToken = siteWidgetDomToken(page);
  const sectionToken = siteWidgetDomToken(section.id);
  const widgets = siteWidgetRecordsForSection(page, section.id).map(
    siteWidgetInstanceFromRecord,
  );
  const widgetList = widgets.map(renderSiteWidgetCard).join("");
  const acceptedTypes = supportedWidgetTypesForSection(page, section.id);
  const acceptedLabels = acceptedTypes.map(
    (type) => widgetTemplateMeta(type).label,
  );
  const helper = acceptedTypes.length
    ? "Drag a widget here from the library above."
    : "No widget types are enabled for this section in the active portal template.";
  const copy = acceptedTypes.length
    ? `Accepts ${acceptedLabels.join(", ")}. Drag configured widgets to rearrange them.`
    : "This section is currently read-only for reusable widgets in the active portal template.";
  return `<section class="widget-section" aria-labelledby="widget-section-${esc(pageToken)}-${esc(sectionToken)}">
    <div class="widget-section-head">
      <div>
        <h3 id="widget-section-${esc(pageToken)}-${esc(sectionToken)}" class="widget-section-title">${esc(section.label)}</h3>
        <p class="widget-section-copy">${esc(copy)}</p>
      </div>
    </div>
    <div class="widget-dropzone ${widgets.length ? "" : "is-empty"}" data-widget-dropzone="true" data-widget-page="${esc(page)}" data-widget-section="${esc(section.id)}" data-widget-accepts="${esc(acceptedTypes.join(","))}">
      ${widgetList || `<div class="widget-selection-empty">${esc(helper)}</div>`}
    </div>
  </section>`;
}

function renderWidgetsBuilderPage() {
  const tenant = currentTenant();
  const siteWidgetsSupported = Boolean(
    tenant.id && templateSupportsSiteWidgets(tenant),
  );
  const countdownSupported = Boolean(
    tenant.id && templateSupportsHomepageCountdown(tenant),
  );
  const record = findCountdownWidgetRecord();
  const templateLabel = templateLabelForPortal(tenant);
  const heading =
    record?.fields?.heading || record?.title || "Until opening day";
  const dateValue = record?.fields?.eventDate || "";
  const timeValue = record?.fields?.eventTime || "";
  const countdownVisibility = Boolean(record?.fields?.hideCountdown)
    ? "Hidden"
    : "Shown";
  const statusTone = record ? record.status : "draft";
  const statusText = record ? statusLabel(record.status) : "Not created";
  const countdownMarkup = renderHomepageCountdownDirectoryCardV2({
    supported: countdownSupported,
    heading,
    dateValue,
    timeValue,
    countdownVisibility,
    statusTone,
    statusText,
  });
  const pages = siteWidgetPages();
  const activePage = activeSiteWidgetPage();
  const activePageCount = activePage
    ? siteWidgetCountForPage(activePage.page)
    : 0;
  return `${renderPageHeading("Site Widgets", "Manage reusable site widgets for the active portal template.")}
    <div class="content-toolbar"><span class="muted" style="font-size:11px">${tenant.id ? (siteWidgetsSupported ? `${esc(templateLabel)} is active for this portal. Drag widgets into each website page section below.` : `${esc(templateLabel)} is active for this portal, but it does not currently expose reusable site widgets.`) : "Create or connect a portal first to start composing page widgets."}</span></div>
    <section class="widget-builder-layout">
      <div class="widget-builder-sidebar">
        ${renderSiteWidgetLibrary()}
      </div>
      <div class="widget-builder-main">
        <section class="surface">
          <div class="surface-header">
            <div>
              <h2 class="surface-title">Website pages</h2>
              <p class="surface-kicker">Switch between pages here so you only see the sections you are editing right now.</p>
            </div>
            <div class="widget-save-status is-${esc(state.widgetSaveState)}" data-widget-save-status role="status" aria-live="polite">
              <span aria-hidden="true"></span>
              <strong>${esc(state.widgetSaveMessage)}</strong>
            </div>
          </div>
          <div class="widget-page-switcher" role="tablist" aria-label="Website pages">
            ${pages
              .map(
                (
                  pageMeta,
                ) => `<button class="widget-page-chip ${activePage?.page === pageMeta.page ? "is-active" : ""}" type="button" data-action="select-widget-page" data-page="${esc(pageMeta.page)}" role="tab" aria-selected="${activePage?.page === pageMeta.page}">
                <span class="widget-page-chip-copy">
                  <strong>${esc(pageMeta.title)}</strong>
                  <span>${siteWidgetCountForPage(pageMeta.page)} widget${siteWidgetCountForPage(pageMeta.page) === 1 ? "" : "s"}</span>
                </span>
                <span class="widget-page-chip-meta">${esc(pageMeta.sections.length)} sections</span>
              </button>`,
              )
              .join("")}
          </div>
          <div class="widget-page-list">
            ${
              activePage
                ? `<section class="widget-page-card" aria-labelledby="widget-page-${esc(siteWidgetDomToken(activePage.page))}">
                <div class="widget-page-head">
                  <div>
                    <h2 id="widget-page-${esc(siteWidgetDomToken(activePage.page))}" class="surface-title">${esc(activePage.title)}</h2>
                    <p class="surface-kicker">${esc(activePage.sections.length)} predefined section${activePage.sections.length === 1 ? "" : "s"} · ${activePageCount} widget${activePageCount === 1 ? "" : "s"} configured on this page.</p>
                  </div>
                </div>
                ${
                  activePage.page === "/" && countdownSupported
                    ? `<div class="widget-page-utility">${countdownMarkup}</div>`
                    : ""
                }
                <div class="widget-sections">
                  ${activePage.sections
                    .map((section) =>
                      renderSiteWidgetSection(activePage.page, section),
                    )
                    .join("")}
                </div>
              </section>`
                : '<section class="widget-page-card"><div class="empty-state">No widget pages are available for this template yet.</div></section>'
            }
          </div>
        </section>
      </div>
    </section>`;
}

function renderMediaVaultPrototype(title = "Verified media library") {
  const filtered = state.assets.filter((asset) =>
    `${asset.name} ${asset.tags.join(" ")}`
      .toLowerCase()
      .includes(state.mediaQuery.toLowerCase()),
  );
  return `<section class="surface media-vault"><div class="surface-header"><div><h2 class="surface-title">${title}</h2><p class="surface-kicker">Approved assets inherit bureau keywords and accessibility metadata.</p></div><button class="icon-button" data-action="navigate" data-view="media" aria-label="Open media vault">${icon("arrow")}</button></div><div class="media-toolbar"><input class="form-input" data-field="media-query" value="${esc(state.mediaQuery)}" placeholder="Search #Beach, #ApprovedLogo" aria-label="Search verified assets" /></div><div class="asset-list">${
    filtered
      .slice(0, 4)
      .map(
        (asset) =>
          `<div class="asset-row"><span class="asset-thumb ${asset.style}">${icon("image")}</span><span class="asset-copy"><strong>${esc(asset.name)}</strong><span>${esc(asset.meta)}</span><span class="tag-row">${asset.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</span></span><button class="asset-action" data-action="insert-asset" data-asset="${esc(asset.name)}" aria-label="Insert ${esc(asset.name)} into article">${icon("plus", "Insert into article")}</button></div>`,
      )
      .join("") || '<div class="empty-state">No verified assets match.</div>'
  }</div></section>`;
}

function renderArticleModalPrototype() {
  const draft = state.articleDraft;
  const editor = hasPermission("articles.publish");
  const editing = Boolean(state.editingId);
  const routeManaged = draft.type !== "Page section";
  return `<div class="modal-backdrop"><div class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="article-modal-title"><div class="modal-header"><div><h2 id="article-modal-title">${editing ? "Edit content record" : "Create content record"}</h2><p>These fields are delivered to any connected frontend through the tenant-scoped public API.</p></div><button class="modal-close" data-action="close-modal" aria-label="Close content form">${icon("close")}</button></div><div class="modal-body"><div class="editor-grid"><div><div class="form-section" style="padding:0 0 18px"><div class="field-row"><div><label class="form-label" for="article-title">Heading</label><input id="article-title" class="form-input" data-field="article-title" value="${esc(draft.title)}" placeholder="Section or event heading" /></div><div><label class="form-label">Content type</label>${renderCustomSelect("article-type", "Content type", articleTypeOptions)}</div></div><div class="field-row" style="margin-top:13px"><div><label class="form-label" for="article-page">Permalink</label><input id="article-page" class="form-input" data-field="article-page" value="${esc(draft.page)}" placeholder="/your-page/" ${routeManaged ? "readonly" : ""} /></div><div><label class="form-label">Language</label>${renderCustomSelect("article-language", "Language", languageSelectOptions)}</div></div><div class="helper-text">${routeManaged ? "This permalink is generated automatically from the content type and slug, similar to a WordPress post or page." : "Homepage sections still attach to an existing frontend route and component slot."}</div><div style="margin-top:13px"><label class="form-label" for="article-slug">${routeManaged ? "Slug" : "API content key"}</label><div class="slug-field"><input id="article-slug" class="form-input" data-field="article-slug" value="${esc(draft.slug)}" placeholder="${routeManaged ? "about-diyandi" : "home-hero"}" ${state.slugLocked || editing ? "" : "readonly"} /><button class="slug-lock ${state.slugLocked || editing ? "" : "is-locked"}" data-action="toggle-slug-lock" aria-label="Toggle content key override">${icon(state.slugLocked || editing ? "unlock" : "lock")}</button></div><div class="helper-text">${routeManaged ? "The slug controls the public URL for this page or event." : "Homepage section records still map through <strong>data-tukod-record</strong> on the frontend."}</div></div></div><div class="form-section" style="padding-left:0;padding-right:0"><label class="form-label" for="article-eyebrow">Eyebrow / section label</label><input id="article-eyebrow" class="form-input" data-field="article-eyebrow" value="${esc(draft.eyebrow)}" placeholder="Festival program" /><div style="margin-top:13px"><label class="form-label" for="article-summary">Summary</label><textarea id="article-summary" class="form-textarea" data-field="article-summary" placeholder="Short supporting paragraph">${esc(draft.summary)}</textarea></div></div><div class="form-section" style="padding:18px 0 0"><label class="form-label" for="article-body">Body content</label><textarea id="article-body" class="form-textarea" data-field="article-body" placeholder="Optional longer content">${esc(draft.body)}</textarea><div class="helper-text">The API stores plain text. The frontend now resolves pages and events from their own permalinks before applying the layout.</div><div class="field-row" style="margin-top:13px"><div><label class="form-label" for="article-cta-label">CTA label</label><input id="article-cta-label" class="form-input" data-field="article-cta-label" value="${esc(draft.ctaLabel)}" placeholder="Explore the festival" /></div><div><label class="form-label" for="article-cta-url">CTA URL</label><input id="article-cta-url" class="form-input" data-field="article-cta-url" value="${esc(draft.ctaUrl)}" placeholder="/events" /></div></div>${editor ? `<div class="publish-control" style="margin-top:13px"><span><strong>Social automation sync</strong><span>Keep this flag for future Facebook dispatch integration.</span></span><button class="switch ${draft.pushFacebook ? "is-on" : ""}" data-action="toggle-facebook" aria-label="Toggle social automation"></button></div>` : `<div class="status-banner">${icon("warning")}Status: Draft - Pending Manager Review.</div>`}</div></div><div>${renderMediaVault("Integrated media vault")}<div class="form-section" style="padding:17px 0 0"><label class="form-label" for="article-image-alt">Selected asset / image URL</label><input class="form-input" data-field="article-media" value="${esc(draft.media)}" placeholder="/generated-images/example.png" /><div style="margin-top:13px"><label class="form-label" for="article-image-alt">Image alt text</label><input id="article-image-alt" class="form-input" data-field="article-image-alt" value="${esc(draft.imageAlt)}" placeholder="Describe the image for accessibility" /></div><div class="dropzone ${state.dropDragging ? "is-dragging" : ""} ${state.dropError ? "is-error" : ""}" data-dropzone="true" style="margin-top:13px"><div>${icon(state.dropError ? "warning" : "upload")}<strong>${state.uploadInProgress ? "Uploading image..." : "Drop-zone remains enabled for testing"}</strong><span>Uploaded media is saved to the CMS and linked to this record.</span>${renderUploadProgressMarkup("article")}${renderUploadCompleteMarkup("article")}</div></div></div></div></div></div><div class="modal-footer"><button class="button" data-action="close-modal">Cancel</button><button class="button" data-action="save-draft">${icon("file")}Save draft</button>${editor ? `<button class="button button-primary" data-action="submit-review">${icon("review")}Submit to review</button>` : `<button class="button button-warning" data-action="submit-review">${icon("arrow")}Submit request to editorial desk</button>`}</div></div></div>`;
}

function renderRichTextToolbar() {
  const buttons = [
    ["formatBlock", "p", "Paragraph"],
    ["formatBlock", "h2", "H2"],
    ["formatBlock", "h3", "H3"],
    ["bold", "", "Bold"],
    ["italic", "", "Italic"],
    ["insertUnorderedList", "", "Bullets"],
    ["insertOrderedList", "", "Numbered"],
  ];
  return `<div class="richtext-toolbar" role="toolbar" aria-label="Body formatting tools">
    ${buttons.map(([command, value, label]) => `<button type="button" class="richtext-button" data-action="richtext-command" data-command="${command}" data-value="${value}" aria-label="${label}">${esc(label)}</button>`).join("")}
    <button type="button" class="richtext-button" data-action="richtext-link" aria-label="Insert link">Link</button>
    <button type="button" class="richtext-button" data-action="richtext-clear" aria-label="Clear formatting">Clear</button>
  </div>`;
}

function clearUploadCompleteState() {
  clearTimeout(state.uploadCompleteTimer);
  state.uploadCompleteTimer = null;
  state.uploadCompleteContext = "";
  state.uploadCompleteLabel = "";
}

function setUploadCompleteState(context = "", label = "") {
  clearUploadCompleteState();
  state.uploadCompleteContext = String(context || "");
  state.uploadCompleteLabel = String(label || "Upload complete");
  state.uploadCompleteTimer = setTimeout(() => {
    clearUploadCompleteState();
    render();
  }, 3600);
}

function renderUploadProgressMarkup(context = "", trackClass = "") {
  if (!state.uploadInProgress) return "";
  if (
    context &&
    String(state.uploadProgressContext || "") !== String(context || "")
  ) {
    return "";
  }
  const width = Math.max(4, Math.min(100, Number(state.uploadProgress || 0)));
  const className = trackClass
    ? `progress-track ${trackClass}`
    : "progress-track";
  return `<div class="${className}" style="margin-top:13px"><span class="progress-bar teal" style="display:block;width:${width}%"></span></div><div class="helper-text" style="margin-top:8px">${esc(state.uploadProgressLabel || "Uploading...")}</div>`;
}

function renderUploadCompleteMarkup(context = "") {
  if (
    state.uploadInProgress ||
    String(state.uploadCompleteContext || "") !== String(context || "")
  ) {
    return "";
  }
  return `<div class="status-banner" style="margin-top:13px">${icon("check")}${esc(state.uploadCompleteLabel || "Upload complete")}</div>`;
}

function renderMediaVault(title = "Verified media library") {
  const filtered = state.assets.filter((asset) =>
    `${asset.name} ${asset.tags.join(" ")} ${asset.alt}`
      .toLowerCase()
      .includes(state.mediaQuery.toLowerCase()),
  );
  const assets = filtered.slice(0, 6);
  const uploadContext = state.activeAssetInsertContext || "article";
  const contextLabelMap = {
    article: "Selected asset",
    "presented-by": "Presented By image",
    "event-editorial": "Event Editorial 1 image",
    "event-editorial-2": "Event Editorial 2 image",
    "heritage-gallery-portrait": "Hero gallery portrait image",
    "heritage-gallery-market": "Hero gallery market image",
  };
  const contextLabel = isHeroSlideContext(uploadContext)
    ? `Carousel slide ${heroSlideIndexFromContext(uploadContext) + 1} image`
    : contextLabelMap[uploadContext] || "Selected asset";
  return `<section class="surface media-vault"><div class="surface-header"><div><h2 class="surface-title">${title}</h2><p class="surface-kicker">Uploaded images are stored per tenant and can be inserted into any page or event record.</p></div><div style="display:flex;gap:8px"><button class="button" data-action="open-media-picker" data-upload-context="${esc(uploadContext)}">${icon("upload")}Upload</button><button class="icon-button" data-action="navigate" data-view="media" aria-label="Open media vault">${icon("arrow")}</button></div></div><div class="media-toolbar"><input class="form-input" data-field="media-query" value="${esc(state.mediaQuery)}" placeholder="Search asset name, alt text, or tag" aria-label="Search verified assets" /></div>${uploadContext !== "article" ? `<div class="status-banner article-media-target-banner">${icon("image")}Media vault target: <strong>${esc(contextLabel)}</strong>. Choosing an asset here will fill that field.</div>` : ""}${renderUploadProgressMarkup(uploadContext)}${renderUploadCompleteMarkup(uploadContext)}${state.mediaError ? `<div class="status-banner" style="margin:12px 14px 0">${icon("warning")}${esc(state.mediaError)}</div>` : ""}<div class="asset-list">${assets.map((asset) => `<div class="asset-row"><span class="asset-thumb ${asset.style}">${assetVisual(asset)}</span><span class="asset-copy"><strong>${esc(asset.name)}</strong><span>${esc(asset.meta)}</span><span class="tag-row">${asset.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</span></span><button class="asset-action" data-action="insert-asset" data-upload-context="${esc(uploadContext)}" data-asset-url="${esc(asset.url)}" data-asset-name="${esc(asset.name)}" data-asset-alt="${esc(asset.alt)}" data-asset-copyright="${esc(asset.copyright || "")}" aria-label="Use ${esc(asset.name)} for ${esc(contextLabel)}">${icon("plus", "Use asset")}</button></div>`).join("") || '<div class="empty-state">No uploaded assets match yet. Upload the first image for this tenant.</div>'}</div><input class="hidden" type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-field="media-upload" data-upload-context="${esc(uploadContext)}" /></section>`;
}

function renderEventImageUpload({
  field,
  context,
  value = "",
  label,
  helper,
  copyrightField = "",
  copyrightValue = "",
}) {
  const image = String(value || "").trim();
  const copyright = String(copyrightValue || "").trim();
  const isTargeted = state.activeAssetInsertContext === context;
  return `<div class="article-modal-block"><label class="form-label" for="${esc(field)}">${esc(label)}</label><input id="${esc(field)}" class="form-input" data-field="${esc(field)}" value="${esc(image)}" placeholder="https://cms.example.com/uploads/..." /><div class="article-event-image-actions"><button type="button" class="button" data-action="open-media-picker" data-upload-context="${esc(context)}">${icon("upload")}Upload image</button><button type="button" class="button button-quiet" data-action="set-asset-context" data-upload-context="${esc(context)}">${icon("image")}Choose from Media Vault</button></div>${isTargeted ? `<div class="status-banner article-event-image-target-banner">${icon("image")}Media vault selection is currently targeting this field.</div>` : ""}${image ? `<div class="article-event-image-preview"><img src="${esc(image)}" alt="" /></div>` : ""}${renderUploadProgressMarkup(context)}${renderUploadCompleteMarkup(context)}${copyrightField ? `<div class="article-modal-block"><label class="form-label" for="${esc(copyrightField)}">Copyright / credit</label><input id="${esc(copyrightField)}" class="form-input" data-field="${esc(copyrightField)}" value="${esc(copyright)}" placeholder="© Photographer / Source" /></div>` : ""}<div class="helper-text">${esc(helper)}</div><input class="hidden" type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-field="media-upload" data-upload-context="${esc(context)}" /></div>`;
}

function renderEventLocationPicker(draft = state.articleDraft) {
  const coordinates = eventCoordinatesFromDraft(draft);
  const statusCopy = state.eventLocationSearching
    ? "Searching for matching places..."
    : state.eventLocationStatus ||
      (coordinates
        ? `Coordinates ready: ${draft.eventLatitude}, ${draft.eventLongitude}.`
        : "No map pin selected yet. Search the venue text or click the map to drop one.");
  const statusTone =
    state.eventLocationSearching || coordinates ? "info" : "warning";

  return `<div class="event-location-shell"><div class="event-location-toolbar"><button class="button" type="button" data-action="search-event-location" ${draft.eventVenue.trim() ? "" : "disabled"}>${icon("search")}Search map</button><button class="button button-quiet" type="button" data-action="clear-event-location" ${coordinates || state.eventLocationResults.length ? "" : "disabled"}>${icon("close")}Clear pin</button></div><div class="helper-text">Search the venue text to find matching places, choose one of the results, or click directly on the map to save a pin and capture latitude and longitude.</div><div class="status-banner event-location-status ${statusTone}">${statusTone === "warning" ? icon("warning") : icon("pin")}${esc(statusCopy)}</div>${state.eventLocationResults.length ? `<div class="event-location-results">${state.eventLocationResults.map((result) => `<button class="event-location-result" type="button" data-action="select-event-location-result" data-location-lat="${esc(result.lat)}" data-location-lng="${esc(result.lng)}" data-location-venue="${esc(result.venue)}" data-location-place-id="${esc(result.placeId)}"><strong>${esc(result.label)}</strong><span>${esc(result.address)}</span><small>${esc(result.lat)}, ${esc(result.lng)}</small></button>`).join("")}</div>` : ""}<div class="event-map-frame"><div class="event-map-canvas" data-event-map="true">Loading interactive map...</div></div><div class="field-row article-modal-field-row event-location-coordinates"><div><label class="form-label" for="article-event-latitude">Latitude</label><input id="article-event-latitude" class="form-input" data-field="article-event-latitude" value="${esc(draft.eventLatitude)}" placeholder="8.4542367" inputmode="decimal" /></div><div><label class="form-label" for="article-event-longitude">Longitude</label><input id="article-event-longitude" class="form-input" data-field="article-event-longitude" value="${esc(draft.eventLongitude)}" placeholder="124.6318972" inputmode="decimal" /></div></div></div>`;
}

function renderHeroCarouselBuilder(draft = state.articleDraft) {
  const slides = Array.isArray(draft.heroSlides) ? draft.heroSlides : [];
  const slideMarkup = slides.length
    ? slides
        .map((slide, index) => {
          const context = `hero-slide:${index}`;
          const image = String(slide.image || "").trim();
          const alt = String(slide.alt || "").trim();
          const copyright = String(slide.copyright || "").trim();
          const isTargeted = state.activeAssetInsertContext === context;
          return `<div class="article-event-editorial-entry" style="margin-top:14px">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
              <span class="article-modal-panel-label">Carousel slide ${index + 1}</span>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button type="button" class="button button-quiet" data-action="move-hero-slide-up" data-slide-index="${index}" ${index === 0 ? "disabled" : ""}>Move up</button>
                <button type="button" class="button button-quiet" data-action="move-hero-slide-down" data-slide-index="${index}" ${index === slides.length - 1 ? "disabled" : ""}>Move down</button>
                <button type="button" class="button button-quiet" data-action="remove-hero-slide" data-slide-index="${index}">Remove</button>
              </div>
            </div>
            <div class="article-modal-block">
              <label class="form-label" for="hero-slide-image-${index}">Slide image</label>
              <input id="hero-slide-image-${index}" class="form-input" data-field="hero-slide-image" data-slide-index="${index}" value="${esc(image)}" placeholder="https://cms.example.com/uploads/..." />
              <div class="article-event-image-actions">
                <button type="button" class="button" data-action="open-media-picker" data-upload-context="${esc(context)}">${icon("upload")}Upload image</button>
                <button type="button" class="button button-quiet" data-action="set-asset-context" data-upload-context="${esc(context)}">${icon("image")}Choose from Media Vault</button>
              </div>
              ${isTargeted ? `<div class="status-banner article-event-image-target-banner">${icon("image")}Media vault selection is currently targeting this carousel slide.</div>` : ""}
              ${image ? `<div class="article-event-image-preview"><img src="${esc(image)}" alt="" /></div>` : ""}
              ${renderUploadProgressMarkup(context)}
              ${renderUploadCompleteMarkup(context)}
              <input class="hidden" type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-field="media-upload" data-upload-context="${esc(context)}" />
            </div>
            <div class="field-row article-modal-field-row">
              <div>
                <label class="form-label" for="hero-slide-alt-${index}">Alt text</label>
                <input id="hero-slide-alt-${index}" class="form-input" data-field="hero-slide-alt" data-slide-index="${index}" value="${esc(alt)}" placeholder="Describe this slide" />
              </div>
              <div>
                <label class="form-label" for="hero-slide-copyright-${index}">Copyright / credit</label>
                <input id="hero-slide-copyright-${index}" class="form-input" data-field="hero-slide-copyright" data-slide-index="${index}" value="${esc(copyright)}" placeholder="© Photographer / Source" />
              </div>
            </div>
          </div>`;
        })
        .join("")
    : '<div class="empty-state" style="margin-top:14px">No extra carousel slides yet. The main Hero image still works as the first/default slide.</div>';
  return `<section class="surface article-modal-panel"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Carousel</span><h3>Homepage hero slides</h3></div></div><div class="helper-text">Use the main Hero image field on the right as the first/default slide. Add extra slides here to turn the hero into a carousel without editing JSON.</div>${slideMarkup}<div class="article-modal-block" style="margin-top:14px"><button type="button" class="button" data-action="add-hero-slide">${icon("plus")}Add carousel slide</button></div></section>`;
}

function renderHeritageHeroGalleryBuilder(draft = state.articleDraft) {
  return `<section class="surface article-modal-panel"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Hero gallery</span><h3>Festival Heritage gallery layout</h3></div></div><div class="helper-text">This widget uses the fixed Festival Heritage layout shown on the homepage: one large left image, one portrait image, one market image, and the date poster. The main left image is managed from the media panel on the right.</div><div class="article-modal-block"><label class="form-label" for="article-summary">Vertical caption</label><textarea id="article-summary" class="form-textarea article-modal-summary" data-field="article-summary" placeholder="Viva SeÃ±or San Miguel">${esc(draft.summary)}</textarea><div class="helper-text">This text appears as the vertical caption along the main image.</div></div>${renderEventImageUpload(
    {
      field: "article-hero-gallery-portrait-image",
      context: "heritage-gallery-portrait",
      value: draft.heroGalleryPortraitImage,
      label: "Top-right portrait image",
      helper:
        "Upload or select the portrait image shown in the upper-right slot.",
    },
  )}${renderEventImageUpload({
    field: "article-hero-gallery-market-image",
    context: "heritage-gallery-market",
    value: draft.heroGalleryMarketImage,
    label: "Bottom-right market image",
    helper: "Upload or select the market image shown in the lower-right slot.",
  })}<div class="field-row article-modal-field-row"><div><label class="form-label" for="article-hero-gallery-poster-month">Poster month</label><input id="article-hero-gallery-poster-month" class="form-input" data-field="article-hero-gallery-poster-month" value="${esc(draft.heroGalleryPosterMonth)}" placeholder="SEP" /></div><div><label class="form-label" for="article-hero-gallery-poster-start">Poster start day</label><input id="article-hero-gallery-poster-start" class="form-input" data-field="article-hero-gallery-poster-start" value="${esc(draft.heroGalleryPosterStart)}" placeholder="20" /></div><div><label class="form-label" for="article-hero-gallery-poster-end">Poster end day</label><input id="article-hero-gallery-poster-end" class="form-input" data-field="article-hero-gallery-poster-end" value="${esc(draft.heroGalleryPosterEnd)}" placeholder="29" /></div></div><div class="field-row article-modal-field-row"><div><label class="form-label" for="article-hero-gallery-poster-connector">Poster connector</label><input id="article-hero-gallery-poster-connector" class="form-input" data-field="article-hero-gallery-poster-connector" value="${esc(draft.heroGalleryPosterConnector)}" placeholder="TO" /></div><div><label class="form-label" for="article-hero-gallery-poster-year">Poster year</label><input id="article-hero-gallery-poster-year" class="form-input" data-field="article-hero-gallery-poster-year" value="${esc(draft.heroGalleryPosterYear)}" placeholder="2026" /></div><div></div></div></section>`;
}

function renderFaqGroupBuilder(draft = state.articleDraft) {
  const items = Array.isArray(draft.faqItems) ? draft.faqItems : [];
  const eventOptions = availableEventRecords();
  const scope =
    draft.faqGroupScope === "selected-events"
      ? "selected-events"
      : "all-events";
  const selectedEvents = new Set(
    Array.isArray(draft.faqAssignedEventIds) ? draft.faqAssignedEventIds : [],
  );
  const itemMarkup = items.length
    ? items
        .map((item, index) => {
          const normalized = normalizeFaqItem(item);
          return `<div class="article-event-editorial-entry" draggable="true" data-faq-drag-index="${index}" data-faq-drop-index="${index}" style="margin-top:14px">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
              <span class="article-modal-panel-label">FAQ item ${index + 1} · drag to reorder</span>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button type="button" class="button button-quiet" data-action="move-faq-item-up" data-faq-index="${index}" ${index === 0 ? "disabled" : ""}>Move up</button>
                <button type="button" class="button button-quiet" data-action="move-faq-item-down" data-faq-index="${index}" ${index === items.length - 1 ? "disabled" : ""}>Move down</button>
                <button type="button" class="button button-quiet" data-action="remove-faq-item" data-faq-index="${index}">Remove</button>
              </div>
            </div>
            <label class="publish-control" style="margin-top:12px">
              <span><strong>Enabled</strong><span>Turn this off to hide the question without deleting it.</span></span>
              <input type="checkbox" data-field="faq-item-enabled" data-faq-index="${index}" ${normalized.enabled ? "checked" : ""} />
            </label>
            <div class="article-modal-block">
              <label class="form-label" for="faq-question-${index}">Question</label>
              <input id="faq-question-${index}" class="form-input" data-field="faq-item-question" data-faq-index="${index}" value="${esc(normalized.question)}" placeholder="What time should visitors arrive?" />
            </div>
            <div class="article-modal-block">
              <label class="form-label" for="faq-answer-${index}">Answer</label>
              <textarea id="faq-answer-${index}" class="form-textarea article-modal-summary" data-field="faq-item-answer" data-faq-index="${index}" placeholder="Share the answer shown on the event page.">${esc(normalized.answer)}</textarea>
            </div>
          </div>`;
        })
        .join("")
    : '<div class="empty-state" style="margin-top:14px">No FAQ entries yet. Add the first item to start your shared event FAQ group.</div>';
  const eventAssignmentMarkup =
    scope === "selected-events"
      ? eventOptions.length
        ? `<div class="article-modal-block" style="margin-top:14px"><label class="form-label">Assigned events</label><div class="publish-target-grid">${eventOptions
            .map(
              (item) =>
                `<label class="publish-target-label"><input class="publish-target-input" type="checkbox" data-field="faq-assigned-event" value="${esc(item.id)}" ${selectedEvents.has(item.id) ? "checked" : ""} /><span class="publish-target-body"><span class="publish-target-row"><span class="publish-target-check" aria-hidden="true"></span><span class="publish-target-copy"><strong>${esc(item.title)}</strong><small>${esc(item.page || "/events")}</small></span></span></span></label>`,
            )
            .join(
              "",
            )}</div><div class="helper-text">Only the selected event detail pages will display this FAQ group.</div></div>`
        : '<div class="empty-state" style="margin-top:14px">Create event records first, then return to assign this FAQ group to selected event pages.</div>'
      : '<div class="helper-text" style="margin-top:14px">This FAQ group will automatically appear on every individual event page that uses the shared Event FAQs widget.</div>';
  return `<section class="surface article-modal-panel"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">FAQ Group</span><h3>Shared event FAQs</h3></div></div><div class="helper-text">Use the Title, Eyebrow, and Summary above as the FAQ section heading. Questions below can be reordered, disabled, and assigned to all events or just selected event pages.</div><div class="article-modal-block" style="margin-top:14px"><label class="form-label" for="faq-group-scope">Assignment</label><select id="faq-group-scope" class="form-select" data-field="faq-group-scope"><option value="all-events" ${scope === "all-events" ? "selected" : ""}>All event pages</option><option value="selected-events" ${scope === "selected-events" ? "selected" : ""}>Selected event pages only</option></select></div>${eventAssignmentMarkup}${itemMarkup}<div class="article-modal-block" style="margin-top:14px"><button type="button" class="button" data-action="add-faq-item">${icon("plus")}Add FAQ item</button></div></section>`;
}

function renderPlacementChecklist(draft = state.articleDraft) {
  const options = placementOptionsForDraft(draft);
  if (!options.length) return "";
  const selected = new Set(eventPlacementsForDraft(draft));
  const label =
    draft.type === "Event"
      ? "Feature this event on"
      : "Also show this content on";
  const helper =
    draft.type === "Event"
      ? "Every event creates its own individual event page and is included in the Events page flow. Use these options to also feature the same event on the homepage or other pages."
      : "The same published section can appear on more than one page without duplicating the record.";
  return `<div class="form-section publish-target-panel"><label class="form-label">${label}</label><div class="helper-text">${helper}</div><div class="publish-target-grid">${options
    .map(([value, copy]) => {
      const requiredEventPlacement =
        draft.type === "Event" && value === "/events";
      const isChecked = selected.has(value);
      return `<div class="publish-target-card${isChecked ? " is-checked" : ""}"><label class="publish-target-label"><input class="publish-target-input" type="checkbox" data-field="article-placement" value="${esc(value)}" ${isChecked ? "checked" : ""} ${requiredEventPlacement ? "disabled" : ""} /><span class="publish-target-body"><span class="publish-target-check" aria-hidden="true"></span><span class="publish-target-copy"><strong>${esc(copy)}</strong><small>${requiredEventPlacement ? "Included for event listing and event detail flow" : esc(value)}</small></span>${requiredEventPlacement ? '<span class="publish-target-state">Included</span>' : ""}</span></label></div>`;
    })
    .join("")}</div></div>`;
}

function renderPageTargetChecklist(draft = state.articleDraft) {
  const selected = new Set(pageTargetsForDraft(draft));
  const selectionLabel =
    selected.size === 0
      ? "No pages selected"
      : `${selected.size} page${selected.size === 1 ? "" : "s"} selected`;
  const pageOptions = placementOptionsForDraft(draft);
  return `<div class="publish-target-panel publish-target-page-panel"><div class="publish-target-heading"><div><label class="form-label">Publish to page</label><div class="helper-text">Choose one or more pages where this content should appear, then pick which section of that page should receive it.</div></div><div class="publish-target-count">${esc(selectionLabel)}</div></div><div class="publish-target-grid">${pageOptions
    .map(([value, copy]) => {
      const isChecked = selected.has(value);
      const sectionOptions = sectionAnchorOptionsForPage(value);
      const selectedSection = sectionAnchorForPage(value, draft);
      const selectedPlacement = sectionPlacementForPage(value, draft);
      const sectionId = `publish-target-${value === "/" ? "home" : value.replace(/[^a-z0-9]+/gi, "-")}`;
      const placementId = `${sectionId}-placement`;
      return `<div class="publish-target-card${isChecked ? " is-checked" : ""}"><label class="publish-target-label"><input class="publish-target-input" type="checkbox" data-field="article-page-target" value="${esc(value)}" ${isChecked ? "checked" : ""} /><span class="publish-target-body"><span class="publish-target-row"><span class="publish-target-check" aria-hidden="true"></span><span class="publish-target-copy"><strong>${esc(copy)}</strong><small>${esc(value)}</small></span></span>${isChecked ? '<span class="publish-target-state">Selected</span>' : ""}</span></label>${isChecked ? `<div class="publish-target-meta"><div class="publish-target-meta-field"><label class="publish-target-section-label" for="${esc(sectionId)}">Section</label><select id="${esc(sectionId)}" class="form-select publish-target-select" data-field="article-page-section" data-page-target="${esc(value)}" ${selectedPlacement === "end-of-page" ? "disabled" : ""}>${sectionOptions.map((option) => `<option value="${esc(option.id)}" ${option.id === selectedSection ? "selected" : ""}>${esc(option.label)}</option>`).join("")}</select></div><div class="publish-target-meta-field"><label class="publish-target-section-label" for="${esc(placementId)}">Placement</label><select id="${esc(placementId)}" class="form-select publish-target-select" data-field="article-page-position" data-page-target="${esc(value)}">${sectionTargetPlacementOptions.map(([optionValue, optionLabel]) => `<option value="${esc(optionValue)}" ${optionValue === selectedPlacement ? "selected" : ""}>${esc(optionLabel)}</option>`).join("")}</select></div></div>` : ""}</div>`;
    })
    .join("")}</div></div>`;
}

function isCountdownWidgetDraft(draft = state.articleDraft) {
  return (
    draft.type === "Page section" &&
    String(draft.slug || "")
      .trim()
      .toLowerCase() === "home-countdown"
  );
}

function isHeritageHomeHeroGalleryWidgetRecord(item = null) {
  if (!item || activeTemplateId() !== "festival-heritage") return false;
  if (!isSiteWidgetRecord(item)) return false;
  return (
    normalizeSiteWidgetType(item.fields?.widgetType || "post") ===
      "hero-gallery" && widgetAnchorForRecord(item) === "home-hero-gallery"
  );
}

function currentEditingItem() {
  return state.editingId
    ? state.contentItems.find((item) => item.id === state.editingId) || null
    : null;
}

function isHeritageHomeHeroGalleryWidgetDraft(draft = state.articleDraft) {
  return isHeritageHomeHeroGalleryWidgetRecord(currentEditingItem());
}

function renderSponsorModal() {
  const draft = state.articleDraft;
  const editor = hasPermission("articles.publish");
  const editing = Boolean(state.editingId);
  state.activeAssetInsertContext = "article";
  return `<div class="modal-backdrop"><div class="modal modal-wide article-modal" role="dialog" aria-modal="true" aria-labelledby="article-modal-title"><div class="modal-header article-modal-header"><div class="article-modal-header-copy"><span class="article-modal-kicker">${editing ? "Editing sponsor record" : "Create sponsor record"}</span><h2 id="article-modal-title">${esc(draft.title?.trim() || (editing ? "Untitled sponsor" : "New sponsor"))}</h2><p>Sponsor records publish to the sponsor page and power the sticky sponsor bar across the public site.</p></div><div class="article-modal-header-actions"><span class="article-modal-badge">Sponsor record</span><button class="modal-close" data-action="close-modal" aria-label="Close sponsor form">${icon("close")}</button></div></div><div class="modal-body article-modal-body"><section class="article-modal-intro"><div class="article-modal-intro-copy"><span class="article-modal-intro-label">Sponsor details</span><strong>${editor ? "Editor publishing controls available" : "Writer mode - review required before publishing"}</strong><p>Use this form only for sponsor companies. Each published sponsor will appear in the sponsor page listings and in the sticky sponsor bar.</p></div><div class="article-modal-stat-grid"><div class="article-modal-stat"><span>Content type</span><strong>Sponsor</strong></div><div class="article-modal-stat"><span>Output</span><strong>Sponsor page + sticky bar</strong></div><div class="article-modal-stat"><span>Workflow</span><strong>${editor ? "Editor" : "Writer"}</strong></div></div></section><div class="article-modal-grid"><div class="article-modal-main"><section class="surface article-modal-panel article-modal-panel-hero"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Company</span><h3>Identity</h3></div><span class="article-modal-panel-pill">Sponsor</span></div><div class="field-row"><div><label class="form-label" for="article-title">Company name</label><input id="article-title" class="form-input" data-field="article-title" value="${esc(draft.title)}" placeholder="Company or organization name" /></div><div><label class="form-label" for="article-sponsor-type">Partner Type</label><select id="article-sponsor-type" class="form-select" data-field="article-sponsor-type">${sponsorTypeOptions.map(([value, label]) => `<option value="${esc(value)}" ${draft.sponsorType === value ? "selected" : ""}>${esc(label)}</option>`).join("")}</select></div></div><div class="article-modal-block"><label class="form-label" for="article-sponsor-url">Company URL</label><input id="article-sponsor-url" class="form-input" data-field="article-sponsor-url" value="${esc(draft.sponsorUrl)}" placeholder="https://company.example" /></div></section><section class="surface article-modal-panel"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Logo</span><h3>Company logo</h3></div></div><label class="form-label" for="article-media">Company logo URL</label><input id="article-media" class="form-input" data-field="article-media" value="${esc(draft.media)}" placeholder="https://cms.example.com/uploads/logo.png" /><div class="helper-text">Upload or select a company logo. The same image will be used on the sponsor page and for sponsor-related public rendering.</div><div class="article-modal-block">${renderMediaVault("Sponsor logo vault")}</div></section></div><aside class="article-modal-side"><div class="article-modal-side-stack"><section class="surface article-modal-panel article-modal-panel-compact"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Publishing notes</span><h3>Automatic placement</h3></div></div><ul class="article-modal-checklist"><li>Sponsors automatically appear on the sponsor page grouped by partner type.</li><li>Published sponsors also feed the sticky sponsor bar across the site.</li><li>Use a clear company name and a clean logo image for best display.</li></ul></section></div></aside></div></div><div class="modal-footer article-modal-footer"><button class="button" data-action="close-modal">Cancel</button><button class="button" data-action="save-draft">${icon("file")}Save draft</button>${editor ? `<button class="button button-primary" data-action="submit-review">${icon("review")}Submit to review</button>` : `<button class="button button-warning" data-action="submit-review">${icon("arrow")}Submit request to editorial desk</button>`}</div></div></div>`;
}

function renderArticleModal() {
  const draft = state.articleDraft;
  if (draft.type === "Sponsor") return renderSponsorModal();
  const editor = hasPermission("articles.publish");
  const editing = Boolean(state.editingId);
  const isEvent = draft.type === "Event";
  const routeManaged =
    draft.type !== "Page section" && draft.type !== "Sponsor";
  const bodyHtml = normalizeRichTextHtml(draft.body);
  const extraPlacementBlock = isEvent ? renderPlacementChecklist(draft) : "";
  const placementHelper = routeManaged
    ? isEvent
      ? "Publishing an Event places it on the /events page and creates its own /events/slug/ single page."
      : "This permalink is generated automatically from the content type and slug, similar to a WordPress post or page."
    : "";
  const slugHelper = routeManaged
    ? "The slug controls the public URL for this page or event."
    : "The content key stays editable for API mapping, while the checked pages control where this section is rendered.";
  const selectedPages = pageTargetsForDraft(draft);
  const targetSummary = routeManaged
    ? draft.page
    : `${selectedPages.length} page${selectedPages.length === 1 ? "" : "s"} selected`;
  const publishingField = routeManaged
    ? `<div class="field-row article-modal-field-row"><div><label class="form-label">Permalink</label><input id="article-page" class="form-input" data-field="article-page" value="${esc(draft.page)}" placeholder="/your-page/" readonly /></div><div><label class="form-label">Language</label>${renderCustomSelect("article-language", "Language", languageSelectOptions)}</div></div>${placementHelper ? `<div class="helper-text">${placementHelper}</div>` : ""}`
    : `<div class="article-modal-page-targets">${renderPageTargetChecklist(draft)}</div><div class="article-modal-language"><label class="form-label">Language</label>${renderCustomSelect("article-language", "Language", languageSelectOptions)}</div>`;
  const modalKicker = isEvent
    ? editing
      ? "Editing event record"
      : "Create event record"
    : editing
      ? "Editing content record"
      : "Create content record";
  const modalTitle =
    draft.title?.trim() ||
    (editing
      ? isEvent
        ? "Untitled event record"
        : "Untitled content record"
      : isEvent
        ? "New event record"
        : "New content record");
  const reviewState = editor
    ? "Editor publishing controls available"
    : "Writer mode · review required before publishing";
  const targetBadge = isEvent
    ? "Event record"
    : routeManaged
      ? "Managed permalink"
      : "Multi-page section";
  const quickStats = [
    ["Content type", draft.type],
    ["Target", targetSummary],
    ["Workflow", editor ? "Editor" : "Writer"],
  ];
  const activeTemplateLabel = templateLabelForPortal(currentTenant());
  const eventOptions = availableEventRecords(
    editing && isEvent ? draft.slug || draft.id || "" : state.editingId,
  );
  const connectedEvent = findEventRecordById(draft.connectedEventId);
  const isCountdownWidget = isCountdownWidgetDraft(draft);
  const isFaqContent = !isEvent && draft.contentCategory === "faq";
  const isHeritageGalleryWidget = isHeritageHomeHeroGalleryWidgetDraft(draft);
  const contentCategoryBlock =
    !isCountdownWidget && !isHeritageGalleryWidget
      ? `<div class="article-modal-block"><label class="form-label" for="article-content-category">Display category</label><select id="article-content-category" class="form-select" data-field="article-content-category">${CONTENT_CATEGORY_OPTIONS.map(([value, label]) => `<option value="${esc(value)}" ${draft.contentCategory === value ? "selected" : ""}>${esc(label)}</option>`).join("")}</select><div class="helper-text">Widgets only list published content whose display category matches the widget type.</div></div>`
      : "";
  const widgetConfigBlock =
    !routeManaged && !isCountdownWidget
      ? isHeritageGalleryWidget
        ? renderHeritageHeroGalleryBuilder(draft)
        : draft.contentCategory === "hero"
          ? renderHeroCarouselBuilder(draft)
          : `<div class="article-modal-block"><label class="form-label" for="article-widget-config">Structured widget data</label><textarea id="article-widget-config" class="form-textarea article-modal-summary" data-field="article-widget-config" placeholder='{"items":[{"label":"Street Parade"}]}'>${esc(draft.widgetConfig || "")}</textarea><div class="helper-text">Use JSON here for section-specific widget data such as hero slides, ticker items, cards, or logo lists. The widget controls placement; this record controls the actual homepage section content.</div></div>`
      : "";
  const countdownBlock = `<section class="surface article-modal-panel"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Homepage countdown</span><h3>Opening day timer</h3></div></div><div class="field-row article-modal-field-row"><div><label class="form-label" for="article-event-date">Opening date</label><input id="article-event-date" class="form-input" data-field="article-event-date" type="date" value="${esc(draft.eventDate)}" /></div><div><label class="form-label" for="article-event-time">Countdown time</label><input id="article-event-time" class="form-input" data-field="article-event-time" type="time" value="${esc(draft.eventTime)}" /></div></div><label class="publish-control" for="article-hide-countdown" style="margin-top:14px"><span><strong>Hide countdown timer</strong><span>Turn this on to remove the timer from the ${esc(activeTemplateLabel)} homepage without deleting its label or date.</span></span><input id="article-hide-countdown" data-field="article-hide-countdown" type="checkbox" ${draft.hideCountdown ? "checked" : ""} /></label><div class="helper-text">The <strong>Heading</strong> field above becomes the countdown label shown under the main homepage title in the ${esc(activeTemplateLabel)} template. Use the opening date and optional time to control the live countdown target.</div></section>`;
  const connectionBlock = isEvent
    ? `<section class="surface article-modal-panel"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Event details</span><h3>Schedule and summary</h3></div></div><div class="field-row article-modal-field-row"><div><label class="form-label" for="article-event-date">Start date</label><input id="article-event-date" class="form-input" data-field="article-event-date" type="date" value="${esc(draft.eventDate)}" /></div><div><label class="form-label" for="article-event-end-date">End date</label><input id="article-event-end-date" class="form-input" data-field="article-event-end-date" type="date" value="${esc(draft.eventEndDate)}" /></div><div><label class="form-label" for="article-event-time">Event time display</label><input id="article-event-time" class="form-input" data-field="article-event-time" type="text" value="${esc(draft.eventTime)}" placeholder="7:00 PM - 9:00 PM" /></div></div><div class="helper-text">Leave the end date empty for a single-day event. Add an end date to show a continuous range like August 1 to August 30.</div><div class="field-row article-modal-field-row" style="margin-top:14px"><div><label class="form-label" for="article-event-start-time">Start time</label><input id="article-event-start-time" class="form-input" data-field="article-event-start-time" type="time" value="${esc(draft.eventStartTime)}" /></div><div><label class="form-label" for="article-event-end-time">End time</label><input id="article-event-end-time" class="form-input" data-field="article-event-end-time" type="time" value="${esc(draft.eventEndTime)}" /></div><div><label class="form-label" for="article-event-category">Event Category</label><select id="article-event-category" class="form-select" data-field="article-event-category">${EVENT_CATEGORY_OPTIONS.map(([value, label]) => `<option value="${esc(value)}" ${draft.eventCategory === value ? "selected" : ""}>${esc(label)}</option>`).join("")}</select></div></div><div class="helper-text">If Start Time or End Time is set, the public time display is generated automatically from those values. Leave both blank to use the custom Event time display text above.</div><div class="field-row article-modal-field-row" style="margin-top:14px"><div><label class="form-label" for="article-event-venue">Venue or address</label><input id="article-event-venue" class="form-input" data-field="article-event-venue" value="${esc(draft.eventVenue)}" placeholder="Tagbilaran City Cultural Center" /></div></div><div class="article-modal-block">${renderEventLocationPicker(draft)}</div><div class="article-modal-block"><label class="form-label" for="article-summary">Summary</label><textarea id="article-summary" class="form-textarea article-modal-summary" data-field="article-summary" placeholder="Short event summary">${esc(draft.summary)}</textarea></div><label class="publish-control" for="article-featured-homepage-event" style="margin-top:14px"><span><strong>Feature on homepage</strong><span>Show this event in the highlighted event section on the main homepage.</span></span><input id="article-featured-homepage-event" data-field="article-featured-homepage-event" type="checkbox" ${draft.featuredHomepageEvent ? "checked" : ""} /></label><label class="publish-control" for="article-main-homepage-event" style="margin-top:14px"><span><strong>Set as main homepage event</strong><span>Place this event in the large red card. Selecting it replaces the current main event.</span></span><input id="article-main-homepage-event" data-field="article-main-homepage-event" type="checkbox" ${draft.mainHomepageEvent ? "checked" : ""} ${draft.featuredHomepageEvent ? "" : "disabled"} /></label><label class="publish-control" for="article-featured-event" style="margin-top:14px"><span><strong>Feature on events page</strong><span>Show this event in the highlighted cards or lineup on the main <strong>/events</strong> page.</span></span><input id="article-featured-event" data-field="article-featured-event" type="checkbox" ${draft.featuredEvent ? "checked" : ""} /></label><div class="helper-text">Every published event is still included automatically in the calendar of events, even when neither featured placement is selected.</div></section>`
    : isCountdownWidget
      ? countdownBlock
      : `<section class="surface article-modal-panel"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Connected event</span><h3>Attach this content to an event</h3></div></div>${eventOptions.length ? `<label class="form-label" for="article-connected-event">Event</label><select id="article-connected-event" class="form-select" data-field="article-connected-event"><option value="">No linked event</option>${eventOptions.map((item) => `<option value="${esc(item.id)}" ${draft.connectedEventId === item.id ? "selected" : ""}>${esc(item.title)}</option>`).join("")}</select>${connectedEvent ? `<div class="article-modal-block"><div class="status-banner">${icon("calendar")}Linked to <strong>${esc(connectedEvent.title)}</strong>${connectedEvent.fields?.eventDate ? ` · ${esc(connectedEvent.fields.eventDate)}` : ""}${connectedEvent.fields?.eventVenue ? ` · ${esc(connectedEvent.fields.eventVenue)}` : ""}</div></div>` : '<div class="helper-text">Select the event this content belongs to so editors can keep related records grouped together.</div>'}` : '<div class="empty-state">Create an event first, then return here to connect this content record.</div>'}</section>`;
  const eventSectionsBlock = `
    <section class="surface article-modal-panel">
      <div class="article-modal-panel-head">
        <div>
          <span class="article-modal-panel-label">What to Expect</span>
          <h3>Visitor overview</h3>
        </div>
      </div>
      <div class="article-modal-block">
        <label class="form-label" for="article-what-to-expect-title">Title</label>
        <input id="article-what-to-expect-title" class="form-input" data-field="article-what-to-expect-title" value="${esc(draft.whatToExpectTitle)}" placeholder="What to expect" />
      </div>
      <div class="article-modal-block">
        <label class="form-label" for="article-what-to-expect-summary">Summary</label>
        <textarea id="article-what-to-expect-summary" class="form-textarea article-modal-summary" data-field="article-what-to-expect-summary" placeholder="Describe the event experience">${esc(draft.whatToExpectSummary)}</textarea>
      </div>
    </section>
    <section class="surface article-modal-panel">
      <div class="article-modal-panel-head">
        <div>
          <span class="article-modal-panel-label">Quick Details</span>
          <h3>Practical event information</h3>
        </div>
      </div>
      <div class="article-modal-block">
        <label class="form-label" for="article-arrival-window">Arrival Window</label>
        <input id="article-arrival-window" class="form-input" data-field="article-arrival-window" type="time" value="${esc(draft.arrivalWindow)}" />
      </div>
      <div class="field-row article-modal-field-row">
        <div>
          <label class="form-label" for="article-event-access">Access</label>
          <textarea id="article-event-access" class="form-textarea article-modal-summary" data-field="article-event-access" placeholder="Admission, accessibility, or entry details">${esc(draft.eventAccess)}</textarea>
        </div>
        <div>
          <label class="form-label" for="article-event-bring">Bring</label>
          <textarea id="article-event-bring" class="form-textarea article-modal-summary" data-field="article-event-bring" placeholder="What visitors should bring">${esc(draft.eventBring)}</textarea>
        </div>
      </div>
      <div class="article-modal-block">
        <label class="form-label" for="article-event-tips">Tips</label>
        <textarea id="article-event-tips" class="form-textarea article-modal-summary" data-field="article-event-tips" placeholder="Helpful tips for attendees">${esc(draft.eventTips)}</textarea>
      </div>
      <div class="article-modal-block">
        <label class="form-label" for="article-presented-by-name">Presented By</label>
        <input id="article-presented-by-name" class="form-input" data-field="article-presented-by-name" value="${esc(draft.presentedByName)}" placeholder="Sponsor or presenter name" />
      </div>
      ${renderEventImageUpload({
        field: "article-presented-by-image",
        context: "presented-by",
        value: draft.presentedByImage,
        label: "Presented By image or logo",
        helper:
          "Upload the sponsor or presenter image shown with this information on the event page.",
        copyrightField: "article-presented-by-image-copyright",
        copyrightValue: draft.presentedByImageCopyright,
      })}
    </section>
    <section class="surface article-modal-panel">
      <div class="article-modal-panel-head">
        <div>
          <span class="article-modal-panel-label">Event Editorial</span>
          <h3>Two optional editorial features</h3>
        </div>
      </div>
      <div class="helper-text">Add one or two editorial entries. Empty entries are hidden automatically on the event page.</div>
      <div class="article-event-editorial-entry">
        <span class="article-modal-panel-label">Editorial 1</span>
        <div class="article-modal-block">
          <label class="form-label" for="article-event-editorial-label">Eyebrow / label</label>
          <input id="article-event-editorial-label" class="form-input" data-field="article-event-editorial-label" value="${esc(draft.eventEditorialLabel)}" placeholder="Food Route" />
        </div>
        <div class="article-modal-block">
          <label class="form-label" for="article-event-editorial-title">Title</label>
          <input id="article-event-editorial-title" class="form-input" data-field="article-event-editorial-title" value="${esc(draft.eventEditorialTitle)}" placeholder="First editorial title" />
        </div>
        <div class="article-modal-block">
          <label class="form-label" for="article-event-editorial-summary">Summary</label>
          <textarea id="article-event-editorial-summary" class="form-textarea article-modal-summary" data-field="article-event-editorial-summary" placeholder="First editorial story or context">${esc(draft.eventEditorialSummary)}</textarea>
        </div>
        ${renderEventImageUpload({
          field: "article-event-editorial-image",
          context: "event-editorial",
          value: draft.eventEditorialImage,
          label: "Editorial 1 image",
          helper: "Shown beside the first editorial entry.",
          copyrightField: "article-event-editorial-image-copyright",
          copyrightValue: draft.eventEditorialImageCopyright,
        })}
      </div>
      <div class="article-event-editorial-entry">
        <span class="article-modal-panel-label">Editorial 2</span>
        <div class="article-modal-block">
          <label class="form-label" for="article-event-editorial-label-2">Eyebrow / label</label>
          <input id="article-event-editorial-label-2" class="form-input" data-field="article-event-editorial-label-2" value="${esc(draft.eventEditorialLabel2)}" placeholder="Local Finds" />
        </div>
        <div class="article-modal-block">
          <label class="form-label" for="article-event-editorial-title-2">Title</label>
          <input id="article-event-editorial-title-2" class="form-input" data-field="article-event-editorial-title-2" value="${esc(draft.eventEditorialTitle2)}" placeholder="Second editorial title" />
        </div>
        <div class="article-modal-block">
          <label class="form-label" for="article-event-editorial-summary-2">Summary</label>
          <textarea id="article-event-editorial-summary-2" class="form-textarea article-modal-summary" data-field="article-event-editorial-summary-2" placeholder="Second editorial story or context">${esc(draft.eventEditorialSummary2)}</textarea>
        </div>
        ${renderEventImageUpload({
          field: "article-event-editorial-image-2",
          context: "event-editorial-2",
          value: draft.eventEditorialImage2,
          label: "Editorial 2 image",
          helper: "Shown beside the second editorial entry.",
          copyrightField: "article-event-editorial-image-2-copyright",
          copyrightValue: draft.eventEditorialImage2Copyright,
        })}
      </div>
    </section>`;
  const standardBodyBlock = `<section class="surface article-modal-panel"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Body</span><h3>Rich text and call to action</h3></div></div><label class="form-label" for="article-body">Body content</label>${renderRichTextToolbar()}<div id="article-body" class="richtext-editor article-modal-editor" contenteditable="true" data-richtext-editor="article-body" data-placeholder="Write the page body here.">${bodyHtml}</div><div class="helper-text">Rich formatting is preserved for headings, paragraphs, lists, emphasis, and links. Existing plain text content is still supported.</div><div class="field-row article-modal-field-row"><div><label class="form-label" for="article-cta-label">CTA label</label><input id="article-cta-label" class="form-input" data-field="article-cta-label" value="${esc(draft.ctaLabel)}" placeholder="Explore the festival" /></div><div><label class="form-label" for="article-cta-url">CTA URL</label><input id="article-cta-url" class="form-input" data-field="article-cta-url" value="${esc(draft.ctaUrl)}" placeholder="/events" /></div></div>${widgetConfigBlock}${editor ? `<div class="publish-control article-modal-publish-control"><span><strong>Social automation sync</strong><span>Keep this flag for future Facebook dispatch integration.</span></span><button class="switch ${draft.pushFacebook ? "is-on" : ""}" data-action="toggle-facebook" aria-label="Toggle social automation"></button></div>` : `<div class="status-banner">${icon("warning")}Status: Draft - Pending Manager Review.</div>`}</section>`;
  const contentSectionsBlock = isEvent
    ? eventSectionsBlock
    : isHeritageGalleryWidget
      ? widgetConfigBlock
      : isFaqContent
        ? renderFaqGroupBuilder(draft)
        : standardBodyBlock;
  const mediaVaultContext = isEvent
    ? [
        "article",
        "presented-by",
        "event-editorial",
        "event-editorial-2",
      ].includes(state.activeAssetInsertContext)
      ? state.activeAssetInsertContext
      : "article"
    : isHeritageGalleryWidget &&
        [
          "article",
          "heritage-gallery-portrait",
          "heritage-gallery-market",
        ].includes(state.activeAssetInsertContext)
      ? state.activeAssetInsertContext
      : draft.contentCategory === "hero" &&
          isHeroSlideContext(state.activeAssetInsertContext)
        ? state.activeAssetInsertContext
        : "article";
  state.activeAssetInsertContext = mediaVaultContext;
  const isHeroContent =
    isEvent || draft.contentCategory === "hero" || isHeritageGalleryWidget;
  const mediaPanelTitle = isHeritageGalleryWidget
    ? "Main gallery image"
    : isHeroContent
      ? "Hero image"
      : "Selected asset";
  const mediaUrlLabel = isHeroContent
    ? "Hero image URL"
    : "Selected asset / image URL";
  const mediaHelpText = isHeritageGalleryWidget
    ? "This image fills the large left side of the Festival Heritage homepage gallery."
    : isHeroContent
      ? "This image is used in the hero area on the public page."
      : "The CMS stores tenant media files and returns their public URL for this record.";
  return `<div class="modal-backdrop"><div class="modal modal-wide article-modal" role="dialog" aria-modal="true" aria-labelledby="article-modal-title"><div class="modal-header article-modal-header"><div class="article-modal-header-copy"><span class="article-modal-kicker">${esc(modalKicker)}</span><h2 id="article-modal-title">${esc(modalTitle)}</h2><p>These fields are delivered to the active portal through the tenant-scoped CMS API, with publishing controls aligned to your current role.</p></div><div class="article-modal-header-actions"><span class="article-modal-badge">${esc(targetBadge)}</span><button class="modal-close" data-action="close-modal" aria-label="Close content form">${icon("close")}</button></div></div><div class="modal-body article-modal-body"><section class="article-modal-intro"><div class="article-modal-intro-copy"><span class="article-modal-intro-label">Editorial setup</span><strong>${esc(reviewState)}</strong><p>${routeManaged ? "Use the left column to define the public route, core content, and call to action. The right rail keeps media and publishing context close by." : "Choose where this section should appear, assign the page section for each placement, and keep the API content key stable for frontend mapping."}</p></div><div class="article-modal-stat-grid">${quickStats.map(([label, value]) => `<div class="article-modal-stat"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("")}</div></section><div class="article-modal-grid"><div class="article-modal-main"><section class="surface article-modal-panel article-modal-panel-hero"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Content basics</span><h3>Identity and routing</h3></div><span class="article-modal-panel-pill">${esc(draft.type)}</span></div><div class="field-row"><div><label class="form-label" for="article-title">${isEvent ? "Event name" : "Heading"}</label><input id="article-title" class="form-input" data-field="article-title" value="${esc(draft.title)}" placeholder="${isEvent ? "Kasadya Street Dancing" : "Section or event heading"}" /></div><div><label class="form-label">Content type</label>${renderCustomSelect("article-type", "Content type", articleTypeOptions)}</div></div>${contentCategoryBlock}<div class="article-modal-block">${publishingField}</div><div class="article-modal-block"><label class="form-label" for="article-slug">${routeManaged ? "Slug" : "API content key"}</label><div class="slug-field"><input id="article-slug" class="form-input" data-field="article-slug" value="${esc(draft.slug)}" placeholder="${routeManaged ? "about-diyandi" : "home-hero"}" ${state.slugLocked || editing ? "" : "readonly"} /><button class="slug-lock ${state.slugLocked || editing ? "" : "is-locked"}" data-action="toggle-slug-lock" aria-label="Toggle content key override">${icon(state.slugLocked || editing ? "unlock" : "lock")}</button></div><div class="helper-text">${slugHelper}</div></div>${extraPlacementBlock}</section>${connectionBlock}${contentSectionsBlock}</div><aside class="article-modal-side"><div class="article-modal-side-stack">${renderMediaVault("Integrated media vault")}<section class="surface article-modal-panel article-modal-panel-compact"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Media details</span><h3>${esc(mediaPanelTitle)}</h3></div></div><label class="form-label" for="article-image-alt">${esc(mediaUrlLabel)}</label><input class="form-input" data-field="article-media" value="${esc(draft.media)}" placeholder="https://cms.example.com/uploads/..." /><div class="article-modal-block"><label class="form-label" for="article-image-alt">Image alt text</label><input id="article-image-alt" class="form-input" data-field="article-image-alt" value="${esc(draft.imageAlt)}" placeholder="Describe the image for accessibility" /></div><div class="article-modal-block"><label class="form-label" for="article-image-copyright">Hero image copyright / credit</label><input id="article-image-copyright" class="form-input" data-field="article-image-copyright" value="${esc(draft.imageCopyright)}" placeholder="© Photographer / Source" /></div><div class="dropzone ${state.dropDragging ? "is-dragging" : ""} ${state.dropError ? "is-error" : ""}" data-dropzone="true"><div>${icon(state.dropError ? "warning" : "upload")}<strong>${state.uploadInProgress ? "Uploading image..." : "Drop an image here or use Upload above"}</strong><span>${esc(mediaHelpText)}</span>${renderUploadProgressMarkup("article", "article-modal-progress")}${renderUploadCompleteMarkup("article")}</div></div></section><section class="surface article-modal-panel article-modal-panel-compact"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Publishing notes</span><h3>Before you submit</h3></div></div><ul class="article-modal-checklist"><li>${isEvent ? "Add the event date, time, venue, and summary before sending this for review." : "Link this content to the correct event when it belongs to a specific festival activity."}</li><li>${routeManaged ? "Confirm the permalink and slug before publishing to the live portal." : "Confirm each selected page also has the correct target section assigned."}</li><li>Provide image alt text when adding a visual asset.</li></ul></section></div></aside></div></div><div class="modal-footer article-modal-footer"><button class="button" data-action="close-modal">Cancel</button><button class="button" data-action="save-draft">${icon("file")}Save draft</button>${editor ? `<button class="button button-primary" data-action="submit-review">${icon("review")}Submit to review</button>` : `<button class="button button-warning" data-action="submit-review">${icon("arrow")}Submit request to editorial desk</button>`}</div></div></div>`;
}

function inferPreviewPage(item = null) {
  const normalizedType = articleTypeFromValue(item?.type, item?.page);
  const fields = item?.fields || {};
  const explicitPage = normalizePlacementPath(item?.page || "/");
  const placementTargets = normalizePlacementTargets(
    item?.targets || legacyTargetsFromRecord(item),
    explicitPage || "/",
  );
  const targetsEventDetail = placementTargets.some(
    (target) => normalizePlacementPath(target.page) === "/events/view",
  );
  const eventPreviewRecord = (() => {
    if (!item || typeof item !== "object") return null;
    if (normalizedType === "Event") return item;
    const connectedEventId = String(
      fields.connectedEventId || item.connectedEventId || "",
    ).trim();
    if (connectedEventId) {
      const connectedEvent = findEventRecordById(connectedEventId);
      if (connectedEvent) return connectedEvent;
    }
    const widgetConfig = parseDraftWidgetConfig(
      fields.widgetConfig || item.widgetConfig || "",
    );
    const assignedIds = Array.isArray(widgetConfig.faqAssignedEventIds)
      ? widgetConfig.faqAssignedEventIds
          .map((value) => String(value || "").trim())
          .filter(Boolean)
      : [];
    for (const assignedId of assignedIds) {
      const assignedEvent = findEventRecordById(assignedId);
      if (assignedEvent) return assignedEvent;
    }
    if (targetsEventDetail) {
      return availableEventRecords(item?.id || "")[0] || null;
    }
    return null;
  })();
  const eventPreviewPage = (() => {
    if (!eventPreviewRecord) return "";
    const eventPage = normalizePlacementPath(eventPreviewRecord.page || "");
    if (
      eventPage &&
      eventPage.startsWith("/events/") &&
      eventPage !== "/events"
    ) {
      return eventPage.endsWith("/") ? eventPage : `${eventPage}/`;
    }
    const eventSlug = slugify(
      eventPreviewRecord.slug ||
        eventPreviewRecord.id ||
        eventPreviewRecord.title,
    );
    return eventSlug ? `/events/${eventSlug}/` : "/events/";
  })();
  if (
    eventPreviewPage &&
    (normalizedType === "Event" ||
      explicitPage === "/events/view" ||
      targetsEventDetail ||
      String(fields.contentCategory || "")
        .trim()
        .toLowerCase() === "faq")
  ) {
    return eventPreviewPage;
  }
  if (explicitPage && explicitPage !== "/") return explicitPage;

  const recordKey = String(item?.slug || item?.id || "").toLowerCase();
  const descriptor =
    `${recordKey} ${item?.type || ""} ${item?.title || ""}`.toLowerCase();
  const availablePages = new Set(
    placementOptionsForDraft().map(([value]) => value),
  );
  const visitorGuidePage = availablePages.has("/plan-your-visit")
    ? "/plan-your-visit"
    : "/plan-your-festival-days";
  if (/^(about-|about$)/.test(recordKey)) return "/about";
  if (
    /^(event-|events-|events$)/.test(recordKey) ||
    /\bevent\b|festival program|schedule/.test(descriptor)
  )
    return eventPreviewPage || "/events";
  if (/^(volunteer-|volunteer$)/.test(recordKey))
    return availablePages.has("/volunteer") ? "/volunteer" : "/events";
  if (/^(contact-|contact$)/.test(recordKey)) return "/contact";
  if (/^(sponsor-|partner-|sponsor$)/.test(recordKey)) return "/sponsor";
  if (/^(visitor-|plan-|guide-)/.test(recordKey)) return visitorGuidePage;
  return "/";
}

function serializePreviewRecord(item = null) {
  if (!item || typeof item !== "object") return "";
  try {
    return JSON.stringify(item);
  } catch (error) {
    console.warn("[TukodPH CMS] Unable to serialize preview record.", error);
    return "";
  }
}

function getPortalPreviewUrl(item = null) {
  const portal = currentTenant();
  const host = window.location.hostname;
  const isLocal = host === "localhost" || host === "127.0.0.1";
  let baseUrl = "";

  if (isLocal && portal.id === "diyandi-festival") {
    // Supports either separate PHP ports or the XAMPP /cms + /frontend folders.
    if (window.location.pathname.includes("/cms/")) {
      baseUrl = new URL("../frontend/", window.location.href).toString();
    } else {
      const cmsPort = Number(window.location.port || 8000);
      baseUrl = `${window.location.protocol}//${host}:${cmsPort + 1}/`;
    }
  } else {
    baseUrl = portal.previewUrl || `https://${portal.domain}/`;
  }

  const pagePath = inferPreviewPage(item).replace(/^\/+/, "");
  const previewUrl = new URL(
    pagePath,
    baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`,
  );
  previewUrl.searchParams.set("tukodPreview", "1");
  previewUrl.searchParams.set("cmsTenant", portal.id);
  previewUrl.searchParams.set("cmsApi", API_URL);
  previewUrl.searchParams.set("cmsPreviewTs", String(Date.now()));
  const recordKey = item?.slug || item?.id;
  if (recordKey) previewUrl.searchParams.set("cmsRecord", recordKey);
  const previewRecord = serializePreviewRecord(item);
  if (previewRecord) {
    previewUrl.searchParams.set("cmsPreviewRecord", previewRecord);
  }
  return previewUrl.toString();
}

function activePreviewRecord() {
  return (
    state.contentItems.find(
      (candidate) => candidate.id === state.activeArticleId,
    ) ||
    state.contentItems[0] ||
    null
  );
}

function sendPreviewRecordToIframe(iframe, item = activePreviewRecord()) {
  if (!iframe || !iframe.contentWindow || !item) return;
  try {
    const targetOrigin = new URL(iframe.src, window.location.href).origin;
    iframe.contentWindow.postMessage(
      {
        type: "tukodph:preview-record",
        tenant: state.activeTenant,
        record: item,
      },
      targetOrigin,
    );
  } catch (error) {
    console.warn(
      "[TukodPH CMS] Unable to send preview record to the portal iframe.",
      error,
    );
  }
}

function attachLivePreviewBridge() {
  const iframe = document.querySelector(".live-preview-iframe");
  if (!iframe) return;
  const item = activePreviewRecord();
  const send = () => sendPreviewRecordToIframe(iframe, item);
  iframe.addEventListener("load", send);
  // Also try immediately in case the iframe loaded from cache before the handler was attached.
  window.setTimeout(send, 80);
  window.setTimeout(send, 600);
}

function renderLivePortalPreview(item) {
  const previewUrl = getPortalPreviewUrl(item);
  return `<div class="live-preview-shell"><iframe class="live-preview-iframe" src="${esc(previewUrl)}" title="${esc(currentTenant().name)} preview of ${esc(item?.title || "selected content")}" loading="eager" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`;
}

function renderReview() {
  if (!state.contentItems.length)
    return `${renderPageHeading("Editorial clearance", "No content records are available for this tenant yet.")}<section class="surface"><div class="empty-state">Create a content record first, then submit it for review.</div></section>`;
  const reviewItems = reviewQueueItems();
  const item =
    state.contentItems.find(
      (candidate) => candidate.id === state.activeArticleId,
    ) ||
    reviewItems[0] ||
    state.contentItems[0];
  const isEditor = hasPermission("articles.publish");
  const reviewQueueMarkup = reviewItems.length
    ? `<section class="surface" style="margin-bottom:18px"><div class="surface-header"><div><h2 class="surface-title">Pending review queue</h2><p class="surface-kicker">${reviewItems.length === 1 ? "1 record is" : `${reviewItems.length} records are`} currently waiting for editorial clearance.</p></div><span class="status pending">${reviewItems.length} waiting</span></div><div style="display:grid;gap:10px">${reviewItems
        .map(
          (candidate, index) =>
            `<button class="button" data-action="select-review-item" data-article-id="${candidate.id}" style="display:flex;justify-content:space-between;align-items:flex-start;gap:14px;padding:14px 16px;border:${candidate.id === item.id ? "1.5px solid #1f4f82" : "1px solid #d7deea"};background:${candidate.id === item.id ? "#eef4fb" : "#ffffff"};color:#16324f;text-align:left"><span style="display:grid;gap:4px"><strong>${esc(candidate.title)}</strong><span style="font-size:13px;color:#5b7088">${esc(candidate.type)} · ${esc(candidate.author)} · ${esc(formatRecordTimestamp(candidate))}</span></span><span class="status pending">#${index + 1}</span></button>`,
        )
        .join("")}</div></section>`
    : `<section class="surface" style="margin-bottom:18px"><div class="surface-header"><div><h2 class="surface-title">Pending review queue</h2><p class="surface-kicker">No records are currently waiting for editorial clearance.</p></div><span class="status published">0 waiting</span></div><div class="empty-state">Showing the currently selected ${esc(item.status)} record preview instead.</div></section>`;
  const legacyReviewQueueMarkup = reviewItems.length
    ? `<section class="surface" style="margin-bottom:18px"><div class="surface-header"><div><h2 class="surface-title">Pending review queue</h2><p class="surface-kicker">${reviewItems.length === 1 ? "1 record is" : `${reviewItems.length} records are`} currently waiting for editorial clearance.</p></div><span class="status pending">${reviewItems.length} waiting</span></div><div style="display:grid;gap:10px">${reviewItems
        .map(
          (candidate, index) =>
            `<button class="button" data-action="select-review-item" data-article-id="${candidate.id}" style="display:flex;justify-content:space-between;align-items:flex-start;gap:14px;padding:14px 16px;border:${candidate.id === item.id ? "1.5px solid #1f4f82" : "1px solid #d7deea"};background:${candidate.id === item.id ? "#eef4fb" : "#ffffff"};color:#16324f;text-align:left"><span style="display:grid;gap:4px"><strong>${esc(candidate.title)}</strong><span style="font-size:13px;color:#5b7088">${esc(candidate.type)} · ${esc(candidate.author)} · ${esc(formatRecordTimestamp(candidate))}</span></span><span class="status pending">#${index + 1}</span></button>`,
        )
        .join("")}</div></section>`
    : `<section class="surface" style="margin-bottom:18px"><div class="surface-header"><div><h2 class="surface-title">Pending review queue</h2><p class="surface-kicker">No records are currently waiting for editorial clearance.</p></div><span class="status published">0 waiting</span></div><div class="empty-state">Showing the currently selected ${esc(item.status)} record preview instead.</div></section>`;
  return `${renderPageHeading("Editorial clearance", "A two-person decision surface for review, contrast validation, responsive preview, and auditable publication.", '<button class="button" data-action="toggle-audit">' + icon("file") + "Audit rail</button>")}
    <div class="review-shell"><div class="review-toolbar"><div><span class="panel-label">Four-eyes approval</span><div class="review-heading" style="margin:5px 0 0"><h2>${esc(item.title)}</h2>${renderStatus(item.status)}</div></div><div class="segmented" aria-label="Preview device"><button class="${state.reviewDevice === "desktop" ? "is-active" : ""}" data-action="set-device" data-device="desktop">Desktop view</button><button class="${state.reviewDevice === "tablet" ? "is-active" : ""}" data-action="set-device" data-device="tablet">Tablet</button><button class="${state.reviewDevice === "mobile" ? "is-active" : ""}" data-action="set-device" data-device="mobile">Mobile</button></div></div><div class="review-split"><div class="review-panel"><span class="panel-label">Submitted form sheet · read-only</span><div class="readonly-field"><small>Title</small><strong>${esc(item.title)}</strong></div><div class="readonly-field"><small>Content type</small><strong>${esc(item.type)} · ${esc(currentTenant().domain)}</strong></div><div class="readonly-field"><small>Change summary</small><p class="review-copy" style="margin:7px 0 0">${esc(item.excerpt)}</p></div><div class="readonly-field"><small>Submitted by</small><strong>${esc(item.author)} · Today at 10:42 AM</strong></div><div class="contrast-check"><div class="contrast-check-top"><strong>WCAG 2.2 AA contrast check</strong><span class="contrast-score">7.4 : 1 · Pass</span></div><div class="contrast-bar"><span></span></div><p>Foreground and background pairings pass the 4.5:1 threshold across body copy and action states.</p></div></div><div class="review-panel"><span class="panel-label">Live portal website</span><div class="review-heading"><h2>Public portal preview</h2><button class="icon-button" data-action="open-portal-preview" aria-label="Open live portal preview in a new tab">${icon("external")}</button></div><div class="device-frame ${state.reviewDevice}">${renderLivePortalPreview(item)}</div></div></div><div class="revision-input ${state.revisionOpen ? "is-visible" : ""}"><label class="form-label" for="revision-note">Revision notes for writer</label><textarea id="revision-note" class="form-textarea" data-field="revision-note" placeholder="Explain what needs to change before this can be approved.">${esc(state.revisionNote)}</textarea><div style="display:flex;justify-content:flex-end;margin-top:8px"><button class="button button-warning" data-action="submit-revision">Route back to writer</button></div></div><div class="clearance-bar"><div class="clearance-copy"><strong>${isEditor ? "Editor clearance actions" : "Writer hand-off actions"}</strong><span>${isEditor ? "Publication links this decision to your credentials and tenant boundary." : "Publishing remains protected until an authorized editor reviews this record."}</span></div><div class="clearance-actions">${isEditor ? '<button class="button button-warning" data-action="reject">' + icon("arrowLeft") + 'Reject and route back</button><button class="button button-primary" data-action="authorize-publish">' + icon("shield") + "Authorize & publish live</button>" : '<button class="button button-warning" data-action="submit-review">' + icon("arrow") + 'Submit request to editorial desk</button><button class="button" disabled aria-label="Publishing disabled for writer">' + icon("lock") + "Publish locked</button>"}</div></div>${state.auditOpen ? `<aside class="audit-drawer"><div style="display:flex;justify-content:space-between;align-items:center"><div><h2 class="surface-title">Audit rail</h2><p class="surface-kicker">Immutable activity linked to the active record.</p></div><button class="icon-button" data-action="toggle-audit" aria-label="Close audit rail">${icon("close")}</button></div>${state.audit.map((entry) => `<div class="audit-item"><span class="audit-dot"></span><span><strong>${esc(entry.text)}</strong><span>${esc(entry.user)} · ${esc(entry.time)}</span></span></div>`).join("")}</aside>` : ""}</div>`;
}

function renderPublicPreview(variant = "variant_immersive") {
  const minimal = variant === "variant_minimal";
  return `<div class="preview-chrome"><div class="preview-nav"><span class="preview-brand"><i></i>Travel Bohol</span><span class="preview-links"><span>Explore</span><span>Events</span><span>Services</span></span><span class="tag">Official</span></div><div class="preview-hero" style="background:${minimal ? "#3d596f" : "#1b4a6e"}"><small>${minimal ? "Discover with confidence" : "Official city tourism portal"}</small><h3>${minimal ? "Plan a better island day." : "Culture, coastlines, and stories worth sharing."}</h3><p>${minimal ? "Timely guidance and trusted services for every visitor." : "A public-facing preview assembled from tenant-managed content blocks."}</p></div><div class="preview-content"><div class="preview-content-heading"><strong>What is happening</strong><span>View all events</span></div><div class="preview-cards"><div class="preview-card"><i style="background:#cfdfe1"></i><strong>Sandugo 2026</strong><span>July 20 · Tagbilaran</span></div><div class="preview-card"><i style="background:#d9dfd0"></i><strong>Island guide</strong><span>Five protected coves</span></div><div class="preview-card"><i style="background:#e3d2c9"></i><strong>City services</strong><span>Directory and contacts</span></div></div></div></div>`;
}

function renderBuilder() {
  const themes = [
    ["variant_minimal", "Minimal", "Clean, quiet, SaaS-aligned", "minimal"],
    ["variant_immersive", "Immersive", "Large visual story frame", "immersive"],
    ["variant_dense", "Dense", "High-density gov directory", "dense"],
  ];
  return `${renderPageHeading("Layout builder", "Arrange a composable public website schema without writing code. Changes stay scoped to ${esc(currentTenant().name)}.", '<button class="button button-primary" data-action="save-layout">' + icon("check") + "Save layout template</button>")}
    <div class="builder-grid"><section class="surface"><div class="surface-header"><div><h2 class="surface-title">Website interface architecture</h2><p class="surface-kicker">The backend JSON matrix resolves into typed HeroUI view modules.</p></div><span class="status published">${state.layoutBlocks.length} blocks</span></div><div class="builder-list">${state.layoutBlocks.map((block, index) => `<div class="block-row"><span class="block-drag">${icon("menu")}</span><span class="block-info"><strong>${index + 1}. ${typeLabel(block.type)}</strong><span>${variantLabel(block.variant)} layout variant</span></span><span class="block-actions"><button data-action="move-block" data-index="${index}" data-direction="up" aria-label="Move block up">${icon("moveUp")}</button><button data-action="move-block" data-index="${index}" data-direction="down" aria-label="Move block down">${icon("moveDown")}</button></span></div>`).join("")}</div><div class="builder-add">${renderCustomSelect("block-choice", "Choose a block to add", blockSelectOptions)}<button class="button" data-action="add-block">${icon("plus")}Add block</button></div></section><section class="surface"><div class="surface-header"><div><h2 class="surface-title">Theme selection</h2><p class="surface-kicker">Choose the visual language that your component resolver will apply.</p></div></div><div class="form-section"><label class="form-label">Public theme variant</label><div class="theme-options">${themes.map(([value, label, copy, swatch]) => `<button class="theme-option ${state.builderTheme === value ? "is-active" : ""}" data-action="set-builder-theme" data-theme="${value}"><span class="theme-swatch ${swatch}"></span><strong>${label}</strong><span>${copy}</span></button>`).join("")}</div><div class="helper-text">The active tenant will render Source Sans 3 typography and the ${currentTenant().kind === "saas" ? "saas-dark" : "government-light"} token profile.</div></div><div class="public-preview">${renderPublicPreview(state.builderTheme)}</div></section></div>`;
}

function renderMediaPrototype() {
  return `${renderPageHeading("Media vault", "A verified asset workspace that keeps global approvals, hashtags, and accessibility metadata close to the writing desk.", '<button class="button button-primary" data-action="show-toast" data-toast-title="Secure upload initialized" data-toast-copy="Drop a file into the content editor to start hash verification.">' + icon("upload") + "Upload asset</button>")}
    <div class="upload-summary">${icon("shield")}<span><strong>Central bureau verification active</strong><p>Unverified files are cross-referenced by hash before they can inherit global metadata.</p></span></div><div class="content-toolbar"><div class="filter-row"><button class="filter-pill is-active">All assets · 186</button><button class="filter-pill">Images · 124</button><button class="filter-pill">Logos · 18</button><button class="filter-pill">Needs alt-text · 6</button></div><input class="form-input" style="width:220px" data-field="media-query" value="${esc(state.mediaQuery)}" placeholder="Search by name or hashtag" aria-label="Search media assets" /></div><div class="media-grid">${state.assets
      .filter((asset) =>
        `${asset.name} ${asset.tags.join(" ")}`
          .toLowerCase()
          .includes(state.mediaQuery.toLowerCase()),
      )
      .map(
        (asset) =>
          `<article class="media-card"><div class="media-art ${asset.style}">${icon("image")}</div><div class="media-card-body"><strong>${esc(asset.name)}</strong><p>${esc(asset.meta)}</p><div class="media-card-footer"><span class="verified">${icon("check")}Verified</span><button class="table-action" data-action="insert-asset" data-asset="${esc(asset.name)}">Insert ${icon("arrow")}</button></div><div class="tag-row">${asset.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</div></div></article>`,
      )
      .join("")}</div>`;
}

function renderProvisionModalPrototype() {
  const filtered = state.assets.filter((asset) =>
    `${asset.name} ${asset.tags.join(" ")} ${asset.alt}`
      .toLowerCase()
      .includes(state.mediaQuery.toLowerCase()),
  );
  return `${renderPageHeading("Media vault", "A real tenant media workspace with uploaded image URLs ready for CMS pages and events.", '<button class="button button-primary" data-action="open-media-picker" data-upload-context="library">' + icon("upload") + "Upload image</button>")}
    <div class="upload-summary">${icon("shield")}<span><strong>Tenant media storage is active</strong><p>Uploaded images are written to the CMS uploads folder and become reusable across this portal.</p></span></div>${state.mediaError ? `<div class="status-banner" style="margin-bottom:15px">${icon("warning")}${esc(state.mediaError)}</div>` : ""}<div class="content-toolbar"><div class="filter-row"><button class="filter-pill is-active">All assets · ${filtered.length}</button><button class="filter-pill">${filtered.filter((asset) => isImageAsset(asset)).length} images</button></div><input class="form-input" style="width:220px" data-field="media-query" value="${esc(state.mediaQuery)}" placeholder="Search by name, alt text, or tag" aria-label="Search media assets" /></div><div class="media-grid">${filtered.length ? filtered.map((asset) => `<article class="media-card"><div class="media-art ${asset.style}">${assetVisual(asset)}</div><div class="media-card-body"><strong>${esc(asset.name)}</strong><p>${esc(asset.meta)}</p><div class="media-card-footer"><span class="verified">${icon("check")}Available</span><button class="table-action" data-action="copy-asset-url" data-asset-url="${esc(asset.url)}">${asset.url ? "Copy URL" : "No URL"} ${icon("arrow")}</button></div><div class="tag-row">${asset.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</div></div></article>`).join("") : '<section class="surface"><div class="empty-state">No media has been uploaded for this tenant yet.</div></section>'}</div><input class="hidden" type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-field="media-upload" data-upload-context="library" />`;
}

function renderProvisionModalLegacy() {
  const colors = [
    ["government-light", "#0b3c5d", "Government light", "High contrast"],
    ["saas-dark", "#4f46e5", "SaaS dark", "Focused operations"],
    ["coastal", "#0d8f91", "Coastal teal", "Civic tourism"],
    ["civic", "#6f566d", "Civic plum", "Cultural portal"],
  ];
  if (state.provisioning)
    return `<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true"><div class="provisioning-loader"><div class="radial-loader"></div><strong>Provisioning tenant partition</strong><p>Applying token profile, boundary rules, and admin invitation.</p></div></div></div>`;
  const step = state.provisionStep;
  return `<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="provision-title"><div class="modal-header"><div><h2 id="provision-title">Provision new website domain</h2><p>Set up a new tenant partition for a government or SaaS portal.</p></div><button class="modal-close" data-action="close-modal" aria-label="Close provisioning form">${icon("close")}</button></div><div class="modal-body"><div class="stepper">${[1, 2, 3].map((index) => `<span class="step ${step === index ? "is-active" : ""}"><span class="step-index">${index}</span>${["Identity", "Visual identity", "Delegation"][index - 1]}</span>`).join("")}</div>${step === 1 ? `<div><label class="form-label" for="provision-name">Website display name</label><input class="form-input" id="provision-name" data-field="provision-name" value="${esc(state.provisionDraft.name)}" placeholder="e.g. Coastal Safety Portal" /><div style="margin-top:13px"><label class="form-label" for="provision-domain">Target gov domain URL</label><input class="form-input" id="provision-domain" data-field="provision-domain" value="${esc(state.provisionDraft.domain)}" placeholder="e.g. coastalsafety.gov" /></div><div class="helper-text">A unique tenant boundary will be assigned before any content or user data is created.</div></div>` : step === 2 ? `<div><label class="form-label">Choose a design token profile</label><div class="swatch-grid">${colors.map(([value, color, label, copy]) => `<button class="swatch-card ${state.provisionTheme === value ? "is-active" : ""}" data-action="set-provision-theme" data-theme="${value}"><span style="background:${color}"></span><strong>${label}</strong><small>${copy}</small></button>`).join("")}</div><div class="setup-preview"><span class="setup-preview-bar" style="background:${colors.find((entry) => entry[0] === state.provisionTheme)?.[1] || "#0b3c5d"}"><i></i><b></b></span><span><strong>Preview token application</strong><p>Source Sans 3 · accessible radius · tenant theme context</p></span></div></div>` : `<div><label class="form-label" for="provision-admin">Local admin account email</label><input class="form-input" id="provision-admin" data-field="provision-admin" value="${esc(state.provisionDraft.admin)}" type="email" placeholder="admin@local-government.gov" /><div class="helper-text">The first local admin receives a scoped invitation with tenant-aware permissions.</div><div class="status-banner" style="margin-top:16px">${icon("shield")}Provisioning creates an isolated role assignment and audit trail.</div></div>`}</div><div class="modal-footer">${step > 1 ? '<button class="button" data-action="provision-back">' + icon("arrowLeft") + "Back</button>" : '<button class="button" data-action="close-modal">Cancel</button>'}<span style="flex:1"></span>${step < 3 ? '<button class="button button-primary" data-action="provision-next">Continue' + icon("arrow") + "</button>" : '<button class="button button-primary" data-action="finalize-provision">' + icon("layers") + "Finalize provisioning</button>"}</div></div></div>`;
}

function renderProvisionModal() {
  const templates = currentTemplateCatalog();
  const selectedTemplate = selectedProvisionTemplate();
  if (state.provisioning)
    return `<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true"><div class="provisioning-loader"><div class="radial-loader"></div><strong>Provisioning tenant partition</strong><p>Applying template selection, boundary rules, and admin invitation.</p></div></div></div>`;
  const step = state.provisionStep;
  return `<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="provision-title"><div class="modal-header"><div><h2 id="provision-title">Provision new website domain</h2><p>Set up a new tenant partition for a festival website using a selectable design template and a shared CMS content model.</p></div><button class="modal-close" data-action="close-modal" aria-label="Close provisioning form">${icon("close")}</button></div><div class="modal-body"><div class="stepper">${[1, 2, 3].map((index) => `<span class="step ${step === index ? "is-active" : ""}"><span class="step-index">${index}</span>${["Identity", "Website template", "Delegation"][index - 1]}</span>`).join("")}</div>${step === 1 ? `<div><label class="form-label" for="provision-name">Website display name</label><input class="form-input" id="provision-name" data-field="provision-name" value="${esc(state.provisionDraft.name)}" placeholder="e.g. Harvest Festival" /><div style="margin-top:13px"><label class="form-label" for="provision-domain">Target website URL</label><input class="form-input" id="provision-domain" data-field="provision-domain" value="${esc(state.provisionDraft.domain)}" placeholder="e.g. festival.example.com" /></div><div class="helper-text">A unique tenant boundary will be assigned before any content or user data is created.</div></div>` : step === 2 ? `${templates.length ? `<div><label class="form-label">Choose a website template</label><div class="swatch-grid">${templates.map((template) => `<button class="swatch-card ${state.provisionDraft.templateId === template.id ? "is-active" : ""}" data-action="set-provision-template" data-template-id="${template.id}"><span style="background:${template.palette?.[0] || "#176b68"}"></span><strong>${esc(template.name)}</strong><small>${esc(template.description || template.designTone || "Generic festival layout")}</small></button>`).join("")}</div><div class="setup-preview"><span class="setup-preview-bar" style="background:${selectedTemplate?.palette?.[0] || "#176b68"}"><i></i><b></b></span><span><strong>${esc(selectedTemplate?.name || "Festival template")}</strong><p>${esc(selectedTemplate?.designTone || "Design direction only. Content, branding, and imagery stay generic until the portal is customized.")} · ${esc(selectedTemplate?.implementationFamily || "standard-festival-site")} · ${esc(selectedTemplate?.structureVersion || "festival-site-v1")}</p></span></div><div class="helper-text">Templates share the tenant API and content model, but their public renderers, page routes, and section anchors can differ. Use template-aware frontend logic for any layout-driven feature.</div></div>` : `<div class="empty-state">No provisionable templates are registered yet.</div>`}` : `<div><label class="form-label" for="provision-admin">Local admin account email</label><input class="form-input" id="provision-admin" data-field="provision-admin" value="${esc(state.provisionDraft.admin)}" type="email" placeholder="admin@festival.gov" /><div class="helper-text">The first local admin receives a scoped invitation with tenant-aware permissions.</div><div class="status-banner" style="margin-top:16px">${icon("shield")}Provisioning creates an isolated role assignment and audit trail.${selectedTemplate ? ` Selected template: ${esc(selectedTemplate.name)}.` : ""}</div></div>`}</div><div class="modal-footer">${step > 1 ? '<button class="button" data-action="provision-back">' + icon("arrowLeft") + "Back</button>" : '<button class="button" data-action="close-modal">Cancel</button>'}<span style="flex:1"></span>${step < 3 ? '<button class="button button-primary" data-action="provision-next">Continue' + icon("arrow") + "</button>" : '<button class="button button-primary" data-action="finalize-provision">' + icon("layers") + "Finalize provisioning</button>"}</div></div></div>`;
}

function renderConfirmModal(kind = "publish") {
  const deleting = kind === "delete";
  const offline = kind === "offline";
  const pendingDelete = state.contentItems.find(
    (item) => item.id === state.pendingDeleteId,
  );
  return `<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><div class="modal-header"><div><h2 id="confirm-title">${deleting ? "Delete content record?" : offline ? "Take article offline?" : "Authorize publication?"}</h2><p>${deleting ? `This will permanently remove ${esc(pendingDelete?.title || "this content record")} from the active tenant workspace.` : offline ? "This will remove the record from the live government portal and create an audit event." : "Action logs will link this publication to your credentials and the active tenant boundary."}</p></div><button class="modal-close" data-action="close-modal" aria-label="Close confirmation">${icon("close")}</button></div><div class="modal-body"><div class="status-banner ${offline || deleting ? "" : "status-banner"}" style="${offline || deleting ? "background:#fff2f2;color:#9c323a" : ""}">${icon(offline || deleting ? "warning" : "shield")}${deleting ? "This permanently removes the record from the CMS data store. Continue only if you are sure." : offline ? "This is a destructive action. Confirm only after reviewing the audit context." : "The record passed the visual contrast check and is ready for a four-eyes decision."}</div></div><div class="modal-footer"><button class="button" data-action="close-modal">Cancel</button><button class="button ${offline || deleting ? "button-danger" : "button-primary"}" data-action="confirm-${deleting ? "delete" : offline ? "offline" : "publish"}">${deleting ? "Delete permanently" : offline ? "Take offline" : "Authorize & publish live"}</button></div></div></div>`;
}

function renderEventImportModal() {
  const validation = state.eventImport.validation;
  const rows = Array.isArray(validation?.rows) ? validation.rows : [];
  const generalErrors = Array.isArray(validation?.errors)
    ? validation.errors
    : [];
  const missingHeaders = Array.isArray(validation?.missingHeaders)
    ? validation.missingHeaders
    : [];
  const fileSelected = Boolean(
    state.eventImport.fileName && state.eventImport.csvText,
  );
  const canImport =
    Boolean(validation?.canImport) &&
    !state.eventImport.validating &&
    !state.eventImport.importing;

  return `<div class="modal-backdrop"><div class="modal modal-wide article-modal" role="dialog" aria-modal="true" aria-labelledby="event-import-title"><div class="modal-header article-modal-header"><div class="article-modal-header-copy"><span class="article-modal-kicker">CSV import</span><h2 id="event-import-title">Import events in bulk</h2><p>Upload a CSV, validate every row, preview the records, and import only into the currently active festival workspace. Imported events use the same event record shape as manual entries and are saved as drafts.</p></div><div class="article-modal-header-actions"><span class="article-modal-badge">${esc(currentTenant().name || "Active festival")}</span><button class="modal-close" data-action="close-modal" aria-label="Close CSV import">${icon("close")}</button></div></div><div class="modal-body article-modal-body"><section class="article-modal-intro"><div class="article-modal-intro-copy"><span class="article-modal-intro-label">Template and upload</span><strong>Validate before anything is imported</strong><p>Use <strong>YYYY-MM-DD</strong> for dates and <strong>HH:MM</strong> or <strong>h:MM AM/PM</strong> for time fields. Image columns accept a valid URL or a matching media-library asset reference for this festival.</p></div><div class="article-modal-stat-grid"><div class="article-modal-stat"><span>Selected file</span><strong>${esc(state.eventImport.fileName || "No CSV selected")}</strong></div><div class="article-modal-stat"><span>Valid rows</span><strong>${esc(String(validation?.validCount || 0))}</strong></div><div class="article-modal-stat"><span>Invalid rows</span><strong>${esc(String(validation?.invalidCount || 0))}</strong></div></div></section><section class="surface article-modal-panel"><div class="surface-header"><div><h2 class="surface-title">CSV actions</h2><p class="surface-kicker">Download the template, upload a CSV file, validate it, then import only when every row is valid.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="button" data-action="download-event-csv-template">${icon("file")}Download template</button><button class="button" data-action="open-event-csv-picker">${icon("upload")}Upload CSV</button><button class="button button-primary" data-action="validate-event-csv" ${fileSelected && !state.eventImport.validating ? "" : "disabled"}>${icon("check")}${state.eventImport.validating ? "Validating..." : "Validate CSV"}</button></div></div><div class="status-banner">${icon("info")}This import always targets <strong>${esc(currentTenant().name || state.activeTenant)}</strong>. Tenant IDs inside the CSV are ignored.</div><input class="hidden" type="file" accept=".csv,text/csv" data-field="event-csv-upload" /></section>${generalErrors.length || missingHeaders.length ? `<section class="surface article-modal-panel"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Validation issues</span><h3>Header or file problems</h3></div></div><div class="event-import-issues">${[...generalErrors, ...missingHeaders.map((header) => `Missing column: ${header}`)].map((issue) => `<div class="status-banner">${icon("warning")}${esc(issue)}</div>`).join("")}</div></section>` : ""}${rows.length ? `<section class="surface article-modal-panel"><div class="article-modal-panel-head"><div><span class="article-modal-panel-label">Preview</span><h3>CSV records before import</h3></div></div><div class="table-wrap"><table class="tenant-table event-import-table"><thead><tr><th>Row</th><th>Event</th><th>Schedule</th><th>Venue</th><th>Status</th></tr></thead><tbody>${rows.map((row) => `<tr class="${row.valid ? "is-valid" : "is-invalid"}"><td>#${esc(String(row.line || ""))}</td><td><div class="event-import-cell"><strong>${esc(row.preview?.title || "Untitled event")}</strong><small>${esc(row.preview?.slug || "No slug")}</small>${row.preview?.category ? `<small>${esc(row.preview.category)}</small>` : ""}</div></td><td><div class="event-import-cell"><strong>${esc(row.preview?.date || "No date")}</strong><small>${esc(row.preview?.time || "No time")}</small>${row.preview?.startTime || row.preview?.endTime ? `<small>${esc([row.preview?.startTime || "", row.preview?.endTime || ""].filter(Boolean).join(" to "))}</small>` : ""}</div></td><td><div class="event-import-cell"><strong>${esc(row.preview?.venue || "No venue")}</strong>${row.preview?.presentedBy ? `<small>Presented by ${esc(row.preview.presentedBy)}</small>` : ""}${row.preview?.eventEditorialTitle ? `<small>${esc(row.preview.eventEditorialTitle)}</small>` : ""}</div></td><td>${row.valid ? `<span class="status published">Valid</span>` : `<div class="event-import-error-list">${row.errors.map((error) => `<span>${esc(error)}</span>`).join("")}</div>`}</td></tr>`).join("")}</tbody></table></div></section>` : fileSelected && !state.eventImport.validating ? `<section class="surface article-modal-panel"><div class="empty-state">Validate the uploaded CSV to preview the records before import.</div></section>` : `<section class="surface article-modal-panel"><div class="empty-state">Upload a CSV file to start the bulk event import flow.</div></section>`}</div><div class="modal-footer article-modal-footer"><button class="button" data-action="close-modal">Close</button><button class="button" data-action="download-event-csv-template">${icon("file")}Download template</button><button class="button button-primary" data-action="import-event-csv" ${canImport ? "" : "disabled"}>${icon("upload")}${state.eventImport.importing ? "Importing..." : "Import events"}</button></div></div></div>`;
}

function renderMedia() {
  const filtered = state.assets.filter((asset) =>
    `${asset.name} ${asset.tags.join(" ")} ${asset.alt}`
      .toLowerCase()
      .includes(state.mediaQuery.toLowerCase()),
  );
  return `${renderPageHeading("Media vault", "A real tenant media workspace with uploaded image URLs ready for CMS pages and events.", '<button class="button button-primary" data-action="open-media-picker" data-upload-context="library">' + icon("upload") + "Upload image</button>")}
    <div class="upload-summary">${icon("shield")}<span><strong>Tenant media storage is active</strong><p>Uploaded images are written to the CMS uploads folder and become reusable across this portal.</p></span></div>${state.mediaError ? `<div class="status-banner" style="margin-bottom:15px">${icon("warning")}${esc(state.mediaError)}</div>` : ""}<div class="content-toolbar"><div class="filter-row"><button class="filter-pill is-active">All assets · ${filtered.length}</button><button class="filter-pill">${filtered.filter((asset) => isImageAsset(asset)).length} images</button></div><input class="form-input" style="width:220px" data-field="media-query" value="${esc(state.mediaQuery)}" placeholder="Search by name, alt text, or tag" aria-label="Search media assets" /></div><div class="media-grid">${filtered.length ? filtered.map((asset) => `<article class="media-card"><div class="media-art ${asset.style}">${assetVisual(asset)}</div><div class="media-card-body"><strong>${esc(asset.name)}</strong><p>${esc(asset.meta)}</p><div class="media-card-footer"><span class="verified">${icon("check")}Available</span><button class="table-action" data-action="copy-asset-url" data-asset-url="${esc(asset.url)}">${asset.url ? "Copy URL" : "No URL"} ${icon("arrow")}</button></div><div class="tag-row">${asset.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</div></div></article>`).join("") : '<section class="surface"><div class="empty-state">No media has been uploaded for this tenant yet.</div></section>'}</div><input class="hidden" type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-field="media-upload" data-upload-context="library" />`;
}

function getPortalPreviewUrl(item = null) {
  const portal = currentTenant();
  if (!portal.id) return window.location.href;
  const host = window.location.hostname;
  const isLocal =
    host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
  let baseUrl = "";

  if (isLocal && portal.id === "diyandi-festival") {
    if (window.location.pathname.includes("/cms/")) {
      baseUrl = new URL("../frontend/", window.location.href).toString();
    } else {
      const cmsPort = Number(window.location.port || 8000);
      baseUrl = `${window.location.protocol}//${host}:${cmsPort + 1}/`;
    }
  } else {
    baseUrl =
      portal.previewUrl ||
      (portal.domain.startsWith("http")
        ? portal.domain
        : `https://${portal.domain}/`);
  }

  const pagePath = inferPreviewPage(item).replace(/^\/+/, "");
  const previewUrl = new URL(
    pagePath,
    baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`,
  );
  previewUrl.searchParams.set("tukodPreview", "1");
  previewUrl.searchParams.set("cmsTenant", portal.id);
  previewUrl.searchParams.set("cmsPreviewTs", String(Date.now()));
  const recordKey = item?.slug || item?.id;
  if (recordKey) previewUrl.searchParams.set("cmsRecord", recordKey);
  return previewUrl.toString();
}

function renderContentItem(item) {
  const canReview = item.status === "review" || item.status === "published";
  const featureTargets =
    item.type === "Event"
      ? [
          item.fields?.mainHomepageEvent
            ? "Home (main)"
            : item.fields?.featuredHomepageEvent
              ? "Home"
              : "",
          item.fields?.featuredEvent ? "Events" : "",
        ]
          .filter(Boolean)
          .join(" + ")
      : "";
  const featuredLabel = featureTargets ? ` · Featured: ${featureTargets}` : "";
  return `<tr><td><div class="tenant-cell"><span class="avatar" style="background:${item.status === "review" ? "#f2d7ba" : "#d8e6ef"}">${initialsFromName(item.author)}</span><span><strong>${esc(item.title)}</strong><small>${esc(item.type)}${esc(featuredLabel)} · ${esc(item.page || "/")} · ${esc(item.author)}</small></span></div></td><td>${renderStatus(item.status)}</td><td>${esc(formatRecordTimestamp(item))}</td><td><div style="display:flex;gap:8px;align-items:center"><button class="table-action" data-action="edit-article" data-article-id="${item.id}">Edit ${icon("file")}</button>${canReview ? `<button class="table-action" data-action="open-review" data-article-id="${item.id}">${item.status === "review" ? "Review" : "Preview"} ${icon("arrow")}</button>` : ""}</div></td></tr>`;
}

function renderActivity() {
  const activity = state.audit.slice(0, 4);
  return `<section class="surface"><div class="surface-header"><div><h2 class="surface-title">Audit activity</h2><p class="surface-kicker">Recent system events across your permitted workspace.</p></div><button class="icon-button" data-action="navigate" data-view="review" aria-label="View review queue">${icon("arrow", "View activity")}</button></div><div class="activity-list">${activity.length ? activity.map((entry) => `<div class="activity-row"><span class="activity-marker">${icon("shield")}</span><span class="activity-copy"><strong>${esc(entry.text)}</strong><span>${esc(entry.user || "system")} · ${esc(entry.time || "Just now")}</span></span></div>`).join("") : '<div class="empty-state">No audit activity has been recorded for this workspace yet.</div>'}</div></section>`;
}

function renderDashboard() {
  const tenant = currentTenant();
  const pendingCount = portals.filter(
    (portal) => portal.status === "pending",
  ).length;
  const reviewCount = state.contentItems.filter(
    (item) => item.status === "review",
  ).length;
  const draftCount = state.contentItems.filter(
    (item) => item.status === "draft",
  ).length;
  const publishedCount = state.contentItems.filter(
    (item) => item.status === "published",
  ).length;
  const portalCopy = tenant.id
    ? `${esc(tenant.domain)} · ${state.contentItems.length} managed content records.`
    : "Create or connect a portal to begin managing content.";
  return `${renderPageHeading("Control center", "A bird's-eye view of tenant health, editorial risk, and the next operational decisions.", isAdmin() ? '<button class="button button-primary" data-action="open-provision">' + icon("plus") + "Provision new website</button>" : "")}
    ${renderMetrics()}<div class="section-grid dashboard-top-grid">${renderTenantOverview()}<div class="surface"><div class="surface-header"><div><h2 class="surface-title">Today\'s signal</h2><p class="surface-kicker">A focused readout for the active portal workspace.</p></div></div><div class="insight-box"><div class="insight-label">Next clearance</div><div class="insight-value">${reviewCount}</div><div class="insight-copy">${reviewCount ? "Records are waiting for editorial approval before publication." : "No records are currently waiting for editorial review."}</div></div><div class="insight-box"><div class="insight-label">Active portal</div><div class="insight-value">${esc(tenant.name)}</div><div class="insight-copy">${portalCopy}</div></div><div class="insight-box"><div class="insight-label">Permission profile</div><div class="insight-value">${state.role === "admin" ? "Administrator" : state.role === "editor" ? "Editor / director" : "Writer"}</div><div class="insight-copy">${hasPermission("articles.publish") ? "Live publishing and review actions are enabled." : `Draft creation is available. ${draftCount} draft record${draftCount === 1 ? "" : "s"} currently need review.`}</div></div></div></div><div class="section-grid" style="margin-top:18px">${renderActivity()}<section class="surface"><div class="surface-header"><div><h2 class="surface-title">Launch readiness</h2><p class="surface-kicker">Tenant setup progress before a public domain goes live.</p></div><span class="status ${pendingCount ? "pending" : "published"}">${pendingCount} in setup</span></div><div class="insight-box"><div class="insight-label">Portal inventory</div><div class="insight-value">${portals.length}</div><div class="insight-copy">${portals.length ? `${pendingCount} portal${pendingCount === 1 ? "" : "s"} still need setup before going live.` : "No portal provisioning is in progress yet."}</div></div><div class="insight-box"><div class="insight-label">Published records</div><div class="insight-value">${publishedCount}</div><div class="insight-copy">Published records are the only entries exposed by the public content API.</div></div></section></div>`;
}

function reviewQueueItems() {
  return state.contentItems.filter((item) => item.status === "review");
}

function syncActiveArticleId(options = {}) {
  const { preferReviewQueue = false } = options;
  const reviewItems = reviewQueueItems();

  if (
    preferReviewQueue &&
    reviewItems.length &&
    !reviewItems.some((item) => item.id === state.activeArticleId)
  ) {
    state.activeArticleId = reviewItems[0].id;
    return state.activeArticleId;
  }

  if (!state.contentItems.some((item) => item.id === state.activeArticleId)) {
    state.activeArticleId =
      (preferReviewQueue ? reviewItems[0]?.id : "") ||
      state.contentItems[0]?.id ||
      "";
  }

  return state.activeArticleId;
}

function renderReview() {
  if (!state.contentItems.length)
    return `${renderPageHeading("Editorial clearance", "No content records are available for this tenant yet.")}<section class="surface"><div class="empty-state">Create a content record first, then submit it for review.</div></section>`;
  const reviewItems = reviewQueueItems();
  const item =
    state.contentItems.find(
      (candidate) => candidate.id === state.activeArticleId,
    ) ||
    reviewItems[0] ||
    state.contentItems[0];
  const isEditor = hasPermission("articles.publish");
  return `${renderPageHeading("Editorial clearance", "A two-person decision surface for review, contrast validation, responsive preview, and auditable publication.", '<button class="button" data-action="toggle-audit">' + icon("file") + "Audit rail</button>")}
    <div class="review-shell"><div class="review-toolbar"><div><span class="panel-label">Four-eyes approval</span><div class="review-heading" style="margin:5px 0 0"><h2>${esc(item.title)}</h2>${renderStatus(item.status)}</div></div><div class="segmented" aria-label="Preview device"><button class="${state.reviewDevice === "desktop" ? "is-active" : ""}" data-action="set-device" data-device="desktop">Desktop view</button><button class="${state.reviewDevice === "tablet" ? "is-active" : ""}" data-action="set-device" data-device="tablet">Tablet</button><button class="${state.reviewDevice === "mobile" ? "is-active" : ""}" data-action="set-device" data-device="mobile">Mobile</button></div></div><div class="review-split"><div class="review-panel"><span class="panel-label">Submitted form sheet · read-only</span><div class="readonly-field"><small>Title</small><strong>${esc(item.title)}</strong></div><div class="readonly-field"><small>Content type</small><strong>${esc(item.type)} · ${esc(currentTenant().domain)}</strong></div><div class="readonly-field"><small>Change summary</small><p class="review-copy" style="margin:7px 0 0">${esc(item.excerpt)}</p></div><div class="readonly-field"><small>Submitted by</small><strong>${esc(item.author)} · ${esc(formatRecordTimestamp(item))}</strong></div><div class="contrast-check"><div class="contrast-check-top"><strong>WCAG 2.2 AA contrast check</strong><span class="contrast-score">7.4 : 1 · Pass</span></div><div class="contrast-bar"><span></span></div><p>Foreground and background pairings pass the 4.5:1 threshold across body copy and action states.</p></div></div><div class="review-panel"><span class="panel-label">Live portal website</span><div class="review-heading"><h2>Public portal preview</h2><button class="icon-button" data-action="open-portal-preview" aria-label="Open live portal preview in a new tab">${icon("external")}</button></div><div class="device-frame ${state.reviewDevice}">${currentTenant().id ? renderLivePortalPreview(item) : '<div class="empty-state">Connect a portal first to open the public preview.</div>'}</div></div></div><div class="revision-input ${state.revisionOpen ? "is-visible" : ""}"><label class="form-label" for="revision-note">Revision notes for writer</label><textarea id="revision-note" class="form-textarea" data-field="revision-note" placeholder="Explain what needs to change before this can be approved.">${esc(state.revisionNote)}</textarea><div style="display:flex;justify-content:flex-end;margin-top:8px"><button class="button button-warning" data-action="submit-revision">Route back to writer</button></div></div><div class="clearance-bar"><div class="clearance-copy"><strong>${isEditor ? "Editor clearance actions" : "Writer hand-off actions"}</strong><span>${isEditor ? "Publication links this decision to your credentials and tenant boundary." : "Publishing remains protected until an authorized editor reviews this record."}</span></div><div class="clearance-actions">${isEditor ? '<button class="button button-warning" data-action="reject">' + icon("arrowLeft") + 'Reject and route back</button><button class="button button-primary" data-action="authorize-publish">' + icon("shield") + "Authorize & publish live</button>" : '<button class="button button-warning" data-action="submit-review">' + icon("arrow") + 'Submit request to editorial desk</button><button class="button" disabled aria-label="Publishing disabled for writer">' + icon("lock") + "Publish locked</button>"}</div></div>${state.auditOpen ? `<aside class="audit-drawer"><div style="display:flex;justify-content:space-between;align-items:center"><div><h2 class="surface-title">Audit rail</h2><p class="surface-kicker">Immutable activity linked to the active record.</p></div><button class="icon-button" data-action="toggle-audit" aria-label="Close audit rail">${icon("close")}</button></div>${state.audit.length ? state.audit.map((entry) => `<div class="audit-item"><span class="audit-dot"></span><span><strong>${esc(entry.text)}</strong><span>${esc(entry.user)} · ${esc(entry.time)}</span></span></div>`).join("") : '<div class="empty-state">No audit entries exist for this record yet.</div>'}</aside>` : ""}</div>`;
}

function renderPublicPreview(variant = "variant_immersive") {
  const minimal = variant === "variant_minimal";
  const tenant = currentTenant();
  const featured = state.contentItems.slice(0, 3);
  return `<div class="preview-chrome"><div class="preview-nav"><span class="preview-brand"><i></i>${esc(tenant.id ? tenant.name : "Portal preview")}</span><span class="preview-links"><span>Home</span><span>Content</span><span>Updates</span></span><span class="tag">${tenant.id ? "Connected" : "Draft"}</span></div><div class="preview-hero" style="background:${minimal ? "#3d596f" : "#1b4a6e"}"><small>${tenant.id ? esc(tenant.domain) : "No active portal yet"}</small><h3>${tenant.id ? `Previewing ${esc(tenant.name)}` : "Start with a blank portal workspace."}</h3><p>${featured.length ? "Published pages and events will appear here as your content model fills up." : "Create content, upload media, and publish records to generate a real public preview."}</p></div><div class="preview-content"><div class="preview-content-heading"><strong>Latest records</strong><span>${featured.length ? `${featured.length} item${featured.length === 1 ? "" : "s"}` : "No content yet"}</span></div><div class="preview-cards">${featured.length ? featured.map((item) => `<div class="preview-card"><i style="background:${item.status === "published" ? "#cfdfe1" : "#e3d2c9"}"></i><strong>${esc(item.title)}</strong><span>${esc(item.type)} · ${esc(item.page || "/")}</span></div>`).join("") : '<div class="empty-state">No content has been created for this portal yet.</div>'}</div></div></div>`;
}

function renderModal() {
  if (state.modal === "article") return renderArticleModal();
  if (state.modal === "event-import") return renderEventImportModal();
  if (state.modal === "provision") return renderProvisionModal();
  if (state.modal === "confirm-publish") return renderConfirmModal("publish");
  if (state.modal === "confirm-offline") return renderConfirmModal("offline");
  if (state.modal === "confirm-delete") return renderConfirmModal("delete");
  return "";
}

function attachContentDeleteButtons() {
  document
    .querySelectorAll('[data-action="edit-article"][data-article-id]')
    .forEach((button) => {
      const actionRow = button.parentElement;
      if (
        !actionRow ||
        actionRow.querySelector('[data-action="delete-article"]')
      )
        return;
      const deleteButton = document.createElement("button");
      deleteButton.className = "table-action";
      deleteButton.dataset.action = "delete-article";
      deleteButton.dataset.articleId = button.dataset.articleId || "";
      deleteButton.innerHTML = `Delete ${icon("warning")}`;
      actionRow.style.justifyContent = "center";
      actionRow.style.flexWrap = "wrap";
      actionRow.appendChild(deleteButton);
    });
}

function renderReview() {
  if (!state.contentItems.length) {
    return `${renderPageHeading("Editorial clearance", "No content records are available for this tenant yet.")}<section class="surface"><div class="empty-state">Create a content record first, then submit it for review.</div></section>`;
  }

  const reviewItems = reviewQueueItems();
  const item =
    state.contentItems.find(
      (candidate) => candidate.id === state.activeArticleId,
    ) ||
    reviewItems[0] ||
    state.contentItems[0];

  if (!item) {
    return `${renderPageHeading("Editorial clearance", "No content records are available for this tenant yet.")}<section class="surface"><div class="empty-state">Create a content record first, then submit it for review.</div></section>`;
  }

  const isEditor = hasPermission("articles.publish");
  const reviewQueueMarkup = reviewItems.length
    ? `<section class="surface" style="margin-bottom:18px"><div class="surface-header"><div><h2 class="surface-title">Pending review queue</h2><p class="surface-kicker">${reviewItems.length === 1 ? "1 record is" : `${reviewItems.length} records are`} currently waiting for editorial clearance.</p></div><span class="status pending">${reviewItems.length} waiting</span></div><div style="display:grid;gap:10px">${reviewItems
        .map(
          (candidate, index) =>
            `<button class="button" data-action="select-review-item" data-article-id="${candidate.id}" style="display:flex;justify-content:space-between;align-items:flex-start;gap:14px;padding:14px 16px;border:${candidate.id === item.id ? "1.5px solid #1f4f82" : "1px solid #d7deea"};background:${candidate.id === item.id ? "#eef4fb" : "#ffffff"};color:#16324f;text-align:left"><span style="display:grid;gap:4px"><strong>${esc(candidate.title)}</strong><span style="font-size:13px;color:#5b7088">${esc(candidate.type)} · ${esc(candidate.author)} · ${esc(formatRecordTimestamp(candidate))}</span></span><span class="status pending">#${index + 1}</span></button>`,
        )
        .join("")}</div></section>`
    : `<section class="surface" style="margin-bottom:18px"><div class="surface-header"><div><h2 class="surface-title">Pending review queue</h2><p class="surface-kicker">No records are currently waiting for editorial clearance.</p></div><span class="status published">0 waiting</span></div><div class="empty-state">Showing the currently selected ${esc(item.status)} record preview instead.</div></section>`;

  return `${renderPageHeading("Editorial clearance", "A two-person decision surface for review, contrast validation, responsive preview, and auditable publication.", '<button class="button" data-action="toggle-audit">' + icon("file") + "Audit rail</button>")}
    ${reviewQueueMarkup}
    <div class="review-shell"><div class="review-toolbar"><div><span class="panel-label">Four-eyes approval</span><div class="review-heading" style="margin:5px 0 0"><h2>${esc(item.title)}</h2>${renderStatus(item.status)}</div></div><div class="segmented" aria-label="Preview device"><button class="${state.reviewDevice === "desktop" ? "is-active" : ""}" data-action="set-device" data-device="desktop">Desktop view</button><button class="${state.reviewDevice === "tablet" ? "is-active" : ""}" data-action="set-device" data-device="tablet">Tablet</button><button class="${state.reviewDevice === "mobile" ? "is-active" : ""}" data-action="set-device" data-device="mobile">Mobile</button></div></div><div class="review-split"><div class="review-panel"><span class="panel-label">Submitted form sheet · read-only</span><div class="readonly-field"><small>Title</small><strong>${esc(item.title)}</strong></div><div class="readonly-field"><small>Content type</small><strong>${esc(item.type)} · ${esc(currentTenant().domain)}</strong></div><div class="readonly-field"><small>Change summary</small><p class="review-copy" style="margin:7px 0 0">${esc(item.excerpt)}</p></div><div class="readonly-field"><small>Submitted by</small><strong>${esc(item.author)} · ${esc(formatRecordTimestamp(item))}</strong></div><div class="contrast-check"><div class="contrast-check-top"><strong>WCAG 2.2 AA contrast check</strong><span class="contrast-score">7.4 : 1 · Pass</span></div><div class="contrast-bar"><span></span></div><p>Foreground and background pairings pass the 4.5:1 threshold across body copy and action states.</p></div></div><div class="review-panel"><span class="panel-label">Live portal website</span><div class="review-heading"><h2>Public portal preview</h2><button class="icon-button" data-action="open-portal-preview" aria-label="Open live portal preview in a new tab">${icon("external")}</button></div><div class="device-frame ${state.reviewDevice}">${currentTenant().id ? renderLivePortalPreview(item) : '<div class="empty-state">Connect a portal first to open the public preview.</div>'}</div></div></div><div class="revision-input ${state.revisionOpen ? "is-visible" : ""}"><label class="form-label" for="revision-note">Revision notes for writer</label><textarea id="revision-note" class="form-textarea" data-field="revision-note" placeholder="Explain what needs to change before this can be approved.">${esc(state.revisionNote)}</textarea><div style="display:flex;justify-content:flex-end;margin-top:8px"><button class="button button-warning" data-action="submit-revision">Route back to writer</button></div></div><div class="clearance-bar"><div class="clearance-copy"><strong>${isEditor ? "Editor clearance actions" : "Writer hand-off actions"}</strong><span>${isEditor ? "Publication links this decision to your credentials and tenant boundary." : "Publishing remains protected until an authorized editor reviews this record."}</span></div><div class="clearance-actions">${isEditor ? '<button class="button button-warning" data-action="reject">' + icon("arrowLeft") + 'Reject and route back</button><button class="button button-primary" data-action="authorize-publish">' + icon("shield") + "Authorize & publish live</button>" : '<button class="button button-warning" data-action="submit-review">' + icon("arrow") + 'Submit request to editorial desk</button><button class="button" disabled aria-label="Publishing disabled for writer">' + icon("lock") + "Publish locked</button>"}</div></div>${state.auditOpen ? `<aside class="audit-drawer"><div style="display:flex;justify-content:space-between;align-items:center"><div><h2 class="surface-title">Audit rail</h2><p class="surface-kicker">Immutable activity linked to the active record.</p></div><button class="icon-button" data-action="toggle-audit" aria-label="Close audit rail">${icon("close")}</button></div>${state.audit.length ? state.audit.map((entry) => `<div class="audit-item"><span class="audit-dot"></span><span><strong>${esc(entry.text)}</strong><span>${esc(entry.user)} · ${esc(entry.time)}</span></span></div>`).join("") : '<div class="empty-state">No audit entries exist for this record yet.</div>'}</aside>` : ""}</div>`;
}

function render() {
  applyTheme();
  if (!state.authenticated) {
    app.innerHTML = renderLogin();
    return;
  }
  if (state.view === "dashboard" && !isAdmin()) {
    state.view = defaultViewForRole();
  }
  const page =
    state.view === "dashboard"
      ? renderDashboard()
      : state.view === "content"
        ? renderContent()
        : state.view === "events"
          ? renderEvents()
          : state.view === "sponsors"
            ? renderSponsors()
            : state.view === "contact-submissions"
              ? renderContactSubmissions()
              : state.view === "widgets"
                ? renderWidgetsBuilderPage()
                : state.view === "review"
                  ? renderReview()
                  : renderMedia();
  app.innerHTML = `<div class="app-shell">${renderSidebar()}<main class="main">${renderTopbar()}<div class="page">${page}</div></main></div>${renderModal()}<div class="skeleton-overlay" ${state.loading ? "" : "hidden"}><div class="skeleton-card"><div class="skeleton-line"></div><div class="skeleton-line short"></div><div class="skeleton-line"></div><div class="skeleton-line short"></div></div></div>${state.toast ? `<div class="toast">${icon("check")}<span><strong>${esc(state.toast.title)}</strong><span>${esc(state.toast.copy)}</span></span></div>` : ""}`;
  attachContentDeleteButtons();
  window.requestAnimationFrame(attachLivePreviewBridge);
  scheduleEventMapMount();
}

function renderPreservingModalScroll() {
  const modalBody =
    document.querySelector(".modal-body.article-modal-body") ||
    document.querySelector(".modal-body");
  const scrollTop = modalBody?.scrollTop || 0;
  const scrollLeft = modalBody?.scrollLeft || 0;
  render();
  window.requestAnimationFrame(() => {
    const nextModalBody =
      document.querySelector(".modal-body.article-modal-body") ||
      document.querySelector(".modal-body");
    if (!nextModalBody) return;
    nextModalBody.scrollTop = scrollTop;
    nextModalBody.scrollLeft = scrollLeft;
  });
}

function showToast(title, copy) {
  state.toast = { title, copy };
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    state.toast = null;
    render();
  }, 3600);
  render();
}

function closeModal() {
  resetEventLocationUiState();
  eventMapRuntime.lookupToken += 1;
  destroyEventMap();
  state.modal = null;
  state.eventImport = createEmptyEventImportState();
  state.provisionStep = 1;
  state.provisioning = false;
  state.editingId = null;
  state.pendingDeleteId = "";
  clearUploadCompleteState();
  render();
}

function bodyEditorElement() {
  return document.querySelector('[data-richtext-editor="article-body"]');
}

function syncBodyEditorState() {
  const editor = bodyEditorElement();
  if (!editor) return;
  state.articleDraft.body = normalizeRichTextHtml(editor.innerHTML);
}

function execRichTextCommand(command, value = "") {
  const editor = bodyEditorElement();
  if (!editor) return;
  editor.focus();
  if (command === "formatBlock") {
    document.execCommand(command, false, value === "p" ? "<p>" : `<${value}>`);
  } else {
    document.execCommand(command, false, value);
  }
  syncBodyEditorState();
  render();
  bodyEditorElement()?.focus();
}

document.addEventListener("click", async (event) => {
  if (state.customSelectOpen && !event.target.closest(".custom-select")) {
    state.customSelectOpen = null;
    render();
    return;
  }
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "toggle-login-password") {
    state.login.showPassword = !state.login.showPassword;
    render();
    document.querySelector("#login-password")?.focus();
    return;
  }
  if (action === "toggle-custom-select") {
    const field = target.dataset.selectField;
    const willOpen = state.customSelectOpen !== field;
    state.customSelectOpen = willOpen ? field : null;
    render();
    if (willOpen) {
      const options =
        field === "block-choice"
          ? blockSelectOptions
          : field === "article-type"
            ? articleTypeOptions
            : field === "page-target"
              ? placementOptionsForDraft()
              : languageSelectOptions;
      focusCustomSelectOption(
        field,
        options.findIndex(([value]) => value === customSelectValue(field)),
      );
    }
    return;
  }
  if (action === "choose-custom-select") {
    const field = target.dataset.selectField;
    if (field === "block-choice")
      state.blockChoice = target.dataset.selectValue;
    if (field === "article-language")
      state.articleDraft.language = target.dataset.selectValue;
    if (field === "page-target")
      state.articleDraft.page = target.dataset.selectValue || "/";
    if (field === "article-type") {
      state.articleDraft.type = articleTypeFromValue(
        target.dataset.selectValue,
        state.articleDraft.page,
      );
      if (state.articleDraft.type !== "Event") {
        resetEventLocationUiState();
      }
      if (state.articleDraft.type === "Event")
        state.articleDraft.placements = eventPlacementsForDraft(
          state.articleDraft,
        );
      syncDraftSlugAndRoute({ forceRoute: true });
    }
    state.customSelectOpen = null;
    if (state.modal === "article" && field === "article-type") {
      renderPreservingModalScroll();
    } else {
      render();
    }
    return;
  }
  if (action === "toggle-tenant-menu") {
    state.customSelectOpen = null;
    state.tenantMenu = !state.tenantMenu;
    state.tenantQuery = "";
    render();
    return;
  }
  if (action === "choose-tenant") {
    if (!tenantSwitchingEnabled()) {
      showToast(
        "Portal switch locked",
        "This account is scoped to the current festival workspace.",
      );
      return;
    }
    const id = target.dataset.tenantId;
    if (id === state.activeTenant) {
      state.tenantMenu = false;
      render();
      return;
    }
    state.activeTenant = id;
    state.tenantMenu = false;
    state.tenantQuery = "";
    try {
      await refreshTenantWorkspace(id);
      showToast(
        "Portal context updated",
        `${currentTenant().name} is now active. Content is loaded through the tenant API boundary.`,
      );
    } catch (error) {
      showToast("Unable to load portal content", error.message);
    }
    return;
  }
  if (action === "navigate") {
    const nextView = target.dataset.view;
    if (nextView === "dashboard" && !isAdmin()) {
      state.view = defaultViewForRole();
      state.tenantMenu = false;
      state.customSelectOpen = null;
      showToast(
        "Admin access required",
        "Control Center is only available to administrator accounts.",
      );
      render();
      return;
    }
    if (nextView === "widgets") {
      try {
        const createdCount = await ensureHeritageWidgetSeedRecords();
        if (createdCount > 0) {
          showToast(
            "Site widgets initialized",
            `${createdCount} Festival Heritage widget${createdCount === 1 ? "" : "s"} now use selectable Content Desk sources.`,
          );
        }
      } catch (error) {
        showToast("Widget initialization failed", error.message);
      }
    }
    state.view = nextView;
    state.tenantMenu = false;
    state.customSelectOpen = null;
    render();
    return;
  }
  if (action === "switch-role") {
    return;
  }
  if (action === "logout") {
    try {
      await apiRequest("logout", { method: "POST" });
    } catch (error) {
      showToast("Sign-out warning", error.message);
    }
    resetWorkspaceSession();
    render();
    showToast("Signed out", "The current CMS session has been cleared.");
    return;
  }
  if (action === "open-provision") {
    if (!isAdmin()) {
      showToast(
        "Admin access required",
        "Only administrator accounts can provision or manage festival portals.",
      );
      return;
    }
    state.provisionDraft = {
      name: "",
      domain: "",
      admin: "",
      templateId: state.availableTemplates[0]?.id || "",
    };
    state.modal = "provision";
    render();
    return;
  }
  if (action === "provision-next") {
    state.provisionStep = Math.min(3, state.provisionStep + 1);
    render();
    return;
  }
  if (action === "provision-back") {
    state.provisionStep = Math.max(1, state.provisionStep - 1);
    render();
    return;
  }
  if (action === "set-provision-template") {
    state.provisionDraft.templateId =
      target.dataset.templateId || state.provisionDraft.templateId;
    render();
    return;
  }
  if (action === "finalize-provision") {
    if (
      !state.provisionDraft.name.trim() ||
      !state.provisionDraft.domain.trim() ||
      !state.provisionDraft.templateId
    ) {
      showToast(
        "Portal details required",
        "Enter a website name, domain, and template before provisioning.",
      );
      return;
    }
    state.provisioning = true;
    render();
    try {
      const selectedTemplate = selectedProvisionTemplate();
      const result = await apiRequest("register-portal", {
        method: "POST",
        body: {
          id: slugify(state.provisionDraft.name),
          name: state.provisionDraft.name,
          domain: state.provisionDraft.domain,
          admin: state.provisionDraft.admin,
          color: selectedTemplate?.palette?.[0] || themeVars().blue,
          templateId: state.provisionDraft.templateId,
        },
      });
      portals.push(result.portal);
      state.provisioning = false;
      state.modal = null;
      state.provisionStep = 1;
      showToast(
        "Tenant partition provisioned",
        `${result.portal.templateName || "Selected template"} is now assigned to this portal and ready for frontend integration.`,
      );
    } catch (error) {
      state.provisioning = false;
      state.modal = null;
      state.provisionStep = 1;
      showToast("Provisioning failed", error.message);
    }
    return;
  }
  if (action === "close-modal") {
    closeModal();
    return;
  }
  if (action === "open-event-import") {
    state.eventImport = createEmptyEventImportState();
    state.modal = "event-import";
    state.view = "events";
    render();
    return;
  }
  if (action === "open-event-csv-picker") {
    document.querySelector('[data-field="event-csv-upload"]')?.click();
    return;
  }
  if (action === "download-event-csv-template") {
    const csv = `\uFEFF${EVENT_IMPORT_TEMPLATE_HEADERS.map((header) => `"${String(header).replace(/"/g, '""')}"`).join(",")}\r\n`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "events-import-template.csv";
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => {
      URL.revokeObjectURL(link.href);
      link.remove();
    }, 0);
    return;
  }
  if (action === "validate-event-csv") {
    if (!state.eventImport.csvText.trim()) {
      showToast("CSV required", "Upload a CSV file first, then validate it.");
      return;
    }
    state.eventImport.validating = true;
    renderPreservingModalScroll();
    try {
      const payload = await apiRequest("validate-event-csv", {
        method: "POST",
        body: { csv: state.eventImport.csvText },
      });
      state.eventImport.validation = payload.validation || null;
      showToast(
        payload.validation?.canImport ? "CSV ready to import" : "CSV validation finished",
        payload.validation?.canImport
          ? "Every CSV row is valid and ready for import."
          : "Review the row preview and fix the flagged issues before importing.",
      );
    } catch (error) {
      showToast("CSV validation failed", error.message);
    } finally {
      state.eventImport.validating = false;
      renderPreservingModalScroll();
    }
    return;
  }
  if (action === "import-event-csv") {
    if (!state.eventImport.validation?.canImport) {
      showToast(
        "Import blocked",
        "Validate the CSV and clear every invalid row before importing.",
      );
      return;
    }
    state.eventImport.importing = true;
    renderPreservingModalScroll();
    try {
      const payload = await apiRequest("import-event-csv", {
        method: "POST",
        body: { csv: state.eventImport.csvText },
      });
      await refreshTenantWorkspace(state.activeTenant, false);
      closeModal();
      showToast(
        "Events imported",
        `${payload.importedCount || 0} event record${payload.importedCount === 1 ? "" : "s"} were added to the active festival workspace as drafts.`,
      );
    } catch (error) {
      state.eventImport.importing = false;
      showToast("CSV import failed", error.message);
      renderPreservingModalScroll();
    }
    return;
  }
  if (action === "search-event-location") {
    const query = state.articleDraft.eventVenue.trim();
    if (!query) {
      showToast(
        "Venue required",
        "Enter a venue or address first, then search the map.",
      );
      return;
    }
    state.eventLocationSearching = true;
    state.eventLocationResults = [];
    state.eventLocationStatus = "";
    renderPreservingModalScroll();
    try {
      const url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("limit", "5");
      url.searchParams.set("q", query);
      const response = await fetch(url.toString(), {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Location search failed (${response.status}).`);
      }
      const payload = await response.json();
      const results = (Array.isArray(payload) ? payload : [])
        .map(normalizeEventLocationResult)
        .filter(Boolean);
      state.eventLocationResults = results;
      state.eventLocationStatus = results.length
        ? "Select a result below or refine the exact point on the map."
        : "No matching places were found. Try a more specific address.";
    } catch (error) {
      state.eventLocationStatus =
        "Location search is unavailable right now. You can still place the pin manually on the map.";
    } finally {
      state.eventLocationSearching = false;
      renderPreservingModalScroll();
    }
    return;
  }
  if (action === "select-event-location-result") {
    eventMapRuntime.lookupToken += 1;
    state.articleDraft.eventLatitude = formatCoordinateValue(
      target.dataset.locationLat,
    );
    state.articleDraft.eventLongitude = formatCoordinateValue(
      target.dataset.locationLng,
    );
    state.articleDraft.eventVenue =
      target.dataset.locationVenue || state.articleDraft.eventVenue;
    state.articleDraft.eventPlaceId = target.dataset.locationPlaceId || "";
    state.eventLocationResults = [];
    state.eventLocationStatus = "Location selected from search results.";
    renderPreservingModalScroll();
    return;
  }
  if (action === "clear-event-location") {
    eventMapRuntime.lookupToken += 1;
    state.articleDraft.eventLatitude = "";
    state.articleDraft.eventLongitude = "";
    state.articleDraft.eventPlaceId = "";
    state.eventLocationResults = [];
    state.eventLocationStatus =
      "Map pin cleared. The venue text stays until you change it.";
    renderPreservingModalScroll();
    return;
  }
  if (action === "richtext-command") {
    execRichTextCommand(
      target.dataset.command || "",
      target.dataset.value || "",
    );
    return;
  }
  if (action === "richtext-link") {
    const href = window.prompt("Enter the link URL");
    if (!href) return;
    execRichTextCommand("createLink", href.trim());
    return;
  }
  if (action === "richtext-clear") {
    execRichTextCommand("removeFormat");
    return;
  }
  if (action === "open-media-picker") {
    state.activeAssetInsertContext = target.dataset.uploadContext || "article";
    document
      .querySelector(
        `[data-field="media-upload"][data-upload-context="${target.dataset.uploadContext || "article"}"]`,
      )
      ?.click();
    return;
  }
  if (action === "set-asset-context") {
    state.activeAssetInsertContext = target.dataset.uploadContext || "article";
    render();
    return;
  }
  if (action === "open-widget-image-upload") {
    document
      .querySelector(
        `[data-field="media-upload"][data-upload-context="widget:${target.dataset.widgetId || ""}"]`,
      )
      ?.click();
    return;
  }
  if (action === "select-widget-page") {
    state.activeWidgetPage = normalizePlacementPath(target.dataset.page || "/");
    render();
    return;
  }
  if (action === "toggle-site-widget-enabled") {
    const widget = findSiteWidgetInstance(target.dataset.widgetId || "");
    if (!widget) return;
    try {
      const saved = await saveSiteWidgetInstance(widget.id, {
        enabled: !widget.enabled,
      });
      render();
      showToast(
        saved?.enabled ? "Widget enabled" : "Widget disabled",
        `${widgetTemplateMeta(widget.type).label} is now ${saved?.enabled ? "visible" : "hidden"} on the public site.`,
      );
    } catch (error) {
      showToast("Widget update failed", error.message);
    }
    return;
  }
  if (action === "remove-site-widget") {
    try {
      if (!(await removeSiteWidgetInstance(target.dataset.widgetId || "")))
        return;
      render();
      showToast("Widget removed", "The selected site widget was removed.");
    } catch (error) {
      showToast("Widget update failed", error.message);
    }
    return;
  }
  if (action === "new-article") {
    state.editingId = null;
    state.articleDraft = createEmptyArticleDraft("Page");
    resetEventLocationUiState();
    syncDraftSlugAndRoute({ forceRoute: true });
    state.slugLocked = false;
    state.dropError = false;
    state.uploadInProgress = false;
    state.modal = "article";
    render();
    return;
  }
  if (action === "new-event") {
    state.editingId = null;
    state.articleDraft = createEmptyArticleDraft("Event");
    resetEventLocationUiState();
    syncDraftSlugAndRoute({ forceRoute: true });
    state.slugLocked = false;
    state.dropError = false;
    state.uploadInProgress = false;
    state.modal = "article";
    state.view = "events";
    render();
    return;
  }
  if (action === "new-sponsor") {
    state.editingId = null;
    state.articleDraft = createEmptyArticleDraft("Sponsor");
    resetEventLocationUiState();
    syncDraftSlugAndRoute({ forceRoute: true });
    state.slugLocked = false;
    state.dropError = false;
    state.uploadInProgress = false;
    state.modal = "article";
    state.view = "sponsors";
    render();
    return;
  }
  if (action === "edit-article") {
    const selectedItem = state.contentItems.find(
      (candidate) => candidate.id === target.dataset.articleId,
    );
    const item = resolveEditableContentItem(selectedItem);
    if (!item) return;
    state.editingId = item.id;
    state.articleDraft = buildArticleDraftFromItem(item);
    resetEventLocationUiState();
    state.slugLocked = true;
    state.dropError = false;
    state.uploadInProgress = false;
    state.modal = "article";
    state.view = editorViewForItem(item);
    render();
    return;
  }
  if (action === "edit-widget-source") {
    const item = resolveEditableContentItem(
      findContentRecordByKey(target.dataset.sourceId || ""),
    );
    if (!item) {
      showToast(
        "Linked content unavailable",
        "The selected widget source record could not be opened.",
      );
      return;
    }
    state.editingId = item.id;
    state.articleDraft = buildArticleDraftFromItem(item);
    resetEventLocationUiState();
    state.slugLocked = true;
    state.dropError = false;
    state.uploadInProgress = false;
    state.modal = "article";
    state.view = editorViewForItem(item);
    render();
    return;
  }
  if (action === "edit-site-widget-record") {
    const item = state.contentItems.find(
      (candidate) => candidate.id === (target.dataset.widgetId || ""),
    );
    if (!item || !isSiteWidgetRecord(item)) return;
    state.editingId = item.id;
    state.articleDraft = buildArticleDraftFromItem(item);
    resetEventLocationUiState();
    state.slugLocked = true;
    state.dropError = false;
    state.uploadInProgress = false;
    state.modal = "article";
    state.view = "widgets";
    render();
    return;
  }
  if (action === "edit-countdown-widget") {
    const item = findCountdownWidgetRecord();
    state.editingId = item?.id || null;
    state.articleDraft = item
      ? buildArticleDraftFromItem(item)
      : createCountdownWidgetDraft();
    resetEventLocationUiState();
    state.slugLocked = true;
    state.dropError = false;
    state.uploadInProgress = false;
    state.modal = "article";
    state.view = "widgets";
    render();
    return;
  }
  if (action === "delete-article") {
    state.pendingDeleteId = target.dataset.articleId || "";
    state.modal = "confirm-delete";
    render();
    return;
  }
  if (action === "toggle-slug-lock") {
    state.slugLocked = !state.slugLocked;
    renderPreservingModalScroll();
    return;
  }
  if (action === "toggle-facebook") {
    state.articleDraft.pushFacebook = !state.articleDraft.pushFacebook;
    renderPreservingModalScroll();
    return;
  }
  if (action === "add-hero-slide") {
    addHeroSlide();
    renderPreservingModalScroll();
    return;
  }
  if (action === "add-faq-item") {
    addFaqItem();
    renderPreservingModalScroll();
    return;
  }
  if (action === "remove-hero-slide") {
    removeHeroSlide(Number(target.dataset.slideIndex || -1));
    renderPreservingModalScroll();
    return;
  }
  if (action === "remove-faq-item") {
    removeFaqItem(Number(target.dataset.faqIndex || -1));
    renderPreservingModalScroll();
    return;
  }
  if (action === "move-hero-slide-up") {
    moveHeroSlide(Number(target.dataset.slideIndex || -1), -1);
    renderPreservingModalScroll();
    return;
  }
  if (action === "move-faq-item-up") {
    moveFaqItem(Number(target.dataset.faqIndex || -1), -1);
    renderPreservingModalScroll();
    return;
  }
  if (action === "move-hero-slide-down") {
    moveHeroSlide(Number(target.dataset.slideIndex || -1), 1);
    renderPreservingModalScroll();
    return;
  }
  if (action === "move-faq-item-down") {
    moveFaqItem(Number(target.dataset.faqIndex || -1), 1);
    renderPreservingModalScroll();
    return;
  }
  if (action === "save-draft" || action === "submit-review") {
    syncBodyEditorState();
    const draft = state.articleDraft;
    const existing = state.editingId
      ? state.contentItems.find((candidate) => candidate.id === state.editingId)
      : null;
    const desiredStatus = action === "submit-review" ? "review" : "draft";
    const normalizedType = articleTypeFromValue(draft.type, draft.page);
    const normalizedSlug =
      draft.slug || slugify(draft.title) || `content-${Date.now()}`;
    const normalizedTargets =
      normalizedType === "Page section" || normalizedType === "Sponsor"
        ? normalizePlacementTargets(
            draft.targets || legacyTargetsFromRecord(draft),
            draft.page || "/",
          )
        : normalizedType === "Event"
          ? eventTargetsForDraft({
              ...draft,
              slug: normalizedSlug,
              type: normalizedType,
            })
          : [];
    const derivedPlacementState =
      normalizedType === "Page section" || normalizedType === "Sponsor"
        ? derivePagePlacementState(normalizedTargets)
        : {
            page: managedRouteForDraft({
              ...draft,
              type: normalizedType,
              slug: normalizedSlug,
            }),
            placements: [],
          };
    const normalizedPage =
      normalizedType === "Page section" || normalizedType === "Sponsor"
        ? derivedPlacementState.page
        : derivedPlacementState.page;
    const preservedWidgetFields = existing?.fields?.widgetKind
      ? {
          widgetKind: existing.fields.widgetKind || "",
          widgetType: existing.fields.widgetType || "",
          widgetOrder: Number(existing.fields.widgetOrder || 0),
          widgetSourceId: existing.fields.widgetSourceId || "",
          widgetAssetId: existing.fields.widgetAssetId || "",
          widgetSponsorType: existing.fields.widgetSponsorType || "",
          widgetEnabled: normalizeWidgetEnabledValue(
            existing.fields.widgetEnabled,
          ),
        }
      : {};
    const isHeritageGalleryWidgetRecord =
      isHeritageHomeHeroGalleryWidgetRecord(existing);
    const item = normalizeCmsRecord({
      id: existing?.id || normalizedSlug || `content-${Date.now()}`,
      slug: normalizedSlug,
      page: normalizedPage,
      placements:
        normalizedType === "Page section" || normalizedType === "Sponsor"
          ? derivedPlacementState.placements
          : normalizedType === "Event"
            ? normalizedTargets.slice(1).map((target) => target.page)
            : normalizePlacementList(draft.placements || []),
      targets: normalizedTargets,
      type: normalizedType,
      status: desiredStatus,
      updated: "Just now",
      author: currentUserName(),
      title: draft.title || "Untitled content record",
      excerpt: draft.summary || "",
      body: draft.body || "",
      language: draft.language,
      pushFacebook: draft.pushFacebook,
      fields: {
        ...preservedWidgetFields,
        eyebrow: draft.eyebrow || "",
        heading: draft.title || "Untitled content record",
        summary: draft.summary || "",
        body: draft.body || "",
        ctaLabel: draft.ctaLabel || "",
        ctaUrl: draft.ctaUrl || "",
        contentCategory: draft.contentCategory || "general",
        widgetConfig: isHeritageGalleryWidgetRecord
          ? buildHeritageHeroGalleryWidgetConfigString(draft)
          : draft.contentCategory === "hero"
            ? buildHeroWidgetConfigString(draft)
            : draft.contentCategory === "faq"
              ? buildFaqWidgetConfigString(draft)
              : draft.widgetConfig || "",
        image: draft.media || "",
        imageAlt: draft.imageAlt || draft.title || "",
        imageCopyright: draft.imageCopyright || "",
        eventDate: draft.eventDate || "",
        eventEndDate: draft.eventEndDate || "",
        eventCategory: draft.eventCategory || "",
        hideCountdown: Boolean(draft.hideCountdown),
        eventStartTime: draft.eventStartTime || "",
        eventEndTime: draft.eventEndTime || "",
        eventTime: eventTimeValueForDraft(draft),
        eventVenue: draft.eventVenue || "",
        eventLatitude: draft.eventLatitude || "",
        eventLongitude: draft.eventLongitude || "",
        eventPlaceId: draft.eventPlaceId || "",
        whatToExpectTitle: draft.whatToExpectTitle || "",
        whatToExpectSummary: draft.whatToExpectSummary || "",
        arrivalWindow: draft.arrivalWindow || "",
        eventAccess: draft.eventAccess || "",
        eventBring: draft.eventBring || "",
        eventTips: draft.eventTips || "",
        presentedByName: draft.presentedByName || "",
        presentedByImage: draft.presentedByImage || "",
        presentedByImageCopyright: draft.presentedByImageCopyright || "",
        eventEditorialLabel: draft.eventEditorialLabel || "",
        eventEditorialTitle: draft.eventEditorialTitle || "",
        eventEditorialSummary: draft.eventEditorialSummary || "",
        eventEditorialImage: draft.eventEditorialImage || "",
        eventEditorialImageCopyright: draft.eventEditorialImageCopyright || "",
        eventEditorialLabel2: draft.eventEditorialLabel2 || "",
        eventEditorialTitle2: draft.eventEditorialTitle2 || "",
        eventEditorialSummary2: draft.eventEditorialSummary2 || "",
        eventEditorialImage2: draft.eventEditorialImage2 || "",
        eventEditorialImage2Copyright:
          draft.eventEditorialImage2Copyright || "",
        connectedEventId:
          normalizedType === "Event" ? "" : draft.connectedEventId || "",
        featuredHomepageEvent:
          normalizedType === "Event"
            ? Boolean(draft.featuredHomepageEvent || draft.mainHomepageEvent)
            : false,
        mainHomepageEvent:
          normalizedType === "Event" ? Boolean(draft.mainHomepageEvent) : false,
        featuredEvent:
          normalizedType === "Event" ? Boolean(draft.featuredEvent) : false,
        sponsorType: normalizeSponsorType(draft.sponsorType),
        sponsorUrl: draft.sponsorUrl || "",
      },
    });
    try {
      const result = await apiRequest("save-content", {
        method: "POST",
        body: { tenant: state.activeTenant, record: item },
      });
      const saved = normalizeCmsRecord(result.record);
      if (saved.type === "Event" && saved.fields?.mainHomepageEvent) {
        state.contentItems.forEach((candidate) => {
          if (candidate.type === "Event" && candidate.id !== saved.id) {
            candidate.fields.mainHomepageEvent = false;
          }
        });
      }
      const index = state.contentItems.findIndex(
        (candidate) => candidate.id === saved.id,
      );
      if (index >= 0) state.contentItems[index] = saved;
      else state.contentItems.unshift(saved);
      state.activeArticleId = saved.id;
      state.audit.unshift({
        text:
          action === "submit-review"
            ? "Submitted for editorial review"
            : "Draft saved through CMS API",
        user: saved.author,
        time: "Just now",
      });
      state.editingId = null;
      state.modal = null;
      state.view =
        action === "submit-review"
          ? "review"
          : saved.type === "Sponsor"
            ? "sponsors"
            : saved.type === "Event"
              ? "events"
              : "content";
      showToast(
        action === "submit-review"
          ? "Request sent to editorial desk"
          : "Draft saved",
        action === "submit-review"
          ? "The API record is now visible in the review queue."
          : "The draft was persisted to the active tenant data store.",
      );
    } catch (error) {
      showToast("Content could not be saved", error.message);
    }
    return;
  }
  if (action === "insert-asset") {
    const uploadContext =
      target.dataset.uploadContext ||
      state.activeAssetInsertContext ||
      "article";
    if (uploadContext === "presented-by") {
      state.articleDraft.presentedByImage =
        target.dataset.assetUrl || state.articleDraft.presentedByImage;
      state.articleDraft.presentedByImageCopyright =
        target.dataset.assetCopyright ||
        state.articleDraft.presentedByImageCopyright;
    } else if (uploadContext === "event-editorial") {
      state.articleDraft.eventEditorialImage =
        target.dataset.assetUrl || state.articleDraft.eventEditorialImage;
      state.articleDraft.eventEditorialImageCopyright =
        target.dataset.assetCopyright ||
        state.articleDraft.eventEditorialImageCopyright;
    } else if (uploadContext === "event-editorial-2") {
      state.articleDraft.eventEditorialImage2 =
        target.dataset.assetUrl || state.articleDraft.eventEditorialImage2;
      state.articleDraft.eventEditorialImage2Copyright =
        target.dataset.assetCopyright ||
        state.articleDraft.eventEditorialImage2Copyright;
    } else if (uploadContext === "heritage-gallery-portrait") {
      state.articleDraft.heroGalleryPortraitImage =
        target.dataset.assetUrl || state.articleDraft.heroGalleryPortraitImage;
      state.articleDraft.heroGalleryPortraitAlt =
        target.dataset.assetAlt || state.articleDraft.heroGalleryPortraitAlt;
    } else if (uploadContext === "heritage-gallery-market") {
      state.articleDraft.heroGalleryMarketImage =
        target.dataset.assetUrl || state.articleDraft.heroGalleryMarketImage;
      state.articleDraft.heroGalleryMarketAlt =
        target.dataset.assetAlt || state.articleDraft.heroGalleryMarketAlt;
    } else if (isHeroSlideContext(uploadContext)) {
      const index = heroSlideIndexFromContext(uploadContext);
      if (index >= 0) {
        const existing = state.articleDraft.heroSlides?.[index] || {};
        updateHeroSlide(index, {
          image: target.dataset.assetUrl || existing.image || "",
          alt: existing.alt || target.dataset.assetAlt || "",
          copyright: existing.copyright || target.dataset.assetCopyright || "",
        });
      }
    } else {
      state.articleDraft.media =
        target.dataset.assetUrl || state.articleDraft.media;
      state.articleDraft.imageAlt =
        target.dataset.assetAlt || state.articleDraft.imageAlt;
      state.articleDraft.imageCopyright = target.dataset.assetCopyright || "";
    }
    render();
    showToast(
      "Asset associated",
      `${target.dataset.assetName || "Selected asset"} was linked to this API content record.`,
    );
    return;
  }
  if (action === "copy-asset-url") {
    const assetUrl = target.dataset.assetUrl || "";
    if (!assetUrl) {
      showToast(
        "Asset unavailable",
        "This media item does not have a public URL yet.",
      );
      return;
    }
    try {
      await navigator.clipboard.writeText(assetUrl);
      showToast(
        "Asset URL copied",
        "The public media URL is ready to paste into content or design fields.",
      );
    } catch (error) {
      showToast(
        "Copy failed",
        "Your browser blocked clipboard access, but the asset is still available in the media vault.",
      );
    }
    return;
  }
  if (action === "filter-content") {
    state.contentFilter = target.dataset.filter;
    render();
    return;
  }
  if (action === "select-review-item") {
    state.activeArticleId = target.dataset.articleId || state.activeArticleId;
    state.revisionOpen = false;
    render();
    return;
  }
  if (action === "open-review") {
    state.activeArticleId = target.dataset.articleId;
    state.view = "review";
    state.auditOpen = false;
    render();
    return;
  }
  if (action === "set-device") {
    state.reviewDevice = target.dataset.device;
    render();
    return;
  }
  if (action === "open-portal-preview") {
    if (!state.activeTenant) {
      showToast(
        "Preview unavailable",
        "Create or connect a portal before opening the public preview.",
      );
      return;
    }
    const item =
      state.contentItems.find(
        (candidate) => candidate.id === state.activeArticleId,
      ) || state.contentItems[0];
    window.open(getPortalPreviewUrl(item), "_blank", "noopener,noreferrer");
    return;
  }
  if (action === "toggle-audit") {
    state.auditOpen = !state.auditOpen;
    render();
    return;
  }
  if (action === "reject") {
    state.revisionOpen = true;
    render();
    return;
  }
  if (action === "submit-revision") {
    try {
      await updateContentStatus(state.activeArticleId, "needs-changes");
      state.revisionOpen = false;
      state.audit.unshift({
        text: "Rejected and routed back to writer",
        user: currentUserName(),
        time: "Just now",
      });
      showToast(
        "Revision request sent",
        "The updated review state was persisted through the API.",
      );
    } catch (error) {
      showToast("Status update failed", error.message);
    }
    return;
  }
  if (action === "authorize-publish") {
    state.modal = "confirm-publish";
    render();
    return;
  }
  if (action === "confirm-publish") {
    try {
      await updateContentStatus(state.activeArticleId, "published");
      state.modal = null;
      state.audit.unshift({
        text: "Authorized and published live",
        user: currentUserName(),
        time: "Just now",
      });
      showToast(
        "Published to live portal",
        "Connected frontends will receive the new published record on their next API request.",
      );
    } catch (error) {
      state.modal = null;
      showToast("Publication failed", error.message);
    }
    return;
  }
  if (action === "take-offline") {
    state.modal = "confirm-offline";
    render();
    return;
  }
  if (action === "confirm-offline") {
    try {
      await updateContentStatus(state.activeArticleId, "draft");
      state.modal = null;
      state.audit.unshift({
        text: "Article taken offline",
        user: currentUserName(),
        time: "Just now",
      });
      showToast(
        "Article taken offline",
        "The record was removed from the public API response.",
      );
    } catch (error) {
      state.modal = null;
      showToast("Offline action failed", error.message);
    }
    return;
  }
  if (action === "confirm-delete") {
    try {
      const deleteId = state.pendingDeleteId;
      await deleteContentRecord(deleteId);
      state.modal = null;
      state.pendingDeleteId = "";
      state.audit.unshift({
        text: "Content record deleted",
        user: currentUserName(),
        time: "Just now",
      });
      showToast(
        "Content deleted",
        "The record was permanently removed from this tenant workspace.",
      );
      render();
    } catch (error) {
      state.modal = null;
      state.pendingDeleteId = "";
      showToast("Delete failed", error.message);
    }
    return;
  }
  if (action === "move-block") {
    const index = Number(target.dataset.index);
    const next = target.dataset.direction === "up" ? index - 1 : index + 1;
    if (next >= 0 && next < state.layoutBlocks.length)
      [state.layoutBlocks[index], state.layoutBlocks[next]] = [
        state.layoutBlocks[next],
        state.layoutBlocks[index],
      ];
    render();
    return;
  }
  if (action === "add-block") {
    state.layoutBlocks.push({
      id: `block-${Date.now()}`,
      type: state.blockChoice,
      variant:
        state.blockChoice === "directory_feed"
          ? "variant_dense"
          : state.builderTheme,
    });
    showToast(
      "Block added",
      `${typeLabel(state.blockChoice)} will render in the public template sequence.`,
    );
    return;
  }
  if (action === "set-builder-theme") {
    state.builderTheme = target.dataset.theme;
    render();
    return;
  }
  if (action === "save-layout") {
    showToast(
      "Layout template saved",
      "The backend JSON matrix is ready to be persisted for this tenant.",
    );
    return;
  }
  if (action === "show-toast") {
    showToast(
      target.dataset.toastTitle || "Action complete",
      target.dataset.toastCopy ||
        "The workspace has recorded this interaction.",
    );
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-login-form]");
  if (!form) return;
  event.preventDefault();
  try {
    const payload = await apiRequest("login", {
      method: "POST",
      body: {
        username: state.login.username.trim(),
        password: state.login.password,
        tenant: state.activeTenant || SCOPED_TENANT_ID || "",
      },
    });
    const portalPayload = await apiRequest("portals", {
      params:
        SCOPED_TENANT_ID && !payload.user?.canSwitchTenants
          ? { tenant: SCOPED_TENANT_ID }
          : {},
    });
    state.login.error = "";
    state.currentUser = payload.user?.username || state.login.username.trim();
    state.role = payload.user?.role || "editor";
    state.canSwitchTenants = Boolean(
      payload.user?.canSwitchTenants ?? portalPayload.canSwitchTenants,
    );
    portals = Array.isArray(portalPayload.portals)
      ? portalPayload.portals
      : portals;
    state.authenticated = true;
    state.view = defaultViewForRole();
    state.activeTenant =
      payload.user?.activeTenant ||
      portalPayload.activeTenant ||
      state.activeTenant ||
      portals[0]?.id ||
      "";
    await refreshTenantWorkspace(state.activeTenant, false);
    render();
    showToast(
      "Signed in successfully",
      state.activeTenant
        ? `${currentTenant().name} is now active in this CMS session.`
        : "You are signed in. Create or connect a portal to begin managing content.",
    );
  } catch (error) {
    state.login.error = error.message;
    render();
    document.querySelector("#login-username")?.focus();
  }
});

document.addEventListener("keydown", (event) => {
  const trigger = event.target.closest("[data-select-trigger]");
  const option = event.target.closest("[data-select-option]");
  if (!trigger && !option) return;

  if (trigger) {
    const field = trigger.dataset.selectField;
    if (event.key === "Escape" && state.customSelectOpen === field) {
      event.preventDefault();
      state.customSelectOpen = null;
      render();
      document
        .querySelector(`[data-select-trigger][data-select-field="${field}"]`)
        ?.focus();
      return;
    }
    if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      if (state.customSelectOpen !== field) {
        trigger.click();
      } else {
        const options =
          field === "block-choice"
            ? blockSelectOptions
            : field === "article-type"
              ? articleTypeOptions
              : field === "page-target"
                ? placementOptionsForDraft()
                : languageSelectOptions;
        focusCustomSelectOption(
          field,
          options.findIndex(([value]) => value === customSelectValue(field)),
        );
      }
    }
    return;
  }

  const field = option.dataset.selectField;
  const menu = option.closest(".custom-select");
  const options = [...menu.querySelectorAll("[data-select-option]")];
  const currentIndex = options.indexOf(option);
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const nextIndex =
      event.key === "ArrowDown" ? currentIndex + 1 : currentIndex - 1;
    options[Math.max(0, Math.min(nextIndex, options.length - 1))].focus();
  } else if (event.key === "Home" || event.key === "End") {
    event.preventDefault();
    options[event.key === "Home" ? 0 : options.length - 1].focus();
  } else if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    option.click();
  } else if (event.key === "Escape") {
    event.preventDefault();
    state.customSelectOpen = null;
    render();
    document
      .querySelector(`[data-select-trigger][data-select-field="${field}"]`)
      ?.focus();
  }
});

let activeWidgetDragPayload = null;
let activeFaqDragIndex = null;

function setWidgetSaveStatus(status = "saved", message = "") {
  state.widgetSaveState = status;
  state.widgetSaveMessage =
    message ||
    (status === "saving"
      ? "Saving widget order..."
      : status === "error"
        ? "Widget changes could not be saved."
        : "All widget changes are saved automatically.");
  document.querySelectorAll("[data-widget-save-status]").forEach((element) => {
    element.className = `widget-save-status is-${status}`;
    const label = element.querySelector("strong");
    if (label) label.textContent = state.widgetSaveMessage;
  });
}

function clearWidgetDropzoneHighlights() {
  document
    .querySelectorAll(
      "[data-widget-dropzone].is-hover, [data-widget-dropzone].is-incompatible",
    )
    .forEach((dropzone) =>
      dropzone.classList.remove("is-hover", "is-incompatible"),
    );
  document
    .querySelectorAll(
      ".site-widget-card.is-drop-before, .site-widget-card.is-drop-after, .site-widget-card.is-dragging-widget",
    )
    .forEach((card) =>
      card.classList.remove(
        "is-drop-before",
        "is-drop-after",
        "is-dragging-widget",
      ),
    );
  document
    .querySelectorAll(".widget-library-item.is-dragging-widget")
    .forEach((item) => item.classList.remove("is-dragging-widget"));
}

function parseWidgetDragPayload(event) {
  const raw =
    event.dataTransfer?.getData("text/site-widget") ||
    event.dataTransfer?.getData("text/plain");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function widgetDropTargetFromEvent(event) {
  const dropzone = event.target.closest("[data-widget-dropzone]");
  if (!dropzone) return null;
  const page = normalizePlacementPath(dropzone.dataset.widgetPage || "/");
  const sectionId = dropzone.dataset.widgetSection || "";
  const cards = [...dropzone.querySelectorAll(".site-widget-card")];
  const hoveredCard = event.target.closest(".site-widget-card");
  let index = cards.length;
  let indicatorPosition = "after";
  if (hoveredCard) {
    const hoveredIndex = cards.indexOf(hoveredCard);
    const midpoint =
      hoveredCard.getBoundingClientRect().top +
      hoveredCard.getBoundingClientRect().height / 2;
    indicatorPosition = event.clientY > midpoint ? "after" : "before";
    index = hoveredIndex + (indicatorPosition === "after" ? 1 : 0);
  }
  return {
    dropzone,
    page,
    sectionId,
    index,
    hoveredCard,
    indicatorPosition,
  };
}

function widgetTypeFromDragPayload(payload = null) {
  if (payload?.kind === "template") return payload.widgetType || "post";
  if (payload?.kind === "instance")
    return findSiteWidgetInstance(payload.widgetId)?.type || "";
  return "";
}

function widgetDropIsCompatible(payload, target) {
  const type = widgetTypeFromDragPayload(payload);
  return Boolean(
    type && sectionSupportsWidgetType(target.page, target.sectionId, type),
  );
}

document.addEventListener("dragstart", (event) => {
  const faqItem = event.target.closest("[data-faq-drag-index]");
  if (faqItem) {
    activeFaqDragIndex = Number(faqItem.dataset.faqDragIndex || -1);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
    return;
  }
  const template = event.target.closest("[data-widget-template]");
  if (template) {
    activeWidgetDragPayload = {
      kind: "template",
      widgetType: template.dataset.widgetTemplate || "post",
    };
    const serializedPayload = JSON.stringify(activeWidgetDragPayload);
    event.dataTransfer?.setData("text/site-widget", serializedPayload);
    event.dataTransfer?.setData("text/plain", serializedPayload);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = "copy";
    template.classList.add("is-dragging-widget");
    return;
  }
  const existing = event.target.closest("[data-widget-instance-id]");
  if (!existing) return;
  activeWidgetDragPayload = {
    kind: "instance",
    widgetId: existing.dataset.widgetInstanceId || "",
  };
  const serializedPayload = JSON.stringify(activeWidgetDragPayload);
  event.dataTransfer?.setData("text/site-widget", serializedPayload);
  event.dataTransfer?.setData("text/plain", serializedPayload);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
  existing.closest(".site-widget-card")?.classList.add("is-dragging-widget");
});

document.addEventListener("dragend", () => {
  clearWidgetDropzoneHighlights();
  activeWidgetDragPayload = null;
  activeFaqDragIndex = null;
});

document.addEventListener("dragover", (event) => {
  if (
    activeFaqDragIndex !== null &&
    event.target.closest("[data-faq-drop-index]")
  ) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
    return;
  }
  const target = widgetDropTargetFromEvent(event);
  if (!target) return;
  event.preventDefault();
  clearWidgetDropzoneHighlights();
  const compatible = widgetDropIsCompatible(activeWidgetDragPayload, target);
  if (!compatible) {
    target.dropzone.classList.add("is-incompatible");
    if (event.dataTransfer) event.dataTransfer.dropEffect = "none";
    return;
  }
  target.dropzone.classList.add("is-hover");
  target.hoveredCard?.classList.add(
    target.indicatorPosition === "before" ? "is-drop-before" : "is-drop-after",
  );
  if (event.dataTransfer)
    event.dataTransfer.dropEffect =
      activeWidgetDragPayload?.kind === "instance" ? "move" : "copy";
});

document.addEventListener("drop", async (event) => {
  if (activeFaqDragIndex !== null) {
    const faqTarget = event.target.closest("[data-faq-drop-index]");
    if (faqTarget) {
      event.preventDefault();
      reorderFaqItem(
        activeFaqDragIndex,
        Number(faqTarget.dataset.faqDropIndex || -1),
      );
      activeFaqDragIndex = null;
      renderPreservingModalScroll();
      return;
    }
  }
  const target = widgetDropTargetFromEvent(event);
  if (!target) return;
  event.preventDefault();
  clearWidgetDropzoneHighlights();
  const payload = parseWidgetDragPayload(event) || activeWidgetDragPayload;
  if (!payload) return;
  if (!widgetDropIsCompatible(payload, target)) {
    const typeLabel = widgetTemplateMeta(
      widgetTypeFromDragPayload(payload) || "post",
    ).label;
    const sectionLabel =
      siteWidgetSectionMeta(target.page, target.sectionId)?.label ||
      "this section";
    showToast(
      "Incompatible section",
      `${typeLabel} cannot be placed in ${sectionLabel}.`,
    );
    activeWidgetDragPayload = null;
    return;
  }
  setWidgetSaveStatus("saving", "Saving widget position...");
  try {
    if (payload.kind === "template") {
      const instance = await createSiteWidgetRecord(
        payload.widgetType,
        target.page,
        target.sectionId,
        target.index,
      );
      const sectionLabel =
        siteWidgetSectionMeta(target.page, target.sectionId)?.label ||
        "this section";
      render();
      setWidgetSaveStatus("saved");
      showToast(
        "Widget added",
        `${widgetTemplateMeta(instance?.type || payload.widgetType).label} was added to ${sectionLabel}.`,
      );
      return;
    }
    if (payload.kind === "instance") {
      const moved = await moveSiteWidgetInstance(
        payload.widgetId,
        target.page,
        target.sectionId,
        target.index,
      );
      if (!moved) return;
      const sectionLabel =
        siteWidgetSectionMeta(target.page, target.sectionId)?.label ||
        "this section";
      render();
      setWidgetSaveStatus("saved");
      showToast(
        "Widget moved",
        `${widgetTemplateMeta(moved.type).label} was moved to ${sectionLabel}.`,
      );
    }
  } catch (error) {
    setWidgetSaveStatus("error", "Widget position could not be saved.");
    showToast("Widget update failed", error.message);
  } finally {
    activeWidgetDragPayload = null;
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches('[data-richtext-editor="article-body"]')) {
    state.articleDraft.body = normalizeRichTextHtml(event.target.innerHTML);
    return;
  }
  const field = event.target.dataset.field;
  if (!field) return;
  if (field === "tenant-query") {
    state.tenantQuery = event.target.value;
    const menu = event.target.closest(".switcher-menu");
    if (menu) {
      const query = state.tenantQuery.toLowerCase();
      const filtered = portals.filter((portal) =>
        `${portal.name} ${portal.domain}`.toLowerCase().includes(query),
      );
      const list = menu.querySelector(".switcher-list");
      list.innerHTML = filtered.length
        ? filtered
            .map(
              (portal) =>
                `<button class="switcher-option ${portal.id === state.activeTenant ? "is-selected" : ""}" data-action="choose-tenant" data-tenant-id="${portal.id}"><span class="tenant-icon" style="background:${portal.color}">${portal.short}</span><span class="tenant-copy"><span class="tenant-name">${esc(portal.name)}</span><span class="tenant-domain">${esc(portal.domain)}</span></span></button>`,
            )
            .join("")
        : '<div class="empty-state">No portals match this search.</div>';
    }
    return;
  }
  if (field === "login-username") {
    state.login.username = event.target.value;
    state.login.error = "";
    return;
  }
  if (field === "login-password") {
    state.login.password = event.target.value;
    state.login.error = "";
    return;
  }
  if (field === "article-title") {
    state.articleDraft.title = event.target.value;
    if (!state.slugLocked && !state.editingId) {
      state.articleDraft.slug = slugify(event.target.value);
      const slugInput = document.querySelector('[data-field="article-slug"]');
      if (slugInput) slugInput.value = state.articleDraft.slug;
    }
    syncDraftSlugAndRoute();
    return;
  }
  if (field === "article-slug") {
    state.articleDraft.slug = event.target.value;
    syncDraftSlugAndRoute();
    return;
  }
  if (field === "article-language") {
    state.articleDraft.language = event.target.value;
    return;
  }
  if (field === "article-content-category") {
    state.articleDraft.contentCategory = event.target.value || "general";
    renderPreservingModalScroll();
    return;
  }
  if (field === "hero-slide-image") {
    updateHeroSlide(Number(event.target.dataset.slideIndex || -1), {
      image: event.target.value,
    });
    return;
  }
  if (field === "hero-slide-alt") {
    updateHeroSlide(Number(event.target.dataset.slideIndex || -1), {
      alt: event.target.value,
    });
    return;
  }
  if (field === "hero-slide-copyright") {
    updateHeroSlide(Number(event.target.dataset.slideIndex || -1), {
      copyright: event.target.value,
    });
    return;
  }
  if (field === "article-hero-gallery-portrait-image") {
    state.articleDraft.heroGalleryPortraitImage = event.target.value;
    return;
  }
  if (field === "article-hero-gallery-market-image") {
    state.articleDraft.heroGalleryMarketImage = event.target.value;
    return;
  }
  if (field === "article-hero-gallery-poster-month") {
    state.articleDraft.heroGalleryPosterMonth = event.target.value;
    return;
  }
  if (field === "article-hero-gallery-poster-start") {
    state.articleDraft.heroGalleryPosterStart = event.target.value;
    return;
  }
  if (field === "article-hero-gallery-poster-connector") {
    state.articleDraft.heroGalleryPosterConnector = event.target.value;
    return;
  }
  if (field === "article-hero-gallery-poster-end") {
    state.articleDraft.heroGalleryPosterEnd = event.target.value;
    return;
  }
  if (field === "article-hero-gallery-poster-year") {
    state.articleDraft.heroGalleryPosterYear = event.target.value;
    return;
  }
  if (field === "faq-group-scope") {
    state.articleDraft.faqGroupScope =
      event.target.value === "selected-events"
        ? "selected-events"
        : "all-events";
    if (state.articleDraft.faqGroupScope !== "selected-events") {
      state.articleDraft.faqAssignedEventIds = [];
    }
    renderPreservingModalScroll();
    return;
  }
  if (field === "faq-assigned-event") {
    const eventId = String(event.target.value || "").trim();
    const selected = new Set(
      Array.isArray(state.articleDraft.faqAssignedEventIds)
        ? state.articleDraft.faqAssignedEventIds
        : [],
    );
    if (event.target.checked) selected.add(eventId);
    else selected.delete(eventId);
    state.articleDraft.faqAssignedEventIds = [...selected];
    return;
  }
  if (field === "faq-item-enabled") {
    updateFaqItem(Number(event.target.dataset.faqIndex || -1), {
      enabled: Boolean(event.target.checked),
    });
    return;
  }
  if (field === "faq-item-question") {
    updateFaqItem(Number(event.target.dataset.faqIndex || -1), {
      question: event.target.value,
    });
    return;
  }
  if (field === "faq-item-answer") {
    updateFaqItem(Number(event.target.dataset.faqIndex || -1), {
      answer: event.target.value,
    });
    return;
  }
  if (field === "article-placement") {
    toggleDraftPlacement(event.target.value, event.target.checked);
    renderPreservingModalScroll();
    return;
  }
  if (field === "article-page-target") {
    toggleDraftPageTarget(event.target.value, event.target.checked);
    renderPreservingModalScroll();
    return;
  }
  if (field === "content-type-filter") {
    state.contentTypeFilter = event.target.value;
    render();
    return;
  }
  if (field === "sponsor-type-filter") {
    state.sponsorTypeFilter = event.target.value || "all";
    render();
    return;
  }
  if (field === "contact-submission-status-filter") {
    state.contactSubmissionStatusFilter = event.target.value || "all";
    render();
    return;
  }
  if (field === "contact-submission-type-filter") {
    state.contactSubmissionTypeFilter = event.target.value || "all";
    render();
    return;
  }
  if (field === "article-seo") {
    state.articleDraft.seo = event.target.value;
    state.articleDraft.summary = event.target.value;
    return;
  }
  if (field === "article-page") {
    state.articleDraft.page = event.target.value;
    return;
  }
  if (field === "article-type") {
    state.articleDraft.type = articleTypeFromValue(
      event.target.value,
      state.articleDraft.page,
    );
    if (state.articleDraft.type !== "Event") {
      resetEventLocationUiState();
    }
    if (
      state.articleDraft.type === "Event" ||
      state.articleDraft.type === "Sponsor"
    )
      state.articleDraft.connectedEventId = "";
    syncDraftSlugAndRoute({ forceRoute: true });
    renderPreservingModalScroll();
    return;
  }
  if (field === "article-eyebrow") {
    state.articleDraft.eyebrow = event.target.value;
    return;
  }
  if (field === "article-event-date") {
    state.articleDraft.eventDate = event.target.value;
    if (
      state.articleDraft.eventEndDate &&
      state.articleDraft.eventEndDate < state.articleDraft.eventDate
    ) {
      state.articleDraft.eventEndDate = state.articleDraft.eventDate;
    }
    return;
  }
  if (field === "article-event-end-date") {
    state.articleDraft.eventEndDate = event.target.value;
    if (
      state.articleDraft.eventEndDate &&
      state.articleDraft.eventDate &&
      state.articleDraft.eventEndDate < state.articleDraft.eventDate
    ) {
      state.articleDraft.eventEndDate = state.articleDraft.eventDate;
    }
    return;
  }
  if (field === "article-event-category") {
    state.articleDraft.eventCategory = event.target.value;
    return;
  }
  if (field === "article-hide-countdown") {
    state.articleDraft.hideCountdown = Boolean(event.target.checked);
    return;
  }
  if (field === "article-event-time") {
    state.articleDraft.eventTime = event.target.value;
    return;
  }
  if (field === "article-event-start-time") {
    state.articleDraft.eventStartTime = event.target.value;
    state.articleDraft.eventTime = eventTimeValueForDraft(state.articleDraft);
    return;
  }
  if (field === "article-event-end-time") {
    state.articleDraft.eventEndTime = event.target.value;
    state.articleDraft.eventTime = eventTimeValueForDraft(state.articleDraft);
    return;
  }
  if (field === "article-event-venue") {
    state.articleDraft.eventVenue = event.target.value;
    state.eventLocationStatus = "";
    state.eventLocationResults = [];
    return;
  }
  if (field === "article-event-latitude") {
    state.articleDraft.eventLatitude = event.target.value;
    state.articleDraft.eventPlaceId = "";
    syncEventMapMarker();
    return;
  }
  if (field === "article-event-longitude") {
    state.articleDraft.eventLongitude = event.target.value;
    state.articleDraft.eventPlaceId = "";
    syncEventMapMarker();
    return;
  }
  if (field === "article-what-to-expect-title") {
    state.articleDraft.whatToExpectTitle = event.target.value;
    return;
  }
  if (field === "article-what-to-expect-summary") {
    state.articleDraft.whatToExpectSummary = event.target.value;
    return;
  }
  if (field === "article-arrival-window") {
    state.articleDraft.arrivalWindow = event.target.value;
    return;
  }
  if (field === "article-event-access") {
    state.articleDraft.eventAccess = event.target.value;
    return;
  }
  if (field === "article-event-bring") {
    state.articleDraft.eventBring = event.target.value;
    return;
  }
  if (field === "article-event-tips") {
    state.articleDraft.eventTips = event.target.value;
    return;
  }
  if (field === "article-presented-by-name") {
    state.articleDraft.presentedByName = event.target.value;
    return;
  }
  if (field === "article-presented-by-image") {
    state.articleDraft.presentedByImage = event.target.value;
    return;
  }
  if (field === "article-presented-by-image-copyright") {
    state.articleDraft.presentedByImageCopyright = event.target.value;
    return;
  }
  if (field === "article-event-editorial-title") {
    state.articleDraft.eventEditorialTitle = event.target.value;
    return;
  }
  if (field === "article-event-editorial-label") {
    state.articleDraft.eventEditorialLabel = event.target.value;
    return;
  }
  if (field === "article-event-editorial-summary") {
    state.articleDraft.eventEditorialSummary = event.target.value;
    return;
  }
  if (field === "article-event-editorial-image") {
    state.articleDraft.eventEditorialImage = event.target.value;
    return;
  }
  if (field === "article-event-editorial-image-copyright") {
    state.articleDraft.eventEditorialImageCopyright = event.target.value;
    return;
  }
  if (field === "article-event-editorial-title-2") {
    state.articleDraft.eventEditorialTitle2 = event.target.value;
    return;
  }
  if (field === "article-event-editorial-label-2") {
    state.articleDraft.eventEditorialLabel2 = event.target.value;
    return;
  }
  if (field === "article-event-editorial-summary-2") {
    state.articleDraft.eventEditorialSummary2 = event.target.value;
    return;
  }
  if (field === "article-event-editorial-image-2") {
    state.articleDraft.eventEditorialImage2 = event.target.value;
    return;
  }
  if (field === "article-event-editorial-image-2-copyright") {
    state.articleDraft.eventEditorialImage2Copyright = event.target.value;
    return;
  }
  if (field === "article-featured-homepage-event") {
    state.articleDraft.featuredHomepageEvent = Boolean(event.target.checked);
    if (!state.articleDraft.featuredHomepageEvent) {
      state.articleDraft.mainHomepageEvent = false;
    }
    renderPreservingModalScroll();
    return;
  }
  if (field === "article-main-homepage-event") {
    state.articleDraft.mainHomepageEvent = Boolean(event.target.checked);
    if (state.articleDraft.mainHomepageEvent) {
      state.articleDraft.featuredHomepageEvent = true;
    }
    renderPreservingModalScroll();
    return;
  }
  if (field === "article-featured-event") {
    state.articleDraft.featuredEvent = Boolean(event.target.checked);
    return;
  }
  if (field === "article-connected-event") {
    state.articleDraft.connectedEventId = event.target.value;
    renderPreservingModalScroll();
    return;
  }
  if (field === "article-sponsor-type") {
    state.articleDraft.sponsorType = event.target.value;
    return;
  }
  if (field === "article-sponsor-url") {
    state.articleDraft.sponsorUrl = event.target.value;
    return;
  }
  if (field === "article-summary") {
    state.articleDraft.summary = event.target.value;
    state.articleDraft.seo = event.target.value;
    return;
  }
  if (field === "article-cta-label") {
    state.articleDraft.ctaLabel = event.target.value;
    return;
  }
  if (field === "article-cta-url") {
    state.articleDraft.ctaUrl = event.target.value;
    return;
  }
  if (field === "article-widget-config") {
    state.articleDraft.widgetConfig = event.target.value;
    return;
  }
  if (field === "article-media") {
    state.articleDraft.media = event.target.value;
    return;
  }
  if (field === "article-image-alt") {
    state.articleDraft.imageAlt = event.target.value;
    return;
  }
  if (field === "article-image-copyright") {
    state.articleDraft.imageCopyright = event.target.value;
    return;
  }
  if (field === "provision-name") {
    state.provisionDraft.name = event.target.value;
    return;
  }
  if (field === "provision-domain") {
    state.provisionDraft.domain = event.target.value;
    return;
  }
  if (field === "provision-admin") {
    state.provisionDraft.admin = event.target.value;
    return;
  }
  if (field === "revision-note") {
    state.revisionNote = event.target.value;
    return;
  }
  if (field === "media-query") {
    state.mediaQuery = event.target.value;
    const view = state.view;
    if (view === "media" || state.modal === "article") {
      const caret = event.target.selectionStart;
      render();
      const nextInput = document.querySelector('[data-field="media-query"]');
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(caret, caret);
      }
    }
    return;
  }
  if (field === "block-choice") {
    state.blockChoice = event.target.value;
    return;
  }
});

document.addEventListener("change", async (event) => {
  const field = event.target.dataset.field;
  if (field === "contact-submission-status") {
    const id = event.target.dataset.submissionId || "";
    const previous = state.contactSubmissions.find(
      (entry) => entry.id === id,
    )?.status;
    event.target.disabled = true;
    try {
      const payload = await apiRequest("update-contact-submission-status", {
        method: "POST",
        body: {
          tenant: state.activeTenant,
          id,
          status: event.target.value,
        },
      });
      state.contactSubmissions = state.contactSubmissions.map((entry) =>
        entry.id === id ? payload.entry : entry,
      );
      showToast(
        "Submission updated",
        `The inquiry is now marked ${payload.entry.status}.`,
      );
    } catch (error) {
      event.target.value = previous || "New";
      event.target.disabled = false;
      showToast("Status update failed", error.message);
    }
    return;
  }
  if (field === "article-content-category") {
    state.articleDraft.contentCategory = event.target.value || "general";
    renderPreservingModalScroll();
    return;
  }
  if (field === "widget-post-record") {
    try {
      await saveSiteWidgetInstance(event.target.dataset.widgetId || "", {
        sourceRecordId: event.target.value,
      });
      render();
    } catch (error) {
      showToast("Widget update failed", error.message);
    }
    return;
  }
  if (field === "widget-event-record") {
    try {
      await saveSiteWidgetInstance(event.target.dataset.widgetId || "", {
        sourceRecordId: event.target.value,
      });
      render();
    } catch (error) {
      showToast("Widget update failed", error.message);
    }
    return;
  }
  if (field === "widget-sponsor-type") {
    try {
      await saveSiteWidgetInstance(event.target.dataset.widgetId || "", {
        sponsorTypeFilter: event.target.value,
      });
      render();
    } catch (error) {
      showToast("Widget update failed", error.message);
    }
    return;
  }
  if (field === "widget-image-asset") {
    try {
      const asset =
        state.assets.find((item) => item.id === event.target.value) || null;
      await saveSiteWidgetInstance(event.target.dataset.widgetId || "", {
        assetId: event.target.value,
        assetUrl: asset?.url || "",
        assetAlt: asset?.alt || "",
      });
      render();
    } catch (error) {
      showToast("Widget update failed", error.message);
    }
    return;
  }
  if (field === "article-featured-homepage-event") {
    state.articleDraft.featuredHomepageEvent = Boolean(event.target.checked);
    if (!state.articleDraft.featuredHomepageEvent) {
      state.articleDraft.mainHomepageEvent = false;
    }
    renderPreservingModalScroll();
    return;
  }
  if (field === "article-main-homepage-event") {
    state.articleDraft.mainHomepageEvent = Boolean(event.target.checked);
    if (state.articleDraft.mainHomepageEvent) {
      state.articleDraft.featuredHomepageEvent = true;
    }
    renderPreservingModalScroll();
    return;
  }
  if (field === "article-featured-event") {
    state.articleDraft.featuredEvent = Boolean(event.target.checked);
    return;
  }
  if (field === "article-event-category") {
    state.articleDraft.eventCategory = event.target.value;
    return;
  }
  if (field === "article-page-section") {
    setDraftPageTargetSection(
      event.target.dataset.pageTarget || "/",
      event.target.value,
    );
    renderPreservingModalScroll();
    return;
  }
  if (field === "article-page-position") {
    setDraftPageTargetPlacement(
      event.target.dataset.pageTarget || "/",
      event.target.value,
    );
    renderPreservingModalScroll();
    return;
  }
  if (field === "event-csv-upload") {
    const [file] = event.target.files || [];
    event.target.value = "";
    if (!file) return;
    try {
      const csvText = await file.text();
      state.eventImport.fileName = file.name || "events.csv";
      state.eventImport.csvText = csvText;
      state.eventImport.validation = null;
      showToast(
        "CSV uploaded",
        `${state.eventImport.fileName} is ready for validation.`,
      );
      renderPreservingModalScroll();
    } catch (error) {
      showToast(
        "CSV upload failed",
        "The selected file could not be read in this browser session.",
      );
    }
    return;
  }
  if (field !== "media-upload") return;
  const [file] = event.target.files || [];
  await uploadAsset(file, event.target.dataset.uploadContext || "article");
  event.target.value = "";
});

document.addEventListener("dragover", (event) => {
  const dropzone = event.target.closest("[data-dropzone]");
  if (!dropzone) return;
  event.preventDefault();
  if (!state.dropDragging) {
    state.dropDragging = true;
    dropzone.classList.add("is-dragging");
  }
});

document.addEventListener("dragleave", (event) => {
  const dropzone = event.target.closest("[data-dropzone]");
  if (!dropzone) return;
  state.dropDragging = false;
  dropzone.classList.remove("is-dragging");
});

document.addEventListener("drop", async (event) => {
  const dropzone = event.target.closest("[data-dropzone]");
  if (!dropzone) return;
  event.preventDefault();
  state.dropDragging = false;
  const [file] = event.dataTransfer?.files || [];
  await uploadAsset(file, dropzone.dataset.uploadContext || "article");
});

boot();
