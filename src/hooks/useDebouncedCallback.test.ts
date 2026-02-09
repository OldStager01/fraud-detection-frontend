import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebouncedCallback } from "./useDebouncedCallback";

describe("useDebouncedCallback", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("delays callback execution", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));

    act(() => {
      result.current("test");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledWith("test");
  });

  it("uses default delay of 300ms", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback));

    act(() => {
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalled();
  });

  it("cancels previous call on rapid invocations", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));

    act(() => {
      result.current("first");
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    act(() => {
      result.current("second");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("second");
  });

  it("passes multiple arguments", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 300));

    act(() => {
      result.current("a", "b", "c");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledWith("a", "b", "c");
  });

  it("maintains stable reference between renders", () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ cb }) => useDebouncedCallback(cb, 300),
      { initialProps: { cb: callback } },
    );

    const firstRef = result.current;
    rerender({ cb: callback });

    expect(result.current).toBe(firstRef);
  });
});
