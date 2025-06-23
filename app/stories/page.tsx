"use client";

import React, { useState, useEffect } from "react";
import StoryCard from "@/components/story-card";
import RaffleTicketWidget from "@/components/raffle-ticket-widget";

// Mock data for stories
const mockStories = [
  {
    id: 1,
    title: "The Midnight Ramen Master",
    snippet: "In a narrow alley behind Shibuya station, an elderly chef serves the city's most secretive bowl of ramen to those who know the password.",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "Cherry Blossoms of Memory Lane",
    snippet: "Every spring, locals gather at this forgotten park where century-old sakura trees bloom in perfect synchronization with lost love stories.",
    imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "The Underground Art Gallery",
    snippet: "Beneath the bustling streets of Harajuku lies a secret world where street artists have been leaving their mark for over three decades.",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    title: "Whispers of the Temple Bell",
    snippet: "At precisely 3 AM, this ancient temple bell rings without human touch, carrying messages from ancestors to their living descendants.",
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=250&fit=crop"
  },
  {
    id: 5,
    title: "The Floating Tea House",
    snippet: "Hidden within Tokyo Bay, a traditional tea house serves ceremonies that have remained unchanged for 200 years, accessible only at low tide.",
    imageUrl: "https://images.unsplash.com/photo-1743227272750-e8a2a646aad6?w=400&h=250&fit=crop"
  },
  {
    id: 6,
    title: "Neon Dreams of Kabukicho",
    snippet: "Behind the bright lights and crowded streets, an old woman paints portraits of Tokyo's nightlife using only neon-inspired watercolors.",
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=250&fit=crop"
  }
];

export default function StoriesPage() {
  const [stories, setStories] = useState(mockStories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchStories = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStories(mockStories);
      } catch (err) {
        setError('Failed to load stories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-gray-50 to-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
            Tokyo Stories
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Immerse yourself in the hidden narratives of Japan's capital city. Each story reveals a different facet of Tokyo's complex character, from ancient traditions to cutting-edge culture.
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            These tales are collected from locals, travelers, artists, and dreamers who have experienced Tokyo's magic firsthand. Let their words transport you to places you never knew existed in this incredible metropolis.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Raffle Ticket Widget */}
      <RaffleTicketWidget userId="123" />
    </div>
  );
}
