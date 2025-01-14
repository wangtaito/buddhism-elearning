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
  category: string;
}

export const shortVideos: ShortVideo[] = [
  {
    id: '1',
    title: '佛法入門概要',
    description: '簡單介紹佛教基礎知識',
    url: 'https://example.com/video1.mp4',
    thumbnail: '/images/thumbnails/video1.jpg',
    duration: '3:45',
    views: 1200,
    likes: 156,
    createdAt: '2024-01-15',
    category: '入門基礎'
  },
  {
    id: '2',
    title: '禪修指導',
    description: '基礎禪修方法教學',
    url: 'https://example.com/video2.mp4',
    thumbnail: '/images/thumbnails/video2.jpg',
    duration: '5:30',
    views: 890,
    likes: 123,
    createdAt: '2024-01-16',
    category: '修行實踐'
  },
  // ... 可以添加更多短視頻數據
];

export const { categories } = videosData as VideosData; 