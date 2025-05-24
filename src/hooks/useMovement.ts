
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

export const useMovement = () => {
  const velocity = useRef(new Vector3())
  const keys = useRef({
    w: false, a: false, s: false, d: false
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.code) {
        case 'KeyW': keys.current.w = true; break
        case 'KeyA': keys.current.a = true; break
        case 'KeyS': keys.current.s = true; break
        case 'KeyD': keys.current.d = true; break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch(e.code) {
        case 'KeyW': keys.current.w = false; break
        case 'KeyA': keys.current.a = false; break
        case 'KeyS': keys.current.s = false; break
        case 'KeyD': keys.current.d = false; break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return { velocity, keys }
}
