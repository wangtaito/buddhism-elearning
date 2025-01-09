import coursesData from './courses.json';
import { Course } from '@/types/course';

interface CoursesData {
  courses: Course[];
}

export const { courses } = coursesData as CoursesData; 