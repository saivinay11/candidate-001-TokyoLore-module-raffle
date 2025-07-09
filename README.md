# TokyoLore Staging - Unified Platform 🗼

> ⚠️ This repository is a tech assessment submission for Alatree Ventures. The base project was cloned from the provided starter, and extended with required modules such as the raffle widget, payment integration, and demo components.

## TokyoLore Raffle Widget 🎟️

**Live Staging URL:**  
[https://candidate-001-tokyolore-module-raffle.vercel.app](https://candidate-001-tokyolore-module-raffle.vercel.app)

**GitHub Repository:**  
[https://github.com/rahul-pal-mastizone/candidate-001-TokyoLore-module-raffle](https://github.com/rahul-pal-mastizone/candidate-001-TokyoLore-module-raffle)

**Demo Page:**  
[https://candidate-001-tokyolore-module-raffle.vercel.app/demo/demo.html](https://candidate-001-tokyolore-module-raffle.vercel.app/demo/demo.html)

---

## 🎯 Overview

This module implements a **Raffle Ticket Widget** with Stripe payment integration for the **TokyoLore** microsite. Users can:
- View current ticket count
- Join the raffle (manual or payment)
- Purchase raffle tickets via Stripe
- View payment success and failure pages

Built specifically for the **Tech Assessment** (Contract Web Developer role).

---

## ✅ Features Implemented

- 🔴 Collapsible red ticket icon (`#D32F2F`), fixed at bottom-right
- 🪄 Slide-up panel (300×350 px) on expand
- 🎫 View and manage raffle ticket count
- 🔁 “Join the Raffle” updates ticket count via mock API
- 💳 Stripe Checkout for ticket purchase (test mode)
- ✅ Confirmation after successful purchase
- ⚠️ Error handling for failures (API & Stripe)
- 🎨 Styling via `--primary-color` and `--accent-color`
- 🧪 Demo file (`demo.html`) showing real widget usage

---

## 📁 Project Structure

```
/demo/demo.html         # Standalone demo page
/components/raffle/     # RaffleWidget component (TypeScript + CSS)
pages/api/raffle-entry  # API: Join the raffle (POST)
pages/api/raffle-status # API: Get ticket count (GET)
pages/api/create-checkout-session.ts # Stripe Checkout
lib/mock-db.ts          # Mock DB logic for tracking tickets
```

---

## 🔧 Endpoints

| Endpoint                         | Method | Description                        |
|----------------------------------|--------|------------------------------------|
| `/api/raffle-status?userId=123` | GET    | Returns current ticket count       |
| `/api/raffle-entry`             | POST   | Adds raffle ticket for user        |
| `/api/create-checkout-session`  | POST   | Creates Stripe checkout session    |
| `/payment-success`              | GET    | Stripe success redirect page       |
| `/payment-cancelled`            | GET    | Stripe failure redirect page       |

---

## 💡 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI:** CSS Modules
- **Payments:** Stripe API (test mode)
- **Deployment:** Vercel
- **Demo Support:** `demo.html` with embedded widget

---

## ▶️ Running Locally

### Prerequisites
- Node.js 18+
- Stripe test keys

### Setup
```bash
git clone https://github.com/rahul-pal-mastizone/candidate-001-TokyoLore-module-raffle
cd candidate-001-TokyoLore-module-raffle
npm install
```

### Configure Environment
Create `.env.local`:
```env
STRIPE_SECRET_KEY=your_test_secret_key
STRIPE_PUBLISHABLE_KEY=your_test_publishable_key
STRIPE_WEBHOOK_SECRET=your_test_webhook_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Start Dev Server
```bash
npm run dev
```

---

## ✅ Submission Summary

- ✅ Widget meets all functional requirements
- ✅ Stripe integration works in test mode
- ✅ Included widget demo (`demo.html`)
- ✅ Responsive, accessible, and styled professionally
- ✅ All endpoints handled via API routes

---

## 🙋‍♂️ Author

**👨‍💻 Rahul Pal**  
- GitHub: [@rahul-pal-mastizone](https://github.com/rahul-pal-mastizone)
- Email: rahulpal.moderntechno@gmail.com
