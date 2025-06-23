import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Input validation utilities
 */
export const validators = {
  /**
   * Validates that a user ID is in the correct format
   * @param userId The user ID to validate
   * @returns Whether the user ID is valid
   */
  isValidUserId: (userId: any): boolean => {
    return typeof userId === "string" && /^[a-zA-Z0-9_-]+$/.test(userId);
  },

  /**
   * Validates that a currency code is in the correct format (e.g., "usd", "eur")
   * @param currency The currency code to validate
   * @returns Whether the currency code is valid
   */
  isValidCurrency: (currency: any): boolean => {
    return typeof currency === "string" && /^[a-z]{3}$/.test(currency);
  },

  /**
   * Validates that an amount is a positive number
   * @param amount The amount to validate
   * @returns Whether the amount is valid
   */
  isValidAmount: (amount: any): boolean => {
    return typeof amount === "number" && !isNaN(amount) && amount > 0;
  },

  /**
   * Validates that a URL is in the correct format
   * @param url The URL to validate
   * @returns Whether the URL is valid
   */
  isValidUrl: (url: any): boolean => {
    if (typeof url !== "string") return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validates that an email address is in the correct format
   * @param email The email address to validate
   * @returns Whether the email address is valid
   */
  isValidEmail: (email: any): boolean => {
    return (
      typeof email === "string" &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    );
  },
};

/**
 * Format a currency amount for display (e.g., $10.00)
 * @param amount The amount in cents
 * @param currency The currency code
 * @returns The formatted currency string
 */
export function formatCurrency(amount: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

/**
 * Format a date for display
 * @param date The date to format
 * @returns The formatted date string
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(dateObj);
}
