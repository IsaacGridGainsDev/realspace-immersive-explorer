
import { Scene } from "../components/Scene";
import { HUD } from "../components/ui/HUD";
import { LoadingScreen } from "../components/ui/LoadingScreen";

const Index = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Scene />
      <HUD />
      <LoadingScreen />
    </div>
  );
};

export default Index;
