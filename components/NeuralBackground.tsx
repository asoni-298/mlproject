'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function NeuralField() {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const count = 2200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = 8 + (i % 40) * 0.12;
      const angle = i * 0.31;
      const spiral = ((i % 120) - 60) * 0.05;

      positions[i * 3] = Math.cos(angle) * radius + Math.sin(i * 0.17) * 1.2;
      positions[i * 3 + 1] = spiral;
      positions[i * 3 + 2] = Math.sin(angle) * radius + Math.cos(i * 0.11) * 1.1;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Points positions={particles} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#38BDF8"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
        />
      </Points>
      <mesh position={[0, 0, -6]}>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshBasicMaterial color="#6366F1" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

export default function NeuralBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <color attach="background" args={['#0B0F19']} />
        <fog attach="fog" args={['#0B0F19', 8, 16]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 4, 4]} color="#38BDF8" intensity={12} distance={14} />
        <pointLight position={[-5, -2, 6]} color="#6366F1" intensity={10} distance={14} />
        <NeuralField />
      </Canvas>
    </div>
  );
}
