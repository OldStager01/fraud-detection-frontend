import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthGuard, GuestGuard } from "@/components/common";
import { LoginPage, RegisterPage, DashboardPage } from "@/pages";

export const router = createBrowserRouter([
  // Public routes (guest only)
  {
    path: "/login",
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestGuard>
        <RegisterPage />
      </GuestGuard>
    ),
  },

  // Protected routes
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <DashboardPage />
      </AuthGuard>
    ),
  },

  // Redirects
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  // 404 fallback
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
