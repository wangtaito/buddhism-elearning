const XLSX = require('xlsx');
const { shortVideos } from '@/data/videos';
const { courses } = require('./data/courses');

// 假設 videos 的類型是 Record<string, string[]>
const videosData = Object.entries(shortVideos).map(([category, videoIds]) => {
  return (videoIds as string[]).map(videoId => ({ category, videoId }));
}).flat();

// 假設 courses 的類型是 Course[]
interface Course {
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  students: number;
  instructor?: string;
  level?: string;
  category: string;
  syllabus?: string[];
  chapters: { title: string }[];
}

const coursesData = courses.map((course: Course) => ({
  title: course.title,
  description: course.description,
  imageUrl: course.imageUrl,
  duration: course.duration,
  students: course.students,
  instructor: course.instructor,
  level: course.level,
  category: course.category,
  syllabus: course.syllabus?.join(', ') || '',
  chapters: course.chapters.map((chapter: { title: string }) => chapter.title).join(', '),
  totalChapters: course.chapters.length
}));

// 創建工作簿
const workbook = XLSX.utils.book_new();

// 添加 videos 工作表
const videosSheet = XLSX.utils.json_to_sheet(videosData);
XLSX.utils.book_append_sheet(workbook, videosSheet, 'Videos');

// 添加 courses 工作表
const coursesSheet = XLSX.utils.json_to_sheet(coursesData);
XLSX.utils.book_append_sheet(workbook, coursesSheet, 'Courses');

// 將工作簿寫入文件
XLSX.writeFile(workbook, 'courses_and_videos.xlsx');

console.log('Excel 文件已成功生成！'); 