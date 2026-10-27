const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const countdownTimers = new WeakMap();

function normalizeBasePath(value) {
  const raw = String(value || "").trim();
  if (!raw || raw === "/") return "";
  const normalized = raw.startsWith("/") ? raw : `/${raw}`;
  return normalized.replace(/\/+$/, "");
}

function normalizePagePath(value) {
  const raw = String(value || "/").trim() || "/";
  const basePath = normalizeBasePath(window.TUKOD_CMS_CONFIG?.basePath || "");
  try {
    const parsed = new URL(raw, window.location.origin);
    const pathname = parsed.pathname || "/";
    const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    if (!basePath) return normalized;
    if (normalized === basePath) return "/";
    if (normalized.startsWith(`${basePath}/`)) {
      return normalized.slice(basePath.length) || "/";
    }
    return normalized;
  } catch (error) {
    if (raw.startsWith("/")) return raw === "/" ? "/" : raw.replace(/\/+$/, "");
    return `/${raw.replace(/^\/+/, "").replace(/\/+$/, "")}`;
  }
}

const parseCountdownTarget = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const parsed = new Date(`${raw}T00:00:00+08:00`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatCountdownPart = (value, pad = true) => {
  const normalized = Math.max(Number(value) || 0, 0);
  return pad ? String(normalized).padStart(2, "0") : String(normalized);
};

const clearCountdownTimer = (root) => {
  const timer = countdownTimers.get(root);
  if (timer) {
    window.clearInterval(timer);
    countdownTimers.delete(root);
  }
};

const updateCountdown = (root) => {
  if (root.hidden || root.dataset.countdownEnabled === "false") {
    clearCountdownTimer(root);
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
};

const initCountdowns = () => {
  document.querySelectorAll("[data-countdown]").forEach((root) => {
    clearCountdownTimer(root);
    if (root.hidden || root.dataset.countdownEnabled === "false") {
      return;
    }
    updateCountdown(root);
    countdownTimers.set(
      root,
      window.setInterval(() => {
        updateCountdown(root);
      }, 1000),
    );
  });
};

initCountdowns();
document.addEventListener("tukodcms:ready", initCountdowns);

const updateFormStatus = (form, kind, message) => {
  const status = form.querySelector(".form-status");
  if (!status) return;
  status.textContent = message;
  status.dataset.statusKind = kind;
  status.setAttribute("role", kind === "error" ? "alert" : "status");
};

const buildPartnerInquiryPayload = (form) => {
  const fields = new FormData(form);
  const firstName = String(fields.get("first_name") || "").trim();
  const lastName = String(fields.get("last_name") || "").trim();
  const phone = String(fields.get("phone") || "").trim();
  const email = String(fields.get("email") || "").trim();
  const message = String(fields.get("message") || "").trim();
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const isVolunteer = form.querySelector('[name="affiliation"]') !== null;

  if (isVolunteer) {
    const affiliation = String(fields.get("affiliation") || "").trim();
    return {
      fullName,
      email,
      inquiryType: "Events and Venue",
      message: [
        "Volunteer interest submission",
        `Phone: ${phone || "Not provided"}`,
        `Affiliation: ${affiliation || "Not provided"}`,
        "",
        message || "No additional message provided.",
      ].join("\n"),
    };
  }

  const company = String(fields.get("company") || "").trim();
  const role = String(fields.get("role") || "").trim();
  return {
    fullName,
    email,
    inquiryType: "Media or Partnerships",
    message: [
      "Partnership interest submission",
      `Phone: ${phone || "Not provided"}`,
      `Company: ${company || "Not provided"}`,
      `Role: ${role || "Not provided"}`,
      "",
      message || "No additional message provided.",
    ].join("\n"),
  };
};

const initHeroCarousels = () => {
  document.querySelectorAll(".hero-carousel").forEach((carousel) => {
    if (carousel.dataset.carouselBound === "true") return;
    carousel.dataset.carouselBound = "true";

    const slides = Array.from(carousel.querySelectorAll(".hero-slide"));
    const dots = Array.from(
      carousel.parentElement?.querySelectorAll(".hero-carousel-dots span") ||
        [],
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let activeIndex = 0;
    let timer = null;

    if (slides.length <= 1 || reduceMotion) return;

    const credit = carousel.parentElement?.querySelector("[data-hero-credit]");
    const updateCredit = () => {
      if (!credit) return;
      const nextCredit = slides[activeIndex]?.dataset.credit?.trim() || "";
      credit.textContent = nextCredit;
      credit.hidden = !nextCredit;
    };

    const showSlide = (nextIndex) => {
      slides[activeIndex].classList.remove("is-active");
      if (dots[activeIndex]) {
        dots[activeIndex].classList.remove("is-active");
      }

      activeIndex = nextIndex;
      slides[activeIndex].classList.add("is-active");
      if (dots[activeIndex]) {
        dots[activeIndex].classList.add("is-active");
      }
      updateCredit();
    };

    const startCarousel = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        showSlide((activeIndex + 1) % slides.length);
      }, 7000);
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        window.clearInterval(timer);
      } else {
        startCarousel();
      }
    });

    updateCredit();
    startCarousel();
  });
};

