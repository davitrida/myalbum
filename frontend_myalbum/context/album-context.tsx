"use client"

import { createContext, useContext, useState, ReactNode, useCallback, useRef, useEffect } from "react"

const API_BASE = `http://${typeof window !== "undefined" ? window.location.hostname : "localhost"}:8000`

export interface StickerInfo {
  id: number
  codigo: string
  jogador: string
  selecao: string
}

interface AlbumContextType {
  getStickerInfo: (codigo: string) => StickerInfo | undefined
  isCollected: (codigo: string) => boolean
  getDuplicateCount: (codigo: string) => number
  totalCollected: number
  totalDuplicates: number
  totalStickers: number
  loading: boolean
  collectSticker: (codigo: string) => void
  uncollectSticker: (codigo: string) => void
  addDuplicate: (codigo: string) => void
  removeDuplicate: (codigo: string) => void
  isDragging: boolean
  dragMode: "collect" | "remove" | null
  startDrag: (codigo: string) => void
  endDrag: () => void
  handleDragOver: (codigo: string) => void
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined)

export function AlbumProvider({ children }: { children: ReactNode }) {
  // album[sticker_id] = quantidade
  const [albumMap, setAlbumMap] = useState<Map<number, number>>(new Map())
  const [stickerMap, setStickerMap] = useState<Map<string, StickerInfo>>(new Map())
  const [loading, setLoading] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [dragMode, setDragMode] = useState<"collect" | "remove" | null>(null)

  // Refs for synchronous reads inside drag callbacks
  const albumMapRef = useRef<Map<number, number>>(new Map())
  const stickerMapRef = useRef<Map<string, StickerInfo>>(new Map())
  const userIdRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const dragModeRef = useRef<"collect" | "remove" | null>(null)
  const dragSyncedRef = useRef<Set<string>>(new Set())
  const dragPendingRef = useRef<{ stickerId: number; action: "add" }[]>([])

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const userRes = await fetch(`${API_BASE}/users/me`)
        const user = await userRes.json()
        userIdRef.current = user.id

        const [stickersRes, albumRes] = await Promise.all([
          fetch(`${API_BASE}/stickers`),
          fetch(`${API_BASE}/album/${user.id}`),
        ])

        const stickers: StickerInfo[] = await stickersRes.json()
        const sMap = new Map<string, StickerInfo>()
        stickers.forEach((s) => sMap.set(s.codigo, s))
        setStickerMap(sMap)
        stickerMapRef.current = sMap

        const album: { sticker_id: number; quantidade: number }[] = await albumRes.json()
        const aMap = new Map<number, number>()
        album.forEach((e) => aMap.set(e.sticker_id, e.quantidade))
        setAlbumMap(aMap)
        albumMapRef.current = aMap
      } catch (err) {
        console.error("Failed to load album data:", err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const apiPost = (endpoint: string, stickerId: number) => {
    const uid = userIdRef.current
    if (!uid) return
    fetch(`${API_BASE}/album/${endpoint}?user_id=${uid}&sticker_id=${stickerId}`, { method: "POST" }).catch(
      console.error
    )
  }

  const apiDelete = (stickerId: number) => {
    const uid = userIdRef.current
    if (!uid) return
    fetch(`${API_BASE}/album/entry?user_id=${uid}&sticker_id=${stickerId}`, { method: "DELETE" }).catch(console.error)
  }

  const getStickerInfo = useCallback((codigo: string) => stickerMapRef.current.get(codigo), [])

  const isCollected = useCallback(
    (codigo: string) => {
      const info = stickerMap.get(codigo)
      if (!info) return false
      return (albumMap.get(info.id) ?? 0) >= 1
    },
    [stickerMap, albumMap]
  )

  const getDuplicateCount = useCallback(
    (codigo: string) => {
      const info = stickerMap.get(codigo)
      if (!info) return 0
      return Math.max(0, (albumMap.get(info.id) ?? 0) - 1)
    },
    [stickerMap, albumMap]
  )

  const totalCollected = albumMap.size
  const totalDuplicates = Array.from(albumMap.values()).reduce((acc, qty) => acc + Math.max(0, qty - 1), 0)
  const totalStickers = stickerMap.size

  const collectSticker = useCallback((codigo: string) => {
    const info = stickerMapRef.current.get(codigo)
    if (!info || albumMapRef.current.has(info.id)) return

    const newMap = new Map(albumMapRef.current)
    newMap.set(info.id, 1)
    albumMapRef.current = newMap
    setAlbumMap(newMap)
    apiPost("add", info.id)
  }, [])

  const uncollectSticker = useCallback((codigo: string) => {
    const info = stickerMapRef.current.get(codigo)
    if (!info || !albumMapRef.current.has(info.id)) return

    const newMap = new Map(albumMapRef.current)
    newMap.delete(info.id)
    albumMapRef.current = newMap
    setAlbumMap(newMap)
    apiDelete(info.id)
  }, [])

  const addDuplicate = useCallback((codigo: string) => {
    const info = stickerMapRef.current.get(codigo)
    if (!info) return
    const current = albumMapRef.current.get(info.id) ?? 0
    if (current === 0) return

    const newMap = new Map(albumMapRef.current)
    newMap.set(info.id, current + 1)
    albumMapRef.current = newMap
    setAlbumMap(newMap)
    apiPost("add", info.id)
  }, [])

  const removeDuplicate = useCallback((codigo: string) => {
    const info = stickerMapRef.current.get(codigo)
    if (!info) return
    const current = albumMapRef.current.get(info.id) ?? 0
    if (current <= 1) return

    const newMap = new Map(albumMapRef.current)
    newMap.set(info.id, current - 1)
    albumMapRef.current = newMap
    setAlbumMap(newMap)
    apiPost("remove", info.id)
  }, [])

  const startDrag = useCallback((codigo: string) => {
    const info = stickerMapRef.current.get(codigo)
    if (!info || albumMapRef.current.has(info.id)) return

    isDraggingRef.current = true
    dragModeRef.current = "collect"
    setIsDragging(true)
    setDragMode("collect")
    dragSyncedRef.current.clear()
    dragSyncedRef.current.add(codigo)
    dragPendingRef.current = [{ stickerId: info.id, action: "add" }]

    const newMap = new Map(albumMapRef.current)
    newMap.set(info.id, 1)
    albumMapRef.current = newMap
    setAlbumMap(newMap)
  }, [])

  const endDrag = useCallback(() => {
    isDraggingRef.current = false
    dragModeRef.current = null
    setIsDragging(false)
    setDragMode(null)

    const pending = [...dragPendingRef.current]
    dragPendingRef.current = []
    dragSyncedRef.current.clear()

    pending.forEach(({ stickerId }) => apiPost("add", stickerId))
  }, [])

  const handleDragOver = useCallback((codigo: string) => {
    if (!isDraggingRef.current || dragModeRef.current !== "collect") return
    if (dragSyncedRef.current.has(codigo)) return

    const info = stickerMapRef.current.get(codigo)
    if (!info || albumMapRef.current.has(info.id)) return

    dragSyncedRef.current.add(codigo)

    const newMap = new Map(albumMapRef.current)
    newMap.set(info.id, 1)
    albumMapRef.current = newMap
    setAlbumMap(newMap)
    dragPendingRef.current.push({ stickerId: info.id, action: "add" })
  }, [])

  return (
    <AlbumContext.Provider
      value={{
        getStickerInfo,
        isCollected,
        getDuplicateCount,
        totalCollected,
        totalDuplicates,
        totalStickers,
        loading,
        collectSticker,
        uncollectSticker,
        addDuplicate,
        removeDuplicate,
        isDragging,
        dragMode,
        startDrag,
        endDrag,
        handleDragOver,
      }}
    >
      {children}
    </AlbumContext.Provider>
  )
}

export function useAlbum() {
  const context = useContext(AlbumContext)
  if (!context) throw new Error("useAlbum must be used within an AlbumProvider")
  return context
}
