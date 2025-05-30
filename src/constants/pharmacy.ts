// Pharmacy-related constants and configuration

/**
 * Delimiter used to separate multiple services in the database storage
 * This can be easily changed here without modifying component code
 */
export const SERVICES_DELIMITER = ';';

/**
 * Available pharmacy services
 * Centralized list for consistency across the application
 */
export const PHARMACY_SERVICES = [
  "Médicaments sur ordonnance",
  "Médicaments en vente libre",
  "Préparations magistrales",
  "Conseils pharmaceutiques",
  "Éducation thérapeutique",
  "Planification familiale",
  "Vaccinations",
  "Suivi de la tension artérielle et du poids.",
  "Tests rapides",
  "Sevrage tabagique",
  "Cosmétiques et soins",
  "Produits pour bébés",
  "Orthopédie",
  "Équipements médicaux",
  "Location de matériel médical",
  "Accompagnement des femmes enceintes",
  "Recyclage de médicaments",
] as const;

/**
 * Type for pharmacy service values
 */
export type PharmacyService = typeof PHARMACY_SERVICES[number];
