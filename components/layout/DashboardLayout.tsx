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
            'fixed lg:sticky top-0 inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-all duration-300 h-screen',
            isCollapsed ? 'w-20' : 'w-64',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex justify-between items-center">
              <span className={cn(
                "font-semibold transition-all duration-300",
                isCollapsed ? "hidden" : "block"
              )}>
                功能選單
              </span>
              <button
                onClick={toggleCollapse}
                className="hidden lg:block p-1 rounded-md hover:bg-gray-100"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
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
                        "h-5 w-5",
                        isCollapsed ? "text-gray-700" : "text-gray-500 mr-3"
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
          "flex-1 transition-all duration-300 px-4 md:px-6 py-4",
          isCollapsed ? "lg:pl-24" : "lg:pl-68"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}