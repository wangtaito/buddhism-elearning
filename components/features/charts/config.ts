import { ChartConfig } from './types';

export const chartConfig: ChartConfig = {
  xAxis: {
    padding: { left: 10, right: 10 },
    height: 50
  },
  yAxis: {
    width: 50,
    padding: { top: 20, bottom: 20 }
  },
  chart: {
    height: 320,
    barColor: 'hsl(var(--chart-1))'
  }
};

export const enrollmentData = [
  { month: '一月', students: 400 },
  { month: '二月', students: 300 },
  { month: '三月', students: 600 },
  { month: '四月', students: 800 },
  { month: '五月', students: 700 },
  { month: '六月', students: 900 }
];