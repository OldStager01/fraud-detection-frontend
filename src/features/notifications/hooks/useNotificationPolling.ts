import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { useAppSelector } from "@/store";
import { useNotifications } from "./useNotifications";
import type { Notification } from "../types";

const POLLING_INTERVAL = 10000; // 30 seconds

export function useNotificationPolling(enabled: boolean = true) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { notifications, fetchNotifications } = useNotifications();
  const previousIdsRef = useRef<Set<string>>(new Set());
  const isFirstFetchRef = useRef(true);

  // Show toast for new notifications
  const showToastForNew = useCallback((newNotifications: Notification[]) => {
    // Skip on first fetch
    if (isFirstFetchRef.current) {
      isFirstFetchRef.current = false;
      return;
    }

    newNotifications.forEach((notification) => {
      if (!previousIdsRef.current.has(notification.id) && !notification.read) {
        if (notification.priority === "high") {
          toast.error(notification.title, {
            description: notification.message,
            duration: 5000,
          });
        } else if (notification.priority === "medium") {
          toast.warning(notification.title, {
            description: notification.message,
            duration: 4000,
          });
        }
      }
    });
  }, []);

  // Update previous IDs and check for new
  useEffect(() => {
    if (notifications.length > 0) {
      showToastForNew(notifications);
      previousIdsRef.current = new Set(notifications.map((n) => n.id));
    }
  }, [notifications, showToastForNew]);

  // Initial fetch
  useEffect(() => {
    if (isAuthenticated && enabled) {
      fetchNotifications();
    }
  }, [isAuthenticated, enabled, fetchNotifications]);

  // Polling interval
  useEffect(() => {
    if (!isAuthenticated || !enabled) return;

    const intervalId = setInterval(() => {
      fetchNotifications();
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, enabled, fetchNotifications]);

  return {
    refetch: fetchNotifications,
  };
}
