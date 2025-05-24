
import { create } from 'zustand'

type Zone = 'spawn' | 'listings' | 'about' | 'contact'

interface GameState {
  currentZone: Zone
  playerPosition: [number, number, number]
  isMoving: boolean
  isLoading: boolean
  setZone: (zone: Zone) => void
  setPosition: (pos: [number, number, number]) => void
  setMoving: (moving: boolean) => void
  setLoading: (loading: boolean) => void
}

export const useGameState = create<GameState>((set) => ({
  currentZone: 'spawn',
  playerPosition: [0, 1, 0],
  isMoving: false,
  isLoading: true,
  setZone: (zone) => set({ currentZone: zone }),
  setPosition: (pos) => set({ playerPosition: pos }),
  setMoving: (moving) => set({ isMoving: moving }),
  setLoading: (loading) => set({ isLoading: loading })
}))
