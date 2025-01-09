'use client';

import { useState, useEffect } from 'react';
import { courses } from '@/data/courses';
import { VideoPlayer, ChapterList } from '@/components/features';
import CourseProgress from '@/components/features/CourseProgress';
import CourseDiscussion from '@/components/features/CourseDiscussion';
import CourseNotes from '@/components/features/CourseNotes';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 使用正確的類型
type Props = {
  params: { courseId: string };
};

// 添加布局組件
/**
 * WatchPage 组件用于展示课程详情页面。
 *
 * @param params 包含课程ID的参数对象。
 * @returns 返回课程详情页面组件。
 */
export default function WatchPage({ params }: Props) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [localCourses, setLocalCourses] = useState(courses);
  
  const course = localCourses.find((c, index) => index.toString() === params.courseId);

  useEffect(() => {
    // 從 localStorage 讀取觀看次數數據
    const viewsData = localStorage.getItem('courseViews');
    const savedViews = viewsData ? JSON.parse(viewsData) : {};
    
    // 更新當前章節的觀看次數
    if (course) {
      const courseId = params.courseId;
      const chapterId = `${courseId}-${currentChapterIndex}`;
      const updatedViews = {
        ...savedViews,
        [chapterId]: (savedViews[chapterId] || 0) + 1
      };
      
      // 保存更新後的觀看次數
      localStorage.setItem('courseViews', JSON.stringify(updatedViews));
      
      // 更新本地課程數據
      const updatedCourses = localCourses.map((c, i) => {
        if (i.toString() === courseId) {
          return {
            ...c,
            chapters: c.chapters.map((chapter, idx) => ({
              ...chapter,
              views: updatedViews[`${courseId}-${idx}`] || 0
            }))
          };
        }
        return c;
      });
      
      setLocalCourses(updatedCourses);
    }
  }, [currentChapterIndex, params.courseId]);

  if (!course) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">課程未找到</h2>
            <Link href="/courses" className="mt-4 text-primary hover:underline">
              返回課程列表
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        <div className="flex flex-col lg:flex-row">
          {/* 左側視頻區域 */}
          <div className={`lg:flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? 'lg:max-w-[95%]' : 'lg:max-w-[70%]'
          }`}>
            <div className="bg-black">
              <div className="container mx-auto px-4 py-4">
                <Link href="/courses" className="inline-flex items-center text-white mb-4 hover:text-gray-300">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回課程列表
                </Link>
              </div>
              <VideoPlayer 
                videoUrl={course.chapters[currentChapterIndex].videoUrl} 
                title={course.chapters[currentChapterIndex].title}
              />
            </div>
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">當前章節</h2>
                <h3 className="text-lg font-medium text-gray-800">
                  {course.chapters[currentChapterIndex].title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {course.chapters[currentChapterIndex].description}
                </p>
              </div>
            </div>
            <div className="container mx-auto px-4 py-6 space-y-6">
              <CourseProgress
                totalChapters={course.chapters.length}
                completedChapters={course.chapters.filter(c => c.isCompleted).length}
                onComplete={() => {/* 處理完成邏輯 */}}
              />
              <CourseDiscussion courseId={params.courseId} />
            </div>
          </div>

          {/* 側邊欄切換按鈕 */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex items-center justify-center w-6 bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {isSidebarCollapsed ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {/* 右側面板 - 使用分頁標籤 */}
          <div className={`lg:bg-white transition-all duration-300 ${
            isSidebarCollapsed 
              ? 'lg:w-[5%] overflow-hidden' 
              : 'lg:w-[30%]'
          }`}>
            {!isSidebarCollapsed && (
              <Tabs defaultValue="chapters" className="h-full">
                <div className="border-b">
                  <TabsList className="w-full justify-start gap-4 p-4">
                    <TabsTrigger value="chapters" className="data-[state=active]:bg-primary/10">
                      課程章節
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="data-[state=active]:bg-primary/10">
                      學習筆記
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="chapters" className="mt-0 h-[calc(100vh-8rem)] overflow-y-auto">
                  <ChapterList
                    chapters={course.chapters}
                    currentChapterIndex={currentChapterIndex}
                    onChapterSelect={setCurrentChapterIndex}
                    isCollapsed={false}
                  />
                </TabsContent>

                <TabsContent value="notes" className="mt-0 h-[calc(100vh-8rem)] overflow-y-auto p-4">
                  <CourseNotes
                    courseId={params.courseId}
                    chapterIndex={currentChapterIndex}
                  />
                </TabsContent>
              </Tabs>
            )}

            {/* 收起狀態的章節列表 */}
            {isSidebarCollapsed && (
              <ChapterList
                chapters={course.chapters}
                currentChapterIndex={currentChapterIndex}
                onChapterSelect={setCurrentChapterIndex}
                isCollapsed={true}
              />
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
} 