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
    window.location.hostname === "higalaay.local" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const basePath = detectBasePath();

  window.TUKOD_CMS_CONFIG = {
    tenantId: "higalaay-festival",
    portalSlug: "higalaay",
    basePath,
    templateId: "festival-vibrant",
    templateName: "Vibrant Festival",
    structureVersion: "festival-site-v1",
    implementationFamily: "standard-festival-site",

    apiUrl: isLocal
      ? "http://cms.local/api/index.php"
      : "https://cms.tukodph.com/api/index.php",

    frontendUrl: isLocal
      ? "http://higalaay.local"
      : window.location.origin + (basePath || ""),

    debug: isLocal,
    fallbackToStatic: true,
  };
})();
