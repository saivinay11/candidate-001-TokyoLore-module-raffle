import { type NextRequest } from "next/server";
import Stripe from "stripe";
import { APP_CONFIG } from "@/lib/config";
import {
  ApiError,
  createErrorResponse,
  createSuccessResponse,
} from "@/lib/api-utils";
import { validators } from "@/lib/utils";

// Initialize Stripe with secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Check for missing environment variables during initialization
if (!stripeSecretKey) {
  console.warn(
    "Missing STRIPE_SECRET_KEY environment variable. Stripe integration will not work properly."
  );
}

// Use a placeholder key for development if the real key is missing
const stripe = new Stripe(stripeSecretKey || "sk_test_placeholder", {
  apiVersion: "2025-05-28.basil",
});

/**
 * POST /api/create-checkout-session
 * Creates a Stripe checkout session for purchasing raffle tickets
 *
 * Request body:
 * - amount: The amount in cents
 * - currency: The currency code (e.g., "usd")
 * - userId: The ID of the user making the purchase
 *
 * Responses:
 * - 200: { success: true, sessionId: string, url: string }
 * - 400: { error: string, code: string } if request is invalid
 * - 500: { error: string } if server error or Stripe is misconfigured
 */
export async function POST(request: NextRequest) {
  try {
    // Validate Stripe configuration
    if (!stripeSecretKey) {
      throw new ApiError(
        "Stripe is not properly configured",
        500,
        "STRIPE_MISCONFIGURED"
      );
    }

    // Parse and validate request body
    const body = await request.json().catch(() => ({}));
    const { amount, currency, userId, ticketCount: providedTicketCount } = body;

    // Input validation
    if (!validators.isValidAmount(amount)) {
      throw new ApiError(
        "Amount must be a positive number",
        400,
        "INVALID_AMOUNT"
      );
    }

    if (!validators.isValidCurrency(currency)) {
      throw new ApiError(
        "Currency must be a valid 3-letter code",
        400,
        "INVALID_CURRENCY"
      );
    }

    if (!validators.isValidUserId(userId)) {
      throw new ApiError(
        "User ID is required and must be alphanumeric",
        400,
        "INVALID_USER_ID"
      );
    }

    // Get origin for success/cancel URLs
    const origin =
      request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "";

    // Use provided ticketCount if available, otherwise calculate based on amount (1 ticket per $1.00)
    const ticketCount =
      typeof providedTicketCount === "number"
        ? providedTicketCount
        : Math.floor(amount / 100);

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "TokyoLore Raffle Tickets",
              description: APP_CONFIG.stripe.paymentDescription,
              images: [
                "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80",
              ],
            },
            unit_amount: amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}${APP_CONFIG.pages.paymentSuccess}?session_id={CHECKOUT_SESSION_ID}&tickets_purchased=${ticketCount}`,
      cancel_url: `${origin}${APP_CONFIG.pages.paymentCancelled}`,
      metadata: {
        userId,
        ticketCount: ticketCount,
        createdAt: new Date().toISOString(),
      },
    });

    return createSuccessResponse({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    // Special handling for Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe API error:", error.message);
      return createErrorResponse(
        new ApiError(
          `Payment processing error: ${error.message}`,
          400,
          `STRIPE_${error.type.toUpperCase()}`
        )
      );
    }

    // General error handling
    console.error("Error creating checkout session:", error);
    return createErrorResponse(
      error instanceof Error ? error : "Failed to create checkout session",
      error instanceof ApiError ? error.statusCode : 500
    );
  }
}
