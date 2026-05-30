"use client"

interface ProgressBarProps {
  collected: number
  total: number
}

export function ProgressBar({ collected, total }: ProgressBarProps) {
  const percentage = total > 0 ? (collected / total) * 100 : 0
  
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-zinc-400 mb-2">
        <span>{collected} / {total} figurinhas</span>
        <span>{percentage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-zinc-700 rounded-full h-3">
        <div 
          className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
