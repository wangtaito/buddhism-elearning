'use client';

interface CourseProgressProps {
  totalChapters: number;
  completedChapters: number;
  onComplete: () => void;
}

export default function CourseProgress({ totalChapters, completedChapters, onComplete }: CourseProgressProps) {
  const progress = Math.round((completedChapters / totalChapters) * 100);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">學習進度</span>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-500">
        已完成 {completedChapters}/{totalChapters} 章節
      </div>
    </div>
  );
} 