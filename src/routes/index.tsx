import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthGuard, GuestGuard } from "@/components/common";
import { MainLayout } from "@/layouts";
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  TransactionsPage,
  RiskAnalysisPage,
  SettingsPage,
  NotFoundPage,
} from "@/pages";

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

  // Protected routes with layout
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
      {
        path: "risk-analysis",
        element: <RiskAnalysisPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },

  // 404
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
