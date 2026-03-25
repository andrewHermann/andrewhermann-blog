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
const LoadingPlaceholder = ({ bodyColor = "#1e3a5f" }) => {
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

// CustomRobotCore — mirrors Robot.js structure exactly, adds emissive material fix
const CustomRobotCore = ({ bodyColor = "#1e3a5f", glowColor = "#2563eb" }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('/ai-3d-robot.glb');
  const { actions, mixer } = useAnimations(animations, group);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: Math.PI });
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [dragDistance, setDragDistance] = useState(0);
  const [isPlayingPose, setIsPlayingPose] = useState(false);
  const [isPlayingReverse, setIsPlayingReverse] = useState(false);

  useLayoutEffect(() => {
    if (!scene) return;

    scene.scale.set(16.875, 16.875, 16.875);
    scene.position.set(0, 10, 0);
    scene.rotation.y = Math.PI;

    // drei v10 useGLTF returns raw GLTFLoader result — no buildGraph, so the
    // destructured `materials` dict is undefined. Traverse the scene directly
    // and match by child.material.name. Emissive makes materials self-illuminate
    // at their target color regardless of scene lighting or canvas opacity.
    scene.traverse((child) => {
      if (!child.isMesh) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        if (!mat) return;
        switch (mat.name) {
          case 'Body':
            mat.color.set('#000510');
            mat.emissive.set(bodyColor);
            mat.emissiveIntensity = 1.8;
            mat.roughness = 0.7;
            mat.metalness = 0.0;
            mat.needsUpdate = true;
            break;
          case 'ArmorOut':
            mat.color.set('#000810');
            mat.emissive.setHex(0x2a4878);
            mat.emissiveIntensity = 1.4;
            mat.roughness = 0.5;
            mat.metalness = 0.0;
            mat.needsUpdate = true;
            break;
          case 'ArmorIn':
            mat.color.set('#000510');
            mat.emissive.set(glowColor);
            mat.emissiveIntensity = 1.2;
            mat.roughness = 0.4;
            mat.metalness = 0.0;
            mat.needsUpdate = true;
            break;
          case 'Lights':
            mat.color.set(glowColor);
            mat.emissive.set(glowColor);
            mat.emissiveIntensity = 2.5;
            mat.roughness = 0.05;
            mat.metalness = 0.0;
            mat.needsUpdate = true;
            break;
          case 'Decor':
            mat.color.set('#000000');
            mat.emissive.set(bodyColor);
            mat.emissiveIntensity = 0.6;
            mat.roughness = 0.9;
            mat.metalness = 0.0;
            mat.needsUpdate = true;
            break;
          default:
            break;
        }
      });
    });
  }, [scene, bodyColor, glowColor]);

  useEffect(() => {
    if (actions) {
      Object.keys(actions).forEach(actionName => {
        actions[actionName]?.stop();
      });
      if (actions.Idle) {
        actions.Idle.setLoop(THREE.LoopRepeat).play();
        actions.Idle.timeScale = 2;
      }
    }
  }, [actions]);

  useEffect(() => {
    if (mixer && actions && actions.Pose) {
      const onFinished = (event) => {
        if (event.action === actions.Pose) {
          if (isPlayingPose && !isPlayingReverse) {
            setIsPlayingReverse(true);
            actions.Pose.reset();
            actions.Pose.setLoop(THREE.LoopOnce);
            actions.Pose.timeScale = -2;
            actions.Pose.time = actions.Pose.getClip().duration;
            actions.Pose.play();
          } else if (isPlayingPose && isPlayingReverse) {
            setIsPlayingPose(false);
            setIsPlayingReverse(false);
            actions.Pose.timeScale = 2;
            actions.Pose.fadeOut(0.3);
            if (actions.Idle) {
              actions.Idle.reset().fadeIn(0.3).play();
              actions.Idle.timeScale = 2;
            }
          }
        }
      };
      mixer.addEventListener('finished', onFinished);
      return () => { mixer.removeEventListener('finished', onFinished); };
    }
  }, [mixer, actions, isPlayingPose, isPlayingReverse]);

  const playPoseOnce = () => {
    if (actions && actions.Pose && !isPlayingPose) {
      setIsPlayingPose(true);
      setIsPlayingReverse(false);
      if (actions.Idle) actions.Idle.fadeOut(0.3);
      actions.Pose.timeScale = 2;
      actions.Pose.setLoop(THREE.LoopOnce).reset().fadeIn(0.3).play();
    }
  };

  const handleClick = (event) => {
    if (dragDistance < 5 && !isPlayingPose) {
      event.stopPropagation();
      playPoseOnce();
    }
  };

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
      const totalDeltaX = event.clientX - dragStart.x;
      const totalDeltaY = event.clientY - dragStart.y;
      setDragDistance(Math.sqrt(totalDeltaX ** 2 + totalDeltaY ** 2));
      setRotation(prev => ({ x: prev.x + deltaY * 0.01, y: prev.y + deltaX * 0.01 }));
      setLastTouch({ x: event.clientX, y: event.clientY });
    };
    const handleMouseUp = () => { setIsDragging(false); };
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
      const totalDeltaX = touch.clientX - dragStart.x;
      const totalDeltaY = touch.clientY - dragStart.y;
      setDragDistance(Math.sqrt(totalDeltaX ** 2 + totalDeltaY ** 2));
      setRotation(prev => ({ x: prev.x + deltaY * 0.01, y: prev.y + deltaX * 0.01 }));
      setLastTouch({ x: touch.clientX, y: touch.clientY });
    };
    const handleTouchEnd = () => { setIsDragging(false); };

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

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = rotation.x;
      group.current.rotation.y = isDragging
        ? rotation.y
        : rotation.y + Math.sin(state.mouse.x * 0.1) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} color="#dde8ff" />
      <directionalLight position={[2, 8, 12]} intensity={1.8} color="#ffffff" castShadow={false} />
      <directionalLight position={[-8, 4, 4]} intensity={1.0} color="#88aaff" castShadow={false} />
      <directionalLight position={[0, 10, -8]} intensity={0.6} color="#4466cc" castShadow={false} />

      <group ref={group} onClick={handleClick}>
        <primitive object={scene} />
      </group>
    </>
  );
};

const CustomRobot = ({ bodyColor, glowColor }) => {
  return (
    <Suspense fallback={<LoadingPlaceholder bodyColor={bodyColor} />}>
      <CustomRobotCore bodyColor={bodyColor} glowColor={glowColor} />
    </Suspense>
  );
};

export default CustomRobot;
