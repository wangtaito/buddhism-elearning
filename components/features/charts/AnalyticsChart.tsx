'use client';

import { ResponsiveContainer, BarChart } from 'recharts';
import { ChartBar } from './components/ChartBar';
import { useEffect, useState } from 'react';

interface DataItem {
  students: number;
  [key: string]: any;
}

/**
 * 数据分析图表组件
 *
 * @param props 组件属性
 * @param props.data 数据项数组
 * @returns 返回渲染后的数据分析图表组件
 */
export function AnalyticsChart({ data }: { data: DataItem[] }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div>載入中...</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <ChartBar />
      </BarChart>
    </ResponsiveContainer>
  );
} 