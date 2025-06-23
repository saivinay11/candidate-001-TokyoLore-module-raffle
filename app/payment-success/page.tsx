"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const ticketsPurchased = searchParams.get("tickets_purchased");
  const [ticketCount, setTicketCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketCount = async () => {
      try {
        // Get user's updated ticket count after successful payment
        const response = await fetch(`/api/raffle-status?userId=123`);
        if (!response.ok) throw new Error("Failed to fetch ticket count");

        const data = await response.json();
        setTicketCount(data.tickets);
      } catch (err) {
        setError("Failed to load ticket information");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      fetchTicketCount();
    } else {
      setError("Invalid session");
      setIsLoading(false);
    }
  }, [sessionId]);

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Payment Successful!
        </h1>

        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-color,green)]"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
            ❌ {error}
          </div>
        ) : (
          <div className="text-center my-8">
            <p className="text-xl mb-2">
              ✅ You have {ticketsPurchased || "1"} tickets.
            </p>
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/"
            className="block w-full bg-[var(--accent-color,blue)] text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors text-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
