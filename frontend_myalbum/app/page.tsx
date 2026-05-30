"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { CountrySection } from "@/components/country-section"
import { ProgressBar } from "@/components/progress-bar"
import { useAlbum } from "@/context/album-context"

const countries = [
  { code: "FWP", name: "Especiais", startNumber: 0 },
  { code: "CC", name: "Coca-Cola", stickerCount: 14 },
  // GRP_A
  { code: "CZE", name: "República Tcheca" },
  { code: "KOR", name: "Coreia do Sul" },
  { code: "MEX", name: "México" },
  { code: "RSA", name: "África do Sul" },
  // GRP_B
  { code: "BIH", name: "Bósnia e Herzegovina" },
  { code: "CAN", name: "Canadá" },
  { code: "QAT", name: "Qatar" },
  { code: "SUI", name: "Suíça" },
  // GRP_C
  { code: "BRA", name: "Brasil" },
  { code: "HAI", name: "Haiti" },
  { code: "MAR", name: "Marrocos" },
  { code: "SCO", name: "Escócia" },
  // GRP_D
  { code: "AUS", name: "Austrália" },
  { code: "PAR", name: "Paraguai" },
  { code: "TUR", name: "Turquia" },
  { code: "USA", name: "Estados Unidos" },
  // GRP_E
  { code: "CIV", name: "Costa do Marfim" },
  { code: "CUW", name: "Curaçao" },
  { code: "ECU", name: "Equador" },
  { code: "GER", name: "Alemanha" },
  // GRP_F
  { code: "JPN", name: "Japão" },
  { code: "NED", name: "Holanda" },
  { code: "SWE", name: "Suécia" },
  { code: "TUN", name: "Tunísia" },
  // GRP_G
  { code: "BEL", name: "Bélgica" },
  { code: "EGY", name: "Egito" },
  { code: "IRN", name: "Irã" },
  { code: "NZL", name: "Nova Zelândia" },
  // GRP_H
  { code: "CPV", name: "Cabo Verde" },
  { code: "ESP", name: "Espanha" },
  { code: "KSA", name: "Arábia Saudita" },
  { code: "URU", name: "Uruguai" },
  // GRP_I
  { code: "FRA", name: "França" },
  { code: "IRQ", name: "Iraque" },
  { code: "NOR", name: "Noruega" },
  { code: "SEN", name: "Senegal" },
  // GRP_J
  { code: "ALG", name: "Argélia" },
  { code: "ARG", name: "Argentina" },
  { code: "AUT", name: "Áustria" },
  { code: "JOR", name: "Jordânia" },
  // GRP_K
  { code: "COD", name: "RD Congo" },
  { code: "COL", name: "Colômbia" },
  { code: "POR", name: "Portugal" },
  { code: "UZB", name: "Uzbequistão" },
  // GRP_L
  { code: "CRO", name: "Croácia" },
  { code: "ENG", name: "Inglaterra" },
  { code: "GHA", name: "Gana" },
  { code: "PAN", name: "Panamá" },
]

const STICKERS_PER_COUNTRY = 20

function AlbumContent() {
  const { totalCollected, totalStickers, endDrag, handleDragOver, isDragging } = useAlbum()

  useEffect(() => {
    const handleMouseUp = () => endDrag()
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
      const element = document.elementFromPoint(e.clientX, e.clientY)
      if (element) {
        const stickerElement = element.closest("[data-sticker-id]")
        if (stickerElement) {
          const stickerId = stickerElement.getAttribute("data-sticker-id")
          if (stickerId) {
            handleDragOver(stickerId)
          }
        }
      }
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      
      const touch = e.touches[0]
      const element = document.elementFromPoint(touch.clientX, touch.clientY)
      if (element) {
        const stickerElement = element.closest("[data-sticker-id]")
        if (stickerElement) {
          const stickerId = stickerElement.getAttribute("data-sticker-id")
          if (stickerId) {
            handleDragOver(stickerId)
          }
        }
      }
    }
    
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchend", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    
    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleMouseUp)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [endDrag, handleDragOver, isDragging])

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-8 pt-24">
        <ProgressBar collected={totalCollected} total={totalStickers} />
        
        {countries.map((country) => (
          <CountrySection
            key={country.code}
            code={country.code}
            name={country.name}
            stickerCount={country.stickerCount ?? STICKERS_PER_COUNTRY}
            startNumber={country.startNumber ?? 1}
          />
        ))}
      </main>
    </div>
  )
}

export default function AlbumPage() {
  return <AlbumContent />
}
