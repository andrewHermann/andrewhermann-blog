import React, { useRef, useLayoutEffect, Suspense, useState, useEffect } from react;
import { useFrame } from @react-three/fiber;
import { useGLTF } from @react-three/drei;
import * as THREE from three;

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
  const { scene } = useGLTF(/ai-3d-robot.glb);
  
  // State for fall animation
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(idle);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  // State for drag and touch controls
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: -Math.PI / 2 });
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRotation, setCurrentRotation] = useState(0);

  useLayoutEffect(() => {
    if (scene) {
      scene.scale.set(90, 90, 90);
      scene.position.set(0, -10, 0);
      scene.rotation.y = -Math.PI / 2;
      
      // Apply strategic coloring with enhanced lighting
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          const name = (child.name || ).toLowerCase();
          const materialName = (child.material.name || ).toLowerCase();
          const combinedName = `${name} ${materialName}`;
          
          if (combinedName.includes(skin) || combinedName.includes(body) || 
              combinedName.includes(head) || combinedName.includes(face) ||
              combinedName.includes(neck) || combinedName.includes(arm) ||
              combinedName.includes(hand) || combinedName.includes(leg) ||
              combinedName.includes(foot) || combinedName.includes(torso)) {
            child.material.color.setHex(0xfdbcb4);
          } else if (combinedName.includes(eye) || combinedName.includes(pupil) || combinedName.includes(iris)) {
            child.material.color.setHex(0x4a90e2);
          } else if (combinedName.includes(hair) || combinedName.includes(scalp)) {
            child.material.color.setHex(0x8b7355);
          } else if (combinedName.includes(shirt) || combinedName.includes(top)) {
            child.material.color.setHex(0x2c5aa0);
          } else if (combinedName.includes(pants) || combinedName.includes(trouser)) {
            child.material.color.setHex(0x4a4a4a);
          } else if (combinedName.includes(shoe) || combinedName.includes(boot)) {
            child.material.color.setHex(0x654321);
          } else if (combinedName.includes(button) || combinedName.includes(zipper)) {
            child.material.color.setHex(0x888888);
          } else {
            const currentColor = child.material.color;
            if (currentColor.r < 0.2 && currentColor.g < 0.2 && currentColor.b < 0.2) {
              child.material.color.setHex(0x999999);
            }
          }
          
          if (child.material.type === MeshStandardMaterial) {
            child.material.roughness = 0.5;
            child.material.metalness = 0.1;
            child.material.emissive = new THREE.Color(0x111111);
            child.material.emissiveIntensity = 0.05;
          }
        }
      });
      
    }
  }, [scene]);

  const handleClick = (event) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setAnimationPhase(falling);
      setAnimationProgress(0);
      setCurrentRotation(group.current.rotation.y);
      event.stopPropagation();
    }
  };

  useEffect(() => {
    // Track mouse movement globally on the entire window
    const handleGlobalMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleInteractionStart = (clientX, clientY) => {
        if (!isAnimating) {
            setIsDragging(true);
            setDragStart({ x: clientX, y: clientY });
            setLastTouch({ x: clientX, y: clientY });
        }
    };

    const handleInteractionMove = (clientX, clientY) => {
        if (!isDragging || isAnimating) return;
        const deltaX = clientX - lastTouch.x;
        const deltaY = clientY - lastTouch.y;
        setRotation(prev => ({ x: prev.x + deltaY * 0.01, y: prev.y + deltaX * 0.01 }));
        setLastTouch({ x: clientX, y: clientY });
    };

    const handleInteractionEnd = () => {
        setIsDragging(false);
    };

    const handleMouseDown = (event) => handleInteractionStart(event.clientX, event.clientY);
    const handleMouseMove = (event) => handleInteractionMove(event.clientX, event.clientY);
    const handleMouseUp = () => handleInteractionEnd();

    const handleTouchStart = (event) => handleInteractionStart(event.touches[0].clientX, event.touches[0].clientY);
    const handleTouchMove = (event) => handleInteractionMove(event.touches[0].clientX, event.touches[0].clientY);
    const handleTouchEnd = () => handleInteractionEnd();

    // Add global mouse tracking
    window.addEventListener(mousemove, handleGlobalMouseMove);

    const robotContainer = document.querySelector(.hero-robot-canvas);
    if (robotContainer) {
      robotContainer.addEventListener(mousedown, handleMouseDown);
      robotContainer.addEventListener(touchstart, handleTouchStart, { passive: true });
      window.addEventListener(mousemove, handleMouseMove);
      window.addEventListener(touchmove, handleTouchMove);
      window.addEventListener(mouseup, handleMouseUp);
      window.addEventListener(touchend, handleTouchEnd);
    }

    return () => {
      window.removeEventListener(mousemove, handleGlobalMouseMove);
      
      if (robotContainer) {
        robotContainer.removeEventListener(mousedown, handleMouseDown);
        robotContainer.removeEventListener(touchstart, handleTouchStart);
      }
      window.removeEventListener(mousemove, handleMouseMove);
      window.removeEventListener(touchmove, handleTouchMove);
      window.removeEventListener(mouseup, handleMouseUp);
      window.removeEventListener(touchend, handleTouchEnd);
    };
  }, [isDragging, lastTouch, isAnimating]);

  useFrame((state) => {
    if (group.current) {
      if (isAnimating) {
        if (animationPhase === falling) {
          setAnimationProgress(prev => prev + 0.04);
          const fallRotation = Math.sin(animationProgress) * 0.8;
          group.current.rotation.x = fallRotation;
          group.current.position.y = -10 - Math.sin(animationProgress) * 5;
          if (animationProgress >= Math.PI / 2) {
            setAnimationPhase(down);
            setAnimationProgress(0);
          }
        } else if (animationPhase === down) {
          setAnimationProgress(prev => prev + 0.02);
          group.current.rotation.x = 0.8;
          group.current.position.y = -15;
          if (animationProgress >= 1) {
            setAnimationPhase(getting_up);
            setAnimationProgress(0);
          }
        } else if (animationPhase === getting_up) {
          setAnimationProgress(prev => prev + 0.04);
          const upRotation = 0.8 - (Math.sin(animationProgress) * 0.8);
          group.current.rotation.x = upRotation;
          group.current.position.y = -15 + (Math.sin(animationProgress) * 5);
          if (animationProgress >= Math.PI / 2) {
            group.current.rotation.x = 0;
            group.current.position.y = -10;
            setIsAnimating(false);
            setAnimationPhase(idle);
            setAnimationProgress(0);
          }
        }
      } else {
        // JUMPING ANIMATION
        const jumpHeight = 3;
        const jumpSpeed = 3;
        const jumpOffset = Math.sin(state.clock.elapsedTime * jumpSpeed) * jumpHeight;
        group.current.position.y = -10 + jumpOffset;

        // IMPROVED MOUSE FOLLOWING - Fixed rotation logic
        if (!isDragging) {
          const robotContainer = document.querySelector(.hero-robot-canvas);
          if (robotContainer) {
            const canvasRect = robotContainer.getBoundingClientRect();
            const robotCenterX = canvasRect.left + canvasRect.width / 2;
            const robotCenterY = canvasRect.top + canvasRect.height / 2;
            
            // Calculate relative mouse position from robot center
            const deltaX = mousePosition.x - robotCenterX;
            const deltaY = mousePosition.y - robotCenterY;
            
            // Calculate angle correctly - swap deltaX and deltaY for proper rotation
            const targetAngle = Math.atan2(deltaX, deltaY);
            
            // Apply smooth rotation with proper interpolation
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetAngle, 0.15);
          }
        } else {
          // When dragging, use manual rotation
          group.current.rotation.x = rotation.x;
          group.current.rotation.y = rotation.y;
        }
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

