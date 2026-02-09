import { useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setUser,
  setLoading,
  setInitialized,
  logout as logoutAction,
} from "@/store/slices/authSlice";
import { clearAllNotifications } from "@/store/slices/notificationSlice";
import { authApi } from "../api";
import { getErrorMessage } from "@/types";

export function useAuth() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const isCheckingRef = useRef(false);
  const { user, isAuthenticated, isLoading, isInitialized } = useAppSelector(
    (state) => state.auth,
  );

  const checkSession = useCallback(async () => {
    // Prevent duplicate calls
    if (isCheckingRef.current) return;
    isCheckingRef.current = true;

    try {
      dispatch(setLoading(true));
      const userData = await authApi.getMe();
      dispatch(setUser(userData));
    } catch {
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
      dispatch(setInitialized(true));
      isCheckingRef.current = false;
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", getErrorMessage(error));
    } finally {
      dispatch(logoutAction());
      dispatch(clearAllNotifications());
      dispatch(setLoading(false));
      // Clear all cached data to prevent previous user's data from showing
      queryClient.clear();
    }
  }, [dispatch, queryClient]);

  // Listen for unauthorized events from axios interceptor
  useEffect(() => {
    const handleUnauthorized = () => {
      dispatch(logoutAction());
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    checkSession,
    logout,
  };
}
