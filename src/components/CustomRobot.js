import React, { useRef, useLayoutEffect, Suspense, useState, useEffect } from 'react';
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
const CustomRobotCore = ({ bodyColor = "#4a90e2", glowColor = "#ffffff" }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('/ai-3d-robot.glb');
  const { actions, mixer } = useAnimations(animations, group);
  
  // State for interactive controls
  const [currentAnimation, setCurrentAnimation] = useState('Idle');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: Math.PI }); // Face forward
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [dragDistance, setDragDistance] = useState(0);
  const [isPlayingPose, setIsPlayingPose] = useState(false);
  const [isPlayingReverse, setIsPlayingReverse] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useLayoutEffect(() => {
    if (scene) {
      scene.scale.set(16.875, 16.875, 16.875); // Further reduced scale (25% smaller than previous)
      scene.position.set(0, 10, 0); // Adjusted position - moved up another 10 units
      scene.rotation.y = Math.PI; // Face forward
      
      // Apply strategic coloring with white body
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.isMesh && child.material) {
          console.log('Mesh:', child.name, 'Material:', child.material.name);
          
          // Clone material to avoid affecting other instances
          child.material = child.material.clone();
          
          const name = (child.name || '').toLowerCase();
          const materialName = (child.material.name || '').toLowerCase();
          const combinedName = `${name} ${materialName}`;
          
          // Body parts - BRIGHT WHITE
          if (combinedName.includes('body') || combinedName.includes('armorout') || 
              combinedName.includes('armorin') || combinedName.includes('torso') ||
              combinedName.includes('chest') || combinedName.includes('main')) {
            child.material.color.setHex(0xffffff); // Bright white
            child.material.roughness = 0.3;
            child.material.metalness = 0.1;
          }
          
          // Head/Face - light skin tone for contrast
          else if (combinedName.includes('head') || combinedName.includes('face') ||
                   combinedName.includes('neck') || combinedName.includes('skin')) {
            child.material.color.setHex(0xfdbcb4); // Fair skin
            child.material.roughness = 0.7;
            child.material.metalness = 0.1;
          }
          
          // Eyes - blue
          else if (combinedName.includes('eye') || combinedName.includes('pupil') ||
                   combinedName.includes('iris')) {
            child.material.color = new THREE.Color(bodyColor); // Custom color eyes
            child.material.roughness = 0.2;
            child.material.metalness = 0.0;
          }
          
          // Hair - brown
          else if (combinedName.includes('hair') || combinedName.includes('scalp')) {
            child.material.color.setHex(0x8b7355); // Light brown hair
            child.material.roughness = 0.8;
            child.material.metalness = 0.0;
          }
          
          // Lights/Technology parts - bright blue/cyan for tech feel
          else if (combinedName.includes('light') || combinedName.includes('tech') ||
                   combinedName.includes('glow') || combinedName.includes('led')) {
            child.material.color = new THREE.Color(bodyColor); // Custom color lights
            child.material.emissive = new THREE.Color(bodyColor).multiplyScalar(0.3); // Custom glow
            child.material.roughness = 0.1;
            child.material.metalness = 0.8;
          }
          
          // Arms and legs - white to match body
          else if (combinedName.includes('arm') || combinedName.includes('hand') || 
                   combinedName.includes('leg') || combinedName.includes('foot')) {
            child.material.color.setHex(0xf8f8f8); // Slightly off-white
            child.material.roughness = 0.4;
            child.material.metalness = 0.2;
          }
          
          // Decorative elements - subtle gray
          else if (combinedName.includes('decor') || combinedName.includes('detail') ||
                   combinedName.includes('trim')) {
            child.material.color.setHex(0xe0e0e0); // Light gray
            child.material.roughness = 0.5;
            child.material.metalness = 0.3;
          }
          
          // Default enhancement - make sure nothing is too dark
          else {
            const currentColor = child.material.color;
            if (currentColor.r < 0.3 && currentColor.g < 0.3 && currentColor.b < 0.3) {
              // Brighten dark parts
              child.material.color.setHex(0xcccccc);
            }
            // Ensure proper material properties for good lighting
            child.material.roughness = child.material.roughness || 0.5;
            child.material.metalness = child.material.metalness || 0.2;
          }
        }
      });
      
      console.log('CustomRobotCore loaded with white body and enhanced lighting materials');
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
        actions.Idle.setLoop(THREE.LoopRepeat).play();
        actions.Idle.timeScale = 2; // 2x speed
        setCurrentAnimation('Idle');
        console.log('Playing Idle animation on loop');
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
            console.log('Pose animation finished forward, playing in reverse');
            setIsPlayingReverse(true);
            
            // Set up reverse playback
            actions.Pose.reset();
            actions.Pose.setLoop(THREE.LoopOnce);
            actions.Pose.timeScale = -2; // Reverse playback 2x speed
            actions.Pose.time = actions.Pose.getClip().duration; // Start from the end
            actions.Pose.play();
          } else if (isPlayingPose && isPlayingReverse) {
            // Reverse animation finished, return to Idle
            console.log('Pose animation finished in reverse, returning to Idle');
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
      console.log('Playing Pose animation forward');
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
      
      // Smooth zoom effect on hover
      const targetZ = isHovered ? 15 : 0; // Move closer to camera on hover
      const targetScale = isHovered ? 1.15 : 1.0; // Slightly larger on hover
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.08);
      
      // Apply hover scale effect
      const currentScale = group.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
      group.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <>
      {/* Stationary lights - do not rotate with the model */}
      {/* Bright blue directional light from top left */}
      <directionalLight
        position={[-10, 10, 5]}
        intensity={3.0}
        color="#0088ff"
        castShadow={false}
      />
      {/* Bright blue directional light from top right */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={3.0}
        color="#0088ff"
        castShadow={false}
      />
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.9} color="#ffffff" />
      {/* Front directional white light for front visibility */}
      <directionalLight
        position={[0, 12, 15]}
        intensity={2.7}
        color="#ffffff"
        castShadow={false}
      />
      {/* Red directional light from top front */}
      <directionalLight
        position={[0, 15, 10]}
        intensity={2.25}
        color="#ff4444"
        castShadow={false}
      />
      {/* Red directional light from top back */}
      <directionalLight
        position={[0, 15, -10]}
        intensity={2.25}
        color="#ff4444"
        castShadow={false}
      />
      
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

const SafeCustomRobotCore = ({ bodyColor, glowColor }) => {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <CustomRobotCore />
    </Suspense>
  );
};

// Main component with error boundary
const CustomRobot = ({ bodyColor, glowColor }) => {
  const [hasError, setHasError] = useState(false);

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
