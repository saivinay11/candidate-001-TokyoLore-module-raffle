// raffle-widget.js
// React-based raffle widget for demo

function RaffleWidget({ userId = 123 }) {
  const [expanded, setExpanded] = React.useState(false);
  const [tickets, setTickets] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (expanded) {
      fetch(`/api/raffle-status?userId=${userId}`)
        .then(res => res.json())
        .then(data => setTickets(data.tickets))
        .catch(() => setError('Error, try again.'));
    }
  }, [expanded]);

  const joinRaffle = () => {
    setLoading(true);
    fetch('/api/raffle-entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
      .then(() => fetch(`/api/raffle-status?userId=${userId}`))
      .then(res => res.json())
      .then(data => {
        setTickets(data.tickets);
        setError('');
      })
      .catch(() => setError('Error, try again.'))
      .finally(() => setLoading(false));
  };

  const proceedToPayment = () => {
    fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 100, currency: 'usd' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.sessionId) {
          window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
        } else {
          setError('Payment failed. Please try again.');
        }
      })
      .catch(() => setError('Payment failed. Please try again.'));
  };

  return (
    <>
      <div onclick={() => setExpanded(!expanded)} style={iconStyle}>🎟️</div>
      {expanded && (
        <div style={panelStyle}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {tickets !== null ? (
            <>
              <p>You have {tickets} tickets.</p>
              <button onClick={joinRaffle} disabled={loading}>
                {loading ? 'Joining...' : 'Join the Raffle'}
              </button>
              <button onClick={proceedToPayment}>Proceed to Payment</button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </>
  );
}

const iconStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '50px',
  height: '50px',
  backgroundColor: '#D32F2F',
  color: '#fff',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 999
};

const panelStyle = {
  position: 'fixed',
  bottom: '80px',
  right: '20px',
  width: '300px',
  height: '350px',
  backgroundColor: '#fff',
  border: '1px solid #424242',
  padding: '20px',
  borderRadius: '12px',
  zIndex: 999
};
