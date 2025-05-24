
import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraController } from './navigation/CameraController'
import { SpawnZone } from './zones/SpawnZone'
import { useGameState } from '../store/gameState'

export const Scene = () => {
  const setLoading = useGameState((state) => state.setLoading)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [setLoading])

  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 10], fov: 75 }}
      style={{ background: '#0a0a0a' }}
    >
      {/* Lighting setup */}
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight 
        position={[0, 10, 0]} 
        intensity={0.5} 
        color="#00ff88" 
      />

      {/* Fog for atmosphere */}
      <fog attach="fog" args={['#0a0a0a', 10, 100]} />

      <Suspense fallback={null}>
        {/* Camera controls */}
        <CameraController />
        
        {/* Spawn zone */}
        <SpawnZone />
        
        {/* Ground plane */}
        <mesh position={[0, -1, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </Suspense>
    </Canvas>
  )
}
