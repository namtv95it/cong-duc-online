import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Spherical, MathUtils } from 'three';
import { characterRbRef } from '../characters/ChibiCharacter';

const CAMERA_DISTANCE = 8.5;
const CAMERA_HEIGHT = 4.2;
const DAMPING = 0.08;

const _targetPos = new Vector3();
const _desiredPos = new Vector3();
const _spherical = new Spherical(CAMERA_DISTANCE, Math.PI / 2.8, Math.PI);

export default function ThirdPersonCamera() {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0 || e.button === 2) {
        isDragging.current = true;
        prevMouse.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = (e.clientX - prevMouse.current.x) * 0.005;
      const dy = (e.clientY - prevMouse.current.y) * 0.004;
      _spherical.theta -= dx;
      _spherical.phi = MathUtils.clamp(_spherical.phi + dy, 0.35, Math.PI * 0.52);
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const dx = (e.touches[0].clientX - prevMouse.current.x) * 0.005;
      const dy = (e.touches[0].clientY - prevMouse.current.y) * 0.004;
      _spherical.theta -= dx;
      _spherical.phi = MathUtils.clamp(_spherical.phi + dy, 0.35, Math.PI * 0.52);
      prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [gl]);

  useFrame(() => {
    if (!characterRbRef.current) return;
    const charPos = characterRbRef.current.translation();
    _targetPos.set(charPos.x, charPos.y + CAMERA_HEIGHT * 0.25, charPos.z);

    _desiredPos.setFromSpherical(_spherical);
    _desiredPos.add(_targetPos);
    _desiredPos.y = Math.max(charPos.y + 1.2, _desiredPos.y);

    camera.position.lerp(_desiredPos, DAMPING);
    camera.lookAt(_targetPos);
  });

  return null;
}

