
import { useRef, useEffect } from 'react'

export const useMovement = () => {
  const keys = useRef({
    w: false, 
    a: false, 
    s: false, 
    d: false
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      switch(e.code) {
        case 'KeyW': 
        case 'ArrowUp':
          keys.current.w = true
          break
        case 'KeyA': 
        case 'ArrowLeft':
          keys.current.a = true
          break
        case 'KeyS': 
        case 'ArrowDown':
          keys.current.s = true
          break
        case 'KeyD': 
        case 'ArrowRight':
          keys.current.d = true
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault()
      switch(e.code) {
        case 'KeyW': 
        case 'ArrowUp':
          keys.current.w = false
          break
        case 'KeyA': 
        case 'ArrowLeft':
          keys.current.a = false
          break
        case 'KeyS': 
        case 'ArrowDown':
          keys.current.s = false
          break
        case 'KeyD': 
        case 'ArrowRight':
          keys.current.d = false
          break
      }
    }

    // Add event listeners to window to ensure they work
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Focus the canvas to ensure it receives keyboard events
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.focus()
      canvas.setAttribute('tabindex', '0')
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return { keys }
}
