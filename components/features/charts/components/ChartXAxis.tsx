'use client';

import { XAxis } from 'recharts';
import { axisDefaults } from '../config/axis.config';

export function ChartXAxis() {
  return (
    <XAxis 
      dataKey="month"
      axisLine={axisDefaults.xAxis.axisLine}
      tickLine={axisDefaults.xAxis.tickLine}
      tick={axisDefaults.xAxis.tick}
      padding={axisDefaults.xAxis.padding}
      height={axisDefaults.xAxis.height}
    />
  );
}