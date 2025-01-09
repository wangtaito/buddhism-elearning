'use client';

import { YAxis } from 'recharts';
import { axisDefaults } from '../config/axis.config';

export function ChartYAxis() {
  return (
    <YAxis 
      axisLine={axisDefaults.yAxis.axisLine}
      tickLine={axisDefaults.yAxis.tickLine}
      tick={axisDefaults.yAxis.tick}
      width={axisDefaults.yAxis.width}
      padding={axisDefaults.yAxis.padding}
    />
  );
}