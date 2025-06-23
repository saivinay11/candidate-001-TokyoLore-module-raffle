"use client";

import React, { useState } from "react";

interface Story {
  id: number;
  title: string;
  snippet: string;
  imageUrl: string;
}

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={story.imageUrl}
          alt={story.title}
          className="w-full h-48 object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-pink-600 bg-opacity-90 flex items-center justify-center transform transition-all duration-300">
            <button className="bg-white text-pink-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Read More
            </button>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800" style={{fontFamily: 'Playfair Display, serif'}}>
          {story.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {story.snippet}
        </p>
      </div>
    </div>
  );
} 