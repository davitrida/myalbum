"use client"

import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 text-white py-4 px-6 flex items-center justify-between border-b border-zinc-800">
      <Link href="/" className="flex items-center">
        <Image 
          src="/logo.png" 
          alt="MyAlbum Logo" 
          width={120} 
          height={40} 
          className="h-10 w-auto"
          priority
        />
      </Link>
      <nav className="flex items-center gap-8">
        <Link href="/" className="text-white hover:text-emerald-400 transition-colors font-medium">
          Álbum
        </Link>
        <Link href="/estatisticas" className="text-white hover:text-emerald-400 transition-colors font-medium">
          Estatísticas
        </Link>
        <Link href="/sobre" className="text-white hover:text-emerald-400 transition-colors font-medium">
          Sobre
        </Link>
      </nav>
    </header>
  )
}
