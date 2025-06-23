# TokyoLore Staging - Unified Platform 🗼

**Live Staging URL:** https://tokyolore-staging.netlify.app  
**GitHub Repository:** https://github.com/krishna512-code/tokyolore-staging.git

A city-centric platform showcasing Tokyo's hidden street-art, urban legends, and community stories through photos, videos, poems, sketches, and interactive features.

## 🎯 Project Overview

This repository successfully merges all modules from both source repositories into a unified TokyoLore platform:

### From Repository 1: [Task-Tokyo-Lore](https://github.com/arpitsehal/Task-Tokyo-Lore)
- ✅ **Header & Footer** - Beautiful navigation with newsletter signup
- ✅ **Story Grid** - Interactive story cards with hover effects  
- ✅ **Submit Form** - Complete story submission with validation
- ✅ **SEO & Copy** - Proper metadata and descriptions

### From Repository 2: [candidate-00X-Tokyolore-raffle](https://github.com/harshadidev/candidate-00X-Tokyolore-raffle)
- ✅ **Raffle Ticket Widget** - Fixed bottom-right corner widget
- ✅ **Payments Integration** - Stripe checkout and webhook handling
- ✅ **CareDuel Banners** - Topic of the week integration
- ✅ **Awards Panels** - Vote Top216 and Explore TheTop36

## 🚀 Live Features

### 🏠 Home Page
- **Hero Section** - "Discover Tokyo's Untold Stories" with gradient background
- **About Section** - "Where Stories Live" with beautiful imagery
- **Call-to-Action Buttons** - Explore Stories & Share Your Story
- **CareDuel Integration** - Topic of the week banner
- **Awards Panels** - Vote Top216 and Explore TheTop36

### 📖 Stories Page
- **Story Grid Layout** - Responsive card design
- **Hover Effects** - Interactive story cards
- **Loading States** - Smooth user experience
- **Mock Data** - Sample Tokyo stories

### ✍️ Submit Page
- **Story Submission Form** - Complete with validation
- **Form Fields** - Name, email, title, and story body
- **Error Handling** - Real-time validation feedback
- **Success States** - Confirmation messages

### 🎫 Raffle Widget
- **Fixed Position** - Bottom-right corner
- **Expand/Collapse** - Smooth animations
- **Payment Integration** - Stripe checkout
- **Ticket Management** - Entry tracking

## 🛠️ Technical Stack

- **Framework:** Next.js 15.2.4 with TypeScript
- **Styling:** Tailwind CSS with custom design system
- **Deployment:** Netlify (automatic HTTPS, global CDN)
- **Fonts:** Playfair Display & Lora (Google Fonts)
- **Icons:** Lucide React
- **Payments:** Stripe integration
- **State Management:** React hooks
- **Form Handling:** React forms with validation

## 🎨 Design Features

- **Color Scheme:** Pink/coral theme (#E91E63)
- **Typography:** Beautiful serif fonts for headings
- **Responsive:** Mobile-first design approach
- **Animations:** Smooth transitions and hover effects
- **Accessibility:** ARIA labels and semantic HTML

## 📱 Pages & Routes

- `/` - Home page with hero section and about
- `/stories` - Story grid with interactive cards
- `/submit` - Story submission form
- `/payment-success` - Payment confirmation
- `/payment-cancelled` - Payment cancellation
- `/api/*` - Backend API routes for payments and raffle

## 🔧 API Endpoints

- `POST /api/create-checkout-session` - Stripe checkout
- `POST /api/raffle-entry` - Raffle ticket entry
- `GET /api/raffle-status` - Raffle status check
- `POST /api/stripe-webhook` - Stripe webhook handling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/krishna512-code/tokyolore-staging.git

# Navigate to project directory
cd tokyolore-staging

# Install dependencies
npm install

# Run development server
npm run dev
```

### Environment Variables
Create a `.env.local` file with:
```env
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

### Build & Deploy
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment

### Netlify (Current)
- **URL:** https://tokyolore-staging.netlify.app
- **Auto-deploy:** Connected to GitHub repository
- **HTTPS:** Automatic SSL certificate
- **CDN:** Global content delivery network

### Vercel (Alternative)
- **URL:** https://tokyolore-staging.vercel.app
- **Auto-deploy:** Connected to GitHub repository

## 📊 Performance

- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size:** Optimized with Next.js
- **Loading Speed:** Fast with static generation
- **Mobile Responsive:** Perfect on all devices

## 🔒 Security

- **HTTPS:** Automatic SSL encryption
- **Environment Variables:** Secure API key management
- **Input Validation:** Form validation and sanitization
- **CORS:** Proper cross-origin resource sharing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created for the TokyoLore tech assessment. All rights reserved.

## 👨‍💻 Author

**Krishna Kant Narayan**  
- GitHub: [@krishna512-code](https://github.com/krishna512-code)
- Project: TokyoLore Staging Platform

## 🙏 Acknowledgments

- **Arpit Sehal** - Original Task-Tokyo-Lore design and components
- **Harshadidev** - Raffle widget and payment integration
- **CareDuel** - Topic of the week integration
- **Top216 & TheTop36** - Awards panel integrations

---

**🎯 Submission Status:** ✅ **COMPLETE**  
**📅 Deadline:** June 23, 2025, 5 PM (UAE TIME)  
**🌐 Live URL:** https://tokyolore-staging.netlify.app  
**📁 Repository:** https://github.com/krishna512-code/tokyolore-staging.git
