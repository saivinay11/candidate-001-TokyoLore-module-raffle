import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { userTickets } from "@/lib/mock-db";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_your_key", {
  apiVersion: "2025-05-28.basil",
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "whsec_your_webhook_secret"
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract user ID from metadata (we'll need to pass this from the frontend)
    const userId = session.metadata?.userId || "unknown";

    // Initialize user if doesn't exist
    if (!userTickets[userId]) {
      userTickets[userId] = 0;
    }

    // Get the ticket count from metadata or calculate based on payment amount
    // $1 = 1 ticket
    const ticketCount = session.metadata?.ticketCount
      ? parseInt(session.metadata.ticketCount, 10)
      : Math.floor((session.amount_total || 0) / 100);

    // Add tickets to the user's account
    userTickets[userId] += ticketCount;

    return NextResponse.json({
      success: true,
      tickets: userTickets[userId],
      purchasedTickets: ticketCount,
    });
  }

  return NextResponse.json({ received: true });
}
