import { type NextRequest } from "next/server";
import { userTickets, mockDB } from "@/lib/mock-db";
import {
  ApiError,
  createErrorResponse,
  createSuccessResponse,
} from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userId, ticketCount = 1 } = body;

    if (!userId) {
      throw new ApiError("User ID is required", 400, "MISSING_USER_ID");
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(userId)) {
      throw new ApiError("Invalid user ID format", 400, "INVALID_USER_ID");
    }

    // ✅ Use ticketCount to increment tickets
    const newTicketCount = mockDB.incrementTickets(userId, ticketCount);

    return createSuccessResponse({
      success: true,
      tickets: newTicketCount,
      userId,
      added: ticketCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in raffle-entry route:", error);
    return createErrorResponse(
      error instanceof Error ? error : "Failed to process raffle entry",
      error instanceof ApiError ? error.statusCode : 500
    );
  }
}
