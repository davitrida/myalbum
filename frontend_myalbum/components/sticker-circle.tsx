"use client"

import { memo, useRef, useState, useEffect } from "react"
import { Plus, Minus } from "lucide-react"
import { StickerInfo } from "@/context/album-context"

interface StickerCircleProps {
  number: number
  prefix: string
  collected: boolean
  duplicateCount: number
  stickerInfo: StickerInfo | undefined
  startDrag: (codigo: string) => void
  handleDragOver: (codigo: string) => void
  addDuplicate: (codigo: string) => void
  removeDuplicate: (codigo: string) => void
  uncollectSticker: (codigo: string) => void
}

export const StickerCircle = memo(function StickerCircle({
  number,
  prefix,
  collected,
  duplicateCount,
  stickerInfo,
  startDrag,
  handleDragOver,
  addDuplicate,
  removeDuplicate,
  uncollectSticker,
}: StickerCircleProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [showDuplicateMenu, setShowDuplicateMenu] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [optimisticCollected, setOptimisticCollected] = useState(false)

  const displayNumber = number.toString().padStart(2, "0")
  const stickerId = `${prefix}-${number.toString().padStart(3, "0")}`
  const effectiveCollected = optimisticCollected || collected

  useEffect(() => {
    setOptimisticCollected(false)
  }, [collected])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (effectiveCollected) {
      e.preventDefault()
      setShowDuplicateMenu((prev) => !prev)
      return
    }
    e.preventDefault()
    setOptimisticCollected(true)
    startDrag(stickerId)
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        data-sticker-id={stickerId}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => {
          setShowTooltip(true)
          handleDragOver(stickerId)
        }}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={(e) => {
          if (effectiveCollected) {
            e.preventDefault()
            setShowDuplicateMenu((prev) => !prev)
            return
          }
          e.preventDefault()
          setOptimisticCollected(true)
          startDrag(stickerId)
        }}
        className={`sticker-circle w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 select-none cursor-pointer ${
          effectiveCollected
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
            : "bg-zinc-300 text-zinc-600 hover:bg-zinc-400"
        }`}
      >
        {displayNumber}
      </button>

      {duplicateCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          +{duplicateCount}
        </span>
      )}

      {showTooltip && stickerInfo && stickerInfo.jogador && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 shadow-xl whitespace-nowrap pointer-events-none">
          <p className="text-white font-semibold text-xs">{stickerInfo.jogador}</p>
          <p className="text-zinc-400 text-xs">{stickerInfo.selecao}</p>
          <p className="text-zinc-500 text-[10px]">{stickerId}</p>
        </div>
      )}

      {showDuplicateMenu && effectiveCollected && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowDuplicateMenu(false)} />
          <div className="absolute left-1/2 -translate-x-1/2 top-14 z-50 bg-zinc-800 rounded-lg shadow-xl p-2 flex items-center gap-2 border border-zinc-700">
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (duplicateCount === 0) {
                  uncollectSticker(stickerId)
                  setShowDuplicateMenu(false)
                } else {
                  removeDuplicate(stickerId)
                }
              }}
              className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-white transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="text-white font-bold min-w-[24px] text-center">{duplicateCount}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                addDuplicate(stickerId)
              }}
              className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-white transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  )
})
