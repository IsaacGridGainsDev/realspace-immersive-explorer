
import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGameState } from '../../store/gameState'
import { useMovement } from '../../hooks/useMovement'
import { Vector3, Euler } from 'three'

export const CameraController = () => {
  const { camera, gl } = useThree()
  const currentZone = useGameState((state) => state.currentZone)
  const setPosition = useGameState((state) => state.setPosition)
  const setMoving = useGameState((state) => state.setMoving)
  const { keys } = useMovement()

  const playerPosition = useRef(new Vector3(0, 1, 0))
  const cameraRotation = useRef(new Euler(0, 0, 0))
  const moveSpeed = 0.1
  const mouseSensitivity = 0.002
  const isPointerLocked = useRef(false)

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 5, 10)
    camera.lookAt(0, 0, 0)

    const canvas = gl.domElement

    const handleClick = () => {
      canvas.requestPointerLock()
    }

    const handlePointerLockChange = () => {
      isPointerLocked.current = document.pointerLockElement === canvas
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isPointerLocked.current) return

      const movementX = event.movementX || 0
      const movementY = event.movementY || 0

      cameraRotation.current.y -= movementX * mouseSensitivity
      cameraRotation.current.x -= movementY * mouseSensitivity

      // Clamp vertical rotation
      cameraRotation.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, cameraRotation.current.x)
      )

      camera.rotation.copy(cameraRotation.current)
    }

    canvas.addEventListener('click', handleClick)
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      canvas.removeEventListener('click', handleClick)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [camera, gl])

  useFrame(() => {
    // Handle WASD movement
    const isMoving = keys.current.w || keys.current.a || keys.current.s || keys.current.d
    setMoving(isMoving)

    if (isMoving) {
      const forward = new Vector3()
      const right = new Vector3()
      
      // Get camera direction vectors
      camera.getWorldDirection(forward)
      forward.y = 0 // Keep movement on horizontal plane
      forward.normalize()
      
      right.crossVectors(forward, new Vector3(0, 1, 0))
      right.normalize()

      // Calculate movement based on keys
      const movement = new Vector3()
      if (keys.current.w) movement.add(forward)
      if (keys.current.s) movement.sub(forward)
      if (keys.current.d) movement.add(right)
      if (keys.current.a) movement.sub(right)

      // Apply movement
      movement.multiplyScalar(moveSpeed)
      playerPosition.current.add(movement)
      
      // Update camera position
      camera.position.copy(playerPosition.current)
      camera.position.y = playerPosition.current.y + 1.8 // Eye height
      
      // Update game state
      setPosition([
        playerPosition.current.x,
        playerPosition.current.y,
        playerPosition.current.z
      ])
    }

    // Handle zone transitions only when not in pointer lock mode
    if (!isPointerLocked.current) {
      const zonePositions = {
        spawn: [0, 1, 0],
        listings: [20, 1, 0],
        about: [-20, 1, 0],
        contact: [0, 1, 30]
      }

      const targetPosition = zonePositions[currentZone]
      
      // Auto-move to zone position when not actively moving
      if (!isMoving) {
        playerPosition.current.lerp(
          new Vector3(targetPosition[0], targetPosition[1], targetPosition[2]),
          0.02
        )
        camera.position.copy(playerPosition.current)
        camera.position.y = playerPosition.current.y + 1.8
        
        setPosition([playerPosition.current.x, playerPosition.current.y, playerPosition.current.z])
      }
    }
  })

  return null
}
