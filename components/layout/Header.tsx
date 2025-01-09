'use client';

import { Bell, LogOut, User, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const router = useRouter();
  const [loginTime, setLoginTime] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const isAdmin = username === 'admin';

  useEffect(() => {
    // 立即讀取並設置用戶信息
    const initUserInfo = () => {
      const storedUsername = Cookies.get('username');
      const storedLoginTime = Cookies.get('loginTime');
      const isLoggedIn = Cookies.get('isLoggedIn');
      
      if (isLoggedIn && storedUsername) {
        setUsername(storedUsername);
      }
      
      if (isLoggedIn && storedLoginTime) {
        try {
          const loginDate = new Date(storedLoginTime);
          if (!isNaN(loginDate.getTime())) {
            setLoginTime(loginDate.toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }));
          }
        } catch (error) {
          console.error('解析登入時間失敗:', error);
          setLoginTime('未知');
        }
      }
    };

    initUserInfo();

    // 監聽 cookie 變化
    const checkCookies = setInterval(initUserInfo, 1000);

    return () => clearInterval(checkCookies);
  }, []);

  const handleLogout = () => {
    Cookies.remove('isLoggedIn');
    Cookies.remove('loginTime');
    Cookies.remove('username');
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex justify-between items-center px-4 py-2">
        {/* 左側 Logo 和標題 */}
        <div className="flex gap-2 items-center">
          <Link href="/courses" className="flex gap-2 items-center">
            <Image
              src="/images/logo.png"
              alt="佛學院 Logo"
              width={40}
              height={40}
              className="rounded-md"
              onError={(e: any) => {
                e.currentTarget.src = 'https://placehold.co/40x40?text=Logo';
              }}
              priority
            />
            <span className="hidden text-xl font-bold md:block">佛學院進修教育網</span>
          </Link>
        </div>

        {/* 右側功能按鈕 */}
        <div className="flex gap-4 items-center">
          {/* 用戶資訊 */}
          <div className="hidden gap-2 items-center text-sm text-gray-600 md:flex">
            <User className="w-4 h-4" />
            <span>{username}</span>
            <Clock className="ml-2 w-4 h-4" />
            <span>{loginTime || '未知'}</span>
          </div>

          {/* 用戶資訊下拉菜單（移動端） */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">用戶：{username}</p>
                <p className="text-xs text-gray-500">登入時間：{loginTime || '未知'}</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 通知下拉菜單 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="flex absolute -top-1 -right-1 justify-center items-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <h3 className="mb-2 font-semibold">通知</h3>
                <div className="space-y-2">
                  <div className="p-2 text-sm rounded-md hover:bg-gray-100">
                    <p className="font-medium">新課程上線</p>
                    <p className="text-gray-500">《佛教心理學進階》課程已開放報名</p>
                    <p className="mt-1 text-xs text-gray-400">2小時前</p>
                  </div>
                  <div className="p-2 text-sm rounded-md hover:bg-gray-100">
                    <p className="font-medium">課程提醒</p>
                    <p className="text-gray-500">您的課程進度已經一週未更新</p>
                    <p className="mt-1 text-xs text-gray-400">1天前</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 使用者管理按鈕 - 僅管理員可見 */}
          {username && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (isAdmin) {
                  router.push('/users');
                } else {
                  alert('請使用管理員帳號登入');
                }
              }}
              className="relative"
              title="使用者管理"
            >
              <Users className="w-5 h-5" />
            </Button>
          )}

          {/* 登出按鈕 */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}