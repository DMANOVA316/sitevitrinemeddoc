// src/utils/analytics.ts

export const GA_TRACKING_ID = 'G-ZXE6VZ9L6N';

// Envoi d’un événement de page vue
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Envoi d’événements personnalisés
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
