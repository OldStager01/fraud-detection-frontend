import type { User } from "@/types";
import type { AuditLog } from "../api";
import dayjs from "dayjs";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "john@example.com",
    first_name: "John",
    last_name: "Success",
    role: "customer",
    status: "active",
    created_at: dayjs().subtract(30, "day").toISOString(),
  },
  {
    id: "2",
    email: "jane@example.com",
    first_name: "Jane",
    last_name: "Flagged",
    role: "customer",
    status: "active",
    created_at: dayjs().subtract(25, "day").toISOString(),
  },
  {
    id: "3",
    email: "bob@example.com",
    first_name: "Bob",
    last_name: "Blocked",
    role: "customer",
    status: "suspended",
    created_at: dayjs().subtract(20, "day").toISOString(),
  },
  {
    id: "4",
    email: "alice@example.com",
    first_name: "Alice",
    last_name: "Admin",
    role: "admin",
    status: "active",
    created_at: dayjs().subtract(60, "day").toISOString(),
  },
  {
    id: "5",
    email: "charlie@example.com",
    first_name: "Charlie",
    last_name: "Manager",
    role: "manager",
    status: "active",
    created_at: dayjs().subtract(45, "day").toISOString(),
  },
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    event_type: "TRANSACTION_BLOCKED",
    entity_type: "Transaction",
    entity_id: "txn_001",
    description: "Triggered rules: AMOUNT_DEVIATION_HIGH,UNTRUSTED_DEVICE",
    created_at: dayjs().subtract(1, "hour").toISOString(),
  },
  {
    id: "2",
    event_type: "TRANSACTION_FLAGGED",
    entity_type: "Transaction",
    entity_id: "txn_002",
    description: "Triggered rules: RAPID_LARGE_AMOUNT",
    created_at: dayjs().subtract(2, "hour").toISOString(),
  },
  {
    id: "3",
    event_type: "TRANSACTION_SUCCESS",
    entity_type: "Transaction",
    entity_id: "txn_003",
    description: "Triggered rules: ",
    created_at: dayjs().subtract(3, "hour").toISOString(),
  },
  {
    id: "4",
    event_type: "USER_LOGIN",
    entity_type: "User",
    entity_id: "user_001",
    description: "User logged in successfully",
    created_at: dayjs().subtract(4, "hour").toISOString(),
  },
  {
    id: "5",
    event_type: "USER_REGISTERED",
    entity_type: "User",
    entity_id: "user_002",
    description: "New user registration",
    created_at: dayjs().subtract(1, "day").toISOString(),
  },
];
