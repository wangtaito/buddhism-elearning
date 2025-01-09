'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import CourseCard from './CourseCard';
import { CourseCategory } from '@/utils/courseTypes';
import { courses } from '@/data/courses';
import { Input } from "@/components/ui/input";

export default function CourseList() {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | '全部'>('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: (CourseCategory | '全部')[] = ['全部', '免費', '公益', '訂閱', '收費'];

  // 過濾課程：先按分類過濾，再按搜索詞過濾
  const filteredCourses = courses
    .filter(course => selectedCategory === '全部' || course.category === selectedCategory)
    .filter(course => {
      const query = searchQuery.toLowerCase();
      return (
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor?.toLowerCase().includes(query) ||
        course.level?.toLowerCase().includes(query) ||
        course.syllabus?.some(item => item.toLowerCase().includes(query))
      );
    });

  return (
    <div className="space-y-6">
      {/* 搜索和分類過濾區 */}
      <div className="space-y-4">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="搜索課程、講師或關鍵字..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 分類選擇器 */}
        <div className="flex gap-2 flex-wrap">
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

      {/* 搜索結果統計 */}
      <div className="text-sm text-gray-500">
        找到 {filteredCourses.length} 個課程
      </div>

      {/* 課程列表 */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchQuery ? '沒有找到符合條件的課程' : '該分類下暫無課程'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard 
              key={`${course.title}-${index}`} 
              {...course} 
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
} 