'use client';

import { CheckCircle, PlayCircle } from 'lucide-react';

interface Chapter {
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  isCompleted?: boolean;
  views?: number;
}

interface ChapterListProps {
  chapters: Chapter[];
  currentChapterIndex: number;
  onChapterSelect: (index: number) => void;
  isCollapsed?: boolean;
}

export default function ChapterList({
  chapters,
  currentChapterIndex,
  onChapterSelect,
  isCollapsed = false,
}: ChapterListProps) {
  if (isCollapsed) {
    return (
      <div className="h-full p-2">
        <div className="flex flex-row md:flex-col gap-2">
          {chapters.map((_, index) => (
            <button
              key={index}
              onClick={() => onChapterSelect(index)}
              className={`flex-1 md:flex-none aspect-square md:w-full rounded-full flex items-center justify-center ${
                currentChapterIndex === index
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold mb-4">課程章節</h2>
        <div className="space-y-2">
          {chapters.map((chapter, index) => (
            <button
              key={index}
              onClick={() => onChapterSelect(index)}
              className={`w-full text-left p-3 md:p-4 rounded-lg transition-colors ${
                currentChapterIndex === index
                  ? 'bg-primary/10 border border-primary'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  {chapter.isCompleted ? (
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                  ) : (
                    <PlayCircle className={`h-4 w-4 md:h-5 md:w-5 ${
                      currentChapterIndex === index ? 'text-primary' : 'text-gray-400'
                    }`} />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className={`text-sm md:text-base font-medium ${
                    currentChapterIndex === index ? 'text-primary' : 'text-gray-900'
                  }`}>
                    {chapter.title}
                  </h3>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-1">
                    <span className="text-xs md:text-sm text-gray-500">{chapter.duration}</span>
                    <span className="text-xs text-gray-400 mt-1 md:mt-0">
                      {chapter.views || 0} 次觀看
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 