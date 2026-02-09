import { describe, it, expect } from "vitest";
import {
  formatDateTime,
  formatDate,
  formatShortDateTime,
  formatTime,
  formatRelativeTime,
  formatISODate,
  formatISODateTime,
} from "./date";

describe("date utilities", () => {
  const testDate = "2026-01-15T14:30:00";

  describe("formatDateTime", () => {
    it("formats date with full datetime", () => {
      expect(formatDateTime(testDate)).toBe("Jan 15, 2026 14:30");
    });

    it("handles Date objects", () => {
      const date = new Date(testDate);
      expect(formatDateTime(date)).toBe("Jan 15, 2026 14:30");
    });
  });

  describe("formatDate", () => {
    it("formats date only", () => {
      expect(formatDate(testDate)).toBe("Jan 15, 2026");
    });
  });

  describe("formatShortDateTime", () => {
    it("formats short date without year", () => {
      expect(formatShortDateTime(testDate)).toBe("Jan 15, 14:30");
    });
  });

  describe("formatTime", () => {
    it("formats time only", () => {
      expect(formatTime(testDate)).toBe("14:30");
    });
  });

  describe("formatRelativeTime", () => {
    it("returns relative time string", () => {
      const result = formatRelativeTime(testDate);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("formatISODate", () => {
    it("formats as ISO date", () => {
      expect(formatISODate(testDate)).toBe("2026-01-15");
    });
  });

  describe("formatISODateTime", () => {
    it("formats as ISO datetime", () => {
      expect(formatISODateTime(testDate)).toBe("2026-01-15 14:30:00");
    });
  });
});
