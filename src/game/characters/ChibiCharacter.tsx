import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  RigidBody,
  CapsuleCollider,
  type RapierRigidBody,
} from '@react-three/rapier';
import { Vector3, Quaternion, Euler, type Group } from 'three';
import { useAppStore } from '../../state/appStore';

// Shared refs for camera and interaction system
export const characterRbRef = { current: null as RapierRigidBody | null };
export const characterGroupRef = { current: null as Group | null };

const WALK_SPEED = 3.0;
const RUN_SPEED = 5.2;

const keysDown = new Set<string>();

function onKeyDown(e: KeyboardEvent) {
  keysDown.add(e.code);
}
function onKeyUp(e: KeyboardEvent) {
  keysDown.delete(e.code);
}

function ChibiVisual({ walkPhase }: { walkPhase: number }) {
  const robeColor = '#E3BF72';
  const innerColor = '#D4A840';
  const skinColor = '#FDDBB4';
  const eyeColor = '#2A1A0A';
  const swing = Math.sin(walkPhase * 7) * 0.35;

  return (
    <group>
      {/* Chân trái */}
      <group position={[-0.1, -0.45, 0]} rotation={[swing, 0, 0]}>
        <mesh>
          <capsuleGeometry args={[0.07, 0.25, 4, 6]} />
          <meshStandardMaterial color={innerColor} roughness={0.9} />
        </mesh>
      </group>

      {/* Chân phải */}
      <group position={[0.1, -0.45, 0]} rotation={[-swing, 0, 0]}>
        <mesh>
          <capsuleGeometry args={[0.07, 0.25, 4, 6]} />
          <meshStandardMaterial color={innerColor} roughness={0.9} />
        </mesh>
      </group>

      {/* Thân áo */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.22, 0.27, 0.65, 8]} />
        <meshStandardMaterial color={robeColor} roughness={0.9} />
      </mesh>

      {/* Tay trái */}
      <group position={[-0.28, -0.05, 0]} rotation={[swing, 0, -0.2]}>
        <mesh>
          <capsuleGeometry args={[0.065, 0.28, 4, 6]} />
          <meshStandardMaterial color={robeColor} roughness={0.9} />
        </mesh>
      </group>

      {/* Tay phải */}
      <group position={[0.28, -0.05, 0]} rotation={[-swing, 0, 0.2]}>
        <mesh>
          <capsuleGeometry args={[0.065, 0.28, 4, 6]} />
          <meshStandardMaterial color={robeColor} roughness={0.9} />
        </mesh>
      </group>

      {/* Cổ */}
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.1, 0.13, 0.16, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>

      {/* Đầu tròn chú tiểu */}
      <mesh position={[0, 0.58, 0]}>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>

      {/* Mắt trái */}
      <mesh position={[-0.1, 0.61, 0.24]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color={eyeColor} roughness={1} />
      </mesh>

      {/* Mắt phải */}
      <mesh position={[0.1, 0.61, 0.24]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color={eyeColor} roughness={1} />
      </mesh>

      {/* Tai trái */}
      <mesh position={[-0.27, 0.57, 0.04]}>
        <sphereGeometry args={[0.055, 6, 5]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>

      {/* Tai phải */}
      <mesh position={[0.27, 0.57, 0.04]}>
        <sphereGeometry args={[0.055, 6, 5]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>
    </group>
  );
}

const _moveDir = new Vector3();
const _forward = new Vector3();
const _right = new Vector3();
const _camDir = new Vector3();

export default function ChibiCharacter() {
  const rbRef = useRef<RapierRigidBody>(null);
  const visualGroupRef = useRef<Group>(null);
  const walkPhaseRef = useRef(0);
  const { camera } = useThree();

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useEffect(() => {
    characterRbRef.current = rbRef.current;
    characterGroupRef.current = visualGroupRef.current;
  });

  useFrame((_, delta) => {
    if (!rbRef.current) return;

    const status = useAppStore.getState().status;
    if (status === 'INTERACTING' || status === 'SAVING') {
      rbRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      return;
    }

    const isRunning = keysDown.has('ShiftLeft') || keysDown.has('ShiftRight');
    const speed = isRunning ? RUN_SPEED : WALK_SPEED;

    camera.getWorldDirection(_camDir);
    _camDir.y = 0;
    _camDir.normalize();
    _forward.copy(_camDir);
    _right.crossVectors(_forward, new Vector3(0, 1, 0)).normalize();

    let dx = 0;
    let dz = 0;
    if (keysDown.has('KeyW') || keysDown.has('ArrowUp')) {
      dx += _forward.x;
      dz += _forward.z;
    }
    if (keysDown.has('KeyS') || keysDown.has('ArrowDown')) {
      dx -= _forward.x;
      dz -= _forward.z;
    }
    if (keysDown.has('KeyA') || keysDown.has('ArrowLeft')) {
      dx -= _right.x;
      dz -= _right.z;
    }
    if (keysDown.has('KeyD') || keysDown.has('ArrowRight')) {
      dx += _right.x;
      dz += _right.z;
    }

    _moveDir.set(dx, 0, dz);
    const moving = _moveDir.lengthSq() > 0.001;

    if (moving) {
      _moveDir.normalize().multiplyScalar(speed);
      const curVel = rbRef.current.linvel();
      rbRef.current.setLinvel({ x: _moveDir.x, y: curVel.y, z: _moveDir.z }, true);

      const targetAngle = Math.atan2(_moveDir.x, _moveDir.z);
      if (visualGroupRef.current) {
        const targetQ = new Quaternion().setFromEuler(new Euler(0, targetAngle, 0));
        visualGroupRef.current.quaternion.slerp(targetQ, 0.2);
      }

      walkPhaseRef.current += delta * (isRunning ? 1.6 : 1.0);
    } else {
      const curVel = rbRef.current.linvel();
      rbRef.current.setLinvel({ x: curVel.x * 0.8, y: curVel.y, z: curVel.z * 0.8 }, true);
      walkPhaseRef.current = 0;
    }

    const pos = rbRef.current.translation();
    if (visualGroupRef.current) {
      visualGroupRef.current.position.set(pos.x, pos.y - 0.45, pos.z);
    }
  });

  return (
    <>
      <RigidBody
        ref={rbRef}
        position={[0, 1.2, 24]}
        enabledRotations={[false, false, false]}
        linearDamping={0.6}
        colliders={false}
        name="character"
      >
        <CapsuleCollider args={[0.32, 0.35]} />
      </RigidBody>
      <group ref={visualGroupRef} position={[0, 0.75, 24]}>
        <ChibiVisual walkPhase={walkPhaseRef.current} />
      </group>
    </>
  );
}

