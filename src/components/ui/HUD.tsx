
import { useGameState } from '../../store/gameState'

export const HUD = () => {
  const { currentZone, playerPosition, isMoving } = useGameState()

  return (
    <>
      <div className="hud">
        <div>Zone: {currentZone.toUpperCase()}</div>
        <div>Position: ({playerPosition[0].toFixed(1)}, {playerPosition[1].toFixed(1)}, {playerPosition[2].toFixed(1)})</div>
        <div>Status: {isMoving ? 'Moving' : 'Idle'}</div>
      </div>
      
      <div className="controls-info">
        <div>Controls:</div>
        <div>WASD - Move</div>
        <div>Mouse - Look Around</div>
        <div>Click - Interact</div>
      </div>
    </>
  )
}
