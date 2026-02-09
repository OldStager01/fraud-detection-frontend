import { describe, it, expect } from "vitest";
import authReducer, {
  setUser,
  setLoading,
  setInitialized,
  logout,
} from "./authSlice";
import type { User } from "@/types";

const mockUser: User = {
  id: "1",
  email: "test@example.com",
  first_name: "John",
  last_name: "Doe",
  role: "customer",
  status: "active",
};

describe("authSlice", () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false,
  };

  it("returns initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("setUser", () => {
    it("sets user and authenticates", () => {
      const state = authReducer(initialState, setUser(mockUser));
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it("clears user when null", () => {
      const authenticatedState = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true,
      };
      const state = authReducer(authenticatedState, setUser(null));
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe("setLoading", () => {
    it("sets loading to true", () => {
      const state = authReducer(initialState, setLoading(true));
      expect(state.isLoading).toBe(true);
    });

    it("sets loading to false", () => {
      const loadingState = { ...initialState, isLoading: true };
      const state = authReducer(loadingState, setLoading(false));
      expect(state.isLoading).toBe(false);
    });
  });

  describe("setInitialized", () => {
    it("sets initialized to true", () => {
      const state = authReducer(initialState, setInitialized(true));
      expect(state.isInitialized).toBe(true);
    });
  });

  describe("logout", () => {
    it("clears user and sets unauthenticated", () => {
      const authenticatedState = {
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
      };
      const state = authReducer(authenticatedState, logout());
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });
});
