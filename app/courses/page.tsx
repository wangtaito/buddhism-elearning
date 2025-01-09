'use client';

import CourseList from '@/components/features/CourseList';
import ScrollToTop from '@/components/features/ScrollToTop';

export default function CoursesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">課程中心</h1>
      </div>
      <CourseList />
      <ScrollToTop />
    </div>
  );
}