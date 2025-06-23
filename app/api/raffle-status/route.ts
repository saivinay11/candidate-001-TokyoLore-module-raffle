import { type NextRequest } from "next/server";
import { userTickets, mockDB } from "@/lib/mock-db";
import {
  ApiError,
  createErrorResponse,
  createSuccessResponse,
} from "@/lib/api-utils";

/**
 * GET /api/raffle-status
 * Retrieves the current number of raffle tickets for a user
 *
 * Query parameters:
 * - userId: The ID of the user to get tickets for
 *
 * Responses:
 * - 200: { tickets: number }
 * - 400: { error: string, code: string } if userId is missing
 * - 500: { error: string } if server error
 */
export async function GET(request: NextRequest) {
  try {
    // Input validation
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      throw new ApiError("User ID is required", 400, "MISSING_USER_ID");
    }

    // Security check - validate userId format if needed
    if (!/^[a-zA-Z0-9_-]+$/.test(userId)) {
      throw new ApiError("Invalid user ID format", 400, "INVALID_USER_ID");
    }

    // Use the new mockDB.getTickets function instead of direct access
    const tickets = mockDB.getTickets(userId);

    // Add response metadata
    return createSuccessResponse({
      tickets,
      userId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in raffle-status route:", error);
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      error instanceof ApiError ? error.statusCode : 500
    );
  }
}
