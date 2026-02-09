import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema } from "./auth.schema";

describe("loginSchema", () => {
  it("validates correct credentials", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("requires email", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("validates email format", () => {
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("requires password", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  const validData = {
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    password: "Password1",
    password_confirmation: "Password1",
  };

  it("validates correct registration data", () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("requires first name", () => {
    const result = registerSchema.safeParse({ ...validData, first_name: "" });
    expect(result.success).toBe(false);
  });

  it("validates first name min length", () => {
    const result = registerSchema.safeParse({ ...validData, first_name: "J" });
    expect(result.success).toBe(false);
  });

  it("validates first name max length", () => {
    const result = registerSchema.safeParse({
      ...validData,
      first_name: "A".repeat(51),
    });
    expect(result.success).toBe(false);
  });

  it("validates first name characters", () => {
    const result = registerSchema.safeParse({
      ...validData,
      first_name: "John123",
    });
    expect(result.success).toBe(false);
  });

  it("requires last name", () => {
    const result = registerSchema.safeParse({ ...validData, last_name: "" });
    expect(result.success).toBe(false);
  });

  it("validates email format", () => {
    const result = registerSchema.safeParse({
      ...validData,
      email: "invalid-email",
    });
    expect(result.success).toBe(false);
  });

  it("validates password min length", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "Pass1",
      password_confirmation: "Pass1",
    });
    expect(result.success).toBe(false);
  });

  it("validates password complexity", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "password",
      password_confirmation: "password",
    });
    expect(result.success).toBe(false);
  });

  it("validates password confirmation match", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password_confirmation: "Different1",
    });
    expect(result.success).toBe(false);
  });

  it("allows hyphens and apostrophes in names", () => {
    const result = registerSchema.safeParse({
      ...validData,
      first_name: "Mary-Jane",
      last_name: "O'Connor",
    });
    expect(result.success).toBe(true);
  });
});
