'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Users, BookOpen, Trophy } from 'lucide-react';
import Image from 'next/image';
import { CourseCategory, categoryStyles } from '@/utils/courseTypes';

interface CourseDetailsProps {
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  students: number;
  instructor?: string;
  level?: string;
  syllabus?: string[];
  category: CourseCategory;
}

interface CourseDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseDetailsProps;
}

export default function CourseDetailsDialog({ isOpen, onClose, course }: CourseDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{course.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="relative h-64">
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover rounded-lg"
              onError={(e: any) => {
                e.currentTarget.src = '/images/course-placeholder.jpg'
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">課程類型：</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryStyles[course.category]}`}>
              {course.category}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="h-5 w-5" />
              <span>{course.students} 名学生</span>
            </div>
            {course.instructor && (
              <div className="flex items-center space-x-2 text-gray-600">
                <BookOpen className="h-5 w-5" />
                <span>{course.instructor}</span>
              </div>
            )}
            {course.level && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Trophy className="h-5 w-5" />
                <span>{course.level}</span>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">课程简介</h3>
            <p className="text-gray-600">{course.description}</p>
          </div>

          {course.syllabus && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">课程大纲</h3>
              <ul className="list-disc list-inside space-y-2">
                {course.syllabus.map((item, index) => (
                  <li key={index} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}