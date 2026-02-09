import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import authReducer from "@/store/slices/authSlice";
import uiReducer from "@/store/slices/uiSlice";
import notificationReducer from "@/store/slices/notificationSlice";
import type { RootState } from "@/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  route?: string;
}

export function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      notifications: notificationReducer,
    },
    preloadedState: preloadedState as RootState | undefined,
  });
}

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, route = "/", ...renderOptions }: ExtendedRenderOptions = {},
) {
  const store = createTestStore(preloadedState);
  const queryClient = createTestQueryClient();

  window.history.pushState({}, "Test page", route);

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      </Provider>
    );
  }

  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
