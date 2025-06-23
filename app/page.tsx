"use client";

import React from "react";
import { Camera, PenTool } from "lucide-react";
import Link from "next/link";
import AwardsPanels from "@/components/awards-panels";
import CareDuelBanner from "@/components/careduel-banner";
import RaffleTicketWidget from "@/components/raffle-ticket-widget";

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
            Discover Tokyo's
            <span className="text-pink-600"> Untold Stories</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Journey through hidden alleyways, forgotten temples, and secret corners where Tokyo's most captivating stories come alive through art, photography, and poetry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/stories"
              className="bg-pink-600 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Explore Stories</span>
            </Link>
            <Link
              href="/submit"
              className="border-2 border-gray-400 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-pink-600 hover:text-pink-600 transition-colors flex items-center justify-center space-x-2"
            >
              <PenTool className="w-5 h-5" />
              <span>Share Your Story</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
                Where Stories Live
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tokyo Lore is more than a collection of stories—it's a living tapestry of the city's soul. Every narrow alley holds secrets, every neon sign tells a tale, and every face in the crowd carries dreams that deserve to be shared.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through the lens of photographers, the words of poets, and the creativity of street artists, we capture the essence of Tokyo that guidebooks never reveal. Join us in preserving and celebrating the stories that make this city extraordinary.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=400&fit=crop"
                alt="Tokyo streets"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-pink-600 text-white p-4 rounded-xl">
                <span className="text-2xl font-bold">1000+</span>
                <br />
                <span className="text-sm">Stories Collected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CareDuel Banner */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <CareDuelBanner />
        </div>
      </section>

      {/* Awards Panels */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <AwardsPanels />
        </div>
      </section>

      {/* Raffle Ticket Widget */}
      <RaffleTicketWidget userId="123" />
    </div>
  );
}
