(function higalaayCmsRuntime() {
  "use strict";

  const query = new URLSearchParams(window.location.search);
  const config = window.TUKOD_CMS_CONFIG || {};
  const basePath = normalizeBasePath(config.basePath || "");
  const templateId =
    String(config.templateId || "festival-vibrant")
      .trim()
      .toLowerCase() || "festival-vibrant";
  const supportedTemplateIds = new Set(["festival-vibrant"]);
  const isPreview = query.get("tukodPreview") === "1";
  const tenantId =
    (isPreview ? query.get("cmsTenant") : "") || config.tenantId || "";
  const apiUrl = (isPreview ? query.get("cmsApi") : "") || config.apiUrl || "";
  const previewRecordKey = query.get("cmsRecord") || "";
  let previewRecord = parsePreviewRecordQuery(query.get("cmsPreviewRecord"));
  let latestRecords = previewRecord
    ? mergePreviewRecord({}, previewRecord)
    : {};
  let calendarCategoryFilter = "all";
  let calendarPage = 1;
  const pathname = normalizePath(window.location.pathname);
  const homepageFeaturedRoot = document.querySelector(
    ".feature-section .event-grid",
  );
  const featuredRoot = document.querySelector(
    "[data-higalaay-featured-events]",
  );
  const calendarRoot = document.querySelector("[data-higalaay-event-calendar]");
  const eventColors = [
    "color-red",
    "color-yellow",
    "color-green",
    "color-orange",
    "color-blue",
    "color-purple",
  ];
  const EVENT_CATEGORY_OPTIONS = Object.freeze([
    { value: "all", label: "All Events", category: "" },
    { value: "Major Event", label: "Major Events", category: "Major Event" },
    { value: "Minor Event", label: "Minor Events", category: "Minor Event" },
    { value: "Core Event", label: "Core Events", category: "Core Event" },
    {
      value: "Parallel Event",
      label: "Parallel Events",
      category: "Parallel Event",
    },
  ]);
  const CALENDAR_PAGE_SIZE = 6;
  const legacySlotSelectorsByPage = {
    "/": {
      "home-hero": ".hero.home-hero",
      "ticker-band": ".ticker-band",
      "feature-section": ".feature-section",
      "partner-recognition-section": ".partner-recognition",
      "about-preview": ".about-preview",
      "explore-section": ".explore-section",
      "visit-band": ".visit-band",
    },
    "/about": {
      "about-hero": ".page-hero",
      "about-partner-recognition": ".partner-recognition",
      "story-section": ".story-section",
      "value-strip": ".value-strip",
      "split-section": ".split-section",
    },
    "/events": {
      "events-hero": ".page-hero",
      "events-partner-recognition": ".partner-recognition",
      "featured-events":
        '.section[data-tukod-slot-anchor="featured-events"], .section.featured-events, #featured-events',
      "calendar-section": ".events-calendar, [data-higalaay-event-calendar]",
      "volunteer-cta": ".volunteer-cta",
    },
    "/contact": {
      "contact-hero": ".page-hero.contact-hero, .page-hero",
      "contact-partner-recognition": ".partner-recognition",
      "contact-layout": ".contact-layout",
    },
    "/sponsor": {
      "sponsor-hero": ".page-hero.sponsor-hero, .page-hero",
      "platinum-tier": ".platinum-tier",
      "diamond-tier": ".diamond-tier",
      "gold-tier": ".gold-tier",
      "silver-tier": ".silver-tier",
      "bronze-tier": ".bronze-tier",
      "donors-tier": ".donors-tier",
      "sponsor-cta": ".sponsor-cta",
    },
    "/plan-your-visit": {
      "visit-hero": ".page-hero.visit-hero, .visit-hero",
      "visit-partner-recognition": ".partner-recognition",
      "visit-planner": ".visit-planner",
      "contact-support-band": ".contact-support-band",
    },
  };

  if (!supportedTemplateIds.has(templateId)) {
    console.warn(
      `[TukodPH CMS] The vibrant runtime does not support template "${templateId}".`,
    );
    document.documentElement.dataset.tukodCms = "offline";
    return;
  }

  function normalizePath(value) {
    const raw = String(value || "/").trim() || "/";
    try {
      const parsed = new URL(raw, window.location.origin);
      const path = parsed.pathname || "/";
      return stripBasePath(path === "/" ? "/" : path.replace(/\/+$/, ""));
    } catch (error) {
      const path = raw.startsWith("/") ? raw : `/${raw}`;
      return stripBasePath(path === "/" ? "/" : path.replace(/\/+$/, ""));
    }
  }

  function normalizeBasePath(value) {
    const raw = String(value || "").trim();
    if (!raw || raw === "/") return "";
    const normalized = raw.startsWith("/") ? raw : `/${raw}`;
    return normalized.replace(/\/+$/, "");
  }

  function stripBasePath(path) {
    const normalized = path === "/" ? "/" : path.replace(/\/+$/, "");
    if (!basePath) return normalized;
    if (normalized === basePath) return "/";
    if (normalized.startsWith(`${basePath}/`)) {
      const stripped = normalized.slice(basePath.length);
      return stripped || "/";
    }
    return normalized;
  }

  function withBasePath(path) {
    const normalized = normalizePath(path);
    if (!basePath) return normalized;
    if (normalized === "/") return `${basePath}/`;
    return `${basePath}${normalized}`;
  }

  function escapeHtml(value) {
    const holder = document.createElement("div");
    holder.textContent = String(value || "");
    return holder.innerHTML;
  }

  function safeHref(value, fallback = "#") {
    const href = String(value || "").trim();
    if (!href) return fallback;
    if (href.startsWith("#")) return href;
    if (href.startsWith("/")) return withBasePath(href);
    try {
      const parsed = new URL(href, window.location.href);
      if (["mailto:", "tel:"].includes(parsed.protocol)) return href;
      if (["http:", "https:"].includes(parsed.protocol)) {
        if (parsed.origin === window.location.origin) {
          return withBasePath(
            `${parsed.pathname || "/"}${parsed.search || ""}${parsed.hash || ""}`,
          );
        }
        return href;
      }
    } catch (error) {
      return fallback;
    }
    return fallback;
  }

  function stripHtml(value) {
    const holder = document.createElement("div");
    holder.innerHTML = String(value || "");
    return (holder.textContent || holder.innerText || "").trim();
  }

  function displayEventVenue(value) {
    const venue = String(value || "").trim();
    if (!venue) return "";
    return venue.split(",")[0].trim();
  }

  function parseEventCoordinates(fields) {
    const latitude = Number.parseFloat(
      String(fields?.eventLatitude || "").trim(),
    );
    const longitude = Number.parseFloat(
      String(fields?.eventLongitude || "").trim(),
    );
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return null;
    }
    return { latitude, longitude };
  }

  function eventMapQuery(fields) {
    const coordinates = parseEventCoordinates(fields);
    if (coordinates) {
      return `${coordinates.latitude},${coordinates.longitude}`;
    }
    return String(fields?.eventVenue || "").trim();
  }

  function buildEventMapEmbedUrl(fields) {
    const query = eventMapQuery(fields);
    if (!query) return "";
    const zoom = parseEventCoordinates(fields) ? "16" : "15";
    return `https://maps.google.com/maps?hl=en&q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
  }

  function buildEventMapLinkUrl(fields) {
    const query = eventMapQuery(fields);
    if (!query) return "";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  function hydrateEventMapSection(root, fields) {
    const section = root?.querySelector?.("[data-event-map-section]");
    if (!section) return;

    const fullVenue = String(fields?.eventVenue || "").trim();
    const displayVenue = displayEventVenue(fullVenue) || fullVenue;
    const coordinates = parseEventCoordinates(fields);
    const embedUrl = buildEventMapEmbedUrl(fields);
    const linkUrl = buildEventMapLinkUrl(fields);
    const frame = section.querySelector("[data-event-map-frame]");
    const venueNode = section.querySelector("[data-event-map-venue]");
    const captionNode = section.querySelector("[data-event-map-caption]");
    const linkNode = section.querySelector("[data-event-map-link]");

    if (!embedUrl) {
      if (frame) frame.innerHTML = "";
      if (linkNode) {
        linkNode.removeAttribute("href");
        linkNode.hidden = true;
      }
      section.hidden = true;
      return;
    }

    if (frame) {
      frame.innerHTML = `<iframe title="Map for ${escapeHtml(displayVenue || "festival event venue")}" src="${escapeHtml(embedUrl)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    }
    if (venueNode) {
      venueNode.textContent = displayVenue || "Venue to be announced";
    }
    if (captionNode) {
      captionNode.textContent = fullVenue
        ? fullVenue
        : coordinates
          ? `Pinned at ${coordinates.latitude.toFixed(5)}, ${coordinates.longitude.toFixed(5)}.`
          : "Check the venue location before you go.";
    }
    if (linkNode) {
      linkNode.href = linkUrl || "#";
      linkNode.hidden = !linkUrl;
    }
    section.hidden = false;
  }

  function slugifyPathToken(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function parsePreviewRecordQuery(value) {
    const source = String(value || "").trim();
    if (!source) return null;
    try {
      const parsed = JSON.parse(source);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (error) {
      console.warn(
        "[TukodPH CMS] Unable to parse cmsPreviewRecord from the preview URL.",
        error,
      );
      return null;
    }
  }

  function previewRecordKeys(record) {
    return [record?.slug, record?.id, previewRecordKey]
      .filter(Boolean)
      .map((value) => slugifyPathToken(value));
  }

  function mergePreviewRecord(records, record) {
    if (!record || typeof record !== "object") return records || {};
    const merged = { ...(records || {}) };
    previewRecordKeys(record).forEach((key) => {
      if (!key) return;
      merged[key] = record;
      merged[`event-${key}`] = record;
    });
    if (record.slug) merged[record.slug] = record;
    if (record.id) merged[record.id] = record;
    return merged;
  }

  function trustedCmsOrigin(origin) {
    try {
      return origin === new URL(apiUrl, window.location.href).origin;
    } catch (error) {
      return false;
    }
  }

  function recordFields(record) {
    return record && typeof record.fields === "object" ? record.fields : {};
  }

  function readBooleanField(value) {
    return value === true || value === 1 || value === "1" || value === "true";
  }

  function eventCategoryValue(recordOrFields) {
    const fields =
      recordOrFields && recordOrFields.fields
        ? recordFields(recordOrFields)
        : recordOrFields || {};
    const value = String(fields.eventCategory || "").trim();
    return EVENT_CATEGORY_OPTIONS.some((option) => option.category === value)
      ? value
      : "";
  }

  function eventCategoryMatches(
    record,
    selectedValue = calendarCategoryFilter,
  ) {
    if (!selectedValue || selectedValue === "all") return true;
    return eventCategoryValue(record) === selectedValue;
  }

  function calendarFilterUsesPagination(
    selectedValue = calendarCategoryFilter,
  ) {
    return true;
  }

  function clampCalendarPage(page, totalPages) {
    const safePage = Number.isFinite(Number(page)) ? Number(page) : 1;
    const safeTotalPages =
      Number.isFinite(Number(totalPages)) && Number(totalPages) > 0
        ? Number(totalPages)
        : 1;
    return Math.min(Math.max(1, Math.trunc(safePage)), safeTotalPages);
  }

  function getField(records, element, attributeName) {
    const recordKey = element.dataset.tukodRecord;
    const fieldName = element.getAttribute(attributeName);
    if (!recordKey || !fieldName) return null;
    const record = records[recordKey];
    const value = record && record.fields ? record.fields[fieldName] : null;
    return typeof value === "string" && value !== "" ? value : null;
  }

  function isEventRecord(record) {
    return (
      String(record?.type || "")
        .trim()
        .toLowerCase() === "event"
    );
  }

  function isCmsManagedEventRecord(record) {
    return (
      isEventRecord(record) &&
      String(record?.author || "")
        .trim()
        .toLowerCase() !== "bootstrap-import"
    );
  }

  function eventDetailHref(record) {
    const page = normalizePath(record?.page || "");
    if (page && page.startsWith("/events/")) {
      return withBasePath(page.endsWith("/") ? page : `${page}/`);
    }
    const slug = String(record?.slug || record?.id || "").trim();
    return slug ? withBasePath(`/events/${slug}/`) : withBasePath("/events/");
  }

  function eventDetailSlug() {
    if (!pathname.startsWith("/events/") || pathname === "/events") return "";
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] !== "events") return "";
    if (parts[1] === "view") {
      return String(
        new URLSearchParams(window.location.search).get("slug") || "",
      )
        .trim()
        .toLowerCase();
    }
    return decodeURIComponent(parts[1] || "")
      .trim()
      .toLowerCase();
  }

  function findEventDetailRecord(records, slug) {
    if (!slug) return null;
    const normalizedSlug = slugifyPathToken(slug);
    return (
      records[slug] ||
      Object.values(records || {}).find(
        (record) =>
          isCmsManagedEventRecord(record) &&
          [
            record?.slug,
            record?.id,
            recordFields(record).heading,
            record?.title,
            normalizePath(record?.page || "")
              .split("/")
              .filter(Boolean)
              .pop() || "",
          ]
            .filter(Boolean)
            .some((value) => slugifyPathToken(value) === normalizedSlug),
      ) ||
      null
    );
  }

  function formatEventDetailDate(startValue, endValue = "") {
    const label = formatEventDateRange(startValue, endValue, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return (
      label || String(startValue || endValue || "").trim() || "To be announced"
    );
  }

  function formatEventDetailBody(value, fallback = "") {
    const source = String(value || fallback || "").trim();
    if (!source) {
      return "<p>More event information will be published here soon.</p>";
    }
    if (/<[a-z][\s\S]*>/i.test(source)) return source;
    return source
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean)
      .map(
        (block) =>
          `<p>${block
            .split(/\n/)
            .map((line) => escapeHtml(line.trim()))
            .filter(Boolean)
            .join("<br>")}</p>`,
      )
      .join("");
  }

  function parseEventDate(value) {
    const raw = String(value || "").trim();
    if (!raw) return null;
    const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
      const [, year, month, day] = isoMatch;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function formatEventDateRange(startValue, endValue, options = {}) {
    const start = parseEventDate(startValue);
    const end = parseEventDate(endValue);
    if (!start && !end) return String(startValue || endValue || "").trim();
    if (!start) return formatEventDateRange(endValue, "", options);
    if (!end || end.getTime() === start.getTime()) {
      return start.toLocaleDateString("en-US", options);
    }
    if (end.getTime() < start.getTime()) {
      return start.toLocaleDateString("en-US", options);
    }

    const sameYear = start.getFullYear() === end.getFullYear();
    const sameMonth = sameYear && start.getMonth() === end.getMonth();
    const includeYear = options.year === "numeric";

    if (sameMonth) {
      const monthLabel = start.toLocaleString("en-US", {
        month: options.month || "long",
      });
      return includeYear
        ? `${monthLabel} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`
        : `${monthLabel} ${start.getDate()}–${end.getDate()}`;
    }

    const startText = start.toLocaleDateString("en-US", {
      month: options.month || "long",
      day: options.day || "numeric",
      ...(sameYear && !includeYear ? {} : { year: "numeric" }),
    });
    const endText = end.toLocaleDateString("en-US", {
      month: options.month || "long",
      day: options.day || "numeric",
      ...(includeYear || !sameYear ? { year: "numeric" } : {}),
    });
    return `${startText} – ${endText}`;
  }

  function sortEvents(left, right) {
    const leftDate = parseEventDate(recordFields(left).eventDate);
    const rightDate = parseEventDate(recordFields(right).eventDate);
    if (leftDate && rightDate && leftDate.getTime() !== rightDate.getTime()) {
      return leftDate.getTime() - rightDate.getTime();
    }
    if (leftDate && !rightDate) return -1;
    if (!leftDate && rightDate) return 1;
    return String(recordFields(left).heading || left.title || "").localeCompare(
      String(recordFields(right).heading || right.title || ""),
    );
  }

  function formatCardDate(value) {
    const parsed = parseEventDate(value);
    if (!parsed) return { day: "TBA", month: "" };
    return {
      day: String(parsed.getDate()),
      month: parsed.toLocaleString("en-US", { month: "short" }),
    };
  }

  function formatCalendarDate(startValue, endValue = "") {
    const label = formatEventDateRange(startValue, endValue, {
      month: "short",
      day: "numeric",
    });
    return label || "TBA";
  }

  function countdownTargetValue(dateValue, timeValue = "") {
    const date = String(dateValue || "").trim();
    if (!date) return "";
    const time = String(timeValue || "").trim();
    if (!time) return date;
    if (/^\d{2}:\d{2}$/.test(time)) return `${date}T${time}:00+08:00`;
    return date;
  }

  function isHomepageFeaturedEvent(record) {
    return Boolean(recordFields(record).featuredHomepageEvent);
  }

  function isMainHomepageEvent(record) {
    return Boolean(recordFields(record).mainHomepageEvent);
  }

  function homepageFeaturedEvents(records, limit = 5) {
    return records
      .filter(
        (record) =>
          isHomepageFeaturedEvent(record) || isMainHomepageEvent(record),
      )
      .sort((left, right) => {
        const mainDifference =
          Number(isMainHomepageEvent(right)) -
          Number(isMainHomepageEvent(left));
        return mainDifference || sortEvents(left, right);
      })
      .slice(0, limit);
  }

  function isEventsPageFeaturedEvent(record) {
    return Boolean(recordFields(record).featuredEvent);
  }

  function isSiteWidgetRecord(record) {
    return recordFields(record).widgetKind === "site-widget";
  }

  function siteWidgetIsEnabled(record) {
    const fields = recordFields(record);
    return (
      fields.widgetEnabled === undefined ||
      readBooleanField(fields.widgetEnabled)
    );
  }

  function findRecordById(records, id) {
    const key = String(id || "").trim();
    if (!key) return null;
    if (records[key]) return records[key];
    return (
      Object.values(records || {}).find((record) => {
        return record && (record.id === key || record.slug === key);
      }) || null
    );
  }

  function widgetPageTarget(record, pathname) {
    const targets = Array.isArray(record?.targets) ? record.targets : [];
    const exactTarget =
      targets.find(
        (target) => normalizePath(target?.page || "/") === pathname,
      ) || null;
    if (exactTarget) return exactTarget;
    const isEventDetail =
      pathname.startsWith("/events/") && pathname !== "/events";
    if (isEventDetail) {
      const eventDetailTarget =
        targets.find(
          (target) => normalizePath(target?.page || "/") === "/events/view",
        ) || null;
      if (eventDetailTarget) return eventDetailTarget;
      if (widgetType(record) === "partner-recognition") {
        return (
          targets.find(
            (target) => normalizePath(target?.page || "/") === "/events",
          ) || null
        );
      }
    }
    return null;
  }

  function parseWidgetSectionKey(sectionKey) {
    const clean = String(sectionKey || "end-of-page").trim() || "end-of-page";
    if (!clean || clean === "end-of-page") {
      return { position: "end-of-page", anchorId: "" };
    }
    const matched = clean.match(/^(before|after)-(.+)$/);
    if (matched) return { position: matched[1], anchorId: matched[2] };
    return { position: "after", anchorId: clean };
  }

  function widgetOrder(record) {
    return Number(recordFields(record).widgetOrder || 0);
  }

  function findSlotAnchor(pathname, anchorId) {
    if (!anchorId) return null;
    const direct = document.querySelector(
      `[data-tukod-slot-anchor="${anchorId}"]`,
    );
    if (direct) return direct;
    const inheritedPath =
      pathname.startsWith("/events/") && pathname !== "/events"
        ? "/events"
        : pathname;
    const selector =
      legacySlotSelectorsByPage[pathname]?.[anchorId] ||
      legacySlotSelectorsByPage[inheritedPath]?.[anchorId] ||
      "";
    return selector ? document.querySelector(selector) : null;
  }

  function firstSectionStyle(section, selectors) {
    const element = section?.querySelector(selectors);
    return element ? window.getComputedStyle(element) : null;
  }

  const TEMPLATE_FONT_STACK = '"Outfit", ui-sans-serif, system-ui, sans-serif';

  function normalizeTemplateFontFamily(value) {
    if (!value || typeof value !== "string") return TEMPLATE_FONT_STACK;
    const normalized = value.toLowerCase();
    if (
      normalized.includes("outfit") ||
      normalized.includes("system-ui") ||
      normalized.includes("ui-sans-serif") ||
      normalized.includes("sans-serif")
    ) {
      return TEMPLATE_FONT_STACK;
    }
    return value;
  }

  function sectionSurfaceStyle(section) {
    let element = section;
    while (element) {
      const style = window.getComputedStyle(element);
      if (
        style.backgroundImage !== "none" ||
        (style.backgroundColor &&
          style.backgroundColor !== "transparent" &&
          style.backgroundColor !== "rgba(0, 0, 0, 0)")
      ) {
        return style;
      }
      element = element.parentElement;
    }
    return section ? window.getComputedStyle(section) : null;
  }

  function inheritSiteWidgetSectionStyle(widget, pathname, sectionKey) {
    const parsed = parseWidgetSectionKey(sectionKey);
    if (!widget || parsed.position === "end-of-page" || !parsed.anchorId) {
      return widget;
    }
    const section = findSlotAnchor(pathname, parsed.anchorId);
    if (!section) return widget;

    const sectionStyle = window.getComputedStyle(section);
    const surfaceStyle = sectionSurfaceStyle(section) || sectionStyle;
    const headingStyle = firstSectionStyle(section, "h1, h2, h3");
    const bodyStyle = firstSectionStyle(
      section,
      "p:not(.eyebrow):not([class*='kicker']):not([class*='label'])",
    );
    const accentStyle = firstSectionStyle(
      section,
      ".eyebrow, [class*='eyebrow'], [class*='kicker'], [class*='label']",
    );
    const linkStyle = firstSectionStyle(
      section,
      "a[class*='button'], a[class*='cta'], button, a",
    );
    const tokens = {
      "--tukod-widget-background-color": surfaceStyle.backgroundColor,
      "--tukod-widget-background-image": surfaceStyle.backgroundImage,
      "--tukod-widget-background-position": surfaceStyle.backgroundPosition,
      "--tukod-widget-background-size": surfaceStyle.backgroundSize,
      "--tukod-widget-background-repeat": surfaceStyle.backgroundRepeat,
      "--tukod-widget-color": sectionStyle.color,
      "--tukod-widget-font-family": normalizeTemplateFontFamily(
        sectionStyle.fontFamily,
      ),
      "--tukod-widget-heading-color": headingStyle?.color || sectionStyle.color,
      "--tukod-widget-heading-font-family": normalizeTemplateFontFamily(
        headingStyle?.fontFamily || sectionStyle.fontFamily,
      ),
      "--tukod-widget-body-color": bodyStyle?.color || sectionStyle.color,
      "--tukod-widget-accent-color":
        accentStyle?.color || linkStyle?.color || sectionStyle.color,
      "--tukod-widget-link-color":
        linkStyle?.color || accentStyle?.color || sectionStyle.color,
      "--tukod-widget-border-radius": sectionStyle.borderRadius,
      "--tukod-widget-box-shadow": sectionStyle.boxShadow,
    };
    Object.entries(tokens).forEach(([name, value]) => {
      if (value) widget.style.setProperty(name, value);
    });
    widget.dataset.tukodStyleSource = parsed.anchorId;
    return widget;
  }

  function addSiteWidgetStyles() {
    if (document.querySelector("#tukod-cms-site-widget-styles")) return;
    const style = document.createElement("style");
    style.id = "tukod-cms-site-widget-styles";
    style.textContent = `
      .tukod-site-widget {
        width: min(1180px, calc(100% - 40px));
        margin: 28px auto;
        border-radius: var(--tukod-widget-border-radius, 28px);
        overflow: hidden;
        background-color: var(--tukod-widget-background-color, rgba(255,248,240,.94));
        background-image: var(--tukod-widget-background-image, linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,248,240,.94)));
        background-position: var(--tukod-widget-background-position, initial);
        background-size: var(--tukod-widget-background-size, auto);
        background-repeat: var(--tukod-widget-background-repeat, repeat);
        color: var(--tukod-widget-color, #192228);
        font-family: var(--tukod-widget-font-family, ${TEMPLATE_FONT_STACK});
        box-shadow: var(--tukod-widget-box-shadow, 0 20px 50px rgba(21, 25, 29, .12));
      }
      .tukod-site-widget.tukod-site-widget-image {
        background: transparent;
        box-shadow: none;
      }
      .tukod-site-widget-inner {
        display: grid;
        gap: 18px;
        padding: clamp(22px, 4vw, 38px);
      }
      .tukod-site-widget.has-image .tukod-site-widget-inner {
        grid-template-columns: minmax(0, 1.1fr) minmax(260px, .9fr);
        align-items: center;
      }
      .tukod-site-widget-kicker {
        margin: 0 0 8px;
        color: var(--tukod-widget-accent-color, #d05c2a);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .16em;
        text-transform: uppercase;
      }
      .tukod-site-widget h3 {
        margin: 0;
        color: var(--tukod-widget-heading-color, #192228);
        font-family: var(--tukod-widget-heading-font-family, ${TEMPLATE_FONT_STACK});
        font-size: clamp(28px, 4vw, 42px);
        line-height: 1;
      }
      .tukod-site-widget p {
        margin: 0;
        color: var(--tukod-widget-body-color, #42515c);
        font-size: 16px;
        line-height: 1.7;
      }
      .tukod-site-widget-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 14px;
      }
      .tukod-site-widget-meta span {
        padding: 8px 12px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--tukod-widget-accent-color, #186865) 10%, transparent);
        color: var(--tukod-widget-accent-color, #186865);
        font-size: 12px;
        font-weight: 700;
      }
      .tukod-site-widget-cta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 18px;
        color: var(--tukod-widget-link-color, #192228);
        font-weight: 700;
        text-decoration: none;
      }
      .tukod-site-widget-media img {
        display: block;
        width: 100%;
        border-radius: var(--tukod-widget-border-radius, 22px);
        object-fit: cover;
      }
      .tukod-site-widget-image img {
        display: block;
        width: min(1180px, calc(100% - 40px));
        margin: 0 auto;
        border-radius: 28px;
        object-fit: cover;
        box-shadow: 0 18px 44px rgba(21, 25, 29, .12);
      }
      .tukod-site-widget-faq {
        width: min(1230px, calc(100% - 40px));
        margin: 0 auto;
        background: transparent;
        box-shadow: none;
        border-radius: 0;
      }
      .tukod-site-widget-faq .tukod-site-widget-inner {
        gap: 34px;
        padding: 0;
      }
      .tukod-faq-heading {
        display: grid;
        grid-template-columns: minmax(170px, 280px) minmax(0, 1fr);
        gap: 22px 36px;
        align-items: start;
      }
      .tukod-faq-heading-copy {
        max-width: 640px;
        justify-self: end;
      }
      .tukod-faq-heading .eyebrow {
        margin: 0;
        padding-top: 14px;
        color: var(--red, #e72f2d);
      }
      .tukod-faq-heading h2 {
        margin: 0;
        color: var(--navy, #11304f);
        font-size: clamp(3rem, 5vw, 5rem);
        line-height: .92;
        letter-spacing: -.04em;
      }
      .tukod-faq-heading p:not(.eyebrow) {
        margin-top: 14px;
        max-width: 46ch;
      }
      .tukod-faq-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 28px;
        row-gap: 0;
        align-items: start;
      }
      .tukod-faq-column {
        display: grid;
        gap: 0;
        align-content: start;
      }
      .tukod-faq-item {
        border-bottom: 1px solid rgba(17, 48, 79, .16);
        background: transparent;
        align-self: start;
      }
      .tukod-faq-item summary {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 16px;
        cursor: pointer;
        list-style: none;
        padding: 26px 0 20px;
        font-size: clamp(1rem, 1.35vw, 1.15rem);
        font-weight: 800;
        line-height: 1.25;
        color: var(--teal, #12a7a2);
        text-transform: uppercase;
      }
      .tukod-faq-item summary::-webkit-details-marker {
        display: none;
      }
      .tukod-faq-item summary::after {
        content: "+";
        float: right;
        color: var(--tukod-widget-accent-color, #d05c2a);
        font-size: 1.1rem;
      }
      .tukod-faq-item[open] summary::after {
        content: "−";
      }
      .tukod-faq-answer {
        padding: 0 22px 20px;
      }
      .tukod-faq-item summary::after {
        float: none;
        color: var(--blue, #008fd3);
        font-size: 1.9rem;
        font-weight: 500;
        line-height: 1;
      }
      .tukod-faq-item[open] summary::after {
        content: "−";
      }
      .tukod-faq-answer {
        padding: 0 0 22px;
      }
      .tukod-faq-answer p {
        max-width: 52ch;
      }
      .tukod-faq-item summary::after {
        transform-origin: center;
        transition:
          transform .28s ease,
          color .28s ease;
      }
      .tukod-faq-item[open] summary::after {
        content: "+";
        transform: rotate(45deg);
      }
      .tukod-faq-answer {
        display: grid;
        grid-template-rows: 0fr;
        padding: 0;
        opacity: 0;
        transition:
          grid-template-rows .32s ease,
          opacity .24s ease,
          padding .24s ease;
      }
      .tukod-faq-item[open] .tukod-faq-answer {
        grid-template-rows: 1fr;
        padding: 0 0 22px;
        opacity: 1;
      }
      .tukod-faq-answer-inner {
        overflow: hidden;
      }
      .tukod-faq-answer p {
        margin: 0;
      }
      [data-tukod-homepage-slot-hidden="true"],
      [data-tukod-slot-hidden-by-widget="true"] {
        display: none !important;
      }
      @media (max-width: 900px) {
        .tukod-faq-heading,
        .tukod-faq-list {
          grid-template-columns: 1fr;
        }
        .tukod-faq-heading-copy {
          justify-self: start;
        }
        .tukod-faq-heading .eyebrow {
          padding-top: 0;
        }
      }
      @media (max-width: 780px) {
        .tukod-site-widget.has-image .tukod-site-widget-inner {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const slotOwningWidgetTypes = new Set([
    "hero",
    "faq-list",
    "cta",
    "ticker-band",
    "featured",
    "partner-recognition",
    "about",
    "story",
    "value-strip",
    "explore",
    "visit-band",
    "calendar-of-events",
    "sponsor-list",
    "contact-form",
  ]);

  const supportedSiteWidgetTypes = new Set([
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
  ]);

  const widgetTypeAliases = {
    "homepage-hero": "hero",
    "homepage-ticker-band": "ticker-band",
    "featured-events-feed": "featured",
    "homepage-partner-recognition": "partner-recognition",
    "homepage-about": "about",
    "homepage-explore": "explore",
    "homepage-visit-band": "visit-band",
  };

  const widgetContentCategories = {
    hero: "hero",
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
  };

  function widgetType(record) {
    const raw = String(recordFields(record).widgetType || "").trim();
    return widgetTypeAliases[raw] || raw;
  }

  function hasFaqWidgetSource(record) {
    const config = widgetConfig(record);
    return (
      Array.isArray(config.faqItems) &&
      config.faqItems.some(
        (item) =>
          item &&
          item.enabled !== false &&
          (String(item.question || "").trim() ||
            String(item.answer || "").trim()),
      )
    );
  }

  function widgetSourceRecord(records, record) {
    const source = findRecordById(records, recordFields(record).widgetSourceId);
    if (!source) return null;
    const requiredCategory = widgetContentCategories[widgetType(record)] || "";
    if (
      requiredCategory &&
      String(recordFields(source).contentCategory || "general") !==
        requiredCategory &&
      !(widgetType(record) === "faq-list" && hasFaqWidgetSource(source))
    ) {
      return null;
    }
    return source;
  }

  function setContactFormStatus(statusNode, kind, message) {
    if (!statusNode) return;
    statusNode.textContent = message;
    statusNode.dataset.statusKind = kind;
    statusNode.setAttribute("role", kind === "error" ? "alert" : "status");
  }

  function publishedEventRecords(records) {
    return Object.values(records || {})
      .filter((record) => record && isCmsManagedEventRecord(record))
      .sort(sortEvents);
  }

  function widgetOwnsSlot(record) {
    return slotOwningWidgetTypes.has(widgetType(record));
  }

  function hasSlotOwnerWidget(records, anchorId, type = "") {
    return Object.values(records || {}).some((record) => {
      if (!record || !isSiteWidgetRecord(record)) return false;
      if (!siteWidgetIsEnabled(record)) return false;
      if (type && widgetType(record) !== type) return false;
      if (!widgetOwnsSlot(record)) return false;
      const target = widgetPageTarget(record, pathname);
      const parsed = parseWidgetSectionKey(target?.section || "");
      return parsed.anchorId === anchorId;
    });
  }

  function clearManagedSlotVisibility() {
    document
      .querySelectorAll('[data-tukod-slot-hidden-by-widget="true"]')
      .forEach((element) => {
        element.hidden = false;
        element.removeAttribute("data-tukod-slot-hidden-by-widget");
      });
  }

  function hideLegacyHomepageSlots() {
    if (pathname !== "/") return;
    Object.keys(legacySlotSelectorsByPage["/"]).forEach((anchorId) => {
      const anchor = findSlotAnchor(pathname, anchorId);
      if (!anchor) return;
      anchor.hidden = true;
      anchor.dataset.tukodHomepageSlotHidden = "true";
    });
  }

  function hideManagedSlot(sectionKey) {
    const parsed = parseWidgetSectionKey(sectionKey);
    if (parsed.position === "end-of-page" || !parsed.anchorId) return;
    const anchor = findSlotAnchor(pathname, parsed.anchorId);
    if (!anchor) return;
    anchor.hidden = true;
    anchor.dataset.tukodSlotHiddenByWidget = "true";
  }

  function sectionHeadingContent(source, fallback = {}) {
    const fields = recordFields(source);
    return {
      eyebrow: fields.eyebrow || fallback.eyebrow || "",
      title: fields.heading || source?.title || fallback.title || "",
      summary: stripHtml(
        fields.summary ||
          source?.excerpt ||
          fields.body ||
          fallback.summary ||
          "",
      ),
      ctaLabel: fields.ctaLabel || fallback.ctaLabel || "",
      ctaUrl: safeHref(fields.ctaUrl || fallback.ctaUrl || "", ""),
    };
  }

  function buildSectionHeadingMarkup(content = {}) {
    const parts = [];
    if (content.eyebrow) {
      parts.push(`<p class="eyebrow">${escapeHtml(content.eyebrow)}</p>`);
    }
    if (content.title) {
      parts.push(`<h2>${escapeHtml(content.title)}</h2>`);
    }
    if (content.summary) {
      parts.push(`<p>${escapeHtml(content.summary)}</p>`);
    }
    if (content.ctaLabel && content.ctaUrl) {
      parts.push(
        `<a class="text-link" href="${escapeHtml(content.ctaUrl)}">${escapeHtml(content.ctaLabel)}</a>`,
      );
    }
    return `<div class="section-heading">${parts.join("")}</div>`;
  }

  function widgetConfig(source) {
    const raw = recordFields(source).widgetConfig;
    if (!raw) return {};
    if (typeof raw === "object" && !Array.isArray(raw)) return raw;
    try {
      const parsed = JSON.parse(String(raw));
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? parsed
        : {};
    } catch (error) {
      console.warn(
        `[TukodPH CMS] Invalid widgetConfig JSON for "${source?.id || source?.slug || "content record"}".`,
      );
      return {};
    }
  }

  function configItems(configValue) {
    return Array.isArray(configValue?.items) ? configValue.items : [];
  }

  function buildContentAction(label, url, className = "button primary") {
    if (!label || !url) return "";
    const safeUrl = safeHref(url, "#");
    const modalClass =
      safeUrl === "#partner-modal"
        ? " partner-modal-trigger"
        : safeUrl === "#volunteer-modal"
          ? " volunteer-modal-trigger"
          : "";
    if (modalClass) {
      return `<button class="${escapeHtml(className)}${modalClass}" type="button">${escapeHtml(label)}</button>`;
    }
    return `<a class="${escapeHtml(className)}" href="${escapeHtml(safeUrl)}">${escapeHtml(label)}</a>`;
  }

  function buildHeroNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const fields = recordFields(source);
    const configValue = widgetConfig(source);
    const target = widgetPageTarget(record, pathname);
    const targetAnchor = parseWidgetSectionKey(target?.section || "").anchorId;
    const isHomepageHero = pathname === "/" && targetAnchor === "home-hero";
    if (!isHomepageHero) {
      const section = document.createElement("section");
      section.className = "page-hero tukod-widget-page-hero";
      const media = fields.image
        ? `<img class="page-hero-media" src="${escapeHtml(safeHref(fields.image, ""))}" alt="${escapeHtml(fields.imageAlt || fields.heading || source.title || "Festival hero image")}">`
        : "";
      const mediaCredit = fields.imageCopyright
        ? `<span class="page-hero-credit">${escapeHtml(fields.imageCopyright)}</span>`
        : "";
      section.innerHTML = `
        ${media}
        <div class="ornament page-ornament" aria-hidden="true"></div>
        <div class="page-hero-content">
          ${fields.eyebrow ? `<p class="eyebrow">${escapeHtml(fields.eyebrow)}</p>` : ""}
          ${fields.heading || source.title ? `<h1>${escapeHtml(fields.heading || source.title)}</h1>` : ""}
          ${fields.summary || source.excerpt ? `<p>${escapeHtml(fields.summary || source.excerpt)}</p>` : ""}
          ${buildContentAction(fields.ctaLabel, fields.ctaUrl)}
        </div>
        ${mediaCredit}`;
      return section;
    }
    const configuredSlides = Array.isArray(configValue.slides)
      ? configValue.slides
      : [];
    const slides = [];
    if (fields.image) {
      slides.push({
        image: fields.image,
        alt: fields.imageAlt || fields.heading,
        copyright: fields.imageCopyright || "",
      });
    }
    configuredSlides
      .filter((slide) => slide?.image)
      .forEach((slide) => {
        if (
          fields.image &&
          String(slide.image || "").trim() === String(fields.image).trim()
        ) {
          return;
        }
        slides.push(slide);
      });
    const countdown = findRecordById(
      records,
      String(configValue.countdownRecordId || "home-countdown"),
    );
    const countdownFields = recordFields(countdown);
    const countdownVisible =
      countdown &&
      countdownFields.eventDate &&
      !readBooleanField(countdownFields.hideCountdown);
    const countdownTarget = countdownTargetValue(
      countdownFields.eventDate,
      countdownFields.eventTime,
    );
    const secondaryCta =
      configValue.secondaryCta && typeof configValue.secondaryCta === "object"
        ? configValue.secondaryCta
        : {};
    const section = document.createElement("section");
    section.className = "hero home-hero";
    const media = slides.length
      ? `<div class="hero-media hero-carousel" aria-label="${escapeHtml(configValue.carouselLabel || "Festival moments")}">
          ${slides
            .map(
              (slide, index) =>
                `<img class="hero-slide${index === 0 ? " is-active" : ""}" src="${escapeHtml(safeHref(slide.image, ""))}" alt="${escapeHtml(slide.alt || fields.imageAlt || fields.heading || "Festival moment")}" data-credit="${escapeHtml(slide.copyright || fields.imageCopyright || "")}">`,
            )
            .join("")}
        </div>`
      : "";
    const dots =
      slides.length > 1
        ? `<div class="hero-carousel-dots" aria-label="Hero image carousel status">
            ${slides
              .map(
                (_, index) =>
                  `<span class="${index === 0 ? "is-active" : ""}" aria-hidden="true"></span>`,
              )
              .join("")}
          </div>`
        : "";
    const countdownMarkup = countdownVisible
      ? `<div class="hero-countdown" aria-label="${escapeHtml(countdownFields.heading || "Festival countdown")}" data-countdown data-countdown-enabled="true" data-countdown-target="${escapeHtml(countdownTarget)}" data-tukod-record="${escapeHtml(countdown.id || countdown.slug || "home-countdown")}" data-tukod-date-field="eventDate">
          <span class="countdown-label">${escapeHtml(countdownFields.heading || "")}</span>
          <div class="hero-countdown-grid">
            <div class="countdown-unit"><strong data-countdown-value="days">00</strong><span>Days</span></div>
            <div class="countdown-unit"><strong data-countdown-value="hours">00</strong><span>Hours</span></div>
            <div class="countdown-unit"><strong data-countdown-value="minutes">00</strong><span>Min</span></div>
            <div class="countdown-unit"><strong data-countdown-value="seconds">00</strong><span>Sec</span></div>
          </div>
        </div>`
      : "";
    const primaryCta =
      fields.ctaLabel && fields.ctaUrl
        ? `<a class="button primary" href="${escapeHtml(safeHref(fields.ctaUrl, "#"))}">${escapeHtml(fields.ctaLabel)}</a>`
        : "";
    const secondaryCtaMarkup =
      secondaryCta.label && secondaryCta.url
        ? `<a class="button secondary" href="${escapeHtml(safeHref(secondaryCta.url, "#"))}">${escapeHtml(secondaryCta.label)}</a>`
        : "";
    const heroCreditText = String(
      slides[0]?.copyright || fields.imageCopyright || "",
    ).trim();
    const heroCreditMarkup = heroCreditText
      ? `<span class="home-hero-credit" data-hero-credit>${escapeHtml(heroCreditText)}</span>`
      : "";
    section.innerHTML = `
      <div class="ornament ornament-left" aria-hidden="true"></div>
      <div class="ornament ornament-right" aria-hidden="true"></div>
      ${media}
      <div class="hero-content">
        ${fields.eyebrow ? `<p class="eyebrow">${escapeHtml(fields.eyebrow)}</p>` : ""}
        ${fields.heading || source.title ? `<h1>${escapeHtml(fields.heading || source.title)}</h1>` : ""}
        ${countdownMarkup}
        ${fields.summary || source.excerpt ? `<p>${escapeHtml(fields.summary || source.excerpt)}</p>` : ""}
        ${primaryCta || secondaryCtaMarkup ? `<div class="hero-actions">${primaryCta}${secondaryCtaMarkup}</div>` : ""}
      </div>
      ${dots}
      ${heroCreditMarkup}`;
    return section;
  }

  function buildTickerIconMarkup(iconName = "") {
    const icons = {
      river:
        '<path d="M5 12h14l-3 5H8l-3-5Z"/><path d="M8 12l3-5h4l2 5"/><path d="M12 7V4"/><path d="M3 20c2 1 4 1 6 0s4-1 6 0 4 1 6 0"/>',
      food: '<path d="M7 3v8"/><path d="M5 3v4c0 2 4 2 4 0V3"/><path d="M16 3v18"/><path d="M16 3c3 2 3 6 0 8"/><path d="M5 21h14"/>',
      heritage:
        '<path d="M4 20h16"/><path d="M6 20V9l6-4 6 4v11"/><path d="M10 20v-6h4v6"/><path d="M9 9h6"/>',
      music:
        '<path d="M9 18V5l10-2v13"/><path d="M9 9l10-2"/><path d="M7 18a3 3 0 1 0 2 2.8V18H7Z"/><path d="M17 16a3 3 0 1 0 2 2.8V16h-2Z"/>',
      parade:
        '<path d="M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M16 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M4 14c.8-3 2.2-5 4-5s3.2 2 4 5"/><path d="M12 14c.8-3 2.2-5 4-5s3.2 2 4 5"/><path d="M7 14l-2 6"/><path d="M9 14l2 6"/><path d="M15 14l-2 6"/><path d="M17 14l2 6"/><path d="M10 11h4"/>',
    };
    return `<svg aria-hidden="true" viewBox="0 0 24 24">${icons[iconName] || icons.parade}</svg>`;
  }

  function buildTickerBandNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const items = configItems(widgetConfig(source)).filter(
      (item) => item?.label,
    );
    if (!items.length) return null;
    const section = document.createElement("section");
    section.className = "ticker-band";
    section.setAttribute(
      "aria-label",
      recordFields(source).heading || "Festival highlights",
    );
    section.innerHTML = items
      .map(
        (item) =>
          `<span>${buildTickerIconMarkup(item.icon)}<span class="ticker-label">${escapeHtml(item.label)}</span></span>`,
      )
      .join("");
    return section;
  }

  function buildPartnerRecognitionNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const fields = recordFields(source);
    const items = configItems(widgetConfig(source)).filter(
      (item) => item?.image,
    );
    if (!items.length) return null;
    const section = document.createElement("section");
    section.className = "partner-recognition";
    section.innerHTML = `
      <div class="partner-recognition-copy">
        ${fields.eyebrow || fields.heading ? `<p class="eyebrow">${escapeHtml(fields.eyebrow || fields.heading)}</p>` : ""}
      </div>
      <div class="partner-logo-strip" aria-label="${escapeHtml(fields.heading || "Featured festival partner logos")}">
        ${items
          .map((item) => {
            const image = `<img src="${escapeHtml(safeHref(item.image, ""))}" alt="${escapeHtml(item.alt || "Festival partner logo")}">`;
            return item.url
              ? `<a href="${escapeHtml(safeHref(item.url, "#"))}">${image}</a>`
              : image;
          })
          .join("")}
      </div>`;
    return section;
  }

  function buildAboutNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const heading = sectionHeadingContent(source);
    const items = configItems(widgetConfig(source)).filter(
      (item) => item?.title,
    );
    const section = document.createElement("section");
    section.className = "section about-preview";
    section.innerHTML = `
      <div class="section-heading center">
        ${heading.eyebrow ? `<p class="eyebrow">${escapeHtml(heading.eyebrow)}</p>` : ""}
        ${heading.title ? `<h2>${escapeHtml(heading.title)}</h2>` : ""}
        ${heading.summary ? `<p>${escapeHtml(heading.summary)}</p>` : ""}
      </div>
      ${
        items.length
          ? `<div class="story-grid">${items
              .map(
                (item) =>
                  `<article><span class="mini-icon ${escapeHtml(item.tone || "yellow")}"></span><h3>${escapeHtml(item.title)}</h3>${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ""}</article>`,
              )
              .join("")}</div>`
          : ""
      }`;
    return section;
  }

  function buildStoryNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const fields = recordFields(source);
    const heading = sectionHeadingContent(source);
    const body = stripHtml(fields.body || "");
    const imageCredit = String(fields.imageCopyright || "").trim();
    const image = fields.image
      ? `<figure class="story-image-card"><img src="${escapeHtml(safeHref(fields.image, ""))}" alt="${escapeHtml(fields.imageAlt || heading.title || "Festival story image")}">${imageCredit ? `<span class="event-image-credit">${escapeHtml(imageCredit)}</span>` : ""}</figure>`
      : "";
    const section = document.createElement("section");
    section.className = "section story-section";
    section.innerHTML = `
      <div class="story-copy">
        ${heading.eyebrow ? `<p class="eyebrow">${escapeHtml(heading.eyebrow)}</p>` : ""}
        ${heading.title ? `<h2>${escapeHtml(heading.title)}</h2>` : ""}
        ${heading.summary ? `<p>${escapeHtml(heading.summary)}</p>` : ""}
        ${body ? `<p>${escapeHtml(body)}</p>` : ""}
        ${heading.ctaLabel && heading.ctaUrl ? `<a class="text-link" href="${escapeHtml(heading.ctaUrl)}">${escapeHtml(heading.ctaLabel)}</a>` : ""}
      </div>
      ${image}`;
    return section;
  }

  function buildValueStripNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const items = configItems(widgetConfig(source)).filter(
      (item) => item?.title || item?.label,
    );
    const section = document.createElement("section");
    section.className = "section value-strip";
    section.innerHTML = items
      .map(
        (item) =>
          `<article><span class="mini-icon ${escapeHtml(item.tone || "yellow")}"></span><h3>${escapeHtml(item.title || item.label)}</h3>${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ""}</article>`,
      )
      .join("");
    return section;
  }

  function buildExploreNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const heading = sectionHeadingContent(source);
    const target = widgetPageTarget(record, pathname);
    const targetAnchor = parseWidgetSectionKey(target?.section || "").anchorId;
    const configuredItems = configItems(widgetConfig(source));
    if (targetAnchor === "split-section") {
      const paths = configuredItems.filter((item) => item?.title);
      const section = document.createElement("section");
      section.className = "section split-section";
      section.innerHTML = `
        <div>
          ${heading.eyebrow ? `<p class="eyebrow">${escapeHtml(heading.eyebrow)}</p>` : ""}
          ${heading.title ? `<h2>${escapeHtml(heading.title)}</h2>` : ""}
          ${heading.summary ? `<p>${escapeHtml(heading.summary)}</p>` : ""}
          ${heading.ctaLabel && heading.ctaUrl ? `<a class="text-link" href="${escapeHtml(heading.ctaUrl)}">${escapeHtml(heading.ctaLabel)}</a>` : ""}
        </div>
        <div class="path-list">
          ${paths
            .map(
              (item) =>
                `<article><strong>${escapeHtml(item.title)}</strong>${item.summary ? `<span>${escapeHtml(item.summary)}</span>` : ""}</article>`,
            )
            .join("")}
        </div>`;
      return section;
    }
    const items = configuredItems.filter((item) => item?.title && item?.url);
    const section = document.createElement("section");
    section.className = "section explore-section";
    section.innerHTML = `${buildSectionHeadingMarkup(heading)}
      ${
        items.length
          ? `<div class="explore-grid">${items
              .map(
                (item) =>
                  `<a class="explore-card" href="${escapeHtml(safeHref(item.url, "#"))}">${item.label ? `<span>${escapeHtml(item.label)}</span>` : ""}<strong>${escapeHtml(item.title)}</strong></a>`,
              )
              .join("")}</div>`
          : ""
      }`;
    return section;
  }

  function buildVisitBandNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const heading = sectionHeadingContent(source);
    const items = configItems(widgetConfig(source)).filter(
      (item) => item?.title,
    );
    const section = document.createElement("section");
    section.className = "section visit-band";
    section.id = "visit";
    section.innerHTML = `
      <div>
        ${heading.eyebrow ? `<p class="eyebrow">${escapeHtml(heading.eyebrow)}</p>` : ""}
        ${heading.title ? `<h2>${escapeHtml(heading.title)}</h2>` : ""}
        ${heading.summary ? `<p>${escapeHtml(heading.summary)}</p>` : ""}
      </div>
      ${
        items.length
          ? `<div class="visit-grid">${items
              .map(
                (item) =>
                  `<article><h3>${escapeHtml(item.title)}</h3>${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ""}</article>`,
              )
              .join("")}</div>`
          : ""
      }`;
    return section;
  }

  function buildFeaturedSectionNode(records, record) {
    const target = widgetPageTarget(record, pathname);
    const parsed = parseWidgetSectionKey(target?.section || "");
    const isHomepageSlot =
      pathname === "/" || parsed.anchorId === "feature-section";
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const sourceFields = recordFields(source);
    const configValue = widgetConfig(source);
    if (configValue.mode !== "events") {
      const title = sourceFields.heading || source.title || "";
      const summary = stripHtml(
        sourceFields.summary || source.excerpt || sourceFields.body || "",
      );
      const image = sourceFields.image
        ? `<div class="tukod-site-widget-media"><img src="${escapeHtml(sourceFields.image)}" alt="${escapeHtml(sourceFields.imageAlt || title)}"></div>`
        : "";
      const section = document.createElement("section");
      section.className = `tukod-site-widget tukod-site-widget-featured${image ? " has-image" : ""}`;
      section.innerHTML = `<div class="tukod-site-widget-inner">
        <div>
          ${sourceFields.eyebrow ? `<p class="tukod-site-widget-kicker">${escapeHtml(sourceFields.eyebrow)}</p>` : ""}
          ${title ? `<h3>${escapeHtml(title)}</h3>` : ""}
          ${summary ? `<p>${escapeHtml(summary)}</p>` : ""}
          ${
            sourceFields.ctaLabel && sourceFields.ctaUrl
              ? `<a class="tukod-site-widget-cta" href="${escapeHtml(safeHref(sourceFields.ctaUrl, "#"))}">${escapeHtml(sourceFields.ctaLabel)}</a>`
              : ""
          }
        </div>
        ${image}
      </div>`;
      return section;
    }
    const events = publishedEventRecords(records);
    const featuredEvents = isHomepageSlot
      ? homepageFeaturedEvents(events)
      : events.filter(isEventsPageFeaturedEvent).slice(0, 6);
    const heading = buildSectionHeadingMarkup(sectionHeadingContent(source));
    const section = document.createElement("section");
    section.className = isHomepageSlot ? "section feature-section" : "section";
    if (isHomepageSlot) section.id = "featured-events";
    section.innerHTML = `${heading}
      <div class="event-grid${isHomepageSlot ? "" : " six-grid"}">
        ${
          featuredEvents.length
            ? isHomepageSlot
              ? buildHomepageFeaturedMarkup(featuredEvents)
              : buildFeaturedMarkup(featuredEvents)
            : buildEmptyFeaturedMarkup(
                isHomepageSlot
                  ? "No homepage featured events yet"
                  : "No events-page featured events yet",
                isHomepageSlot
                  ? "Feature events from the CMS to highlight them on the homepage."
                  : "Use the CMS event settings to feature specific events here.",
              )
        }
      </div>`;
    return section;
  }

  function buildCalendarSectionNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const heading = buildSectionHeadingMarkup(sectionHeadingContent(source));
    const section = document.createElement("section");
    section.className = "section calendar-section";
    section.innerHTML = `${heading}${buildCalendarSectionMarkup(
      publishedEventRecords(records),
    )}`;
    return section;
  }

  function buildVolunteerCtaNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const fields = recordFields(source);
    const heading = sectionHeadingContent(source);
    const section = document.createElement("section");
    section.className = "volunteer-cta";
    const cta =
      heading.ctaLabel && heading.ctaUrl
        ? heading.ctaUrl === "#volunteer-modal"
          ? `<button class="button volunteer-button volunteer-modal-trigger" type="button">${escapeHtml(heading.ctaLabel)}</button>`
          : `<a class="button volunteer-button" href="${escapeHtml(heading.ctaUrl)}">${escapeHtml(heading.ctaLabel)}</a>`
        : "";
    section.innerHTML = `
      <div>
        ${heading.eyebrow ? `<p class="eyebrow">${escapeHtml(heading.eyebrow)}</p>` : ""}
        ${heading.title ? `<h2>${escapeHtml(heading.title)}</h2>` : ""}
        ${heading.summary ? `<p>${escapeHtml(heading.summary)}</p>` : ""}
        ${fields.body ? `<p>${escapeHtml(stripHtml(fields.body))}</p>` : ""}
      </div>
      ${cta}`;
    return section;
  }

  function buildCtaNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const heading = sectionHeadingContent(source);
    const target = widgetPageTarget(record, pathname);
    const targetAnchor = parseWidgetSectionKey(target?.section || "").anchorId;
    const section = document.createElement("section");
    const isSponsorCta = targetAnchor === "sponsor-cta";
    section.className = isSponsorCta
      ? "section sponsor-cta"
      : "section tukod-site-widget tukod-site-widget-cta";
    const content = `
      ${heading.eyebrow ? `<p class="eyebrow">${escapeHtml(heading.eyebrow)}</p>` : ""}
      ${heading.title ? `<h2>${escapeHtml(heading.title)}</h2>` : ""}
      ${heading.summary ? `<p>${escapeHtml(heading.summary)}</p>` : ""}
      ${buildContentAction(heading.ctaLabel, heading.ctaUrl)}`;
    section.innerHTML = isSponsorCta
      ? `<div class="sponsor-cta-content">${content}</div>`
      : `<div class="tukod-site-widget-inner"><div>${content}</div></div>`;
    return section;
  }

  function buildSponsorListNode(records, record) {
    const fields = recordFields(record);
    const target = widgetPageTarget(record, pathname);
    const targetAnchor = parseWidgetSectionKey(target?.section || "").anchorId;
    const allowedTierAnchors = new Set([
      "platinum-tier",
      "diamond-tier",
      "gold-tier",
      "silver-tier",
      "bronze-tier",
      "donors-tier",
    ]);
    const sponsorType = String(fields.widgetSponsorType || "").trim();
    let sponsors = Object.values(records || {}).filter(
      (candidate) => candidate?.type === "Sponsor",
    );
    if (sponsorType) {
      sponsors = sponsors.filter(
        (candidate) =>
          String(recordFields(candidate).sponsorType || "") === sponsorType,
      );
    }
    const heading =
      sponsorType ||
      String(recordFields(sponsors[0]).sponsorType || "Festival Partners");
    const isDonorList =
      sponsorType === "Festival Donors" || targetAnchor === "donors-tier";
    const tierClass = allowedTierAnchors.has(targetAnchor)
      ? ` ${targetAnchor}`
      : "";
    const badge =
      heading === "Festival Donors"
        ? "Donors"
        : heading.replace(/\s+Partners$/, "");
    const section = document.createElement("section");
    section.className = `sponsor-tier${tierClass}`;
    const items = sponsors
      .map((sponsor) => {
        const sponsorFields = recordFields(sponsor);
        const name =
          sponsorFields.heading || sponsor.title || "Festival partner";
        if (!sponsorFields.image) {
          const copy = `<article>${escapeHtml(name)}</article>`;
          return sponsorFields.sponsorUrl
            ? `<a href="${escapeHtml(safeHref(sponsorFields.sponsorUrl, "#"))}" aria-label="Visit ${escapeHtml(name)}">${copy}</a>`
            : copy;
        }
        const image = `<img src="${escapeHtml(safeHref(sponsorFields.image, ""))}" alt="${escapeHtml(sponsorFields.imageAlt || `${name} logo`)}">`;
        return sponsorFields.sponsorUrl
          ? `<a class="sponsor-logo-card" href="${escapeHtml(safeHref(sponsorFields.sponsorUrl, "#"))}" aria-label="Visit ${escapeHtml(name)}">${image}</a>`
          : `<article class="sponsor-logo-card">${image}</article>`;
      })
      .join("");
    section.innerHTML = `
      <div class="sponsor-tier-header">
        <span class="tier-badge">${escapeHtml(badge)}</span>
        <h2>${escapeHtml(heading)}</h2>
      </div>
      <div class="${isDonorList ? "donor-grid" : `sponsor-logo-grid${targetAnchor === "platinum-tier" ? " platinum-grid" : ""}`}">
        ${items || '<p class="tukod-site-widget-empty">No published sponsors match this widget configuration.</p>'}
      </div>`;
    return section;
  }

  function buildContactFormNode() {
    const section = document.createElement("section");
    section.className = "section contact-layout contact-widget-layout";
    section.innerHTML = `
      <div class="contact-card">
        <p class="eyebrow">Festival Desk</p>
        <h2>Send an inquiry</h2>
        <form class="contact-form" data-contact-widget-form novalidate>
          <label>
            Full Name
            <input type="text" name="fullName" autocomplete="name" maxlength="120" required>
          </label>
          <label>
            Email Address
            <input type="email" name="email" autocomplete="email" maxlength="160" required>
          </label>
          <label>
            Inquiry Type
            <select name="inquiryType" required>
              <option value="">Select an inquiry type</option>
              <option value="Visitor Planning">Visitor Planning</option>
              <option value="Events and Venue">Events and Venue</option>
              <option value="Accessibility Support">Accessibility Support</option>
              <option value="Media or Partnerships">Media or Partnerships</option>
            </select>
          </label>
          <label>
            Message
            <textarea name="message" rows="6" maxlength="4000" required></textarea>
          </label>
          <label class="contact-form-honeypot" aria-hidden="true">
            Website
            <input type="text" name="website" tabindex="-1" autocomplete="off">
          </label>
          <button class="button primary" type="submit">Submit Inquiry</button>
          <p class="contact-form-status" data-contact-form-status role="status" aria-live="polite"></p>
        </form>
      </div>`;

    const form = section.querySelector("[data-contact-widget-form]");
    const submitButton = form?.querySelector('button[type="submit"]');
    const status = form?.querySelector("[data-contact-form-status]");
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (!config.tenantId || !config.apiUrl) {
        setContactFormStatus(
          status,
          "error",
          "The inquiry service is not configured. Please try again later.",
        );
        return;
      }

      const fields = new FormData(form);
      if (submitButton) submitButton.disabled = true;
      setContactFormStatus(status, "info", "Sending your inquiry...");
      try {
        const endpoint = new URL(config.apiUrl, window.location.href);
        endpoint.searchParams.set("action", "submit-inquiry");
        const response = await fetch(endpoint.toString(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Tenant-ID": config.tenantId,
          },
          mode: "cors",
          body: JSON.stringify({
            tenant: config.tenantId,
            fullName: fields.get("fullName"),
            email: fields.get("email"),
            inquiryType: fields.get("inquiryType"),
            message: fields.get("message"),
            website: fields.get("website"),
            page: normalizePath(window.location.pathname),
          }),
        });
        const payload = await response.json().catch(() => null);
        if (!response.ok || !payload || payload.ok === false) {
          throw new Error(
            payload?.error || "Your inquiry could not be submitted.",
          );
        }
        form.reset();
        setContactFormStatus(
          status,
          "success",
          "Thank you. Your inquiry has been received by the festival team.",
        );
      } catch (error) {
        setContactFormStatus(
          status,
          "error",
          error?.message ||
            "Your inquiry could not be submitted. Please try again.",
        );
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
    return section;
  }

  function buildFaqListNode(records, record) {
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const currentEvent = findEventDetailRecord(records, eventDetailSlug());
    if (!currentEvent) return null;
    const sourceFields = recordFields(source);
    const configValue = widgetConfig(source);
    const scope =
      String(configValue.faqGroupScope || "").trim() === "selected-events"
        ? "selected-events"
        : "all-events";
    const assignedIds = Array.isArray(configValue.faqAssignedEventIds)
      ? configValue.faqAssignedEventIds
          .map((value) => String(value || "").trim())
          .filter(Boolean)
      : [];
    if (scope === "selected-events") {
      const currentKeys = new Set(
        [
          currentEvent.id,
          currentEvent.slug,
          normalizePath(currentEvent.page || "")
            .split("/")
            .filter(Boolean)
            .pop() || "",
        ]
          .map((value) => String(value || "").trim())
          .filter(Boolean),
      );
      if (
        !assignedIds.length ||
        !assignedIds.some((value) => currentKeys.has(value))
      ) {
        return null;
      }
    }
    const items = (
      Array.isArray(configValue.faqItems) ? configValue.faqItems : []
    )
      .map((item) => ({
        question: String(item?.question || "").trim(),
        answer: String(item?.answer || "").trim(),
        enabled: item?.enabled !== false,
      }))
      .filter((item) => item.enabled && (item.question || item.answer));
    if (!items.length) return null;
    const headingEyebrow = sourceFields.eyebrow || "Common questions";
    const headingTitle =
      sourceFields.heading || source.title || "Frequently asked questions";
    const headingSummary = stripHtml(
      sourceFields.summary || source.excerpt || "",
    );
    const leftColumnItems = items.filter((_, index) => index % 2 === 0);
    const rightColumnItems = items.filter((_, index) => index % 2 === 1);
    const renderFaqItem = (item) => `<details class="tukod-faq-item">
            <summary>${escapeHtml(item.question || "Question")}</summary>
            <div class="tukod-faq-answer"><div class="tukod-faq-answer-inner">${item.answer ? `<p>${escapeHtml(item.answer)}</p>` : ""}</div></div>
          </details>`;
    const section = document.createElement("section");
    section.className = "section tukod-site-widget tukod-site-widget-faq";
    section.innerHTML = `<div class="tukod-site-widget-inner">
      <div class="tukod-faq-heading">
        <p class="eyebrow">${escapeHtml(headingEyebrow)}</p>
        <div class="tukod-faq-heading-copy">
          <h2>${escapeHtml(headingTitle)}</h2>
          ${headingSummary ? `<p>${escapeHtml(headingSummary)}</p>` : ""}
        </div>
      </div>
      <div class="tukod-faq-list"><div class="tukod-faq-column">${leftColumnItems.map(renderFaqItem).join("")}</div><div class="tukod-faq-column">${rightColumnItems.map(renderFaqItem).join("")}</div></div>
    </div>`;
    return section;
  }

  function buildWidgetNode(records, record) {
    const fields = recordFields(record);
    const type = widgetType(record);
    const target = widgetPageTarget(record, pathname);
    const targetAnchor = parseWidgetSectionKey(target?.section || "").anchorId;
    if (type === "hero") {
      return buildHeroNode(records, record);
    }
    if (type === "cta") {
      return buildCtaNode(records, record);
    }
    if (type === "ticker-band") {
      return buildTickerBandNode(records, record);
    }
    if (type === "featured") {
      return buildFeaturedSectionNode(records, record);
    }
    if (type === "partner-recognition") {
      return buildPartnerRecognitionNode(records, record);
    }
    if (type === "about") {
      return buildAboutNode(records, record);
    }
    if (type === "story") {
      return buildStoryNode(records, record);
    }
    if (type === "value-strip") {
      return buildValueStripNode(records, record);
    }
    if (type === "explore") {
      return buildExploreNode(records, record);
    }
    if (type === "visit-band") {
      return buildVisitBandNode(records, record);
    }
    if (type === "calendar-of-events") {
      return buildCalendarSectionNode(records, record);
    }
    if (type === "sponsor-list") {
      return buildSponsorListNode(records, record);
    }
    if (type === "contact-form") {
      return buildContactFormNode();
    }
    if (type === "faq-list") {
      return buildFaqListNode(records, record);
    }
    if (targetAnchor === "volunteer-cta") {
      return buildVolunteerCtaNode(records, record);
    }
    if (type === "featured-image") {
      if (!fields.image) return null;
      const section = document.createElement("section");
      section.className = "tukod-site-widget tukod-site-widget-image";
      section.innerHTML = `<img src="${escapeHtml(fields.image)}" alt="${escapeHtml(fields.imageAlt || "Featured image")}">`;
      return section;
    }
    const source = widgetSourceRecord(records, record);
    if (!source) return null;
    const sourceFields = recordFields(source);
    const title = sourceFields.heading || source.title || "Untitled";
    const summary = stripHtml(
      sourceFields.summary || source.excerpt || sourceFields.body || "",
    );
    const image = sourceFields.image
      ? `<div class="tukod-site-widget-media"><img src="${escapeHtml(sourceFields.image)}" alt="${escapeHtml(sourceFields.imageAlt || title)}"></div>`
      : "";
    const section = document.createElement("section");
    section.className = `tukod-site-widget${image ? " has-image" : ""}`;

    if (type === "event") {
      const meta = [
        formatEventDetailDate(
          sourceFields.eventDate || "",
          sourceFields.eventEndDate || "",
        ) || "",
        sourceFields.eventTime || "",
        displayEventVenue(sourceFields.eventVenue || ""),
      ].filter(Boolean);
      section.innerHTML = `<div class="tukod-site-widget-inner">
        <div>
          <p class="tukod-site-widget-kicker">${escapeHtml(sourceFields.eyebrow || "Festival event")}</p>
          <h3>${escapeHtml(title)}</h3>
          ${summary ? `<p>${escapeHtml(summary)}</p>` : ""}
          ${meta.length ? `<div class="tukod-site-widget-meta">${meta.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>` : ""}
          <a class="tukod-site-widget-cta" href="${escapeHtml(safeHref(eventDetailHref(source), "/events/"))}">View event <span aria-hidden="true">→</span></a>
        </div>
        ${image}
      </div>`;
      return section;
    }

    const href = safeHref(sourceFields.ctaUrl || source.page || "#", "#");
    section.innerHTML = `<div class="tukod-site-widget-inner">
      <div>
        <p class="tukod-site-widget-kicker">${escapeHtml(sourceFields.eyebrow || "Content desk")}</p>
        <h3>${escapeHtml(title)}</h3>
        ${summary ? `<p>${escapeHtml(summary)}</p>` : ""}
        <a class="tukod-site-widget-cta" href="${escapeHtml(href)}">${escapeHtml(sourceFields.ctaLabel || "Read more")} <span aria-hidden="true">→</span></a>
      </div>
      ${image}
    </div>`;
    return section;
  }

  function insertWidgetNode(section, pathname, sectionKey) {
    const parsed = parseWidgetSectionKey(sectionKey);
    const main = document.querySelector("main") || document.body;
    if (parsed.position === "end-of-page" || !parsed.anchorId) {
      main.appendChild(section);
      return;
    }
    const anchor = findSlotAnchor(pathname, parsed.anchorId);
    if (!anchor?.parentNode) {
      main.appendChild(section);
      return;
    }
    inheritSiteWidgetSectionStyle(section, pathname, sectionKey);
    const sameSlot = Array.from(
      document.querySelectorAll("[data-tukod-generated-widget]"),
    ).filter((element) => element.dataset.tukodWidgetSlot === sectionKey);
    if (parsed.position === "before") {
      const firstExisting = sameSlot[0];
      if (firstExisting?.parentNode)
        firstExisting.parentNode.insertBefore(section, firstExisting);
      else anchor.parentNode.insertBefore(section, anchor);
      return;
    }
    const lastExisting = sameSlot[sameSlot.length - 1];
    if (lastExisting) lastExisting.insertAdjacentElement("afterend", section);
    else anchor.insertAdjacentElement("afterend", section);
  }

  function renderSiteWidgets(records) {
    addSiteWidgetStyles();
    clearManagedSlotVisibility();
    hideLegacyHomepageSlots();
    document
      .querySelectorAll("[data-tukod-generated-widget]")
      .forEach((element) => element.remove());
    const widgets = Object.values(records || {})
      .filter((record) => record && isSiteWidgetRecord(record))
      .filter((record) => siteWidgetIsEnabled(record))
      .filter((record) => supportedSiteWidgetTypes.has(widgetType(record)))
      .filter((record) => widgetPageTarget(record, pathname))
      .sort((left, right) => widgetOrder(left) - widgetOrder(right));
    widgets.forEach((record) => {
      const target = widgetPageTarget(record, pathname);
      const section = buildWidgetNode(records, record);
      if (!target || !section) return;
      if (widgetOwnsSlot(record)) {
        hideManagedSlot(target.section || "");
      }
      section.dataset.tukodGeneratedWidget = String(
        record.id || record.slug || "",
      );
      section.dataset.tukodWidgetSlot =
        String(target.section || "end-of-page").trim() || "end-of-page";
      insertWidgetNode(section, pathname, section.dataset.tukodWidgetSlot);
    });
  }

  function buildEmptyFeaturedMarkup(title, copy) {
    return `<article class="event-card large-card" aria-live="polite">
      <div class="event-date"><strong>--</strong><span>CMS</span></div>
      <div>
        <p class="card-kicker">Featured events</p>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(copy)}</p>
      </div>
    </article>`;
  }

  function hasHomepageFeaturedDetails(record) {
    const fields = recordFields(record);
    const rawTitle = String(fields.heading || record.title || "").trim();
    const normalizedTitle = rawTitle.toLowerCase();
    const summary = stripHtml(
      fields.summary || record.excerpt || fields.body || "",
    ).trim();
    const kicker = String(
      displayEventVenue(fields.eventVenue || "") || fields.eyebrow || "",
    ).trim();
    const category = String(eventCategoryValue(fields) || "").trim();
    const hasRealTitle =
      rawTitle &&
      normalizedTitle !== "untitled event" &&
      normalizedTitle !== "untitled content record";

    return Boolean(hasRealTitle || summary || kicker || category);
  }

  function isImageOnlyHomepageFeaturedEvent(record) {
    const fields = recordFields(record);
    return Boolean(
      isMainHomepageEvent(record) &&
      String(fields.image || "").trim() &&
      !hasHomepageFeaturedDetails(record),
    );
  }

  function hasPublicEventDetails(record) {
    const fields = recordFields(record);
    const rawTitle = String(fields.heading || record.title || "").trim();
    const normalizedTitle = rawTitle.toLowerCase();
    const hasRealTitle =
      rawTitle &&
      normalizedTitle !== "untitled event" &&
      normalizedTitle !== "untitled content record";
    const summary = stripHtml(
      fields.summary || record.excerpt || fields.body || record.body || "",
    ).trim();
    const detailSignals = [
      summary,
      String(fields.image || "").trim(),
      String(fields.eventDate || "").trim(),
      String(fields.eventEndDate || "").trim(),
      String(fields.eventTime || "").trim(),
      String(fields.eventVenue || "").trim(),
      String(fields.whatToExpectTitle || "").trim(),
      String(fields.whatToExpectSummary || "").trim(),
      String(fields.arrivalWindow || "").trim(),
      String(fields.eventAccess || "").trim(),
      String(fields.eventBring || "").trim(),
      String(fields.eventTips || "").trim(),
      String(fields.presentedByName || "").trim(),
      String(fields.presentedByImage || "").trim(),
      String(fields.eventEditorialTitle || "").trim(),
      String(fields.eventEditorialSummary || "").trim(),
      String(fields.eventEditorialImage || "").trim(),
      String(fields.eventEditorialTitle2 || "").trim(),
      String(fields.eventEditorialSummary2 || "").trim(),
      String(fields.eventEditorialImage2 || "").trim(),
    ];
    return Boolean(hasRealTitle && detailSignals.some(Boolean));
  }

  function calendarEligibleEvents(events) {
    return (Array.isArray(events) ? events : []).filter(
      (record) =>
        !isImageOnlyHomepageFeaturedEvent(record) &&
        hasPublicEventDetails(record),
    );
  }

  function buildHomepageFeaturedMarkup(events) {
    return events
      .map((record, index) => {
        const fields = recordFields(record);
        const date = formatCardDate(fields.eventDate);
        const title = fields.heading || record.title || "Untitled event";
        const summary = stripHtml(
          fields.summary || record.excerpt || fields.body || "",
        );
        const kicker =
          displayEventVenue(fields.eventVenue || "") ||
          fields.eyebrow ||
          "Festival event";
        const category = eventCategoryValue(fields);
        const image = fields.image
          ? `<div class="event-card-image" aria-hidden="true"><img src="${escapeHtml(safeHref(fields.image, ""))}" alt=""></div>`
          : "";
        const imageOnly =
          index === 0 && isImageOnlyHomepageFeaturedEvent(record);
        const className =
          index === 0
            ? `event-card large-card${image ? " has-card-image" : ""}${imageOnly ? " image-only" : ""}`
            : "event-card";
        if (imageOnly) {
          return `<article class="${className}" aria-label="Featured event image">
          ${image}
        </article>`;
        }
        return `<a class="${className}" href="${escapeHtml(eventDetailHref(record))}" aria-label="View ${escapeHtml(title)} details">
          ${index === 0 ? image : ""}
          <div class="event-date-stack"><div class="event-date"><strong>${escapeHtml(date.day)}</strong><span>${escapeHtml(date.month)}</span></div>${category ? `<small class="tukod-event-category">${escapeHtml(category)}</small>` : ""}</div>
          <div class="event-card-copy">
            <p class="card-kicker">${escapeHtml(kicker)}</p>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(summary || "See the full event details and schedule.")}</p>
          </div>
        </a>`;
      })
      .join("");
  }

  function buildFeaturedMarkup(events) {
    return events
      .map((record, index) => {
        const fields = recordFields(record);
        const date = formatCardDate(fields.eventDate);
        const kicker = fields.eyebrow || "Featured event";
        const title = fields.heading || record.title || "Untitled event";
        const summary = stripHtml(
          fields.summary || record.excerpt || fields.body || "",
        );
        const category = eventCategoryValue(fields);
        const colorClass = eventColors[index % eventColors.length];
        return `<a class="event-card ${colorClass}" href="${escapeHtml(eventDetailHref(record))}" aria-label="View ${escapeHtml(title)} details">
          <div class="event-date-stack"><div class="event-date"><strong>${escapeHtml(date.day)}</strong><span>${escapeHtml(date.month)}</span></div>${category ? `<small class="tukod-event-category">${escapeHtml(category)}</small>` : ""}</div>
          <div>
            <p class="card-kicker">${escapeHtml(kicker)}</p>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(summary || "See the full event details and schedule.")}</p>
          </div>
        </a>`;
      })
      .join("");
  }

  function buildCalendarMarkup(events) {
    const head = `<div class="calendar-row head" role="row">
      <span role="columnheader">Date</span>
      <span role="columnheader">Event</span>
      <span role="columnheader">Venue</span>
      <span role="columnheader">Time</span>
    </div>`;
    const rows = events.length
      ? events
          .map((record) => {
            const fields = recordFields(record);
            const title = fields.heading || record.title || "Untitled event";
            return `<a class="calendar-row calendar-row-link" role="row" href="${escapeHtml(eventDetailHref(record))}" aria-label="View ${escapeHtml(title)} details">
              <span role="cell">${escapeHtml(formatCalendarDate(fields.eventDate, fields.eventEndDate))}</span>
              <span role="cell">${escapeHtml(title)}</span>
              <span role="cell">${escapeHtml(displayEventVenue(fields.eventVenue || "") || "TBA")}</span>
              <span role="cell">${escapeHtml(fields.eventTime || "TBA")}</span>
            </a>`;
          })
          .join("")
      : `<div class="calendar-row" role="row">
          <span role="cell">TBA</span>
          <span role="cell">No published events yet</span>
          <span role="cell">-</span>
          <span role="cell">-</span>
        </div>`;
    return `${head}${rows}`;
  }

  function buildCalendarPaginationMarkup(totalCount, totalPages) {
    if (!calendarFilterUsesPagination() || totalPages <= 1) return "";
    const currentPage = clampCalendarPage(calendarPage, totalPages);
    const start = totalCount ? (currentPage - 1) * CALENDAR_PAGE_SIZE + 1 : 0;
    const end = totalCount
      ? Math.min(totalCount, currentPage * CALENDAR_PAGE_SIZE)
      : 0;
    const pageButtons = Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      const isActive = page === currentPage;
      return `<button type="button" class="tukod-event-pagination-button${isActive ? " is-active" : ""}" data-calendar-page="${page}" aria-label="Go to page ${page}" aria-current="${isActive ? "page" : "false"}">${page}</button>`;
    }).join("");
    return `<div class="tukod-event-pagination" aria-label="Events pagination">
      <p class="tukod-event-pagination-summary">Showing ${start}-${end} of ${totalCount} events</p>
      <div class="tukod-event-pagination-controls">
        <button type="button" class="tukod-event-pagination-button" data-calendar-page="prev" ${currentPage === 1 ? "disabled" : ""}>Previous</button>
        ${pageButtons}
        <button type="button" class="tukod-event-pagination-button" data-calendar-page="next" ${currentPage === totalPages ? "disabled" : ""}>Next</button>
      </div>
    </div>`;
  }

  function buildCalendarFilterTabs(events) {
    return `<div class="tukod-event-category-tabs" role="tablist" aria-label="Filter events by category">${EVENT_CATEGORY_OPTIONS.map(
      (option) => {
        const count = option.category
          ? events.filter(
              (record) => eventCategoryValue(record) === option.category,
            ).length
          : events.length;
        return `<button type="button" class="tukod-event-category-tab ${calendarCategoryFilter === option.value ? "is-active" : ""}" role="tab" aria-selected="${calendarCategoryFilter === option.value}" data-event-category-filter="${escapeHtml(option.value)}">${escapeHtml(option.label)}${count ? ` (${count})` : ""}</button>`;
      },
    ).join("")}</div>`;
  }

  function buildCalendarSectionMarkup(events) {
    const eligibleEvents = calendarEligibleEvents(events);
    const filteredEvents = eligibleEvents.filter((record) =>
      eventCategoryMatches(record),
    );
    const totalPages = calendarFilterUsesPagination()
      ? Math.max(1, Math.ceil(filteredEvents.length / CALENDAR_PAGE_SIZE))
      : 1;
    calendarPage = clampCalendarPage(calendarPage, totalPages);
    const visibleEvents = calendarFilterUsesPagination()
      ? filteredEvents.slice(
          (calendarPage - 1) * CALENDAR_PAGE_SIZE,
          calendarPage * CALENDAR_PAGE_SIZE,
        )
      : filteredEvents;
    return `${buildCalendarFilterTabs(eligibleEvents)}
      <div class="calendar-table" role="table" aria-label="Festival calendar of events">
        ${buildCalendarMarkup(visibleEvents)}
      </div>
      ${buildCalendarPaginationMarkup(filteredEvents.length, totalPages)}`;
  }

  function ensureEventCategoryStyles() {
    if (document.querySelector("#tukod-event-category-styles")) return;
    const style = document.createElement("style");
    style.id = "tukod-event-category-styles";
    style.textContent = `
      .tukod-event-category { display: block; margin-top: 8px; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
      .tukod-event-category-tabs { display: flex; flex-wrap: wrap; gap: 10px; width: min(100%, 1180px); margin: 0 auto 22px; }
      .tukod-event-category-tab { appearance: none; border: 1px solid rgba(17, 48, 79, 0.14); background: transparent; color: #11304f; cursor: pointer; padding: 10px 14px; font: 800 11px/1.2 Outfit, ui-sans-serif, system-ui, sans-serif; letter-spacing: .08em; text-transform: uppercase; }
      .tukod-event-category-tab.is-active { background: #11304f; border-color: #11304f; color: #fff; }
      .tukod-event-pagination { display: flex; flex-wrap: wrap; gap: 12px 18px; align-items: center; justify-content: space-between; width: min(100%, 1180px); margin: 18px auto 0; }
      .tukod-event-pagination-summary { margin: 0; color: #677187; font: 700 14px/1.4 Outfit, ui-sans-serif, system-ui, sans-serif; }
      .tukod-event-pagination-controls { display: flex; flex-wrap: wrap; gap: 8px; }
      .tukod-event-pagination-button { appearance: none; min-width: 42px; border: 1px solid rgba(17, 48, 79, 0.14); background: #fff; color: #11304f; cursor: pointer; padding: 10px 14px; font: 800 12px/1.2 Outfit, ui-sans-serif, system-ui, sans-serif; }
      .tukod-event-pagination-button.is-active { background: #11304f; border-color: #11304f; color: #fff; }
      .tukod-event-pagination-button[disabled] { opacity: .42; cursor: not-allowed; }
    `;
    document.head.appendChild(style);
  }

  function hydrateHomeCountdown(records) {
    const countdown = document.querySelector(
      "[data-countdown][data-tukod-record]",
    );
    if (!countdown) return;
    const recordKey = countdown.dataset.tukodRecord;
    const fieldName = countdown.dataset.tukodDateField || "eventDate";
    const record = recordKey ? records[recordKey] : null;
    const fields = recordFields(record);
    const value = record && fields[fieldName];
    const hideCountdown = readBooleanField(fields.hideCountdown);
    countdown.hidden = hideCountdown;
    countdown.dataset.countdownEnabled = hideCountdown ? "false" : "true";
    if (typeof value === "string" && value.trim()) {
      countdown.dataset.countdownTarget = countdownTargetValue(
        value,
        fields.eventTime,
      );
    }
  }

  function hydrateEventsPage(records) {
    if (pathname !== "/events") return;
    ensureEventCategoryStyles();
    const events = publishedEventRecords(records);
    if (
      featuredRoot &&
      !hasSlotOwnerWidget(records, "featured-events", "featured")
    ) {
      const featuredEvents = events
        .filter(isEventsPageFeaturedEvent)
        .slice(0, 6);
      featuredRoot.innerHTML = featuredEvents.length
        ? buildFeaturedMarkup(featuredEvents)
        : buildEmptyFeaturedMarkup(
            events.length
              ? "No events-page featured events yet"
              : "No featured events yet",
            events.length
              ? "Use the CMS event modal to feature specific events here. All published events still appear in the calendar below."
              : "Publish an event and mark it as featured on the events page to highlight it here.",
          );
    }
    if (
      calendarRoot &&
      !hasSlotOwnerWidget(records, "calendar-section", "calendar-of-events")
    ) {
      calendarRoot.innerHTML = buildCalendarSectionMarkup(events);
    }
  }

  function hydrateHomepageFeaturedEvents(records) {
    if (
      pathname !== "/" ||
      !homepageFeaturedRoot ||
      hasSlotOwnerWidget(records, "feature-section", "featured")
    ) {
      return;
    }
    const events = publishedEventRecords(records);
    const featuredEvents = homepageFeaturedEvents(events);
    homepageFeaturedRoot.innerHTML = featuredEvents.length
      ? buildHomepageFeaturedMarkup(featuredEvents)
      : buildEmptyFeaturedMarkup(
          "No homepage featured events yet",
          "Feature events from the CMS to highlight them on the homepage.",
        );
  }

  function hydrateGlobalFooter(records) {
    const footer = document.querySelector("[data-tukod-global-footer]");
    if (!footer) return;
    const source = findRecordById(records, "global-footer");
    if (!source) {
      footer.hidden = true;
      return;
    }
    const fields = recordFields(source);
    const image = fields.image
      ? `<img class="footer-logos" src="${escapeHtml(safeHref(fields.image, ""))}" alt="${escapeHtml(fields.imageAlt || "Festival partner and city logos")}">`
      : "";
    const summary = fields.summary || source.excerpt || "";
    footer.innerHTML = `<div class="footer-main">
      <div class="footer-identity">
        ${image}
        ${summary ? `<p>${escapeHtml(summary)}</p>` : ""}
      </div>
    </div>`;
    footer.hidden = false;
  }

  function hydrateEventDetail(records) {
    const slug = eventDetailSlug();
    if (!slug) return;

    const record = findEventDetailRecord(records, slug);
    const detailRoot = document.querySelector("[data-tukod-event-detail]");
    const loading = document.querySelector("[data-tukod-event-loading]");
    const error = document.querySelector("[data-tukod-event-error]");

    if (!record) {
      if (detailRoot) detailRoot.hidden = true;
      if (loading) loading.hidden = true;
      if (error) error.hidden = false;
      return;
    }

    const fields = recordFields(record);
    const title = fields.heading || record.title || "Untitled event";
    const summary =
      fields.summary ||
      record.excerpt ||
      stripHtml(fields.body || record.body || "") ||
      "See the latest event information from the festival team.";
    const date = formatEventDetailDate(fields.eventDate, fields.eventEndDate);
    const category = eventCategoryValue(fields);
    const time = String(fields.eventTime || "").trim() || "To be announced";
    const venue =
      displayEventVenue(fields.eventVenue || "") || "To be announced";
    const heroImageUrl = safeHref(String(fields.image || "").trim(), "");
    const heroImageCredit = String(fields.imageCopyright || "").trim();

    const setText = (selector, value) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.textContent = String(value || "");
      });
    };
    const formatTimeField = (value) => {
      const match = String(value || "").match(/^(\d{2}):(\d{2})$/);
      if (!match) return String(value || "").trim();
      const hour = Number(match[1]);
      const minute = match[2];
      const suffix = hour >= 12 ? "PM" : "AM";
      return `${hour % 12 || 12}:${minute} ${suffix}`;
    };
    const expectTitle = String(fields.whatToExpectTitle || "").trim();
    const expectSummary =
      String(fields.whatToExpectSummary || "").trim() ||
      stripHtml(fields.body || record.body || "") ||
      summary;
    const quickDetails = [
      ["Arrival Window", formatTimeField(fields.arrivalWindow)],
      ["Access", String(fields.eventAccess || "").trim()],
      ["Bring", String(fields.eventBring || "").trim()],
      ["Tips", String(fields.eventTips || "").trim()],
    ].filter(([, value]) => value);
    const presenterName = String(fields.presentedByName || "").trim();
    const presenterImage = String(fields.presentedByImage || "").trim();
    const presenterImageCredit = String(
      fields.presentedByImageCopyright || "",
    ).trim();
    const editorialEntries = [
      {
        label: String(fields.eventEditorialLabel || "").trim(),
        title: String(fields.eventEditorialTitle || "").trim(),
        summary: String(fields.eventEditorialSummary || "").trim(),
        image: String(fields.eventEditorialImage || "").trim(),
        credit: String(fields.eventEditorialImageCopyright || "").trim(),
      },
      {
        label: String(fields.eventEditorialLabel2 || "").trim(),
        title: String(fields.eventEditorialTitle2 || "").trim(),
        summary: String(fields.eventEditorialSummary2 || "").trim(),
        image: String(fields.eventEditorialImage2 || "").trim(),
        credit: String(fields.eventEditorialImage2Copyright || "").trim(),
      },
    ].filter(
      (entry) => entry.label || entry.title || entry.summary || entry.image,
    );
    const editorialMarkup = editorialEntries
      .map(
        (entry, index) =>
          `<article class="event-editorial-item${index % 2 ? " is-reversed" : ""}${entry.image ? "" : " is-text-only"}">${entry.image ? `<figure><img src="${escapeHtml(safeHref(entry.image, ""))}" alt="${escapeHtml(entry.title || "Event editorial")}">${entry.credit ? `<span class="event-image-credit">${escapeHtml(entry.credit)}</span>` : ""}</figure>` : ""}<div class="event-editorial-copy">${entry.label ? `<p class="eyebrow">${escapeHtml(entry.label)}</p>` : ""}${entry.title ? `<h2>${escapeHtml(entry.title)}</h2>` : ""}${entry.summary ? `<p>${escapeHtml(entry.summary)}</p>` : ""}</div></article>`,
      )
      .join("");

    if (detailRoot) {
      const overviewSection = detailRoot.querySelector("[data-event-overview]");
      setText("[data-event-eyebrow]", fields.eyebrow || "Festival event");
      setText("[data-event-title]", title);
      setText("[data-event-summary]", summary);
      setText("[data-event-date]", date);
      const categoryNode = detailRoot.querySelector("[data-event-category]");
      if (categoryNode) {
        categoryNode.textContent = category;
        categoryNode.hidden = !category;
      }
      setText("[data-event-time]", time);
      setText("[data-event-venue]", venue);
      const hero = detailRoot.querySelector(".event-detail-hero");
      if (hero) {
        hero.style.backgroundImage = heroImageUrl
          ? `linear-gradient(135deg, rgba(17, 48, 79, 0.88), rgba(231, 47, 45, 0.72)), url("${heroImageUrl}")`
          : "";
        hero.style.backgroundPosition = heroImageUrl ? "center" : "";
        hero.style.backgroundSize = heroImageUrl ? "cover" : "";
      }
      const heroCredit = detailRoot.querySelector("[data-event-image-credit]");
      if (heroCredit) {
        heroCredit.textContent = heroImageCredit;
        heroCredit.hidden = !heroImageCredit;
      }
      hydrateEventMapSection(detailRoot, fields);

      const expectSection = detailRoot.querySelector("[data-event-expect]");
      if (expectSection) {
        setText("[data-event-expect-title]", expectTitle || "What to expect");
        setText("[data-event-expect-summary]", expectSummary);
        expectSection.hidden = !expectTitle && !expectSummary;
      }

      const quickSection = detailRoot.querySelector("[data-event-quick]");
      const quickList = detailRoot.querySelector("[data-event-quick-list]");
      const presenter = detailRoot.querySelector("[data-event-presenter]");
      if (quickList) {
        quickList.innerHTML = quickDetails
          .map(
            ([label, value]) =>
              `<li><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></li>`,
          )
          .join("");
      }
      if (presenter) {
        presenter.innerHTML =
          presenterName || presenterImage
            ? `<strong class="event-presenter-label">Presented By</strong><div class="event-presenter-logo">${presenterImage ? `<img src="${escapeHtml(safeHref(presenterImage, ""))}" alt="${escapeHtml(presenterName || "Event presenter")}">` : ""}${presenterName ? `<span>${escapeHtml(presenterName)}</span>` : ""}${presenterImage && presenterImageCredit ? `<span class="event-image-credit">${escapeHtml(presenterImageCredit)}</span>` : ""}</div>`
            : "";
        presenter.hidden = !presenterName && !presenterImage;
      }
      if (quickSection) {
        quickSection.hidden =
          !quickDetails.length && !presenterName && !presenterImage;
      }
      if (overviewSection) {
        overviewSection.hidden =
          Boolean(expectSection?.hidden) && Boolean(quickSection?.hidden);
      }

      const editorialSection = detailRoot.querySelector(
        "[data-event-editorial]",
      );
      const editorialGrid = detailRoot.querySelector(
        "[data-event-editorial-grid]",
      );
      if (editorialGrid) editorialGrid.innerHTML = editorialMarkup;
      if (editorialSection) {
        editorialSection.hidden = !editorialEntries.length;
      }

      const image = detailRoot.querySelector("[data-event-image]");
      if (image instanceof HTMLImageElement) {
        const imageUrl = String(fields.image || "").trim();
        if (imageUrl) {
          image.src = safeHref(imageUrl, "");
          image.alt = fields.imageAlt || title;
          image.hidden = false;
        } else {
          image.removeAttribute("src");
          image.alt = "";
          image.hidden = true;
        }
      }

      const relatedRoot = detailRoot.querySelector("[data-event-related]");
      if (relatedRoot) {
        const relatedSection = relatedRoot.closest(".section");
        const related = publishedEventRecords(records)
          .filter((candidate) => hasPublicEventDetails(candidate))
          .filter(
            (candidate) =>
              String(candidate.slug || candidate.id || "")
                .trim()
                .toLowerCase() !== slug,
          )
          .slice(0, 3);
        relatedRoot.innerHTML = related.length
          ? buildFeaturedMarkup(related)
          : "";
        if (relatedSection) relatedSection.hidden = !related.length;
      }

      if (loading) loading.hidden = true;
      if (error) error.hidden = true;
      detailRoot.hidden = false;
    } else {
      // Static event pages remain CMS-driven on hosts that do not apply rewrites.
      setText(
        ".event-detail-hero .eyebrow",
        fields.eyebrow || "Festival event",
      );
      setText(".event-detail-hero h1", title);
      const hero = document.querySelector(".event-detail-hero");
      if (hero) {
        hero.style.backgroundImage = heroImageUrl
          ? `linear-gradient(135deg, rgba(17, 48, 79, 0.88), rgba(231, 47, 45, 0.72)), url("${heroImageUrl}")`
          : "";
        hero.style.backgroundPosition = heroImageUrl ? "center" : "";
        hero.style.backgroundSize = heroImageUrl ? "cover" : "";
      }
      const heroCredit = document.querySelector("[data-event-image-credit]");
      if (heroCredit) {
        heroCredit.textContent = heroImageCredit;
        heroCredit.hidden = !heroImageCredit;
      }
      hydrateEventMapSection(document, fields);
      const dateNode = document.querySelector("[data-event-date]");
      const categoryNode = document.querySelector("[data-event-category]");
      const timeNode = document.querySelector("[data-event-time]");
      const venueNode = document.querySelector("[data-event-venue]");
      if (dateNode) dateNode.textContent = date;
      if (categoryNode) {
        categoryNode.textContent = category;
        categoryNode.hidden = !category;
      }
      if (timeNode) timeNode.textContent = time;
      if (venueNode) venueNode.textContent = venue;

      const overview = document.querySelector(".event-overview-copy");
      if (overview) {
        overview.innerHTML = `<p class="eyebrow">What to expect</p>
          <h2>${escapeHtml(expectTitle || "What to expect")}</h2>
          <p>${escapeHtml(expectSummary)}</p>`;
        overview.hidden = !expectTitle && !expectSummary;
      }

      const infoCard = document.querySelector(".event-info-card");
      if (infoCard) {
        infoCard.innerHTML = `<h2>Quick Details</h2><ul>${quickDetails
          .map(
            ([label, value]) =>
              `<li><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></li>`,
          )
          .join("")}</ul>${
          presenterName || presenterImage
            ? `<div data-event-presenter><strong class="event-presenter-label">Presented By</strong><div class="event-presenter-logo">${presenterImage ? `<img src="${escapeHtml(safeHref(presenterImage, ""))}" alt="${escapeHtml(presenterName || "Event presenter")}">` : ""}${presenterName ? `<span>${escapeHtml(presenterName)}</span>` : ""}</div></div>`
            : ""
        }`;
        infoCard.hidden =
          !quickDetails.length && !presenterName && !presenterImage;
      }

      let editorialSection = document.querySelector("[data-event-editorial]");
      if (editorialEntries.length) {
        if (!editorialSection) {
          editorialSection = document.createElement("section");
          editorialSection.className = "section";
          editorialSection.setAttribute("data-event-editorial", "");
          document.querySelector(".event-overview")?.after(editorialSection);
        }
        editorialSection.innerHTML = `<div class="event-editorial-grid">${editorialMarkup}</div>`;
        editorialSection.hidden = false;
      } else if (editorialSection) {
        editorialSection.hidden = true;
      }
    }

    document.title = `${title} | Higalaay Festival`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", summary);
  }

  function applyRecords(records) {
    ensureEventCategoryStyles();
    let applied = 0;

    document.querySelectorAll("[data-tukod-record]").forEach((element) => {
      const textValue = getField(records, element, "data-tukod-text-field");
      const hrefValue = getField(records, element, "data-tukod-href-field");

      if (textValue !== null && element.textContent !== textValue) {
        element.textContent = textValue;
        applied += 1;
      }

      if (
        hrefValue !== null &&
        element instanceof HTMLAnchorElement &&
        element.getAttribute("href") !== safeHref(hrefValue, "#")
      ) {
        element.setAttribute("href", safeHref(hrefValue, "#"));
        applied += 1;
      }
    });

    hydrateHomeCountdown(records);
    hydrateHomepageFeaturedEvents(records);
    hydrateEventsPage(records);
    hydrateEventDetail(records);
    hydrateGlobalFooter(records);
    renderSiteWidgets(records);
    document
      .querySelectorAll("[data-event-category-filter]")
      .forEach((button) => {
        if (button.dataset.tukodCategoryBound === "1") return;
        button.dataset.tukodCategoryBound = "1";
        button.addEventListener("click", () => {
          calendarCategoryFilter =
            String(button.dataset.eventCategoryFilter || "all").trim() || "all";
          calendarPage = 1;
          applyRecords(latestRecords || records);
        });
      });
    document.querySelectorAll("[data-calendar-page]").forEach((button) => {
      if (button.dataset.tukodPaginationBound === "1") return;
      button.dataset.tukodPaginationBound = "1";
      button.addEventListener("click", () => {
        const action = String(button.dataset.calendarPage || "").trim();
        const filteredEvents = calendarEligibleEvents(
          publishedEventRecords(latestRecords || records),
        ).filter((record) => eventCategoryMatches(record));
        const totalPages = Math.max(
          1,
          Math.ceil(filteredEvents.length / CALENDAR_PAGE_SIZE),
        );
        if (action === "prev") {
          calendarPage = clampCalendarPage(calendarPage - 1, totalPages);
        } else if (action === "next") {
          calendarPage = clampCalendarPage(calendarPage + 1, totalPages);
        } else {
          calendarPage = clampCalendarPage(Number(action || 1), totalPages);
        }
        applyRecords(latestRecords || records);
      });
    });
    document.documentElement.dataset.tukodCms = "connected";
    document.dispatchEvent(
      new CustomEvent("tukodcms:ready", {
        detail: { tenantId, records, applied, previewRecord },
      }),
    );
  }

  async function fetchPublishedContent() {
    if (!tenantId || !apiUrl) return {};
    const endpoint = new URL(apiUrl, window.location.href);
    endpoint.searchParams.set("action", "public-content");
    endpoint.searchParams.set("tenant", tenantId);
    endpoint.searchParams.set("_", String(Date.now()));

    const response = await fetch(endpoint.toString(), {
      method: "GET",
      headers: { "X-Tenant-ID": tenantId },
      mode: "cors",
      cache: "no-store",
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload || payload.ok === false) {
      throw new Error(
        payload && payload.error
          ? payload.error
          : `CMS request failed (${response.status}).`,
      );
    }
    return payload.records || {};
  }

  function receivePreviewRecord(event) {
    if (
      !isPreview ||
      !event.data ||
      event.data.type !== "tukodph:preview-record"
    ) {
      return;
    }
    if (!trustedCmsOrigin(event.origin)) return;
    if (event.data.tenant && event.data.tenant !== tenantId) return;
    if (!event.data.record || typeof event.data.record !== "object") return;
    previewRecord = event.data.record;
    latestRecords = mergePreviewRecord(latestRecords, previewRecord);
    applyRecords(latestRecords);
  }

  async function hydrate() {
    try {
      const records = await fetchPublishedContent();
      latestRecords = previewRecord
        ? mergePreviewRecord(records, previewRecord)
        : records;
      applyRecords(latestRecords);
    } catch (error) {
      console.warn("[TukodPH CMS] Using static Higalaay fallback:", error);
      latestRecords = previewRecord
        ? mergePreviewRecord({}, previewRecord)
        : {};
      if (previewRecord) {
        applyRecords(latestRecords);
      } else {
        document.documentElement.dataset.tukodCms = "offline";
      }
    }
  }

  window.addEventListener("message", receivePreviewRecord);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hydrate, {
      once: true,
    });
  } else {
    hydrate();
  }
})();
