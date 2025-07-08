'use client';
import { useEffect, useState } from 'react';
import styles from './raffle-ticket-widget.module.css';

const RaffleWidget = ({ userId = 123 }) => {
  const [expanded, setExpanded] = useState(false);
  const [tickets, setTickets] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ticketCountToBuy, setTicketCountToBuy] = useState(1);

  const fetchTickets = async () => {
    try {
      const res = await fetch(`/api/raffle-status?userId=${userId}`);
      const data = await res.json();
      setTickets(data.tickets);
      setError('');
    } catch {
      setError('Error, try again.');
    }
  };

  const joinRaffle = async () => {
    try {
      setLoading(true);
      await fetch('/api/raffle-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ticketCount: ticketCountToBuy }),
      });
      await fetchTickets();
    } catch {
      setError('Error, try again.');
    } finally {
      setLoading(false);
    }
  };

  const proceedToPayment = async () => {
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: ticketCountToBuy * 100,
          currency: 'usd',
          userId: userId.toString(),
          ticketCount: ticketCountToBuy,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch {
      setError('Payment failed. Please try again.');
    }
  };

  useEffect(() => {
    if (expanded) fetchTickets();
  }, [expanded]);

  return (
    <>
      <div className={styles.icon} onClick={() => setExpanded(!expanded)} title="Open Raffle">
        🎟️
      </div>
      {expanded && (
        <div className={styles.panel}>
          {error && <p className={styles.error}>{error}</p>}
          {tickets !== null ? (
            <>
              <p>You have {tickets} tickets.</p>
              <div className={styles.inputGroup}>
                <label htmlFor="ticketCount">Tickets to Buy:</label>
                <div className={styles.stepper}>
                  <button onClick={() => setTicketCountToBuy(Math.max(1, ticketCountToBuy - 1))}>−</button>
                  <input
                    type="number"
                    id="ticketCount"
                    min="1"
                    value={ticketCountToBuy}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setTicketCountToBuy(Math.max(1, val));
                    }}
                  />
                  <button onClick={() => setTicketCountToBuy(ticketCountToBuy + 1)}>+</button>
                </div>
              </div>
              <button className={styles.button} onClick={joinRaffle} disabled={loading}>
                {loading ? 'Joining...' : 'Join the Raffle'}
              </button>
              <button className={styles.button} onClick={proceedToPayment}>
                Proceed to Payment
              </button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </>
  );
};

export default RaffleWidget;
