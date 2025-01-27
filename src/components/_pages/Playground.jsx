import "../../styles/output.css";
import { useState, useRef, useMemo, useEffect } from "react";
import { useTheme } from "../../config.tsx";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { EffectComposer, Noise, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Playground = () => {
  return (
    <div className="playground-container">
      <CanvasContainer />
    </div>
  );
};

const CanvasContainer = () => {
  const { isDarkMode } = useTheme();
  const DEBUG_MODE = true;

  return (
    <Canvas
      className="playground-container-canvas"
      id="playground-container-canvas"
      camera={{ position: [0, 0, 4] }}
      style={{
        background: isDarkMode ? "#1a1a1a" : "#f1f1f1",
      }}
    >
      <Scene />
      <EffectComposer multisampling={0}>
        <Noise
          opacity={isDarkMode ? 0.3 : 0.15}
          premultiply
          blendFunction={BlendFunction.SOFT_LIGHT}
        />
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
        />
        {DEBUG_MODE && <Stats />}
      </EffectComposer>
    </Canvas>
  );
};

const Scene = () => {
  return (
    <>
      <Background />
      <BubbleField />
    </>
  );
};

const Background = () => {
  const { isDarkMode } = useTheme();
  const meshRef = useRef();

  return (
    <mesh position={[0, 0, -1]} ref={meshRef}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial color={isDarkMode ? "#1a1a1a" : "#f5f5f5"} />
    </mesh>
  );
};

const BubbleExplosion = ({ position, color }) => {
  const groupRef = useRef();

  useEffect(() => {
    // Initialize particle positions and velocities
    const particles = groupRef.current.children;
    particles.forEach((particle, i) => {
      const angle = (i / 8) * Math.PI * 2;
      particle.userData.velocity = {
        x: Math.cos(angle) * 0.1,
        y: Math.sin(angle) * 0.1,
      };
    });
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((particle) => {
        particle.position.x += particle.userData.velocity.x;
        particle.position.y += particle.userData.velocity.y;
        particle.scale.multiplyScalar(0.95);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[position[0], position[1], position[2]]}
          scale={[1, 1, 1]}
        >
          <circleGeometry args={[0.1, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};
const Bubble = ({ position, speed, size, color, drift, onExplode }) => {
  const meshRef = useRef();
  const [isExploded, setIsExploded] = useState(false);
  const { isDarkMode } = useTheme();

  useFrame(() => {
    if (meshRef.current && !isExploded) {
      meshRef.current.position.y -= speed;
      meshRef.current.position.x += Math.sin(Date.now() * 0.001 + drift) * 0.02;

      if (meshRef.current.position.y < -4.5) {
        meshRef.current.removeFromParent();
      }
    }
  });

  const handleClick = (event) => {
    event.stopPropagation();
    if (!isExploded) {
      setIsExploded(true);
      onExplode(position, color);
      meshRef.current.removeFromParent();
    }
  };

  return (
    <mesh ref={meshRef} position={position} onClick={handleClick}>
      <circleGeometry args={[size, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={isDarkMode ? 0.8 : 0.85}
      />
    </mesh>
  );
};

const BubbleField = () => {
  const [bubbles, setBubbles] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const { isDarkMode } = useTheme();

  const lightColors = ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA", "#FFB3F7"];

  const darkColors = ["#FF69B4", "#4CAF50", "#4169E1", "#FFD700", "#9370DB"];

  const handleExplode = (position, color) => {
    const explosionId = Date.now();
    setExplosions((prev) => [...prev, { id: explosionId, position, color }]);
    setTimeout(() => {
      setExplosions((prev) => prev.filter((exp) => exp.id !== explosionId));
    }, 500); // Reduced to 500ms since particles fade faster
  };

  useFrame(() => {
    if (Math.random() < 0.05) {
      const newBubble = {
        id: Math.random(),
        position: [(Math.random() - 0.5) * 10, 10, 0],
        speed: 0.01 + Math.random() * 0.009,
        size: 0.2 + Math.random() * 0.6,
        drift: Math.random() * Math.PI * 2,
        color: isDarkMode
          ? darkColors[Math.floor(Math.random() * darkColors.length)]
          : lightColors[Math.floor(Math.random() * lightColors.length)],
      };
      setBubbles((prev) => [...prev, newBubble]);
    }
  });

  return (
    <>
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} {...bubble} onExplode={handleExplode} />
      ))}
      {explosions.map((explosion) => (
        <BubbleExplosion
          key={explosion.id}
          position={explosion.position}
          color={explosion.color}
        />
      ))}
    </>
  );
};

export default Playground;
