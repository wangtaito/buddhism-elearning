import videosData from './videos.json';

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

interface VideosData {
  categories: string[];
  videos: ShortVideo[];
}

const data = videosData as VideosData;

export const shortVideos = data.videos;
export const categories = data.categories; 