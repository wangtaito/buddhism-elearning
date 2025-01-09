export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface VideosData {
  shortVideos: Video[];
  categories: string[];
} 