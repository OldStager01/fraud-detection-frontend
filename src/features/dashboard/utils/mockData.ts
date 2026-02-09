import type { Transaction } from "@/types";
import dayjs from "dayjs";

const statuses: Transaction["status"][] = [
  "SUCCESS",
  "SUCCESS",
  "SUCCESS",
  "SUCCESS",
  "FLAGGED",
  "BLOCKED",
];
const paymentMethods: Transaction["payment_method"][] = [
  "card",
  "upi",
  "bank_transfer",
  "wallet",
];

function randomAmount(): number {
  const ranges = [
    { min: 100, max: 1000, weight: 40 },
    { min: 1000, max: 10000, weight: 35 },
    { min: 10000, max: 50000, weight: 20 },
    { min: 50000, max: 200000, weight: 5 },
  ];

  const rand = Math.random() * 100;
  let cumulative = 0;

  for (const range of ranges) {
    cumulative += range.weight;
    if (rand <= cumulative) {
      return Math.floor(Math.random() * (range.max - range.min) + range.min);
    }
  }

  return 1000;
}

function generateRiskScore(status: Transaction["status"]): number {
  switch (status) {
    case "SUCCESS":
      return Math.floor(Math.random() * 25);
    case "FLAGGED":
      return Math.floor(Math.random() * 40) + 30;
    case "BLOCKED":
      return Math.floor(Math.random() * 30) + 70;
    default:
      return 0;
  }
}

export function generateMockTransactions(count: number = 100): Transaction[] {
  const transactions: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);

    transactions.push({
      id: `txn_${Date.now()}_${i}`,
      amount: randomAmount(),
      payment_method:
        paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      device_id: `device_${Math.random().toString(36).substring(7)}`,
      status,
      risk_score: generateRiskScore(status),
      ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      created_at: dayjs()
        .subtract(daysAgo, "day")
        .subtract(hoursAgo, "hour")
        .toISOString(),
      rules_triggered:
        status !== "SUCCESS" ? "AMOUNT_DEVIATION_HIGH,UNTRUSTED_DEVICE" : null,
      feedback_submitted: false,
    });
  }

  return transactions.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export const mockTransactions = generateMockTransactions(150);
