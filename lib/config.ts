/**
 * Application configuration
 * Central place for all app constants and configuration values
 */

import { AppConfig } from "@/types/app";

export const APP_CONFIG: AppConfig = {
  // Stripe configuration
  stripe: {
    currency: "usd",
    ticketPrice: 100, // in cents ($1.00)
    paymentDescription: "Raffle Ticket Purchase",
  },

  // API endpoints
  api: {
    raffleStatus: "/api/raffle-status",
    raffleEntry: "/api/raffle-entry",
    checkoutSession: "/api/create-checkout-session",
    stripeWebhook: "/api/stripe-webhook",
  },

  // Pages
  pages: {
    paymentSuccess: "/payment-success",
    paymentCancelled: "/payment-cancelled",
  },

  // Widget styling
  widgetStyles: {
    primaryColor: "#E91E63",
    successColor: "#22c55e",
    dangerColor: "#ef4444",
    borderRadius: "8px",
  },
};
