import { CourseCategory } from '@/utils/courseTypes';

export interface Chapter {
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  isCompleted?: boolean;
  views?: number;
}

export interface Course {
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  students: number;
  instructor?: string;
  level?: string;
  syllabus?: string[];
  category: CourseCategory;
  chapters: Chapter[];
} 