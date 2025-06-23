/**
 * Mock database for demonstration purposes
 * In a real application, this would be a proper database with persistence
 */
import { RaffleEntry } from "@/types/app";

// User ticket data structure
interface UserTicketData {
  count: number;
  lastUpdated: Date;
}

interface MockDatabaseOperations {
  getTickets: (userId: string) => number;
  updateTickets: (userId: string, count: number) => boolean;
  incrementTickets: (userId: string, amount?: number) => number;
  getAllUsers: () => string[];
  resetDatabase: () => void;
}

// Mock tickets database - maps user IDs to ticket information
const _userTicketData: Record<string, UserTicketData> = {
  "123": { count: 5, lastUpdated: new Date() },
  "456": { count: 2, lastUpdated: new Date() },
};

// Store ticket update history for debugging and auditing
const _ticketUpdateHistory: Array<{
  userId: string;
  previousCount: number;
  newCount: number;
  timestamp: Date;
  operation: "increment" | "update" | "reset";
}> = [];

/**
 * Add an entry to the ticket update history
 */
const recordUpdate = (
  userId: string,
  previousCount: number,
  newCount: number,
  operation: "increment" | "update" | "reset"
) => {
  _ticketUpdateHistory.push({
    userId,
    previousCount,
    newCount,
    timestamp: new Date(),
    operation,
  });
};

/**
 * Mock database operations
 */
const mockDatabaseOperations: MockDatabaseOperations = {
  // Get ticket count for a user
  getTickets: (userId: string): number => {
    if (typeof userId !== "string" || !userId) {
      console.error("Invalid userId:", userId);
      return 0;
    }

    const userData = _userTicketData[userId];
    return userData ? userData.count : 0;
  },

  // Update ticket count for a user
  updateTickets: (userId: string, count: number): boolean => {
    if (typeof userId !== "string" || !userId) {
      console.error("Invalid userId:", userId);
      return false;
    }

    if (typeof count !== "number" || isNaN(count) || count < 0) {
      console.error("Invalid ticket count:", count);
      return false;
    }

    const previousCount = mockDatabaseOperations.getTickets(userId);

    // Update or create user data
    _userTicketData[userId] = {
      count,
      lastUpdated: new Date(),
    };

    recordUpdate(userId, previousCount, count, "update");
    console.log(`Updated tickets for user ${userId}: ${count}`);
    return true;
  },

  // Increment ticket count for a user
  incrementTickets: (userId: string, amount = 1): number => {
    if (typeof userId !== "string" || !userId) {
      console.error("Invalid userId:", userId);
      return 0;
    }

    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      console.error("Invalid increment amount:", amount);
      return mockDatabaseOperations.getTickets(userId);
    }

    const previousCount = mockDatabaseOperations.getTickets(userId);
    const newCount = previousCount + amount;

    // Update or create user data
    _userTicketData[userId] = {
      count: newCount,
      lastUpdated: new Date(),
    };

    recordUpdate(userId, previousCount, newCount, "increment");
    console.log(
      `Incremented tickets for user ${userId} by ${amount} to ${newCount}`
    );
    return newCount;
  },

  // Get all user IDs
  getAllUsers: (): string[] => {
    return Object.keys(_userTicketData);
  },

  // Reset the database to initial state
  resetDatabase: (): void => {
    // Get all current user IDs
    const userIds = Object.keys(_userTicketData);

    // Record all resets
    userIds.forEach((userId) => {
      const previousCount = _userTicketData[userId].count;
      recordUpdate(userId, previousCount, 0, "reset");
    });

    // Clear the database
    userIds.forEach((key) => {
      delete _userTicketData[key];
    });

    // Restore initial state
    _userTicketData["123"] = { count: 5, lastUpdated: new Date() };
    _userTicketData["456"] = { count: 2, lastUpdated: new Date() };

    console.log("Database reset to initial state");
  },
};

// Create a proxy for backward compatibility with direct array access
export const userTickets = new Proxy<Record<string, number>>(
  {},
  {
    get(_, userId: string) {
      return mockDatabaseOperations.getTickets(userId);
    },
    set(_, userId: string, value: number) {
      return mockDatabaseOperations.updateTickets(userId, value);
    },
  }
);

// Export the database operations
export const mockDB = mockDatabaseOperations;

// For testing and debugging
export const resetMockDatabase = mockDatabaseOperations.resetDatabase;

// Export types for reuse
export type { UserTicketData };
