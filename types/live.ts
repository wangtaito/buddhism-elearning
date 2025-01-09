export interface LiveCourse {
  id: string;
  title: string;
  description: string;
  startTime: string;
  duration: number; // 分鐘
  instructor: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'live' | 'ended';
  streamUrl: string;
} 