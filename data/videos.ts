import videosData from './videos.json';
import { VideosData } from '@/types/video';

export interface ShortVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  createdAt: string;
}

export const shortVideos: ShortVideo[] = [
  // ... 你的短視頻數據
];

export const { categories } = videosData as VideosData; 