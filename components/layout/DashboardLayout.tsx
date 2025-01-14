'use client';

import { useState } from 'react';
import { MenuIcon, X, ChevronLeft, ChevronRight, BookOpen, ChartBarIcon, Film, Video } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    href: '/dashboard',
    label: '數據分析',
    icon: ChartBarIcon
  },
  {
    href: '/courses',
    label: '課程中心',
    icon: BookOpen
  },
  {
    href: '/shorts',
    label: '短視頻',
    icon: Film
  },
  {
    href: '/live-courses',
    label: '直播課程',
    icon: Video
  }
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex">
        {/* 側邊欄 */}
        <aside
          className={cn(
            'fixed inset-y-0 top-0 left-0 z-50 h-screen bg-white shadow-lg transition-all duration-300 transform lg:sticky',
            isCollapsed ? 'w-20' : 'w-64',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4">
              <span className={cn(
                "font-semibold transition-all duration-300",
                isCollapsed ? "hidden" : "block"
              )}>
                功能選單
              </span>
              <button
                onClick={toggleCollapse}
                className="hidden p-1 rounded-md lg:block hover:bg-gray-100"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-2 rounded-md hover:bg-gray-100",
                        isCollapsed ? "justify-center" : "justify-start"
                      )}
                    >
                      <item.icon className={cn(
                        "w-5 h-5",
                        isCollapsed ? "text-gray-700" : "mr-3 text-gray-500"
                      )} />
                      <span className={cn(
                        "transition-all duration-300",
                        isCollapsed ? "hidden" : "block"
                      )}>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* 遮罩層 - 移動端側邊欄打開時顯示 */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* 主要內容區域 */}
        <main className={cn(
          "flex-1 px-4 py-4 transition-all duration-300 md:px-6",
          isCollapsed ? "lg:pl-24" : "lg:pl-68"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}