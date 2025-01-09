'use client';

import Image from 'next/image';
import { Clock, Users, PlayCircle, Lock, CreditCard, Unlock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CourseDetailsDialog from './CourseDetailsDialog';
import { Course } from '@/types/course';
import { CourseCategory } from '@/utils/courseTypes';
import { useCourseStore } from '@/store/courseStore';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';

interface CourseCardProps extends Omit<Course, 'chapters'> {
  index: number;
}

export default function CourseCard({
  title,
  description,
  imageUrl,
  duration,
  students,
  instructor,
  level,
  syllabus,
  category = '免費',
  index,
}: CourseCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [username, setUsername] = useState<string>('');
  const { 
    subscribeCourse, 
    payCourse, 
    unsubscribeCourse, 
    unpayCourse,
    isSubscribed, 
    isPaid 
  } = useCourseStore();
  const router = useRouter();

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categoryStyles: Record<CourseCategory, string> = {
    '免費': 'bg-green-100 text-green-800',
    '公益': 'bg-blue-100 text-blue-800',
    '訂閱': 'bg-purple-100 text-purple-800',
    '收費': 'bg-orange-100 text-orange-800',
  };

  /**
   * 根据课程类别获取对应的样式
   *
   * @param cat 课程类别
   * @returns 返回对应类别的样式对象
   */
  const getCategoryStyle = (cat: CourseCategory) => {
    if (!categoryStyles[cat]) {
      return categoryStyles['免費'];
    }
    return categoryStyles[cat];
  };

  /**
   * 处理订阅事件
   *
   * @param e React鼠标事件对象
   */
  const handleSubscribe = () => {
    if (isSubscribed(index.toString(), username)) {
      unsubscribeCourse(index.toString(), username);
    } else {
      subscribeCourse(index.toString(), username);
    }
  };

  /**
   * 处理支付按钮点击事件
   *
   * @param e - React的鼠标事件对象
   */
  const handlePay = () => {
    if (isPaid(index.toString(), username)) {
      unpayCourse(index.toString(), username);
    } else {
      payCourse(index.toString(), username);
    }
  };

  /**
   * 处理播放按钮点击事件
   *
   * @param e React鼠标事件对象
   */
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (category === '訂閱' && !isSubscribed(index.toString(), username)) {
      alert('請先訂閱課程');
      return;
    }
    if (category === '收費' && !isPaid(index.toString(), username)) {
      alert('請先購買課程');
      return;
    }
    router.push(`/courses/${index}/watch`);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative h-48">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            onError={(e: any) => {
              e.currentTarget.src = '/images/course-placeholder.jpg'
            }}
          />
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getCategoryStyle(category)}`}>
            {category}
          </div>
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
          >
            <PlayCircle className="h-16 w-16 text-white" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {duration}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {students} 名学生
            </div>
            {isMounted && (
              <>
                {category === '訂閱' && (
                  <Button
                    variant={isSubscribed(index.toString(), username) ? "outline" : "default"}
                    onClick={handleSubscribe}
                    className="flex-1"
                  >
                    {isSubscribed(index.toString(), username) ? '取消訂閱' : '訂閱'}
                  </Button>
                )}
                {category === '收費' && (
                  <Button
                    variant={isPaid(index.toString(), username) ? "outline" : "default"}
                    onClick={handlePay}
                    className="flex-1"
                  >
                    {isPaid(index.toString(), username) ? '取消購買' : '購買'}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CourseDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        course={{
          title,
          description,
          imageUrl,
          duration,
          students,
          instructor,
          level,
          syllabus,
          category,
        }}
      />
    </>
  );
}