
import { Text, Float, Sparkles } from '@react-three/drei'
import { NavigationArrow } from '../navigation/NavigationArrow'

export const SpawnZone = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Welcome Text */}
      <Float speed={1.5} rotationIntensity={0.2}>
        <Text
          position={[0, 3, 0]}
          fontSize={1.5}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          font="/fonts/courier.woff"
        >
          Welcome to RealSpace
        </Text>
      </Float>
      
      {/* Subtitle */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.8}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
      >
        Immersive Real Estate Experience
      </Text>
      
      {/* Platform */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[8, 8, 1, 32]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.8} 
          metalness={0.2} 
        />
      </mesh>
      
      {/* Center glow */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 16]} />
        <meshStandardMaterial 
          color="#00ff88" 
          emissive="#00ff88" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Ambient particles */}
      <Sparkles count={50} scale={10} size={2} speed={0.4} color="#00ff88" />
      
      {/* Navigation arrows to other zones */}
      <NavigationArrow 
        position={[6, 1, 0]} 
        target="listings"
        label="Properties"
      />
      <NavigationArrow 
        position={[-6, 1, 0]} 
        target="about"
        label="About Us"
      />
      <NavigationArrow 
        position={[0, 1, 6]} 
        target="contact"
        label="Contact"
      />
    </group>
  )
}
