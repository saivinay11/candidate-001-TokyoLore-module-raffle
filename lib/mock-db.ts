/**
 * Mock database for demonstration purposes
 */
import { RaffleEntry } from "@/types/app";

// --------------------
// Types & Interfaces
// --------------------
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

// --------------------
// Internal Data Stores
// --------------------
const _userTicketData: Record<string, UserTicketData> = {
  "123": { count: 5, lastUpdated: new Date() },
  "456": { count: 2, lastUpdated: new Date() },
};

const _ticketUpdateHistory: Array<{
  userId: string;
  previousCount: number;
  newCount: number;
  timestamp: Date;
  operation: "increment" | "update" | "reset";
}> = [];

// --------------------
// Helper: Record Updates
// --------------------
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

// --------------------
// Core MockDB Functions
// --------------------
const mockDatabaseOperations: MockDatabaseOperations = {
  getTickets: (userId: string): number => {
    return _userTicketData[userId]?.count || 0;
  },

  updateTickets: (userId: string, count: number): boolean => {
    if (!userId || count < 0) return false;
    const previous = mockDatabaseOperations.getTickets(userId);
    _userTicketData[userId] = { count, lastUpdated: new Date() };
    recordUpdate(userId, previous, count, "update");
    return true;
  },

  incrementTickets: (userId: string, amount: number = 1): number => {
    if (!userId || amount <= 0) return mockDatabaseOperations.getTickets(userId);
    const previous = mockDatabaseOperations.getTickets(userId);
    const newCount = previous + amount;
    _userTicketData[userId] = { count: newCount, lastUpdated: new Date() };
    recordUpdate(userId, previous, newCount, "increment");
    return newCount;
  },

  getAllUsers: (): string[] => Object.keys(_userTicketData),

  resetDatabase: (): void => {
    const userIds = Object.keys(_userTicketData);
    userIds.forEach((id) => {
      const previous = _userTicketData[id].count;
      recordUpdate(id, previous, 0, "reset");
      delete _userTicketData[id];
    });

    _userTicketData["123"] = { count: 5, lastUpdated: new Date() };
    _userTicketData["456"] = { count: 2, lastUpdated: new Date() };

    console.log("🧹 Mock DB reset to initial state");
  },
};

// --------------------
// Exports
// --------------------
export const mockDB = mockDatabaseOperations;

export const userTickets = new Proxy<Record<string, number>>(
  {},
  {
    get(_, userId: string) {
      return mockDB.getTickets(userId);
    },
    set(_, userId: string, value: number) {
      return mockDB.updateTickets(userId, value);
    },
  }
);

export const resetMockDatabase = mockDB.resetDatabase;
export type { UserTicketData };
