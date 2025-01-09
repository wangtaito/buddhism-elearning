'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus } from 'lucide-react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(() => {
    if (typeof window !== 'undefined') {
      const savedUsers = localStorage.getItem('users');
      return savedUsers ? JSON.parse(savedUsers) : [
        {
          id: '1',
          username: 'admin',
          password: '123',
          createdAt: new Date().toISOString()
        }
      ];
    }
    return [];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });

  // 檢查是否為管理員
  useEffect(() => {
    const username = Cookies.get('username');
    if (username !== 'admin') {
      alert('請使用管理員帳號登入');
      router.push('/courses');
      return;
    }
  }, [router]);

  // 保存用戶數據到 localStorage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password) {
      alert('請填寫完整的用戶信息');
      return;
    }

    const userExists = users.some(user => user.username === newUser.username);
    if (userExists) {
      alert('用戶名已存在');
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      username: newUser.username,
      password: newUser.password,
      createdAt: new Date().toISOString()
    };

    setUsers([...users, user]);
    setNewUser({ username: '', password: '' });
  };

  const handleEditUser = (user: User) => {
    setIsEditing(true);
    setEditingUser(user);
    setNewUser({
      username: user.username,
      password: user.password
    });
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;

    const updatedUsers = users.map(user => {
      if (user.id === editingUser.id) {
        return {
          ...user,
          username: newUser.username,
          password: newUser.password
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setIsEditing(false);
    setEditingUser(null);
    setNewUser({ username: '', password: '' });
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('確定要刪除此用戶嗎？')) {
      const userToDelete = users.find(user => user.id === userId);
      if (userToDelete?.username === 'admin') {
        alert('無法刪除管理員帳號');
        return;
      }
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">使用者管理</h1>

      {/* 添加/編輯用戶表單 */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? '編輯用戶' : '新增用戶'}
        </h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">用戶名</label>
            <Input
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              placeholder="請輸入用戶名"
              disabled={isEditing && editingUser?.username === 'admin'}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">密碼</label>
            <Input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="請輸入密碼"
            />
          </div>
          <Button
            onClick={isEditing ? handleUpdateUser : handleAddUser}
            className="flex gap-2 items-center"
          >
            {isEditing ? (
              <>
                <Pencil className="w-4 h-4" />
                更新
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                新增
              </>
            )}
          </Button>
          {isEditing && (
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setEditingUser(null);
                setNewUser({ username: '', password: '' });
              }}
            >
              取消
            </Button>
          )}
        </div>
      </div>

      {/* 用戶列表 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>用戶名</TableHead>
              <TableHead>創建時間</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleString('zh-TW')}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditUser(user)}
                    disabled={user.username === 'admin'}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={user.username === 'admin'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 