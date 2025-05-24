
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Scene } from "./components/Scene";
import { HUD } from "./components/ui/HUD";
import { LoadingScreen } from "./components/ui/LoadingScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Scene />
        <HUD />
        <LoadingScreen />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
