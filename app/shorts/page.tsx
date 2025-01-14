'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ThumbsUp, Eye } from 'lucide-react';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { shortVideos, categories } from '@/data/videos';

export default function ShortsPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = shortVideos
    .filter(video => selectedCategory === '全部' || video.category === selectedCategory)
    .filter(video => {
      const query = searchQuery.toLowerCase();
      return (
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
      );
    });

  const handleVideoClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">短視頻</h1>
        
        {/* 搜索和分類過濾 */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="搜索視頻..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* 視頻網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleVideoClick(video.url)}
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e: any) => {
                    e.target.src = 'https://placehold.co/600x400?text=Video+Thumbnail';
                  }}
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{video.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{video.likes}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 回頂部按鈕 */}
      <ScrollToTop />
    </div>
  );
} 