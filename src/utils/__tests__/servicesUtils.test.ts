import {
  formatServicesForDisplay,
  parseServicesString,
  servicesFormArrayToString,
  servicesStringToFormArray,
  stringifyServicesArray,
  validateServices,
} from "../servicesUtils";

describe("servicesUtils", () => {
  describe("parseServicesString", () => {
    it("should parse semicolon-delimited string correctly", () => {
      const input = "Service 1;Service 2;Service 3";
      const expected = ["Service 1", "Service 2", "Service 3"];
      expect(parseServicesString(input)).toEqual(expected);
    });

    it("should handle empty string", () => {
      expect(parseServicesString("")).toEqual([]);
      expect(parseServicesString(null)).toEqual([]);
      expect(parseServicesString(undefined)).toEqual([]);
    });

    it("should trim whitespace", () => {
      const input = " Service 1 ; Service 2 ; Service 3 ";
      const expected = ["Service 1", "Service 2", "Service 3"];
      expect(parseServicesString(input)).toEqual(expected);
    });
  });

  describe("stringifyServicesArray", () => {
    it("should join array with semicolon delimiter", () => {
      const input = ["Service 1", "Service 2", "Service 3"];
      const expected = "Service 1;Service 2;Service 3";
      expect(stringifyServicesArray(input)).toBe(expected);
    });

    it("should handle empty array", () => {
      expect(stringifyServicesArray([])).toBe("");
    });

    it("should filter out empty strings", () => {
      const input = ["Service 1", "", "Service 2", "   ", "Service 3"];
      const expected = "Service 1;Service 2;Service 3";
      expect(stringifyServicesArray(input)).toBe(expected);
    });
  });

  describe("validateServices", () => {
    it("should validate correct services", () => {
      const validServices = ["Médicaments sur ordonnance", "Vaccinations"];
      const result = validateServices(validServices);
      expect(result.isValid).toBe(true);
      expect(result.invalidServices).toEqual([]);
    });

    it("should detect invalid services", () => {
      const invalidServices = ["Invalid Service", "Another Invalid"];
      const result = validateServices(invalidServices);
      expect(result.isValid).toBe(false);
      expect(result.invalidServices).toEqual([
        "Invalid Service",
        "Another Invalid",
      ]);
    });
  });

  describe("formatServicesForDisplay", () => {
    it("should format services for display with limit", () => {
      const services = ["Service 1", "Service 2", "Service 3", "Service 4"];
      const result = formatServicesForDisplay(services, 2);
      expect(result).toBe("Service 1, Service 2 et 2 autres");
    });

    it("should handle services within limit", () => {
      const services = ["Service 1", "Service 2"];
      const result = formatServicesForDisplay(services, 3);
      expect(result).toBe("Service 1, Service 2");
    });

    it("should handle empty array", () => {
      const result = formatServicesForDisplay([]);
      expect(result).toBe("Services non renseignés");
    });
  });

  describe("integration functions", () => {
    it("should convert string to form array and back", () => {
      const originalString = "Service 1;Service 2;Service 3";
      const array = servicesStringToFormArray(originalString);
      const backToString = servicesFormArrayToString(array);
      expect(backToString).toBe(originalString);
    });
  });
});
