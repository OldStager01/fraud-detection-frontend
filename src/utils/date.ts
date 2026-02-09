import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/**
 * Consistent date/time formatting utilities
 * All formats follow the pattern: MMM DD, YYYY HH:mm (e.g., "Jan 15, 2026 14:30")
 */

// Full date with time: "Jan 15, 2026 14:30"
export function formatDateTime(date: string | Date): string {
  return dayjs(date).format("MMM DD, YYYY HH:mm");
}

// Date only: "Jan 15, 2026"
export function formatDate(date: string | Date): string {
  return dayjs(date).format("MMM DD, YYYY");
}

// Short date with time (no year): "Jan 15, 14:30"
export function formatShortDateTime(date: string | Date): string {
  return dayjs(date).format("MMM DD, HH:mm");
}

// Time only: "14:30"
export function formatTime(date: string | Date): string {
  return dayjs(date).format("HH:mm");
}

// Relative time: "2 hours ago"
export function formatRelativeTime(date: string | Date): string {
  return dayjs(date).fromNow();
}

// ISO date for API calls: "2026-01-15"
export function formatISODate(date: string | Date): string {
  return dayjs(date).format("YYYY-MM-DD");
}

// ISO datetime for exports: "2026-01-15 14:30:00"
export function formatISODateTime(date: string | Date): string {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
