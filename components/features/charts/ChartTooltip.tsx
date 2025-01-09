'use client';

import { TooltipProps } from 'recharts';

interface EnrollmentData {
  month: string;
  students: number;
}

export function ChartTooltip({ 
  active, 
  payload 
}: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload as EnrollmentData;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
      <p className="font-medium text-gray-900">{data.month}</p>
      <p className="text-gray-600">
        学生数量: <span className="font-medium">{data.students.toLocaleString()}</span>
      </p>
    </div>
  );
}