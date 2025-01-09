'use client';

import { useEffect, useState, useRef } from 'react';
import { LiveCourse } from '@/types/live';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
}

export default function LiveCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [course, setCourse] = useState<LiveCourse | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCourses = localStorage.getItem('liveCourses');
    if (savedCourses) {
      const courses: LiveCourse[] = JSON.parse(savedCourses);
      const foundCourse = courses.find(c => c.id === params.id);
      if (foundCourse) {
        setCourse(foundCourse);
        const now = new Date();
        const startTime = new Date(foundCourse.startTime);
        const endTime = new Date(startTime.getTime() + foundCourse.duration * 60000);
        setIsPlaying(now >= startTime && now <= endTime);
      }
    }
  }, [params.id]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!course) {
    return <div>課程不存在</div>;
  }

  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.includes('youtu.be')
          ? url.split('/').pop()
          : new URL(url).searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }
      if (url.includes('twitch.tv')) {
        const channel = url.split('/').pop();
        return `https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`;
      }
      return url;
    } catch (error) {
      console.error('解析直播網址失敗:', error);
      return url;
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      username: '我',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[90vh] bg-gray-100">
      <div className="flex overflow-hidden flex-1">
        {/* 左側直播區域 */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* 頂部導航 */}
          <div className="flex gap-4 items-center px-4 py-3 bg-white border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-base font-medium">{course.title}</h1>
              <p className="text-sm text-gray-500">
                {format(new Date(course.startTime), 'yyyy/MM/dd HH:mm')} | {course.instructor}
              </p>
            </div>
          </div>

          {/* 直播視頻區域 */}
          <div className="bg-black">
            <div className="relative w-full max-h-full aspect-video">
              {isPlaying ? (
                <iframe
                  src={getEmbedUrl(course.streamUrl)}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <div className="flex absolute inset-0 justify-center items-center text-white bg-gray-900">
                  <div className="text-center">
                    <h3 className="mb-2 text-xl font-medium">
                      {new Date(course.startTime) > new Date()
                        ? '直播尚未開始'
                        : '直播已結束'
                      }
                    </h3>
                    <p className="text-gray-400">
                      開始時間：{format(new Date(course.startTime), 'yyyy/MM/dd HH:mm')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 填充剩餘空間 */}
          <div className="flex-1 bg-black" />
        </div>

        {/* 右側聊天區域 */}
        <div className="flex flex-col w-80 min-h-0 bg-white border-l">
          {/* 課程信息 */}
          <div className="p-3 border-b">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-medium">課程詳情</h2>
              <div className="flex items-center text-xs text-gray-500">
                <Users className="mr-1 w-4 h-4" />
                {course.currentParticipants}/{course.maxParticipants} 人
              </div>
            </div>
            <p className="text-sm text-gray-600">{course.description}</p>
          </div>

          {/* 聊天室標題 */}
          <div className="p-3 border-b">
            <h2 className="font-medium">聊天室</h2>
          </div>

          {/* 聊天內容區 */}
          <div ref={chatContainerRef} className="overflow-y-auto flex-1 p-3 space-y-3 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.userId === 'current-user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex gap-1 items-center mb-1">
                  <span className="text-xs font-medium">{message.username}</span>
                  <span className="text-xs text-gray-400">
                    {format(new Date(message.timestamp), 'HH:mm')}
                  </span>
                </div>
                <div
                  className={`px-3 py-2 rounded-lg max-w-[85%] ${
                    message.userId === 'current-user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm break-words">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 聊天��入框 */}
          <form onSubmit={handleSendMessage} className="p-3 border-t">
            <input
              type="text"
              placeholder="輸入消息..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="px-3 py-1.5 w-full text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </form>
        </div>
      </div>
    </div>
  );
} 