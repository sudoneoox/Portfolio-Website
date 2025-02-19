import "../../styles/output.css";
import { useTheme } from "../../config.tsx";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { EffectComposer, Noise, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Scene from "./r3f/Scene.jsx";

const Playground = () => {
  return (
    <div className="playground-container">
      <CanvasContainer />
    </div>
  );
};

const CanvasContainer = () => {
  const { isDarkMode } = useTheme();
  const DEBUG_MODE = false;

  return (
    <Canvas
      className="playground-container-canvas"
      id="playground-container-canvas"
      camera={{ position: [0, 0, 4] }}
      style={{
        background: isDarkMode ? "#1a1a1a" : "#f5f5f5",
      }}
    >
      <Scene />
      <EffectComposer multisampling={0}>
        <Noise
          opacity={isDarkMode ? 0.35 : 0.15}
          premultiply
          blendFunction={
            isDarkMode ? BlendFunction.HARD_LIGHT : BlendFunction.SOFT_LIGHT
          }
        />
        <Bloom
          intensity={isDarkMode ? 0.7 : 0.05}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
        />
        {DEBUG_MODE && (
          <>
            <OrbitControls />
            <Stats />
          </>
        )}
      </EffectComposer>
    </Canvas>
  );
};

export default Playground;
