
import { useGameState } from '../../store/gameState'

export const LoadingScreen = () => {
  const isLoading = useGameState((state) => state.isLoading)

  if (!isLoading) return null

  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <h2 style={{ marginTop: '20px', color: '#00ff88' }}>Loading RealSpace...</h2>
      <p style={{ color: '#cccccc' }}>Initializing immersive experience</p>
    </div>
  )
}
