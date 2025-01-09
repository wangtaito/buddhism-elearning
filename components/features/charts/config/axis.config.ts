export const axisDefaults = {
  xAxis: {
    axisLine: false,
    tickLine: false,
    tick: { fill: 'rgb(107 114 128)' },
    padding: { left: 10, right: 10 },
    height: 50
  },
  yAxis: {
    axisLine: false,
    tickLine: false,
    tick: { fill: 'rgb(107 114 128)' },
    width: 50,
    padding: { top: 20, bottom: 20 }
  }
} as const;