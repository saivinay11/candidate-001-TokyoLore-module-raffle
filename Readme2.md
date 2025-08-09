# TokyoLore Raffle Module

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-%23000000?logo=vercel)](https://candidate-001-tokyo-lore-module-raf-one.vercel.app)

A Next.js implementation for TokyoLore's community raffle system, featuring Stripe payments and responsive design.

## 🚀 Live Deployment
**Staging URL**:  
[https://candidate-001-tokyo-lore-module-raf-one.vercel.app](https://candidate-001-tokyo-lore-module-raf-one.vercel.app)

## ✨ Key Features
- Next.js 14 (App Router)
- Stripe payment integration
- Responsive UI with Tailwind CSS
- Vercel-optimized architecture
- Matomo/Google Analytics integration

## 🛠️ Technical Stack
| Component          | Technology           |
|--------------------|----------------------|
| Framework          | Next.js 14           |
| Styling           | Tailwind CSS         |
| Payments          | Stripe               |
| Analytics         | Matomo + GA4         |
| Deployment        | Vercel               |

## 📦 Installation
```bash
git clone https://github.com/saivinay11/candidate-001-TokyoLore-module-raffle.git
cd candidate-001-TokyoLore-module-raffle
npm install

Create .env.local:

bash
NEXT_PUBLIC_GA_ID=G-P3YMT3SC3H
NEXT_PUBLIC_MATOMO_URL=vinaybenten@gmail.com.motomo.cloud
NEXT_PUBLIC_MATOMO_SITE_ID=1
STRIPE_SECRET_KEY=sk_test_***

Implementation Details

SEO Optimized
Dynamic metadata in app/layout.tsx
Automatic sitemap generation
Robots.txt configuration
Analytics
tsx
<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
<MatomoTracker />
Payment Flow

Test card: 4242 4242 4242 4242

Webhook: /api/webhook

📄 License
MIT © Masetti Sai Vinay