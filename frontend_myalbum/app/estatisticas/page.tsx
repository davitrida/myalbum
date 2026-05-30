"use client"

import { Header } from "@/components/header"
import { useAlbum } from "@/context/album-context"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-zinc-800 rounded-xl p-6 flex flex-col gap-1 border border-zinc-700">
      <span className="text-zinc-400 text-sm">{label}</span>
      <span className="text-white text-3xl font-bold">{value}</span>
    </div>
  )
}

function EstatisticasContent() {
  const { totalCollected, totalDuplicates, totalStickers, loading } = useAlbum()

  const missing = totalStickers - totalCollected
  const percentage = totalStickers > 0 ? (totalCollected / totalStickers) * 100 : 0

  const chartData = [
    { name: "Coletadas", value: totalCollected },
    { name: "Faltando", value: missing },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <p className="text-zinc-400">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-8 pt-28">
        <h1 className="text-white text-2xl font-bold mb-8">Estatísticas</h1>

        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-8 flex items-center justify-center mb-8">
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Total do álbum" value={totalStickers} />
          <StatCard label="Coletadas" value={totalCollected} />
          <StatCard label="Faltando" value={missing} />
          <StatCard label="Repetidas" value={totalDuplicates} />
        </div>
      </main>
    </div>
  )
}

export default function EstatisticasPage() {
  return <EstatisticasContent />
}
