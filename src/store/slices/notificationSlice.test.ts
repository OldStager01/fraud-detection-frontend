import { describe, it, expect } from "vitest";
import notificationReducer, {
  setLoading,
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
} from "./notificationSlice";
import type { Notification } from "@/features/notifications/types";

const mockNotification: Notification = {
  id: "1",
  type: "transaction",
  title: "Test Notification",
  message: "Test message",
  priority: "medium",
  read: false,
  created_at: "2026-01-15T10:00:00Z",
};

const mockReadNotification: Notification = {
  ...mockNotification,
  id: "2",
  read: true,
};

describe("notificationSlice", () => {
  const initialState = {
    notifications: [],
    unreadCount: 0,
    lastFetched: null,
    isLoading: false,
  };

  it("returns initial state", () => {
    expect(notificationReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  describe("setLoading", () => {
    it("sets loading to true", () => {
      const state = notificationReducer(initialState, setLoading(true));
      expect(state.isLoading).toBe(true);
    });
  });

  describe("setNotifications", () => {
    it("sets notifications and unread count", () => {
      const state = notificationReducer(
        initialState,
        setNotifications({
          notifications: [mockNotification],
          unreadCount: 1,
        }),
      );
      expect(state.notifications).toHaveLength(1);
      expect(state.unreadCount).toBe(1);
      expect(state.lastFetched).not.toBeNull();
      expect(state.isLoading).toBe(false);
    });
  });

  describe("addNotification", () => {
    it("adds new notification to beginning", () => {
      const state = notificationReducer(
        initialState,
        addNotification(mockNotification),
      );
      expect(state.notifications).toHaveLength(1);
      expect(state.notifications[0]).toEqual(mockNotification);
    });

    it("increments unread count for unread notification", () => {
      const state = notificationReducer(
        initialState,
        addNotification(mockNotification),
      );
      expect(state.unreadCount).toBe(1);
    });

    it("does not increment unread count for read notification", () => {
      const state = notificationReducer(
        initialState,
        addNotification(mockReadNotification),
      );
      expect(state.unreadCount).toBe(0);
    });

    it("does not add duplicate notifications", () => {
      const stateWithNotification = {
        ...initialState,
        notifications: [mockNotification],
        unreadCount: 1,
      };
      const state = notificationReducer(
        stateWithNotification,
        addNotification(mockNotification),
      );
      expect(state.notifications).toHaveLength(1);
    });
  });

  describe("markAsRead", () => {
    it("marks notification as read", () => {
      const stateWithNotification = {
        ...initialState,
        notifications: [mockNotification],
        unreadCount: 1,
      };
      const state = notificationReducer(stateWithNotification, markAsRead("1"));
      expect(state.notifications[0].read).toBe(true);
      expect(state.unreadCount).toBe(0);
    });

    it("does not decrement count for already read notification", () => {
      const stateWithReadNotification = {
        ...initialState,
        notifications: [mockReadNotification],
        unreadCount: 0,
      };
      const state = notificationReducer(
        stateWithReadNotification,
        markAsRead("2"),
      );
      expect(state.unreadCount).toBe(0);
    });
  });

  describe("markAllAsRead", () => {
    it("marks all notifications as read", () => {
      const stateWithNotifications = {
        ...initialState,
        notifications: [mockNotification, { ...mockNotification, id: "3" }],
        unreadCount: 2,
      };
      const state = notificationReducer(
        stateWithNotifications,
        markAllAsRead(),
      );
      expect(state.notifications.every((n) => n.read)).toBe(true);
      expect(state.unreadCount).toBe(0);
    });
  });

  describe("removeNotification", () => {
    it("removes notification", () => {
      const stateWithNotification = {
        ...initialState,
        notifications: [mockNotification],
        unreadCount: 1,
      };
      const state = notificationReducer(
        stateWithNotification,
        removeNotification("1"),
      );
      expect(state.notifications).toHaveLength(0);
    });

    it("decrements unread count for unread notification", () => {
      const stateWithNotification = {
        ...initialState,
        notifications: [mockNotification],
        unreadCount: 1,
      };
      const state = notificationReducer(
        stateWithNotification,
        removeNotification("1"),
      );
      expect(state.unreadCount).toBe(0);
    });
  });

  describe("clearAllNotifications", () => {
    it("clears all notifications", () => {
      const stateWithNotifications = {
        ...initialState,
        notifications: [mockNotification, mockReadNotification],
        unreadCount: 1,
      };
      const state = notificationReducer(
        stateWithNotifications,
        clearAllNotifications(),
      );
      expect(state.notifications).toHaveLength(0);
      expect(state.unreadCount).toBe(0);
    });
  });
});
