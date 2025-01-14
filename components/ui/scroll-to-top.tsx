'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 監聽滾動事件
  useEffect(() => {
    const toggleVisibility = () => {
      // 當頁面滾動超過 300px 時顯示按鈕
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // 平滑滾動到頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'fixed bottom-4 right-4 z-50 rounded-full shadow-lg transition-all duration-300',
        'bg-white/80 hover:bg-white',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      )}
      onClick={scrollToTop}
      aria-label="回到頂部"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
} 