'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import DashboardLayout from './DashboardLayout';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    const isLoginPage = pathname === '/login';

    if (isLoggedIn && isLoginPage) {
      router.push('/courses');
    } else if (!isLoggedIn && !isLoginPage) {
      router.push('/login');
    }
  }, [pathname, router]);

  return <DashboardLayout>{children}</DashboardLayout>;
} 