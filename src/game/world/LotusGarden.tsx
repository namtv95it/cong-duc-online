import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import type { Group } from 'three';

interface LotusFlowerProps {
  x: number;
  z: number;
  phase?: number;
}

function LotusFlower({ x, z, phase = 0 }: LotusFlowerProps) {
  const groupRef = useRef<Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        0.09 + Math.sin(state.clock.elapsedTime * 0.8 + phase) * 0.012;
    }
  });

  return (
    <group ref={groupRef} position={[x, 0.09, z]}>
      {/* Lá sen */}
      <mesh rotation={[-Math.PI / 2, 0, phase]}>
        <circleGeometry args={[0.34, 8]} />
        <meshStandardMaterial color="#558B2F" roughness={0.9} side={2} />
      </mesh>
      {/* Nhụy sen vàng */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.08, 6]} />
        <meshStandardMaterial color="#F9C74F" roughness={0.8} />
      </mesh>
      {/* 6 cánh hoa hồng phấn */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 6) * 0.22,
            0.07,
            Math.sin((i * Math.PI * 2) / 6) * 0.22,
          ]}
          rotation={[0.45, (i * Math.PI * 2) / 6, 0]}
        >
          <sphereGeometry args={[0.11, 5, 4]} />
          <meshStandardMaterial color="#F8BBD0" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export default function LotusGarden() {
  return (
    <group position={[18, 0, 2]}>
      {/* Nước mặt hồ sen */}
      <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5.2, 24]} />
        <meshStandardMaterial
          color="#68B5B9"
          transparent
          opacity={0.8}
          roughness={0.06}
          metalness={0.05}
        />
      </mesh>

      {/* Viền hồ đá bo tròn */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.14, 0]}>
          <torusGeometry args={[5.2, 0.3, 4, 24]} />
          <meshStandardMaterial color="#888880" roughness={0.92} />
        </mesh>
      </RigidBody>

      {/* Các bông hoa sen */}
      <LotusFlower x={-1.6} z={-1.2} phase={0} />
      <LotusFlower x={1.2} z={-2.1} phase={1.2} />
      <LotusFlower x={2.3} z={0.8} phase={2.4} />
      <LotusFlower x={-2.2} z={1.9} phase={3.6} />
      <LotusFlower x={0.4} z={1.6} phase={0.8} />
    </group>
  );
}

