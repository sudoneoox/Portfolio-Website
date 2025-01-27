import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTheme } from "../../../config.tsx";
import BubbleExplosion from "./BubbleExplosion.jsx";

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

export default BubbleField;
