
import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useGameState } from '../../store/gameState'
import { useMovement } from '../../hooks/useMovement'
import { Vector3 } from 'three'

export const CameraController = () => {
  const { camera } = useThree()
  const controlsRef = useRef<any>()
  const currentZone = useGameState((state) => state.currentZone)
  const setPosition = useGameState((state) => state.setPosition)
  const setMoving = useGameState((state) => state.setMoving)
  const { keys } = useMovement()

  const playerPosition = useRef(new Vector3(0, 1, 0))
  const moveSpeed = 0.1

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 5, 10)
    camera.lookAt(0, 0, 0)
  }, [camera])

  useFrame(() => {
    if (controlsRef.current) {
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
        
        // Update camera position to follow player
        const cameraOffset = new Vector3(0, 4, 8)
        camera.position.copy(playerPosition.current).add(cameraOffset)
        
        // Update game state
        setPosition([
          playerPosition.current.x,
          playerPosition.current.y,
          playerPosition.current.z
        ])
      }

      // Set camera position based on current zone when transitioning
      const zonePositions = {
        spawn: [0, 5, 10],
        listings: [20, 5, 10],
        about: [-20, 5, 10],
        contact: [0, 5, 30]
      }

      const targetPosition = zonePositions[currentZone]
      
      // Only auto-move camera for zone transitions when not actively moving
      if (!isMoving) {
        camera.position.lerp(
          { x: targetPosition[0], y: targetPosition[1], z: targetPosition[2] } as any,
          0.02
        )
        
        // Update player position to match camera
        playerPosition.current.set(targetPosition[0], 1, targetPosition[2] - 8)
        setPosition([playerPosition.current.x, playerPosition.current.y, playerPosition.current.z])
      }
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      maxPolarAngle={Math.PI / 2.2}
      minDistance={3}
      maxDistance={15}
      target={[0, 0, 0]}
      enableDamping={true}
      dampingFactor={0.05}
    />
  )
}
