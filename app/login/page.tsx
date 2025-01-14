'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import Cookies from 'js-cookie';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 簡單的驗證邏輯
    if (username === 'admin' && password === '123') {
      // 設置登入狀態
      Cookies.set('isLoggedIn', 'true', { expires: 7 });
      Cookies.set('username', username, { expires: 7 });
      Cookies.set('loginTime', new Date().toISOString(), { expires: 7 });

      // 重定向到課程頁面
      router.push('/courses');
      router.refresh();
    } else {
      setError('用戶名或密碼錯誤');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logo.png"
            alt="佛學院 Logo"
            width={80}
            height={80}
            className="rounded-lg mb-4"
            onError={(e: any) => {
              e.currentTarget.src = 'https://placehold.co/80x80?text=Logo';
            }}
          />
          <h1 className="text-2xl font-bold text-gray-900">佛學院進修教育網</h1>
          <p className="mt-2 text-gray-600">請登入您的帳號</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              用戶名
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
              placeholder="請輸入用戶名"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              密碼
            </label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                placeholder="請輸入密碼"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button type="submit" className="w-full">
            登入
          </Button>

          <div className="text-center text-sm text-gray-500">
            <p>測試帳號：admin</p>
            <p>測試密碼：123</p>
          </div>
        </form>
      </div>
    </div>
  );
} 