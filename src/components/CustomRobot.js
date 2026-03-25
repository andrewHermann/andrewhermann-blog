/*
 * Andrew Hermann Blog
 * Copyright (C) 2024 Andrew Hermann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useRef, useLayoutEffect, Suspense, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Fallback component while loading
const LoadingPlaceholder = ({ bodyColor = "blue" }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color={bodyColor} />
    </mesh>
  );
};

// CustomRobotCore component that loads the GLB model with built-in animations
const CustomRobotCore = ({ bodyColor = "#1e3a5f", glowColor = "#2563eb" }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('/ai-3d-robot.glb');
  const { actions, mixer } = useAnimations(animations, group);

  // State for interactive controls
  const [, setCurrentAnimation] = useState('Idle');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: Math.PI }); // Face forward
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [dragDistance, setDragDistance] = useState(0);
  const [isPlayingPose, setIsPlayingPose] = useState(false);
  const [isPlayingReverse, setIsPlayingReverse] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Ref to the head bone for mouse-tracking look-at
  const headBoneRef = useRef(null);
  // Smoothed head rotation offset (added on top of animation each frame)
  const headRotRef = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (scene) {
      scene.scale.set(16.875, 16.875, 16.875);
      scene.position.set(0, 10, 0);
      scene.rotation.y = Math.PI; // Face forward

      // Color by exact GLB material name — the mesh has 5 primitives:
      // Body (dark base), ArmorOut (outer shell), ArmorIn (inner accent),
      // Lights (emissive elements), Decor (black details)
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          const matName = (child.material.name || '').toLowerCase();

          if (matName === 'body') {
            // Mid-tone navy — dark enough to read against white, light enough to see at 50% opacity
            child.material.color.setHex(0x2a4a7a);
            child.material.roughness = 0.5;
            child.material.metalness = 0.5;
          } else if (matName === 'armorout') {
            // Light silver-blue outer shell — the brightest surface, gives the robot shape
            child.material.color.setHex(0xb8c8e0);
            child.material.roughness = 0.25;
            child.material.metalness = 0.65;
          } else if (matName === 'armorin') {
            // Vivid blue accent from glowColor
            child.material.color.set(glowColor);
            child.material.roughness = 0.25;
            child.material.metalness = 0.5;
          } else if (matName === 'lights') {
            // Glowing elements — strong emissive so they're always visible
            child.material.color.set(glowColor);
            child.material.emissive = new THREE.Color(glowColor).multiplyScalar(0.9);
            child.material.roughness = 0.05;
            child.material.metalness = 0.8;
          } else if (matName === 'decor') {
            // Dark detail lines — readable but not pure black
            child.material.color.setHex(0x1a2540);
            child.material.roughness = 0.8;
            child.material.metalness = 0.2;
          }
        }

        // Find the head bone for look-at tracking
        if (child.name === 'head') {
          headBoneRef.current = child;
        }
      });
    }
  }, [scene, bodyColor, glowColor]);

  // Set up initial animation
  useEffect(() => {
    if (actions) {
      
      // Stop all actions first
      Object.keys(actions).forEach(actionName => {
        actions[actionName]?.stop();
      });
      
      // Start the idle animation by default
      if (actions.Idle) {
        actions.Idle.setLoop(THREE.LoopRepeat).play();
        actions.Idle.timeScale = 2; // 2x speed
        setCurrentAnimation('Idle');
      }
    }
  }, [actions]);

  // Handle animation completion for Pose animations with reverse playback
  useEffect(() => {
    if (mixer && actions && actions.Pose) {
      const onFinished = (event) => {
        if (event.action === actions.Pose) {
          if (isPlayingPose && !isPlayingReverse) {
            // Forward animation finished, now play it backwards
            setIsPlayingReverse(true);
            
            // Set up reverse playback
            actions.Pose.reset();
            actions.Pose.setLoop(THREE.LoopOnce);
            actions.Pose.timeScale = -2; // Reverse playback 2x speed
            actions.Pose.time = actions.Pose.getClip().duration; // Start from the end
            actions.Pose.play();
          } else if (isPlayingPose && isPlayingReverse) {
            // Reverse animation finished, return to Idle
            setIsPlayingPose(false);
            setIsPlayingReverse(false);
            setCurrentAnimation('Idle');
            
            // Reset and transition to Idle
            actions.Pose.timeScale = 2; // 2x speed
            actions.Pose.fadeOut(0.3);
            if (actions.Idle) {
              actions.Idle.reset().fadeIn(0.3).play();
            actions.Idle.timeScale = 2; // 2x speed
            }
          }
        }
      };
      
      mixer.addEventListener('finished', onFinished);
      
      return () => {
        mixer.removeEventListener('finished', onFinished);
      };
    }
  }, [mixer, actions, isPlayingPose, isPlayingReverse]);

  // Play Pose animation once (forward then reverse)
  const playPoseOnce = () => {
    if (actions && actions.Pose && !isPlayingPose) {
      setIsPlayingPose(true);
      setIsPlayingReverse(false);
      setCurrentAnimation('Pose');
      
      // Stop Idle and play Pose forward
      if (actions.Idle) {
        actions.Idle.fadeOut(0.3);
      }
      
      // Reset timescale and play forward
      actions.Pose.timeScale = 2; // 2x speed
      actions.Pose.setLoop(THREE.LoopOnce).reset().fadeIn(0.3).play();
    }
  };

  // Handle click for animation switching
  const handleClick = (event) => {
    // Only trigger if it wasn't a drag (drag distance < 5 pixels)
    if (dragDistance < 5 && !isPlayingPose) {
      event.stopPropagation();
      playPoseOnce();
    }
  };

  // Mouse and touch event handlers for rotation
  useEffect(() => {
    const handleMouseDown = (event) => {
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY });
      setLastTouch({ x: event.clientX, y: event.clientY });
      setDragDistance(0);
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;
      
      const deltaX = event.clientX - lastTouch.x;
      const deltaY = event.clientY - lastTouch.y;
      
      // Calculate total drag distance
      const totalDeltaX = event.clientX - dragStart.x;
      const totalDeltaY = event.clientY - dragStart.y;
      const distance = Math.sqrt(totalDeltaX * totalDeltaX + totalDeltaY * totalDeltaY);
      setDragDistance(distance);
      
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
      setDragDistance(0);
    };

    const handleTouchMove = (event) => {
      if (!isDragging) return;
      
      const touch = event.touches[0];
      const deltaX = touch.clientX - lastTouch.x;
      const deltaY = touch.clientY - lastTouch.y;
      
      // Calculate total drag distance
      const totalDeltaX = touch.clientX - dragStart.x;
      const totalDeltaY = touch.clientY - dragStart.y;
      const distance = Math.sqrt(totalDeltaX * totalDeltaX + totalDeltaY * totalDeltaY);
      setDragDistance(distance);
      
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
  }, [isDragging, lastTouch, dragStart, dragDistance]);

  // Apply rotation from user interaction and hover effects
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = rotation.x;
      group.current.rotation.y = isDragging
        ? rotation.y
        : rotation.y + Math.sin(state.mouse.x * 0.1) * 0.05;

      // Smooth zoom effect on hover
      const targetZ = isHovered ? 15 : 0;
      const targetScale = isHovered ? 1.15 : 1.0;
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.08);
      const newScale = THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.08);
      group.current.scale.set(newScale, newScale, newScale);
    }
  });

  // Head look-at: runs after the animation mixer (priority 1) so the offset
  // is added on top of the animated pose rather than being overwritten by it.
  useFrame((state) => {
    if (!headBoneRef.current) return;
    const { mouse } = state;
    headRotRef.current.x = THREE.MathUtils.lerp(headRotRef.current.x, -mouse.y * 0.25, 0.06);
    headRotRef.current.y = THREE.MathUtils.lerp(headRotRef.current.y, mouse.x * 0.35, 0.06);
    headBoneRef.current.rotation.x += headRotRef.current.x;
    headBoneRef.current.rotation.y += headRotRef.current.y;
  }, 1);

  return (
    <>
      <ambientLight intensity={0.6} color="#dde8ff" />
      <directionalLight position={[2, 8, 12]} intensity={1.8} color="#ffffff" castShadow={false} />
      <directionalLight position={[-8, 4, 4]} intensity={1.0} color="#88aaff" castShadow={false} />
      <directionalLight position={[0, 10, -8]} intensity={0.6} color="#4466cc" castShadow={false} />
      
      {/* Rotating group - only contains the robot model */}
      <group 
        ref={group} 
        onClick={handleClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <primitive object={scene} />
      </group>
    </>
  );
};


// Main component with error boundary
const CustomRobot = ({ bodyColor, glowColor }) => {
  const [hasError] = useState(false);

  if (hasError) {
    return <LoadingPlaceholder bodyColor={bodyColor} />;
  }

  return (
    <Suspense fallback={<LoadingPlaceholder bodyColor={bodyColor} />}>
      <CustomRobotCore bodyColor={bodyColor} glowColor={glowColor} />
    </Suspense>
  );
};

export default CustomRobot;
