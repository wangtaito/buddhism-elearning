'use client';

import { Tooltip } from 'recharts';
import { ChartTooltip } from '../ChartTooltip';
import { chartDefaults } from '../config/chart.config';

export function ChartTooltipWrapper() {
  return (
    <Tooltip 
      content={<ChartTooltip />}
      cursor={chartDefaults.tooltip.cursor}
    />
  );
}