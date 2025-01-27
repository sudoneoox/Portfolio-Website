import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

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

export default BubbleExplosion;
