import { PHARMACY_SERVICES, SERVICES_DELIMITER } from "@/constants/pharmacy";

/**
 * Converts a semicolon-delimited string to an array of services
 * @param servicesString - The string containing services separated by semicolons
 * @returns Array of service strings, empty array if input is null/undefined/empty
 */
export const parseServicesString = (
  servicesString?: string | null
): string[] => {
  if (!servicesString || servicesString.trim() === "") {
    return [];
  }

  return servicesString
    .split(SERVICES_DELIMITER)
    .map((service) => service.trim())
    .filter((service) => service.length > 0);
};

/**
 * Converts an array of services to a semicolon-delimited string
 * @param servicesArray - Array of service strings
 * @returns Semicolon-delimited string, or empty string if array is empty
 */
export const stringifyServicesArray = (servicesArray: string[]): string => {
  if (!servicesArray || servicesArray.length === 0) {
    return "";
  }

  return servicesArray
    .filter((service) => service && service.trim().length > 0)
    .map((service) => service.trim())
    .join(SERVICES_DELIMITER);
};

/**
 * Validates that all services in the array are valid pharmacy services
 * @param servicesArray - Array of service strings to validate
 * @returns Object with isValid boolean and array of invalid services
 */
export const validateServices = (
  servicesArray: string[]
): {
  isValid: boolean;
  invalidServices: string[];
} => {
  const validServices = PHARMACY_SERVICES as readonly string[];
  const invalidServices = servicesArray.filter(
    (service) => !validServices.includes(service)
  );

  return {
    isValid: invalidServices.length === 0,
    invalidServices,
  };
};

/**
 * Formats services array for display (e.g., in cards or lists)
 * @param servicesArray - Array of service strings
 * @param maxDisplay - Maximum number of services to display before truncating
 * @returns Formatted string for display
 */
export const formatServicesForDisplay = (
  servicesArray: string[],
  maxDisplay: number = 3
): string => {
  if (!servicesArray || servicesArray.length === 0) {
    return "Services non renseignés";
  }

  if (servicesArray.length <= maxDisplay) {
    return servicesArray.join(", ");
  }

  const displayedServices = servicesArray.slice(0, maxDisplay);
  const remainingCount = servicesArray.length - maxDisplay;

  return `${displayedServices.join(", ")} et ${remainingCount} autre${
    remainingCount > 1 ? "s" : ""
  }`;
};

/**
 * Converts a services string from database to array for form usage
 * @param servicesString - The database string value
 * @returns Array of services for form components
 */
export const servicesStringToFormArray = (
  servicesString?: string | null
): string[] => {
  return parseServicesString(servicesString);
};

/**
 * Converts a services array from form to string for database storage
 * @param servicesArray - Array from form components
 * @returns String for database storage
 */
export const servicesFormArrayToString = (servicesArray: string[]): string => {
  return stringifyServicesArray(servicesArray);
};
