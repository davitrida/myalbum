"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

interface StatsChartProps {
  totalCollected: number
  missing: number
  percentage: number
}

export function StatsChart({ totalCollected, missing, percentage }: StatsChartProps) {
  const chartData = [
    { name: "Coletadas", value: totalCollected },
    { name: "Faltando", value: missing },
  ]

  return (
    <div className="relative w-full" style={{ height: 280 }}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={120}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            labelLine={false}
          >
            <Cell fill="#10b981" />
            <Cell fill="#3f3f46" />
          </Pie>
          <Tooltip
            contentStyle={{ background: "#27272a", border: "1px solid #52525b", borderRadius: 8 }}
            itemStyle={{ color: "#fff" }}
            formatter={(value: number, name: string) => [value, name]}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none animate-fade-in">
        <span className="text-white text-4xl font-bold leading-none">
          {percentage.toFixed(1)}%
        </span>
        <span className="text-zinc-400 text-sm mt-1">completo</span>
      </div>
    </div>
  )
}
