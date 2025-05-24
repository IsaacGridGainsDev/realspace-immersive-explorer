
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useGameState } from '../../store/gameState'

export const CameraController = () => {
  const { camera } = useThree()
  const controlsRef = useRef<any>()
  const currentZone = useGameState((state) => state.currentZone)

  useFrame(() => {
    if (controlsRef.current) {
      // Set camera position based on current zone
      const zonePositions = {
        spawn: [0, 5, 10],
        listings: [20, 5, 10],
        about: [-20, 5, 10],
        contact: [0, 5, 30]
      }

      const targetPosition = zonePositions[currentZone]
      
      // Smoothly move camera to target position
      camera.position.lerp(
        { x: targetPosition[0], y: targetPosition[1], z: targetPosition[2] } as any,
        0.05
      )
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      maxPolarAngle={Math.PI / 2}
      minDistance={5}
      maxDistance={50}
      target={[0, 0, 0]}
    />
  )
}
