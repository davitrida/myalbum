"use client"

import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { useAlbum } from "@/context/album-context"

const StatsChart = dynamic(
  () => import("@/components/stats-chart").then((m) => m.StatsChart),
  { ssr: false }
)

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
          <StatsChart
            totalCollected={totalCollected}
            missing={missing}
            percentage={percentage}
          />
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
