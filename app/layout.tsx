import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import MatomoTracker from "@/components/MatomoTracker"; // Create this component

export const metadata: Metadata = {
  title: {
    default: "TokyoLore | Tokyo's Hidden Stories",
    template: "%s | TokyoLore"
  },
  description: "Discover and share Tokyo's secret tales through photos, poems, and street art. A community for urban explorers.",
  openGraph: {
    title: "TokyoLore",
    description: "Tokyo's living archive of hidden stories",
    url: "https://tokyolore.com",
    siteName: "TokyoLore",
    images: [
      {
        url: "https://tokyolore.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TokyoLore",
    description: "Tokyo's living archive of hidden stories",
    images: ["https://tokyolore.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-gray-50" style={{ fontFamily: 'Lora, serif' }}>
        <Header />
        <main className="min-h-[calc(100vh-160px)]">
          {children}
        </main>
        <Footer />
        
        {/* Analytics */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        <MatomoTracker />
      </body>
    </html>
  );
}