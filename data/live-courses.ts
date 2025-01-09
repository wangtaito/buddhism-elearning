import liveCoursesData from './live-courses.json';
import { LiveCourse } from '@/types/live';

interface LiveCoursesData {
  liveCourses: LiveCourse[];
}

export const { liveCourses } = liveCoursesData as LiveCoursesData; 