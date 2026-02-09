import { useCallback, useRef } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setLoading,
  setNotifications,
  markAsRead as markAsReadAction,
  markAllAsRead as markAllAsReadAction,
  removeNotification,
  clearAllNotifications,
} from "@/store/slices/notificationSlice";
import { notificationsApi } from "../api";
import { getErrorMessage } from "@/types";

export function useNotifications() {
  const dispatch = useAppDispatch();
  const isFetchingRef = useRef(false);
  const { notifications, unreadCount, lastFetched, isLoading } = useAppSelector(
    (state) => state.notifications,
  );

  const fetchNotifications = useCallback(async () => {
    // Prevent duplicate concurrent calls
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      dispatch(setLoading(true));
      const data = await notificationsApi.getNotifications();
      dispatch(
        setNotifications({
          notifications: data.notifications,
          unreadCount: data.unread_count,
        }),
      );
    } catch (error) {
      console.error("Failed to fetch notifications:", getErrorMessage(error));
      dispatch(setLoading(false));
    } finally {
      isFetchingRef.current = false;
    }
  }, [dispatch]);

  const markAsRead = useCallback(
    async (id: string) => {
      try {
        await notificationsApi.markAsRead(id);
        dispatch(markAsReadAction(id));
      } catch (error) {
        console.error("Failed to mark as read:", getErrorMessage(error));
      }
    },
    [dispatch],
  );

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsApi.markAllAsRead();
      dispatch(markAllAsReadAction());
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  }, [dispatch]);

  const deleteNotification = useCallback(
    async (id: string) => {
      try {
        await notificationsApi.deleteNotification(id);
        dispatch(removeNotification(id));
      } catch (error) {
        toast.error("Failed to delete notification");
      }
    },
    [dispatch],
  );

  const clearAll = useCallback(async () => {
    try {
      await notificationsApi.deleteAllNotifications();
      dispatch(clearAllNotifications());
    } catch (error) {
      toast.error("Failed to clear notifications");
    }
  }, [dispatch]);

  return {
    notifications,
    unreadCount,
    lastFetched,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  };
}
