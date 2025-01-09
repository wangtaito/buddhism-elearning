'use client';

import { CartesianGrid } from 'recharts';
import { chartDefaults } from '../config/chart.config';

export function ChartGrid() {
  const { grid } = chartDefaults;
  
  return (
    <CartesianGrid 
      strokeDasharray={grid.strokeDasharray}
      vertical={grid.vertical}
      stroke={grid.stroke}
    />
  );
}