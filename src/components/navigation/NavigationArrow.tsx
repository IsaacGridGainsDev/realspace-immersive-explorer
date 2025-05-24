
import { Text, Float } from '@react-three/drei'
import { useGameState } from '../../store/gameState'
import { useState } from 'react'

interface NavigationArrowProps {
  position: [number, number, number]
  target: 'spawn' | 'listings' | 'about' | 'contact'
  label: string
}

export const NavigationArrow = ({ position, target, label }: NavigationArrowProps) => {
  const [hovered, setHovered] = useState(false)
  const setZone = useGameState((state) => state.setZone)

  const handleClick = () => {
    console.log(`Navigating to ${target} zone`)
    setZone(target)
  }

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        {/* Arrow mesh */}
        <mesh
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.2 : 1}
        >
          <coneGeometry args={[0.5, 2, 8]} />
          <meshStandardMaterial 
            color={hovered ? "#00ff88" : "#0066ff"} 
            emissive={hovered ? "#004422" : "#001133"}
          />
        </mesh>
        
        {/* Label text */}
        <Text
          position={[0, -2, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </Float>
    </group>
  )
}
