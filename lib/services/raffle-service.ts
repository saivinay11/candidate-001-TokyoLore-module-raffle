/**
 * Service layer for raffle ticket operations
 * This provides a centralized place for all raffle-related API calls
 */

/**
 * Error class specific to raffle operations
 */
export class RaffleServiceError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "RaffleServiceError";
    this.statusCode = statusCode;
  }
}

export interface RaffleTicketResponse {
  tickets: number;
  success?: boolean;
  error?: string;
}

export interface CheckoutSessionResponse {
  url: string;
  success: boolean;
  sessionId?: string;
  error?: string;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  userId: string;
  ticketCount?: number;
}

/**
 * Fetches the current ticket count for a user
 * @param userId The user ID to fetch tickets for
 * @throws {RaffleServiceError} If the API request fails
 */
export async function fetchUserTickets(
  userId: string
): Promise<RaffleTicketResponse> {
  if (!userId) {
    throw new RaffleServiceError("User ID is required");
  }

  try {
    const response = await fetch(
      `/api/raffle-status?userId=${encodeURIComponent(userId)}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new RaffleServiceError(
        errorData.error || `API error: ${response.status}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof RaffleServiceError) {
      throw error;
    }

    console.error("Failed to fetch user tickets:", error);
    throw new RaffleServiceError(
      error instanceof Error ? error.message : "Failed to fetch ticket count"
    );
  }
}

/**
 * Adds a ticket for the user's raffle entry
 * @param userId The user ID to add a ticket for
 * @throws {RaffleServiceError} If the API request fails
 */
export async function enterRaffle(
  userId: string
): Promise<RaffleTicketResponse> {
  if (!userId) {
    throw new RaffleServiceError("User ID is required");
  }

  try {
    const response = await fetch("/api/raffle-entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new RaffleServiceError(
        errorData.error || `API error: ${response.status}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof RaffleServiceError) {
      throw error;
    }

    console.error("Failed to enter raffle:", error);
    throw new RaffleServiceError(
      error instanceof Error ? error.message : "Failed to enter raffle"
    );
  }
}

/**
 * Creates a checkout session for ticket purchase
 * @param data Payment request data including amount, currency, and userId
 * @throws {RaffleServiceError} If the API request fails
 */
export async function createCheckoutSession(
  data: PaymentRequest
): Promise<CheckoutSessionResponse> {
  if (!data.userId) {
    throw new RaffleServiceError("User ID is required");
  }

  if (!data.amount || data.amount <= 0) {
    throw new RaffleServiceError("Valid amount is required");
  }

  if (!data.currency) {
    throw new RaffleServiceError("Currency is required");
  }

  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new RaffleServiceError(
        errorData.error || `API error: ${response.status}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof RaffleServiceError) {
      throw error;
    }

    console.error("Failed to create checkout session:", error);
    throw new RaffleServiceError(
      error instanceof Error
        ? error.message
        : "Failed to create checkout session"
    );
  }
}
