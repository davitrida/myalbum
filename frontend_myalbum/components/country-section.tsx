"use client"

import { useAlbum } from "@/context/album-context"
import { StickerCircle } from "./sticker-circle"

interface CountrySectionProps {
  code: string
  name: string
  stickerCount?: number
  startNumber?: number
}

export function CountrySection({ code, name, stickerCount = 20, startNumber = 1 }: CountrySectionProps) {
  const {
    isCollected,
    getDuplicateCount,
    getStickerInfo,
    startDrag,
    handleDragOver,
    addDuplicate,
    removeDuplicate,
    uncollectSticker,
  } = useAlbum()

  return (
    <section className="mb-8 pb-8 border-b border-zinc-700">
      <h2 className="text-emerald-500 font-semibold mb-4 text-sm">
        {code} - {name}
      </h2>
      <div className="grid grid-cols-10 gap-3">
        {Array.from({ length: stickerCount }, (_, i) => {
          const number = startNumber + i
          const stickerId = `${code}-${number.toString().padStart(3, "0")}`
          return (
            <StickerCircle
              key={number}
              number={number}
              prefix={code}
              collected={isCollected(stickerId)}
              duplicateCount={getDuplicateCount(stickerId)}
              stickerInfo={getStickerInfo(stickerId)}
              startDrag={startDrag}
              handleDragOver={handleDragOver}
              addDuplicate={addDuplicate}
              removeDuplicate={removeDuplicate}
              uncollectSticker={uncollectSticker}
            />
          )
        })}
      </div>
    </section>
  )
}
