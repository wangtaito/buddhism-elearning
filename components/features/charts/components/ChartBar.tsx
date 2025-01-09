'use client';

import { Bar } from 'recharts';
import { chartDefaults } from '../config/chart.config';

export function ChartBar() {
  return (
    <Bar 
      dataKey="students"
      radius={chartDefaults.bar.radius}
      fill={chartDefaults.barColor}
      maxBarSize={chartDefaults.bar.maxBarSize}
    />
  );
}