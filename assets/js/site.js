// Site-owned image zoom, independent of the optional image-gallery plugin.
(() => {
  const initializeZoom = () => {
    if (typeof window.mediumZoom !== "function") return;

    const root = document.documentElement;
    const overlayBackground = () => {
      const color = getComputedStyle(root).getPropertyValue("--global-bg-color").trim();
      if (/^#[\da-f]{3}$/i.test(color)) {
        return "#" + [...color.slice(1)].map((digit) => digit + digit).join("") + "ee";
      }
      if (/^#[\da-f]{6}$/i.test(color)) return color + "ee";
      return `color-mix(in srgb, ${color || "#ffffff"} 93.333333%, transparent)`;
    };

    const zoom = window.mediumZoom("[data-zoomable]", { background: overlayBackground() });
    // Retain the name used by the theme's existing dark-mode integration.
    window.medium_zoom = zoom;
    new MutationObserver(() => zoom.update({ background: overlayBackground() })).observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeZoom, { once: true });
  } else {
    initializeZoom();
  }
})();
