'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Cookies from 'js-cookie';
import { LoadingSpinner } from '@/components/ui/loading';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 檢查是否已登入
  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    const loginTime = Cookies.get('loginTime');
    const username = Cookies.get('username');
    
    if (isLoggedIn) {
      // 如果已經登入且有完整的登入信息，直接跳轉到主頁
      if (loginTime && username) {
        router.push('/');
        router.refresh();
      } else {
        // 如果登入信息不完整，清除所有 cookies 並要求重新登入
        Cookies.remove('isLoggedIn');
        Cookies.remove('loginTime');
        Cookies.remove('username');
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('請輸入帳號和密碼');
      return;
    }

    try {
      setIsLoading(true);
      
      // 模擬 API 請求延遲
      await new Promise(resolve => setTimeout(resolve, 500));

      // 從 localStorage 獲取用戶數據
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];
      
      const user = users.find(
        (u: { username: string; password: string }) => 
        u.username === username && u.password === password
      );

      if (user) {
        const loginTime = new Date().toISOString();
        
        Cookies.set('isLoggedIn', 'true', { 
          expires: 7,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
        Cookies.set('loginTime', loginTime, { expires: 7 });
        Cookies.set('username', username, { expires: 7 });

        // 先等待 Cookie 設置完成
        await new Promise(resolve => setTimeout(resolve, 100));
        window.location.href = '/courses';
      } else {
        setError('帳號或密碼錯誤');
      }
    } catch (err) {
      setError('登入時發生錯誤，請稍後再試');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = () => {
    if (error) setError('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-md bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/logo.png"
            alt="佛學院 Logo"
            width={80}
            height={80}
            className="mb-4 rounded-md"
            priority
          />
          <h1 className="text-2xl font-bold text-gray-900">佛學院進修教育網</h1>
          <p className="mt-2 text-gray-600">請登入以繼續</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="relative px-4 py-2 text-red-700 bg-red-100 rounded border border-red-400">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">帳號</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                handleInputChange();
              }}
              placeholder="請輸入帳號"
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">密碼</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange();
              }}
              placeholder="請輸入密碼"
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-10"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <LoadingSpinner />
                <span className="ml-2">登入中...</span>
              </div>
            ) : (
              '登入'
            )}
          </Button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-500">
          <p>預設帳號：admin</p>
          <p>預設密碼：123</p>
        </div>
      </div>
    </div>
  );
} 