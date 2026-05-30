"use client"

import { AlbumProvider } from "@/context/album-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return <AlbumProvider>{children}</AlbumProvider>
}
