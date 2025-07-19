import React, { useRef, useLayoutEffect, Suspense, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

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

// Robot component that loads the GLB model with built-in animations
const Robot = () => {
  const group = useRef();
  const { scene, animations } = useGLTF('/ai-3d-robot.glb');
  const { actions, mixer } = useAnimations(animations, group);
  
  // State for interactive controls
  const [currentAnimation, setCurrentAnimation] = useState('Idle');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: Math.PI }); // Face forward
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (scene) {
      scene.scale.set(22.5, 22.5, 22.5); // Reduced scale (25% of original)
      scene.position.set(0, -10, 0); // Adjusted position
      scene.rotation.y = Math.PI; // Face forward
      
      // Apply strategic coloring to highlight details
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          console.log('Mesh:', child.name, 'Material:', child.material.name);
          
          // Clone material to avoid affecting other instances
          child.material = child.material.clone();
          
          const name = (child.name || '').toLowerCase();
          const materialName = (child.material.name || '').toLowerCase();
          const combinedName = `${name} ${materialName}`;
          
          // Skin/Body parts - fair skin tone
          if (combinedName.includes('skin') || combinedName.includes('body') || 
              combinedName.includes('head') || combinedName.includes('face') ||
              combinedName.includes('neck') || combinedName.includes('arm') ||
              combinedName.includes('hand') || combinedName.includes('leg') ||
              combinedName.includes('foot') || combinedName.includes('torso')) {
            child.material.color.setHex(0xfdbcb4); // Fair skin
          }
          
          // Eyes - blue
          else if (combinedName.includes('eye') || combinedName.includes('pupil') ||
                   combinedName.includes('iris')) {
            child.material.color.setHex(0x4a90e2); // Blue eyes
          }
          
          // Hair - brown
          else if (combinedName.includes('hair') || combinedName.includes('scalp')) {
            child.material.color.setHex(0x8b7355); // Light brown hair
          }
          
          // Clothing - various colors
          else if (combinedName.includes('shirt') || combinedName.includes('top')) {
            child.material.color.setHex(0x2c5aa0); // Blue shirt
          }
          else if (combinedName.includes('pants') || combinedName.includes('trouser')) {
            child.material.color.setHex(0x4a4a4a); // Dark gray pants
          }
          else if (combinedName.includes('shoe') || combinedName.includes('boot')) {
            child.material.color.setHex(0x654321); // Brown shoes
          }
          
          // Accessories
          else if (combinedName.includes('button') || combinedName.includes('zipper')) {
            child.material.color.setHex(0x888888); // Gray accessories
          }
          
          // Default enhancement - brighten very dark parts
          else {
            const currentColor = child.material.color;
            if (currentColor.r < 0.2 && currentColor.g < 0.2 && currentColor.b < 0.2) {
              // Brighten very dark parts with a subtle color
              child.material.color.setHex(0x666666);
            }
          }
          
          // Ensure proper material properties for visibility
          if (child.material.type === 'MeshStandardMaterial') {
            child.material.roughness = 0.7;
            child.material.metalness = 0.1;
          }
        }
      });
      
      console.log('Robot loaded with built-in animations:', Object.keys(actions));
    }
  }, [scene, actions]);

  // Set up initial animation
  useEffect(() => {
    if (actions) {
      console.log('Available animations:', Object.keys(actions));
      
      // Stop all actions first
      Object.keys(actions).forEach(actionName => {
        actions[actionName]?.stop();
      });
      
      // Start the idle animation by default
      if (actions.Idle) {
        actions.Idle.play();
        setCurrentAnimation('Idle');
        console.log('Playing Idle animation');
      }
    }
  }, [actions]);

  // Handle click for animation switching
  const handleClick = (event) => {
    if (actions && !isDragging) {
      event.stopPropagation();
      
      // Switch between Idle and Pose animations
      const nextAnimation = currentAnimation === 'Idle' ? 'Pose' : 'Idle';
      
      if (actions[nextAnimation]) {
        // Fade out current animation
        if (actions[currentAnimation]) {
          actions[currentAnimation].fadeOut(0.5);
        }
        
        // Fade in new animation
        actions[nextAnimation].reset().fadeIn(0.5).play();
        setCurrentAnimation(nextAnimation);
        console.log(`Switched to ${nextAnimation} animation`);
      }
    }
  };

  // Mouse and touch event handlers for rotation
  useEffect(() => {
    const handleMouseDown = (event) => {
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY });
      setLastTouch({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;
      
      const deltaX = event.clientX - lastTouch.x;
      const deltaY = event.clientY - lastTouch.y;
      
      setRotation(prev => ({
        x: prev.x + deltaY * 0.01,
        y: prev.y + deltaX * 0.01
      }));
      
      setLastTouch({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX, y: touch.clientY });
      setLastTouch({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchMove = (event) => {
      if (!isDragging) return;
      
      const touch = event.touches[0];
      const deltaX = touch.clientX - lastTouch.x;
      const deltaY = touch.clientY - lastTouch.y;
      
      setRotation(prev => ({
        x: prev.x + deltaY * 0.01,
        y: prev.y + deltaX * 0.01
      }));
      
      setLastTouch({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    // Add event listeners to the robot container
    const robotContainer = document.querySelector('.hero-robot-canvas');
    if (robotContainer) {
      robotContainer.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      robotContainer.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (robotContainer) {
        robotContainer.removeEventListener('mousedown', handleMouseDown);
        robotContainer.removeEventListener('touchstart', handleTouchStart);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, lastTouch]);

  // Apply rotation from user interaction
  useFrame((state) => {
    if (group.current) {
      // Apply user rotation
      group.current.rotation.x = rotation.x;
      group.current.rotation.y = rotation.y;
      
      // Add subtle mouse hover effect when not dragging
      if (!isDragging) {
        const { mouse } = state;
        group.current.rotation.y = rotation.y + Math.sin(mouse.x * 0.1) * 0.05;
      }
    }
  });

  return (
    <group ref={group} onClick={handleClick}>
      <primitive object={scene} />
    </group>
  );
};

const SafeRobot = () => {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <Robot />
    </Suspense>
  );
};

export default SafeRobot;
