"use client"
 
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
 
const data = [
  {
    name: "1月",
    total: 1500,
  },
  {
    name: "2月",
    total: 1200,
  },
  {
    name: "3月",
    total: 2000,
  },
  {
    name: "4月",
    total: 1800,
  },
  {
    name: "5月",
    total: 2400,
  },
  {
    name: "6月",
    total: 2800,
  },
]
 
export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 