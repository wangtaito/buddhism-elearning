'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share } from 'lucide-react';

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  isActive: boolean;
}

export default function VideoCard({
  id,
  title,
  description,
  category,
  isActive
}: VideoCardProps) {
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [videoKey, setVideoKey] = useState(0);

  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  useEffect(() => {
    if (!isActive) {
      setVideoKey(prev => prev + 1);
    }
  }, [isActive]);

  return (
    <div className="relative w-full h-full bg-white">
      <div className="relative h-full">
        <iframe
          key={videoKey}
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=0&loop=1&controls=1&modestbranding=1&rel=0${
            isActive ? '' : '&playsinline=0'
          }`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full text-white bg-primary/80">
        {category}
      </div>
    </div>
  );
} 