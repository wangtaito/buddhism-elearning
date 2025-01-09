export interface EnrollmentData {
  month: string;
  students: number;
}

export interface ChartProps {
  data: EnrollmentData[];
}

export interface ChartConfig {
  xAxis: {
    padding: { left: number; right: number };
    height?: number;
  };
  yAxis: {
    width: number;
    padding: { top: number; bottom: number };
  };
  chart: {
    height: number;
    barColor: string;
  };
}