/**
 * Core application types
 */

// User-related types
export interface User {
  id: string;
  name?: string;
  email?: string;
}

// Raffle-related types
export interface RaffleTicket {
  id: string;
  userId: string;
  createdAt: Date;
  paymentId?: string;
}

export interface RaffleEntry {
  userId: string;
  tickets: number;
  lastUpdated: Date;
}

// Payment-related types
export interface PaymentInfo {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: Date;
  metadata?: Record<string, unknown>;
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

// Configuration types
export interface AppConfig {
  stripe: {
    currency: string;
    ticketPrice: number;
    paymentDescription: string;
  };
  api: {
    raffleStatus: string;
    raffleEntry: string;
    checkoutSession: string;
    stripeWebhook: string;
  };
  pages: {
    paymentSuccess: string;
    paymentCancelled: string;
  };
  widgetStyles: {
    primaryColor: string;
    successColor: string;
    dangerColor: string;
    borderRadius: string;
  };
}
