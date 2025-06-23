import { useState, useEffect, useCallback } from "react";
import {
  fetchUserTickets,
  enterRaffle,
  createCheckoutSession,
  RaffleServiceError,
  type PaymentRequest,
} from "@/lib/services/raffle-service";
import { validators } from "@/lib/utils";

interface UseRaffleOptions {
  userId: string;
  autoFetch?: boolean;
  onError?: (error: Error) => void;
}

interface UseRaffleReturn {
  ticketCount: number | null;
  isLoading: boolean;
  isJoiningRaffle: boolean;
  isProcessingPayment: boolean;
  error: string | null;
  fetchTickets: () => Promise<void>;
  joinRaffle: () => Promise<void>;
  proceedToPayment: (
    paymentInfo?: Omit<PaymentRequest, "userId">
  ) => Promise<void>;
  resetError: () => void;
}

/**
 * Custom hook for managing raffle ticket state and operations
 */
export function useRaffle({
  userId,
  autoFetch = false,
  onError,
}: UseRaffleOptions): UseRaffleReturn {
  const [ticketCount, setTicketCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [isJoiningRaffle, setIsJoiningRaffle] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate userId when hook is initialized
  useEffect(() => {
    if (!validators.isValidUserId(userId)) {
      console.error("Invalid userId provided to useRaffle:", userId);
      setError("Invalid user ID format");

      if (onError) {
        onError(new Error("Invalid user ID format"));
      }
    } else if (autoFetch) {
      fetchTickets();
    }
  }, [userId, onError]);
  const fetchTickets = useCallback(async (): Promise<void> => {
    // Return early if userId is invalid
    if (!validators.isValidUserId(userId)) {
      setError("Invalid user ID format");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchUserTickets(userId);
      setTicketCount(data.tickets);
    } catch (err) {
      const errorMessage =
        err instanceof RaffleServiceError
          ? err.message
          : "Failed to load ticket count";

      setError(errorMessage);
      console.error("Error fetching tickets:", err);

      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage));
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, onError]);

  const joinRaffle = async (): Promise<void> => {
    if (isJoiningRaffle || isProcessingPayment) return;

    try {
      setIsJoiningRaffle(true);
      setError(null);

      const data = await enterRaffle(userId);

      if (data.success) {
        setTicketCount(data.tickets);
      } else {
        throw new Error(data.error || "Failed to enter raffle");
      }
    } catch (err) {
      setError("❌ Error joining raffle, please try again.");
      console.error("Error joining raffle:", err);
    } finally {
      setTimeout(() => {
        setIsJoiningRaffle(false);
      }, 500);
    }
  };
  const proceedToPayment = async (
    paymentInfo?: Omit<PaymentRequest, "userId">
  ): Promise<void> => {
    if (isJoiningRaffle || isProcessingPayment) return;

    try {
      setIsProcessingPayment(true);
      setError(null);

      if (!paymentInfo) {
        throw new Error("Payment information is required");
      }

      const data = await createCheckoutSession({
        ...paymentInfo,
        userId,
      });

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError("❌ Payment initialization failed. Please try again.");
      console.error("Error creating checkout session:", err);
      setIsProcessingPayment(false);
    }
  };

  const resetError = () => setError(null);

  return {
    ticketCount,
    isLoading,
    isJoiningRaffle,
    isProcessingPayment,
    error,
    fetchTickets,
    joinRaffle,
    proceedToPayment,
    resetError,
  };
}
