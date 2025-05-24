
import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
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
      style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, #1a1a2e 100%)' }}
    >
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#ffffff"
      />
      <pointLight 
        position={[0, 10, 0]} 
        intensity={0.8} 
        color="#00ff88" 
        distance={50}
      />
      <pointLight 
        position={[5, 5, 5]} 
        intensity={0.3} 
        color="#0066ff" 
        distance={30}
      />

      {/* Environment and atmosphere */}
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Enhanced fog for atmosphere */}
      <fog attach="fog" args={['#0a0a0a', 20, 150]} />

      <Suspense fallback={null}>
        {/* Camera controls */}
        <CameraController />
        
        {/* Spawn zone */}
        <SpawnZone />
        
        {/* Enhanced ground plane */}
        <mesh position={[0, -1, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial 
            color="#111111" 
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Additional ambient lighting mesh for better visibility */}
        <mesh position={[0, 20, 0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial 
            color="#00ff88" 
            transparent 
            opacity={0.1}
          />
        </mesh>
      </Suspense>
    </Canvas>
  )
}
