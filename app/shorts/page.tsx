'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoCard from '@/components/features/VideoCard';
import ScrollToTop from '@/components/features/ScrollToTop';
import { Button } from '@/components/ui/button';
import { shortVideos, categories } from '@/data/videos';

export default function ShortsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredVideos = shortVideos
    .filter(video => selectedCategory === '全部' || video.category === selectedCategory)
    .filter(video => {
      const query = searchQuery.toLowerCase();
      return (
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
      );
    });

  const handleNextVideo = () => {
    // 先設置當前視頻�非活動狀態
    const currentVideo = document.querySelector(`iframe[src*="${filteredVideos[currentVideoIndex].id}"]`);
    if (currentVideo) {
      (currentVideo as HTMLIFrameElement).src = '';
    }
    
    // 延遲切換到下一個視
    setTimeout(() => {
      setCurrentVideoIndex((prev) => 
        prev === filteredVideos.length - 1 ? 0 : prev + 1
      );
    }, 100);
  };

  const handlePreviousVideo = () => {
    // 先設置當前視頻�非活動狀態
    const currentVideo = document.querySelector(`iframe[src*="${filteredVideos[currentVideoIndex].id}"]`);
    if (currentVideo) {
      (currentVideo as HTMLIFrameElement).src = '';
    }
    
    // 延遲切換到上一個視
    setTimeout(() => {
      setCurrentVideoIndex((prev) => 
        prev === 0 ? filteredVideos.length - 1 : prev - 1
      );
    }, 50);
  };

  useEffect(() => {
    setCurrentVideoIndex(0);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex-1 h-screen bg-gray-50">
      {/* 搜索和分類過濾區 */}
      <div className={`fixed left-1/2 -translate-x-1/2 w-full max-w-2xl z-20 transition-all duration-300
        ${isSearchVisible ? 'top-16' : '-top-full'}`}
      >
        <div className="border-b shadow-sm bg-white/95">
          {/* 搜索框 */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
              <Input
                type="text"
                placeholder="搜索視頻標題、描述或分類..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full placeholder-gray-500 text-gray-900 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* 分類標籤 */}
          <div className="overflow-x-auto px-4 py-2 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 搜索結果計數 */}
        {searchQuery && (
          <div className="absolute right-0 left-0 top-full px-4 py-2 text-sm text-gray-500 bg-white/95">
            找到 {filteredVideos.length} 個相關視頻
          </div>
        )}
      </div>

      {/* 切換搜索區塊顯示/隱藏的按鈕 */}
      <button
        onClick={() => setIsSearchVisible(!isSearchVisible)}
        className="fixed right-4 top-16 z-30 p-2 rounded-full shadow-md transition-colors bg-white/95 hover:bg-gray-100"
      >
        {isSearchVisible ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <div className="flex h-full">
        {/* 左側視頻播放區 */}
        <div className={`flex-1 flex items-center justify-center px-4 transition-all duration-300
          ${isSearchVisible ? 'mt-16' : 'mt-0'}`}
        >
          <div className="relative w-[350px] h-[calc(100vh-120px)] mt-[-20px]">
            {/* 上一個視頻按鈕 */}
            <button
              onClick={handlePreviousVideo}
              className="absolute top-2 left-1/2 z-10 text-gray-400 -translate-x-1/2 hover:text-gray-600"
            >
              <ChevronUp className="w-8 h-8" />
            </button>

            {filteredVideos.map((video, index) => (
              <div 
                key={video.id}
                className={`absolute inset-0 transition-opacity duration-300 rounded-xl overflow-hidden shadow-lg
                  ${index === currentVideoIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <VideoCard {...video} isActive={index === currentVideoIndex} />
              </div>
            ))}

            {/* 下一個視頻按鈕 */}
            <button
              onClick={handleNextVideo}
              className="absolute bottom-2 left-1/2 z-10 text-gray-400 -translate-x-1/2 hover:text-gray-600"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* 無搜索結果提示 */}
      {filteredVideos.length === 0 && (
        <div className={`fixed left-1/2 transform -translate-x-1/2 text-center transition-all duration-300
          ${isSearchVisible ? 'top-[55%]' : 'top-1/2'} -translate-y-1/2`}
        >
          <div className="mb-2 text-gray-400">
            <Search className="mx-auto w-12 h-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">未找到相關視頻</h3>
          <p className="mt-1 text-sm text-gray-500">
            請嘗試使用其他關鍵�或選擇不同分類
          </p>
        </div>
      )}
    </div>
  );
} 