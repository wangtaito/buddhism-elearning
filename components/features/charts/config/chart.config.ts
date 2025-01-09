export const chartDefaults = {
  height: 320,
  barColor: 'hsl(var(--chart-1))',
  margin: { top: 10, right: 10, left: 0, bottom: 0 },
  grid: {
    strokeDasharray: '3 3',
    vertical: false,
    stroke: 'rgba(0,0,0,0.1)'
  },
  bar: {
    radius: [4, 4, 0, 0],
    maxBarSize: 50
  },
  tooltip: {
    cursor: { fill: 'rgba(0,0,0,0.05)' }
  }
} as const;