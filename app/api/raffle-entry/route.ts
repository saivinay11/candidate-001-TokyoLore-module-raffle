import { type NextRequest } from "next/server";
import { userTickets, mockDB } from "@/lib/mock-db";
import {
  ApiError,
  createErrorResponse,
  createSuccessResponse,
} from "@/lib/api-utils";

/**
 * POST /api/raffle-entry
 * Adds a ticket to the user's raffle entries
 *
 * Request body:
 * - userId: The ID of the user to add a ticket for
 *
 * Responses:
 * - 200: { success: true, tickets: number }
 * - 400: { error: string, code: string } if userId is missing or invalid
 * - 429: { error: string, code: string } if rate limit exceeded
 * - 500: { error: string } if server error
 */
export async function POST(request: NextRequest) {
  try {
    // Input validation
    const body = await request.json().catch(() => ({}));
    const { userId } = body;

    if (!userId) {
      throw new ApiError("User ID is required", 400, "MISSING_USER_ID");
    }

    // Security check - validate userId format
    if (!/^[a-zA-Z0-9_-]+$/.test(userId)) {
      throw new ApiError("Invalid user ID format", 400, "INVALID_USER_ID");
    }

    // Implement basic rate limiting
    // In a real application, this would use Redis or a similar service
    const clientIp = request.headers.get("x-forwarded-for") || "unknown";
    const currentTime = Date.now();

    // In a real implementation, check if user has exceeded rate limit
    // This is just a placeholder comment since we're using mock data
    // if (hasExceededRateLimit(clientIp, currentTime)) {
    //   throw new ApiError("Rate limit exceeded, try again later", 429, "RATE_LIMIT_EXCEEDED");
    // }

    // Use the new mockDB.incrementTickets function instead of direct access
    const newTicketCount = mockDB.incrementTickets(userId);

    return createSuccessResponse({
      success: true,
      tickets: newTicketCount,
      userId,
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
