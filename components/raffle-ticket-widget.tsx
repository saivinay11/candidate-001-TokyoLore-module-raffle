'use client';
import { useEffect, useState } from 'react';
import styles from './raffle-ticket-widget.module.css';

interface Props {
  userId?: number;
}

const RaffleWidget = ({ userId = 123 }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [tickets, setTickets] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        body: JSON.stringify({ userId }),
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
        body: JSON.stringify({ amount: 100, currency: 'usd' }),
      });
      const data = await res.json();
      if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
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
