/**
 * Type definitions for environment variables
 * Makes it easier to handle environment variables with proper typing
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_SECRET_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      NEXT_PUBLIC_APP_URL: string;
    }
  }
}

// Need to be exported to be recognized as a module
export {};
