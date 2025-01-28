import { useTheme } from "../../../config.tsx";
import { useRef } from "react";

const Background = () => {
  const { isDarkMode } = useTheme();
  const meshRef = useRef();

  return (
    <mesh position={[0, 0, -1]} ref={meshRef}>
      <planeGeometry args={[10.1, 10.1]} />
      <meshBasicMaterial color={isDarkMode ? "#1a1a1a" : "#fffbf1"} />
    </mesh>
  );
};

export default Background;
