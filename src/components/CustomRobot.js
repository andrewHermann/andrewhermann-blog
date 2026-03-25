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
import { useGLTF, useAnimations, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Clear GLTF cache on every module load so materials are always fresh.
// Without this, HMR preserves corrupted material state (e.g. transparent=true) indefinitely.
useGLTF.clear('/ai-3d-robot.glb');

// Fallback component while loading
const LoadingPlaceholder = () => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color="#1e3a5f" />
    </mesh>
  );
};

const CustomRobotCore = () => {
  const group = useRef();
  const headBoneRef = useRef(null);
  const windowMouseRef = useRef({ x: 0, y: 0 });
  const headOffsetRef = useRef({ x: 0, y: 0 });
  const bodyOffsetRef = useRef({ x: 0, y: 0 });
  const restQuatRef = useRef(new THREE.Quaternion());
  const restCapturedRef = useRef(false);
  const _offsetQuat = useRef(new THREE.Quaternion());
  const _offsetEuler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

  const { scene, animations } = useGLTF('/ai-3d-robot.glb');
  const { actions, mixer } = useAnimations(animations, group);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: Math.PI });
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [dragDistance, setDragDistance] = useState(0);
  const [isPlayingPose, setIsPlayingPose] = useState(false);
  const [isPlayingReverse, setIsPlayingReverse] = useState(false);

  // Apply transform, find head bone, and set material colors.
  // Fresh clone = no stale transparent/depthWrite state to fight.
  useLayoutEffect(() => {
    if (!scene) return;

    scene.scale.set(16.875, 16.875, 16.875);
    scene.position.set(0, 10, 0);
    scene.rotation.y = Math.PI;

    scene.traverse((child) => {
      // Find head bone
      if (child.isSkinnedMesh && child.skeleton) {
        const headBone = child.skeleton.bones.find(b => b.name === 'DEF-spine006');
        if (headBone) headBoneRef.current = headBone;
      }

      // Apply materials
      if (!child.isMesh) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        if (!mat) return;
        switch (mat.name) {
          case 'Body':
            // Cobalt blue hull — moderate metalness so it reads as blue, not black mirror
            mat.color.setHex(0x4a9fd8);
            mat.emissive.setHex(0x1a3a55);
            mat.emissiveIntensity = 0.3;
            mat.roughness = 0.35;
            mat.metalness = 0.55;
            mat.transparent = false;
            mat.depthWrite = true;
            mat.needsUpdate = true;
            break;
          case 'ArmorOut':
            // Silver-grey plates
            mat.color.setHex(0xa8b8c8);
            mat.emissive.setHex(0x2a3a48);
            mat.emissiveIntensity = 0.1;
            mat.roughness = 0.3;
            mat.metalness = 0.6;
            mat.transparent = false;
            mat.depthWrite = true;
            mat.needsUpdate = true;
            break;
          case 'ArmorIn':
            // Site secondary blue (#2563eb) as the dark accent — readable against white
            mat.color.setHex(0x2563eb);
            mat.emissive.setHex(0x1040a0);
            mat.emissiveIntensity = 0.25;
            mat.roughness = 0.5;
            mat.metalness = 0.2;
            mat.transparent = false;
            mat.depthWrite = true;
            mat.needsUpdate = true;
            break;
          case 'Lights':
            // Site secondary blue glow strips
            mat.color.setHex(0x081f52);
            mat.emissive.setHex(0x081f52);
            mat.emissiveIntensity = 2.5;
            mat.roughness = 0.0;
            mat.metalness = 0.0;
            mat.transparent = false;
            mat.depthWrite = true;
            mat.needsUpdate = true;
            break;
          case 'Decor':
            // Pure-black GLTF base-color meshes don't respond to MeshStandardMaterial
            // color changes in THREE.js 0.178 — MeshBasicMaterial bypasses the PBR shader.
            child.material = new THREE.MeshBasicMaterial({
              color: 0x00ff00,
              side: THREE.DoubleSide,
              depthTest: false,
            });
            child.renderOrder = 999;
            break;
          default:
            break;
        }
      });
    });
  }, [scene]);

  // Idle animation
  useEffect(() => {
    if (actions) {
      Object.keys(actions).forEach(name => actions[name]?.stop());
      if (actions.Idle) {
        actions.Idle.setLoop(THREE.LoopRepeat).play();
        actions.Idle.timeScale = 2;
      }
    }
  }, [actions]);

  // Pose animation: play forward then reverse back to idle
  useEffect(() => {
    if (mixer && actions && actions.Pose) {
      const onFinished = (event) => {
        if (event.action !== actions.Pose) return;
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
      };
      mixer.addEventListener('finished', onFinished);
      return () => mixer.removeEventListener('finished', onFinished);
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

  // Mouse tracking for head/body follow
  useEffect(() => {
    const handleWindowMouse = (e) => {
      const canvas = document.querySelector('.floating-robot-canvas');
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const px = e.clientX - (rect.left + rect.width / 2);
        const py = e.clientY - (rect.top + rect.height / 2);
        windowMouseRef.current = {
          x: Math.atan(px / 400) * (2 / Math.PI) * 0.873,
          y: Math.atan(py / 400) * (2 / Math.PI) * 0.436,
        };
      }
    };
    window.addEventListener('mousemove', handleWindowMouse);
    return () => window.removeEventListener('mousemove', handleWindowMouse);
  }, []);

  // Drag-to-rotate
  useEffect(() => {
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setLastTouch({ x: e.clientX, y: e.clientY });
      setDragDistance(0);
    };
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastTouch.x;
      const dy = e.clientY - lastTouch.y;
      setDragDistance(Math.sqrt((e.clientX - dragStart.x) ** 2 + (e.clientY - dragStart.y) ** 2));
      setRotation(prev => ({ x: prev.x + dy * 0.01, y: prev.y + dx * 0.01 }));
      setLastTouch({ x: e.clientX, y: e.clientY });
    };
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchStart = (e) => {
      const t = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: t.clientX, y: t.clientY });
      setLastTouch({ x: t.clientX, y: t.clientY });
      setDragDistance(0);
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const t = e.touches[0];
      const dx = t.clientX - lastTouch.x;
      const dy = t.clientY - lastTouch.y;
      setDragDistance(Math.sqrt((t.clientX - dragStart.x) ** 2 + (t.clientY - dragStart.y) ** 2));
      setRotation(prev => ({ x: prev.x + dy * 0.01, y: prev.y + dx * 0.01 }));
      setLastTouch({ x: t.clientX, y: t.clientY });
    };
    const handleTouchEnd = () => setIsDragging(false);

    const el = document.querySelector('.floating-robot-canvas');
    if (el) {
      el.addEventListener('mousedown', handleMouseDown);
      el.addEventListener('touchstart', handleTouchStart);
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      if (el) {
        el.removeEventListener('mousedown', handleMouseDown);
        el.removeEventListener('touchstart', handleTouchStart);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, lastTouch, dragStart, dragDistance]);

  // Priority-1 frame: body lean + head bone + manual render (required since priority > 0 disables auto-render)
  useFrame(({ gl, scene: s, camera }) => {
    const m = windowMouseRef.current;

    if (group.current) {
      if (!isDragging) {
        bodyOffsetRef.current.x = THREE.MathUtils.lerp(bodyOffsetRef.current.x, m.y * 0.5, 0.06);
        bodyOffsetRef.current.y = THREE.MathUtils.lerp(bodyOffsetRef.current.y, m.x * 0.6, 0.06);
      }
      group.current.rotation.x = rotation.x + (isDragging ? 0 : bodyOffsetRef.current.x);
      group.current.rotation.y = isDragging ? rotation.y : rotation.y + bodyOffsetRef.current.y;
    }

    const headBone = headBoneRef.current;
    if (headBone) {
      if (!restCapturedRef.current) {
        restQuatRef.current.copy(headBone.quaternion);
        restCapturedRef.current = true;
      }
      headOffsetRef.current.x = THREE.MathUtils.lerp(headOffsetRef.current.x, m.y, 0.08);
      headOffsetRef.current.y = THREE.MathUtils.lerp(headOffsetRef.current.y, m.x, 0.08);
      _offsetEuler.current.set(headOffsetRef.current.x, headOffsetRef.current.y, 0, 'YXZ');
      _offsetQuat.current.setFromEuler(_offsetEuler.current);
      headBone.quaternion.copy(restQuatRef.current).multiply(_offsetQuat.current);
    }

    gl.render(s, camera);
  }, 1);

  return (
    <>
      <Environment preset="city" background={false} />
      <ambientLight intensity={0.8} color="#e8f0ff" />
      <directionalLight position={[2, 8, 12]} intensity={1.6} color="#ffffff" castShadow={false} />
      <directionalLight position={[-8, 4, 4]} intensity={0.8} color="#aabbff" castShadow={false} />
      <directionalLight position={[0, 10, -8]} intensity={0.5} color="#4466cc" castShadow={false} />

      <group ref={group} onClick={handleClick}>
        <primitive object={scene} />
      </group>
    </>
  );
};

const CustomRobot = () => {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <CustomRobotCore />
    </Suspense>
  );
};

export default CustomRobot;
