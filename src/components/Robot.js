import React, { useRef, useLayoutEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

// Fallback component while loading
const LoadingPlaceholder = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

// Robot component that loads the GLB model
const Robot = () => {
  const group = useRef();
  const { scene } = useGLTF('/ai-3d-robot.glb');

  useLayoutEffect(() => {
    if (scene) {
      scene.scale.set(90, 90, 90); // 3x bigger scale
      scene.position.set(0, -10, 0); // Adjusted position for much larger model
      console.log('Robot loaded successfully with extra large scale!');
    }
  }, [scene]);

  useFrame((state) => {
    if (group.current) {
      const { mouse } = state;
      // Simple mouse interaction
      group.current.rotation.y = Math.sin(mouse.x * 0.1) * 0.1;
    }
  });

  return <primitive ref={group} object={scene} />;
};

// Wrapped Robot with Suspense for safe loading
const SafeRobot = () => {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <Robot />
    </Suspense>
  );
};

export default SafeRobot;
