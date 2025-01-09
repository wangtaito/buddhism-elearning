'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format, isSameDay } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { LiveCourse } from '@/types/live';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { 
  Pencil, 
  Trash2, 
  Calendar as CalendarIcon,
  Clock,
  Users,
  User,
  Video
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { liveCourses as initialLiveCourses } from '@/data/live-courses';

export default function LiveCoursesPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [liveCourses, setLiveCourses] = useState<LiveCourse[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('liveCourses');
      return saved ? JSON.parse(saved) : initialLiveCourses;
    }
    return initialLiveCourses;
  });
  const [isMounted, setIsMounted] = useState(false);
  const [newLive, setNewLive] = useState({
    title: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '',
    duration: 60,
    instructor: '',
    maxParticipants: 100,
    streamUrl: ''
  });
  const [editingCourse, setEditingCourse] = useState<LiveCourse | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('liveCourses', JSON.stringify(liveCourses));
      } catch (error) {
        console.error('保存課程數據失敗:', error);
        alert('保存數據時發生錯誤，請稍後再試');
      }
    }
  }, [liveCourses, isMounted]);

  if (!isMounted) {
    return null; // 或者返回一個加載指示器
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setEditingCourse(null);
    if (date) {
      const existingCourses = getCoursesForDate(date);
      if (existingCourses.length > 0) {
        const course = existingCourses[0];
        setEditingCourse(course);
        setNewLive({
          title: course.title,
          description: course.description,
          date: format(date, 'yyyy-MM-dd'),
          startTime: format(new Date(course.startTime), 'HH:mm'),
          duration: course.duration,
          instructor: course.instructor,
          maxParticipants: course.maxParticipants,
          streamUrl: course.streamUrl
        });
      } else {
        setNewLive({
          title: '',
          description: '',
          date: format(date, 'yyyy-MM-dd'),
          startTime: '',
          duration: 60,
          instructor: '',
          maxParticipants: 100,
          streamUrl: ''
        });
      }
    }
    setIsDialogOpen(true);
  };

  const handleEdit = (course: LiveCourse) => {
    setEditingCourse(course);
    const courseDate = new Date(course.startTime);
    setSelectedDate(courseDate);
    setNewLive({
      title: course.title,
      description: course.description,
      date: format(courseDate, 'yyyy-MM-dd'),
      startTime: format(courseDate, 'HH:mm'),
      duration: course.duration,
      instructor: course.instructor,
      maxParticipants: course.maxParticipants,
      streamUrl: course.streamUrl
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (courseId: string) => {
    if (window.confirm('確定要刪除此課程？此操作無法復原。')) {
      setLiveCourses(prev => prev.filter(course => course.id !== courseId));
      alert('課程已成功刪除');
      setIsDialogOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 確保所有必要字段都有值且格式正確
    const formData = {
      title: newLive.title?.trim() || '',
      description: newLive.description?.trim() || '',
      date: newLive.date || format(new Date(), 'yyyy-MM-dd'),
      startTime: newLive.startTime || '',
      duration: Number(newLive.duration) || 60,
      instructor: newLive.instructor?.trim() || '',
      maxParticipants: Number(newLive.maxParticipants) || 100,
      streamUrl: newLive.streamUrl?.trim() || ''
    };

    // 表單驗證
    if (!formData.title) {
      alert('請輸入課程標題');
      return;
    }
    if (!formData.startTime) {
      alert('請選擇開始時間');
      return;
    }
    if (!formData.instructor) {
      alert('請輸入講師名稱');
      return;
    }
    if (!formData.streamUrl) {
      alert('請輸入直播網址');
      return;
    }

    const courseData: LiveCourse = {
      id: editingCourse?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      instructor: formData.instructor,
      duration: formData.duration,
      maxParticipants: formData.maxParticipants,
      streamUrl: formData.streamUrl,
      startTime: `${formData.date}T${formData.startTime}`,
      currentParticipants: editingCourse?.currentParticipants || 0,
      status: checkCourseStatus({
        startTime: `${formData.date}T${formData.startTime}`,
        duration: formData.duration
      } as LiveCourse)
    };

    if (editingCourse) {
      setLiveCourses(prev => 
        prev.map(course => course.id === editingCourse.id ? courseData : course)
      );
    } else {
      setLiveCourses(prev => [...prev, courseData]);
    }

    alert(editingCourse ? '課程已更新' : '課程已新增');
    setIsDialogOpen(false);
    setEditingCourse(null);
    setNewLive({
      title: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '',
      duration: 60,
      instructor: '',
      maxParticipants: 100,
      streamUrl: ''
    });
  };

  // 自定義日曆日期渲染
  const modifiers = {
    hasEvent: (date: Date) => 
      liveCourses.some(course => 
        isSameDay(new Date(course.startTime), date)
      )
  };

  const modifiersStyles = {
    hasEvent: {
      color: 'white',
      backgroundColor: 'var(--primary)',
    }
  };

  // 檢查日期是否過期
  const checkCourseStatus = (course: LiveCourse) => {
    const courseTime = new Date(course.startTime);
    const courseEndTime = new Date(courseTime.getTime() + course.duration * 60000);
    const now = new Date();

    if (now < courseTime) {
      return 'upcoming' as const;
    } else if (now > courseEndTime) {
      return 'ended' as const;
    } else {
      return 'live' as const;
    }
  };

  // 獲取課程狀態的顯示樣式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-primary';
      case 'live':
        return 'text-red-500';
      case 'ended':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  // 獲取課程狀態的顯示文字
  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '未開始';
      case 'live':
        return '直播中';
      case 'ended':
        return '已結束';
      default:
        return '';
    }
  };

  // 獲取指定日期的課程
  /**
   * 根据日期获取当天的直播课程列表
   *
   * @param date 日期对象，表示需要查询的日期
   * @returns 返回指定日期的直播课程列表，每个课程对象包括课程信息和课程状态
   */
  const getCoursesForDate = (date: Date) => {
    return liveCourses
      .filter(course => isSameDay(new Date(course.startTime), date))
      .map(course => ({
        ...course,
        status: checkCourseStatus(course)
      }));
  };

  return (
    <div className="flex-1 p-8">
      <div className="mx-auto max-w-8xl">
        <h1 className="mb-6 text-2xl font-bold">直播課程</h1>
        
        <div className="p-8 bg-white rounded-lg shadow-md">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            locale={zhTW}
            className="w-full rounded-md border"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-6 w-full",
              caption: "flex justify-center pt-4 pb-2 relative items-center text-lg font-semibold",
              caption_label: "text-base font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "h-10 w-10 bg-transparent p-0 hover:opacity-100"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse",
              head_row: "flex w-full",
              head_cell: "text-gray-500 rounded-md w-full h-14 font-medium text-base flex items-center justify-center",
              row: "flex w-full mt-0",
              cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 h-20 w-full border border-gray-100",
              day: "h-full w-full p-0 font-normal hover:bg-gray-50",
              day_range_end: "day-range-end",
              day_selected: "bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-gray-400 opacity-50",
              day_disabled: "text-gray-400 opacity-50",
              day_hidden: "invisible",
            }}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            components={{
              DayContent: ({ date }) => {
                const coursesForDate = getCoursesForDate(date);
                return (
                  <Popover>
                    <PopoverTrigger className="w-full h-full">
                      <div className="flex flex-col p-1 h-full">
                        <div className="mb-1 text-left">
                          <span className="text-sm font-medium">{date.getDate()}</span>
                        </div>
                        {coursesForDate.length > 0 && (
                          <div className="space-y-1">
                            {coursesForDate.map(course => (
                              <div 
                                key={course.id} 
                                className={`text-xs px-1.5 py-1 mb-1 truncate rounded ${
                                  course.status === 'live'
                                    ? 'bg-red-50 border border-red-100'
                                    : course.status === 'upcoming'
                                      ? 'bg-blue-50 border border-blue-100'
                                      : 'bg-gray-50 border border-gray-100'
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="truncate">
                                    <span className={
                                      course.status === 'live'
                                        ? 'text-red-700'
                                        : course.status === 'upcoming'
                                          ? 'text-blue-700'
                                          : 'text-gray-600'
                                    }>
                                      {format(new Date(course.startTime), 'HH:mm')} {course.title}
                                    </span>
                                    <span className={`ml-1 ${
                                      course.status === 'live'
                                        ? 'text-red-500'
                                        : course.status === 'upcoming'
                                          ? 'text-blue-500'
                                          : 'text-gray-500'
                                    }`}>
                                      ({getStatusText(course.status)})
                                    </span>
                                  </div>
                                  {course.status === 'live' && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="px-2 ml-1 h-5 text-white bg-red-500 rounded hover:bg-red-600"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/live-courses/${course.id}`);
                                      }}
                                    >
                                      進入
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </PopoverTrigger>
                    {coursesForDate.length > 0 && (
                      <PopoverContent 
                        className="p-0 w-80" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-4">
                          <h3 className="mb-2 font-medium">課程列表</h3>
                          <div className="space-y-2">
                            {coursesForDate.map(course => (
                              <div key={course.id} className="relative p-2 bg-gray-50 rounded-md hover:bg-gray-100">
                                <div className="font-medium">
                                  {course.title}
                                  <span className={`ml-2 text-xs ${getStatusStyle(course.status)}`}>
                                    ({getStatusText(course.status)})
                                  </span>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {format(new Date(course.startTime), 'HH:mm')} | {course.instructor}
                                </div>
                                <div className="mt-1 text-xs text-gray-400">
                                  {course.currentParticipants}/{course.maxParticipants} 人
                                </div>
                                <div className="flex absolute top-2 right-2 z-10 gap-1">
                                  {course.status === 'live' && (
                                    <Button
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/live-courses/${course.id}`);
                                      }}
                                      className="text-white bg-red-500 hover:bg-red-600"
                                    >
                                      進入直播
                                    </Button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEdit(course);
                                    }}
                                    className="p-1.5 text-gray-400 transition-colors hover:text-primary hover:bg-white rounded-full"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(course.id);
                                    }}
                                    className="p-1.5 text-gray-400 transition-colors hover:text-red-500 hover:bg-white rounded-full"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    )}
                  </Popover>
                );
              },
            }}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCourse ? '編輯直播課程' : '新增直播課程'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="flex gap-2 items-center text-sm font-medium">
                    <CalendarIcon className="w-4 h-4" />
                    直播日期
                  </label>
                  <Input
                    type="date"
                    value={newLive.date}
                    onChange={(e) => setNewLive({ ...newLive, date: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <label className="flex gap-2 items-center text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    開始時間
                  </label>
                  <Input
                    type="time"
                    value={newLive.startTime}
                    onChange={(e) => setNewLive({ ...newLive, startTime: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="flex gap-2 items-center text-sm font-medium">
                  <CalendarIcon className="w-4 h-4" />
                  課程標題
                </label>
                <Input
                  value={newLive.title}
                  onChange={(e) => setNewLive({ ...newLive, title: e.target.value })}
                  placeholder="請輸入課程標題"
                />
              </div>
              <div>
                <label className="text-sm font-medium">課程描述</label>
                <Textarea
                  value={newLive.description}
                  onChange={(e) => setNewLive({ ...newLive, description: e.target.value })}
                  placeholder="請輸入課程描述"
                />
              </div>
              <div>
                <label className="text-sm font-medium">課程時長（分鐘）</label>
                <Input
                  type="number"
                  value={newLive.duration}
                  onChange={(e) => setNewLive({ ...newLive, duration: Number(e.target.value) })}
                  min={1}
                />
              </div>
              <div>
                <label className="flex gap-2 items-center text-sm font-medium">
                  <User className="w-4 h-4" />
                  講師名稱
                </label>
                <Input
                  value={newLive.instructor}
                  onChange={(e) => setNewLive({ ...newLive, instructor: e.target.value })}
                  placeholder="請輸入講師名稱"
                />
              </div>
              <div>
                <label className="flex gap-2 items-center text-sm font-medium">
                  <Users className="w-4 h-4" />
                  最大參與人數
                </label>
                <Input
                  type="number"
                  value={newLive.maxParticipants}
                  onChange={(e) => setNewLive({ ...newLive, maxParticipants: Number(e.target.value) })}
                  min={1}
                />
              </div>
              <div>
                <label className="flex gap-2 items-center text-sm font-medium">
                  <Video className="w-4 h-4" />
                  直播網址
                </label>
                <Input
                  value={newLive.streamUrl}
                  onChange={(e) => setNewLive({ ...newLive, streamUrl: e.target.value })}
                  placeholder="請輸入直播網址"
                />
              </div>
              <div className="flex gap-2 justify-between">
                {editingCourse && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      if (window.confirm('確定要刪除這個課程嗎？')) {
                        handleDelete(editingCourse.id);
                        setIsDialogOpen(false);
                      }
                    }}
                  >
                    刪除課程
                  </Button>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => {
                    setIsDialogOpen(false);
                    setEditingCourse(null);
                    setNewLive({
                      title: '',
                      description: '',
                      date: format(new Date(), 'yyyy-MM-dd'),
                      startTime: '',
                      duration: 60,
                      instructor: '',
                      maxParticipants: 100,
                      streamUrl: ''
                    });
                  }}>
                    取消
                  </Button>
                  <Button type="submit">
                    {editingCourse ? '確認修改' : '確認新增'}
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 