import { apiClient } from "@/lib";
import type { ApiResponse } from "@/types";
import type { Notification, NotificationsResponse } from "../types";

export const notificationsApi = {
  getNotifications: async (): Promise<NotificationsResponse> => {
    const response =
      await apiClient.get<ApiResponse<NotificationsResponse>>("/notifications");
    return response.data.data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await apiClient.patch<ApiResponse<Notification>>(
      `/notifications/${id}/mark_read`,
    );
    return response.data.data;
  },

  markAllAsRead: async (): Promise<void> => {
    await apiClient.post("/notifications/mark_all_read");
  },

  deleteNotification: async (id: string): Promise<void> => {
    await apiClient.delete(`/notifications/${id}`);
  },

  deleteAllNotifications: async (): Promise<void> => {
    await apiClient.delete("/notifications/destroy_all");
  },
};
