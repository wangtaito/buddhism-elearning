'use client';

import { Bell, User, Clock, Users } from 'lucide-react';
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

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const router = useRouter();

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

          {/* 使用者管理按鈕 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/users')}
            className="relative"
            title="使用者管理"
          >
            <Users className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}