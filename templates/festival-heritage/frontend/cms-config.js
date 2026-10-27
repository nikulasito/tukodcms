(function configureTukodCms() {
  "use strict";

  function detectBasePath() {
    var currentScript = document.currentScript;
    if (!currentScript || !currentScript.src) return "";
    try {
      var url = new URL(currentScript.src, window.location.href);
      var path = url.pathname.replace(/\/cms-config\.js$/, "");
      return path === "/" ? "" : path.replace(/\/+$/, "");
    } catch (error) {
      return "";
    }
  }

  const isLocal =
    window.location.hostname === "diyandi.local" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const basePath = detectBasePath();

  window.TUKOD_CMS_CONFIG = {
    tenantId: "diyandi-festival",
    portalSlug: "diyandi",
    basePath,
    templateId: "festival-heritage",
    templateName: "Heritage Festival",
    structureVersion: "festival-site-v1",
    implementationFamily: "standard-festival-site",

    apiUrl: isLocal
      ? "http://cms.local/api/index.php"
      : "https://cms.tukodph.com/api/index.php",

    frontendUrl: isLocal
      ? "http://diyandi.local"
      : window.location.origin + (basePath || ""),

    debug: isLocal,
    fallbackToStatic: true,
  };
})();
