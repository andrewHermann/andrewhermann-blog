import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Background digital mesh
const BackgroundDigitalMesh = () => {
  const meshRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { viewport } = useThree();
  
  const { geometry, originalPositions } = useMemo(() => {
    const width = 80;
    const height = 50;
    const widthSegments = 120;
    const heightSegments = 80;
    
    const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    const positions = geometry.attributes.position.array;
    const originalPositions = Float32Array.from(positions);
    
    return { geometry, originalPositions };
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x: x * viewport.width / 2, y: y * viewport.height / 2 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);
  
  useFrame((state) => {
    if (meshRef.current && originalPositions) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      
      const positions = meshRef.current.geometry.attributes.position.array;
      const repelDistance = 25;
      const repelStrength = 8;
      
      for (let i = 0; i < positions.length; i++) {
        positions[i] = originalPositions[i];
      }
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        const distance = Math.sqrt(
          Math.pow(x - mouse.x, 2) + 
          Math.pow(y - mouse.y, 2)
        );
        
        if (distance < repelDistance) {
          const repelForce = Math.pow((repelDistance - distance) / repelDistance, 2);
          const angle = Math.atan2(y - mouse.y, x - mouse.x);
          
          positions[i] += Math.cos(angle) * repelForce * repelStrength;
          positions[i + 1] += Math.sin(angle) * repelForce * repelStrength;
          positions[i + 2] += repelForce * repelStrength * 1.5;
        }
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#00ffff"
        wireframe
        transparent
        opacity={0.4}
        emissive="#00ffff"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const SecondaryBackgroundMesh = () => {
  const meshRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { viewport } = useThree();
  
  const { geometry, originalPositions } = useMemo(() => {
    const width = 70;
    const height = 45;
    const widthSegments = 100;
    const heightSegments = 70;
    
    const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    const positions = geometry.attributes.position.array;
    const originalPositions = Float32Array.from(positions);
    
    return { geometry, originalPositions };
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x: x * viewport.width / 2, y: y * viewport.height / 2 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);
  
  useFrame((state) => {
    if (meshRef.current && originalPositions) {
      meshRef.current.rotation.x = -state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = -state.clock.elapsedTime * 0.03;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.08;
      
      const positions = meshRef.current.geometry.attributes.position.array;
      const repelDistance = 20;
      const repelStrength = 6;
      
      for (let i = 0; i < positions.length; i++) {
        positions[i] = originalPositions[i];
      }
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        const distance = Math.sqrt(
          Math.pow(x - mouse.x, 2) + 
          Math.pow(y - mouse.y, 2)
        );
        
        if (distance < repelDistance) {
          const repelForce = Math.pow((repelDistance - distance) / repelDistance, 2);
          const angle = Math.atan2(y - mouse.y, x - mouse.x);
          
          positions[i] += Math.cos(angle) * repelForce * repelStrength;
          positions[i + 1] += Math.sin(angle) * repelForce * repelStrength;
          positions[i + 2] += repelForce * repelStrength * 1.2;
        }
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -8]}>
      <meshStandardMaterial
        color="#ff0080"
        wireframe
        transparent
        opacity={0.3}
        emissive="#ff0080"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
};

// Subtle camera movement for background
const BackgroundCameraController = () => {
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
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 1, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 1, 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 25 + Math.sin(state.clock.elapsedTime * 0.2) * 1, 0.02);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

const ThreeScene = () => {
  return (
    <Canvas
      className="hero-3d-canvas"
      camera={{ position: [0, 0, 25], fov: 75 }}
      style={{ background: 'transparent' }}
    >
      <BackgroundCameraController />
      
      {/* Subtle background lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.2} color="#ffffff" />
      <pointLight position={[-15, -15, -15]} intensity={0.4} color="#00ffff" />
      <pointLight position={[15, -15, -15]} intensity={0.4} color="#ff0080" />
      
      {/* Background digital meshes */}
      <BackgroundDigitalMesh />
      <SecondaryBackgroundMesh />
    </Canvas>
  );
};

export default ThreeScene;
