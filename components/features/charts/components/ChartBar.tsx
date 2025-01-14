'use client';

import { Bar } from 'recharts';
import { chartDefaults } from '../config/chart.config';
import { useEffect, useState } from 'react';

export function ChartBar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Bar 
      dataKey="students"
      radius={[...chartDefaults.bar.radius] as [number, number, number, number]}
      fill={chartDefaults.barColor}
      maxBarSize={chartDefaults.bar.maxBarSize}
    />
  );
}