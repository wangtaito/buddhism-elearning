'use client'

import { Card } from "@/components/ui/card";
import { Overview } from "@/components/Overview";
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(1);
  
  // 定義橫幅內容配置
  const bannerContents = [
    {
      image: '/images/banner.jpg',
      title: '歡迎來到佛學院',
      description: '探索智慧之路，尋找內心的平靜'
    },
    {
      image: '/images/banner2.jpg',
      title: '線上課程學習',
      description: '隨時隨地，與大師一起學習成長'
    }
  ];

  const handleImageError = (e: any) => {
    e.currentTarget.src = '/images/banner.jpg';
  };

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === bannerContents.length ? 1 : prev + 1));
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 1 ? bannerContents.length : prev - 1));
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-2">
      <div className="relative w-full h-[150px] md:h-[200px] lg:h-[250px] rounded-lg overflow-hidden mb-6">
        <Image
          src={bannerContents[currentBanner - 1].image}
          alt="佛學院橫幅"
          fill
          className="object-cover transition-opacity duration-500"
          priority
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
          <button 
            onClick={prevBanner}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="上一張"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextBanner}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="下一張"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bannerContents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index + 1)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentBanner === index + 1 ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`切換到第 ${index + 1} 張圖片`}
            />
          ))}
        </div>

        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl font-bold">
            {bannerContents[currentBanner - 1].title}
          </h1>
          <p className="text-sm mt-2">
            {bannerContents[currentBanner - 1].description}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">總課程數</p>
            <p className="text-2xl font-bold">123</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">活躍學員</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">總學習時數</p>
            <p className="text-2xl font-bold">12,345</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">完課率</p>
            <p className="text-2xl font-bold">89%</p>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="p-4">
          <div className="space-y-2">
            <h2 className="text-lg font-bold">學習趨勢概覽</h2>
            <Overview />
          </div>
        </Card>
      </div>
    </div>
  );
}