initHeroCarousels();
document.addEventListener("tukodcms:ready", initHeroCarousels);

let lastFocusedElement = null;

const getModalFocusable = (modal) => {
  if (!modal) return [];
  return Array.from(
    modal.querySelectorAll(
      "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])",
    ),
  );
};

const resetModalForms = (modal) => {
  modal.querySelectorAll(".partner-form.is-submitted").forEach((form) => {
    form.reset();
    form.classList.remove("is-submitted");
    const status = form.querySelector(".form-status");
    const button = form.querySelector('button[type="submit"]');
    if (status) {
      status.textContent = "";
      delete status.dataset.statusKind;
      status.setAttribute("role", "status");
    }
    if (button && button.dataset.defaultText) {
      button.textContent = button.dataset.defaultText;
    }
  });
};

const openModal = (modal) => {
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  resetModalForms(modal);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const firstInput = modal.querySelector("input");
  if (firstInput) {
    firstInput.focus();
  }
};

const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
};

const setupModal = (modalSelector, triggerSelector) => {
  const modal = document.querySelector(modalSelector);
  if (!modal) return;

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(triggerSelector);
    if (trigger) openModal(modal);
  });

  modal.querySelectorAll("[data-modal-close]").forEach((control) => {
    control.addEventListener("click", () => closeModal(modal));
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal(modal);
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getModalFocusable(modal);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
};

setupModal("#partner-modal", ".partner-modal-trigger");
setupModal("#volunteer-modal", ".volunteer-modal-trigger");

document.querySelectorAll(".partner-form").forEach((form) => {
  const button = form.querySelector('button[type="submit"]');
  if (button) {
    button.dataset.defaultText = button.textContent;
  }
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
    const submitButton = form.querySelector('button[type="submit"]');
    const config = window.TUKOD_CMS_CONFIG || {};
    if (!form.reportValidity()) {
      return;
    }

    if (!config.tenantId || !config.apiUrl) {
      updateFormStatus(
        form,
        "error",
        "Form delivery is not configured for this site yet.",
      );
      return;
    }

    const endpoint = new URL(config.apiUrl, window.location.href);
    endpoint.searchParams.set("action", "submit-inquiry");
    const payload = buildPartnerInquiryPayload(form);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
    updateFormStatus(form, "info", "Sending your form to the festival team...");

    try {
      const response = await fetch(endpoint.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-ID": config.tenantId,
        },
        mode: "cors",
        body: JSON.stringify({
          tenant: config.tenantId,
          fullName: payload.fullName,
          email: payload.email,
          inquiryType: payload.inquiryType,
          message: payload.message,
          website: String(new FormData(form).get("website") || "").trim(),
          page: normalizePagePath(window.location.pathname),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result || result.ok === false) {
        throw new Error(
          result?.error || "Your form could not be submitted right now.",
        );
      }

      form.reset();
      form.classList.add("is-submitted");
      updateFormStatus(
        form,
        "success",
        form.dataset.success ||
          "Thanks. Your interest has been received by the festival team.",
      );
    } catch (error) {
      form.classList.remove("is-submitted");
      updateFormStatus(
        form,
        "error",
        error?.message || "Your form could not be submitted. Please try again.",
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = button?.dataset.defaultText || "Submit";
      }
    }
  });
});
