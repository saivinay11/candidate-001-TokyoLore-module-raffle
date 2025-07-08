"use client";

import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";
import { LoadingSpinner } from "./ui/loading-spinner";
import { ActionButton } from "./ui/action-button";
import { useRaffle } from "@/hooks/use-raffle";

interface RaffleTicketWidgetProps {
  userId: string;
}

export default function RaffleTicketWidget({
  userId,
}: RaffleTicketWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    ticketCount,
    isLoading: isInitialLoading,
    isJoiningRaffle,
    isProcessingPayment,
    error,
    fetchTickets,
    joinRaffle,
    proceedToPayment,
  } = useRaffle({
    userId,
    autoFetch: false,
  });

  useEffect(() => {
    if (isExpanded && ticketCount === null) {
      fetchTickets();
    }
  }, [isExpanded, ticketCount, fetchTickets]);
  const handleProceedToPayment = () => {
    proceedToPayment({
      amount: APP_CONFIG.stripe.ticketPrice,
      currency: APP_CONFIG.stripe.currency,
      ticketCount: ticketCount || 1, // Default to 1 if null
    });
  };

  // UI Constants from APP_CONFIG
  const { primaryColor, borderRadius } = APP_CONFIG.widgetStyles;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-[300px] h-[350px]" : "w-[50px] h-[50px]"
      }`}
      data-testid="raffle-widget"
    >
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full h-full flex items-center justify-center bg-[#E91E63] text-white shadow-lg hover:bg-opacity-90 transition-all duration-300 ease-in-out hover:shadow-xl"
          style={{ borderRadius }}
          aria-label="Open raffle ticket widget"
          data-testid="raffle-widget-toggle"
        >
          <Ticket className="w-6 h-6" />
        </button>
      ) : (
        <div
          className="w-full h-full bg-white shadow-xl p-4 flex flex-col border animate-slideIn"
          style={{
            borderRadius,
            borderColor: `var(--accent-color, ${primaryColor})`,
            boxShadow: `0 10px 25px -5px rgba(233, 30, 99, 0.3)`,
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg flex items-center">
              <Ticket className="w-5 h-5 mr-2 text-[#E91E63]" />
              <span>Raffle Tickets</span>
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-[#E91E63] transition-colors duration-200"
              aria-label="Close raffle ticket widget"
              data-testid="raffle-widget-close"
            >
              ✕
            </button>
          </div>

          <div className="flex-grow flex flex-col items-center justify-center min-h-0">
            {error ? (
              <div
                className="text-red-500 text-center mb-4 font-medium"
                role="alert"
              >
                {error}
              </div>
            ) : null}

            {isInitialLoading ? (
              <div className="text-center">
                <LoadingSpinner size="large" className="mx-auto mb-4" />
                <p className="text-gray-600">Loading tickets...</p>
              </div>
            ) : (
              <div className="text-center w-full">
                <p
                  className="text-xl mb-6 font-medium"
                  data-testid="ticket-count"
                >
                  ✅ You have {ticketCount} tickets.
                </p>

                <div className="space-y-4">
                  <ActionButton
                    onClick={joinRaffle}
                    isLoading={isJoiningRaffle}
                    loadingText="Joining..."
                    disabled={isJoiningRaffle || isProcessingPayment}
                    fullWidth
                    icon={<Ticket className="w-4 h-4" />}
                    data-testid="join-raffle-button"
                  >
                    Join the Raffle
                  </ActionButton>

                  <ActionButton
                    onClick={handleProceedToPayment}
                    isLoading={isProcessingPayment}
                    loadingText="Processing..."
                    disabled={isJoiningRaffle || isProcessingPayment}
                    variant="success"
                    fullWidth
                    data-testid="payment-button"
                  >
                    Proceed to Payment
                  </ActionButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
