declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_ID = 'G-CBK1KRMSKM';

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

/** Fire a page_view — call on every React Router navigation */
export function trackPageView(path: string, title?: string) {
  gtag('config', GA_ID, {
    page_path: path,
    page_title: title ?? document.title,
  });
}

/** Generic event helper */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  gtag('event', eventName, params);
}

// ── Pre-built events for key interactions ──────────────────────────────────

export const Analytics = {
  /** "Book Now" or "Get Free Quote" CTA clicked */
  bookCTA: (source: string) =>
    trackEvent('cta_click', { cta_location: source, event_category: 'engagement' }),

  /** Phone number clicked */
  phoneClick: () =>
    trackEvent('phone_click', { event_category: 'contact', value: 1 }),

  /** Google review link clicked */
  reviewClick: () =>
    trackEvent('review_link_click', { event_category: 'engagement' }),

  /** Contact form submitted */
  formSubmit: (service: string) =>
    trackEvent('form_submit', { service_type: service, event_category: 'lead', value: 1 }),

  /** Town page viewed */
  townPageView: (town: string) =>
    trackEvent('town_page_view', { town_name: town, event_category: 'local_seo' }),

  /** Communities directory viewed */
  communitiesView: () =>
    trackEvent('communities_page_view', { event_category: 'local_seo' }),

  /** Before/after reveal hovered */
  revealHover: () =>
    trackEvent('hero_reveal_hover', { event_category: 'engagement' }),
};
