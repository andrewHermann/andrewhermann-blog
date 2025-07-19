import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import SafeRobot from './Robot';

// Fallback test component
const TestCube = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

// Subtle camera movement for the robot
const InteractiveCameraController = () => {
  const { camera } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame((state) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 10, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 10, 0.03);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 100 + Math.sin(state.clock.elapsedTime * 0.2) * 3, 0.02);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

const ThreeScene = () => {
  const [useRobot, setUseRobot] = useState(true);
  
  return (
    <Canvas
      className="hero-robot-canvas"
      camera={{ position: [0, 0, 100], fov: 75 }}
      style={{ width: '100%', height: '100%' }}
    >
      <InteractiveCameraController />
      
      {/* Enhanced lighting for better robot visibility */}
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight position={[20, 20, 10]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-20, 20, 10]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[0, -20, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 0, 20]} intensity={1.0} color="#ffffff" />
      <pointLight position={[30, 30, 30]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-30, 30, 30]} intensity={0.7} color="#ffffff" />
      <spotLight position={[0, 50, 50]} intensity={0.6} color="#ffffff" angle={Math.PI / 4} />
      
      {/* Robot in its own container */}
      {useRobot ? (
        <SafeRobot />
      ) : (
        <TestCube />
      )}
    </Canvas>
  );
};

export default ThreeScene;
