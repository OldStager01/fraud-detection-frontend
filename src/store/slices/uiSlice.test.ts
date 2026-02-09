import { describe, it, expect, vi, beforeEach } from "vitest";
import uiReducer, {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapsed,
  setSidebarCollapsed,
} from "./uiSlice";

describe("uiSlice", () => {
  const initialState = {
    theme: "system" as const,
    sidebarOpen: false,
    sidebarCollapsed: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns initial state", () => {
    const state = uiReducer(undefined, { type: "unknown" });
    expect(state.sidebarOpen).toBe(false);
    expect(state.sidebarCollapsed).toBe(false);
  });

  describe("setTheme", () => {
    it("sets theme to dark", () => {
      const state = uiReducer(initialState, setTheme("dark"));
      expect(state.theme).toBe("dark");
    });

    it("sets theme to light", () => {
      const state = uiReducer(initialState, setTheme("light"));
      expect(state.theme).toBe("light");
    });

    it("stores theme in localStorage", () => {
      uiReducer(initialState, setTheme("dark"));
      expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    });
  });

  describe("toggleSidebar", () => {
    it("toggles sidebar from closed to open", () => {
      const state = uiReducer(initialState, toggleSidebar());
      expect(state.sidebarOpen).toBe(true);
    });

    it("toggles sidebar from open to closed", () => {
      const openState = { ...initialState, sidebarOpen: true };
      const state = uiReducer(openState, toggleSidebar());
      expect(state.sidebarOpen).toBe(false);
    });
  });

  describe("setSidebarOpen", () => {
    it("sets sidebar open", () => {
      const state = uiReducer(initialState, setSidebarOpen(true));
      expect(state.sidebarOpen).toBe(true);
    });

    it("sets sidebar closed", () => {
      const openState = { ...initialState, sidebarOpen: true };
      const state = uiReducer(openState, setSidebarOpen(false));
      expect(state.sidebarOpen).toBe(false);
    });
  });

  describe("toggleSidebarCollapsed", () => {
    it("toggles collapsed state", () => {
      const state = uiReducer(initialState, toggleSidebarCollapsed());
      expect(state.sidebarCollapsed).toBe(true);
    });
  });

  describe("setSidebarCollapsed", () => {
    it("sets collapsed state", () => {
      const state = uiReducer(initialState, setSidebarCollapsed(true));
      expect(state.sidebarCollapsed).toBe(true);
    });
  });
});
