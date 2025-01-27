import { useTheme } from "../../../config.tsx";
import { useRef } from "react";

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

export default Background;
