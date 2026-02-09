import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 300));
    expect(result.current).toBe("initial");
  });

  it("debounces value changes", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 300 } },
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 300 });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("updated");
  });

  it("uses default delay of 300ms", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "initial" },
    });

    rerender({ value: "updated" });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("updated");
  });

  it("resets timer on rapid changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "b" });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: "c" });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe("c");
  });

  it("handles different value types", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: { foo: "bar" } } },
    );

    expect(result.current).toEqual({ foo: "bar" });

    rerender({ value: { foo: "baz" } });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toEqual({ foo: "baz" });
  });
});
