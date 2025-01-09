export type CourseCategory = '免費' | '公益' | '訂閱' | '收費';

export const categoryStyles: Record<CourseCategory, string> = {
  '免費': 'bg-green-100 text-green-800',
  '公益': 'bg-blue-100 text-blue-800',
  '訂閱': 'bg-purple-100 text-purple-800',
  '收費': 'bg-orange-100 text-orange-800',
}; 