# TokyoLore.com Raffle Widget Deployment Guide

## Overview

This project implements the Raffle Ticket Widget module for TokyoLore.com with Stripe payment integration.

## Features Implemented

- ✅ Raffle Ticket Widget (collapsed/expanded states)
- ✅ API endpoints: GET /api/raffle-status, POST /api/raffle-entry
- ✅ Stripe Payment Integration
- ✅ API endpoints: POST /api/create-checkout-session, POST /api/stripe-webhook
- ✅ CareDuel Banner
- ✅ Awards Panels
- ✅ Payment success/cancelled pages
- ✅ CSS variables usage for theming
- ✅ Responsive design

## Environment Variables Required

Create a `.env.local` file with:

```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_APP_URL=https://your-deployed-url.com
```

## Deployment Options

### Vercel

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Stripe Webhook Configuration

After deployment, configure Stripe webhook:

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/api/stripe-webhook`
3. Select events: `checkout.session.completed`
4. Copy webhook secret to environment variables

## Testing

1. Start development server: `npm run dev`
2. Test raffle widget functionality
3. Test Stripe payment flow (use test cards)
4. Verify webhook handling

## Repository Naming Convention

As per specifications: `candidate-00X-Tokyolore-module-raffle-widget`
