'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltip } from './ChartTooltip';

const data = [
  { month: '一月', students: 400 },
  { month: '二月', students: 300 },
  { month: '三月', students: 600 },
  { month: '四月', students: 800 },
  { month: '五月', students: 700 },
  { month: '六月', students: 900 }
];

export default function EnrollmentChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'rgb(107 114 128)' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'rgb(107 114 128)' }}
          width={50}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
        <Bar 
          dataKey="students"
          fill="hsl(var(--chart-1))"
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}