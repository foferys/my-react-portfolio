export function trackLeadEvent(action, meta = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event_category: "lead_generation",
    event_label: action,
    ...meta
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", action, payload);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: action, ...payload });
}
