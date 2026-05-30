"use client"

import { Header } from "@/components/header"
import { Linkedin, Github } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-28 pb-16">

        <p className="text-emerald-500 text-xs font-semibold tracking-widest uppercase mb-4">
          Sobre o MyAlbum
        </p>

        <h1 className="text-white text-4xl font-bold leading-tight mb-6">
          Seu parceiro ideal para{" "}
          <span className="text-emerald-400">completar o álbum</span>{" "}
          da Copa!
        </h1>

        <p className="text-zinc-400 text-lg leading-relaxed mb-12">
          Gerencie figurinhas, acompanhe seu progresso e nunca mais perca o controle das repetidas.
        </p>

        <div className="w-full h-px bg-zinc-700 mb-12" />

        <p className="text-zinc-500 text-sm tracking-wide uppercase mb-3">Criado por</p>
        <p className="text-white text-2xl font-bold mb-6">Davi Trida</p>

        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/davi-trida-0b1083264?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 text-sm font-medium"
          >
            <Linkedin size={18} className="text-blue-400" />
            LinkedIn
          </a>
          <a
            href="https://github.com/davitrida"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-400 hover:bg-zinc-700 transition-all duration-200 text-sm font-medium"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>

      </main>
    </div>
  )
}
