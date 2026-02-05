import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setUser,
  setLoading,
  setInitialized,
  logout as logoutAction,
} from "@/store/slices/authSlice";
import { authApi } from "../api";
import { getErrorMessage } from "@/types";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, isInitialized } = useAppSelector(
    (state) => state.auth,
  );

  const checkSession = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const userData = await authApi.getMe();
      dispatch(setUser(userData));
    } catch {
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
      dispatch(setInitialized(true));
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
      dispatch(setLoading(false));
    }
  }, [dispatch]);

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
