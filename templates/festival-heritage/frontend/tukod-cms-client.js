(function tukodCmsRuntime() {
  "use strict";

  const query = new URLSearchParams(window.location.search);
  const config = window.TUKOD_CMS_CONFIG || {};
  const basePath = normalizeBasePath(config.basePath || "");
  const templateId =
    String(config.templateId || "festival-heritage")
      .trim()
      .toLowerCase() || "festival-heritage";
  const supportedTemplateIds = new Set(["festival-heritage"]);
  const isPreview = query.get("tukodPreview") === "1";
  const isLocalHost =
    ["localhost", "127.0.0.1"].includes(window.location.hostname) ||
    window.location.hostname.endsWith(".local");
  const allowQueryOverrides = isPreview && isLocalHost;
  const tenantId = allowQueryOverrides
    ? query.get("cmsTenant") || config.tenantId
    : config.tenantId;
  const apiUrl = allowQueryOverrides
    ? query.get("cmsApi") || config.apiUrl
    : config.apiUrl;
  const debug =
    (allowQueryOverrides && query.get("cmsDebug") === "1") ||
    config.debug === true;
  const previewRecordKey = query.get("cmsRecord") || "";
  const previewRecordPayload = parsePreviewRecordQuery(
    query.get("cmsPreviewRecord"),
  );
  const skipPublicRenderer = window.TUKOD_CMS_SKIP_PUBLIC_RENDERER === true;
  let latestRecords = null;
  let previewRecord = null;
  let observerTimer = null;
  let previewFocused = false;
  let heritageCalendarCategory = "all";
  const countdownTimers = new WeakMap();
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

  function log(...args) {
    if (debug) console.info("[TukodPH CMS]", ...args);
  }

  function reportError(error) {
    console.warn(
      "[TukodPH CMS] Using static fallback content:",
      error.message || error,
    );
    document.documentElement.dataset.tukodCms = "offline";
  }

  if (!supportedTemplateIds.has(templateId)) {
    reportError(
      new Error(
        `The heritage CMS runtime does not support template "${templateId}".`,
      ),
    );
    return;
  }

  function escapeHtml(value) {
    const holder = document.createElement("div");
    holder.textContent = String(value || "");
    return holder.innerHTML;
  }

  function safeLineBreakHtml(value) {
    return escapeHtml(value).replace(/\r?\n/g, "<br>");
  }

  function plainTextFromRichText(value) {
    const holder = document.createElement("div");
    holder.innerHTML = String(value || "");
    return (holder.textContent || holder.innerText || "").trim();
  }

  function displayEventVenue(value) {
    const venue = String(value || "").trim();
    if (!venue) return "";
    return venue.split(",")[0].trim();
  }

  function parsePreviewRecordQuery(raw) {
    const source = String(raw || "").trim();
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

  function formatRichTextHtml(value) {
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
            return `<ul>${lines.map((line) => `<li>${escapeHtml(line.replace(/^[-*]\s+/, ""))}</li>`).join("")}</ul>`;
          }
          if (lines[0].startsWith("## ")) {
            return `<h3>${escapeHtml(lines[0].slice(3))}</h3>${lines
              .slice(1)
              .map((line) => `<p>${escapeHtml(line)}</p>`)
              .join("")}`;
          }
          return `<p>${lines.map((line) => escapeHtml(line)).join("<br>")}</p>`;
        })
        .join("");
    }
    return source;
  }

  function normalizePreviewRecord(record) {
    if (!record || typeof record !== "object") return null;
    const fields =
      record.fields && typeof record.fields === "object" ? record.fields : {};
    const slug = String(
      record.slug || record.id || previewRecordKey || "",
    ).trim();
    const placements = Array.isArray(record.placements)
      ? record.placements.map((value) => normalizePath(value))
      : [];
    const targets = Array.isArray(record.targets)
      ? record.targets
          .filter((target) => target && typeof target === "object")
          .map((target) => ({
            page: normalizePath(target.page || "/"),
            section:
              String(target.section || "end-of-page").trim() || "end-of-page",
          }))
      : [];
    return {
      ...record,
      id: String(record.id || slug),
      slug,
      placements,
      targets,
      fields: {
        eyebrow: String(fields.eyebrow || record.eyebrow || ""),
        heading: String(fields.heading || record.title || ""),
        summary: String(fields.summary || record.excerpt || ""),
        body: String(fields.body || record.body || ""),
        ctaLabel: String(fields.ctaLabel || record.ctaLabel || ""),
        ctaUrl: String(fields.ctaUrl || record.ctaUrl || ""),
        image: String(fields.image || record.image || ""),
        imageAlt: String(fields.imageAlt || record.imageAlt || ""),
        eventDate: String(fields.eventDate || record.eventDate || ""),
        eventEndDate: String(fields.eventEndDate || record.eventEndDate || ""),
        eventCategory: String(
          fields.eventCategory || record.eventCategory || "",
        ),
        featuredHomepageEvent:
          fields.featuredHomepageEvent === true ||
          fields.featuredHomepageEvent === 1 ||
          fields.featuredHomepageEvent === "1" ||
          fields.featuredHomepageEvent === "true",
        featuredEvent:
          fields.featuredEvent === true ||
          fields.featuredEvent === 1 ||
          fields.featuredEvent === "1" ||
          fields.featuredEvent === "true",
        hideCountdown:
          fields.hideCountdown === true ||
          fields.hideCountdown === 1 ||
          fields.hideCountdown === "1" ||
          fields.hideCountdown === "true",
        eventTime: String(fields.eventTime || record.eventTime || ""),
        eventVenue: String(fields.eventVenue || record.eventVenue || ""),
      },
    };
  }

  if (previewRecordPayload) {
    previewRecord = normalizePreviewRecord(previewRecordPayload);
  }

  function recordKeys(record) {
    return [record?.slug, record?.id, previewRecordKey]
      .filter(Boolean)
      .map(String);
  }

  function mergePreviewRecord(records, record) {
    const normalized = normalizePreviewRecord(record);
    if (!normalized) return records;
    previewRecord = normalized;
    const merged = { ...records };
    recordKeys(normalized).forEach((key) => {
      merged[key] = normalized;
    });
    return merged;
  }

  function getField(records, element, attributeName) {
    const recordKey = element.dataset.tukodRecord;
    const fieldName = element.getAttribute(attributeName);
    if (!recordKey || !fieldName) return null;
    const record = records[recordKey];
    const value = record && record.fields ? record.fields[fieldName] : null;
    return typeof value === "string" && value !== "" ? value : null;
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
    selectedValue = heritageCalendarCategory,
  ) {
    if (!selectedValue || selectedValue === "all") return true;
    return eventCategoryValue(record) === selectedValue;
  }

  function addPreviewStyles() {
    if (document.querySelector("#tukod-cms-preview-styles")) return;
    const style = document.createElement("style");
    style.id = "tukod-cms-preview-styles";
    style.textContent = `
      .tukod-cms-preview-focus {
        position: relative !important;
        outline: 4px solid #0f8b7d !important;
        outline-offset: 6px !important;
        scroll-margin-top: 110px !important;
        animation: tukodCmsPreviewPulse 1.4s ease-in-out 2;
      }
      .tukod-cms-preview-focus::before {
        content: 'CMS preview · selected content';
        position: absolute;
        z-index: 2147483646;
        top: 10px;
        left: 10px;
        padding: 7px 10px;
        border-radius: 999px;
        background: #0b2c31;
        color: #fff;
        font: 700 11px/1.1 system-ui, sans-serif;
        letter-spacing: .08em;
        text-transform: uppercase;
        box-shadow: 0 6px 20px rgba(0,0,0,.2);
      }
      #tukod-cms-new-record-preview {
        position: relative;
        z-index: 5;
        margin: 0;
        padding: clamp(42px, 7vw, 92px) clamp(24px, 7vw, 110px);
        background: #f4efe6;
        color: #12272b;
        border-top: 8px solid #0f8b7d;
        border-bottom: 1px solid rgba(18,39,43,.18);
        scroll-margin-top: 100px;
      }
      #tukod-cms-new-record-preview .tukod-preview-inner { max-width: 980px; margin: 0 auto; }
      #tukod-cms-new-record-preview .tukod-preview-status {
        display: inline-flex; align-items: center; gap: 8px; margin-bottom: 28px; padding: 8px 12px;
        border-radius: 999px; background: #0b2c31; color: #fff; font: 700 11px/1.1 system-ui, sans-serif;
        letter-spacing: .08em; text-transform: uppercase;
      }
      #tukod-cms-new-record-preview .tukod-preview-eyebrow { margin: 0 0 14px; font: 700 13px/1.2 system-ui,sans-serif; letter-spacing:.12em; text-transform:uppercase; color:#0f766e; }
      #tukod-cms-new-record-preview h1 { max-width: 900px; margin: 0; font-size: clamp(42px, 7vw, 88px); line-height: .98; letter-spacing: -.045em; }
      #tukod-cms-new-record-preview .tukod-preview-summary { max-width: 760px; margin: 26px 0 0; font-size: clamp(18px, 2.1vw, 25px); line-height: 1.45; }
      #tukod-cms-new-record-preview .tukod-preview-body { max-width: 760px; margin: 22px 0 0; font-size: 16px; line-height: 1.7; }
      #tukod-cms-new-record-preview .tukod-preview-body p,
      #tukod-cms-new-record-preview .tukod-preview-body ul,
      #tukod-cms-new-record-preview .tukod-preview-body ol,
      #tukod-cms-new-record-preview .tukod-preview-body h2,
      #tukod-cms-new-record-preview .tukod-preview-body h3 { margin: 0 0 16px; }
      #tukod-cms-new-record-preview .tukod-preview-body ul,
      #tukod-cms-new-record-preview .tukod-preview-body ol { padding-left: 20px; }
      #tukod-cms-new-record-preview img { display:block; width:100%; max-height:520px; margin-top:32px; object-fit:cover; border-radius:18px; }
      #tukod-cms-new-record-preview .tukod-preview-cta { display:inline-flex; margin-top:28px; padding:13px 18px; border-radius:999px; background:#12272b; color:#fff; text-decoration:none; font-weight:700; }
      #tukod-cms-new-record-preview .tukod-preview-note { margin:34px 0 0; padding-top:18px; border-top:1px solid rgba(18,39,43,.2); font:600 12px/1.5 system-ui,sans-serif; color:#536468; }
      @keyframes tukodCmsPreviewPulse { 0%,100% { outline-color:#0f8b7d; } 50% { outline-color:#f08a45; } }
    `;
    document.head.appendChild(style);
  }

  function resolvePreviewElement(record) {
    for (const key of recordKeys(record)) {
      try {
        const matching = Array.from(
          document.querySelectorAll("[data-tukod-record]"),
        ).filter((element) => element.dataset.tukodRecord === key);
        if (matching.length) {
          return (
            matching[0].closest("section, article, li, main > div") ||
            matching[0]
          );
        }
      } catch (error) {
        log("Unable to resolve preview record element.", error);
      }
    }
    return null;
  }

  function renderNewRecordPreview(record) {
    if (!record || document.querySelector("#tukod-cms-new-record-preview"))
      return;
    const main = document.querySelector("main") || document.body;
    const fields = record.fields || {};
    const section = document.createElement("section");
    section.id = "tukod-cms-new-record-preview";
    const image = fields.image
      ? `<img src="${escapeHtml(safeHref(fields.image, ""))}" alt="${escapeHtml(fields.imageAlt)}">`
      : "";
    const cta =
      fields.ctaLabel && fields.ctaUrl
        ? `<a class="tukod-preview-cta" href="${escapeHtml(safeHref(fields.ctaUrl, "#"))}">${escapeHtml(fields.ctaLabel)} <span aria-hidden="true">↗</span></a>`
        : "";
    section.innerHTML = `<div class="tukod-preview-inner">
      <span class="tukod-preview-status">CMS editorial preview · ${escapeHtml(record.status || "unpublished")}</span>
      ${fields.eyebrow ? `<p class="tukod-preview-eyebrow">${escapeHtml(fields.eyebrow)}</p>` : ""}
      <h1>${safeLineBreakHtml(fields.heading || record.title || "Untitled content")}</h1>
      ${fields.summary ? `<p class="tukod-preview-summary">${escapeHtml(fields.summary)}</p>` : ""}
      ${fields.body ? `<div class="tukod-preview-body">${formatRichTextHtml(fields.body)}</div>` : ""}
      ${image}${cta}
      <p class="tukod-preview-note">This is a new CMS record and does not yet have a permanent component slot on this frontend. It is rendered here for editorial review only. After publication, map its API content key to a frontend component or collection renderer.</p>
    </div>`;
    main.insertBefore(section, main.firstChild);
    window.setTimeout(
      () => section.scrollIntoView({ behavior: "smooth", block: "start" }),
      120,
    );
  }

  function focusPreviewRecord() {
    if (!isPreview || !previewRecord) return;
    addPreviewStyles();
    const existingFallback = document.querySelector(
      "#tukod-cms-new-record-preview",
    );
    const target = resolvePreviewElement(previewRecord);
    if (target) {
      if (existingFallback) existingFallback.remove();
      document
        .querySelectorAll(".tukod-cms-preview-focus")
        .forEach((element) =>
          element.classList.remove("tukod-cms-preview-focus"),
        );
      target.classList.add("tukod-cms-preview-focus");
      if (!previewFocused) {
        previewFocused = true;
        window.setTimeout(
          () => target.scrollIntoView({ behavior: "smooth", block: "center" }),
          180,
        );
      }
      return;
    }
    renderNewRecordPreview(previewRecord);
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

  function recordKey(record) {
    return String(record?.slug || record?.id || "").trim();
  }

  function recordFields(record) {
    return record && typeof record.fields === "object" && record.fields
      ? record.fields
      : {};
  }

  function readBooleanField(value) {
    return value === true || value === 1 || value === "1" || value === "true";
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

  function countdownTargetValue(dateValue, timeValue = "") {
    const date = String(dateValue || "").trim();
    if (!date) return "";
    const time = String(timeValue || "").trim();
    if (!time) return date;
    if (/^\d{2}:\d{2}$/.test(time)) return `${date}T${time}:00+08:00`;
    return date;
  }

  function parseCountdownTarget(value) {
    const raw = String(value || "").trim();
    if (!raw) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      const parsed = new Date(`${raw}T00:00:00+08:00`);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function formatCountdownPart(value, pad = true) {
    const normalized = Math.max(Number(value) || 0, 0);
    return pad ? String(normalized).padStart(2, "0") : String(normalized);
  }

  function clearCountdownTimer(root) {
    const timer = countdownTimers.get(root);
    if (timer) {
      window.clearInterval(timer);
      countdownTimers.delete(root);
    }
  }

  function updateCountdown(root) {
    if (!root || root.hidden || root.dataset.countdownEnabled === "false") {
      if (root) clearCountdownTimer(root);
      return;
    }

    const target = parseCountdownTarget(
      root.dataset.countdownTarget || root.dataset.countdownFallback,
    );
    if (!target) {
      clearCountdownTimer(root);
      return;
    }

    const difference = Math.max(target.getTime() - Date.now(), 0);
    const values = {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    root.querySelectorAll("[data-countdown-value]").forEach((element) => {
      const key = element.getAttribute("data-countdown-value");
      if (!key || !(key in values)) return;
      const nextValue =
        key === "days"
          ? formatCountdownPart(values[key], false)
          : formatCountdownPart(values[key]);
      if (element.textContent !== nextValue) {
        element.textContent = nextValue;
      }
    });

    if (difference === 0) {
      clearCountdownTimer(root);
    }
  }

  function initCountdowns() {
    document.querySelectorAll("[data-countdown]").forEach((root) => {
      clearCountdownTimer(root);
      if (root.hidden || root.dataset.countdownEnabled === "false") {
        return;
      }
      updateCountdown(root);
      countdownTimers.set(
        root,
        window.setInterval(() => updateCountdown(root), 1000),
      );
    });
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
    const hasTargetDate = typeof value === "string" && value.trim().length > 0;
    const shouldShow = Boolean(record) && hasTargetDate && !hideCountdown;
    countdown.hidden = !shouldShow;
    countdown.dataset.countdownEnabled = shouldShow ? "true" : "false";
    if (shouldShow) {
      countdown.dataset.countdownTarget = countdownTargetValue(
        value,
        fields.eventTime,
      );
    } else {
      delete countdown.dataset.countdownTarget;
    }
  }

  function formatEventDateRange(
    startValue,
    endValue,
    { includeYear = false } = {},
  ) {
    const start = parseEventDate(startValue);
    const end = parseEventDate(endValue);
    if (!start && !end) return "";
    if (!start) return formatEventDateRange(endValue, "", { includeYear });
    if (
      !end ||
      end.getTime() === start.getTime() ||
      end.getTime() < start.getTime()
    ) {
      return start.toLocaleDateString(
        "en-US",
        includeYear
          ? { month: "long", day: "numeric", year: "numeric" }
          : { month: "long", day: "numeric" },
      );
    }
    const sameYear = start.getFullYear() === end.getFullYear();
    const sameMonth = sameYear && start.getMonth() === end.getMonth();
    if (sameMonth) {
      const month = start.toLocaleString("en-US", { month: "long" });
      return includeYear
        ? `${month} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`
        : `${month} ${start.getDate()}–${end.getDate()}`;
    }
    const startText = start.toLocaleDateString(
      "en-US",
      includeYear || !sameYear
        ? { month: "long", day: "numeric", year: "numeric" }
        : { month: "long", day: "numeric" },
    );
    const endText = end.toLocaleDateString(
      "en-US",
      includeYear || !sameYear
        ? { month: "long", day: "numeric", year: "numeric" }
        : { month: "long", day: "numeric" },
    );
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

  function eventRecordHref(record) {
    const key = recordKey(record);
    const fields = recordFields(record);
    const configuredHref = safeHref(fields.ctaUrl, "");
    const detailSlug = key
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const dynamicDetailHref = `/events/${encodeURIComponent(detailSlug || key)}/`;
    return configuredHref && !configuredHref.startsWith("#cms-")
      ? configuredHref
      : dynamicDetailHref;
  }

  function buildEmptyAgendaMarkup(title, copy) {
    return `<article class="agenda-item">
      <div class="agenda-date"><span>CMS</span><strong>--</strong></div>
      <div class="agenda-copy">
        <span class="agenda-kicker">Featured events</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(copy)}</p>
      </div>
      <span class="agenda-arrow" aria-hidden="true">↗</span>
    </article>`;
  }

  function isEventRecord(record) {
    const key = recordKey(record).toLowerCase();
    const descriptor = `${record?.type || ""} ${key}`.toLowerCase();
    return (
      /\bevent\b|festival event|schedule item/.test(descriptor) ||
      key.startsWith("event-")
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

  function hasPermanentSlot(record) {
    const key = recordKey(record);
    if (!key) return false;
    return Array.from(document.querySelectorAll("[data-tukod-record]")).some(
      (element) => {
        return (
          element.dataset.tukodRecord === key &&
          !element.closest("[data-tukod-generated]")
        );
      },
    );
  }

  function isPublishedRecord(record) {
    return (
      String(record?.status || "")
        .trim()
        .toLowerCase() === "published"
    );
  }

  function isPreviewTargetRecord(record) {
    if (!isPreview || !previewRecord || !record) return false;
    const previewKeys = new Set(recordKeys(previewRecord));
    return recordKeys(record).some((key) => previewKeys.has(key));
  }

  function isPublicRenderableRecord(record) {
    return isPublishedRecord(record) || isPreviewTargetRecord(record);
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

  function contactStatusNode(form) {
    let statusNode = form.querySelector("[data-tukod-contact-status]");
    if (statusNode) return statusNode;

    statusNode =
      form.querySelector(".form-note") || document.createElement("p");
    statusNode.classList.add("form-note");
    statusNode.dataset.tukodContactStatus = "1";
    if (!statusNode.parentNode) form.appendChild(statusNode);
    return statusNode;
  }

  function updateContactStatus(form, kind, message) {
    const statusNode = contactStatusNode(form);
    statusNode.textContent = message;
    statusNode.setAttribute("role", kind === "error" ? "alert" : "status");
    statusNode.style.color = kind === "error" ? "#b83623" : "#2f665a";
  }

  function setupContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form || form.dataset.tukodContactBound === "1") return;

    form.dataset.tukodContactBound = "1";
    const submitButton = form.querySelector('button[type="submit"]');
    if (!form.querySelector('[name="website"]')) {
      const honeypot = document.createElement("input");
      honeypot.type = "text";
      honeypot.name = "website";
      honeypot.tabIndex = -1;
      honeypot.autocomplete = "off";
      honeypot.setAttribute("aria-hidden", "true");
      honeypot.style.position = "absolute";
      honeypot.style.left = "-9999px";
      form.appendChild(honeypot);
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!tenantId || !apiUrl) {
        updateContactStatus(
          form,
          "error",
          "Contact delivery is not configured for this site yet.",
        );
        return;
      }

      const formData = new FormData(form);
      const payload = {
        tenant: tenantId,
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        interest: String(formData.get("interest") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        website: String(formData.get("website") || "").trim(),
        page: normalizePath(window.location.pathname),
      };

      submitButton?.setAttribute("disabled", "disabled");
      updateContactStatus(
        form,
        "info",
        "Sending your inquiry to the festival desk...",
      );

      try {
        const endpoint = new URL(apiUrl, window.location.href);
        endpoint.searchParams.set("action", "submit-inquiry");
        const response = await fetch(endpoint.toString(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Tenant-ID": tenantId,
          },
          mode: "cors",
          cache: "no-store",
          body: JSON.stringify(payload),
        });
        const result = await response.json().catch(() => null);
        if (!response.ok || !result || result.ok === false) {
          throw new Error(
            result && result.error
              ? result.error
              : `Inquiry request failed (${response.status}).`,
          );
        }

        form.reset();
        updateContactStatus(
          form,
          "success",
          "Inquiry sent. The festival team should receive it shortly.",
        );
      } catch (error) {
        updateContactStatus(
          form,
          "error",
          error.message || "Unable to send your inquiry right now.",
        );
      } finally {
        submitButton?.removeAttribute("disabled");
      }
    });
  }

  function publicRecordMatchesPage(record, pathname) {
    const targets = Array.isArray(record?.targets)
      ? record.targets.map((target) => normalizePath(target?.page || "/"))
      : [];
    const page = normalizePath(record?.page || "/");
    const placements = Array.isArray(record?.placements)
      ? record.placements.map((value) => normalizePath(value))
      : [];
    const pages = [
      ...new Set([page].concat(placements, targets).filter(Boolean)),
    ];
    if (pages.includes(pathname)) return true;
    if (
      pathname.startsWith("/events/") &&
      pathname !== "/events" &&
      isSiteWidgetRecord(record) &&
      normalizedWidgetType(record) === "partner-recognition" &&
      pages.includes("/events")
    ) {
      return true;
    }
    if (pathname === "/events" && isEventRecord(record)) {
      return page === "/" || page === "/events" || page.startsWith("/events/");
    }
    return false;
  }

  function generatedSignature(record) {
    const fields = recordFields(record);
    return JSON.stringify([
      recordKey(record),
      record?.page || "/",
      Array.isArray(record?.placements) ? record.placements.join("|") : "",
      Array.isArray(record?.targets)
        ? record.targets
            .map((target) => `${target?.page || ""}:${target?.section || ""}`)
            .join("|")
        : "",
      record?.type || "",
      record?.updatedAt || "",
      fields.eyebrow || "",
      fields.heading || "",
      fields.summary || "",
      fields.body || "",
      fields.ctaLabel || "",
      fields.ctaUrl || "",
      fields.image || "",
      fields.imageAlt || "",
      fields.widgetEnabled ?? "",
      fields.widgetConfig || "",
      fields.eventDate || "",
      fields.eventEndDate || "",
      fields.eventTime || "",
      fields.eventVenue || "",
    ]);
  }

  const dynamicSectionSlotsByPage = {
    "/": [
      {
        id: "home-hero-copy",
        selector: '[data-tukod-slot-anchor="home-hero-copy"]',
      },
      {
        id: "home-hero-gallery",
        selector: '[data-tukod-slot-anchor="home-hero-gallery"]',
      },
      { id: "route-section", selector: ".route-section" },
      { id: "manifesto-section", selector: ".manifesto-section" },
      { id: "program-section", selector: ".program-section" },
      { id: "city-section", selector: ".city-section" },
      { id: "volunteer-callout", selector: ".volunteer-callout" },
      { id: "partner-band", selector: ".partner-band" },
    ],
    "/about": [
      { id: "about-hero", selector: ".page-intro" },
      { id: "story-opening", selector: ".story-opening" },
      { id: "roots-section", selector: ".roots-section" },
      { id: "timeline-section", selector: ".timeline-section" },
    ],
    "/events": [
      { id: "events-hero", selector: ".page-intro" },
      { id: "schedule-overview", selector: ".schedule-overview" },
      { id: "all-events-section", selector: ".all-events-section" },
      { id: "visit-note-section", selector: ".visit-note-section" },
    ],
    "/contact": [
      { id: "contact-hero", selector: ".page-intro" },
      { id: "contact-section", selector: ".contact-section" },
      { id: "contact-bottom-strip", selector: ".contact-bottom-strip" },
    ],
    "/volunteer": [
      { id: "volunteer-hero", selector: ".page-intro" },
      { id: "volunteer-intro", selector: ".volunteer-intro" },
      { id: "volunteer-roles-section", selector: ".volunteer-roles-section" },
      {
        id: "volunteer-process-section",
        selector: ".volunteer-process-section",
      },
      { id: "volunteer-form-section", selector: ".volunteer-form-section" },
    ],
    "/sponsor": [
      { id: "sponsor-hero", selector: ".page-intro" },
      { id: "partnership-intro", selector: ".partnership-intro" },
      { id: "tier-section", selector: ".tier-section" },
      { id: "partner-cta-section", selector: ".partner-cta-section" },
    ],
    "/plan-your-festival-days": [
      { id: "visitor-hero", selector: ".page-intro" },
      { id: "guide-intro", selector: ".guide-intro" },
      { id: "guide-group-1", selector: ".guide-group-1" },
      { id: "guide-group-2", selector: ".guide-group-2" },
      { id: "guide-group-3", selector: ".guide-group-3" },
      { id: "guide-group-4", selector: ".guide-group-4" },
      { id: "guide-return", selector: ".guide-return" },
    ],
  };

  function sectionTargetForRecord(record, pathname) {
    const targets = Array.isArray(record?.targets) ? record.targets : [];
    const match = targets.find(
      (target) => normalizePath(target?.page || "/") === pathname,
    );
    if (match) {
      return String(match.section || "end-of-page").trim() || "end-of-page";
    }
    if (
      pathname.startsWith("/events/") &&
      pathname !== "/events" &&
      isSiteWidgetRecord(record) &&
      normalizedWidgetType(record) === "partner-recognition"
    ) {
      const listingTarget = targets.find(
        (target) => normalizePath(target?.page || "/") === "/events",
      );
      if (listingTarget) {
        return (
          String(listingTarget.section || "end-of-page").trim() || "end-of-page"
        );
      }
    }
    return "end-of-page";
  }

  function parseRawSectionTargetKey(sectionKey) {
    const clean = String(sectionKey || "end-of-page").trim() || "end-of-page";
    if (!clean || clean === "end-of-page") {
      return { position: "end-of-page", anchorId: "" };
    }
    const matched = clean.match(/^(before|after)-(.+)$/);
    if (matched) {
      return { position: matched[1], anchorId: matched[2] };
    }
    return { position: "after", anchorId: clean };
  }

  function isSiteWidgetRecord(record) {
    return recordFields(record).widgetKind === "site-widget";
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

  function siteWidgetIsEnabled(record) {
    return normalizeWidgetEnabledValue(recordFields(record).widgetEnabled);
  }

  function widgetOrder(record) {
    return Number(recordFields(record).widgetOrder || 0);
  }

  const widgetTypeAliases = {
    "homepage-hero": "hero",
    "homepage-ticker-band": "ticker-band",
    "featured-events-feed": "featured",
    "homepage-partner-recognition": "partner-recognition",
    "homepage-about": "about",
    "homepage-explore": "explore",
    "homepage-visit-band": "visit-band",
  };

  const supportedSiteWidgetTypes = new Set([
    "hero",
    "hero-gallery",
    "ticker-band",
    "post",
    "cta",
    "featured-image",
    "event",
    "featured",
    "partner-recognition",
    "about",
    "story",
    "value-strip",
    "explore",
    "visit-band",
  ]);

  const widgetContentCategories = {
    hero: "hero",
    "hero-gallery": "hero-gallery",
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

  function normalizedWidgetType(record) {
    const raw = String(recordFields(record).widgetType || "").trim();
    return widgetTypeAliases[raw] || raw;
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

  function isWidgetManagedSourceRecord(records, record, pathname) {
    const key = recordKey(record);
    if (!key) return false;
    return Object.values(records || {}).some((candidate) => {
      if (!candidate || !isSiteWidgetRecord(candidate)) return false;
      if (String(recordFields(candidate).widgetSourceId || "").trim() !== key) {
        return false;
      }
      if (!supportedSiteWidgetTypes.has(normalizedWidgetType(candidate))) {
        return false;
      }
      return publicRecordMatchesPage(candidate, pathname);
    });
  }

  function parseWidgetConfigObject(value) {
    if (!value) return {};
    if (typeof value === "object") return value || {};
    try {
      const parsed = JSON.parse(String(value || ""));
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function wordmarkParts(value) {
    const clean = String(value || "").trim();
    if (!clean) return ["", "", ""];
    if (clean.toLowerCase() === "diyandi") {
      return [clean.slice(0, 2), clean.slice(2, 5), clean.slice(5)];
    }
    return [
      clean.slice(0, Math.ceil(clean.length / 3)),
      clean.slice(
        Math.ceil(clean.length / 3),
        Math.ceil((clean.length * 2) / 3),
      ),
      clean.slice(Math.ceil((clean.length * 2) / 3)),
    ];
  }

  function buildHomeHeroCopyWidget(sourceFields) {
    const config = parseWidgetConfigObject(sourceFields.widgetConfig);
    const overlineLabel = String(
      config.overlineLabel || "Official festival guide",
    ).trim();
    const secondaryCtaLabel = String(
      config.secondaryCtaLabel || "Discover the story",
    ).trim();
    const secondaryCtaUrl = safeHref(
      String(config.secondaryCtaUrl || "./about/"),
      "./about/",
    );
    const parts = wordmarkParts(sourceFields.heading || "");
    const wrapper = document.createElement("div");
    wrapper.className = "tukod-home-hero-copy-widget";
    wrapper.innerHTML = `<div class="hero-overline">
      <span>${escapeHtml(sourceFields.eyebrow || "")}</span>
      <span>${escapeHtml(overlineLabel)}</span>
    </div>
    <h1 id="home-title" class="hero-wordmark" aria-label="${escapeHtml(sourceFields.heading || "")}">
      <span>${escapeHtml(parts[0] || "")}</span><span>${escapeHtml(parts[1] || "")}</span><span>${escapeHtml(parts[2] || "")}</span>
    </h1>
    <div class="hero-copy-bottom">
      ${sourceFields.summary ? `<p>${escapeHtml(sourceFields.summary)}</p>` : ""}
      <div class="hero-actions">
        <a href="${escapeHtml(safeHref(sourceFields.ctaUrl || "./events/", "./events/"))}" class="button-solid">${escapeHtml(sourceFields.ctaLabel || "Explore the festival")} <span aria-hidden="true">↗</span></a>
        <a href="${escapeHtml(secondaryCtaUrl)}" class="button-text">${escapeHtml(secondaryCtaLabel)} <span aria-hidden="true">→</span></a>
      </div>
    </div>`;
    return wrapper;
  }

  function buildHomeHeroGalleryWidget(sourceFields, source) {
    const config = parseWidgetConfigObject(sourceFields.widgetConfig);
    const poster =
      config.poster && typeof config.poster === "object" ? config.poster : {};
    const mainImage = safeHref(
      String(
        config.mainImage ||
          sourceFields.image ||
          "./generated-images/diyandi-street-dance.png",
      ),
      "./generated-images/diyandi-street-dance.png",
    );
    if (!mainImage) return null;
    const ritualImage = safeHref(
      String(config.ritualImage || "./generated-images/diyandi-ritual.png"),
      "./generated-images/diyandi-ritual.png",
    );
    const marketImage = safeHref(
      String(config.marketImage || "./generated-images/diyandi-market.png"),
      "./generated-images/diyandi-market.png",
    );
    const title = String(
      sourceFields.heading || source.title || "Street dancing",
    ).trim();
    const resolvedTitle =
      title && !/^hero gallery widget\b/i.test(title)
        ? title
        : String(config.mainTitle || "Street dancing").trim();
    const caption = String(
      sourceFields.summary || config.caption || "Viva SeÃ±or San Miguel",
    ).trim();
    const wrapper = document.createElement("div");
    wrapper.className = "tukod-home-hero-gallery-widget";
    wrapper.style.display = "contents";
    wrapper.innerHTML = `<figure class="hero-gallery-main">
      <img src="${escapeHtml(mainImage)}" alt="${escapeHtml(config.mainImageAlt || sourceFields.imageAlt || resolvedTitle || "Festival hero gallery image")}"/>
      <figcaption><strong>${escapeHtml(resolvedTitle)}</strong></figcaption>
    </figure>
    ${
      ritualImage
        ? `<figure class="hero-gallery-small hero-gallery-ritual"><img src="${escapeHtml(ritualImage)}" alt="${escapeHtml(config.ritualImageAlt || "Festival portrait in ceremonial attire")}"/></figure>`
        : ""
    }
    ${
      marketImage
        ? `<figure class="hero-gallery-small hero-gallery-market"><img src="${escapeHtml(marketImage)}" alt="${escapeHtml(config.marketImageAlt || "Festival market scene in Iligan City")}"/></figure>`
        : ""
    }
    <div class="festival-date-poster" aria-label="${escapeHtml(config.posterLabel || "Festival dates")}">
      <span>${escapeHtml(String(poster.month || "SEP"))}</span>
      <strong>${escapeHtml(String(poster.start || "20"))}</strong>
      <i>${escapeHtml(String(poster.connector || "TO"))}</i>
      <strong>${escapeHtml(String(poster.end || "29"))}</strong>
      <small>${escapeHtml(String(poster.year || "2026"))}</small>
    </div>
    <div class="gallery-caption" aria-hidden="true">${escapeHtml(sourceFields.summary || config.caption || "Viva Señor San Miguel")}</div>`;
    return wrapper;
  }

  function parseSectionTargetKey(pathname, sectionKey) {
    const clean = String(sectionKey || "end-of-page").trim() || "end-of-page";
    const slots = dynamicSectionSlotsByPage[pathname] || [];
    if (!clean || clean === "end-of-page")
      return { position: "end-of-page", anchorId: "" };
    const direct = slots.find((slot) => slot.id === clean);
    if (direct) return { position: "after", anchorId: direct.id };
    const matched = clean.match(/^(before|after)-(.+)$/);
    if (matched && slots.some((slot) => slot.id === matched[2])) {
      return { position: matched[1], anchorId: matched[2] };
    }
    return { position: "end-of-page", anchorId: "" };
  }

  function slotDefinitionForPath(pathname, sectionKey) {
    const parsed = parseSectionTargetKey(pathname, sectionKey);
    if (parsed.position === "end-of-page") return null;
    const slot =
      (dynamicSectionSlotsByPage[pathname] || []).find(
        (entry) => entry.id === parsed.anchorId,
      ) || null;
    return slot
      ? {
          ...slot,
          key: `${parsed.position}-${slot.id}`,
          position: parsed.position,
        }
      : null;
  }

  function firstSectionStyle(section, selectors) {
    const element = section?.querySelector(selectors);
    return element ? window.getComputedStyle(element) : null;
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

  function inheritSiteWidgetSectionStyle(widget, section, anchorId) {
    if (!widget || !section) return widget;
    const sectionStyle = window.getComputedStyle(section);
    const surfaceStyle = sectionSurfaceStyle(section) || sectionStyle;
    const headingStyle = firstSectionStyle(section, "h1, h2, h3");
    const bodyStyle = firstSectionStyle(
      section,
      "p:not(.section-label):not([class*='kicker']):not([class*='label'])",
    );
    const accentStyle = firstSectionStyle(
      section,
      ".section-label, [class*='eyebrow'], [class*='kicker'], [class*='label']",
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
      "--tukod-widget-font-family": sectionStyle.fontFamily,
      "--tukod-widget-heading-color": headingStyle?.color || sectionStyle.color,
      "--tukod-widget-heading-font-family":
        headingStyle?.fontFamily || sectionStyle.fontFamily,
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
    if (anchorId) widget.dataset.tukodStyleSource = anchorId;
    return widget;
  }

  function addSiteWidgetStyles() {
    if (document.querySelector("#tukod-cms-site-widget-styles")) return;
    const style = document.createElement("style");
    style.id = "tukod-cms-site-widget-styles";
    style.textContent = `
      .tukod-site-widget {
        position: relative;
        width: min(1120px, calc(100% - 40px));
        margin: 28px auto;
        padding: clamp(24px, 4vw, 36px);
        border-radius: var(--tukod-widget-border-radius, 24px);
        background-color: var(--tukod-widget-background-color, #f5f0e7);
        background-image: var(--tukod-widget-background-image, none);
        background-position: var(--tukod-widget-background-position, initial);
        background-size: var(--tukod-widget-background-size, auto);
        background-repeat: var(--tukod-widget-background-repeat, repeat);
        color: var(--tukod-widget-color, #14272b);
        font-family: var(--tukod-widget-font-family, inherit);
        box-shadow: var(--tukod-widget-box-shadow, 0 18px 44px rgba(20, 39, 43, .12));
      }
      .tukod-site-widget.tukod-site-widget-image {
        padding: 0;
        background: transparent;
        box-shadow: none;
      }
      .tukod-site-widget-inner {
        display: grid;
        gap: 18px;
      }
      .tukod-site-widget.has-image .tukod-site-widget-inner {
        grid-template-columns: minmax(0, 1.1fr) minmax(260px, .9fr);
        align-items: center;
      }
      .tukod-site-widget-kicker {
        margin: 0 0 10px;
        color: var(--tukod-widget-accent-color, #0f766e);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .16em;
        text-transform: uppercase;
      }
      .tukod-site-widget h1,
      .tukod-site-widget h2,
      .tukod-site-widget h3 {
        margin: 0;
        color: var(--tukod-widget-heading-color, inherit);
        font-family: var(--tukod-widget-heading-font-family, inherit);
        font-size: clamp(30px, 4vw, 46px);
        line-height: 1;
      }
      .tukod-site-widget p {
        margin: 0;
        color: var(--tukod-widget-body-color, #41555a);
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
        background: color-mix(in srgb, var(--tukod-widget-accent-color, #0f766e) 10%, transparent);
        color: var(--tukod-widget-accent-color, #0f766e);
        font-size: 12px;
        font-weight: 700;
      }
      .tukod-site-widget-cta {
        display: inline-flex;
        gap: 8px;
        align-items: center;
        margin-top: 18px;
        color: var(--tukod-widget-link-color, #14272b);
        font-weight: 700;
        text-decoration: none;
      }
      .tukod-site-widget-media img,
      .tukod-site-widget-image img {
        display: block;
        width: 100%;
        border-radius: var(--tukod-widget-border-radius, 20px);
        object-fit: cover;
      }
      .tukod-site-widget-partner-recognition .tukod-site-widget-inner {
        grid-template-columns: minmax(180px, .4fr) minmax(0, 1fr);
        align-items: center;
      }
      .tukod-site-widget-partner-logos {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 18px;
        align-items: center;
      }
      .tukod-site-widget-partner-logo {
        display: flex;
        min-height: 86px;
        padding: 14px;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        background: #fff;
      }
      .tukod-site-widget-partner-logo img {
        display: block;
        width: 100%;
        max-height: 56px;
        object-fit: contain;
      }
      @media (max-width: 780px) {
        .tukod-site-widget.has-image .tukod-site-widget-inner,
        .tukod-site-widget-partner-recognition .tukod-site-widget-inner {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function addPublicRendererStyles() {
    if (document.querySelector("#tukod-cms-public-renderer-styles")) return;
    const style = document.createElement("style");
    style.id = "tukod-cms-public-renderer-styles";
    style.textContent = `
      .tukod-cms-dynamic-section {
        position: relative;
        padding: clamp(56px, 8vw, 112px) clamp(24px, 7vw, 110px);
        background: #f5f0e7;
        color: #14272b;
        border-top: 1px solid rgba(20,39,43,.18);
      }
      .tukod-cms-dynamic-section:nth-child(even) { background: #e9efe9; }
      .tukod-cms-dynamic-inner { width: min(1120px, 100%); margin: 0 auto; display: grid; grid-template-columns: minmax(0,850px); gap: clamp(34px,6vw,86px); align-items: center; }
      .tukod-cms-dynamic-section.has-image .tukod-cms-dynamic-inner { grid-template-columns: minmax(0,1fr) minmax(280px,.75fr); }
      .tukod-cms-dynamic-eyebrow { margin: 0 0 16px; font: 700 12px/1.3 system-ui,sans-serif; letter-spacing: .14em; text-transform: uppercase; color: #146f68; }
      .tukod-cms-dynamic-section h2 { margin: 0; font-size: clamp(38px,5.4vw,76px); line-height: 1; letter-spacing: -.045em; }
      .tukod-cms-dynamic-summary { max-width: 760px; margin: 24px 0 0; font-size: clamp(18px,2vw,24px); line-height: 1.5; }
      .tukod-cms-dynamic-event-meta { display:flex; flex-wrap:wrap; gap:10px; margin: 22px 0 0; }
      .tukod-cms-dynamic-event-meta span { display:inline-flex; align-items:center; min-height:34px; padding:8px 12px; border-radius:999px; background: rgba(20,39,43,.08); color:#173338; font: 700 12px/1.2 system-ui,sans-serif; letter-spacing:.04em; text-transform: uppercase; }
      .tukod-cms-dynamic-body { max-width: 760px; margin: 22px 0 0; font-size: 16px; line-height: 1.75; }
      .tukod-cms-dynamic-body p,
      .tukod-cms-dynamic-body ul,
      .tukod-cms-dynamic-body ol,
      .tukod-cms-dynamic-body h2,
      .tukod-cms-dynamic-body h3 { margin: 0 0 16px; }
      .tukod-cms-dynamic-body ul,
      .tukod-cms-dynamic-body ol { padding-left: 20px; }
      .tukod-cms-dynamic-image { width: 100%; max-height: 560px; object-fit: cover; border-radius: 4px; }
      .tukod-cms-dynamic-cta { display: inline-flex; align-items: center; gap: 10px; margin-top: 28px; padding: 13px 18px; background: #14272b; color: #fff; text-decoration: none; font-weight: 700; }
      .agenda-item.tukod-cms-generated-event { scroll-margin-top: 110px; }
      // .agenda-item.tukod-cms-generated-event .agenda-date strong { font-size: clamp(20px,2vw,32px); }
      .agenda-item.tukod-cms-generated-event .agenda-meta { margin: 10px 0 0; color: rgba(20,39,43,.72); font-size: 12px; line-height: 1.6; }
      .agenda-item.tukod-cms-generated-event .agenda-date .tukod-event-category { margin-top: 10px; color: #b83623; font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; line-height: 1.4; }
      .tukod-event-category-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin: 0 0 24px; padding-top: 18px; }
      .tukod-event-category-tab { appearance: none; border: 1px solid rgba(36,24,29,.14); background: transparent; color: #24181d; cursor: pointer; padding: 10px 14px; font: 800 10px/1.2 system-ui, sans-serif; letter-spacing: .12em; text-transform: uppercase; }
      .tukod-event-category-tab.is-active { background: #24181d; border-color: #24181d; color: #fffdf8; }
      .calendar-row .tukod-calendar-category { display: inline-block; margin-top: 6px; color: #b83623; font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
      @media (max-width: 760px) {
        .tukod-cms-dynamic-inner { grid-template-columns: 1fr; }
        .tukod-cms-dynamic-image { order: -1; max-height: 420px; }
      }
    `;
    document.head.appendChild(style);
  }

  function splitEventLabel(value) {
    const clean = String(value || "").trim();
    const match = clean.match(
      /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2})\b/i,
    );
    if (match)
      return { month: match[1].slice(0, 3), day: match[2], kicker: clean };
    return { month: "CMS", day: "NEW", kicker: clean || "New festival update" };
  }

  function eventDateParts(value, fallback = "") {
    const clean = String(value || "").trim();
    if (clean) {
      const matched = clean.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (matched) {
        const year = Number(matched[1]);
        const month = Number(matched[2]);
        const day = Number(matched[3]);
        const date = new Date(year, month - 1, day);
        if (!Number.isNaN(date.getTime())) {
          return {
            month: date.toLocaleString("en-US", { month: "short" }),
            day: String(day),
            long: date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            }),
          };
        }
      }
      const parsed = new Date(clean);
      if (!Number.isNaN(parsed.getTime())) {
        return {
          month: parsed.toLocaleString("en-US", { month: "short" }),
          day: parsed.toLocaleString("en-US", { day: "2-digit" }),
          long: parsed.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          }),
        };
      }
    }
    const legacy = splitEventLabel(fallback);
    return { month: legacy.month, day: legacy.day, long: "" };
  }

  function eventMetaItems(fields, { includeDate = true } = {}) {
    const items = [];
    const dateInfo = eventDateParts(fields.eventDate, fields.eyebrow);
    if (includeDate) {
      items.push(
        formatEventDateRange(fields.eventDate, fields.eventEndDate) ||
          dateInfo.long,
      );
    }
    if (fields.eventTime) items.push(String(fields.eventTime).trim());
    if (fields.eventVenue) items.push(displayEventVenue(fields.eventVenue));
    return items.filter(Boolean);
  }

  function buildEventCard(record, position) {
    const key = recordKey(record);
    const fields = recordFields(record);
    const label = eventDateParts(fields.eventDate, fields.eyebrow);
    const metaLine = eventMetaItems(fields, { includeDate: false }).join(" • ");
    const kicker =
      String(fields.eyebrow || "").trim() ||
      (metaLine ? "Festival event" : "New festival update");
    const id = `cms-${key}`;
    const href = eventRecordHref(record);
    const image = safeHref(
      fields.image || "/generated-images/diyandi-night.png",
      "",
    );
    const alt = String(
      fields.imageAlt || fields.heading || "Diyandi Festival event",
    );
    const card = document.createElement("a");
    card.className = "agenda-item tukod-cms-generated-event";
    card.id = id;
    card.href = href;
    card.dataset.tukodGenerated = key;
    card.dataset.tukodSignature = generatedSignature(record);
    card.innerHTML = `
      <div class="agenda-date"><span>${escapeHtml(label.month)}</span><strong>${escapeHtml(label.day)}</strong>${eventCategoryValue(fields) ? `<small class="tukod-event-category">${escapeHtml(eventCategoryValue(fields))}</small>` : ""}</div>
      <div class="agenda-copy">
        <span class="agenda-kicker">${escapeHtml(kicker)}</span>
        <h3 data-tukod-record="${escapeHtml(key)}" data-tukod-text-field="heading">${escapeHtml(fields.heading || record.title || "Untitled event")}</h3>
        ${metaLine ? `<p class="agenda-meta">${escapeHtml(metaLine)}</p>` : ""}
        ${fields.summary ? `<p data-tukod-record="${escapeHtml(key)}" data-tukod-text-field="summary">${escapeHtml(fields.summary)}</p>` : ""}
      </div>
      <figure class="agenda-media"><img src="${escapeHtml(image)}" alt="${escapeHtml(alt)}"><span>${String(position).padStart(2, "0")}</span></figure>
      <span class="agenda-arrow" aria-hidden="true">↗</span>`;
    return card;
  }

  function eventListSelectorForPath(pathname) {
    if (pathname === "/") return ".program-section .agenda-list";
    if (pathname === "/events") return ".all-events-section .agenda-list";
    return "";
  }

  function isHomepageFeaturedEvent(record) {
    return Boolean(recordFields(record).featuredHomepageEvent);
  }

  function isEventsPageFeaturedEvent(record) {
    return Boolean(recordFields(record).featuredEvent);
  }

  function hydrateFeaturedEventList(records, pathname) {
    const target = document.querySelector(eventListSelectorForPath(pathname));
    if (!target) return;

    const featuredEvents = Object.values(records || {})
      .filter(
        (record) =>
          record &&
          isCmsManagedEventRecord(record) &&
          isPublicRenderableRecord(record),
      )
      .sort(sortEvents)
      .filter((record) =>
        pathname === "/"
          ? isHomepageFeaturedEvent(record)
          : isEventsPageFeaturedEvent(record),
      )
      .slice(0, pathname === "/" ? 4 : 6);

    if (!featuredEvents.length) {
      target.innerHTML = buildEmptyAgendaMarkup(
        pathname === "/"
          ? "No homepage featured events yet"
          : "No events-page featured events yet",
        pathname === "/"
          ? "Feature events from the CMS to highlight them on the homepage."
          : "Use the CMS event modal to feature specific events here. All published events still belong in the calendar.",
      );
      return;
    }

    target.innerHTML = "";
    featuredEvents.forEach((record, index) => {
      target.appendChild(buildEventCard(record, index + 1));
    });
  }

  function buildHeritageCalendarRow(record) {
    const fields = recordFields(record);
    const date = parseEventDate(fields.eventDate);
    const dateLabel =
      formatEventDateRange(fields.eventDate, fields.eventEndDate) ||
      (date
        ? date.toLocaleString("en-US", { month: "short", day: "numeric" })
        : "TBA");
    const title = fields.heading || record.title || "Untitled event";
    return `<div class="calendar-row">
      <span class="calendar-time">${escapeHtml(fields.eventTime ? `${dateLabel} / ${fields.eventTime}` : dateLabel)}</span>
      <div><a href="${escapeHtml(eventRecordHref(record))}">${escapeHtml(title)}</a>${eventCategoryValue(fields) ? `<span class="tukod-calendar-category">${escapeHtml(eventCategoryValue(fields))}</span>` : ""}<p>${escapeHtml(fields.summary || "See event details for the latest schedule updates.")}</p></div>
      <span class="calendar-venue">${escapeHtml(displayEventVenue(fields.eventVenue || "") || "TBA")}</span>
      <span class="calendar-action">View details</span>
    </div>`;
  }

  function buildHeritageCalendarEmptyRow() {
    return `<div class="calendar-row calendar-row-planning">
      <span class="calendar-time">No events yet</span>
      <div><strong>Awaiting published events</strong><p>Published events for this week will appear here automatically.</p></div>
      <span class="calendar-venue">Festival calendar</span>
      <span class="calendar-action">Planning support</span>
    </div>`;
  }

  function ensureHeritageCategoryTabs(records) {
    if (normalizePath(window.location.pathname) !== "/events") return;
    const calendar = document.querySelector(".event-calendar");
    if (!calendar) return;
    let tabs = calendar.querySelector(".tukod-event-category-tabs");
    if (!tabs) {
      tabs = document.createElement("div");
      tabs.className = "tukod-event-category-tabs";
      tabs.setAttribute("role", "tablist");
      tabs.setAttribute("aria-label", "Filter events by category");
      const weekTabs = calendar.querySelector(".week-tabs");
      calendar.insertBefore(tabs, weekTabs || calendar.firstChild);
      tabs.addEventListener("click", (event) => {
        const button = event.target.closest("[data-event-category-filter]");
        if (!button) return;
        heritageCalendarCategory =
          String(button.dataset.eventCategoryFilter || "all").trim() || "all";
        ensureHeritageCategoryTabs(latestRecords || records);
        hydrateHeritageEventCalendar(latestRecords || records);
      });
    }
    const publishedEvents = Object.values(records || {}).filter(
      (record) =>
        record &&
        isCmsManagedEventRecord(record) &&
        isPublicRenderableRecord(record),
    );
    tabs.innerHTML = EVENT_CATEGORY_OPTIONS.map((option) => {
      const count = option.category
        ? publishedEvents.filter(
            (record) => eventCategoryValue(record) === option.category,
          ).length
        : publishedEvents.length;
      return `<button type="button" class="tukod-event-category-tab ${heritageCalendarCategory === option.value ? "is-active" : ""}" role="tab" aria-selected="${heritageCalendarCategory === option.value}" data-event-category-filter="${escapeHtml(option.value)}">${escapeHtml(option.label)}${count ? ` (${count})` : ""}</button>`;
    }).join("");
  }

  function hydrateHeritageEventCalendar(records) {
    if (normalizePath(window.location.pathname) !== "/events") return;
    const panels = Array.from(
      document.querySelectorAll(".event-calendar .week-panel"),
    );
    if (!panels.length) return;
    ensureHeritageCategoryTabs(records);

    const grouped = new Map([
      [1, []],
      [2, []],
      [3, []],
      [4, []],
      [5, []],
    ]);
    Object.values(records || {})
      .filter((record) => record && isCmsManagedEventRecord(record))
      .filter((record) => eventCategoryMatches(record))
      .sort(sortEvents)
      .forEach((record) => {
        const date = parseEventDate(recordFields(record).eventDate);
        if (!date) return;
        const weekIndex = Math.max(
          1,
          Math.min(5, Math.floor((date.getDate() - 1) / 7) + 1),
        );
        grouped.get(weekIndex)?.push(record);
      });

    panels.forEach((panel) => {
      const match = panel.id.match(/week-(\d)-panel/);
      if (!match) return;
      const weekIndex = Number(match[1]);
      const events = grouped.get(weekIndex) || [];
      panel.innerHTML = `<div class="calendar-table" aria-label="Week ${weekIndex} activities"><div class="calendar-row calendar-head"><span>Time</span><span>Activity</span><span>Venue</span><span>Status</span></div>${events.length ? events.map(buildHeritageCalendarRow).join("") : buildHeritageCalendarEmptyRow()}</div>`;
    });
  }

  function ensureEventRecord(record, desiredKeys, pathname) {
    const key = recordKey(record);
    const target = document.querySelector(eventListSelectorForPath(pathname));
    if (!key || !target) return false;
    desiredKeys.add(key);
    const existing = Array.from(
      target.querySelectorAll("[data-tukod-generated]"),
    ).find((element) => element.dataset.tukodGenerated === key);
    const signature = generatedSignature(record);
    if (existing && existing.dataset.tukodSignature === signature) return true;
    const position =
      target.querySelectorAll(".agenda-item").length + (existing ? 0 : 1);
    const card = buildEventCard(record, position);
    if (existing) existing.replaceWith(card);
    else target.appendChild(card);
    return true;
  }

  function insertSectionForSlot(
    section,
    pathname,
    sectionKey,
    existing = null,
  ) {
    const slot = slotDefinitionForPath(pathname, sectionKey);
    const sameSlotSections = Array.from(
      document.querySelectorAll("[data-tukod-generated][data-tukod-slot]"),
    ).filter((element) => element.dataset.tukodSlot === sectionKey);
    if (existing) {
      existing.replaceWith(section);
      return section;
    }
    const main = document.querySelector("main") || document.body;
    if (slot) {
      const anchor = document.querySelector(slot.selector);
      if (anchor?.parentNode) {
        if (slot.position === "before") {
          const firstExisting = sameSlotSections[0];
          if (firstExisting?.parentNode)
            firstExisting.parentNode.insertBefore(section, firstExisting);
          else anchor.parentNode.insertBefore(section, anchor);
        } else {
          const lastExisting = sameSlotSections[sameSlotSections.length - 1];
          if (lastExisting)
            lastExisting.insertAdjacentElement("afterend", section);
          else anchor.insertAdjacentElement("afterend", section);
        }
        return section;
      }
    }
    const before = main.querySelector(":scope > .visit-note-section");
    if (before) main.insertBefore(section, before);
    else main.appendChild(section);
    return section;
  }

  function insertSiteWidgetForSlot(section, pathname, sectionKey) {
    const directTarget = parseRawSectionTargetKey(sectionKey);
    const slot = slotDefinitionForPath(pathname, sectionKey);
    const sameSlotSections = Array.from(
      document.querySelectorAll(
        "[data-tukod-generated-widget][data-tukod-slot]",
      ),
    ).filter((element) => element.dataset.tukodSlot === sectionKey);
    const main = document.querySelector("main") || document.body;
    const directAnchor = directTarget.anchorId
      ? document.querySelector(
          `[data-tukod-slot-anchor="${directTarget.anchorId}"]`,
        )
      : null;
    if (directAnchor?.parentNode) {
      inheritSiteWidgetSectionStyle(
        section,
        directAnchor.parentElement || directAnchor,
        directTarget.anchorId,
      );
      if (directTarget.position === "before") {
        const firstExisting = sameSlotSections[0];
        if (firstExisting?.parentNode) {
          firstExisting.parentNode.insertBefore(section, firstExisting);
        } else {
          directAnchor.parentNode.insertBefore(section, directAnchor);
        }
      } else {
        const lastExisting = sameSlotSections[sameSlotSections.length - 1];
        if (lastExisting) {
          lastExisting.insertAdjacentElement("afterend", section);
        } else {
          directAnchor.insertAdjacentElement("afterend", section);
        }
      }
      return section;
    }
    if (slot) {
      const anchor = document.querySelector(slot.selector);
      if (anchor?.parentNode) {
        inheritSiteWidgetSectionStyle(section, anchor, slot.id);
        if (slot.position === "before") {
          const firstExisting = sameSlotSections[0];
          if (firstExisting?.parentNode)
            firstExisting.parentNode.insertBefore(section, firstExisting);
          else anchor.parentNode.insertBefore(section, anchor);
        } else {
          const lastExisting = sameSlotSections[sameSlotSections.length - 1];
          if (lastExisting)
            lastExisting.insertAdjacentElement("afterend", section);
          else anchor.insertAdjacentElement("afterend", section);
        }
        return section;
      }
    }
    const before = main.querySelector(":scope > .visit-note-section");
    if (before) main.insertBefore(section, before);
    else main.appendChild(section);
    return section;
  }

  function restoreSuppressedStaticSlots() {
    document
      .querySelectorAll("[data-tukod-static-slot-suppressed='true']")
      .forEach((element) => {
        element.hidden = false;
        element.removeAttribute("data-tukod-static-slot-suppressed");
      });
  }

  function suppressStaticSlotFallbacks(records, pathname) {
    const managedSlotIds = new Set();
    Object.values(records || {})
      .filter((record) => record && isSiteWidgetRecord(record))
      .filter((record) => publicRecordMatchesPage(record, pathname))
      .forEach((record) => {
        const sectionKey = sectionTargetForRecord(record, pathname);
        const slot = slotDefinitionForPath(pathname, sectionKey);
        if (slot?.id) managedSlotIds.add(slot.id);
      });

    managedSlotIds.forEach((slotId) => {
      const slot = (dynamicSectionSlotsByPage[pathname] || []).find(
        (entry) => entry.id === slotId,
      );
      if (!slot) return;
      if (slot.selector.includes("[data-tukod-slot-anchor=")) return;
      const element = document.querySelector(slot.selector);
      if (!element) return;
      element.hidden = true;
      element.setAttribute("data-tukod-static-slot-suppressed", "true");
    });
  }

  function buildSiteWidgetSection(records, record, pathname, anchorId = "") {
    const fields = recordFields(record);
    const type = normalizedWidgetType(record);
    const source = findRecordById(records, fields.widgetSourceId);
    if (anchorId === "home-hero-copy" && type === "hero" && source) {
      const sourceFields = recordFields(source);
      if (String(sourceFields.contentCategory || "").trim() !== "hero") {
        return null;
      }
      return buildHomeHeroCopyWidget(sourceFields);
    }
    if (anchorId === "home-hero-gallery" && type === "hero-gallery") {
      const widgetHasGalleryData =
        Boolean(fields.image) || Boolean(fields.widgetConfig);
      if (widgetHasGalleryData) {
        return buildHomeHeroGalleryWidget(fields, record);
      }
      if (!source) return null;
      const sourceFields = recordFields(source);
      if (
        String(sourceFields.contentCategory || "").trim() !== "hero-gallery"
      ) {
        return null;
      }
      return buildHomeHeroGalleryWidget(sourceFields, source);
    }
    if (type === "featured-image") {
      const sourceFields = source ? recordFields(source) : null;
      const imageUrl = sourceFields?.image || fields.image || "";
      if (!imageUrl) return null;
      const imageAlt =
        sourceFields?.imageAlt ||
        sourceFields?.heading ||
        fields.imageAlt ||
        "Featured image";
      const section = document.createElement("section");
      section.className = "tukod-site-widget tukod-site-widget-image";
      section.innerHTML = `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(imageAlt)}">`;
      return section;
    }
    if (!source) return null;
    const sourceFields = recordFields(source);
    const requiredCategory = widgetContentCategories[type] || "";
    if (
      requiredCategory &&
      String(sourceFields.contentCategory || "general") !== requiredCategory
    ) {
      return null;
    }
    if (type === "partner-recognition") {
      let config = sourceFields.widgetConfig;
      if (typeof config === "string") {
        try {
          config = JSON.parse(config);
        } catch (error) {
          console.warn(
            `[TukodPH CMS] Invalid widgetConfig JSON for "${source?.id || source?.slug || "content record"}".`,
          );
          config = {};
        }
      }
      const items = Array.isArray(config?.items)
        ? config.items.filter((item) => item?.image)
        : [];
      if (!items.length) return null;
      const title = sourceFields.heading || source.title || "Festival partners";
      const summary = plainTextFromRichText(
        sourceFields.summary || source.excerpt || "",
      );
      const section = document.createElement("section");
      section.className =
        "tukod-site-widget tukod-site-widget-partner-recognition";
      section.innerHTML = `<div class="tukod-site-widget-inner">
        <div>
          <p class="tukod-site-widget-kicker">${escapeHtml(sourceFields.eyebrow || "Featured partners")}</p>
          <h2>${escapeHtml(title)}</h2>
          ${summary ? `<p>${escapeHtml(summary)}</p>` : ""}
        </div>
        <div class="tukod-site-widget-partner-logos" aria-label="${escapeHtml(title)}">
          ${items
            .map((item) => {
              const image = `<img src="${escapeHtml(safeHref(item.image, ""))}" alt="${escapeHtml(item.alt || "Festival partner logo")}">`;
              const content = item.url
                ? `<a class="tukod-site-widget-partner-logo" href="${escapeHtml(safeHref(item.url, "#"))}">${image}</a>`
                : `<span class="tukod-site-widget-partner-logo">${image}</span>`;
              return content;
            })
            .join("")}
        </div>
      </div>`;
      return section;
    }
    const title = sourceFields.heading || source.title || "Untitled";
    const summary = plainTextFromRichText(
      sourceFields.summary || source.excerpt || sourceFields.body || "",
    );
    const image = sourceFields.image
      ? `<div class="tukod-site-widget-media"><img src="${escapeHtml(sourceFields.image)}" alt="${escapeHtml(sourceFields.imageAlt || title)}"></div>`
      : "";
    const section = document.createElement("section");
    section.className = `tukod-site-widget tukod-site-widget-${type || "post"}${image ? " has-image" : ""}`;

    if (type === "event") {
      const meta = eventMetaItems(sourceFields).filter(Boolean);
      section.innerHTML = `<div class="tukod-site-widget-inner">
        <div>
          <p class="tukod-site-widget-kicker">${escapeHtml(sourceFields.eyebrow || "Festival event")}</p>
          <h3>${escapeHtml(title)}</h3>
          ${summary ? `<p>${escapeHtml(summary)}</p>` : ""}
          ${meta.length ? `<div class="tukod-site-widget-meta">${meta.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>` : ""}
          <a class="tukod-site-widget-cta" href="${escapeHtml(eventRecordHref(source))}">View event <span aria-hidden="true">→</span></a>
        </div>
        ${image}
      </div>`;
      return section;
    }

    const headingTag = type === "hero" ? "h1" : "h2";
    section.innerHTML = `<div class="tukod-site-widget-inner">
      <div>
        <p class="tukod-site-widget-kicker">${escapeHtml(sourceFields.eyebrow || "Content desk")}</p>
        <${headingTag}>${escapeHtml(title)}</${headingTag}>
        ${summary ? `<p>${escapeHtml(summary)}</p>` : ""}
        <a class="tukod-site-widget-cta" href="${escapeHtml(safeHref(sourceFields.ctaUrl || source.page || "#", "#"))}">${escapeHtml(sourceFields.ctaLabel || "Read more")} <span aria-hidden="true">→</span></a>
      </div>
      ${image}
    </div>`;
    return section;
  }

  function renderSiteWidgets(records) {
    addSiteWidgetStyles();
    restoreSuppressedStaticSlots();
    document
      .querySelectorAll("[data-tukod-generated-widget]")
      .forEach((element) => element.remove());
    const pathname = normalizePath(window.location.pathname);
    suppressStaticSlotFallbacks(records, pathname);
    Object.values(records || {})
      .filter((record) => record && isSiteWidgetRecord(record))
      .filter((record) => siteWidgetIsEnabled(record))
      .filter((record) =>
        supportedSiteWidgetTypes.has(normalizedWidgetType(record)),
      )
      .filter((record) => publicRecordMatchesPage(record, pathname))
      .sort((left, right) => widgetOrder(left) - widgetOrder(right))
      .forEach((record) => {
        const sectionKey = sectionTargetForRecord(record, pathname);
        const directTarget = parseSectionTargetKey(pathname, sectionKey);
        const section = buildSiteWidgetSection(
          records,
          record,
          pathname,
          directTarget.anchorId,
        );
        if (!section) return;
        section.dataset.tukodGeneratedWidget = String(
          record.id || record.slug || "",
        );
        section.dataset.tukodSlot = sectionKey;
        insertSiteWidgetForSlot(section, pathname, sectionKey);
      });
  }

  function buildDynamicSection(record) {
    const key = recordKey(record);
    const fields = recordFields(record);
    const eventMeta = isEventRecord(record)
      ? eventMetaItems(fields)
          .map((item) => `<span>${escapeHtml(item)}</span>`)
          .join("")
      : "";
    const section = document.createElement("section");
    section.className = `tukod-cms-dynamic-section${fields.image ? " has-image" : ""}`;
    section.id = `cms-${key}`;
    section.dataset.tukodGenerated = key;
    section.dataset.tukodSignature = generatedSignature(record);
    const image = fields.image
      ? `<img class="tukod-cms-dynamic-image" src="${escapeHtml(fields.image)}" alt="${escapeHtml(fields.imageAlt || fields.heading || "")}">`
      : "";
    const cta =
      fields.ctaLabel && fields.ctaUrl
        ? `<a class="tukod-cms-dynamic-cta" href="${escapeHtml(safeHref(fields.ctaUrl, "#"))}">${escapeHtml(fields.ctaLabel)} <span aria-hidden="true">↗</span></a>`
        : "";
    section.innerHTML = `<div class="tukod-cms-dynamic-inner"><div class="tukod-cms-dynamic-copy">
      ${fields.eyebrow ? `<p class="tukod-cms-dynamic-eyebrow" data-tukod-record="${escapeHtml(key)}" data-tukod-text-field="eyebrow">${escapeHtml(fields.eyebrow)}</p>` : ""}
      <h2 data-tukod-record="${escapeHtml(key)}" data-tukod-html-field="heading">${safeLineBreakHtml(fields.heading || record.title || "Untitled content")}</h2>
      ${eventMeta ? `<div class="tukod-cms-dynamic-event-meta">${eventMeta}</div>` : ""}
      ${fields.summary ? `<p class="tukod-cms-dynamic-summary" data-tukod-record="${escapeHtml(key)}" data-tukod-text-field="summary">${escapeHtml(fields.summary)}</p>` : ""}
      ${fields.body ? `<div class="tukod-cms-dynamic-body" data-tukod-record="${escapeHtml(key)}" data-tukod-rich-field="body">${formatRichTextHtml(fields.body)}</div>` : ""}
      ${cta}
    </div>${image}</div>`;
    return section;
  }

  function ensureGenericRecord(record, desiredKeys, pathname, sectionKey) {
    const key = recordKey(record);
    if (!key) return false;
    desiredKeys.add(key);
    const existing = Array.from(
      document.querySelectorAll("[data-tukod-generated][data-tukod-slot]"),
    ).find((element) => {
      return (
        element.dataset.tukodGenerated === key &&
        element.dataset.tukodSlot === sectionKey
      );
    });
    const signature = generatedSignature(record);
    if (existing && existing.dataset.tukodSignature === signature) return true;
    const section = buildDynamicSection(record);
    section.dataset.tukodSlot = sectionKey;
    insertSectionForSlot(section, pathname, sectionKey, existing);
    return true;
  }

  function removeStaleGeneratedContent(desiredKeys) {
    document.querySelectorAll("[data-tukod-generated]").forEach((element) => {
      const key = element.dataset.tukodGenerated;
      if (!desiredKeys.has(key)) element.remove();
    });
  }

  function renderPublishedContent(records) {
    if (skipPublicRenderer) return;
    addPublicRendererStyles();
    const pathname = normalizePath(window.location.pathname);
    const isDedicatedEventDetail =
      pathname.startsWith("/events/") &&
      pathname !== "/events" &&
      document.getElementById("cms-event-detail");
    if (isDedicatedEventDetail) {
      removeStaleGeneratedContent(new Set());
      return;
    }
    const desiredKeys = new Set();
    Object.values(records || {}).forEach((record) => {
      if (!record || typeof record !== "object") return;
      if (!isPublicRenderableRecord(record)) return;
      if (isSiteWidgetRecord(record)) return;
      if (
        !publicRecordMatchesPage(record, pathname) ||
        hasPermanentSlot(record) ||
        isWidgetManagedSourceRecord(records, record, pathname)
      )
        return;
      if ((pathname === "/" || pathname === "/events") && isEventRecord(record))
        return;
      else
        ensureGenericRecord(
          record,
          desiredKeys,
          pathname,
          sectionTargetForRecord(record, pathname),
        );
    });
    removeStaleGeneratedContent(desiredKeys);
  }

  function applyRecords(records) {
    const elements = document.querySelectorAll("[data-tukod-record]");
    let applied = 0;

    elements.forEach((element) => {
      const textValue = getField(records, element, "data-tukod-text-field");
      const htmlValue = getField(records, element, "data-tukod-html-field");
      const richValue = getField(records, element, "data-tukod-rich-field");
      const labelValue = getField(records, element, "data-tukod-label-field");
      const wordmarkValue = getField(
        records,
        element,
        "data-tukod-wordmark-field",
      );
      const hrefValue = getField(records, element, "data-tukod-href-field");
      const srcValue = getField(records, element, "data-tukod-src-field");
      const altValue = getField(records, element, "data-tukod-alt-field");
      const contentValue = getField(
        records,
        element,
        "data-tukod-content-field",
      );

      if (wordmarkValue !== null) {
        const spans = element.querySelectorAll(":scope > span");
        if (spans.length === 3) {
          const clean = wordmarkValue.trim();
          const parts =
            clean.toLowerCase() === "diyandi"
              ? [clean.slice(0, 2), clean.slice(2, 5), clean.slice(5)]
              : [
                  clean.slice(0, Math.ceil(clean.length / 3)),
                  clean.slice(
                    Math.ceil(clean.length / 3),
                    Math.ceil((clean.length * 2) / 3),
                  ),
                  clean.slice(Math.ceil((clean.length * 2) / 3)),
                ];
          spans.forEach((span, index) => {
            if (span.textContent !== parts[index]) {
              span.textContent = parts[index];
              applied += 1;
            }
          });
        }
      } else if (htmlValue !== null) {
        const nextHtml = safeLineBreakHtml(htmlValue);
        if (element.innerHTML !== nextHtml) {
          element.innerHTML = nextHtml;
          applied += 1;
        }
      } else if (richValue !== null) {
        const nextHtml = formatRichTextHtml(richValue);
        if (element.innerHTML !== nextHtml) {
          element.innerHTML = nextHtml;
          applied += 1;
        }
      } else if (textValue !== null) {
        if (element.textContent !== textValue) {
          element.textContent = textValue;
          applied += 1;
        }
      } else if (labelValue !== null) {
        const firstTextNode = Array.from(element.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE,
        );
        const nextLabel = `${labelValue} `;
        if (firstTextNode && firstTextNode.nodeValue !== nextLabel) {
          firstTextNode.nodeValue = nextLabel;
          applied += 1;
        } else if (!firstTextNode) {
          element.insertBefore(
            document.createTextNode(nextLabel),
            element.firstChild,
          );
          applied += 1;
        }
      }

      if (
        hrefValue !== null &&
        element instanceof HTMLAnchorElement &&
        element.getAttribute("href") !== safeHref(hrefValue, hrefValue)
      ) {
        element.setAttribute("href", safeHref(hrefValue, hrefValue));
        applied += 1;
      }
      if (
        srcValue !== null &&
        (element instanceof HTMLImageElement ||
          element instanceof HTMLSourceElement) &&
        element.getAttribute("src") !== safeHref(srcValue, srcValue)
      ) {
        element.setAttribute("src", safeHref(srcValue, srcValue));
        applied += 1;
      }
      if (
        altValue !== null &&
        element instanceof HTMLImageElement &&
        element.getAttribute("alt") !== altValue
      ) {
        element.setAttribute("alt", altValue);
        applied += 1;
      }
      if (
        contentValue !== null &&
        element instanceof HTMLMetaElement &&
        element.getAttribute("content") !== contentValue
      ) {
        element.setAttribute("content", contentValue);
        applied += 1;
      }
    });

    renderPublishedContent(records);
    renderSiteWidgets(records);
    hydrateFeaturedEventList(records, normalizePath(window.location.pathname));
    hydrateHeritageEventCalendar(records);
    hydrateHomeCountdown(records);
    initCountdowns();
    focusPreviewRecord();
    document.documentElement.dataset.tukodCms = "connected";
    document.dispatchEvent(
      new CustomEvent("tukodcms:ready", {
        detail: { tenantId, records, applied, previewRecord },
      }),
    );
    log(`Applied ${applied} CMS field updates for ${tenantId}.`);
  }

  function watchClientNavigation() {
    if (!window.MutationObserver) return;
    const observer = new MutationObserver(() => {
      if (!latestRecords) return;
      window.clearTimeout(observerTimer);
      observerTimer = window.setTimeout(() => applyRecords(latestRecords), 80);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function trustedCmsOrigin(origin) {
    try {
      return origin === new URL(apiUrl, window.location.href).origin;
    } catch (error) {
      return false;
    }
  }

  function receivePreviewRecord(event) {
    if (
      !isPreview ||
      !event.data ||
      event.data.type !== "tukodph:preview-record"
    )
      return;
    if (!trustedCmsOrigin(event.origin)) {
      log("Ignored preview message from untrusted origin:", event.origin);
      return;
    }
    if (event.data.tenant && event.data.tenant !== tenantId) return;
    const incoming = normalizePreviewRecord(event.data.record);
    if (!incoming) return;
    previewFocused = false;
    latestRecords = mergePreviewRecord(latestRecords || {}, incoming);
    applyRecords(latestRecords);
    log("Applied unpublished preview record:", incoming.slug || incoming.id);
  }

  async function fetchPublishedContent() {
    if (!tenantId || !apiUrl) {
      throw new Error("CMS tenantId or apiUrl is missing in cms-config.js.");
    }

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

  async function hydrate() {
    setupContactForm();
    try {
      const records = await fetchPublishedContent();
      latestRecords = previewRecord
        ? mergePreviewRecord(records, previewRecord)
        : records;
      watchClientNavigation();
      requestAnimationFrame(() =>
        requestAnimationFrame(() => applyRecords(latestRecords)),
      );
      window.setTimeout(() => applyRecords(latestRecords), 450);
    } catch (error) {
      reportError(error);
      latestRecords = previewRecord
        ? mergePreviewRecord({}, previewRecord)
        : {};
      if (previewRecord) applyRecords(latestRecords);
      else if (config.fallbackToStatic === false)
        document.body.innerHTML = "<p>Content is temporarily unavailable.</p>";
    }
  }

  window.addEventListener("message", receivePreviewRecord);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hydrate, { once: true });
  } else {
    hydrate();
  }
})();
